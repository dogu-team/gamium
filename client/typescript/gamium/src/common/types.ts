export type Plain<Type> = Omit<Required<Type>, 'pack'>;
export type PlainObject<Type> = { [key in keyof Plain<Type>]: Plain<Type[key]> };
