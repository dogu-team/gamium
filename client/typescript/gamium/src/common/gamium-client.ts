import { ActionChain } from "./actions/action-chain";
import { KeyBy } from "./actions/key-by";
import { GamiumError } from "./errors/gamium-error";
import {
  createExecuteRpc,
  createFindObjects,
  createHello,
  createQueryProfile,
  createQueryScreen,
  GamiumService,
} from "./gamium-service";
import { Inspector } from "./inspect/inspector";
import { delay, stringify, stringifyAllProps } from "./internal/functions";
import { Printable } from "./internal/logs";
import { waitGeneric } from "./internal/utils/wait";
import { Locator } from "./locator/locator";
import { RpcLocator } from "./locator/rpc-locator";
import { Player } from "./object/player";
import {
  DefaultExecuteRpcOptions,
  ExecuteRpcOptions,
} from "./options/execute-rpc-options";
import {
  DefaultFindObjectOptions,
  FindObjectOptions,
} from "./options/find-object-options";
import {
  DefaultSendKeyOptions,
  SendKeyOptions,
} from "./options/send-key-options";
import { DefaultWaitOptions, WaitOptions } from "./options/wait-options";
import {
  ErrorCode,
  HelloResultT,
  ObjectInfoT,
  ObjectLocatorT,
} from "./protocols/generated";
import {
  ObjectInfo,
  QueryProfileResult,
  QueryScreenResult,
} from "./protocols/types";
import { tryify, TryResult } from "./try";
import { UI } from "./ui/ui";
import { Version } from "./version";
import { WaitCondition } from "./wait-condition";

export class GamiumClient {
  constructor(
    private readonly gamiumService: GamiumService,
    readonly logger: Printable
  ) {}

  get connected(): boolean {
    return this.gamiumService.connected;
  }

  async connect(tryCount = 30): Promise<void> {
    this.logger.info(`GamiumClient.connect`);
    await this.gamiumService.connect(tryCount);
  }

  disconnect(): void {
    this.logger.info(`GamiumClient.disconnect`);
    this.gamiumService.disconnect();
  }

  async screen(): Promise<QueryScreenResult> {
    this.logger.info(`GamiumClient.screen`);
    return await this.gamiumService.request(createQueryScreen({}));
  }

  async hello(): Promise<HelloResultT> {
    return await this.gamiumService.request(createHello({ version: Version }), {
      timeout: 1000,
    });
  }

  async profile(): Promise<QueryProfileResult> {
    this.logger.info(`GamiumClient.profile`);
    return await this.gamiumService.request(createQueryProfile({}));
  }

  // object

  async find(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<ObjectInfo> {
    const infos = await this.finds(locator, options);
    if (infos.length === 0) {
      throw new GamiumError(
        ErrorCode.ObjectNotFound,
        `GamiumClient.findObject By:${locator.by}, str:${locator.str} not found`
      );
    }
    const info = infos[0];
    if (info === undefined) {
      throw new GamiumError(
        ErrorCode.ObjectNotFound,
        `GamiumClient.findObject By:${locator.by}, str:${locator.str} not found`
      );
    }
    return info;
  }

  async tryFind(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<TryResult<ObjectInfo>> {
    return tryify(this.find(locator, options));
  }

  async finds(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<ObjectInfo[]> {
    this.logger.info(
      `GamiumClient.findObjects By:${locator.by}, str:${locator.str}`
    );
    const optionMixed: FindObjectOptions = {
      ...DefaultFindObjectOptions(),
      ...options,
    };
    if (
      locator.str === undefined ||
      locator.str === null ||
      locator.str.length === 0
    ) {
      throw new GamiumError(
        ErrorCode.InvalidParameter,
        `GamiumClient.findObject By:${locator.by}, str:${locator.str} is invalid`
      );
    }
    const res = await this.gamiumService.request(
      createFindObjects({
        locator: new ObjectLocatorT(locator.by, locator.str),
      })
    );

    await delay(optionMixed.delayMs);
    const infos: ObjectInfo[] = res.infos.map((info: ObjectInfoT) => {
      return {
        path: info.path?.toString() ?? "",
        name: info.name?.toString() ?? "",
        type: info.type,
        tag: info.tag,
        isActive: info.isActive,
        screenPosition: info.screenPosition ?? { x: 0, y: 0, z: 0 },
        screenRectSize: info.screenRectSize ?? { x: 0, y: 0 },
        position: info.position ?? { x: 0, y: 0, z: 0 },
        rotation: info.rotation ?? { x: 0, y: 0, z: 0, w: 0 },
        text: info.text?.toString() ?? "",
      };
    });
    return infos;
  }

  async tryFinds(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<TryResult<ObjectInfo[]>> {
    return tryify(this.finds(locator, options));
  }

  // action

  actions(): ActionChain {
    return new ActionChain(this.gamiumService);
  }

  async sendKey(
    by: KeyBy,
    options: Partial<SendKeyOptions> = DefaultSendKeyOptions()
  ): Promise<void> {
    return await this.sendKeys([by], options);
  }

  async sendKeys(
    byList: KeyBy[],
    options: Partial<SendKeyOptions> = DefaultSendKeyOptions()
  ): Promise<void> {
    this.logger.info(`GamiumClient.sendKeys codes:${stringify(byList)}`);
    await this.actions().sendKeys(byList, options).perform();
  }

  // execute

  async executeRpc(
    locator: RpcLocator,
    option: Partial<ExecuteRpcOptions> = DefaultExecuteRpcOptions()
  ): Promise<undefined | number | string | object> {
    this.logger.info(
      `GamiumClient.executeRpc By:${locator.by}, className:${
        locator.className
      }, targetName:${locator.targetName}, params:${stringifyAllProps(
        locator.params
      )}`
    );
    const params = locator.params.map((p) => {
      const doc = JSON.stringify(p);
      if (option.castNumberToFloat) {
        return doc.replace(
          /(-?\d+)(\.\d+)?/g,
          (match: string, p1: string, p2: string) => {
            if (p2) {
              return p1 + p2;
            }
            return p1 + ".0";
          }
        );
      }
      return doc;
    });
    const res = await this.gamiumService.request(
      createExecuteRpc({
        by: locator.by,
        className: locator.className,
        targetName: locator.targetName,
        paramDocuments: params,
      })
    );
    if (!res.document || res.document === "null") {
      return undefined;
    }
    const parsed = JSON.parse(res.document.toString()) as unknown;
    const parsedNumber = parsed as number;
    if (null !== parsedNumber) {
      return parsedNumber;
    }
    const parsedString = parsed as string;
    if (null !== parsedString) {
      return parsedString;
    }

    const parsedObject = parsed as object;
    if (null !== parsedObject) {
      return parsedObject;
    }
    throw new GamiumError(
      ErrorCode.ExecuteRpcNotSupportedType,
      `executeRpc By:${locator.by}, className:${
        locator.className
      }, targetName:${
        locator.targetName
      } result:${res.document.toString()} not supported type`
    );
  }

  // player
  async player(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<Player> {
    const info = await this.find(locator, options);
    return new Player(this, this.gamiumService, info);
  }

  // ui

  ui(): UI {
    return new UI(this, this.gamiumService);
  }

  // inspector

  inspector(): Inspector {
    return new Inspector(this, this.gamiumService);
  }

  async sleep(millseconds: number): Promise<void> {
    this.logger.info(`GamiumClient.sleep millseconds:${millseconds}`);
    await this.actions().sleep(millseconds).perform();
  }

  async wait<Type>(
    condition: WaitCondition<Type>,
    option: Partial<WaitOptions> = DefaultWaitOptions()
  ): Promise<Type> {
    return await waitGeneric(this, condition, option);
  }

  async tryWait<Type>(
    condition: WaitCondition<Type>,
    option: Partial<WaitOptions> = DefaultWaitOptions()
  ): Promise<TryResult<Type>> {
    return tryify(this.wait(condition, option));
  }
}
