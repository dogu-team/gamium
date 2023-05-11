import { Vector3T } from "../protocols/generated";
import { GamiumClient } from "../gamium-client";
import { GamiumService } from "../gamium-service";
import { isLocator, Locator } from "../locator/locator";
import { UIElement } from "../object/ui-element";
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
  DefaultFindObjectOptions,
  FindObjectOptions,
} from "../options/find-object-options";
import { Vector2 } from "../protocols/types";
import { tryify, TryResult } from "../try";
import { Until } from "../until";

export class UI {
  constructor(
    protected readonly game: GamiumClient,
    protected readonly gamiumService: GamiumService
  ) {}

  async find(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<UIElement> {
    const info = await this.game.wait(Until.objectLocated(locator, options));
    return new UIElement(this.game, this.gamiumService, info);
  }

  async tryFind(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<TryResult<UIElement>> {
    return tryify(this.find(locator, options));
  }

  async finds(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<UIElement[]> {
    const infos = await this.game.wait(Until.objectsLocated(locator, options));
    const elements = infos.map(
      (i) => new UIElement(this.game, this.gamiumService, i)
    );
    return elements;
  }

  async tryFinds(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<TryResult<UIElement[]>> {
    return tryify(this.finds(locator, options));
  }

  async click(
    locator: Locator,
    options: Partial<FindObjectOptions & ActionsClickOptions> = {
      ...DefaultFindObjectOptions(),
      ...DefaultActionClickOptions(),
    }
  ): Promise<void> {
    const element = await this.find(locator, options);
    await this.game.wait(Until.elementInteractable(element));
    await element.click(options);
  }

  async drag(
    locator: Locator,
    to: Locator | Vector2,
    options: Partial<FindObjectOptions & ActionsDragOptions> = {
      ...DefaultFindObjectOptions(),
      ...DefaultActionsDragOptions(),
    }
  ): Promise<void> {
    const element = await this.find(locator, options);
    await this.game.wait(Until.elementInteractable(element));
    let toPos = new Vector3T(0, 0, 0);
    if (isLocator(to)) {
      const toElement = await this.find(to, options);
      toPos = new Vector3T(
        toElement.info.screenPosition.x,
        toElement.info.screenPosition.y,
        toElement.info.screenPosition.z
      );
    } else {
      toPos = new Vector3T(to.x, to.y, 0);
    }
    await this.game
      .actions()
      .drag(element.info.screenPosition, toPos, options)
      .perform();
  }

  async scroll(
    locator: Locator,
    delta: Vector2,
    options: Partial<FindObjectOptions & ActionsScrollOptions> = {
      ...DefaultFindObjectOptions(),
      ...DefaultActionScrollOptions(),
    }
  ): Promise<void> {
    const element = await this.find(locator, options);
    await this.game.wait(Until.elementInteractable(element));
    await element.scroll(delta, options);
  }

  async setText(
    locator: Locator,
    text: string,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<void> {
    const element = await this.find(locator, options);
    await this.game.wait(Until.elementInteractable(element));
    await element.setText(text);
  }

  async getText(
    locator: Locator,
    options: Partial<FindObjectOptions> = DefaultFindObjectOptions()
  ): Promise<string> {
    const element = await this.find(locator, options);
    await this.game.wait(Until.elementInteractable(element));
    return await element.getText();
  }
}
