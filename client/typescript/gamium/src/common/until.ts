import { ObjectInfoCondition, ObjectInfosCondition, UIElementCondition } from './condition';
import { GamiumError } from './errors/gamium-error';
import { Locator } from './locator/locator';
import { UIElement } from './object/ui-element';
import { DefaultFindObjectOptions, FindObjectOptions } from './options/find-object-options';
import { DefaultQueryObjectInteractableOptions, QueryObjectInteractableOptions } from './options/query-object-interactable-options';
import { ErrorCode } from './protocols/generated';

export class Until {
  static objectLocated(locator: Locator, options: Partial<FindObjectOptions> = DefaultFindObjectOptions()): ObjectInfoCondition {
    return new ObjectInfoCondition(`locate element locator:${JSON.stringify(locator)}`, (driver) => {
      return driver.find(locator, options);
    });
  }

  static objectsLocated(locator: Locator, options: Partial<FindObjectOptions> = DefaultFindObjectOptions()): ObjectInfosCondition {
    return new ObjectInfosCondition(`locate element locator:${JSON.stringify(locator)}`, (driver) => {
      return driver.finds(locator, options);
    });
  }

  static elementInteractable(param: UIElement, options: Partial<QueryObjectInteractableOptions> = DefaultQueryObjectInteractableOptions()): UIElementCondition {
    return new UIElementCondition(`locate element gameObject:${JSON.stringify(param)}`, (_) => {
      return new Promise((resolve, reject) => {
        param
          .isInteractable(options)
          .then((interactable) => {
            if (interactable) {
              resolve(param);
            } else {
              reject(new GamiumError(ErrorCode.ObjectIsNotInteractable, 'object not interactable', { element: param }));
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }
}
