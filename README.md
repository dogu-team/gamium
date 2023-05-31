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
You can simulate input into the game,  
You can also call specific functions.

## Philosophy

As various platforms emerge, the number of things to test is increasing. Accordingly, the mobile app automation framework is used universally, but in the case of games, there are many projects where tests are not yet automated.

We want to solve this problem and develop automation library with multi-engine support through the same interface.
The interface we provide is inspired by Selenium and Playwright.

## Demo

<img src=".github/resources/gamium-dogurpgsample_demo.gif"  title="Demo"/>

## Support List

### Engine

| Engine                             | Windows / Mac | Android     | iOS         | Xbox         | PS           | Switch       |
| ---------------------------------- | ------------- | ----------- | ----------- | ------------ | ------------ | ------------ |
| [Unity](https://unity.com)         | ✅            | ✅          | ✅          | Need testing | Need testing | Need testing |
| [Unreal](https://unrealengine.com) | In progress   | In progress | In progress | Planned      | Planned      | Planned      |
| [Godot](https://godotengine.org/)  | Planned       | Planned     | Planned     | Planned      | Planned      | Planned      |

### Client Language

| Language                                         | Supported |
| ------------------------------------------------ | --------- |
| [Typescript](https://www.typescriptlang.org/)    | ✅        |
| [Python](https://www.python.org/)                | ✅        |
| [C#](https://learn.microsoft.com/dotnet/csharp/) | Planned   |

## Getting Started

- Please refer to the [Get Started](https://gamium.dogutech.io/docs/get-started/introduction)

## Stay in touch

- Author - [Dogu Technologies](https://dogutech.io)
- [Documentation](https://gamium.dogutech.io/docs/get-started/introduction)

## Game Test Automation Infra

If you want to build game test automation infra such as device farm, reporting test, test pipeline then you can use our TestOps service

☁️ - [Dogu Cloud TestOps](https://dogutech.io)  
📖 - [Dogu Docs](https://docs.dogutech.io)

## Contributing

If you are interested in reporting/fixing issues and contributing directly to the code base, please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## License

Gamium is [MIT licensed](LICENSE)
