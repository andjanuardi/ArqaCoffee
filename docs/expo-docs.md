# Expo Documentation (SDK v54)

Scraped from https://docs.expo.dev

---


---

## Create a project
Source: https://docs.expo.dev/get-started/create-a-project/

Learn how to create a new Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo is a React Native framework that makes developing Android and iOS apps easier. Our framework provides file-based routing, a standard library of native modules, and much more. Expo is open source with an active community on [GitHub](https://github.com/expo/expo) and [Discord](https://chat.expo.dev).

We also make [Expo Application Services (EAS)](https://expo.dev/eas), a set of services that complement the Expo framework in each step of the development process.

> **New to programming?** You can build your first Expo app by prompting an AI coding agent instead of writing code. Follow the [Build with AI tutorial](/tutorial/build-with-ai/introduction). It covers setup from scratch.

## System requirements

-   [Node.js (LTS)](https://nodejs.org/en/).
-   macOS, Windows (Powershell and [WSL 2](https://expo.fyi/wsl)), and Linux are supported.

We recommend starting with the default project created by `create-expo-app`. The default project includes example code to help you get started.

To create a new project, run the following command:

```sh
# npm
npx create-expo-app@latest --template default@sdk-56

# yarn
yarn create expo-app --template default@sdk-56

# pnpm
pnpm create expo-app --template default@sdk-56

# bun
bun create expo --template default@sdk-56
```

> **Note:** During the SDK 56 transition period, `create-expo-app@latest` without the `--template` flag creates an SDK 54 project. If you plan to use Expo Go on a physical device, use an SDK 54 project. Otherwise, use `--template default@sdk-56` to create an SDK 56 project. You can also choose a different template by adding the [`--template` option](/more/create-expo#--template).

## Next step

You have a project. Now it's time to set up your development environment so that you can start developing.

---

## Next steps
Source: https://docs.expo.dev/get-started/next-steps/

Develop, review, and submit your project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Here are next steps to continue building your app:

### Reset your project

You can remove the boilerplate code and start fresh with a new project. Run the following command to reset your project:

```sh
# npm
npm run reset-project

# yarn
yarn run reset-project

# pnpm
pnpm run reset-project

# bun
bun run reset-project
```

This command will move the existing files in **app** to **app-example**, then create a new **app** directory with a new **index.tsx** file.

### Develop, review, and deploy

Learn how to develop by reading the docs in the Develop section. You'll learn how to create [UI elements](/develop/user-interface/splash-screen-and-app-icon), add [unit tests](/develop/unit-testing), include [native modules](/config-plugins/introduction), and more.

Once you've developed your app, you can share it with your teammates for [review](/review/overview).

Finally, you can [build](/deploy/build-project) and [submit](/deploy/submit-to-app-stores) your project to the app stores.

### Step-by-step guide

For a guided, step-by-step walkthrough of building an app with Expo from start to finish, check out the [tutorial](/tutorial/introduction).

---

## Set up your environment
Source: https://docs.expo.dev/get-started/set-up-your-environment/

Learn how to set up your development environment to start building with Expo.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Let's set up a local development environment for running your project on Android and iOS.

## Where would you like to develop?

We recommend using a real device to develop, since you'll get to see exactly what your users will see.

## How would you like to develop?

Expo Go is a playground for students and learners to try Expo quickly. A development build is a build of your own app that includes Expo's developer tools.

## Android device with Expo Go

### Set up an Android device with Expo Go

Scan the QR code to download the app from the Google Play Store, or visit the Expo Go page on the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=docs).

  Download link: [https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=docs](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=docs)

---

## Android device with a development build (EAS)

### Set up an Android device with a development build

#### Install EAS CLI

To build your app, you will need to install EAS CLI. You can do this by running the following command in your terminal:

```sh
npm install --global eas-cli
yarn global add eas-cli
pnpm add --global eas-cli
bun add --global eas-cli
```

#### Create an Expo account and login

To build your app, you will need to create an Expo account and login to the EAS CLI.

1. [Sign up](https://expo.dev/signup) for an Expo account.
2. Run the following command in your terminal to log in to the EAS CLI:

```sh
eas login
```

#### Configure your project

Run the following command to create an EAS config in your project:

```sh
eas build:configure
```

#### Create a build

Run the following command to create a development build:

```sh
eas build --platform android --profile development
```

#### Install the development build on your device

After the build is complete, scan the QR code in your terminal or open the link on your device. Tap **Install** to download the build on your device, then tap **Open** to install it.

---

## Android device with a development build (local)

### Set up an Android device with a development build

### Install Watchman and JDK

##### macOS

##### Prerequisites

Use a package manager such as [Homebrew](https://brew.sh/) to install the following dependency.

##### Install dependencies

[Install Watchman](https://facebook.github.io/watchman/docs/install#macos) using a tool such as Homebrew:

```sh
brew install watchman
```

Install OpenJDK distribution called Azul Zulu using Homebrew. This distribution offers JDKs for both Apple Silicon and Intel Macs.

Run the following commands in a terminal:

```sh
brew install --cask zulu@17
```

After you install the JDK, add the `JAVA_HOME` environment variable in **~/.bash_profile** (or **~/.zshrc** if you use Zsh):

```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

##### Windows

##### Prerequisites

Use a package manager such as [Chocolatey](https://chocolatey.org/) to install the following dependencies.

##### Install dependencies

Install [Java SE Development Kit (JDK)](https://openjdk.org/):

```sh
choco install -y microsoft-openjdk17
```

##### Linux

##### Install dependencies

Follow [instructions from the Watchman documentation](https://facebook.github.io/watchman/docs/install#linux) to compile and install it from the source.

Install [Java SE Development Kit (JDK)](https://openjdk.org/):

You can download and install [OpenJDK@17](http://openjdk.java.net/) from [AdoptOpenJDK](https://adoptopenjdk.net/) or your system packager.

### Set up Android Studio

##### macOS

Download and install [Android Studio](https://developer.android.com/studio).

Open the **Android Studio** app. On the first launch, the **Android Studio Setup Wizard** appears. Click **Next** on the **Welcome** screen. Then, under **Install Type**, select **Standard** and click **Next**.

Verify the settings and click **Next**. Then, accept the license agreement and click **Next** again. The wizard downloads and installs the Android SDK and its tools. Click **Finish** when the installation completes.

By default, Android Studio will install the latest version of the Android SDK. However, Android 16 (`Baklava`) SDK is required to compile a React Native app.

Open Android Studio, go to **Settings** > **Languages & Frameworks** > **Android SDK**. From the **SDK Platforms** tab, and under **Android 16 (`Baklava`)**, select **Android SDK Platform 36** and **Sources for Android 36**.

Then, click on the **SDK Tools** tab and make sure you have at least one version of the **Android SDK Build-Tools** and **Android Emulator** installed.

Copy or remember the path listed in the box that says **Android SDK Location**.

Add the following lines to your **/.zprofile** or **~/.zshrc** (if you are using bash, then **~/.bash_profile** or **~/.bashrc**) config file:

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Reload the path environment variables in your current shell:

```sh
source $HOME/.zshrc
source $HOME/.bashrc
```

Finally, make sure that you can run `adb` from your terminal.

**Troubleshooting: Android Studio not recognizing JDK**

If Android Studio doesn't recognize your homebrew installed JDK, you can create a Gradle configuration file to explicitly set the Java path:

1.  Create a Gradle properties file in your home directory:

```sh
touch ~/.gradle/gradle.properties
```

2.  Add the following line to the **gradle.properties** file, replacing the path with your actual Java installation path:

    ```bash gradle.properties
    java.home=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
    ```

3.  If you have an existing `.gradle` folder in your project directory, delete it and reopen your project in Android Studio:

```sh
rm -rf .gradle
```

This should resolve issues with Android Studio not detecting your JDK installation.

##### Windows

Download [Android Studio](https://developer.android.com/studio).

Open **Android Studio Setup**. Under **Select components to install**, select Android Studio and Android Virtual Device. Then, click **Next**.

In the Android Studio Setup Wizard, under **Install Type**, select **Standard** and click **Next**.

The Android Studio Setup Wizard will ask you to verify the settings, such as the version of Android SDK, platform-tools, and so on. Click **Next** after you have verified.

In the next window, accept licenses for all available components.

By default, Android Studio will install the latest version of the Android SDK. However, Android 16 (`Baklava`) SDK is required to compile a React Native app.

Open Android Studio, go to **Settings** > **Languages & Frameworks** > **Android SDK**. From the **SDK Platforms** tab, and under **Android 16 (`Baklava`)**, select **Android SDK Platform 36** and **Sources for Android 36**.

Then, click on the **SDK Tools** tab and make sure you have at least one version of the **Android SDK Build-Tools** and **Android Emulator** installed.

After the tools installation is complete, configure the `ANDROID_HOME` environment variable. Go to **Windows Control Panel** > **User Accounts** > **User Accounts** (again) > **Change my environment variables** and click **New** to create a new `ANDROID_HOME` user variable.

To find the location of the SDK in Android Studio manually, go to **Settings** > **Languages & Frameworks** > **Android SDK**.

By default, the Android SDK is installed at:

```bash
%LOCALAPPDATA%\Android\Sdk
```

Finally, make sure that you can run `adb` from the PowerShell.

### Running your app on an Android device

#### Install expo-dev-client

```sh
npx expo install expo-dev-client
```

#### Enable debugging over USB

To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to **Settings** > **About phone** > **Software information** and then tapping the `Build number` row at the bottom seven times.

#### Plug in your device via USB

Check that your device is properly connecting to ADB by running `adb devices`.

#### Run your app

```sh
npx expo run:android
```

> This command runs a development server after building your app.

---

## Android Emulator with Expo Go

### Set up an Android Emulator with Expo Go

### Set up Android Studio

##### macOS

Download and install [Android Studio](https://developer.android.com/studio).

Open the **Android Studio** app. On the first launch, the **Android Studio Setup Wizard** appears. Click **Next** on the **Welcome** screen. Then, under **Install Type**, select **Standard** and click **Next**.

By default, Android Studio will install the latest version of the Android SDK. However, Android 16 (`Baklava`) SDK is required to compile a React Native app.

Open Android Studio, go to **Settings** > **Languages & Frameworks** > **Android SDK**. From the **SDK Platforms** tab, and under **Android 16 (`Baklava`)**, select **Android SDK Platform 36** and **Sources for Android 36**.

Add the following lines to your shell config file:

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Set up an emulator

On the Android Studio main screen, click **More Actions**, then **Virtual Device Manager** in the dropdown.

Click **Create virtual device**. Under **Add device**, choose the type of hardware you'd like to emulate.

### Install Expo Go

When you start a development server with `npx expo start`, press <kbd>A</kbd> to open the Android Emulator. Expo CLI will install Expo Go automatically.

---

## Android Emulator with a development build (EAS)

### Set up an Android Emulator with a development build

Follow the same Android Studio setup steps as above.

### Create a development build

#### Install EAS CLI

```sh
npm install --global eas-cli
```

#### Create an Expo account and login

```sh
eas login
```

#### Configure your project

```sh
eas build:configure
```

#### Create a build

```sh
eas build --platform android --profile development
```

#### Install the development build on your emulator

After the build is complete, the CLI will prompt you to automatically download and install it on the Android Emulator.

---

## Android Emulator with a development build (local)

### Running your app on an Android Emulator

#### Install expo-dev-client

```sh
npx expo install expo-dev-client
```

Run the following:

```sh
npx expo run:android
```

---

## iOS device with Expo Go

### Set up an iOS device with Expo Go

#### Enroll in the Apple Developer Program

Sign up for the [Apple Developer Program here](https://developer.apple.com/programs/).

#### Build Expo Go for iOS

```sh
npx eas-cli@latest go
```

#### Install TestFlight

Download and install the [TestFlight app](https://apps.apple.com/us/app/testflight/id899247664).

#### Add yourself as a tester

Go to App Store Connect, select the Expo Go app, navigate to the TestFlight tab, and add your Apple ID email as an internal tester.

---

## iOS device with a development build (EAS)

#### Enroll in the Apple Developer Program

#### Install EAS CLI

```sh
npm install --global eas-cli
```

#### Create an Expo account and login

```sh
eas login
```

#### Configure your project

```sh
eas build:configure
```

#### Create an ad hoc provisioning profile

```sh
eas device:create
```

#### Create a development build

```sh
eas build --platform ios --profile development
```

#### Turn on developer mode

Open **Settings** > **Privacy & Security**, scroll down to the **Developer Mode** list item and enable it.

---

## iOS device with a development build (local)

### Set up Xcode and Watchman

#### Install Xcode

From the Mac App Store.

#### Install Watchman

```sh
brew update
brew install watchman
```

### Configure your project

#### Install expo-dev-client

```sh
npx expo install expo-dev-client
```

#### Run the project on your device

```sh
npx expo run:ios --device
```

---

## iOS Simulator with Expo Go

### Set up Xcode

#### Install Xcode

#### Install Watchman

```sh
brew update
brew install watchman
```

### Install Expo Go

When you start a development server with `npx expo start`, press <kbd>I</kbd> to open the iOS Simulator. Expo CLI will install Expo Go automatically.

---

## iOS Simulator with a development build (EAS)

### Set up Xcode

### Create a development build

```sh
npm install --global eas-cli
eas login
eas build:configure
```

Adjust your build profile in **eas.json** to set the `ios.simulator` property to `true`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    }
  }
}
```

```sh
eas build --platform ios --profile development
```

---

## iOS Simulator with a development build (local)

### Running your app on an iOS Simulator

#### Install expo-dev-client

```sh
npx expo install expo-dev-client
```

Run the following:

```sh
npx expo run:ios
```

## Next step

You have a project and a development environment. Now it's time to start developing.

---

## Start developing
Source: https://docs.expo.dev/get-started/start-developing/

Make your first change to an Expo project and see it live on your device.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Start a development server

```sh
npx expo start
```

## Open the app on your device

Scan the QR code in your terminal. If using an Android Emulator or iOS Simulator, press A or I respectively.

Having problems? Use the Tunnel connection type:

```sh
npx expo start --tunnel
```

## Make your first change

Open the **src/app/index.tsx** file and make a change:

```diff
- Welcome to Expo
+ Hello World!
```

## File structure

The default project has a file-based routing structure in **src/app/** with routes defined by files.

## Features

The default project template includes file-based routing with two screens: **src/app/index.tsx** and **src/app/explore.tsx**.

---

## Claude Code and Expo
Source: https://docs.expo.dev/agents/claude/

Use Claude Code to build, upgrade, debug, and deploy your Expo and React Native projects.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Claude Code is Anthropic's terminal-based AI coding agent. It can understand your entire codebase, propose edits, run terminal commands, and manage git operations. Expo projects created with `create-expo-app` are scaffolded with files for Claude Code through **CLAUDE.md** and **.claude/settings.json**.

## Quick start

### Install Claude Code

```sh
curl -fsSL https://claude.ai/install.sh | bash
```

### Create a new Expo project

```sh
npx create-expo-app@latest --template default@sdk-56
```

### Set up Expo Skills and the Expo MCP Server

[Expo Skills](/skills#install-expo-skills) — Install the plugin that teaches agents known-good Expo patterns.

[Expo MCP Server](/mcp#installation-and-setup) — Connect the remote Expo MCP Server to give agents live access to Expo documentation and EAS.

### Open your project and start prompting

```sh
cd my-app
claude
```

## How Claude Code reads your Expo project

When you start Claude Code in your project, it reads **CLAUDE.md** which contains `@AGENTS.md`. **AGENTS.md** points Claude Code to the documentation for your project's Expo SDK version.

**Example prompts**: Upgrade the SDK, Add navigation, Automate builds, Debug a build, Add notifications, Set up CI/CD, Add native UI, Check feedback, Verify the UI.

## Troubleshooting

If you see "Plugin 'expo' is enabled in project settings but isn't installed here", run:

```sh
claude plugin install expo@claude-plugins-official
```

---

## Codex and Expo
Source: https://docs.expo.dev/agents/codex/

Use Codex to build, upgrade, debug, and deploy your Expo and React Native projects.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Codex is OpenAI's terminal-based AI coding agent. It can read and write files across your project, run terminal commands, and browse the web. Expo projects created with `create-expo-app` are scaffolded with an **AGENTS.md** file that Codex reads directly.

## Quick start

### Install Codex

```sh
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

### Create a new Expo project

```sh
npx create-expo-app@latest --template default@sdk-56
```

### Set up Expo Skills and the Expo MCP Server

### Open your project and start prompting

```sh
cd my-app
codex
```

## How Codex reads your Expo project

When you start Codex in your project, it reads the scaffolded **AGENTS.md** file. This file points Codex to the documentation for your project's Expo SDK version.

**Example prompts**: Upgrade the SDK, Add navigation, Automate builds, Debug a build, Add notifications, Set up CI/CD, Add native UI, Check feedback, Verify the UI.

---

## Cursor and Expo
Source: https://docs.expo.dev/agents/cursor/

Use Cursor to build, upgrade, debug, and deploy your Expo and React Native projects.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Cursor is an AI-first code editor built on VS Code. Expo projects created with `create-expo-app` are scaffolded with an **AGENTS.md** file that Cursor reads directly.

## Quick start

Download and install Cursor from the [Cursor website](https://cursor.com).

### Create a new Expo project

```sh
npx create-expo-app@latest --template default@sdk-56
```

### Set up Expo Skills and the Expo MCP Server

### Open your project and start prompting

Open your project in Cursor, then open the Agent panel.

## How Cursor reads your Expo project

When you open your project in Cursor, it reads the scaffolded **AGENTS.md** file. You can also add Cursor-specific rules under **.cursor/rules/**.

**Example prompts**: Upgrade the SDK, Add navigation, Automate builds, Debug a build, Add notifications, Set up CI/CD, Add native UI, Check feedback, Verify the UI.

---

## Using Model Context Protocol (MCP) with Expo
Source: https://docs.expo.dev/mcp/

A guide on integrating Model Context Protocol with Expo projects to enhance AI model capabilities.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is a standard protocol that allows AI models to integrate with external data sources. Expo MCP Server is a remote MCP server hosted by Expo that integrates with popular AI-assisted tools.

## What does Expo MCP Server do?

- **Learn about developing with Expo** — Fetch the latest Expo documentation.
- **Manage dependencies** — Uses `npx expo install` for compatible versions.
- **Manage builds and workflows** — Trigger and monitor EAS builds, run workflows, pull crash data.
- **Automate visual verification** — Take screenshots, tap views, find elements.

## Installation and setup

- **Server type**: Streamable HTTP
- **URL**: `https://mcp.expo.dev/mcp`
- **Authentication**: OAuth

### Claude Code setup

```sh
claude mcp add --transport http expo https://mcp.expo.dev/mcp
```

### VS Code setup

Open Command Palette, run **MCP: Add Server**, select **HTTP**, enter URL.

### Codex setup

```sh
codex mcp add expo --url https://mcp.expo.dev/mcp
```

### Authenticate with Expo

Generate a Personal access token from your Expo account settings.

### Set up local capabilities (SDK 54 and later)

```sh
npx expo install expo-mcp --dev
EXPO_UNSTABLE_MCP_SERVER=1 npx expo start
```

## Server capabilities vs Local capabilities

- **Server capabilities**: Available with just the remote MCP server connection.
- **Local capabilities**: Require a local Expo development server (screenshots, DevTools, sitemap).

## Available MCP capabilities

Includes tools for: `add_library`, `search_documentation`, `read_documentation`, `learn`, `workflow_create/info/list/logs/run/cancel/validate`, `build_list/info/logs/submit/run/cancel`, `testflight_crashes/feedback`, `expo_router_sitemap`, `open_devtools`, `collect_app_logs`, `automation_tap/take_screenshot/find_view`.

## Data privacy

Expo does not use data sent to Expo MCP Server to train AI models. Expo MCP Server does not run an AI model itself.

---

## Expo Skills for AI agents
Source: https://docs.expo.dev/skills/

A list of official AI agent skills provided by Expo for building, deploying, and debugging Expo and React Native apps.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo Skills are structured instruction files that teach AI agents how to build, deploy, and debug Expo and React Native apps accurately and efficiently.

## Install Expo Skills

```sh
/plugin install expo@claude-plugins-official
```

## Available Expo Skills

| Skill | Description |
| --- | --- |
| `add-app-clip` | Add an iOS App Clip target to an Expo app. |
| `building-native-ui` | Complete guide for building beautiful apps with Expo Router. |
| `eas-update-insights` | Check the health of published EAS Updates. |
| `expo-api-routes` | Guidelines for creating API routes in Expo Router with EAS Hosting. |
| `expo-brownfield` | Integrate Expo into an existing native app. |
| `expo-cicd-workflows` | Helps understand and write EAS workflow YAML files. |
| `expo-deployment` | Deploying Expo apps to app stores and web. |
| `expo-dev-client` | Build and distribute Expo development clients. |
| `expo-module` | Guide for creating Expo native modules. |
| `expo-observe` | Use for anything related to EAS Observe. |
| `expo-tailwind-setup` | Set up Tailwind CSS v4 in Expo. |
| `expo-ui-jetpack-compose` | Use Jetpack Compose Views in your app. |
| `expo-ui-swift-ui` | Use SwiftUI Views in your app. |
| `native-data-fetching` | For network requests, API calls, or data fetching. |
| `upgrading-expo` | Guidelines for upgrading Expo SDK versions. |
| `use-dom` | Use Expo DOM components to run web code in a webview. |

## Example prompts

"Build a settings screen", "Set up Tailwind CSS", "Embed a recharts chart", "Add a SwiftUI picker", "How do I deploy to the Apple App Store?", "Create a CI/CD workflow", "Upgrade my project to the latest Expo SDK".

---

## Navigation in Expo and React Native apps
Source: https://docs.expo.dev/develop/app-navigation/

Learn about the recommended approach for integrating navigation in an Expo and React Native project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## React Navigation

React Navigation is a component-based navigation library that lets you compose stack, tab, and drawer navigators entirely in code. It offers platform-specific look-and-feel, unified mobile and web routing, automatic deep links, and typed routes.

[React Navigation: Getting started](https://reactnavigation.org/docs/getting-started)

## Expo Router (recommended for Expo projects)

Expo Router is a file-based routing library for Expo and React Native projects. By following the **app** directory convention, it turns files into routes. Features include typed routes, dynamic routes, lazy bundling in development, static rendering for the web, and automatic deep linking.

New Expo projects created with the default template include Expo Router by default.

[Introduction to Expo Router](/router/introduction) — [Installation](/router/installation) — [Core concepts](/router/basics/core-concepts)

---

## Authentication in Expo and React Native apps
Source: https://docs.expo.dev/develop/authentication/

Learn about setting up authentication in your Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Authentication is a critical part of 90 to 95 percent of modern apps.

## Navigation auth flow

Use Expo Router's protected routes (v5+) or redirects to separate public screens from protected screens.

## Email and password

Popular option. Services: Clerk, Supabase, Cognito, Firebase, Better Auth.

## Passwordless login

Magic links or one-time passcodes (OTP). Deep linking required for magic links.

## OAuth 2.0

Implement using Expo Router API Routes and Expo AuthSession. Works with Google, Apple, GitHub, and more.

## Auth solutions

Better Auth, Clerk, Supabase, Cognito, Firebase Auth.

## Modern methods

Biometrics (Face ID, Touch ID) and Passkeys.

---

## Databases in Expo and React Native apps
Source: https://docs.expo.dev/develop/database/

Learn about adding a database to your Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Convex

TypeScript-based database with real-time updates over WebSocket.

[Using Convex](/guides/using-convex)

## Supabase

Hosted backend services: Postgres database, user authentication, file storage, edge functions, realtime syncing.

[Using Supabase](/guides/using-supabase)

## Firebase

Hosted backend services: real-time database, cloud storage, authentication, crash reporting, analytics.

[Using Firebase](/guides/using-firebase)

---

## Create a development build on EAS
Source: https://docs.expo.dev/develop/development-builds/create-a-build/

Learn how to create development builds for a project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Prerequisites

Requires an existing Expo project. Build options: EAS (easiest), Local with EAS CLI, Local without EAS.

## Get started

### Install expo-dev-client

```sh
npx expo install expo-dev-client
```

### Build the native app (Android)

```sh
eas build --platform android --profile development
```

### Build the native app (iOS Simulator)

Edit `eas.json` to set `ios.simulator: true`, then:

```sh
eas build --platform ios --profile development
```

### Build the native app (iOS device)

```sh
eas build --platform ios --profile development
```

### Start the bundler

```sh
npx expo start
```

---

## Tools, workflows and extensions
Source: https://docs.expo.dev/develop/development-builds/development-workflows/

Learn more about different tools, workflows and extensions available when working with development builds.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Tools

Tunnel URLs, Published updates (EAS Update), Deep linking to updates, QR codes.

## Example workflows

PR previews — set up CI to publish an EAS Update whenever a PR is updated.

## Extensions

Extend the dev menu with `registerDevMenuItems` API. EAS Update extension provides the ability to view and load published updates.

## Set runtimeVersion in app config

Set `runtimeVersion` in app config to enforce an API contract between JavaScript and native layers.

---

## Switch from Expo Go to a development build
Source: https://docs.expo.dev/develop/development-builds/expo-go-to-dev-build/

How to switch from your Expo Go project to use development builds.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Install the expo-dev-client

```sh
npx expo install expo-dev-client
```

## Build your native app

Option 1: Build on your local machine (`npx expo run:android|ios`).
Option 2: Build on EAS.

## Start the bundler

```sh
npx expo start
```

## Prebuild

Generate **android** and **ios** directories based on your configuration. Run `npx expo prebuild --clean` when changing native dependencies.

---

## Introduction to development builds
Source: https://docs.expo.dev/develop/development-builds/introduction/

Why use development builds and how to get started.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

**Development build** is a "Debug" build of an app that includes the `expo-dev-client` library.

## Why use a development build

- Use libraries with native code not in Expo Go
- Test changes in app icon, name, splash screen
- Remote push notifications
- Implementing App/Universal links
- Open projects using older SDKs (iOS device only)

---

## Next steps (Development Builds)
Source: https://docs.expo.dev/develop/development-builds/next-steps/

A list of useful resources to learn more about development builds and EAS Build.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Configuring EAS Build with eas.json](/build/eas-json)
[Environment variables](/guides/environment-variables)
[Android build process](/build-reference/android-builds)
[iOS build process](/build-reference/ios-builds)
[Set up EAS Build with a monorepo](/build-reference/build-with-monorepos)

---

## Share a development build with your team
Source: https://docs.expo.dev/develop/development-builds/share-with-your-team/

Learn how to install and share the development with your team or run it on multiple devices.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Share the URL

A shareable URL is generated for your build. Use with teammates or test devices.

### Use the EAS dashboard

Direct teammates to the build page in the EAS dashboard.

### Use EAS CLI

```sh
eas build:run --profile development
```

## Next steps

[Install multiple app variants](/build-reference/variants)
[Sharing pre-release versions](/build/internal-distribution)

---

## Use a development build
Source: https://docs.expo.dev/develop/development-builds/use-development-builds/

Learn how to use development builds for a project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Start the development server

```sh
npx expo start
```

Press A or I for emulators, or scan QR code on a physical device.

## The launcher screen

If a bundler is detected on your local network, you can connect to it directly.

## Rebuild a development build

Rebuild if you add a library with native code (e.g., `expo-secure-store`).

## Debug a development build

Press Cmd + D or Ctrl + D, or shake your device.

---

## Tools for development
Source: https://docs.expo.dev/develop/tools/

An overview of Expo tools and websites that will help you during various aspects of your project-building journey.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Expo CLI

Installed automatically with the `expo` package. Common commands: `npx expo start`, `npx expo prebuild`, `npx expo run:android|ios`, `npx expo install`, `npx expo lint`.

## EAS CLI

Used to log in to your Expo account and compile your app using EAS services.

```sh
npm install --global eas-cli
```

## Expo Doctor

Diagnoses issues in your Expo project.

```sh
npx expo-doctor
```

## Orbit

macOS, Windows, and Linux app for installing and launching builds from EAS.

```sh
brew install expo-orbit
```

## Expo Tools for VS Code

VS Code extension for autocomplete and intellisense in app config files.

## Test prototypes with Snack and Expo Go

Snack: in-browser development environment at [snack.expo.dev](https://snack.expo.dev/).

## React Native directory

[reactnative.directory](https://reactnative.directory/) — searchable database for React Native libraries.

---

## Unit testing with Jest
Source: https://docs.expo.dev/develop/unit-testing/

Learn how to set up and configure the jest-expo library to write unit and snapshot tests for a project with Jest.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Installation and configuration

```sh
npx expo install jest-expo jest @types/jest --dev
```

Add to **package.json**:

```json
{
  "scripts": { "test": "jest --watchAll" },
  "jest": { "preset": "jest-expo" }
}
```

## Install React Native Testing Library

```sh
npx expo install @testing-library/react-native --dev
```

## Unit test

Create `__tests__` directory and test files. Use `render` and `getByText` from testing library.

## Snapshot test

Use `toJSON()` and `toMatchSnapshot()` for snapshot testing.

## Code coverage reports

Configure `collectCoverage` and `collectCoverageFrom` in jest config.

---

## Animation
Source: https://docs.expo.dev/develop/user-interface/animation/

Learn how to integrate React Native animations and use it in your Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Installation

```sh
npx expo install react-native-reanimated
```

## Usage

Use `useSharedValue`, `withTiming`, `useAnimatedStyle` from `react-native-reanimated`.

## Other animation libraries

Moti, and others work with Expo.

---

## Assets
Source: https://docs.expo.dev/develop/user-interface/assets/

Learn about using static assets in your project, including images, videos, sounds, database files, and fonts.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Serve an asset locally

```tsx
<Image source={require('./assets/images/example.png')} />
```

### Load at build time with expo-asset config plugin

Embed asset files in your native project.

### Load at runtime with useAssets hook

```tsx
const [assets, error] = useAssets([require('path/to/example.jpg')]);
```

## Serve an asset remotely

```tsx
<Image source={{ uri: 'https://example.com/logo.png' }} />
```

## Additional information

Manual optimization methods for images (guetzli, pngcrush, optipng).

---

## Color themes
Source: https://docs.expo.dev/develop/user-interface/color-themes/

Learn how to support light and dark modes in your app.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Configuration

Use `userInterfaceStyle` property in app config:

```json
{
  "expo": {
    "userInterfaceStyle": "automatic"
  }
}
```

## Detect the color scheme

Use `useColorScheme()` from `react-native`.

## Supported appearance styles

`automatic`, `light`, `dark`.

## Tips

Android Emulator: `adb shell "cmd uimode night yes"`. iOS Simulator: Cmd + Shift + A.

---

## Fonts
Source: https://docs.expo.dev/develop/user-interface/fonts/

Learn how to integrate custom fonts in your app using local files or Google Font packages.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Add a custom font

Two ways: local font file or Google Font package.

### Supported font formats

OTF and TTF officially supported across Android, iOS, and web.

## Use a local font file

### With expo-font config plugin (recommended for dev builds)

### With useFonts hook (works with Expo Go)

## Use Google Fonts

Install `@expo-google-fonts/inter` package and use either the config plugin or `useFonts` hook.

## Additional information

Platform built-in fonts, handling `@expo/vector-icons` initial load, loading remote fonts.

---

## Next steps (UI)
Source: https://docs.expo.dev/develop/user-interface/next-steps/

A list of useful resources to learn more about implementing navigation and UI in your app.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Use TypeScript](/guides/typescript)
[Icons](/guides/icons)
[ESLint and Prettier](/guides/using-eslint)

---

## Safe areas
Source: https://docs.expo.dev/develop/user-interface/safe-areas/

Learn how to add safe areas for screen components inside your Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Use react-native-safe-area-context library

### Installation

```sh
npx expo install react-native-safe-area-context
```

### Usage

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';
```

## Alternate: useSafeAreaInsets hook

```tsx
const insets = useSafeAreaInsets();
```

## Usage with React Navigation

React Navigation supports safe areas by default.

---

## Splash screen and app icon
Source: https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/

Learn how to add a splash screen and app icon to your Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Splash screen

Use `expo-splash-screen` config plugin. Recommended: 1024x1024 .png with transparent background.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#232323",
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200
        }
      ]
    ]
  }
}
```

## App icon

Export as .png, save in **assets/images**. Configure in app config:

```json
{
  "icon": "./assets/images/icon.png"
}
```

### Android Adaptive Icon

Use `android.adaptiveIcon` with foreground, background, and monochrome images.

### iOS

Use Icon Composer to create a **.icon** directory, or provide a 1024x1024 .png.

---

## Store data
Source: https://docs.expo.dev/develop/user-interface/store-data/

Learn about different libraries available to store data in your Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

- **Expo SecureStore** — Encrypted key-value storage for tokens and secrets.
- **Expo FileSystem** — File system access for local storage.
- **Expo SQLite** — SQL database with WebSQL-like API.
- **Async Storage** — Unencrypted, persistent key-value storage.
- **Other libraries** — Browse [React Native directory](https://reactnative.directory/?search=storage).

---

## System bars
Source: https://docs.expo.dev/develop/user-interface/system-bars/

Learn how to handle and customize system bars for safe areas and edge-to-edge layout in your Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

System bars include the status bar, caption bar (Android), navigation bar, and home indicator (iOS).

## Handling overlaps using safe areas

Use `SafeAreaView` or `useSafeAreaInsets` from `react-native-safe-area-context`.

## Customizing system bars

### Status bar (expo-status-bar)

```tsx
import { StatusBar } from 'expo-status-bar';
<StatusBar style="light" />
```

### Navigation bar, Android only (expo-navigation-bar)

```tsx
import { NavigationBar } from 'expo-navigation-bar';
<NavigationBar style="dark" />
```

---

## Overview of distributing apps for review
Source: https://docs.expo.dev/review/overview/

Learn about how to distribute your app for review using app stores, internal distribution, and EAS Update.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## App store testing tracks

Google Play Beta and TestFlight for iOS.

## Internal distribution with EAS Build

Creates builds with shareable URLs. No need for forms or approval.

## Development builds and EAS Update

Publish updates with EAS Update. Can respond to feedback as quickly as running `eas update`.

---

## Share previews with your team
Source: https://docs.expo.dev/review/share-previews-with-your-team/

Share previews of your app with your team by publishing updates on branches.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Publish a preview of your changes

```sh
eas update --auto
```

## Share with your team

Share the EAS dashboard link from the output.

## Create previews automatically

Use EAS Workflows to publish on every commit.

---

## How to launch an update using Expo Orbit
Source: https://docs.expo.dev/review/with-orbit/

Learn how to open updates with Expo Orbit as part of a review workflow.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo Orbit is a macOS, Windows, and Linux app for installing and running builds from EAS.

Prerequisites: Install Orbit and sign in to your Expo account.

## Preview an update with Expo Orbit

Navigate to your project's Updates tab, select the update, click Preview, select a platform under Open with Orbit. Orbit will install and launch the update on the selected emulator.

---

## App stores metadata
Source: https://docs.expo.dev/deploy/app-stores-metadata/

A brief overview of how to use EAS Metadata to automate and maintain your app store presence.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

> EAS Metadata is in beta and currently only supports the Apple App Store.

## Create a store config

Use a **store.config.json** file at the root of your project:

```json
{
  "configVersion": 0,
  "apple": {
    "info": {
      "en-US": {
        "title": "Awesome App",
        "subtitle": "Your self-made awesome app",
        "description": "The most awesome app you have ever seen",
        "keywords": ["awesome", "app"],
        "marketingUrl": "https://example.com/en/promo",
        "supportUrl": "https://example.com/en/support",
        "privacyPolicyUrl": "https://example.com/en/privacy"
      }
    }
  }
}
```

## Upload the store config

```sh
eas metadata:push
```

---

## Build your project for app stores
Source: https://docs.expo.dev/deploy/build-project/

Learn how to create a production build for your app that is ready to be submitted to app stores from the command line using EAS Build.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Production builds using EAS

### eas.json configuration

```json
{
  "build": {
    "production": {}
  }
}
```

### Create a production build

```sh
eas build --platform android
eas build --platform ios
eas build --platform all
```

## Developer account

Google Play Developer membership ($25 USD one-time fee). Apple Developer Program membership ($99 USD/year).

## App signing credentials

EAS CLI can handle app signing credentials automatically.

## Create builds automatically

Use EAS Workflows to create builds on commits to specific branches.

---

## Send over-the-air updates
Source: https://docs.expo.dev/deploy/send-over-the-air-updates/

Learn how to send over-the-air updates to push critical bug fixes and improvements to your users.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Get started

```sh
eas update:configure
```

## Send an update

```sh
eas update --channel production
```

## Send updates automatically

Use EAS Workflows to send updates on every commit to `main`.

---

## Submit to app stores
Source: https://docs.expo.dev/deploy/submit-to-app-stores/

Learn how to submit your app to Google Play Store and Apple App Store from the command line with EAS Submit.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Apple App Store

Prerequisites: Apple Developer account, bundle identifier in app.json, EAS CLI, production build.

```sh
eas submit --platform ios
```

## Google Play Store

Prerequisites: Google Play Developer account, Google Service Account, app created on Google Play Console, EAS CLI, package name in app.json, production build, first manual upload.

```sh
eas submit --platform android
```

## Build and submit automatically

Use EAS Workflows to build and submit on every commit to `main`.

---

## Publish your web app
Source: https://docs.expo.dev/deploy/web/

Learn how to deploy your web app using EAS Hosting.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Prerequisite: Set `expo.web.output` to `static` or `server` in app.json.

## Export your web project

```sh
npx expo export --platform web
```

## Initial deployment

```sh
eas deploy
```

## Production deployment

```sh
eas deploy --prod
```

## Deploy automatically

Use EAS Workflows to deploy on every commit to `main`.

---

## Monitoring services
Source: https://docs.expo.dev/monitoring/services/

Learn how to monitor the usage of your Expo and React Native app after its release.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## EAS Insights

Tracks EAS Update adoption, app version, platform, and OS version.

## EAS Observe

Performance monitoring service for startup metrics, rendering performance, and user experience.

## LogRocket

Records user sessions and identifies bugs.

## Sentry

Crash reporting platform with real-time insights.

## Vexo

User analytics with heatmaps, session replays, and engagement tracking.

## BugSnag

Stability monitoring with error reporting and analytics.


---


---

## Android Studio Emulator
Source: https://docs.expo.dev/workflow/android-studio-emulator/

Learn how to set up the Android Emulator to test your app on a virtual Android device.

If you don't have an Android device available to test with, we recommend using the default emulator that comes with Android Studio. If you run into any problems setting it up, follow the steps in this guide.

### Install Watchman and JDK

#### Prerequisites
Use a package manager such as [Homebrew](https://brew.sh/) to install the following dependency.

#### Install dependencies
[Install Watchman](https://facebook.github.io/watchman/docs/install#macos) using a tool such as Homebrew:
```sh
brew install watchman
```
Install OpenJDK distribution called Azul Zulu using Homebrew. This distribution offers JDKs for both Apple Silicon and Intel Macs.
Run the following commands in a terminal:
```sh
brew install --cask zulu@17
```
After you install the JDK, add the `JAVA_HOME` environment variable in **~/.bash_profile** (or **~/.zshrc** if you use Zsh):
```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

### Set up Android Studio
Download and install [Android Studio](https://developer.android.com/studio).

Open the **Android Studio** app. On the first launch, the **Android Studio Setup Wizard** appears. Click **Next** on the **Welcome** screen. Then, under **Install Type**, select **Standard** and click **Next**.

Verify the settings and click **Next**. Then, accept the license agreement and click **Next** again. The wizard downloads and installs the Android SDK and its tools. Click **Finish** when the installation completes.

By default, Android Studio will install the latest version of the Android SDK. However, Android 16 (`Baklava`) SDK is required to compile a React Native app.

Open Android Studio, go to **Settings** > **Languages & Frameworks** > **Android SDK**. From the **SDK Platforms** tab, and under **Android 16 (`Baklava`)**, select **Android SDK Platform 36** and **Sources for Android 36**.

Then, click on the **SDK Tools** tab and make sure you have at least one version of the **Android SDK Build-Tools** and **Android Emulator** installed.

Copy or remember the path listed in the box that says **Android SDK Location**.

Add the following lines to your **/.zprofile** or **~/.zshrc** (if you are using bash, then **~/.bash_profile** or **~/.bashrc**) config file:
```sh
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Reload the path environment variables in your current shell:
```sh
source $HOME/.zshrc
source $HOME/.bashrc
```

Finally, make sure that you can run `adb` from your terminal.

Troubleshooting: Android Studio not recognizing JDK

If Android Studio doesn't recognize your homebrew installed JDK, you can create a Gradle configuration file to explicitly set the Java path:
1. Create a Gradle properties file in your home directory:
   ```sh
   touch ~/.gradle/gradle.properties
   ```
2. Add the following line to the **gradle.properties** file, replacing the path with your actual Java installation path:
   ```bash
   java.home=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
   ```
3. If you have an existing `.gradle` folder in your project directory, delete it and reopen your project in Android Studio:
   ```sh
   rm -rf .gradle
   ```

### Set up an emulator
On the Android Studio main screen, click **More Actions**, then **Virtual Device Manager** in the dropdown.
Click **Create virtual device**.
Under **Add device**, choose the type of hardware you'd like to emulate. We recommend testing against a variety of devices, but if you're unsure where to start, the newest device in the Pixel line could be a good choice.
Select an OS version to load on the emulator (probably one of the system images), and download the image (if required).
Change any other settings you'd like, and press **Finish** to create the emulator. You can now run this emulator anytime by pressing the Play button in the **Device Manager** window.

### Troubleshooting

#### Multiple `adb` versions
Having multiple `adb` versions on your system can result in the following error:
```sh
adb server version (xx) doesn't match this client (xx); killing...
```
This is because the `adb` version on your system is different from the `adb` version on the Android SDK platform-tools.

Open the terminal and check the `adb` version on the system:
```sh
adb version
```
And from the Android SDK platform-tool directory:
```sh
cd ~/Library/Android/sdk/platform-tools
./adb version
```
Copy `adb` from Android SDK directory to `usr/bin` directory:
```sh
sudo cp ~/Library/Android/sdk/platform-tools/adb /usr/bin
```

---

## Common development errors
Source: https://docs.expo.dev/workflow/common-development-errors/

A list of common development errors that are encountered by developers using Expo.

### Metro bundler ECONNREFUSED 127.0.0.1:19001
- An error is preventing the connection to your local development server.
- Run `rm -rf .expo` to clear your local state. Check for firewalls or [proxies](/troubleshooting/proxies) affecting the network you are currently connected to.

### Module AppRegistry is not a registered callable module (calling runApplication)
- An error in your code is preventing the JavaScript bundle from being executed on startup.
- Try running `npx expo start --no-dev --minify` to reproduce the production JS bundle locally. If possible, connect your device and access the device logs via Android Studio or Xcode. Device logs contain much more detailed stacktraces and information. Check to see if you have any changes or errors in your Babel configuration. In some rare cases, this issue could be caused by incompatibility between the Metro JavaScript minifier and certain code in your app.

### npm ERR! No git binary found in $PATH
- Either you do not have git installed or it is not properly configured in your `$PATH`.
- [Install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if you have not already. Otherwise, check how to set it in your `$PATH` based on your OS.

### XX.X.X is not a valid SDK version
- The SDK version you are running has been deprecated and is no longer supported.
- [Upgrade your project](/workflow/upgrading-expo-sdk-walkthrough) to a supported SDK version. If you are using a supported version and see this message, you'll need to update your Expo Go app.

### React Native version mismatch
- The development server running in your terminal is bundling a different version of React Native than the app in your device or simulator.
- [Align your versions of react-native](/troubleshooting/react-native-version-mismatch) by checking the versions in your **app.json** and **package.json**

### Application has not been registered
- There is a mismatch between the AppKey registered in the native and JS portion of your app.
- [Align your AppKey](/troubleshooting/application-has-not-been-registered) with the native side of your project.

### Application not behaving as expected
- It is possible caches may be preventing you from seeing the current state of your application.
- Clear all caches associated with your project in [Unix-like](/troubleshooting/clear-cache-macos-linux) or [Windows](/troubleshooting/clear-cache-windows) systems.

---

## Configure with app config
Source: https://docs.expo.dev/workflow/configuration/

Learn about what app.json/app.config.js/app.config.ts files are and how you can customize and use them dynamically.

The app config (**app.json**, **app.config.js**, **app.config.ts**) is used for configuring [Expo Prebuild](/more/glossary-of-terms#prebuild) generation, how a project loads in [Expo Go](/get-started/set-up-your-environment), and the OTA update manifest.

It must be located at the root of your project, next to the **package.json**. Here is a minimal example:
```json
{
  "name": "My app",
  "slug": "my-app"
}
```

If your Expo config has a top-level `expo: {}` object, then this will be used in place of the root object and all other keys will be ignored.

### Properties
The app config configures many things such as app name, icon, splash screen, deep linking scheme, API keys to use for some services and so on.

### Reading configuration values in your app
Most configuration in the app config is accessible at runtime from your JavaScript code, using [`Constants.expoConfig`](/versions/latest/sdk/constants#nativeconstants--properties). You **should not** include any sensitive information in the app config.

Which fields are filtered out of the public app config?
- [`hooks`](/versions/latest/config/app#hooks)
- [`ios.config`](/versions/latest/config/app#config)
- [`android.config`](/versions/latest/config/app#config-1)
- [`updates.codeSigningCertificate`](/versions/latest/config/app#codesigningcertificate)
- [`updates.codeSigningMetadata`](/versions/latest/config/app#codesigningmetadata)

### Extending configuration
Library authors can extend the app config by using [Expo Config plugins](/config-plugins/introduction).

### Dynamic configuration
For more customization, you can use the JavaScript (**app.config.js**) or TypeScript (**app.config.ts**). These configs have the following properties:
- Comments, variables, and single quotes.
- ESM import syntax (the `import` keyword) is not supported, except when using TypeScript with `tsx`.
- TypeScript support with nullish coalescing and optional chaining.
- Updated whenever Metro bundler reloads.
- Provide environment information to your app.
- Does not support Promises.

The `"extra"` key allows passing arbitrary configuration data to your app. The value of this key is accessed using `expo-constants`:
```js
import Constants from 'expo-constants';
Constants.expoConfig.extra.fact === 'kittens are cool';
```

### Switching configuration based on the environment
```js
module.exports = () => {
  if (process.env.MY_ENVIRONMENT === 'production') {
    return { /* your production config */ };
  } else {
    return { /* your development config */ };
  }
};
```

### Using TypeScript for configuration: app.config.ts instead of app.config.js
```ts
import { ExpoConfig, ConfigContext } from 'expo/config';
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'my-app',
  name: 'My App',
});
```

### Configuration resolution rules
1. The static config is read if **app.config.json** exists (falls back to **app.json**). If no static config exists, then default values are inferred from the **package.json** and your dependencies.
2. The dynamic config is read if either **app.config.ts** or **app.config.js** exist. If both exist, then the TypeScript config is used.
3. If the dynamic config returns a function, then the static config is passed to the function with `({ config }) => ({})`.
4. The return value from the dynamic config is used as the final config. It cannot have any promises.
5. All functions in the config are evaluated and serialized before any tool in the Expo ecosystem uses it.
6. If the final config object has a top-level `expo: {}` object, then this will be used in place of the root object and all other keys will be ignored.

Running `npx expo config` will display the final configuration.

---

## Continuous Native Generation (CNG)
Source: https://docs.expo.dev/workflow/continuous-native-generation/

Learn about managing your native projects with Continuous Native Generation (CNG) and Prebuild.

A single native project on its own is complicated to maintain, scale, and update. To address this, we've introduced the concept of **Continuous Native Generation**. Instead of creating native projects a single time and maintaining customizations to those native projects for the lifetime of the codebase, short-lived native projects are generated only when needed, such as when debugging or building.

### CNG in React Native apps
React Native apps can use **CNG** by using [Prebuild](/workflow/continuous-native-generation#usage) to automate upgrades, install or uninstall libraries, apply white label customizations, share configuration across multiple apps, reduce orphaned code, and more.

**Expo as a framework** enables CNG by combining:
1. The [app config](/workflow/configuration) file.
2. Arguments passed to the `npx expo prebuild` command.
3. Version of `expo` that's installed in the project and corresponding prebuild template.
4. [Autolinking](/more/glossary-of-terms#autolinking), for linking native modules.
5. Native subscribers, for reducing native code side-effects in entry point files.
6. EAS Credentials for code signing additional targets and entitlements.

### Usage
Prebuild can be used by running:
```sh
npx expo prebuild
```
This creates the **android** and **ios** directories for running your React code.

### Usage with EAS Build
If your project does not contain **android** and **ios** directories, EAS Build will run Prebuild to generate these native directories before compilation.

### Usage with Expo CLI run commands
```sh
npx expo run:android
npx expo run:ios
```

### Platform support
Prebuild currently supports Android and iOS.

### Dependencies
Prebuild begins by initializing new native projects from a template corresponding to each Expo SDK version.

### Clean
The `--clean` option deletes any existing native directories before generating.

### Templates
You can customize how the native directories are generated by config plugins.

### Side effects
`npx expo prebuild` performs several side effects outside of generating the **android** and **ios** directories:
- Modifies the `scripts` field in the **package.json**
- Modifies the `dependencies` field in the **package.json**

### Optionality
Prebuild is optional and works seamlessly with all Expo tools and services.

### Common questions

#### CNG
- How does CNG help with project upgrades? The upgrade process simply involves upgrading the npm dependencies, app config, and re-running `npx expo prebuild --clean`.
- How a React Native library author can adopt CNG? Libraries without native code can integrate seamlessly. Libraries with native code can use Autolinking. Libraries requiring configuration side-effects can create config plugins.
- Is CNG limited to React Native projects? No, CNG is a versatile pattern that can be applied to any native project.
- Is using Expo a requirement for CNG? Not at all.

#### Prebuild
- How can Prebuild help with sensible project upgrades? Upgrading is much closer to upgrading a pure JavaScript application.
- How does Prebuild simplify cross-platform configuration? Cross-platform configurations are handled at the config plugin level.
- How can I manage dependency side-effects with Prebuild? Library authors can create a config plugin to automate adding the required configuration side effects.
- How does Prebuild help with orphaned code? The only side effect is the config plugin in a project's Expo config, which will throw an error when the corresponding node module has been uninstalled.

When Prebuild might not be the right fit:
- Platform compatibility (only Android and iOS)
- Making changes directly is quicker than modularizing and automating
- Config plugin support in the community

---

## Add custom native code
Source: https://docs.expo.dev/workflow/customizing/

Learn how to add custom native code to your Expo project.

You can add custom native code by using one or both of the following approaches:
- Using libraries that include native code
- Writing native code

### Using libraries that include native code
When using development builds, using libraries with custom native code is straightforward:
- Install the library with npm
- If the library includes a config plugin, specify your preferred configuration in your app config.
- Create a new development build

### Writing native code
Use the [Expo Modules API](/modules/overview) to write Swift and Kotlin code and add new capabilities to your app with native modules and views.

### Creating a local module
```sh
npx create-expo-module@latest --local
npx expo run
```

### Sharing a module with multiple apps
Use `npx create-expo-module@latest` without the `--local` flag and create a standalone module.

### Considerations when using CNG
- Build locally for the best debugging experience and fast feedback
- Use config plugins for native project configuration
- Use event subscribers to hook into app lifecycle events

---

## Development and production modes
Source: https://docs.expo.dev/workflow/development-mode/

Learn how to run a project in development mode or production mode.

Your project will always run in either **development** or **production** mode. By default, running your project locally with `npx expo start` runs it in development mode, whereas a published project (with `eas update`), or any standalone app, will run in production mode.

### Development mode
React Native includes useful tools for development: remote JavaScript debugging, live reload, hot reloading, and an element inspector.

Development mode also performs validations while your app is running to give you warnings.

> **This comes at a cost. Your app runs slower in development mode.**

### Production mode
Production mode is most useful for:
- Testing your app's performance
- Catching bugs that only show up in production

The easiest way to simulate production is:
```sh
npx expo start --no-dev --minify
```

---

## iOS Simulator
Source: https://docs.expo.dev/workflow/ios-simulator/

Learn how you can install the iOS Simulator on your Mac and use it to develop your app.

### Setup Xcode and Watchman
Install Xcode from the Mac App Store, install Xcode Command Line Tools, install an iOS Simulator in Xcode, and install Watchman.

### Try it out
Run your app with `npx expo start` and press I from the command line.

### Expo Orbit
You can use the Expo Orbit app which allows launching builds and simulator management with one click from the menu bar on macOS.

### Limitations
The following hardware is unavailable in the Simulator:
- Audio Input
- Barometer
- Camera
- Motion Support (accelerometer and gyroscope)

The Simulator also suspends background apps and processes on iOS 11 and later.

### Troubleshooting
- If the CLI seems stuck when opening a Simulator, open the iOS Simulator manually (`open -a Simulator`)
- If Simulator opened but the Expo Go app isn't opening inside of it, you may need to interact with the simulator for the prompt to show up
- To force an update to the latest version, create a project with the desired SDK version
- For `xcrun` errors, try uninstalling and reinstalling Expo Go on your simulator, or erase all content and settings

---

## View logs
Source: https://docs.expo.dev/workflow/logging/

Learn how to view logs when using Expo CLI, native logs in Android Studio and Xcode, and system logs.

### Console logs
When you run `npx expo start` and connect a device, console logs will show up in the terminal process.

### Native logs
You can view native runtime logs in Android Studio and Xcode by compiling the native app locally.

### System logs
```sh
npx react-native log-android
npx react-native log-ios
```

---

## Develop an app with Expo
Source: https://docs.expo.dev/workflow/overview/

An overview of the development process of building an Expo app to help build a mental model of the core development loop.

### Key concepts

#### What is an "Expo app"?
A React Native app that uses Expo tools.

#### What is the difference between "Expo" and "Expo Application Services (EAS)"?
Expo is an open-source project with developer tools (MIT license). EAS is a suite of hosted services for building, submitting, and updating your app.

#### Do I have to use EAS if I use Expo open source tools?
Nope.

#### Can I use EAS if I'm not using any Expo open source tools?
Yes.

#### Expo Go
Expo Go is the fastest way to get started but is a limited playground and not useful for building production-grade projects.

#### Development builds
A development build is a debug build of your app that contains `expo-dev-client` library.

#### Android and iOS native projects
React Native apps for mobile platforms are made of two interconnected parts: the app JavaScript and the native projects (Android and Xcode projects).

#### Continuous Native Generation (CNG)
CNG is a process where native projects are generated on-demand from your app config and package.json.

### Initialize and run a project
The easiest way to create a new project is with `create-expo-app`.

### The core development loop
A cycle of four main activities:
1. Write and run JavaScript code
2. Update app configuration
3. Write native code or modify native project configuration
4. Install a library that requires native code modifications

### Share app with testers
Use Internal distribution or production builds locally.

### Release app to stores
Use EAS Submit or create production builds locally.

### Monitor app in production
Use Sentry or BugSnag for crash reports, and analytics services.

### Update the app
The `expo-updates` library allows instant updates to your app's JavaScript.

---

## Upgrade Expo SDK
Source: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/

Learn how to incrementally upgrade the Expo SDK version in your project.

> We recommend upgrading SDK versions incrementally, one at a time.

### How to upgrade to the latest SDK version

#### Upgrade with an AI coding agent
If you use an AI coding agent, install Expo Skills and use the `upgrading-expo` skill.

#### Upgrade manually

1. Upgrade the Expo SDK:
   ```sh
   npm install expo@^56.0.0
   ```

2. Upgrade dependencies:
   ```sh
   npx expo install --fix
   npx expo-doctor
   ```

3. Update native projects:
   - If you use CNG: Delete the **android** and **ios** directories.
   - If you don't use CNG: Run `npx pod-install` if you have an **ios** directory.

4. Follow the release notes for any other instructions.

### SDK Changelogs
- SDK 56: [Release notes](https://expo.dev/changelog/sdk-56)
- SDK 55: [Release notes](https://expo.dev/changelog/sdk-55)
- SDK 54: [Release notes](https://expo.dev/changelog/sdk-54)
- Deprecated SDK versions also listed.

---

## Using Expo SDK, React Native, and third-party libraries
Source: https://docs.expo.dev/workflow/using-libraries/

Learn how to use Expo SDK, React Native libraries, and other third-party npm packages in your project.

### React Native core libraries
Import from the `react-native` package in your code.

### Expo SDK libraries
The Expo SDK provides access to device and system functionality. Use `npx expo install` to install.

### Third-party libraries

#### Finding a third-party library
Use [React Native Directory](https://reactnative.directory) or the npm registry.

#### Determining third-party library compatibility
Use development builds for production-quality apps. Expo Go is a playground for students and learners.

To determine if a new dependency changes native project directories:
- Does the library include **android** or **ios** directories?
- Does the README mention linking?
- Does it require changes to AndroidManifest.xml or Info.plist?
- Does it have a config plugin?

#### Installing a third-party library
Always use `npx expo install` instead of `npm install` or `yarn add` directly.

#### Excluding a third-party library from version checks
Use the `expo.install.exclude` property in **package.json**.

---

## Develop websites with Expo
Source: https://docs.expo.dev/workflow/web/

Learn how to develop your app for the web so you can build a universal app.

### Getting started

#### Install web dependencies
```sh
npx expo install react-dom react-native-web @expo/metro-runtime
```

#### Start the dev server
```sh
npx expo start --web
```

The app can be exported as a production website with:
```sh
npx expo export --platform web
```

---

## Android App Links
Source: https://docs.expo.dev/linking/android-app-links/

Learn how to configure Android App Links to open your Expo app from a standard web URL.

To configure Android App Links:
- Add `intentFilters` and set `autoVerify` to true in your app config
- Set up two-way association to verify your website and native app

### Add `intentFilters` to the app config
```json
{
  "expo": {
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "*.webapp.io",
              "pathPrefix": "/records"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

### Set up two-way association
- **Website verification:** Create an **assetlinks.json** file at **/.well-known/assetlinks.json**
- **Native app verification:** Uses code signing that references the target website domain

### Debugging
Use `--tunnel` functionality to test without deploying a website.

### Troubleshooting
- Ensure your website is served over HTTPS with content-type `application/json`
- Android verification may take 20 seconds or longer to take effect

---

## Linking into other apps
Source: https://docs.expo.dev/linking/into-other-apps/

Learn how to handle and open a URL from your app based on the URL scheme of another app.

### Using expo-linking API
```tsx
import * as Linking from 'expo-linking';
Linking.openURL('https://expo.dev/');
```

### Using Expo Router's `Link` component
```tsx
import { Link } from 'expo-router';
<Link href="https://expo.dev">Open a URL</Link>
```

### Common URL schemes
- `https`/`http` - Open web browser
- `mailto` - Open mail app
- `tel` - Open phone app
- `sms` - Open SMS app

### Custom URL schemes
Some services provide documentation on how to use their app's custom URL schemes (e.g., Uber).

### Create URLs
Use `Linking.createURL` to create a URL that can be used to open or redirect back to your app.

### In-app browsers
Use `expo-web-browser` to open URLs in an in-app browser.

### Additional link functionality on web
Use `Link` from `expo-router` or `A` from `@expo/html-elements`.

---

## Linking into your app
Source: https://docs.expo.dev/linking/into-your-app/

Learn how to handle an incoming URL in your React Native and Expo app by creating a deep link.

### Add a custom scheme in app config
```json
{
  "expo": {
    "scheme": "myapp"
  }
}
```

### Test the deep link
Use `npx uri-scheme`:
```sh
npx uri-scheme open myapp://somepath/details --ios
```

### Handle URLs
Use `Linking.useLinkingURL()` hook from `expo-linking`:
```tsx
const url = Linking.useLinkingURL();
```

### Parse URLs
Use `Linking.parse()` method to parse path, hostname, and query parameters.

### Limitations
If a user does not have your app installed, deep links to your app will not work. Android App/iOS Universal Links can handle such cases.

---

## iOS Universal Links
Source: https://docs.expo.dev/linking/ios-universal-links/

Learn how to configure iOS Universal Links to open your Expo app from a standard web URL.

### Set up two-way association
- **Website verification:** Create an **apple-app-site-association (AASA)** file at **/.well-known/apple-app-site-association**
- **Native app verification:** Configure `ios.associatedDomains` in app config

### Create AASA file
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "QQ57RJ5UTD.com.example.myapp",
        "paths": ["/records/*"]
      }
    ]
  }
}
```

### Native app configuration
```json
{
  "expo": {
    "ios": {
      "associatedDomains": ["applinks:expo.dev"]
    }
  }
}
```

### Apple Smart Banner
Add meta tag to your website's `<head>`:
```html
<meta name="apple-itunes-app" content="app-id=<ITUNES_ID>" />
```

### Debugging
Use `--tunnel` functionality to test without deploying a website.

### Troubleshooting
- Ensure the AASA file is valid
- The uncompressed AASA file cannot be larger than 128kb
- Ensure your website is served over HTTPS

---

## Overview of Linking, Deep Links, Android App Links, and iOS Universal Links
Source: https://docs.expo.dev/linking/overview/

An overview of available resources to implement Linking and Deep Links in your Expo apps.

### Linking
Linking allows your app to interact with incoming and outgoing URLs.

### Universal linking
Both Android and iOS implement their own systems for routing web URLs to an app: Android App Links and iOS Universal Links.

### Linking to your app from other apps or websites
Deep links are links to specific URL-based content inside an app or a website.

### Use Expo Router to handle deep linking
Deep linking is automatically enabled for all of your app's screens.

### Linking to other apps from your app
Your app can use common URL schemes for default apps.

---

## Adopt Prebuild
Source: https://docs.expo.dev/guides/adopting-prebuild/

Learn how to adopt Expo Prebuild in a project that was bootstrapped with React Native CLI.

### Install the `expo` package
```sh
npm install expo
```

### Update the entry file
```diff
- import {AppRegistry} from 'react-native';
- import {name as appName} from './app.json';
+ import {registerRootComponent} from 'expo';
  import App from './App';
- AppRegistry.registerComponent(appName, () => App);
+ registerRootComponent(App);
```

### Prebuild
```sh
npx expo prebuild --clean
```

### Extra changes
- Add **.expo** to **.gitignore**
- Remove all fields outside the top-level `expo` object in **app.json**
- Update **metro.config.js**
- Change scripts in **package.json**

### Migrate native customizations
If your project has native modifications, configure your app config to reflect those changes.

### Add more features
- EAS Build
- EAS Update
- Expo for web
- Expo Dev Client
- Expo native module API

---

## Analyzing JavaScript bundles with Expo Atlas and Lighthouse
Source: https://docs.expo.dev/guides/analyzing-bundles/

Learn about improving the production JavaScript bundle size of Expo apps and websites with Expo Atlas and Lighthouse.

### Analyzing bundle size with Expo Atlas

#### Using Atlas with `npx expo start`
```sh
EXPO_ATLAS=true npx expo start
```

#### Using Expo Atlas with `npx expo export`
```sh
EXPO_ATLAS=true npx expo export
npx expo-atlas .expo/atlas.jsonl
```

### Analyzing bundle size with source-map-explorer
For SDK 50 and earlier, use `source-map-explorer`.

### Lighthouse
Use Lighthouse to test how fast, accessible, and performant your website is.

---

## Privacy manifests
Source: https://docs.expo.dev/guides/apple-privacy/

Learn about configuring iOS privacy manifests for your mobile app.

### What is a Privacy manifest?
A file named **PrivacyInfo.xcprivacy** included in your iOS native project, used to declare why the app includes native code that calls into certain APIs.

### Configuration in app config
```json
{
  "expo": {
    "ios": {
      "privacyManifests": {
        "NSPrivacyAccessedAPITypes": [
          {
            "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryUserDefaults",
            "NSPrivacyAccessedAPITypeReasons": ["CA92.1"]
          }
        ]
      }
    }
  }
}
```

### Testing the Privacy manifest
Build your app and submit it through App Store review or TestFlight's external review.

---

## Authentication with OAuth or OpenID providers
Source: https://docs.expo.dev/guides/authentication/

Learn how to utilize the expo-auth-session library to implement authentication with OAuth or OpenID providers.

### Rules for all authentication providers
- Use `WebBrowser.maybeCompleteAuthSession()` to dismiss the web popup
- Create redirects with `AuthSession.makeRedirectUri()`
- Build requests using `AuthSession.useAuthRequest()`
- Be sure to disable the prompt until `request` is defined
- You can only invoke `promptAsync` in user interaction on the web
- Expo Go cannot be used for OAuth

### Obtaining access tokens
Most providers use the OAuth 2 standard. Exchange the authorization code on a server.

### Examples
- GitHub: Uses OAuth 2.0 with PKCE support
- Okta: Uses OpenID with auto discovery

### Redirect URI patterns
- Standalone/development build: `yourscheme://path`
- Expo Go: `exp://u.expo.dev/[project-id]?...`

### Improving user experience
- Warming the browser with `WebBrowser.warmUpAsync()`
- Implicit login (no longer recommended, prefer PKCE)
- Storing data with `expo-secure-store`

---

## Build Expo apps for TV
Source: https://docs.expo.dev/guides/building-for-tv/

A guide for building an Expo app for an Android TV or Apple TV target.

### Native project changes required
Changes to Android and iOS files can be automated with a config plugin.

### System requirements for TV development

#### Android TV
- Node.js (LTS)
- Android Studio (Iguana or later)
- Android TV system image
- Android TV emulator

#### Apple TV
- Node.js (LTS) on macOS
- Xcode 16 or later
- tvOS SDK 17 or later

### Quick start
```sh
npx create-expo-app MyTVProject -e with-tv
```

### Integration with an existing Expo project
1. Modify dependencies to use `react-native-tvos`
2. Add the TV config plugin
3. Run prebuild with `EXPO_TV=1`
4. Build for Android TV or Apple TV

### Create EAS Build profiles for both TV and phone
Use environment variables in **eas.json** to create TV profiles.

---

## Use build cache providers
Source: https://docs.expo.dev/guides/cache-builds-remotely/

Accelerate local development by caching and reusing builds from a provider.

### Using EAS as a build provider
```sh
npx expo install eas-build-cache-provider --dev
```
Update **app.json**:
```json
{
  "expo": {
    "buildCacheProvider": "eas"
  }
}
```

### Limitations
The build cache provider is only consulted by local `npx expo run:[android|ios]` commands. iOS physical device builds are skipped.

### Creating a custom build provider
Implement `BuildCacheProviderPlugin` with `resolveBuildCache`, `uploadBuildCache`, and optionally `calculateFingerprintHash` methods.

---

## Metro bundler
Source: https://docs.expo.dev/guides/customizing-metro/

Learn about different Metro bundler configurations that can be customized.

### Customizing
Create a **metro.config.js** file:
```js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
module.exports = config;
```

### Assets
Add file extensions to `resolver.assetExts` array.

### Aliases
Use a custom resolver to handle aliases:
```js
config.resolver.resolveRequest = (context, moduleName, platform) => {
  return context.resolveRequest(context, ALIASES[moduleName] ?? moduleName, platform);
};
```

### File watching and crawling
From SDK 56, Expo's file map supports on-demand filesystem access.

### Bundle splitting
Expo CLI automatically splits bundles based on async imports (web-only).

### Web support
Modify app config to enable Metro for web:
```json
{
  "expo": {
    "web": {
      "bundler": "metro"
    }
  }
}
```

### TypeScript
Supports `compilerOptions.paths` and `compilerOptions.baseUrl` fields.

### CSS
Metro web CSS guide for using CSS in Expo CLI web projects.

---

## Using React DOM in Expo native apps
Source: https://docs.expo.dev/guides/dom-components/

Learn about rendering React DOM components in Expo native apps using the 'use dom' directive.

### Usage
Add the `'use dom'` directive to the top of the web component file:
```tsx
'use dom';
export default function DOMComponent({ name }: { name: string }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
    </div>
  );
}
```

### Features
- Shared bundler config across web, native, and DOM components
- React, TypeScript, CSS, and all other Metro features are enabled
- Logging, Fast Refresh, HMR
- Runtime error overlay
- Supports Expo Go

### WebView props
Pass props via the `dom` prop on the component.

### Marshalled props
Send serializable data to the DOM component through props.

### Native actions
Send type-safe native functions to DOM components by passing async functions as top-level props.

### Passing refs
Use `useDOMImperativeHandle` hook inside a DOM component.

### Feature detection
```ts
import { IS_DOM } from 'expo/dom';
```

### Debugging
All `console.log` methods are forwarded to the terminal. Safari/Chrome DevTools can be used for inspection.

### Routing
Expo Router APIs such as `<Link />` and `useRouter` can be used in DOM components.

### Common questions
- Secure Context: DOM components served via `file://` scheme are provided a secure context by default.

---

## Edit rich text
Source: https://docs.expo.dev/guides/editing-richtext/

Learn about current approaches to preview and edit rich text in React Native.

### Render rich text
Good options include markdown renderers, HTML content renderers, and nesting `<Text>` components.

### Approaches to edit rich text

#### Webview-based editors
Wrap an existing rich text editor built for web inside a WebView.

#### Existing webview-based React Native libraries
- `react-native-rich-editor`
- `react-native-cn-quill`
- `@10play/tentap-editor`

#### Custom webview-based editor
Use Quill, lexical, or slate and handle message passing.

#### Building on top of React Native TextInput
React Native allows nested `<Text>` components inside `<TextInput>` but with significant limitations.

#### Markdown editors with visible styling markers
Use a markdown renderer in a separate view.

#### Native editors
Use native Android or iOS rich text editors wrapped in React Native modules:
- `react-native-aztec`
- `gutenberg-mobile`
- `react-native-live-markdown`
- `react-native-enriched-markdown`
- `react-native-enriched`

### Summary
There is no one-size-fits-all solution for rich text editing in React Native.

---

## Environment variables in Expo
Source: https://docs.expo.dev/guides/environment-variables/

Learn how to use environment variables in an Expo project.

### Reading environment variables from .env files
Create a **.env** file with `EXPO_PUBLIC_[NAME]=VALUE` variables:
```bash
EXPO_PUBLIC_API_URL=https://staging.example.com
```

### How variables are loaded
Expo CLI loads **.env** files and replaces all references to `process.env.EXPO_PUBLIC_[VARNAME]` in your code.

### How to read from environment variables
Every environment variable must be statically referenced as a property of `process.env` using JavaScript's dot notation.

### Using multiple .env files
You can define any of the standard .env files.

### Disabling environment variables
Set `EXPO_NO_DOTENV=1` or `EXPO_NO_CLIENT_ENV_VARS=1`.

### Environment variables in EAS

#### EAS Build
Uses **.env** files uploaded with your build job.

#### EAS Update
Uses available **.env** files to inline `EXPO_PUBLIC_` variables.

### Migrating to Expo environment variables
From `react-native-config`, `babel-plugin-transform-inline-environment-variables`, or `direnv`.

### Security considerations
Never store sensitive secrets in `EXPO_PUBLIC_` variables.

---

## Extending with Jetpack Compose
Source: https://docs.expo.dev/guides/expo-ui-jetpack-compose/extending/

Learn how to create custom Jetpack Compose components and modifiers that integrate with Expo UI.

### Creating a custom component
1. Create a local Expo module
2. Update **android/build.gradle** to enable Jetpack Compose
3. Create a Compose view with Props data class and `@Composable` content function
4. Register the view in your module using `ExpoUIView`
5. Create a wrapper component in TypeScript

### Creating custom modifiers
1. Define native modifier implementation as an `@OptimizedRecord` data class
2. Register with `ModifierRegistry` in your module definition
3. Create a TypeScript function that builds the modifier config

---

## Building SwiftUI apps with Expo UI
Source: https://docs.expo.dev/guides/expo-ui-swift-ui/

Learn how to use Expo UI to integrate SwiftUI into your Expo apps.

### Features
- SwiftUI primitives with 1-to-1 mapping to SwiftUI views
- Full-app support
- Mix with React Native components, DOM components, or Skia

### Installation
```sh
npx expo install @expo/ui
```

### Usage
Use the `Host` component as the container for SwiftUI views:
```tsx
import { CircularProgress, Host } from '@expo/ui/swift-ui';
```

### Modifiers
Import from `@expo/ui/swift-ui/modifiers` and pass as array to the `modifiers` prop.

### Common questions
- Can I use flexbox in SwiftUI components? Flexbox styles apply to the `Host` component; inside SwiftUI use `HStack` and `VStack`.
- What's the `Host` component? The container for SwiftUI views, uses `UIHostingController`.
- How is Expo UI different from other UI libraries? It's a primitives library, not an opinionated design kit.
- Can I use React Native components inside SwiftUI components? Yes, as JSX children.
- Can I use `@expo/ui/swift-ui` on Android or web? Universal support will come later.

---

## Extending with SwiftUI
Source: https://docs.expo.dev/guides/expo-ui-swift-ui/extending/

Learn how to create custom SwiftUI components and modifiers that integrate with Expo UI.

### Creating a custom component
1. Create a local Expo module
2. Add `ExpoUI` as a dependency in podspec
3. Create a SwiftUI view with Props class extending `UIBaseViewProps` and View struct conforming to `ExpoSwiftUI.View`
4. Register with `ExpoUIView` in your module
5. Create a wrapper component in TypeScript

### Creating custom modifiers
1. Create a modifier struct conforming to `ViewModifier` and `Record`
2. Register with `ViewModifierRegistry` in your module definition
3. Create a TypeScript function that generates the modifier config

---

## Using Facebook authentication
Source: https://docs.expo.dev/guides/facebook-authentication/

A guide on using react-native-fbsdk-next library to integrate Facebook authentication in your Expo project.

### Installation
See the library's documentation for installation instructions.

### Configuration for Android
Requires the app to have a valid Play Store URL. Once uploaded, add the Android platform in your Facebook project and provide the Key hash, Package name, and Class name.

---

## Using Google authentication
Source: https://docs.expo.dev/guides/google-authentication/

A guide on using @react-native-google-signin/google-signin library to integrate Google authentication in your Expo project.

### Installation
See the library's documentation for installation instructions.

### Configure Google project for Android and iOS

#### Upload app to Google Play Store
Upload your app to Google Play Store for production testing.

#### Configure your Firebase or Google Cloud Console project
For Android, provide SHA-1 certificate fingerprint values.

#### With Firebase
Use the Firebase method with **google-services.json** and **GoogleService-Info.plist**.

#### With Google Cloud Console
Alternate method when not using Firebase.

---

## Expo Vector Icons
Source: https://docs.expo.dev/guides/icons/

Learn how to use various types of icons in your Expo app.

### `@expo/vector-icons`
Will be deprecated. Use `@react-native-vector-icons` instead.

### Custom icon fonts

#### `createIconSet`
Create a custom font based on a `glyphMap`.

#### `createIconSetFromIcoMoon`
Create a custom font based on an IcoMoon config file.

#### `createIconSetFromFontello`
Create a custom font based on a Fontello config file.

### Button component
`Font.Button` syntax where `Font` is the icon set.

---

## Using in-app purchases
Source: https://docs.expo.dev/guides/in-app-purchases/

Learn about how to use in-app purchases in your Expo app.

### Tutorial
RevenueCat provides a getting started guide and video tutorial.

### Libraries
- `react-native-purchases` - Wrapper around Google Play Billing and StoreKit APIs
- `expo-iap` - Conforms to OpenIAP specification

---

## iOS Developer Mode
Source: https://docs.expo.dev/guides/ios-developer-mode/

Learn how to enable iOS Developer Mode setting on iOS 16 and above.

### Enable Developer Mode

#### Directly on an iOS device
Go to **Settings** > **Privacy & Security** > **Developer Mode** and enable the toggle.

#### Connect an iOS device with a Mac
Connect your iOS device to a Mac, use Xcode, then enable Developer Mode on the iOS device.

---

## Keyboard handling
Source: https://docs.expo.dev/guides/keyboard-handling/

A guide for handling common keyboard interactions on Android or iOS.

### Keyboard handling basics

#### Keyboard avoiding view
```tsx
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
```

#### Keyboard events
Use `Keyboard.addListener` to listen for `keyboardDidShow` and `keyboardDidHide` events.

### Advanced keyboard handling with Keyboard Controller
For more complex keyboard interactions, use `react-native-keyboard-controller`.

```sh
npx expo install react-native-keyboard-controller
```

Set up `KeyboardProvider`, use `KeyboardAwareScrollView` for handling multiple inputs, and `useKeyboardHandler` for animating views in sync with keyboard height.

---

## Create a debug build locally
Source: https://docs.expo.dev/guides/local-app-development/

Learn how to create a debug build for your Expo app locally.

### Local app compilation
```sh
npx expo run:android
npx expo run:ios
```

### After the first build: use `npx expo start`
Once compiled, use `npx expo start` for daily development. Rebuild only after adding native libraries or modifying config plugins.

### Local builds with `expo-dev-client`
```sh
npx expo install expo-dev-client
```

### Local builds using Android product flavors
Use `--variant` and `--app-id` flags.

### Local builds with EAS
Use `--local` flag with EAS Build.

---

## Build locally: Overview
Source: https://docs.expo.dev/guides/local-app-overview/

An overview of how to build your app locally using your own machine for Expo projects.

### When to build your app locally
- Iterate quickly on native code changes
- Test platform-specific changes in debug builds
- Environments with restricted network access
- Manage your own credentials locally
- Test custom build cache providers

### Creating your debug build locally
Use `npx expo run:[android|ios]` commands.

### Creating your release build locally
Generate signing credentials, create release builds, and submit to app stores.

### Reuse previous builds from a provider
Use EAS as a build provider or create custom providers.

### Prebuilt Expo Modules for Android
Expo ships prebuilt modules that reduce Gradle work. Opt out globally or per package when needed.

---

## Create a release build locally
Source: https://docs.expo.dev/guides/local-app-production/

Learn how to create a release (production) build for your Expo app locally.

### Android
1. Create an upload key using `keytool`
2. Update gradle variables in **android/gradle.properties**
3. Add signing config to **android/app/build.gradle**
4. Generate release AAB: `./gradlew app:bundleRelease`
5. Submit to Google Play Console

### iOS
1. Open iOS workspace in Xcode with `xed ios`
2. Configure signing & capabilities
3. Configure a release scheme
4. Build for release: **Product** > **Build**
5. Archive and distribute via App Store Connect


---

## Local-first architecture with Expo
Source: https://docs.expo.dev/guides/local-first/

# Local-first architecture with Expo

An introduction to the emerging local-first software movement, including links to relevant learning resources and tools.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

> This guide is a work in progress. If you have any feedback, [open an issue](https://github.com/expo/expo/issues/new/choose) in our GitHub repository.

The term "local-first" was first coined in the paper ["Local-first software"](https://www.inkandswitch.com/local-first/), written by the research lab [Ink & Switch](https://www.inkandswitch.com/), but the ideas behind it have been around for a long time. It's the architecture that powers some of our favorite apps, like [Linear](https://linear.app/), [Superhuman](https://superhuman.com/), [Excalidraw](https://excalidraw.com/), and even [Apple Notes](https://en.wikipedia.org/wiki/Notes_(Apple)).

In local-first software, "the availability of another computer should never prevent you from working" ([via Martin Kleppmann](https://www.youtube.com/watch?v=NMq0vncHJvU)). When you are offline, you can still read and write directly from/to a database on your device. You can trust the software to work offline, and you know that when you are connected to the internet, your data will be seamlessly synced and available on any of your devices running the app. When you're online, this architecture is well suited for "multiplayer" apps, [as popularized by Figma](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/).

To dig deeper into what local-first is and how it works, refer to the [additional resources](/guides/local-first#additional-resources) below.

## Why use local-first architecture?

### User experience benefits

Local-first software feels **fast** because interactions are no longer network-bound, you can read and write directly from/to a database on your device.

You can trust the software to work offline, and you know that when you are connected to the internet, your data will be seamlessly synced and available on any of your devices running the app.

Another characteristic of local-first software is that it is collaborative — multiple devices can work on the same data, and changes are synced across all of them. This can happen in real-time when you collaborate on a design in [Figma](https://www.figma.com/) or asynchronously when you create a task while offline in Linear and it is synced when you are online again.

### Developer experience benefits

You no longer have to manage various states of your app for each network request — "loaded", "loading", "error", and so on, with their corresponding UI states and other logic. Write to a local database, and the app will automatically sync the changes to the server. This means that you can focus on building the app, and not worry as much about the networking and offline states.

Your server availability may still be important, but in the event of an outage your users can still access the app and continue working. You may even provide a mechanism to sync the data without going through your server.

## Challenges in building local-first apps

The tools available today are still in their early stages, and so you may find yourself solving problems that you would expect to be solved by the tools you are using today. For example, you may need to implement a custom sync layer, or you may have to figure out how to handle permissions for multiple users operating on the same data. As the ecosystem evolves, we expect it to become easier to build local-first apps. If you're not prepared to be an early adopter, and everything that comes with that, you might want to wait for the tools to mature before you start building your app with local-first tools.

## Tools for building local-first apps

A comprehensive list of tools is available on the ["Local-first software" community website](https://localfirstweb.dev/). The following is a shorter list of tools that we at Expo have had direct experience working with.

One way to think of local-first tools is to group them by the following categories: persistence, state management, and syncing. Some tools will fit into multiple categories if they handle multiple aspects of the problem. Syncing can be further subdivided into syncable data structures and transport layers.

### Legend-State

[Legend-State](https://legendapp.com/open-source/state/v3/) is a super fast all-in-one state and sync library that lets you write less code to make faster apps. It has the following primary goals:

-   Faster state management for React apps
-   Fine-grained reactivity for minimal renders
-   Powerful sync and persistence (with Supabase support built-in)

It works with Expo and React Native (via [`react-native-async-storage`](https://github.com/react-native-async-storage/async-storage?tab=readme-ov-file#react-native-async-storage)). This makes it a perfect match for building local-first mobile and web apps. Get started by using the [Legend-State Supabase example](https://github.com/expo/examples/tree/master/with-legend-state-supabase):

```sh
npx create-expo-app --example with-legend-state-supabase
```

### TinyBase

[TinyBase](https://tinybase.org/) calls itself "the reactive data store for local-first apps". It is a state management library that plugs in to many of the most popular syncing and persistence layers, such as [Yjs](/guides/local-first#yjs) and [SQLite](/guides/local-first#sqlite). It's a great choice for building local-first apps that need to persist and sync data. Get started by using the [TinyBase example](https://github.com/expo/examples/tree/master/with-tinybase):

```sh
npx create-expo-app --example with-tinybase
```

TinyBase works seamlessly with Expo Go, allowing you to develop quickly. On Android and iOS, it uses the [`expo-sqlite`](/versions/latest/sdk/sqlite) library to persist data. On the web, it relies on the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API. [Beto Moedano](https://github.com/betomoedano) demonstrates how to build a [Universal Local-first Shopping List App](https://github.com/betomoedano/groceries-shopping-list-app) in the following video:

[Watch: Build a Local-First Real-Time Shopping List App with Expo and TinyBase](https://www.youtube.com/watch?v=HqOiB2tDM8Q) — Build a real-time shopping list app using TinyBase with expo-sqlite for persistence and automatic syncing.

### SQLite

[Expo SQLite](/versions/latest/sdk/sqlite) is a SQLite library that is a great choice for persistence for local-first apps. You can use SQLite with different state management and syncing layers in front of it, such as [`y-expo-sqlite`](https://github.com/brentvatne/y-expo-sqlite) to persist [Yjs](/guides/local-first#yjs) documents, and [TinyBase](/guides/local-first#tinybase) as a state management layer. Using SQLite is flexible, but you will need to combine it with other tools or build your own tools to get a complete local-first solution. See [Expo SQLite API reference](/versions/latest/sdk/sqlite) for more information.

### Yjs

[Yjs](https://github.com/yjs/yjs) is a [CRDT implementation](https://github.com/yjs/yjs?tab=readme-ov-file#yjs-crdt-algorithm) that provides data types that can be synced across multiple clients. When building an app with Yjs and working with data that you would like to be able to sync, then you would use `Y.Array` and `Y.Map` to represent your data rather than `Array` and `Object`. You may use a library like [TinyBase](/guides/local-first#tinybase) for state management on top of Yjs, and persistence can be handled by a variety of tools, from a JSON file on your filesystem to a full-fledged database (such as [`y-expo-sqlite`](https://github.com/brentvatne/y-expo-sqlite)) and everything in between. See [Yjs's GitHub repository](https://github.com/yjs/yjs) for more information.

### Prisma

[Prisma](https://prisma.io) is well known as the most popular ORM for Node.js and TypeScript backends, and it's now available for [Expo and React Native in early access](https://www.prisma.io/blog/bringing-prisma-orm-to-react-native-and-expo). Prisma aims to provide a complete local-first solution, with state management, syncing, and persistence all covered for you. While it's still early, [Beto Moedano](https://github.com/betomoedano) has put together a full walkthrough of using Prisma with Expo to build a local-first Notion clone, [check out the code on GitHub](https://github.com/betomoedano/React-Native-Notion-Clone).

[Watch: Building a Local-first Notion Clone with React Native Expo and Prisma](https://www.youtube.com/watch?v=uTrPte0sCiw) — Build a local-first Notion clone with Prisma ORM for Expo, covering state management, syncing, and persistence.

### Jazz

[Jazz](https://jazz.tools/) is a local-first relational database with real-time sync, offline support, and row-level permissions. It is open source, provides first-class support for Expo and React Native, and you can [self-host](https://jazz.tools/docs/getting-started/server-setup) it to start quickly. To learn more, check out the [examples](https://github.com/garden-co/jazz/tree/main/examples) or see the [Getting Started Guide](https://jazz.tools/docs/install/client) for detailed instructions.

### LiveStore

[LiveStore](https://docs.livestore.dev/getting-started/expo/) is a client-centric local-first data layer for high-performance applications. It provides first-class support for Expo, and it's a great choice for building local-first apps. See the blog post on [LiveStore: SQLite-based data layer for local-first apps](https://expo.dev/blog/local-first-application-development-with-livestore).

[Watch: How to build local-first native apps with LiveStore and Expo](https://www.youtube.com/watch?v=zQIhJqYU1Qw) — Use LiveStore's SQLite-based data layer to build a high-performance local-first app with Expo.

### Turso

[Turso](https://turso.tech) is a modern database service built on SQLite. It now supports [Offline Sync](https://turso.tech/blog/turso-offline-sync-public-beta), which enables true local-first experiences. You can sync databases between local and remote sources with bidirectional sync and built-in conflict detection. While automatic conflict resolution isn't available yet, this feature is still a major step forward. You can use Turso today with [expo-sqlite](/versions/latest/sdk/sqlite). To learn more, read the [Turso: Offline Sync Public Beta](https://turso.tech/blog/turso-offline-sync-public-beta) blog post. For an example integration, check out the [Notes App](https://github.com/betomoedano/notes-app).

[Watch: How to build a local-first Notes App with Turso and Expo](https://www.youtube.com/watch?v=SBv32tmyb3k) — Build a local-first notes app with Turso's offline sync and expo-sqlite for bidirectional data syncing.

### Instant

[Instant](https://www.instantdb.com/) is a modern alternative to Firebase. It gives you a real-time database so you can focus on building your app's frontend. To get started, check out the [Getting Started Guide](https://www.instantdb.com/docs/start-rn). You can also explore the [Sketch App](https://github.com/betomoedano/sketch-app) featured in the video below.

[Watch: Build a Local-First Sketch App with Expo, Instant & Reanimated](https://www.youtube.com/watch?v=DEJIcaGN3vY) — Build a collaborative sketch app with Instant's real-time database and Reanimated for smooth drawing interactions.

### RxDB

[RxDB](https://rxdb.info/) (Reactive Database) is a local-first, NoSQL database for JavaScript applications. It is deeply reactive, allowing you to subscribe to query results so your UI updates automatically when data changes. RxDB focuses on offline-first capabilities to build apps that work even without internet and syncs when back online. RxDB works with Expo using the [SQLite storage adapter](https://rxdb.info/rx-storage-sqlite.html#usage-with-expo-sqlite), which wraps [`expo-sqlite`](/versions/latest/sdk/sqlite). It also offers a variety of replication plugins to sync with your existing backend, whether it's HTTP, GraphQL, Supabase, or a custom one.

### Other tools

The following list, far from being comprehensive, provides other tools that have caught our attention and that you may find interesting to explore. For a more thorough list of tools, see ["Local-first software" community website](https://localfirstweb.dev/).

-   [Automerge](https://automerge.org/)
-   [ElectricSQL](https://electric-sql.com/)
-   [PowerSync](https://www.powersync.com/)

## Additional resources

-   ["The past, present, and future of local-first"](https://www.youtube.com/watch?v=NMq0vncHJvU) by Martin Kleppmann
-   ["Local-first software"](https://www.inkandswitch.com/local-first/) by Ink & Switch
-   ["Local-first software" community website](https://localfirstweb.dev/) and [meetup playlist on YouTube](https://www.youtube.com/playlist?list=PLTbD2QA-VMnXFsLbuPGz1H-Najv9MD2-H)
-   [localfirst.fm podcast](https://localfirst.fm/) by Johannes Schickling


## Using local HTTPS development
Source: https://docs.expo.dev/guides/local-https-development/

# Using local HTTPS development

Learn how to set up local HTTPS for Expo web apps.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

When developing Expo web apps locally, you may need to use HTTPS with your local development environment for testing secure browser APIs. This guide shows you how to set up local HTTPS for Expo web apps.

Prerequisites

1 requirement

`mkcert` installed

`mkcert` is a tool for creating development certificates. For installation instructions, see the [`mkcert` GitHub repository](https://github.com/FiloSottile/mkcert#installation).

## Benefits

-   **Team scalability**: Same setup works for everyone
-   **Authentication support**: HTTP-Only Cookies and secure contexts
-   **Production parity**: Match your production HTTPS environment
-   **Easy sharing**: Consistent development URLs across the team

## Set up your project

Create or navigate to your Expo project:

```sh
# npm
npx create-expo-app@latest example-app --template default@sdk-56
cd example-app
cd your-expo-project

# yarn
yarn create expo-app example-app --template default@sdk-56
cd example-app
cd your-expo-project

# pnpm
pnpm create expo-app example-app --template default@sdk-56
cd example-app
cd your-expo-project

# bun
bun create expo example-app --template default@sdk-56
cd example-app
cd your-expo-project
```

Start your Expo development server:

```sh
# npm
npx expo start --web

# yarn
yarn expo start --web

# pnpm
pnpm expo start --web

# bun
bun expo start --web
```

Your app will be running on `http://localhost:8081`. Keep this terminal window open.

Use `mkcert` to generate a certificate for localhost. Run the following command in a new terminal window from your project's root directory:

```sh
mkcert localhost
```

> **Tip**: Ensure that after installing `mkcert`, you run `mkcert -install` to install the local certificate authority (CA).

This will generate two signed certificate files: `localhost.pem` (certificate) and `localhost-key.pem` (private key), inside your project's root directory.

Inside your project's root directory, run the following command to start the proxy:

```sh
# npm
npx local-ssl-proxy --source 443 --target 8081 --cert localhost.pem --key localhost-key.pem

# yarn
yarn dlx local-ssl-proxy --source 443 --target 8081 --cert localhost.pem --key localhost-key.pem

# pnpm
pnpm dlx local-ssl-proxy --source 443 --target 8081 --cert localhost.pem --key localhost-key.pem

# bun
bunx local-ssl-proxy --source 443 --target 8081 --cert localhost.pem --key localhost-key.pem
```

> **Tip**: [`local-ssl-proxy`](https://github.com/cameronhunter/local-ssl-proxy) is a tool that creates a proxy server that forwards HTTPS traffic from port 443 to your Expo dev server on port 8081.

This creates a proxy that forwards HTTPS traffic from port 443 to your Expo dev server on port 8081.

Open `https://localhost` in your browser to access your app. Your Expo app is now running with HTTPS.

## Localization
Source: https://docs.expo.dev/guides/localization/

# Localization

Learn about getting started and configuring localization in an Expo project using expo-localization.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

If you want your app to be easy to use for users who speak different languages or come from different cultures, you should localize it. Localizing an app makes it adapt to the locale of the user's device. The app will show translations and currencies that the user knows and understands. Numbers, lists, and more will be formatted in a way that the user is used to.

This guide uses the `expo-localization` library for accessing user language settings and adding support for multiple languages. It uses `i18n-js` as an example to add multi-language support.

## Getting the user's language

Use the [`expo-localization`](/versions/latest/sdk/localization) library to get the user's current language. Install the package by running the following command:

```sh
npx expo install expo-localization
```

Then, you will be able to access localization methods and data in your app:

```tsx
import { getLocales } from 'expo-localization';

const deviceLanguage = getLocales()[0].languageCode;
```

The `getLocales` method returns the current locale based on the system settings of the device. On newer Android and iOS versions, app language can be set per app, so you usually don't need to build a custom UI to allow users to change the current locale inside of your app.

Sometimes, it makes sense to build a UI to allow the user to set other localization preferences on a per-app basis. As a general rule, you should allow the user to change the following:

-   Localized units if your app makes at least a moderate use of them (such as metric/imperial measurements, currency, temperature, and more)
-   Other preferences if there's no API to get the default value on platforms you want to support (check [`expo-localization`](/versions/latest/sdk/localization) API documentation for details)

### Enabling per-app language selection via system settings

Both Android and iOS allow users to choose a preferred language for individual apps via the system settings. To support this feature, your app must declare its supported locales to the system.

To do so, use the [`expo-localization`](/versions/latest/sdk/localization#installation) config plugin and pass the `supportedLocales` property to the `expo-localization` config plugin. You can either provide an array of supported locales directly, or use the `supportedLocales.ios` and `supportedLocales.android` fields to specify platform-specific values:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-localization",
        {
          "supportedLocales": {
            "ios": ["en", "ja"],
            "android": ["en", "ja"]
          }
        }
      ]
    ]
  }
}
```

> On Android, refer to the [locale naming guidelines](https://developer.android.com/guide/topics/resources/app-languages#locale-names) and the [list of most commonly used locales](https://developer.android.com/guide/topics/resources/app-languages#sample-config).
> 
> On iOS, use the language name or ISO language designator.

## Translating an app

Creating and managing translations quickly becomes a large task. You can handle translations manually, but it's best to use a library to handle this for you.

Let's make the app support English and Japanese. To achieve that, this guide uses the `i18n-js` package:

```sh
npx expo install i18n-js
```

Take a look at [other translation libraries](/guides/localization#other-translation-libraries) to find one that best suits your needs.

Then, configure the languages for your app:

```tsx
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n({
  en: { welcome: 'Hello' },
  ja: { welcome: 'こんにちは' },
});

// Set the locale once at the beginning of your app.
i18n.locale = getLocales().at(0)?.languageCode ?? 'en'; // you can also do getLocales()[0].languageCode ?? 'en'

console.log(i18n.t('welcome'));
```

Now, you can use the `i18n.t` function to translate strings throughout your application.

You can refrain from localizing text for certain things, for example, names. In this case, you can define them _once_ in your default language and reuse them with `i18n.enableFallback = true;`.

On Android, when a user changes the device's language, the app will not reset. You can use the [`AppState`](https://reactnative.dev/docs/appstate#basic-usage) API to listen for changes to the app's state and call the `getLocales()` function each time the app's state changes.

On iOS, when a user changes the device's language, the app will reset. This means you can set the language once without updating any of your React components to account for the language changes.

### Complete example

```tsx
import { View, StyleSheet, Text } from 'react-native';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: { welcome: 'Hello', name: 'Charlie' },
  ja: { welcome: 'こんにちは' },
};
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {i18n.t('welcome')} {i18n.t('name')}
      </Text>
      <Text>Current locale: {i18n.locale}</Text>
      <Text>Device locale: {getLocales()[0].languageCode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 16,
  },
});
```

### Other translation libraries

This guide uses `i18n-js` as an example, but other libraries can also help you with the task. Creating translations is a major effort. Some pointers to consider when choosing a library:

-   Integration with translation management tools for easier strings management and automations.
-   Ability to provide context to strings, so that AI translation tools and/or human reviewers can understand the context of the string and provide better translations.
-   Developer experience - usage in the context of React / JSX. Some libraries come with ESLint plugins and other tools to help in development.
-   Don't worry about localizing dates or numbers - use standardized `Intl` APIs for that.

Here is a non-exhaustive list of other libraries you can consider:

-   [Lingui](https://lingui.dev/) is a mature library with first-class React (including React Server Components (RSC)) support and integrates well with translation management tools.
    
-   [fbtee](https://fbtee.dev/) is an internationalization framework for JavaScript and React designed to be powerful, flexible, and intuitive.
    
-   [React i18next](https://react.i18next.com/) is a stable, well-maintained library based on `i18next`.
    
-   [Intlayer](https://intlayer.org/doc/environment/react-native-and-expo) is per-component i18n library, with extractor, AI tools, focusing on bundle size and performance.
    

### Translating app metadata

If you plan on shipping your app to different countries or regions or want it to support various languages, you can provide [localized](/versions/latest/sdk/localization) strings for things like the display name and system dialogs. This is easily set up [in the app config](/workflow/configuration) file. First, set `ios.infoPlist.CFBundleAllowMixedLocalizations: true`, then provide a list of file paths to `locales`.

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "CFBundleAllowMixedLocalizations": true
      }
    },
    "locales": {
      "ja": "./languages/japanese.json"
    }
  }
}
```

The keys provided to `locales` should be the [language identifier](https://developer.apple.com/documentation/xcode/choosing-localization-regions-and-scripts), made up of a [2-letter language code](https://www.loc.gov/standards/iso639-2/php/code_list.php) of your desired language, with an optional region code (for example, `en-US` or `en-GB`), and the value should point to a JSON file that looks something like below:

```json
{
  "ios": {
    "CFBundleDisplayName": "こんにちは",
    "NSContactsUsageDescription": "日本語のこれらの言葉",
    "Localizable.strings": {
      "HELLO_NOTIFICATION_KEY": "こんにちは世界"
    }
  },
  "android": {
    "app_name": "こんにちは",
    "HELLO_NOTIFICATION_KEY": "こんにちは世界"
  }
}
```

Now, the display name of your app is set to `こんにちは` whenever it's installed on a device with the language set to Japanese.

In SDK 55 and later, there is an iOS-only option to specify a `Localizable.strings` object whose entries are used to create native localization files. The entries can be used in [iOS localized notifications](https://developer.apple.com/documentation/usernotifications/generating-a-remote-notification#Localize-your-alert-messages).

## Enabling RTL support

Several regions around the world write text from right to left. If you want to localize your app, so it looks as expected in RTL languages, you need to make sure your app handles these layout and text direction changes accordingly.

To enable RTL support, use the [`expo-localization`](/versions/latest/sdk/localization#installation) config plugin and enable `extra.supportsRTL` property in app config:

```json
{
  "expo": {
    "extra": {
      "supportsRTL": true
    },
    "plugins": ["expo-localization"]
  }
}
```

This enables RTL when your app is loaded in Expo Go, in Expo dev Client, and in applications built using EAS Build or `npx expo prebuild`.

When an application starts, Expo checks if the current device locale should render in RTL layout to look correctly. For example, an app marked to support RTL in the app config file will render in RTL mode in Hebrew or Arabic locale.

### Forcing RTL layout

You can also force the RTL layout for testing or for applications that are only localized for RTL locales by enabling `extra.forcesRTL` property in the app config:

```json
{
  "expo": {
    "extra": {
      "supportsRTL": true,
      "forcesRTL": true
    },
    "plugins": ["expo-localization"]
  }
}
```

Dynamically overriding RTL settings

If you want to override the default RTL detection from your application code dynamically, you cannot use the static configuration in app config. Instead, apply these changes dynamically from your application code.

This does not work in Expo Go, as Expo Go resets RTL preferences when opening the launcher or individual projects.

```tsx
import { Text, View, StyleSheet, I18nManager, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

export default function App() {
  const shouldBeRTL = true;

  if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== 'web') {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    Updates.reloadAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{I18nManager.isRTL ? ' RTL' : ' LTR'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '50%',
    backgroundColor: 'pink',
  },
});
```

## Making an app behave correctly on RTL locales

### Layouts and views

You don't need to manually adjust `<View>` styling properties based on locale. You can use properties like `justifyContent`, `alignItems`, and others. Their property values change behavior as required.

-   On LTR locales, `start` and `end` are the same as `left` and `right`.
-   On RTL locales, `start` and `end` are the same as `right` and `left`.

> For more details on how RTL works in React Native check out the React Native [blog article](https://reactnative.dev/blog/2016/08/19/right-to-left-support-for-react-native-apps) introducing RTL support.

#### Web support

Web support for RTL layouts requires no app config changes.

Expo uses `react-native-web` for running Expo projects in the browser. To make `react-native-web` automatically adapt to locale direction, add a `dir` property to your root `<View>` component.

```tsx
import { View } from 'react-native';
import { getLocales } from 'expo-localization';
// ...

return <View dir={getLocales()[0].textDirection || 'ltr'}>...</View>;
```

> `textDirection` is not available on Firefox and older browser versions. [Detect it manually](https://stackoverflow.com/a/15726039) if needed.

### Text alignment

The React Native's `textDirection` property does not accept `start` or `end` values that you can use in flex properties. Instead, `left` effectively works as `start` (aligns to the left on LTR and the right on RTL), and `right` works as `end`.

However, the default unset value of `textDirection` property signifies the actual left (aligns to the left both on LTR and RTL). This means each `<Text>` tag should have the `textDirection: left` or `textDirection: right` style set if you want it to be aligned correctly.

It's best to define this style in your custom reusable `<Text>` component that you can then import everywhere you need to render text strings.

```tsx
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

const MobileText = (props: RNTextProps) => {
  return <RNText style={{ textAlign: 'left', ...props.style }} {...props} />;
};
export default MobileText;
```

#### Web support

For each text tag, you need to add the `lang` property with the current locale identifier. It's best to define this style in a custom reusable component.

```tsx
import { getLocales } from 'expo-localization';

const deviceLanguage = getLocales()[0].languageCode;

const WebText = (props: RNTextProps) => {
  return <RNText lang={deviceLanguage} {...props} />;
};

export default WebText;
```

You can then pick either the mobile or web Text component based on the current platform.

```tsx
const Text = Platform.OS === 'web' ? WebText : MobileText;
export default Text;
```

### Selecting assets based on locale direction

If you need to use different icons for LTR/RTL or change styles based on this setting, you can use [`I18nManager.isRTL`](https://reactnative.dev/docs/next/i18nmanager#isrtl) to get the current layout direction.

```tsx
import { I18nManager } from 'react-native';
const isRTL = I18nManager.isRTL;
```

## Locale settings and units

Expo provides the `expo-localization` library to allow you to read the user's locale and other preferences. You can use synchronous `getLocales()` and `getCalendars()` methods to get the current locale settings of the user device:

-   `getLocales()` returns a list of locales based on the order in which the user prefers them. There will always be at least one locale in the list.
    
-   `getCalendars()` returns a list of calendars based on the order in which the user prefers them. There will always be at least one calendar on the list.
    

```ts
import { getLocales, getCalendars } from 'expo-localization';

const {
  languageTag,
  languageCode,
  textDirection,
  digitGroupingSeparator,
  decimalSeparator,
  measurementSystem,
  currencyCode,
  currencySymbol,
  regionCode,
} = getLocales()[0];

const { calendar, timeZone, uses24hourClock, firstWeekday } = getCalendars()[0];
```

Limitations

There are a few limitations to keep in mind when relying on auto-detected locale preferences from `expo-localization`.

-   There is yet to be a way to read temperature units from user preferences. On Android, you can use a lookup table based on locale. However, on iOS, the user can change it in device preferences.
-   Some properties can be null when they are unavailable on the current platform.

## Intl API

If you're using Hermes in your app, you can use the [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) API on all platforms.

It provides a set of utilities you can use to format lists, dates, numbers, monetary amounts, units, plural forms, and more.

If you pass `default` as the locale string, the `Intl` API will use the device's locale, so you don't need to rely on `expo-localization` to get the current locale (such as `"en-US"`).

```ts
new Intl.NumberFormat('default', { style: 'currency', currency: 'EUR' }).format(5.0);
```

> You can use `Intl` APIs to format strings and values once you know what the user expects to see.
> 
> `Intl` APIs do not provide information about the device or current locale, so you can't use the `Intl` APIs to get current locale units, currencies, or measurement systems.
> 
> For this you need to use `expo-localization`, JS code on the web, or third-party or custom native code on Android and iOS.


## Minifying JavaScript
Source: https://docs.expo.dev/guides/minify/

# Minifying JavaScript

Learn about customizing the JavaScript minification process in Expo CLI with Metro bundler.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Minification is an optimization build step. It removes unnecessary characters such as collapses whitespace, removes comments, and shortens static operations, from the source code. This process reduces the final size and improves load times.

## Minification in Expo CLI

In Expo CLI, minification is performed on JavaScript files during the production export (when `npx expo export`, `npx expo export:embed`, `eas build`, and so on, commands run).

For example, consider following code snippet in a project:

```js
// This comment will be stripped
console.log('a' + ' ' + 'long' + ' string' + ' to ' + 'collapse');
```

This will be minified by the Expo CLI:

```js
console.log('a long string to collapse');
```

> **Tip:** Comments can be preserved by using the `/** @preserve */` directive.

The default minification of Expo CLI is sufficient for most projects. However, you can customize the minifier to optimize for speed or remove additional features like logs.

## Remove console logs

You can remove console logs from your production build. Use the `drop_console` option in the Terser minifier config.

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.minifierConfig = {
  compress: {
    // The option below removes all console logs statements in production.
    drop_console: true,
  },
};

module.exports = config;
```

You can also pass an array of console types to drop if you want to preserve certain logs. For example: `drop_console: ['log', 'info']` will remove `console.log` and `console.info` but preserve `console.warn` and `console.error`.

## Customizing the minifier

Different minifiers have tradeoffs between speed and compression. You can customize the minifier used by Expo CLI by modifying the **metro.config.js** file in your project.

### Terser

> [`terser`](https://github.com/terser/terser) is the default minifier ([Metro@0.73.0 changelog](https://github.com/facebook/metro/releases/tag/v0.73.0)).

To install Terser in a project, run the command:

```sh
# npm
npm install --save-dev metro-minify-terser

# yarn
yarn add --dev metro-minify-terser

# pnpm
pnpm add --save-dev metro-minify-terser

# bun
bun add --dev metro-minify-terser
```

Set Terser as a minifier with `transformer.minifierPath`, and pass in [`terser` options](https://github.com/terser/terser#compress-options) to `transformer.minifierConfig`.

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = 'metro-minify-terser';
config.transformer.minifierConfig = {
  // Terser options...
};

module.exports = config;
```

### Unsafe Terser options

For additional compression that may not work in all JavaScript engines, enable the [`unsafe` `compress` options](https://terser.org/docs/miscellaneous/#the-unsafe-compress-option):

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = 'metro-minify-terser';

config.transformer.minifierConfig = {
  compress: {
    // Enable all unsafe optimizations.
    unsafe: true,
    unsafe_arrows: true,
    unsafe_comps: true,
    unsafe_Function: true,
    unsafe_math: true,
    unsafe_symbols: true,
    unsafe_methods: true,
    unsafe_proto: true,
    unsafe_regexp: true,
    unsafe_undefined: true,
    unused: true,
  },
};

module.exports = config;
```

### esbuild

[`esbuild`](https://esbuild.github.io/) is used to minify exponentially faster than `uglify-es` and `terser`. For more information, see [`metro-minify-esbuild`](https://github.com/EvanBacon/metro-minify-esbuild#usage) usage.

### Uglify

You can use [`uglify-es`](https://github.com/mishoo/UglifyJS) by following the steps below:

To install Uglify in a project, run the command:

```sh
# npm
npm install --save-dev metro-minify-uglify

# yarn
yarn add --dev metro-minify-uglify

# pnpm
pnpm add --save-dev metro-minify-uglify

# bun
bun add --dev metro-minify-uglify
```

> Make sure the version of `metro-minify-uglify` matches the version of `metro` in your project.

Set Uglify as a minifier with `transformer.minifierPath`, and pass in [options](https://github.com/mishoo/UglifyJS#compress-options) to `transformer.minifierConfig`.

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.minifierPath = 'metro-minify-uglify';
config.transformer.minifierConfig = {
  // Options: https://github.com/mishoo/UglifyJS#compress-options
};

module.exports = config;
```

## Work with monorepos
Source: https://docs.expo.dev/guides/monorepos/

# Work with monorepos

Learn about setting up Expo projects in a monorepo with workspaces.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Monorepos, or _"monolithic repositories"_, are single repositories containing multiple apps or packages. They can help speed up development for larger projects, make it easier to share code, and act as a single source of truth. This guide will set up a simple monorepo with an Expo project. Expo has first-class support for monorepos managed with package managers supporting workspaces: [Bun](https://bun.sh/docs/install/workspaces), [npm](https://docs.npmjs.com/cli/using-npm/workspaces), [pnpm](https://pnpm.io/workspaces), and [Yarn](https://yarnpkg.com/features/workspaces) (v1 Classic and Berry). Expo automatically detects monorepos and configures new app projects added to a monorepo. The detection is based on the workspace configuration in your project.

> Monorepos are not for every project. They're useful if multiple apps live in a single repository and share code, or can be helpful to colocate native modules with your app. The tradeoff is increased complexity when setting up and configuring tooling. Check whether your tools and libraries work well within a monorepo before setting one up.

Automatic Configuration (Migrating to SDK 52+)

Expo configures Metro automatically for monorepos. You don't have to manually configure Metro when using monorepos if you use [`expo/metro-config`](/guides/customizing-metro).

If you previously configured Metro manually for monorepos and have a **metro.config.js** that modifies one of the following properties, delete these from your configuration:

-   `watchFolders`
-   `resolver.nodeModulesPath`
-   `resolver.extraNodeModules`
-   `resolver.disableHierarchicalLookup`

After deleting these options, you'll need to run Expo with `npx expo start --clear` once to erase the outdated Metro cache. If your app continues working as expected afterwards, it's a regular Node monorepo and won't need any special configuration going forward.

Manual Configuration (Before SDK 52)

Expo's Metro config has built-in monorepo support for Bun, npm, pnpm, and Yarn. You don't have to manually configure Metro when using monorepos if you use the config from [`expo/metro-config`](/guides/customizing-metro).

Before SDK 52, configuring a monorepo with Metro required two manual changes:

1.  Metro had to be configured to watch code within the monorepo manually (for example, not just **apps/cool-app**.)
2.  Metro's resolution had to be adjusted to find packages in other workspaces and multiple `node_modules` folders (for example, **apps/cool-app/node_modules** or **node_modules**.)

The configuration was adjusted by [creating a **metro.config.js**](/guides/customizing-metro#customizing) with the following content:

```js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(__dirname, '../..');
const config = getDefaultConfig(__dirname);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
```

> Learn more about [customizing Metro](/guides/customizing-metro).

## Setting up a monorepo

In a monorepo, your app will typically be a in sub-directory of your repository and your package manager is configured to allow you to add dependencies to other packages from within your monorepo. For example, a basic structure of a monorepo containing Expo apps may look like this:

-   **apps**: Contains multiple projects, including Expo apps.
-   **packages**: Contains different packages used by apps.
-   **package.json**: Root package file.

All monorepos should have a "root" **package.json** file. It is the main configuration for monorepos and may contain tools installed for all projects in the repository. Depending on which package manager you're using, the steps for setting up workspaces might differ, but for [Bun](https://bun.sh/docs/install/workspaces), [npm](https://docs.npmjs.com/cli/using-npm/workspaces), and [Yarn](https://yarnpkg.com/features/workspaces), a `workspaces` property should be added to the root **package.json** file that specifies [glob patterns](https://classic.yarnpkg.com/lang/en/docs/workspaces/#toc-tips-tricks) for all workspaces in your monorepo:

```json
{
  "name": "monorepo",
  "private": true,
  "version": "0.0.0",
  "workspaces": ["apps/*", "packages/*"]
}
```

For [pnpm](https://pnpm.io/workspaces), you'll have to create a [**pnpm-workspace.yaml**](https://pnpm.io/pnpm-workspace_yaml) instead:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Create your first app

Now that you have the basic monorepo structure set up, add your first app.

Before you create your app, you have to create the **apps** directory. This directory contains all separate apps or websites that belong to this monorepo. Inside this **apps** directory, you can create a sub-directory that contains the Expo app.

```sh
# npm
npx create-expo-app@latest --template default@sdk-56 apps/cool-app

# yarn
yarn create expo-app --template default@sdk-56 apps/cool-app

# pnpm
pnpm create expo-app --template default@sdk-56 apps/cool-app

# bun
bun create expo --template default@sdk-56 apps/cool-app
```

> If you have an existing app, you can copy all those files into a directory inside **apps**.

After copying or creating the first app, install your dependencies with your package manager from the root directory of your monorepo to check for common warnings.

### Create a package

Monorepos can help us group code in a single repository. That includes apps but also separate packages. They also don't need to be published. The [Expo repository](https://github.com/expo/expo) uses this as well. All the Expo SDK packages live inside the [**packages**](https://github.com/expo/expo/tree/main/packages) directory in our repo. It helps us test the code inside one of our [**apps**](https://github.com/expo/expo/tree/main/apps/native-component-list) directory before we publish them.

Let's go back to the root and create the **packages** directory. This directory can contain all the separate packages that you want to make. Once you are inside this directory, we need to add a new sub-directory. The sub-directory is a separate package that we can use inside our app. In the example below, we named it **cool-package**.

```sh
# npm
mkdir -p packages/cool-package && cd packages/cool-package && npm init

# yarn
mkdir -p packages/cool-package && cd packages/cool-package && yarn init

# pnpm
mkdir -p packages/cool-package && cd packages/cool-package && pnpm init

# bun
mkdir -p packages/cool-package && cd packages/cool-package && bun init -y
```

We won't go into too much detail in creating a package. If you are not familiar with this, consider using a simple app without monorepos. But, to make the example complete, let's add an **index.js** file with the following content:

```js
export const greeting = 'Hello!';
```

### Using the package

Like standard packages, we need to add our **cool-package** as a dependency to our **cool-app**. The main difference between a standard package, and one from the monorepo, is you'll always want to use the _"current state of the package"_ instead of a version. Let's add **cool-package** to our app by adding `"cool-package": "*"` to our app **package.json** file:

```json
{
  "name": "cool-app",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "cool-package": "*",
    "expo": "~56.0.0",
    "expo-status-bar": "~55.0.0",
    "react": "19.2.3",
    "react-native": "0.85"
  }
}
```

Bun, npm, and pnpm support specifying workspace dependencies using `"workspace:*"` instead of `"*"`. This will ensure that the workspace package never resolves a published package of the same name from the npm registry, but is optional.

After adding the package, install your dependencies with your package manager from the root directory of your monorepo to check for common warnings once again.

Now you should be able to use the package inside your app! To test this, let's edit the **App.js** in your app and render the `greeting` text from our **cool-package**.

```jsx
import { greeting } from 'cool-package';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{greeting}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

## Common issues

Monorepos may cause resolution and dependency issues that a regular project won't. They require more in-depth knowledge and require specific tooling configuration. You take on increased complexity and will need to solve issues you wouldn't run into without workspaces. Here are a couple of common issues you might encounter.

### Package managers with isolated dependencies

> From **SDK 54**, Expo supports isolated dependencies and isolated installations.  
> With **SDK 53**, disabling isolated dependencies is recommended, or you may encounter native build errors and dependency conflicts.

[Bun](https://bun.com/docs/install/isolated) and [pnpm](https://pnpm.io/settings#nodelinker) have first-class support for isolated installs. For pnpm, this is the default installation strategy unless it's disabled.

With isolated dependencies, package managers don't hoist packages from nested `node_modules` directories into higher ones. Instead, they create a central directory that contains your Node modules and create links to this directory. This dependency structure enforces that packages may only access their explicitly declared dependencies. This is a much stricter installation strategy than the traditional **hoisted** installation strategy, which are npm's and Yarn's default, to install dependencies in a flattened structure.

A side-effect of **hoisted** installations is that you can accidentally depend on Node modules you haven't specified in your own **package.json**'s `dependencies` or `peerDependencies`. Instead, many more dependencies that other packages rely on are hoisted and become accessible to you. This can cause non-deterministic behavior, and allow you to have broken dependency chains, which are more fragile and can cause resolution errors when updating or upgrading packages. This is especially common in monorepos.

**Starting with SDK 54**, Expo supports isolated dependencies. Unfortunately, not all packages you install will work and some React Native libraries may cause build or resolution errors when used with isolated dependencies. If you encounter issues with isolated installations with [pnpm](https://pnpm.io/settings#nodelinker), switch to the **hoisted** installation strategy by changing the `nodeLinker` setting in an **pnpm-workspace.yaml** file in the root of your repository:

```yaml
nodeLinker: hoisted
```

### Duplicate native packages within monorepos

Expo has improved support for more complete **node_modules** patterns, such as isolated modules. Unfortunately, if your app contains duplicate dependencies, issues may still occur:

-   Duplicate React Native versions in a single monorepo are not supported
-   Duplicate React versions in a single app will cause runtime errors
-   Duplicate versions of Turbo and Expo modules may cause runtime or build errors

You can check if your monorepo has multiple versions of a package, for example, `react-native`, and why they're installed through the package manager you use.

```sh
# npm
npm why react-native

# yarn
yarn why react-native

# pnpm
pnpm why --depth=10 react-native

# bun
bun pm why react-native
```

The output of these commands will be very different from one package manager to another, but you can spot duplicate packages in any of their outputs by looking for multiple versions of the package, for example `react-native@0.79.5` and `react-native@0.81.0`. **npm**,

#### Adding dependency resolutions for peer dependencies

If the duplicate dependency is not resolvable by you changing your dependencies, you may have to add a resolution. For example, not all packages have updated their **peerDependencies** to support React 19. To work around this, you can create a resolution to force a single version of `react` to be installed.

```json
{
  "name": "monorepo",
  "private": true,
  "version": "0.0.0",
  "workspaces": ["apps/*", "packages/*"],
  "resolutions": {
    "react": "^19.2.3"
  }
}
```

For [npm](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides), you have to use a property named `overrides` rather than `resolutions`.

#### Deduplicating auto-linked native modules

Often, duplicate dependencies won't cause any problems. However, native modules should never be duplicated, because only one version of a native module can be compiled for an app build at a time. Unlike JavaScript dependencies, native builds cannot contain two conflicting versions of a single native module.

From **SDK 54**, you can set `experiments.autolinkingModuleResolution` to `true` in your **app.json** to apply autolinking to Expo CLI and Metro bundler automatically. This will force dependencies that Metro resolves to match the native modules that [autolinking](/modules/autolinking) links for your native builds.

From **SDK 55**, this is enabled automatically for apps in monorepos.

#### Monorepos with TV projects

See the [Building for TV](/guides/building-for-tv#modify-dependencies-for-tv) dependencies section for the special `react-native` dependency requirements when a TV project is contained in a monorepo with other Expo projects.

### Script '...' does not exist

React Native uses packages to ship both JavaScript and native files. These native files also need to be linked, like the [**react-native/react.Gradle**](https://github.com/facebook/react-native/blob/v0.70.6/react.gradle) file from **android/app/build.Gradle**. Usually, this path is hardcoded to something like:

**Android** ([source](https://github.com/facebook/react-native/blob/e918362be3cb03ae9dee3b8d50a240c599f6723f/template/android/app/build.gradle#L84))

```groovy
apply from: "../../node_modules/react-native/react.gradle"
```

**iOS** ([source](https://github.com/facebook/react-native/blob/e918362be3cb03ae9dee3b8d50a240c599f6723f/template/ios/Podfile#L1))

```ruby
require_relative '../node_modules/react-native/scripts/react_native_pods'
```

Unfortunately, this path can be different in monorepos because of [hoisting](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/). It also doesn't use the [Node module resolution](https://nodejs.org/api/modules.html#all-together). You can avoid this issue by using Node to find the location of the package instead of hardcoding this:

**Android** ([source](https://github.com/expo/expo/blob/6877c1f5cdca62b395b0d5f49d87f2f3dbb50bec/templates/expo-template-bare-minimum/android/app/build.gradle#L87))

```groovy
apply from: new File(["node", "--print", "require.resolve('react-native/package.json')"].execute(null, rootDir).text.trim(), "../react.gradle")
```

**iOS** ([source](https://github.com/expo/expo/blob/61cbd9a5092af319b44c319f7d51e4093210e81b/templates/expo-template-bare-minimum/ios/Podfile#L2))

```ruby
require File.join(File.dirname(`node --print "require.resolve('react-native/package.json')"`), "scripts/react_native_pods")
```

In the snippets above, you can see that we use Node's own [`require.resolve()`](https://nodejs.org/api/modules.html#requireresolverequest-options) method to find the package location. We explicitly refer to `package.json` because we want to find the root location of the package, not the location of the entry point. And with that root location, we can resolve to the expected relative path within the package. [Learn more about these references here](https://github.com/expo/expo/blob/main/packages/expo-modules-core/README.md).

All Expo SDK modules and templates have these dynamic references and work with monorepos. However, occasionally, you might run into packages that still use the hardcoded path. You can manually edit it with [`patch-package`](https://github.com/ds300/patch-package#readme) or mention this to the package maintainers.


## React Native's New Architecture
Source: https://docs.expo.dev/guides/new-architecture/

# React Native's New Architecture

Learn about React Native's "New Architecture" and how and why to migrate to it.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

> **SDK 55 and later run entirely on the New Architecture.** The New Architecture is always enabled and cannot be disabled. If you need to use the legacy architecture, use SDK 54 or earlier.

The New Architecture is a name that we use to describe a complete refactoring of the internals of React Native. It is also used to solve limitations of the original React Native architecture discovered over years of usage in production at Meta and other companies.

In this guide, we'll talk about how to use the New Architecture in Expo projects today.

[New Architecture is here](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here) — A blog post from the React Native team at Meta that gives an overview of the features of the New Architecture and the motivations behind building it.

[React Native 0.82 - A New Era](https://reactnative.dev/blog/2025/10/08/react-native-0.82) — React Native 0.82 is the first version that runs entirely on the New Architecture. SDK 55 uses React Native 0.83, which inherits this behavior.

Why migrate to the New Architecture?

**The New Architecture is the present and future of React Native**. Starting with React Native 0.82, the New Architecture is always enabled and cannot be disabled. SDK 55 uses React Native 0.83, which inherits this behavior. The [legacy architecture was frozen](https://github.com/reactwg/react-native-new-architecture/discussions/290) in June 2025, meaning no new features or bugfixes are being developed for it.

**New React and React Native features are coming to the New Architecture only**. For example, the New Architecture includes [full support for Suspense](https://reactnative.dev/blog/2024/10/23/the-new-architecture-is-here#full-support-for-suspense) and [new styling capabilities](https://reactnative.dev/blog/2025/01/21/version-0.77#new-css-features-for-better-layouts-sizing-and-blending) that are not implemented in the legacy architecture. Many popular libraries now only support the New Architecture.

**If you are on SDK 54 or earlier**, you can still use the legacy architecture by setting `newArchEnabled` to `false`. However, you will need to migrate to the New Architecture before upgrading to SDK 55 or later.

## Expo tools and the New Architecture

As of SDK 53, all `expo-*` packages in the [Expo SDK](/versions/latest) support the New Architecture (including [bridgeless](https://github.com/reactwg/react-native-new-architecture/discussions/154)). [Learn more about known issues](/guides/new-architecture#known-issues-in-expo-sdk-libraries).

Additionally, all modules written using the [Expo Modules API](/modules/overview) support the New Architecture by default! So if you have built your own native modules using this API, no additional work is needed to use them with the New Architecture.

**As of January 2026, approximately 83% of SDK 54 projects built with [EAS Build](/build/introduction) use the New Architecture**.

## Third-party libraries and the New Architecture

The compatibility status of many of the most popular libraries is tracked on [React Native Directory](https://reactnative.directory/) ([learn more about known issues in third-party libraries](/guides/new-architecture#known-issues-in-third-party-libraries)). We've built tooling into Expo Doctor to integrate with React Native Directory to help you validate your dependencies, so you can quickly learn which libraries are unmaintained and which incompatible or untested with the New Architecture.

### Validate your dependencies with React Native Directory

Run `npx expo-doctor` to check your dependencies against the data in React Native Directory.

```sh
# npm
npx expo-doctor@latest

# yarn
yarn dlx expo-doctor@latest

# pnpm
pnpm dlx expo-doctor@latest

# bun
bunx expo-doctor@latest
```

You can configure the React Native Directory check in your **package.json** file. For example, if you would like to exclude a package from validation:

```json
{
  "expo": {
    "doctor": {
      "reactNativeDirectoryCheck": {
        "exclude": ["react-redux"]
      }
    }
  }
}
```

See all available options

-   **enabled**: If `true`, the check will warn if any packages are missing from React Native Directory. Set this to `false` to disable this behavior. In SDK 52 and later, this is set to `true` by default, otherwise it is `false` by default. You can also override this setting with the `EXPO_DOCTOR_ENABLE_DIRECTORY_CHECK` environment variable (0 is `false`, 1 is `true`).
-   **exclude**: List any packages you want to exclude from the check. Supports exact package names and regex patterns. For example, `["exact-package", "/or-a-regex-.*/"]`.
-   **listUnknownPackages**: By default, the check will warn if any packages are missing from React Native Directory. Set this to false to disable this behavior.

## Initialize a new project with the New Architecture

**As of SDK 52**, all new projects will be initialized with the New Architecture enabled by default.

```sh
# npm
npx create-expo-app@latest --template default@sdk-56

# yarn
yarn create expo-app --template default@sdk-56

# pnpm
pnpm create expo-app --template default@sdk-56

# bun
bun create expo --template default@sdk-56
```

## Enable the New Architecture in an existing project

**The New Architecture is always enabled in SDK 55 and later**. There is no option to disable it. SDK 55 uses React Native 0.83. [React Native 0.82 was the first version to remove the option to disable the New Architecture](https://reactnative.dev/blog/2025/10/08/react-native-0.82), and this applies to all later versions.

If you were previously using `newArchEnabled: false` in your app config, this setting will be ignored. Remove it from your configuration to avoid confusion.

Are you enabling the New Architecture in a bare React Native app?

If you are using Expo SDK 53 or later, the New Architecture is enabled by default. For SDK 55 and later, the New Architecture is always enabled and cannot be disabled. The following instructions apply to SDK 52 and earlier projects.

-   **Android**: Set `newArchEnabled=true` in the **gradle.properties** file.
-   **iOS**: If your project has a **Podfile.properties.json** file (which is created by `npx create-expo-app` or `npx expo prebuild`), you can enable the New Architecture by setting the `newArchEnabled` property to `"true"` in the **Podfile.properties.json** file. Otherwise, refer to the ["Enable the New Architecture for Apps"](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/enable-apps.md) section of the React Native New Architecture working group.

## Disable the New Architecture in an existing project

> **SDK 55 and later do not support disabling the New Architecture.** SDK 55 uses React Native 0.83. Starting with [React Native 0.82, the option to disable the New Architecture was removed](https://reactnative.dev/blog/2025/10/08/react-native-0.82), so setting `newArchEnabled` to `false` has no effect. If you need to use the legacy architecture, use SDK 54 or earlier.

> Expo Go only supports the New Architecture.

On **SDK 54 and earlier**, you can opt out of the New Architecture by setting the `newArchEnabled` property to `false` in app config and create a [development build](/develop/development-builds/introduction).

```json
{
  "expo": {
    "newArchEnabled": false
  }
}
```

Are you disabling the New Architecture in a bare React Native app (SDK 54 and earlier)?

-   **Android**: Set `newArchEnabled=false` in the **gradle.properties** file.
-   **iOS**: If your project has a **Podfile.properties.json** file (which is created by `npx create-expo-app` or `npx expo prebuild`), you can disable the New Architecture by setting the `newArchEnabled` property to `"false"` in the **Podfile.properties.json** file. Otherwise, refer to the ["Enable the New Architecture for Apps"](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/enable-apps.md) section of the React Native New Architecture working group.

## Troubleshooting

Meta and Expo are working toward making the New Architecture the default for all new apps and ensuring it is as easy as possible to migrate existing apps. However, the New Architecture isn't just a name — many of the internals of React Native has been re-architected and rebuilt from the ground up. As a result, you may encounter issues when enabling the New Architecture in your app. The following is some advice for troubleshooting these issues.

Can I still try the New Architecture even if some of the libraries I use aren't supported?

You may be able to try the New Architecture in your app even if some of the libraries you use aren't supported, but it will require temporarily removing those libraries. Create a new branch in your repository and remove any of the libraries that aren't compatible until your app is running. This will give you a good idea of what libraries still need work before you can fully migrate to the New Architecture. We recommend creating issues or pull requests on those libraries' repositories to help them become compatible with the New Architecture. Alternatively, you could switch to other libraries that are compatible with the New Architecture. Refer to [React Native Directory](https://reactnative.directory/) to find compatible libraries.

Known issues in React Native

Refer to the [issues labeled with "Type: New Architecture" on the React Native GitHub repository](https://github.com/facebook/react-native/issues?q=is%3Aopen+is%3Aissue+label%3A%22Type%3A+New+Architecture%22).

Known issues in Expo libraries

There are no known issues specific to the New Architecture in Expo libraries.

Known issues in third-party libraries

Since React Native 0.74, there are various Interop Layers enabled by default. This allows many libraries built for the old architecture to work on the New Architecture without any changes. However, the interop is not perfect and some libraries will need to be updated. The libraries that are most likely to require updates are those that ship or depend on third-party native code. [Learn more about library support in the New Architecture](https://github.com/reactwg/react-native-new-architecture/discussions/167).

Refer to [React Native Directory](https://reactnative.directory/) a more complete list of libraries and their compatibility with the New Architecture. The following libraries were found to be popular among Expo apps and are known to be incompatible:

The following are known issues with libraries that are popular among Expo apps.

-   **react-native-maps**: Version 1.20.x, which is the default for SDK 53, supports the New Architecture with the interop layer and works well for most features. A New Architecture-first version is available in version 1.21.0, which is still stabilizing. We encourage your to test it in your app, report issues that you find, and [follow along with the discussion on GitHub](https://github.com/react-native-maps/react-native-maps/discussions/5355). We are also investigating another approach that may provider a smoother migration path, by leaning on the [interop layer](https://github.com/reactwg/react-native-new-architecture/discussions/175) rather than rewriting the module. It's worth mentioning that if your app can force a minimum version of iOS 17, or does not need to support maps on iOS, then you can consider using [`expo-maps`](/versions/latest/sdk/maps) instead.
-   **@stripe/react-native**: The New Architecture is supported starting with version 0.45.0, which is the default for SDK 53.
-   **@react-native-community/masked-view**: Use `@react-native-masked-view/masked-view` instead.
-   **@react-native-community/clipboard**: Use `@react-native-clipboard/clipboard` instead.
-   **rn-fetch-blob**: Use `react-native-blob-util` instead.
-   **react-native-fs**: Use `expo-file-system` or [a fork of react-native-fs](https://github.com/birdofpreyru/react-native-fs) instead.
-   **react-native-geolocation-service**: Use `expo-location` instead.
-   **react-native-datepicker**: Use `react-native-date-picker` or `@react-native-community/datetimepicker` instead.

My build failed after enabling the New Architecture

This isn't entirely surprising! Not all libraries are compatible yet, and in some cases compatibility was only recently added and so you will want to ensure you update your libraries to their latest versions. Read the logs to determine which library is incompatible. Also, run `npx expo-doctor@latest` to check your dependencies against the data in React Native Directory.

When you are using the latest version of a library and it is not compatible, report any issues you encounter to the respective GitHub repository. Create a [minimal reproducible example](https://stackoverflow.com/help/minimal-reproducible-example) and report the issue to the library author. If you believe the issue originates in React Native itself, rather than a library, report it to the React Native team (again, with a minimal reproducible example).

## Guides: Overview
Source: https://docs.expo.dev/guides/overview/

# Guides: Overview

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

This section contains information about the development with Expo and Expo Application Services (EAS):

### Development process

Learn about the process of [building an app with Expo](/workflow/overview) to help understand the mental model of the core development loop. This section also dives into additional configurations and workflows you may require during the development process to help you develop, deploy, and maintain your app. It contains in-depth information about [app config](/workflow/configuration), [permissions](/guides/permissions), [universal links](/linking/into-your-app), [custom native code](/workflow/continuous-native-generation), [web](/workflow/web), and more.

### Expo Router

Learn about using different navigation functionalities from the [Expo Router](/router/introduction) library. It also covers a comprehensive [Hooks API](/versions/latest/sdk/router#hooks) that the library provides and other aspects of navigation such as [Authentication](/router/advanced/authentication), [Redirects](/router/reference/redirects), [Testing](/router/reference/testing), and more.

### Expo Modules API

Learn how to add and use native modules in your app using [Expo Modules API](/modules/overview).

### Tutorials

If you're looking for step-by-step tutorials for Expo and EAS, see the [Tutorial section](/tutorial/overview) which includes comprehensive tutorials for both [building apps with Expo](/tutorial/introduction) and [using EAS services](/tutorial/eas/introduction).

### Other content

Apart from the essentials listed above, there are plenty of other features to explore such as [Push notifications](/push-notifications/overview). We also have a collection of guides in the **Assorted** and third-party **Integrations** sections.

## Permissions
Source: https://docs.expo.dev/guides/permissions/

# Permissions

Learn about configuring and adding permissions in an app config file.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

When developing a native app that requires access to potentially sensitive information on a user's device, such as their location or contacts, the app must request the user's permission first. For example, to access the user's media library, the app will need to run [`MediaLibrary.requestPermissionsAsync()`](/versions/latest/sdk/media-library#medialibraryrequestpermissionsasync).

Permissions in standalone and [development builds](/develop/development-builds/introduction) require native build-time configuration before they can be requested using runtime JavaScript code. This is not required when testing projects in the [Expo Go](https://expo.dev/go) app.

> If you don't configure or explain the native permissions properly **it may result in your app getting rejected or pulled from the stores**.

## Android

Permissions are configured with the [`android.permissions`](/versions/latest/config/app#permissions) and [`android.blockedPermissions`](/versions/latest/config/app#blockedpermissions) keys in your [app config](/workflow/configuration).

Most permissions are added automatically by libraries that you use in your app either with [config plugins](/config-plugins/plugins#creating-a-config-plugin) or with a package-level **AndroidManifest.xml**. You only need to use `android.permissions` to add additional permissions that are not included by default in a library.

```json
{
  "android": {
    "permissions": ["android.permission.SCHEDULE_EXACT_ALARM"]
  }
}
```

The only way to remove permissions that are added by package-level **AndroidManifest.xml** files is to block them with the [`android.blockedPermissions`](/versions/latest/config/app#blockedpermissions) property. To do this, specify the **full permission name**. For example, if you want to remove the audio recording permissions added by `expo-camera`:

```json
{
  "android": {
    "blockedPermissions": ["android.permission.RECORD_AUDIO"]
  }
}
```

-   See [`android.permissions`](/versions/latest/config/app#permissions) to learn about which permissions are included in the default [prebuild template](/workflow/continuous-native-generation#templates).
-   Apps using _dangerous_ or _signature_ permissions without valid reasons **may be rejected by Google**. Ensure you follow the [Android permissions best practices](https://developer.android.com/training/permissions/usage-notes) when submitting your app.
-   [All available Android `Manifest.permissions`](https://developer.android.com/reference/android/Manifest.permission).

Are you using this library in an existing React Native app?

Modify **AndroidManifest.xml** to exclude specific permissions: add the `tools:node="remove"` attribute to a `<use-permission>` tag to ensure it is removed, even if it's included in a library's **AndroidManifest.xml**.

```xml
<manifest xmlns:tools="http://schemas.android.com/tools">
  <uses-permission tools:node="remove" android:name="android.permission.ACCESS_FINE_LOCATION" />
</manifest>
```

> You have to define the `xmlns:tools` attribute on `<manifest>` before you can use the `tools:node` attribute on permissions.

## iOS

Your iOS app can ask for system permissions from the user. For example, to use the device's camera or access photos, Apple requires an explanation for how your app makes use of that data. Most packages will automatically provide a boilerplate reason for a given permission with [config plugins](/config-plugins/introduction). These default messages will most likely need to be tailored to your specific use case for your app to be accepted by the App Store.

To set permission messages, use the [`ios.infoPlist`](/versions/latest/config/app#infoplist) key in your [app config](/workflow/configuration), for example:

```json
{
  "ios": {
    "infoPlist": {
      "NSCameraUsageDescription": "This app uses the camera to scan barcodes on event tickets."
    }
  }
}
```

Many of these properties are also directly configurable using the [config plugin](/config-plugins/introduction) properties associated with the library that adds them. For example, with [`expo-media-library`](/versions/latest/sdk/media-library) you can configure photo permission messages like this:

```json
{
  "plugins": [
    [
      "expo-media-library",
      {
        "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
        "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos."
      }
    ]
  ]
}
```

-   Changes to the **Info.plist** cannot be updated over-the-air, they will only be deployed when you submit a new native binary. For example, with [`eas build`](/build/introduction).
-   Apple's official [permission message recommendations](https://developer.apple.com/design/human-interface-guidelines/privacy#Requesting-permission).
-   [All available **Info.plist** properties](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html).

Are you using this library in an existing React Native app?

Add and modify the permission message values in **Info.plist** file directly. We recommend doing this directly in Xcode for autocompletion.

## Web

On the web, permissions like the `Camera` and `Location` can only be requested from a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts#When_is_a_context_considered_secure). For example, using `https://` or `http://localhost`. This limitation is similar to Android's manifest permissions and iOS's **Info.plist** usage messages and is enforced to increase privacy.

## Resetting permissions

Often you want to be able to test what happens when a user rejects permissions, to ensure your app reacts gracefully. An operating-system level restriction on both Android and iOS prohibits an app from asking for the same permission more than once (you can imagine how this could be annoying for the user to be repeatedly prompted for permissions after rejecting them). To test different flows involving permissions in development, you may need to uninstall and reinstall the native app.

When testing in [Expo Go](https://expo.dev/go), you can delete the app and reinstall it by running `npx expo start` and pressing I or A in the [Expo CLI](/more/expo-cli) Terminal UI.


## Precompiled Expo Modules
Source: https://docs.expo.dev/guides/prebuilt-expo-modules/

# Precompiled Expo Modules

Learn how precompiled Expo Modules reduce native build times on Android and iOS.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Native build times can slow down your development workflow. Expo provides precompiled versions of its most complex modules so your project links precompiled binaries instead of recompiling them from source on every build. On Android, those binaries ship as **.aar** files linked through Gradle. On iOS, they ship as `XCFrameworks` linked through CocoaPods. Both are bundled into the regular Expo npm packages and packages that aren't yet precompiled fall back to building from source automatically — precompiled and source-built modules coexist in the same project.

**Most projects don't need to do anything** — precompiled Expo Modules are enabled automatically in new and existing projects with a supported SDK version.

-   **Android**: Enabled by default since SDK 53.
-   **iOS**: enabled by default in SDK 56 and later. In SDK 55, enabled by default only on EAS Build — set `EXPO_USE_PRECOMPILED_MODULES=1` in your shell to opt in for local builds.

Disabling on iOS

Set `EXPO_USE_PRECOMPILED_MODULES` to `0`. For local builds, export the env var in your shell.

For EAS Build, create an [EAS environment variable](/eas/environment-variables/manage):

```sh
eas env:create --name EXPO_USE_PRECOMPILED_MODULES --value 0 --visibility plaintext
```

The CLI will prompt you to select which environment(s) (`development`, `preview`, `production`) the variable applies to.

Disabling specific modules via Expo Autolinking

Configure Expo Autolinking with `buildFromSource` in **package.json**. Use `".*"` to opt out of every precompiled module, or list specific package names. The same setting is available for both `android` and `ios`:

```json
{
  "name": "your-app-name",
  "expo": {
    "autolinking": {
      "android": {
        "buildFromSource": [".*"]
      },
      "ios": {
        "buildFromSource": [".*"]
      }
    }
  }
}
```

This is typically only needed when you're modifying module source code yourself.

Troubleshooting EAS Build

### iOS

On EAS Build, third-party libraries like `react-native-reanimated` and `react-native-worklets` are automatically downloaded as precompiled XCFrameworks. Local `pod install` does not fetch them by default. Those packages build from source locally and pick up any `staticFeatureFlags` overrides automatically, so flag and version mismatches surface primarily on EAS Build. Avoid enabling third-party precompiled downloads for local builds and keep this path scoped to EAS.

#### `react-native-reanimated` and `react-native-worklets`

These two packages are tightly coupled. `react-native-reanimated` links `react-native-worklets` at the native level.

**Opt out of both together.** If you need a source build for either package (for example to apply a patch or modify native code), list both in `buildFromSource`. Source-building only one produces a mixed precompiled/source linkage that fails to resolve the matching framework at runtime:

```json
{
  "expo": {
    "autolinking": {
      "ios": {
        "buildFromSource": ["react-native-reanimated", "react-native-worklets"]
      }
    }
  }
}
```

**Custom feature flags require a source build.** Feature-flag values are baked into the precompiled binary at build time, so any `worklets.staticFeatureFlags` or `reanimated.staticFeatureFlags` overrides in **package.json** are ignored. To apply them, disable precompiled modules with `EXPO_USE_PRECOMPILED_MODULES=0`.

**When to look here.** Runtime errors like `Unable to recognize flag: <NAME>` on EAS Build (but not locally) mean the precompiled artifact's flag list doesn't match your pinned package version. Use `buildFromSource` above and [file an issue on GitHub](https://github.com/expo/expo/issues).

## Progressive web apps
Source: https://docs.expo.dev/guides/progressive-web-apps/

# Progressive web apps

Learn how to add progressive web app support to Expo websites.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

A progressive web app (or PWA for short) is a website that can be installed on the user's device and used offline. We recommend building native apps whenever possible as they have the best offline support, but PWAs are a great option for desktop users.

## Favicons

Expo CLI automatically generates the **favicon.ico** file based on the `web.favicon` field in the **app.json**.

```json
{
  "web": {
    "favicon": "./assets/favicon.png"
  }
}
```

Alternatively, you can create a **favicon.ico** file in the **public** directory to manually specify the icon.

## Manifest file

PWAs can be [configured with a manifest file](https://developer.mozilla.org/en-US/docs/Web/Manifest) that describes the app's name, icon, and other metadata.

Create a PWA manifest in **public/manifest.json**:

```json
{
  "short_name": "Expo App",
  "name": "Expo Router Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

The files **logo192.png** and **logo512.png** are the icons that will be used when the app is installed on the user's device. These should be added to the **public** directory too.

Now link the manifest in your HTML file. The method here depends on the output mode of your website (indicated in `web.output` in the **app.json**––defaults to `single`).

If you're using a single-page app, you can link the manifest in your HTML file by first creating a template HTML in **public/index.html**:

```sh
# npm
npx expo customize public/index.html

# yarn
yarn expo customize public/index.html

# pnpm
pnpm expo customize public/index.html

# bun
bun expo customize public/index.html
```

Then add the manifest to the `<head>` tag:

```html
<link rel="manifest" href="/manifest.json" />
```

## Service workers

Service workers are primarily used to add offline support to websites. Google's Workbox is the best way to add service workers to a website. Follow the guide for [using Workbox CLI](https://developer.chrome.com/docs/workbox/modules/workbox-cli/), and wherever it refers to a "build script" use `npx expo export -p web` instead.

> Be careful adding service workers as they are known to cause unexpected behavior on web. If you accidentally ship a service worker that aggressively caches your website, users cannot request updates easily. For the best offline mobile experience, create a native app with Expo. Unlike websites with service workers, native apps can be updated through the app store to clear the cached experience. This would be similar to resetting the user's native browser (which they may have to do if the service worker is aggressive enough). See [why service workers are suboptimal](https://github.com/facebook/create-react-app/issues/2398) for more information.

For example, here's a possible flow for setting up Workbox:

Create a new project with the following command:

```sh
# npm
npm create expo -t tabs my-app
cd my-app

# yarn
yarn create expo -t tabs my-app
cd my-app

# pnpm
pnpm create expo -t tabs my-app
cd my-app

# bun
bun create expo -t tabs my-app
cd my-app
```

Now register the service worker in the HTML file. The method here depends on the output mode of your website (indicated in `web.output` in the **app.json**––defaults to `single`).

Next add a service worker registration script to the root **index.html**.

First create a template HTML in **public/index.html** if one does not already exist:

```sh
# npm
npx expo customize public/index.html

# yarn
yarn expo customize public/index.html

# pnpm
pnpm expo customize public/index.html

# bun
bun expo customize public/index.html
```

Then create the service worker registration script in the `<head>` tag:

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
</script>
```

Now build the website before running the wizard:

```sh
# npm
npx expo export -p web

# yarn
yarn expo export -p web

# pnpm
pnpm expo export -p web

# bun
bun expo export -p web
```

Run the wizard command, select `dist` as the root of the app, and the defaults for everything else... Going forward, you can add a build script in **package.json** to run both scripts in the correct order:

```json
{
  "scripts": {
    "build:web": "expo export -p web && npx workbox-cli generateSW workbox-config.js"
  }
}
```

If you host your website and visit with Chrome, you can inspect the service worker by going to **Application > Service Workers** in the Chrome DevTools.

## Publish websites
Source: https://docs.expo.dev/guides/publishing-websites/

# Publish websites

Learn how to deploy Expo websites for production.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

An Expo web app can be served locally for testing the production behavior, and deployed to a hosting service. We recommend deploying to [EAS Hosting](/eas/hosting) for the best feature support. You can also self-host or use a third-party service.

[Deploying instantly with EAS](/eas/hosting/get-started) — EAS Hosting is the best way to deploy your web app with support for custom domains, SSL, and more.

> For SDK 49 and earlier, you may need the [guide for publishing `webpack` builds](/archive/publishing-websites-webpack).

## Output targets

The [`web.output`](/versions/latest/config/app#output) target can be configured in the [app config](/workflow/configuration) to set the export method for the web app:

```json
{
  "expo": {
    "web": {
      "output": "server",
      "bundler": "metro"
    }
  }
}
```

Expo Router supports three output targets for web apps.

| Output | Expo Router | API Routes | Description |
| --- | --- | --- | --- |
| `single` (default) | ✓ | ✗ | Outputs a Single Page Application (SPA) with a single **index.html** in the output directory and has no statically indexable HTML. |
| `server` | ✓ | ✓ | Creates **client** and **server** directories. Client files are output as separate HTML files. API routes as separate JavaScript files for hosting with a custom Node.js server. |
| `static` | ✓ | ✗ | Outputs separate HTML files for every route in the **app** directory. |

> **Note**: For `static` and `server` output modes, you can configure [global HTTP headers](/router/web/server-headers) that are applied to all route responses via the `expo-router` plugin.

## Create a build

Creating a build of the project is the first step to publishing a web app... Run the universal export command to compile the project for web:

```sh
# npm
npx expo export -p web

# yarn
yarn expo export -p web

# pnpm
pnpm expo export -p web

# bun
bun expo export -p web
```

The resulting project files are located in the **dist** directory. Any files inside the **public** directory are also copied to the **dist** directory.

> Some paths such as `/assets` are reserved by Metro. Avoid placing files in **public/assets/** or other reserved paths. See [Reserved paths](/router/reference/reserved-paths) for the complete list.

## Serve locally

Use `npx expo serve` to quickly test locally how your website will be hosted in production. Run the following command to serve the static bundle:

```sh
# npm
npx expo serve

# yarn
yarn expo serve

# pnpm
pnpm expo serve

# bun
bun expo serve
```

## Hosting with EAS

When you're ready to go to production, you can instantly deploy your website with EAS CLI.

[Deploying instantly with EAS](/eas/hosting/get-started) — EAS Hosting is the best way to deploy your web app with support for custom domains, SSL, and more.

## Hosting on third-party services

### Netlify

[Netlify](https://www.netlify.com/) is a mostly-unopinionated platform for deploying web apps. This has the highest compatibility with Expo web apps as it makes few assumptions about the framework.

#### Manual deployment with the Netlify CDN

Install the Netlify CLI... Configure redirects for single-page applications... `expo.web.output: 'single'` generates a single-page application. It means there's only one **dist/index.html** file to which all requests must be redirected. This can be done in Netlify by creating a **./public/_redirects** file and redirecting all requests to **/index.html**.

```sh
/*    /index.html   200
```

Deploy the web build directory by running the following command:

```sh
netlify deploy --dir dist
```

#### Continuous delivery

Netlify can also build and deploy when you push to git or open a new pull request...

### Vercel

[Vercel](https://vercel.com/) has a single-command deployment flow. Install the [Vercel CLI](https://vercel.com/docs/cli). Configure redirects for single-page applications with a **vercel.json** file:

```json
{
  "buildCommand": "expo export -p web",
  "outputDirectory": "dist",
  "devCommand": "expo",
  "cleanUrls": true,
  "framework": null,
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/"
    }
  ]
}
```

Deploy the website with `vercel`.

### AWS Amplify Console, Firebase hosting, GitHub Pages

The guide also covers [AWS Amplify Console](https://console.amplify.aws), [Firebase Hosting](https://console.firebase.google.com/), and [GitHub Pages](https://pages.github.com/) deployment with step-by-step instructions for each platform.

## React Compiler
Source: https://docs.expo.dev/guides/react-compiler/

# React Compiler

Learn how to enable and use the React Compiler in Expo apps.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The new [React Compiler](https://react.dev/learn/react-compiler) automatically memoizes components and hooks to enable fine-grained reactivity. This can lead to significant performance improvements in your app. You can enable it in your app by following the instructions below.

## Enabling React Compiler

[Check how compatible](https://react.dev/learn/react-compiler#checking-compatibility) your project is with the React Compiler.

```sh
# npm
npx react-compiler-healthcheck@latest

# yarn
yarn dlx react-compiler-healthcheck@latest

# pnpm
pnpm dlx react-compiler-healthcheck@latest

# bun
bunx react-compiler-healthcheck@latest
```

This will generally verify if your app is following the [**rules of React**](https://react.dev/reference/rules).

Install `babel-plugin-react-compiler` and the React compiler runtime in your project:

Babel is automatically configured in Expo SDK 54 and later.

Toggle on the React Compiler experiment in your app config file:

```json
{
  "expo": {
    "experiments": {
      "reactCompiler": true
    }
  }
}
```

### Enabling the linter

Run [`npx expo lint`](/guides/using-eslint#eslint) to set up ESLint in your app, then follow the instructions for your SDK version:

React Compiler lint rules are included by default with `eslint-config-expo` in SDK 55 and later.

### Incremental adoption

You can incrementally adopt the React Compiler in your app using a few strategies:

Configure the Babel plugin to only run on specific files or components... Use the `"use no memo"` directive to opt out of the React Compiler for specific components or files.

## Usage

Improvements are primarily automatic. You can remove instances of `useCallback`, `useMemo`, and `React.memo` in favor of the automatic memoization. Class components will not be optimized. Instead, migrate to function components.

Expo's implementation of the React Compiler will only run on application code (no node modules), and only when bundling for the client (disabled in server rendering).

## Configuration

You can pass additional settings to the React Compiler Babel plugin by using the `react-compiler` object in the Babel configuration...


## Migrate to the new expo-calendar API
Source: https://docs.expo.dev/guides/sdk-libraries-migration/calendar/

# Migrate to the new expo-calendar API

Migrate from the legacy expo-calendar API to the new class-based expo-calendar API with ExpoCalendar, ExpoCalendarEvent, and hooks.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The new object-oriented `expo-calendar` API is now stable. The legacy API is available from `expo-calendar/legacy`. Migrate to the root `expo-calendar` import to benefit from the new API and future fixes.

The new API replaces free functions that accepted IDs with methods on class instances. Calendars, events, reminders, and attendees are now represented as class instances with their own methods. Key changes:

-   Operations on calendars, events, reminders, and attendees are now methods on the corresponding instance instead of free functions that accept an ID.
-   `createCalendar`, `createEvent`, and `createReminder` return class instances instead of string IDs.

## Installation

Install the SDK-compatible package that includes the new `expo-calendar` API:

```sh
npx expo install expo-calendar
```

## Importing the new API

Import the legacy API from `expo-calendar/legacy` while you migrate, and import the new API from `expo-calendar`:

```ts
// Before
import * as Calendar from 'expo-calendar/legacy';

// After
import { ExpoCalendar, ExpoCalendarEvent } from 'expo-calendar';
```

## Calendars

### Create a calendar

```ts
// Before
const calendarId = await Calendar.createCalendarAsync({ title: 'My Calendar', color: '#ff0000' });

// After
const calendar = await createCalendar({ title: 'My Calendar', color: '#ff0000' });
```

`createCalendar` returns an `ExpoCalendar` instance, not just an ID.

### List calendars

```ts
// Before
const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

// After
const calendars = await getCalendars(EntityTypes.EVENT);
```

### Get a calendar by ID

```ts
// Before
// No direct equivalent, had to filter from getCalendarsAsync

// After
const calendar = await ExpoCalendar.get(calendarId);
```

### Update a calendar

```ts
// Before
await Calendar.updateCalendarAsync(calendarId, { title: 'Renamed' });

// After
await calendar.update({ title: 'Renamed' });
```

### Delete a calendar

```ts
// Before
await Calendar.deleteCalendarAsync(calendarId);

// After
await calendar.delete();
```

### Get default calendar (iOS only)

```ts
// Before
const calendar = await Calendar.getDefaultCalendarAsync();

// After
const calendar = getDefaultCalendarSync();
```

### Show a calendar picker (iOS only)

```ts
// Before
// No equivalent

// After
const calendar = await presentPicker();
if (calendar) {
  // user selected a calendar
}
```

## Events

### Create an event

```ts
// Before
const eventId = await Calendar.createEventAsync(calendarId, {
  title: 'Lunch',
  startDate,
  endDate,
});

// After
const event = await calendar.createEvent({ title: 'Lunch', startDate, endDate });
```

`createEvent` returns an `ExpoCalendarEvent` instance, not just an ID.

### List events in a calendar

```ts
// Before
const events = await Calendar.getEventsAsync([calendarId], startDate, endDate);

// After
const events = await calendar.listEvents(startDate, endDate);
```

### Get an event by ID

```ts
// Before
const event = await Calendar.getEventAsync(eventId);

// After
const event = await ExpoCalendarEvent.get(eventId);
```

### Update an event

```ts
// Before
await Calendar.updateEventAsync(eventId, { title: 'Lunch with Alex' });

// After
await event.update({ title: 'Lunch with Alex' });
```

### Delete an event

```ts
// Before
await Calendar.deleteEventAsync(eventId);

// After
await event.delete();
```

### Open event in calendar

```ts
// Before
await Calendar.openEventInCalendarAsync(params);

// After
await event.openInCalendar(params);
```

### Edit event with native form

```ts
// Before
await Calendar.editEventInCalendarAsync(params);

// After
await event.editInCalendar(params);
// or, to create a new event with form
await calendar.addEventWithForm({ title, startDate, endDate });
```

### Get recurring event occurrence

```ts
// Before
const event = await Calendar.getEventAsync(eventId, { instanceStartDate });

// After
const event = await ExpoCalendarEvent.get(eventId);
const occurrence = event.getOccurrenceSync({ instanceStartDate });
```

## Attendees

### Get attendees of an event

```ts
// Before
const attendees = await Calendar.getAttendeesForEventAsync(eventId);

// After
const attendees = await event.getAttendees();
```

### Add an attendee

```ts
// Before
const attendeeId = await Calendar.createAttendeeAsync(eventId, {
  email: 'alex@example.com',
  name: 'Alex',
  role: Calendar.AttendeeRole.ATTENDEE,
  type: Calendar.AttendeeType.PERSON,
  status: Calendar.AttendeeStatus.ACCEPTED,
});

// After
const attendee = await event.createAttendee({ email: 'alex@example.com', name: 'Alex' });
```

### Update an attendee (Android only)

```ts
// Before
await Calendar.updateAttendeeAsync(attendeeId, { name: 'Alexander' });

// After
await attendee.update({ name: 'Alexander' });
```

### Delete an attendee (Android only)

```ts
// Before
await Calendar.deleteAttendeeAsync(attendeeId);

// After
await attendee.delete();
```

## Reminders (iOS only)

### Create a reminder

```ts
// Before
const reminderId = await Calendar.createReminderAsync(calendarId, { title: 'Buy milk' });

// After
const reminder = await calendar.createReminder({ title: 'Buy milk' });
```

### List reminders

```ts
// Before
const reminders = await Calendar.getRemindersAsync([calendarId], status, startDate, endDate);

// After
const reminders = await calendar.listReminders(startDate, endDate, status);
```

### Get a reminder by ID

```ts
// Before
const reminder = await Calendar.getReminderAsync(reminderId);

// After
const reminder = await ExpoCalendarReminder.get(reminderId);
```

### Update a reminder

```ts
// Before
await Calendar.updateReminderAsync(reminderId, { title: 'Buy oat milk' });

// After
await reminder.update({ title: 'Buy oat milk' });
```

### Delete a reminder

```ts
// Before
await Calendar.deleteReminderAsync(reminderId);

// After
await reminder.delete();
```

## Sources

```ts
// Before
const sources = await Calendar.getSourcesAsync();

// After
const sources = getSourcesSync();
```

## Permissions

```ts
// Before
await Calendar.requestCalendarPermissionsAsync();
await Calendar.getCalendarPermissionsAsync();
await Calendar.requestRemindersPermissionsAsync();
await Calendar.getRemindersPermissionsAsync();

// After
await requestCalendarPermissions();
await getCalendarPermissions();
await requestRemindersPermissions();
await getRemindersPermissions();
```

## Breaking semantic changes

-   Calendars, events, reminders, and attendees are now class instances. Operations are methods on the instance instead of free functions that accept an ID. Use the corresponding `.get(id)` static method to obtain an instance if you only have an ID.
-   `createCalendar`, `createEvent`, and `createReminder` return class instances instead of string IDs.
-   The `Async` suffix is dropped. The majority of the library is asynchronous — only synchronous functions use a `Sync` suffix.
-   `getSourcesAsync` is replaced by the synchronous `getSourcesSync`.
-   `createEventInCalendarAsync` is renamed to `calendar.addEventWithForm`.
-   `openEventInCalendar` (the fire-and-forget sync variant) is removed.

## Reference

[Calendar](/versions/latest/sdk/calendar) — See the full API reference for expo-calendar.

## Migrate to the new expo-contacts API
Source: https://docs.expo.dev/guides/sdk-libraries-migration/contacts/

# Migrate to the new expo-contacts API

Migrate from the legacy expo-contacts API to the new class-based expo-contacts API with Contact.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The new class-based `expo-contacts` API is now stable. The legacy API is available from `expo-contacts/legacy`. Migrate to the root `expo-contacts` import to benefit from the new API and future fixes.

The new API replaces the function-based API with a `Contact` class. Contacts are represented as class instances that hold only the ID of the native contact. Key changes:

-   Contact properties (name, company, birthday, and more) are async getters and setters instead of plain object properties.
-   Sub-records (phones, emails, addresses, ...) are managed via dedicated `add*`/`get*`/`update*`/`delete*` methods instead of re-writing the entire array.
-   Two update methods are now available: `patch` for partial updates and `update` for full replacement.

## Installation

Install the SDK-compatible package:

```sh
npx expo install expo-contacts
```

## Importing the new API

Import from `expo-contacts`:

```ts
import { Contact } from 'expo-contacts';
```

## Contacts

### Create a contact

```ts
// Before
const id = await Contacts.addContactAsync({ firstName: 'John', lastName: 'Doe' });

// After
const contact = await Contact.create({ givenName: 'John', familyName: 'Doe' });
```

`Contact.create` returns a `Contact` instance, not just an ID.

### Get all contacts

```ts
// Before
const { data } = await Contacts.getContactsAsync({ ... });

// After
const contacts = await Contact.getAll({ ... });
// After, typed field projection
const contacts = await Contact.getAllDetails([ContactField.FULL_NAME, ContactField.PHONES], { ... });
```

### Get a contact by ID

```ts
const results = await Contact.getAllDetails([ContactField.FULL_NAME, ContactField.PHONES]);
const contact = new Contact(results[0].id);
```

### Count contacts

```ts
// Before
const hasAny = await Contacts.hasContactsAsync();

// After
const hasAny = await Contact.hasAny();
const count = await Contact.getCount();
```

### Update a contact

```ts
// After, partial update (only changes provided fields)
await contact.patch({ givenName: 'Andrew' });

// After, full replacement - all fields not provided will be cleared
await contact.update({ givenName: 'John', familyName: 'Doe', phones: [...] });
```

### Delete a contact

```ts
// After
await contact.delete();
```

## Scalar fields

All scalar contact properties are now async getters and setters. Use `get*` to read and `set*` to write.

## Sub-records

Sub-records are no longer managed by re-writing the entire array. Each type has dedicated `add*`, `get*`, `update*`, and `delete*` methods:

| Sub-record | Methods |
| --- | --- |
| Phone numbers | `addPhone`, `getPhones`, `updatePhone`, `deletePhone` |
| Emails | `addEmail`, `getEmails`, `updateEmail`, `deleteEmail` |
| Addresses | `addAddress`, `getAddresses`, `updateAddress`, `deleteAddress` |
| URLs | `addUrlAddress`, `getUrlAddresses`, `updateUrlAddress`, `deleteUrlAddress` |
| Social profiles | `addSocialProfile`, `getSocialProfiles`, `updateSocialProfile`, `deleteSocialProfile` |
| IM addresses | `addImAddress`, `getImAddresses`, `updateImAddress`, `deleteImAddress` |
| Dates | `addDate`, `getDates`, `updateDate`, `deleteDate` |
| Extra names (Android only) | `addExtraName`, `getExtraNames`, `updateExtraName`, `deleteExtraName` |

## Native UI

```ts
// After
const contact = await Contact.presentPicker();
const created = await Contact.presentCreateForm(contactData);
await contact.editWithForm();
```

## Groups (iOS only)

```ts
const groups = await Group.getAll();
const group = await Group.create('Family');
await group.addContact(contact);
await group.removeContact(contact);
```

## Containers (iOS only)

```ts
const containers = await Container.getAll();
const defaultContainer = await Container.getDefault();
```

## Permissions

```ts
const { status } = await requestPermissionsAsync();
const { status } = await getPermissionsAsync();
```

## Listening for changes

```ts
const subscription = addContactsChangeListener(() => { ... });
subscription.remove();
removeAllContactsChangeListeners();
```

## Breaking semantic changes

-   Field names follow the platform convention (`firstName`/`lastName` become `givenName`/`familyName`).
-   Field selection uses the typed `ContactField` enum.
-   The `Async` suffix is dropped.
-   Contact properties are now async getters and setters.
-   Sub-records are managed via dedicated methods.
-   Two update methods replace `updateContactAsync`: `patch` and `update`.
-   `shareContactAsync` and `writeContactToFileAsync` are removed.

## Reference

[Contacts](/versions/latest/sdk/contacts) — See the full API reference for expo-contacts.


## Migrate to the new expo-media-library API
Source: https://docs.expo.dev/guides/sdk-libraries-migration/media-library/

# Migrate to the new expo-media-library API

Migrate from the legacy expo-media-library API to the new class-based expo-media-library API with Asset, Album, and Query.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The new class-based `expo-media-library` API is now stable. The legacy API is available from `expo-media-library/legacy`. Migrate to the root `expo-media-library` import to benefit from the new API and future fixes.

The new API replaces the function-based `MediaLibrary.getAssetsAsync({ ... })` style with `Asset`, `Album`, and `Query` classes. Albums and assets are now represented as class instances that hold only the ID of the native asset. Asset properties are async getters instead of pre-fetched fields. `Query` replaces the `getAssetsAsync` function with a chainable builder pattern.

## Installation

```sh
npx expo install expo-media-library
```

## Importing the new API

```ts
import { Asset, Album, Query } from 'expo-media-library';
```

## Assets

### Create an asset from a file

```ts
// Before
await MediaLibrary.saveToLibraryAsync(localUri);
const asset = await MediaLibrary.createAssetAsync(localUri);

// After
const asset = await Asset.create(localUri);
```

### Query assets

```ts
// Before
const { assets } = await MediaLibrary.getAssetsAsync({ mediaType: ..., first: 20, ... });

// After
const assets = await new Query().eq(AssetField.MEDIA_TYPE, MediaType.IMAGE).limit(20).orderBy(...).exe();
```

### Read asset properties

```ts
// After, individual getters
const filename = await asset.getFilename();
const width = await asset.getWidth();
const height = await asset.getHeight();

// After, all properties at once
const info = await asset.getInfo();
```

### Read EXIF data

```ts
const exif = await asset.getExif();
```

### Delete assets

```ts
// After, single asset
await asset.delete();

// After, multiple assets
await Asset.delete([asset1, asset2]);
```

## Albums

### Get an album by name

```ts
const album = await Album.get('MyAlbum');
```

### Get all albums

```ts
const albums = await Album.getAll();
```

### Create an album

```ts
const album = await Album.create('MyNewAlbum', [asset]);
```

### Get all assets in an album

```ts
const assets = await album.getAssets();
```

### Add assets to an album

```ts
await album.add([asset]);
```

### Remove assets from an album (iOS only)

```ts
await album.removeAssets(assets);
```

### Delete an album

```ts
// single
await album.delete();
// multiple
await Album.delete([album1, album2]);
```

## Permissions

The permission hooks and functions are available under the same names. `presentPermissionsPickerAsync` was renamed to `presentPermissionsPicker`. `requestPermissionsAsync`, `getPermissionsAsync`, and `usePermissions` are unchanged.

## Listening for changes

```ts
const subscription = addListener(event => { ... });
subscription.remove();
removeAllListeners();
```

## Breaking semantic changes

-   Asset properties are now async getters instead of synchronous fields on a result object.
-   The `Async` suffix is dropped.
-   `Query` replaces `getAssetsAsync`. No `endCursor`/`hasNextPage`. Use `.limit()` and `.offset()` for pagination.
-   Operations are methods on `Album` and `Asset` instances.
-   `saveToLibraryAsync` is replaced by `Asset.create`.
-   `getMomentsAsync`, `albumNeedsMigrationAsync`, and `migrateAlbumIfNeededAsync` are removed.

## Reference

[MediaLibrary](/versions/latest/sdk/media-library) — See the full API reference for expo-media-library.

## Using React Server Components in Expo Router apps
Source: https://docs.expo.dev/guides/server-components/

# Using React Server Components in Expo Router apps

Learn about rendering React components on the server in Expo.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

> [Experimentally](/more/release-statuses#experimental) available in **SDK 52 and later**. This is a [beta](/more/release-statuses#beta) release and subject to breaking changes.

React Server Components enable a number of exciting capabilities, including:

-   Data fetching with async components and React Suspense.
-   Working with secrets and server-side APIs.
-   Server-side rendering (SSR) for SEO and performance.
-   Build-time rendering to remove unused JS code.

Expo Router enables support for [React Server Components](https://react.dev/reference/rsc/server-components) on all platforms.

Prerequisites: A project using Expo Router, React Native New Architecture (enabled by default from SDK 52).

## Usage

To use React Server Components in your Expo app, you need to:

1.  Install `react-server-dom-webpack`: `npx expo install react-server-dom-webpack`
2.  Ensure entry module is `expo-router/entry` (default) in **package.json**.
3.  Enable the flag in app config:

```json
{
  "expo": {
    "experiments": {
      "reactServerFunctions": true
    }
  }
}
```

4.  Ensure `"origin"` is not set to a boolean value anywhere in your app config.
5.  Create an initial route **app/index.tsx** with a Server Function.

## Server Components

Server Components run in the server, meaning they can access server APIs and Node.js built-ins (when running locally). They can also use async components.

Key points:
-   You cannot use hooks like `useState`, `useEffect`, or `useContext` in Server Components.
-   You cannot use browser or native APIs in Server Components.
-   `"use server"` marks a file as having React Server Functions exported from it.
-   Server components have access to all environment variables.

## Client Components

Created by marking files with `"use client"` directive. Used for native APIs or React Context.

## React Server Functions

Server Functions are functions that run on the server and can be called from Client Components. They must always be an async function and are marked with `"use server"`.

Key points:
-   Only serializable data can be passed to/from Server Functions.
-   Server Functions can render React components and stream back an RSC payload.

## Library compatibility

Use `"use client"` directive to workaround libraries not optimized for RSC yet.

## Suspense

Stream back partial UI from the server while waiting for data.

## Secrets

Server Components can access `process.env` for secrets. Use `import 'server-only'` to ensure a module never runs on the client.

## Platform detection

Use `process.env.EXPO_OS` instead of `Platform.OS`. Detect server with `typeof window === 'undefined'`.

## Metadata

React 19 features like `<meta>` tags can be placed anywhere in your app (web-only).

## Request headers

Access request headers using `expo-router/rsc/headers` module.

## Full React Server Components mode

[Experimental] Enable `reactServerComponentRoutes` flag in app config. All routes render as Server Components by default.

## Deployment

Web: `npx expo export -p web` then deploy with EAS Hosting. Native: Deploy native React Server Components via EAS.

## Known limitations

-   Expo Snack does not support bundling Server Components.
-   EAS Update does not work with Server Components yet.
-   DOM components cannot use React Server Functions in production yet.
-   Production deployment is limited and not recommended yet.
-   `StyleSheet.create` and `Platform.OS` are not supported on native.

## Create app store assets
Source: https://docs.expo.dev/guides/store-assets/

# Create app store assets

Learn how to create screenshots and previews for your app's store pages.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Before submitting your app to the Google Play Store and Apple App Store, you need to provide some assets for your store listing page. The goal of these images and videos is to give your prospective users an idea of what your app experience is going to be like.

## Different approaches for creating "screenshots"

Three commonly used approaches: actual screenshots, screenshots within a design, or make it fancy.

## Google Play Store Asset Requirements

-   **App Icon**: 1, 512x512, 32-bit PNG (with alpha)
-   **Feature Graphic**: 1, 1024x500, JPEG or 24-bit PNG (no alpha)
-   **Screenshots**: 4-10, min 1024x500, max width 3840px, 9:16 aspect ratio
-   **Video** (optional): YouTube URL

## iOS App Store Asset Requirements

-   **Screenshots (iPhone with dynamic island)**: 2-10, 1320x2868 or 1290x2796
-   **Screenshots (iPad)**: 2-10, 2064x2752 or 2048x2732 (if iPad supported)
-   **Preview** (optional): up to 3 app previews per screen size

[Store assets Figma template](https://www.figma.com/community/file/1352686667495694112)

## Tailwind CSS
Source: https://docs.expo.dev/guides/tailwind/

# Tailwind CSS

Learn how to configure and use Tailwind CSS in your Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

> Standard Tailwind CSS supports only web platform. For universal support, use [NativeWind](https://www.nativewind.dev/) or [Uniwind](https://uniwind.dev/).

Prerequisites: A project using Metro for web (`web.bundler` set to `metro` in **app.json**).

## Configuration

```sh
# npm
npx expo install tailwindcss@3 postcss autoprefixer --dev
npx tailwindcss init -p
```

Add paths to template files in **tailwind.config.js**:

```js
module.exports = {
  content: ['./src/app/**/*.{js,tsx,ts,jsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

Create **global.css** with Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import **global.css** in your root layout.

## Usage

Use Tailwind with React DOM elements as-is, or use `{ $$css: true }` syntax for React Native web elements.

## Tailwind for Android and iOS

Tailwind does not support Android and iOS platforms. Use [NativeWind](https://www.nativewind.dev/) or [Uniwind](https://uniwind.dev/). Alternatively, use [DOM components](/guides/dom-components) to render your Tailwind web code in a WebView on native.

## Testing React Server Components
Source: https://docs.expo.dev/guides/testing-rsc/

# Testing React Server Components

Learn about writing unit tests for React Server Components in Expo.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

> This guide refers to the [experimental](/more/release-statuses#experimental) feature React Server Components which is still in development.

## Jest testing

`jest-expo` provides presets for testing Server Components:

| Runner | Description |
| --- | --- |
| `jest-expo/rsc/android` | Android-only runner |
| `jest-expo/rsc/ios` | iOS-only runner |
| `jest-expo/rsc/web` | Web-only runner |
| `jest-expo/rsc` | Multi-runner combining the above |

Create a **jest-rsc.config.js**:

```js
module.exports = require('jest-expo/rsc/jest-preset');
```

Add script to **package.json**:

```json
{ "scripts": { "test:rsc": "jest --config jest-rsc.config.js" } }
```

Tests go in a **__rsc_tests__** directory. Custom expect matchers: `toMatchFlight` and `toMatchFlightSnapshot`.

## Tips

Use `server-only` and `client-only` modules to assert module import restrictions. RSC supports package exports with the `react-server` condition.


## Tree shaking and code removal
Source: https://docs.expo.dev/guides/tree-shaking/

# Tree shaking and code removal

Learn about how Expo CLI optimizes production JavaScript bundles.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Tree shaking (dead code removal) is a technique to remove unused code from the production bundle.

## Platform shaking

Expo CLI creates separate bundles for each platform (Android, iOS, web). Code using `Platform.select` and `Platform.OS` from `react-native` is removed from other platforms' bundles.

## Remove development-only code

Use `process.env.NODE_ENV` or `__DEV__` to exclude development code from production bundles.

## Custom code removal

`EXPO_PUBLIC_` environment variables are inlined before minification and can be used to remove code from production bundles.

## Removing server code

`typeof window === 'undefined'` is transformed to `true` when bundling for server environments.

## React Native web imports

`babel-preset-expo` removes the `react-native-web` barrel file in production bundles when using ESM.

## Remove unused imports and exports

[Experimental] Available in SDK 52+. Expo can automatically remove unused imports and exports across modules. Enabled by default in SDK 54+.

## Barrel files

With Expo tree shaking, star exports (`export * from '...'`) are automatically expanded and shaken based on usage.

## Side-effects

Expo CLI respects module side-effects according to the Webpack system. Mark modules in `package.json` with `"sideEffects"`.

## Optimizing for tree shaking

With Expo tree shaking enabled, restructure code to use ESM imports instead of conditional `require()` calls.

## Using TypeScript
Source: https://docs.expo.dev/guides/typescript/

# Using TypeScript

An in-depth guide on configuring an Expo project with TypeScript.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo has first-class support for TypeScript.

## Quick start

```sh
npx create-expo-app@latest --template default@sdk-56
```

## Migrating existing JavaScript project

1. Rename files to `.tsx` or `.ts` extension
2. Install dev dependencies: `npx expo install typescript @types/react --dev`
3. Add **tsconfig.json** by running `npx expo customize tsconfig.json`
4. Enable strict mode by adding `"strict": true` under `compilerOptions`

### Path aliases (Optional)

Add path aliases in **tsconfig.json**:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

Expo CLI supports path aliases automatically. Disable with `tsconfigPaths: false` in app config.

### Absolute imports (Optional)

Set `compilerOptions.baseUrl` to `"./"` in **tsconfig.json**.

## Type generation

Some Expo libraries provide both static types and type generation capabilities, generated when the project builds.

## TypeScript for project's config files

Install `tsx` as a dev dependency and use `require('tsx/cjs')` in **metro.config.js** or **app.config.js** to enable TypeScript imports.

## Using a Content Management System (CMS)
Source: https://docs.expo.dev/guides/using-a-cms/

# Using a Content Management System (CMS)

An overview of Content Management Systems (CMS) available in the Expo and React Native ecosystem.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

A **Content Management System (CMS)** is a platform that allows you to create, manage, and organize digital content without writing custom backend code.

Popular CMS options for Expo and React Native:

-   [Strapi](https://strapi.io/integrations/expo) — Learn how to integrate Strapi into your Expo app.
-   [Sanity](https://www.sanity.io/docs/visual-editing/visual-editing-with-react-native) — Implement Visual Editing in Expo and React Native with Sanity's guide.

## React Native analytics SDKs and libraries
Source: https://docs.expo.dev/guides/using-analytics/

# React Native analytics SDKs and libraries

An overview of analytics services available in the Expo and React Native ecosystem.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Common analytics providers:

-   [Google Firebase Analytics](https://rnfirebase.io/analytics/usage)
-   [Segment](https://segment.com/docs/connections/sources/catalog/libraries/mobile/react-native/)
-   [Amplitude](https://www.docs.developers.amplitude.com/data/sdks/typescript-react-native/)
-   [AWS Amplify](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/react-native/)
-   [Vexo](https://docs.vexo.co/)
-   [Aptabase](https://aptabase.com/for-react-native) — Works with Expo Go
-   [Astrolytics](https://www.astrolytics.io/react-native) — Works with Expo Go
-   [PostHog](https://posthog.com/docs/libraries/react-native) — Works with Expo Go
-   [Dreambase](https://dreambase.ai/docs)

> Most analytics SDKs require configuring custom native code. Use a [development build](/develop/development-builds/introduction) when needed.

## Using authentication SDKs and libraries
Source: https://docs.expo.dev/guides/using-authentication/

# Using authentication SDKs and libraries

An overview of authentication integrations available in the Expo and React Native ecosystem.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Authentication SDKs help you add sign-up, sign-in, and session management flows.

Popular auth integrations:

-   [Using Clerk](/guides/using-clerk) — Add Clerk authentication and user management.
-   [Using Facebook authentication](/guides/facebook-authentication) — `react-native-fbsdk-next`
-   [Using Google authentication](/guides/google-authentication) — `@react-native-google-signin/google-signin`

> Some providers require custom native code and aren't supported in Expo Go. Use a [development build](/develop/development-builds/introduction) when needed.

## Using BugSnag
Source: https://docs.expo.dev/guides/using-bugsnag/

# Using BugSnag

A guide on installing and configuring BugSnag for end-to-end error reporting and analytics.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[BugSnag](https://www.bugsnag.com) is a stability monitoring solution that provides end-to-end error reporting and analytics. With BugSnag, developers can stabilize, prioritize, and fix bugs.

## Integration

See the [Expo BugSnag integration guide](https://docs.bugsnag.com/platforms/react-native/expo/) for instructions on adding BugSnag to your Expo apps, including uploading source maps for EAS Update.

## Using Bun
Source: https://docs.expo.dev/guides/using-bun/

# Using Bun

A guide on using Bun with Expo and EAS.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Bun](https://bun.sh/) is a JavaScript runtime and drop-in alternative for Node.js. Benefits include faster package installation and at least 4x faster startup time.

Prerequisites: Bun installed, Node.js (LTS) still required for `bun create expo` and `bun expo prebuild`.

## Start a new Expo project with Bun

```sh
bun create expo-app my-app
bun expo install expo-audio
```

## Use Bun for EAS builds

EAS detects Bun by the presence of **bun.lock** or **bun.lockb**. Specify Bun version in **eas.json**:

```json
{ "build": { "development": { "bun": "1.0.0" } } }
```

## Trusted dependencies

Add packages with `postinstall` scripts to `trustedDependencies` in **package.json**.

## Common errors

-   EAS Build fails when using Sentry and Bun: add `@sentry/cli` to `trustedDependencies`.

## Using Clerk
Source: https://docs.expo.dev/guides/using-clerk/

# Using Clerk

Learn how to add Clerk authentication and user management in your Expo and React Native projects.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Clerk](https://clerk.com/expo-authentication) provides sign-up, sign-in, multi-factor authentication, social sign-in, and organizations. The `@clerk/expo` SDK gives React hooks, control components, and prebuilt native UI components.

## Choose your integration approach

| Approach | Runs in Expo Go | Best for |
| --- | --- | --- |
| JavaScript only | ✓ | Maximum UI control, prototyping |
| JavaScript with native sign-in | ✗ | Custom look but native social sign-in |
| Native UI components | ✗ | Fastest path to complete sign-in UI |

## Prerequisites

Clerk account, Native API enabled in Clerk Dashboard, Expo SDK 53+, development build (for native features).

## Install and configure Clerk

```sh
npx expo install @clerk/expo expo-secure-store
```

Add `@clerk/expo` to plugins in app config. Add `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` to **.env**. Wrap app in `<ClerkProvider>`.

## Build your sign-in screen

Use `<AuthView />` from `@clerk/expo/native` for native UI components, or build custom screens with `useSignIn()`/`useSignUp()`.

## Read the signed-in user

Use `useUser()` and `useAuth()` hooks, plus `<Show>` component and `useClerk()` for sign out.


## Using Convex
Source: https://docs.expo.dev/guides/using-convex/

# Using Convex

Add a database to your app with Convex.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Convex](https://www.convex.dev/) is a backend platform with a realtime database, server functions, file storage, search, scheduling, and type-safe client libraries.

## Connect Convex with EAS

Run the EAS CLI integration command:

```sh
eas integrations:convex:connect
```

This installs `convex`, creates a Convex project and deployment, writes env vars to **.env.local**, and configures EAS environment variables.

### Start Convex locally

```sh
npx convex dev
```

### Add a Convex provider

Create a Convex client and wrap your app in `ConvexProvider`.

### Query Convex from your app

Add a query function in the **convex** directory, then call it with `useQuery`.

## Manage the integration

Use `eas integrations:convex:project`, `eas integrations:convex:dashboard`, `eas integrations:convex:team`, etc.

## Using ESLint and Prettier
Source: https://docs.expo.dev/guides/using-eslint/

# Using ESLint and Prettier

A guide on configuring ESLint and Prettier to format Expo apps.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## ESLint

### Setup

```sh
npx expo lint
```

This creates **eslint.config.js** extending `eslint-config-expo`.

From SDK 53+, the default config uses Flat config format.

### Usage

```sh
npx expo lint
```

### Environment configuration

For config files running in Node.js, use `languageOptions.globals` with `globals.node`.

## Prettier

```sh
npx expo install prettier eslint-config-prettier eslint-plugin-prettier --dev
```

Update **eslint.config.js** to add `eslintPluginPrettierRecommended`.

Create a **.prettierrc** file for custom settings.

## Migration to Flat config

Upgrade ESLint and `eslint-config-expo`: `npx expo install eslint eslint-config-expo --dev`. Delete **.eslintrc.js** and regenerate with `npx expo lint`.

## React Native feature flag services
Source: https://docs.expo.dev/guides/using-feature-flags/

# React Native feature flag services

An overview of feature flag services available in the Expo and React Native ecosystem.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

A feature flag enables and disables features remotely, useful for testing in production, A/B testing, or shipping new features.

## Feature flag services

-   [PostHog](https://posthog.com/) — Open-source product analytics with feature flagging, A/B testing, session recordings
-   [Statsig](https://statsig.com/) — Feature management with advanced statistical analysis and gradual rollouts
-   [LaunchDarkly](https://launchdarkly.com/) — Enterprise-grade feature management with real-time flag updates
-   [Firebase Remote Config](https://firebase.google.com/docs/remote-config) — Cloud service to change app appearance/functionality without app update

## Using Firebase
Source: https://docs.expo.dev/guides/using-firebase/

# Using Firebase

A guide on getting started and using Firebase JS SDK and React Native Firebase library.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Firebase](https://firebase.google.com/) is a Backend-as-a-Service (BaaS) platform providing hosted backend services.

## Using Firebase JS SDK

Works in Expo Go. Supports Authentication, Firestore, Realtime Database, Storage.

```sh
npx expo install firebase
```

Initialize with `initializeApp()` from `firebase/app`.

## Using React Native Firebase

Requires custom native code (development build). Install `expo-dev-client` and `@react-native-firebase/app`.

```sh
npx expo install expo-dev-client
npx expo install @react-native-firebase/app
```

Follow instructions from [React Native Firebase documentation](https://rnfirebase.io/).

## Using Hermes Engine
Source: https://docs.expo.dev/guides/using-hermes/

# Using Hermes Engine

A guide on configuring Hermes for both Android and iOS in an Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Hermes](https://hermesengine.dev/) is a JavaScript engine optimized for React Native that improves app start-up time and uses less memory.

## Support

Hermes is the default JavaScript engine used by Expo and is fully supported across all Expo tooling.

### Switch JavaScript engine on a specific platform

```json
{
  "expo": {
    "jsEngine": "hermes",
    "ios": { "jsEngine": "jsc" }
  }
}
```

## Publish updates

Publishing with `eas update` and `npx expo export` generates Hermes bytecode bundles. The Hermes bytecode format may change between versions, so update `runtimeVersion` accordingly.

## JavaScript debugger

Start with `npx expo start` then press J to open the debugger in Chrome or Edge. The developer menu has **Open DevTools** option.

## Using LogRocket
Source: https://docs.expo.dev/guides/using-logrocket/

# Using LogRocket

A guide on installing and configuring LogRocket for session replays and error monitoring.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[LogRocket](https://logrocket.com) records user sessions and identifies bugs.

## Install and configure LogRocket

```sh
npx expo install @logrocket/react-native expo-build-properties
```

Add config plugin to app config, then initialize LogRocket in your app.

## Connecting LogRocket on the EAS dashboard

Link your LogRocket account and project in Expo's dashboard under Account settings > Connections.

## Using Next.js with Expo for Web
Source: https://docs.expo.dev/guides/using-nextjs/

# Using Next.js with Expo for Web

A guide for integrating Next.js with Expo for the web.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

> Using Next.js is not an official part of Expo's universal app development workflow.

## Automatic setup

```sh
npx create-expo-app -e with-nextjs
```

- **Native**: `npx expo start`
- **Web**: `npx next dev`

## Manual setup

Install `expo`, `next`, `@expo/next-adapter`. Configure transpilation in **next.config.js** with `withExpo()`.

## Limitations

- Expo Next.js adapter does not support the experimental **app** directory.
- For file-based routing on native, use [Expo Router](https://github.com/expo/router).

## Using push notifications
Source: https://docs.expo.dev/guides/using-push-notifications-services/

# Using push notifications

Learn about push notification services compatible with Expo and React Native apps.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Expo push notifications

Free to use, unified API, EAS dashboard for tracking, testing with [Expo Notifications Tool](https://expo.dev/notifications). Limited to 600 notifications/sec/project.

## OneSignal

Customer engagement platform with push, in-app messaging, SMS, email. Includes [Expo config plugin](https://github.com/OneSignal/onesignal-expo-plugin).

## Braze

Customer engagement platform with push, in-app messaging, email, SMS. [React Native SDK](https://github.com/braze-inc/braze-react-native-sdk) and [config plugin](https://github.com/braze-inc/braze-expo-plugin/tree/main).

## Customer.io

Automated workflows with push, in-app, email, SMS. [Expo plugin](https://github.com/customerio/customerio-expo-plugin).

## CleverTap

All-in-one customer engagement platform. [React Native SDK](https://developer.clevertap.com/docs/react-native) and [Expo config plugin](https://github.com/CleverTap/clevertap-expo-plugin).

## Send directly via FCM and APNs

Use `expo-notifications` to retrieve native push tokens and configure notifications separately for each platform.

## React Native Firebase messaging

Use FCM as a unified push notification service for both Android and iOS.


## Using Resend
Source: https://docs.expo.dev/guides/using-resend/

# Using Resend

Learn how to integrate Resend in your Expo and React Native app to programmatically send emails with Expo Router's API Routes.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Resend](https://resend.com/) is an email API platform for developers to send, receive, and manage emails programmatically.

Prerequisites: Expo Router project, Expo account, EAS CLI, Resend account.

## Create a Resend API key

Save to **.env.local**: `RESEND_API_KEY=YOUR_RESEND_API_KEY`

## Install Resend SDK

```sh
npx expo install resend
```

## Enable and create an API route

Set `web.output` to `"server"` in app config. Create **api/audience+api.ts** with a `POST` handler using Resend SDK.

## Add a base URL

Add `EXPO_PUBLIC_BASE_URL` and `EXPO_PUBLIC_BASE_URL_LOCAL` to **.env.local**.

## Add a form to your Expo project

Example form component that calls the API route via `fetch()`.

## Deploy the API route to EAS Hosting

```sh
npx expo export --platform web
eas deploy --prod
```

## Using Sentry
Source: https://docs.expo.dev/guides/using-sentry/

# Using Sentry

A guide on installing and configuring Sentry for crash reporting.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Sentry](http://getsentry.com/) provides real-time insight into production deployments with info to reproduce and fix crashes.

## Install and configure Sentry

1. Sign up for Sentry, create a project, note organization slug, project name, DSN, and auth token.
2. Run the Sentry wizard: `npx @sentry/wizard@latest -i reactNative`
3. Verify the configuration with a release build.

## Usage with EAS Build

Ensure `SENTRY_AUTH_TOKEN` is set as a sensitive environment variable. Sentry automatically uploads source maps.

## Usage with EAS Update

After `eas update`, upload source maps:

```sh
npx sentry-expo-upload-sourcemaps dist
```

## Sentry integration with EAS dashboard

Link your Sentry account in Expo's Account settings > Connections. Link EAS project to Sentry project. View crash reports and session replays directly in EAS dashboard.

## Using Supabase
Source: https://docs.expo.dev/guides/using-supabase/

# Using Supabase

Add a Postgres Database and user authentication to your React Native app with Supabase.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Supabase](https://supabase.com/) is an open-source Firebase alternative providing Postgres database, auth, file storage, edge functions, realtime syncing, and AI toolkit.

## Using the Supabase TypeScript SDK

```sh
npx expo install @supabase/supabase-js expo-sqlite
```

Create a helper to initialize the Supabase client with the API URL and publishable key.

## Next steps

- [Build a User Management App](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- [Sign in with Apple](https://supabase.com/docs/guides/auth/social-login/auth-apple?platform=react-native)
- [Sign in with Google](https://supabase.com/docs/guides/auth/social-login/auth-google?platform=react-native)
- [Deep Linking for OAuth and Magic Links](https://supabase.com/docs/guides/auth/native-mobile-deep-linking)
- [Offline-first React Native Apps with WatermelonDB](https://supabase.com/blog/react-native-offline-first-watermelon-db)
- [React Native file upload with Supabase Storage](https://supabase.com/blog/react-native-storage)

## Using Vexo
Source: https://docs.expo.dev/guides/using-vexo/

# Using Vexo

A guide on installing and configuring Vexo for real-time user analytics.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Vexo](https://www.vexo.co/) provides real-time user analytics for Expo applications.

## Features

Active Users, Session Time, Downloads, OS Distribution, Version Adoption, Geographic Insights, Popular Screens, Session Replays, Heatmaps, Funnels, Custom Events.

## Getting started

1. Create a Vexo account and app to get an API key.
2. Install: `npm install vexo-analytics`
3. Initialize in entry file:

```tsx
import { vexo } from 'vexo-analytics';
vexo('YOUR_API_KEY');
```

4. Rebuild and run your app.

## Compatibility

Compatible with development builds. Not supported in Expo Go (requires custom native code).

## Why Metro?
Source: https://docs.expo.dev/guides/why-metro/

# Why Metro?

Learn why Metro is the future of universal bundling in React Native and how it benefits developers.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Metro](https://metrobundler.dev/) is the official bundler for Expo and React Native, maintained by Meta.

## Official Meta bundler

Used for developing some of the world's largest apps. Metro ensures continuity across Meta's tools and instant access to emerging features like React Fast Refresh, Hermes bytecode, and React Native DevTools.

## Battle-tested at scale

Nearly every React Native app uses Metro. Features delta bundling and shared remote caches.

## On-demand processing

No platform-specific work until requested. Aggressive caching and async routes enable incremental bundling.

## Multi-dimensional

Maximizes resource reuse across platforms and environments (server, client, DOM components).

## Reusable transform memoization

Creates cached transform artifacts usable across machines, enabling remote builder reuse.

## Optimized for custom runtimes

Optimized for React Native flexibility, generating specific language features for Hermes bytecode compilation.

## Cross-technology support

Enables DOM components — React components in native apps dynamically bundled as websites.

## Native asset exports

Supports exporting bundles to embed as native artifacts in standalone app binaries, leveraging OS-specific optimizations.

## Concurrent processing

All AST transformation is performed concurrently across all available threads.

## Comparison with other approaches

Metro uses a mix of technologies: JS/Flow for core, Watchman (C++) for file watching, Hermes parser (WebAssembly) for AST, Babel for transformation, Hermes/Terser (with optional ESBuild) for minification, LightningCSS (Rust) for CSS.



---



## Introduction to Expo Router
Source: https://docs.expo.dev/router/introduction/

# Introduction to Expo Router

Expo Router is an open-source routing library for Universal React Native applications built with Expo.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo Router is a file-based router for React Native and web applications. It allows you to manage navigation between screens in your app, allowing users to move seamlessly between different parts of your app's UI, using the same components on multiple platforms (Android, iOS, and web).

Expo Router brings the best file-system routing concepts from the web to a universal application — allowing your routing to work across every platform. When a file is added to the **app** directory, the file automatically becomes a route in your navigation.

**Key features**: Native, Shareable, Offline-first, Optimized, Iteration, Universal, Discoverable.

**Quick start**: Create a new app with `npx create-expo-app@latest --template default@sdk-56`. Start with `npx expo start`.



## Manual installation
Source: https://docs.expo.dev/router/installation/

# Manual installation

**Prerequisites**: Set up your development environment for running an Expo app.

**Install dependencies**: `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar`

**Setup entry point**: Set `"main": "expo-router/entry"` in package.json. Initial client file is **src/app/_layout.tsx** (or **app/_layout.tsx**).

**Modify project configuration**: Add deep linking `scheme` and enable typed routes: `"experiments": { "typedRoutes": true }`. For web, install `react-native-web` and `react-dom`, and set `"web": { "bundler": "metro" }`.

**Modify babel.config.js**: Use `babel-preset-expo` as the preset.

**Configure path aliases**: Add `"paths": { "@/*": ["./src/*"] }` to tsconfig.json.



## Core concepts of file-based routing in Expo Router
Source: https://docs.expo.dev/router/basics/core-concepts/

# Core concepts

1. **All screens/pages are files inside the src/app directory** — Every file defines a distinct page (except `_layout` files).
2. **All pages have a URL** — URL matches the file's location in src/app.
3. **First index.tsx is the initial route** — Expo Router looks for the first index.tsx matching `/`.
4. **Root _layout.tsx replaces App.jsx/tsx** — Rendered before any other route; put initialization code here.
5. **Default template uses platform-specific tabs** — Native tabs on Android/iOS, custom tabs on web.
6. **Non-navigation components live outside src/app** — Components go in src/components, etc.
7. **Customizing stack and tab navigators** — Use configuration options for headers, animations, gestures.



## Expo Router notation
Source: https://docs.expo.dev/router/basics/notation/

# Route notation types

- **Simple names**: Static routes matching exactly as named (e.g., `home.tsx` → `/home`).
- **Square brackets `[param]`**: Dynamic routes with URL parameters (e.g., `[userName].tsx` matches `/evanbacon`).
- **Parentheses `(group)`**: Route groups that don't affect the URL (e.g., `(home)/settings.tsx` → `/settings`).
- **index.tsx**: Default route for a directory.
- **_layout.tsx**: Defines how groups of routes relate (stack, tabs, etc.).
- **Plus sign `+`**: Special routes — `+not-found`, `+html`, `+native-intent`, `+middleware`.



## Navigation layouts in Expo Router
Source: https://docs.expo.dev/router/basics/navigation-layouts/

# Navigation layouts

**Root layout** (`src/app/_layout.tsx`): Entry point for navigation. Put initialization code (fonts, splash screen, context providers) here.

**Stacks**: Use `Stack` component in a layout file to create stack navigation. Add `Stack.Screen` with `name` prop for screen options.

**Tabs**: Three types:
- **JavaScript tabs** (`Tabs` from expo-router) — React Navigation bottom tabs
- **Native tabs** (`NativeTabs` from expo-router/unstable-native-tabs) — Platform-native tab bar
- **Platform-specific tabs** — Use `.native.tsx` and `.tsx` extensions for different platforms

**Slot**: A placeholder for the current child route, useful for wrapping routes with header/footer without a navigator.



## Navigating between pages in Expo Router
Source: https://docs.expo.dev/router/basics/navigation/

# Navigation

**Imperative navigation**: `useRouter()` hook provides `navigate()`, `push()`, `back()`, `replace()`.

**Links**: `<Link href="/about">` component. Use `asChild` prop for custom pressable components.

**Relative routes**: Use `./` (current directory) or `../` (parent directory) prefixes.

**Dynamic routes**: Link with `href={{ pathname: '/user/[id]', params: { id: 'bacon' } }}`.

**Query parameters**: Passed in URL or params object. Read with `useLocalSearchParams()`.

**Redirects**: `<Redirect href="/about" />` component.

**Prefetching**: `prefetch` prop on `<Link />` for faster navigation.

**Deep links**: Every page has a URL by default. Use `scheme` in app config.



## Common navigation patterns in Expo Router
Source: https://docs.expo.dev/router/basics/common-navigation-patterns/

# Common patterns

**Stacks inside tabs (nested navigators)**: Put a `Stack` layout inside a tab directory for multi-screen tabs.

**Platform-specific tabs**: Use `.native.tsx` and `.tsx` extensions for native tabs vs custom tabs.

**Shared routes**: Route groups can share a single screen between two tabs using comma syntax `(feed,search)`.

**Protected routes**: `Stack.Protected` with `guard` prop prevents access to routes based on conditions (e.g., authentication).

**Non-route authentication modals**: Use React Native `Modal` over `Slot` in a layout file instead of redirecting.



## Stack
Source: https://docs.expo.dev/router/advanced/stack/

# Stack navigator

**Setup**: Use `<Stack />` in a layout file. Routes inside that directory become stack screens.

**Screen options**: Configure via `<Stack.Screen name="route" options={{}} />` in layout or dynamically in the page component with `<Stack.Screen options={{}} />`.

**Header configuration**: Extensive options including `headerTitle`, `headerLeft`, `headerRight`, `headerStyle`, `headerTintColor`, `headerTransparent`, `headerLargeTitle`, `headerSearchBarOptions`, `headerBackTitle`, `headerBlurEffect`.

**Animations**: `animation` (default, fade, slide_from_bottom, flip, etc.), `animationDuration`, `gestureDirection`, `gestureEnabled`, `fullScreenGestureEnabled`.

**Presentation**: `card`, `modal`, `transparentModal`, `containedModal`, `fullScreenModal`, `formSheet`.

**Custom push behavior**: Use `getId()` function to control when new screens are pushed vs. reusing existing ones.

**Dismiss actions**: `dismiss(count)`, `dismissTo(href)`, `dismissAll()`, `canDismiss()`.

**iOS 26 Liquid Glass**: Use `UIDesignRequiresCompatibility` in Info.plist or swap to `expo-router/js-stack`.

**Common problems**: White flash between screens — wrap with `<ThemeProvider>`. Large title not collapsing — ensure ScrollView is first child.



## JavaScript tabs
Source: https://docs.expo.dev/router/advanced/tabs/

# JavaScript tabs

Uses React Navigation's bottom tabs. Define in a layout file with `<Tabs>` component.

**Tab bar options**: `tabBarActiveTintColor`, `tabBarInactiveTintColor`, `tabBarIcon`, `tabBarBadge`, `tabBarLabel`, `tabBarStyle`, `tabBarShowLabel`, `tabBarHideOnKeyboard`, `tabBarPosition` (bottom/top/left/right), `tabBarVariant` (uikit/material).

**Advanced**: Hide tab with `href: null`. Use dynamic routes in tabs with `href` option pointing to specific params.



## Native tabs
Source: https://docs.expo.dev/router/advanced/native-tabs/

# Native tabs

Uses platform's native tab bar (alpha, SDK 54+). Import from `expo-router/unstable-native-tabs`.

**Components**: `NativeTabs`, `NativeTabs.Trigger`, `NativeTabs.Trigger.Icon`, `NativeTabs.Trigger.Label`, `NativeTabs.Trigger.Badge`.

**Icon props**: `sf` (SF Symbols iOS), `md` (Material Symbols Android), `src` (custom images), `xcasset` (iOS asset catalog). Supports `{default: ..., selected: ...}` for different states.

**Customization**: `hidden` prop to hide tab bar, `disablePopToTop`, `disableScrollToTop`, `disabled` prop (SDK 56+).

**iOS 26 features**: Separate search tab (`role="search"`), tabbar search input, minimize behavior (`minimizeBehavior`), bottom accessory (`BottomAccessory`).

**Known limitations**: Max 5 tabs on Android, no nested native tabs, no dynamic add/remove of tabs, limited FlatList support.



## Drawer
Source: https://docs.expo.dev/router/advanced/drawer/

# Drawer

Navigation drawer for swipe-open menu. Requires `react-native-reanimated`, `react-native-worklets`, `react-native-gesture-handler`.

**Usage**: Import `Drawer` from `expo-router/drawer`. Use `<Drawer />` in layout. Configure screens with `<Drawer.Screen name="route" options={{ drawerLabel, title }} />`.

Available in SDK 56+.



## Authentication in Expo Router
Source: https://docs.expo.dev/router/advanced/authentication/

# Authentication

**Protected routes** (SDK 53+): Use `Stack.Protected guard={condition}` to wrap screens. If guard is false, user is redirected to the first available screen.

**Setup**: Create a `SessionProvider` context with `useStorageState` hook (uses SecureStore on native, localStorage on web). Wrap root layout with provider.

**Root layout pattern**:
```tsx
function RootNavigator() {
  const { session } = useSession();
  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
```

**Modals and per-route auth**: Render sign-in modal over app with `presentation: 'modal'`.



## Authentication in Expo Router using redirects
Source: https://docs.expo.dev/router/advanced/authentication-rewrites/

# Authentication using redirects (SDK 52 and earlier)

Uses React Context and route groups. Redirects unauthenticated users to sign-in screen.

**Pattern**: Root layout renders `<Slot />` inside `SessionProvider`. Nested layout in `(app)` group checks auth and redirects with `<Redirect href="/sign-in" />`.

**Important**: The root layout's `<Slot />` must be mounted before any navigation events.



## Nesting navigators
Source: https://docs.expo.dev/router/advanced/nesting-navigators/

# Nesting navigators

Nesting navigators allows rendering a navigator inside a screen of another navigator.

**File structure**: Layout files define navigator type (Stack, Tabs). Child layouts define inner navigators.

**Navigation**: Use `router.push('/full/path')` to navigate to nested screens. No need for nested params like React Navigation.



## Modals
Source: https://docs.expo.dev/router/advanced/modals/

# Modals

**React Native Modal**: For standalone interactions, alerts, confirmations.

**Expo Router modal screen**: Create a screen file, set `presentation: 'modal'` in Stack.Screen options.

**Presentation options**: `card`, `modal`, `transparentModal`, `containedModal`, `containedTransparentModal`, `fullScreenModal`, `formSheet`.

**Form sheet**: Bottom sheet with configurable detents. Configure with `sheetAllowedDetents`, `sheetInitialDetentIndex`, `sheetGrabberVisible`, `sheetCornerRadius`, `sheetLargestUndimmedDetentIndex`.

**Anchor**: Use `unstable_settings = { anchor: 'index' }` to maintain background route when presenting modals.



## Web modals
Source: https://docs.expo.dev/router/advanced/web-modals/

# Web modals

Alpha feature, requires `EXPO_UNSTABLE_WEB_MODAL=1` env variable.

**Behavior**: On screens >768px width, displays as centered overlay (lightbox). On screens <768px, displays as bottom sheet.

**Configuration**: `presentation` (modal/formSheet/transparentModal/containedTransparentModal), `sheetAllowedDetents`, `webModalStyle` for custom CSS styling.

**Custom CSS variables**: `--expo-router-modal-width`, `--expo-router-modal-height`, `--expo-router-modal-border`, `--expo-router-modal-border-radius`, `--expo-router-modal-shadow`, `--expo-router-modal-overlay-background`.

**Transparent modal**: Use `presentation: 'transparentModal'` with custom styling and animations via `react-native-reanimated`.



## Shared routes
Source: https://docs.expo.dev/router/advanced/shared-routes/

# Shared routes

Match the same URL with different layouts using route groups with overlapping child routes.

**Pattern**: Create the same file in multiple group directories (e.g., `(home)/[user].tsx`, `(search)/[user].tsx`). Navigate by including group: `/(search)/baconbrix`.

**Array syntax**: Use `(home,search)/[user].tsx` to duplicate routes across groups. Requires `unstable_settings` with `initialRouteName` for each group.

**Key points**: Only provide groups for current navigator. Last group's segment used for route matching.



## Protected routes
Source: https://docs.expo.dev/router/advanced/protected/

# Protected routes

Prevent users from accessing routes using client-side navigation. Uses `Stack.Protected`, `Tabs.Protected`, or `Drawer.Protected` with `guard` prop.

**Behavior**: If `guard` is false, user is redirected to the anchor route (usually index). Available for Stack, Tabs, and Drawer navigators.

**Nesting**: Protected screens can be nested for hierarchical access control.

**Falling back**: Configure the navigator to fall back to a specific screen if access is denied.

**Note**: Protected screens are evaluated client-side only. Not a replacement for server-side authentication.



## Platform-specific extensions and module
Source: https://docs.expo.dev/router/advanced/platform-specific-modules/

# Platform-specific modules

**Extensions**: Use `.android.tsx`, `.ios.tsx`, `.native.tsx`, `.web.tsx` extensions.

- Inside `src/app`: Works only if a non-platform version also exists (ensures universal deep linking).
- Outside `src/app`: Works normally — Metro picks the correct file.

**Platform module**: Use `Platform.OS` from React Native to conditionally render layouts (e.g., Tabs on native, custom header on web).



## Customizing links
Source: https://docs.expo.dev/router/advanced/native-intent/

# Native intent (+native-intent.tsx)

Rewrite incoming native deep links by creating `src/app/+native-intent.tsx` exporting `redirectSystemPath({ path, initial })`.

**Use cases**: Handle third-party deep links, stale URLs from older app versions.

**Rewrite URLs**: Use `usePathname()` in layout files for global or localized URL rewriting.

**Sending events**: Track navigation events to analytics/services using `usePathname()` and `useEffect`.

**Forcing web links**: Use fully qualified URLs with `http`/`https` scheme.

**legacy_subscribe**: Alpha API for third-party providers that support React Navigation's `Linking.subscribe`.



## Router settings
Source: https://docs.expo.dev/router/advanced/router-settings/

# Router settings (unstable_settings)

**initialRouteName**: Sets default screen of a stack for deep linking. Ensures back button works when deep linking to nested routes.

```tsx
export const unstable_settings = {
  initialRouteName: 'index',
};
```

Supports array syntax groups: `export const unstable_settings = { initialRouteName: 'first', bar: { initialRouteName: 'second' } }`.

Does not work with async routes.



## Apple Handoff
Source: https://docs.expo.dev/router/advanced/apple-handoff/

# Apple Handoff

Continue app navigation across Apple devices. iOS only, requires universal links.

**Setup**: Configure `associatedDomains` in app config with `activitycontinuation`. Set `headOrigin` in `expo-router` config plugin. Generate `apple-app-site-association` file with `npx setup-safari`.

**Usage**: Add `<Head><meta property="expo:handoff" content="true" /></Head>` to routes. Meta tags: `expo:handoff`, `og:title`, `og:description`, `og:url`.

**Requirements**: Handoff-enabled devices, universal links configured, Expo Head component rendered on each page. Not available in Expo Go.



## Custom tab layouts
Source: https://docs.expo.dev/router/advanced/custom-tabs/

# Custom tab layouts (expo-router/ui)

Headless, unstyled tab components for fully custom tab layouts.

**Components**: `Tabs` (wrapper), `TabList` (container for triggers), `TabTrigger` (switch tabs), `TabSlot` (render current tab).

**Features**: Dynamic routes allowed via `href` with params. `reset` prop controls navigation state reset. `asChild` prop for custom styling. Hooks version available for advanced use.

**Multiple tab bars**: Hide `TabList` and use `TabTrigger` outside it for custom bar layouts.

**TabTrigger**: Can be used inside TabList (defines routes) or outside (invokes same action). Forwards `isFocused` prop.



## Stack Toolbar
Source: https://docs.expo.dev/router/advanced/stack-toolbar/

# Stack Toolbar

Add native toolbar items to Stack screens (alpha, iOS SDK 55+, Android SDK 56+).

**Header buttons**: `<Stack.Toolbar.Button>` with `placement="left"` or `placement="right"`.

**Icons**: SF Symbols (iOS), Material Symbols from `@expo/material-symbols` (Android), custom images.

**Action menus**: `<Stack.Toolbar.Menu>` with `<Stack.Toolbar.MenuAction>` children. Supports nested submenus.

**Bottom toolbar**: `Stack.Toolbar` without placement prop defaults to bottom. Only in page components, not layouts.

**Other components**: `Spacer`, `View` (custom views), `Icon`, `Label`, `Badge` (iOS only header placements).

**Known limitations**: Native only (no web), spacer requires explicit width on Android, badge only in header placements.



## Zoom transition
Source: https://docs.expo.dev/router/advanced/zoom-transition/

# Zoom transition

Fluid animation effect when navigating between screens by zooming from a source element. iOS 18+, alpha, SDK 55+.

**Components**: `Link.AppleZoom` wraps the source element. `Link.AppleZoomTarget` specifies target alignment on destination screen.

**Customization**: `alignmentRect` prop for custom alignment. `usePreventZoomTransitionDismissal` hook to control swipe-to-dismiss gesture.

**Known limitations**: iOS 18+ only, avoid using with headers, single child requirement, noticeable delay (~1s) with rapid open/close.



## Redirects and rewrites
Source: https://docs.expo.dev/router/advanced/redirects/

# Redirects and rewrites

**Redirect component**: `<Redirect href="/home" />` — immediate client-side redirect.

**Static redirects**: Configure in app.json via `expo-router` plugin:
```json
{ "plugins": [["expo-router", { "redirects": [{ "source": "/old", "destination": "/new", "permanent": true }] }]] }
```

Supports dynamic routes in source/destination, HTTP method filtering.

**Rewrites**: URL proxy that renders destination without changing URL. Server environments only (not static or native).



## API Routes
Source: https://docs.expo.dev/router/web/api-routes/

# API Routes

Create server endpoints using `+api.ts` files in the app directory.

**Setup**: Set `web.output: "server"`. Export `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS` functions.

**Requests**: Standard `Request` object. Access body with `request.json()`. Query params via `new URL(request.url).searchParams`.

**Responses**: Standard `Response` object. Use `Response.json()` for JSON responses.

**Runtime API**: `expo-server` library provides utilities — `StatusError`, `origin()`, `environment()`, `runTask()`, `deferTask()`, `setResponseHeaders()`.

**Deployment**: EAS Hosting, Express, Bun, Netlify, Vercel. Export with `npx expo export --platform web`.

**Security**: Server code is sandboxed from client bundle. Secrets in `+api.ts` files are not exposed to client.



## Data loaders
Source: https://docs.expo.dev/router/web/data-loaders/

# Data loaders

Server-side data fetching for routes (alpha, SDK 55+). Requires static or server rendering.

**Setup**: Enable `unstable_useServerDataLoaders` in expo-router plugin. Export `loader` function from route file. Use `useLoaderData<typeof loader>()` hook in component.

**Suspense**: Use `<Suspense>` boundaries around components that call `useLoaderData()`. Error handling via exported `ErrorBoundary` component.

**Dynamic routes**: Loaders receive route params as second argument. Request parameter available with server rendering.

**Runtime API**: Full access to `expo-server` utilities. Environment variables via `process.env`.

**Types**: `createStaticLoader`, `createServerLoader`, or `LoaderFunction` type for type-safe loaders.

**Static vs Server**: Static rendering executes loaders at build time; server rendering executes on each request.



## Server middleware
Source: https://docs.expo.dev/router/web/middleware/

# Server middleware

Run code before requests reach routes (alpha, SDK 54+). Requires server output.

**Setup**: Enable `unstable_useServerMiddleware` in expo-router plugin. Create `src/app/+middleware.ts` exporting default function.

**Pattern matching**: `unstable_settings.matcher` with `methods` (HTTP methods) and `patterns` (exact paths, named params `[param]`, catch-all `[...path]`, regex).

**Request immutability**: Can read headers/properties but cannot modify. Returns `Response` to abort or nothing to pass through.

**Runs for**: Initial page loads, full refreshes, direct navigation, API calls. Does NOT run for client-side navigation with `<Link>` or native screen transitions.



## Server headers
Source: https://docs.expo.dev/router/web/server-headers/

# Server headers

Set custom HTTP headers for HTML and API route responses (SDK 54+).

**Configuration**: In `expo-router` plugin in app config:
```json
{ "headers": { "X-Frame-Options": "DENY", "Cache-Control": "public, max-age=3600" } }
```

**Examples**: Security headers, Cross-Origin headers for SharedArrayBuffer, Cache-Control, custom metadata headers.

**Precedence**: API route headers override global headers. Only applies to HTML and API route responses (not static assets).



## Static rendering
Source: https://docs.expo.dev/router/web/static-rendering/

# Static rendering

Render routes to static HTML/CSS files for SEO.

**Setup**: Set `web.output: "static"` in app config. Export with `npx expo export --platform web`.

**Dynamic routes**: Use `generateStaticParams()` function to generate known routes at build time. Cascades from parent to child routes.

**Root HTML**: Customize via `src/app/+html.tsx`. Use `ScrollViewStyleReset` and `<Head>` component for meta tags.

**Static files**: `public/` directory contents copied to `dist/` during export.

**Fonts**: Expo Font automatically optimized at build time — embedded in HTML for preloading.

**Deployment**: Any static hosting — EAS Hosting, Netlify, Cloudflare Pages, Vercel, GitHub Pages.



## Server rendering
Source: https://docs.expo.dev/router/web/server-rendering/

# Server rendering

Dynamically render HTML at request time (alpha, SDK 55+).

**Setup**: Set `web.output: "server"` and enable `unstable_useServerRendering` in expo-router plugin.

**Dynamic routes**: Work automatically — no `generateStaticParams` needed.

**Root HTML**: Customize via `src/app/+html.tsx` using `useServerDocumentContext` hook for `htmlAttributes`, `bodyAttributes`, `headNodes`, `bodyNodes`.

**Metadata**: Export `generateMetadata` function from route file for per-page title, description, Open Graph tags.

**Deployment**: Requires server runtime — EAS Hosting, Express, Cloudflare Workers, Vercel Edge, Netlify Edge, Bun.



## Async routes
Source: https://docs.expo.dev/router/web/async-routes/

# Async routes

Auto-split JavaScript bundle based on route files using React Suspense (alpha).

**Setup**: Configure `asyncRoutes` in expo-router plugin: `{ "web": true, "default": "development" }`. Supports platform-specific settings.

**How it works**: Routes wrapped in suspense boundary, loaded asynchronously on first navigation, cached thereafter.

**Static rendering**: Suspense boundaries rendered synchronously in Node.js, async chunks linked in HTML.

**Caveats**: Native production apps not supported yet. Custom `SuspenseFallback` exports don't work with async routes. Development has lazy bundling.



## Error handling and loading states
Source: https://docs.expo.dev/router/error-handling/

# Error handling and loading states

**Unmatched routes**: Export `Unmatched` component from `expo-router` or create custom 404 screen. Route priority: public files → standard routes → API routes → not-found (404).

**ErrorBoundary**: Export from any route to intercept component-level errors. Receives `error` and `retry` props.

**SuspenseFallback**: Export from layout files (SDK 56+) to customize loading UI while child routes suspend. Receives `route` and `params` props. Nearest parent fallback takes precedence.

**Note**: Async routes do not support custom SuspenseFallback.



## Using URL parameters
Source: https://docs.expo.dev/router/reference/url-parameters/

# URL parameters

**Route parameters**: Dynamic segments in URL path (`/profile/[user]`). Search parameters: query params (`?extra=info`).

**Local vs Global**: `useLocalSearchParams()` — only updates when global URL conforms to the route. `useGlobalSearchParams()` — updates on every URL param change (may cause extra re-renders).

**Static typing**: Use generics: `useLocalSearchParams<{ user: string; query?: string }>()`.

**Updating parameters**: `router.setParams({ key: value })` — updates without pushing new history entry.

**Hash support**: Accessed as special param `'#'`: `const { '#': hash } = useLocalSearchParams()`.

**Reserved parameters** (avoid using): `screen`, `params`, `initial`, `state`.



## Color
Source: https://docs.expo.dev/router/reference/color/

# Color API

Type-safe access to platform-specific colors via `Color` from `expo-router`.

**Android**: `Color.android.*` — base colors, `Color.android.attr.*` (theme attributes), `Color.android.material.*` (Material Design 3), `Color.android.dynamic.*` (wallpaper-based dynamic colors, Android 12+).

**iOS**: `Color.ios.*` — UIKit system colors (e.g., `systemBackground`, `label`). Auto-adapt to light/dark mode.

**Cross-platform**: Use `Platform.select()` to pick the right color per platform.



## Sitemap
Source: https://docs.expo.dev/router/reference/sitemap/

# Sitemap

Expo Router generates `/_sitemap` for debugging — lists all routes in the app.

Disable with `sitemap: false` in expo-router config plugin.

Deep link testing: Use `npx uri-scheme open` CLI or browser for testing deep links.



## Redirects reference
Source: https://docs.expo.dev/router/reference/redirects/

# Redirects reference

**Redirect component**: `<Redirect href="/login" />` — immediate redirect from a screen.

**useRouter hook**: `router.replace('/profile/settings')` — imperative redirect without adding to history.



## Link preview
Source: https://docs.expo.dev/router/reference/link-preview/

# Link preview

iOS-only "Peek and Pop" feature (SDK 54+).

**Usage**: Replace link content with `<Link.Trigger>` and add `<Link.Preview>`.

**Customization**: Custom size via `style={{ width, height }}`. Custom preview content as children of `Link.Preview`. Context menu via `<Link.Menu>` with `<Link.MenuAction>` items (SF Symbol icons supported).

**Nested menus**: Place `<Link.Menu>` inside another menu.

**useIsPreview()**: Hook to detect if component is rendered inside a preview.

**Known limitations**: `replace` not supported. JavaScript tabs/slots may have clunky animations. Requires `Link.Trigger`.



## Typed routes
Source: https://docs.expo.dev/router/reference/typed-routes/

# Typed routes

Statically typed links and routes with TypeScript (beta).

**Setup**: Set `experiments.typedRoutes: true` in app.json. Run `npx expo start` to generate types.

**Features**: `<Link href="/about">` is type-checked. Dynamic routes require object href: `{ pathname: '/user/[id]', params: { id: 1 } }`. Relative paths not supported.

**Route parameters**: Pass full route to `useLocalSearchParams<'/(search)/[profile]/[...search]'>()` for typed params.

**Query parameters**: Manually type with generics: `useLocalSearchParams<{ query?: string }>()`.

**Global types**: Generated `expo-env.d.ts` file, React Native Web augmentation for web-only styles.



## Screen tracking for analytics
Source: https://docs.expo.dev/router/reference/screen-tracking/

# Screen tracking

Track route changes using `usePathname()` and `useGlobalSearchParams()` hooks in the root layout.

```tsx
export default function Layout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  useEffect(() => { analytics.track({ pathname, params }); }, [pathname, params]);
  return <Slot />;
}
```

Simpler than React Navigation's approach — no need for `onReady` or `onStateChange` callbacks.



## Top-level src directory
Source: https://docs.expo.dev/router/reference/src-directory/

# Top-level src directory

Projects on SDK 55+ already include a **src** directory by default.

**Setup**: Move **app** to **src/app**. Update tsconfig.json path aliases (`@/* → ./src/*`). Config files stay in root.

**Notes**: `src/app` takes precedence over root `app`. `public/` directory stays in root. Custom root directory with `root` option in expo-router plugin (not recommended).



## Testing configuration for Expo Router
Source: https://docs.expo.dev/router/reference/testing/

# Testing

`expo-router/testing-library` provides `renderRouter()` for integration tests.

**Inline file system**: Pass object with file paths as keys and components as values.
```tsx
renderRouter({ index: MockComponent, 'directory/a': MockComponent })
```

**Path to fixture**: Pass directory path relative to test file. Supports overrides.

**Jest matchers**: `toHavePathname()`, `toHavePathnameWithParams()`, `toHaveSegments()`, `useLocalSearchParams()`, `useGlobalSearchParams()`, `toHaveRouterState()`.

**Important**: Do not put test files inside the **app** directory.



## Troubleshooting
Source: https://docs.expo.dev/router/reference/troubleshooting/

# Troubleshooting

- **Missing files in DevTools**: Uncheck exclusions for `/node_modules/` in Chrome DevTools ignore list.
- **EXPO_ROUTER_APP_ROOT not defined**: Ensure `expo-router/babel` plugin is in babel.config.js. Clear cache with `npx expo start --clear`.
- **require.context not enabled**: Ensure metro.config.js uses `expo/metro-config` or delete custom config.
- **Missing back button**: Add `unstable_settings = { initialRouteName: 'index' }` to the route's layout.



## Reserved paths
Source: https://docs.expo.dev/router/reference/reserved-paths/

# Reserved paths

Avoid using these URL paths for routes or static files:

- `/assets/*` — Metro serves bundled assets here
- `/_expo/*` — Internal Expo Router middlewares
- `/_flight/*` — React Server Components
- `/inspector` — React Native debugger
- `/expo-dev-plugins/*` — Development tool plugins
- `/manifest` — Native app manifest
- `/_sitemap` — Router sitemap (can be overridden)
- `/public/*` — May conflict when public directory exists

Safe to override: `/favicon.ico`.



## Migrate from React Navigation
Source: https://docs.expo.dev/router/migrate/from-react-navigation/

# Migrate from React Navigation

**Recommendations**: Split screens into individual files, convert to TypeScript, use typed aliases, rename initial route to `index`.

**Migration steps**:
1. Delete unused/managed code (Expo Router auto-adds safe-area-context)
2. Copy screens to **src/app** directory
3. Replace navigators with directories and layout files
4. Use Expo Router hooks: `useRouter()`, `useLocalSearchParams()`, `useNavigation()`
5. Migrate `<Link to>` to `<Link href>`
6. Share screens across navigators with shared routes or re-export
7. Replace `NavigationContainer` — managed by Expo Router
8. Use `ThemeProvider` from `expo-router/react-navigation` for theming
9. Rewrite custom navigators with `withLayoutContext()` or `<Navigator>` component

**SDK 56 note**: Import from `expo-router/react-navigation`, `expo-router/js-stack`, `expo-router/js-tabs`, `expo-router/js-top-tabs` instead of `@react-navigation/*`.



## Migrate from Expo Webpack
Source: https://docs.expo.dev/router/migrate/from-expo-webpack/

# Migrate from Expo Webpack

`@expo/webpack-config` is deprecated. Expo Router uses Metro bundler.

**Key differences**: `npx expo export` → **dist** directory (vs `expo export:web` → **web-build**). Static files in **public** (vs **web**). Config in **metro.config.js** (vs **webpack.config.js**).

**Features**: Fast Refresh enabled by default, static rendering, API Routes, lazy bundling, environment variables, TypeScript path aliases.

**Service workers**: Not built-in. Use Workbox CLI as post-build step.

**PWA manifests**: Create **public/manifest.json** manually and link in `+html.tsx`.

**Base path**: Use `experiments.baseUrl` in app.json for subpath hosting.



## Migrate Expo Router from SDK 55 to SDK 56
Source: https://docs.expo.dev/router/migrate/sdk-55-to-56/

# Migrate SDK 55 to 56

In SDK 56, Expo Router no longer supports importing from `@react-navigation/*` packages in application code.

**Automated**: Run `npx expo-codemod sdk-56-expo-router-react-navigation-replace src`.

**Manual**: Update imports:
- `@react-navigation/native` → `expo-router/react-navigation`
- `@react-navigation/core` → `expo-router/react-navigation`
- `@react-navigation/elements` → `expo-router/react-navigation`
- `@react-navigation/routers` → `expo-router/react-navigation`
- `@react-navigation/stack` → `expo-router/js-stack`
- `@react-navigation/bottom-tabs` → `expo-router/js-tabs`
- `@react-navigation/material-top-tabs` → `expo-router/js-top-tabs`
- `@react-navigation/native-stack` → Use `Stack` layout
- `@react-navigation/drawer` → Use `Drawer` layout

**Libraries**: Expo CLI auto-rewrites node_modules imports. Set `EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1` to opt out.




---


## Modules (21)

---

## Expo Modules API: Overview
Source: https://docs.expo.dev/modules/overview/

An overview of the APIs and utilities provided by Expo to develop native modules.

## What is the Expo Modules API

The Expo Modules API allows you to write Swift and Kotlin to add new capabilities to your app with native modules and views. The API is designed to take advantage of modern language features, to be as consistent as possible on both platforms, to require minimal boilerplate, and provide comparable performance characteristics to React Native's Turbo Modules API. Expo Modules all support the New Architecture and are automatically backwards compatible with existing React Native apps using the old architecture.

We believe that using the Expo Modules API makes building and maintaining nearly all kinds of React Native modules about as easy as it can be, and we think that the Expo Modules API is the best choice for the vast majority of developers building native modules for their apps.

### Common questions

Do I need to know the Expo Modules API to build an Expo / React Native app?

Most of the time, Expo and React Native developers don't need to write any native code — libraries are already available for a wide range of use cases, from camera to video to maps to haptics and much more.

But sometimes, nothing does exactly what you need. Maybe you want to integrate an analytics service that your company mandates but that doesn't yet have a React Native library yet, so you need to build a module around their SDK. Or maybe you want to access a system feature that your app requires, but isn't commonly used, so nobody maintains a library for it.

When should I use Turbo Modules and when should I use the Expo Modules API?

To summarize and paraphrase the recommendation from the React Native team:

- If you intend to use C++ in your native module, use Turbo Modules since it provides easier access to lower-level mechanisms.
- If you are looking for a better developer experience and you are willing to depend on the `expo` package in your module, then use the Expo Modules API.

Where can I find open source Expo Modules to learn from?

The Expo SDK is a great place to look if you want to learn how we have implemented our libraries. Another great resource is open source apps, such as Bluesky.

The following libraries are some of our favorites from the community:

- `react-native-widget-extension`
- `burnt`
- `expo-video-metadata`
- `swiftui-react-native`
- `react-native-ios-context-menu`
- `react-native-mlkit`
- `react-native-passkeys`
- `expo-drag-drop-content-view`

What impact does using the Expo Modules API have on my app size?

Adding the Expo Modules API to your app has a negligible impact on your app size, it may increase the size by a few hundred kilobytes.

What impact does using the Expo Modules API have on my app's performance?

The Expo Modules API has similar performance characteristics to React Native's Turbo Modules API. Both APIs leverage React Native's JavaScript Interface (JSI), rather than the legacy approach of using a JSON message queue ("bridge").

Neither Expo Modules nor Turbo Modules are designed to be as fast as technically possible, but rather they are fast where it matters. Both can easily execute hundreds of thousands of native method calls per second.

Does the Expo Modules API support platforms other than Android, iOS, and web?

The Expo Modules API has experimental support for macOS and tvOS. See Additional platform support tutorial for more information.

How can I use the Expo Modules API to make a third-party SDK available to my Expo app?

Learn more about this in the Integrate an existing library tutorial.

## Next steps

Tutorial: Creating a native module — A tutorial on creating a native module that persists settings with Expo Modules API.

Tutorial: Creating a native view — A tutorial on creating a native view that renders a WebView with Expo Modules API.

Expo Modules API: Get started — Learn about getting started with Expo modules API.

Expo Modules API: Reference — A reference on creating native modules using Kotlin and Swfit.

Expo Modules API: Design considerations — An overview of the design considerations behind the Expo Modules API.

expo-module.config.json — A reference of available configuration options.

---

## Expo Modules API: Get started
Source: https://docs.expo.dev/modules/get-started/

Learn about getting started with Expo modules API.

There are two ways to get started with the Expo Modules API: you can either initialize a new module from scratch or add the Expo Modules API to an existing module. This guide will walk you through creating a new module from scratch, and the Integrating in an existing library covers the latter.

The two recommended flows to create a new module with Expo Modules API:

- Add a new module to an existing Expo application, and use it to test and develop your module.
- Create a new module in isolation with a generated example project if you want to reuse it in multiple projects or publish it to npm.

Both of these flows are covered in the next sections.

### Add a new module to an existing application

#### Create the local Expo module

Navigate to your project directory and run `npx create-expo-module@latest --local`. You can provide a meaningful module name in the CLI prompt. Once you've run the command, you will see a new directory created in your project called **modules**. The directory structure should look like this:

```
modules/
  my-module/
    android/
    ios/
    src/
    expo-module.config.json
    index.ts
```

Then, if your project doesn't have native projects generated, run `npx expo prebuild --clean`.

#### Use the local module

Import the local module in your application:

```tsx
import MyModule from '@/modules/my-module';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>{MyModule.hello()}</Text>
    </View>
  );
}
```

Start the development server: `npx expo start`.

### Create a new module with an example project

Run `npx create-expo-module@latest my-module`. Navigate to the module directory, open the example project, and start the development server.

### Next steps

Tutorial: Creating a native module — A tutorial on creating a native module that persists settings with Expo Modules API.

Expo Modules API Reference — A reference to create native modules using Swift and Kotlin.

---

## Tutorial: Create a native module
Source: https://docs.expo.dev/modules/native-module-tutorial/

A tutorial on creating a native module that persists settings with Expo Modules API.

In this tutorial, you build a module that stores the user's preferred app theme: dark, light, or system. On Android, use SharedPreferences, and on iOS, use UserDefaults.

### Initialize a new module

```sh
npx create-expo-module expo-settings
```

### Set up workspace

Delete the view module files. Replace boilerplate files with minimal native module code (Kotlin and Swift) that returns `"system"` from `getTheme()`.

### Run the example project

Build and run on Android/iOS to see "Theme: system".

### Get, set, and persist the theme preference value

On Android, use `SharedPreferences`. On iOS, use `UserDefaults`. Update the native modules with `setTheme` and `getTheme` functions.

### Emit change events for the theme value

Use the Events definition component, `sendEvent`, and the EventEmitter API. Define `onChangeTheme` event with a `{ theme: string }` payload.

### Improve type safety with Enums

Use `Enumerable` enum on native side and TypeScript union type (`'light' | 'dark' | 'system'`) on JS side.

### Next steps

Expo Modules API Reference — Create native modules using Kotlin and Swift.

Tutorial: Creating a native view — A tutorial on creating a native view with Expo Modules API.

---

## Tutorial: Create a native view
Source: https://docs.expo.dev/modules/native-view-tutorial/

A tutorial on creating a native view that renders a WebView with Expo Modules API.

In this tutorial, you'll build an example module with a native view that renders a WebView. For Android, you'll use the WebView component, and for iOS, WKWebView.

### Initialize a new module

```sh
npx create-expo-module expo-web-view
```

### Set up workspace

Delete default files. Add minimal boilerplate with ExpoWebView module and view class.

### Run the example project

You should see a blank purple screen.

### Add the system WebView as a subview

On Android, use `WebView` with `LayoutParams`. On iOS, use `WKWebView` with `layoutSubviews`.

### Add a prop to set the URL

Use the Prop definition component. Define a `url` prop of type `URL`.

### Add an event to notify when the page has loaded

Use Events and EventDispatcher. Define `onLoad` event with `{ url: string }` payload.

### Bonus: Build a web browser UI around it

Use state and TextInput to build a browser UI.

### Next steps

Expo Modules API Reference — Create native modules using Kotlin and Swift.

Tutorial: Creating a native module — A tutorial on creating a native module that persists settings with Expo Modules API.

---

## Tutorial: Create an inline module
Source: https://docs.expo.dev/modules/inline-modules-tutorial/

A tutorial on creating a native module and view directly in your Expo project using inline modules.

> Inline modules are experimental and available in Expo SDK 56 and later.

### Setup your project

Set `expo.experiments.inlineModules.watchedDirectories` to `["app"]` in your app config.

### Run prebuild

Run `npx expo prebuild`.

### Create an inline module

Create Kotlin and Swift files inside the **app** directory with a class that extends `Module`.

### Use the module in your app

Use `requireNativeModule('FirstInlineModule')` to get the native module.

### Create a native view

Create a module with `View(ExpoWebView::class)` and the view class extending `ExpoView`.

### Use the native view in your app

Use `requireNativeView('FirstInlineView')` to get the native view component.

### Next steps

Expo inline modules reference — A reference on how to create inline modules using Kotlin and Swift.

Tutorial: Creating a native module — A tutorial on creating a native module that persists settings with Expo Modules API.

---

## Tutorial: Generate module TS interface
Source: https://docs.expo.dev/modules/type-generation-tutorial/

A tutorial on using the expo-type-information package to create TypeScript interface for an Expo module.

> This tutorial is for macOS users, as the `expo-type-information` package works only on macOS.

### Setup your project

Install `expo-type-information` and `sourcekitten`.

### Generating inline modules interface

Run `npx expo-type-information inline-modules-interface --app-json ./app.json --watcher` to generate TypeScript interfaces for inline modules.

### Expo module interface

Run `npx expo-type-information module-interface --module ./expo-settings` to generate TypeScript interfaces for regular Expo modules.

---

## Tutorial: Create a module with a config plugin
Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial/

A tutorial on creating a native module with a config plugin using Expo Modules API.

### Initialize a module

```sh
npx create-expo-module expo-native-configuration
```

### Set up workspace

Delete view files and add minimal boilerplate.

### Run the example project

You should see "API key: api-key".

### Create a new config plugin

Create a **plugin** directory with TypeScript files. Use `withAndroidManifest` and `withInfoPlist` mod plugins to inject `MY_CUSTOM_API_KEY` into AndroidManifest.xml and Info.plist.

### Read native values from the module

On Android, read from `PackageManager.GET_META_DATA`. On iOS, read from `Bundle.main.object(forInfoDictionaryKey:)`.

### Run your module

Build and run to see the custom API key.

### Next steps

Expo Modules API Reference — A reference to create native modules using Kotlin and Swift.

Additional platform support — Learn how to add support for macOS and tvOS platforms.

---

## How to use a standalone Expo module
Source: https://docs.expo.dev/modules/use-standalone-expo-module-in-your-project/

Learn how to use a standalone module created with create-expo-module in your project by using a monorepo or publishing the package to npm.

### Use a monorepo

Structure: **apps/** for projects, **packages/** for packages. Create a module with `--no-example` flag. Set up workspace dependency in the app's package.json.

### Publish the module to npm

Create a module, run the example project, then `npm publish`.

### Next steps

Wrap third-party native libraries — Learn how to wrap third-party native libraries in an Expo module.

Tutorial: Creating a native module — A tutorial on creating a native module that persists settings with Expo Modules API.

---

## Wrap third-party native libraries
Source: https://docs.expo.dev/modules/third-party-library/

Learn how to create a simple wrapper around two separate native libraries using Expo Modules API.

This tutorial focuses on creating radial charts using MPAndroidChart (Android) and Charts (iOS).

### Create a new module

```sh
npx create-expo-module --local expo-radial-chart
```

### Add native dependencies

Edit **build.gradle** and **podspec** files to add the chart library dependencies.

### Define an API

Define TypeScript types for `Series` (color, percentage) and `ExpoRadialChartViewProps`.

### Implement on Android

Create `PieChart` instance with `PieDataSet` and `PieEntry`. Use `Prop` to set data.

### Implement on iOS

Create `PieChartView` with `PieChartDataSet`. Use `Prop` to set data.

### Write an example app

Use `ExpoRadialChartView` with data array of colored slices.

### Next step

Expo Modules API Reference — A reference to create native modules using Kotlin and Swift.

---

## Integrate in an existing library
Source: https://docs.expo.dev/modules/existing-library/

Learn how to integrate Expo Modules API into an existing React Native library.

### Prerequisites

Create `expo-module.config.json` with `{}`.

### Add the `expo-modules-core` native dependency

Add `implementation project(':expo-modules-core')` to build.gradle and `s.dependency 'ExpoModulesCore'` to podspec.

### Add Expo packages to dependencies

Add `expo` as peer dependency and `expo-modules-core` as dev dependency.

### Create a native module

Create Kotlin and Swift files. Add classes to Android/iOS modules in expo-module.config.json.

---

## Additional platform support
Source: https://docs.expo.dev/modules/additional-platform-support/

Learn how to add support for macOS and tvOS platforms.

### Use the `"apple"` platform in `expo-module.config.json`

Replace `"ios"` with `"apple"` in the config.

### Update the podspec

Add `:tvos => '13.4'` and `:osx => '10.15'` to the podspec platforms.

### Set up `react-native-macos` or `react-native-tvos`

Follow the respective installation guides.

### Review the code for using APIs not supported on these platforms

Use Swift compiler directives with `os` condition (`#if os(iOS)`, `#elseif os(macOS)`, `#elseif os(tvOS)`).

---

## Module API Reference
Source: https://docs.expo.dev/modules/module-api/

An API reference of Expo modules API.

The native modules API is an abstraction layer on top of JSI and other low-level primitives. It is built with modern languages (Swift and Kotlin).

### Definition components

- **Name**: Sets the name of the module.
- **Constant**: Defines a constant property on the JS object.
- **Constants**: Deprecated, use Constant instead.
- **Function**: Defines a native synchronous function exported to JS.
- **AsyncFunction**: Defines a JS function that returns a Promise.
- **Property**: Defines a property directly on the JS object.
- **View**: Enables the module to be used as a native view.
- **Events**: Defines event names the module can send to JS.
- **OnStartObserving / OnStopObserving**: Lifecycle functions for event listeners.
- **OnCreate / OnDestroy**: Module lifecycle listeners.
- **OnAppContextDestroys**: Called when AppContext is deallocated.
- **OnAppEntersForeground / OnAppEntersBackground / OnAppBecomesActive**: iOS only app lifecycle.
- **OnActivityEntersForeground / OnActivityEntersBackground / OnActivityDestroys / OnActivityResult / OnNewIntent / OnUserLeavesActivity**: Android only activity lifecycle.
- **RegisterActivityContracts**: Android only, registers activity result contracts.

### View definition components

- **Name**: Sets the view name.
- **Prop**: Defines a setter for a view prop.
- **PropGroup**: Android only, batch-registers multiple props.
- **OnViewDidUpdateProps**: Called when view finished updating props.
- **OnViewDestroys**: Android only, called when view is no longer used.
- **AsyncFunction**: Function attached to view ref.
- **GroupView**: Android only, enables view as a view group.

### Argument types

- **Primitives**: Bool, Int, Float, Double, String, etc.
- **Convertibles**: Native types initialized from JS data (URL, CGPoint, UIColor, Data, etc.).
- **Records**: Struct/dictionary equivalent with typed fields using @Field.
- **Formatter**: Experimental API for customizing Record serialization.
- **Enums**: Must represent primitive value and conform to Enumerable.
- **Eithers**: Container for one of multiple types.
- **ValueOrUndefined**: Experimental, distinguishes between undefined and actual value.
- **JavaScript values**: JavaScriptValue, JavaScriptObject, JavaScriptFunction for direct JS runtime access.

### Native classes

- **Module**: Base class with `appContext` and `sendEvent`.
- **AppContext**: Interface to a single Expo app.
- **ExpoView**: Base class for exported views.

### Guides

- **Sending events**: Use Events component and `sendEvent`.
- **View callbacks**: Use Events + EventDispatcher for view-bound events.

---

## Inline modules reference
Source: https://docs.expo.dev/modules/inline-modules-reference/

A reference of Expo inline modules.

> Inline modules are experimental and available in Expo SDK 56 and later.

### Configuration

Set `expo.experiments.inlineModules` and `expo.experiments.inlineModules.watchedDirectories` in app config.

### Naming convention

The file name must match the native module name (class name). The `Name` in the definition must also match the filename.

---

## Type generation reference
Source: https://docs.expo.dev/modules/type-generation-reference/

A reference for the expo-type-information package.

The `expo-type-information` package provides tools to automatically generate TypeScript interface for Swift modules.

### CLI reference

Commands: `module-interface`, `inline-modules-interface`, `short-module-interface`, `generate-mocks-for-file`.

### Type information abstraction

Functions: `deserializeTypeInformation`, `getFileTypeInformation`, `serializeTypeInformation`.

### TypeScript generation

Functions: `generateConciseTsInterface`, `generateFullTsInterface`, `generateJSXIntrinsicsFileContent`, `generateModuleTypesFileContent`, `generateViewTypesFileContent`.

### Swift parser limitations

- Nested classes not fully resolved.
- Return type resolution with PREPROCESS_AND_INFERENCE may have issues.
- Not all DSL declarations are parsed.
- Unicode characters break sourcekitten offsets.

---

## Android lifecycle listeners
Source: https://docs.expo.dev/modules/android-lifecycle-listeners/

Learn about the mechanism that allows your library to hook into Android Activity and Application functions.

### Activity lifecycle listeners

Implement `ReactActivityLifecycleListener` to hook into: `onCreate`, `onResume`, `onPause`, `onDestroy`, `onNewIntent`, `onBackPressed`.

### Application lifecycle listeners

Implement `ApplicationLifecycleListener` to hook into: `onCreate`, `onConfigurationChanged`.

---

## iOS AppDelegate subscribers
Source: https://docs.expo.dev/modules/appdelegate-subscribers/

Learn how to subscribe to iOS system events.

Create a Swift class extending `ExpoAppDelegateSubscriber` from `ExpoModulesCore`. Add its name to `apple.appDelegateSubscribers` in module config.

### Example

```swift
public class AppLifecycleDelegate: ExpoAppDelegateSubscriber {
  public func applicationDidBecomeActive(_ application: UIApplication) { }
  public func applicationWillResignActive(_ application: UIApplication) { }
  public func applicationDidEnterBackground(_ application: UIApplication) { }
  public func applicationWillEnterForeground(_ application: UIApplication) { }
  public func applicationWillTerminate(_ application: UIApplication) { }
  public func applicationDidReceiveMemoryWarning(_ application: UIApplication) { }
}
```

---

## Autolinking
Source: https://docs.expo.dev/modules/autolinking/

Learn how to use Expo Autolinking to automatically link native dependencies.

### Linking behavior

Searches for dependencies in: react-native.config.js, searchPaths, nativeModulesDir, and recursively in node_modules.

### Configuration

Options: `searchPaths`, `nativeModulesDir`, `exclude`, `include` (SDK 55+), `flags` (iOS), `buildFromSource` (Android), `legacy_shallowReactNativeLinking`.

### CLI commands

- `search`: Resolves Expo modules.
- `resolve`: Platform-specific details.
- `verify`: Checks for duplicates.
- `react-native-config`: Details for React Native modules.

---

## Using shared objects
Source: https://docs.expo.dev/modules/shared-objects/

Learn how to use a shared object from the Expo Modules API.

### What is a shared object?

A custom class that bridges a native instance to JS through an Expo module. Inherits from `SharedObject` and is exposed with `Class()`.

### Class definition DSL

- **Constructor**: Defines constructor for `new ClassName(args)`.
- **StaticFunction / StaticAsyncFunction**: Functions on the class itself.
- **Property**: Expose computed properties on instances.

---

## expo-module.config.json
Source: https://docs.expo.dev/modules/module-config/

Learn about configuration options in expo-module.config.json.

- `platforms`: Array of supported platforms (android, apple/ios/macos/tvos, web, devtools).
- `apple.modules`: Swift native module class names.
- `apple.appDelegateSubscribers`: Swift classes for AppDelegate hooks.
- `android.modules`: Full Kotlin class names (package + class).

---

## Mocking native calls in Expo modules
Source: https://docs.expo.dev/modules/mocking/

Learn about mocking native calls in Expo modules.

### Providing mocks for a module

Create a file with the same name as the native module in the **mocks** directory. Export mock implementations.

### Automatic generation of mocks

Run `npx expo-modules-test-core generate-ts-mocks` to auto-generate mocks from Swift implementation.

### Unit testing with mocked modules

Use Jest with `jest-expo` preset. Test function calls, return values, and React hooks.

---

## Expo Modules API: Design considerations
Source: https://docs.expo.dev/modules/design/

An overview of the design considerations behind the Expo Modules API.

- Take advantage of modern language features (Swift, Kotlin).
- Make it easy to pass data between runtimes (type conversion, Records, Enums).
- Support expressive object-oriented APIs (Shared Objects).
- Provide a safe mechanism to hook into app lifecycle events.
- Support the New Architecture while remaining backwards compatible.

---

## Push Notifications (8)

---

## Expo push notifications: Overview
Source: https://docs.expo.dev/push-notifications/overview/

An overview of Expo push notification service.

Expo simplifies implementing push notifications by handling much of the complexity involved in communicating with FCM or APNs.

- What you need to know about notifications
- Set up push notifications, get a push token and credentials
- Send push notifications via Expo Push Service API
- Handle incoming notifications
- Troubleshooting and FAQ

---

## What you need to know about notifications
Source: https://docs.expo.dev/push-notifications/what-you-need-to-know/

Learn about notification types and their behavior.

### Remote and Local notifications

Push notifications (from remote server) and Local notifications (created from within the app).

### Push Notification delivery

Behavior depends on app state (Foreground, Background, Terminated) and notification type.

### Push Notification types

- **Notification Message**: Has presentational info (title, body). Presented immediately.
- **Notification Message with data payload**: Android-only term, has both `data` and `notification` fields.
- **Headless Background Notifications**: No presentational info, carries JSON data processed by JS task.
- **Data-only notifications**: Android Data Messages, equivalent to iOS Headless Background Notifications.

---

## Expo push notifications setup
Source: https://docs.expo.dev/push-notifications/push-notifications-setup/

Learn how to set up push notifications.

### Install libraries

```sh
npx expo install expo-notifications expo-constants
```

### Add config plugin

Add `"expo-notifications"` to the plugins array.

### Add a minimal working example

Copy the provided code for registering, sending, and receiving push notifications.

### Configure projectId

Use `Constants.expoConfig?.extra?.eas?.projectId` or `Constants.easConfig?.projectId`.

### Get credentials for development builds

Configure FCM for Android and APNs for iOS.

### Build the app

```sh
eas build
```

### Test using the push notifications tool

Use https://expo.dev/notifications to send a test notification.

---

## Send notifications with the Expo Push Service
Source: https://docs.expo.dev/push-notifications/sending-notifications/

Learn how to call Expo Push Service API.

### Send push notifications using a server

Send POST to `https://exp.host/--/api/v2/push/send` with JSON body containing `to` (ExpoPushToken), `title`, `body`, etc.

### Push tickets

Response contains array of push tickets with `status` and `id`.

### Push receipts

Send POST to `https://exp.host/--/api/v2/push/getReceipts` with `ids` array to check delivery status.

### Errors

Common errors: `DeviceNotRegistered`, `MessageTooBig`, `MessageRateExceeded`, `InvalidCredentials`.

### Delivery guarantees

Best effort, at-least-once delivery. Push receipts indicate handoff to FCM/APNs.

---

## Handle incoming notifications
Source: https://docs.expo.dev/push-notifications/receiving-notifications/

Learn how to respond to a notification received by your app.

### Notification event listeners

- `addNotificationReceivedListener`: When notification is received while app is foregrounded.
- `addNotificationResponseReceivedListener`: When user taps on notification.

### Foreground notification behavior

Use `Notifications.setNotificationHandler` with `handleNotification` callback to control `shouldPlaySound`, `shouldSetBadge`, `shouldShowBanner`, `shouldShowList`.

---

## Obtain Google Service Account Keys using FCM V1
Source: https://docs.expo.dev/push-notifications/fcm-credentials/

Learn how to create or use a Google Service Account Key for sending Android Notifications using FCM.

### Create a new Google Service Account Key

1. Create/use Firebase project.
2. Generate new private key in Project settings > Service accounts.
3. Upload JSON to EAS via `eas credentials`.
4. Configure `google-services.json` in your project.

### Use an existing Google Service Account Key

Add Firebase Messaging API Admin role to the principal in Google Cloud Console IAM.

---

## Send notifications with FCM and APNs
Source: https://docs.expo.dev/push-notifications/sending-notifications-custom/

Learn how to send notifications with FCM and APNs.

### Obtaining a device token

Use `getDevicePushTokenAsync()` instead of `getExpoPushTokenAsync()`.

### FCMv1 server

Get OAuth 2.0 access token using Google Auth Library. Send POST to `https://fcm.googleapis.com/v1/projects/{PROJECT_NAME}/messages:send`.

### APNs server

Generate JWT authorization token with APNs key (.p8), Key ID, and Apple Team ID. Open HTTP/2 connection to `api.push.apple.com` or `api.sandbox.push.apple.com`.

---

## Push notifications troubleshooting and FAQ
Source: https://docs.expo.dev/push-notifications/faq/

A collection of common questions about Expo push notification service.

### FAQ

- No cost for sending notifications.
- 600 notifications per second limit per project.
- Using Expo push notification service is not mandatory.
- Connections are encrypted.
- Contents are not stored.
- Delivery is best effort.

### Troubleshooting

- Check push tickets and receipts for errors.
- Notifications working in development but not release: check credentials.
- Android notifications stop: check priority level.
- Handle expired credentials with `eas credentials`.
- Fetching push token takes long on iOS: check network, restart device.

---

## Config Plugins (8)

---

## Introduction to config plugins
Source: https://docs.expo.dev/config-plugins/introduction/

An introduction to Expo config plugins.

### What is a config plugin

A top-level custom configuration point referenced in the `plugins` property of the app config. It modifies native projects during the prebuild process.

### Glossary

- **Plugin**: Top-level config plugin, conventionally `with<Plugin Name>`.
- **Plugin function**: Functions wrapping platform-specific modifications.
- **Mod plugin function**: Wrappers from `expo/config-plugins` that use mods.
- **Mod**: Platform-specific modifiers that directly modify native files.

### Characteristics

- Synchronous functions accepting and returning ExpoConfig.
- Named `with<Functionality>`.
- Evaluated during app config evaluation phase.
- Mods evaluated only during prebuild syncing phase.

---

## Create and use config plugins
Source: https://docs.expo.dev/config-plugins/plugins/

Learn how to create and use config plugins.

### Creating a config plugin

Create a **plugins** directory with TypeScript files. Use `withAndroidManifest` and `withInfoPlist` mod plugins.

### Passing parameters

Accept options object in the plugin function. Pass `["./plugins/withPlugin.ts", { message: "..." }]` in the plugins array.

### Chaining config plugins

Use `withPlugins` for clean chaining: `withPlugins(config, [[withFoo, 'input'], [withBar, 'input']])`.

### Using a config plugin

Install as npm package and add to `plugins` array in app config.

---

## Mods
Source: https://docs.expo.dev/config-plugins/mods/

Learn about mods and how to use them.

### Mod plugins

Available mod plugins for Android: `withAndroidManifest`, `withStringsXml`, `withAndroidColors`, `withAndroidColorsNight`, `withAndroidStyles`, `withGradleProperties`, `withMainActivity`, `withMainApplication`, `withAppBuildGradle`, `withProjectBuildGradle`, `withSettingsGradle`.

Available mod plugins for iOS: `withInfoPlist`, `withEntitlementsPlist`, `withExpoPlist`, `withXcodeProject`, `withPodfile`, `withPodfileProperties`, `withAppDelegate`.

### Mods

Asynchronous functions that modify native project files. Access to `modResults` and `modRequest` (with `projectRoot`, `platformProjectRoot`, `modName`, `platform`, `projectName`).

### Plugin module resolution

- Plugins defined within app project: file import or inline function.
- Standalone package plugins: `app.plugin.js` entry or package's main entry from package.json.

---

## Using a dangerous mod
Source: https://docs.expo.dev/config-plugins/dangerous-mods/

Learn about dangerous mods.

Dangerous mods provide direct access to native project files through string manipulation and regular expressions. Use `withDangerousMod(config, ['platform', async config => {}])`.

### Considerations

- Limited idempotency guarantees.
- Experimental and prone to breakage.
- Use standard mod plugins when available.
- Don't assume a file exists.
- Dangerous mods run first.

---

## Plugin development for libraries
Source: https://docs.expo.dev/config-plugins/development-for-libraries/

Learn how to develop config plugins for libraries.

### Project structure

Separate plugin code (**plugin/**) from library code (**src/**). Use `expo-module-scripts` for build tooling.

### Key implementation patterns

- Plugin structure: receives config and parameters, applies transformations through mods.
- Testing: unit tests with Jest, cross-platform validation, error condition testing.

### Best practices

- Document manual setup instructions in README.
- Use `withFeatureName` naming convention.
- Split plugins by platform.
- Unit test with Jest and memfs for filesystem mocking.
- Don't modify `sdkVersion`.

---

## Developing and debugging a plugin
Source: https://docs.expo.dev/config-plugins/development-and-debugging/

Learn about development best practices and debugging techniques.

### Plugin development

Use `expo-module-scripts`. Import from `expo/config-plugins` via the `expo` package.

### Debugging

Run `EXPO_DEBUG=1 npx expo prebuild`. Run `npx expo config --type prebuild` to see results. Use `npx expo config --type introspect` for introspection.

### Static modification

Prefer static files (gradle.properties, Podfile.properties.json) over regex. Use AppDelegate subscribers for iOS lifecycle hooks.

---

## Using patch-project
Source: https://docs.expo.dev/config-plugins/patch-project/

Learn about how to use patch-project.

> alpha feature

### How it works

1. Install: `npx expo install patch-project`.
2. Generate patches: `npx patch-project` — saves to **cng-patches/** directory.
3. Apply patches automatically during `npx expo prebuild`.

### When to use

Migrating existing React Native apps, preserving manual changes while adopting CNG, quick prototyping.

### Limitations

Patches may become invalid during SDK upgrades. Template/file structure changes and plugin conflicts can break patches.

---

## Debugging (6)

---

## Errors and warnings
Source: https://docs.expo.dev/debugging/errors-and-warnings/

Learn about Redbox errors and stack traces.

- **Redbox error**: Fatal error preventing app from running.
- **Yellowbox warning**: Possible issue that should be resolved.
- **Stack traces**: Report of recent calls when app crashed. Valuable for locating error source.

---

## Debugging runtime issues
Source: https://docs.expo.dev/debugging/runtime-issues/

Learn about different debugging techniques.

### Development errors

Isolate code, search for error messages, use breakpoints/console.log, create minimal reproducible example.

### Native debugging

Use Android Studio or Xcode after running `npx expo prebuild -p android` or `npx expo prebuild -p ios`.

### Viewing native logs

- Android: `adb logcat`
- iOS: Console app in Xcode

### Production errors

Reproduce locally. Check platform-specific crash reports (Google Play Console, Xcode Crashes Organizer). Use error reporting services like Sentry or BugSnag.

---

## Debugging and profiling tools
Source: https://docs.expo.dev/debugging/tools/

Learn about different tools to inspect your Expo project.

### Developer Menu

Access via shaking device or keyboard shortcuts. Options: Reload, Toggle Performance Monitor, Toggle Element Inspector, Open DevTools.

### React Native DevTools

Press J in terminal. Provides Console, Sources, Network (Expo only), Memory, Components, and Profiler tabs.

### VS Code debugging

Use Expo Tools VS Code extension. Run "Expo: Debug..." command.

### Inspecting network traffic

Use Charles Proxy, Proxyman, mitmproxy, or Fiddler.

---

## Dev tools plugins
Source: https://docs.expo.dev/debugging/devtools-plugins/

Learn about using dev tools plugins.

Dev tools plugins enable two-way communication between the app and an external Chrome window during development.

### Add a dev tools plugin

Install as a package and use the exported hook in your app's root component.

### Expo dev tools plugins

- **React Navigation**: See navigation history, rewind, send deep links.
- **Apollo Client**: Inspect cache, query, mutation.
- **React Query**: Explore data and queries, cache status.
- **Redux**: Live list of actions and state changes.
- **TinyBase**: View and update store contents.

---

## Create a dev tools plugin
Source: https://docs.expo.dev/create-devtools-plugins/

Learn how to create a dev tools plugin.

### What is a dev tools plugin?

Runs in web browser in local development, connects to Expo app. Consists of Expo app (web UI), expo-module.config.json, and expo/devtools API calls.

### Create a plugin

Use `npx create-dev-plugin@latest`. Edit **webui** for UI and **src** for hook logic.

### Key API

- `useDevToolsPluginClient('plugin-name')`: Get client for messaging.
- `client.addMessageListener('event', callback)`: Receive messages.
- `client.sendMessage('event', data)`: Send messages.

### Build and distribute

Run `npm run build:all`. Import the hook in your app's root component.

---



---

## Overview of tutorials and UI guides
Source: https://docs.expo.dev/tutorial/overview/

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The **Learn** section is a collection of tutorials and other guides that help you learn about Expo and EAS. It covers the following:

[Expo Tutorial](/tutorial/introduction) — If you are new to Expo and want to learn to write the code yourself, we recommend starting with this tutorial. It provides a step-by-step guide on how to build an Expo app that runs on Android, iOS, and web.

[Build with AI tutorial](/tutorial/build-with-ai/introduction) — Build your first app by directing an AI coding agent, with no programming experience required. It covers setting up your tools from scratch and verifying the app on your phone at every step.

[EAS Tutorial](/tutorial/eas/introduction) — If you are looking to learn about building your Android and iOS apps using Expo Application Services (EAS), this tutorial covers the EAS Build, Update, and Submit workflows.

## Tutorial: Using React Native and Expo
Source: https://docs.expo.dev/tutorial/introduction/

An introduction to a React Native tutorial on how to build a universal app that runs on Android, iOS and the web using Expo.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

We're about to embark on a journey of building universal apps. In this tutorial, we'll create an Expo app that runs on Android, iOS, and web; all with a single codebase. Let's get started!

> **New to programming?** You can build this same app by prompting an AI coding agent instead of writing the code yourself. Follow the [Build with AI tutorial](/tutorial/build-with-ai/introduction). It covers setup from scratch.

## About React Native and Expo tutorial

The objective of this tutorial is to get started with Expo and become familiar with the Expo SDK. It'll cover the following topics:

-   Create an app using the default template with TypeScript enabled
-   Implement a two-screen bottom tabs layout with Expo Router
-   Break down the app layout and implement it with flexbox
-   Use each platform's system UI to select an image from the media library
-   Create a sticker modal using the `<Modal>` and `<FlatList>` components from React Native
-   Add touch gestures to interact with a sticker
-   Use third-party libraries to capture a screenshot and save it to the disk
-   Handle platform differences between Android, iOS, and web
-   Finally, go through the process of configuring a status bar, a splash screen, and an icon to complete the app

These topics provide a foundation to learn the fundamentals of building an Expo app. The tutorial is self-paced and can take up to two hours to complete.

To keep it beginner friendly, we divided the tutorial into nine chapters so that you can follow along or put it down and come back to it later. Each chapter contains the necessary code snippets to complete the steps, so you can follow along by creating an app from scratch or copy and paste it.

Before we get started, take a look at what we'll build. It's an app named **StickerSmash** that runs on Android, iOS, and the web:

> The complete source code for this tutorial is available on [GitHub](https://github.com/expo/examples/tree/master/stickersmash).

## How to use this tutorial

We believe in [learning by doing](https://en.wikipedia.org/wiki/Learning-by-doing), so this tutorial emphasizes doing over explaining. You can follow along the journey of building an app by creating the app from scratch.

Throughout the tutorial, any important code or code that has changed between examples will be highlighted in green. You can hover over the highlights (on desktop) or tap them (on mobile) to learn more about the change. For example, the code highlighted in the snippet below explains what it does:

```tsx
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

## Next step

We're ready to start building our app.

[Start](/tutorial/create-your-first-app) — Let's start by creating a new Expo app.

## Create your first app
Source: https://docs.expo.dev/tutorial/create-your-first-app/

In this chapter, learn how to create a new Expo project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, let's learn how to create a new Expo project and how to get it running.

[Watch: Creating your first universal Expo app](https://www.youtube.com/watch?v=m1-bc53EGh8) — Create a new Expo project from scratch and get it running on Android, iOS, and web.

Prerequisites

4 requirements

1.

Expo Go on a physical device

Install [Expo Go](https://expo.dev/go) on a physical Android or iOS device.

2.

Node.js (LTS)

Install [Node.js (LTS version)](https://nodejs.org/en) on your machine.

3.

A code editor

Install [VS Code](https://code.visualstudio.com/) or any other preferred code editor or IDE.

4.

A developer machine with a terminal

A macOS, Linux, or Windows (PowerShell and WSL2) with a terminal window open.

This tutorial assumes you are familiar with TypeScript and React. If you are not, check out the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) and [React's official tutorial](https://react.dev/learn).

## Initialize a new Expo app

We'll use [`create-expo-app`](/more/create-expo) to initialize a new Expo app. It is a command-line tool to create a new React Native project. Run the following command in your terminal:

```sh
# npm
npx create-expo-app@latest StickerSmash
Select an Expo SDK version > SDK 54
cd StickerSmash

# yarn
yarn create expo-app StickerSmash
Select an Expo SDK version > SDK 54
cd StickerSmash

# pnpm
pnpm create expo-app StickerSmash
Select an Expo SDK version > SDK 54
cd StickerSmash

# bun
bun create expo StickerSmash
Select an Expo SDK version > SDK 54
cd StickerSmash
```

> `create-expo-app@latest` currently asks to select an Expo SDK template. This tutorial is designed for SDK 54, so make sure to select the SDK 54 template.

This command will create a new project directory named StickerSmash, using the [SDK 54's default](/more/create-expo#--template) template. This template has essential boilerplate code and libraries needed to build our app, including Expo Router and allows us to test our app with Expo Go installed on our devices. We'll continue to add more libraries throughout this tutorial as needed.

Benefits of using the default template

-   Creates a new React Native project with `expo` package installed
-   Includes recommended tools such as Expo CLI
-   Includes a tab navigator from Expo Router to provide a basic navigation system
-   Automatically configured to run a project on multiple platforms: Android, iOS, and web
-   TypeScript configured by default

## Download assets

[Download assets archive](/static/images/tutorial/sticker-smash-assets.zip) — We'll be using these assets throughout this tutorial.

After downloading the archive:

1.  Unzip the archive and replace the default assets in the **your-project-name/assets/images** directory.
2.  Open the project directory in a code editor or IDE.

## Run reset-project script

In this tutorial, we'll build our app from scratch and understand the fundamentals of adding a file-based navigation. Let's run the `reset-project` script to remove the boilerplate code:

```sh
# npm
npm run reset-project

# yarn
yarn run reset-project

# pnpm
pnpm run reset-project

# bun
bun run reset-project
```

After running the above command, there are two files (**index.tsx** and **_layout.tsx**) left inside the **app** directory. The previous files from **app** and other directories (**components**, **constants**, and **hooks** — containing boilerplate code) are moved inside the **app-example** directory by the script. We'll create our own directories and component files as we go along.

What does the `reset-project` script do?

`reset-project` script resets the **app** directory structure in a project and copies the previous boilerplate files from the project's root directory to another sub-directory called **app-example**. We can delete it since it is not part of our main app's structure.

## Run the app on mobile and web

In the project directory, run the following command to start the [development server](/more/glossary-of-terms#development-server) from the terminal:

```sh
# npm
npx expo start

# yarn
yarn expo start

# pnpm
pnpm expo start

# bun
bun expo start
```

After running the above command:

1.  The development server will start, and you'll see a QR code inside the terminal window.
2.  Scan that QR code to open the app on the device. On Android, use the Expo Go > **Scan QR code** option. On iOS, use the default camera app.
3.  To run the web app, press W in the terminal. It will open the web app in the default web browser.

Once it is running on all platforms, the app should look like this:

## Edit the index screen

The **app/index.tsx** file defines the text displayed on the app's screen. It is the entry point of our app and executes when the development server starts. It uses core React Native components such as `<View>` and `<Text>` to display background and text.

Styles applied to these components use JavaScript objects rather than CSS, which is used on web. However, a lot of the properties will look familiar if you've previously used CSS on web. Most React Native components accept a `style` prop that accepts a JavaScript object as its value. For more details, see [Styling in React Native](https://reactnative.dev/docs/style).

Let's modify **app/index.tsx** screen:

1.  Import `StyleSheet` from `react-native` and create a `styles` object to define our custom styles.
2.  Add a `styles.container.backgroundColor` property to `<View>` with the value of `#25292e`. This changes the background color.
3.  Replace the default value of `<Text>` with "Home screen".
4.  Add a `styles.text.color` property to `<Text>` with the value of `#fff` (white) to change the text color.

```tsx
import { Text, View, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
```

> React Native uses the same color format as the web. It supports hex triplets (this is what `#fff` is), `rgba`, `hsl`, and named colors, such as `red`, `green`, `blue`, `peru`, and `papayawhip`. For more information, see [Colors in React Native](https://reactnative.dev/docs/colors).

Once you save your changes, they're sent and applied to the running apps connected to the development server:

## Summary

Chapter 1: Create your first app

We've successfully created a new Expo project, used React Native core components, and are ready to develop our StickerSmash app.

In the next chapter, we will learn how to add a stack and a tab navigator to our app.

[Next: Add navigation](/tutorial/add-navigation)


## Add navigation
Source: https://docs.expo.dev/tutorial/add-navigation/

In this chapter, learn how to add navigation to the Expo app.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll learn Expo Router's fundamentals to create stack navigation and a bottom tab bar with two tabs.

[Watch: Adding navigation in your universal Expo app](https://www.youtube.com/watch?v=8336fcFV_T4) — Set up file-based routing with Expo Router, create stack navigation between screens, and build a bottom tab bar.

## Expo Router basics

Expo Router is a file-based routing framework for React Native and web apps. It manages navigation between screens and uses the same components across multiple platforms. To get started, we need to know about the following conventions:

-   **app directory**: A special directory containing only routes and their layouts. Any files added to this directory become a screen inside our native app and a page on the web.
-   **Root layout**: The **app/_layout.tsx** file. It defines shared UI elements such as headers and tab bars so they are consistent between different routes.
-   **File name conventions**: _Index_ file names, such as **index.tsx**, match their parent directory and do not add a path segment. For example, the **index.tsx** file in the **app** directory matches `/` route.
-   A **route** file exports a React component as its default value. It can use either `.js`, `.jsx`, `.ts`, or `.tsx` extension.
-   Android, iOS, and web share a unified navigation structure.

> The above list is enough for us to get started. For a complete list of features, see [Introduction to Expo Router](/router/introduction).

## Add a new screen to the stack

Let's create a new file named **about.tsx** inside the **app** directory. It displays the screen name when the user navigates to the `/about` route.

```tsx
import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
```

Inside **app/_layout.tsx**:

1.  Add a `<Stack.Screen />` component and an `options` prop to update the title of the `/about` route.
2.  Update the `/index` route's title to `Home` by adding `options` prop.

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
    </Stack>
  );
}
```

What is a `Stack`?

A stack navigator is the foundation for navigating between different screens in an app. On Android, a stacked route animates on top of the current screen. On iOS, a stacked route animates from the right. Expo Router provides a `Stack` component to create a navigation stack to add new routes.

## Navigate between screens

We'll use Expo Router's `Link` component to navigate from the `/index` route to the `/about` route. It is a React component that renders a `<Text>` with a given `href` prop.

1.  Import the `Link` component from `expo-router` inside **index.tsx**.
2.  Add a `Link` component after `<Text>` component and pass `href` prop with the `/about` route.
3.  Add a style of `fontSize`, `textDecorationLine`, and `color` to `Link` component. It takes the same props as the `<Text>` component.

```tsx
import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
```

Let's take a look at the changes in our app. Click on `Link` to navigate to the `/about` route:

## Add a not-found route

When a route doesn't exist, we can use a `+not-found` route to display a fallback screen. This is useful when we want to display a custom screen when navigating to an invalid route on mobile instead of crashing the app or display a _404_ error on web. Expo Router uses a special **+not-found.tsx** file to handle this case.

1.  Create a new file named **+not-found.tsx** inside the app directory to add the `NotFoundScreen` component.
2.  Add `options` prop from the `Stack.Screen` to display a custom screen title for this route.
3.  Add a `Link` component to navigate to the `/` route, which is our fallback route.

```tsx
import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
```

To test this, navigate to `http:localhost:8081/123` URL in the web browser since it is easy to change the URL path there. The app should display the `NotFoundScreen` component:

## Add a bottom tab navigator

At this point, the file structure of our **app** directory looks like the following:

`app`

 `_layout.tsx``Root layout`

 `index.tsx``matches route '/'`

 `about.tsx``matches route '/about'`

 `+not-found.tsx``matches route any 404 route`

We'll add a bottom tab navigator to our app and reuse the existing Home and About screens to create a tab layout (a common navigation pattern in many social media apps like X or BlueSky). We'll also use the stack navigator in the Root layout so the `+not-found` route displays over any other nested navigators.

1.  Inside the **app** directory, add a **(tabs)** subdirectory. This special directory is used to group routes together and display them in a bottom tab bar.
2.  Create a **(tabs)/_layout.tsx** file inside the directory. It will be used to define the tab layout, which is separate from Root layout.
3.  Move the existing **index.tsx** and **about.tsx** files inside the **(tabs)** directory. The structure of **app** directory will look like this:

`app`

 `_layout.tsx``Root layout`

 `+not-found.tsx``matches route any 404 route`

 `(tabs)`

  `_layout.tsx``Tab layout`

  `index.tsx``matches route '/'`

  `about.tsx``matches route '/about'`

Update the Root layout file to add a `(tabs)` route:

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

Inside **(tabs)/_layout.tsx**, add a `Tabs` component to define the bottom tab layout:

```tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="about" options={{ title: 'About' }} />
    </Tabs>
  );
}
```

Let's take a look at our app now to see the new bottom tabs:

## Update bottom tab navigator appearance

Right now, the bottom tab navigator looks the same on all platforms but doesn't match the style of our app. For example, the tab bar or header doesn't display a custom icon, and the bottom tab background color doesn't match the app's background color.

Modify the **(tabs)/_layout.tsx** file to add tab bar icons:

1.  Import `Ionicons` icons set from [`@expo/vector-icons`](/guides/icons#expovector-icons) — a library that includes popular icon sets.
2.  Add the `tabBarIcon` to both the `index` and `about` routes. This function takes `focused` and `color` as params and renders the icon component. From the icon set, we can provide custom icon names.
3.  Add `screenOptions.tabBarActiveTintColor` to the `Tabs` component and set its value to `#ffd33d`. This will change the color of the tab bar icon and label when active.

```tsx
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
```

Let's also change the background color of the tab bar and header using `screenOptions` prop:

```tsx
<Tabs
  screenOptions={{
    tabBarActiveTintColor: '#ffd33d',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: false,
    headerTintColor: '#fff',
    tabBarStyle: {
      backgroundColor: '#25292e',
    },
  }}
>
```

In the above code:

-   The header's background is set to `#25292e` using the `headerStyle` property. We have also disabled the header's shadow using `headerShadowVisible`.
-   `headerTintColor` applies `#fff` to the header label
-   `tabBarStyle.backgroundColor` applies `#25292e` to the tab bar

Our app now has a custom bottom tabs navigator:

## Summary

Chapter 2: Add navigation

We've successfully added a stack and a tab navigator to our app.

In the next chapter, we'll learn how to build the app's first screen.

[Next: Build your app's first screen](/tutorial/build-a-screen)


## Build a screen
Source: https://docs.expo.dev/tutorial/build-a-screen/

In this tutorial, learn how to use components such as React Native's Pressable and Expo Image to build a screen.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll create the first screen of the StickerSmash app.

The screen above displays an image and two buttons. The app user can select an image using one of the two buttons. The first button allows the user to select an image from their device. The second button allows the user to continue with a default image provided by the app.

Once the user selects an image, they can add a sticker to it. So, let's start creating this screen.

[Watch: Building a screen in your universal Expo app](https://www.youtube.com/watch?v=3rcOP8xDwTQ) — Build the StickerSmash app's first screen using Pressable, Expo Image, and other core components to create an image picker layout.

## Break down the screen

Before we build this screen by writing code, let's break it down into some essential elements.

There are two essential elements:

-   There is a large image displayed at the center of the screen
-   There are two buttons in the bottom half of the screen

The first button contains multiple components. The parent element provides a yellow border, and contains an icon and text components inside a row.

Now that we've broken down the UI into smaller chunks, we're ready to start coding.

## Display the image

We'll use `expo-image` library to display the image in the app. It provides a cross-platform `<Image>` component to load and render an image. It is already included in the default project template we're using.

The Image component takes the source of an image as its value. The source can be either a [static asset](https://reactnative.dev/docs/images#static-image-resources) or a URL. For example, the source required from **assets/images** directory is static. It can also come from [Network](https://reactnative.dev/docs/images#network-images) as a `uri` property.

To use the Image component in **app/(tabs)/index.tsx** file:

1.  Import `Image` from the `expo-image` library.
2.  Create a `PlaceholderImage` variable to use **assets/images/background-image.png** file as the `source` prop on the `Image` component.

```tsx
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
```

## Divide components into files

Let's divide the code into multiple files as we add more components to this screen. Throughout this tutorial, we'll use the components directory to create custom components.

1.  Create a top-level **components** directory, and inside it, create the **ImageViewer.tsx** file.
2.  Move the code to display the image in this file along with the `image` styles.

```tsx
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  imgSource: ImageSourcePropType;
};

export default function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
```

> Since **ImageViewer** is a custom component, we are placing it in a separate directory instead of the **app** directory. Every file inside **app** directory is either a layout file or a route file. For more information, see [Non-navigation components live outside of app directory](/router/basics/core-concepts#5-non-navigation-components-live-outside-of-app-directory).

Import `ImageViewer` and use it in the **app/(tabs)/index.tsx**:

```tsx
import { StyleSheet, View } from 'react-native';

import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
});
```

What is the `@` in import statement?

The `@` symbol is a custom [path alias](/guides/typescript#path-aliases-optional) for importing custom components and other modules instead of relative paths. Expo CLI automatically configures it in **tsconfig.json**.

## Create buttons using Pressable

React Native includes a few different components for handling touch events, but [`<Pressable>`](https://reactnative.dev/docs/pressable) is recommended for its flexibility. It can detect single taps, long presses, trigger separate events when the button is pushed in and released, and more.

In the design, there are two buttons we need to create. Each has a different style and label. Let's start by creating a reusable component for these buttons. Create a **Button.tsx** file inside the **components** directory with the following code:

```tsx
import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
```

The app displays an alert when the user taps any of the buttons on the screen. It happens because `<Pressable>` calls `alert()` on its `onPress` prop. Let's import this component into **app/(tabs)/index.tsx** file and add styles for the `<View>` that encapsulates these buttons:

```tsx
import { View, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

Let's take a look at our app on Android, iOS and the web:

The second button with the label "Use this photo" resembles the actual button from the design. However, the first button needs more styling to match the design.

## Enhance the reusable button component

The "Choose a photo" button requires different styling than the "Use this photo" button, so we will add a new button theme prop that will allow us to apply a `primary` theme. This button also has an icon before the label. We will use an icon from the `@expo/vector-icons` library.

To load and display the icon on the button, let's use `FontAwesome` from the library. Modify **components/Button.tsx** to add the following code snippet:

```tsx
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary';
};

export default function Button({ label, theme }: Props) {
  if (theme === 'primary') {
  return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => alert('You pressed a button.')}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
```

Let's learn what the above code does:

-   The primary theme button uses **inline styles**, which overrides the styles defined in `StyleSheet.create()` with an object directly passed in the `style` prop.
-   The `<Pressable>` component in the primary theme uses a `backgroundColor` property with a value `#fff` to set the button's background to white. If we add this property to the `styles.button`, the background color value will be set for both the primary theme and the unstyled one.
-   Inline styles use JavaScript and override the default styles for a specific value.

Now, modify the **app/(tabs)/index.tsx** file to use the `theme="primary"` prop on the first button.

```tsx
import { View, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

Let's take a look at our app on Android, iOS and the web:

## Summary

Chapter 3: Build a screen

We've successfully implemented the initial design to start building our app's first screen.

In the next chapter, we'll add the functionality to pick an image from the device's media library.

[Next: Use an image picker](/tutorial/image-picker)


## Use an image picker
Source: https://docs.expo.dev/tutorial/image-picker/

In this tutorial, learn how to use Expo Image Picker.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

React Native provides built-in components as standard building blocks, such as `<View>`, `<Text>`, and `<Pressable>`. We are building a feature to select an image from the device's media gallery. This isn't possible with the core components and we'll need a library to add this feature in our app.

We'll use [`expo-image-picker`](/versions/latest/sdk/imagepicker), a library from Expo SDK.

> `expo-image-picker` provides access to the system's UI to select images and videos from the phone's library.

[Watch: Using an image picker in your universal Expo app](https://www.youtube.com/watch?v=iEQZU58naS8) — Learn how to use expo-image-picker to select images from the device's media library.

## Install expo-image-picker

To install the `expo-image-picker` library, stop the development server by pressing Ctrl + C in the terminal, then run the following command:

```sh
# npm
npx expo install expo-image-picker

# yarn
yarn expo install expo-image-picker

# pnpm
pnpm expo install expo-image-picker

# bun
bun expo install expo-image-picker
```

The [`npx expo install`](/more/expo-cli#installation) command will install the library and add it to the project's dependencies in **package.json**.

> **Tip:** Any time we install a new library in the project, stop the development server by pressing Ctrl + C in the terminal and then run the installation command. After the installation completes, start the development server again by running `npx expo start`.

## Pick an image from the device's media library

`expo-image-picker` provides `launchImageLibraryAsync()` method to display the system UI by choosing an image or a video from the device's media library. We'll use the primary themed button created in the previous chapter to select an image from the device's media library and create a function to launch the device's image library to implement this functionality.

In **app/(tabs)/index.tsx**, import `expo-image-picker` library and create a `pickImageAsync()` function inside the `Index` component:

```tsx
// ...rest of the import statements remain unchanged
import * as ImagePicker from 'expo-image-picker';

export default function Index() {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  // ...rest of the code remains same
}
```

Let's learn what the above code does:

-   The `launchImageLibraryAsync()` receives an object to specify different options. This object is the [`ImagePickerOptions`](/versions/latest/sdk/imagepicker#imagepickeroptions) object, which we are passing when invoking the method.
-   When `allowsEditing` is set to `true`, the user can crop the image during the selection process on Android and iOS.

## Update the button component

On pressing the primary button, we'll call the `pickImageAsync()` function on the `Button` component. Update the `onPress` prop of the `Button` component in **components/Button.tsx**:

```tsx
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
        ]}>
        <Pressable style={[styles.button, { backgroundColor: '#fff' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
```

In **app/(tabs)/index.tsx**, add the `pickImageAsync()` function to the `onPress` prop on the first `<Button>`.

```tsx
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

The `pickImageAsync()` function invokes `ImagePicker.launchImageLibraryAsync()` and then handles the result. The `launchImageLibraryAsync()` method returns an object containing information about the selected image.

Here is an example of the `result` object and the properties it contains:

```json
{
  "assets": [
    {
      "assetId": null,
      "base64": null,
      "duration": null,
      "exif": null,
      "fileName": "ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
      "fileSize": 4513577,
      "height": 4570,
      "mimeType": "image/jpeg",
      "rotation": null,
      "type": "image",
      "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FStickerSmash-13f21121-fc9d-4ec6-bf89-bf7d6165eb69/ImagePicker/ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
      "width": 2854
    }
  ],
  "canceled": false
}
```

## Use the selected image

The `result` object provides the `assets` array, which contains the `uri` of the selected image. Let's take this value from the image picker and use it to show the selected image in the app.

Modify the **app/(tabs)/index.tsx** file:

1.  Declare a state variable called `selectedImage` using the [`useState`](https://react.dev/learn/state-a-components-memory#adding-a-state-variable) hook from React. We'll use this state variable to hold the URI of the selected image.
2.  Update the `pickImageAsync()` function to save the image URI in the `selectedImage` state variable.
3.  Pass the `selectedImage` as a prop to the `ImageViewer` component.

```tsx
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

Pass the `selectedImage` prop to the `ImageViewer` component to display the selected image instead of a placeholder image.

1.  Modify the **components/ImageViewer.tsx** file to accept the `selectedImage` prop.
2.  The source of the image is getting long, so let's also move it to a separate variable called `imageSource`.
3.  Pass `imageSource` as the value of the `source` prop on the `Image` component.

```tsx
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
```

In the above snippet, the Image component uses a conditional operator to load the image's source. The picked image is a [`uri` string](https://reactnative.dev/docs/images#network-images), not a local asset like the placeholder image.

Let's take a look at our app now:

> The images used for the example app in this tutorial were picked from [Unsplash](https://unsplash.com).

## Summary

Chapter 4: Use an image picker

We've successfully added the functionality to pick an image from the device's media library.

In the next chapter, we'll learn how to create an emoji picker modal component.

[Next: Create an emoji picker modal](/tutorial/create-a-modal)

## Create a modal
Source: https://docs.expo.dev/tutorial/create-a-modal/

In this tutorial, learn how to create a React Native modal to select an image.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

React Native provides a [`<Modal>` component](https://reactnative.dev/docs/modal) that presents content above the rest of your app. In general, modals are used to draw a user's attention toward critical information or guide them to take action. For example, in the [third chapter](/tutorial/build-a-screen#step-7-enhance-the-reusable-button-component), after pressing the button, we used `alert()` to display some placeholder text. That's how a modal component displays an overlay.

In this chapter, we'll create a modal that shows an emoji picker list.

[Watch: Creating a modal in your universal Expo app](https://www.youtube.com/watch?v=HRAMzrBwVeo) — Build a modal component using React Native's Modal API to display an emoji picker and handle user interactions.

## Declare a state variable to show buttons

Before implementing the modal, we are going to add three new buttons. These buttons are visible after the user picks an image from the media library or uses the placeholder image. One of these buttons will trigger the emoji picker modal.

In **app/(tabs)/index.tsx**:

1.  Declare a boolean state variable, `showAppOptions`, to show or hide the buttons that open the modal, alongside a few other options. When the app screen loads, we'll set it to `false` so the options are not shown before picking an image. When the user picks an image or uses the placeholder image, we'll set it to `true`.
2.  Update the `pickImageAsync()` function to set the value of `showAppOptions` to `true` after the user picks an image.
3.  Update the button with no theme by adding an `onPress` prop with the following value.

```tsx
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
```

In the above snippet, we're rendering the `Button` component based on the value of `showAppOptions` and moving the buttons in the ternary operator block. When the value of `showAppOptions` is `true`, render an empty `<View>` component. We'll address this state in the next step.

Now, we can remove the `alert` on the `Button` component and update the `onPress` prop when rendering the second button in the **components/Button.tsx**:

```tsx
<Pressable style={styles.button} onPress={onPress}>
```

## Add buttons

Let's break down the layout of the option buttons we'll implement in this chapter. The design looks like this:

It contains a parent `<View>` with three buttons aligned in a row. The button in the middle with the plus icon (+) will open the modal and is styled differently than the other two buttons.

Inside the **components** directory, create a new **CircleButton.tsx** file with the following code:

```tsx
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  },
});
```

To render the plus icon, this button uses the `<MaterialIcons>` icon set from the `@expo/vector-icons` library.

The other two buttons also use `<MaterialIcons>` to display vertically aligned text labels and icons. Create a file named **IconButton.tsx** inside the **components** directory. This component accepts three props:

-   `icon`: the name corresponding to the `MaterialIcons` library icon.
-   `label`: the text label displayed on the button.
-   `onPress`: this function invokes when the user presses the button.

```tsx
import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
};

export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});
```

Inside **app/(tabs)/index.tsx**:

1.  Import the `CircleButton` and `IconButton` components to display them.
2.  Add three placeholder functions for these buttons. The `onReset()` function invokes when the user presses the reset button, causing the image picker button to appear again. We'll add the functionality for the other two functions later.

```tsx
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // we will implement this later
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
```

Let's take a look at our app on Android, iOS and the web:

## Create an emoji picker modal

The modal allows the user to choose an emoji from a list of available emoji. Create an **EmojiPicker.tsx** file inside the **components** directory. This component accepts three props:

-   `isVisible`: a boolean to determine the state of the modal's visibility.
-   `onClose`: a function to close the modal.
-   `children`: used later to display a list of emoji.

```tsx
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose a sticker</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          {children}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
```

Let's learn what the above code does:

-   The `<Modal>` component displays a title and a close button.
-   Its `visible` prop takes the value of `isVisible` and controls whether the modal is open or closed.
-   Its `transparent` prop is a boolean value, which determines whether the modal fills the entire view.
-   Its `animationType` prop determines how it enters and leaves the screen. In this case, it is sliding from the bottom of the screen.
-   Lastly, the `<EmojiPicker>` invokes the `onClose` prop when the user presses the close `<Pressable>`.

Now, let's modify the **app/(tabs)/index.tsx**:

1.  Import the `<EmojiPicker>` component.
2.  Create an `isModalVisible` state variable with the `useState` hook. Its default value is `false`, which hides the modal until the user presses the button to open it.
3.  Replace the comment in the `onAddSticker()` function to update the `isModalVisible` variable to `true` when the user presses the button. This will open the emoji picker.
4.  Create the `onModalClose()` function to update the `isModalVisible` state variable.
5.  Place the `<EmojiPicker>` component at the bottom of the `Index` component.

```tsx
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {/* Emoji list component will go here */}
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
```

Here is the result after this step:

## Display a list of emoji

Let's add a horizontal list of emoji in the modal's content. We'll use the [`<FlatList>`](https://reactnative.dev/docs/flatlist) component from React Native for it.

Create a **EmojiList.tsx** file inside the **components** directory and add the following code:

```tsx
import { useState } from 'react';
import { ImageSourcePropType, StyleSheet, FlatList, Platform, Pressable } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState<ImageSourcePropType[]>([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
```

Let's learn what the above code does:

-   The `<FlatList>` component above renders all the emoji images using the `Image` component, wrapped by a `<Pressable>`. Later, we will improve it so that the user can tap an emoji on the screen to make it appear as a sticker on the image.
-   It also takes an array of items provided by the `emoji` array variable as the value of the `data` prop. The `renderItem` prop takes the item from the `data` and returns the item in the list. Finally, we added `Image` and the `<Pressable>` components to display this item.
-   The `horizontal` prop renders the list horizontally instead of vertically. The `showsHorizontalScrollIndicator` uses React Native's `Platform` module to check the value and display the horizontal scroll bar on web.

Now, update the **app/(tabs)/index.tsx** to import the `<EmojiList>` component and replace the comments inside the `<EmojiPicker>` component with the following code snippet:

```tsx
import { ImageSourcePropType, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
```

In the `EmojiList` component, the `onSelect` prop selects the emoji and after selecting it, the `onCloseModal` closes the modal.

Let's take a look at our app on Android, iOS and the web:

## Display the selected emoji

Now, we'll put the emoji sticker on the image. Create a new file in the **components** directory and call it **EmojiSticker.tsx**. Then, add the following code:

```tsx
import { ImageSourcePropType, View } from 'react-native';
import { Image } from 'expo-image';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Image source={stickerSource} style={{ width: imageSize, height: imageSize }} />
    </View>
  );
}
```

This component receives two props:

-   `imageSize`: a value defined inside the `Index` component. We will use this value in the next chapter to scale the image's size when tapped.
-   `stickerSource`: the source of the selected emoji image.

Import this component in the **app/(tabs)/index.tsx** file and update the `Index` component to display the emoji sticker on the image. We'll check if the `pickedEmoji` state is not `undefined`:

```tsx
import { ImageSourcePropType, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
```

Let's take a look at our app on Android, iOS and the web:

## Summary

Chapter 5: Create a modal

We've successfully created the emoji picker modal and implemented the logic to select an emoji and display it over the image.

In the next chapter, let's add user interactions with gestures to drag the emoji and scale the size by tapping it.

[Next: Add gestures](/tutorial/gestures)


## Add gestures
Source: https://docs.expo.dev/tutorial/gestures/

In this tutorial, learn how to implement gestures from React Native Gesture Handler and Reanimated libraries.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Gestures are a great way to provide an intuitive user experience in an app. The [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/) library provides built-in native components that can handle gestures. It recognizes pan, tap, rotation, and other gestures using the platform's native touch handling system. In this chapter, we'll add two different gestures using this library:

-   Double tap to scale the size of the emoji sticker and reduce the scale when double tapped again.
-   Pan to move the emoji sticker around the screen so that the user can place the sticker anywhere on the image.

We'll also use the [Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/handling-gestures/) library to animate between gesture states.

[Watch: Adding gestures to your universal Expo app](https://www.youtube.com/watch?v=0q48LLvTGDU) — Add double tap and pan gestures to the emoji sticker using React Native Gesture Handler and Reanimated.

## Add GestureHandlerRootView

To get gesture interactions to work in the app, we'll render `<GestureHandlerRootView>` from `react-native-gesture-handler` at the top of `Index` component. Replace the root level `<View>` component in the **app/(tabs)/index.tsx** with `<GestureHandlerRootView>`.

```tsx
// ... rest of the import statements remain same
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* ...rest of the code remains */}
    </GestureHandlerRootView>
  )
}
```

## Use animated components

An `Animated` component looks at the `style` prop of the component and determines which values to animate and apply updates to create an animation. Reanimated exports animated components such as `<Animated.View>`, `<Animated.Text>`, or `<Animated.ScrollView>`. We will apply animations to the `<Animated.Image>` component to make a double tap gesture work.

1.  Open the **EmojiSticker.tsx** file in the **components** directory. Inside it, import `Animated` from the `react-native-reanimated` library to use animated components.
2.  Replace the `Image` component with `<Animated.Image>`.

```tsx
import { ImageSourcePropType, View } from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Animated.Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
```

> For a complete reference of the animated component API, see [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/core/createAnimatedComponent) documentation.

## Add a tap gesture

React Native Gesture Handler allows us to add behavior when it detects touch input, like a double tap event.

In the **EmojiSticker.tsx** file:

1.  Import `Gesture` and `GestureDetector` from `react-native-gesture-handler`.
2.  To recognize the tap on the sticker, import `useAnimatedStyle`, `useSharedValue`, and `withSpring` from `react-native-reanimated` to animate the style of the `<Animated.Image>`.
3.  Inside the `EmojiSticker` component, create a reference called `scaleImage` using the `useSharedValue()` hook. It will take the value of `imageSize` as its initial value.

```tsx
// ...rest of the import statements remain same
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);

  return (
    // ...rest of the code remains same
  )
}
```

Creating a shared value using the `useSharedValue()` hook has many advantages. It helps to mutate data and runs animations based on the current value. We can access and modify the shared value using the `.value` property. We'll create a `doubleTap` object to scale the initial value and use `Gesture.Tap()` to animate the transition while scaling the sticker image. To determine the number of taps required, we'll add `numberOfTaps()`.

Create the following object in the `EmojiSticker` component:

```tsx
const doubleTap = Gesture.Tap()
  .numberOfTaps(2)
  .onStart(() => {
    if (scaleImage.value !== imageSize * 2) {
      scaleImage.value = scaleImage.value * 2;
    } else {
      scaleImage.value = Math.round(scaleImage.value / 2);
    }
  });
```

To animate the transition, let's use a spring-based animation. This will make it feel alive because it's based on the real-world physics of a spring. We will use the `withSpring()` function provided by `react-native-reanimated`.

On the sticker image, we'll use the `useAnimatedStyle()` hook to create a style object. This will help us to update styles using shared values when the animation happens. We'll also scale the size of the image by manipulating the `width` and `height` properties. The initial values of these properties are set to `imageSize`.

Create an `imageStyle` variable and add it to the `EmojiSticker` component:

```tsx
const imageStyle = useAnimatedStyle(() => {
  return {
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
  };
});
```

Next, wrap the `<Animated.Image>` component with the `<GestureDetector>` and modify the `style` prop on the `<Animated.Image>` to pass the `imageStyle`.

```tsx
import { ImageSourcePropType, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  return (
    <View style={{ top: -350 }}>
      <GestureDetector gesture={doubleTap}>
        <Animated.Image
          source={stickerSource}
          resizeMode="contain"
          style={[imageStyle, { width: imageSize, height: imageSize }]}
        />
      </GestureDetector>
    </View>
  );
}
```

In the above snippet, the `gesture` prop takes the value of the `doubleTap` to trigger a gesture when a user double-taps the sticker image.

Let's take a look at our app on Android, iOS and the web:

> For a complete reference of the tap gesture API, see the [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/2.x/gestures/tap-gesture) documentation.

## Add a pan gesture

To recognize a dragging gesture on the sticker and to track its movement, we'll use a pan gesture. In the **components/EmojiSticker.tsx**:

1.  Create two new shared values: `translateX` and `translateY`.
2.  Replace the `<View>` with the `<Animated.View>` component.

```tsx
export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  // ...rest of the code remains same

  return (
    <Animated.View style={{ top: -350 }}>
      <GestureDetector gesture={doubleTap}>
        {/* ...rest of the code remains same */}
      </GestureDetector>
    </Animated.View>
  );
}
```

Let's learn what the above code does:

-   The translation values defined will move the sticker around the screen. Since the sticker moves along both axes, we need to track the X and Y values.
-   In the `useSharedValue()` hooks, we have set both translation variables to have an initial position of `0`. This is the sticker's initial position and a starting point. This value sets the sticker's initial position when the gesture starts.

In the previous step, we triggered the `onStart()` callback for the tap gesture chained to the `Gesture.Tap()` method. For the pan gesture, specify an `onChange()` callback, which runs when the gesture is active and moving.

1.  Create a `drag` object to handle the pan gesture. The `onChange()` callback accepts `event` as a parameter. `changeX` and `changeY` properties hold the change in position since the last event and update the values stored in `translateX` and `translateY`.
2.  Define the `containerStyle` object using the `useAnimatedStyle()` hook. It will return an array of transforms. For the `<Animated.View>` component, we need to set the `transform` property to the `translateX` and `translateY` values. This will change the sticker's position when the gesture is active.

```tsx
const drag = Gesture.Pan().onChange(event => {
  translateX.value += event.changeX;
  translateY.value += event.changeY;
});

const containerStyle = useAnimatedStyle(() => {
  return {
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  };
});
```

Next, inside the JSX code:

1.  Update the `<EmojiSticker>` component so that the `<GestureDetector>` component becomes the top-level component.
2.  Add the `containerStyle` on the `<Animated.View>` component to apply the transform styles.

```tsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ImageSourcePropType } from 'react-native';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const drag = Gesture.Pan().onChange(event => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
```

Let's take a look at our app on Android, iOS and the web:

## Summary

Chapter 6: Add gestures

We've successfully implemented pan and tap gestures.

In the next chapter, we'll learn how to take a screenshot of the image and the sticker, and save it on the device's library.

[Next: Take a screenshot](/tutorial/screenshot)

## Take a screenshot
Source: https://docs.expo.dev/tutorial/screenshot/

In this tutorial, learn how to capture a screenshot using a third-party library and Expo Media Library.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll learn how to take a screenshot using a third-party library and save it on the device's media library. We'll use [`react-native-view-shot`](https://github.com/gre/react-native-view-shot) to take a screenshot and [`expo-media-library`](/versions/latest/sdk/media-library) to save an image on device's media library.

> So far, we have used third-party libraries, such as `react-native-gesture-handler`, `react-native-reanimated`. We can find hundreds of other third-party libraries on [React Native Directory](https://reactnative.directory/) depending on a use case.

[Watch: Taking screenshots in your universal Expo app](https://www.youtube.com/watch?v=Jft3_Yfr-p4) — Capture a screenshot with react-native-view-shot and save it to the device's media library using expo-media-library.

## Install libraries

To install `react-native-view-shot` and `expo-media-library`, run the following commands:

```sh
# npm
npx expo install react-native-view-shot expo-media-library

# yarn
yarn expo install react-native-view-shot expo-media-library

# pnpm
pnpm expo install react-native-view-shot expo-media-library

# bun
bun expo install react-native-view-shot expo-media-library
```

## Prompt for permissions

An app that requires sensitive information, such as accessing a device's media library, has to prompt permission to allow or deny access. Using `useMediaLibraryPermissions()` hook from `expo-image-picker`, we can use the permission `permissionResponse` and `requestPermission()` method to ask for access. This hook requests both read and write permissions, which covers picking images from the library and saving screenshots to it.

When the app loads for the first time and the permission status is neither granted nor denied, the value of the `permissionResponse` is `null`. When asked for permission, a user can either grant the permission or deny it. We can add a condition to check if it is not granted. If it is not granted, trigger the `requestPermission()` method. After getting the access, the value of the `permissionResponse` changes to `granted`.

Add the following code snippet inside the **src/app/(tabs)/index.tsx**:

```tsx
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

// ...rest of the code remains same

export default function Index() {
  const [permissionResponse, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  // ...rest of the code remains same

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  // ...rest of the code remains same
}
```

## Create a ref to save the current view

We'll use `react-native-view-shot` to allow the user to take a screenshot within the app. This library captures the screenshot of a `<View>` as an image using the `captureRef()` method. It returns the URI of the captured screenshot image file.

1.  Import `captureRef` from `react-native-view-shot` and `useRef` from React.
2.  Create an `imageRef` reference variable to store the reference of the screenshot image captured.
3.  Wrap the `<ImageViewer>` and `<EmojiSticker>` components inside a `<View>` and then pass the reference variable to it.

```tsx
import { useState, useRef } from 'react';
import { captureRef } from 'react-native-view-shot';

export default function Index() {
  const imageRef = useRef<View>(null);

  // ...rest of the code remains same

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {/* ...rest of the code remains same */}
    </GestureHandlerRootView>
  );
}
```

In the above snippet, the `collapsable` prop is set to `false`. This allows the `<View>` component to screenshot only of the background image and emoji sticker.

## Capture a screenshot and save it

We can capture a screenshot of the view by calling the `captureRef()` method from `react-native-view-shot` inside the `onSaveImageAsync()` function. It accepts an optional argument where we can pass the `width` and `height` of the screenshot capturing area. We can read more about available options in [the library's documentation](https://github.com/gre/react-native-view-shot#capturerefview-options-lower-level-imperative-api).

The `captureRef()` method also returns a promise that fulfills with the screenshot's URI. We will pass this URI as a parameter to [`MediaLibrary.saveToLibraryAsync()`](/versions/latest/sdk/media-library#medialibrarysavetolibraryasynclocaluri) and save the screenshot to the device's media library.

Inside **app/(tabs)/index.tsx**, update the `onSaveImageAsync()` function with the following code:

```tsx
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library/legacy';
import { useEffect, useRef, useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';

import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined);
  const [permissionResponse, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const imageRef = useRef<View>(null);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
```

Now, choose a photo and add a sticker in the app. Then tap the "Save" button. We should see the following result on Android and iOS:

## Summary

Chapter 7: Take a screenshot

We've successfully used `react-native-view-shot` and `expo-media-library` to capture a screenshot and save it on the device's library.

In the next chapter, let's learn how to handle the differences between mobile and web platforms to implement the same functionality on web.

[Next: Handle platform differences](/tutorial/platform-differences)


## Handle platform differences
Source: https://docs.expo.dev/tutorial/platform-differences/

In this tutorial, learn how to handle platform differences between native and web when creating a universal app.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Android, iOS, and the web have different capabilities. In our case, both Android and iOS can capture a screenshot with the `react-native-view-shot` library. However, web browsers cannot.

In this chapter, we'll learn how to handle capturing screenshots for web browsers so our app has the same functionality on all platforms.

[Watch: Handling platform differences in your universal Expo app](https://www.youtube.com/watch?v=mEKQvF4irBM) — Handle platform differences between Android, iOS, and web by implementing platform-specific screenshot capture with dom-to-image.

## Install and import dom-to-image

To capture a screenshot on the web and save it as an image, we'll use a third-party library called [`dom-to-image`](https://github.com/tsayen/dom-to-image#readme). It takes a screenshot of any DOM node and turns it into a vector (SVG) or raster (PNG or JPEG) image.

Stop the development server and run the following command to install the library:

```sh
# npm
npm install dom-to-image

# yarn
yarn add dom-to-image

# pnpm
pnpm add dom-to-image

# bun
bun add dom-to-image
```

> **Note:** The `dom-to-image` library is used here for illustrative purposes. For production apps, you may want to explore other solutions or APIs that better suit your specific use case.

After installing it, make sure to restart the development server and press W in the terminal.

## Add platform-specific code

Using `Platform` module from React Native, we can implement platform-specific behavior. Inside **app/(tabs)/index.tsx**:

1.  Import the `Platform` module from `react-native`.
2.  Import the `domtoimage` library from `dom-to-image`.
3.  Update the `onSaveImageAsync()` function to check whether the current platform is `'web'` with the `Platform.OS` property. If it is `'web'`, we'll use the `domtoimage.toJpeg()` method to convert and capture the current `<View>` as a JPEG image. Otherwise, we'll keep using the same logic added for native platforms.

```tsx
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library/legacy';
import { useEffect, useRef, useState } from 'react';
import { ImageSourcePropType, View, StyleSheet, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [permissionResponse, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const imageRef = useRef<View>(null);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
```

Fix `dom-to-image` TypeScript module error

We need to add a type definition after importing the `domtoimage` library since we're using TypeScript. We can do this by creating a file **types.d.ts** in the root of our project directory and adding the declaration statement:

```tsx
declare module 'dom-to-image';
```

On running the app in a web browser, we can now save a screenshot:

## Summary

Chapter 8: Handle platform differences

The app does everything we set out for it to do, so it's time to shift our focus toward the purely aesthetic..

In the next chapter, we will customize the app's status bar, splash screen, and app icon.

[Next: Configure status bar, splash screen and app icon](/tutorial/configuration)

## Configure status bar, splash screen and app icon
Source: https://docs.expo.dev/tutorial/configuration/

In this tutorial, learn the basics of how to configure a status bar, app icon, and splash screen.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll address some app details before deploying our app to an app store, such as theming the status bar, customizing the app icon, and splash screen.

[Watch: Adding the finishing touches to your universal Expo app](https://www.youtube.com/watch?v=OgGCYdElcZo) — Configure the status bar, customize your app icon, and set up the splash screen before deploying to the app store.

## Configure the status bar

[`expo-status-bar`](/versions/latest/sdk/status-bar) library comes pre-installed in every project created using `create-expo-app`. This library provides a `StatusBar` component to configure the app's status bar style.

Inside **app/_layout.tsx**:

1.  Import `StatusBar` from `expo-status-bar`.
2.  Group the `StatusBar` and existing `Stack` components with [React's Fragment component](https://react.dev/reference/react/Fragment).

```tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
```

Let's take a look at our app now on Android, and iOS:

## App icon

Inside the project, there's an **icon.png** file inside the **assets/images** directory. This is our app icon. It's a 1024px by 1024px image and looks as shown below:

Like the splash screen image, the `"icon"` property in the **app.json** file configures the app icon's path. By default, a new Expo project defines the correct path to `"./assets/images/icon.png"`. We don't have to change anything.

> Eventually, when you'll build your app for the app stores, [Expo Application Services (EAS)](/eas) will take this image and create optimized icon for every device.

You can see the icon in various places in Expo Go. Here is an example of the app icon displayed in the developer menu of Expo Go:

## Splash screen

A splash screen is visible before the app's content is loaded. It uses a smaller image, such as an app's icon, which is centered. It hides once the app's content is ready to be displayed.

The [`expo-splash-screen`](/versions/latest/sdk/splash-screen) plugin already comes pre-installed in every project created using `create-expo-app`. This library provides a config plugin to configure the splash screen.

In **app.json**, the `expo-splash-screen` plugin is already configured to use the app's icon as the splash screen image (provided in the [downloadable assets](/tutorial/create-your-first-app#download-assets)) with the following snippet so we don't have to change anything:

```json
{
  "plugins": [
    ... 
    [
      "expo-splash-screen",
      {
        "image": "./assets/images/splash-icon.png"
        ... 
      }
    ]
  ]
}
```

However, **to test the splash screen, we cannot use Expo Go or a [development build](/develop/development-builds/introduction)**. To test it, we need to create a preview or a production build of our app. We recommend going through the following resources to learn more about the splash screen configuration and how to test it:

-   [Create a splash screen icon](/develop/user-interface/splash-screen-and-app-icon#splash-screen) guide to learn how splash screen icon is configured.
-   To learn how to create a preview build, see [Internal distribution](/tutorial/eas/internal-distribution-builds) guide in EAS Tutorial, or to create production builds see guides for [Android](/tutorial/eas/android-production-build) and [iOS](/tutorial/eas/ios-production-build).

## Summary

Chapter 9: Configure status bar, splash screen and app icon

Well done! We built an app that runs on Android, iOS, and the web from the same codebase.

The next section of the tutorial will guide you toward resources to learn more about concepts we've covered here and others we have mentioned briefly.

[Next: Learning resources](/tutorial/follow-up)

## Learning resources
Source: https://docs.expo.dev/tutorial/follow-up/

Explore a curated list of resources to learn about Expo and React Native.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Now that the example app is done, let's learn more about the technologies we used to build it.

## Build your project into an app

To start creating a new app on your machine you can use `npx create-expo-app@latest --template default@sdk-56` and [set up your development environment](/get-started/set-up-your-environment) sequentially.

> **Note:** During the SDK 56 transition period, `create-expo-app@latest` without the `--template` flag creates an SDK 54 project. If you plan to use Expo Go on a physical device, use an SDK 54 project. Otherwise, use `--template default@sdk-56` to create an SDK 56 project.

### Recommended resources

Once you've created your new project, you can learn more about different tools and concepts that will help you on your app development journey:

-   [Development tools](/develop/tools): A reference of Expo tools that will help you during various aspects of your app-building journey.
-   [Development builds](/develop/development-builds/introduction): Using a development build allows you to gain full control over your app's build process, and to test your app on a device or simulator.
-   [Development overview](/workflow/overview): This is a high-level overview that provides details on key concepts for developing an app with Expo and the flow of core development loop.
-   [Expo Router](/router/introduction): We went through basics of Expo Router and implemented a tab navigator. See its documentation to learn more about the library.
-   [App icon](/develop/user-interface/splash-screen-and-app-icon#app-icon) and [splash screen](/develop/user-interface/splash-screen-and-app-icon#splash-screen): You can learn more about customizing your app icon and splash screen guides. Also, look through the [app config reference](/workflow/configuration) for properties you can configure in the **app.json** file.
-   [App distribution](/deploy/build-project) and [submission](/deploy/submit-to-app-stores) to app stores: Read these resources to learn more about how to release and submit your app to app stores once it's ready to ship.
-   [Debugging](/debugging/runtime-issues): Sometimes things go wrong, and when they do, you can use debugging tools to find and fix errors.

## Learning

### React

We used React components and APIs. Having a solid understanding of React is essential to using Expo to build your app. We recommend reading the React documentation's [Quick Start section](https://react.dev/learn) and the [Hooks section](https://react.dev/reference/react/hooks).

### React Native

While developing the tutorial app, we used React Native extensively. You can start from the [React Native basics guide](https://reactnative.dev/docs/getting-started) to learn more. Also, check out the following docs:

-   [View API reference](https://reactnative.dev/docs/view)
-   [Text API reference](https://reactnative.dev/docs/text)
-   [Platform specific code](https://reactnative.dev/docs/platform-specific-code)
-   [Presenting data in a list](https://reactnative.dev/docs/using-a-listview)

We used Flexbox to layout our components. Check out the following recommendations to learn more about it:

-   [Height and Width](https://reactnative.dev/docs/height-and-width)
-   [Layout with Flexbox](https://reactnative.dev/docs/flexbox)

### Gestures and animations

To learn more about implementing different types of gestures and animations, we recommend the following documentation:

-   [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
-   [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)

## Join the community

Join our community on [Discord](https://chat.expo.dev/) to chat with other Expo users or to ask questions.


## Tutorial: Build an app with an AI agent
Source: https://docs.expo.dev/tutorial/build-with-ai/introduction/

An introduction to a tutorial on building an Expo app that runs on Android, iOS, and the web by directing an AI coding agent, with no programming experience required.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this tutorial, you'll build a complete app for Android, iOS, and the web without writing code yourself. Instead, you'll direct an AI coding agent, such as Claude Code, Codex, or Cursor, and check the results live on your own phone after every step.

This tutorial is for **builders**: people who have an idea for an app but don't have a programming background. If you'd rather learn to write the code yourself, follow the [Expo tutorial](/tutorial/introduction) instead. It builds the same app, one code snippet at a time.

## What you'll build

You'll build **StickerSmash**, an app that lets you pick a photo, place an emoji sticker on it, move and resize the sticker with your fingers, and save the result to your photo library.

## How this tutorial works

Every chapter follows the same loop:

1.  **Prompt**: paste a suggested prompt into your AI agent.
2.  **Build**: the agent writes the code and the app updates on your phone within seconds.
3.  **Verify**: check that the app does what you asked, right on your phone.
4.  **Re-prompt**: if something looks off, tell the agent what you see and let it fix the problem.

You are the product owner and the tester. The agent is the programmer.

AI agents don't produce identical results every time, so your app won't match our screenshots pixel for pixel. That's expected. The prompts describe the outcome you want, and the screenshots show approximately what you should see. Feel free to edit the prompts to match your own taste: pick different colors, change the wording on buttons, make it yours.

## What you'll need

-   A computer running macOS, Windows, or Linux.
-   An Android or iOS phone.
-   About an hour. The first chapter walks you through installing every tool from scratch, so you don't need anything set up in advance.

## Chapters

1.  [Set up your tools](/tutorial/build-with-ai/set-up-your-tools)
2.  [Create your first app](/tutorial/build-with-ai/create-your-first-app)
3.  [Build the home screen](/tutorial/build-with-ai/build-the-home-screen)
4.  [Add stickers](/tutorial/build-with-ai/add-stickers)
5.  [Save your creation](/tutorial/build-with-ai/save-your-creation)
6.  [Finishing touches](/tutorial/build-with-ai/finishing-touches)

## Next step

[Set up your tools](/tutorial/build-with-ai/set-up-your-tools) — Install your AI agent, Node.js, and Expo Go, and teach your agent about Expo.

## Set up your tools
Source: https://docs.expo.dev/tutorial/build-with-ai/set-up-your-tools/

In this chapter, install an AI coding agent, Node.js, and Expo Go, and teach your agent about Expo.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, you'll install everything you need, starting from zero. This is the longest chapter. Once your tools are set up, the fun starts and the rest of the tutorial moves quickly.

Prerequisites

3 requirements

1.

A computer

A computer running macOS, Windows, or Linux.

2.

A phone

An Android or iOS phone, connected to the same Wi-Fi network as your computer.

3.

About 20 minutes

That's all the setup should take.

## Open a terminal

The terminal is the app where you'll talk to your AI agent. On macOS, open the built-in **Terminal** app (find it with Spotlight search). On Windows, open **PowerShell** from the Start menu. You'll type a handful of commands into it during this chapter. Each one is provided for you to copy and paste.

> If you plan to use **Cursor**, you'll work inside its visual editor instead of a terminal for most of this tutorial, but keep a terminal handy: you'll still use it to run your app.

## Install Node.js

Node.js is the runtime that powers Expo's developer tools. Download the **LTS** version from [nodejs.org](https://nodejs.org/en) and run the installer, accepting the default options.

To confirm it worked, run the following command in your terminal. It should print a version number:

```sh
node --version
```

## Install an AI agent

If you already use an AI coding agent, skip to the next step. Otherwise, pick one below. This tutorial works the same with any of them.

Install [Claude Code](https://claude.com/claude-code) with the following command:

```sh
npm install -g @anthropic-ai/claude-code
```

Then run `claude` in your terminal and follow the instructions to sign in. See the [Claude Code setup guide](https://code.claude.com/docs/en/setup) if you run into trouble.

Other agents work too. As long as your agent can edit files and run commands on your computer, you can follow along.

## Install Expo Go and create an Expo account

Expo Go is a free app that lets you test your project on your phone while you build it, with no app store publishing required. Every time your agent changes the code, the app on your phone updates within seconds.

1.  Install [Expo Go](https://expo.dev/go) from the Google Play Store or Apple App Store on your phone.
2.  Create a free account at [expo.dev/signup](https://expo.dev/signup) on your computer.
3.  Open Expo Go on your phone and sign in with the same account.

## Teach your agent about Expo

Expo Skills are instruction files that teach AI agents how to build Expo apps well: which libraries to use, how to structure screens, and how to avoid common mistakes. Installing them is the single biggest thing you can do to get good results from your agent.

Start `claude`, then run the following command inside it:

```sh
/plugin install expo@claude-plugins-official
```

[Expo Skills](/skills) — Full installation instructions for every agent, and a list of all available skills.

## Connect the Expo MCP server

The Expo MCP server gives your agent direct access to Expo's tools: it can read the latest Expo documentation, install the right packages, and inspect your project.

Run the following command in your terminal:

```sh
claude mcp add --transport http expo https://mcp.expo.dev/mcp
```

Then start `claude` and run `/mcp` inside it to sign in with the Expo account you created in the previous step.

Optional: let your agent see and tap your app

The MCP server also offers local capabilities: with extra setup, a multimodal agent can take screenshots of your app running in a simulator, tap buttons, and verify its own work. This requires a simulator on your computer (macOS only for iOS), so it's beyond this tutorial. In the chapters ahead, **you** are the one verifying the app on your phone. If you want to explore it later, see [Set up local capabilities](/eas/ai/mcp#set-up-local-capabilities-recommended).

[Expo MCP server](/eas/ai/mcp) — Full installation instructions, available tools, and data privacy details.

## Test your setup

Let's confirm everything is wired up. Paste the following prompt into your agent:

```text
Use the Expo MCP server to search the Expo documentation for "expo-image-picker" and tell me in one sentence what it does.
```

**What you should see**: the agent calls an Expo documentation tool and replies with a sentence about picking images from the device's photo library. If it reports a connection or authentication error instead, repeat the sign-in part of the previous step.

## Summary

Chapter 1: Set up your tools

Your toolkit is complete: an AI agent that knows how to build Expo apps, Node.js to power the tooling, and Expo Go on your phone to see the results.

In the next chapter, your agent creates a new app and you see it running on your phone.

[Next: Create your first app](/tutorial/build-with-ai/create-your-first-app)

## Create your first app
Source: https://docs.expo.dev/tutorial/build-with-ai/create-your-first-app/

In this chapter, direct your AI agent to create a new Expo app and see it running on your phone.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, your agent creates a new Expo app, you get it running on your phone, and you make your first change. This is the loop you'll repeat for the rest of the tutorial.

## Start your agent in a new folder

Your agent works inside one folder at a time, so create a dedicated folder for this project and start the agent there. In your terminal, run:

```sh
mkdir StickerSmash
cd StickerSmash
```

Then start your agent in that folder: run `claude` or `codex`. If you're using Cursor, create a new folder named **StickerSmash**, open it with **File** > **Open Folder**, and open the agent panel.

## Create the app

Paste the following prompt into your agent:

```text
Create a new Expo app in this folder (the current directory) by running npx create-expo-app@latest and choosing the SDK 54 template — I will test the app with Expo Go on my phone, which uses SDK 54. After it is created, run the project's reset-project script so we start from a minimal app, and delete the app-example folder that the script leaves behind. Don't start the development server; I will run that myself.
```

The agent takes a few minutes to download the template and install its dependencies. When it finishes, it should report that the project is ready, with a minimal **app** folder containing a couple of files.

## Run the app on your phone

This is the one command you'll run yourself throughout the tutorial. It starts the development server that streams your app to your phone. Open a **new terminal window** (leave your agent running in the first one), then run:

```sh
cd StickerSmash
npx expo start
```

A QR code appears in the terminal. To open the app:

-   **Android**: open Expo Go and tap **Scan QR code**.
-   **iOS**: open the default camera app and point it at the QR code.

You should see a mostly empty screen on your phone. That's your app. Keep this terminal window open and your phone nearby for the rest of the tutorial.

Phone can't connect?

Your phone and computer must be on the same Wi-Fi network. If they are and the app still doesn't load, stop the server with Ctrl + C and restart it in tunnel mode, which works across networks:

```sh
npx expo start --tunnel
```

You can also find your project under the **Projects** tab in Expo Go when you're signed in to the same Expo account on your phone and in the terminal.

## Make your first change

Now close the loop: ask the agent for a visible change and watch it land on your phone. Paste the following prompt into your agent:

```text
Change the home screen so it shows the text "Home screen" in white, centered on a dark background with the color #25292e.
```

**What you should see**: within seconds of the agent finishing, the app on your phone reloads to a dark screen with white "Home screen" text in the middle.

That's the whole workflow — you prompt, the agent builds, your phone shows the result.

## When something looks wrong

Sooner or later a result won't match what you asked for. That's normal, and fixing it is part of the workflow:

-   **Describe, don't diagnose.** Tell the agent exactly what you see and what you expected: "The text is centered but the background is still white." You don't need to guess why.
-   **Paste errors verbatim.** If your phone shows a red error screen or the terminal prints an error, copy the whole message into the agent. Error messages are written for programmers, and your agent is one.
-   **Ask the agent to check its work.** A prompt like "Something is broken — review the change you just made, find the problem, and fix it" goes a long way.
-   **If the app gets stuck**, shake your phone and tap **Reload** in the menu that appears. If that doesn't help, stop the development server with Ctrl + C and run `npx expo start` again.

The next chapters end with a short reminder linking back to this section.

## Summary

Chapter 2: Create your first app

You created an app, ran it on your phone, and changed it with a single prompt.

In the next chapter, you'll turn this empty screen into the real thing: navigation tabs, the photo viewer, and an image picker.

[Next: Build the home screen](/tutorial/build-with-ai/build-the-home-screen)

## Build the home screen
Source: https://docs.expo.dev/tutorial/build-with-ai/build-the-home-screen/

In this chapter, direct your AI agent to add tab navigation, the photo viewer, and an image picker.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, the app starts to look like StickerSmash: two navigation tabs, a photo viewer, and a button that opens your phone's photo library.

## Add navigation tabs

Most apps have more than one screen, with tabs along the bottom to switch between them. Paste the following prompt into your agent:

```text
Add a tab bar to the app with two tabs: a Home tab showing the current home screen, and an About tab with a screen that says "About screen" for now. Use Expo Router for navigation. Style everything with a dark theme: the color #25292e for the screen backgrounds, headers, and tab bar, white text, and yellow (#ffd33d) as the color of the selected tab. Give each tab a fitting icon, such as a house for Home and an info circle for About.
```

**What you should see**: a tab bar at the bottom of the app with Home and About tabs. The tab you're on is highlighted in yellow, and tapping the other one switches screens.

## Add the photo viewer

Next, give the home screen its main content: a large photo and two buttons. We've prepared an asset pack with the placeholder photo and the emoji stickers you'll use later. Paste the following prompt into your agent:

```text
Download the image assets for this app from https://docs.expo.dev/static/images/tutorial/sticker-smash-assets.zip and extract them into the assets/images folder, replacing any files with the same names. Then build out the Home screen: show the background-image.png photo large in the center of the screen with rounded corners, and below it two buttons stacked vertically: "Choose a photo" — a prominent button with a yellow border, a white background, a dark label, and a small picture icon — and a plain "Use this photo" button with white text. Use the expo-image library to display the image.
```

Prefer to download the assets yourself?

If your agent can't download or extract the file, do it manually: download [sticker-smash-assets.zip](/static/images/tutorial/sticker-smash-assets.zip), unzip it, and copy the images into the **assets/images** folder inside your **StickerSmash** folder, replacing files with the same names. Then ask the agent to build the screen with the prompt above, minus its first sentence.

**What you should see**: a photo of a wooden boardwalk over the ocean filling most of the screen, with the two buttons below it.

## Pick a photo from your library

Time for the first real feature: choosing your own photo. Paste the following prompt into your agent:

```text
Add the expo-image-picker library. When I tap "Choose a photo", open my phone's photo library so I can pick an image, and show the one I pick in place of the placeholder photo. If I cancel without picking anything, keep showing the current photo.
```

**What you should see**: tapping **Choose a photo** opens your phone's photo library. The first time, your phone asks for permission to access your photos. Tap **Allow**. The photo you pick replaces the placeholder photo.

> If a result doesn't match what you expected, tell the agent what you see. The [When something looks wrong](/tutorial/build-with-ai/create-your-first-app#when-something-looks-wrong) section from the previous chapter has the playbook.

## Summary

Chapter 3: Build the home screen

The app now has navigation, a styled home screen, and a working photo picker. You haven't touched a line of code.

In the next chapter, you'll add an emoji picker modal and play with the sticker using gestures.

[Next: Add stickers](/tutorial/build-with-ai/add-stickers)


## Add stickers
Source: https://docs.expo.dev/tutorial/build-with-ai/add-stickers/

In this chapter, direct your AI agent to add an emoji picker modal and make the sticker respond to drag and tap gestures.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, the app earns its name: you'll pick an emoji from a sliding panel, smash it onto your photo, and move it around with your fingers.

## Add the emoji picker

Once a photo is chosen, the app should switch from "picking a photo" mode to "decorating it" mode. Paste the following prompt into your agent:

```text
When a photo has been chosen (either picked from the library or by tapping "Use this photo"), replace the two buttons with a row of options: a "Reset" option on the left that brings back the original buttons, and a circular "+" button in the middle. Tapping "+" should slide up a modal from the bottom titled "Choose a sticker" that shows the emoji images from the assets/images folder in a horizontally scrolling list. When I tap an emoji, close the modal and place that emoji on top of the photo as a sticker.
```

**What you should see**: after choosing a photo, the buttons change to the new option row. Tapping **+** slides up a panel of emoji; you can scroll the list sideways. Tapping one closes the panel and the emoji appears on your photo.

## Move and resize the sticker

A sticker stuck in one spot isn't much fun. Paste the following prompt into your agent:

```text
Make the sticker interactive using the react-native-gesture-handler and react-native-reanimated libraries: I want to drag the sticker around with my finger to place it anywhere on the photo, and double-tap it to double its size (double-tapping again should shrink it back). The movement and resizing should animate smoothly.
```

**What you should see**: drag the emoji around the photo with your finger, and double-tap it to grow and shrink it.

This step is a good reminder of your role: the agent can read its own code, but it can't feel a gesture. Only you can confirm that dragging feels right. If the sticker lags, jumps, or snaps back, describe exactly that to the agent.

> If a result doesn't match what you expected, tell the agent what you see. The [When something looks wrong](/tutorial/build-with-ai/create-your-first-app#when-something-looks-wrong) section has the playbook.

## Summary

Chapter 4: Add stickers

Your photo now wears a draggable, resizable emoji sticker. All that's missing is a way to keep your creation.

In the next chapter, you'll save the decorated photo to your phone's photo library.

[Next: Save your creation](/tutorial/build-with-ai/save-your-creation)

## Save your creation
Source: https://docs.expo.dev/tutorial/build-with-ai/save-your-creation/

In this chapter, direct your AI agent to save the decorated photo to your phone, and optionally make it work in the browser too.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, you'll add the final core feature: saving the photo, sticker and all, to your phone's photo library.

## Save to your photo library

Paste the following prompt into your agent:

```text
Add a "Save" option to the row of options, with a download icon. When I tap it, capture just the photo with the sticker on it (not the whole screen) using the react-native-view-shot library, and save the result to my phone's photo library using the expo-media-library library. Ask for permission the first time if needed, and show an alert confirming that the image was saved.
```

**What you should see**: tapping **Save** asks for permission to save to your photos the first time. Tap **Allow**, and the app shows a confirmation. Open your phone's photo gallery: your photo is there with the sticker baked in, ready to share anywhere.

## Make it work on the web (optional)

Your app isn't only a phone app. The same project runs in a web browser. In the terminal window running the development server, press W and the app opens in your browser. Everything works, except **Save**: the library that captures the image on phones doesn't work on the web.

Want to fix the Save option on the web?

Paste the following prompt into your agent:

```text
Make the Save option also work when the app runs in a web browser. The react-native-view-shot library doesn't support the web, so when the platform is web, use the dom-to-image library to capture the image and download it as a file instead.
```

**What you should see**: in the browser, pick a photo, add a sticker, and click **Save**. The image downloads as a file. This is how platform differences are handled in Expo apps: one app, with small platform-specific branches where needed.

> If a result doesn't match what you expected, tell the agent what you see. The [When something looks wrong](/tutorial/build-with-ai/create-your-first-app#when-something-looks-wrong) section has the playbook.

## Summary

Chapter 5: Save your creation

StickerSmash is feature-complete: pick a photo, smash a sticker on it, and save the result, on your phone and even in the browser. One chapter to go.

In the next chapter, you'll polish the status bar, splash screen, and app icon, and take your next steps.

[Next: Finishing touches](/tutorial/build-with-ai/finishing-touches)

## Finishing touches
Source: https://docs.expo.dev/tutorial/build-with-ai/finishing-touches/

In this chapter, direct your AI agent to polish the status bar, splash screen, and app icon, then take your next steps as a builder.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The app works. Now make it feel finished. In this chapter, you'll polish the details users notice without realizing it: the status bar, the splash screen, and the app icon.

## Fix the status bar

Look at the very top of your app: the clock and battery icons are dark, which makes them hard to read against the dark background. Paste the following prompt into your agent:

```text
The phone's status bar (the clock and battery icons at the top of the screen) is hard to read against our dark background. Use the expo-status-bar library to make the status bar text light on every screen.
```

**What you should see**: the clock, battery, and signal icons at the top of the screen are now light and readable.

## Set the app icon and splash screen

The asset pack you downloaded earlier includes an app icon and a splash screen image. Paste the following prompt into your agent:

```text
Set the app's icon to assets/images/icon.png, and configure the splash screen using the expo-splash-screen config plugin so it shows assets/images/splash-icon.png centered on a #25292e background on Android, iOS, and web.
```

**What you should see**: these settings live in the app's configuration, so restart the development server to apply them: press Ctrl + C in the terminal, run `npx expo start` again, and reopen the app from Expo Go. You'll briefly see the splash screen while the project loads.

One caveat: the app icon on your home screen won't change, because you're running your project inside Expo Go, which is its own app with its own icon. Your icon takes over when you create a standalone build of your app. See [development builds](/develop/development-builds/introduction) when you're ready for that step.

> If a result doesn't match what you expected, tell the agent what you see — the [When something looks wrong](/tutorial/build-with-ai/create-your-first-app#when-something-looks-wrong) section has the playbook.

## You built an app

Take a second to appreciate what happened here: you set up a development environment from nothing, then directed an AI agent to build a real app with navigation, photo picking, gesture-driven stickers, and saving (for Android, iOS, and the web) without writing code.

More importantly, you learned the loop: prompt, build, verify, re-prompt. That loop doesn't end with this tutorial. Try it on your own ideas right now:

```text
Let me place more than one sticker on the photo.
```

```text
Add a share button that opens the system share sheet so I can send my creation to friends.
```

```text
Fill in the About screen: explain what the app does and credit me as the builder.
```

## Next steps

[Expo Skills](/skills) — Browse the full list of skills your agent can use, with example prompts for each.

[Expo MCP server](/eas/ai/mcp) — Explore everything your agent can do with Expo's tools, including triggering builds and reading crash reports.

Need help or want to show off what you built? Join the Expo community on [Discord](https://chat.expo.dev/).

## Summary

Chapter 6: Finishing touches

Congratulations! You built StickerSmash from scratch by directing an AI agent, and polished it with a status bar, splash screen, and app icon.

Curious what your agent actually wrote? The Expo tutorial builds the same app, explaining the code one step at a time.

[Next: Expo tutorial](/tutorial/introduction)


## EAS Tutorial: Introduction
Source: https://docs.expo.dev/tutorial/eas/introduction/

An introduction to the tutorial for building apps for Android and iOS using Expo Application Services (EAS) that covers the Build, Update, and Submit workflows.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## About this tutorial

This tutorial will give you proficiency with [Expo Application Services (EAS)](https://expo.dev/eas) core services: [Build](/build/introduction), [Submit](/submit/introduction), and [Update](/eas-update/introduction). When you complete the tutorial, you will know how to set up a professional mobile Continuous Integration (CI)/Continuous Development (CD) pipeline for your individual and team projects.

This tutorial covers the following topics:

-   Use EAS Build to create and install a development build, then run it on a device, emulator, or simulator.
-   Experience the benefits of using a development build instead of Expo Go.
-   Implement workflows for sharing development builds with a team or external stakeholders.
-   Automatically increment app build versions.
-   Simultaneously install different app variants, like development and preview, on one device.
-   Utilize EAS Update to create and deploy updates swiftly during the development phase.
-   Automate build processes by integrating with a GitHub repository.

These topics will give us the foundation needed to use EAS effectively and to approach more advanced topics when needed.

This tutorial is hands-on and designed to be completed in about two hours.

Prerequisites

1 requirement

An existing Expo project set up locally

Pick one of the following options to follow along:

-   Continue with the Sticker Smash app from the previous tutorial. If new, download it from [GitHub](https://github.com/expo/examples/tree/master/stickersmash).
-   Start a new project with [`npx create-expo-app`](/get-started/create-a-project).
-   Use a bare React Native project. Ensure the `expo` package is installed, which you can do [automatically](/bare/installing-expo-modules) or [manually](/bare/installing-expo-modules#manual-installation).

## Tools

[Expo Orbit](https://expo.dev/orbit) to manage and launch builds with one click on macOS, Windows, and Linux.

If you want to install and run the build locally on your machine simultaneously, you can use Android Emulator or iOS Simulator. To set them up, see the following:

-   [Android Emulator](/workflow/android-studio-emulator)
-   [iOS Simulator](/workflow/ios-simulator) (available only on macOS)

## Next step

We're ready for this journey after setting up an Expo project locally. In the next chapter, let's learn how to create your first build with EAS Build.

[Start](/tutorial/eas/configure-development-build) — Let's start by configuring a development build.

## Configure a development build in cloud
Source: https://docs.expo.dev/tutorial/eas/configure-development-build/

Learn how to configure a development build for a project using EAS Build.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll set up and configure a development build with EAS for our example app.

[Watch: How to configure a development build](https://www.youtube.com/watch?v=uQCE9zl3dXU) — Learn how to install expo-dev-client, configure build profiles in eas.json, and create your first development build with EAS Build.

## Understanding development builds

A [development build](/develop/development-builds/introduction) is a debug version of our project. It is optimized for quick iterations when creating an app. It contains the [`expo-dev-client`](/versions/latest/sdk/dev-client) library, which offers a robust and complete development environment.

| Feature | Development Builds | Expo Go |
| --- | --- | --- |
| **Development phase** | Offers web-like iteration speed for mobile app development. | Allows for quick iteration and testing of Expo SDK projects using the client app. |
| **Collaboration** | Facilitates team testing with shared native runtime. | Easy project sharing via QR codes on a device. |
| **Third-party libraries support** | Full support for any third-party library, including those that require custom native code. | Limited to libraries within the Expo SDK, not suitable for custom native dependencies. |
| **Customization** | Extensive customization with config plugins and direct access to native code. | Limited customization with a focus on Expo SDK capabilities without direct native code modification. |
| **Intended use** | Ideal for full-fledged app development aimed at store deployment, offering a complete development environment and tools. | Ideal for learning, prototyping, and experimenting. Not recommended for production apps. |

## Install expo-dev-client library

```sh
# npm
npx expo install expo-dev-client

# yarn
yarn expo install expo-dev-client

# pnpm
pnpm expo install expo-dev-client

# bun
bun expo install expo-dev-client
```

Run `npx expo start` to start the development server.

## Initialize a development build

### Install EAS CLI

```sh
# npm
npm install --global eas-cli

# yarn
yarn global add eas-cli

# pnpm
pnpm add --global eas-cli

# bun
bun add --global eas-cli
```

### Log in or sign up for an Expo account

```sh
eas login
```

### Initialize and link the project to EAS

```sh
eas init
```

This command creates an EAS project, generates a unique `projectId`, and links the project.

## Configure project for EAS Build

```sh
eas build:configure
```

This creates **eas.json** with build profiles: `development`, `preview`, and `production`.

## Summary

Chapter 1: Configure development build in cloud

[Next: Create and run a cloud build for Android](/tutorial/eas/android-development-build)

## Create and run a cloud build for Android
Source: https://docs.expo.dev/tutorial/eas/android-development-build/

Learn how to configure a development build for Android devices and emulators using EAS Build.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll create a development build that can run on Android with EAS Build.

[Watch: How to create and run a cloud build for Android](https://www.youtube.com/watch?v=D612BUtvvl8)

## Create a build for the development profile

```sh
eas build --platform android --profile development
```

This command prompts for Android application ID and keystore generation. Builds can be tracked on the EAS dashboard.

## Android device

### Install development build

Uses Expo Orbit or Install button/QR code to download and install the .apk file.

### Run development build

```sh
# npm
npx expo start
```

Press A in the terminal to open the project.

## Android Emulator

### Install the development build

EAS CLI prompts to run the build on an Android Emulator upon completion.

### Run the development build

```sh
# npm
npx expo start
```

Press A in the terminal window.

## Summary

Chapter 2: Create and run a cloud build for Android

[Next: Create and run a cloud build for iOS Simulator](/tutorial/eas/ios-development-build-for-simulators)

## Create and run a cloud build for iOS Simulator
Source: https://docs.expo.dev/tutorial/eas/ios-development-build-for-simulators/

Learn how to configure a development build for iOS Simulators using EAS Build.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll create a development build that can run on an iOS Simulator with EAS Build.

[Watch: Creating a development build for iOS Simulator](https://www.youtube.com/watch?v=SgL97PFZctg)

## Create a simulator build profile in eas.json

```json
{
  "build": {
    "ios-simulator": {
      "extends": "development",
      "ios": {
        "simulator": true
      }
    }
  }
}
```

## Development build for iOS Simulator

### Create

```sh
eas build --platform ios --profile ios-simulator
```

### Install

EAS CLI prompts to run on iOS Simulator upon completion.

### Run

```sh
# npm
npx expo start
```

Press I in the terminal window.

## Summary

Chapter 3: Create and run a cloud build for iOS Simulator

[Next: Create and run a cloud build for iOS device](/tutorial/eas/ios-development-build-for-devices)


## Create and run a cloud build for iOS device
Source: https://docs.expo.dev/tutorial/eas/ios-development-build-for-devices/

Learn how to configure a development build for iOS devices using EAS Build.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll create a development build that can run on an iOS device with EAS Build. Development builds for iOS devices are generated in the **.ipa** format.

[Watch: Creating a development build for iOS physical device](https://www.youtube.com/watch?v=HbfWU7_o4cU)

Prerequisites: Apple Developer account, Developer Mode activated on iOS 16+.

## Provisioning profile

### Register an iOS device

```sh
eas device:create
```

### Download and install profile

On the device's browser, open the registration URL, download and install the profile.

## Development build for iOS device

### Create

```sh
eas build --platform ios --profile development
```

### Install

Uses Expo Orbit or Install button/QR code.

### Run

```sh
# npm
npx expo start
```

Tap the app icon on the device, then fetch development servers.

## Summary

Chapter 4: Create and run a cloud build for iOS device

[Next: Configure multiple app variants](/tutorial/eas/multiple-app-variants)

## Configure multiple app variants
Source: https://docs.expo.dev/tutorial/eas/multiple-app-variants/

Learn how to configure dynamic app config to install multiple app variants on a single device.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll configure our project to run multiple build types (development, preview, production) on a single device simultaneously.

[Watch: How to configure multiple app variants](https://www.youtube.com/watch?v=UtJJCAfrjIg)

## Add app.config.js for dynamic configuration

```js
export default ({ config }) => ({
  ...config,
});
```

## Update dynamic values based on environment

```js
const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';
```

## Configure eas.json

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": { "APP_VARIANT": "development" }
    },
    "preview": {
      "distribution": "internal",
      "env": { "APP_VARIANT": "preview" }
    }
  }
}
```

## Summary

Chapter 5: Configure multiple app variants

[Next: Create and share internal distribution build](/tutorial/eas/internal-distribution-builds)

## Create and share internal distribution build
Source: https://docs.expo.dev/tutorial/eas/internal-distribution-builds/

Learn about internal distribution builds, why we need them, and how to create them.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll learn how to set up internal distribution builds.

[Watch: How to create and share an internal distribution build](https://www.youtube.com/watch?v=1fQuGLHxWks)

## Create an internal distribution build

Using the `preview` profile from **eas.json**:

```sh
eas build --platform android --profile preview
```

The `distribution` set to `internal` creates shareable build URLs.

## Summary

Chapter 6: Create and share internal distribution build

[Next: Manage different app versions](/tutorial/eas/manage-app-versions)

## Manage different app versions
Source: https://docs.expo.dev/tutorial/eas/manage-app-versions/

Learn about developer-facing and user-facing app versions and how EAS Build automatically manages developer-facing versions.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Developer-facing values: `versionCode` (Android) and `buildNumber` (iOS). EAS Build automates these with `cli.appVersionSource` set to `remote` and `build.production.autoIncrement` set to `true`.

[Watch: Automating app version code](https://www.youtube.com/watch?v=C8x4N9UmzS8)

## Summary

Chapter 7: Manage different app versions

[Next: Create a production build for Android](/tutorial/eas/android-production-build)

## Create a production build for Android
Source: https://docs.expo.dev/tutorial/eas/android-production-build/

Learn about the process of creating a production build for Android and automating the release process.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Prerequisites: Google Play Developer account, production build profile in eas.json.

[Watch: Creating and releasing a production build for Android](https://www.youtube.com/watch?v=nxlt8uwqhpE)

## Create a production build

```sh
eas build --platform android
```

This creates a .aab file optimized for Google Play Store distribution.

## Release an internal testing version

Upload the .aab to Google Play Console, provide release details, and publish.

## Automated release

```sh
eas build --platform android --auto-submit
```

## Summary

Chapter 8: Create a production build for Android

[Next: Create a production build for iOS](/tutorial/eas/ios-production-build)

## Create a production build for iOS
Source: https://docs.expo.dev/tutorial/eas/ios-production-build/

Learn about the process of creating a production build for iOS and automating the release process.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Prerequisites: Apple Developer account, production build profile in eas.json.

[Watch: Creating and releasing a production build for iOS](https://www.youtube.com/watch?v=VZL_e0cEwo8)

## Create a distribution provisioning profile

```sh
eas credentials
```

## Create a production build

```sh
eas build --platform ios
```

## Submit to App Store

```sh
eas submit --platform ios
```

## Automated submissions

```sh
eas build --platform ios --auto-submit
```

## Summary

Chapter 9: Create a production build for iOS

[Next: Share previews with your team](/tutorial/eas/team-development)


## Share previews with your team
Source: https://docs.expo.dev/tutorial/eas/team-development/

Learn how to use EAS Update to send OTA updates and share previews with a team.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

In this chapter, we'll use EAS Update to share changes with our team.

[Watch: How to share previews with your team](https://www.youtube.com/watch?v=vPKh-tNm-yI)

## Install expo-updates library

```sh
# npm
npx expo install expo-updates
```

## Configure EAS Update

```sh
eas update:configure
```

Add a `channel` to every build profile in **eas.json**.

## Publish an update

```sh
eas update --channel development --message "Change first button label"
```

## Summary

Chapter 10: Share previews with your team

[Next: Trigger builds from a GitHub repository](/tutorial/eas/using-github)

## Trigger builds from a GitHub repository
Source: https://docs.expo.dev/tutorial/eas/using-github/

Learn about the process of triggering builds from a GitHub repository.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Expo GitHub App](/build/building-from-github) automatically triggers builds from GitHub projects with EAS.

[Watch: How to trigger builds from a GitHub repository](https://www.youtube.com/watch?v=fBLFEFC0ip0)

## Configure Expo GitHub app

Connect your GitHub account in the EAS dashboard at [expo.dev/settings](https://expo.dev/settings).

## Connect the GitHub repository

In EAS dashboard, go to **Projects** > Select your project > **Project settings** > **GitHub**.

## Trigger a build using a GitHub PR label

Create a label called `eas-build-all:development` on a PR to automatically trigger builds.

## Summary

Chapter 11: Trigger builds from a GitHub repository

[Next: Next steps in your journey with EAS](/tutorial/eas/next-steps)

## Next steps
Source: https://docs.expo.dev/tutorial/eas/next-steps/

Learn about the next steps in your journey with EAS.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Congratulations! You've completed the EAS tutorial.

[EAS Workflows](/eas/workflows/introduction), [EAS Build](/build/introduction), [EAS Hosting](/eas/hosting/introduction), [EAS Submit](/submit/introduction), [EAS Update](/eas-update/introduction), [EAS Metadata](/eas/metadata), [EAS Insights](/eas-insights/introduction)

[eas.json schema](/eas/json), [Custom builds](/custom-builds/get-started), [Automate submissions](/build/automate-submissions), [GitHub Actions with EAS Update](/eas-update/github-actions), [App credentials](/app-signing/app-credentials), [Develop an app with Expo](/workflow/overview)

## Overview of using Expo with existing React Native apps
Source: https://docs.expo.dev/bare/overview/

Learn how to use Expo tools and services with existing React Native apps.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

If you have a React Native app that doesn't use any Expo tools, you might be wondering what Expo can provide for you and how to get started.

**All tools and services provided by Expo work great in any React Native app**.

## Incremental adoption steps

### Prerequisites

[Install Expo modules](/bare/installing-expo-modules), [Use Expo CLI](/bare/using-expo-cli)

### Quick wins

[Use Expo SDK](/versions), [Install expo-dev-client](/bare/install-dev-builds-in-bare), [Write native modules](/modules/overview), [Native project upgrade helper](/bare/upgrade)

### New workflows

[App distribution](/distribution/introduction), [Install expo-updates](/bare/installing-updates)

### New mindsets

[Adopt Prebuild](/guides/adopting-prebuild), [Expo Router](/router/introduction)

## Install Expo modules in an existing React Native project
Source: https://docs.expo.dev/bare/installing-expo-modules/

Learn how to prepare your existing React Native project to install and use any Expo module.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Automatic installation

```sh
npx install-expo-modules@latest
```

## Manual installation

```sh
npm install expo
```

Then apply configuration changes for Android and iOS native project files, update iOS Deployment Target to iOS 16.4, and run:

```sh
npx pod-install
npx expo run:ios
```

## Usage

```tsx
import Constants from 'expo-constants';
console.log(Constants.systemFonts);
```

## Migrate from React Native CLI to Expo CLI
Source: https://docs.expo.dev/bare/using-expo-cli/

Learn how to migrate from React Native CLI to Expo CLI for any React Native project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Install the expo package

```sh
# npm
npx install-expo-modules@latest
```

## Compile and run your app

```sh
# npm
npx expo run:android
npx expo run:ios
```

## Install expo-updates in an existing React Native project
Source: https://docs.expo.dev/bare/installing-updates/

Learn how to install and configure expo-updates in your existing React Native project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Installation

```sh
# npm
npx expo install expo-updates
npx pod-install
```

## Configuring expo-updates library

```sh
eas update:configure
```

Apply configuration changes to **app.json**, Android manifest, and iOS Expo.plist.

## Install expo-dev-client in an existing React Native project
Source: https://docs.expo.dev/bare/install-dev-builds-in-bare/

Learn how to install and configure expo-dev-client in your existing React Native project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Install expo-dev-client

```sh
# npm
npx expo install expo-dev-client
npx pod-install
```

## Configure deep links

```sh
# npm
npx uri-scheme add your-scheme
```

## Native project upgrade helper
Source: https://docs.expo.dev/bare/upgrade/

View file-by-file diffs of all the changes you need to make to your native projects to upgrade them to the next Expo SDK version.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Provides diffs between SDK versions including Gradle changes, iOS deployment target updates (15.1 to 16.4), Podfile changes, and package.json version bumps.

## Integrating Expo tools into existing native apps
Source: https://docs.expo.dev/brownfield/overview/

An overview of how you can integrate Expo tools into existing native apps ("brownfield" apps).

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Compatibility with existing native apps

| Tool/Service | Supports brownfield? |
| --- | --- |
| Expo SDK | Yes |
| Expo Modules API | Yes |
| Expo Router | Yes |
| Expo CLI | Yes |
| Expo Dev Client | No |
| EAS Build | Yes |
| EAS Submit | Yes |
| EAS Update | Yes |

## Integrated vs Isolated approaches

### Integrated approach

React Native code lives inside your existing native project.

### Isolated approach

React Native code is developed separately, packaged as AAR/XCFramework.

## How to add Expo to a native app using the isolated approach
Source: https://docs.expo.dev/brownfield/isolated-approach/

A guide for adding Expo and React Native as a native library and integrating it into an existing native app.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Set up an Expo project

```sh
# npm
npx create-expo-app@latest my-project --template default@sdk-56
npx expo install expo-brownfield
```

## Export as a native library

```sh
# npm
npx expo-brownfield build:android
```

## Integrate into your native app

Add Maven dependency, show a React Native screen using `BrownfieldActivity`.

## How to add Expo to a native app using the integrated approach
Source: https://docs.expo.dev/brownfield/integrated-approach/

A guide for adding Expo and React Native to existing native apps using the integrated approach.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Create an Expo project

```sh
# npm
npx create-expo-app@latest my-project --template default@sdk-56
```

## Configuring your native project

Configure Gradle files, AndroidManifest.xml, and create a `ReactActivity`.

## Test your integration

```sh
# npm
npm run start
```

## Configuring lifecycle listeners
Source: https://docs.expo.dev/brownfield/lifecycle-listeners/

Learn about the mechanism that allows the Expo Modules API to hook into the lifecycle of your app.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Configure your native project

### Android

Forward `onCreate()` and `onConfigurationChanged()` to `ApplicationLifecycleDispatcher`.

### iOS

Forward calls to `ExpoAppDelegateSubscriberManager` or inherit from `ExpoAppDelegate`.

## Test your integration

```sh
# npm
npx expo install expo-linking
npx uri-scheme open com.example.app://somepath/details --android
```

## Troubleshooting overview
Source: https://docs.expo.dev/troubleshooting/overview/

An overview of troubleshooting guides for app development with Expo and EAS.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

This page lists a collection of various troubleshooting guides for Expo and EAS including errors/warnings, runtime issues, Expo Router, push notifications, and EAS-specific troubleshooting.

## "Application has not been registered" error
Source: https://docs.expo.dev/troubleshooting/application-has-not-been-registered/

Learn about what the Application has not been registered error means and how to resolve it.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The most common cause is an exception thrown before the app registers itself. Look at logs before this error. Another possibility is a mismatch between `AppRegistry.registerComponent` and the native `AppKey`. Default is "main".

## Clear bundler caches on macOS and Linux
Source: https://docs.expo.dev/troubleshooting/clear-cache-macos-linux/

Learn how to clear the bundler cache on macOS and Linux.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Expo CLI and Yarn

```sh
rm -rf node_modules
yarn cache clean
yarn
watchman watch-del-all
rm -fr $TMPDIR/haste-map-*
rm -rf $TMPDIR/metro-cache
npx expo start --clear
```

## Clear bundler caches on Windows
Source: https://docs.expo.dev/troubleshooting/clear-cache-windows/

Learn how to clear the bundler cache on Windows.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Expo CLI and Yarn

```sh
rm -rf node_modules
yarn cache clean
yarn
watchman watch-del-all
del %localappdata%Temphaste-map-*
del %localappdata%Tempmetro-cache
npx expo start --clear
```

## "React Native version mismatch" errors
Source: https://docs.expo.dev/troubleshooting/react-native-version-mismatch/

Learn about what React Native version mismatch means and how to resolve it.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The bundler uses a different JavaScript version of `react-native` than the native app. Fix by closing dev servers, running `npx expo-doctor`, `npx expo install --fix`, clearing caches, and rebuilding.

## Troubleshooting Proxies
Source: https://docs.expo.dev/troubleshooting/proxies/

Learn about troubleshooting proxies with a set of recommended tools.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## macOS proxy configuration (Sierra)

Configure macOS network preferences and Charles proxy to run iOS Simulator on corporate Wi-Fi.

## Command-line application proxy configuration

Configure npm, git, and shell environment variables for proxy access.

## Data and Privacy protection
Source: https://docs.expo.dev/regulatory-compliance/data-and-privacy-protection/

An overview of data and privacy protection policies that Expo offers.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

At Expo, our focus is on providing developers with tools and services to create robust apps. Expo is GDPR-, CCPA-, and Data Privacy Framework-compliant.

## GDPR compliance and Expo
Source: https://docs.expo.dev/regulatory-compliance/gdpr/

Learn about how applications built with Expo can be GDPR compliant.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

**They can be! You can build GDPR compliant apps with Expo if you follow the requirements.**

## HIPAA compliance and Expo
Source: https://docs.expo.dev/regulatory-compliance/hipaa/

Learn about how applications built with Expo can be HIPAA compliant.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

**They can be! You can build HIPAA compliant apps with Expo if you follow the requirements.** Expo doesn't collect any individually identifiable health data.


---

## EAS Build
Source: https://docs.expo.dev/build/introduction/

**EAS Build** is a hosted Expo Application Services (EAS) service that builds app binaries (also called standalone apps) for your Expo and React Native projects.

EAS Build makes building your apps for distribution simple and easy to automate by providing defaults that work well for Expo and React Native projects out of the box, and by handling your app signing credentials for you (if you wish). It also makes sharing builds with your team easier than ever with internal distribution (using ad hoc and/or enterprise "universal" provisioning), deeply integrates with EAS Submit for app store submissions, and has first-class support for the `expo-updates` library.

EAS Build is also designed to work for any native project, whether or not you use Expo and React Native.

### Quick start

To build your app, run:

```sh
eas build --platform all
```

### Key features

- Cloud builds for Android and iOS with consistent environments
- Automatically provision and manage app signing credentials or use your own
- Share internal distribution builds with a URL
- Automate builds with build profiles in eas.json and integrations with EAS Workflows or CI pipelines
- Auto-submit successful builds to app stores via `--auto-submit` and EAS Submit
- First-class `expo-updates` integration with per-profile channels and runtime version guidance
- Reuse development builds across your team
- Faster builds via dependency caching and custom cache paths
- Install builds and updates on devices with Expo Orbit


## Create your first build
Source: https://docs.expo.dev/build/setup/

Learn how to create a build for your app with EAS Build.

### Prerequisites
1. A React Native Android or iOS project
2. An Expo account

### Install the latest EAS CLI

```sh
npm install --global eas-cli
```

### Log in to your Expo account

```sh
eas login
```

### Configure the project

```sh
eas build:configure
```

### Run a build

For Android Emulator/device or iOS Simulator, or for app stores:

```sh
eas build --platform android
eas build --platform ios
eas build --platform all
```


## Configure EAS Build with eas.json
Source: https://docs.expo.dev/build/eas-json/

**eas.json** is the configuration file for EAS CLI and services. Configuration for EAS Build all belongs under the `build` key.

### Build profiles

A build profile is a named group of configurations. Default profiles: `development`, `preview`, `production`.

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

### Common use cases

- **Development builds**: `"developmentClient": true`, `"distribution": "internal"`
- **Preview builds**: `"distribution": "internal"`, no developer tools
- **Production builds**: Submitted to app stores

### Configuring build tools

Set tool versions like `node`, `yarn`, `cocoapods` on build profiles. Select resource class with `android.resourceClass` and `ios.resourceClass`.

### Environment variables

Configure with `"env"` field on build profiles.


## Internal distribution
Source: https://docs.expo.dev/build/internal-distribution/

Setting up an internal distribution build provides a streamlined way to share your app with your team via a URL. Configure with `"distribution": "internal"` on a build profile.

- **Android**: Generates an APK instead of AAB
- **iOS**: Uses ad hoc or enterprise provisioning

### Automation on CI

Use `--non-interactive` flag. For iOS ad hoc builds, pass `--refresh-ad-hoc-provisioning-profile` to update the provisioning profile on the Apple Developer Portal.

### Managing devices

Use `eas device:create`, `eas device:list`, `eas device:delete`, `eas device:rename`.

### Distribution mechanisms

- Android: APK direct install
- iOS: Ad Hoc (up to 100 devices per year) or Enterprise (unlimited, requires Apple Developer Enterprise Program)


## Trigger builds from the Expo GitHub App
Source: https://docs.expo.dev/build/building-from-github/

Trigger builds directly from your GitHub repository using the Expo GitHub App.

### Prerequisites
1. Set `image` field in eas.json
2. Successful build from local machine
3. Linked GitHub account and app permissions

### Configure your app for GitHub

Link your GitHub repository to your Expo project on the GitHub settings page.

### Trigger a build

- **From Expo website**: Click "Build from GitHub" on build list page
- **From GitHub PR labels**: Add label `eas-build-[platform]:[profile]`
- **Automatically on push**: Using EAS Workflows with `.eas/workflows/build.yml`

### Build triggers (deprecated)

Can configure triggers for branches, PRs, and tags with wildcard patterns.


## Trigger builds from CI
Source: https://docs.expo.dev/build/building-on-ci/

Trigger builds on EAS from CI environments like GitHub Actions, Travis CI, GitLab CI, Bitbucket Pipelines, CircleCI.

### Prerequisites
1. A successful build from your local machine

### Using EAS Workflows

Add `.eas/workflows/build.yml` with build job type.

### Configuring for other CI services

- Provide personal access token as `EXPO_TOKEN` environment variable
- Optionally provide ASC API Token for Apple Team

### Trigger command

```sh
npx eas-cli build --platform all --non-interactive --no-wait
```

Includes examples for Travis CI, GitLab CI, Bitbucket Pipelines, CircleCI, and GitHub Actions.


## Automate submissions
Source: https://docs.expo.dev/build/automate-submissions/

EAS Build gives automatic submissions with the `--auto-submit` flag.

### Selecting a submission profile

`--auto-submit` uses the same profile name as the build profile by default. Use `--auto-submit-with-profile=<profile-name>` to override.

### Build profile environment variables and submissions

Environment variables from the build profile are used when evaluating app.config.js for the submission.

### Default submission behavior

- **Android**: Creates internal testing release by default
- **iOS**: Submits to TestFlight but not for App Store review


## Expo Orbit
Source: https://docs.expo.dev/build/orbit/

Expo Orbit for macOS, Windows, and Linux enables one-click install and launch of builds or updates from EAS, local files, or Snack projects on simulators and physical devices.

### Highlights

- List and launch simulators
- Install and launch builds from EAS in one click
- Launch Snack projects in simulators
- Install and launch apps from local files

### Installation

```sh
brew install expo-orbit
```


## Using EAS Update
Source: https://docs.expo.dev/build/updates/

Configure the `channel` property in eas.json for `expo-updates` library.

### Setting the channel for a build profile

```json
{
  "build": {
    "production": { "channel": "production" },
    "preview": { "channel": "staging", "distribution": "internal" }
  }
}
```

### Binary compatibility and runtime versions

Use a different runtime version for each binary version of your app.

### Environment variables and `eas update`

Environment variables from build profiles are NOT available when running `eas update`.


## Android build process
Source: https://docs.expo.dev/build-reference/android-builds/

### Local steps
1. Check git index if `cli.requireCommit` is true
2. Prepare credentials
3. Create tarball of repository
4. Upload to GCS and send build request

### Remote steps
1. Create Docker container
2. Download and unpack project
3. Create .npmrc if NPM_TOKEN is set
4. Run `eas-build-pre-install` script
5. Run `npm install` (or `yarn install`)
6. Run `npx expo-doctor`
7. Run `npx expo prebuild` (managed projects)
8. Restore cache
9. Run `eas-build-post-install` script
10. Restore keystore
11. Inject signing config into build.gradle
12. Run `./gradlew COMMAND`
13. Store cache
14. Upload application archive to GCS

### Android keystore

Android requires signing with a certificate stored in a keystore. EAS Build injects signing configuration into build.gradle via eas-build.gradle.


## Build APKs for Android Emulators and devices
Source: https://docs.expo.dev/build-reference/apk/

To generate an APK instead of AAB, add one of: `developmentClient: true`, `distribution: "internal"`, `android.buildType: "apk"`, or set `android.gradleCommand` to a command that produces an APK.

### Installing your build

- **Emulator**: CLI prompts to install automatically; or use `eas build:run -p android`
- **Physical device**: Copy URL from build details, or use `adb install path/to/file.apk`


## iOS App Extensions
Source: https://docs.expo.dev/build-reference/app-extensions/

### Managed projects (experimental)

Declare app extensions with `extra.eas.build.experimental.ios.appExtensions` in app config.

### Bare projects

EAS CLI automatically detects app extensions configured in Xcode project and generates credentials for each target.


## App version management
Source: https://docs.expo.dev/build-reference/app-versions/

| Property | Description |
|---|---|
| `version` | User-facing version (versionName on Android, CFBundleShortVersionString on iOS) |
| `android.versionCode` | Developer-facing build version for Android |
| `ios.buildNumber` | Developer-facing build version for iOS |

### Remote version source (recommended)

Set `cli.appVersionSource` to `remote` in eas.json. EAS servers store and manage build versions.

### Local version source

Set `cli.appVersionSource` to `local`. Version source of truth is the local project source code.


## Build configuration process
Source: https://docs.expo.dev/build-reference/build-configuration/

When running `eas build:configure`, EAS CLI:

1. Asks about platform(s) to configure
2. Creates eas.json with default configuration
3. Configures the project (prompts for android.package and ios.bundleIdentifier for Expo projects)


## Set up EAS Build with a monorepo
Source: https://docs.expo.dev/build-reference/build-with-monorepos/

- Run EAS CLI commands from the root of the app directory
- eas.json and credentials.json should be in the root of the app directory
- If building a managed project in a monorepo, see Working with Monorepos guide


## Cache dependencies
Source: https://docs.expo.dev/build-reference/caching/

### Custom caching

Use `cache` field on build profiles to configure caching for specific files and directories.

### JavaScript dependencies

EAS Build runs an npm cache server. Disable with `EAS_BUILD_DISABLE_NPM_CACHE=1`.

### Android dependencies

EAS Build runs a Maven cache server. Disable with `EAS_BUILD_DISABLE_MAVEN_CACHE=1`.

### C/C++ compilation artifacts with ccache

Use `EAS_USE_CACHE`, `EAS_RESTORE_CACHE`, `EAS_SAVE_CACHE` environment variables.

### iOS dependencies

CocoaPods artifacts are served from a cache server. Disable with `EAS_BUILD_DISABLE_COCOAPODS_CACHE=1`.


## Ignore files via .easignore
Source: https://docs.expo.dev/build-reference/easignore/

A `.easignore` file defines which files EAS should ignore when uploading your project. By default, EAS CLI uses `.gitignore`. If `.easignore` exists, it takes priority.

You can also include files not in source control using `!` prefix.


## Using Git submodules
Source: https://docs.expo.dev/build-reference/git-submodules/

When using the default VCS workflow, Git submodule content is included. For CI or private submodules, initialize them using an `eas-build-pre-install` npm hook with SSH key.


## Build server infrastructure
Source: https://docs.expo.dev/build-reference/infrastructure/

### Builder IP addresses

Available at https://expo.dev/eas-build-worker-ips.txt

### Android build server configurations

- **medium**: 4 vCPUs, 16 GB RAM
- **large**: 8 vCPUs, 32 GB RAM

### iOS build server configurations

- **medium**: 5 performance cores, 20 GiB RAM, 110 GB SSD
- **large**: 10 performance cores, 40 GiB RAM, 110 GB SSD

### Available images

Multiple Android (Ubuntu) and iOS (macOS) images with specific tool versions for each SDK version.


## iOS build process
Source: https://docs.expo.dev/build-reference/ios-builds/

### Local steps
1. Check git index
2. Prepare credentials
3. Check Xcode project configuration (for projects with native directories)
4. Create tarball
5. Upload to GCS

### Remote steps
1. Create macOS VM
2. Download and unpack project
3. Create .npmrc if NPM_TOKEN is set
4. Run `eas-build-pre-install` script
5. Run `npm install` or `yarn install`
6. Run `npx expo-doctor`
7. Restore credentials (keychain, distribution certificate, provisioning profile)
8. Run `npx expo prebuild` (CNG projects)
9. Restore cache
10. Run `pod install`
11. Run `eas-build-post-install` script
12. Update Xcode project with provisioning profile ID
13. Create Gymfile if not exists
14. Run `fastlane gym`
15. Store cache
16. Upload application archive to GCS

### Building with Fastlane

Uses `fastlane gym` command. Default Gymfile is created if none exists in the ios directory.


## iOS capabilities
Source: https://docs.expo.dev/build-reference/ios-capabilities/

EAS Build automatically synchronizes capabilities on the Apple Developer Console with your local entitlements configuration when running `eas build`.

### Entitlements

In Expo apps, read from `ios.entitlements` in app config. In bare RN apps, read from `.entitlements` files.

### Supported capabilities

Includes 60+ capabilities including: Access Wi-Fi Information, App Attest, App Groups, Apple Pay, Associated Domains, HealthKit, HomeKit, NFC Tag Reading, Push Notifications, Sign In with Apple, SiriKit, iCloud, and many more.

### Debugging

Run `EXPO_DEBUG=1 eas build` for detailed logs. Disable with `EXPO_NO_CAPABILITY_SYNC=1`.


## EAS Build Limitations
Source: https://docs.expo.dev/build-reference/limitations/

- Fixed memory and CPU limits on build worker servers
- Limited dependency caching
- Maximum build duration of 2 hours (lower on free plan)
- Maximum 50 pending builds per platform per account
- Package managers with workspaces support may require special setup


## Run EAS Build locally with local flag
Source: https://docs.expo.dev/build-reference/local-builds/

```sh
eas build --platform android --local
eas build --platform ios --local
```

### Use cases

- Debugging build failures
- Company policies restricting third-party CI/CD services

### Limitations

- Can only build for a specific platform (no `--platform all`)
- Customizing software versions not supported
- Caching not supported
- "Secret" environment variables not supported


## Using npm cache with Yarn 1 (Classic)
Source: https://docs.expo.dev/build-reference/npm-cache-with-yarn/

Add an `eas-build-pre-install` hook in package.json to override the registry in yarn.lock:

```json
{
  "scripts": {
    "eas-build-pre-install": "bash -c \"[ ! -z \\\"$EAS_BUILD_NPM_CACHE_URL\\\" ] && sed -i -e \\\"s#https://registry.yarnpkg.com#$EAS_BUILD_NPM_CACHE_URL#g\\\" yarn.lock\" || true"
  }
}
```


## Build lifecycle hooks
Source: https://docs.expo.dev/build-reference/npm-hooks/

Six lifecycle hooks available in package.json:

| Hook | Description |
|---|---|
| `eas-build-pre-install` | Before `npm install` |
| `eas-build-post-install` | After install/prebuild/pod install |
| `eas-build-on-success` | Build succeeded |
| `eas-build-on-error` | Build failed |
| `eas-build-on-complete` | Build finished (check `EAS_BUILD_STATUS`) |
| `eas-build-on-cancel` | Build canceled |

Platform-specific behavior can be forked using `EAS_BUILD_PLATFORM` environment variable.


## npx testflight command
Source: https://docs.expo.dev/build-reference/npx-testflight/

A single command to build, sign, and submit your iOS app to TestFlight.

```sh
npx testflight
```

The command workflow is interactive and walks through: initializing EAS project, confirming bundle identifier, signing into Apple Developer, generating credentials, creating a production build, verifying App Store Connect access, and submitting to TestFlight.

Can run in non-interactive mode when `ascAppId` is provided in eas.json submit profile.


## Using private npm packages
Source: https://docs.expo.dev/build-reference/private-npm-packages/

### Default npm configuration

EAS Build uses a self-hosted npm cache. Each platform has its own .npmrc configuration.

### Private packages published to npm

Add `NPM_TOKEN` as a secret. EAS automatically creates .npmrc with the token when available.

### Packages published to a private registry

Configure .npmrc manually with the registry URL and authentication token.

### Both private packages and private registry

Use scoped packages configuration in .npmrc.


## Repack app
Source: https://docs.expo.dev/build-reference/repack/

`@expo/repack-app` repackages an existing APK, IPA, or .app with an updated JavaScript bundle without a full native rebuild.

### When to use

- QA cycles: distribute one base build, repack with JS fixes
- CI optimization: build native once per fingerprint
- Branch testing

### Usage

```sh
npx @expo/repack-app --platform android --source-app MyApp.apk
```

### Signing

Pass keystore (Android) or signing identity + provisioning profile (iOS) for installable artifacts.

### Limitations

Not recommended for production store submissions.


## Build for iOS Simulators
Source: https://docs.expo.dev/build-reference/simulators/

Configure a build profile with `"ios": { "simulator": true }`:

```json
{
  "build": {
    "preview": {
      "ios": { "simulator": true }
    }
  }
}
```

After build completes, CLI prompts to install on simulator. Alternatively, use `eas build:run -p ios` or `eas build:run -p ios --latest`.


## Troubleshoot build errors and crashes
Source: https://docs.expo.dev/build-reference/troubleshooting/

### Find error logs

- **Runtime errors**: See "Production errors" section of the debugging guide
- **Build errors**: Expand failed build phases on build details page

### Common issues

- Monorepo setup problems
- Out-of-memory (OOM) errors in Gradle
- "None of these files exist" error from gitignored files
- Metro bundler failures

### Compare build logs

Use the Compare button on the EAS Build details page to compare two builds side-by-side.

### Verify locally

Run `npx expo run:android --variant release` or `npx expo run:ios --configuration Release` to reproduce locally.


## Install app variants on the same device
Source: https://docs.expo.dev/build-reference/variants/

### Configure development and production variants

Use app.config.js with environment variables to switch application ID / bundle identifier:

```js
const IS_DEV = process.env.APP_VARIANT === 'development';
export default {
  name: IS_DEV ? 'MyApp (Dev)' : 'MyApp',
  ios: { bundleIdentifier: IS_DEV ? 'com.myapp.dev' : 'com.myapp' },
  android: { package: IS_DEV ? 'com.myapp.dev' : 'com.myapp' }
};
```

### Configuration for EAS Build

Set `APP_VARIANT` environment variable in eas.json under the build profile's `env` property.

### Existing React Native project

Use Android flavors (productFlavors) and iOS schemes with different bundle identifiers.


## Get started with custom builds
Source: https://docs.expo.dev/custom-builds/get-started/

Custom builds allow customizing the build process by running commands before, during, or after the build.

### Create a custom build config

Create `.eas/build/hello-world.yml`:

```yaml
build:
  name: Hello World!
  steps:
    - run: echo "Hello, world!"
```

### Add `config` property in eas.json

```json
{
  "build": {
    "test": { "config": "test.yml" }
  }
}
```

### Run

```sh
eas build -p android -e test
```


## Custom build configuration schema
Source: https://docs.expo.dev/custom-builds/schema/

### YAML syntax

Custom build config files stored in `.eas/build/` directory, using `.yml` or `.yaml` extension.

### `build`

- `name`: Display name for the build
- `steps`: List of actions (required, at least one)

### `steps[].run`

- `name`: Display name
- `command`: Shell command to execute (required)
- `working_directory`: Change directory for this step
- `shell`: Default executable shell
- `inputs`: Input values
- `outputs`: Expected output values
- `id`: Identifier for referencing outputs

### `functions`

Reusable functions can be defined with `name`, `inputs`, `outputs`, `command`, `path`, `shell`, `supported_platforms`.

### Built-in EAS functions

- `eas/build` - All-in-one build function
- `eas/checkout` - Check out project source files
- `eas/use_npm_token` - Configure npm for private packages
- `eas/install_node_modules` - Install node modules
- `eas/restore_build_cache` / `eas/save_build_cache` - Cache management
- `eas/resolve_build_config` - Resolve and print build configuration
- `eas/prebuild` - Run expo prebuild
- `eas/configure_eas_update` - Configure runtime version and channel
- `eas/inject_android_credentials` - Configure Android keystore
- `eas/configure_ios_credentials` - Configure iOS credentials
- `eas/run_gradle` - Run Gradle command (Android)
- `eas/run_fastlane` - Run Fastlane (iOS)
- `eas/generate_gymfile_from_template` - Generate Gymfile (iOS)
- `eas/maestro_test` - Run Maestro tests
- `eas/install_maestro` - Install Maestro
- `eas/start_android_emulator` - Start Android Emulator
- `eas/start_ios_simulator` - Start iOS Simulator
- `eas/upload_artifact` - Upload build artifact


## TypeScript functions
Source: https://docs.expo.dev/custom-builds/functions/

### Initialize a function module

```sh
npx create-eas-build-function@latest ./.eas/build/myFunction
```

### Compile

Run `npm run build` in the function directory (uses ncc to compile to single JS file).

### Expose to custom build config

Add to YAML config:

```yaml
functions:
  my_function:
    name: My function
    path: ./myFunction
```

Functions accept typed inputs and produce typed outputs. Must be compiled each time changes are made.


## EAS Submit
Source: https://docs.expo.dev/submit/introduction/

EAS Submit is a hosted service for submitting Android and iOS binaries to the Google Play Store and Apple App Store.

### Quick start

```sh
eas submit --platform android
eas submit --platform ios
eas build --platform ios --auto-submit
```

### How it works

- **Android**: Uploads to Google Play Console on the specified track
- **iOS**: Uploads to App Store Connect/TestFlight

### When to use

- Upload binaries to stores
- Upload iOS binaries on non-macOS machines
- Avoid manual uploads
- Submit from CI or automated workflows


## Configure EAS Submit with eas.json
Source: https://docs.expo.dev/submit/eas-json/

### Production profile

```json
{
  "submit": {
    "production": {
      "android": { "track": "internal" },
      "ios": { "ascAppId": "your-app-store-connect-app-id" }
    }
  }
}
```

### Multiple profiles

Multiple submit profiles under `submit` key, with support for `extends` to share configuration.


## Submit to the Google Play Store
Source: https://docs.expo.dev/submit/android/

### Prerequisites
1. Google Play Developer account
2. Create app on Google Play Console
3. Google Service Account Key
4. EAS CLI installed and authenticated
5. Package name in app.json
6. Production build
7. Upload app manually at least once

### Submit

```sh
eas submit --platform android
eas build --platform android --auto-submit
```

### CI/CD

Use EAS Workflows with submit job type, or other CI with `EXPO_TOKEN`.


## Submit to the Apple App Store
Source: https://docs.expo.dev/submit/ios/

### Prerequisites
1. Apple Developer account
2. Bundle identifier in app.json
3. EAS CLI installed and authenticated
4. Production build

### Submit

```sh
eas submit --platform ios
eas build --platform ios --auto-submit
```

### CI/CD

Use EAS Workflows with testflight job type, or other CI with `EXPO_TOKEN`.

### Finding ascAppId

In App Store Connect > Apps > Your App > App Information > Apple ID.

### Manual submissions

Use Transporter app on macOS to upload IPA manually.


---


---

## EAS Update
Source: https://docs.expo.dev/eas-update/introduction/

EAS Update is a cloud service that serves updates for projects using the expo-updates library.

**EAS Update** is a cloud service from EAS (Expo Application Services) that serves updates for projects using the [`expo-updates`](/versions/latest/sdk/updates) library.

EAS Update makes fixing small bugs and pushing quick fixes a snap in between app store submissions. It accomplishes this by enabling an app to update its own non-native pieces (such as JS, styling, and images) over-the-air. All apps that include the `expo-updates` library have the ability to receive updates.

## Quick start

Install the `expo-updates` library and configure EAS Update:

```sh
npx expo install expo-updates
eas update:configure
```

You need to create a new build for Android or iOS to include the `expo-updates` library in your build. After that, you can push an update to the production channel:

```sh
eas update --channel production --message "Fix login button alignment"
```

## Key features

- **JS API for update management**: The updates [JavaScript API](/versions/latest/sdk/updates) includes a React hook called `useUpdates()`. The API also provides methods such as `checkForUpdateAsync()` and `fetchUpdateAsync()`.
- **Insight tracking**: You'll get a [deployments dashboard](https://expo.dev/accounts/%5Baccount%5D/projects/%5Bproject%5D/deployments) that helps visualize which updates are being sent to builds.
- **Republish for reverting mistakes**: You can [republish](/eas-update/eas-cli#republish-a-previous-update-within-a-branch) a previous, stable version on top of the problematic one.

## When to use EAS Update

| Scenario | Recommendation |
| --- | --- |
| Fix a bug or crash in JavaScript code and deploy updates in minutes | ✓ |
| Update copy, translations, UI styling, or screen layouts | ✓ |
| Roll out changes to a percentage of users using [rollouts](/eas-update/rollouts) | ✓ |
| Publish updates from [CI or automated workflows](/eas/workflows/pre-packaged-jobs#update) | ✓ |
| Test updates with internal teams before production release | ✓ |
| Change to native code or native dependencies | ✗ |
| Change to app permissions (camera, location, and others) | ✗ |
| Update the Expo SDK version | ✗ |
| Anything that requires a new app binary version | ✗ |

## Frequently asked questions (FAQ)

- **Monthly active users**: 1 MAU equals 1 unique installation that downloads at least 1 update during your billing cycle.
- **Custom update strategy**: Use the [Updates API](/versions/latest/sdk/updates) and [app config](/versions/latest/config/app#updates).
- **Existing React Native projects**: EAS Update works with both [CNG](/workflow/continuous-native-generation) and [existing React Native projects](/bare/installing-updates).
- **Native code compatibility**: EAS Update uses [runtime version policies](/eas-update/runtime-versions).
- **EAS Workflows/CI**: Yes, EAS Update works with [EAS Workflows](/eas/workflows/get-started).
- **CodePush vs EAS Update**: See [Conceptual differences](/eas-update/codepush#conceptual-differences-between-codepush-and-eas-update).

---

## Get started with EAS Update
Source: https://docs.expo.dev/eas-update/getting-started/

Prerequisites: Expo account, React Native project, Expo CLI and Expo Metro Config, use `registerRootComponent`.

## Install the latest EAS CLI

```sh
npm install --global eas-cli
```

## Log in to your Expo account

```sh
eas login
```

## Configure your project

```sh
eas update:configure
```

This updates **app.json** with `runtimeVersion` and `updates.url` properties, and adds `extra.eas.projectId`.

## Configure the update channel

The channel property on a build allows you to point updates at specific types of builds.

**If you are using EAS Build**, `eas update:configure` will set the update `channel` property on the `preview` and `production` profiles in **eas.json**.

**If you are not using EAS Build**, configure the channel in **app.json** or in native projects.

## Create a build for the project

Create a build with the `preview` build profile first.

## Make changes locally

Start a local development server with `npx expo start`.

## Publish an update

```sh
eas update --channel [channel-name] --message "[message]" --environment [environment-name]
```

## Test the update

Use Extensions tab in a [development build](/eas-update/expo-dev-client), [Expo Orbit](/review/with-orbit), or manually force close and reopen the release build.

---

## How EAS Update works
Source: https://docs.expo.dev/eas-update/how-it-works/

EAS Update creates a link between a build and an update. Builds have two layers: a native layer built into the binary, and an update layer that is swappable.

### Distributing builds

Properties included in a build:
- **Channel**: A name to identify builds (e.g., "production", "staging"). Defined in `eas.json`.
- **Runtime version**: Describes the JS-native interface. Defined in [app config](/workflow/configuration).
- **Platform**: "Android" or "iOS".

### Publishing an update

`eas update --auto` creates a local update bundle in **dist/** and uploads it to EAS servers in a database object named a _branch_.

### Matching updates and builds

Update policy:
- Platform must match exactly.
- Runtime version must match exactly.
- A channel can be linked to any branch. By default, a channel is linked to a branch of the same name.

### Practical overview

`expo-updates` downloads updates in two phases: first the manifest, then the assets. If the library downloads the manifest and all required assets before `fallbackToCacheTimeout`, the new update runs immediately on launch.

---

## Preview updates
Source: https://docs.expo.dev/eas-update/preview/

### Previewing in development builds

Development builds can preview updates from pull requests, the EAS dashboard, or the built-in UI from `expo-dev-client`.

### Previewing in preview builds

Non-technical users can test from a preview build on an [App store testing track](/review/overview#app-store-testing-tracks) or [internal distribution](/review/overview#internal-distribution-with-eas-build).

### Previewing in production builds

Use [overriding the update channel](/eas-update/override) at runtime or [Persistent Staging Flow](/eas-update/deployment-patterns#persistent-staging-flow).

---

## Deploy updates
Source: https://docs.expo.dev/eas-update/deployment/

A simple release process using **channels** and **runtime versions**.

### Configuring your project

**Channel configuration**: `eas update:configure` sets up profiles in **eas.json**.
**Runtime version configuration**: Recommended: `"runtimeVersion": { "policy": "appVersion" }`.

### Deploying previews

Preview builds point to the "preview" channel.

### Deploying to staging

`eas update --channel staging`

### Deploying to production

`eas update --channel production`

Use [per-update rollouts](/eas-update/rollouts#per-update-rollouts) for gradual deployment.

### Rolling back

`eas update:rollback`

---

## Alternative deployment patterns
Source: https://docs.expo.dev/eas-update/deployment-patterns/

Four common patterns:

1. **Two-command flow**: Simplest flow. Create production builds, publish to single branch.
2. **Persistent staging flow**: Separate "staging" and "production" branches.
3. **Platform-specific flow**: Separate channels per platform (e.g., "ios-staging", "android-production").
4. **Branch promotion flow**: Version-based branches mapped to channels dynamically.

---

## Rollbacks
Source: https://docs.expo.dev/eas-update/rollbacks/

Two types:
- Roll back to a previously-published update.
- Roll back to the update embedded in the build.

```sh
eas update:rollback
```

---

## Rollouts
Source: https://docs.expo.dev/eas-update/rollouts/

### Per-update rollouts

```sh
eas update --rollout-percentage=10
```

Edit: `eas update:edit`. Revert: `eas update:revert-update-rollout`.

### Branch-based rollouts

```sh
eas channel:rollout
```

---

## End-to-end code signing with EAS Update
Source: https://docs.expo.dev/eas-update/code-signing/

Available to EAS Production or Enterprise plans.

### Generate keys

```sh
npx expo-updates codesigning:generate --key-output-directory ../keys --certificate-output-directory certs --certificate-validity-duration-years 10 --certificate-common-name "Your Organization Name"
```

### Configure project

```sh
npx expo-updates codesigning:configure --certificate-input-directory certs --key-input-directory ../keys
```

### Publish signed update

```sh
eas update --private-key-path ../keys/private-key.pem
```

---

## Runtime versions and updates
Source: https://docs.expo.dev/eas-update/runtime-versions/

Runtime version policies:
- `"appVersion"`: Derived from the app version.
- `"sdkVersion"`: Derived from the Expo SDK version.
- `"nativeVersion"`: Combines app version and native build number.
- `"fingerprint"` (experimental): Based on project fingerprint.

Custom runtime version:

```json
{
  "expo": {
    "runtimeVersion": "1.0.0"
  }
}
```

Platform-specific runtime versions also supported.

---

## Bundle diffing for EAS Update
Source: https://docs.expo.dev/eas-update/bundle-diffing/

> Beta feature.

With bundle diffing, EAS Update delivers a **bundle patch** (bsdiff) when possible.

Enabled by default in SDK 56+. On SDK 55, set `updates.enableBsdiffPatchSupport` to `true`.

Patches from the embedded bundle (experimental): set `EAS_UPDATE_EXPERIMENTAL_UPLOAD_EMBEDDED_BUNDLE` environment variable.

Manage embedded bundles:

```sh
eas update:embedded:list
eas update:embedded:view [id]
eas update:embedded:delete [id]
```

---

## Asset selection and exclusion
Source: https://docs.expo.dev/eas-update/asset-selection/

In SDK 52+, use `updates.assetPatternsToBeBundled`:

```json
{
  "expo": {
    "updates": {
      "assetPatternsToBeBundled": ["app/images/**/*.png"]
    }
  }
}
```

Verify with `npx expo-updates assets:verify`.

---

## Optimize assets for EAS Update
Source: https://docs.expo.dev/eas-update/optimize-assets/

Optimize images with `npx expo-optimize`. Compress to 90%:

```sh
npx expo-optimize --quality 90
```

---

## Estimate bandwidth usage
Source: https://docs.expo.dev/eas-update/estimate-bandwidth/

Bandwidth calculation: Update size / compression ratio = actual download size.

Measure actual compressed size:

```sh
npx expo export
brotli -5 -k bundle.hbc
gzip -9 -k bundle.hbc
ls -lh bundle.hbc.br bundle.hbc.gz
```

---

## Migrate from CodePush
Source: https://docs.expo.dev/eas-update/codepush/

1. Ensure latest Expo SDK version.
2. Uninstall CodePush: `npm uninstall react-native-code-push`.
3. Add `expo` key to `app.json`.
4. Follow [Getting Started guide](/eas-update/getting-started).
5. Resubmit your app.

Key differences: EAS Update has multiple streams (branches and channels), while CodePush has single streams per deployment. With EAS Update, the server controls the target by mapping channels to branches.

---

## Downloading updates
Source: https://docs.expo.dev/eas-update/download-updates/

Strategies:
- **Default**: Updates are loaded asynchronously on startup.
- **Check while running**: `Updates.checkForUpdateAsync()`, `Updates.fetchUpdateAsync()`, `Updates.reloadAsync()`.
- **Check while backgrounded**: Use `expo-background-task`.
- **Critical/mandatory updates**: No first-class support, implement custom logic.

Monitor adoption via the [deployments page](https://expo.dev/accounts/%5Baccount%5D/projects/%5Bproject%5D/deployments/production/%5Bruntime-version%5D).

---

## Request proxying
Source: https://docs.expo.dev/eas-update/request-proxying/

Proxy requests through your own server. Configure in **eas.json**:

```json
{
  "cli": {
    "updateAssetHostOverride": "updates-asset-proxy.example.com",
    "updateManifestHostOverride": "updates-manifest-proxy.example.com"
  }
}
```

Then run `eas update:configure`.

---

## Error recovery
Source: https://docs.expo.dev/eas-update/error-recovery/

Built-in error recovery prevents updates from "bricking" your app. Two scenarios:

- **Content appeared**: 5-second timer, check for new update, then crash.
- **Content not appeared**: Mark update as failed, try new update, then roll back to older update.

---

## EAS Update Debugging
Source: https://docs.expo.dev/eas-update/debug/

Common problems:
- Unexpected channel → configure channel and rebuild.
- Unexpected runtime version → configure runtime version and rebuild.
- Unexpected branch → map channel to branch.
- Missing updates → publish an update.

### Solutions

**Configure channel**: Add `channel` property to build profile in **eas.json**.
**Configure runtime version**: Set `runtimeVersion` in app config.
**Map channel to branch**: `eas channel:edit production --branch release-1.0`.
**Publish update**: `eas update`.

### Inspecting builds manually

On iOS, inspect **Expo.plist** inside the .app bundle for `EXUpdatesRequestHeaders`, `EXUpdatesRuntimeVersion`, `EXUpdatesURL`.

### Viewing manifests

`https://u.expo.dev/your-project-id?runtime-version=1.0.0&channel-name=production&platform=android`

---

## Preview updates in development builds
Source: https://docs.expo.dev/eas-update/expo-dev-client/

Use the `expo-dev-client` library's **Extensions** tab to preview published updates.

### Construct an update URL

```
[slug]://expo-development-client/?url=[https://u.expo.dev/project-id]/group/[group-id]
```

---

## GitHub Action for PR previews
Source: https://docs.expo.dev/eas-update/github-actions/

Create **.github/workflows/preview.yml**:

```yaml
name: preview
on: pull_request

jobs:
  update:
    name: EAS Update
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - name: Check for EXPO_TOKEN
        run: |
          if [ -z "${{ secrets.EXPO_TOKEN }}" ]; then
            echo "You must provide an EXPO_TOKEN secret..."
            exit 1
          fi
      - name: Checkout repository
        uses: actions/checkout@v5
      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: yarn
      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - name: Install dependencies
        run: yarn install
      - name: Create preview
        uses: expo/expo-github-action/preview@v8
        with:
          command: eas update --auto
```

---

## Using EAS Update without other EAS services
Source: https://docs.expo.dev/eas-update/standalone-service/

EAS Update works as a standalone service. When not using EAS Build, configure the channel manually in app config and create the channel on the server:

```sh
eas channel:create production
```

---

## How to trace an update ID back to the EAS dashboard
Source: https://docs.expo.dev/eas-update/trace-update-id-expo-dashboard/

Use `Updates.isEmbeddedLaunch` to check if the update is embedded or downloaded. Navigate to:

```
https://expo.dev/accounts/[accountName]/projects/[projectName]/updates/[updateId]
```

---

## Using EAS Update in an existing native app
Source: https://docs.expo.dev/eas-update/integration-in-existing-native-apps/

For brownfield apps. Requires Expo SDK 52+, React Native 0.76+.

Steps:
1. Install and authenticate with `eas-cli`.
2. Install `expo-updates`.
3. Initialize EAS project.
4. Add basic configuration to native projects.
5. Disable automatic setup (`EX_UPDATES_CUSTOM_INIT=1` on iOS, gradle property on Android).
6. Integrate `expo-updates` into Android (MainApplication.kt, MainActivity.kt) and iOS (AppDelegate.swift, custom view controller).

---

## Migrate from Classic Updates
Source: https://docs.expo.dev/eas-update/migrate-from-classic-updates/

1. Install EAS CLI.
2. Run `eas update:configure`.
3. Remove `expo.sdkVersion` from app config.
4. Add `channel` properties to **eas.json** build profiles.
5. Create new builds.
6. Publish update: `eas update --channel production --message "Fixes typo"`.
7. Replace `expo publish` with `eas update`, replace `Updates.releaseChannel` with `Updates.channel`, remove `Constants.manifest` references.

---

## Manage branches and channels with EAS CLI
Source: https://docs.expo.dev/eas-update/eas-cli/

### Inspect

```sh
eas channel:list
eas channel:view production
eas branch:list
eas branch:view version-1.0
eas update:view dbfd479f-d981-44ce-8774-f2fbcc386aa
```

### Change state

```sh
eas update --branch version-1.0 --message "Fixes typo"
eas update --auto
eas branch:delete version-1.0
eas branch:rename --from version-1.0 --to version-1.0-new
eas update:republish --group dbfd479f-d981-44ce-8774-f2fbcc386aa
```

---

## Override update configuration at runtime
Source: https://docs.expo.dev/eas-update/override/

### Override request headers (SDK 54+)

```js
import * as Updates from 'expo-updates';
Updates.setUpdateRequestHeadersOverride({ 'expo-channel-name': 'preview' });
await Updates.fetchUpdateAsync();
await Updates.reloadAsync();
```

### Override both URL and headers (SDK 52+)

```js
Updates.setUpdateURLAndRequestHeadersOverride({
  url: 'https://u.expo.dev/{updateId}/group/{groupId}',
  requestHeaders: {},
});
```

Security considerations: `disableAntiBrickingMeasures` should only be enabled in preview builds.

---

## Introduction to EAS Hosting
Source: https://docs.expo.dev/eas/hosting/introduction/

EAS Hosting is a service for deploying web projects built with Expo Router and React Native web.

### Quick start

```sh
npx expo export --platform web
eas deploy
```

### Output modes

- `single`: Single-page app with one index.html.
- `static`: Statically generated web app.
- `server`: Supports server functions and API routes.

### Runtime

Built on Cloudflare Workers (V8 JavaScript engine). Node.js compatibility modules available with some limitations.

### Monitoring

Built-in monitoring for crashes, logs, and requests in the EAS dashboard.

---

## Deploy your first Expo Router and React app
Source: https://docs.expo.dev/eas/hosting/get-started/

Prerequisites: Expo account, Expo Router web project.

```sh
npm install --global eas-cli
eas login
npx expo export --platform web
eas deploy
```

---

## Custom domain
Source: https://docs.expo.dev/eas/hosting/custom-domain/

Available on paid plans. Each project can have one custom domain for production.

DNS records needed:
- Verification TXT record
- SSL CNAME record
- CNAME (subdomains) or A record (apex domains) pointing to `origin.expo.app`

Wildcard subdomains supported: create a CNAME record on `*.example.com` to `origin.expo.app`.

---

## Assign aliases and promote to production
Source: https://docs.expo.dev/eas/hosting/deployments-and-aliases/

### Deployments

Each deployment has a unique URL: `https://my-app--or1170q9ix.expo.app/`.

Production URL: `https://my-app.expo.app/`.

### Aliases

```sh
eas deploy --alias hello
eas deploy:alias --id=my-id
eas deploy --prod
eas deploy:alias --prod --id=deploymentId
```

---

## API Routes
Source: https://docs.expo.dev/eas/hosting/api-routes/

Crashes, logs, and requests from API routes are viewable in the EAS Hosting dashboard.

- **Crashes**: Uncaught errors grouped by similarity.
- **Logs**: `console.log`, `console.info`, `console.error` output.
- **Requests**: Metadata per request.

Look up a request by its `Cf-Ray` header ID.

Sampling: High-traffic deployments are downsampled.

---

## Web deployments with EAS Workflows
Source: https://docs.expo.dev/eas/hosting/workflows/

```yaml
name: Deploy
on:
  push:
    branches: ['main']
jobs:
  deploy:
    type: deploy
    name: Deploy
    environment: production
    params:
      prod: true
```

PR preview workflow:

```yaml
name: PR Preview
on:
  pull_request: {}
jobs:
  deploy:
    type: deploy
    name: Deploy PR Preview
  comment:
    needs: [deploy]
    type: github-comment
```

---

## Caching with EAS Hosting deployments
Source: https://docs.expo.dev/eas/hosting/reference/caching/

API routes can return `Cache-Control` directives. Supported directives: `public`, `private`, `no-store`, `max-age`, `s-maxage`, `stale-while-revalidate`, `stale-if-error`, `immutable`.

`CDN-Cache-Control` header for granular control. `Vary` header supported. POST requests cacheable with body < 1MB.

Asset caching: default 3600s browser cache. Per-deployment assets cached indefinitely internally.

Cached requests still count against billing quota.

---

## Default responses and headers
Source: https://docs.expo.dev/eas/hosting/reference/responses-and-headers/

EAS Hosting adds default CORS responses (permissive), `Strict-Transport-Security` header, and geo/IP headers: `Forwarded`, `X-Forwarded-For`, `X-Forwarded-Proto`, `X-Forwarded-Host`, `X-Real-IP`, `eas-colo`, `eas-ip-continent`, `eas-ip-country`, `eas-ip-region`, `eas-ip-city`, `eas-ip-latitude`, `eas-ip-longitude`, `eas-ip-timezone`, `eas-ip-eu`.

---

## EAS Hosting worker runtime
Source: https://docs.expo.dev/eas/hosting/reference/worker-runtime/

Built on Cloudflare Workers (V8 isolates). Node.js compatibility table:

| Module | Supported | Notes |
| --- | --- | --- |
| `node:assert` | ✓ | |
| `node:async_hooks` | ✓ | |
| `node:buffer` | ✓ | |
| `node:crypto` | ✓ | Select deprecated algorithms not available |
| `node:fs` | ✓ | In-memory filesystem |
| `node:http` | ✓ | No server functionality |
| `node:https` | ✓ | No server functionality |
| `node:net` | Partial | No `Server`/`BlockList` |
| `node:path` | ✓ | |
| `node:stream` | ✓ | |
| `node:url` | ✓ | |
| `node:zlib` | ✓ | |
| `node:punycode` | ✗ | |
| `node:readline` | ✗ | |
| `node:worker_threads` | ✗ | |

Globals: `origin`, `process`, `process.env`, `Buffer`, `EventEmitter`, `global`, `WeakRef`, `FinalizationRegistry`.

---

## Introduction to EAS Workflows
Source: https://docs.expo.dev/eas/workflows/introduction/

EAS Workflows is a CI/CD service for automating builds, updates, submissions, and tests.

### Key features

- Pre-packaged job types (`build`, `submit`, `update`, `maestro`, `deploy`)
- No infrastructure to manage (macOS and Linux workers)
- GitHub integration (push, pull request, label events)
- Scheduled workflows (cron)
- App Store Connect triggers
- Slack notifications

### Workers

- `linux-medium`: 4 vCPU, 16 GB RAM
- `linux-large`: 8 vCPU, 32 GB RAM
- `macos-medium`: 5 cores, 20 GB RAM
- `macos-large`: 10 cores, 40 GB RAM

---

## Get started with EAS Workflows
Source: https://docs.expo.dev/eas/workflows/get-started/

Prerequisites: Expo account, project, EAS sync, `eas.json`.

Create `.eas/workflows/create-production-builds.yml`:

```yaml
name: Create Production Builds
jobs:
  build_android:
    type: build
    params:
      platform: android
  build_ios:
    type: build
    params:
      platform: ios
```

Run: `npx eas-cli@latest workflow:run create-production-builds.yml`

---

## Pre-packaged jobs in EAS Workflows
Source: https://docs.expo.dev/eas/workflows/pre-packaged-jobs/

### Build

```yaml
jobs:
  build_app:
    type: build
    params:
      platform: android | ios
      profile: string
      message: string
```

Outputs: `build_id`, `app_build_version`, `app_identifier`, `app_version`, `channel`, `distribution`, `fingerprint_hash`, `git_commit_hash`, `platform`, `profile`, `runtime_version`, `sdk_version`, `simulator`.

### Deploy

```yaml
jobs:
  deploy_web:
    type: deploy
    params:
      alias: string
      prod: boolean
```

### Fingerprint

```yaml
jobs:
  fingerprint:
    type: fingerprint
    environment: production
```

### Get Build

```yaml
jobs:
  get_build:
    type: get-build
    params:
      platform: ios | android
      profile: string
      distribution: store | internal | simulator
      channel: string
      fingerprint_hash: string
```

### Submit

```yaml
jobs:
  submit_to_store:
    type: submit
    params:
      build_id: string
      profile: string
```

### TestFlight

```yaml
jobs:
  testflight_distribution:
    type: testflight
    params:
      build_id: string
      internal_groups: string[]
      external_groups: string[]
      changelog: string
```

### Update

```yaml
jobs:
  publish_update:
    type: update
    params:
      message: string
      platform: android | ios | all
      branch: string
      channel: string
      private_key_path: string
      upload_sentry_sourcemaps: boolean
```

### Maestro

```yaml
jobs:
  run_maestro_tests:
    type: maestro
    params:
      build_id: string
      flow_path: string | string[]
      shards: number
      retries: number
      record_screen: boolean
```

### Maestro Cloud

```yaml
jobs:
  run_maestro_tests:
    type: maestro-cloud
    params:
      build_id: string
      maestro_project_id: string
      flows: string
```

### Slack

```yaml
jobs:
  send_slack_notification:
    type: slack
    params:
      webhook_url: string
      message: string
```

### GitHub Comment

```yaml
jobs:
  github_comment:
    type: github-comment
    params:
      message: string
      build_ids: string[]
      update_group_ids: string[]
      deployment_ids: string[]
```

---

## Syntax for EAS Workflows
Source: https://docs.expo.dev/eas/workflows/syntax/

### `name`

```yaml
name: My workflow
```

### `on`

```yaml
on:
  push:
    branches: ['main']
    tags: ['v1']
    paths: ['apps/mobile/**']
  pull_request:
    branches: ['main']
    types: ['opened', 'reopened', 'synchronize']
  pull_request_labeled:
    labels: ['Test', 'Preview']
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:
    inputs:
      name:
        type: string
        required: false
        default: 'World'
```

### `on.app_store_connect`

```yaml
on:
  app_store_connect:
    app_version:
      states:
        - ready_for_review
    build_upload:
      states:
        - complete
    external_beta:
      states:
        - ready_for_beta_testing
    beta_feedback:
      types:
        - crash
```

### `jobs`

```yaml
jobs:
  job_1:
    name: Build app
    environment: production
    env:
      APP_VARIANT: staging
    defaults:
      run:
        working_directory: ./my-app
    if: ${{ github.ref_name == 'main' }}
    needs: [test]
    after: [build]
    type: build
    params:
      platform: ios
    steps:
      - uses: eas/checkout
      - uses: eas/install_node_modules
      - uses: eas/prebuild
      - uses: eas/download_build
        with:
          build_id: ${{ needs.build_ios.outputs.build_id }}
      - name: My step
        run: echo "Hello World"
    outputs:
      output_1: ${{ steps.step_1.outputs.test }}
    image: auto
    runs_on: linux-medium
```

### Built-in functions

- `eas/checkout`: Checks out source files.
- `eas/install_node_modules`: Installs dependencies.
- `eas/download_build`: Downloads a build archive.
- `eas/prebuild`: Runs `expo prebuild`.
- `eas/resolve_apple_team_id_from_credentials`: Resolves Apple Team ID.

### Context

- `${{ github.ref_name }}`
- `${{ needs.build_ios.outputs.build_id }}`
- `${{ steps.step_1.outputs.value }}`
- `${{ env.VARIABLE_NAME }}`
- `${{ inputs.name }}`
- `${{ workflow.name }}`
- `${{ after.build.status }}`

### Functions

- `success()`, `failure()`
- `fromJSON(value)`, `toJSON(value)`
- `contains(value, substring)`
- `startsWith(value, prefix)`, `endsWith(value, suffix)`
- `hashFiles(...globs)`
- `replaceAll(input, stringToReplace, replacementString)`
- `substring(input, start, end)`

### `concurrency`

```yaml
concurrency:
  cancel_in_progress: true
  group: ${{ workflow.filename }}-${{ github.ref }}
```

---

## Automating EAS CLI commands
Source: https://docs.expo.dev/eas/workflows/automating-eas-cli/

Examples of translating EAS CLI commands to workflows:

**Build**: `eas build --platform ios --profile production` → type: `build`
**Submit**: `eas submit --platform ios` → type: `submit`
**Update**: `eas update --auto` → type: `update`

---

## Workflows REST API
Source: https://docs.expo.dev/eas/workflows/rest-api/

**Trigger a workflow**:

```sh
POST /v2/workflows/dispatch
```

Body: `{ appId, gitRef, fileName, inputs? }`

Response: `{ data: { id, url } }`

**Get a workflow run**:

```sh
GET /v2/workflows/runs/:workflowRunId
```

Response includes `status` (new, in-progress, action-required, success, failure, canceled) and `jobs`.

---

## EAS Workflows limitations
Source: https://docs.expo.dev/eas/workflows/limitations/

- No shared workflow configurations.
- No matrix support.

---

## EAS Workflows examples
Source: https://docs.expo.dev/eas/workflows/examples/introduction/

Links to four example workflows:
- Create development builds
- Publish preview updates
- Deploy to production
- Run E2E tests

---

## Create development builds with EAS Workflows
Source: https://docs.expo.dev/eas/workflows/examples/create-development-builds/

```yaml
name: Create development builds
jobs:
  android_development_build:
    type: build
    params:
      platform: android
      profile: development
  ios_device_development_build:
    type: build
    params:
      platform: ios
      profile: development
  ios_simulator_development_build:
    type: build
    params:
      platform: ios
      profile: development-simulator
```

---

## Publish preview updates with EAS Workflows
Source: https://docs.expo.dev/eas/workflows/examples/publish-preview-update/

```yaml
name: Publish preview update
on:
  push:
    branches: ['*']
jobs:
  publish_preview_update:
    type: update
    params:
      branch: ${{ github.ref_name || 'test' }}
```

---

## Deploy to production with EAS Workflows
Source: https://docs.expo.dev/eas/workflows/examples/deploy-to-production/

Full workflow using fingerprint, get-build, build, submit, and update jobs:

```yaml
name: Deploy to production
on:
  push:
    branches: ['main']
jobs:
  fingerprint:
    type: fingerprint
    environment: production
  get_android_build:
    needs: [fingerprint]
    type: get-build
    params:
      fingerprint_hash: ${{ needs.fingerprint.outputs.android_fingerprint_hash }}
      profile: production
  get_ios_build:
    needs: [fingerprint]
    type: get-build
    params:
      fingerprint_hash: ${{ needs.fingerprint.outputs.ios_fingerprint_hash }}
      profile: production
  build_android:
    needs: [get_android_build]
    if: ${{ !needs.get_android_build.outputs.build_id }}
    type: build
    params:
      platform: android
      profile: production
  build_ios:
    needs: [get_ios_build]
    if: ${{ !needs.get_ios_build.outputs.build_id }}
    type: build
    params:
      platform: ios
      profile: production
  submit_android_build:
    needs: [build_android]
    type: submit
    params:
      build_id: ${{ needs.build_android.outputs.build_id }}
  submit_ios_build:
    needs: [build_ios]
    type: submit
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
  publish_android_update:
    needs: [get_android_build]
    if: ${{ needs.get_android_build.outputs.build_id }}
    type: update
    params:
      branch: production
      platform: android
  publish_ios_update:
    needs: [get_ios_build]
    if: ${{ needs.get_ios_build.outputs.build_id }}
    type: update
    params:
      branch: production
      platform: ios
```

---

## Run E2E tests on EAS Workflows with Maestro
Source: https://docs.expo.dev/eas/workflows/examples/e2e-tests/

Create **.maestro/home.yml**:

```yaml
appId: dev.expo.eastestsexample
---
- launchApp
- assertVisible: 'Welcome!'
```

Create **.eas/workflows/e2e-test-android.yml**:

```yaml
name: e2e-test-android
on:
  pull_request:
    branches: ['*']
jobs:
  build_android_for_e2e:
    type: build
    params:
      platform: android
      profile: e2e-test
  maestro_test:
    needs: [build_android_for_e2e]
    type: maestro
    params:
      build_id: ${{ needs.build_android_for_e2e.outputs.build_id }}
      flow_path: ['.maestro/home.yml', '.maestro/expand_test.yml']
```

---

## EAS Metadata
Source: https://docs.expo.dev/eas/metadata/

> Beta.

EAS Metadata is a CLI tool for automating app store presence using a **store.config.json** file.

### Key features

- Easy to configure, update, or maintain.
- Faster feedback loop with validation.
- Extensible with dynamic store config.

Currently only supports Apple App Store (not Google Play Store).

### Quick start

```sh
eas metadata:push
```

---

## Get started with EAS Metadata
Source: https://docs.expo.dev/eas/metadata/getting-started/

### Create the store config

Pull existing: `eas metadata:pull`

Create new **store.config.json**:

```json
{
  "configVersion": 0,
  "apple": {
    "info": {
      "en-US": {
        "title": "Awesome App",
        "subtitle": "Your self-made awesome app",
        "description": "The most awesome app you have ever seen",
        "keywords": ["awesome", "app"],
        "marketingUrl": "https://example.com/en/promo",
        "supportUrl": "https://example.com/en/support",
        "privacyPolicyUrl": "https://example.com/en/privacy"
      }
    }
  }
}
```

### Upload

```sh
eas metadata:push
```

---

## Configuring EAS Metadata
Source: https://docs.expo.dev/eas/metadata/config/

### Static store config

JSON file at project root.

### Dynamic store config

JavaScript config file:

```js
const config = require('./store.config.json');
const year = new Date().getFullYear();
config.apple.copyright = `${year} Acme, Inc.`;
module.exports = config;
```

Configure path in **eas.json**: `submit.production.ios.metadataPath`

### Store config with external content

```js
module.exports = async () => {
  const year = new Date().getFullYear();
  const info = await fetchLocalizations('...').then(r => r.json());
  config.apple.copyright = `${year} Acme, Inc.`;
  config.apple.info = info;
  return config;
};
```

---

## Schema for EAS Metadata
Source: https://docs.expo.dev/eas/metadata/schema/

### Config schema

| Property | Type | Description |
| --- | --- | --- |
| `configVersion` | number (0) | Schema version |
| `apple` | object | App Store properties |
| `apple.version` | string | App version to use |
| `apple.copyright` | string | Copyright notice |
| `apple.advisory` | object | Age rating questionnaire |
| `apple.categories` | array | App Store categories |
| `apple.info` | map | Localized App Store presence |
| `apple.release` | object | Release strategy |
| `apple.review` | object | Review information |

### Advisory age ratings

`NONE`, `INFREQUENT_OR_MILD`, `FREQUENT_OR_INTENSE`

### Categories

`BOOKS`, `BUSINESS`, `DEVELOPER_TOOLS`, `EDUCATION`, `ENTERTAINMENT`, `FINANCE`, `FOOD_AND_DRINK`, `GAMES`, `GRAPHICS_AND_DESIGN`, `HEALTH_AND_FITNESS`, `LIFESTYLE`, `MAGAZINES_AND_NEWSPAPERS`, `MEDICAL`, `MUSIC`, `NAVIGATION`, `NEWS`, `PHOTO_AND_VIDEO`, `PRODUCTIVITY`, `REFERENCE`, `SHOPPING`, `SOCIAL_NETWORKING`, `SPORTS`, `STICKERS`, `TRAVEL`, `UTILITIES`, `WEATHER`

### Info properties

`title`, `subtitle`, `description`, `keywords`, `releaseNotes`, `promoText`, `marketingUrl`, `supportUrl`, `privacyPolicyUrl`, `privacyChoicesUrl`

### Release

```json
{
  "release": {
    "automaticRelease": "2022-12-25T00:00:00+00:00",
    "phasedRelease": false
  }
}
```

### Review

```json
{
  "review": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1 123 456 7890",
    "demoUsername": "john",
    "demoPassword": "applereview",
    "demoRequired": false,
    "notes": "This is an example app..."
  }
}
```

---

## Introduction to EAS Observe
Source: https://docs.expo.dev/eas/observe/introduction/

> Open Beta. First 10,000 MAU free.

EAS Observe is a performance monitoring service for production apps.

### Quick start

```sh
npx expo install expo-observe
```

Wrap root layout with `AppMetricsRoot` (SDK 55) or `ObserveRoot` (SDK 56+) and call `markInteractive()`.

### Metrics tracked

Cold launch time, warm launch time, time to first render, time to interactive, bundle load time.

### Platforms

Android and iOS.

### Privacy

Users identified by anonymous ID per installation (not PII). Data retained minimum 60 days.

---

## Set up EAS Observe
Source: https://docs.expo.dev/eas/observe/get-started/

### Install

```sh
npx expo install expo-observe
```

### Wrap root layout

```tsx
import { Stack } from 'expo-router';
import { ObserveRoot } from 'expo-observe';

function RootLayout() {
  return <Stack />;
}
export default ObserveRoot.wrap(RootLayout);
```

### Mark interactive

```tsx
import { useObserve } from 'expo-observe';

const { markInteractive } = useObserve();

useEffect(() => {
  if (isReady) {
    SplashScreen.hide();
    markInteractive();
  }
}, [isReady, markInteractive]);
```

### CLI commands

- `eas observe:versions`
- `eas observe:metrics-summary`
- `eas observe:metrics`
- `eas observe:events`

---

## Configure EAS Observe
Source: https://docs.expo.dev/eas/observe/configuration/

### configure()

```tsx
Observe.configure({
  environment: 'production',
  dispatchingEnabled: true,
  dispatchInDebug: false,
  sampleRate: 0.25,
});
```

### dispatchEvents()

```tsx
await Observe.dispatchEvents();
```

### Sampling

Deterministic per installation. `sampleRate` between 0 and 1.

### Custom endpoint

In app config:

```json
{
  "expo": {
    "extra": {
      "eas": {
        "observe": {
          "endpointUrl": "https://your-custom-endpoint.com"
        }
      }
    }
  }
}
```

---

## EAS Observe dashboard
Source: https://docs.expo.dev/eas/observe/dashboard/

### Filters

Platform, Environment, Time range (1h to 60d), Release.

### Tabs

- **App startup**: Cold launch, warm launch, bundle load time, TTR, TTI.
- **EAS Update**: Download time for OTA updates.
- **Events** (SDK 56+): User-defined events.
- **Navigation** (SDK 56+): Per-route navigation timings.

### Metric cards

Median, Avg, Min, Max, P90, P99. Release markers on charts.

### Session investigation

Drill into individual sessions with full event timeline and device metadata.

---

## EAS Update download performance
Source: https://docs.expo.dev/eas/observe/eas-update/

Automatically tracks OTA download times. View in **Observe > EAS Update** tab.

Per-update table with: Update ID, Downloads, Median download, P90, First downloaded.

CLI: `eas observe:metrics-summary --metric update_download`

---

## User-defined events
Source: https://docs.expo.dev/eas/observe/events/

```tsx
Observe.logEvent('onboarding.completed');
Observe.logEvent('report.exported', {
  attributes: { format: 'csv', rowCount: 1248 },
  severity: 'info',
  body: 'Free-form message',
});
```

View in **Observe > Events** tab. CLI: `eas observe:events`.

---

## Expo Router integration
Source: https://docs.expo.dev/eas/observe/integrations/expo-router/

SDK 56+. Enable:

```tsx
Observe.configure({
  integrations: { 'expo-router': true },
});
```

Metrics per route: `cold_ttr`, `warm_ttr`, `tti`.

Use `useObserve()` hook in screens.

---

## React Navigation integration
Source: https://docs.expo.dev/eas/observe/integrations/react-navigation/

SDK 56+. Enable:

```tsx
Observe.configure({
  integrations: { 'react-navigation': true },
});
```

Replace `<NavigationContainer>` with `<ObserveNavigationContainer>`.

Metrics per screen: `cold_ttr`, `warm_ttr`, `tti`.

---

## Metrics reference
Source: https://docs.expo.dev/eas/observe/reference/metrics/

### Cold launch time
Time from process creation to native initialization. Recommendation: < 1.5s.

### Warm launch time
Time to bring foreground process back and recreate view hierarchy. Recommendation: < 0.5s.

### Bundle load time
Duration of loading and evaluating JavaScript bytecode. Recommendation: < 0.3s.

### Time to first render (TTR)
Time from native launch finish to first React render. Recommendation: < 2s.

### Time to interactive (TTI)
Time to when user can tap, scroll, and interact. Recommendation: < 3s.

Automatic event params: `expo.frameRate.slowFrames`, `expo.frameRate.frozenFrames`, `expo.frameRate.totalDelay`, `expo.device.lowPowerMode`, `expo.device.batteryLevel`, `expo.device.batteryCharging`, `expo.device.thermalState`, `expo.network.connected`, `expo.network.type`.

### Custom event params

```tsx
markInteractive({
  params: { tenant: 'acme', cohort: 'beta' },
  routeName: '/feed',
});
```

---

## Troubleshooting EAS Observe
Source: https://docs.expo.dev/eas/observe/reference/troubleshooting/

- Ensure new build after installing `expo-observe`.
- For debug builds, set `dispatchInDebug: true`.
- TTR not showing: verify root layout is wrapped.
- TTI not showing: verify `markInteractive()` is called.

Migration from `expo-eas-observe`: Replace package, update imports, replace `markFirstRender()` with root HOC.

---

## EAS CLI reference
Source: https://docs.expo.dev/eas/cli/

Version: 20.1.0

### Installation

```sh
npm install --global eas-cli
```

### Key commands

- `eas account:login` / `eas login`
- `eas account:logout` / `eas logout`
- `eas account:view` / `eas whoami`
- `eas build` — Start a build. Flags: `-p`, `-e`, `--local`, `--wait`, `--clear-cache`, `--auto-submit`
- `eas build:list` — List builds. Flags: `-p`, `--status`, `--distribution`, `--channel`, `--app-version`
- `eas build:view` — View a build.
- `eas build:submit` — Submit app binary.
- `eas build:version:get/set/sync` — Manage app versions.
- `eas channel:create/list/view/edit/delete/pause/resume/rollout` — Manage channels.
- `eas branch:create/list/view/delete/rename` — Manage branches.
- `eas deploy` — Deploy web project. Flags: `--prod`, `--alias`, `--id`
- `eas deploy:alias` — Assign deployment aliases.
- `eas env:create/update/delete/list/get/pull/push/exec` — Manage environment variables.
- `eas init` — Create or link EAS project.
- `eas metadata:push/pull/lint` — Manage app store metadata.
- `eas webhook:create/list/update/delete` — Manage webhooks.
- `eas fingerprint:compare/generate` — Fingerprint operations.
- `eas device:create/list/view/rename/delete` — Manage Apple devices.
- `eas diagnostics` — Display environment info.
- `eas credentials` — Manage credentials.
- `eas observe:metrics/metrics-summary/events/versions/routes` — Query EAS Observe.
- `eas workflow:run` — Run a workflow.

---

## Configuration with eas.json
Source: https://docs.expo.dev/eas/json/

### Build profiles

Common properties: `withoutCredentials`, `extends`, `credentialsSource`, `channel`, `distribution`, `developmentClient`, `resourceClass`, `prebuildCommand`, `buildArtifactPaths`, `node`, `corepack`, `yarn`, `pnpm`, `bun`, `env`, `autoIncrement`, `cache`, `config`, `environment`.

Android-specific: `image`, `resourceClass`, `ndk`, `autoIncrement`, `buildType`, `gradleCommand`, `applicationArchivePath`.

iOS-specific: `simulator`, `enterpriseProvisioning`, `autoIncrement`, `image`, `resourceClass`, `bundler`, `fastlane`, `cocoapods`, `scheme`, `buildConfiguration`, `applicationArchivePath`.

### Submit profiles

Android: `serviceAccountKeyPath`, `track`, `releaseStatus`, `rollout`, `changesNotSentForReview`, `applicationId`.

iOS: `appleId`, `ascAppId`, `appleTeamId`, `sku`, `language`, `companyName`, `appName`, `ascApiKeyPath`, `ascApiKeyIssuerId`, `ascApiKeyId`, `bundleIdentifier`, `metadataPath`, `groups`.

---

## Webhooks
Source: https://docs.expo.dev/eas/webhooks/

Configure per project:

```sh
eas webhook:create
eas webhook:update --id WEBHOOK_ID
eas webhook:list
eas webhook:delete
```

EAS sends HTTP POST with JSON payload and `expo-signature` header (HMAC-SHA1).

### Webhook server example

```js
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const safeCompare = require('safe-compare');

const app = express();
app.use(bodyParser.text({ type: '*/*' }));
app.post('/webhook', (req, res) => {
  const expoSignature = req.headers['expo-signature'];
  const hmac = crypto.createHmac('sha1', process.env.SECRET_WEBHOOK_KEY);
  hmac.update(req.body);
  const hash = `sha1=${hmac.digest('hex')}`;
  if (!safeCompare(expoSignature, hash)) {
    res.status(500).send("Signatures didn't match!");
  } else {
    res.send('OK!');
  }
});
app.listen(8080, () => console.log('Listening on port 8080'));
```

---

## Environment variables in EAS
Source: https://docs.expo.dev/eas/environment-variables/

### Available environments

`development`, `preview`, `production`. Custom environments on Enterprise/Production plans.

### Scope

- **Project-wide**: Specific to one EAS project.
- **Account-wide**: Available across all projects in the account.

### Variable types

- **Strings**: Standard key/value pairs.
- **Files**: Uploaded as files, available as file paths.

### Visibility settings

| Visibility | Description |
| --- | --- |
| Plain text | Visible on website, CLI, and logs. |
| Sensitive | Obfuscated in logs, readable in CLI. |
| Secret | Not readable outside EAS servers. |

### Quick start

```sh
eas env:create --name EXPO_PUBLIC_API_URL --value https://api.example.com --environment production --visibility plaintext
```

In **eas.json**: `"environment": "production"`

For updates: `eas update --environment production`

For hosting: `eas deploy --environment production`

---

## Create and manage environment variables in EAS
Source: https://docs.expo.dev/eas/environment-variables/manage/

### Create in dashboard

Project settings > Environment variables > Add Variables.

### Create with CLI

```sh
eas env:create --name EXPO_PUBLIC_API_URL --value https://example.app/staging --environment preview --visibility plaintext
eas env:list --environment preview
```

### Usage in code

Client-side (`EXPO_PUBLIC_` prefix):

```tsx
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

Build-time in app config:

```js
const IS_DEV = process.env.APP_VARIANT === 'development';
```

Secrets and file variables:

```js
android: {
  googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? '/local/path/to/google-services.json',
}
```

### Manage

```sh
eas env:update --name EXPO_PUBLIC_API_URL --value https://example.app/staging --environment production
eas env:delete
eas env:pull --environment production
```

### Custom environments

Available on Enterprise/Production plans. Create in dashboard or via CLI:

```sh
eas env:create --name EXPO_PUBLIC_API_URL --value https://example.app/staging --environment staging --visibility plaintext
```

---

## Using Environment variables in EAS
Source: https://docs.expo.dev/eas/environment-variables/usage/

### EAS Build

In **eas.json**:

```json
{
  "build": {
    "development": { "environment": "development" },
    "preview": { "environment": "preview" },
    "production": { "environment": "production" }
  }
}
```

Built-in env vars: `CI=1`, `EAS_BUILD=true`, `EAS_BUILD_PLATFORM`, `EAS_BUILD_RUNNER`, `EAS_BUILD_ID`, `EAS_BUILD_PROFILE`, `EAS_BUILD_PROJECT_ID`, `EAS_BUILD_GIT_COMMIT_HASH`, `EAS_BUILD_USERNAME`, `EAS_BUILD_WORKINGDIR`.

### EAS Update

```sh
eas update --environment production
```

### EAS Hosting

Client-side: `EXPO_PUBLIC_` variables inlined at build time (`npx expo export --platform web`).
Server-side: All variables uploaded with `eas deploy --environment production`.

### EAS Workflows

Set `jobs.<job_id>.environment`. Build jobs use environment from build profile in **eas.json**.

Dynamic env vars during job: `set-env EXAMPLE_ENV "example value"`.

---

## Using environment variables without EAS
Source: https://docs.expo.dev/eas/environment-variables/without-eas/

Use `.env` files with `dotenv` or services like Doppler.

**.env** files load according to standard resolution. Variables with `EXPO_PUBLIC_` prefix are replaced in code.

For EAS Hosting with `.env` files: `EXPO_PUBLIC_` variables available in both client and server; non-prefixed only in server.

---

## Frequently asked questions about environment variables in EAS
Source: https://docs.expo.dev/eas/environment-variables/faq/

### Recommended workflow

1. Use correct visibility settings.
2. Add `.env` files to `.gitignore`.
3. Use `--environment` flag with `eas update`.
4. Sync with `eas env:pull` for local development.
5. Explicitly set `environment` in **eas.json**.

### Limitations

- Value size: 32 KiB for secret, 4 KiB for other types.
- 150 account-wide, 200 project-specific variables.
- 10 custom environments per project.
- Environment names: 3-100 chars, letters/digits/underscores/hyphens.


---

## Account types
Source: https://docs.expo.dev/accounts/account-types/

Learn about the different types of Expo accounts and how to use them.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

An Expo account is a container that holds Expo projects and allows for different amounts of collaboration. There are two types of Expo accounts: **Personal**, and **Organization**.

The type of account you choose to put a new project depends on the nature of the project. If you are looking to collaborate or set up a workflow for your development team, always create an Organization account. For personal or hobby projects, a Personal account is sufficient.

## Personal accounts

When you [sign up for an account](https://expo.dev/signup) with Expo, a Personal account is automatically created for you. This account is a good place to work on your personal projects.

> Do not share authentication credentials for your Personal account with anyone for any reason.

## Organizations

An Organization account is best used to hold projects that you wish to share with other members of a company or a group of developers. It serves as a shared container where your team can collaborate on one or multiple projects and have access to shared credentials.

You can invite other members to your Organization account, and then give these members different roles that grant a level of access within the organization. For more information, see [role privileges in Manage access](/accounts/account-types#manage-access).

Creating an organization account is useful when:

-   You think you may need to transfer control of that Organization's projects in the future.
-   Sharing one or multiple projects with a team of collaborators.
-   More than one [Owner](/accounts/account-types#manage-access) needs to be assigned.
-   Expenses need to be isolated.
-   Granting different levels of access by assigning a role to each member of the organization.
-   Structuring projects for different contexts. For example, when working for different clients, a new organization may be created for each client.
-   Sharing an [EAS Subscription](/eas).

### Create a new Organization

If you are logged in to your Personal account, you can create a new Organization from the dashboard:

-   Select your account's username in the navigation menu to open the dropdown menu.
-   Select **Create Organization** under Organizations in the dropdown menu.

-   Add a name for your Organization, edit its slug, or invite team members. Then, select the **Create** button.

After creating a new Organization, you are redirected to the new dashboard page for the organization. To associate a new project with the Organization, you have to add the [`owner` key](/versions/latest/config/app#owner) under the `expo` key to your project's **app.json**.

### Convert a Personal account into an Organization

You can convert your Personal account into an Organization when you want to share access to projects with other members and assign each member a role-based privilege.

From the **User settings** of your Personal account, go to [Convert your account into an organization](https://expo.dev/settings#convert-account) section to start the process.

When you are going through this process, we take a lot of care to make sure that all of the functionality that you and your users rely on will continue to work as expected:

-   You can continue to deliver updates and push notifications to your users.
-   You can still use any Android or iOS credentials stored on Expo's servers.
-   Any integrations using your personal access token or webhooks will continue to operate and are transferred to the new designated owner.
-   Your EAS subscription will continue without interruption.
-   Your production apps will continue to operate without interruption.

### Invite a member

Other Expo users can be invited to join your Organization. To invite a new member:

-   Navigate to [**Members**](https://expo.dev/settings/members) under **Organization settings** in the EAS dashboard.
-   Click the button **Invite**. This will open a form to invite a member to the organization.
-   In the form, enter the email of the user you want to invite and select the role they should have upon joining the organization. For more information, see [role privileges in Manage access](/accounts/account-types#manage-access).

When inviting a new member, keep in mind:

-   Only members with an Owner or an Admin role can invite others.
-   Members with an Owner role can grant members and invitees any role.
-   Members with an Admin role can only give members and invitees up to and including Admin role (every role but Owner).

### Change the role of a member

To change the role privileges of a member, make sure you have either an [**Owner** or **Admin** role](/accounts/account-types#manage-access) and follow the steps below:

-   Navigate to [**Members**](https://expo.dev/settings/members) under **Organization settings** in the EAS dashboard.
-   Next to the member whose role you want to change, click on the three-dotted menu icon and change the role.

### Remove a member

To remove a member, make sure you have either an [**Owner** or **Admin** role](/accounts/account-types#manage-access) and follow the steps below:

-   Navigate to [**Members**](https://expo.dev/settings/members) under **Organization settings** in the EAS dashboard.
-   Next to the member you want to remove, click on the three-dotted menu icon.
-   Click **Remove member**.

### Rename an account

Accounts can be renamed a limited number of times. Only Owners can rename accounts. To rename an account, visit **Settings** > [**Organization settings**](https://expo.dev/accounts/%5Baccount%5D/settings) and follow the steps under [**Rename account**](https://expo.dev/accounts/%5Baccount%5D/settings#rename-account).

### Transfer projects between accounts

Projects can be transferred a limited number of times. A user must be an Owner or Admin on both source and destination accounts to transfer projects between them. Visit [**Project settings**](https://expo.dev/accounts/%5Baccount%5D/projects/%5Bproject%5D/settings) > **General** and follow the steps under **Transfer project**.

#### Caveats

> If you want to transfer the ownership of a project from your Personal or Organization account (source) to another person or company (destination), and you are not allowed "Owner" or "Admin" permissions on the destination account, you can create an escrow account (a new Organization account). This solves the problem that a user must be an "Owner" on the source account and either an "Owner" or "Admin" on the destination account to transfer projects between them. Once the escrow account is created, you can grant the ultimate destination account member the Owner role on the escrow account and safely transfer the project to the escrow account. The receiving person or company can then transfer it to their destination account from the escrow account without having had access to the destination account itself.

### Manage access

Access for members is managed through a role-based system. Users can have the _owner_, _admin_, _developer_, or _viewer_ roles within an Organization account.

| Role | Description |
| --- | --- |
| **Owner** | Can take any action on an account or any projects, including deleting them. |
| **Admin** | Can control most settings on your account, including signing up for paid services, changing permissions of other users, and managing programmatic access. |
| **Developer** | Can create new projects, make new builds, release updates, and manage credentials. |
| **Viewer** | Can only view your projects through Expo Go but cannot modify your projects in any way. |

### Security activity

Security activity is a list of changes that happened to an account's profile. It includes changes to password, email, and 2FA authentication setup, among others.

It can be found under **Overview** > [**User settings**](https://expo.dev/settings).

---

## Audit logs
Source: https://docs.expo.dev/accounts/audit-logs/

Learn how to track and analyze your account's activities by using the audit logs.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

> Audit logs are available for [Enterprise plan](https://expo.dev/pricing) customers.

Audit logs record actions made with Expo Application Services (EAS) by accounts. Recorded data includes information about the affected entities, the type of modification made to them, who performed the action, and when the activity occurred.

## Key points

-   Audit logs can only be created and never modified or deleted, they serve as a source of truth to help monitor events and debug issues occurring within accounts.
-   **Audit logs are available to Enterprise plan customers**. When subscribed, some of the logs used internally by Expo are immediately available, while other types of logs are starting to be collected after the subscription is activated.
-   Audit logs are stored for 1.5 years. If an account is deleted, its audit logs will be deleted after 90 days.
-   To access them, go to **Account settings**/**Organization settings** > [**Audit logs**](https://expo.dev/accounts/%5Baccount%5D/settings/audit-logs).

## Use cases

### Permission monitoring

Audit logs can track user invitations and permission changes within your organization. An example security event could include a compromised employee account that invites an attacker into an organization and changes their permission to [Admin](/accounts/account-types#manage-access).

In this scenario, audit logs would record which employee account invited the attacker and modified permissions. Since audit logs are immutable, the attacker would not be able to delete this recorded history. Other organization members will be able to review the audit logs to determine which account was compromised, take action to revoke the attacker's permissions and secure the employee's account.

### Access history

An Expo organization account can include many projects where development access is controlled by distribution certificates assigned to individual teams. When devices are granted to join these teams, it is important to track when access is granted and removed for historical record keeping. While a device may not currently be included in an Apple team, it may be useful to see who previously had access to the team in the event of an internal security incident.

The Apple devices listed within the Expo team's settings will only show devices that are currently registered to an account, but with the creation of audit logs, historical modifications of Apple teams and devices can be viewed.

## Audit log entities

While we are working on adding more entities in future, the following entities are already enabled:

-   Account
-   Account subscription
-   Android App Credentials
-   Android Keystore
-   App Store Connect API key
-   Apple Device
-   Apple Distribution Certificate
-   Apple Provisioning Profile
-   Apple Team
-   EAS Hosting Alias
-   EAS Hosting Custom Domain
-   EAS Hosting Deployment
-   EAS Update Branch
-   EAS Update Channel
-   Google Service Account key
-   iOS App Credentials
-   LogRocket Organization
-   LogRocket Project
-   Organization SSO Configuration
-   Project
-   User Invitation
-   User Permission
-   Workflow
-   Workflow Revision

### Structure

Audit log entries include the following fields:

| Field | Description |
| --- | --- |
| Actor | The account actor that performed the particular action. |
| Entity Type | The object that was modified with one of the modification types: `CREATE`, `UPDATE`, `DELETE`. |
| Action Type | The type of modification: `CREATE`, `UPDATE`, `DELETE`. |
| Message | Contains information based on the **Action**. |
| Created At | When the particular action was performed. |

Additionally, clicking on an Audit log row, you can view the metadata relevant to that log.

## Export

**Audit logs are available to Enterprise plan customers**. When subscribed, some of the logs used internally by Expo are immediately available, while other types of logs will be collected after the subscription is activated.

You can export your audit logs to review them outside of the Expo dashboard. To export audit logs:

1.  In the sidebar menu, under **Account/Organization settings**, click [**Audit logs**](https://expo.dev/accounts/%5Baccount%5D/settings/audit-logs).
2.  Click the **Export** button in the top-right corner of the audit logs page.
3.  Select your desired time range. Export is available with a time range of up to 30 days.
4.  The audit logs will be exported as a file for download.

The exported file will include all the fields shown on the Audit logs page except for the **Message** field.

> **Note:** Export is currently only available through the Expo website. There is no API available for programmatic export of audit logs.

---

## Programmatic access
Source: https://docs.expo.dev/accounts/programmatic-access/

Learn about types of access tokens and how to use them.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

When setting up CI or writing a script to help manage your projects, we recommend avoiding using your username and password to authenticate. With these credentials, anyone will be able to log in and use your account.

Instead of providing credentials, you can generate tokens that will allow you to manage each integration point separately. Anyone who has access to these tokens will be able to perform actions against your account. Treat them with the same care as a user password. In case something is leaked, you can revoke these tokens to block access.

## Personal access tokens

You can create Personal access tokens from the [Access tokens](https://expo.dev/settings/access-tokens) on your dashboard. Anyone with this token can perform actions on your behalf. That applies to all content on your Personal Account, as well as any Personal Accounts or Organizations that you have been granted access to.

## Robot users and access tokens

Accounts can create Robot users to take actions on resources owned by the Account. Bot Users can be assigned [a role](/accounts/account-types#manage-access) to limit the actions they are authorized to perform. Bot users cannot sign in to any Expo products, cannot own any projects themselves, and can only authenticate via an access token.

## Access tokens usage

You can use any tokens you have created to perform actions with the EAS CLI. To use tokens, you need to define an environment variable, like `EXPO_TOKEN="token"`, before running commands.

Once you set the `EXPO_TOKEN` environment variable, you can run any EAS CLI command authenticated with the token without running the `eas login` command. The `eas login` command is only used for username and password authentication. The `EXPO_TOKEN` auth method takes precedence over the username and password if both are configured.

For example, once you obtain a token, you can run the following EAS CLI command to trigger a build:

```sh
EXPO_TOKEN=my_token eas build
```

If you are using GitHub Actions, [you can configure the `token` property](https://github.com/expo/expo-github-action#configuration-options) to include this environment variable in all the job steps.

Common situations where access tokens are useful:

-   Publish or build from CI without providing your Expo username and password
-   Renew a token to keep it as secure as possible; no need to reset your password and sign out of all sessions
-   Give someone (or a script) one-time access to your project with limited permissions

## Revoke access tokens

In case a token is accidentally leaked, you can revoke it without changing your username and password. When you revoke the access token, you block all access to your account using this token. To do this, go to the [Access Token page](https://expo.dev/settings/access-tokens) on your dashboard and delete the token you want to revoke.

---

## Single Sign-On (SSO)
Source: https://docs.expo.dev/accounts/sso/

Learn how your organization can use your identity provider to manage Expo users on your team.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Single Sign-On (SSO) is available for [Production and Enterprise plan](https://expo.dev/pricing) customers.

To get started, prepare your identity provider (IdP) for Expo SSO and gather information by following the [configuration guide for your IdP](/accounts/sso#identity-provider-support) below. Once you have done this, an owner of your Organization can follow instructions to [enable SSO](/accounts/sso#setting-up-sso-on-an-organization).

If you have questions or issues, [contact us](https://expo.dev/contact) and we'll help you set up your organization.

## Identity provider support

Expo SSO supports the following identity providers:

| Identity providers | Resources |
| --- | --- |
| [Okta](https://www.okta.com/) | [Configuration guide](https://expo.fyi/sso-setup-okta) |
| [OneLogin](https://www.onelogin.com/) | [Configuration guide](https://expo.fyi/sso-setup-onelogin) |
| [Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/microsoft-entra) | [Configuration guide](https://expo.fyi/sso-setup-microsoft) |
| [Google Workspace](https://www.google.com/) | [Configuration guide](https://expo.fyi/sso-setup-google-ws) |

We implement the [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html) specification and are working to verify additional compatible identity providers. If you use another identity provider and are interested in SSO, [let us know](https://expo.dev/contact).

## Setting up SSO on an organization

> Organization accounts must maintain at least one non-SSO user with the Owner role. This user is needed for the initial SSO setup and to ensure uninterrupted access to your organization if your SSO configuration changes or if you discontinue the use of SSO.

Log in as the Organization account owner. In your account's EAS dashboard, go to **Settings** > **Organization settings** > **Create SSO configuration for account**.

On **Create SSO configuration for account**, click the **Start** button.

Enter the configuration details for your IdP using the information you collected during the IdP setup:

-   Client ID
-   Client secret
-   IdP subdomain/tenant ID, if needed. Click the **?** icon above the Issuer field for help with what to enter.

Click **Create SSO Configuration**.

The **Organization settings** > **Overview** page will now display an **Update SSO configuration** option. Use this option to update the client secret if it changes.

## SSO user sign in

### Expo website

Navigate to [expo.dev/sso-login](https://expo.dev/sso-login) and enter the account name of your organization. You can create a link that pre-fills the organization name. For example, [expo.dev/sso-login/test-org](https://expo.dev/sso-login/test-org) pre-fills `test-org`.

Log in to your identity provider (IdP).

You'll be prompted to select an Expo username. This will be the username for your Expo account.

### Expo CLI

When using the Expo CLI, you can run the following command to log in to your Expo account.

```sh
# npm
npx expo login --sso

# yarn
yarn expo login --sso

# pnpm
pnpm expo login --sso

# bun
bun expo login --sso
```

You will be prompted to log in via the Expo website in a browser and will be redirected back to the CLI upon completion.

### EAS CLI

When using the EAS CLI, you can run the following command to log in to your Expo account.

```sh
eas login --sso
```

You will be prompted to log in via the Expo website in a browser and will be redirected back to the CLI upon completion.

### Expo Go

Click the **Continue with SSO** button on the sign-in page when going through the sign-in flow.

Follow the [above steps](/accounts/sso#expo-website) to sign in to the Expo website.

## SSO user restrictions

SSO users are like regular users. However, there are a few known exceptions:

-   SSO users can only belong to their SSO organization. They also cannot create additional organizations.
-   SSO users cannot leave their SSO organization. Doing so deletes their SSO user.
-   SSO users cannot log in to the Expo forums.
-   SSO users cannot subscribe to EAS for their personal accounts.

## SSO administration

Both new organizations and existing organizations can enable SSO as a sign in option. Organizations with existing non-SSO members can enable SSO and then direct new members to the SSO sign-in page, while existing users continue to use their current Expo credentials. To support external contributors, SSO-enabled organizations also allow inviting additional non-SSO users via email.

### Transitioning existing users to SSO

Regular users may be a member of one or many personal, team, and organization accounts while SSO users belong exclusively to their organization account. Thus, existing users cannot be directly converted into SSO users. However, a regular user who's already a member of your organization may create a second user by going to the [SSO login page](https://expo.dev/sso-login). Then, their regular user can be removed from the organization.

To transition from using a regular Expo account to an SSO account, follow these steps:

Check if you're already logged in at [expo.dev](https://expo.dev). If so, log out.

Go to the [SSO login page](https://expo.dev/sso-login) and follow the prompts, such as entering your organization name, creating a new Expo username, and logging in to your identity provider.

By default, your new SSO user will have the View Only role. If you need a different role, ask an Admin or Owner to update your role in [**Members**](https://expo.dev/accounts/%5Baccount%5D/settings/members) settings.

Run `eas login --sso` to switch to your new account on the CLI.

At this time, the Admin or Owner can remove your old user from the organization. In [**Members**](https://expo.dev/accounts/%5Baccount%5D/settings/members) settings, the list of organization members indicates whether a user is an SSO or non-SSO user. The Admin or Owner can click the dropdown next to the old user and click **Remove member**.

If you no longer need your old user account, log out of your new SSO account, then log in to your old account and go to [**User settings**](https://expo.dev/settings). Scroll down and click **Delete Account**. **Note that this will delete any projects under your old user account.** It will not affect any projects owned by the organization.

> If you wish to reuse your old username on your new SSO user account, you can go to [**User settings**](https://expo.dev/settings) under your old user and rename it before creating your SSO account. Alternatively, you can rename your SSO user account's Expo username after deleting your old user. While Expo usernames need to be unique, it is OK if your email address on your identity provider matches the email address of your old user.

### Remove SSO users

If someone has left your organization, remove or disable them in your IdP. Depending on the token refresh duration you configured with your IdP, the removed user will subsequently lose access to their Expo account. If you wish to remove them ahead of that time or you wish to remove them to clean up users on your account, you may do so on the organization **Members** settings page:

Navigate to your [organization account **Members** settings](https://expo.dev/accounts/%5Baccount%5D/settings/members).

Click the dropdown next to the member you wish to delete, and click **Delete SSO user**.

> This will delete their personal account and all data associated with it. All data in your organization account will remain unaffected.

### Change billing or discontinue use of SSO

An active Production or Enterprise Plan is required to continue using SSO. [Contact us](https://expo.dev/contact) if you wish to discontinue the use of SSO or change your plan.

To ensure uninterrupted access to your organization whether or not SSO is enabled, SSO organizations must keep at least one non-SSO user with the Owner role as a member.

### Delete SSO organization

Once SSO is configured for an organization, account deletion must be done manually by the Expo team. [Contact us](https://expo.dev/contact) for assistance.

---

## Two-factor authentication
Source: https://docs.expo.dev/accounts/two-factor/

Learn about how you leverage two-factor authentication (2FA) to secure your Expo account.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Two-factor authentication provides an extra layer of security when logging in to expo.dev, the Expo Go app, and command-line tools. With two-factor authentication enabled, you will need to provide a short-lived code in addition to your username and password to access your account.

## Enable two-factor authentication (2FA)

You can enable two-factor authentication from your [personal account settings](https://expo.dev/settings#two-factor-auth).

## Two-factor authentication methods

You can receive 2FA codes through an authenticator app.

### Authenticator apps

Expo accepts any authenticator app that supports Time-based One-time Passwords (TOTP) including:

-   [Last Pass Authenticator](https://lastpass.com/auth/)
-   [Authy](https://authy.com/)
-   [1Password](https://support.1password.com/one-time-passwords/)
-   [Google Authenticator](https://support.google.com/accounts/answer/1066447)
-   [Microsoft Authenticator](https://www.microsoft.com/en-us/account/authenticator)

Expo will provide a QR code to scan with your authenticator app during setup. The app will provide a confirmation code to enter on Expo. Enter the code to finish activating 2FA via your authenticator app.

### SMS messages

> **Deprecated:** SMS is no longer supported for newly-added two-factor authentication methods. Existing SMS two-factor authentication methods will continue to work, though we suggest switching to an authenticator app as it provides better security.

Provide a mobile phone number to receive a short-lived token via SMS. Codes received via SMS will be valid for at least 10 minutes, so you may receive the same code multiple times within this window. If you set an SMS device as your default 2FA method, you will be sent a verification code automatically whenever you take an action that requires a 2FA code.

### Recovery codes

When you set up two-factor authentication for your account, you'll receive a set of recovery codes. These codes can be used instead of a one-time password if you lose access to your authenticator app or SMS device. Keep in mind that each recovery code is only valid for one use.

If you selected the option to download your recovery codes at the time they were created, you can locate them in a file labeled as **expo-recovery-codes.txt**.

> Store your recovery codes in a secure and memorable place to ensure you, and only you can access your account!

## Change your two-factor settings

You can make changes to your two-factor settings from your [personal account settings](https://expo.dev/settings). You can:

-   add or remove authentication methods
-   set your default method
-   regenerate your recovery codes
-   disable two-factor authentication for your account

You will need to provide a one-time password to make any changes to your 2FA settings.

## Recover your account

### Recovery codes

When you set up your account to use 2FA, Expo provides you with a list of recovery codes. In the event you lose your device(s), a recovery code may be used in place of a one-time password. Each of these codes may only be used once. You may regenerate your recovery codes, which will invalidate any existing codes, from your [personal account settings](https://expo.dev/settings/).

### Secondary 2FA methods

By setting up multiple authentication methods associated with different physical devices, you can ensure you will not lose access to your account in the event a device is reset or lost.

### Manual recovery

If you cannot access your account through any of the supplied methods, you may email [our support](https://expo.dev/contact) from the email associated with your account. Unfortunately, we cannot guarantee we will be able to restore your access to your account in this scenario.

---

## Billing: Overview
Source: https://docs.expo.dev/billing/overview/

An overview of information on billing and subscriptions to manage your EAS account's plans, invoices, receipts, payments, and usage.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo provides various subscription plans for integrated cloud services through Expo Application Services (EAS). You can manage and track invoices, payments, plans, and other billing-related information on the **Billing and Receipts** pages in your account's dashboard. Only account Owners and Admins have access to this page.

See our list of resources below to learn more about different aspects of billing and subscriptions:

## Plans

[Subscriptions, plans, and add-ons](/billing/plans) --- In-depth guide on available Expo Application Services (EAS) plans and how they work, usage-based pricing, and add-ons.

[Manage plans](/billing/manage#manage-plans) --- Learn how to update, downgrade, or cancel your Expo account's plan.

## Manage billing

[Manage billing](/billing/manage#manage-billing-information) --- Learn how to manage billing information of your Expo account.

[Payments, invoices, and receipts](/billing/invoices-and-receipts) --- Learn how to view your account's payment history, download invoices and receipts, request a refund for a charge, and understand charges on your invoice.

## Usage-based pricing

[Usage-based pricing](/billing/usage-based-pricing) --- Learn how Expo applies usage-based billing for customers who exceed their plan quotas and about monitoring your EAS Build and Update usage.

## Frequently Asked Questions (FAQs)

[FAQs](/billing/faq) --- A reference of commonly asked questions on Expo Application Services (EAS) plans, billing, and payment.

---

## Subscriptions, plans, and add-ons
Source: https://docs.expo.dev/billing/plans/

In-depth guide on available Expo Application Services (EAS) plans and how they work, usage-based pricing and add-ons.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

[Expo Application Services (EAS)](/eas) offers [free access](https://expo.dev/eas/fair-use#commercial-usage) to a limited quantity of low-priority builds on [EAS Build](/build/introduction) and free updates with [EAS Update](/eas-update/introduction). These limits reset monthly.

Beyond the Free plan, there are different subscription plans to cater to various customers and their needs. Each paid plan offers credits to enable priority builds for EAS Build and broader access to EAS Update through more monthly active users and extra bandwidth. We also offer add-ons that complement subscriptions and enable opt-in features to amplify customer needs.

This page lists different subscription-based plans and available add-ons.

## Subscriptions

Subscriptions are billed monthly and are priced the same worldwide (pre-tax). To see your account's current subscribed plan, go to [your account's Billing](https://expo.dev/settings/billing), and under **Current Plan**, you will find details of your current plan.

You can also cancel a subscription at any time. See [Cancel a plan](/billing/manage#cancel-a-plan) for more information.

We also offer annual contracts on an as-needed basis. Contact our [customer support](https://expo.dev/contact) team to see if an annual plan suits you.

## Plans

Each plan has specific limits. However, subscribers can exceed them and pay for additional usage with [usage-based billing](/billing/usage-based-pricing).

[Pricing](https://expo.dev/pricing) --- Visit our pricing page to see the list of current prices for each plan.

### Production

The Production plan is designed for professional developers and small businesses. Subscribing to this plan gets you access to:

-   Reliable, production-grade services
-   Monthly [credits](/billing/usage-based-pricing) for high-priority builds for EAS Build
-   More unique users, higher bandwidth, and storage limit for EAS Update

If you exceed the limits or use up your monthly credits, any further usage will be charged at [usage-based prices](/billing/usage-based-pricing).

### Enterprise

The Enterprise plan is designed for organizations and enterprises that have large projects and require additional resources such as dedicated support. Subscribing to this plan gets you access to:

-   Reliable, production-grade services
-   Monthly [credits](/billing/usage-based-pricing) for high-priority builds for EAS Build
-   More unique users, higher bandwidth, and storage limit for EAS Update

An Enterprise plan offers much higher monthly credits for EAS Build and bandwidth for EAS Update than any other plan.

If you exceed the limits or use up your monthly credits, any further usage will be charged at [usage-based prices](/billing/usage-based-pricing).

### Starter

The Starter plan is meant for developers ready to launch real-world apps. For $19 per month, you get $45 of build credit to use for priority builds.

Subscribing to the Starter plan gets you access to:

-   Reliable, production-grade services
-   Monthly [credits](/billing/usage-based-pricing) for high-priority builds for EAS Build
-   The ability to exceed the limits of the Free plan for EAS Update and pay for additional usage

If you exceed the limits or use up your monthly credits, any further usage will be charged at [usage-based prices](/billing/usage-based-pricing).

## Usage-based billing

Usage-based billing is applied to customers who exceed their plan limits. It enables you to use our services without worrying about limitations or any contractual obligations.

Usage-based billing is billed monthly and is currently enabled for EAS Build and EAS Update. We provide an estimate of your existing usage and any overage charges on [your account's Billing](https://expo.dev/settings/billing). Expo also sends [email notifications](/billing/usage-based-pricing#usage-notifications) when your account reaches 80% and 100% of your plan's included EAS Build credits.

## Add-ons

### Enterprise Support

The Enterprise Support add-on is only available for new Enterprise plan subscribers, subject to availability. Key features include:

-   Receiving professional, long-term support from our experts
-   Direct communication channel support with a Service-Level Agreement (SLA)
-   A dedicated account manager

[Enterprise Support features](https://expo.dev/solutions/enterprise) --- See a complete list of features of the Enterprise Support add-on.

---

## Manage plans and billing
Source: https://docs.expo.dev/billing/manage/

Learn how to update, downgrade, or cancel your Expo account's plans and manage billing details.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

**Billing** in the EAS dashboard provides information about your account's currently subscribed plan and monthly usage. It also allows you to manage your plan and billing details.

This guide explains how to manage your account's plans and billing information.

## Manage plans

### View the current plan

-   Click [Billing](https://expo.dev/settings/billing) from the navigation menu under **Subscription**.
-   Under **Current Plan**, you can see the current plan for your account.

For example, an account is subscribed to the Free plan below:

### Upgrade to a new plan

To upgrade to a different plan:

-   Click [Billing](https://expo.dev/settings/billing) from the navigation menu in EAS dashboard.
-   Under **Current Plan**, click **Change Plan** if you are already on a paid plan. If you are on the Free plan, click **See plans** > **Select your account**. It opens the **Upgrade plan** popup.
-   Under **Upgrade plan**, you can see a list of all available plans. Choose the plan you want to upgrade to and click the **Upgrade** button under the desired plan.

-   On **Checkout**, you are asked to enter your email, card details, and billing address. After adding these details, click **Pay Now** to subscribe to the new plan.

### Downgrade a plan

If you are on a Production, Enterprise, or Legacy plan, you can downgrade to the Starter plan.

Downgrading to the Starter plan takes effect after your current billing period ends.

To downgrade, go to [Billing](https://expo.dev/settings/billing) and follow the steps below:

-   Under **Current Plan**, click **Change Plan**.

-   Under **Select account**, select the account from the dropdown menu you want to downgrade
    
-   Under **Upgrade plan** > **Starter plan**, click **Change**.
    

-   A confirmation dialog will be displayed. Click **Done**.

-   After confirming your account for a plan downgrade to Starter, the same information is also reflected under **Billing** > **Upcoming Plan**.

### Cancel a plan

Cancellation from a Production or Enterprise plan takes effect after your current billing period ends.

To cancel your plan, on [Billing](https://expo.dev/settings/billing), under **Cancel all subscriptions** and then click **Continue to Stripe** to follow the process of your current plan's cancellation.

## Manage billing information

You can manage your billing-related details such as name, email, address, and payment information, or add a tax ID. All of this information is mentioned on the [monthly invoice](/billing/invoices-and-receipts) you receive for the subscribed plan.

### Update Billing name, email, or address

To update your billing name, email, or address:

-   On [Billing](https://expo.dev/settings/billing), under **Manage billing information**, click **Manage billing**. This will open Stripe's portal where you can view payment methods, billing information, invoicing history, and update your billing information. Then, click **Update information**.

-   Update your billing details by entering your new name, email or address, then click **Save**.

### Tax ID

To add or update your billing tax ID:

-   On [Billing](https://expo.dev/settings/billing), under **Manage billing information**, click **Manage billing**. This will open Stripe's portal where you can view and update your billing information. Then, click **Update information**.

-   Under **Tax ID**, select the ID type, enter your valid tax ID, and click **Save**.

### Payment method

To add a new payment method information:

-   On [Billing](https://expo.dev/settings/billing), under **Manage billing information**, click **Manage billing**. This will open Stripe's portal where you can view and update your billing information.
-   Under **Payment method**, click on **Add payment method** to add a new payment method.

-   Enter your new payment method details and click **Add**.

---

## View payment history, invoices, and receipts
Source: https://docs.expo.dev/billing/invoices-and-receipts/

Learn how to view your account's payment history, download invoices and receipts, and request a refund for a charge.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

**Receipts** in the EAS dashboard provide information about an account's payment history and access to invoices and receipts. It also provides information on payment dates, payment status, and the total amount for that payment. You can also request a refund for a charge if you believe it has been made in error.

> **Note**: You can only access the **Receipts** if you have [Owner or Admin access](/accounts/account-types#manage-access) to your account.

## Receipts

To view your account's payment history, click [Receipts](https://expo.dev/settings/receipts) in the navigation menu under **Subscription**.

For example, an [Organization account's](/accounts/account-types#organizations) receipts are shown below:

### Download and view an invoice

To download and view an invoice for a billing period, go to [Receipts](https://expo.dev/settings/receipts) and:

-   Click the **Date** for the billing period corresponding to the invoice. You will be navigated to a page hosted by Stripe. As an example, the March 22, 2024 invoice below links to this page:

-   Click **Download invoice**. You will receive a PDF copy of the invoice.

### Download and view a receipt

To download and view a receipt for a billing period, go to [Receipts](https://expo.dev/settings/receipts) and:

-   Click the **Date** for the billing period corresponding to the receipt. You will be navigated to the appropriate receipt hosted by Stripe. As an example, the March 22, 2024 receipt below links to this page:

-   Click on **Download receipt.** You will receive a PDF copy of the receipt.

### Request a refund

You can request a refund directly from the [Receipts](https://expo.dev/settings/receipts) page. The approval process is manual and our team investigates any errors before providing a refund.

To request a refund:

-   Next to a receipt, click the three-dot menu and then click **Request Refund:**

-   Fill the **Request a refund** form with details for the refund and click **Continue**:

-   Our billing team receives and reviews refund requests. Once a refund is approved, the amount is credited to your payment method. Refunds typically take 5 to 10 business days to fully process.

## Read an invoice

An invoice contains your legally registered business name, address, tax ID, invoice number, due date, and more. It also includes a description of any charges and the total amount due. In a typical invoice, the charges are divided into:

-   Current plan's subscription amount (if subscribed to a plan)
-   Any overage charges (if applicable)
-   A plan's credit limit

Let's consider three different examples to understand how your invoice might look. If you subscribe to a [Production](/billing/plans#production), [Enterprise](/billing/plans#enterprise), or [Starter](/billing/plans#starter) plan, one of these scenarios may apply to you.

### Subscription charges

In the first example, the invoice table shows a subscription charge for a Production plan:

| Description | Quantity | Unit price | Amount |
| --- | --- | --- | --- |
| _FEB 1 - MAR 1, 2025_ |  |  |  |
| EAS Build - Build (Android: 5 large and 5 medium builds; iOS: 5 large and 5 medium builds) | 1 | $40.00 | $40.00 |
| EAS Build - Plan credit | 1 | -$40.00 | -$40.00 |
| _MAR 1 - APR 1, 2025_ |  |  |  |
| Expo Application Services - Production | 1 | $199.00 | $199.00 |
| **Total (USD)** |  |  | **$199.00** |

In the above example:

-   The first line item describes the EAS Build usage for the billing period of February 1 to March 1, 2025. It contains all the details about how many Android and iOS builds were created during this billing period and their cost.
-   The second line item describes the credit limit for the Production plan ($100) for the billing period of February 1 to March 1, 2025.
-   The third line item describes the subscription charge for the Production plan for the next billing period of March 1 to April 1, 2025.

Since the EAS Build usage ($40) doesn't exceed the plan's $225 credit amount, the subscriber only has to pay the $199 subscription amount for the Production plan.

### Overage charges

In the second example, the invoice table shows a subscription charge for a Production plan with an overage charge:

| Description | Quantity | Unit price | Amount |
| --- | --- | --- | --- |
| _FEB 1 - MAR 1, 2025_ |  |  |  |
| EAS Build - Build (Android: 35 large; iOS 40 large and 35 medium builds) | 1 | $300.00 | $300.00 |
| EAS Build - Plan credit | 1 | -$225.00 | -$225.00 |
| _MAR 1 - APR 1, 2025_ |  |  |  |
| Expo Application Services - Production | 1 | $199.00 | $199.00 |
| **Total (USD)** |  |  | **$274.00** |

In the above example:

-   The first line item describes the EAS Build usage for the billing period of February 1 to March 1, 2025. It contains all the details about how many Android and iOS builds were created during this billing period and their cost.
-   The second line item describes the credit limit for the Production plan ($225) for the billing period of February 1 to March 1, 2025.
-   The third line item describes the subscription charge for the Production plan for the next billing period of March 1 to April 1, 2025.

Since the EAS Build usage exceeds the plan's credit amount for the billing period of February 1 to March 1, 2025, the subscriber has to pay the overage charge and the subscription amount for the Production plan for the next billing period.

### Starter charges

In the third example, the subscriber is on a Starter plan. Any charges incurred during the billing period are listed in the invoice:

| Description | Quantity | Unit price | Amount |
| --- | --- | --- | --- |
| _FEB 1 - MAR 1, 2025_ |  |  |  |
| EAS Build - Build (Android: 10 medium builds; iOS 10 medium builds) | 1 | $45.00 | $45.00 |
| EAS Build - Plan credit | 1 | -$45.00 | -$45.00 |
| _MAR 1 - APR 1, 2025_ |  |  |  |
| Expo Application Services - Starter | 1 | $19.00 | $19.00 |
| **Total (USD)** |  |  | **$19.00** |

In the above example:

-   The first line item describes the EAS Build usage for the billing period of February 1 to March 1, 2025. It contains all the details about the number of Android and iOS builds created during this billing period and their cost.
-   The second line item describes the credit limit for the Starter plan ($25) for the billing period of February 1 to March 1, 2025.
-   The third line item describes the subscription charge for the Starter plan for the next billing period of March 1 to April 1, 2025.

Since the EAS Build usage doesn't exceed the plan's $45 credit amount, the subscriber only has to pay the $19 subscription amount for the Starter plan.

---

## Plans, Billing, and Payment FAQs
Source: https://docs.expo.dev/billing/faq/

A reference of commonly asked questions on Expo Application Services (EAS) plans, billing, and payment.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

This page covers frequently asked questions about plans, billing, and payment for [Expo Application Services (EAS)](/eas).

## Plans

### How can I update my plan?

To update your Organization account's plan, make sure that you have either an [Owner or Admin role privilege](/accounts/account-types#manage-access). For a Personal account, you always have an **Owner** role. See [Change the role of a member](/accounts/account-types#change-the-role-of-a-member) for more information.

After confirming your role, see [Upgrade to a new plan](/billing/manage#upgrade-to-a-new-plan) to upgrade or [Downgrade a plan](/billing/manage#downgrade-a-plan) to downgrade an existing plan.

### How can I cancel a plan?

See [Cancel a plan](/billing/manage#cancel-a-plan) for more information.

### What if I subscribe from the wrong account?

If you've subscribed to a plan from the wrong account:

-   From the EAS dashboard sidebar, click the account switcher at the top and select the account you intend to subscribe.
-   Go to [Billing](https://expo.dev/settings/billing) and under **Current Plan**, [follow the steps to subscribe to the right plan](/billing/manage#upgrade-to-a-new-plan).
-   From the wrong account, go to **[Receipts](https://expo.dev/accounts/%5Baccount%5D/settings/receipts)** and initiate a [request for a refund](/billing/invoices-and-receipts#request-a-refund).

### I am on a Free plan and only need a few extra builds or updates

If you are on a Free plan and have completed your monthly quota of free builds and updates, upgrade to the [Starter plan](/billing/plans). For $19 per month, you get $45 of build credit and 3,000 monthly active users for EAS Update (compared to 1,000 in the Free plan). Once your requirements are fulfilled, you can [downgrade to the Free plan from the Starter plan](/billing/manage#cancel-a-plan).

To upgrade from the Free plan to the Starter plan, see [Upgrade to a new plan](/billing/manage#upgrade-to-a-new-plan).

To downgrade from the Starter to a Free plan, see [Cancel a plan](/billing/manage#cancel-a-plan).

### I've run out of paid plan's EAS Build credits. Can I downgrade to the Free plan to use the free build credits?

No. If you are subscribed to a paid plan and use up your included EAS Build credits, additional builds are billed using [usage-based pricing](/billing/usage-based-pricing).

If you cancel your subscription, the Free plan will take effect after your current billing period ends. Once the paid subscription ends and your account is on the Free plan, you can use the Free plan's monthly quota (subject to its limits and reset schedule). See [Cancel a plan](/billing/manage#cancel-a-plan) for more details.

### Can I transfer my unused free plan credits when upgrading to a paid subscription?

No, your free plan credits are not transferable to another subscription plan. All paid plans provide credits to enable priority builds for EAS Build and broader access to EAS Update through more monthly active users and extra bandwidth.

## Billing

### When does a billing period start for a plan?

For the Free plan, the billing period starts on the first day of the calendar month.

For [all paid plans](/billing/plans#plans), the billing period starts from the subscription date of that plan.

### How do I update my billing information or add a tax ID?

To update your Organization account's billing information or add a tax ID, make sure that you have either an [Owner or Admin role](/accounts/account-types#manage-access). For a Personal account, you always have an **Owner** role. After confirming your role:

-   Go to your [account's Billing](https://expo.dev/settings/billing), and in the right sidebar, click **Manage billing**. This will take you to Stripe's portal.
-   On Stripe's portal, under **Billing information**, click on **Update information** to update billing-related information such as billing name, email, address, and tax ID.

See [Manage billing information](/billing/manage#manage-billing-information) for more details.

### Can I update the billing information on my last invoice?

No. Updating billing information will only be reflected on the next invoice.

### Can you email me the receipts?

No. Your account's Owner or Admin can download them. See [Download an invoice](/billing/invoices-and-receipts#download-and-view-an-invoice) for more information.

### How can I reduce the amount of EAS Build usage by using EAS Update?

Use [EAS Update](/eas-update/introduction) and [development builds](/develop/development-builds/introduction) to test and deploy new code without creating a new build. This option is better for most apps since JavaScript code changes more frequently than the underlying native code. You can create multiple test channels with EAS Update and reduce the need to create additional builds for your team.

You can also use a [fingerprint via EAS Workflows](/eas/workflows/examples/deploy-to-production) to create builds only when native code changes in your Android and iOS projects. Otherwise, for JavaScript-only changes, the workflow will skip creating a new build and publish updates through EAS Update.

For more information, see [How to optimize build usage](/billing/usage-based-pricing#how-to-optimize-build-usage).

### How do I know when I'm approaching my usage limits?

Expo automatically sends email notifications to account [Owners and Admins](/accounts/account-types#manage-access) when your account reaches 80% and 100% of your plan's included EAS Build credits. See [Usage notifications](/billing/usage-based-pricing#usage-notifications) for more details.

### How do I estimate my next bill?

To estimate your next bill, go to [Billing](https://expo.dev/settings/billing) and see the **Usage** section. You will find a summary of your EAS Build usage based on the [resource class](/build/eas-json#selecting-resource-class), EAS Update usage based on monthly active users and global edge bandwidth, and the amount spent for both.

See [How usage-based pricing works](/billing/usage-based-pricing#how-usage-based-pricing-works) for more information.

### What is an EAS Update monthly active user (MAU)?

A monthly active user (MAU) is a unique user of your app that downloads at least one update via EAS Update within a single monthly billing period. See [How are monthly active users counted for a billing period](/eas-update/introduction#how-are-monthly-active-users-counted-for) for more information.

## Payments

### Can I pay annually?

Annual plans are available for [Enterprise plan](/billing/plans#enterprise) customers. [Contact us](https://expo.dev/contact) for more information.

### How can I update our payment information?

To update your Organization account's payment information, make sure that you have either an [Owner or Admin role](/accounts/account-types#manage-access). For a Personal account, you always have an **Owner** role. After confirming your role:

-   Go to your [account's **Billing**](https://expo.dev/settings/billing), and in the right sidebar, click **Manage billing**. This will take you to Stripe's portal.
-   On Stripe's portal, under **Payment method**, click on **Add payment method** to add a new payment method.

See [Manage billing information](/billing/manage#payment-method) for more details.

### Can I pay with an Automated Clearing House (ACH), or bank/wire transfer?

[Enterprise plan](/billing/plans#enterprise) customers on annual plans can pay by ACH as an alternative to credit card payments. [Contact us](https://expo.dev/contact) for more information.

### I need a W-9, or other legal documentation

To request a W-9, [contact us](https://expo.dev/contact).

Find our legal terms at [expo.dev/terms](https://expo.dev/terms).

### Does Expo store my card information?

No, Expo does not. We use Stripe to handle the payment system and they do. See [how Stripe handles security](https://docs.stripe.com/security) for more information.

### How much did I pay for a large build this month?

To view the cost of a large build, go to [Billing](https://expo.dev/settings/billing) and see the **Usage** section. You will find a summary of your EAS Build usage based on the [resource class](/build/eas-json#selecting-resource-class) and the amount spent.

## Add-ons

### How do I increase build concurrencies on my account?

If you are already subscribed to a paid EAS plan, you can buy additional concurrencies in the [**Add-ons**](https://expo.dev/settings/billing) section under **Billing**.

If you are on the Free plan, you will need to set up a paid subscription. [Click here](https://expo.dev/accounts/%5Baccount%5D/settings/billing/cart) to choose a new plan. Then, select the number of additional concurrencies to add to your subscription on the checkout page.

Each plan has different number of concurrencies included. If you need more than 5 additional concurrencies, [contact us](https://expo.dev/contact).

---

## Usage-based pricing
Source: https://docs.expo.dev/billing/usage-based-pricing/

Learn how Expo applies usage-based billing for customers who exceed their plan quotas and how to monitor your EAS Build and EAS Update usage.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo applies usage-based billing for customers who exceed their [plan](/billing/plans) allowances. This enables our customers to use what they need without worrying about limitations or requiring contractual obligations.

Usage-based billing is enabled for EAS Build and EAS Update and is billed monthly. We provide an estimate of your existing usage and any overage charges on your [account's Billing](https://expo.dev/settings/billing).

## How usage-based pricing works

### EAS Build

For EAS Build, a flat fee is charged for an individual build executed at higher-priority levels. This is totaled monthly and charged at the end of your billing period or sooner if you cancel your plan.

> **Note**: Builds that are canceled before any work is done are not charged.

[Starter, Production, Enterprise, and Legacy plans](/billing/plans#plans) subscribers receive credits for EAS Build. These credits can be used to offset the cost of builds. They are reset at the start of the billing period and expire at the end of that billing period. Visit our [pricing page](https://expo.dev/pricing) for more information on the pricing schedule for supported build platforms and the available resource classes.

#### Example: EAS Build credit usage (Production plan)

Consider an account subscribed to the Production plan that has 15 medium Android builds, and 10 large iOS builds in a billing period:

| Description | Price | Quantity | Total |
| --- | --- | --- | --- |
| Android builds (medium) | $1 | 15 | $15 |
| iOS builds (large) | $4 | 10 | $40 |
| EAS Build Credit |  |  | -$55 |
| **Total (USD)** |  |  | **$0** |

Since the credit is included in the Production plan, the subscriber pays $0 for their 25 builds.

#### Example: EAS Build credit exceeded (Production plan)

Consider another example where the credit limit is exceeded:

| Description | Price | Quantity | Total |
| --- | --- | --- | --- |
| Android builds (medium) | $1 | 20 | $20 |
| Android builds (large) | $2 | 10 | $20 |
| iOS builds (medium) | $2 | 30 | $60 |
| iOS builds (large) | $4 | 40 | $160 |
| EAS Build Credit |  |  | -$225 |
| **Total (USD)** |  |  | **$35** |

In this scenario, the subscriber pays $35 for 100 builds instead of $260 because the EAS Build Credit covers $225.

### EAS Update

> **Tip:** Use the [pricing calculator](https://expo.dev/pricing#update) to estimate your EAS Update usage.

Usage-based pricing for EAS Update comprises two metrics: monthly active users and global edge bandwidth.

The "updated users" reflect the number of unique users who download at least one update in a billing period, also known as "monthly active users" (MAU). Global edge bandwidth represents the total amount of bandwidth used beyond your subscription plan's base bandwidth allocation. If your monthly active users exceed your plan's base MAU allocation, 40 MiB of global edge bandwidth is included for each additional user.

> **Note**: A monthly active user counts only once per billing period, regardless of how many updates this user downloads. In the context of EAS Update, a "user" is considered a unique installation of your app on a device.

Each plan has a number of monthly active users and global edge bandwidth included as part of the subscription. These differ for each plan. For the most updated numbers, see our [pricing page](https://expo.dev/pricing).

#### Example: EAS Update usage (Starter plan)

Consider a subscriber to the Starter plan who deploys 20 updates of 5 MiB each via EAS Update to 10,000 users. The subscription to the plan includes 3,000 monthly active users and 100 GiB per month. As a result, the subscriber's bill for extra usage will be:

| Description | Price | Quantity | Total |
| --- | --- | --- | --- |
| Updated users | $0.005 per user | 7,000 | $35 |
| Global edge bandwidth | $0.10 per GiB | 603.13 GiB | $60.31 |
| **Total (USD)** |  |  | **$95.31** |

Out of the 10,000 users, 3,000 are included in the Starter plan. As a result, 7,000 are billed for as part of usage-based billing. Paying for 7,000 updated users also includes approximately 273.4 GiB (7000 users * 40 MiB / 1024).

The global edge bandwidth calculation is:

| Description | Calculation | Quantity |
| --- | --- | --- |
| Bandwidth used to send updates | 20 updates * 5 MiB * 10,000 users | 976.5625 GiB |
|  |  |  |
| Bandwidth included in plan |  | 100 GiB |
| Bandwidth included with 7,000 extra updated users | 7,000 * 40 MiB | 273.4375 GiB |
| **Total** | **976.5625 - 100 - 273.4375** | **603.125 GiB** |

If the same subscriber sends the 21st update of 5 MiB to the same 10,000 users in the current billing period, they will only pay for any extra bandwidth used.

| Description | Calculation | Quantity |
| --- | --- | --- |
| Bandwidth used to send updates | 21 updates * 5 MiB * 10,000 users | 1,025.39 GiB |
|  |  |  |
| Bandwidth included in plan |  | 100 GiB |
| Bandwidth included with 7,000 extra updated users | 7,000 * 40 MiB | 273.4375 GiB |
| **Total** | **1,025.39 - 100 - 273.4375** | **651.95 GiB** |

This is because Expo only charges for [unique monthly active users](/eas-update/introduction#how-are-monthly-active-users-counted-for). As a result, the subscriber's bill for extra usage will be:

| Description | Price | Quantity | Total |
| --- | --- | --- | --- |
| Updated users | $0.005 per user | 7,000 | $35 |
| Global edge bandwidth | $0.10 per GiB | 651.95 GiB | $65.2 |
| **Total (USD)** |  |  | **$100.2** |

If the same subscriber is on a Production plan, they will pay $0 as the Production plan includes 50,000 monthly active users and 1 TiB (1024 GiB). As such, there is no extra bandwidth usage.

## Monitor usage

> **Note**: Billing estimates shown may be delayed by up to 24 hours (one day).

To see the current billing period's usage summary, go to [Billing > **Usage**](https://expo.dev/settings/billing). You will find a usage summary for EAS Build, EAS Update, and other services.

### EAS Build usage history

To see detailed EAS Build usage for a current or previous billing period:

-   Click **Usage** in the navigation menu.
-   Under the **EAS Build** section, you will find details on builds count and executed builds based on their platform and resource class.

### EAS Update usage history

To see detailed EAS Update usage for a current or previous billing period:

-   Click **Usage** in the navigation menu.
-   Under the **EAS Update** section, you will find details on updated users and global edge bandwidth details.

### Usage notifications

Expo sends email notifications to account [Owners and Admins](/accounts/account-types#manage-access) when your account reaches **80%** and **100%** of your plan's included EAS Build credits. This helps you anticipate overage charges before they occur.

These notifications are enabled by default. You can manage your notification preferences from the **Email notifications** page in your [EAS dashboard](https://expo.dev/settings/billing).

### How to optimize build usage

You can use [EAS Update](/eas-update/introduction) and [development builds](/develop/development-builds/introduction) to test and deploy new code without having to create an entirely new build. This will help you iterate faster and reduce build usage.

For most apps, the JavaScript code changes more frequently than the underlying native code and configuration. If you are building a new build every time for code changes, consider [using EAS Update to take advantage of the different iteration frequency](/eas-update/how-it-works) between JavaScript and native code. This way, you can ship those changes as an update instead.

When using Continuous Integration (CI)/Continuous Deployment (CD) to build pre-production code, you can reduce unnecessary usage by automating the process of building only when changes are made to the native code. You can create a workflow in your CI/CD using [Expo Fingerprint](https://expo.dev/blog/fingerprint-your-native-runtime) to detect when your native code has changed, and only execute a build if it has changed. Otherwise, publish an update if the native code has not changed.

A development build can run any EAS Update that is compatible with its native runtime. If you are using EAS Update with multiple testing channels, you can reduce the need for creating additional builds by having your testers or test devices use the same development build.

### How to optimize update usage

You can manage certain assets to include or exclude when using EAS Update. This reduces the number of assets uploaded or downloaded from the updates server and the global edge bandwidth used.

To optimize storage and bandwidth usage, you can choose to exclude assets that haven't been modified. For example, images or videos that haven't been changed can be excluded. Excluded assets won't be uploaded to the update server and won't be downloaded by the app. However, it's important to make sure that assets that are not part of an update are included in the native build of the app.

> **Note**: If an app has already downloaded an asset that is also part of a new update, the app will not re-download that asset. This will also not add to your account's bandwidth usage.

You can use `npx expo-updates assets:verify <dir>` to check all required assets are included in the update. For more information, see [Asset selection and exclusion](/eas-update/asset-selection).

---

## Distribution: Overview
Source: https://docs.expo.dev/distribution/introduction/

An overview of submitting an app to the app stores or with the internal distribution.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Get your app into the hands of users by submitting it to the app stores or with [Internal Distribution](/build/internal-distribution).

```sh
# npm
npm install --global eas-cli
eas build --auto-submit
eas submit

# yarn
yarn global add eas-cli
eas build --auto-submit
eas submit

# pnpm
pnpm add --global eas-cli
eas build --auto-submit
eas submit

# bun
bun add --global eas-cli
eas build --auto-submit
eas submit
```

You can run `eas build --auto-submit` with [EAS CLI](/eas) to build your app and automatically upload the binary for distribution on the Google Play Store and Apple App Store.

This automatically manages **all native code signing** for Android and iOS for any React Native app. Advanced features such as payments, notifications, universal links, and iCloud can be automatically enabled based on your [config plugins](/config-plugins/introduction) or native entitlements, meaning no more wrestling with slow portals to get libraries set up correctly.

### Get started

[Submit to the Google Play Store](/submit/android) --- Learn how to submit an Android app to the Google Play Store.

[Submit to the Apple App Store](/submit/ios) --- Learn how to submit an iOS or an iPadOS app to the Apple App Store from any operating system.

[Internal Distribution](/build/internal-distribution) --- Share your mobile app internally with testers using AdHoc builds.

[Publish websites](/guides/publishing-websites) --- Export your website and upload to any web host.

[OTA updates](/eas-update/introduction) --- Send over-the-air updates to your users instantly.

---

## App stores best practices
Source: https://docs.expo.dev/distribution/app-stores/

Learn about the best practices when submitting an app to the app stores.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

This guide offers best practices for submitting your app to the app stores. To learn how to generate native binaries for submission, see [Create your first build](/build/setup).

> **Disclaimer:** Review guidelines and rules are updated frequently, and enforcement of various rules can sometimes be inconsistent. There is no guarantee that your particular project will be accepted by either platform, and you are ultimately responsible for your app's behavior. That said, you can re-submit your app as needed to address feedback from reviews.

[Versioning your app](/build-reference/app-versions) --- Learn how to configure native runtime versions for your apps.

[App Store presence](/eas/metadata) --- Manage your Apple App Store metadata from the command line.

[Permissions](/guides/permissions) --- Refine native permissions and system dialog messages by using app config.

[App icons](/develop/user-interface/splash-screen-and-app-icon) --- App stores have strict rules for home screen icons.

[Splash screen](/develop/user-interface/splash-screen-and-app-icon) --- Create a seamless loading experience using the splash screen API.

[App store assets](/guides/store-assets) --- Learn how to create screenshots and previews for your app's store pages.

[Localizing your app](/guides/localization) --- Prepare versions of your app for different languages and regions.

[Apple: Review guidelines](https://developer.apple.com/distribute/app-review/) --- Official Apple guide on preparing your app for App Store review.

## Responsive design

It's a good idea to test your app on a device or simulator with a small screen (for example, an iPhone SE) and a large screen (for example, an iPhone X). Ensure your components render the way you expect, no buttons are blocked, and all text fields are accessible.

Try your app on tablets in addition to handsets. Even if you have `ios.supportsTablet: false` configured, your app will still render at phone resolution on iPads and must be usable.

> Apple may reject your app if elements don't render properly on an iPad, even if your app doesn't target the iPad form factor. Be sure to test your app on an iPad (or iPad simulator).

## Privacy policy

Starting October 3, 2018, all new iOS apps and app updates will be required to have a privacy policy to pass the App Store Review Guidelines.

### App privacy questions

Beginning December 8, 2020, new app submissions and updates are required to provide information about their privacy practices in App Store Connect. See [App privacy details on the App Store](https://developer.apple.com/app-store/app-privacy-details/) for more information.

Apple will ask you a series of questions when you submit the app. Depending on which libraries you use, your answers may vary. For example, if you use `expo-updates`, you will need to say **Yes, we collect data from this app** and then you will want to select **Crash Data**.

---

## App transfers
Source: https://docs.expo.dev/distribution/app-transfers/

An overview of transferring the ownership of an app to a different entity.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

There are two different representations of your app to consider when handing over ownership to another entity: the app as it exists on Expo Application Services (to create builds with EAS Build, send updates with EAS Update, and so on) and the app records on the app stores (to distribute the app to end-users). The following guides explain how to handle app transfers in each case.

[EAS project transfers](/accounts/account-types#transfer-projects-between-accounts) --- Transfer an EAS project to a different Expo account.

[Google project transfers](https://support.google.com/googleplay/android-developer/answer/6230247) --- Transfer an Android app to a different Google Play developer account.

[Apple project transfers](https://developer.apple.com/help/app-store-connect/transfer-an-app/overview-of-app-transfer) --- Transfer an iOS app to a different Apple Developer account.

---

## Understanding app size
Source: https://docs.expo.dev/distribution/app-size/

Learn about how to determine what the actual size of your app will be when distributed to users, and how to get insights into your app size and optimize it.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

A common concern for developers is how much space their app takes up on the app store. This guide will help you:

-   Understand what different build artifacts are used for
-   Figure out the actual size of your app when distributed to users
-   Get insights into your app size and optimize it

## Why is my app so big?

**It probably isn't, actually!** When examining the resulting artifact of a release build for an app, it's common for developers who are unfamiliar with native Android and iOS development to be surprised by the file size --- it's usually much larger than they would expect for an app if they were to download it from an app store. **This is not the actual size of your app, which will be distributed on app stores!** When people talk about app sizes, they mean the size of the app that they will download to their device, not the size that will be uploaded to app stores or shared in development and testing.

There are various types of build artifacts that serve different purposes, and they are almost all larger than what users will see when they download your app from a store. This is because these builds are not optimized to target specific devices like they would when downloading from a store, but rather they typically include all of the code and resources that your app needs to run on a wide range of devices.

## Android apps

There are two types of Android build artifacts that you will interact with: APKs and AABs.

### `.apk` (Android Package)

When you build an APK with Gradle in a React Native project, the default behavior is to create a universal binary, which contains all the resources for all the different device types that your app supports. For example, it includes asset for every screen size, every CPU architecture, and every language, even though a single device will only need one of each. This means you can share this one file with anybody to install directly to their device, perhaps with [Orbit](https://expo.dev/orbit) or `adb` directly, and that will work.

Of course, if you're running an incredibly popular app store that serves millions of users, you don't want to send the same 50 MB file to every single user, especially if they're only going to use a fraction of the resources in the APK. This is why the Google Play Store and other app stores have a feature called "App Bundles" (Android) that allows you to upload a single binary and then the store will generate a custom binary for each user based on their device's needs.

### `.aab` (Android App Bundle)

On Android, all new apps submitted to the Play Store must be built as an [Android App Bundle (.aab)](https://developer.android.com/platform/technology/app-bundle). Once you have submitted the binaries to their respective stores, you will be able to see the download size for various device types.

### Determining Android app download and install size

Typically, what app developers care about the "download size" on the Play Store (what the users see in the store listing when they go to download the app). This will be the size of the APK that Google Play generates from your AAB, which is tailored to the user's device.

The only truly accurate way to see what your final app size will be shipped to users is to upload your app to the stores and download it on a physical device. Google Play also provides a reliable estimate for the expected download size on your developer dashboard. You can find this under the **App size** page in **Android vitals** on the [Google Play Developer Console](https://play.google.com/console/). For more information, see [Optimize your app's size and stay within Google Play app size limits](https://support.google.com/googleplay/android-developer/answer/9859372?hl=en).

Why did my APK size increase after upgrading to React Native 0.73 and above?

React Native 0.73 bumped the Android `minSdkVersion` to `23`. This had the side effect of changing the default value of [`extractNativeLibs`](https://developer.android.com/guide/topics/manifest/application-element#extractNativeLibs%60) to `false`.

> If set to `false`, your native libraries are stored uncompressed in the APK. Although your APK might be larger, your application loads faster because the libraries load directly from the APK at runtime.

The following table shows that while the APK size increased, which may slightly impact download time for testers with [internal distribution](/build/internal-distribution), the Google Play Store size remained the same.

| SDK | APK (debug variant) | APK (release variant) | AAB | Google Play |
| --- | --- | --- | --- | --- |
| 49 | 66 MB | 27.6 MB | 28.2 MB | 11.7 MB |
| 50 | 168.1 MB | 62.1 MB | 27.4 MB | 11.7 MB |

If you would like to revert to the previous behavior, you can set `useLegacyPackaging` to `true` in your **gradle.properties** or by using [`expo-build-properties`](/versions/latest/sdk/build-properties).

## iOS apps

The download size on the App Store of a minimal React Native app (created using the blank template) [is just under 4 MB](https://x.com/aleqsio/status/1844045829973344457).

There are two types of iOS build artifacts that you will interact with: APPs and IPAs.

### `.app` (iOS application bundle)

This is the actual application bundle for your app. When you download and install a build of your app into an iOS Simulator, you are downloading the `.app` bundle. These can either target specific architectures or be universal binaries. The size of your `.app` doesn't necessarily tell you too much about what the download size of your app will be on the store. You can't install a `.app` file directly to a physical iOS device.

### `.ipa` (iOS App Store Package)

IPA files are [ZIP](https://en.wikipedia.org/wiki/ZIP) files that include the `.app` bundle and other resources that are needed to run the app on an iOS device. They are used for various types of distribution, including App Store, Ad Hoc, Enterprise, and TestFlight.

They include security and code signing information, such as the provisioning profile and entitlements. The App Store will process the IPA file and split it into smaller binaries for each device type, so the size of the IPA also does not represent the download size of your app.

### Determining iOS app download and install size

Typically, app developers care about the "download size" on the App Store (what the users see in the store listing when they go to download the app). This will be the size of the split IPA generated by the store from your universal IPA.

The only truly accurate way to see what your final app size will be shipped to users is to upload your app to the App Store and download it on a physical device. You can get accurate estimates from TestFlight: on [App Store Connect](https://appstoreconnect.apple.com/), navigate to TestFlight and select your build by clicking on the build number, then switch to the **Build Metadata** tab and click **App File Sizes**. You will see a list of estimated download and install sizes depending on the device type. Actually install sizes may also vary slightly depending on the iOS version of the device.

## Optimizing app size

As you add features to your app, you will add code, libraries, and assets, which may increase its size. If app size is important to you and your users, you may want to routinely review the size and optimize it. The following sections will help you understand what you can do to optimize several aspects of your app.

### Static assets

One of the most common sources of app size bloat is assets, such as fonts, icons, images, videos, and sounds. These can come from the assets that you import directly into your code, as well as JavaScript and native libraries. You won't be able to get a complete picture by reviewing your app assets directory.

Start by examining a build artifact to determine what assets are included in it.

-   For Android, you can use [Android APK Analyzer](https://developer.android.com/studio/debug/apk-analyzer) or [apktool](https://apktool.org/) to inspect the contents of your app
-   For iOS, rename an IPA file from `app.ipa` to `app.zip` and extract it to examine the contents, using the macOS utility `assetutil` to inspect **Assets.car**.

### JavaScript bundle size

To analyze JavaScript bundles, [use Expo Atlas](/guides/analyzing-bundles). You may find libraries that you thought were very small actually have a large impact on the bundle, or that you forgot to remove a library after you stopped using it, and so on.

### Platform-specific optimizations

Independent of React Native and Expo, you can optimize your app for Android and iOS by using the following tools:

[Android Developers: Reduce your app size](https://developer.android.com/topic/performance/reduce-apk-size) --- Advice directly from Google about reducing your Android app size.

[Apple Developer: Reducing your app's size](https://developer.apple.com/documentation/xcode/reducing-your-app-s-size) --- Advice directly from Apple about reducing your iOS app size.

---

## Expo Structured Field Values
Source: https://docs.expo.dev/technical-specs/expo-sfv-0/

Version 0

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Structured Field Values for HTTP, [IETF RFC 8941](https://tools.ietf.org/html/rfc8941), is a proposal to formalize header syntax and facilitate nested data.

Since it is still a work in progress, Expo maintains a custom version that only implements the following subset of the protocol defined in [IETF RFC 8941](https://tools.ietf.org/html/rfc8941):

-   All key values
-   String, integer, and decimal items
-   Dictionaries

---

## Expo Updates v1
Source: https://docs.expo.dev/technical-specs/expo-updates-1/

Version 1

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## Introduction

This is the specification for Expo Updates, a protocol for delivering updates to Expo apps running on multiple platforms.

### Conformance

Conforming servers and client libraries must fulfill all normative requirements. Conformance requirements are described in this document by both descriptive assertions and key words with clearly defined meanings.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in the normative portions of this document are to be interpreted as described in [IETF RFC 2119](https://tools.ietf.org/html/rfc2119). These key words may appear in lowercase and still retain their meaning unless explicitly declared as non-normative.

A conforming implementation of this protocol MAY provide additional functionality, but MUST NOT where explicitly disallowed or would otherwise result in non-conformance. Where relevant, unknown fields should be allowed and ignored by conforming clients.

### Overview

Conforming servers and client libraries MUST follow the HTTP spec as described in [RFC 7231](https://tools.ietf.org/html/rfc7231) as well as the more precise guidance described in this spec.

-   An _update_ is defined as a [_manifest_](/technical-specs/expo-updates-1#manifest-body) together with the assets referenced inside the manifest.
-   A [_directive_](/technical-specs/expo-updates-1#directive-body) is defined as a message from the server that instructs clients to perform an action.

Expo Updates is a protocol for assembling and delivering updates and directives to clients.

The primary audiences of this spec are Expo Application Services and organizations that wish to manage their own update server to satisfy internal requirements.

## Client

> See the [reference client library](https://github.com/expo/expo/tree/main/packages/expo-updates).

An app running a conformant Expo Updates client library MUST load the most recent _update_ saved in the client library's update database, possibly after filtering by the contents of the update's manifest [_metadata_](/technical-specs/expo-updates-1#manifest-body).

The following describes how a conformant Expo Updates client library MUST retrieve a new update from a conformant server:

1.  The client library MUST make a [request](/technical-specs/expo-updates-1#request) for the most recent update and directive, with constraints specified in the headers.
2.  If a [response](/technical-specs/expo-updates-1#response) is received, the client library MUST process its contents:
    -   For a response containing an _update_, the client library SHALL proceed to make additional requests to download and store any new assets specified in the manifest. The manifest and assets together are considered a new _update_. The client library will edit its local state to reflect that a new update has been added to the local storage. It will also update the local state with the new `expo-manifest-filters` and `expo-server-defined-headers` found in the response [headers](/technical-specs/expo-updates-1#manifest-response-headers).
    -   For a response containing a _directive_, the client library will consume the directive depending on the directive type and edit its local state accordingly.

## Request

A conformant client library MUST make a GET request with the headers:

1.  `expo-protocol-version: 1`, to specify version 1 of this Expo Updates specification.
2.  `expo-platform`, to specify the platform type the client is running on.
    -   iOS MUST be `expo-platform: ios`.
    -   Android MUST be `expo-platform: android`.
    -   If it is not one of these platforms, the server SHOULD return a 400 or a 404
3.  `expo-runtime-version` MUST be a runtime version compatible with the client. A runtime version stipulates the native code setup a client is running. It should be set when the client is built. For example, in an iOS client, the value may be set in a plist file.
4.  Any headers stipulated by a previous responses' [server defined headers](/technical-specs/expo-updates-1#response).

A conformant client library MAY send one of `accept: application/expo+json`, `accept: application/json`, or `accept: multipart/mixed` based on the [supported response structures](/technical-specs/expo-updates-1#response), though it SHOULD send `accept: application/expo+json, application/json, multipart/mixed`. A conformant client library MAY express preference using "q" parameters as specified in [RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231#section-5.3.1), which default to `1`.

A conformant client library configured to perform [code signing](/technical-specs/expo-updates-1#code-signing) verification MUST send a `expo-expect-signature` header to indicate that it expects the conformant server to include the `expo-signature` header in the manifest response. `expo-expect-signature` is an [Expo SFV](/technical-specs/expo-sfv-0) dictionary which MAY contain any of the following key value pairs:

-   `sig` SHOULD contain the boolean `true` to indicate that it requires a conformant server to respond with the signature in the `sig` key.
-   `keyid` SHOULD contain the keyId of the public key the client will use to verify the signature
-   `alg` SHOULD contain the algorithm the client will use to verify the signature

Example:

```text
expo-protocol-version: 1
accept: application/expo+json;q=0.9, application/json;q=0.8, multipart/mixed
expo-platform: *
expo-runtime-version: *
expo-expect-signature: sig, keyid="root", alg="rsa-v1_5-sha256"
```

## Response

A conformant server MUST return a response structured in at least one of the two following response structures, MAY support either or both response structures, and when an unsupported response structure is requested the server SHOULD respond with an HTTP `406` error status. A server that wishes to respond with an incompatible response for the requested protocol version SHOULD also respond with an HTTP `406` error status instead.

-   For a response with `content-type: application/json` or `content-type: application/expo+json`, the [common response headers](/technical-specs/expo-updates-1#common-response-headers) and [other response headers](/technical-specs/expo-updates-1#other-response-headers) MUST be sent in the response headers and the [manifest body](/technical-specs/expo-updates-1#manifest-body) MUST be sent in the response body. This format of response does not support multiple response parts and therefore does not support _directives_, and SHOULD respond with an HTTP `406` error status when the most recent response to be served is not an _update_.
-   For a response with `content-type: multipart/mixed`, the response MUST be structured as specified in the [multipart response](/technical-specs/expo-updates-1#multipart-response) section.
-   A [multipart response](/technical-specs/expo-updates-1#multipart-response) with no parts MAY respond with an HTTP `204` status and no content, and thus no `content-type` response header.

The choice of update and headers are dependent on the values of the request headers. A conformant server MUST respond with the most recent update, ordered by creation time, satisfying all parameters and constraints imposed by the [request headers](/technical-specs/expo-updates-1#request). The server MAY use any properties of the request like its headers and source IP address to choose among several updates that all satisfy the request's constraints.

### Common response headers

```text
expo-protocol-version: 1
expo-sfv-version: 0
expo-manifest-filters: <expo-sfv>
expo-server-defined-headers: <expo-sfv>
cache-control: *
content-type: *
```

-   `expo-protocol-version` describes the version of the protocol defined in this spec and MUST be `1`.
-   `expo-sfv-version` MUST be `0`.
-   `expo-manifest-filters` is an [Expo SFV](/technical-specs/expo-sfv-0) dictionary. It is used to filter updates stored by the client library by the `metadata` attribute found in the [manifest](/technical-specs/expo-updates-1#manifest-body). If a field is mentioned in the filter, the corresponding field in the metadata must either be missing or equal for the update to be included. The client library MUST store the manifest filters until it is overwritten by a newer response.
-   `expo-server-defined-headers` is an [Expo SFV](/technical-specs/expo-sfv-0) dictionary. It defines headers that a client library MUST store until overwritten by a newer dictionary, and they MUST be included in every subsequent [update request](/technical-specs/expo-updates-1#request).
-   `cache-control` MUST be set to an appropriately short period of time. A value of `cache-control: private, max-age=0` is recommended to ensure the newest manifest is returned. Setting longer cache ages could result in stale updates.
-   `content-type` MUST be determined by _proactive negotiation_ as defined in [RFC 7231](https://tools.ietf.org/html/rfc7231#section-3.4.1). Since the client library is [required](/technical-specs/expo-updates-1#request) to send an `accept` header with each manifest request, this will always be either `application/expo+json`, `application/json`; otherwise the request would return a `406` error.

### Other response headers

```text
expo-signature: *
```

-   `expo-signature` SHOULD contain the signature of the manifest to be used during the validation step of [code signing](/technical-specs/expo-updates-1#code-signing) if the request for the manifest contained the `expo-expect-signature` header. This is an [Expo SFV](/technical-specs/expo-sfv-0) dictionary which MAY contain any of the following key value pairs:
    -   `sig` MUST contain the signature of the manifest. The name of this field matches that of `expo-expect-signature`.
    -   `keyid` MAY contain the keyId of the key the server used to sign the response. The client SHOULD use the certificate that matches this `keyid` to verify the signature.
    -   `alg` MAY contain the algorithm the server used to sign the response. The client SHOULD use this field only if it matches the algorithm defined for the certificate matching `keyid`.

### Multipart response

An update response of this format is defined by the `multipart/mixed` MIME type as defined by [RFC 2046](https://tools.ietf.org/html/rfc2046#section-5.1).

Headers for this response format are the [common response headers](/technical-specs/expo-updates-1#common-response-headers), with the following exceptions:

-   `content-type` SHOULD have a `multipart/mixed` value as defined by [RFC 2046](https://tools.ietf.org/html/rfc2046#section-5.1)

Part order is not strict. A multipart response with no parts (zero-length body) should be considered a no-op (no updates or directives available), though headers for the response SHOULD be sent nevertheless and processed by the client.

Each part is defined as follows:

1.  OPTIONAL `"manifest"` part:
    -   MUST have part header `content-disposition: form-data; name="manifest"`. The first parameter (`form-data`) does not need to be `form-data`, but the `name` parameter must have `manifest` as a value.
    -   MUST have part header `content-type: application/json` or `application/expo+json`.
    -   SHOULD have part header `expo-signature` as defined in [other response headers](/technical-specs/expo-updates-1#other-response-headers) if code signing is being used.
    -   The [manifest body](/technical-specs/expo-updates-1#manifest-body) MUST be sent in the part body.
2.  OPTIONAL `"extensions"` part:
    -   MUST have part header `content-disposition: form-data; name="extensions"`. The first parameter (`form-data`) does not need to be `form-data`, but the `name` parameter must have `extensions` as a value.
    -   MUST have part header `content-type: application/json`.
    -   The [extensions-body](/technical-specs/expo-updates-1#extensions-body) MUST be sent in the part body.
3.  OPTIONAL `"directive"` part:
    -   MUST have part header `content-disposition: form-data; name="directive"`. The first parameter (`form-data`) does not need to be `form-data`, but the `name` parameter must have `directive` as a value.
    -   MUST have part header `content-type: application/json` or `application/expo+json`.
    -   SHOULD have part header `expo-signature` as defined in [other response headers](/technical-specs/expo-updates-1#other-response-headers) if code signing is being used.
    -   The [directive body](/technical-specs/expo-updates-1#directive-body) MUST be sent in the part body.

### Manifest body

Defined as JSON conforming to both the following `Manifest` definition expressed in [TypeScript](https://www.typescriptlang.org/) and the detailed descriptions for each field:

```ts
type Manifest = {
  id: string;
  createdAt: string;
  runtimeVersion: string;
  launchAsset: Asset;
  assets: Asset[];
  metadata: { [key: string]: string };
  extra: { [key: string]: any };
};

type Asset = {
  hash?: string;
  key: string;
  contentType: string;
  fileExtension?: string;
  url: string;
};
```

-   `id`: The ID MUST uniquely specify the manifest and MUST be a UUID.
-   `createdAt`: The date and time at which the update was created is essential as the client library selects the most recent update (subject to any constraints supplied by the `expo-manifest-filters` header). The datetime should be formatted according to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
-   `runtimeVersion`: Can be any string defined by the developer. It stipulates what native code setup is required to run the associated update.
-   `launchAsset`: A special asset that is the entry point of the application code. The `fileExtension` field will be ignored for this asset and SHOULD be omitted.
-   `assets`: An array of assets used by the update bundle, such as JavaScript, pictures, and fonts. All assets (including the `launchAsset`) should be downloaded to disk before executing the update, and a mapping of asset `key`s to locations on disk should be provided to application code.
-   Properties of each asset object:
    -   `hash`: Base64URL-encoded SHA-256 hash of the file to guarantee integrity. Base64URL encoding is defined by [IETF RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5).
    -   `key`: Key used to reference this asset from the update's application code. This key, for example, may be generated by a separate build step that processes the application code, such as a bundler.
    -   `contentType`: The MIME type of the file as defined by [RFC 2045](https://tools.ietf.org/html/rfc2045). For example, `application/javascript`, `image/jpeg`.
    -   `fileExtension`: The suggested extension to use when a file is saved on a client. Some platforms, such as iOS, require certain file types to be saved with an extension. The extension MUST be prefixed with a `.`. For example, **.jpeg**. In some cases, such as the launchAsset, this field will be ignored in favor of a locally determined extension. If the field is omitted and there is no locally stipulated extension, the asset will be saved without an extension. For example, `./filename` with no `.` at the end. A conforming client SHOULD prefix a file extension with a `.` if a file extension is not empty and missing the `.` prefix.
    -   `url`: Location at which the file may be fetched.
-   `metadata`: The metadata associated with an update. It is a string-valued dictionary. The server MAY send back anything it wishes to be used for filtering the updates. The metadata MUST pass the filter defined in the accompanying `expo-manifest-filters` header.
-   `extra`: For storage of optional "extra" information such as third-party configuration. For example, if the update is hosted on Expo Application Services (EAS), the EAS project ID may be included:
    ```json
    "extra": {
      "eas": {
        "projectId": "00000000-0000-0000-0000-000000000000"
      }
    }
    ```

### Extensions body

Defined as JSON conforming to both the following `Extensions` definition expressed in [TypeScript](https://www.typescriptlang.org/) and the detailed descriptions for each field:

```ts
type Extensions = {
  assetRequestHeaders: ExpoAssetHeaderDictionary;
  ...
}

type ExpoAssetHeaderDictionary = {
  [assetKey: string]: {
    [headerName: string]: string,
  };
}
```

-   `assetRequestHeaders`: MAY contain a dictionary of header (key, value) pairs to include with asset requests. Key and value MUST both be strings.

### Directive body

Defined as JSON conforming to both the following `Directive` definition expressed in [TypeScript](https://www.typescriptlang.org/) and the detailed descriptions for each field:

```ts
type Directive = {
  type: string;
  parameters?: { [key: string]: any };
  extra?: { [key: string]: any };
};
```

-   `type`: The type of directive.
-   `parameters`: MAY contain any extra information specific to the `type`.
-   `extra`: For storage of optional "extra" information such as third-party information. For example, if the update is hosted on Expo Application Services (EAS), the EAS project ID may be included.

A conformant client library and server MAY specify and implement directive types specific to the needs of the application. For example, Expo Application Services makes use of one type thus far, `rollBackToEmbedded`, which directs the expo-updates library to use the update embedded in the host application instead of any other downloaded updates.

## Asset request

A conformant client library MUST make a GET request to the asset URLs specified by the manifest. The client library SHOULD include a header accepting the asset's content type as specified in the manifest. Additionally, the client library SHOULD specify the compression encoding the client library is capable of handling.

Example headers:

```text
accept: image/jpeg, */*
accept-encoding: br, gzip
```

A conformant client library MUST also include any header (key, value) pairs included in [`assetRequestHeaders`](/technical-specs/expo-updates-1#manifest-extensions) for this asset key.

## Asset response

An asset located at a particular URL MUST NOT be changed or removed since client libraries may fetch assets for any update at any time. A conformant client MUST verify that the base64url-encoded SHA-256 hash of the asset matches the `hash` field for the asset from the manifest.

### Asset response headers

The asset MUST be encoded using a compression format that the client supports according to the request's `accept-encoding` header. The server MAY serve uncompressed assets. The response MUST include a `content-type` header with the MIME type of the asset. For example:

```text
content-encoding: br
content-type: application/javascript
```

An asset is RECOMMENDED to be served with a `cache-control` header set to a long duration as an asset located at a given URL must not change. For example:

```text
cache-control: public, max-age=31536000, immutable
```

### Compression

Assets SHOULD be capable of being served with [Gzip](https://www.gnu.org/software/gzip/) and [Brotli](https://github.com/google/brotli) compression.

## Code signing

Expo Updates supports code signing the manifest and directive bodies. Code signing the manifest also transitively signs the assets since their hashes are present in the manifest and verified by a conformant client. A conformant client MAY request the manifest or directive be signed using a private key, and then MUST verify the signature of the manifest or directive using the corresponding code signing certificate before it is used or any corresponding manifest assets are downloaded. The client MUST verify that the signing certificate is either a self-signed, trusted root certificate or is in a certificate chain signed by a trusted root certificate. In either case, the root certificate MUST be embedded in the application or device's operating system.

---

## Additional resources
Source: https://docs.expo.dev/additional-resources/

A reference of resources that are useful to learn about Expo tooling and services.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The following resources are useful for learning about Expo tooling and services.

## External resources

### Expo team communication

-   [Blog](https://expo.dev/blog) - Our official blog, where we post release notes every month and other Expo related content at random intervals.
-   [Changelog](https://expo.dev/changelog) - Our official changelog, where we post information about EAS, web dashboard and other Expo services related changes at random intervals.

### GitHub

-   [expo/expo](https://github.com/expo/expo) - Expo Go, SDK, Docs, and the Expo CLI.
-   [expo/eas-cli](https://github.com/expo/eas-cli) - The fastest way to build, submit, and update Android and iOS apps.
-   [expo/examples](https://github.com/expo/examples) - Integrations and other examples.
-   [expo/config-plugins](https://github.com/expo/config-plugins) - Expo Config Plugins for working with third-party packages.
-   [expo/snack](https://github.com/expo/snack) - Build apps from the browser.
-   [expo/vscode-expo](https://github.com/expo/vscode-expo) - VS Code extension for working with Expo tools.
-   [expo/vscode-expo-theme](https://github.com/expo/vscode-expo-theme) - VS Code theme created by Expo team.
-   [expo/fyi](https://github.com/expo/fyi) - Troubleshooting guides for Expo tools and services.
-   [expo/orbit](https://github.com/expo/orbit) - Launch builds and start simulators from your macOS menu bar, Windows task bar, or Linux system tray.

### Documentation

-   [React Native](https://reactnative.dev/docs/getting-started)
-   [React](https://react.dev/learn)
-   [Metro bundler](https://metrobundler.dev/)
-   [Hermes engine](https://hermesengine.dev/)
-   [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/guidelines/overview/)

### React Native

-   [React Native Directory](https://reactnative.directory/) - An interactive directory to find packages for your React Native apps.
-   [Intermediate React Native](https://frontendmasters.com/courses/intermediate-react-native/) - Paid course by Frontend Masters.

### Animation and gestures

-   [React Native Reanimated](/versions/latest/sdk/reanimated)
-   [React Native Gesture Handler](/versions/latest/sdk/gesture-handler)

### Navigation

-   [React Navigation](https://reactnavigation.org/)

## Talks

[Keynote: streamline React Native development](https://www.youtube.com/watch?v=lnxanzsP1rM) --- Charlie Cheever, Jon Samp --- App.js Conf 2025

[Deploy Everywhere with Expo Router](https://www.youtube.com/watch?v=GKQ_0VfYweg) --- Evan Bacon --- App.js Conf 2025

[Embracing Native Code and Capabilities](https://www.youtube.com/watch?v=TLoHua8bzPg) --- Keith Kurak --- App.js Conf 2025

[Keynote: flexibility & iteration speed](https://www.youtube.com/watch?v=StTYy9Duk3E) --- Charlie Cheever, James Ide --- App.js Conf 2024

[Getting the most out of Expo Development Builds](https://www.youtube.com/watch?v=7J8LRpja9_o) --- Kadi Kraman --- App.js Conf 2024

[Fetch Once, Render Everywhere](https://www.youtube.com/watch?v=BK2xbPW2uUU) --- Evan Bacon --- App.js Conf 2024

[Launching Desktop Apps to Orbit with React Native](https://www.youtube.com/watch?v=K7yC3JKfWYU) --- Gabriel Donadel --- App.js Conf 2024

[Keynote: community & workflows](https://www.youtube.com/watch?v=xHMu4oT6-SQ) --- Charlie Cheever, James Ide --- App.js Conf 2023

[EAS: Iterate with confidence](https://www.youtube.com/watch?v=LTui_5dqXyM) --- Jon Samp --- App.js Conf 2023

[Expo Router: Write Once, Route Everywhere](https://www.youtube.com/watch?v=608r8etX_cg) --- Evan Bacon --- App.js Conf 2023

[Debugging should be easier](https://www.youtube.com/watch?v=sRLunWEzwHI) --- Cedric van Putten --- App.js Conf 2023

[React Native on Linux with the New Architecture](https://www.youtube.com/watch?v=Ca4SNa6kL_M) --- Kudo Chien --- App.js Conf 2023

## Podcasts

[Expo SDK 54, Expo Router v6 & Expo UI Beta for iOS with Beto Moedano](https://podcast.galaxies.dev/episodes/081-expo-sdk-54-expo-router-v6-expo-ui-beta-for-ios-with-beto-moedano) --- Alberto Moedano --- Rocket Ship #081

[RN Web vs React Strict DOM: Part 2, with Evan Bacon and James Ide](https://infinite.red/react-native-radio/rnr-340-rn-web-vs-react-strict-dom-part-2-with-evan-bacon-and-james-ide) --- Evan Bacon, James Ide --- React Native Radio #340

[Expo Atlas with Cedric van Putten](https://infinite.red/react-native-radio/rnr-333-expo-atlas-with-cedric-van-putten) --- Cedric van Putten --- React Native Radio #333

[Expo Router, RSC & DOM Components](https://podcast.galaxies.dev/episodes/059-expo-router-rsc-dom-components-with-evan-bacon) --- Evan Bacon --- Rocket Ship #059

[Universal React Native Apps with DOM & RSC](https://www.callstack.com/podcasts/universal-react-native-apps-with-dom-react-server-components) --- Evan Bacon --- React Universe On Air #45

[Streamlined React Native Development](https://softwareengineeringdaily.com/2025/01/01/streamlined-react-native-development-with-charlie-cheever-and-james-ide/) --- Charlie Cheever, James Ide --- Software Engineering Daily

[Debugging the Debugger](https://infinite.red/react-native-radio/rnr-316-debugging-the-debugger-with-cedric-van-putten-and-alex-hunt) --- Cedric van Putten --- React Native Radio #316

[What to do without App Center](https://infinite.red/react-native-radio/rnr-315-what-to-do-without-app-center) --- Quinlan Jung --- React Native Radio #315

[Expo Workflows with Jon Samp](https://infinite.red/react-native-radio/rnr-314-announcing-expo-workflows-with-jon-samp) --- Jon Samp --- React Native Radio #314

[How to Handle App Center Retirement](https://www.callstack.com/podcasts/how-to-handle-app-center-retirement) --- Quinlan Jung --- React Universe On Air #43

[Using RSCs in Expo Router](https://podrocket.logrocket.com/using-rscs-expo-router-evan-bacon) --- Evan Bacon --- PodRocket Season 4

[Expo EAS and 100 Snakes](https://podcast.galaxies.dev/episodes/038-expo-eas-and-100-snakes-with-jon-samp) --- Jon Samp --- Rocket Ship #038

## Live streams recordings

[Announcing the 2025 Expo App Award winners!](https://www.youtube.com/watch?v=KnZ3LWkXzSk) --- Expo Live Stream

[What's new in Expo SDK 54?](https://www.youtube.com/watch?v=KBlbkjqxNbM) --- Expo Live Stream

[Shipping with Expo: How to get your Bolt app to the app stores](https://www.youtube.com/watch?v=ViU7207_W54) --- Expo Live Stream

[How to use Protected Routes in Expo Router V5 for smooth auth](https://www.youtube.com/watch?v=XCTaMu0qnFY) --- Expo Live Stream

[Best practices for using Unistyles 3.0 to style cross platform applications](https://www.youtube.com/watch?v=K3wZg-Pxt3k) --- Expo Live Stream

[How to build mobile apps without writing a line of code with Bolt and Expo](https://www.youtube.com/watch?v=dT7hlszpO04) --- Expo Live Stream

[What is Legend List?](https://www.youtube.com/watch?v=XpZMveUCke8) --- Expo Live Stream

[How to add Apple home screen widgets to React apps](https://www.youtube.com/watch?v=hgmAMrVRzRM) --- Expo Live Stream

[Your 2025 React Native Tech Stack](https://www.youtube.com/watch?v=kqdrn-jEaXY) --- Expo Live Stream

[Radon IDE: the VS Code extension for React Native](https://www.youtube.com/watch?v=UeYmRKWhwFI) --- Expo Live Stream

[Building 4 apps in 4 weeks with Expo](https://www.youtube.com/watch?v=YOfLHtK8B04) --- Expo Live Stream

[Launch Week 2024 AMA](https://www.youtube.com/watch?v=NHpS9JaL7jA) --- Expo Live Stream

## Video tutorials

[What's New in Expo SDK 56: Expo UI, Inline Swift/Kotlin Modules, and Faster Builds](https://www.youtube.com/watch?v=MKqGbv-Tssg) --- Expo Tutorials

[Introducing Expo Agent (beta): build real, production-quality native apps from your browser](https://www.youtube.com/watch?v=3yyy32R0s2k) --- Expo Tutorials

[What's new in Expo SDK 55](https://www.youtube.com/watch?v=q72aeXsbF9c) --- Expo Tutorials

[AI mobile app development with Replit and Expo](https://www.youtube.com/watch?v=Zm4z-8i7PgA) --- Expo Tutorials

[How to add Android widgets to Expo apps | Native, Resizable, Configurable widgets](https://www.youtube.com/watch?v=rCVWq4WkoDA) --- Expo Tutorials

[How to add native iOS Widgets to your Expo app](https://www.youtube.com/watch?v=UH4ejdz3fko) --- Expo Tutorials

[How to send emails with Resend from your Expo app](https://www.youtube.com/watch?v=8sPD8SNcUFA) --- Expo Tutorials

[The fastest mobile QA workflow: Expo pull request previews in GitHub Actions](https://www.youtube.com/watch?v=7UVIrqrrrso) --- EAS Tutorials

[Getting started with Meta Horizon Development using Expo](https://www.youtube.com/watch?v=24G2tui0Ts8) --- Expo Tutorials

[How to make Expo apps faster | Expo app development best practices](https://www.youtube.com/watch?v=vFbim_U1Lmc) --- Expo Tutorials

[Learn how to use the new Icon Composer with Expo](https://www.youtube.com/watch?v=RZ_QMym3adw) --- Expo Tutorials

[Introducing Expo MCP Server](https://www.youtube.com/watch?v=dp9dpIgDxZQ) --- Expo Tutorials

---

## App credentials
Source: https://docs.expo.dev/app-signing/app-credentials/

Learn about what app credentials Android and iOS require.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo automates the process of signing your app for Android and iOS, but in both cases, you can choose to provide your overrides. [EAS Build](/build/introduction) can generate signed or unsigned applications, but to distribute your application through the stores, it **must** be a signed application.

On this page, you'll learn about the credentials that each platform requires. If you're curious about how we store your credentials on our end, take a look at our [security documentation](/app-signing/security).

## Android

Google requires all Android apps to be digitally signed with a certificate before they are installed on a device or updated. Usually, a private key and its public certificate are stored in a keystore. In the past, APKs uploaded to the store were required to be signed with the **app signing certificate** (a certificate that will be attached to the app in the Play Store), and if the keystore was lost there was no way to recover or reset it. Now, you can opt-in to App Signing by Google Play and simply upload an APK signed with an **upload certificate**, and Google Play will automatically replace it with the **app signing certificate**. Both the old method (app signing certificate) and new method (upload certificate) are essentially the same mechanisms, but using the new method, if your upload keystore is lost or compromised, you can contact the Google Play support team to reset the key.

From the Expo build process's perspective, there is no difference between whether an app is signed with an **upload certificate** or an **app signing key**. Either way, `eas build` will generate an **.apk** or **.aab** signed with the keystore currently associated with your application. If you want to generate an upload keystore manually, you can do that the same way you created your original keystore.

See [Android's documentation](https://developer.android.com/studio/publish/app-signing) to find more information about this process.

### App signing by Google Play

When you [upload your first release to Google Play](https://expo.fyi/first-android-submission) you will see a notice about "App signing by Google Play" and "Google is protecting your app signing key". This is the default behavior and requires no action on your behalf except to press "Continue".

If you currently manage your app signing key and want Google to manage it for you, see [Use app signing by Google Play](https://support.google.com/googleplay/android-developer/answer/9842756).

Lost your keystore? Learn how to reset your upload key on Google Play

To sync your Expo keystore with Google, follow these steps:

#### Download credentials

In a terminal window:

1.  Run `eas credentials` command.
2.  Select `Android` for the platform and the profile whose credentials you wish to download.
3.  Select the option `credentials.json: Upload/Download credentials between EAS servers and your local json`.
4.  Select `Download credentials from EAS to credentials.json`.

Your application's keystore should be kept private. **Under no circumstances should you check it into your repository.** Debug keystores are the only exception because we don't use them for uploading apps to the Google Play Store.

#### Export keystore to `pem` format

Once you have downloaded your credentials and the keystore, export it to the `pem` format so that you can submit it to Google:

1.  Find the key alias in your **credentials.json** file under the `keyAlias` key.
2.  Use `keytool` to export the certificate:

```sh
keytool -export -rfc -alias alias_from_step_1 -file certificate_for_google.pem -keystore ./path/to/keystore.jks
```

#### Contact Google support

Contact Google Support and request them to change your key using [this support form](https://support.google.com/googleplay/android-developer/contact/key). While filling out the form, attach the `pem` file exported from the keystore.

Once Google updates this on your account, builds created through `eas build` will be correctly signed as expected by the Google Play Store. Note that Google will set the validity start date of the new upload certificate to 72 hours in the future so you'll have to wait before your first submission after performing this process.

## iOS

The 3 primary iOS credentials, all of which are associated with your Apple Developer account, are:

-   Distribution Certificate
-   Provisioning Profiles
-   Push Notification Keys

Whether you let EAS handle all your credentials, or you handle them yourself, it can be valuable to understand what each of these credentials means, when and where they're used, and what happens when they expire or are revoked. You can inspect and manage all your credentials with EAS CLI by running `eas credentials`.

### Distribution certificate

The distribution certificate is all about you, the developer, and not about any particular app. You may only have one distribution certificate associated with your Apple Developer account. This certificate will be used for all of your apps. If this certificate expires, your apps in production will not be affected. However, you will need to generate a new certificate if you want to upload new apps to the App Store or update any of your existing apps. Deleting a distribution certificate has no effect on any apps already on the App Store. You can clear the distribution certificate Expo currently has stored for your app the next time you build by running `eas credentials` and following the prompts.

### Push Notification keys

Apple Push Notification Keys (often abbreviated as APN keys) allow the associated apps to send and receive push notifications.

You can have a maximum of 2 APN keys associated with your Apple Developer account, and a single key can be used with any number of apps. If you revoke an APN key, all apps that rely on that key will no longer be able to send or receive push notifications until you upload a new key to replace it. Uploading a new APN key **will not** change your users' [Expo Push Tokens](/versions/latest/sdk/notifications#notificationsgetexpopushtokenasync). Push notification keys do not expire. You can clear the APN key Expo currently has stored for your app by running `eas credentials` and following the prompts.

> APN keys created by Expo can be downloaded on the [Expo website](https://expo.dev/accounts/%5Baccount%5D/settings/credentials).

### Provisioning profiles

Each profile is app-specific, meaning you will have a provisioning profile for every app you submit to the App Store. These provisioning profiles are associated with your distribution certificate, so if that is revoked or expired, you'll need to regenerate the app's provisioning profile, as well. Similar to the distribution certificate, revoking your app's provisioning profile will not have any effect on apps already on the App Store.

Provisioning profiles expire after 12 months, but this won't affect apps in production. You will just need to create a new one the next time you build your app by running `eas build -p ios`, or manually with `eas credentials`.

### Summary

| Credential | Limit Per Account | App-specific? | Can be revoked with no production side effects? | Used at |
| --- | --- | --- | --- | --- |
| Distribution Certificate | 2 | x | ✓ | Build time |
| Push Notification Key | 2 | x | x | Run time |
| Provisioning Profile | Unlimited | ✓ | ✓ | Build time |

### Clearing credentials

When you use the `eas credentials` command to delete your credentials, this only removes those credentials from Expo's servers. **It does not delete the credentials from Apple's perspective**. This means that to fully delete your credentials (for example, if you want a new push notification key, however, you already have two), you'll need to do so from the [Apple Developer Console](https://developer.apple.com/account/resources/certificates/list).

### Re-signing new credentials

You can use `eas build:resign` to codesign an existing **.ipa** for iOS to a new ad hoc provisioning profile. This helps reduce time when distributing internally --- for example, if you want to add a new test device to an existing build, you can use this command to update the provisioning profile to include the device without rebuilding the entire app from scratch.

Running the command will ask you to select a build that you want to re-sign. For example, running the command in an example project shows an available build:

After selecting the build, follow the steps to log in to your Apple Developer account. When prompted **Show devices and ask me again**, you can select a new provisioning profile.

Select a new device, and the command will run the EAS Build again. Note that the build triggered this time reuses the application artifact from the selected build and codesigns it with the new provisioning profile. Once this process is complete, you can use this new build link to install the **.ipa** on the iOS device added to the provisioning profile.

---

## Apple Developer Program roles and permissions for EAS Build
Source: https://docs.expo.dev/app-signing/apple-developer-program-roles-and-permissions/

Learn about the Apple Developer account membership requirements for creating an EAS Build.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

An Apple Developer account with permissions to create [app signing credentials](/app-signing/managed-credentials#generating-app-signing-credentials), such as certificates, identifiers, and provisioning profiles, is required when using EAS Build to create iOS device builds. These credentials can be generated when submitting the build by logging into your Apple Account from the EAS CLI, or they can be uploaded to your Expo account by an authorized user, so users without Apple Developer account access can create builds using the uploaded credentials.

On individual Apple Developer accounts, only the Account Holder role can generate app signing credentials. On an organization Apple Developer account, the Account Holder and Admin roles can always generate app signing credentials, and the App Manager role can generate credentials when a user with this role has **Access to Certificates, Identifiers, and Profiles** enabled in their App Store Connect user permissions.

Access to Certificates, Identifiers, and Profiles settings in App Store Connect.

This guide provides steps that an authorized user can follow to ensure app signing credentials are generated and available to their team members who use EAS. It also provides steps for the team developer to create an EAS Build by using pre-generated credentials.

> See [Apple's documentation on Program Roles](https://developer.apple.com/support/roles/) for details on the different roles and their permissions based on the type of Developer account and the permissions that are required for each role.

## Steps for Apple Developer account's authorized user

The authorized user of the Apple Developer account needs to generate the following credentials:

-   **Distribution signing certificate**: Required to sign development and release builds that are installed on an iOS device.
-   **Ad hoc provisioning profile**: Required to sign builds that are installed on a device outside of the Apple App Store.
-   **Distribution provisioning profile**: Required to sign the build that is submitted to the Apple App Store.
-   **Push key**: Required when using a push notification service.

For details on Distribution certificate, Provision profiles, and Push keys, see [required iOS app credentials](/app-signing/app-credentials#ios).

With EAS CLI, all of the above credentials can be created and synced automatically with the Apple Developer account. Once the authorized user logs in to their [Expo account](/accounts/account-types), they can create or update the provisioning profile by running `eas credentials` using the EAS CLI.

```sh
eas login
eas credentials
```

The CLI will prompt for selecting a [build profile](/build/eas-json#build-profiles) to use for the EAS Build. If the Apple Developer account's authorized user is creating a production build, follow these steps to [create a distribution provisioning profile](/tutorial/eas/ios-production-build#create-a-distribution-provisioning-profile). To create a developer build, follow these steps to [create an ad hoc provisioning profile](/tutorial/eas/ios-development-build-for-devices#provisioning-profile).

This ensures that the provisioning profile associated with the Expo account has necessary permissions.

> For projects with existing credentials, see [Using existing credentials](/app-signing/existing-credentials) for details on how to sync these to EAS or manage them manually.

## Steps for the team developer

As a developer on the team, when running `eas build -p ios` in the terminal window, the EAS CLI asks you to login to an Apple Developer account.

```sh
? Do you want to log in to your Apple account? > (Y/n)
No problem! If any of the next steps will require Apple account access we will ask you again about it.
```

Press N to skip logging into Apple Developer account if you don't have access (and avoid logging into your personal Apple Developer account, if any). The CLI displays message about skipping provisioning profile validation and other app signing credential validation and will continue creating the EAS Build with existing credentials

The EAS CLI needs to use the provisioning profile associated with the Expo account to create a build for iOS. When you skip login, the EAS Build will use the last provisioning profile and other credentials that were updated by the Apple Developer account's authorized user in your organization's Expo account.

## Additional information

### Uploading pre-generated Apple credentials

Some development teams may choose to generate distribution certificates and provisioning profiles outside of EAS. These credentials can be added by any EAS user with Developer or higher permissions using `eas credentials` or under **Select your project** > **Project settings** > **Configuration** > **Credentials** using the EAS dashboard.

When uploading the credentials, you will need the **.p12** and **.mobileprovision** files, and any passwords set when generating the distribution certificate.

### Provisioning profile expiry and updates

The associated provisioning profile needs to be updated if certain [iOS capabilities](/build-reference/ios-capabilities) (such as, entitlements) are added or removed, or at the annual expiry of the profile. This step is handled by the Apple Developer account's authorized user.

### Federated Apple Developer accounts

#### EAS Build

EAS CLI can only accept an Apple account's email and password to login into your Apple Developer account. You cannot login into [Federated Apple Developer account](https://support.apple.com/en-in/guide/apple-business-manager/axmb19317543/web) and make updates to the distribution certificate or provisioning profile. If your build credentials do not require any changes, you can skip logging in. Then, you can proceed with the build and EAS CLI will continue using your current uploaded credentials.

However, you can provide an Apple Store Connect (ASC) API token with Admin access to check and update Apple credentials when running `eas build` command. Follow the steps in [Provide an ASC API Token for your Apple Team](/build/building-on-ci#optional-provide-an-asc-api-token-for-your-apple-team) to create a build by passing the required token value to the `eas build` command.

#### EAS Submit

EAS Submit uses the ASC API token for submitting to TestFlight. If you have a Federated Apple Developer account, you can follow the standard EAS Submit setup. It lets you automatically submit your builds using `eas build --auto-submit`.

---

## Using existing credentials
Source: https://docs.expo.dev/app-signing/existing-credentials/

Learn about different options for supplying your app signing credentials to EAS Build.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

EAS Build gives you two options for how you can supply your build jobs with app signing credentials:

1.  [Automatically managed credentials](/app-signing/managed-credentials): EAS can host your app signing credentials and take care of sharing them with teammates that have the necessary permissions.
2.  [Local credentials](/app-signing/local-credentials): You create a **credentials.json** file in your project that points to your keystore (Android) and/or provisioning profile and distribution certificate (iOS), along with associated passwords. This is uploaded from your local machine at the time any given build job is run, and disposed of once that build job has completed.

Regardless of which option you choose, your first step for using your existing set of credentials is to set them up as local credentials in **credentials.json**. Refer to the [credentials.json section of the local credentials guide](/app-signing/local-credentials#credentialsjson) for more information on how to do this.

Once your **credentials.json** file is configured, you can run `eas credentials`, choose a platform, and then select `"Update credentials on Expo servers with values from credentials.json"` to upload them to be hosted and managed by EAS, if you would like. [Read more about syncing credentials](/app-signing/syncing-credentials).

---

## Using local credentials
Source: https://docs.expo.dev/app-signing/local-credentials/

Learn how to configure and use local credentials when using EAS.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

You can usually get away with not being a code signing expert by [letting EAS handle it for you](/app-signing/managed-credentials). However, there are cases where some users might want to manage their project keystore, certificates and profiles on their own.

If you would like to manage your own app signing credentials, you can use **credentials.json** to give EAS Build relative paths to the credentials on your local file system and their associated passwords to use them to sign your builds.

## credentials.json

If you opt-in to local credentials configuration, you'll need to create a **credentials.json** file at the root of your project, and it should look something like this:

```json
{
  "android": {
    "keystore": {
      "keystorePath": "android/keystores/release.keystore",
      "keystorePassword": "paofohlooZ9e",
      "keyAlias": "keyalias",
      "keyPassword": "aew1Geuthoev"
    }
  },
  "ios": {
    "provisioningProfilePath": "ios/certs/profile.mobileprovision",
    "distributionCertificate": {
      "path": "ios/certs/dist-cert.p12",
      "password": "iex3shi9Lohl"
    }
  }
}
```

> Remember to add **credentials.json** and all of your credentials to **.gitignore** so you don't accidentally commit them to the repository and potentially leak your secrets.

### Android credentials

If you want to build an Android app binary you'll need to have a keystore. If you don't have a release keystore yet, you can generate it on your own using the following command (replace `KEYSTORE_PASSWORD`, `KEY_PASSWORD`, `KEY_ALIAS` and `com.expo.your.android.package` with the values of your choice):

```sh
keytool \
-genkey -v \
-storetype JKS \
-keyalg RSA \
-keysize 2048 \
-validity 10000 \
-storepass KEYSTORE_PASSWORD \
-keypass KEY_PASSWORD \
-alias KEY_ALIAS \
-keystore release.keystore \
-dname "CN=com.expo.your.android.package,OU=,O=,L=,S=,C=US"
```

Once you have the keystore file on your computer, you should move it to the appropriate directory. We recommend you keep your keystores in the **android/keystores** directory. **Remember to git-ignore all your release keystores!** If you have run the above keytool command and placed the keystore at **android/keystores/release.keystore**, you can ignore that file by adding the following line to **.gitignore**:

```sh
android/keystores/release.keystore
```

Create **credentials.json** and configure it with the credentials:

```json
{
  "android": {
    "keystore": {
      "keystorePath": "android/keystores/release.keystore",
      "keystorePassword": "KEYSTORE_PASSWORD",
      "keyAlias": "KEY_ALIAS",
      "keyPassword": "KEY_PASSWORD"
    }
  },
  "ios": {
    ... 
  }
}
```

-   `keystorePath` points to where the keystore is located on your computer. Both relative (to the project root) and absolute paths are supported.
-   `keystorePassword` is the keystore password.
-   `keyAlias` is the key alias.
-   `keyPassword` is the key password.

### iOS credentials

There are a few more prerequisites for building the iOS app binary. You need a paid Apple Developer Account, and then you'll need to generate the Distribution Certificate and Provisioning Profile for your application, which can be done via the [Apple Developer Portal](https://developer.apple.com/account/resources/certificates/list).

Once you have the Distribution Certificate and Provisioning Profile on your computer, you should move them to the appropriate directory. We recommend you keep them in the `ios/certs` directory.

> Remember to add directory with your credentials to **.gitignore**, so you don't accidentally commit them to the repository and potentially leak your secrets.

If you have placed the credentials in the suggested directory, you can ignore those files by adding the following line to **.gitignore**:

```sh
ios/certs/*
```

Create (or edit) **credentials.json** and configure it with the credentials:

```json
{
  "android": {
    ... 
  },
  "ios": {
    "provisioningProfilePath": "ios/certs/profile.mobileprovision",
    "distributionCertificate": {
      "path": "ios/certs/dist.p12",
      "password": "DISTRIBUTION_CERTIFICATE_PASSWORD"
    }
  }
}
```

-   `provisioningProfilePath` points to where the Provisioning Profile is located on your computer.
-   `distributionCertificate.path` points to where the Distribution Certificate is located on your computer.
-   `distributionCertificate.password` is the password for the Distribution Certificate.

#### Multi-target project

If your iOS app is using [App Extensions](https://developer.apple.com/app-extensions/) like Share Extension, Widget Extension, and so on, you need to provide credentials for every target.

## Setting a credentials source

You can tell EAS Build how it should resolve credentials by specifying `"credentialsSource": "local"` or `"credentialsSource:" "remote"` on a build profile.

-   If `"local"` is provided, then **credentials.json** will be used.
-   If `"remote"` is provided, then credentials will be resolved from EAS servers.

If you do not set any option, `"credentialsSource"` will default to `"remote"`.

## Using local credentials on builds triggered from CI

Before you start setting up your CI job, make sure you have your **credentials.json** and **eas.json** files configured.

Developers tend to provide CI jobs with secrets by using environment variables. One of the challenges with this approach is that the **credentials.json** file contains a JSON object and it might be difficult to escape it properly. One possible solution is to convert the file to a base64-encoded string, set an environment variable to that value, and later decode it and restore the file on the CI.

Consider the following steps:

-   Run `base64 credentials.json` in the console to generate a Base64 string.
-   On your CI, set the `CREDENTIALS_JSON_BASE64` environment variable.
-   In the CI job, restore the file: `echo $CREDENTIALS_JSON_BASE64 | base64 -d > credentials.json`

Similarly, you can encode your keystore, provisioning profile and distribution certificate.

---

## Using automatically managed credentials
Source: https://docs.expo.dev/app-signing/managed-credentials/

Learn how to automatically manage your app credentials with EAS.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

For your app to be distributed in an app store, it needs to be digitally signed with credentials such as a keystore or a distribution certificate. This certifies the source of the app and ensures that it can't be tampered with. Other credentials, such as your FCM API Key and Apple Push Key are needed to send push notifications, but they are not involved in app signing.

That's all that you need to know about any of this to build an app with EAS Build, but if you would like to learn more you can refer to the [App Signing](/app-signing/app-credentials) guide.

Read on to learn how EAS can automatically manage credentials for you and your team.

## Generating app signing credentials

When you run `eas build`, you will be prompted to generate credentials if you have not done so already. Follow the simple instructions to generate your credentials. Where needed, they will be stored on EAS servers. On subsequent builds of your app, these credentials will be re-used unless you specify otherwise.

Generating your iOS credentials (distribution certificate, provisioning profile, and push key) requires you to sign in with an [Apple Developer Program](https://developer.apple.com/programs) membership.

> If you have any security concerns about EAS managing your credentials or about logging in to your Apple Developer account through EAS CLI, see [Security](/app-signing/security) guide. If that does not satisfy your concerns, you can reach out to [secure@expo.dev](mailto:secure@expo.dev) for more information, or use [local credentials](/app-signing/local-credentials) instead.

### Push notification credentials

#### Android

The Android push notification credentials setup for EAS Build requires configuring your app with FCM. Run `eas credentials`, select `Android`, then `Push Notifications: Manage your FCM Api Key`, and then choose the appropriate option to set up the key.

#### iOS

If you haven't set up your Push Notifications key yet, EAS CLI will ask you to set it up during the next `eas build` run.

You can also set up the Push Notifications key with the `eas credentials` command.

## Sharing credentials with your team

If you collaborate on your project with other developers, it is often useful to give them access to perform builds on their own. [Ensure that your project is configured for collaboration](/accounts/account-types#organizations) and any teammates that you have added through your [EAS dashboard](https://expo.dev/) will be able to run `eas build` seamlessly, provided that they have sufficient permissions.

After you have generated your iOS credentials, it's no longer necessary to have access to the Apple Developer team to start a build. This means that your collaborators can start new iOS builds with only their Expo accounts.

## Inspecting credentials configuration

You can view your currently configured app signing credentials by running `eas credentials`. This command also lets you remove and modify credentials, should you need to make any changes.

---

## Security
Source: https://docs.expo.dev/app-signing/security/

Learn how credentials and other sensitive data are handled when using EAS.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Before you enter outside credentials or provide other sensitive data to third-party software you should ask yourself whether you trust the software to use it responsibly and protect it. Due to the nature of what goes into building an app binary for distribution on app stores, the Expo standalone app build service requires various pieces of information with varying degrees of sensitivity. This document explains what those are, how we store them, and what could go wrong if they were to be compromised.

Most data stored by Expo servers (credentials or otherwise) is encrypted at rest by our cloud provider, Google Cloud. Credentials are additionally encrypted using [KMS](https://cloud.google.com/security/products/security-key-management). Credentials are only unencrypted for as long as we need them in memory in the standalone app builders or push notification services. Credentials are always encrypted in our databases, message queues, and other less transient parts of the system.

All of the data related to the information explained below can be downloaded and removed from Expo servers (if it is stored there at all in the first place), and some of it may be available through other locations such as the Apple Developer Portal.

## Android Push Notification credentials

Android uses Firebase Cloud Messaging (FCM) for push notifications. If you build a standalone app with Expo we store your FCM server key for you.

### Consequences if compromised

Each FCM server key can send push notifications to any of the Android apps associated with the Firebase project to which the key belongs. A malicious actor would need to have access to the FCM server key and device tokens to send a notification.

You can create and delete server keys through the Firebase console. When you delete a key, notifications using that key will stop working. When you create a new one and upload it to Expo, notifications will resume working.

### Consequences if lost

None. You can access it through the Firebase console.

## Android build credentials

A keystore and keystore password are required to sign a build for release to the Play Store. These are encrypted with KMS and additionally at rest. After an app is first submitted to the Google Play Store, the same keystore must be used to sign the app again to update it. It proves that the APK came from the developer who owns the keystore.

### Consequences if compromised

Provided that your Google Play Developer account is secure, a malicious actor will not be able to update your app with your keystore and keystore password. You cannot change your keystore.

### Consequences if lost

You will not be able to update your app on Google Play. You may want to download and backup the keystore and keystore password in a secure location of your choosing or in Google Play with the App Signing feature.

## Google Developer credentials

Expo tools never ask you to provide your Google account credentials.

## Android submit credentials

### Google Service Account Key

Google Service Account Key is the authentication method used to submit an Android app to the Google Play Store with EAS Submit. This key is stored on Expo servers and encrypted using [KMS](https://cloud.google.com/security/products/security-key-management) when at rest.

#### Consequences if compromised

If a malicious actor gains access to your Google Service Account Key, they would be able to perform actions in the Google Play Console on your behalf. The actions they could perform would be limited to the permissions granted to the service account key.

#### Consequences if lost

None. If you lose the Google Service Account Key, you can revoke it using the Google Cloud Console and create a new one.

## iOS Push Notification credentials

There are two types of iOS push notification credentials: one modern approach recommended by Apple and the legacy approach.

### APNs auth key (p8) + key ID (string)

Each developer account has up to two auth keys, each of which can send notifications to any app on the account.

#### Consequences if compromised

If a malicious actor were to gain access to the credentials, they would be able to send push notifications to your app. However, they would need to know which device tokens to send them to.

#### Consequences if lost

The Apple Developer console lets you download an APNs Auth Key only when it is created. If an Auth Key is lost, it can be revoked through the Apple Developer console and replaced with a new key.

## iOS build credentials

This refers to the production distribution certificate and password and provisioning profiles. Like most credential data stored by Expo these are all encrypted with KMS.

### Consequences if compromised

There isn't much that a malicious actor could do with this alone --- they would be unable to submit any apps without having your Apple Developer account credentials. You can revoke the distribution certificate and provisioning profile from the Apple Developer website.

### Consequences if lost

None. They are available through the Apple Developer console.

## Apple Developer account credentials

When creating a standalone app build, or uploading to the App Store you will be prompted for your Apple Developer account credentials. We do not store these on our servers --- EAS CLI only uses them locally.

### Keychain

By default, your Apple ID credentials are stored in the macOS Keychain. This feature is not available for Windows or Linux users.

### Changing Apple ID password in Keychain

To delete the locally stored password, open the "Keychain Access" app, switch to "All Items", and search for "deliver. [Your Apple ID]".

## iOS submit credentials

### Apple App Store Connect (ASC) API key

Apple App Store Connect (ASC) API key is one of the authentication methods that can be used to submit an iOS app to Apple's App Store using the EAS Submit service. This key is stored on the Expo servers and encrypted using KMS when at rest.

#### Consequences if compromised

If a malicious actor gains access to the ASC API key, they would be able to perform actions in the App Store Connect on your behalf.

#### Consequences if lost

None. If you lose the ASC API key, you can revoke it using the App Store Connect portal and create a new one.

### Apple app-specific password

Apple app-specific password is another authentication method that can be used to submit an iOS app to Apple's App Store using EAS Submit. Unlike other credentials, the app-specific password is not stored in the Expo servers between submissions.

The password is encrypted using KMS and stored only for the period required to submit the app to the App Store plus 24 hours.

This authentication method is **not recommended**.

## Device tokens for Android and iOS push notifications

Device tokens are encrypted at rest and periodically cycled automatically by Android and iOS.

### Consequences if compromised

If a malicious actor has access to the device tokens, they will be unable to do anything with them unless they also have the push notification credentials for the appropriate platform.

### Consequences if lost

You won't be able to send notifications to users until they open your app again.

## Need more control?

If the above information doesn't satisfy your security requirements, you may wish to run your standalone app builds [on your infrastructure](/build-reference/local-builds).

---

## Sync credentials between remote and local sources
Source: https://docs.expo.dev/app-signing/syncing-credentials/

Learn how to sync credentials between remote and local sources.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

If you use automatically managed credentials, your credentials will be hosted remotely on EAS servers, but you may encounter a situation where you want to pull your credentials down to run a build locally. And if you use local credentials, you may find yourself in a position where you want to upload credentials specified in **credentials.json** up to EAS to be managed for you. Both of these are possible using the `eas credentials` command.

## Downloading credentials

To download your automatically managed credentials, run `eas credentials` in the root of your project, pick a platform, choose `"Credentials.json: Upload/Download credentials between EAS servers and your local json"`, and then `"Download credentials from EAS to credentials.json"`. Run the command again to download the credentials for another platform, if needed.

Android credentials will be ready to use immediately because your project will read the credentials from **credentials.json**.

iOS credentials require two steps to set up locally. You will first need to install the distribution certificate into your keychain. Next, open your project Xcode and navigate to the "Signing & Capabilities" section, then import your provisioning profile and select it.

## Uploading credentials

To upload your credentials from **credentials.json** to be managed by EAS, run `eas credentials` in the root of your project, pick a platform, choose `"Credentials.json: Upload/Download credentials between EAS servers and your local json"`, and then `"Upload credentials from credentials.json to EAS"`. Run the command again to upload the credentials for another platform, if needed.

---

## create-expo-module
Source: https://docs.expo.dev/more/create-expo-module/

A command-line tool to create and update Expo modules.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

`create-expo-module` is a command-line tool to create a new Expo module or add platform support to an existing one. It can create a local module inside an Expo app, or a standalone module with an example app for developing and testing native code.

## Local and standalone modules

`create-expo-module` can create two types of modules: local modules and standalone modules.

A **local module** lives inside a single Expo project. Use a local module when you want to add custom native code to one app and do not need to publish or share it as a separate package.

A **standalone module** is its own package. Use a standalone module when you want to reuse the module across multiple apps, keep it in a monorepo package, or publish it to npm.

## Create a local module

To create a local module inside an existing Expo project, navigate to the project directory and run:

```sh
# npm
npx create-expo-module@latest --local

# yarn
yarn create expo-module --local

# pnpm
pnpm create expo-module --local

# bun
bun create expo-module --local
```

Running the above command will prompt you to enter the local module name, native module name, target platforms, and feature examples to include.

Local modules are created in the **modules** directory by default.

## Create a standalone module

To create a standalone Expo module, run:

```sh
# npm
npx create-expo-module@latest my-module

# yarn
yarn create expo-module my-module

# pnpm
pnpm create expo-module my-module

# bun
bun create expo-module my-module
```

Running the above command will prompt you for the package name, native module name, target platforms, feature examples, package metadata, and package manager.

## Develop a standalone module

After creating a standalone module, navigate to the module directory and open the generated native projects:

```sh
cd my-module
npm run open:android
npm run open:ios
```

Then start the development server from the **example** directory:

```sh
cd example
npx expo start
```

Standalone modules include scripts for `build`, `clean`, `test`, `prepare`, `open:ios`, and `open:android`.

## Options

Use options to customize the command's behavior: `--local`, `--platform`, `--features`, `--full-example`, `--package-manager`, `--no-example`, `--barrel`, `--source`, `--with-readme`, `--with-changelog`, `--name`, `--description`, `--package`, `--author-name`, `--author-email`, `--author-url`, `--repo`, `--license`, `--module-version`, `--version`, `--help`.

## Non-interactive mode

`create-expo-module` skips prompts when it runs in a non-interactive environment. This includes CI, `EXPO_NONINTERACTIVE`, and terminals where stdin is not a TTY.

## Add platform support

The `add-platform-support` command adds new platform files to an existing Expo module and updates **expo-module.config.json**.

## Environment variables

`EXPO_BETA`, `EXPO_DEBUG`, `EXPO_NO_TELEMETRY`, `EXPO_NONINTERACTIVE`.

## Learn more

[Expo Modules API: Get started](/modules/get-started) --- Learn how to create and use local and standalone Expo modules.

---

## create-expo-app
Source: https://docs.expo.dev/more/create-expo/

A command-line tool to create a new Expo and React Native project.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

`create-expo-app` is a command-line tool to create and set up a new Expo and React Native project. This tool simplifies the initialization process by providing various templates to get started quickly.

## Create a new project

To create a new project, run:

```sh
# npm
npx create-expo-app@latest --template default@sdk-56

# yarn
yarn create expo-app --template default@sdk-56

# pnpm
pnpm create expo-app --template default@sdk-56

# bun
bun create expo --template default@sdk-56
```

> **Note:** During the SDK 56 transition period, `create-expo-app@latest` without the `--template` flag creates an SDK 54 project.

## Options

-   `--yes` - Uses default options.
-   `--no-install` - Skips installing dependencies or CocoaPods.
-   `--no-agents-md` - Skips generating AGENTS.md, CLAUDE.md files.
-   `--template` - Select a template: `default`, `blank`, `blank-typescript`, `tabs`, `bare-minimum`.
-   `--example` - Initialize from an example in [expo/examples](https://github.com/expo/examples).
-   `--version` - Print version.
-   `--help` - Print help.

## Node Package Managers support

Supports npm, Yarn 1 (Classic), Yarn 2+ (Modern), pnpm, and Bun. Each has specific configuration requirements for EAS.

---

## Expo CLI
Source: https://docs.expo.dev/more/expo-cli/

The Expo CLI is a command-line tool that is the primary interface between a developer and other Expo tools.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

The `expo` package provides a small and powerful CLI tool `npx expo` which is designed to keep you moving fast during app development.

## Highlights

-   [Start a server](/more/expo-cli#develop) for developing your app: `npx expo start`.
-   [Generate the native Android and iOS directories](/more/expo-cli#prebuild) for your project: `npx expo prebuild`.
-   [Build and run](/more/expo-cli#compiling) the native apps locally: `npx expo run:ios` and `npx expo run:android`.
-   [Install and update packages](/more/expo-cli#install) that work with the version of `react-native` in your project: `npx expo install package-name`.
-   `npx expo` can be used with `npx react-native` simultaneously.

## Installation

Expo CLI is included in the `expo` package. You can install it with npm or yarn: `yarn add expo`.

## Develop

Start a development server: `npx expo start`. This starts a server on `http://localhost:8081` using Metro bundler.

The Terminal UI contains a QR code and keyboard shortcuts:
- A: Open on Android device
- I: Open in iOS Simulator
- W: Open in web browser
- R: Reload app
- S: Switch launch target between Expo Go and development builds
- M: Open dev menu
- J: Open React Native DevTools

### Launch target

`npx expo start` automatically launches in a development build if `expo-dev-client` is installed, otherwise Expo Go. Use `--dev-client` or `--go` to force.

### Tunneling

Use `npx expo start --tunnel` with `@expo/ngrok` installed for public URL access.

### Offline

Use `npx expo start --offline` to develop without network.

## Building

### Compiling

- `npx expo run:ios` - Compile iOS app (macOS only, Xcode required)
- `npx expo run:android` - Compile Android app (Android Studio required)

### Exporting

`npx expo export` exports JavaScript and assets using Metro bundler to a **dist** directory.

## Prebuild

`npx expo prebuild` generates native code for your project.

## Lint

`npx expo lint` sets up ESLint with Expo-specific settings.

## Config

`npx expo config` evaluates app config.

## Install

`npx expo install` is a drop-in replacement for `npm install` that ensures compatible versions.

## Authentication

Commands: `npx expo register`, `npx expo login`, `npx expo whoami`, `npx expo logout`.

## Customizing

`npx expo customize` generates basic project files like `babel.config.js`, `metro.config.js`.

## Environment variables

Numerous environment variables control CLI behavior including `EXPO_DEBUG`, `EXPO_OFFLINE`, `EXPO_NO_TELEMETRY`, `EXPO_NO_CACHE`, `EDITOR`, `EXPO_EDITOR`, and many more.

## Telemetry

Expo dev tools collect anonymous usage data. Opt out with `EXPO_NO_TELEMETRY=1`.

---

## Glossary of terms
Source: https://docs.expo.dev/more/glossary-of-terms/

List of non-obvious terms used within the documentation, related to Expo or cross-platform development in general.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

### Android
The mobile operating system sponsored by Google.

### App config
A file named **app.json**, **app.config.json**, **app.config.js**, or **app.config.ts** in the root project directory.

### Apple Developer Portal
Apple's official website for managing application code signing.

### Autolinking
A cross-platform tool for automatically linking native modules to native apps via native package managers.

### Babel
Transpiler used for removing language features not available in the runtime's JavaScript engine.

### Bare workflow
Deprecated. Expo no longer separates "managed" and "bare" workflows.

### Bun
A JavaScript runtime and package manager.

### CocoaPods
The iOS package manager for linking native modules.

### Continuous Native Generation (CNG)
The process of generating native projects from a set of inputs via the `prebuild` command.

### Development build
A debug build of your app that contains the `expo-dev-client` package.

### EAS (Expo Application Services)
Deeply integrated cloud services for Expo and React Native apps.

### EAS Build
Cloud service for building Android and iOS binaries.

### EAS CLI
Command-line tool for working with EAS.

### EAS Update
Cloud hosting service for OTA Updates.

### Expo Go
The Android and iOS app for learning and experimenting with React Native.

### Expo Router
A file-based router for React Native and web applications.

### Expo SDK
A collection of npm packages containing native modules for device/system functionality.

### Hermes engine
A JavaScript engine developed by Meta for React Native, the default JS engine.

### Metro bundler
The bundler for converting JavaScript files and assets into a format that runs on a native runtime.

### React Native
Lets you build mobile apps using only JavaScript, using the same design as React.

### React Native Web
An abstraction on top of `react-dom` enabling React Native primitives to run in the browser.

### TypeScript
A strongly typed programming language that builds on JavaScript.

### And many more terms.

---

## qr.expo.dev
Source: https://docs.expo.dev/more/qr-codes/

Reference for the QR code generator at qr.expo.dev.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

qr.expo.dev is a cloud function that generates Expo-branded QR codes for EAS Update, used to preview updates in development builds and Expo Go.

Example endpoint:

```text
https://qr.expo.dev/eas-update?projectId=your-project-id&runtimeVersion=your-runtime-version&channel=your-channel
```

## General

### Base query parameters

| Param | Required | Default | Description |
| --- | --- | --- | --- |
| `slug` | x | exp | Use slug from app config to target a development build. |
| `host` | x | u.expo.dev | The hostname of the update server. |
| `format` | x | svg | Use `url` to receive plain text URL. |

### Update by device traits

| Param | Required | Description |
| --- | --- | --- |
| `projectId` | ✓ | The ID of the project |
| `runtimeVersion` | ✓ | The runtime version of the build |
| `channel` | ✓ | The channel name of the build |

### Update by ID

| Param | Required | Description |
| --- | --- | --- |
| `updateId` | ✓ | The ID of the update |

### Update by group ID

| Param | Required | Description |
| --- | --- | --- |
| `projectId` | ✓ | The ID of the project |
| `groupId` | ✓ | The ID of the update group |

### Update by branch ID

| Param | Required | Description |
| --- | --- | --- |
| `projectId` | ✓ | The ID of the project |
| `branchId` | ✓ | The ID of the branch |

### Update by channel ID

| Param | Required | Description |
| --- | --- | --- |
| `projectId` | ✓ | The ID of the project |
| `channelId` | ✓ | The ID of the channel |

---

## Release statuses
Source: https://docs.expo.dev/more/release-statuses/

Learn about alpha, preview, beta, and stable release statuses and how they affect feature stability when using Expo SDK and EAS.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo uses different release statuses to indicate the stability and readiness of its tools and services.

## Alpha

Alpha features are available for early testing but may have significant limitations. APIs are subject to breaking changes without major version bumps. Not recommended for production apps.

## Preview

Preview features provide an early look at new functionality with minimal overhead, but are not yet feature-complete. Can be used in production with thorough testing.

## Beta

Beta features are feature-complete and undergoing final validation. Core functionality is complete and API shape is mostly settled. Can be used in production with thorough testing.

## Stable

Features without any status badge are considered stable and are fully released for production use. Breaking changes only occur in major version releases.

## Deprecated

Deprecated features are no longer recommended for use and will be removed in future releases.

---

## EAS Insights
Source: https://docs.expo.dev/eas-insights/introduction/

An introduction to EAS Insights which is a preview service for projects using the expo-insights library.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

> **EAS Insights** is in [preview](/more/release-statuses#preview) and subject to breaking changes. While in preview, it is free to use.

**EAS Insights** is a service that will offer a view into a project's performance, usage, and reach. We are currently offering a preview of Insights that is available to all developers.

EAS Insights makes it easy to see the state of your app, providing information about usage across platforms, app store versions, and timeframes.

## Integration with EAS Update

If you're already using [EAS Update](/eas-update/introduction), we provide certain high-level usage insights without any additional client-side changes. This is possible by aggregating data from client requests to check for an update.

## Use the `expo-insights` library

Developers can add the `expo-insights` library to their projects and gain more precise usage metrics.

### Installation

Make sure your app is linked to your EAS project by running `eas init`, then install the library:

```sh
npx expo install expo-insights
```

After installing the library, create a build either with [EAS](/build/setup) or [locally](/guides/local-app-development). The library will automatically send events to EAS Insights when the app is launched.

### View insights

In the EAS dashboard, go to projects list, select your project and then select **Insights** from the navigation menu.

---

## Expo Documentation Home
Source: https://docs.expo.dev/

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

# Create amazing apps that run everywhere

Build one JavaScript/TypeScript project that runs natively on all your users' devices.

## Quick Start

```sh
npx create-expo-app@latest
```

Then continue [setting up your environment](/get-started/set-up-your-environment).

## Create a universal Android, iOS, and web app

[Start Tutorial](/tutorial/introduction)

## Launch to app stores

Ship apps with zero config or no prior experience. Launch easily guides you through the technical stuff, directly from GitHub.

[Try Launch](https://launch.expo.dev/)

### Deploy from CLI

Deploy your apps using command-line tools for iOS and web platforms.

```sh
npx testflight
npx eas-cli deploy
```

### Discover more

Try out Expo in minutes and learn how to get the most out of Expo.

- [Speed up your development with EAS](/tutorial/eas/introduction)
- [Discover file-based routing with Expo Router](/router/introduction)
- [Try Expo in your browser with Snack](https://snack.expo.dev/)
- [Join the community on Discord](https://chat.expo.dev)

### Explore APIs

Expo supplies a vast array of SDK modules including Image, Camera, Notifications, and more.

### Explore examples

Explore example projects at [github.com/expo/examples](https://github.com/expo/examples).

### Watch our latest talks

Explore presentations from App.js Conf on the Expo YouTube channel.

---

## Core concepts
Source: https://docs.expo.dev/core-concepts/

An overview of Expo tools, features and services.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

Expo is an [open-source framework](https://github.com/expo/expo/) for apps that run natively on Android, iOS, and the web. Expo brings together the best of mobile and the web and enables many important features for building and scaling an app.

The `expo` npm package enables a suite of incredible features for React Native apps. The `expo` package can be installed in nearly **any React Native project**.

## Tools and features

[Expo SDK](/versions/latest) --- Comprehensive suite of well-tested React Native modules.

[Develop an app with Expo](/workflow/overview) --- Overview of the development process.

[Expo Modules API](/modules/overview) --- Write highly performant native code with Swift and Kotlin.

[Prebuild](/workflow/continuous-native-generation) --- Separate React from Native.

[Expo CLI](/more/expo-cli) --- Manage dependencies, compile native apps, develop for the web.

[Expo Go](/get-started/set-up-your-environment) --- A playground for students and learners.

| Feature | With `expo` | Without `expo` |
| --- | --- | --- |
| Develop apps entirely in JavaScript | ✓ | x |
| Write JSI native modules with Swift/Kotlin | ✓ | x |
| Develop without Xcode or Android Studio | ✓ | x |
| Create/share example apps in browser with Snack | ✓ | x |
| Major upgrades without native changes | ✓ | x |
| First-class TypeScript support | ✓ | x |
| Install compatible libraries from CLI | ✓ | x |
| Develop websites with same codebase | ✓ | x |
| Tunnel dev server to any device | ✓ | x |

## Services

The team behind Expo also provides **Expo Application Services (EAS)**, deeply integrated cloud services for building, submitting, and updating your React Native app. EAS can be used with **any React Native app**.

---

## FAQ
Source: https://docs.expo.dev/faq/

A list of common questions and limitations about Expo and related services.

> For the complete documentation index, see [llms.txt](/llms.txt). Use this file to discover all available pages.

## What is Expo used for?

Expo is an open-source framework for apps that run natively on Android, iOS, and the web.

## Do companies use Expo?

Yes, Expo is used by top companies worldwide, serving hundreds of millions of end users.

## Why does Expo have its own SDK?

When Expo was first created, React Native had yet to be publicly released. The Expo SDK is well-tested, written in TypeScript, and built for Android, iOS, and the web.

## What is the difference between Expo and React Native?

The `expo` package provides a suite of features that make it easier to develop complex React Native applications. You can install `expo` in nearly any React Native app.

## Do I need to switch from React Native to use Expo?

No, the `expo` npm package and CLI work with any React Native app.

## How much does Expo cost?

The Expo platform is free and open source. EAS is an optional suite of cloud services with a Free plan available.

## How do I add custom native code to my Expo project?

Use [development builds](/develop/development-builds/introduction) and [config plugins](/config-plugins/introduction).

## Can I use Expo in an app created with React Native CLI?

Yes, all Expo tools and services work great in any React Native app.

## How do I share my Expo project?

The fastest way is to publish with [EAS Update](/eas-update/introduction) and launch in a [development build](/develop/development-builds/introduction).

## Can I develop iOS apps on a Windows computer?

Yes, use [EAS Build](/build/introduction) to build in the cloud and [EAS Submit](/submit/introduction) to submit.

## What versions of Android and iOS are supported?

Expo SDK supports Android 7+ and iOS 16.4+.

## What is the minimal size of a hello world expo app?

Less than 3 MB. The `expo` package only adds 1 MB one time to final app size.

## Can I use Expo with my native library?

Yes, create a [custom native module](/modules/overview) with Swift and Kotlin.

## Is Expo similar to React for web development?

Expo is a framework for apps that run natively on Android, iOS, and the web. React Native uses native components instead of the DOM.

## Is ejecting deprecated?

Yes, the concept of ejecting is deprecated. Use `npx expo prebuild` instead.


---

## Accelerometer
Source: https://docs.expo.dev/versions/v54.0.0/sdk/accelerometer/

# Expo Accelerometer

A library that provides access to the device's accelerometer sensor.
Android, iOS (device only), Web, Included in Expo Go

`Accelerometer` from `expo-sensors` provides access to the device accelerometer sensor(s) and associated listeners to respond to changes in acceleration in three-dimensional space, meaning any movement or vibration.

## Installation

```sh
npx expo install expo-sensors
```

## Usage

```jsx
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

## API

```js
import { Accelerometer } from 'expo-sensors';
```

### Classes

#### `Accelerometer`

Type: Class extends DeviceSensor<AccelerometerMeasurement>

**Methods:**
- `addListener(listener)` - Subscribe for updates to the accelerometer. Returns EventSubscription.
- `getListenerCount()` - Returns the registered listeners count.
- `getPermissionsAsync()` - Checks user's permissions for accessing sensor.
- `hasListeners()` - Returns boolean which signifies if sensor has any listeners registered.
- `isAvailableAsync()` - Returns whether the accelerometer is enabled on the device.
- `removeAllListeners()` - Removes all registered listeners.
- `removeSubscription(subscription)` - Removes the given subscription.
- `requestPermissionsAsync()` - Asks the user to grant permissions for accessing sensor.
- `setUpdateInterval(intervalMs)` - Set the sensor update interval.

### Interfaces

#### `Subscription`

- `remove()` - Removes an event listener for which the subscription has been created.

### Types

#### `AccelerometerMeasurement`

| Property | Type | Description |
|----------|------|-------------|
| timestamp | number | Timestamp of the measurement in seconds. |
| x | number | Value of gs device reported in X axis. |
| y | number | Value of gs device reported in Y axis. |
| z | number | Value of gs device reported in Z axis. |

#### `PermissionExpiration`

Literal Type: `'never' | number`

#### `PermissionResponse`

| Property | Type | Description |
|----------|------|-------------|
| canAskAgain | boolean | Indicates if user can be asked again for specific permission. |
| expires | PermissionExpiration | Determines time when the permission expires. |
| granted | boolean | A convenience boolean that indicates if the permission is granted. |
| status | PermissionStatus | Determines the status of the permission. |

### Enums

#### `PermissionStatus`

- `DENIED = "denied"` - User has denied the permission.
- `GRANTED = "granted"` - User has granted the permission.
- `UNDETERMINED = "undetermined"` - User hasn't granted or denied the permission yet.

---

## AgeRange
Source: https://docs.expo.dev/versions/v54.0.0/sdk/age-range/

# Expo AgeRange

A library that provides access to age range information using Play Age Signals API on Android and Declared Age Range framework on iOS.
Android, iOS, Included in Expo Go

> **This library is currently in alpha and will frequently experience breaking changes.**

`expo-age-range` provides access to user age range information. It uses Google's Play Age Signals API on Android and Apple's Declared Age Range framework on iOS.

### Configuration in app config

#### Setup iOS project

Requires Xcode 26.0+. The `com.apple.developer.declared-age-range` entitlement is required.

```json
{
  "expo": {
    "ios": {
      "entitlements": {
        "com.apple.developer.declared-age-range": true
      }
    }
  }
}
```

### API

```ts
import * as AgeRange from 'expo-age-range';
```

#### Methods

**`AgeRange.requestAgeRangeAsync(options)`**
- Platforms: Android, iOS 26.0+
- Prompts the user to share their age range with the app.
- Returns: `Promise<AgeRangeResponse>`

#### Types

**`AgeRangeRequest`**

| Property | Type | Description |
|----------|------|-------------|
| threshold1 | number | The required minimum age for your app. |
| threshold2 (optional) | number | An optional additional minimum age. |
| threshold3 (optional) | number | An optional additional minimum age. |

**`AgeRangeResponse`**

| Property | Type | Description |
|----------|------|-------------|
| activeParentalControls (optional) | string[] | iOS. List of parental controls enabled. |
| ageRangeDeclaration (optional) | 'selfDeclared' \| 'guardianDeclared' | iOS. |
| installId (optional) | string | Android. |
| lowerBound (optional) | number | The lower limit of the person's age range. |
| mostRecentApprovalDate (optional) | number | Android. |
| upperBound (optional) | number | The upper limit of the person's age range. |
| userStatus (optional) | string | Android. |

#### Error codes

| Code | Platform | Description |
|------|----------|-------------|
| ERR_AGE_RANGE_USER_DECLINED | iOS | User declined to share their age range. |
| ERR_AGE_RANGE_NOT_AVAILABLE | iOS | Age range not available. |
| ERR_AGE_RANGE_INVALID_REQUEST | iOS | The provided params were invalid. |

---

## AppIntegrity
Source: https://docs.expo.dev/versions/v54.0.0/sdk/app-integrity/

# AppIntegrity

A library that provides access to Google's Play Integrity API on Android and Apple's App Attest service on iOS.
Android, iOS, Included in Expo Go

`@expo/app-integrity` provides APIs to help ensure your backend resources are accessed only by legitimate installations of your app running on genuine devices.

### API

```js
import * as AppIntegrity from '@expo/app-integrity';
```

#### Constants

**`AppIntegrity.isSupported`** - iOS. A boolean value indicating whether a particular device provides the App Attest service.

#### Methods

**`AppIntegrity.attestKeyAsync(keyId, challenge)`** - iOS. Asks Apple to attest to the validity of a generated cryptographic key. Returns Promise<string>.

**`AppIntegrity.generateAssertionAsync(keyId, challenge)`** - iOS. Creates a block of data that demonstrates the legitimacy of an app instance. Returns Promise<string>.

**`AppIntegrity.generateHardwareAttestedKeyAsync(keyAlias, challenge)`** - Android. Generates a hardware-attested key pair in the Android Keystore. Returns Promise<void>.

**`AppIntegrity.generateKeyAsync()`** - iOS. Creates a new cryptographic key for use with the App Attest service. Returns Promise<string>.

**`AppIntegrity.getAttestationCertificateChainAsync(keyAlias)`** - Android. Retrieves the attestation certificate chain for a hardware-attested key. Returns Promise<string[]>.

**`AppIntegrity.isHardwareAttestationSupportedAsync()`** - Android. Checks if hardware attestation is supported. Returns Promise<boolean>.

**`AppIntegrity.prepareIntegrityTokenProviderAsync(cloudProjectNumber)`** - Android. Prepares the integrity token provider. Returns Promise<void>.

**`AppIntegrity.requestIntegrityCheckAsync(requestHash)`** - Android. Requests an integrity verdict from Google Play. Returns Promise<string>.

---

## AppleAuthentication
Source: https://docs.expo.dev/versions/v54.0.0/sdk/apple-authentication/

# Expo AppleAuthentication

A library that provides Sign-in with Apple capability for iOS.
iOS, tvOS, Included in Expo Go

### API

```js
import * as AppleAuthentication from 'expo-apple-authentication';
```

#### Components

**`AppleAuthenticationButton`** - iOS, tvOS. Displays "Sign In with Apple" / "Continue with Apple" button.

#### Methods

- **`AppleAuthentication.formatFullName(fullName, formatStyle)`** - Creates a locale-aware string representation of a person's name.
- **`AppleAuthentication.getCredentialStateAsync(user)`** - Queries the current state of a user credential.
- **`AppleAuthentication.isAvailableAsync()`** - Determines if the device supports Apple authentication.
- **`AppleAuthentication.refreshAsync(options)`** - Refreshes the logged-in user's credentials.
- **`AppleAuthentication.signInAsync(options)`** - Initiates the Apple authentication flow.
- **`AppleAuthentication.signOutAsync(options)`** - Ends the authenticated session.

#### Event Subscriptions

- **`AppleAuthentication.addRevokeListener(listener)`** - Adds a listener for credential revocation.

#### Types

**`AppleAuthenticationCredential`** - Contains all pertinent user and credential information.

**`AppleAuthenticationFullName`** - Tokenized portions of the user's full name.

#### Enums

- **`AppleAuthenticationButtonStyle`**: WHITE, WHITE_OUTLINE, BLACK
- **`AppleAuthenticationButtonType`**: SIGN_IN, CONTINUE, SIGN_UP
- **`AppleAuthenticationCredentialState`**: REVOKED, AUTHORIZED, NOT_FOUND, TRANSFERRED
- **`AppleAuthenticationScope`**: FULL_NAME, EMAIL
- **`AppleAuthenticationUserDetectionStatus`**: UNSUPPORTED, UNKNOWN, LIKELY_REAL

---

## Application
Source: https://docs.expo.dev/versions/v54.0.0/sdk/application/

# Expo Application

A universal library that provides information about the native application's ID, app name, and build version at runtime.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import * as Application from 'expo-application';
```

#### Constants

- **`Application.applicationId`** - The ID of the application (Android: application ID, iOS: bundle ID, web: null).
- **`Application.applicationName`** - The human-readable name of the application.
- **`Application.nativeApplicationVersion`** - The human-readable version of the native application.
- **`Application.nativeBuildVersion`** - The internal build version of the native application.

#### Methods

- **`Application.getAndroidId()`** - Android. Gets the ANDROID_ID value.
- **`Application.getInstallationTimeAsync()`** - Gets the time the app was installed.
- **`Application.getInstallReferrerAsync()`** - Android. Gets the referrer URL of the installed app.
- **`Application.getIosApplicationReleaseTypeAsync()`** - iOS. Gets the iOS application release type.
- **`Application.getIosIdForVendorAsync()`** - iOS. Gets the identifier for vendor (IDFV).
- **`Application.getIosPushNotificationServiceEnvironmentAsync()`** - iOS. Gets the current APN service environment.
- **`Application.getLastUpdateTimeAsync()`** - Android. Gets the last time the app was updated.

#### Enums

**`ApplicationReleaseType`**: UNKNOWN, SIMULATOR, ENTERPRISE, DEVELOPMENT, AD_HOC, APP_STORE

---

## Asset
Source: https://docs.expo.dev/versions/v54.0.0/sdk/asset/

# Expo Asset

A universal library that allows downloading assets and using them with other libraries.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import { Asset } from 'expo-asset';
```

#### Hooks

**`useAssets(moduleIds)`** - Downloads and stores one or more assets locally. Returns `[Asset[] | undefined, Error | undefined]`.

#### Classes

**`Asset`** - Represents an asset in your app.

Properties: `downloaded`, `hash`, `height`, `localUri`, `name`, `type`, `uri`, `width`

Methods:
- `downloadAsync()` - Downloads the asset data to a local file.
- `fromModule(virtualAssetModule)` - Returns the Asset instance representing an asset given its module or URL.
- `loadAsync(moduleId)` - A helper that wraps `Asset.fromModule(module).downloadAsync`.

---

## @react-native-async-storage/async-storage
Source: https://docs.expo.dev/versions/v54.0.0/sdk/async-storage/

# @react-native-async-storage/async-storage

A library that provides an asynchronous, unencrypted, persistent, key-value storage API.
Android, iOS, macOS, tvOS, Web, Included in Expo Go

Async Storage is asynchronous, unencrypted, persistent, key-value storage solution.

[Visit official documentation](https://react-native-async-storage.github.io/2.0/Usage/) — Get full information on API and its usage.

---

## Audio (expo-audio)
Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio/

# Expo Audio (expo-audio)

A library that provides an API to implement audio playback and recording in apps.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import { useAudioPlayer, useAudioRecorder } from 'expo-audio';
```

#### Constants

**`Audio.RecordingPresets`** - Contains `HIGH_QUALITY` and `LOW_QUALITY` preset definitions.

#### Hooks

- **`useAudioPlayer(source, options)`** - Creates an AudioPlayer that automatically releases when the component unmounts.
- **`useAudioPlayerStatus(player)`** - Provides real-time playback status updates.
- **`useAudioRecorder(options, statusListener)`** - Creates an AudioRecorder instance for recording audio.
- **`useAudioRecorderState(recorder, interval)`** - Provides real-time recording state updates.
- **`useAudioSampleListener(player, listener)`** - Sets up audio sampling for an AudioPlayer.

#### Classes

**`AudioPlayer`** - Extends SharedObject<AudioEvents>

Properties: `currentTime`, `duration`, `id`, `isAudioSamplingSupported`, `isBuffering`, `isLoaded`, `loop`, `muted`, `paused`, `playbackRate`, `playing`, `shouldCorrectPitch`, `volume`

Methods: `clearLockScreenControls()`, `pause()`, `play()`, `remove()`, `replace(source)`, `seekTo(seconds, toleranceMillisBefore, toleranceMillisAfter)`, `setActiveForLockScreen(active, metadata, options)`, `setPlaybackRate(rate, pitchCorrectionQuality)`, `updateLockScreenMetadata(metadata)`

**`AudioRecorder`** - Extends SharedObject<RecordingEvents>

Properties: `currentTime`, `id`, `isRecording`, `uri`

Methods: `getAvailableInputs()`, `getCurrentInput()`, `getStatus()`, `pause()`, `prepareToRecordAsync(options)`, `record(options)`, `recordForDuration(seconds)`, `setInput(inputUid)`, `startRecordingAtTime(seconds)`, `stop()`

#### Methods

- **`Audio.createAudioPlayer(source, options)`** - Creates an AudioPlayer that doesn't release automatically.
- **`Audio.getRecordingPermissionsAsync()`** - Checks recording permissions.
- **`Audio.requestRecordingPermissionsAsync()`** - Requests recording permissions.
- **`Audio.setAudioModeAsync(mode)`** - Configures global audio behavior.
- **`Audio.setIsAudioActiveAsync(active)`** - Enables or disables the audio subsystem globally.

#### Types

- **`AudioMode`**: `allowsBackgroundRecording`, `allowsRecording`, `interruptionMode`, `playsInSilentMode`, `shouldPlayInBackground`, `shouldRouteThroughEarpiece`
- **`AudioPlayerOptions`**: `crossOrigin`, `downloadFirst`, `keepAudioSessionActive`, `updateInterval`
- **`AudioSource`**: `assetId`, `headers`, `uri`
- **`AudioStatus`**: `currentTime`, `didJustFinish`, `duration`, `isBuffering`, `isLoaded`, `loop`, `mute`, `playbackRate`, `playing`, `timeControlStatus`, etc.
- **`AudioSample`**: `channels`, `timestamp`
- **`RecordingOptions`**: `android`, `bitRate`, `extension`, `ios`, `numberOfChannels`, `sampleRate`, `web`

#### Enums

- **`InterruptionMode`**: `'mixWithOthers'`, `'doNotMix'`, `'duckOthers'`
- **`PitchCorrectionQuality`**: `'low'`, `'medium'`, `'high'`

---

## Audio (expo-av)
Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio-av/

# Expo Audio (expo-av)

> **Deprecated:** The `Audio` component from `expo-av` has been deprecated and replaced by an improved version in `expo-audio`.

### API

```js
import { Audio } from 'expo-av';
```

#### Classes

**`Recording`** - Represents an audio recording.

**`Sound`** - Represents a sound corresponding to an Asset or URL.

---

## AuthSession
Source: https://docs.expo.dev/versions/v54.0.0/sdk/auth-session/

# Expo AuthSession

A universal library that provides an API to handle browser-based authentication.
Android, iOS, Web

### API

```js
import * as AuthSession from 'expo-auth-session';
```

#### Hooks

- **`useAuthRequest(config, discovery)`** - Load an authorization request for a code.
- **`useAutoDiscovery(issuerOrDiscovery)`** - Fetches and returns the DiscoveryDocument from an OpenID Connect issuer URL.

#### Classes

- **`AccessTokenRequest`** - Exchange an authorization code for a user access token.
- **`AuthError`** - Represents an authorization response error.
- **`AuthRequest`** - Used to manage an authorization request.
- **`RefreshTokenRequest`** - Refresh request.
- **`TokenResponse`** - Token Response.

---

## AV
Source: https://docs.expo.dev/versions/v54.0.0/sdk/av/

# Expo AV

> **Deprecated:** The `Video` and `Audio` APIs from `expo-av` have been deprecated and replaced by improved versions in `expo-video` and `expo-audio`.

### API

```js
import { Audio, Video } from 'expo-av';
```

---

## BackgroundFetch
Source: https://docs.expo.dev/versions/v54.0.0/sdk/background-fetch/

# Expo BackgroundFetch

> **Deprecated:** Being replaced by `expo-background-task`.

### API

```js
import * as BackgroundFetch from 'expo-background-fetch';
```

#### Enums

**`BackgroundFetchResult`**: NoData, NewData, Failed
**`BackgroundFetchStatus`**: Denied, Restricted, Available

---

## BackgroundTask
Source: https://docs.expo.dev/versions/v54.0.0/sdk/background-task/

# Expo BackgroundTask

A library that provides an API for running background tasks.
Android, iOS, tvOS, Included in Expo Go

### API

```js
import * as BackgroundTask from 'expo-background-task';
```

#### Methods

- **`BackgroundTask.getStatusAsync()`** - Returns the status for the Background Task API.
- **`BackgroundTask.registerTaskAsync(taskName, options)`** - Registers a background task.
- **`BackgroundTask.triggerTaskWorkerForTestingAsync()`** - Triggers running the background tasks (debug mode only).
- **`BackgroundTask.unregisterTaskAsync(taskName)`** - Unregisters a background task.

#### Enums

**`BackgroundTaskResult`**: Success, Failed
**`BackgroundTaskStatus`**: Restricted, Available

---

## Barometer
Source: https://docs.expo.dev/versions/v54.0.0/sdk/barometer/

# Expo Barometer

A library that provides access to device's barometer sensor.
Android, iOS (device only), Included in Expo Go

### API

```js
import { Barometer } from 'expo-sensors';
```

#### Types

**`BarometerMeasurement`**

| Property | Type | Description |
|----------|------|-------------|
| pressure | number | Measurement in hectopascals (hPa). |
| relativeAltitude (optional) | number | iOS. Measurement in meters (m). |
| timestamp | number | Timestamp of the measurement in seconds. |

---

## Battery
Source: https://docs.expo.dev/versions/v54.0.0/sdk/battery/

# Expo Battery

A library that provides battery information for the physical device, as well as corresponding event listeners.
Android, iOS (device only), Web, Included in Expo Go

### API

```js
import * as Battery from 'expo-battery';
```

#### Hooks

- **`useBatteryLevel()`** - Gets the device's battery level.
- **`useBatteryState()`** - Gets the device's battery state.
- **`useLowPowerMode()`** - Checks if the device is in low power mode.
- **`usePowerState()`** - Gets the device's power state information.

#### Methods

- **`getBatteryLevelAsync()`** - Gets battery level (0 to 1).
- **`getBatteryStateAsync()`** - Gets battery state.
- **`getPowerStateAsync()`** - Gets power state including battery level, plugged in, and low power mode.
- **`isBatteryOptimizationEnabledAsync()`** - Android. Checks if battery optimization is enabled.
- **`isLowPowerModeEnabledAsync()`** - Gets Low Power Mode status.

#### Enums

**`BatteryState`**: UNKNOWN, UNPLUGGED, CHARGING, FULL

---

## Blob
Source: https://docs.expo.dev/versions/v54.0.0/sdk/blob/

# Expo Blob

A web standards-compliant Blob implementation for React Native.
Android, iOS, Web, Included in Expo Go

### API

```js
import { Blob } from 'expo-blob';
```

#### Classes

**`Blob`** - Web standards-compliant Blob.

Properties: `size`, `type`

Methods: `arrayBuffer()`, `bytes()`, `slice(start, end, contentType)`, `stream()`, `text()`

---

## BlurView
Source: https://docs.expo.dev/versions/v54.0.0/sdk/blur-view/

# Expo BlurView

A React component that blurs everything underneath the view.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import { BlurView } from 'expo-blur';
```

#### Component Props

- **`blurReductionFactor`** - Android. Number by which blur intensity will be divided.
- **`experimentalBlurMethod`** - Android. Blur method to use (`'none'` or `'dimezisBlurView'`).
- **`intensity`** - Number from 1 to 100 to control the intensity.
- **`tint`** - Tint mode: `'light'`, `'dark'`, `'default'`, `'extraLight'`, `'regular'`, `'prominent'`, etc.

---

## Brightness
Source: https://docs.expo.dev/versions/v54.0.0/sdk/brightness/

# Expo Brightness

A library that provides access to an API for getting and setting the screen brightness.
Android, iOS, Included in Expo Go

### API

```js
import * as Brightness from 'expo-brightness';
```

#### Methods

- **`getBrightnessAsync()`** - Gets current brightness level (0 to 1).
- **`getSystemBrightnessAsync()`** - Android. Gets global system screen brightness.
- **`getSystemBrightnessModeAsync()`** - Android. Gets system brightness mode.
- **`setBrightnessAsync(brightnessValue)`** - Sets current screen brightness.
- **`setSystemBrightnessAsync(brightnessValue)`** - Android. Sets global system screen brightness.
- **`setSystemBrightnessModeAsync(brightnessMode)`** - Android. Sets system brightness mode.

#### Enums

**`BrightnessMode`**: UNKNOWN, AUTOMATIC, MANUAL

---

## BuildProperties
Source: https://docs.expo.dev/versions/v54.0.0/sdk/build-properties/

# Expo BuildProperties

A config plugin that allows customizing native build properties during prebuild.
Android, iOS, tvOS

### API

#### Methods

**`BuildProperties.withBuildProperties(config, props)`** - Config plugin allowing customizing native Android and iOS build properties.

#### PluginConfigType

**`android`** properties: `compileSdkVersion`, `targetSdkVersion`, `buildToolsVersion`, `minSdkVersion`, `kotlinVersion`, `newArchEnabled`, `enableMinifyInReleaseBuilds`, `enableShrinkResourcesInReleaseBuilds`, `extraMavenRepos`, `packagingOptions`, etc.

**`ios`** properties: `deploymentTarget`, `newArchEnabled`, `useFrameworks`, `extraPods`, `ccacheEnabled`, `privacyManifestAggregationEnabled`, etc.

---

## Calendar
Source: https://docs.expo.dev/versions/v54.0.0/sdk/calendar/

# Expo Calendar

A library that provides an API for interacting with the device's system calendars, events, reminders, and associated records.
Android, iOS, Included in Expo Go

### API

```js
import * as Calendar from 'expo-calendar';
```

#### Methods (selected)

- **`createEventInCalendarAsync(eventData, presentationOptions)`** - Launches OS calendar UI to create a new event.
- **`openEventInCalendarAsync(params, presentationOptions)`** - Launches OS calendar UI to preview an event.
- **`getCalendarsAsync(entityType)`** - Gets an array of calendar objects.
- **`createCalendarAsync(details)`** - Creates a new calendar.
- **`createEventAsync(calendarId, eventData)`** - Creates a new event.
- **`getEventsAsync(calendarIds, startDate, endDate)`** - Returns events in a given time period.

#### Types

**`Event`**, **`Calendar`**, **`Attendee`**, **`Reminder`**, **`Alarm`**, **`RecurrenceRule`**, **`Source`**

#### Enums

**`Frequency`**: DAILY, WEEKLY, MONTHLY, YEARLY
**`Availability`**: BUSY, FREE, TENTATIVE, UNAVAILABLE, NOT_SUPPORTED
**`CalendarAccessLevel`**: CONTRIBUTOR, EDITOR, FREEBUSY, NONE, OVERRIDE, OWNER, READ, RESPOND, ROOT

---

## Camera
Source: https://docs.expo.dev/versions/v54.0.0/sdk/camera/

# Expo Camera

A React component that renders a preview for the device's front or back camera.
Android (device only), iOS (device only), Web, Included in Expo Go

### API

```js
import { CameraView } from 'expo-camera';
```

#### Component

**`CameraView`** props: `active`, `animateShutter`, `autofocus`, `barcodeScannerSettings`, `enableTorch`, `facing`, `flash`, `mirror`, `mode`, `mute`, `onBarcodeScanned`, `onCameraReady`, `pictureSize`, `ratio`, `zoom`, `videoQuality`, etc.

#### Static Methods

- **`dismissScanner()`** - iOS. Dismiss the scanner.
- **`getAvailableVideoCodecsAsync()`** - iOS. Gets available video codecs.
- **`launchScanner(options)`** - Launches barcode scanner.
- **`scanFromURLAsync(url, barcodeTypes)`** - Scan barcodes from image URL.

#### Component Methods

- **`takePictureAsync(options)`** - Takes a picture.
- **`recordAsync(options)`** - Records a video.
- **`stopRecording()`** - Stops recording.
- **`getAvailablePictureSizesAsync()`** - Gets available picture sizes.

#### Hooks

- **`useCameraPermissions(options)`** - Check or request camera permissions.
- **`useMicrophonePermissions(options)`** - Check or request microphone permissions.

---

## react-native-view-shot
Source: https://docs.expo.dev/versions/v54.0.0/sdk/captureRef/

# react-native-view-shot

A library that allows you to capture a React Native view and save it as an image.
Android, iOS, Included in Expo Go

[Visit official documentation](https://github.com/gre/react-native-view-shot) — Get full information on API and its usage.

---

## Cellular
Source: https://docs.expo.dev/versions/v54.0.0/sdk/cellular/

# Expo Cellular

An API that provides information about the user's cellular service provider.
Android, iOS, Web, Included in Expo Go

### API

```js
import * as Cellular from 'expo-cellular';
```

#### Constants (deprecated, use async methods instead)

- `Cellular.allowsVoip` - Indicates if carrier allows VoIP calls.
- `Cellular.carrier` - The name of the user's home cellular service provider.
- `Cellular.isoCountryCode` - ISO country code for the cellular service provider.

#### Methods

- **`allowsVoipAsync()`** - Returns if carrier allows VoIP calls.
- **`getCarrierNameAsync()`** - Returns name of the user's home cellular service provider.
- **`getCellularGenerationAsync()`** - Returns current cellular-generation type.
- **`getIsoCountryCodeAsync()`** - Returns ISO country code.
- **`getMobileCountryCodeAsync()`** - Returns mobile country code (MCC).
- **`getMobileNetworkCodeAsync()`** - Returns mobile network code (MNC).

#### Enums

**`CellularGeneration`**: UNKNOWN, CELLULAR_2G, CELLULAR_3G, CELLULAR_4G, CELLULAR_5G

---

## Checkbox
Source: https://docs.expo.dev/versions/v54.0.0/sdk/checkbox/

# Expo Checkbox

A universal React component that provides basic checkbox functionality.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import { Checkbox } from 'expo-checkbox';
```

#### Component Props

- **`color`** - The tint or color of the checkbox.
- **`disabled`** - If the checkbox is disabled.
- **`onChange`** - Callback when user presses the checkbox.
- **`onValueChange`** - Callback with the new boolean value.
- **`value`** - Boolean indicating if checked.

---

## Clipboard
Source: https://docs.expo.dev/versions/v54.0.0/sdk/clipboard/

# Expo Clipboard

A universal library that allows getting and setting Clipboard content.
Android, iOS, Web, Included in Expo Go

### API

```js
import * as Clipboard from 'expo-clipboard';
```

#### Component

**`ClipboardPasteButton`** - Displays the UIPasteControl button.

#### Methods

- **`getImageAsync(options)`** - Gets image from clipboard.
- **`getStringAsync(options)`** - Gets text content from clipboard.
- **`getUrlAsync()`** - iOS. Gets URL from clipboard.
- **`hasImageAsync()`** - Checks if clipboard has image content.
- **`hasStringAsync()`** - Checks if clipboard has text content.
- **`hasUrlAsync()`** - iOS. Checks if clipboard has URL content.
- **`setImageAsync(base64Image)`** - Sets an image in clipboard.
- **`setStringAsync(text, options)`** - Sets text content in clipboard.
- **`setUrlAsync(url)`** - iOS. Sets a URL in clipboard.

---

## Constants
Source: https://docs.expo.dev/versions/v54.0.0/sdk/constants/

# Expo Constants

An API that provides system information that remains constant throughout the lifetime of your app's installation.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import Constants from 'expo-constants';
```

#### Enums

**`ExecutionEnvironment`**: Bare, Standalone, StoreClient
**`UserInterfaceIdiom`**: Desktop, Handset, Tablet, TV, Unsupported

---

## Contacts
Source: https://docs.expo.dev/versions/v54.0.0/sdk/contacts/

# Expo Contacts

A library that provides access to the phone's system contacts.
Android, iOS, Included in Expo Go

### API

```js
import * as Contacts from 'expo-contacts';
```

#### Component

**`ContactAccessButton`** - iOS 18.0+. Creates a contact access button.

#### Methods

- **`addContactAsync(contact, containerId)`** - Creates a new contact.
- **`getContactsAsync(contactQuery)`** - Returns a list of contacts.
- **`getContactByIdAsync(id, fields)`** - Returns a contact matching the given id.
- **`presentContactPickerAsync()`** - Presents a native contact picker.
- **`presentFormAsync(contactId, contact, formOptions)`** - Presents a native form for manipulating contacts.
- **`updateContactAsync(contact)`** - Updates an existing contact.
- **`shareContactAsync(contactId, message, shareOptions)`** - Shares a contact.

#### Types

**`Contact`**, **`ContactQuery`**, **`ContactResponse`**, **`PhoneNumber`**, **`Email`**, **`Address`**, **`Image`**

---

## Crypto
Source: https://docs.expo.dev/versions/v54.0.0/sdk/crypto/

# Expo Crypto

A universal library for crypto operations.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import * as Crypto from 'expo-crypto';
```

#### Methods

- **`Crypto.digest(algorithm, data)`** - Generates a digest of the supplied TypedArray. Returns Promise<ArrayBuffer>.
- **`Crypto.digestStringAsync(algorithm, data, options)`** - Generates a digest of the supplied string.
- **`Crypto.getRandomBytes(byteCount)`** - Generates random bytes. Returns Uint8Array.
- **`Crypto.getRandomBytesAsync(byteCount)`** - Async version of getRandomBytes.
- **`Crypto.getRandomValues(typedArray)`** - Fills a TypedArray with cryptographically secure random values.
- **`Crypto.randomUUID()`** - Returns a UUIDv4 identifier.

#### Enums

**`CryptoDigestAlgorithm`**: MD2, MD4, MD5, SHA1, SHA256, SHA384, SHA512
**`CryptoEncoding`**: BASE64, HEX

---

## @react-native-community/datetimepicker
Source: https://docs.expo.dev/versions/v54.0.0/sdk/date-time-picker/

# @react-native-community/datetimepicker

A component that provides access to the system UI for date and time selection.
Android, iOS, Included in Expo Go

[Visit official documentation](https://github.com/react-native-datetimepicker/datetimepicker)

---

## DevClient
Source: https://docs.expo.dev/versions/v54.0.0/sdk/dev-client/

# Expo DevClient

A library that allows creating a development build and includes useful development tools.
Android, iOS, tvOS

### API

```js
import * as DevClient from 'expo-dev-client';
```

#### Methods

- **`DevClient.closeMenu()`** - Closes development client menu.
- **`DevClient.hideMenu()`** - Hides development client menu.
- **`DevClient.openMenu()`** - Opens development client menu.
- **`DevClient.registerDevMenuItems(items)`** - Allows specifying custom entries in the development client menu.

---

## Device
Source: https://docs.expo.dev/versions/v54.0.0/sdk/device/

# Expo Device

A universal library provides access to system information about the physical device.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import * as Device from 'expo-device';
```

#### Constants

- **`Device.brand`** - The device brand.
- **`Device.deviceName`** - The human-readable name of the device.
- **`Device.deviceType`** - The type of the device as a DeviceType enum value.
- **`Device.deviceYearClass`** - The device year class.
- **`Device.isDevice`** - true if running on a real device.
- **`Device.manufacturer`** - The actual device manufacturer.
- **`Device.modelName`** - The human-friendly name of the device model.
- **`Device.osVersion`** - The human-readable OS version string.
- **`Device.totalMemory`** - The device's total memory in bytes.

#### Enums

**`DeviceType`**: UNKNOWN, PHONE, TABLET, DESKTOP, TV

---

## DeviceMotion
Source: https://docs.expo.dev/versions/v54.0.0/sdk/devicemotion/

# Expo DeviceMotion

A library that provides access to a device's motion and orientation sensors.
Android, iOS, Web, Included in Expo Go

### API

```js
import { DeviceMotion } from 'expo-sensors';
```

#### Types

**`DeviceMotionMeasurement`**

| Property | Type | Description |
|----------|------|-------------|
| acceleration | { x, y, z } \| null | Device acceleration in m/s^2. |
| accelerationIncludingGravity | { x, y, z } | Acceleration with gravity. |
| interval | number | Interval in milliseconds. |
| orientation | DeviceMotionOrientation | Based on screen rotation (0, 90, 180, -90). |
| rotation | { alpha, beta, gamma } | Orientation in space. |
| rotationRate | { alpha, beta, gamma } \| null | Rate of rotation in deg/s. |

---

## DocumentPicker
Source: https://docs.expo.dev/versions/v54.0.0/sdk/document-picker/

# Expo DocumentPicker

A library that provides access to the system's UI for selecting documents.
Android, iOS, Web, Included in Expo Go

### API

```js
import * as DocumentPicker from 'expo-document-picker';
```

#### Types

**`DocumentPickerOptions`**: `base64`, `copyToCacheDirectory`, `multiple`, `type`

**`DocumentPickerResult`**: `DocumentPickerSuccessResult | DocumentPickerCanceledResult`

**`DocumentPickerAsset`**: `uri`, `name`, `size`, `mimeType`, `lastModified`, `base64` (web), `file` (web)

---

## Expo
Source: https://docs.expo.dev/versions/v54.0.0/sdk/expo/

# Expo

Set of common methods and types for Expo and related packages.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```tsx
import * as Expo from 'expo';
```

#### `expo/fetch` API

WinterCG-compliant Fetch API.

```ts
import { fetch } from 'expo/fetch';
```

#### Encoding APIs

`TextEncoder` and `TextDecoder` are built-in APIs. `TextEncoderStream` and `TextDecoderStream` also available.

#### Streams API

Global support for `ReadableStream`, `WritableStream`, and `TransformStream`.

#### URL API

`URL` and `URLSearchParams` implementations.

#### Hooks

- **`useEvent(eventEmitter, eventName, initialValue)`** - React hook that listens to events emitted by the given object.
- **`useEventListener(eventEmitter, eventName, listener)`** - React hook that calls listener on events.

#### Classes

- **`EventEmitterType`** - Provides a consistent API for emitting and listening to events.
- **`NativeModuleType`** - Class for all native modules.
- **`SharedObjectType`** - Base class for all shared objects.
- **`SharedRefType`** - SharedObject that holds a reference to any native object.

#### Methods

- **`isRunningInExpoGo()`** - Returns whether the app is running in Expo Go.
- **`registerRootComponent(component)`** - Sets the initial React component.
- **`reloadAppAsync(reason)`** - Reloads the app.
- **`requireNativeModule(moduleName)`** - Imports a native module.

---

## FileSystem
Source: https://docs.expo.dev/versions/v54.0.0/sdk/filesystem/

# Expo FileSystem

A library that provides access to the local file system on the device.
Android, iOS, tvOS, Included in Expo Go

### API

```js
import { File, Directory, Paths } from 'expo-file-system';
```

#### Classes

**`Directory`** - Represents a directory on the filesystem.

Properties: `exists`, `size`, `uri`, `name`, `parentDirectory`

Methods: `copy(destination)`, `create(options)`, `delete()`, `info()`, `list()`, `move(destination)`, `pickDirectoryAsync(initialUri)`, `rename(newName)`

**`File`** - Represents a file on the filesystem. Implements Blob.

Properties: `creationTime`, `exists`, `md5`, `modificationTime`, `size`, `type`, `uri`, `extension`, `name`, `parentDirectory`

Methods: `arrayBuffer()`, `base64()`, `bytes()`, `copy(destination)`, `create(options)`, `delete()`, `downloadFileAsync(url, destination, options)`, `info(options)`, `move(destination)`, `open()`, `pickFileAsync()`, `readableStream()`, `rename(newName)`, `slice(start, end, contentType)`, `stream()`, `text()`, `writableStream()`, `write(content)`

**`FileHandle`** - Provides read/write access to a file.

**`Paths`** - Path utilities.

Properties: `appleSharedContainers`, `availableDiskSpace`, `bundle`, `cache`, `document`, `totalDiskSpace`

Methods: `basename()`, `dirname()`, `extname()`, `join()`, `normalize()`, `parse()`, `relative()`

---

## FileSystem (legacy)
Source: https://docs.expo.dev/versions/v54.0.0/sdk/filesystem-legacy/

# Expo FileSystem (legacy)

The legacy version of the FileSystem API included in `expo-file-system`.

### API

```js
import * as FileSystem from 'expo-file-system/legacy';
```

#### Classes

**`DownloadResumable`** - Can start, pause, and resume downloads.
**`UploadTask`** - Upload task.

#### Methods

- `copyAsync(options)`, `deleteAsync(fileUri, options)`, `downloadAsync(uri, fileUri, options)`, `getInfoAsync(fileUri, options)`, `makeDirectoryAsync(fileUri, options)`, `moveAsync(options)`, `readAsStringAsync(fileUri, options)`, `readDirectoryAsync(fileUri)`, `uploadAsync(url, fileUri, options)`, `writeAsStringAsync(fileUri, contents, options)`

#### Namespaces

**`StorageAccessFramework`** - Android SAF URI operations.

---

## Expo Fingerprint
Source: https://docs.expo.dev/versions/v54.0.0/sdk/fingerprint/

# Expo Fingerprint

A library to generate a fingerprint from a React Native project.
Node

### API

```ts
import * as Fingerprint from '@expo/fingerprint';
```

#### Methods

- **`createFingerprintAsync(projectRoot, options)`** - Create a fingerprint for a project.
- **`createProjectHashAsync(projectRoot, options)`** - Create a native hash value for a project.
- **`diffFingerprintChangesAsync(fingerprint, projectRoot, options)`** - Diff the fingerprint with the fingerprint of the provided project.
- **`diffFingerprints(fingerprint1, fingerprint2)`** - Diff two fingerprints.

#### Enums

**`SourceSkips`**: None, ExpoConfigVersions, ExpoConfigRuntimeVersionIfString, ExpoConfigNames, ExpoConfigAndroidPackage, ExpoConfigIosBundleIdentifier, ExpoConfigSchemes, ExpoConfigEASProject, ExpoConfigAssets, ExpoConfigAll, PackageJsonAndroidAndIosScriptsIfNotContainRun, PackageJsonScriptsAll, GitIgnore, ExpoConfigExtraSection

---

## @shopify/flash-list
Source: https://docs.expo.dev/versions/v54.0.0/sdk/flash-list/

# @shopify/flash-list

A React Native component that provides a fast and performant way to render lists.
Android, iOS, tvOS, Web, Included in Expo Go

[Visit official documentation](https://shopify.github.io/flash-list/)

---

## Font
Source: https://docs.expo.dev/versions/v54.0.0/sdk/font/

# Expo Font

A library that allows loading fonts at runtime and using them in React Native components.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import * as Font from 'expo-font';
```

#### Hooks

**`useFonts(map)`** - Load a map of fonts at runtime. Returns `[boolean, Error | null]`.

#### Methods

- **`getLoadedFonts()`** - Get all loaded fonts.
- **`isLoaded(fontFamily)`** - Detect if a font has finished loading.
- **`isLoading(fontFamily)`** - Detect if a font is still loading.
- **`loadAsync(fontFamilyOrFontMap, source)`** - Load fonts from static or remote resources.
- **`renderToImageAsync(glyphs, options)`** - Creates an image with provided text.

---

## react-native-gesture-handler
Source: https://docs.expo.dev/versions/v54.0.0/sdk/gesture-handler/

# react-native-gesture-handler

A library that provides an API for handling complex gestures.
Android, iOS, Web, Included in Expo Go

[Visit official documentation](https://docs.swmansion.com/react-native-gesture-handler/)

---

## GLView
Source: https://docs.expo.dev/versions/v54.0.0/sdk/gl-view/

# Expo GLView

A library that provides GLView that acts as an OpenGL ES render target and provides GLContext.
Android, iOS, Web, Included in Expo Go

### API

```js
import { GLView } from 'expo-gl';
```

#### Component Props

- **`enableExperimentalWorkletSupport`** - Enables Reanimated worklet support.
- **`msaaSamples`** - iOS. Number of multisampling samples.
- **`onContextCreate`** - Called when OpenGL ES context is created.

#### Static Methods

- **`createContextAsync()`** - Creates headless context.
- **`destroyContextAsync(exgl)`** - Destroys given context.
- **`takeSnapshotAsync(exgl, options)`** - Takes a snapshot of the framebuffer.
- **`getWorkletContext(contextId)`** - Gets WebGL context for use in worklets.

---

## GlassEffect
Source: https://docs.expo.dev/versions/v54.0.0/sdk/glass-effect/

# Expo GlassEffect

React components that render a liquid glass effect using iOS's native UIVisualEffectView.
iOS, tvOS, Included in Expo Go

> `GlassView` is only available on iOS 26 and above.

### API

```js
import { GlassView, GlassContainer, isLiquidGlassAvailable, isGlassEffectAPIAvailable } from 'expo-glass-effect';
```

#### Components

**`GlassContainer`** - Combines multiple glass views into a combined effect.

Props: `spacing`

**`GlassView`** - Renders the native iOS glass effect.

Props: `glassEffectStyle` ('clear' | 'regular'), `isInteractive`, `tintColor`

#### Methods

- **`isLiquidGlassAvailable()`** - Checks if Liquid Glass design is compiled in the app.
- **`isGlassEffectAPIAvailable()`** - Checks if Liquid Glass API is available at runtime.

---

## Gyroscope
Source: https://docs.expo.dev/versions/v54.0.0/sdk/gyroscope/

# Expo Gyroscope

A library that provides access to the device's gyroscope sensor.
Android, iOS (device only), Web, Included in Expo Go

### API

```js
import { Gyroscope } from 'expo-sensors';
```

#### Types

**`GyroscopeMeasurement`**

| Property | Type | Description |
|----------|------|-------------|
| timestamp | number | Timestamp in seconds. |
| x | number | Rotation in rad/s on X axis. |
| y | number | Rotation in rad/s on Y axis. |
| z | number | Rotation in rad/s on Z axis. |

---

## Haptics
Source: https://docs.expo.dev/versions/v54.0.0/sdk/haptics/

# Expo Haptics

A library that provides access to the system's vibration effects.
Android, iOS, Web

### API

```js
import * as Haptics from 'expo-haptics';
```

#### Methods

- **`impactAsync(style)`** - Collision impact feedback.
- **`notificationAsync(type)`** - Notification response feedback.
- **`performAndroidHapticsAsync(type)`** - Android. Use device haptics engine.
- **`selectionAsync()`** - Selection change feedback.

#### Enums

**`ImpactFeedbackStyle`**: Light, Medium, Heavy, Rigid, Soft
**`NotificationFeedbackType`**: Success, Warning, Error
**`AndroidHaptics`**: Clock_Tick, Confirm, Context_Click, Drag_Start, Gesture_End, Gesture_Start, Keyboard_Press, Keyboard_Release, Keyboard_Tap, Long_Press, Reject, Segment_Tick, Toggle_Off, Toggle_On, Virtual_Key, etc.

---

## Image
Source: https://docs.expo.dev/versions/v54.0.0/sdk/image/

# Expo Image

A cross-platform and performant React component that loads and renders images.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import { Image } from 'expo-image';
```

#### Components

**`Image`** props: `accessibilityLabel`, `alt`, `autoplay`, `blurRadius`, `cachePolicy`, `contentFit`, `contentPosition`, `enableLiveTextInteraction`, `placeholder`, `placeholderContentFit`, `priority`, `recyclingKey`, `source`, `tintColor`, `transition`, etc.

**`ImageBackground`** - Use an image as a background with content on top.

#### Static Methods

- **`clearDiskCache()`** - Clears disk cache.
- **`clearMemoryCache()`** - Clears memory cache.
- **`generateBlurhashAsync(source, numberOfComponents)`** - Generates a Blurhash from an image.
- **`generateThumbhashAsync(source)`** - Generates a Thumbhash from an image.
- **`getCachePathAsync(cacheKey)`** - Gets path of cached image.
- **`loadAsync(source, options)`** - Loads an image to memory.
- **`prefetch(urls, cachePolicy)`** - Preloads images.

#### Hooks

**`useImage(source, options, dependencies)`** - Loads an image and returns an ImageRef.

#### Classes

**`ImageRef`** - Reference to a native image instance. Properties: `height`, `width`, `scale`, `isAnimated`, `mediaType`

---

## ImageManipulator
Source: https://docs.expo.dev/versions/v54.0.0/sdk/imagemanipulator/

# Expo ImageManipulator

A library that provides an API for image manipulation on the local file system.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import * as ImageManipulator from 'expo-image-manipulator';
```

#### Hooks

**`useImageManipulator(source)`** - Returns an ImageManipulatorContext.

#### Classes

**`ImageManipulatorContext`** - Provides synchronous, chainable transformation methods.

Methods: `crop(rect)`, `flip(flipType)`, `renderAsync()`, `reset()`, `resize(size)`, `rotate(degrees)`

**`ImageRef`** - Reference to a native image instance. Methods: `saveAsync(options)`

---

## ImagePicker
Source: https://docs.expo.dev/versions/v54.0.0/sdk/imagepicker/

# Expo ImagePicker

A library that provides access to the system's UI for selecting images and videos.
Android, iOS, Web, Included in Expo Go

### API

```js
import * as ImagePicker from 'expo-image-picker';
```

#### Hooks

- **`useCameraPermissions(options)`** - Check or request camera permissions.
- **`useMediaLibraryPermissions(options)`** - Check or request media library permissions.

#### Methods

- **`launchCameraAsync(options)`** - Display system UI for taking a photo.
- **`launchImageLibraryAsync(options)`** - Display system UI for choosing an image/video.
- **`getPendingResultAsync()`** - Retrieves lost data after Android kills MainActivity.
- **`requestCameraPermissionsAsync()`** - Requests camera permissions.
- **`requestMediaLibraryPermissionsAsync(writeOnly)`** - Requests media library permissions.

#### Types

**`ImagePickerOptions`**: `allowsEditing`, `allowsMultipleSelection`, `aspect`, `base64`, `cameraType`, `exif`, `mediaTypes`, `quality`, `selectionLimit`, `videoExportPreset`, `videoMaxDuration`, etc.

**`ImagePickerAsset`**: `assetId`, `base64`, `duration`, `exif`, `fileName`, `fileSize`, `height`, `width`, `type`, `uri`, `pairedVideoAsset`

---

## IntentLauncher
Source: https://docs.expo.dev/versions/v54.0.0/sdk/intent-launcher/

# Expo IntentLauncher

A library that provides an API to launch Android intents.
Android, Included in Expo Go

### API

```js
import * as IntentLauncher from 'expo-intent-launcher';
```

#### Methods

- **`getApplicationIconAsync(packageName)`** - Returns the icon of the specified application as a base64-encoded PNG.
- **`openApplication(packageName)`** - Opens an application by its package name.
- **`startActivityAsync(activityAction, params)`** - Starts the specified activity.

#### Enums

**`ActivityAction`** - Hundreds of Android settings actions (e.g., `WIFI_SETTINGS`, `BLUETOOTH_SETTINGS`, `LOCATION_SOURCE_SETTINGS`, `APPLICATION_DETAILS_SETTINGS`, etc.)

**`ResultCode`**: Success, Canceled, FirstUser

---

## KeepAwake
Source: https://docs.expo.dev/versions/v54.0.0/sdk/keep-awake/

# Expo KeepAwake

A React component that prevents the screen from sleeping when rendered.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import * as KeepAwake from 'expo-keep-awake';
```

#### Hooks

**`useKeepAwake(tag, options)`** - Keeps screen awake while component is mounted.

#### Methods

- **`activateKeepAwakeAsync(tag)`** - Prevents screen from sleeping.
- **`deactivateKeepAwake(tag)`** - Releases screen-sleep prevention.
- **`isAvailableAsync()`** - Returns true if wake lock is available.

---

## react-native-keyboard-controller
Source: https://docs.expo.dev/versions/v54.0.0/sdk/keyboard-controller/

# react-native-keyboard-controller

A library that provides a Keyboard manager that works identically on Android and iOS.
Android, iOS, Included in Expo Go

[Visit official documentation](https://kirillzyusko.github.io/react-native-keyboard-controller/)

[Advanced keyboard handling guide](https://docs.expo.dev/guides/keyboard-handling#advanced-keyboard-handling-with-keyboard-controller)

---

## LightSensor
Source: https://docs.expo.dev/versions/v54.0.0/sdk/light-sensor/

# Expo LightSensor

A library that provides access to the device's light sensor.
Android, Included in Expo Go

### API

```js
import { LightSensor } from 'expo-sensors';
```

#### Types

**`LightSensorMeasurement`**

| Property | Type | Description |
|----------|------|-------------|
| illuminance | number | Ambient light level in lux (lx). |
| timestamp | number | Timestamp in seconds. |

---

## LinearGradient
Source: https://docs.expo.dev/versions/v54.0.0/sdk/linear-gradient/

# Expo LinearGradient

A universal React component that renders a gradient view.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import { LinearGradient } from 'expo-linear-gradient';
```

#### Component Props

- **`colors`** - Array of colors for gradient stops (at least 2 required).
- **`dither`** - Android. Enables/disables paint dithering.
- **`end`** - End point of gradient `{ x: number, y: number }`.
- **`locations`** - Array of numbers from 0 to 1 indicating color-stop locations.
- **`start`** - Start point of gradient `{ x: number, y: number }`.

---

## Linking
Source: https://docs.expo.dev/versions/v54.0.0/sdk/linking/

# Expo Linking

An API that provides methods to create and open deep links universally.
Android, iOS, tvOS, Web, Included in Expo Go

### API

```js
import * as Linking from 'expo-linking';
```

#### Hooks

- **`useLinkingURL()`** - Returns the linking URL and subsequent changes.

#### Methods

- **`canOpenURL(url)`** - Determine if an installed app can handle a URL.
- **`createURL(path, namedParameters)`** - Constructs a deep link into your app.
- **`getInitialURL()`** - Gets the URL used to launch the app.
- **`openSettings()`** - Opens OS settings for the app.
- **`openURL(url)`** - Opens a URL with an installed app.
- **`parse(url)`** - Parses deep link information from a URL.
- **`parseInitialURLAsync()`** - Parses the deep link that launched the app.

#### Types

**`ParsedURL`**: `hostname`, `path`, `queryParams`, `scheme`
**`CreateURLOptions`**: `isTripleSlashed`, `queryParams`, `scheme`

---

## LivePhoto
Source: https://docs.expo.dev/versions/v54.0.0/sdk/live-photo/

# Expo LivePhoto

A library that allows displaying Live Photos on iOS.
iOS, Included in Expo Go

### API

```js
import { LivePhotoView } from 'expo-live-photo';
```

#### Component

**`LivePhotoView`** - Displays a Live Photo.

Props: `contentFit`, `isMuted`, `source`, `useDefaultGestureRecognizer`, `onLoadComplete`, `onLoadError`, `onLoadStart`, `onPlaybackStart`, `onPlaybackStop`, `onPreviewPhotoLoad`

#### Types

**`LivePhotoAsset`**: `photoUri`, `pairedVideoUri`
**`PlaybackStyle`**: `'hint' | 'full'`


---


## LocalAuthentication
Source: https://docs.expo.dev/versions/v54.0.0/sdk/local-authentication/

A library that provides functionality for implementing the Fingerprint API (Android) or FaceID and TouchID (iOS) to authenticate the user with a face or fingerprint scan.

`expo-local-authentication` allows you to use the Biometric Prompt (Android) or FaceID and TouchID (iOS) to authenticate the user with a fingerprint or face scan.

### Known limitation
#### iOS
The FaceID authentication for iOS is not supported in Expo Go. You will need to create a development build to test FaceID.

### Installation
```
npx expo install expo-local-authentication
```

### Configuration in app config
Config plugin example:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-local-authentication",
        { "faceIDPermission": "Allow $(PRODUCT_NAME) to use Face ID." }
      ]
    ]
  }
}
```

Configurable properties:
- `faceIDPermission` (iOS): string for `NSFaceIDUsageDescription` permission message.

### API
```js
import * as LocalAuthentication from 'expo-local-authentication';
```

Methods:
- `authenticateAsync(options)` - Attempts to authenticate via Fingerprint/TouchID (or FaceID if available).
- `cancelAuthenticate()` - Cancels authentication flow (Android).
- `getEnrolledLevelAsync()` - Determine what kind of authentication is enrolled.
- `hasHardwareAsync()` - Determine whether a face or fingerprint scanner is available.
- `isEnrolledAsync()` - Determine whether the device has saved fingerprints or facial data.
- `supportedAuthenticationTypesAsync()` - Determine what kinds of authentications are available.

Types: `BiometricsSecurityLevel`, `LocalAuthenticationError`, `LocalAuthenticationOptions`, `LocalAuthenticationResult`
Enums: `AuthenticationType` (FINGERPRINT=1, FACIAL_RECOGNITION=2, IRIS=3), `SecurityLevel` (NONE=0, SECRET=1, BIOMETRIC_WEAK=2, BIOMETRIC_STRONG=3)

Permissions: Android adds `USE_BIOMETRIC` and `USE_FINGERPRINT`. iOS uses `NSFaceIDUsageDescription`.

---

## Localization
Source: https://docs.expo.dev/versions/v54.0.0/sdk/localization/

A library that provides an interface for native user localization information.

`expo-localization` allows you to Localize your app, customizing the experience for specific regions, languages, or cultures. It also provides access to the locale data on the native device.

### Installation
```
npx expo install expo-localization
```

### Usage
```jsx
import { getLocales, getCalendars } from 'expo-localization';
```

### Hooks
- `useCalendars()` - Returns array of `Calendar` objects.
- `useLocales()` - Returns array of `Locale` objects.

### Methods
- `getCalendars()` - List of user's preferred calendars.
- `getLocales()` - List of user's locales.

### Types
`Calendar`: calendar, firstWeekday, timeZone, uses24hourClock
`Locale`: currencyCode, currencySymbol, decimalSeparator, digitGroupingSeparator, languageCode, languageTag, measurementSystem, regionCode, temperatureUnit, textDirection, and more.

### Enums
`CalendarIdentifier` (BUDDHIST, CHINESE, COPTIC, DANGI, GREGORIAN, HEBREW, ISLAMIC, JAPANESE, PERSIAN, etc.)
`Weekday` (SUNDAY=1 through SATURDAY=7)

---

## Location
Source: https://docs.expo.dev/versions/v54.0.0/sdk/location/

A library that provides access to reading geolocation information, polling current location or subscribing location update events from the device.

### Installation
```
npx expo install expo-location
```

### Configuration in app config
Config plugin properties:
- `locationAlwaysAndWhenInUsePermission` (iOS)
- `locationAlwaysPermission` (iOS, deprecated)
- `locationWhenInUsePermission` (iOS)
- `isIosBackgroundLocationEnabled`
- `isAndroidBackgroundLocationEnabled`
- `isAndroidForegroundServiceEnabled`

### Background location
Requires location permissions, background location task definition, and platform-specific configuration.

### Geofencing methods
Requires location permissions and task definition. Android allows up to 100 active geofences. iOS limits to 20 regions.

### Background permissions
Android: request both foreground and background permissions. iOS: must be granted with "Always" option.

### Deferred locations
Configured through `LocationTaskOptions` using `deferredUpdatesDistance`, `deferredUpdatesInterval`, `deferredTimeout`.

### Hooks
- `useBackgroundPermissions(options)`
- `useForegroundPermissions(options)`

### Methods
- `enableNetworkProviderAsync()` (Android)
- `geocodeAsync(address)`
- `getBackgroundPermissionsAsync()`
- `getCurrentPositionAsync(options)`
- `getForegroundPermissionsAsync()`
- `getHeadingAsync()`
- `getLastKnownPositionAsync(options)`
- `getProviderStatusAsync()`
- `hasServicesEnabledAsync()`
- `hasStartedGeofencingAsync(taskName)`
- `hasStartedLocationUpdatesAsync(taskName)`
- `installWebGeolocationPolyfill()`
- `isBackgroundLocationAvailableAsync()`
- `requestBackgroundPermissionsAsync()`
- `requestForegroundPermissionsAsync()`
- `reverseGeocodeAsync(location)`
- `startGeofencingAsync(taskName, regions)`
- `startLocationUpdatesAsync(taskName, options)`
- `stopGeofencingAsync(taskName)`
- `stopLocationUpdatesAsync(taskName)`
- `watchHeadingAsync(callback, errorHandler)`
- `watchPositionAsync(options, callback, errorHandler)`

### Types
`LocationGeocodedAddress`, `LocationGeocodedLocation`, `LocationHeadingObject`, `LocationLastKnownOptions`, `LocationObject`, `LocationObjectCoords`, `LocationOptions`, `LocationPermissionResponse`, `LocationProviderStatus`, `LocationRegion`, `LocationSubscription`, `LocationTaskOptions`, `LocationTaskServiceOptions`, `PermissionDetailsLocationAndroid`, `PermissionDetailsLocationIOS`

### Enums
`Accuracy` (Lowest=1, Low=2, Balanced=3, High=4, Highest=5, BestForNavigation=6)
`ActivityType` (Other=1, AutomotiveNavigation=2, Fitness=3, OtherNavigation=4, Airborne=5)
`GeofencingEventType` (Enter=1, Exit=2)
`GeofencingRegionState` (Unknown=0, Inside=1, Outside=2)
`PermissionStatus` (DENIED, GRANTED, UNDETERMINED)

### Permissions
Android: ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION, FOREGROUND_SERVICE, FOREGROUND_SERVICE_LOCATION, ACCESS_BACKGROUND_LOCATION
iOS: NSLocationAlwaysAndWhenInUseUsageDescription, NSLocationAlwaysUsageDescription, NSLocationWhenInUseUsageDescription

---

## Magnetometer
Source: https://docs.expo.dev/versions/v54.0.0/sdk/magnetometer/

A library that provides access to the device's magnetometer sensor.

`Magnetometer` from `expo-sensors` provides access to the device magnetometer sensor(s) to respond to and measure the changes in the magnetic field measured in microtesla (μT).

### Installation
```
npx expo install expo-sensors
```

### Usage
```jsx
import { Magnetometer } from 'expo-sensors';
```

### API
```js
import { Magnetometer, MagnetometerUncalibrated } from 'expo-sensors';
```

### Classes
`Magnetometer` extends `DeviceSensor<MagnetometerMeasurement>`

Methods: `addListener(listener)`, `getListenerCount()`, `getPermissionsAsync()`, `hasListeners()`, `isAvailableAsync()`, `removeAllListeners()`, `removeSubscription(subscription)`, `requestPermissionsAsync()`, `setUpdateInterval(intervalMs)`

### Types
`MagnetometerMeasurement`: timestamp, x, y, z (magnetic field in μT)
`PermissionExpiration`, `PermissionResponse`

### Enums
`PermissionStatus` (DENIED, GRANTED, UNDETERMINED)

---

## MailComposer
Source: https://docs.expo.dev/versions/v54.0.0/sdk/mail-composer/

A library that provides functionality to compose and send emails with the system's specific UI.

### Installation
```
npx expo install expo-mail-composer
```

### API
```js
import * as MailComposer from 'expo-mail-composer';
```

Methods:
- `composeAsync(options)` - Opens a mail modal for iOS and a mail app intent for Android.
- `getClients()` - Retrieves a list of available email clients.
- `isAvailableAsync()` - Determine if the MailComposer API can be used.

Types:
`MailClient`: label, packageName (Android), url (iOS)
`MailComposerOptions`: attachments, bccRecipients, body, ccRecipients, isHtml, recipients, subject
`MailComposerResult`: status

Enums:
`MailComposerStatus` (CANCELLED, SAVED, SENT, UNDETERMINED)

---

## Manifests
Source: https://docs.expo.dev/versions/v54.0.0/sdk/manifests/

A library that provides types for Expo Manifests.

### Installation
```
npx expo install expo-manifests
```

### API
```js
import * as Manifests from 'expo-manifests';
```

Types: `BareManifest` (deprecated, renamed to `EmbeddedManifest`), `ClientScopingConfig`, `EASConfig`, `EmbeddedManifest`, `ExpoClientConfig`, `ExpoGoConfig`, `ExpoGoPackagerOpts`, `ExpoUpdatesManifest`, `ManifestAsset`, `ManifestExtra`, `NewManifest` (deprecated, renamed to `ExpoUpdatesManifest`)

---

## react-native-maps (Map View)
Source: https://docs.expo.dev/versions/v54.0.0/sdk/map-view/

A library that provides a Map component that uses Google Maps on Android and Apple Maps or Google Maps on iOS.

### Installation
```
npx expo install react-native-maps
```

### Usage
```jsx
import MapView from 'react-native-maps';
```

### Deploy app with Google Maps
Requires registering a Google Cloud API project, enabling the Maps SDK, creating an API key, and adding it to app.json.

Android: Add API key under `android.config.googleMaps.apiKey`. Use `PROVIDER_GOOGLE`.
iOS: Add API key under `ios.config.googleMapsApiKey`. Use `PROVIDER_GOOGLE`.

---

## Maps (expo-maps)
Source: https://docs.expo.dev/versions/v54.0.0/sdk/maps/

A library that provides access to Google Maps on Android and Apple Maps on iOS. (Alpha)

### Installation
```
npx expo install expo-maps
```

### Configuration
Expo Maps provides access to native map APIs. Apple Maps available on iOS with no additional config. Google Maps available on Android. Requires Google Cloud API setup.

### Permissions
Config plugin properties: `requestLocationPermission`, `locationPermission`

### Usage
```tsx
import { AppleMaps, GoogleMaps } from 'expo-maps';
```

### Components
`AppleMapsView` (iOS): annotations, cameraPosition, circles, markers, polygons, polylines, properties, uiSettings, event callbacks
`GoogleMapsView` (Android): cameraPosition, circles, colorScheme, contentPadding, mapOptions, markers, polygons, polylines, properties, uiSettings, userLocation, event callbacks
`GoogleStreetView` (Android)

### Hooks
`useLocationPermissions(options)`

### Methods
`getPermissionsAsync()`, `requestPermissionsAsync()`

### Types
`AppleMapsAnnotation`, `AppleMapsCircle`, `AppleMapsMarker`, `AppleMapsPolygon`, `AppleMapsPolyline`, `AppleMapsProperties`, `AppleMapsUISettings`, `AppleMapsViewType`, `CameraPosition`, `Coordinates`, `GoogleMapsCircle`, `GoogleMapsMarker`, `GoogleMapsPolygon`, `GoogleMapsPolyline`, `GoogleMapsProperties`, `GoogleMapsUISettings`, `GoogleMapsViewType`, `SetCameraPositionConfig`, `StreetViewCameraPosition`

### Enums
`AppleMapPointOfInterestCategory`, `AppleMapsContourStyle`, `AppleMapsMapStyleElevation`, `AppleMapsMapStyleEmphasis`, `AppleMapsMapType`, `GoogleMapsColorScheme`, `GoogleMapsMapType`

---

## @react-native-masked-view/masked-view
Source: https://docs.expo.dev/versions/v54.0.0/sdk/masked-view/

A library that provides a masked view.

### Installation
```
npx expo install @react-native-masked-view/masked-view
```

Provides a masked view that only displays the pixels that overlap with the view rendered in its mask element.

---

## MediaLibrary
Source: https://docs.expo.dev/versions/v54.0.0/sdk/media-library/

A library that provides access to the device's media library.

### Installation
```
npx expo install expo-media-library
```

### Configuration in app config
Config plugin properties: `photosPermission`, `savePhotosPermission`, `preventAutomaticLimitedAccessAlert`, `isAccessMediaLocationEnabled`, `granularPermissions`

### Usage
```jsx
import * as MediaLibrary from 'expo-media-library';
```

### Constants
`MediaType`, `SortBy`

### Hooks
`usePermissions(options)`

### Methods
`addAssetsToAlbumAsync`, `albumNeedsMigrationAsync`, `createAlbumAsync`, `createAssetAsync`, `deleteAlbumsAsync`, `deleteAssetsAsync`, `getAlbumAsync`, `getAssetInfoAsync`, `getAssetsAsync`, `getMomentsAsync`, `getPermissionsAsync`, `isAvailableAsync`, `migrateAlbumIfNeededAsync`, `presentPermissionsPickerAsync`, `removeAssetsFromAlbumAsync`, `requestPermissionsAsync`, `saveToLibraryAsync`

### Event Subscriptions
`addListener(listener)`, `removeAllListeners()`

Types: `Album`, `Asset`, `AssetInfo`, `AssetsOptions`, `PagedInfo`, `MediaLibraryAssetsChangeEvent`, `MediaSubtype`

Enums: `PermissionStatus`

---

## MeshGradient
Source: https://docs.expo.dev/versions/v54.0.0/sdk/mesh-gradient/

A module that exposes MeshGradient view from SwiftUI to React Native.

### Installation
```
npx expo install expo-mesh-gradient
```

### API
```tsx
import { MeshGradientView } from 'expo-mesh-gradient';
```

### Component
`MeshGradientView` props: colors, columns, ignoresSafeArea, mask, points, resolution (Android), rows, smoothsColors

---

## NavigationBar
Source: https://docs.expo.dev/versions/v54.0.0/sdk/navigation-bar/

A library that provides access to various interactions with the native navigation bar on Android.

### Installation
```
npx expo install expo-navigation-bar
```

### Configuration in app config
Config plugin properties: backgroundColor, barStyle, borderColor, visibility, behavior, position, legacyVisible

### Hooks
`useVisibility()`

### Methods
`getBackgroundColorAsync`, `getBehaviorAsync`, `getBorderColorAsync`, `getButtonStyleAsync`, `getVisibilityAsync`, `setBackgroundColorAsync`, `setBehaviorAsync`, `setBorderColorAsync`, `setButtonStyleAsync`, `setPositionAsync`, `setStyle`, `setVisibilityAsync`, `unstable_getPositionAsync`

### Event Subscriptions
`addVisibilityListener(listener)`

Types: `NavigationBarBehavior`, `NavigationBarButtonStyle`, `NavigationBarPosition`, `NavigationBarStyle`, `NavigationBarVisibility`, `NavigationBarVisibilityEvent`

---

## @react-native-community/netinfo
Source: https://docs.expo.dev/versions/v54.0.0/sdk/netinfo/

A cross-platform API that provides access to network information.

### Installation
```
npx expo install @react-native-community/netinfo
```

### API
```js
import NetInfo from '@react-native-community/netinfo';
```

Usage:
```js
NetInfo.fetch().then(state => { ... });
const unsubscribe = NetInfo.addEventListener(state => { ... });
```

Requires location permissions and iOS entitlements for SSID access.

---

## Network
Source: https://docs.expo.dev/versions/v54.0.0/sdk/network/

A library that provides access to the device's network such as its IP address, MAC address, and airplane mode status.

### Installation
```
npx expo install expo-network
```

### Hooks
`useNetworkState()`

### Methods
`getIpAddressAsync()`, `getNetworkStateAsync()`, `isAirplaneModeEnabledAsync()` (Android)

### Event Subscriptions
`addNetworkStateListener(listener)`

Types: `NetworkState`
Enums: `NetworkStateType` (BLUETOOTH, CELLULAR, ETHERNET, NONE, OTHER, UNKNOWN, VPN, WIFI, WIMAX)

---

## Notifications
Source: https://docs.expo.dev/versions/v54.0.0/sdk/notifications/

A library that provides an API to fetch push notification tokens and to present, schedule, receive and respond to notifications.

### Features
- Schedule notifications for specific dates or intervals
- Get/set badge icon number
- Obtain native device push token (FCM/APNs) and Expo push token
- Listen to incoming notifications (foreground/background)
- Android notification channels
- Custom notification icon and color on Android

### Installation
```
npx expo install expo-notifications
```

### Configuration
Credentials setup required. Config plugin properties: icon, color, defaultChannel, sounds, enableBackgroundRemoteNotifications

### Permissions
Android: RECEIVE_BOOT_COMPLETED, SCHEDULE_EXACT_ALARM
iOS: Notification permissions via requestPermissionsAsync

### API Methods
Fetch tokens: `addPushTokenListener`, `getDevicePushTokenAsync`, `getExpoPushTokenAsync`
Listen to events: `addNotificationReceivedListener`, `addNotificationResponseReceivedListener`, `addNotificationsDroppedListener`, `useLastNotificationResponse`
Present notifications: `setNotificationHandler`
Background tasks: `registerTaskAsync`, `unregisterTaskAsync`
Permissions: `getPermissionsAsync`, `requestPermissionsAsync`
Badge: `getBadgeCountAsync`, `setBadgeCountAsync`
Schedule: `scheduleNotificationAsync`, `cancelScheduledNotificationAsync`, `cancelAllScheduledNotificationsAsync`, `getAllScheduledNotificationsAsync`, `getNextTriggerDateAsync`
Dismiss: `dismissNotificationAsync`, `dismissAllNotificationsAsync`, `getPresentedNotificationsAsync`
Channels (Android): `setNotificationChannelAsync`, `getNotificationChannelAsync`, `deleteNotificationChannelAsync`, `getNotificationChannelsAsync`, channel group methods
Categories: `setNotificationCategoryAsync`, `getNotificationCategoriesAsync`, `deleteNotificationCategoryAsync`

---

## Pedometer
Source: https://docs.expo.dev/versions/v54.0.0/sdk/pedometer/

A library that provides access to the device's pedometer sensor.

### Installation
```
npx expo install expo-sensors
```

### API
```js
import { Pedometer } from 'expo-sensors';
```

Methods: `getPermissionsAsync()`, `getStepCountAsync(start, end)` (iOS), `isAvailableAsync()`, `requestPermissionsAsync()`, `watchStepCount(callback)`

Types: `PedometerResult`, `PedometerUpdateCallback`

---

## @react-native-picker/picker
Source: https://docs.expo.dev/versions/v54.0.0/sdk/picker/

A cross-platform component that provides access to the system UI for picking between several options.

### Installation
```
npx expo install @react-native-picker/picker
```

---

## Print
Source: https://docs.expo.dev/versions/v54.0.0/sdk/print/

A library that provides printing functionality for Android and iOS (AirPrint).

### Installation
```
npx expo install expo-print
```

### API
```js
import * as Print from 'expo-print';
```

Constants: `Orientation`
Methods: `printAsync(options)`, `printToFileAsync(options)`, `selectPrinterAsync()` (iOS)
Types: `FilePrintOptions`, `FilePrintResult`, `PageMargins`, `Printer`, `PrintOptions`

---

## react-native-reanimated
Source: https://docs.expo.dev/versions/v54.0.0/sdk/reanimated/

A library that provides an API that greatly simplifies the process of creating smooth, powerful, and maintainable animations.

### Installation
```
npx expo install react-native-reanimated react-native-worklets
```

No additional configuration required. Reanimated Babel plugin is automatically configured in `babel-preset-expo`.

---

## Router
Source: https://docs.expo.dev/versions/v54.0.0/sdk/router/

A file-based routing library for React Native and web applications.

### Installation
Follow the instructions from Expo Router's installation guide.

### Components
`ErrorBoundary`, `Link` (with href, push, replace, dismissTo, asChild props), `Link.Menu`, `Link.MenuAction`, `Link.Preview`, `Link.Trigger`, `Redirect`, `Slot`

### Hooks
`useFocusEffect`, `useGlobalSearchParams`, `useIsPreview`, `useLocalSearchParams`, `useNavigation`, `useNavigationContainerRef`, `usePathname`, `useRootNavigation`, `useRootNavigationState`, `useRouter`, `useSegments`, `useSitemap`

### Methods
`withLayoutContext(Nav, processor, useOnlyUserDefinedScreens)`

Types: `Href`, `HrefObject`, `Router`, `ScreenProps`, `WebAnchorProps`, `SitemapType`, `NativeIntent`

---

## Router native tabs
Source: https://docs.expo.dev/versions/v54.0.0/sdk/router-native-tabs/

An Expo Router submodule that provides native tabs layout. (Alpha, SDK 54+)

### Installation
Follow Expo Router installation guide.

### Components
`Badge`, `Icon`, `Label`, `NativeTabs`, `NativeTabs.Trigger`, `NativeTabs.Trigger.TabBar`, `VectorIcon`

Types: `NativeTabsLabelStyle`, `NativeTabOptions`, `SymbolOrImageSource`

---

## Router UI
Source: https://docs.expo.dev/versions/v54.0.0/sdk/router-ui/

An Expo Router submodule that provides headless tab components to create custom tab layouts.

### Components
`Tabs`, `TabList`, `TabTrigger`, `TabSlot`, `TabContext`

### Hooks
`useTabSlot`, `useTabsWithChildren`, `useTabsWithTriggers`, `useTabTrigger`

Types: `ExpoTabsNavigatorOptions`, `ExpoTabsScreenOptions`, `TabNavigationEventMap`, `UseTabsOptions`, `SwitchToOptions`

---

## react-native-safe-area-context
Source: https://docs.expo.dev/versions/v54.0.0/sdk/safe-area-context/

A library with a flexible API for accessing the device's safe area inset information.

### Installation
```
npx expo install react-native-safe-area-context
```

### Components
`SafeAreaView` - regular View with safe area edges applied as padding. Props: edges, emulateUnlessSupported

### Hooks
`useSafeAreaInsets()` - returns EdgeInsets ({ top, right, bottom, left })

### Guides
Context: requires `SafeAreaProvider` in app root. Optimization: use `SafeAreaView` when possible.

---

## ScreenCapture
Source: https://docs.expo.dev/versions/v54.0.0/sdk/screen-capture/

A library that allows you to protect screens in your app from being captured or recorded.

### Installation
```
npx expo install expo-screen-capture
```

### Hooks
`usePermissions`, `usePreventScreenCapture(key)`, `useScreenshotListener(listener)`

### Methods
`allowScreenCaptureAsync(key)`, `disableAppSwitcherProtectionAsync()` (iOS), `enableAppSwitcherProtectionAsync(blurIntensity)` (iOS), `getPermissionsAsync()`, `isAvailableAsync()`, `preventScreenCaptureAsync(key)`, `requestPermissionsAsync()`

### Event Subscriptions
`addScreenshotListener(listener)`, `removeScreenshotListener(subscription)`

---

## ScreenOrientation
Source: https://docs.expo.dev/versions/v54.0.0/sdk/screen-orientation/

A universal library for managing a device's screen orientation.

### Installation
```
npx expo install expo-screen-orientation
```

### Configuration in app config
Config plugin property: `initialOrientation` (iOS). iOS requires `requireFullScreen` for iPad.

### Methods
`getOrientationAsync()`, `getOrientationLockAsync()`, `getPlatformOrientationLockAsync()`, `lockAsync(orientationLock)`, `lockPlatformAsync(options)`, `supportsOrientationLockAsync(orientationLock)`, `unlockAsync()`

### Event Subscriptions
`addOrientationChangeListener`, `removeOrientationChangeListener`, `removeOrientationChangeListeners`

Types: `OrientationChangeEvent`, `PlatformOrientationInfo`, `ScreenOrientationInfo`
Enums: `Orientation` (UNKNOWN, PORTRAIT_UP, PORTRAIT_DOWN, LANDSCAPE_LEFT, LANDSCAPE_RIGHT), `OrientationLock` (DEFAULT, ALL, PORTRAIT, PORTRAIT_UP, PORTRAIT_DOWN, LANDSCAPE, LANDSCAPE_LEFT, LANDSCAPE_RIGHT, OTHER, UNKNOWN), `SizeClassIOS`, `WebOrientation`, `WebOrientationLock`

---

## react-native-screens
Source: https://docs.expo.dev/versions/v54.0.0/sdk/screens/

A library that provides native primitives to represent screens for better operating system behavior and screen optimizations.

### Installation
```
npx expo install react-native-screens
```

---

## SecureStore
Source: https://docs.expo.dev/versions/v54.0.0/sdk/securestore/

A library that provides a way to encrypt and securely store key-value pairs locally on the device.

### Installation
```
npx expo install expo-secure-store
```

### Configuration in app config
Config plugin properties: `configureAndroidBackup`, `faceIDPermission`

### Platform value storage
Android: stored in SharedPreferences, encrypted with Android's Keystore system.
iOS: stored using Keychain Services as kSecClassGenericPassword.

### Constants
`AFTER_FIRST_UNLOCK`, `AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY`, `ALWAYS`, `ALWAYS_THIS_DEVICE_ONLY`, `WHEN_PASSCODE_SET_THIS_DEVICE_ONLY`, `WHEN_UNLOCKED`, `WHEN_UNLOCKED_THIS_DEVICE_ONLY`

### Methods
`canUseBiometricAuthentication()`, `deleteItemAsync(key, options)`, `getItem(key, options)` (sync), `getItemAsync(key, options)`, `isAvailableAsync()`, `setItem(key, value, options)` (sync), `setItemAsync(key, value, options)`

Types: `KeychainAccessibilityConstant`, `SecureStoreOptions`

---

## @react-native-segmented-control/segmented-control
Source: https://docs.expo.dev/versions/v54.0.0/sdk/segmented-control/

A React Native library that provides a component to render UISegmentedControl from iOS.

### Installation
```
npx expo install @react-native-segmented-control/segmented-control
```

---

## Sensors
Source: https://docs.expo.dev/versions/v54.0.0/sdk/sensors/

A library that provides access to a device's accelerometer, barometer, motion, gyroscope, light, magnetometer, and pedometer.

### Installation
```
npx expo install expo-sensors
```

### API
```js
import * as Sensors from 'expo-sensors';
// OR
import { Accelerometer, Barometer, DeviceMotion, Gyroscope, LightSensor, Magnetometer, MagnetometerUncalibrated, Pedometer } from 'expo-sensors';
```

### Permissions
Android: HIGH_SAMPLING_RATE_SENSORS (for >200Hz, Android 12+)
iOS: NSMotionUsageDescription

Available sensors: Accelerometer, Barometer, DeviceMotion, Gyroscope, Magnetometer, LightSensor, Pedometer

---

## Server
Source: https://docs.expo.dev/versions/v54.0.0/sdk/server/

Server-side API and runtime for Expo Router projects.

### Installation
```
npx expo install expo-server
```

### Usage
```ts
import { origin, environment } from 'expo-server';
import { runTask, deferTask } from 'expo-server';
```

### Adapters
`expo-server/adapter/bun`, `/express`, `/http`, `/netlify`, `/vercel`, `/workerd`

### Classes
`StatusError` - error response representation that can be thrown in server-side code.

### Methods
`deferTask(fn)`, `environment()`, `origin()`, `runTask(fn)`, `setResponseHeaders(updateHeaders)`

### Interfaces
`ImmutableRequest`, `MiddlewareMatcher`, `MiddlewareSettings`

### Types
`MiddlewareFunction(request)`

---

## Sharing
Source: https://docs.expo.dev/versions/v54.0.0/sdk/sharing/

A library that provides implementing sharing files.

### Installation
```
npx expo install expo-sharing
```

### Methods
`isAvailableAsync()`, `shareAsync(url, options)`

Types: `SharingOptions` (anchor, dialogTitle, mimeType, UTI)

---

## @shopify/react-native-skia
Source: https://docs.expo.dev/versions/v54.0.0/sdk/skia/

A React Native library for creating graphics using Skia.

### Installation
```
npx expo install @shopify/react-native-skia
```

---

## @react-native-community/slider
Source: https://docs.expo.dev/versions/v54.0.0/sdk/slider/

A React Native component library that provides access to the system UI for a slider control.

### Installation
```
npx expo install @react-native-community/slider
```

---

## SMS
Source: https://docs.expo.dev/versions/v54.0.0/sdk/sms/

A library that provides access to the system's UI/app for sending SMS messages.

### Installation
```
npx expo install expo-sms
```

### Methods
`isAvailableAsync()`, `sendSMSAsync(addresses, message, options)`

Types: `SMSAttachment`, `SMSOptions`, `SMSResponse`

---

## Speech
Source: https://docs.expo.dev/versions/v54.0.0/sdk/speech/

A library that provides access to text-to-speech functionality.

### Installation
```
npx expo install expo-speech
```

### Constants
`maxSpeechInputLength`

### Methods
`getAvailableVoicesAsync()`, `isSpeakingAsync()`, `pause()` (iOS/web), `resume()` (iOS/web), `speak(text, options)`, `stop()`

Types: `SpeechOptions`, `Voice`, `WebVoice`
Enums: `VoiceQuality` (Default, Enhanced)

---

## SplashScreen
Source: https://docs.expo.dev/versions/v54.0.0/sdk/splash-screen/

A library that provides access to controlling the visibility behavior of native splash screen.

### Installation
```
npx expo install expo-splash-screen
```

### Usage
```tsx
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.setOptions({ duration: 1000, fade: true });
SplashScreen.preventAutoHideAsync();
SplashScreen.hide();
```

### Configuration
Config plugin properties: backgroundColor, image, enableFullScreenImage_legacy, dark, imageWidth, android, ios, resizeMode

### Methods
`hide()`, `hideAsync()`, `preventAutoHideAsync()`, `setOptions(options)`

Types: `SplashScreenOptions` (duration, fade)

---

## SQLite
Source: https://docs.expo.dev/versions/v54.0.0/sdk/sqlite/

A library that provides access to a database that can be queried through a SQLite API.

### Installation
```
npx expo install expo-sqlite
```

### Configuration in app config
Config plugin properties: customBuildFlags, enableFTS, useSQLCipher, withSQLiteVecExtension

### Usage
```js
import * as SQLite from 'expo-sqlite';
const db = await SQLite.openDatabaseAsync('databaseName');
```

Basic CRUD: `execAsync`, `runAsync`, `getFirstAsync`, `getAllAsync`, `getEachAsync`
Prepared statements: `prepareAsync`, `executeAsync`, `finalizeAsync`
Transactions: `withTransactionAsync`, `withExclusiveTransactionAsync`

### Hooks
`useSQLiteContext()` - used with `SQLiteProvider`

### Component
`SQLiteProvider` - Context provider for SQLite database. Props: assetSource, databaseName, directory, onInit, options, useSuspense

### Third-party integrations
Drizzle ORM, Knex.js

### SQLCipher
Encryption support via PRAGMA key.

### Key-value storage
`expo-sqlite/kv-store` - drop-in replacement for `@react-native-async-storage/async-storage`
`expo-sqlite/localStorage/install` - localStorage API implementation

Classes: `SQLiteDatabase`, `SQLiteSession`, `SQLiteStatement`

---

## StatusBar
Source: https://docs.expo.dev/versions/v54.0.0/sdk/status-bar/

A library that provides the same interface as the React Native StatusBar API, but with slightly different defaults to work great in Expo environments.

### Installation
```
npx expo install expo-status-bar
```

### Component
`StatusBar` - props: animated, backgroundColor, hidden, hideTransitionAnimation, networkActivityIndicatorVisible, style, translucent

### Methods
`setStatusBarBackgroundColor`, `setStatusBarHidden`, `setStatusBarNetworkActivityIndicatorVisible`, `setStatusBarStyle`, `setStatusBarTranslucent`

Types: `StatusBarAnimation` (none, fade, slide), `StatusBarStyle` (auto, inverted, light, dark)

---

## StoreReview
Source: https://docs.expo.dev/versions/v54.0.0/sdk/storereview/

A library that provides access to native APIs for in-app reviews.

### Installation
```
npx expo install expo-store-review
```

### Methods
`hasAction()`, `isAvailableAsync()`, `requestReview()`, `storeUrl()`

---

## @stripe/stripe-react-native
Source: https://docs.expo.dev/versions/v54.0.0/sdk/stripe/

A library that provides access to native APIs for integrating Stripe payments.

### Installation
```
npx expo install @stripe/stripe-react-native
```

### Config plugin setup (optional)
```json
{
  "expo": {
    "plugins": [
      ["@stripe/stripe-react-native", { "merchantIdentifier": "string | string[]", "enableGooglePay": true }]
    ]
  }
}
```

Google Pay and Apple Pay not supported in Expo Go (requires development build).

---

## react-native-svg
Source: https://docs.expo.dev/versions/v54.0.0/sdk/svg/

A library that allows using SVGs in your app.

### Installation
```
npx expo install react-native-svg
```

### API
```js
import * as Svg from 'react-native-svg';
```
```tsx
import Svg, { Circle, Rect } from 'react-native-svg';
```

---

## Symbols
Source: https://docs.expo.dev/versions/v54.0.0/sdk/symbols/

A library that allows access to native symbols. (Beta)

### Installation
```
npx expo install expo-symbols
```

### Component
`SymbolView` - props: animationSpec, colors, fallback, name, resizeMode, scale, size, tintColor, type, weight

Types: `AnimationEffect`, `AnimationSpec`, `ContentMode`, `SymbolScale`, `SymbolType`, `SymbolWeight`, `VariableAnimationSpec`

---

## SystemUI
Source: https://docs.expo.dev/versions/v54.0.0/sdk/system-ui/

A library that allows interacting with system UI elements.

### Installation
```
npx expo install expo-system-ui
```

### Methods
`getBackgroundColorAsync()`, `setBackgroundColorAsync(color)`

---

## TaskManager
Source: https://docs.expo.dev/versions/v54.0.0/sdk/task-manager/

A library that provides support for tasks that can run in the background.

### Installation
```
npx expo install expo-task-manager
```

### Libraries using TaskManager
Location, BackgroundTask, BackgroundFetch, Notifications

### Example
```jsx
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
const LOCATION_TASK_NAME = 'background-location-task';
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => { ... });
```

### Methods
`defineTask(taskName, taskExecutor)`, `getRegisteredTasksAsync()`, `getTaskOptionsAsync(taskName)`, `isAvailableAsync()`, `isTaskDefined(taskName)`, `isTaskRegisteredAsync(taskName)`, `unregisterAllTasksAsync()`, `unregisterTaskAsync(taskName)`

Interfaces: `TaskManagerError`, `TaskManagerTask`, `TaskManagerTaskBody`, `TaskManagerTaskBodyExecutionInfo`
Types: `TaskManagerTaskExecutor(body)`

---

## Third-party libraries supported in Expo Go
Source: https://docs.expo.dev/versions/v54.0.0/sdk/third-party-overview/

A set of third-party libraries which support is included by default in Expo Go environment.

The Expo Go playground supports a curated list of third-party libraries that are community-driven, provide APIs for common app functionalities, and are tested with each Expo SDK release.

---

## TrackingTransparency
Source: https://docs.expo.dev/versions/v54.0.0/sdk/tracking-transparency/

A library for tracking app users and managing tracking permissions.

### Installation
```
npx expo install expo-tracking-transparency
```

### Configuration in app config
Config plugin property: `userTrackingPermission`

### Hooks
`useTrackingPermissions(options)`

### Methods
`getAdvertisingId()`, `getTrackingPermissionsAsync()`, `isAvailable()`, `requestTrackingPermissionsAsync()`

Permissions: Android adds `com.google.android.gms.permission.AD_ID`. iOS uses `NSUserTrackingUsageDescription`.

---

## Expo UI
Source: https://docs.expo.dev/versions/v54.0.0/sdk/ui/

A set of components that allow you to build UIs directly with Jetpack Compose and SwiftUI from React.

`@expo/ui` is a set of native input components that allows you to build fully native interfaces with Jetpack Compose and SwiftUI.

Available platforms:
- Jetpack Compose: Build native Android interfaces
- SwiftUI: Build native iOS interfaces

---

## Updates
Source: https://docs.expo.dev/versions/v54.0.0/sdk/updates/

A library that enables your app to manage remote updates to your application code.

### Installation
Automatically configured using EAS Update. Manual installation also supported.

### Configuration
Build-time config options: enabled, url, requestHeaders, runtimeVersion, checkAutomatically, fallbackToCacheTimeout, useEmbeddedUpdate, codeSigningCertificate, codeSigningMetadata, assetPatternsToBeBundled, disableAntiBrickingMeasures

Runtime version policies: appVersion, nativeVersion, fingerprint

### API
Constants: channel, checkAutomatically, createdAt, emergencyLaunchReason, isEmbeddedLaunch, isEmergencyLaunch, isEnabled, launchDuration, manifest, runtimeVersion, updateId

Hooks: `useUpdates()`

Methods: `checkForUpdateAsync()`, `clearLogEntriesAsync()`, `fetchUpdateAsync()`, `getExtraParamsAsync()`, `readLogEntriesAsync(maxAge)`, `reloadAsync(options)`, `setExtraParamAsync(key, value)`, `setUpdateRequestHeadersOverride(requestHeaders)`, `setUpdateURLAndRequestHeadersOverride(configOverride)`

Types: `CurrentlyRunningInfo`, `Manifest`, `UpdateCheckResult`, `UpdateFetchResult`, `UpdateInfo`, `UseUpdatesReturnType`, `UpdatesLogEntry`

Enums: `UpdateCheckResultNotAvailableReason`, `UpdateInfoType`, `UpdatesCheckAutomaticallyValue`, `UpdatesLogEntryCode`, `UpdatesLogEntryLevel`

---

## Video (expo-video)
Source: https://docs.expo.dev/versions/v54.0.0/sdk/video/

A library that provides an API to implement video playback in apps.

### Installation
```
npx expo install expo-video
```

### Configuration in app config
Config plugin properties: `supportsBackgroundPlayback`, `supportsPictureInPicture`

### Components
`VideoView` - props: allowsFullscreen, allowsPictureInPicture, allowsVideoFrameAnalysis, contentFit, contentPosition, crossOrigin, fullscreenOptions, nativeControls, player, playsInline, requiresLinearPlayback, showsTimecodes, startsPictureInPictureAutomatically, surfaceType, useExoShutter, event callbacks
`VideoAirPlayButton` (iOS) - props: activeTint, tint, prioritizeVideoDevices, event callbacks

### Hooks
`useVideoPlayer(source, setup)`

### Classes
`VideoPlayer` - properties: allowsExternalPlayback, audioMixingMode, audioTrack, availableAudioTracks, availableSubtitleTracks, availableVideoTracks, bufferedPosition, bufferOptions, currentTime, duration, isLive, loop, muted, playbackRate, playing, preservesPitch, showNowPlayingNotification, status, staysActiveInBackground, subtitleTrack, volume, and more. Methods: generateThumbnailsAsync, pause, play, replace, replaceAsync, replay, seekBy
`VideoThumbnail` - properties: actualTime, height, width, requestedTime

### Methods
`clearVideoCacheAsync()`, `createVideoPlayer(source)`, `getCurrentVideoCacheSize()`, `isPictureInPictureSupported()`, `setVideoCacheSizeAsync(sizeBytes)`

Types: `AudioMixingMode`, `AudioTrack`, `BufferOptions`, `ContentType`, `DRMOptions`, `DRMType`, `VideoContentFit`, `VideoMetadata`, `VideoPlayerEvents`, `VideoPlayerStatus`, `VideoSource`, `VideoTrack`

---

## Video (expo-av)
Source: https://docs.expo.dev/versions/v54.0.0/sdk/video-av/

A library that provides an API to implement video playback and recording in apps. (Deprecated in favor of expo-video)

### Installation
```
npx expo install expo-av
```

### Component
`Video` - props: source, posterSource, useNativeControls, resizeMode, isLooping, isMuted, volume, rate, shouldCorrectPitch, audioPan, positionMillis, progressUpdateIntervalMillis, status, shouldPlay, usePoster, PosterComponent, posterStyle, videoStyle, event callbacks

Component Methods: `presentFullscreenPlayer()`, `dismissFullscreenPlayer()`, `setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)`

Enums: `ResizeMode` (CONTAIN, COVER, STRETCH), `VideoFullscreenUpdate` (PLAYER_WILL_PRESENT, PLAYER_DID_PRESENT, PLAYER_WILL_DISMISS, PLAYER_DID_DISMISS)

---

## VideoThumbnails
Source: https://docs.expo.dev/versions/v54.0.0/sdk/video-thumbnails/

A library that allows you to generate an image to serve as a thumbnail from a video file.

### Installation
```
npx expo install expo-video-thumbnails
```

### Methods
`getThumbnailAsync(sourceFilename, options)`

Types: `VideoThumbnailsOptions` (headers, quality, time), `VideoThumbnailsResult` (uri, width, height)

---

## react-native-pager-view
Source: https://docs.expo.dev/versions/v54.0.0/sdk/view-pager/

A component library that provides a carousel-like view to swipe through pages of content.

### Installation
```
npx expo install react-native-pager-view
```

### Example
```jsx
import PagerView from 'react-native-pager-view';
```

---

## WebBrowser
Source: https://docs.expo.dev/versions/v54.0.0/sdk/webbrowser/

A library that provides access to the system's web browser and supports handling redirects.

### Installation
```
npx expo install expo-web-browser
```

### Configuration in app config
Config plugin property: `experimentalLauncherActivity` (Android)

### Methods
`coolDownAsync(browserPackage)`, `dismissAuthSession()`, `dismissBrowser()`, `getCustomTabsSupportingBrowsersAsync()`, `maybeCompleteAuthSession(options)`, `mayInitWithUrlAsync(url, browserPackage)`, `openAuthSessionAsync(url, redirectUrl, options)`, `openBrowserAsync(url, browserParams)`, `warmUpAsync(browserPackage)`

Types: `AuthSessionOpenOptions`, `WebBrowserAuthSessionResult`, `WebBrowserOpenOptions`, `WebBrowserResult`, `WebBrowserCustomTabsResults`, `WebBrowserWindowFeatures`
Enums: `WebBrowserPresentationStyle`, `WebBrowserResultType`

---

## react-native-webview
Source: https://docs.expo.dev/versions/v54.0.0/sdk/webview/

A library that provides a WebView component.

### Installation
```
npx expo install react-native-webview
```

### Usage
```jsx
import { WebView } from 'react-native-webview';
<WebView source={{ uri: 'https://expo.dev' }} />
<WebView source={{ html: '<h1>Hello world</h1>' }} />
```

---

## Config: app.json / app.config.js
Source: https://docs.expo.dev/versions/v54.0.0/config/app/

A reference of available properties in Expo app config.

### Top-level Properties
`name`, `description`, `slug`, `owner`, `sdkVersion`, `runtimeVersion`, `version`, `platforms`, `orientation`, `userInterfaceStyle`, `backgroundColor`, `primaryColor`, `icon`, `notification`, `androidStatusBar`, `androidNavigationBar`, `developmentClient`, `scheme`, `extra`, `updates`, `locales`, `plugins`, `splash`, `newArchEnabled`

### Platform-specific: `ios`
Properties: appleTeamId, bundleIdentifier, buildNumber, backgroundColor, scheme, icon, appStoreUrl, supportsTablet, isTabletOnly, requireFullScreen, userInterfaceStyle, infoPlist, entitlements, privacyManifests, associatedDomains, usesIcloudStorage, usesAppleSignIn, splash, runtimeVersion

### Platform-specific: `android`
Properties: package, versionCode, backgroundColor, userInterfaceStyle, scheme, icon, adaptiveIcon, playStoreUrl, permissions, blockedPermissions, googleServicesFile, config, splash, intentFilters, allowBackup, jsEngine, runtimeVersion

---

## Config: babel.config.js
Source: https://docs.expo.dev/versions/v54.0.0/config/babel/

A reference for Babel configuration file.

Uses `babel-preset-expo` as default preset. Generated via `npx expo customize babel.config.js`.

---

## Config: metro.config.js
Source: https://docs.expo.dev/versions/v54.0.0/config/metro/

A reference of available configurations in Metro.

### Environment variables
Supports .env files. `EXPO_PUBLIC_`-prefixed variables exposed to app. `EXPO_NO_DOTENV` to disable.

### CSS
Supported on web. CSS Modules with `.module.css` extension. PostCSS support. SASS/SCSS partial support.

### Features
- Extending Babel transformer
- Custom resolving (module mocking, virtual modules)
- Custom transforming
- Node.js built-ins
- Bundle splitting (web)
- Source map debug IDs
- Metro require runtime
- Magic import comments (`/* @metro-ignore */`)
- ES Module resolution (package.json exports maps)
- Asset imports
- Web workers (experimental, web-only)

---

## Config: package.json
Source: https://docs.expo.dev/versions/v54.0.0/config/package-json/

A reference for Expo-specific properties that can be used in the package.json file.

- `install.exclude` - exclude libraries from version checks
- `autolinking` - configure module resolution behavior
- `doctor` - configure `npx expo-doctor` behavior (reactNativeDirectoryCheck, appConfigFieldsNotSyncedCheck)

---

## Expo UI: Jetpack Compose
Source: https://docs.expo.dev/versions/v54.0.0/sdk/ui/jetpack-compose/

Jetpack Compose components for building native Android interfaces with @expo/ui. (Alpha)

### Installation
```
npx expo install @expo/ui
```

### Components
Button, CircularProgress, ContextMenu/DropdownMenu, Chip, DateTimePicker (date), DateTimePicker (time), LinearProgress, Picker (radio), Picker (segmented), Slider, Switch (toggle), Switch (checkbox), TextInput

### API
```ts
import { Button } from '@expo/ui/jetpack-compose';
```

---

## Expo UI: SwiftUI
Source: https://docs.expo.dev/versions/v54.0.0/sdk/ui/swift-ui/

SwiftUI components for building native iOS interfaces with @expo/ui. (Beta)

### Installation
```
npx expo install @expo/ui
```

### Usage
Requires wrapping in a `Host` component:
```tsx
import { Host, Button } from '@expo/ui/swift-ui';
export function SaveButton() {
  return (
    <Host style={{ flex: 1 }}>
      <Button variant="default">Save changes</Button>
    </Host>
  );
}
```

### Components
BottomSheet, Button, CircularProgress, ColorPicker, ContextMenu/DropdownMenu, DateTimePicker (date), DateTimePicker (time), Gauge, Host, LinearProgress, List, Picker (segmented), Picker (wheel), Slider, Switch (toggle), Switch (checkbox), TextField

### API
```ts
import { BottomSheet } from '@expo/ui/swift-ui';
```


---

