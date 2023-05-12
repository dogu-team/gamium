## env

based on [@next/env](https://nextjs.org/docs/basic-features/environment-variables), [class-validator](https://github.com/typestack/class-validator) and [class-transformer](https://github.com/typestack/class-transformer).

### basics

env definitions.

```sh
# {project_dir}/.env
MY_NUMBER_VARIABLE=123
MY_STRING_VARIABLE=hello
```

env validations.

```typescript
// env.ts
import { EnvLoader } from '@dogu/types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Env {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  MY_NUMBER_VARIABLE!: number;

  @IsNotEmpty()
  @IsString()
  MY_STRING_VARIABLE!: string;
}

export const env = new EnvLoader(Env).loadSync();
```

env usages.

```typescript
// main.ts
import assert from 'assert';
import { env } from './env';

assert(env.MY_NUMBER_VARIABLE === 123);
assert(env.MY_STRING_VARIABLE === 'hello');
```
