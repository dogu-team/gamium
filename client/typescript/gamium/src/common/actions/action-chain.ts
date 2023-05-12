import {
  ActionParam,
  ActionsParamT,
  AppQuitParamT,
  ErrorCode,
  InputKeyParamT,
  InputKeyPressType,
  InputMouseButtonCode,
  InputMouseParamT,
  InputMousePressType,
  InputSetTextParamT,
  MovePlayerParamT,
  ObjectLocatorBy,
  SleepParamT,
  Vector2T,
  Vector3T,
} from "../protocols/generated";
import * as gl from "gl-matrix";
import { GamiumError } from "../errors/gamium-error";
import { createActions, GamiumService } from "../gamium-service";
import { Locator } from "../locator/locator";
import {
  ActionsClickOptions,
  DefaultActionClickOptions,
} from "../options/actions-click-options";
import {
  ActionsDragOptions,
  DefaultActionsDragOptions,
} from "../options/actions-drag-options";
import {
  ActionsMoveOptions,
  DefaultActionMoveOptions,
} from "../options/actions-move-options";
import { DefaultActionScrollOptions } from "../options/actions-scroll-options";
import {
  DefaultMovePlayerOptions,
  MovePlayerOptions,
} from "../options/move-player-options";
import {
  DefaultSendKeyOptions,
  SendKeyOptions,
} from "../options/send-key-options";
import {
  DefaultSetTextOptions,
  SetTextOptions,
} from "../options/set-text-options";
import { ActionResult, Vector2, Vector3 } from "../protocols/types";
import { tryify, TryResult } from "../try";
import { Plain } from "../types";
import { KeyBy } from "./key-by";

const _dummyParam = new ActionsParamT();
type ActionParamTypes = NonNullable<(typeof _dummyParam.actions)[0]>;

interface ActionPacketTypes {
  paramEnum: ActionParam;
  param: ActionParamTypes;
}

export const createSleep = (param: Plain<SleepParamT>): ActionPacketTypes => {
  return {
    paramEnum: ActionParam.Actions_SleepParam,
    param: new SleepParamT(param.ms),
  };
};

export const createInputKey = (
  param: Plain<InputKeyParamT>
): ActionPacketTypes => {
  return {
    paramEnum: ActionParam.Actions_InputKeyParam,
    param: new InputKeyParamT(param.press, param.codes),
  };
};

export const createInputMouse = (
  param: Plain<InputMouseParamT>
): ActionPacketTypes => {
  return {
    paramEnum: ActionParam.Actions_InputMouseParam,
    param: new InputMouseParamT(
      param.press,
      param.button,
      param.position,
      param.delta
    ),
  };
};

export const createInputSetText = (
  param: Plain<InputSetTextParamT>
): ActionPacketTypes => {
  return {
    paramEnum: ActionParam.Actions_InputSetTextParam,
    param: new InputSetTextParamT(param.objectId, param.text),
  };
};

export const createMovePlayer = (
  param: Plain<MovePlayerParamT>
): ActionPacketTypes => {
  return {
    paramEnum: ActionParam.Actions_MovePlayerParam,
    param: new MovePlayerParamT(
      param.playerObjectId,
      param.cameraObjectId,
      param.position,
      param.by,
      param.epsilon,
      param.checkHeight
    ),
  };
};

export const createAppQuit = (
  param: Plain<AppQuitParamT>
): ActionPacketTypes => {
  return {
    paramEnum: ActionParam.Actions_AppQuitParam,
    param: new AppQuitParamT(param.exitCode, param.delayMs),
  };
};

export class ActionChain {
  constructor(
    private gamiumService: GamiumService,
    private actions: ActionPacketTypes[] = []
  ) {}

  private addAction(action: ActionPacketTypes): ActionChain {
    this.actions.push(action);
    return this;
  }

  sleep(millseconds: number): ActionChain {
    this.addAction(createSleep({ ms: millseconds }));
    return this;
  }

  click(
    position: Vector2,
    options: Partial<ActionsClickOptions> = DefaultActionClickOptions()
  ): ActionChain {
    const optionMixed = { ...DefaultActionClickOptions(), ...options };

    const vec2Pos = new Vector2T(position.x, position.y);
    this.addAction(
      createInputMouse({
        press: InputMousePressType.DOWN,
        button: InputMouseButtonCode.LEFT,
        position: vec2Pos,
        delta: new Vector2T(),
      })
    );
    this.addAction(createSleep({ ms: optionMixed.durationMs }));
    this.addAction(
      createInputMouse({
        press: InputMousePressType.UP,
        button: InputMouseButtonCode.LEFT,
        position: vec2Pos,
        delta: new Vector2T(),
      })
    );
    this.addAction(createSleep({ ms: 33 }));
    return this;
  }

  move(
    position: Vector2,
    options: Partial<ActionsMoveOptions> = DefaultActionMoveOptions()
  ): ActionChain {
    const optionMixed = { ...DefaultActionMoveOptions(), ...options };

    const vec2Pos = new Vector2T(position.x, position.y);
    this.addAction(
      createInputMouse({
        press: InputMousePressType.MOVE,
        button: InputMouseButtonCode.LEFT,
        position: vec2Pos,
        delta: new Vector2T(),
      })
    );
    return this;
  }

  drag(
    fromPosition: Vector2,
    toPosition: Vector2,
    options: Partial<ActionsDragOptions> = DefaultActionsDragOptions()
  ): ActionChain {
    const optionMixed = { ...DefaultActionsDragOptions(), ...options };
    const fromVec2 = new Vector2T(fromPosition.x, fromPosition.y);
    const toVec2 = new Vector2T(toPosition.x, toPosition.y);

    this.addAction(
      createInputMouse({
        press: InputMousePressType.DOWN,
        button: InputMouseButtonCode.LEFT,
        position: fromVec2,
        delta: new Vector2T(),
      })
    );

    const deltaCount = optionMixed.durationMs / (optionMixed.intervalMs + 1);
    const deltaVector = gl.vec2.div(
      gl.vec2.create(),
      gl.vec2.sub(
        gl.vec2.create(),
        [toVec2.x, toVec2.y],
        [fromVec2.x, fromVec2.y]
      ),
      [deltaCount, deltaCount]
    );
    this.addAction(createSleep({ ms: optionMixed.intervalMs }));
    for (let i = 1; i < deltaCount - 1; i++) {
      const nextPosition = new Vector2T(
        fromVec2.x + deltaVector[0] * i,
        fromVec2.y + deltaVector[1] * i
      );
      this.addAction(
        createInputMouse({
          press: InputMousePressType.MOVE,
          button: InputMouseButtonCode.LEFT,
          position: nextPosition,
          delta: new Vector2T(),
        })
      );
      this.addAction(createSleep({ ms: optionMixed.intervalMs }));
    }
    this.addAction(
      createInputMouse({
        press: InputMousePressType.UP,
        button: InputMouseButtonCode.LEFT,
        position: toVec2,
        delta: new Vector2T(),
      })
    );
    this.addAction(createSleep({ ms: optionMixed.intervalMs }));

    return this;
  }

  scroll(
    position: Vector2,
    delta: Vector2,
    options = DefaultActionScrollOptions()
  ): ActionChain {
    const vec3Pos = new Vector3T(position.x, position.y, 0);
    const vec2Delta = new Vector2T(delta.x, delta.y);
    this.addAction(
      createInputMouse({
        press: InputMousePressType.SCROLL,
        button: InputMouseButtonCode.LEFT,
        position: vec3Pos,
        delta: vec2Delta,
      })
    );
    this.addAction(createSleep({ ms: options.durationMs }));
    return this;
  }

  sendKeys(
    byList: KeyBy[],
    options: Partial<SendKeyOptions> = DefaultSendKeyOptions()
  ): ActionChain {
    const codes = byList.map((c) => c.str);

    const optionMixed: SendKeyOptions = {
      ...DefaultSendKeyOptions(),
      ...options,
    };
    this.addAction(
      createInputKey({ press: InputKeyPressType.DOWN, codes: codes })
    );
    this.addAction(createSleep({ ms: optionMixed.duratiomMs }));
    this.addAction(
      createInputKey({ press: InputKeyPressType.UP, codes: codes })
    );
    this.addAction(createSleep({ ms: 33 }));
    return this;
  }

  setText(
    locator: Locator,
    text: string,
    options: Partial<SetTextOptions> = DefaultSetTextOptions()
  ): ActionChain {
    if (locator.by !== ObjectLocatorBy.Path) {
      throw new Error("setText only support Path locator");
    }
    this.addAction(createInputSetText({ objectId: locator.str, text: text }));
    this.addAction(createSleep({ ms: 33 }));
    return this;
  }

  movePlayer(
    playerLocator: Locator,
    cameraLocator: Locator,
    dest: Vector3,
    options: Partial<MovePlayerOptions> = DefaultMovePlayerOptions()
  ): ActionChain {
    if (playerLocator.by !== ObjectLocatorBy.Path) {
      throw new Error("movePlayer only support Path locator");
    }
    if (cameraLocator.by !== ObjectLocatorBy.Path) {
      throw new Error("movePlayer only support Path locator");
    }

    const optionsMixed: MovePlayerOptions = {
      ...DefaultMovePlayerOptions(),
      ...options,
    };
    this.addAction(
      createMovePlayer({
        playerObjectId: playerLocator.str,
        cameraObjectId: cameraLocator.str,
        position: new Vector3T(dest.x, dest.y, dest.z),
        by: optionsMixed.by,
        epsilon: optionsMixed.epsilon,
        checkHeight: optionsMixed.checkHeight,
      })
    );
    return this;
  }

  appQuit(exitCode = 0, delayMs = 10): ActionChain {
    this.addAction(createAppQuit({ exitCode: exitCode, delayMs: delayMs }));
    return this;
  }

  async perform(): Promise<ActionResult[]> {
    if (this.actions.length === 0) {
      throw new GamiumError(
        ErrorCode.InvalidParameter,
        "ActionChains.perform actions is empty"
      );
    }
    const actionTypes = this.actions.map((action) => {
      return action.paramEnum;
    });
    const actions = this.actions.map((action) => {
      return action.param;
    });
    const res = await this.gamiumService.request(
      createActions({ actionsType: actionTypes, actions: actions })
    );
    const results = res.results.map((result) => {
      const actionResult: ActionResult = {
        error: {
          code: result.error?.code ?? ErrorCode.None,
          reason: result.error?.reason?.toString() ?? "",
        },
      };
      return actionResult;
    });
    this.checkActionReturn(results);

    return results;
  }

  async tryPerform(): Promise<TryResult<ActionResult[]>> {
    return tryify(this.perform());
  }

  private checkActionReturn(
    res: Awaited<ReturnType<ActionChain["perform"]>>
  ): void {
    for (let i = 0; i < res.length; i++) {
      const actRes = res[i];
      if (actRes === undefined) {
        throw new GamiumError(
          ErrorCode.InternalError,
          `ActionChains.perform action ${i} return undefined`
        );
      }
      if (!actRes.error) {
        throw new GamiumError(
          ErrorCode.InternalError,
          "pressKey action result error is null"
        );
      }
      if (actRes.error.code !== ErrorCode.None) {
        throw new GamiumError(
          ErrorCode.InternalError,
          `pressKey action[${i}] result error code:${String(
            actRes.error
          )}}, msg:${String(actRes.error.reason)}`
        );
      }
    }
  }
}
