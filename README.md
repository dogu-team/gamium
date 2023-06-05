<p align="center">
<img src=".github/resources/dogu-gamium-logo.png" width="100px" height="100px" title="Gamium_Logo"/>
</p>
<p align="center">
  <b>Gamium</b>
</p>
<p align="center">
Gamium is an SDK that allows you to automate gameplay
</p>

## Description

Gamium provides the ability to script the behavior of game users. Starting from a simple function of clicking on the UI, you can automate various cases and be free from repetitive manual tests.

Automation starts when the gamium client sends a network message to the gamium engine for the specified command.
Users just need to put the gamium engine into the game build and send the specified message using the client sdk.

You can look up the UI and then click and scroll,

```ts
await gamium.ui().click(By.path('Object path'));
```

You can simulate input into the game,

```ts
await gamium.sendKey(KeyBy.unityKeyboard('Space'));
```

You can also call specific functions.

```ts
await gamium.executeRpc(RpcBy.method('Gamium.Private.CodebaseSample', 'CallParam1', 10));
```

## Philosophy

As various platforms emerge, the number of things to test is increasing. Accordingly, the mobile app automation framework is used universally, but in the case of games, there are many projects where tests are not yet automated.

We want to solve this problem and develop automation library with multi-engine support through the same interface.
The interface we provide is inspired by Selenium and Playwright.

## Demo

<img src=".github/resources/gamium-dogurpgsample_demo.gif"  title="Demo"/>

## Support List

### Engine

| Engine                | Windows / macOS | Android     | iOS         | Xbox         | PS4 / PS5    | Switch       |
| --------------------- | --------------- | ----------- | ----------- | ------------ | ------------ | ------------ |
| [Unity](engine/unity) | ✅              | ✅          | ✅          | Need testing | Need testing | Need testing |
| Unreal                | In progress     | In progress | In progress | Planned      | Planned      | Planned      |
| Godot                 | Planned         | Planned     | Planned     | Planned      | Planned      | Planned      |

### Proprietary Engine

| Language | Support |
| -------- | ------- |
| C++      | Planned |
| C#       | Planned |

### Client Language

| Language                               | Support |
| -------------------------------------- | ------- |
| [Typescript](client/typescript/gamium) | ✅      |
| [Python](client/python/gamium)         | ✅      |
| C#                                     | Planned |

## Getting Started

- Please refer to the [Get Started](https://gamium.dogutech.io/docs/get-started/introduction)

## Resources

[Documentation](https://gamium.dogutech.io)  
[Blog](https://blog.dogutech.io/tag/gamium/)

## Infra

If you want to build game test automation infra such as device farm, reporting test, test pipeline then you can use our TestOps service

[TestOps Platform](https://dogutech.io)

## Contributing

If you are interested in reporting/fixing issues and contributing directly to the code base, please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## License

Gamium is [MIT licensed](LICENSE)
