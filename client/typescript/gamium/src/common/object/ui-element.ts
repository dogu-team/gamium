import { Vector2T, Vector3T } from "../protocols/generated";
import { GamiumClient } from "../gamium-client";
import {
  createQueryObjectInteractable,
  GamiumService,
} from "../gamium-service";
import { By } from "../locator/by";
import {
  ActionsClickOptions,
  DefaultActionClickOptions,
} from "../options/actions-click-options";
import {
  ActionsDragOptions,
  DefaultActionsDragOptions,
} from "../options/actions-drag-options";
import {
  ActionsScrollOptions,
  DefaultActionScrollOptions,
} from "../options/actions-scroll-options";
import {
  DefaultQueryObjectInteractableOptions,
  QueryObjectInteractableOptions,
} from "../options/query-object-interactable-options";
import { DefaultSetTextOptions } from "../options/set-text-options";
import { refreshObjectInfo, Zero } from "../protocols/functions";
import { ObjectInfo, Vector2 } from "../protocols/types";
import { tryify, TryResult } from "../try";
import { Until } from "../until";

export class UIElement {
  constructor(
    protected readonly game: GamiumClient,
    protected readonly gamiumService: GamiumService,
    public info: ObjectInfo
  ) {}

  async click(
    options: Partial<ActionsClickOptions> = DefaultActionClickOptions()
  ): Promise<void> {
    this.game.logger.info(`UIElement(${this.info.path.toString()}).click`);
    await this.refresh();
    await this.game
      .actions()
      .click(this.info.screenPosition, options)
      .perform();
  }

  async drag(
    to: UIElement | Vector2,
    options: Partial<ActionsDragOptions> = DefaultActionsDragOptions()
  ): Promise<void> {
    this.game.logger.info(`UIElement(${this.info.path.toString()}).drag`);
    const toPos =
      to instanceof UIElement
        ? to.info.screenPosition
        : new Vector3T(to.x, to.y, 0);
    await this.refresh();
    await this.game
      .actions()
      .drag(this.info.screenPosition, toPos, options)
      .perform();
  }

  async scroll(
    delta: Vector2,
    options: Partial<ActionsScrollOptions> = DefaultActionScrollOptions()
  ): Promise<void> {
    this.game.logger.info(`UIElement(${this.info.path.toString()}).scroll`);
    const optionMixed = { ...DefaultActionScrollOptions(), ...options };
    await this.refresh();
    await this.game
      .actions()
      .scroll(
        this.info.screenPosition,
        new Vector2T(delta.x, delta.y),
        optionMixed
      )
      .sleep(optionMixed.durationMs)
      .scroll(this.info.screenPosition, Zero.vector2(), optionMixed)
      .perform();
  }

  async setText(
    text: string,
    options = DefaultSetTextOptions()
  ): Promise<void> {
    this.game.logger.info(`UIElement(${this.info.path.toString()}).setText`);
    await this.game
      .actions()
      .setText(By.path(this.info.path), text, options)
      .perform();
    await this.refresh();
  }

  async getText(): Promise<string> {
    await this.refresh();
    return this.info.text.toString();
  }

  async isInteractable(
    options: Partial<QueryObjectInteractableOptions> = DefaultQueryObjectInteractableOptions()
  ): Promise<boolean> {
    this.game.logger.info(
      `UIElement(${this.info.path.toString()}).isInteractable`
    );
    const optionMixed = {
      ...DefaultQueryObjectInteractableOptions(),
      ...options,
    };
    const res = await this.gamiumService.request(
      createQueryObjectInteractable({
        objectId: this.info.path,
        checkMoving: optionMixed.checkMoving,
        checkRaycast: optionMixed.checkRaycast,
      })
    );
    return res.isInteractable;
  }

  async tryIsInteractable(
    options: Partial<QueryObjectInteractableOptions> = DefaultQueryObjectInteractableOptions()
  ): Promise<TryResult<boolean>> {
    return tryify(this.isInteractable(options));
  }

  async waitInteractable(
    options: Partial<QueryObjectInteractableOptions> = DefaultQueryObjectInteractableOptions()
  ): Promise<void> {
    this.game.logger.info(
      `UIElement(${this.info.path.toString()}).isInteractable`
    );
    await this.game.wait(Until.elementInteractable(this, options));
  }

  async tryWaitInteractable(
    options: Partial<QueryObjectInteractableOptions> = DefaultQueryObjectInteractableOptions()
  ): Promise<TryResult<void>> {
    return tryify(this.waitInteractable(options));
  }

  async refresh(): Promise<void> {
    this.info = await refreshObjectInfo(this.game, this.info);
  }
}
