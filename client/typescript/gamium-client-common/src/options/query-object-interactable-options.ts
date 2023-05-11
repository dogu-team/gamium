export interface QueryObjectInteractableOptions {
  checkMoving: boolean;
  checkRaycast: boolean;
}

export function DefaultQueryObjectInteractableOptions(): QueryObjectInteractableOptions {
  return {
    checkMoving: true,
    checkRaycast: true,
  };
}
