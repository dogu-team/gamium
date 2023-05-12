<p align="center">
<img src="https://github.com/dogu-team/gamium/assets/22186124/21b93839-57a2-48a4-b32a-bd48a626dfe4" width="100px" height="100px" title="Gamium_Logo"/>
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

## Demo

![example](https://github.com/dogu-team/gamium/assets/22186124/ccfbee35-452f-4497-a27f-8b86f612cc5d)

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

// ffmpeg cli convert mp4 to gif
ffmpeg -i input.mp4 -vf "fps=10,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" output.gif
