import { ObjectLocatorBy } from '../protocols/generated';

export class By {
  constructor(public readonly by: ObjectLocatorBy, public readonly str: string) {}
  static path(str: string): By {
    return new By(ObjectLocatorBy.Path, str);
  }
  static tag(str: string): By {
    return new By(ObjectLocatorBy.Tag, str);
  }
}
