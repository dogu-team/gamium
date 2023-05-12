<p align="center">
<img src="https://s3.ap-northeast-2.amazonaws.com/public.dogutech.io/dogu/logo/dogu-gamium-logo.png" width="100px" height="100px" title="Gamium_Logo"/>
</p>
<p align="center">
Gamium
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

We want to solve this problem and develop engine-agnostic automation libraries through the same interface.
The interface we provide is inspired by Playwright, Selenium.

## Support List

### Engine

| Engine | Supported   |
| ------ | ----------- |
| Unity  | ✅          |
| Unreal | Coming soon |
| Godot  | Coming soon |

### Client Language

| Language   | Supported   |
| ---------- | ----------- |
| Typescript | ✅          |
| Python     | Coming soon |
| C#         | Coming soon |

## Getting Started

### Prerequisites

- node >= 16.0.0
- npm
- yarn

### Installation

- clone this repository and enter the directory
- set yarn version

```code
npm install --location=global yarn
yarn set version 3.2.3
```

- build workspace

```code
yarn install
yarn build
```

### First Connection

#### Android

#### Windows

## Stay in touch

- Author - [Dogu Technologies](https://dogutech.io)
- Documentation - [https://docs.dogutech.io/gamium/introduction](https://docs.dogutech.io/gamium/introduction)

## License

Gamium is [MIT licensed](LICENSE)
