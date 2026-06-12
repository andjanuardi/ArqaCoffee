# React Native Documentation (v0.85)

Scraped from https://reactnative.dev/docs

---

---

## The Basics

### Introduction
Source: https://reactnative.dev/docs/getting-started

Welcome to the very start of your React Native journey! If you're looking for getting started instructions, they've moved to [their own section](environment-setup). Continue reading for an introduction to the documentation, Native Components, React, and more!

Many different kinds of people use React Native: from advanced iOS developers to React beginners, to people getting started programming for the first time in their career. These docs were written for all learners, no matter their experience level or background.

### How to use these docs

You can start here and read through these docs linearly like a book; or you can read the specific sections you need. Already familiar with React? You can skip [that section](/docs/intro-react)—or read it for a light refresher.

### Prerequisites

To work with React Native, you will need to have an understanding of JavaScript fundamentals. If you're new to JavaScript or need a refresher, you can [dive in](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [brush up](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) at Mozilla Developer Network.

> While we do our best to assume no prior knowledge of React, Android, or iOS development, these are valuable topics of study for the aspiring React Native developer. Where sensible, we have linked to resources and articles that go more in depth.

### Interactive examples

This introduction lets you get started immediately in your browser with interactive examples like this one:

The above is a Snack Player. It's a handy tool created by Expo to embed and run React Native projects and share how they render in platforms like Android and iOS. The code is live and editable, so you can play directly with it in your browser. Go ahead and try changing the "Try editing me!" text above to "Hello, world!"

> Optionally, if you want to set up a local development environment, [you can follow our guide to setting up your environment on your local machine](/docs/set-up-your-environment) and paste the code examples into your project. (If you are a web developer, you may already have a local environment set up for mobile browser testing!)

### Developer Notes

People from many different development backgrounds are learning React Native. You may have experience with a range of technologies, from web to Android to iOS and more. We try to write for developers from all backgrounds. Sometimes we provide explanations specific to one platform or another.

### Formatting

Menu paths are written in bold and use carets to navigate submenus. Example: **Android Studio > Preferences**

---

Now that you know how this guide works, it's time to get to know the foundation of React Native: [Native Components](/docs/intro-react-native-components).

---

### Core Components and Native Components
Source: https://reactnative.dev/docs/intro-react-native-components

React Native is an open source framework for building Android and iOS applications using [React](https://react.dev/) and the app platform's native capabilities. With React Native, you use JavaScript to access your platform's APIs as well as to describe the appearance and behavior of your UI using React components: bundles of reusable, nestable code. You can learn more about React in the next section. But first, let's cover how components work in React Native.

### Views and mobile development

In Android and iOS development, a **view** is the basic building block of UI: a small rectangular element on the screen which can be used to display text, images, or respond to user input. Even the smallest visual elements of an app, like a line of text or a button, are kinds of views. Some kinds of views can contain other views. It's views all the way down!

![Diagram of Android and iOS app showing them both built on top of atomic elements called views.](/docs/assets/diagram_ios-android-views.svg)

### Native Components

In Android development, you write views in Kotlin or Java; in iOS development, you use Swift or Objective-C. With React Native, you can invoke these views with JavaScript using React components. At runtime, React Native creates the corresponding Android and iOS views for those components. Because React Native components are backed by the same views as Android and iOS, React Native apps look, feel, and perform like any other apps. We call these platform-backed components **Native Components.**

React Native comes with a set of essential, ready-to-use Native Components you can use to start building your app today. These are React Native's **Core Components**.

> This documentation references a legacy set of API and needs to be updated to reflect the New Architecture

React Native also lets you build your own Native Components for [Android](/docs/legacy/native-components-android) and [iOS](/docs/legacy/native-components-ios) to suit your app's unique needs. We also have a thriving ecosystem of these **community-contributed components.** Check out [Native Directory](https://reactnative.directory) to find what the community has been creating.

### Core Components

React Native has many Core Components for everything from controls to activity indicators. You can find them all [documented in the API section](/docs/components-and-apis). You will mostly work with the following Core Components:

| React Native UI Component | Android View | iOS View | Web Analog | Description |
|---|---|---|---|---|
| `<View>` | `<ViewGroup>` | `<UIView>` | A non-scrolling `<div>` | A container that supports layout with flexbox, style, some touch handling, and accessibility controls |
| `<Text>` | `<TextView>` | `<UITextView>` | `<p>` | Displays, styles, and nests strings of text and even handles touch events |
| `<Image>` | `<ImageView>` | `<UIImageView>` | `<img>` | Displays different types of images |
| `<ScrollView>` | `<ScrollView>` | `<UIScrollView>` | `<div>` | A generic scrolling container that can contain multiple components and views |
| `<TextInput>` | `<EditText>` | `<UITextField>` | `<input type="text">` | Allows the user to enter text |

In the next section, you will start combining these Core Components to learn about how React works.

---

Because React Native uses the same API structure as React components, you'll need to understand React component APIs to get started. The [next section](/docs/intro-react) makes for a quick introduction or refresher on the topic. However, if you're already familiar with React, feel free to [skip ahead](/docs/handling-text-input).

---

### React Fundamentals
Source: https://reactnative.dev/docs/intro-react

React Native runs on [React](https://react.dev/), a popular open source library for building user interfaces with JavaScript. To make the most of React Native, it helps to understand React itself. This section can get you started or can serve as a refresher course.

We're going to cover the core concepts behind React:
- components
- JSX
- props
- state

If you want to dig deeper, we encourage you to check out [React's official documentation](https://react.dev/learn).

### Your first component

The rest of this introduction to React uses cats in its examples: friendly, approachable creatures that need names and a cafe to work in. Here is your very first Cat component:

Here is how you do it: To define your `Cat` component, first use JavaScript's `import` to import React Native's `Text` Core Component:

```
import {Text} from 'react-native';
```

Your component starts as a function:

```
const Cat = () => {};
```

You can think of components as blueprints. Whatever a function component returns is rendered as a **React element.** React elements let you describe what you want to see on the screen.

Here the `Cat` component will render a `<Text>` element:

```
const Cat = () => {  return <Text>Hello, I am your cat!</Text>;};
```

You can export your function component with JavaScript's `export default` for use throughout your app:

```
const Cat = () => {  return <Text>Hello, I am your cat!</Text>;};export default Cat;
```

Now take a closer look at that `return` statement. `<Text>Hello, I am your cat!</Text>` is using a kind of JavaScript syntax that makes writing elements convenient: JSX.

### JSX

React and React Native use **JSX,** a syntax that lets you write elements inside JavaScript like so: `<Text>Hello, I am your cat!</Text>`. The React docs have [a comprehensive guide to JSX](https://react.dev/learn/writing-markup-with-jsx) you can refer to learn even more. Because JSX is JavaScript, you can use variables inside it. Here you are declaring a name for the cat, `name`, and embedding it with curly braces inside `<Text>`.

Any JavaScript expression will work between curly braces, including function calls like `{getFullName("Rum", "Tum", "Tugger")}`.

You can think of curly braces as creating a portal into JS functionality in your JSX!

### Custom Components

You've already met [React Native's Core Components](/docs/intro-react-native-components). React lets you nest these components inside each other to create new components. These nestable, reusable components are at the heart of the React paradigm.

For example, you can nest `Text` and `TextInput` inside a `View` below, and React Native will render them together.

You can render this component multiple times and in multiple places without repeating your code by using `<Cat>`.

Any component that renders other components is a **parent component.** Here, `Cafe` is the parent component and each `Cat` is a **child component.**

### Props

**Props** is short for "properties". Props let you customize React components. For example, here you pass each `<Cat>` a different `name` for `Cat` to render.

Most of React Native's Core Components can be customized with props, too. For example, when using `Image`, you pass it a prop named `source` to define what image it shows.

`Image` has [many different props](/docs/image#props), including `style`, which accepts a JS object of design and layout related property-value pairs.

> Notice the double curly braces `{{ }}` surrounding `style`'s width and height. In JSX, JavaScript values are referenced with `{}`. This is handy if you are passing something other than a string as props, like an array or number: `<Cat food={["fish", "kibble"]} age={2} />`. However, JS objects are ***also*** denoted with curly braces: `{width: 200, height: 200}`. Therefore, to pass a JS object in JSX, you must wrap the object in **another pair** of curly braces: `{{width: 200, height: 200}}`

### State

While you can think of props as arguments you use to configure how components render, **state** is like a component's personal data storage. State is useful for handling data that changes over time or that comes from user interaction. State gives your components memory!

> As a general rule, use props to configure a component when it renders. Use state to keep track of any component data that you expect to change over time.

The following example takes place in a cat cafe where two hungry cats are waiting to be fed. Their hunger, which we expect to change over time (unlike their names), is stored as state. To feed the cats, press their buttons—which will update their state.

You can add state to a component by calling [React's `useState` Hook](https://react.dev/learn/state-a-components-memory). A Hook is a kind of function that lets you "hook into" React features. For example, `useState` is a Hook that lets you add state to function components. You can learn more about [other kinds of Hooks in the React documentation.](https://react.dev/reference/react)

First, you will want to import `useState` from React:

```
import {useState} from 'react';
```

Then you declare the component's state by calling `useState` inside its function:

```
const Cat = (props: CatProps) => {  const [isHungry, setIsHungry] = useState(true);  // ...};
```

Calling `useState` does two things:
- it creates a "state variable" with an initial value—in this case the state variable is `isHungry` and its initial value is `true`
- it creates a function to set that state variable's value—`setIsHungry`

Next you add the `Button` Core Component and give it an `onPress` prop:

```
<Button  onPress={() => {    setIsHungry(false);  }}  //../>
```

Now, when someone presses the button, `onPress` will fire, calling the `setIsHungry(false)`. This sets the state variable `isHungry` to `false`:

```
<Button  //..  disabled={!isHungry}  title={isHungry ? 'Give me some food, please!' : 'Thank you!'}/>
```

Finally, put your cats inside a `Cafe` component:

```
const Cafe = () => {  return (    <>      <Cat name="Munkustrap" />      <Cat name="Spot" />    </>  );};
```

> See the `<>` and `</>` above? These bits of JSX are [fragments](https://react.dev/reference/react/Fragment). Adjacent JSX elements must be wrapped in an enclosing tag. Fragments let you do that without nesting an extra, unnecessary wrapping element like `View`.

---

Now that you've covered both React and React Native's Core Components, let's dive deeper on some of these core components by looking at [handling `<TextInput>`](/docs/handling-text-input).

---

### Handling Text Input
Source: https://reactnative.dev/docs/handling-text-input

`TextInput` is a [Core Component](/docs/intro-react-native-components) that allows the user to enter text. It has an `onChangeText` prop that takes a function to be called every time the text changed, and an `onSubmitEditing` prop that takes a function to be called when the text is submitted.

For example, let's say that as the user types, you're translating their words into a different language. In this new language, every single word is written the same way: 🍕. So the sentence "Hello there Bob" would be translated as "🍕 🍕 🍕".

In this example, we store `text` in the state, because it changes over time.

There are a lot more things you might want to do with a text input. For example, you could validate the text inside while the user types. For more detailed examples, see the [React docs on controlled components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable), or the [reference docs for TextInput](/docs/textinput).

A `TextInput` is one of many ways for the user to interact with your app. For examples of other ways to handle input, see the documentation on [how to handle touches](/docs/handling-touches).

Now, let's take a look at [ScrollView](/docs/using-a-scrollview), another Core Component.

---

### Using a ScrollView
Source: https://reactnative.dev/docs/using-a-scrollview

The `ScrollView` is a generic scrolling container that can contain multiple components and views. The scrollable items can be heterogeneous, and you can scroll both vertically and horizontally (by setting the `horizontal` property).

This example creates a vertical `ScrollView` with both images and text mixed together.

ScrollViews can be configured to allow paging through views using swiping gestures by using the `pagingEnabled` props. Swiping horizontally between views can also be implemented on Android using the [ViewPager](https://github.com/react-native-community/react-native-viewpager) component.

On iOS a ScrollView with a single item can be used to allow the user to zoom content. Set up the `maximumZoomScale` and `minimumZoomScale` props and your user will be able to use pinch and expand gestures to zoom in and out.

The ScrollView works best to present a small number of things of a limited size. All the elements and views of a `ScrollView` are rendered, even if they are not currently shown on the screen. If you have a long list of items which cannot fit on the screen, you should use a `FlatList` instead. So let's [learn about list views](/docs/using-a-listview) next.

---

### Using List Views
Source: https://reactnative.dev/docs/using-a-listview

React Native provides a suite of components for presenting lists of data. Generally, you'll want to use either `FlatList` or `SectionList`.

The `FlatList` component displays a scrolling list of changing, but similarly structured, data. `FlatList` works well for long lists of data, where the number of items might change over time. Unlike the more generic `ScrollView`, the `FlatList` only renders elements that are currently showing on the screen, not all the elements at once.

The `FlatList` component requires two props: `data` and `renderItem`. `data` is the source of information for the list. `renderItem` takes one item from the source and returns a formatted component to render.

This example creates a basic `FlatList` of hardcoded data. Each item in the `data` props is rendered as a `Text` component. The `FlatListBasics` component then renders the `FlatList` and all `Text` components.

If you want to render a set of data broken into logical sections, maybe with section headers, similar to `UITableView` on iOS, then a `SectionList` is the way to go.

One of the most common uses for a list view is displaying data that you fetch from a server. To do that, you will need to [learn about networking in React Native](/docs/network).

---

### Troubleshooting
Source: https://reactnative.dev/docs/troubleshooting

These are some common issues you may run into while setting up React Native. If you encounter something that is not listed here, try [searching for the issue in GitHub](https://github.com/facebook/react-native/issues/).

#### Port already in use

The [Metro bundler](https://metrobundler.dev/) runs on port 8081. If another process is already using that port, you can either terminate that process, or change the port that the bundler uses.

##### Terminating a process on port 8081

Run the following command to find the id for the process that is listening on port 8081:
```
sudo lsof -i :8081
```
Then run the following to terminate the process:
```
kill -9 <PID>
```
On Windows you can find the process using port 8081 using [Resource Monitor](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-port-on-windows) and stop it using Task Manager.

##### Using a port other than 8081

You can configure the bundler to use a port other than 8081 by using the `port` parameter, from the root of your project run:
```
npm start -- --port=8088
```
```
yarn start --port 8088
```

You will also need to update your applications to load the JavaScript bundle from the new port.

#### NPM locking error

If you encounter an error such as `npm WARN locking Error: EACCES` while using the React Native CLI, try running:
```
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

#### Missing libraries for React

If you added React Native manually to your project, make sure you have included all the relevant dependencies that you are using, like `RCTText.xcodeproj`, `RCTImage.xcodeproj`. Next, the binaries built by these dependencies have to be linked to your app binary. Use the `Linked Frameworks and Binaries` section in the Xcode project settings. More detailed steps are here: [Linking Libraries](/docs/linking-libraries-ios#content).

If you are using CocoaPods, verify that you have added React along with the subspecs to the `Podfile`:
```
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'RCTText', 'RCTImage', 'RCTNetwork', 'RCTWebSocket',
]
```

Next, make sure you have run `pod install` and that a `Pods/` directory has been created in your project with React installed.

#### No transports available

React Native implements a polyfill for WebSockets. These [polyfills](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/InitializeCore.js) are initialized as part of the react-native module that you include in your application through `import React from 'react'`. If you load another module that requires WebSockets, such as [Firebase](https://github.com/facebook/react-native/issues/3645), be sure to load/require it after react-native:
```
import Firebase from 'firebase';
```

#### Shell Command Unresponsive Exception

If you encounter a ShellCommandUnresponsiveException exception such as:
```
Execution failed for task ':app:installDebug'.
  com.android.builder.testing.api.DeviceException: com.android.ddmlib.ShellCommandUnresponsiveException
```

Restart the ADB server by running:
```
adb kill-server
adb start-server
```

#### Unable to start react-native package manager (on Linux)

##### Case 1: Error "code":"ENOSPC","errno":"ENOSPC"

Issue caused by the number of directories [inotify](https://github.com/guard/listen/blob/master/README.md#increasing-the-amount-of-inotify-watchers) (used by watchman on Linux) can monitor. To solve it:
```
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

##### Error: spawnSync ./gradlew EACCES

If you run into issue where executing `npm run android` or `yarn android` on macOS throws the above error, try to run `sudo chmod +x android/gradlew` command to make `gradlew` files into executable.

---

### Platform-Specific Code
Source: https://reactnative.dev/docs/platform-specific-code

When building a cross-platform app, you'll want to re-use as much code as possible. Scenarios may arise where it makes sense for the code to be different, for example you may want to implement separate visual components for Android and iOS.

React Native provides two ways to organize your code and separate it by platform:
- Using the `Platform` module.
- Using platform-specific file extensions.

Certain components may have properties that work on one platform only. All of these props are annotated with `@platform` and have a small badge next to them on the website.

### Platform module

React Native provides a module that detects the platform in which the app is running. You can use the detection logic to implement platform-specific code. Use this option when only small parts of a component are platform-specific.

```
import {Platform, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 200 : 100,
});
```

`Platform.OS` will be `ios` when running on iOS and `android` when running on Android.

There is also a `Platform.select` method available that, given an object where keys can be one of `'ios' | 'android' | 'native' | 'default'`, returns the most fitting value for the platform you are currently running on.

```
import {Platform, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: { backgroundColor: 'red', },
      android: { backgroundColor: 'green', },
      default: { backgroundColor: 'blue', },
    }),
  },
});
```

Since it accepts `any` value, you can also use it to return platform-specific components:

```
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();
<Component />;
```

```
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();
<Component />;
```

#### Detecting the Android version

On Android, the `Platform` module can also be used to detect the version of the Android Platform in which the app is running:
```
import {Platform} from 'react-native';
if (Platform.Version === 25) {
  console.log('Running on Nougat!');
}
```

#### Detecting the iOS version

On iOS, the `Version` is a result of `-[UIDevice systemVersion]`, which is a string with the current version of the operating system. An example of the system version is "10.3".
```
import {Platform} from 'react-native';
const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}
```

### Platform-specific extensions

When your platform-specific code is more complex, you should consider splitting the code out into separate files. React Native will detect when a file has a `.ios.` or `.android.` extension and load the relevant platform file when required from other components.

For example, say you have the following files in your project:
```
BigButton.ios.js
BigButton.android.js
```

You can then import the component as follows:
```
import BigButton from './BigButton';
```

React Native will automatically pick up the right file based on the running platform.

### Native-specific extensions (i.e. sharing code with NodeJS and Web)

You can also use the `.native.js` extension when a module needs to be shared between NodeJS/Web and React Native but it has no Android/iOS differences. This is especially useful for projects that have common code shared among React Native and ReactJS.

For example, say you have the following files in your project:
```
Container.js # picked up by webpack, Rollup or any other Web bundler
Container.native.js # picked up by the React Native bundler for both Android and iOS (Metro)
```

You can still import it without the `.native` extension:
```
import Container from './Container';
```

---

### More Resources
Source: https://reactnative.dev/docs/more-resources

There's always more to learn: developer workflows, shipping to app stores, internationalization, security and more.

### Where to go from here
- [Set up your environment](/docs/environment-setup)
- [Set up your development workflow](/docs/running-on-device)
- [Design and layout your app](/docs/flexbox)
- [Debug your app](/docs/debugging)
- [Make your app cross platform](/docs/platform-specific-code)
- [Get involved in the React Native community](/community/overview)

### Dive deep
- [React's Documentation](https://react.dev/learn)
- [MDN's JavaScript tutorials, reference, and guides](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Android](https://developer.android.com/docs) and [iOS](https://developer.apple.com/documentation/uikit) platform docs

### IDEs

We recommend using the [VS Code](https://code.visualstudio.com/) code editor and its handy [React Native tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native).

### Platforms to try

[Expo](https://docs.expo.dev/) is a framework of tools and services for React Native that focuses on helping you build, ship, and iterate on your app, to use preview deployment workflows that are popular with web development, and to automate your development workflows.

[Ignite](https://github.com/infinitered/ignite) is a starter kit CLI with several React Native boilerplates. The latest, Ignite Maverick, uses MobX-State-Tree for state management, React Navigation, and other common libraries. It has generators for screens, models, and more, and supports Expo out of the box.

### Example Apps

Try out apps from the [Showcase](https://reactnative.dev/showcase) to see what React Native is capable of! Check out this [set of example apps on GitHub](https://github.com/ReactNativeNews/React-Native-Apps).

### Find, make, and share your own Native Components and TurboModules

React Native has a community of thousands of developers like you making content, tools, tutorials—and Native Components!

Can't find what you're looking for in the Core Components? Visit [React Native Directory](https://reactnative.directory) to find what the community has been creating.

---

## Environment Setup

### Get Started with React Native
Source: https://reactnative.dev/docs/environment-setup

**React Native allows developers who know React to create native apps.** At the same time, native developers can use React Native to gain parity between native platforms by writing common features once.

We believe that the best way to experience React Native is through a **Framework**, a toolbox with all the necessary APIs to let you build production ready apps.

You can also use React Native without a Framework, however we've found that most developers benefit from using a React Native Framework like [Expo](https://expo.dev). Expo provides features like file-based routing, high-quality universal libraries, and the ability to write plugins that modify native code without having to manage native files.

**Can I use React Native without a Framework?**

Yes. You can use React Native without a Framework. **However, if you're building a new app with React Native, we recommend using a Framework.**

In short, you'll be able to spend time writing your app instead of writing an entire Framework yourself in addition to your app.

The React Native community has spent years refining approaches to navigation, accessing native APIs, dealing with native dependencies, and more. Most apps need these core features. A React Native Framework provides them from the start of your app.

Without a Framework, you'll either have to write your own solutions to implement core features, or you'll have to piece together a collection of pre-existing libraries to create a skeleton of a Framework. This takes real work, both when starting your app, then later when maintaining it.

If your app has unusual constraints that are not served well by a Framework, or you prefer to solve these problems yourself, you can make a React Native app without a Framework using Android Studio, Xcode. If you're interested in this path, learn how to [set up your environment](/docs/set-up-your-environment) and how to [get started without a framework](/docs/getting-started-without-a-framework).

### Start a new React Native project with Expo

**Platform support:** Android | iOS | TV | Web

Expo is a production-grade React Native Framework. Expo provides developer tooling that makes developing apps easier, such as file-based routing, a standard library of native modules, and much more.

Expo's Framework is free and open source, with an active community on [GitHub](https://github.com/expo) and [Discord](https://chat.expo.dev). The Expo team works in close collaboration with the React Native team at Meta to bring the latest React Native features to the Expo SDK.

The team at Expo also provides Expo Application Services (EAS), an optional set of services that complements Expo, the Framework, in each step of the development process.

To create a new Expo project, run the following in your terminal:
```
npx create-expo-app@latest
```

Once you've created your app, check out the rest of Expo's getting started guide to start developing your app.

---

### Set Up Your Environment
Source: https://reactnative.dev/docs/set-up-your-environment

In this guide, you'll learn how to set up your environment, so that you can run your project with Android Studio and Xcode. This will allow you to develop with Android emulators and iOS simulators, build your app locally, and more.

> This guide requires Android Studio or Xcode. If you already have one of these programs installed, you should be able to get up and running within a few minutes. If they are not installed, you should expect to spend about an hour installing and configuring them.

**Is setting up my environment required?**

Setting up your environment is not required if you're using a [Framework](/architecture/glossary#react-native-framework). With a React Native Framework, you don't need to set up Android Studio or Xcode as it will take care of building the native app for you.

If you have constraints that prevent you from using a Framework, or you'd like to write your own Framework, then setting up your local environment is a requirement.

#### Development OS: macOS | Target OS: Android

**Installing dependencies**

You will need Node, Watchman, the React Native command line interface, a JDK, and Android Studio.

**Node & Watchman**
```
brew install node
brew install watchman
```
If you have already installed Node on your system, make sure it is Node 22.11.0 or newer.

**Java Development Kit**
```
brew install --cask zulu@17
```
After the JDK installation, add or update your `JAVA_HOME` environment variable:
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

**Android development environment**

1. Install Android Studio
2. Install the Android SDK - requires `Android 15 (VanillaIceCream)` SDK
3. Configure the `ANDROID_HOME` environment variable

**Preparing the Android device**

You will need an Android device to run your React Native Android app. This can be either a physical Android device or an Android Virtual Device.

#### Development OS: macOS | Target OS: iOS

**Installing dependencies**

You will need Node, Watchman, Xcode and CocoaPods.

**Node & Watchman**
```
brew install node
brew install watchman
```

**Xcode** - Please use the latest version of Xcode.

**Command Line Tools** - Install from Xcode > Settings > Locations.

**CocoaPods**
CocoaPods is a Ruby gem. You can install it using the version of Ruby that ships with the latest version of macOS.

#### Development OS: Windows | Target OS: Android

**Installing dependencies**

You will need Node, the React Native command line interface, a JDK, and Android Studio.

**Node, JDK**
```
choco install -y nodejs-lts microsoft-openjdk17
```

**Android development environment**

1. Install Android Studio
2. Install the Android SDK - requires `Android 15 (VanillaIceCream)` SDK
3. Configure the `ANDROID_HOME` environment variable
4. Add platform-tools to Path

#### Development OS: Linux | Target OS: Android

**Installing dependencies**

You will need Node, the React Native command line interface, a JDK, and Android Studio.

**Node** - Follow the installation instructions for your Linux distribution to install Node 22.11.0 or newer.

**Java Development Kit** - React Native currently recommends version 17 of the Java SE Development Kit (JDK).

**Android development environment**

1. Install Android Studio
2. Install the Android SDK - requires `Android 15 (VanillaIceCream)` SDK
3. Configure the `ANDROID_HOME` environment variable

---

### Get Started Without a Framework
Source: https://reactnative.dev/docs/getting-started-without-a-framework

**Platform support:** Android | iOS | macOS | TV | watchOS | Web | Windows | visionOS

If you have constraints that are not served well by a [Framework](/architecture/glossary#react-native-framework), or you prefer to write your own Framework, you can create a React Native app without using a Framework.

To do so, you'll first need to [set up your environment](/docs/set-up-your-environment). Once you're set up, continue with the steps below.

### Step 1: Creating a new application

> If you previously installed a global `react-native-cli` package, please remove it:
> `npm uninstall -g react-native-cli @react-native-community/cli`

You can use [React Native Community CLI](https://github.com/react-native-community/cli) to generate a new project:
```
npx @react-native-community/cli@latest init AwesomeProject
```

#### Using a specific version or template
```
npx @react-native-community/cli@X.XX.X init AwesomeProject --version X.XX.X
```

### Step 2: Start Metro

**Metro** is the JavaScript build tool for React Native. To start the Metro development server:
```
npm start
```
```
yarn start
```

### Step 3: Start your application
```
npm run android
```
```
yarn android
```

### Step 4: Modifying your app

- Open `App.tsx` in your text editor of choice and edit some lines.
- Press the R key twice or select `Reload` from the Dev Menu (Ctrl + M) to see your changes!

### That's it!

Congratulations! You've successfully run and modified your first barebone React Native app.

---

### Integration with Existing Apps
Source: https://reactnative.dev/docs/integration-with-existing-apps

React Native is great when you are starting a new mobile app from scratch. However, it also works well for adding a single view or user flow to existing native applications. With a few steps, you can add new React Native based features, screens, views, etc.

**Target: Android (Java & Kotlin)**

### Key Concepts

The keys to integrating React Native components into your Android application are to:
1. Set up the correct directory structure.
2. Install the necessary NPM dependencies.
3. Adding React Native to your Gradle configuration.
4. Writing the TypeScript code for your first React Native screen.
5. Integrate React Native with your Android code using a ReactActivity.
6. Testing your integration by running the bundler and seeing your app in action.

### Using the Community Template

While you follow this guide, we suggest you to use the [React Native Community Template](https://github.com/react-native-community/template/) as reference.

### 1. Set up directory structure

To ensure a smooth experience, create a new folder for your integrated React Native project, then **move your existing Android project** to the `/android` subfolder.

### 2. Install NPM dependencies

Go to the root directory and run:
```
curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.85-stable/template/package.json
```
```
npm install
```

Add `node_modules/` to your `.gitignore` file.

### 3. Adding React Native to your app

**Configuring Gradle** - Edit `settings.gradle`, top-level `build.gradle`, and app-level `build.gradle` files to include React Native Gradle Plugin.

**Configuring your manifest** - Add Internet permission and enable cleartext traffic in debug `AndroidManifest.xml`.

### 4. Writing the TypeScript Code

Create `index.js` and `App.tsx` files.

### 5. Integrating with your Android code

Update your `Application` class to implement `ReactApplication` and create a `ReactActivity`.

### 6. Test your integration

Create a `metro.config.js` file and run the bundler: `npm start`.

**Target: iOS (Objective-C and Swift)**

### Key Concepts

The keys to integrating React Native components into your iOS application are to:
1. Set up the correct directory structure.
2. Install the necessary NPM dependencies.
3. Adding React Native to your Podfile configuration.
4. Writing the TypeScript code for your first React Native screen.
5. Integrate React Native with your iOS code using an `RCTRootView`.
6. Testing your integration by running the bundler and seeing your app in action.

### 1. Set up directory structure

Create a new folder for your integrated React Native project, then **move your existing iOS project** to the `/ios` subfolder.

### 2. Install NPM dependencies
```
curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/0.85-stable/template/package.json
```
```
npm install
```

### 3. Install Development tools

Install Command Line Tools for Xcode and CocoaPods.

### 4. Adding React Native to your app

**Configuring CocoaPods** - Set up Gemfile and Podfile. Run `bundle install` and `bundle exec pod install`.

### 5. Writing the TypeScript Code

Create `index.js` and `App.tsx` files.

### 6. Integrating with your iOS code

Create a `ReactViewController` using `RCTReactNativeFactory` and present the React Native view.

### 7. Passing initial props to the React Native view

Update `App.tsx` to read initial properties and pass them from native code via `initialProperties` parameter.

---

### Integration with an Android Fragment
Source: https://reactnative.dev/docs/integration-with-android-fragment

The guide for [Integration with Existing Apps](/docs/integration-with-existing-apps) details how to integrate a full-screen React Native app into an existing Android app as an **Activity**.

To use React Native components within **Fragments** in an existing app requires some additional setup.

### 1. Add React Native to your app

Follow the guide for [Integration with Existing Apps](/docs/integration-with-existing-apps) until the end.

### 2. Add a FrameLayout for the React Native Fragment

Add a `<FrameLayout>` with an id, width and height to your Activity's layout.

### 3. Make your host Activity implement `DefaultHardwareBackBtnHandler`

Your host Activity needs to implement the `DefaultHardwareBackBtnHandler` interface to handle the back button press event.

### 4. Add a React Native Fragment to the FrameLayout

Update your Activity's `onCreate` method to add a React Native Fragment:
```
val reactNativeFragment = ReactFragment.Builder()
    .setComponentName("HelloWorld")
    .setLaunchOptions(Bundle().apply { putString("message", "my value") })
    .build()
supportFragmentManager
    .beginTransaction()
    .add(R.id.react_native_fragment, reactNativeFragment)
    .commit()
```

### 5. Test your integration

Make sure you run `yarn start` to run the bundler and then run your android app in Android Studio.

---

### 🗑️ Building For TV Devices
Source: https://reactnative.dev/docs/building-for-tv

TV devices support has been implemented with the intention of making existing React Native applications work on Apple TV and Android TV, with few or no changes needed in the JavaScript code for the applications.

**Deprecated**

TV support has moved to the [React Native for TV](https://github.com/react-native-tvos/react-native-tvos#readme) repository. Please see the **README** there for information on projects for Apple TV or Android TV.

---

### Out-of-Tree Platforms
Source: https://reactnative.dev/docs/out-of-tree-platforms

React Native is not only for Android and iOS devices - our partners and the community maintain projects that bring React Native to other platforms, such as:

**From Partners**
- [React Native macOS](https://github.com/microsoft/react-native-macos) - React Native for macOS and Cocoa.
- [React Native Windows](https://github.com/microsoft/react-native-windows) - React Native for Microsoft's Universal Windows Platform (UWP).
- [React Native visionOS](https://github.com/callstack/react-native-visionos) - React Native for Apple's visionOS.

**From Community**
- [React Native tvOS](https://github.com/react-native-tvos/react-native-tvos) - React Native for Apple TV and Android TV devices.
- [React Native Web](https://github.com/necolas/react-native-web) - React Native on the web using React DOM.
- [React Native Skia](https://github.com/react-native-skia/react-native-skia) - React Native using [Skia](https://skia.org/) as a renderer. Currently supports Linux and macOS.

### Creating your own React Native platform

The process of creating a React Native platform from scratch is still not very well documented - one of the goals of the New Architecture and [Fabric](/architecture/fabric-renderer) is to make maintaining a platform easier.

#### Bundling

As of React Native 0.57 you can now register your React Native platform with React Native's JavaScript bundler, [Metro](https://metrobundler.dev/). This means you can pass `--platform example` to `npx react-native bundle`, and it will look for JavaScript files with the `.example.js` suffix.

To register your platform with RNPM, your module's name must match one of these patterns:
- `react-native-example`
- `@org/react-native-example`
- `@react-native-example/module`

You must also have an entry in your `package.json`:
```
{
  "rnpm": {
    "haste": {
      "providesModuleNodeModules": ["react-native-example"],
      "platforms": ["example"]
    }
  }
}
```

---

## Workflow

### Running On Device
Source: https://reactnative.dev/docs/running-on-device

It's always a good idea to test your app on an actual device before releasing it to your users.

> If you used `create-expo-app` to set up your project, you can run your app on a device in Expo Go by scanning the QR code that is displayed when you run `npm start`.

**Running your app on Android devices**

1. **Enable Debugging over USB** - Enable "Developer options" and "USB debugging".
2. **Plug in your device via USB** - Check connection with `adb devices`.
3. **Run your app** - `npm run android` or `yarn android`.

**Connecting to the development server**
- **Method 1: Using adb reverse (recommended)** - `adb -s <device name> reverse tcp:8081 tcp:8081`
- **Method 2: Connect via Wi-Fi** - Configure debug server host & port in Dev Settings.

**Building your app for production** - Follow the guide for [generating a signed APK](/docs/signed-apk-android).

**Running your app on iOS devices**

1. **Plug in your device via USB** - Connect your iOS device to your Mac.
2. **Configure code signing** - Register for an Apple Developer account and select your team.
3. **Build and Run your app** - Press **Build and run** button (Cmd + R) in Xcode.

**Connecting to the development server** - Shake your device to open the Dev Menu, then enable Fast Refresh.

**Building your app for production** - Follow the guide for [publishing to the Apple App Store](/docs/publishing-to-app-store).

---

### Fast Refresh
Source: https://reactnative.dev/docs/fast-refresh

Fast Refresh is a React Native feature that allows you to get near-instant feedback for changes in your React components. Fast Refresh is enabled by default, and you can toggle "Enable Fast Refresh" in the [React Native Dev Menu](/docs/debugging#accessing-the-in-app-developer-menu).

### How It Works

- If you edit a module that **only exports React component(s)**, Fast Refresh will update the code only for that module, and re-render your component.
- If you edit a module with exports that *aren't* React components, Fast Refresh will re-run both that module, and the other modules importing it.
- If you **edit a file** that's **imported by modules outside of the React tree**, Fast Refresh **will fall back to doing a full reload**.

### Error Resilience

- If you make a **syntax error** during a Fast Refresh session, you can fix it and save the file again. The redbox will disappear.
- If you make a **runtime error during the module initialization**, the Fast Refresh session will continue once you fix the error.
- If you make a mistake that leads to a **runtime error inside your component**, the Fast Refresh session will *also* continue after you fix the error.

### Limitations

- Local state is not preserved for class components (only function components and Hooks preserve state).
- The module you're editing might have *other* exports in addition to a React component.
- Sometimes, a module would export the result of calling a higher-order component.

### Tips

- Fast Refresh preserves React local state in function components (and Hooks) by default.
- To *force* state to be reset, add `// @refresh reset` anywhere in the file you're editing.

### Fast Refresh and Hooks

When possible, Fast Refresh attempts to preserve the state of your component between edits. `useState` and `useRef` preserve their previous values as long as you don't change their arguments or the order of the Hook calls.

Hooks with dependencies—such as `useEffect`, `useMemo`, and `useCallback`—will *always* update during Fast Refresh.

---

### Metro
Source: https://reactnative.dev/docs/metro

React Native uses [Metro](https://metrobundler.dev/) to build your JavaScript code and assets.

### Configuring Metro

Configuration options for Metro can be customized in your project's `metro.config.js` file. This can export either:
- **An object (recommended)** that will be merged on top of Metro's internal config defaults.
- **A function** that will be called with Metro's internal config defaults and should return a final config object.

In React Native, your Metro config should extend either `@react-native/metro-config` or `@expo/metro-config`.

Below is the default `metro.config.js` file in a React Native template project:
```
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

### Advanced: Using a config function

Exporting a config function is an opt-in to managing the final config yourself — **Metro will not apply any internal defaults**.

### Learn more about Metro
- [Metro website](https://metrobundler.dev/)
- [Video: "Metro & React Native DevX" talk at App.js 2023](https://www.youtube.com/watch?v=c9D4pg0y9cI)

---

### Using Libraries
Source: https://reactnative.dev/docs/libraries

React Native provides a set of built-in [Core Components and APIs](/docs/components-and-apis) ready to use in your app. You're not limited to these. React Native has a community of thousands of developers.

### Selecting a Package Manager

React Native libraries are typically installed from the [npm registry](https://www.npmjs.com/) using a Node.js package manager such as npm CLI or Yarn Classic.

### Installing a Library

To install a library in your project, navigate to your project directory and run the installation command:
```
npm install react-native-webview
```
```
yarn add react-native-webview
```

### Linking Native Code on iOS

Run `pod install` in our `ios` directory:
```
npx pod-install
```

### Linking Native Code on Android

Re-build the app binary:
```
npm run android
```
```
yarn android
```

### Finding Libraries

[React Native Directory](https://reactnative.directory) is a searchable database of libraries built specifically for React Native. This is the first place to look for a library for your React Native app.

### Determining Library Compatibility

- **Does it work with React Native?** - Usually libraries built specifically for other platforms will not work with React Native.
- **Does it work for the platforms that my app supports?** - React Native Directory allows you to filter by platform compatibility.
- **Does it work with my app version of React Native?** - The latest version of a library is typically compatible with the latest version of React Native.

---

### Using TypeScript
Source: https://reactnative.dev/docs/typescript

[TypeScript](https://www.typescriptlang.org/) is a language which extends JavaScript by adding type definitions. New React Native projects target TypeScript by default, but also support JavaScript and Flow.

### Getting Started with TypeScript

New projects created by the [React Native CLI](/docs/getting-started-without-a-framework#step-1-creating-a-new-application) or popular templates like [Ignite](https://github.com/infinitered/ignite) will use TypeScript by default.

### Adding TypeScript to an Existing Project

1. Add TypeScript, types, and ESLint plugins to your project:
```
npm install -D typescript @react-native/typescript-config @types/jest @types/react @types/react-test-renderer
```

2. Add a TypeScript config file. Create a `tsconfig.json`:
```
{ "extends": "@react-native/typescript-config" }
```

3. Rename a JavaScript file to be `*.tsx`.

4. Run `tsc` to type-check.

### Using JavaScript Instead of TypeScript

React Native defaults new applications to TypeScript, but JavaScript may still be used. Files with a `.jsx` extension are treated as JavaScript.

### How TypeScript and React Native works

Out of the box, TypeScript sources are transformed by [Babel](/docs/javascript-environment#javascript-syntax-transformers) during bundling. We recommend that you use the TypeScript compiler only for type checking.

### What does React Native + TypeScript look like

You can provide an interface for a React Component's Props and State via `React.Component<Props, State>` which will provide type-checking and editor auto-completing.

### Where to Find Useful Advice
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React's documentation on TypeScript](https://react.dev/learn/typescript)
- [React + TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets)

### Using Custom Path Aliases with TypeScript

1. Edit your `tsconfig.json` to have custom path mappings.
2. Add `babel-plugin-module-resolver` as a development package.
3. Configure your `babel.config.js`.

---

### Strict TypeScript API (opt in)
Source: https://reactnative.dev/docs/strict-typescript-api

The Strict TypeScript API is a preview of our future, stable JavaScript API for React Native.

This is a new set of TypeScript types for the `react-native` npm package, available from 0.80 onwards. These provide stronger and more futureproof type accuracy, and will allow us to confidently evolve React Native's API into a stable shape.

The new types are:
1. **Generated directly from our source code** — improving coverage and correctness.
2. **Restricted to `react-native`'s index file** — more tightly defining our public API.

### Opting in

Opt in via your `tsconfig.json` file:
```
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "customConditions": ["react-native-strict-api"]
  }
}
```

Opting in is a **breaking change**. This will instruct TypeScript to resolve `react-native` types from our new `types_generated/` dir.

### Migration guide

**Codegen types** should now be imported from the `react-native` package:
```
import {CodegenTypes, codegenNativeComponent} from 'react-native';
```

**Removal of `*Static` types** - Types like `AlertStatic`, `LinkingStatic`, etc. are removed. Use the value directly as a type.

**Some core components are now function components** instead of class components (View, Image, TextInput, Modal, Text, etc.). Access ref types using `React.ComponentRef<typeof View>`.

### Other breaking changes

- **Changes to Animated types** - Animated nodes are now non-generic types with a generic `interpolate` method.
- **Unified types for optional props** - Every optional prop will be typed as `type | undefined`.
- **Removal of some deprecated types** - All types listed in `DeprecatedPropertiesAlias.d.ts` are inaccessible.
- **Removal of leftover component props** - Some unused properties were removed.

---

### Upgrading to new versions
Source: https://reactnative.dev/docs/upgrading

Upgrading to new versions of React Native will give you access to more APIs, views, developer tools and other goodies.

### Expo projects

Upgrading your Expo project requires updating the `react-native`, `react`, and `expo` package versions. Expo recommends upgrading SDK versions incrementally. See the [Upgrading Expo SDK Walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/).

### React Native projects

Because typical React Native projects are essentially made up of an Android project, an iOS project, and a JavaScript project, upgrading can be rather tricky. The [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) is a web tool to help you out.

### 1. Select the versions

Select from and to which version you wish to upgrade.

### 2. Upgrade dependencies

Update `react-native` and `react` in your `package.json`:
```
npm install react-native@{{VERSION}}
npm install react@{{REACT_VERSION}}
```
```
yarn add react-native@{{VERSION}}
yarn add react@{{REACT_VERSION}}
```

### 3. Upgrade your project files

The new release may contain updates to other files that are generated when you run `npx react-native init`. You need to manually apply changes listed in the Upgrade Helper.

### Troubleshooting

If your app is still using an old version, it's recommended to install [react-native-clean-project](https://github.com/pmadruga/react-native-clean-project) to clear all your project's cache.

---


## UI & Interaction

---

## Style
Source: https://reactnative.dev/docs/style

With React Native, you style your application using JavaScript. All of the core components accept a prop named `style`. The style names and [values](/docs/colors) usually match how CSS works on the web, except names are written using camel casing, e.g. `backgroundColor` rather than `background-color`.

The `style` prop can be a plain old JavaScript object. That's what we usually use for example code. You can also pass an array of styles - the last style in the array has precedence, so you can use this to inherit styles.

As a component grows in complexity, it is often cleaner to use `StyleSheet.create` to define several styles in one place.

One common pattern is to make your component accept a `style` prop which in turn is used to style subcomponents. You can use this to make styles "cascade" the way they do in CSS.

There are a lot more ways to customize the text style. Check out the [Text component reference](/docs/text) for a complete list.

### Known issues

- [react-native#29308](https://github.com/facebook/react-native/issues/29308#issuecomment-792864162): In some cases React Native does not match how CSS works on the web, for example the touch area never extends past the parent view bounds and on Android negative margin is not supported.

---

## Height and Width
Source: https://reactnative.dev/docs/height-and-width

A component's height and width determine its size on the screen.

### Fixed Dimensions

The general way to set the dimensions of a component is by adding a fixed `width` and `height` to style. All dimensions in React Native are unitless, and represent density-independent pixels.

Setting dimensions this way is common for components whose size should always be fixed to a number of points and not calculated based on screen size.

> There is no universal mapping from points to physical units of measurement. This means that a component with fixed dimensions might not have the same physical size, across different devices and screen sizes. However, this difference is unnoticeable for most use cases.

### Flex Dimensions

Use `flex` in a component's style to have the component expand and shrink dynamically based on available space. Normally you will use `flex: 1`, which tells a component to fill all available space, shared evenly amongst other components with the same parent. The larger the `flex` given, the higher the ratio of space a component will take compared to its siblings.

> A component can only expand to fill available space if its parent has dimensions greater than `0`. If a parent does not have either a fixed `width` and `height` or `flex`, the parent will have dimensions of `0` and the `flex` children will not be visible.

### Percentage Dimensions

If you want to fill a certain portion of the screen, but you *don't* want to use the `flex` layout, you *can* use **percentage values** in the component's style. Similar to flex dimensions, percentage dimensions require parent with a defined size.

---

## Layout with Flexbox
Source: https://reactnative.dev/docs/flexbox

A component can specify the layout of its children using the Flexbox algorithm. Flexbox is designed to provide a consistent layout on different screen sizes.

You will normally use a combination of `flexDirection`, `alignItems`, and `justifyContent` to achieve the right layout.

> Flexbox works the same way in React Native as it does in CSS on the web, with a few exceptions. The defaults are different, with `flexDirection` defaulting to `column` instead of `row`, `alignContent` defaulting to `flex-start` instead of `stretch`, `flexShrink` defaulting to `0` instead of `1`, the `flex` parameter only supporting a single number.

### Flex

[`flex`](/docs/layout-props#flex) will define how your items are going to **"fill"** over the available space along your main axis. Space will be divided according to each element's flex property.

### Flex Direction

[`flexDirection`](/docs/layout-props#flexdirection) controls the direction in which the children of a node are laid out. This is also referred to as the main axis. The cross axis is the axis perpendicular to the main axis.

- `column` (**default value**) Align children from top to bottom.
- `row` Align children from left to right.
- `column-reverse` Align children from bottom to top.
- `row-reverse` Align children from right to left.

### Layout Direction

Layout [`direction`](/docs/layout-props#direction) specifies the direction in which children and text in a hierarchy should be laid out.

- `LTR` (**default value**) Text and children are laid out from left to right.
- `RTL` Text and children are laid out from right to left.

### Justify Content

[`justifyContent`](/docs/layout-props#justifycontent) describes how to align children within the main axis of their container.

- `flex-start`(**default value**) Align children to the start of the container's main axis.
- `flex-end` Align children to the end of the container's main axis.
- `center` Align children in the center of the container's main axis.
- `space-between` Evenly space children across the container's main axis.
- `space-around` Evenly space children with space around them.
- `space-evenly` Evenly distribute children with equal spacing.

### Align Items

[`alignItems`](/docs/layout-props#alignitems) describes how to align children along the cross axis of their container.

- `stretch` (**default value**) Stretch children to match the height of the container's cross axis.
- `flex-start` Align children to the start of the container's cross axis.
- `flex-end` Align children to the end of the container's cross axis.
- `center` Align children in the center of the container's cross axis.
- `baseline` Align children along a common baseline.

### Align Self

[`alignSelf`](/docs/layout-props#alignself) has the same options and effect as `alignItems` but applies to a single child to change its alignment within its parent. `alignSelf` overrides any option set by the parent with `alignItems`.

### Align Content

[alignContent](/docs/layout-props#aligncontent) defines the distribution of lines along the cross-axis. This only has effect when items are wrapped to multiple lines using `flexWrap`.

- `flex-start` (**default value**) Align wrapped lines to the start of the container's cross axis.
- `flex-end` Align wrapped lines to the end of the container's cross axis.
- `stretch` Stretch wrapped lines to match the height of the container's cross axis.
- `center` Align wrapped lines in the center of the container's cross axis.
- `space-between` Evenly space wrapped lines across the container's cross axis.
- `space-around` Evenly space wrapped lines with space around them.
- `space-evenly` Evenly space wrapped lines with equal spacing.

### Flex Wrap

The [`flexWrap`](/docs/layout-props#flexwrap) property controls what happens when children overflow the size of the container along the main axis. By default, children are forced into a single line. If wrapping is allowed, items are wrapped into multiple lines along the main axis if needed.

### Flex Basis, Grow, and Shrink

- [`flexBasis`](/docs/layout-props#flexbasis) is an axis-independent way of providing the default size of an item along the main axis.
- [`flexGrow`](/docs/layout-props#flexgrow) describes how much space within a container should be distributed among its children along the main axis.
- [`flexShrink`](/docs/layout-props#flexshrink) describes how to shrink children along the main axis when the total size of children overflows the container.

### Row Gap, Column Gap and Gap

- [`rowGap`](/docs/layout-props#rowgap) sets the size of the gap between an element's rows.
- [`columnGap`](/docs/layout-props#columngap) sets the size of the gap between an element's columns.
- [`gap`](/docs/layout-props#gap) is a shorthand for `rowGap` and `columnGap`.

### Width and Height

The `width` property specifies the width of an element's content area. Similarly, the `height` property specifies the height of an element's content area. Both can take `auto` (default), `pixels`, or `percentage` values.

### Position

The `position` type of an element defines how it is positioned relative to either itself, its parent, or its containing block.

- `relative` (**default value**) An element is positioned according to the normal flow of the layout, and then offset relative to that position.
- `absolute` An element doesn't take part in the normal layout flow. It is instead laid out independent of its siblings.
- `static` An element is positioned according to the normal flow of layout, and will ignore `top`, `right`, `bottom`, and `left` values. **Only available on the New Architecture**.

### The Containing Block

The containing block of an element is an ancestor element which controls its position and size. The `top`, `right`, `bottom`, and `left` values of an absolutely positioned element will be relative to its containing block.

- If an element has a `position` type of `relative` or `static`, its containing block is its parent.
- If an element has a `position` type of `absolute`, its containing block is the nearest ancestor with `position` other than `static` or with a `transform`.

### Going Deeper

Check out the interactive [yoga playground](https://www.yogalayout.dev/playground). The full list of props that control layout is documented [here](/docs/layout-props).

---

## Images
Source: https://reactnative.dev/docs/images

### Static Image Resources

React Native provides a unified way of managing images and other media assets in your Android and iOS apps. To add a static image to your app, place it somewhere in your source code tree and reference it like this:

```tsx
<Image source={require('./my-icon.png')} />
```

The image name is resolved the same way JS modules are resolved. You can use the `@2x` and `@3x` suffixes to provide images for different screen densities.

Benefits: Same system on Android and iOS, images live in the same folder as your JavaScript code, no global namespace, only used images are packaged, no recompilation needed for changes, bundler knows image dimensions, images can be distributed via npm.

### Static Non-Image Resources

The `require` syntax can be used to statically include audio, video or document files. Most common file types are supported including `.mp3`, `.wav`, `.mp4`, `.mov`, `.html`, `.pdf` and more.

### Images From Hybrid App's Resources

For images included via Xcode asset catalogs or in the Android drawable folder, use the image name without the extension. For images in the Android assets folder, use the `asset:/` scheme.

### Network Images

Unlike with static resources, you will need to manually specify the dimensions of your image. It's highly recommended that you use https.

```tsx
<Image source={{uri: 'https://reactjs.org/logo-og.png'}}
       style={{width: 400, height: 400}} />
```

You can also set HTTP method, headers, and body on the source object.

### URI Data Images

You can use the `'data:'` URI scheme to use encoded image data. Recommended for very small and dynamic images only.

Cache control options: `default`, `reload`, `force-cache`, `only-if-cached`.

### Local Filesystem Images

Android supports loading drawable resources via the `xml` file type. You can use vector drawables or shape drawables.

### Why Not Automatically Size Everything?

In React Native, this behavior is intentionally not implemented to avoid Cumulative Layout Shift. Static images loaded via `require()` can be automatically sized because their dimensions are available immediately.

### Source as an object

The `src` attribute is named `source` and takes an object with a `uri` attribute, allowing metadata attachment.

### Background Image via Nesting

Use the `<ImageBackground>` component, which has the same props as `<Image>`, and add whatever children to it you would like to layer on top.

### iOS Border Radius Styles

Corner-specific border radius style properties might be ignored by iOS's image component: `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius`.

### Off-thread Decoding

Image decoding is done in a different thread, preventing frame drops.

### Configuring iOS Image Cache Limits

On iOS, use `RCTSetImageCacheLimits(4*1024*1024, 200*1024*1024);` from within AppDelegate.

---

## Color Reference
Source: https://reactnative.dev/docs/colors

Components in React Native are styled using JavaScript. Color properties usually match how CSS works on the web.

### Color APIs

- [PlatformColor](/docs/platformcolor) lets you reference the platform's color system.
- [DynamicColorIOS](/docs/dynamiccolorios) allows specifying colors for light or Dark Mode.

### Color representations

**RGB**: `#f0f`, `#ff00ff`, `#f0ff`, `#ff00ff00`, `rgb(255, 0, 255)`, `rgb(255 0 255)`, `rgba(255, 0, 255, 1.0)`, `rgba(255 0 255 / 1.0)`

**HSL**: `hsl(360, 100%, 100%)`, `hsl(360 100% 100%)`, `hsla(360, 100%, 100%, 1.0)`, `hsla(360 100% 100% / 1.0)`

**HWB**: `hwb(0, 0%, 100%)`, `hwb(360, 100%, 100%)`, `hwb(0 0% 0%)`, `hwb(70 50% 0%)`

**Color ints**: `0xff00ff00` (0xrrggbbaa)

**Named colors**: Supports CSS3/SVG named colors (only lowercase). `transparent` is a shortcut for `rgba(0,0,0,0)`.

Full list of named color keywords: aliceblue, antiquewhite, aqua, aquamarine, azure, beige, bisque, black, blanchedalmond, blue, blueviolet, brown, burlywood, cadetblue, chartreuse, chocolate, coral, cornflowerblue, cornsilk, crimson, cyan, darkblue, darkcyan, darkgoldenrod, darkgray, darkgreen, darkgrey, darkkhaki, darkmagenta, darkolivegreen, darkorange, darkorchid, darkred, darksalmon, darkseagreen, darkslateblue, darkslategrey, darkturquoise, darkviolet, deeppink, deepskyblue, dimgray, dimgrey, dodgerblue, firebrick, floralwhite, forestgreen, fuchsia, gainsboro, ghostwhite, gold, goldenrod, gray, green, greenyellow, grey, honeydew, hotpink, indianred, indigo, ivory, khaki, lavender, lavenderblush, lawngreen, lemonchiffon, lightblue, lightcoral, lightcyan, lightgoldenrodyellow, lightgray, lightgreen, lightgrey, lightpink, lightsalmon, lightseagreen, lightskyblue, lightslategrey, lightsteelblue, lightyellow, lime, limegreen, linen, magenta, maroon, mediumaquamarine, mediumblue, mediumorchid, mediumpurple, mediumseagreen, mediumslateblue, mediumspringgreen, mediumturquoise, mediumvioletred, midnightblue, mintcream, mistyrose, moccasin, navajowhite, navy, oldlace, olive, olivedrab, orange, orangered, orchid, palegoldenrod, palegreen, paleturquoise, palevioletred, papayawhip, peachpuff, peru, pink, plum, powderblue, purple, rebeccapurple, red, rosybrown, royalblue, saddlebrown, salmon, sandybrown, seagreen, seashell, sienna, silver, skyblue, slateblue, slategray, snow, springgreen, steelblue, tan, teal, thistle, tomato, turquoise, violet, wheat, white, whitesmoke, yellow, yellowgreen.

---

## Handling Touches
Source: https://reactnative.dev/docs/handling-touches

Users interact with mobile apps mainly through touch. React Native provides components to handle all sorts of common gestures, as well as a comprehensive gesture responder system for more advanced gesture recognition.

### Displaying a basic button

[Button](/docs/button) provides a basic button component that is rendered nicely on all platforms.

```tsx
<Button
  onPress={() => {
    console.log('You tapped the button!');
  }}
  title="Press Me"
/>
```

This renders a blue label on iOS, and a blue rounded rectangle with light text on Android.

### Touchables

If the basic button doesn't look right, build your own using "Touchable" components:

- [**TouchableHighlight**](/docs/touchablehighlight) - view's background darkens when pressed.
- [**TouchableNativeFeedback**](/docs/touchablenativefeedback) - (Android) ink surface reaction ripples.
- [**TouchableOpacity**](/docs/touchableopacity) - reduces opacity when pressed.
- [**TouchableWithoutFeedback**](/docs/touchablewithoutfeedback) - no feedback displayed.

Long presses can be handled by passing a function to the `onLongPress` props.

### Scrolling and swiping

For swipes and pans, check out the [ScrollView](/docs/scrollview) Core Component.

### Known issues

- [react-native#29308](https://github.com/facebook/react-native/issues/29308): The touch area never extends past the parent view bounds and on Android negative margin is not supported.

---

## Navigating Between Screens
Source: https://reactnative.dev/docs/navigation

Mobile apps are rarely made up of a single screen. Managing the presentation of, and transition between, multiple screens is typically handled by a navigator.

### React Navigation

The community solution to navigation. Install with:

```
npm install @react-navigation/native @react-navigation/native-stack
```

For Expo projects:
```
npx expo install react-native-screens react-native-safe-area-context
```

For bare React Native projects:
```
npm install react-native-screens react-native-safe-area-context
cd ios && pod install && cd ..
```

Usage example:

```tsx
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: { screen: HomeScreen, options: {title: 'Welcome'} },
    Profile: { screen: ProfileScreen },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
```

Use `useNavigation` hook to navigate between screens.

For alternatives, see [react-native-navigation](https://github.com/wix/react-native-navigation).

---

## Animations
Source: https://reactnative.dev/docs/animations

React Native provides two complementary animation systems: [`Animated`](/docs/animated) for granular and interactive control, and [`LayoutAnimation`](/docs/layoutanimation) for animated global layout transactions.

### `Animated` API

The [`Animated`](/docs/animated) API focuses on declarative relationships between inputs and outputs. It exports six animatable component types: `View`, `Text`, `Image`, `ScrollView`, `FlatList` and `SectionList`.

#### Configuring animations

Most commonly used is [`Animated.timing()`](/docs/animated#timing). Supports custom easing functions, delays, durations.

```tsx
Animated.timing(this.state.xPosition, {
  toValue: 100,
  easing: Easing.back(),
  duration: 2000,
  useNativeDriver: true,
}).start();
```

#### Composing animations

Animations can be combined with `sequence()`, `parallel()`, `delay()`.

#### Interpolation

Maps input ranges to output ranges:

```tsx
value.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
```

#### Using the native driver

Set `useNativeDriver: true` to run animations on the UI thread. Only non-layout properties like `transform` and `opacity` are supported.

### `LayoutAnimation` API

Allows you to globally configure animations for all views in the next render/layout cycle.

### Additional notes

- `requestAnimationFrame` - polyfill from the browser.
- `setNativeProps` - modify native-backed components directly.

---

## Gesture Responder System
Source: https://reactnative.dev/docs/gesture-responder-system

The gesture responder system manages the lifecycle of gestures in your app.

### Best Practices

Every action should have: Feedback/highlighting and Cancel-ability.

### Responder Lifecycle

A view becomes the touch responder by implementing negotiation methods:

- `onStartShouldSetResponder` - Does this view want to become responder on touch start?
- `onMoveShouldSetResponder` - Called for touch moves when not the responder.

If the View returns true and becomes responder:

- `onResponderGrant` - The View is now responding.
- `onResponderReject` - Something else is the responder.
- `onResponderMove` - User is moving their finger.
- `onResponderRelease` - Fired at end of touch.
- `onResponderTerminationRequest` - Should this view release the responder?
- `onResponderTerminate` - Responder has been taken from the View.

### Capture ShouldSet Handlers

`onStartShouldSetResponderCapture` and `onMoveShouldSetResponderCapture` allow parent views to prevent children from becoming responder.

### PanResponder

For higher-level gesture interpretation, check out [PanResponder](/docs/panresponder).

---

## Networking
Source: https://reactnative.dev/docs/network

### Using Fetch

React Native provides the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```tsx
fetch('https://mywebsite.com/mydata.json');

fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify({ firstParam: 'yourValue', secondParam: 'yourOtherValue' }),
});
```

Handle responses with Promises or async/await.

> On iOS 9+, ATS requires HTTPS. On Android API Level 28+, clear text traffic is blocked by default.

### Using Other Networking Libraries

[XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) is built in, so libraries like axios or frisbee work.

### WebSocket Support

React Native supports [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) for full-duplex communication.

### Known Issues with fetch

`redirect:manual` and `credentials:omit` are not working. Cookie-based authentication is currently unstable.

### Configuring NSURLSession on iOS

Use `RCTSetCustomNSURLSessionConfigurationProvider` to customize the `NSURLSessionConfiguration`.

---

## Security
Source: https://reactnative.dev/docs/security

### Storing Sensitive Info

Never store sensitive API keys in app code. Use an orchestration layer (e.g. serverless function) for API keys.

**Async Storage**: Use for non-sensitive data across app runs. Do NOT use for token storage or secrets.

**Secure Storage**: iOS Keychain Services, Android Encrypted Shared Preferences, Android Keystore. Libraries: expo-secure-store, react-native-keychain.

### Authentication and Deep Linking

Deep links are not secure - never send sensitive information in them. Use PKCE (Proof of Key Code Exchange) for OAuth2 flows.

### Network Security

Always use SSL encryption. **SSL pinning** embeds trusted certificates to prevent man-in-the-middle attacks. Be mindful of certificate expiry.

---

## Accessibility
Source: https://reactnative.dev/docs/accessibility

Both Android and iOS provide APIs for integrating apps with assistive technologies like VoiceOver (iOS) and TalkBack (Android).

### Key Accessibility Properties

- `accessible` - Indicates a view is discoverable by assistive technologies.
- `accessibilityLabel` - String verbalized by screen reader when element is selected.
- `accessibilityHint` - Additional context on the result of an action.
- `accessibilityRole` - Communicates the purpose (button, link, header, etc.).
- `accessibilityState` - Describes current state (disabled, selected, checked, busy, expanded).
- `accessibilityValue` - Represents current value (for sliders, progress bars).
- `role` - Communicates purpose with precedence over `accessibilityRole`.

### Accessibility Actions

Components define supported actions via `accessibilityActions` and handle them with `onAccessibilityAction`.

### Checking if a Screen Reader is Enabled

Use the `AccessibilityInfo` API.

---

## Releases

---

## Releases Overview
Source: https://reactnative.dev/docs/releases

New React Native releases are shipped **every two months**, resulting in six new minors per year.

Current release status:
- **0.89.x** - Future (branch-cut 2026-11-03, release 2026-12-07)
- **0.88.x** - Future (2026-09-07, 2026-10-12)
- **0.87.x** - Future (2026-07-06, 2026-08-10)
- **0.86.x** - Future (2026-05-04, 2026-06-08)
- **0.85.x** - Active (2026-03-02, 2026-04-06)
- **0.84.x** - Active (2026-01-05, 2026-02-09)
- **0.83.x** - End of Cycle (2025-11-03, 2025-12-10)
- **0.82.x** - Unsupported
- **0.81.x** - Unsupported
- **0.80.x** - Unsupported

Support levels: Future, Active, End of Cycle, Unsupported.

### Commitment to Stability

The latest 3 minor series are maintained with regular updates and bug fixes.

---

## Release Levels
Source: https://reactnative.dev/docs/releases/release-levels

React Native provides **release levels** to adopt features before stable release: `EXPERIMENTAL`, `CANARY`, or `STABLE`.

- **STABLE**: For all production apps (default).
- **CANARY**: For testing new features before stable release. Not for production.
- **EXPERIMENTAL**: For early testing and feedback. Not for production.

### Initialization

**Android**: `DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.CANARY` then `.load()`
**iOS**: `[[RCTReactNativeFactory alloc] initWithDelegate:delegate releaseLevel:Canary];`

---

## Versioning Policy
Source: https://reactnative.dev/docs/releases/versioning-policy

### Stable Release Versions

Follows 0.x.y versioning:
- Breaking changes & new features → increment x (minor)
- Critical bug fixes → increment y (patch)

### Breaking changes

Breaking changes include: incompatible API changes, significant behavior/runtime changes, major dependency bumps, reduction of supported platform versions.

Not breaking: APIs with `unstable_` prefix, private/internal APIs, tooling/development API changes, development warnings.

### Deprecation Cycles

Deprecated APIs remain available for the following stable release.

### Release Channels

- **latest**: Stable semver releases.
- **next**: Release candidates (pre-release, e.g. `0.79.0-rc.0`).
- **nightly**: Published every day from main branch (`0.80.0-nightly-<DATE>-<SHA>`).

---

## Debugging

---

## Debugging Basics
Source: https://reactnative.dev/docs/debugging

Debugging features are disabled in release (production) builds.

### Opening the Dev Menu

- iOS Simulator: Ctrl + Cmd + Z (or Device > Shake)
- Android emulators: Cmd + M (macOS) or Ctrl + M (Windows/Linux)
- Android alternative: `adb shell input keyevent 82`

### Opening DevTools

Select "Open DevTools" in Dev Menu or press `j` from CLI.

### LogBox

In-app tool for warnings/errors. Fatal errors show a non-dismissable overlay. Console errors/warnings appear as on-screen notifications.

Configure with `LogBox.ignoreAllLogs()` or `LogBox.ignoreLogs([...])`.

### Performance Monitor

Toggle "Perf Monitor" in Dev Menu for an in-app performance overlay.

---

## React Native DevTools
Source: https://reactnative.dev/docs/react-native-devtools

The modern debugging experience for React Native, released in 0.76. Supports all apps running Hermes.

### Core Features

- **Console**: View/filter messages, evaluate JS, inspect objects.
- **Sources & breakpoints**: View source files, set breakpoints, step through code.
- **Network** (Since 0.83): View network requests (fetch, XHR, Image). Does not yet support WebSocket events, response mocking, or throttling.
- **Performance** (Since 0.83): Record performance traces showing JS execution, React tracks, network events.
- **Memory**: Heap snapshots, allocation timelines.

### React DevTools Features

- **React Components**: Inspect/update component tree, view/edit props/state at runtime.
- **React Profiler**: Record component render performance profiles.

---

## Debugging Native Code
Source: https://reactnative.dev/docs/debugging-native-code

### Accessing Logs

```
npx react-native log-android
npx react-native log-ios
```

### Custom Native Logs

**Android**: Use `Log.d("YourModuleName", message)` and view with `adb logcat`.
**iOS**: Use `NSLog(@"YourModuleName: %@", message)`.

### Debugging in a Native IDE

Launch app from Android Studio or Xcode, or attach the native debugger to the running process.

---

## Debugging Release Builds
Source: https://reactnative.dev/docs/debugging-release-builds

### Symbolicating a stack trace

Use `metro-symbolicate` to translate minified function names and bytecode offsets into file, line, and function names.

### Enabling source maps

**Android**: Enabled by default. Ensure `hermesFlags = ["-O", "-output-source-map"]` in `android/app/build.gradle`.
**iOS**: Disabled by default. Add `export SOURCEMAP_FILE="$(pwd)/../main.jsbundle.map"` to the "Bundle React Native code and images" build phase.

### Using metro-symbolicate

```
npx metro-symbolicate <sourcemap> < stacktrace.txt
adb logcat -d | npx metro-symbolicate <sourcemap>
```

---

## Other Debugging Methods
Source: https://reactnative.dev/docs/other-debugging-methods

### Safari Developer Tools (JSC debugging)

Use Safari to debug iOS apps using JavaScriptCore. Enable Web Inspector in Settings > Safari > Advanced, then find your device under Safari's Develop menu.

### Remote JavaScript Debugging (removed)

Removed as of React Native 0.79.

---

## Testing

---

## Testing
Source: https://reactnative.dev/docs/testing-overview

### Why Test

Testing ensures code continues to work as you add features, refactor, or upgrade dependencies. Automated testing reduces manual QA time.

### Static Analysis

- **Linters** (ESLint) catch common errors.
- **Type checking** (TypeScript) ensures correct function parameters.

### Writing Testable Code

Separate business logic from React components. Keep components focused on rendering.

### Writing Tests

Use Jest (included in the default template).

```
it('given a date in the past, colorForDueDate() returns red', () => {
  expect(colorForDueDate('2000-10-20')).toBe('red');
});
```

Structure with `describe`, `it`, `beforeEach`, `beforeAll`.

### Unit Tests

Cover individual functions or classes. Use **mocking** for external dependencies (e.g., native modules, network services).

### Integration Tests

Test real individual units combined together to ensure their cooperation works as expected.

### Component Tests

Use [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) to test user interactions and rendered output.

Prefer testing from the user perspective (what's on the page, what changes when interacted with). Avoid testing implementation details like props or state.

**Snapshot testing**: A textual representation of component render output. Guard against unexpected changes.

### End-to-End Tests

Test your app on a device/simulator from the user perspective. Popular tools: [Detox](https://github.com/wix/detox/), [Appium](https://appium.io/), [Maestro](https://maestro.mobile.dev/).

### Summary

Use a combination of static analysis, unit tests, integration tests, component tests, and E2E tests for comprehensive coverage.

---


## Performance Overview
Source: https://reactnative.dev/docs/performance

A compelling reason to use React Native instead of WebView-based tools is to achieve at least 60 frames per second and provide a native look and feel to your apps. Whenever feasible, we aim for React Native to handle optimizations automatically, allowing you to focus on your app without worrying about performance. However, there are certain areas where we haven't quite reached that level yet, and others where React Native (similar to writing native code directly) cannot determine the best optimization approach for you. In such cases, manual intervention becomes necessary. We strive to deliver buttery-smooth UI performance by default, but there may be instances where that isn't possible.

This guide is intended to teach you some basics to help you to troubleshoot performance issues, as well as discuss common sources of problems and their suggested solutions.

### What you need to know about frames

Your grandparents' generation called movies "moving pictures" for a reason: realistic motion in video is an illusion created by quickly changing static images at a consistent speed. We refer to each of these images as frames. The number of frames that is displayed each second has a direct impact on how smooth and ultimately life-like a video (or user interface) seems to be. iOS and Android devices display at least 60 frames per second, which gives you and the UI system at most 16.67ms to do all of the work needed to generate the static image (frame) that the user will see on the screen for that interval. If you are unable to do the work necessary to generate that frame within the allotted time slot, then you will "drop a frame" and the UI will appear unresponsive.

Now to confuse the matter a little bit, open up the Dev Menu in your app and toggle `Show Perf Monitor`. You will notice that there are two different frame rates.

#### JS frame rate (JavaScript thread)
For most React Native applications, your business logic will run on the JavaScript thread. This is where your React application lives, API calls are made, touch events are processed, and more. Updates to native-backed views are batched and sent over to the native side at the end of each iteration of the event loop, before the frame deadline (if all goes well). If the JavaScript thread is unresponsive for a frame, it will be considered a dropped frame. For example, if you were to set a new state on the root component of a complex application and it resulted in re-rendering computationally expensive component subtrees, it's conceivable that this might take 200ms and result in 12 frames being dropped. Any animations controlled by JavaScript would appear to freeze during that time. If enough frames are dropped, the user will feel it.

An example is responding to touches: if you are doing work across multiple frames on the JavaScript thread, you might notice a delay in responding to `TouchableOpacity`, for example. This is because the JavaScript thread is busy and cannot process the raw touch events sent over from the main thread. As a result, `TouchableOpacity` cannot react to the touch events and command the native view to adjust its opacity.

#### UI frame rate (main thread)
You may have noticed that performance of native stack navigators (such as the @react-navigation/native-stack provided by React Navigation) is better out of the box than JavaScript-based stack navigators. This is because the transition animations are executed on the native main UI thread, so they are not interrupted by frame drops on the JavaScript thread.

Similarly, you can happily scroll up and down through a `ScrollView` when the JavaScript thread is locked up because the `ScrollView` lives on the main thread. The scroll events are dispatched to the JS thread, but their receipt is not necessary for the scroll to occur.

### Common sources of performance problems

- **Running in development mode (`dev=true`)**: JavaScript thread performance suffers greatly when running in dev mode. This is unavoidable: a lot more work needs to be done at runtime to provide you with good warnings and error messages. Always make sure to test performance in release builds.

- **Using `console.log` statements**: When running a bundled app, these statements can cause a big bottleneck in the JavaScript thread. This includes calls from debugging libraries such as redux-logger, so make sure to remove them before bundling. You can also use this babel plugin that removes all the `console.*` calls. You need to install it first with `npm i babel-plugin-transform-remove-console --save-dev`, and then edit the `.babelrc` file under your project directory like this:
```json
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```
This will automatically remove all `console.*` calls in the release (production) versions of your project. It is recommended to use the plugin even if no `console.*` calls are made in your project. A third party library could also call them.

- **`FlatList` rendering is too slow or scroll performance is bad for large lists**: If your `FlatList` is rendering slowly, be sure that you've implemented `getItemLayout` to optimize rendering speed by skipping measurement of the rendered items. There are also other third-party list libraries that are optimized for performance, including FlashList and Legend List.

- **Dropping JS thread FPS because of doing a lot of work on the JavaScript thread at the same time**: "Slow Navigator transitions" is the most common manifestation of this, but there are other times this can happen. Using `InteractionManager` can be a good approach, but if the user experience cost is too high to delay work during an animation, then you might want to consider `LayoutAnimation`. The `Animated API` currently calculates each keyframe on-demand on the JavaScript thread unless you set `useNativeDriver: true`, while `LayoutAnimation` leverages Core Animation and is unaffected by JS thread and main thread frame drops. Caveats: `LayoutAnimation` only works for fire-and-forget animations ("static" animations) -- if it must be interruptible, you will need to use `Animated`.

- **Moving a view on the screen (scrolling, translating, rotating) drops UI thread FPS**: This is especially true on Android when you have text with a transparent background positioned on top of an image, or any other situation where alpha compositing would be required to re-draw the view on each frame. You will find that enabling `renderToHardwareTextureAndroid` can help with this significantly. For iOS, `shouldRasterizeIOS` is already enabled by default. Be careful not to overuse this or your memory usage could go through the roof.

- **Animating the size of an image drops UI thread FPS**: On iOS, each time you adjust the width or height of an `Image` component it is re-cropped and scaled from the original image. This can be very expensive, especially for large images. Instead, use the `transform: [{scale}]` style property to animate the size.

- **My TouchableX view isn't very responsive**: Sometimes, if we do an action in the same frame that we are adjusting the opacity or highlight of a component that is responding to a touch, we won't see that effect until after the `onPress` function has returned. This may occur if `onPress` sets a state that results in a heavy re-render and a few frames are dropped as a result. A solution to this is to wrap any action inside of your `onPress` handler in `requestAnimationFrame`:
```tsx
function handleOnPress() {
  requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```

---

## Speeding up your Build phase
Source: https://reactnative.dev/docs/build-speed

Building your React Native app could be **expensive** and take several minutes of developers time. This can be problematic as your project grows and generally in bigger organizations with multiple React Native developers.

To mitigate this performance hit, this page shares some suggestions on how to **improve your build time**.

> Please note that those suggestions are advanced feature that requires some amount of understanding of how the native build tools work.

### Build only one ABI during development (Android-only)
When building your android app locally, by default you build all the 4 Application Binary Interfaces (ABIs): `armeabi-v7a`, `arm64-v8a`, `x86` & `x86_64`. However, you probably don't need to build all of them if you're building locally and testing your emulator or on a physical device. This should reduce your **native build time** by a ~75% factor.

If you're using the React Native CLI, you can add the `--active-arch-only` flag to the `run-android` command. This flag will make sure the correct ABI is picked up from either the running emulator or the plugged in phone. To confirm that this approach is working fine, you'll see a message like `info Detected architectures arm64-v8a` on console.

```
$ react-native run-android --active-arch-only
```

This mechanism relies on the `reactNativeArchitectures` Gradle property. If you're building directly with Gradle from the command line and without the CLI, you can specify the ABI you want to build as follows:

```
$ ./gradlew :app:assembleDebug -PreactNativeArchitectures=x86,x86_64
```

Once you build a **release version** of your app, don't forget to remove those flags as you want to build an apk/app bundle that works for all the ABIs.

### Enable Configuration Caching (Android-only)
Since React Native 0.79, you can also enable Gradle Configuration Caching. When you're running an Android build with `yarn android`, you will be executing a Gradle build that is composed by two steps: Configuration phase, when all the `.gradle` files are evaluated; Execution phase, when the tasks are actually executed. You will now be able to enable Configuration Caching, which will allow you to skip the Configuration phase on subsequent builds.

You can enable Gradle Configuration Caching by adding the following line in your `android/gradle.properties` file:
```
org.gradle.configuration-cache=true
```

### Using a Maven Mirror (Android-only)
When building Android apps, your Gradle builds will need to download the necessary dependencies from Maven Central and other repositories from the internet. If your organization is running a Maven repository mirror, you should consider using it as it will speed up your build, by downloading the artifacts from the mirror rather than from the internet.

You can configure a mirror by specifying the `exclusiveEnterpriseRepository` property in your `android/gradle.properties` file:
```
exclusiveEnterpriseRepository=https://my.internal.proxy.net/
```

### Use a compiler cache
If you're running frequent native builds (either C++ or Objective-C), you might benefit from using a **compiler cache**. Specifically you can use two type of caches: local compiler caches and distributed compiler caches.

**Local caches**: We suggest to use **ccache** to cache the compilation of your native builds. Ccache works by wrapping the C++ compilers, storing the compilation results, and skipping the compilation if an intermediate compilation result was originally stored. ccache is available in the package manager for most operating systems.

**Xcode Specific Setup**: To make sure `ccache` works correctly with iOS and Xcode, you need to enable React Native support for ccache in `ios/Podfile`. Open `ios/Podfile` in your editor and uncomment the `ccache_enabled` line:
```ruby
:ccache_enabled => true
```

**Distributed caches**: Similar to local caches, you might want to consider using a distributed cache for your native builds. This could be specifically useful in bigger organizations that are doing frequent native builds. We recommend to use sccache to achieve this.

---

## Optimizing FlatList Configuration
Source: https://reactnative.dev/docs/optimizing-flatlist-configuration

### Terms
- **VirtualizedList**: The component behind `FlatList` (React Native's implementation of the Virtual List concept.)
- **Memory consumption**: How much information about your list is being stored in memory, which could lead to an app crash.
- **Responsiveness**: Application ability to respond to interactions.
- **Blank areas**: When `VirtualizedList` can't render your items fast enough, you may enter a part of your list with non-rendered components that appear as blank space.
- **Viewport**: The visible area of content that is rendered to pixels.
- **Window**: The area in which items should be mounted, which is generally much larger than the viewport.

### Props

**`removeClippedSubviews`**: If `true`, views that are outside of the viewport are automatically detached from the native view hierarchy. Default: `true` on Android, otherwise `false`. Pros: Reduces time spent on the main thread. Cons: Can have bugs, such as missing content (mainly observed on iOS).

**`maxToRenderPerBatch`**: Controls the amount of items rendered per batch, which is the next chunk of items rendered on every scroll. Default: 10. Pros: Bigger number means less visual blank areas when scrolling. Cons: More items per batch means longer periods of JavaScript execution potentially blocking other event processing.

**`updateCellsBatchingPeriod`**: The delay in milliseconds between batch renders (how frequently your component will be rendering the windowed items). Default: 50.

**`initialNumToRender`**: The initial amount of items to render. Default: 10. Pros: Define precise number of items that would cover the screen for every device. Cons: Setting a low value may cause blank areas.

**`windowSize`**: The number passed here is a measurement unit where 1 is equivalent to your viewport height. Default: 21 (10 viewports above, 10 below, and one in between). Pros: Bigger `windowSize` will result in less chance of seeing blank space while scrolling. Cons: Bigger will have more memory consumption.

### List items

- **Use basic components**: The more complex your components are, the slower they will render.
- **Use light components**: Avoid heavy images (use a cropped version or thumbnail for list items, as small as possible).
- **Use `memo()`**: `React.memo()` creates a memoized component that will be re-rendered only when the props passed to the component change.
- **Use cached optimized images**: You can use community packages such as `@d11/react-native-fast-image`.
- **Use `getItemLayout`**: If all your list item components have the same height, providing this prop removes the need for your `FlatList` to manage async layout calculations.
- **Use `keyExtractor` or `key`**: Used for caching and as the React `key` to track item re-ordering.
- **Avoid anonymous function on `renderItem`**: For functional components, move the `renderItem` function outside of the returned JSX and wrap it in a `useCallback` hook.

---

## Optimizing JavaScript loading
Source: https://reactnative.dev/docs/optimizing-javascript-loading

Parsing and running JavaScript code requires memory and time. Because of this, as your app grows, it's often useful to delay loading code until it's needed for the first time.

### Recommended: Use Hermes
Hermes is the default engine for new React Native apps, and is highly optimized for efficient code loading. In release builds, JavaScript code is fully compiled to bytecode ahead of time. Bytecode is loaded to memory on-demand and does not need to be parsed like plain JavaScript does.

### Recommended: Lazy-load large components
If a component with a lot of code/dependencies is not likely to be used when initially rendering your app, you can use React's `lazy` API to defer loading its code until it's rendered for the first time. Typically, you should consider lazy-loading screen-level components in your app.

**Tip: Avoid module side effects**: Lazy-loading components can change the behavior of your app if your component modules (or their dependencies) have *side effects*, such as modifying global variables or subscribing to events outside of a component.

### Advanced: Call `require` inline
Sometimes you may want to defer loading some code until you use it for the first time, without using `lazy` or an asynchronous `import()`. You can do this by using the `require()` function where you would otherwise use a static `import` at the top of the file.

### Advanced: Automatically inline `require` calls
If you use the React Native CLI to build your app, `require` calls (but not `import`s) will automatically be inlined for you, both in your code and inside any third-party packages (`node_modules`) you use.

**Pitfalls of inline `require`s**: Inlining `require` calls changes the order in which modules are evaluated, and can even cause some modules to *never* be evaluated. If one of your modules does have side effects - for example, if it initializes some logging mechanism, or patches a global API used by the rest of your code - then you might see unexpected behavior or even crashes.

### Advanced: Use random access module bundles (non-Hermes)
**Not supported when using Hermes.** RAM bundles work in conjunction with the techniques mentioned above to limit the amount of JavaScript code that needs to be parsed and loaded into memory. Each module is stored as a separate string (or file) which is only parsed when the module needs to be executed.

On Android enable the RAM format by editing your `android/app/build.gradle` file:
```
project.ext.react = [
  bundleCommand: "ram-bundle",
]
```

On iOS, RAM bundles are always indexed (= single file). Enable the RAM format in Xcode by editing the build phase "Bundle React Native code and images":
```
export BUNDLE_COMMAND="ram-bundle"
```

---

## Profiling
Source: https://reactnative.dev/docs/profiling

Profiling is the process of analyzing an app's performance, resource usage, and behavior to identify potential bottlenecks or inefficiencies. For iOS, Instruments is an invaluable tool, and on Android you should learn to use the Android Studio Profiler. But first, make sure that Development Mode is OFF!

### Profiling Android UI Performance with System Tracing

Android supports 10k+ different phones and is generalized to support software rendering. The first step for debugging jank is to answer the fundamental question of where your time is being spent during each 16ms frame. For that, we'll be using the built-in System Tracing profiler in the Android Studio.

**1. Collecting a trace**: Connect a device that exhibits the stuttering you want to investigate to your computer via USB. Open your project's `android` folder in Android Studio, select your device, and run your project as profileable. When your app is built as profileable and is running on the device, get your app to the point right before the navigation/animation you want to profile and start the "Capture System Activities" task. Once the trace starts collecting, perform the animation or interaction you care about. Then press "Stop recording".

**2. Reading the trace**: After opening the trace in Android Studio or Perfetto, you should see something like a trace visualization. Enable VSync highlighting to see the 16ms frame boundaries. Use the WASD keys to strafe and zoom.

**3. Find your process**: Scroll until you see (part of) the name of your package. On the left side, you'll see a set of threads which correspond to the timeline rows on the right. Key threads: UI Thread, JS Thread (mqt_js), Native Modules Thread (mqt_native_modules), and Render Thread (Android 5+).

### Identifying a culprit
A smooth animation should look like each change in color is a frame with no thread working close to the frame boundary. If you notice chop, the JS thread may be executing almost all the time across frame boundaries (problem lies in JS), or the UI and render threads have work crossing frame boundaries (problem lies in the native views being rendered).

### Resolving JavaScript issues
If you identified a JS problem, look for clues in the specific JS that you're executing. Look into `shouldComponentUpdate`.

### Resolving native UI Issues
- **Too much GPU work**: Long amount of time spent in `DrawFrame` that crosses frame boundaries. Mitigate by using `renderToHardwareTextureAndroid` for complex, static content being animated and ensure you are not using `needsOffscreenAlphaCompositing`.
- **Creating new views on the UI thread**: JS thread thinks, then native modules thread does work, followed by expensive traversal on UI thread. Mitigate by postponing creating new UI until after the interaction or simplifying the UI.
- **Finding native CPU hotspots**: Use the CPU hotspot profiler in Android Studio Profiler.

---

## JavaScript Environment
Source: https://reactnative.dev/docs/javascript-environment

### JavaScript Runtime
When using React Native, you're going to be running your JavaScript code in up to three environments:
- In most cases, React Native will use Hermes, an open-source JavaScript engine optimized for React Native.
- If Hermes is disabled, React Native will use JavaScriptCore, the JavaScript engine that powers Safari. Note that on iOS, JavaScriptCore does not use JIT due to the absence of writable executable memory in iOS apps.
- When using Chrome debugging, all JavaScript code runs within Chrome itself, communicating with native code via WebSockets. Chrome uses V8 as its JavaScript engine.

While these environments are very similar, you may end up hitting some inconsistencies. It is best to avoid relying on specifics of any runtime.

### JavaScript Syntax Transformers
React Native ships with the Babel JavaScript compiler. A full list of React Native's enabled transformations can be found in @react-native/babel-preset. Supported transformations include: ECMAScript 5 (Reserved Words), ES6 (Arrow functions, Block scoping, Call spread, Classes, Computed Properties, Constants, Destructuring, for...of, Function Name, Literals, Modules, Object Concise Method, Object Short Notation, Parameters, Rest Params, Shorthand Properties, Sticky Regex, Template Literals, Unicode Regex), ES7 (Exponentiation Operator), ES8 (Async Functions, Function Trailing Comma), ES9 (Object Spread), ES10 (Optional Catch Binding), ES11 (Dynamic Imports, Nullish Coalescing Operator, Optional Chaining), ES13 (Class Fields), Stage 1 Proposal (Export Default From), and Miscellaneous (Babel Template, Flow, ESM to CJS, JSX, Object Assign, React Display Name, TypeScript).

### Polyfills
Many standard functions are also available on all the supported JavaScript runtimes:
- **Browser**: CommonJS `require`, `console.{log,warn,error,info,debug,trace,table,group,groupCollapsed,groupEnd}`, `XMLHttpRequest`, `fetch`, `{set,clear}{Timeout,Interval,Immediate}`, `{request,cancel}AnimationFrame`
- **ES6**: `Array.from`, `Array.prototype.{find,findIndex}`, `Object.assign`, `String.prototype.{startsWith,endsWith,repeat,includes}`
- **ES7**: `Array.prototype.includes`
- **ES8**: `Object.{entries,values}`
- **Specific**: `__DEV__`

---

## Timers
Source: https://reactnative.dev/docs/timers

Timers are an important part of an application and React Native implements the browser timers.

### Timers
- `setTimeout` and `clearTimeout`
- `setInterval` and `clearInterval`
- `setImmediate` and `clearImmediate`
- `requestAnimationFrame` and `cancelAnimationFrame`

`requestAnimationFrame(fn)` is not the same as `setTimeout(fn, 0)` - the former will fire after all the frames have flushed, whereas the latter will fire as quickly as possible (over 1000x per second on an iPhone 5S).

`setImmediate` is executed at the end of the current JavaScript execution block, right before sending the batched response back to native. Note that if you call `setImmediate` within a `setImmediate` callback, it will be executed right away, it won't yield back to native in between.

The `Promise` implementation uses `setImmediate` as its asynchronicity implementation.

> When debugging on Android, if the times between the debugger and device have drifted; things such as animation, event behavior, etc., might not work properly or the results may not be accurate. Please correct this by running `adb shell "date \`date +%m%d%H%M%Y.%S%3N\`"` on your debugger machine.

### InteractionManager
**Deprecated**: The `InteractionManager` behavior has been changed to be the same as `setImmediate`, which should be used instead.

Applications can schedule tasks to run after interactions with:
```typescript
InteractionManager.runAfterInteractions(() => {
  // ...long-running synchronous task...
});
```

Compare this to other scheduling alternatives:
- requestAnimationFrame(): for code that animates a view over time.
- setImmediate/setTimeout/setInterval(): run code later, note this may delay animations.
- runAfterInteractions(): run code later, without delaying active animations.

`InteractionManager` also allows applications to register animations by creating an interaction 'handle' on animation start, and clearing it upon completion:
```typescript
const handle = InteractionManager.createInteractionHandle();
// run animation...
InteractionManager.clearInteractionHandle(handle);
// queued tasks run if all handles were cleared
```

---

## Using Hermes
Source: https://reactnative.dev/docs/hermes

Hermes is an open-source JavaScript engine optimized for React Native. For many apps, using Hermes will result in improved start-up time, decreased memory usage, and smaller app size when compared to JavaScriptCore. Hermes is used by default by React Native and no additional configuration is required to enable it.

### Bundled Hermes
React Native comes with a **bundled version** of Hermes. We are building a version of Hermes for you whenever we release a new version of React Native. This will make sure you're consuming a version of Hermes which is fully compatible with the version of React Native you're using. This change is fully transparent to users of React Native.

### Confirming Hermes is in use
A `HermesInternal` global variable will be available in JavaScript that can be used to verify that Hermes is in use:
```jsx
const isHermes = () => !!global.HermesInternal;
```

> If you are using a non-standard way of loading the JS bundle, it is possible that the `HermesInternal` variable is available but you aren't using the highly optimised pre-compiled bytecode.

To see the benefits of Hermes, try making a release build/deployment of your app to compare. For example:
- Android: `npm run android -- --mode="release"` or `yarn android --mode release`
- iOS: `npm run ios -- --mode="Release"` or `yarn ios --mode Release`

This will compile JavaScript to Hermes Bytecode during build time which will improve your app's startup speed on device.

### Switching back to JavaScriptCore
React Native also supports using JavaScriptCore as the JavaScript engine. Follow the instructions from the community repository to opt-out of Hermes.

---

## What is Codegen?
Source: https://reactnative.dev/docs/the-new-architecture/what-is-codegen

**Codegen** is a tool to avoid writing a lot of repetitive code. Using Codegen **is not mandatory**: you can write all the generated code manually. However, Codegen generates scaffolding code that could save you a lot of time.

React Native invokes Codegen automatically every time an iOS or Android app is built. Occasionally, you would like to manually run the Codegen scripts to know which types and files are actually generated: this is a common scenario when developing Turbo Native Modules and Fabric Native Components.

### How Codegen Works
**Codegen** is a process that is tightly coupled with a React Native app. The Codegen scripts live inside the `react-native` NPM package and the apps call those scripts at build time.

Codegen crawls the folders in your project, starting from a directory you specify in your `package.json`, looking for some specific JS files that contain the specification (or specs) for your custom modules and components. Spec files are JS files written in a typed dialect: React Native currently supports Flow and TypeScript.

Every time Codegen finds a spec file, it generates boilerplate code associated with it. Codegen generates some C++ glue-code and then it generates platform-specific code, using Java for Android and Objective-C++ for iOS.

---

## Using Codegen
Source: https://reactnative.dev/docs/the-new-architecture/using-codegen

This guide teaches how to: Configure **Codegen**, invoke it manually for each platform, and describes the generated code.

### Prerequisites
You always need a React Native app to generate the code properly, even when invoking the **Codegen** manually. The **Codegen** process is tightly coupled with the build of the app, and the scripts are located in the `react-native` NPM package.

### Configuring Codegen
**Codegen** can be configured in your app by modifying the `package.json` file. **Codegen** is controlled by a custom field called `codegenConfig`:
```json
"codegenConfig": {
  "name": "<SpecName>",
  "type": "<types>",
  "jsSrcsDir": "<source_dir>",
  "android": {
    "javaPackageName": "<java.package.name>"
  },
  "ios": {
    "modules": { ... },
    "components": { ... }
  }
}
```

When **Codegen** runs, it searches among all the dependencies of the app, looking for JS files that respect specific conventions:
- Turbo Native Modules require that the spec files are prefixed with `Native`. For example, `NativeLocalStorage.ts`.
- Native Fabric Components require that the spec files are suffixed with `NativeComponent`. For example, `WebViewNativeComponent.ts`.

### Running Codegen for Android
**Codegen** for Android is integrated with the React Native Gradle Plugin (RNGP). To run the gradle task:
```
./gradlew generateCodegenArtifactsFromSchema
```

This generates code in the corresponding build folders. The generated code is split in two folders: `java` (platform specific code) and `jni` (C++ code required to let JS and Java interact correctly).

### Running Codegen for iOS
**Codegen** for iOS relies on Node scripts. The main script is the `generate-codegen-artifacts.js` script:
```
node node_modules/react-native/scripts/generate-codegen-artifacts.js \
    --path . \
    --outputPath ios/ \
    --targetPlatform ios
```

This generates files in the `ios/build` folder with the interfaces and glue code for your custom iOS Turbo Native Modules and components.

---

## The Codegen CLI
Source: https://reactnative.dev/docs/the-new-architecture/codegen-cli

To simplify running Codegen, a CLI tool is available:
```
npx @react-native-community/cli codegen --help
Usage: rnc-cli codegen [options]
Options:
  --verbose            Increase logging verbosity
  --path <path>        Path to the React Native project root.
  --platform <string>  Target platform. Supported values: "android", "ios", "all".
  --outputPath <path>  Path where generated artifacts will be output to.
```

### Examples
- Read `package.json` from the current working directory, generate code based on its codegenConfig: `npx @react-native-community/cli codegen`
- Read `package.json` from the current working directory, generate iOS code: `npx @react-native-community/cli codegen --platform ios`
- Read `package.json` from `third-party/some-library`, generate Android code: `npx @react-native-community/cli codegen --path third-party/some-library --platform android --outputPath third-party/some-library/android/generated`

### Including Generated Code into Libraries
The Codegen CLI is a great tool for library developers. Codegen also offers a mechanism to include the generated code in the library itself via the `includesGeneratedCode` property in `codegenConfig`. Including the generated code comes with several benefits such as: no need to rely on the app to run Codegen, implementation files always consistent, backwards compatibility, and ability to ship native part as prebuild. However, the generated code will use the React Native version defined inside your library.

---

## Native Platform
Source: https://reactnative.dev/docs/native-platform

Your application may need access to platform features that aren't directly available from react-native or one of the hundreds of third-party libraries maintained by the community. React Native exposes a powerful set of API to connect your native code to your JavaScript application code.

This guide introduces:
- **Native Modules**: native libraries that have no User Interface (UI) for the user. Examples would be persistent storage, notifications, network events.
- **Native Component**: native platform views, widgets and controllers that are available to your application's JavaScript code through React Components.

> You might have previously been familiar with Legacy Native Modules and Legacy Native Components. These are our deprecated native module and component API. You can still use many of these legacy libraries with the New Architecture thanks to our interop layers.

1. Native Modules
   - Android & iOS
   - Cross-Platform with C++
   - Advanced: Custom C++ Types
2. Fabric Native Components
   - Android & iOS

---

## Native Modules: Introduction (Android and iOS)
Source: https://reactnative.dev/docs/turbo-native-modules-introduction

Your React Native application code may need to interact with native platform APIs that aren't provided by React Native or an existing library. You can write the integration code yourself using a **Turbo Native Module**.

The basic steps are:
1. **define a typed JavaScript specification** using Flow or TypeScript;
2. **configure your dependency management system to run Codegen**, which converts the specification into native language interfaces;
3. **write your application code** using your specification;
4. **write your native platform code using the generated interfaces**.

### Native Persistent Storage
The guide shows how to write an implementation of the Web Storage API: `localStorage`. On Android: SharedPreferences. On iOS: NSUserDefaults.

**1. Declare Typed Specification**: Create a `specs/NativeLocalStorage.ts` file with a Spec interface extending TurboModule and methods: `setItem`, `getItem`, `removeItem`, `clear`. Register with `TurboModuleRegistry.getEnforcing<Spec>('NativeLocalStorage')`.

**2. Configure Codegen**: Update `package.json` with `codegenConfig`:
```json
"codegenConfig": {
  "name": "NativeLocalStorageSpec",
  "type": "modules",
  "jsSrcsDir": "specs",
  "android": { "javaPackageName": "com.nativelocalstorage" }
}
```
Run `./gradlew generateCodegenArtifactsFromSchema` for Android, or `bundle exec pod install` for iOS.

**3. Write Application Code**: Use `NativeLocalStorage.getItem('myKey')`, `setItem`, `removeItem`, `clear` in your React components.

**4. Write Native Platform Code**:
- **Android**: Implement `NativeLocalStorageSpec` (generated), create `NativeLocalStoragePackage` extending `BaseReactPackage`, register in `MainApplication`.
- **iOS**: Create `RCTNativeLocalStorage` implementing `NativeLocalStorageSpec`, implement the methods using `NSUserDefaults`, update `package.json` with iOS modules provider config.

---

## Cross-Platform Native Modules (C++)
Source: https://reactnative.dev/docs/the-new-architecture/pure-cxx-modules

Writing a module in C++ is the best way to share platform-agnostic code between Android and iOS. With pure C++ modules, you can write your logic only once and reuse it right away from all the platforms.

**1. Create the JS specs**: Create a `specs/NativeSampleModule.ts` with the method `reverseString(input: string): string`.

**2. Configure Codegen**: Update `package.json`:
```json
"codegenConfig": {
  "name": "AppSpecs",
  "type": "modules",
  "jsSrcsDir": "specs",
  "android": { "javaPackageName": "com.sampleapp.specs" }
}
```

**3. Write the Native Code**: Create a `shared` folder with `NativeSampleModule.h` and `NativeSampleModule.cpp`. The class extends `NativeSampleModuleCxxSpec<NativeSampleModule>` and lives in the `facebook::react` namespace.

**4. Register the Module**:
- **Android**: Create a `CMakeLists.txt` in `android/app/src/main/jni/`, modify `build.gradle` to include externalNativeBuild with cmake, create an `OnLoad.cpp` that registers the C++ Turbo Native Module.
- **iOS**: Install pods, add `shared` folder to Xcode project, create a `NativeSampleModuleProvider` (Objective-C++ that conforms to `RCTModuleProvider`), update `package.json` with iOS modules provider config.

**5. Testing**: Import the Turbo Native Module in your React components and call `SampleTurboModule.reverseString(value)`.

---

## Advanced Topics on Native Modules Development
Source: https://reactnative.dev/docs/the-new-architecture/advanced-topics-modules

This document contains a set of advanced topics to implement more complex functionalities of Native Modules. It is recommended to first read the Codegen section and the guides on Native Modules.

This guide covers the following topics:
- Add custom C++ types to your C++ modules
- Use Swift in your Module
- Emit custom events from your Native Modules
- Native Modules Lifecycle

---

## Advanced: Custom C++ Types
Source: https://reactnative.dev/docs/the-new-architecture/custom-cxx-types

This guide assumes familiarity with the Pure C++ Turbo Native Modules guide.

C++ Turbo Native Modules support bridging functionality for most `std::` standard types. To add support for new and custom types, you need to provide the necessary `bridging` header file.

### Adding a New Custom: Int64
C++ Turbo Native Modules don't support `int64_t` numbers yet because JavaScript doesn't support numbers greater than 2^53. To represent numbers greater than 2^53, we can use a `string` type in JS and automatically convert it to `int64_t` in C++.

**1. Create the Bridging Header file** (`shared/Int64.h`):
```cpp
template <>
struct Bridging<int64_t> {
  static int64_t fromJs(jsi::Runtime &rt, const jsi::String &value) { ... }
  static jsi::String toJs(jsi::Runtime &rt, int64_t value) { ... }
};
```

**2. Modify the JS Spec** to add methods using the new type.

**3. Implement the Native Code**: Include the bridging header, declare and implement functions using the new type.

### Adding a New Structured Custom Type: Address
For structured types, React Native provides helper functions to bridge them from JS to C++ and vice versa.

**1. Define the type in the specs**: Define an `Address` type with properties (street, num, isInUS) and functions that use it.

**2. Define the bridging code**: Codegen generates `NativeSampleModuleAddress` and `NativeSampleModuleAddressBridging`. Extend the `Bridging` struct with the generated bridging type.

**3. Implement the Native Code**: Use `jsi::Object` accessors like `getProperty()`, `asString()`, `utf8()`, `asNumber()`.

---

## Create a Library for Your Module
Source: https://reactnative.dev/docs/the-new-architecture/create-module-library

Sometimes, you might be working on a module that is worth extracting in a separate library for code reuse.

### Extract the Module into a Library
Use the `create-react-native-library` tool:
```
npx create-react-native-library@latest <Name of Your Library>
```
Select "Turbo module" as the library type, choose platform access or shared C++ library, and select "Test App" option.

The tool creates a folder with: `android`, `cpp`, `ios`, `src` folders, and a `package.json` already configured with Codegen.

**Copy the Code**: Move spec files to `src`, update `index.ts`, copy native module code to the appropriate platform folders, update references from the old spec name to the new one.

### Testing your Library
Navigate to the `example` folder, run `yarn install`, install CocoaPods for iOS, then `yarn android` or `yarn ios`.

### Use your library as a Local Module
Add the library with `yarn add ../Library`, update `metro.config.js` with `watchFolders` and `resolver.extraNodeModules`.

### Publish the Library on NPM
Run `yarn install`, `yarn prepare`, `yarn release`. Verify with `npm view <package.name>`.

---

## Fabric Native Components Introduction
Source: https://reactnative.dev/docs/fabric-native-components-introduction

If you want to build *new* React Native Components that wrap around a Host Component like a unique kind of CheckBox on Android, or a UIButton on iOS, you should use a Fabric Native Component.

Steps:
1. Define a JavaScript specification using Flow or TypeScript.
2. Configure the dependencies management system to generate code.
3. Implement the Native code.
4. Use the Component in an App.

### Creating a WebView Component
A guide for creating a Web View component using Android's `WebView` and iOS's `WKWebView`.

**1. Define Specification**: Create `WebViewNativeComponent.ts` with `sourceURL` prop, `onScriptLoaded` event, and `codegenNativeComponent('CustomWebView')`.

**2. Configure Codegen**: Update `package.json` with codegenConfig:
```json
"codegenConfig": {
  "name": "AppSpec",
  "type": "components",
  "jsSrcsDir": "specs",
  "android": { "javaPackageName": "com.webview" },
  "ios": { "componentProvider": { "CustomWebView": "RCTWebView" } }
}
```

**3. Building Native Code**:
- **Android**: Create `ReactWebView` (extends WebView), `ReactWebViewManager` (extends SimpleViewManager, implements generated interface), `ReactWebViewPackage` (extends BaseReactPackage). Register package in MainApplication.
- **iOS**: Create `RCTWebView` (extends `RCTViewComponentView`), implement `updateProps`, `layoutSubviews`, event emitter, and `componentDescriptorProvider`. Add WebKit framework linkage.

**4. Use Component**: Import and use the WebView component in your React app.

---

## Advanced Topics on Native Components
Source: https://reactnative.dev/docs/the-new-architecture/advanced-topics-components

This document contains a set of advanced topics to implement more complex functionalities of Native Components. It is recommended to first read the Codegen section and the guides on Native Components.

This guide covers:
- Direct Manipulation
- Measuring the Layout
- Invoking native functions on your native component

---

## Appendix
Source: https://reactnative.dev/docs/appendix

### I. Terminology
- **Spec** - TypeScript or Flow code that describes the API for a Turbo Native Module or Fabric Native component.
- **Native Modules** - Native libraries that have no UI for the user.
- **Native Component** - Native platform views available through React Components.
- **Legacy Native Components** - Components running on the old architecture.
- **Legacy Native Modules** - Modules running on the old architecture.

### II. Codegen Typings

| Flow | TypeScript | Android (Java) | iOS (ObjC) |
|------|-----------|----------------|------------|
| `string` | `string` | `string` | `NSString` |
| `boolean` | `boolean` | `Boolean` | `NSNumber` |
| Object Literal | `{ foo: string, ... }` | - | - |
| `Object` | `Object` | `ReadableMap` | `@` (untyped dictionary) |
| `Array<T>` | `Array<T>` | `ReadableArray` | `NSArray` |
| `Function` | `Function` | - | - |
| `Promise<T>` | `Promise<T>` | `com.facebook.react.bridge.Promise` | `RCTPromiseResolveBlock`/`RCTPromiseRejectBlock` |
| Type Unions | Type Unions | Only as callbacks | - |
| Callbacks | Callbacks | `com.facebook.react.bridge.Callback` | `RCTResponseSenderBlock` |
| `number` | `number` | `double` | `NSNumber` |

---

## Headless JS
Source: https://reactnative.dev/docs/headless-js-android

Headless JS is a way to run tasks in JavaScript while your app is in the background. It can be used, for example, to sync fresh data, handle push notifications, or play music.

### The JS API
A task is an async function that you register on `AppRegistry`:
```tsx
import {AppRegistry} from 'react-native';
AppRegistry.registerHeadlessTask('SomeTaskName', () => require('SomeTaskName'));
```

Then, in `SomeTaskName.js`:
```tsx
module.exports = async taskData => {
  // do stuff
};
```

### The Platform API
You need to extend `HeadlessJsTaskService` and override `getTaskConfig`:
- Java/Kotlin: Create a service extending `HeadlessJsTaskService`, implement `getTaskConfig` returning a `HeadlessJsTaskConfig` with task name, arguments, timeout, and foreground options.

Then add the service to your `AndroidManifest.xml`. Now, whenever you start your service (e.g. as a periodic task or in response to some system event), JS will spin up, run your task, then spin down.

### Retries
By default, the headless JS task will not perform any retries. To enable retries, create a `HeadlessJsRetryPolicy` and throw a specific `HeadlessJsTaskError`.

### Caveats
- By default, your app will crash if you try to run a task while the app is in the foreground.
- If you start your service from a `BroadcastReceiver`, make sure to call `HeadlessJsTaskService.acquireWakeLockNow()` before returning from `onReceive()`.

---

## Publishing to Google Play Store
Source: https://reactnative.dev/docs/signed-apk-android

Android requires that all apps be digitally signed with a certificate before they can be installed.

### Generating an upload key
```
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### Setting up Gradle variables
Place the keystore file under `android/app/`, edit `~/.gradle/gradle.properties` or `android/gradle.properties`:
```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

### Adding signing config to Gradle
Edit `android/app/build.gradle` to add `signingConfigs { release { ... } }` and reference it in `buildTypes.release`.

### Generating the release AAB
```
npx react-native build-android --mode=release
```
The generated AAB can be found under `android/app/build/outputs/bundle/release/app-release.aab`.

### Enabling Proguard (optional)
Set `def enableProguardInReleaseBuilds = true` in `android/app/build.gradle`.

---

## Communication between native and React Native (Android)
Source: https://reactnative.dev/docs/communication-android

### Introduction
React Native is inspired by React, so the basic idea of the information flow is similar. The flow in React is one-directional, using properties. When we mix React Native and native components, we need specific cross-language mechanisms.

### Properties
- **Passing properties from native to React Native**: Provide a custom implementation of `ReactActivityDelegate` overriding `getLaunchOptions` to return a `Bundle` with desired properties. `ReactRootView` also provides `appProperties` read-write property.
- **Passing properties from React Native to native**: Properties reflected in JavaScript needs to be exposed as setter method annotated with `@ReactProp`.
- **Limits of properties**: They do not support callbacks for bottom-up data bindings.

### Other ways of cross-language interaction
- **Calling React Native functions from native (events)**: Events are sent from anywhere using event emitters. Events share namespace, so name collisions may occur.
- **Calling native functions from React Native (native modules)**: Native modules are Java/Kotlin classes available in JS that can export arbitrary functions and constants.

---

## React Native Gradle Plugin
Source: https://reactnative.dev/docs/react-native-gradle-plugin

### Using the plugin
The React Native Gradle Plugin is distributed as a separate NPM package installed automatically with `react-native`. It is already configured for new projects.

### Configuring the plugin
Modify the `react` block in `android/app/build.gradle`:
```groovy
apply plugin: "com.facebook.react"
react {
  // Custom configuration goes here
}
```

Configuration keys include: `root`, `reactNativeDir`, `codegenDir`, `cliFile`, `debuggableVariants` (list of variants that are debuggable), `nodeExecutableAndArgs`, `bundleCommand`, `bundleConfig`, `bundleAssetName`, `entryFile`, `extraPackagerArgs`, `hermesCommand`, `hermesFlags`, `enableBundleCompression`.

### Using Flavors & Build Variants
If you're using custom variants beyond `debug` and `release`, instruct the plugin specifying which variants are debuggable using `debuggableVariants`.

### Under the hood
The plugin is responsible for: adding bundle tasks, setting up proper versions of dependencies, setting up Maven repositories, setting up NDK for New Architecture, setting up buildConfigFields, setting up Metro DevServer Port, and invoking Codegen.

---

## Linking Libraries (iOS)
Source: https://reactnative.dev/docs/linking-libraries-ios

Not every app uses all the native capabilities. We exposed many features as independent static libraries.

### Automatic linking
Install a library with native dependencies: `npm install <library-with-native-dependencies> --save`. Next time you build, the native code will be linked thanks to autolinking.

### Manual linking
1. Drag the library's `.xcodeproj` file to your project on Xcode (under Libraries group).
2. Click on your main project file, select `Build Phases`, drag the static library from `Products` folder to `Link Binary With Libraries`.
3. If you need to know the library's contents at compile time, go to `Build Settings`, search for `Header Search Paths`, and include the path to your library.

---

## Running On Simulator (iOS)
Source: https://reactnative.dev/docs/running-on-simulator-ios

### Starting the simulator
```
npm run ios
```
or
```
yarn ios
```

### Specifying a device
```
npm run ios -- --simulator="iPhone SE (3rd generation)"
```
or with `yarn ios --simulator "iPhone SE (3rd generation)"`.

The device names correspond to the list of devices available in Xcode. Check available devices with `xcrun simctl list devices`.

### Specifying a version of device
If you have multiple iOS versions installed, specify its version:
```
npm run ios -- --simulator="iPhone 14 Pro (16.0)"
```

### Specifying an UDID
```
npm run ios -- --udid="AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

---

## Communication between native and React Native (iOS)
Source: https://reactnative.dev/docs/communication-ios

### Introduction
Same one-directional flow concept as React. When mixing native and React Native components, we need cross-language mechanisms.

### Properties
- **Passing properties from native to React Native**: Use `RCTRootView` with `initialProperties` parameter (NSDictionary). `RCTRootView` also has read-write `appProperties` property.
- **Passing properties from React Native to native**: Export properties with `RCT_CUSTOM_VIEW_PROPERTY` macro.
- **Limits of properties**: No support for callbacks.

### Other ways of cross-language interaction
- **Calling React Native functions from native (events)**: Events allow changing React Native components without a reference to them. Common pattern: make native component's RCTViewManager a delegate for the views, sending events back via the bridge.
- **Calling native functions from React Native (native modules)**: Objective-C classes available in JS. Typically one instance per JS bridge.

### Layout computation flow
- **Layout of a native component embedded in React Native**: Since all native react views are subclasses of `UIView`, most style and size attributes work out of the box.
- **Layout of a React Native component embedded in native**:
  - **Fixed size**: Set `RCTRootView`'s frame explicitly.
  - **Flexible size**: Use `RCTRootView` flexibility modes (`RCTRootViewSizeFlexibilityNone`, `RCTRootViewSizeFlexibilityWidth`, `RCTRootViewSizeFlexibilityHeight`, `RCTRootViewSizeFlexibilityWidthAndHeight`). Delegate method `rootViewDidChangeIntrinsicSize:` is called when content size changes.

---

## App Extensions
Source: https://reactnative.dev/docs/app-extensions

App extensions let you provide custom functionality and content outside of your main app on iOS.

### Memory use in extensions
Extensions have small memory usage limits. Always test on an actual device.

- **Today widget**: Memory limit of 16 MB. Today widget implementations using React Native may work unreliably because the memory usage tends to be too high. Always test in a real device. Use Xcode's Instruments to analyze real world memory usage.
- **Other app extensions**: Custom Keyboard extensions are limited to 48 MB, Share extensions are limited to 120 MB.

---

## Publishing to Apple App Store
Source: https://reactnative.dev/docs/publishing-to-app-store

### 1. Configure release scheme
Set Build Configuration to `Release` in Product → Scheme → Edit Scheme.

**Pro Tip**: Turn off bundle generation in Debug by adding to the Xcode Build Phase shell script:
```
if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
fi
```

### 2. Build app for release
Build with Cmd+B or `npm run ios -- --mode="Release"`. To publish, archive in Xcode (Product → Archive), then distribute to App Store Connect via TestFlight.

### 3. Screenshots
Apple Store requires screenshots for the latest devices.

---

## Legacy: Native Modules Intro
Source: https://reactnative.dev/docs/legacy/native-modules-intro

> Native Module and Native Components are our stable technologies used by the legacy architecture. They will be deprecated in the future when the New Architecture will be stable.

Sometimes a React Native app needs to access a native platform API that is not available by default in JavaScript. The NativeModule system exposes instances of Java/Objective-C/C++ (native) classes to JavaScript as JS objects.

### Native Module Setup
There are different ways to write a native module:
1. Creating a local library
2. Directly within your React Native application's iOS/Android projects
3. As an NPM package

---

## Legacy: Android Native Modules
Source: https://reactnative.dev/docs/legacy/native-modules-android

### Create a Calendar Native Module
Guide for creating a `CalendarModule` that accesses Android's calendar APIs.

**Setup**: Open the Android project in Android Studio.

**Create Module File**: `CalendarModule.java` (or `.kt`) extending `ReactContextBaseJavaModule`.

**Module Name**: Override `getName()` returning `"CalendarModule"`. Accessible in JS as `NativeModules.CalendarModule`.

**Export Methods**: Annotate with `@ReactMethod`. Supported argument types: `Boolean`, `Double`, `String`, `Callback`, `Promise`, `ReadableMap`, `ReadableArray`.

**Register the Module**: Create a `ReactPackage` implementation, add `CalendarModule` to `createNativeModules()`, register in `MainApplication.getPackages()`.

### Beyond a Calendar Native Module

- **Better Export**: Create a JavaScript wrapper file.
- **Constants**: Override `getConstants()` returning a Map.
- **Callbacks**: Use `Callback` interface. One callback can only be invoked once.
- **Promises**: Use `Promise` as last parameter. Supports `resolve` and `reject`.
- **Sending Events**: Use `RCTDeviceEventEmitter` with `emit`.
- **Activity Result**: Extend `BaseActivityEventListener`, register with `addActivityEventListener`. Listen for `onActivityResult`.
- **Lifecycle Events**: Implement `LifecycleEventListener`, register with `addLifecycleEventListener`.

---

## Legacy: iOS Native Modules
Source: https://reactnative.dev/docs/legacy/native-modules-ios

### Create a Calendar Native Module
**Setup**: Open iOS project in Xcode.

**Create Files**: `RCTCalendarModule.h` (implements `RCTBridgeModule` protocol) and `RCTCalendarModule.m` (with `RCT_EXPORT_MODULE()` macro).

**Module Name**: By default, the JavaScript module name will match the Objective-C class name with "RCT" prefix removed.

**Export Methods**: Use `RCT_EXPORT_METHOD` macro. Methods are asynchronous, return type is always void.

**Synchronous Methods**: Use `RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD`. Only for object type return values serializable to JSON.

### Beyond a Calendar Native Module
- **Better Export**: Create a JavaScript wrapper file.
- **Constants**: Override `constantsToExport()`. Also implement `+ requiresMainQueueSetup`.
- **Callbacks**: Use `RCTResponseSenderBlock`. Only one callback can be invoked once.
- **Promises**: Use `RCTPromiseResolveBlock` and `RCTPromiseRejectBlock`.
- **Sending Events**: Subclass `RCTEventEmitter`, override `supportedEvents`, call `sendEventWithName:body:`.
- **Threading**: Override `methodQueue` to provide a custom dispatch queue, or use `dispatch_async` inside methods.
- **Dependency Injection**: Create a class implementing `RCTBridgeDelegate` protocol.
- **Exporting Swift**: Use `@objc` modifiers, create a private implementation file with `RCT_EXTERN_MODULE` and `RCT_EXTERN_METHOD`.

---

## Legacy: Native Modules NPM Package Setup
Source: https://reactnative.dev/docs/legacy/native-modules-setup

Native modules are usually distributed as npm packages, including native code per platform.

To set up the basic project structure:
```
npx create-react-native-library@latest react-native-awesome-module
```

After creating:
```
cd react-native-awesome-module
yarn
```

Start the example app:
```
yarn example android
# or
yarn example ios
```

---

## Legacy: Local libraries setup
Source: https://reactnative.dev/docs/legacy/local-library-setup

A local library is a library containing views or modules that's local to your app and not published to a registry. The local library is created outside of the `android/` and `ios/` folders and makes use of autolinking.

Structure:
```
MyApp
├── node_modules
├── modules
│   └── awesome-module
├── android
├── ios
├── src
├── index.js
└── package.json
```

Create a local library:
```
npx create-react-native-library@latest awesome-module
```

This creates a `modules` folder with the new module. The library is automatically linked using `link:` protocol (Yarn) or `file:` (npm). To use it, import by its name:
```javascript
import {multiply} from 'awesome-module';
```

---

## Legacy: Android Native UI Components
Source: https://reactnative.dev/docs/legacy/native-components-android

There are tons of native UI widgets out there. We can wrap up these existing components for seamless integration with your React Native application.

### ImageView example
Steps to create a native ImageView component:

**1. Create ViewManager subclass**: Extend `SimpleViewManager<ReactImageView>`. Override `getName()` returning `"RCTImageView"`.

**2. Implement `createViewInstance`**: Create and return the custom native view.

**3. Expose view property setters using `@ReactProp`**: Annotate setter methods with `@ReactProp(name = "src")`, etc. Supported types: `boolean`, `int`, `float`, `double`, `String`, `Boolean`, `Integer`, `ReadableArray`, `ReadableMap`.

**4. Register the ViewManager**: Add to `createViewManagers` in the application's package.

**5. Implement the JavaScript module**: Use `requireNativeComponent('RCTImageView')`.

### Events
When a native event occurs, use `RCTEventEmitter` to issue an event to JavaScript. Map the native event name to a JS callback prop by overriding `getExportedCustomBubblingEventTypeConstants`.

### Integration with an Android Fragment example
Steps for using Android Fragments to have more granular control over native components:
1. Create a custom `View` class
2. Create a `Fragment` class
3. Create a `ViewManager` subclass that uses the Fragment
4. Register the ViewManager
5. Register the Package
6. Implement the JavaScript module using `requireNativeComponent` and `UIManager.dispatchViewManagerCommand`

---

## Core Components and APIs
Source: https://reactnative.dev/docs/components-and-apis

React Native provides a number of built-in Core Components ready for you to use in your app. You can find them all in the left sidebar (or menu above, if you are on a narrow screen). If you're not sure where to get started, take a look at the following categories:

- Basic Components
- User Interface
- List Views
- Android-specific
- iOS-specific
- Others

You're not limited to the components and APIs bundled with React Native. React Native has a community of thousands of developers. If you're looking for a library that does something specific, please refer to this guide about finding libraries.

## Basic Components

Most apps will end up using one or more of these basic components.

**View** - The most fundamental component for building a UI.

**Text** - A component for displaying text.

**Image** - A component for displaying images.

**TextInput** - A component for inputting text into the app via a keyboard.

**Pressable** - A wrapper component that can detect various stages of press interactions on any of its children.

**ScrollView** - Provides a scrolling container that can host multiple components and views.

**StyleSheet** - Provides an abstraction layer similar to CSS stylesheets.

## User Interface

These common user interface controls will render on any platform.

**Button** - A basic button component for handling touches that should render nicely on any platform.

**Switch** - Renders a boolean input.

## List Views

Unlike the more generic ScrollView, the following list view components only render elements that are currently showing on the screen. This makes them a performant choice for displaying long lists of data.

**FlatList** - A component for rendering performant scrollable lists.

**SectionList** - Like FlatList, but for sectioned lists.

## Android Components and APIs

**BackHandler** - Detect hardware button presses for back navigation.

**DrawerLayoutAndroid** - Renders a DrawerLayout on Android.

**PermissionsAndroid** - Provides access to the permissions model introduced in Android M.

**ToastAndroid** - Create an Android Toast alert.

## iOS Components and APIs

**ActionSheetIOS** - API to display an iOS action sheet or share sheet.

## Others

**ActivityIndicator** - Displays a circular loading indicator.

**Alert** - Launches an alert dialog with the specified title and message.

**Animated** - A library for creating fluid, powerful animations that are easy to build and maintain.

**Dimensions** - Provides an interface for getting device dimensions.

**KeyboardAvoidingView** - Provides a view that moves out of the way of the virtual keyboard automatically.

**Linking** - Provides a general interface to interact with both incoming and outgoing app links.

**Modal** - Provides a simple way to present content above an enclosing view.

**PixelRatio** - Provides access to the device pixel density.

**RefreshControl** - This component is used inside a ScrollView to add pull to refresh functionality.

**StatusBar** - Component to control the app status bar.

---

## ActivityIndicator
Source: https://reactnative.dev/docs/activityindicator

Displays a circular loading indicator.

## Reference

### Props

**View Props** - Inherits View Props.

**animating** - Whether to show the indicator (true) or hide it (false).
- Type: bool, Default: `true`

**color** - The foreground color of the spinner.
- Type: color, Default: `null` (system accent default color)
  - Android: `'#999999'`
  - iOS: (null)

**hidesWhenStopped** (iOS) - Whether the indicator should hide when not animating.
- Type: bool, Default: `true`

**ref** - A ref setter that will be assigned an element node when mounted.

**size** - Size of the indicator.
- Type: enum(`'small'`, `'large'`) | number, Default: `'small'`

---

## Button
Source: https://reactnative.dev/docs/button

A basic button component that should render nicely on any platform. Supports a minimal level of customization.

If this button doesn't look right for your app, you can build your own button using Pressable.

```tsx
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

## Reference

### Props

**onPress** (Required) - Handler to be called when the user taps the button.
- Type: `({nativeEvent: PressEvent})`

**title** (Required) - Text to display inside the button. On Android the given title will be converted to the uppercased form.
- Type: string

**accessibilityLabel** - Text to display for blindness accessibility features.
- Type: string

**accessibilityLanguage** (iOS) - A value indicating which language should be used by the screen reader.

**accessibilityActions** - Accessibility actions allow an assistive technology to programmatically invoke the actions of a component.

**onAccessibilityAction** - Invoked when the user performs the accessibility actions.

**color** - Color of the text (iOS), or background color of the button (Android).
- Default: `'#2196F3'` (Android), `'#007AFF'` (iOS)

**disabled** - If true, disable all interactions for this component. Default: false.

**hasTVPreferredFocus** (TV) - TV preferred focus. Default: false.

**nextFocusDown** (Android, TV) - Designates the next view to receive focus when the user navigates down.

**nextFocusForward** (Android, TV) - Designates the next view to receive focus when the user navigates forward.

**nextFocusLeft** (Android, TV) - Designates the next view to receive focus when the user navigates left.

**nextFocusRight** (Android, TV) - Designates the next view to receive focus when the user navigates right.

**nextFocusUp** (Android, TV) - Designates the next view to receive focus when the user navigates up.

**testID** - Used to locate this view in end-to-end tests.

**touchSoundDisabled** (Android) - If true, doesn't play system sound on touch.

---

## FlatList
Source: https://reactnative.dev/docs/flatlist

A performant interface for rendering basic, flat lists, supporting the most handy features:
- Fully cross-platform.
- Optional horizontal mode.
- Configurable viewability callbacks.
- Header support.
- Footer support.
- Separator support.
- Pull to Refresh.
- Scroll loading.
- ScrollToIndex support.
- Multiple column support.

If you need section support, use `<SectionList>`.

This is a convenience wrapper around `<VirtualizedList>`, and thus inherits its props (as well as those of `<ScrollView>`) that aren't explicitly listed here, along with the following caveats:
- Internal state is not preserved when content scrolls out of the render window.
- This is a PureComponent which means that it will not re-render if props remain shallow-equal.
- Content is rendered asynchronously offscreen.
- By default, the list looks for a key prop on each item.

## Reference

### Props

**VirtualizedList Props** - Inherits VirtualizedList Props.

**renderItem** (Required)
```tsx
renderItem({ item: ItemT, index: number, separators: { highlight: () => void; unhighlight: () => void; updateProps: (select: 'leading' | 'trailing', newProps: any) => void; }}): JSX.Element;
```

**data** (Required) - An array (or array-like list) of items to render.

**ItemSeparatorComponent** - Rendered in between each item, but not at the top or bottom.

**ListEmptyComponent** - Rendered when the list is empty.

**ListFooterComponent** - Rendered at the bottom of all the items.

**ListFooterComponentStyle** - Styling for internal View for ListFooterComponent.

**ListHeaderComponent** - Rendered at the top of all the items.

**ListHeaderComponentStyle** - Styling for internal View for ListHeaderComponent.

**columnWrapperStyle** - Optional custom style for multi-item rows generated when numColumns > 1.

**extraData** - A marker property for telling the list to re-render (since it implements PureComponent).

**getItemLayout** - Optional optimization that allows skipping the measurement of dynamic content if you know the size of items ahead of time.

**horizontal** - If true, renders items next to each other horizontally instead of stacked vertically.

**initialNumToRender** - How many items to render in the initial batch. Default: 10.

**initialScrollIndex** - Instead of starting at the top with the first item, start at initialScrollIndex.

**inverted** - Reverses the direction of scroll. Uses scale transforms of -1.

**keyExtractor** - Used to extract a unique key for a given item at the specified index.

**numColumns** - Multiple columns can only be rendered with horizontal={false}.

**onRefresh** - If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality.

**onViewableItemsChanged** - Called when the viewability of rows changes.

**progressViewOffset** - Set this when offset is needed for the loading indicator to show correctly.

**refreshing** - Set this true while waiting for new data from a refresh.

**removeClippedSubviews** - When true, offscreen child views are removed from their native backing superview when offscreen.

**viewabilityConfig** - See ViewabilityHelper.js for flow type and further documentation.

**viewabilityConfigCallbackPairs** - List of ViewabilityConfig/onViewableItemsChanged pairs.

### Methods

**flashScrollIndicators()** - Displays the scroll indicators momentarily.

**getNativeScrollRef()** - Provides a reference to the underlying scroll component.

**getScrollResponder()** - Provides a handle to the underlying scroll responder.

**getScrollableNode()** - Provides a handle to the underlying scroll node.

**scrollToEnd()** - Scrolls to the end of the content.

**scrollToIndex()** - Scrolls to the item at the specified index.

**scrollToItem()** - Requires linear scan through data - use scrollToIndex instead if possible.

**scrollToOffset()** - Scroll to a specific content pixel offset in the list.

---

## Image
Source: https://reactnative.dev/docs/image

A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.

For network and data images, you will need to manually specify the dimensions of your image!

### GIF and WebP support on Android

When building your own native code, GIF and WebP are not supported by default on Android. You will need to add some optional modules in android/app/build.gradle.

## Reference

### Props

**View Props** - Inherits View Props.

**accessible** - When true, indicates the image is an accessibility element. Default: false.

**accessibilityLabel** - The text that's read by the screen reader when the user interacts with the image.

**alt** - A string that defines an alternative text description of the image.

**blurRadius** - The blur radius of the blur filter added to the image.

**capInsets** (iOS) - When the image is resized, the corners of the size specified by capInsets will stay a fixed size.

**crossOrigin** - A string of a keyword specifying the CORS mode to use when fetching the image resource.

**defaultSource** - A static image to display while loading the image source.

**fadeDuration** (Android) - Fade animation duration in milliseconds. Default: 300.

**height** - Height of the image component.

**loadingIndicatorSource** - Represents the resource used to render the loading indicator for the image.

**onError** - Invoked on load error.

**onLayout** - Invoked on mount and on layout changes.

**onLoad** - Invoked when load completes successfully.

**onLoadEnd** - Invoked when load either succeeds or fails.

**onLoadStart** - Invoked on load start.

**onPartialLoad** (iOS) - Invoked when a partial load of the image is complete.

**onProgress** - Invoked on download progress.

**progressiveRenderingEnabled** (Android) - When true, enables progressive jpeg streaming.

**referrerPolicy** - A string indicating which referrer to use when fetching the resource.

**ref** - A ref setter that will be assigned an element node when mounted.

**resizeMethod** (Android) - The mechanism that should be used to resize the image. Default: auto.

**resizeMode** - Determines how to resize the image when the frame doesn't match the raw image dimensions. Default: cover. Values: cover, contain, stretch, repeat, center.

**resizeMultiplier** (Android) - When the resizeMethod is set to resize, the destination dimensions are multiplied by this value. Default: 1.0.

**source** - The image source (either a remote URL or a local file resource).

**src** - A string representing the remote URL of the image. Has precedence over source prop.

**srcSet** - A string representing comma separated list of possible candidate image source.

**style** - Type: Image Style Props, Layout Props, Shadow Props, Transforms.

**testID** - A unique identifier for this element to be used in UI Automation testing scripts.

**tintColor** - Changes the color of all non-transparent pixels to the tintColor.

**width** - Width of the image component.

### Methods

**abortPrefetch()** (Android) - Abort prefetch request.

**getSize()** - Retrieve the width and height (in pixels) of an image prior to displaying it.

**getSizeWithHeaders()** - Retrieve the width and height (in pixels) of an image prior to displaying it with the ability to provide the headers for the request.

**prefetch()** - Prefetches a remote image for later use by downloading it to the disk cache.

**queryCache()** - Perform cache interrogation.

**resolveAssetSource()** - Resolves an asset reference into an object which has the properties uri, scale, width, and height.

### Type Definitions

**ImageCacheEnum** (iOS) - Enum which can be used to set the cache handling or strategy for the potentially cached responses.

**ImageLoadEvent** - Object returned in the onLoad callback.

**ImageSource** - Type: object, array of objects, number.

---

## ImageBackground
Source: https://reactnative.dev/docs/imagebackground

A common feature request from developers familiar with the web is background-image. To handle this use case, you can use the `<ImageBackground>` component, which has the same props as `<Image>`, and add whatever children to it you would like to layer on top of it.

Note that you must specify some width and height style attributes.

## Reference

### Props

**Image Props** - Inherits Image Props.

**imageStyle** - Type: Image Style.

**imageRef** - A ref setter that will be assigned the element node of the inner Image component when mounted.

**style** - Type: View Style.

---

## KeyboardAvoidingView
Source: https://reactnative.dev/docs/keyboardavoidingview

This component will automatically adjust its height, position, or bottom padding based on the keyboard height to remain visible while the virtual keyboard is displayed.

## Reference

### Props

**View Props** - Inherits View Props.

**behavior** - Specify how to react to the presence of the keyboard. Type: enum('height', 'position', 'padding'). Note: Android and iOS both interact with this prop differently. On both iOS and Android, setting behavior is recommended.

**contentContainerStyle** - The style of the content container (View) when behavior is 'position'. Type: View Style.

**enabled** - Enabled or disabled KeyboardAvoidingView. Default: true.

**keyboardVerticalOffset** - This is the distance between the top of the user screen and the react native view, may be non-zero in some use cases. Default: 0.

---

## Modal
Source: https://reactnative.dev/docs/modal

The Modal component is a basic way to present content above an enclosing view.

## Reference

### Props

**View Props** - Inherits View Props.

🗑️ **animated** - Deprecated. Use the animationType prop instead.

**animationType** - Controls how the modal animates. Values: slide, fade, none. Default: none.

**backdropColor** - The backdropColor of the modal (or background color of the modal's container). Defaults to white if not provided and transparent is false. Ignored if transparent is true.

**hardwareAccelerated** (Android) - Controls whether to force hardware acceleration for the underlying window. Default: false.

**navigationBarTranslucent** (Android) - Determines whether your modal should go under the system navigation bar. Default: false.

**onDismiss** (iOS) - Function that will be called once the modal has been dismissed.

**onOrientationChange** (iOS) - Called when the orientation changes while the modal is being displayed.

**allowSwipeDismissal** (iOS) - Controls whether the modal can be dismissed by swiping down on iOS. Default: false.

**ref** - A ref setter that will be assigned an element node when mounted.

**onRequestClose** - Called when the user taps the hardware back button on Android or the menu button on Apple TV. Required on Android/TV.

**onShow** - Function that will be called once the modal has been shown.

**presentationStyle** (iOS) - Controls how the modal appears. Values: fullScreen, pageSheet, formSheet, overFullScreen.

**statusBarTranslucent** (Android) - Determines whether your modal should go under the system statusbar. Default: false.

**supportedOrientations** (iOS) - Allows the modal to be rotated to any of the specified orientations. Default: ['portrait'].

**transparent** - Determines whether your modal will fill the entire view. Default: false.

**visible** - Determines whether your modal is visible. Default: true.

---

## Pressable
Source: https://reactnative.dev/docs/pressable

Pressable is a Core Component wrapper that can detect various stages of press interactions on any of its defined children.

```tsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

### How it works

On an element wrapped by Pressable:
- onPressIn is called when a press is activated.
- onPressOut is called when the press gesture is deactivated.

After pressing onPressIn, one of two things will happen:
1. The person will remove their finger, triggering onPressOut followed by onPress.
2. If the person leaves their finger longer than 500 milliseconds before removing it, onLongPress is triggered.

Pressable has an optional HitRect and PressRect. The touch area never extends past the parent view bounds and the Z-index of sibling views always takes precedence if a touch hits two overlapping views.

### Props

**android_disableSound** (Android) - If true, doesn't play Android system sound on press. Default: false.

**android_ripple** (Android) - Enables the Android ripple effect and configures its properties.

**children** - Either children or a function that receives a boolean reflecting whether the component is currently pressed.

**unstable_pressDelay** - Duration (in milliseconds) to wait after press down before calling onPressIn.

**delayLongPress** - Duration (in milliseconds) from onPressIn before onLongPress is called. Default: 500.

**disabled** - Whether the press behavior is disabled. Default: false.

**hitSlop** - Sets additional distance outside of element in which a press can be detected.

**onHoverIn** - Called when the hover is activated to provide visual feedback.

**onHoverOut** - Called when the hover is deactivated to undo visual feedback.

**onLongPress** - Called if the time after onPressIn lasts longer than 500 milliseconds.

**onPress** - Called after onPressOut.

**onPressIn** - Called immediately when a touch is engaged, before onPressOut and onPress.

**onPressMove** - Called when the press location moves.

**onPressOut** - Called when a touch is released.

**pressRetentionOffset** - Additional distance outside of this view in which a touch is considered a press before onPressOut is triggered. Default: {bottom: 30, left: 20, right: 20, top: 20}.

**style** - Either view styles or a function that receives a boolean reflecting whether the component is currently pressed.

**testOnly_pressed** - Used only for documentation or testing. Default: false.

### Type Definitions

**RippleConfig** - Ripple effect configuration for the android_ripple property. Properties: color, borderless, radius, foreground.

---

## RefreshControl
Source: https://reactnative.dev/docs/refreshcontrol

This component is used inside a ScrollView or ListView to add pull to refresh functionality. When the ScrollView is at scrollY: 0, swiping down triggers an onRefresh event.

Note: refreshing is a controlled prop, this is why it needs to be set to true in the onRefresh function otherwise the refresh indicator will stop immediately.

## Reference

### Props

**View Props** - Inherits View Props.

**refreshing** (Required) - Whether the view should be indicating an active refresh.

**colors** (Android) - The colors (at least one) that will be used to draw the refresh indicator.

**enabled** (Android) - Whether the pull to refresh functionality is enabled. Default: true.

**onRefresh** - Called when the view starts refreshing.

**progressBackgroundColor** (Android) - The background color of the refresh indicator.

**progressViewOffset** - Progress view top offset. Default: 0.

**size** (Android) - Size of the refresh indicator. Values: default, large. Default: default.

**tintColor** (iOS) - The color of the refresh indicator.

**title** (iOS) - The title displayed under the refresh indicator.

**titleColor** (iOS) - The color of the refresh indicator title.

---

## ScrollView
Source: https://reactnative.dev/docs/scrollview

Component that wraps platform ScrollView while providing integration with touch locking "responder" system.

Keep in mind that ScrollViews must have a bounded height in order to work, since they contain unbounded-height children into a bounded container (via a scroll interaction).

`ScrollView` vs `FlatList` - which one to use?
ScrollView renders all its react child components at once, but this has a performance downside. FlatList renders items lazily, when they are about to appear, and removes items that scroll way off screen to save memory and processing time.

## Reference

### Props

**View Props** - Inherits View Props.

**StickyHeaderComponent** - A React Component that will be used to render sticky headers.

**alwaysBounceHorizontal** (iOS) - When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself.

**alwaysBounceVertical** (iOS) - When true, the scroll view bounces vertically when it reaches the end even if the content is smaller than the scroll view itself.

**automaticallyAdjustContentInsets** (iOS) - Controls whether iOS should automatically adjust the content inset for scroll views. Default: true.

**automaticallyAdjustKeyboardInsets** (iOS) - Controls whether the ScrollView should automatically adjust its contentInset when the Keyboard changes its size. Default: false.

**automaticallyAdjustsScrollIndicatorInsets** (iOS) - Controls whether iOS should automatically adjust the scroll indicator insets. Default: true.

**bounces** (iOS) - When true, the scroll view bounces when it reaches the end of the content. Default: true.

**bouncesZoom** (iOS) - When true, gestures can drive zoom past min/max. Default: true.

**canCancelContentTouches** (iOS) - When false, once tracking starts, won't try to drag if the touch moves. Default: true.

**centerContent** (iOS) - When true, the scroll view automatically centers the content when the content is smaller than the scroll view bounds. Default: false.

**contentContainerStyle** - These styles will be applied to the scroll view content container which wraps all of the child views.

**contentInset** (iOS) - The amount by which the scroll view content is inset from the edges of the scroll view.

**contentInsetAdjustmentBehavior** (iOS) - Specifies how the safe area insets are used to modify the content area of the scroll view. Default: never.

**contentOffset** - Used to manually set the starting scroll offset. Default: {x: 0, y: 0}.

**decelerationRate** - A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger. Default: normal.

**directionalLockEnabled** (iOS) - When true, the ScrollView will try to lock to only vertical or horizontal scrolling while dragging. Default: false.

**disableIntervalMomentum** - When true, the scroll view stops on the next index regardless of how fast the gesture is. Default: false.

**disableScrollViewPanResponder** - When true, the default JS pan responder on the ScrollView is disabled. Default: false.

**endFillColor** (Android) - Fills the rest of the scrollview with a color to avoid setting a background and creating unnecessary overdraw.

**fadingEdgeLength** (Android) - Fades out the edges of the scroll content. Default: 0.

**horizontal** - When true, the scroll view's children are arranged horizontally in a row instead of vertically in a column. Default: false.

**indicatorStyle** (iOS) - The style of the scroll indicators. Values: default, black, white.

**invertStickyHeaders** - If sticky headers should stick at the bottom instead of the top of the ScrollView. Default: false.

**keyboardDismissMode** - Determines whether the keyboard gets dismissed in response to a drag. Default: none.

**keyboardShouldPersistTaps** - Determines when the keyboard should stay visible after a tap. Default: never.

**maintainVisibleContentPosition** - When set, the scroll view will adjust the scroll position so that the first child that is currently visible will not change position.

**maximumZoomScale** (iOS) - The maximum allowed zoom scale. Default: 1.0.

**minimumZoomScale** (iOS) - The minimum allowed zoom scale. Default: 1.0.

**nestedScrollEnabled** (Android) - Enables nested scrolling for Android API level 21+. Default: false.

**onContentSizeChange** - Called when scrollable content view of the ScrollView changes.

**onMomentumScrollBegin** - Called when the momentum scroll starts.

**onMomentumScrollEnd** - Called when the momentum scroll ends.

**onScroll** - Fires at most once per frame during scrolling.

**onScrollBeginDrag** - Called when the user begins to drag the scroll view.

**onScrollEndDrag** - Called when the user stops dragging the scroll view and it either stops or begins to glide.

**onScrollToTop** (iOS) - Fires when the scroll view scrolls to top after the status bar has been tapped.

**overScrollMode** (Android) - Used to override default value of overScroll mode. Default: auto.

**pagingEnabled** - When true, the scroll view stops on multiples of the scroll view's size when scrolling. Default: false.

**persistentScrollbar** (Android) - Causes the scrollbars not to turn transparent when they are not in use. Default: false.

**pinchGestureEnabled** (iOS) - When true, ScrollView allows use of pinch gestures to zoom in and out. Default: true.

**refreshControl** - A RefreshControl component, used to provide pull-to-refresh functionality.

**removeClippedSubviews** - When true, offscreen child views are removed from their native backing superview when offscreen.

**scrollEnabled** - When false, the view cannot be scrolled via touch interaction. Default: true.

**scrollEventThrottle** - Limits how often scroll events will be fired while scrolling. Default: 0.

**scrollIndicatorInsets** (iOS) - The amount by which the scroll view indicators are inset from the edges of the scroll view.

**scrollPerfTag** (Android) - Tag used to log scroll performance on this scroll view.

**scrollsChildToFocus** (Android) - When true, the ScrollView automatically scrolls to bring a focused child into view. Default: true.

**scrollToOverflowEnabled** (iOS) - When true, the scroll view can be programmatically scrolled beyond its content size. Default: false.

**scrollsToTop** (iOS) - When true, the scroll view scrolls to top when the status bar is tapped. Default: true.

**showsHorizontalScrollIndicator** - When true, shows a horizontal scroll indicator. Default: true.

**showsVerticalScrollIndicator** - When true, shows a vertical scroll indicator. Default: true.

**snapToAlignment** - When snapToInterval is set, snapToAlignment will define the relationship of the snapping to the scroll view. Default: start.

**snapToEnd** - By default, the end of the list counts as a snap offset. Set snapToEnd to false to disable this behavior. Default: true.

**snapToInterval** - When set, causes the scroll view to stop at multiples of the value of snapToInterval.

**snapToOffsets** - When set, causes the scroll view to stop at the defined offsets.

**snapToStart** - By default, the beginning of the list counts as a snap offset. Set snapToStart to false to disable this behavior. Default: true.

**stickyHeaderHiddenOnScroll** - When set to true, sticky header will be hidden when scrolling down the list. Default: false.

**stickyHeaderIndices** - An array of child indices determining which children get docked to the top of the screen when scrolling.

**zoomScale** (iOS) - The current scale of the scroll view content. Default: 1.0.

### Methods

**flashScrollIndicators()** - Displays the scroll indicators momentarily.

**scrollTo()** - Scrolls to a given x, y offset, either immediately, with a smooth animation.

**scrollToEnd()** - If this is a vertical ScrollView scrolls to the bottom. If this is a horizontal ScrollView scrolls to the right.

---

## SectionList
Source: https://reactnative.dev/docs/sectionlist

A performant interface for rendering sectioned lists, supporting the most handy features:
- Fully cross-platform.
- Configurable viewability callbacks.
- List header support.
- List footer support.
- Item separator support.
- Section header support.
- Section separator support.
- Heterogeneous data and item rendering support.
- Pull to Refresh.
- Scroll loading.

If you don't need section support and want a simpler interface, use `<FlatList>`.

This is a convenience wrapper around `<VirtualizedList>`, and thus inherits its props (as well as those of `<ScrollView>`) that aren't explicitly listed here.

## Reference

### Props

**VirtualizedList Props** - Inherits VirtualizedList Props.

**renderItem** (Required) - Default renderer for every item in every section. Can be over-ridden on a per-section basis.

The render function will be passed an object with the following keys: 'item', 'index', 'section', 'separators'.

**sections** (Required) - The actual data to render, akin to the data prop in FlatList. Type: array of Sections.

**extraData** - A marker property for telling the list to re-render (since it implements PureComponent).

**initialNumToRender** - How many items to render in the initial batch. Default: 10.

**inverted** - Reverses the direction of scroll. Uses scale transforms of -1. Default: false.

**ItemSeparatorComponent** - Rendered in between each item, but not at the top or bottom.

**keyExtractor** - Used to extract a unique key for a given item at the specified index.

**ListEmptyComponent** - Rendered when the list is empty.

**ListFooterComponent** - Rendered at the very end of the list.

**ListHeaderComponent** - Rendered at the very beginning of the list.

**onRefresh** - If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality.

**onViewableItemsChanged** - Called when the viewability of rows changes.

**refreshing** - Set this true while waiting for new data from a refresh. Default: false.

**removeClippedSubviews** - When true, offscreen child views are removed from their native backing superview when offscreen.

**renderSectionFooter** - Rendered at the bottom of each section.

**renderSectionHeader** - Rendered at the top of each section. These stick to the top of the ScrollView by default on iOS.

**SectionSeparatorComponent** - Rendered at the top and bottom of each section.

**stickySectionHeadersEnabled** - Makes section headers stick to the top of the screen until the next one pushes it off. Default: false (Android), true (iOS).

### Methods

**flashScrollIndicators()** (iOS) - Displays the scroll indicators momentarily.

**recordInteraction()** - Tells the list an interaction has occurred, which should trigger viewability calculations.

**scrollToLocation()** - Scrolls to the item at the specified sectionIndex and itemIndex.

### Type Definitions

**Section** - An object that identifies the data to be rendered for a given section. Properties: data (Required), key, renderItem, ItemSeparatorComponent, keyExtractor.

---

## StatusBar
Source: https://reactnative.dev/docs/statusbar

Component to control the app's status bar. The status bar is the zone, typically at the top of the screen, that displays the current time, Wi-Fi and cellular network information, battery level and/or other status icons.

It is possible to have multiple StatusBar components mounted at the same time. The props will be merged in the order the StatusBar components were mounted.

For cases where using a component is not ideal, there is also an imperative API exposed as static functions on the component.

## Reference

### Constants

**currentHeight** (Android) - The height of the status bar, which includes the notch height, if present.

### Props

**animated** - If the transition between status bar property changes should be animated. Default: false.

**backgroundColor** (Android) - The background color of the status bar. (Deprecated in API level 35 due to edge-to-edge enforcement.)

**barStyle** - Sets the color of the status bar text. Default: 'default'.

**hidden** - If the status bar is hidden. Default: false.

**networkActivityIndicatorVisible** (iOS) - If the network activity indicator should be visible. Default: false.

**showHideTransition** (iOS) - The transition effect when showing and hiding the status bar using the hidden prop. Default: 'fade'.

**translucent** (Android) - If the status bar is translucent. Default: false. (Deprecated in API level 35.)

### Methods

**popStackEntry()** - Get and remove the last StatusBar entry from the stack.

**pushStackEntry()** - Push a StatusBar entry onto the stack.

**replaceStackEntry()** - Replace an existing StatusBar stack entry with new props.

**setBackgroundColor()** (Android) - Set the background color for the status bar.

**setBarStyle()** - Set the status bar style.

**setHidden()** - Show or hide the status bar.

🗑️ **setNetworkActivityIndicatorVisible()** (iOS) - Deprecated. The status bar network activity indicator is not supported in iOS 13 and later.

**setTranslucent()** (Android) - Control the translucency of the status bar.

### Type Definitions

**StatusBarAnimation** - Status bar animation type for transitions on the iOS. Constants: 'fade', 'slide', 'none'.

**StatusBarStyle** - Status bar style type. Constants: 'default', 'light-content', 'dark-content'.

---

## Switch
Source: https://reactnative.dev/docs/switch

Renders a boolean input.

This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions.

## Reference

### Props

**View Props** - Inherits View Props.

**disabled** - If true the user won't be able to toggle the switch. Default: false.

**ios_backgroundColor** (iOS) - On iOS, custom color for the background.

**onChange** - Invoked when the user tries to change the value of the switch. Receives the change event as an argument.

**onValueChange** - Invoked when the user tries to change the value of the switch. Receives the new value as an argument.

**ref** - A ref setter that will be assigned an element node when mounted.

**thumbColor** - Color of the foreground switch grip.

**trackColor** - Custom colors for the switch track. Type: object: {false: color, true: color}.

**value** - The value of the switch. If true the switch will be turned on. Default value is false.

---

## Text
Source: https://reactnative.dev/docs/text

A React component for displaying text.

Text supports nesting, styling, and touch handling.

### Nested text

Both Android and iOS allow you to display formatted text by annotating ranges of a string with specific formatting like bold or colored text (NSAttributedString on iOS, SpannableString on Android). React Native uses the web paradigm for this, where you can nest text to achieve the same effect.

### Containers

The `<Text>` element is unique relative to layout: everything inside is no longer using the Flexbox layout but using text layout. This means that elements inside of a `<Text>` are no longer rectangles, but wrap when they see the end of the line.

### Limited Style Inheritance

In React Native, you must wrap all the text nodes inside of a `<Text>` component. You cannot have a text node directly under a `<View>`.

The recommended way to use consistent fonts and sizes across your application is to create a component MyAppText that includes them and use this component across your app.

React Native still has the concept of style inheritance, but limited to text subtrees.

## Reference

### Props

**accessibilityHint** - An accessibility hint helps users understand what will happen when they perform an action.

**accessibilityLanguage** (iOS) - A value indicating which language should be used by the screen reader.

**accessibilityLabel** - Overrides the text that's read by the screen reader.

**accessibilityRole** - Tells the screen reader to treat the currently focused on element as having a specific role.

**accessibilityState** - Tells the screen reader to treat the currently focused on element as being in a specific state.

**accessibilityActions** - Accessibility actions allow an assistive technology to programmatically invoke the actions of a component.

**onAccessibilityAction** - Invoked when the user performs the accessibility actions.

**accessible** - When set to true, indicates that the view is an accessibility element. Default: true.

**adjustsFontSizeToFit** - Specifies whether fonts should be scaled down automatically to fit given style constraints. Default: false.

**allowFontScaling** - Specifies whether fonts should scale to respect Text Size accessibility settings. Default: true.

**android_hyphenationFrequency** (Android) - Sets the frequency of automatic hyphenation. Default: 'none'.

**aria-busy** - Indicates an element is being modified. Default: false.

**aria-checked** - Indicates the state of a checkable element. Default: false.

**aria-disabled** - Indicates that the element is perceivable but disabled. Default: false.

**aria-expanded** - Indicates whether an expandable element is currently expanded or collapsed. Default: false.

**aria-label** - Defines a string value that labels an interactive element.

**aria-selected** - Indicates whether a selectable element is currently selected or not.

**dataDetectorType** (Android) - Determines the types of data converted to clickable URLs in the text element. Default: 'none'.

**disabled** (Android) - Specifies the disabled state of the text view for testing purposes. Default: false.

**dynamicTypeRamp** (iOS) - The Dynamic Type ramp to apply to this element on iOS. Default: 'body'.

**ellipsizeMode** - When numberOfLines is set, this prop defines how the text will be truncated. Values: head, middle, tail, clip. Default: tail.

**id** - Used to locate this view from native code. Has precedence over nativeID prop.

**maxFontSizeMultiplier** - Specifies the largest possible scale a font can reach when allowFontScaling is enabled.

**minimumFontScale** - Specifies the smallest possible scale a font can reach when adjustsFontSizeToFit is enabled.

**nativeID** - Used to locate this view from native code.

**numberOfLines** - Used to truncate the text with an ellipsis after computing the text layout. Default: 0.

**onLayout** - Invoked on mount and on layout changes.

**onLongPress** - This function is called on long press.

**onMoveShouldSetResponder** - Does this view want to "claim" touch responsiveness?

**onPress** - Function called on user press, triggered after onPressOut.

**onPressIn** - Called immediately when a touch is engaged, before onPressOut and onPress.

**onPressOut** - Called when a touch is released.

**onResponderGrant** - The View is now responding to touch events.

**onResponderMove** - The user is moving their finger.

**onResponderRelease** - Fired at the end of the touch.

**onResponderTerminate** - The responder has been taken from the View.

**onResponderTerminationRequest** - Some other View wants to become a responder.

**onStartShouldSetResponderCapture** - If a parent View wants to prevent a child View from becoming a responder.

**onTextLayout** - Invoked on Text layout change.

**pressRetentionOffset** - When the scroll view is disabled, this defines how far your touch may move off of the button.

**ref** - A ref setter that will be assigned an element node when mounted.

**role** - Communicates the purpose of a component to the user of an assistive technology.

**selectable** - Lets the user select text, to use the native copy and paste functionality. Default: false.

**selectionColor** (Android) - The highlight color of the text.

**style** - Type: Text Style, View Style Props.

**suppressHighlighting** (iOS) - When true, no visual change is made when text is pressed down. Default: false.

**testID** - Used to locate this view in end-to-end tests.

**textBreakStrategy** (Android) - Set text break strategy on Android API Level 23+. Default: highQuality.

**lineBreakStrategyIOS** (iOS) - Set line break strategy on iOS 14+. Default: 'none'.

### Type Definitions

**TextLayout** - Object that contains the measurement data for Text line.

**TextLayoutEvent** - Object returned in the callback as a result of a component layout change.

---

## TextInput
Source: https://reactnative.dev/docs/textinput

A foundational component for inputting text into the app via a keyboard. Props provide configurability for several features, such as auto-correction, auto-capitalization, placeholder text, and different keyboard types.

Two methods exposed via the native element are .focus() and .blur().

Note that some props are only available with multiline={true/false}. Additionally, border styles that apply to only one side of the element will not be applied if multiline=true.

## Reference

### Props

**View Props** - Inherits View Props.

**allowFontScaling** - Specifies whether fonts should scale to respect Text Size accessibility settings. Default: true.

**autoCapitalize** - Tells TextInput to automatically capitalize certain characters. Values: none, sentences, words, characters.

**autoComplete** - Specifies autocomplete hints for the system, so it can provide autofill.

**autoCorrect** - If false, disables auto-correct. Default: true.

**autoFocus** - If true, focuses the input. Default: false.

🗑️ **blurOnSubmit** - Deprecated. Note that submitBehavior now takes the place of blurOnSubmit.

**caretHidden** - If true, caret is hidden. Default: false.

**clearButtonMode** (iOS) - When the clear button should appear on the right side of the text view. Values: never, while-editing, unless-editing, always.

**clearTextOnFocus** (iOS) - If true, clears the text field automatically when editing begins.

**contextMenuHidden** - If true, context menu is hidden. Default: false.

**dataDetectorTypes** (iOS) - Determines the types of data converted to clickable URLs in the text input.

**defaultValue** - Provides an initial value that will change when the user starts typing.

**disableKeyboardShortcuts** (iOS) - If true, the keyboard shortcuts are disabled. Default: false.

**cursorColor** (Android) - Sets the color of the cursor (or "caret") in the component.

**disableFullscreenUI** (Android) - When true, disables full screen text input mode. Default: false.

**editable** - If false, text is not editable. Default: true.

**enablesReturnKeyAutomatically** (iOS) - If true, the keyboard disables the return key when there is no text. Default: false.

**enterKeyHint** - Determines what text should be shown to the return key. Has precedence over the returnKeyType prop.

**importantForAutofill** (Android) - Tells the operating system whether the individual fields should be included in a view structure for autofill. Default: auto.

**inlineImageLeft** (Android) - If defined, the provided image resource will be rendered on the left.

**inlineImagePadding** (Android) - Padding between the inline image, if any, and the text input itself.

**inputAccessoryViewID** (iOS) - An optional identifier which links a custom InputAccessoryView to this text input.

**inputAccessoryViewButtonLabel** (iOS) - An optional label that overrides the default InputAccessoryView button label.

**inputMode** - Works like the inputmode attribute in HTML, it determines which keyboard to open. Values: decimal, email, none, numeric, search, tel, text, url.

**keyboardAppearance** (iOS) - Determines the color of the keyboard. Values: default, light, dark.

**keyboardType** - Determines which keyboard to open. Values: default, number-pad, decimal-pad, numeric, email-address, phone-pad, url, etc.

**lineBreakStrategyIOS** (iOS) - Set line break strategy on iOS 14+. Default: 'none'.

**lineBreakModeIOS** (iOS) - Set line break mode on iOS. Default: 'wordWrapping'.

**maxFontSizeMultiplier** - Specifies largest possible scale a font can reach when allowFontScaling is enabled.

**maxLength** - Limits the maximum number of characters that can be entered.

**multiline** - If true, the text input can be multiple lines. Default: false.

**numberOfLines** - Sets the maximum number of lines for a TextInput. Use it with multiline set to true.

**onBlur** - Callback that is called when the text input is blurred.

**onChange** - Callback that is called when the text input's text changes.

**onChangeText** - Callback that is called when the text input's text changes. Changed text is passed as a single string argument.

**onContentSizeChange** - Callback that is called when the text input's content size changes.

**onEndEditing** - Callback that is called when text input ends.

**onPressIn** - Callback that is called when a touch is engaged.

**onPressOut** - Callback that is called when a touch is released.

**onFocus** - Callback that is called when the text input is focused.

**onKeyPress** - Callback that is called when a key is pressed.

**onLayout** - Invoked on mount and on layout changes.

**onScroll** - Invoked on content scroll.

**onSelectionChange** - Callback that is called when the text input selection is changed.

**onSubmitEditing** - Callback that is called when the text input's submit button is pressed.

**placeholder** - The string that will be rendered before text input has been entered.

**placeholderTextColor** - The text color of the placeholder string.

**readOnly** - If true, text is not editable. Default: false.

**returnKeyLabel** (Android) - Sets the return key to the label.

**returnKeyType** - Determines how the return key should look.

**rejectResponderTermination** (iOS) - If true, allows TextInput to pass touch events to the parent component. Default: true.

**rows** (Android) - Sets the number of lines for a TextInput.

**scrollEnabled** (iOS) - If false, scrolling of the text view will be disabled. Default: true.

**secureTextEntry** - If true, the text input obscures the text entered so that sensitive text like passwords stay secure. Default: false.

**selection** - The start and end of the text input's selection.

**selectionColor** - The highlight, selection handle and cursor color of the text input.

**selectionHandleColor** (Android) - Sets the color of the selection handle.

**selectTextOnFocus** - If true, all text will automatically be selected on focus.

**showSoftInputOnFocus** - When false, it will prevent the soft keyboard from showing when the field is focused. Default: true.

**smartInsertDelete** (iOS) - If false, the iOS system will not insert an extra space after a paste operation. Default: true.

**spellCheck** (iOS) - If false, disables spell-check style. Default: inherited from autoCorrect.

**submitBehavior** - When the return key is pressed. Values: submit, blurAndSubmit, newline.

**textAlign** - Align the input text to the left, center, or right. Values: left, center, right.

**textContentType** (iOS) - Give the keyboard and the system information about the expected semantic meaning for the content.

**passwordRules** (iOS) - When using textContentType as newPassword on iOS we can let the OS know the minimum requirements of the password.

**style** - Note that not all Text styles are supported.

**textBreakStrategy** (Android) - Set text break strategy on Android API Level 23+. Default: highQuality.

**underlineColorAndroid** (Android) - The color of the TextInput underline.

**value** - The value to show for the text input.

### Methods

**.focus()** - Makes the native input request focus.

**.blur()** - Makes the native input lose focus.

**clear()** - Removes all text from the TextInput.

**isFocused()** - Returns true if the input is currently focused; false otherwise.

---

## TouchableHighlight
Source: https://reactnative.dev/docs/touchablehighlight

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the Pressable API.

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, which allows the underlay color to show through, darkening or tinting the view.

TouchableHighlight must have one child (not zero or more than one). If you wish to have several child components, wrap them in a View.

## Reference

### Props

**TouchableWithoutFeedback Props** - Inherits TouchableWithoutFeedback Props.

**activeOpacity** - Determines what the opacity of the wrapped view should be when touch is active. The value should be between 0 and 1. Defaults to 0.85. Requires underlayColor to be set.

**onHideUnderlay** - Called immediately after the underlay is hidden.

**onShowUnderlay** - Called immediately after the underlay is shown.

**ref** - A ref setter that will be assigned an element node when mounted.

**style** - Type: View.style.

**underlayColor** - The color of the underlay that will show through when the touch is active.

**hasTVPreferredFocus** (iOS) - TV preferred focus.

**nextFocusDown** (Android) - TV next focus down.

**nextFocusForward** (Android) - TV next focus forward.

**nextFocusLeft** (Android) - TV next focus left.

**nextFocusRight** (Android) - TV next focus right.

**nextFocusUp** (Android) - TV next focus up.

**testOnly_pressed** - Handy for snapshot tests.

---

## TouchableOpacity
Source: https://reactnative.dev/docs/touchableopacity

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the Pressable API.

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

Opacity is controlled by wrapping the children in an Animated.View, which is added to the view hierarchy. Be aware that this can affect layout.

## Reference

### Props

**TouchableWithoutFeedback Props** - Inherits TouchableWithoutFeedback Props.

**style** - Type: View.style.

**activeOpacity** - Determines what the opacity of the wrapped view should be when touch is active. Defaults to 0.2.

**hasTVPreferredFocus** (iOS) - TV preferred focus.

**nextFocusDown** (Android) - TV next focus down.

**nextFocusForward** (Android) - TV next focus forward.

**nextFocusLeft** (Android) - TV next focus left.

**nextFocusRight** (Android) - TV next focus right.

**nextFocusUp** (Android) - TV next focus up.

**ref** - A ref setter that will be assigned an element node when mounted.

---

## TouchableWithoutFeedback
Source: https://reactnative.dev/docs/touchablewithoutfeedback

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the Pressable API.

Do not use unless you have a very good reason. All elements that respond to press should have a visual feedback when touched.

TouchableWithoutFeedback supports only one child. If you wish to have several child components, wrap them in a View.

## Reference

### Props

**accessibilityIgnoresInvertColors** (iOS) - A value indicating this view should or should not be inverted when color inversion is turned on.

**accessible** - When true, indicates that the view is an accessibility element. By default, all the touchable elements are accessible.

**accessibilityLabel** - Overrides the text that's read by the screen reader.

**accessibilityLanguage** (iOS) - A value indicating which language should be used by the screen reader.

**accessibilityHint** - An accessibility hint helps users understand what will happen when they perform an action.

**accessibilityRole** - Communicates the purpose of a component to the user of an assistive technology.

**accessibilityState** - Describes the current state of a component to the user of an assistive technology.

**accessibilityActions** - Accessibility actions allow an assistive technology to programmatically invoke the actions of a component.

**aria-busy** - Indicates an element is being modified. Default: false.

**aria-checked** - Indicates the state of a checkable element. Default: false.

**aria-disabled** - Indicates that the element is perceivable but disabled. Default: false.

**aria-expanded** - Indicates whether an expandable element is currently expanded or collapsed. Default: false.

**aria-hidden** - Indicates whether the element is hidden from assistive technologies. Default: false.

**aria-label** - Defines a string value that labels an interactive element.

**aria-live** (Android) - Indicates that an element will be updated. Values: assertive, off, polite. Default: off.

**aria-modal** (iOS) - Boolean value indicating whether VoiceOver should ignore the elements within views that are siblings of the receiver.

**aria-selected** - Indicates whether a selectable element is currently selected or not.

**onAccessibilityAction** - Invoked when the user performs the accessibility actions.

**accessibilityValue** - Represents the current value of a component.

**aria-valuemax** - Represents the maximum value for range-based components.

**aria-valuemin** - Represents the minimum value for range-based components.

**aria-valuenow** - Represents the current value for range-based components.

**aria-valuetext** - Represents the textual description of the component.

**delayLongPress** - Duration (in milliseconds) from onPressIn before onLongPress is called.

**delayPressIn** - Duration (in milliseconds), from the start of the touch, before onPressIn is called.

**delayPressOut** - Duration (in milliseconds), from the release of the touch, before onPressOut is called.

**disabled** - If true, disable all interactions for this component.

**hitSlop** - This defines how far your touch can start away from the button.

**id** - Used to locate this view from native code. Has precedence over nativeID prop.

**onBlur** - Invoked when the item loses focus.

**onFocus** - Invoked when the item receives focus.

**onLayout** - Invoked on mount and on layout changes.

**onLongPress** - Called if the time after onPressIn lasts longer than 370 milliseconds.

**onPress** - Called when the touch is released, but not if cancelled.

**onPressIn** - Called as soon as the touchable element is pressed.

**onPressOut** - Called as soon as the touch is released even before onPress.

**pressRetentionOffset** - When the scroll view is disabled, this defines how far your touch may move off of the button.

**nativeID** - Type: string.

**testID** - Used to locate this view in end-to-end tests.

**touchSoundDisabled** (Android) - If true, doesn't play a system sound on touch.

---

## View
Source: https://reactnative.dev/docs/view

The most fundamental component for building a UI, View is a container that supports layout with flexbox, style, some touch handling, and accessibility controls. View maps directly to the native view equivalent on whatever platform React Native is running on, whether that is a UIView, `<div>`, android.view, etc.

View is designed to be nested inside other views and can have 0 to many children of any type.

Views are designed to be used with StyleSheet for clarity and performance, although inline styles are also supported.

## Reference

### Props

**accessibilityActions** - Accessibility actions allow an assistive technology to programmatically invoke the actions of a component.

**accessibilityElementsHidden** (iOS) - A boolean value indicating whether the given accessibility element, and any accessibility elements it contains, are hidden. Default: false.

**accessibilityHint** - An accessibility hint helps users understand what will happen when they perform an action.

**accessibilityLanguage** (iOS) - A value indicating which language should be used by the screen reader.

**accessibilityIgnoresInvertColors** (iOS) - A value indicating this view should or should not be inverted when color inversion is turned on.

**accessibilityLabel** - Overrides the text that's read by the screen reader.

**accessibilityLiveRegion** (Android) - Indicates to accessibility services whether the user should be notified when this view changes.

**accessibilityRole** - Communicates the purpose of a component to the user of an assistive technology.

**accessibilityState** - Describes the current state of a component to the user of an assistive technology.

**accessibilityValue** - Represents the current value of a component.

**accessibilityViewIsModal** (iOS) - A value indicating whether VoiceOver should ignore the elements within views that are siblings of the receiver. Default: false.

**accessible** - When true, indicates that the view is an accessibility element.

**aria-busy** - Indicates an element is being modified. Default: false.

**aria-checked** - Indicates the state of a checkable element. Default: false.

**aria-disabled** - Indicates that the element is perceivable but disabled. Default: false.

**aria-expanded** - Indicates whether an expandable element is currently expanded or collapsed. Default: false.

**aria-hidden** - Indicates whether the element is hidden from assistive technologies. Default: false.

**aria-label** - Defines a string value that labels an interactive element.

**aria-labelledby** (Android) - Identifies the element that labels the element it is applied to.

**aria-live** (Android) - Indicates that an element will be updated. Values: assertive, off, polite. Default: off.

**aria-modal** (iOS) - Boolean value indicating whether VoiceOver should ignore the elements within views that are siblings of the receiver.

**aria-selected** - Indicates whether a selectable element is currently selected or not.

**aria-valuemax** - Represents the maximum value for range-based components.

**aria-valuemin** - Represents the minimum value for range-based components.

**aria-valuenow** - Represents the current value for range-based components.

**aria-valuetext** - Represents the textual description of the component.

**collapsable** - Views that are only used to layout their children may be automatically removed from the native hierarchy. Set to false to disable. Default: true.

**collapsableChildren** - Setting to false prevents direct children of the view from being removed from the native view hierarchy. Default: true.

**experimental_accessibilityOrder** - Indicates the order in which an assistive technology focuses descendants of this View.

**focusable** (Android) - Whether this View should be focusable with a non-touch input device.

**hitSlop** - This defines how far a touch event can start away from the view.

**id** - Used to locate this view from native classes. Has precedence over nativeID prop.

**importantForAccessibility** (Android) - Controls how view is important for accessibility.

**nativeID** - Used to locate this view from native classes.

**needsOffscreenAlphaCompositing** - Whether this View needs to rendered offscreen and composited with an alpha in order to preserve correct colors and blending behavior. Default: false.

**nextFocusDown** (Android) - Designates the next view to receive focus when the user navigates down.

**nextFocusForward** (Android) - Designates the next view to receive focus when the user navigates forward.

**nextFocusLeft** (Android) - Designates the next view to receive focus when the user navigates left.

**nextFocusRight** (Android) - Designates the next view to receive focus when the user navigates right.

**nextFocusUp** (Android) - Designates the next view to receive focus when the user navigates up.

**onAccessibilityAction** - Invoked when the user performs the accessibility actions.

**onAccessibilityEscape** (iOS) - When accessible is true, the system will invoke this function when the user performs the escape gesture.

**onAccessibilityTap** (iOS) - When accessible is true, the system will try to invoke this function when the user performs accessibility tap gesture.

**onLayout** - Invoked on mount and on layout changes.

**onMagicTap** (iOS) - When accessible is true, the system will invoke this function when the user performs the magic tap gesture.

**onMoveShouldSetResponder** - Does this view want to "claim" touch responsiveness?

**onMoveShouldSetResponderCapture** - If a parent View wants to prevent a child View from becoming responder on a move.

**onResponderGrant** - The View is now responding for touch events.

**onResponderMove** - The user is moving their finger.

**onResponderReject** - Another responder is already active and will not release it.

**onResponderRelease** - Fired at the end of the touch.

**onResponderTerminate** - The responder has been taken from the View.

**onResponderTerminationRequest** - Some other View wants to become responder.

**onStartShouldSetResponder** - Does this view want to become responder on the start of a touch?

**onStartShouldSetResponderCapture** - If a parent View wants to prevent a child View from becoming responder on a touch start.

**pointerEvents** - Controls whether the View can be the target of touch events. Values: auto, none, box-none, box-only.

**ref** - A ref setter that will be assigned an element node when mounted.

**removeClippedSubviews** - Reserved performance property useful for scrolling content when there are many subviews, most of which are offscreen.

**renderToHardwareTextureAndroid** (Android) - Whether this View should render itself (and all of its children) into a single hardware texture on the GPU.

**role** - Communicates the purpose of a component to the user of an assistive technology.

**shouldRasterizeIOS** (iOS) - Whether this View should be rendered as a bitmap before compositing.

**style** - Type: View Style.

**tabIndex** (Android) - Whether this View should be focusable with a non-touch input device. Values: 0 (focusable), -1 (not focusable).

**testID** - Used to locate this view in end-to-end tests.

---

## VirtualizedList
Source: https://reactnative.dev/docs/virtualizedlist

Base implementation for the more convenient `<FlatList>` and `<SectionList>` components, which are also better documented. In general, this should only really be used if you need more flexibility than FlatList provides, e.g. for use with immutable data instead of plain arrays.

Virtualization massively improves memory consumption and performance of large lists by maintaining a finite render window of active items and replacing all items outside of the render window with appropriately sized blank space.

## Reference

### Props

**ScrollView Props** - Inherits ScrollView Props.

**data** - Opaque data type passed to getItem and getItemCount to retrieve items.

**getItem** (Required) - A generic accessor for extracting an item from any sort of data blob.

**getItemCount** (Required) - Determines how many items are in the data blob.

**renderItem** (Required) - Takes an item from data and renders it into the list.

**CellRendererComponent** - Allows customizing how cells rendered by renderItem/ListItemComponent are wrapped when placed into the underlying ScrollView.

**ItemSeparatorComponent** - Rendered in between each item, but not at the top or bottom.

**ListEmptyComponent** - Rendered when the list is empty.

**ListItemComponent** - Each data item is rendered using this element.

**ListFooterComponent** - Rendered at the bottom of all the items.

**ListFooterComponentStyle** - Styling for internal View for ListFooterComponent.

**ListHeaderComponent** - Rendered at the top of all the items.

**ListHeaderComponentStyle** - Styling for internal View for ListHeaderComponent.

**debug** - Will turn on extra logging and visual overlays to aid with debugging.

🗑️ **disableVirtualization** - Deprecated. You should only need to disable this for debugging purposes.

**extraData** - A marker property for telling the list to re-render (since it implements PureComponent).

**getItemLayout** - Optional optimization that allows skipping the measurement of dynamic content if you know the size of items ahead of time.

**horizontal** - If true, renders items next to each other horizontally instead of stacked vertically.

**initialNumToRender** - How many items to render in the initial batch. Default: 10.

**initialScrollIndex** - Instead of starting at the top with the first item, start at initialScrollIndex.

**inverted** - Reverses the direction of scroll. Uses scale transforms of -1.

**keyExtractor** - Used to extract a unique key for a given item at the specified index.

**maxToRenderPerBatch** - The maximum number of items to render in each incremental render batch.

**onEndReached** - Called once when the scroll position gets within onEndReachedThreshold from the logical end of the list.

**onEndReachedThreshold** - How far from the end (in units of visible length of the list) the trailing edge of the list must be from the end of the content to trigger the onEndReached callback. Default: 2.

**onRefresh** - If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality.

**onScrollToIndexFailed** - Used to handle failures when scrolling to an index that has not been measured yet.

**onStartReached** - Called once when the scroll position gets within onStartReachedThreshold from the logical start of the list.

**onStartReachedThreshold** - How far from the start (in units of visible length of the list) the leading edge of the list must be from the start of the content. Default: 2.

**onViewableItemsChanged** - Called when the viewability of rows changes.

**persistentScrollbar** - Type: bool.

**progressViewOffset** - Set this when offset is needed for the loading indicator to show correctly.

**refreshControl** - A custom refresh control element.

**refreshing** - Set this true while waiting for new data from a refresh.

**removeClippedSubviews** - When true, offscreen child views are removed from their native backing superview when offscreen.

**renderScrollComponent** - Render a custom scroll component.

**viewabilityConfig** - See ViewabilityHelper.js for flow type and further documentation.

**viewabilityConfigCallbackPairs** - List of ViewabilityConfig/onViewableItemsChanged pairs.

**updateCellsBatchingPeriod** - Amount of time between low-pri item render batches.

**windowSize** - Determines the maximum number of items rendered outside of the visible area, in units of visible lengths. Default: 21.

### Methods

**flashScrollIndicators()** - Displays the scroll indicators momentarily.

**getScrollableNode()** - Returns any.

**getScrollRef()** - Returns a reference to the underlying scroll component or View.

**getScrollResponder()** - Provides a handle to the underlying scroll responder.

**scrollToEnd()** - Scrolls to the end of the content.

**scrollToIndex()** - Scrolls to the item at the specified index.

**scrollToItem()** - Scrolls to the item specified.

**scrollToOffset()** - Scroll to a specific content pixel offset in the list.

---

## DrawerLayoutAndroid
Source: https://reactnative.dev/docs/drawerlayoutandroid

React component that wraps the platform DrawerLayout (Android only). The Drawer (typically used for navigation) is rendered with renderNavigationView and direct children are the main view (where your content goes). The navigation view is initially not visible on the screen, but can be pulled in from the side of the window specified by the drawerPosition prop and its width can be set by the drawerWidth prop.

## Reference

### Props

**View Props** - Inherits View Props.

**drawerBackgroundColor** - Specifies the background color of the drawer. Default: white.

**drawerLockMode** - Specifies the lock mode of the drawer. Values: unlocked, locked-closed, locked-open.

**drawerPosition** - Specifies the side of the screen from which the drawer will slide in. Values: left, right. Default: left.

**drawerWidth** - Specifies the width of the drawer.

**keyboardDismissMode** - Determines whether the keyboard gets dismissed in response to a drag. Values: none, on-drag.

**onDrawerClose** - Function called whenever the navigation view has been closed.

**onDrawerOpen** - Function called whenever the navigation view has been opened.

**onDrawerSlide** - Function called whenever there is an interaction with the navigation view.

**onDrawerStateChanged** - Function called when the drawer state has changed. States: idle, dragging, settling.

**renderNavigationView** (Required) - The navigation view that will be rendered to the side of the screen.

**statusBarBackgroundColor** - Make the drawer take the entire screen and draw the background of the status bar. Only has effect on API 21+.

### Methods

**closeDrawer()** - Closes the drawer.

**openDrawer()** - Opens the drawer.

---

## TouchableNativeFeedback
Source: https://reactnative.dev/docs/touchablenativefeedback

> If you're looking for a more extensive and future-proof way to handle touch-based input, check out the Pressable API.

A wrapper for making views respond properly to touches (Android only). On Android this component uses native state drawable to display touch feedback.

At the moment it only supports having a single View instance as a child node.

## Reference

### Props

**TouchableWithoutFeedback Props** - Inherits TouchableWithoutFeedback Props.

**background** - Determines the type of background drawable that's going to be used to display feedback.

**useForeground** - Set to true to add the ripple effect to the foreground of the view, instead of the background.

**hasTVPreferredFocus** (Android) - TV preferred focus.

**nextFocusDown** (Android) - TV next focus down.

**nextFocusForward** (Android) - TV next focus forward.

**nextFocusLeft** (Android) - TV next focus left.

**nextFocusRight** (Android) - TV next focus right.

**nextFocusUp** (Android) - TV next focus up.

### Methods

**SelectableBackground()** - Creates an object that represents android theme's default background for selectable elements.

**SelectableBackgroundBorderless()** - Creates an object that represent android theme's default background for borderless selectable elements. Available on android API level 21+.

**Ripple()** - Creates an object that represents ripple drawable with specified color.

**canUseNativeForeground()** - Returns boolean.

---

## InputAccessoryView
Source: https://reactnative.dev/docs/inputaccessoryview

A component which enables customization of the keyboard input accessory view on iOS. The input accessory view is displayed above the keyboard whenever a TextInput has focus. This component can be used to create custom toolbars.

To use this component wrap your custom toolbar with the InputAccessoryView component, and set a nativeID. Then, pass that nativeID as the inputAccessoryViewID of whatever TextInput you desire.

This component can also be used to create sticky text inputs (text inputs which are anchored to the top of the keyboard).

## Reference

### Props

**backgroundColor** - Type: color.

**nativeID** - An ID which is used to associate this InputAccessoryView to specified TextInput(s).

**style** - Type: View Style.

### Known issues
- Doesn't support multiline TextInput
- Can't use with a bottom tab bar

---

## 🗑️ SafeAreaView
Source: https://reactnative.dev/docs/safeareaview

**Deprecated** - Use react-native-safe-area-context instead.

The purpose of SafeAreaView is to render content within the safe area boundaries of a device. It is currently only applicable to iOS devices with iOS version 11 or later.

SafeAreaView renders nested content and automatically applies padding to reflect the portion of the view that is not covered by navigation bars, tab bars, toolbars, and other ancestor views.

## Reference

### Props

**View Props** - Inherits View Props.

> As padding is used to implement the behavior of the component, padding rules in styles applied to a SafeAreaView will be ignored and can cause different results depending on the platform.

---

Sometimes it's useful to know whether or not the device has a screen reader that is currently active. The `AccessibilityInfo` API is designed for this purpose. You can use it to query the current state of the screen reader as well as to register to be notified when the state of the screen reader changes.

## Example

---

# Reference

## Methods

### `addEventListener()`

```
static addEventListener(  eventName: AccessibilityChangeEventName | AccessibilityAnnouncementEventName,  handler: (    event: AccessibilityChangeEvent | AccessibilityAnnouncementFinishedEvent,  ) => void,): EmitterSubscription;
```

Add an event handler. Supported events:

| Event name | Description |
|---|---|
| `accessibilityServiceChanged` (Android) | Fires when some services such as TalkBack, other Android assistive technologies, and third-party accessibility services are enabled. The argument to the event handler is a boolean. The boolean is `true` when a some accessibility services is enabled and `false` otherwise. |
| `announcementFinished` (iOS) | Fires when the screen reader has finished making an announcement. The argument to the event handler is a dictionary with these keys: `announcement`: The string announced by the screen reader. `success`: A boolean indicating whether the announcement was successfully made. |
| `boldTextChanged` (iOS) | Fires when the state of the bold text toggle changes. The argument to the event handler is a boolean. The boolean is `true` when bold text is enabled and `false` otherwise. |
| `grayscaleChanged` (iOS) | Fires when the state of the gray scale toggle changes. The argument to the event handler is a boolean. The boolean is `true` when a gray scale is enabled and `false` otherwise. |
| `invertColorsChanged` (iOS) | Fires when the state of the invert colors toggle changes. The argument to the event handler is a boolean. The boolean is `true` when invert colors is enabled and `false` otherwise. |
| `reduceMotionChanged` | Fires when the state of the reduce motion toggle changes. The argument to the event handler is a boolean. The boolean is `true` when a reduce motion is enabled (or when "Transition Animation Scale" in "Developer options" is "Animation off") and `false` otherwise. |
| `reduceTransparencyChanged` (iOS) | Fires when the state of the reduce transparency toggle changes. The argument to the event handler is a boolean. The boolean is `true` when reduce transparency is enabled and `false` otherwise. |
| `screenReaderChanged` | Fires when the state of the screen reader changes. The argument to the event handler is a boolean. The boolean is `true` when a screen reader is enabled and `false` otherwise. |

---

### `announceForAccessibility()`

```
static announceForAccessibility(announcement: string);
```

Post a string to be announced by the screen reader.

---

### `announceForAccessibilityWithOptions()`

```
static announceForAccessibilityWithOptions(  announcement: string,  options: {queue?: boolean},);
```

Post a string to be announced by the screen reader with modification options. By default announcements will interrupt any existing speech, but on iOS they can be queued behind existing speech by setting `queue` to `true` in the options object.

**Parameters:**

| Name | Type | Description |
|---|---|---|
| announcement (Required) | string | The string to be announced |
| options (Required) | object | `queue` - queue the announcement behind existing speech (iOS) |

---

### `getRecommendedTimeoutMillis()` (Android)

```
static getRecommendedTimeoutMillis(originalTimeout: number): Promise<number>;
```

Gets the timeout in millisecond that the user needs. This value is set in "Time to take action (Accessibility timeout)" of "Accessibility" settings.

**Parameters:**

| Name | Type | Description |
|---|---|---|
| originalTimeout (Required) | number | The timeout to return if "Accessibility timeout" is not set. Specify in milliseconds. |

---

### `isAccessibilityServiceEnabled()` (Android)

```
static isAccessibilityServiceEnabled(): Promise<boolean>;
```

Check whether any accessibility service is enabled. This includes TalkBack but also any third-party accessibility app that may be installed. To only check whether TalkBack is enabled, use isScreenReaderEnabled. Returns a promise which resolves to a boolean. The result is `true` when some accessibility services is enabled and `false` otherwise.

> Please use isScreenReaderEnabled if you only want to check the status of TalkBack.

---

### `isBoldTextEnabled()` (iOS)

```
static isBoldTextEnabled(): Promise<boolean>:
```

Query whether a bold text is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when bold text is enabled and `false` otherwise.

---

### `isGrayscaleEnabled()` (iOS)

```
static isGrayscaleEnabled(): Promise<boolean>;
```

Query whether grayscale is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when grayscale is enabled and `false` otherwise.

---

### `isInvertColorsEnabled()` (iOS)

```
static isInvertColorsEnabled(): Promise<boolean>;
```

Query whether invert colors is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when invert colors is enabled and `false` otherwise.

---

### `isReduceMotionEnabled()`

```
static isReduceMotionEnabled(): Promise<boolean>;
```

Query whether reduce motion is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when reduce motion is enabled and `false` otherwise.

---

### `isReduceTransparencyEnabled()` (iOS)

```
static isReduceTransparencyEnabled(): Promise<boolean>;
```

Query whether reduce transparency is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when a reduce transparency is enabled and `false` otherwise.

---

### `isScreenReaderEnabled()`

```
static isScreenReaderEnabled(): Promise<boolean>;
```

Query whether a screen reader is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when a screen reader is enabled and `false` otherwise.

---

### `isHighTextContrastEnabled()` (Android)

```
static isHighTextContrastEnabled(): Promise<boolean>
```

Query whether high text contrast is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when high text contrast is enabled and `false` otherwise.

---

### `isDarkerSystemColorsEnabled()` (iOS)

```
static isDarkerSystemColorsEnabled(): Promise<boolean>
```

Query whether dark system colors is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when dark system colors is enabled and `false` otherwise.

---

### `prefersCrossFadeTransitions()` (iOS)

```
static prefersCrossFadeTransitions(): Promise<boolean>;
```

Query whether reduce motion and prefer cross-fade transitions settings are currently enabled. Returns a promise which resolves to a boolean. The result is `true` when prefer cross-fade transitions is enabled and `false` otherwise.

---

### 🗑️ `setAccessibilityFocus()` (Deprecated)

Prefer using `sendAccessibilityEvent` with eventType `focus` instead.

```
static setAccessibilityFocus(reactTag: number);
```

Set accessibility focus to a React component. On Android, this calls `UIManager.sendAccessibilityEvent` method with passed `reactTag` and `UIManager.AccessibilityEventTypes.typeViewFocused` arguments.

> Make sure that any `View` you want to receive the accessibility focus has `accessible={true}`.

---

### `sendAccessibilityEvent()`

```
static sendAccessibilityEvent(host: HostInstance, eventType: AccessibilityEventTypes);
```

Imperatively trigger an accessibility event on a React component, like changing the focused element for a screen reader.

> Make sure that any `View` you want to receive the accessibility focus has `accessible={true}`.

| Name | Type | Description |
|---|---|---|
| host (Required) | HostInstance | The component ref to send the event to. |
| eventType (Required) | AccessibilityEventTypes | One of `'click'` (Android only), `'focus'`, `'viewHoverEnter'` (Android only), or `'windowStateChange'` (Android only) |

---

## Alert
Source: https://reactnative.dev/docs/alert

Launches an alert dialog with the specified title and message.

Optionally provide a list of buttons. Tapping any button will fire the respective onPress callback and dismiss the alert. By default, the only button will be an 'OK' button.

This is an API that works both on Android and iOS and can show static alerts. Alert that prompts the user to enter some information is available on iOS only.

## Example

## iOS

On iOS you can specify any number of buttons. Each button can optionally specify a style or be emphasized, available options are represented by the AlertButtonStyle enum and the `isPreferred` field on AlertButton.

## Android

On Android at most three buttons can be specified. Android has a concept of a neutral, negative and a positive button:

- If you specify one button, it will be the 'positive' one (such as 'OK')
- Two buttons mean 'negative', 'positive' (such as 'Cancel', 'OK')
- Three buttons mean 'neutral', 'negative', 'positive' (such as 'Later', 'Cancel', 'OK')

Alerts on Android can be dismissed by tapping outside of the alert box. It is disabled by default and can be enabled by providing an optional AlertOptions parameter with the cancelable property set to `true` i.e. `{cancelable: true}`.

The cancel event can be handled by providing an `onDismiss` callback property inside the `options` parameter.

### Example (Android)

---

# Reference

## Methods

### `alert()`

```
static alert (  title: string,  message?: string,  buttons?: AlertButton[],  options?: AlertOptions,);
```

**Parameters:**

| Name | Type | Description |
|---|---|---|
| title (Required) | string | The dialog's title. Passing `null` or empty string will hide the title. |
| message | string | An optional message that appears below the dialog's title. |
| buttons | AlertButton[] | An optional array containing buttons configuration. |
| options | AlertOptions | An optional Alert configuration. |

---

### `prompt()` (iOS)

```
static prompt: (  title: string,  message?: string,  callbackOrButtons?: ((text: string) => void) | AlertButton[],  type?: AlertType,  defaultValue?: string,  keyboardType?: string,);
```

Create and display a prompt to enter some text in form of Alert.

**Parameters:**

| Name | Type | Description |
|---|---|---|
| title (Required) | string | The dialog's title. |
| message | string | An optional message that appears above the text input. |
| callbackOrButtons | function \| AlertButton[] | If passed a function, it will be called with the prompt's value `(text: string) => void`, when the user taps 'OK'. If passed an array, buttons will be configured based on the array content. |
| type | AlertType | This configures the text input. |
| defaultValue | string | The default text in text input. |
| keyboardType | string | The keyboard type of first text field (if exists). One of TextInput keyboardTypes. |
| options | AlertOptions | An optional Alert configuration. |

---

## Type Definitions

### AlertButtonStyle (iOS)

An iOS Alert button style.

Type: enum

**Constants:**

| Value | Description |
|---|---|
| `'default'` | Default button style. |
| `'cancel'` | Cancel button style. |
| `'destructive'` | Destructive button style. |

---

### AlertType (iOS)

An iOS Alert type.

Type: enum

**Constants:**

| Value | Description |
|---|---|
| `'default'` | Default alert with no inputs |
| `'plain-text'` | Plain text input alert |
| `'secure-text'` | Secure text input alert |
| `'login-password'` | Login and password alert |

---

### AlertButton

An object describing the configuration of a button in the alert.

Type: array of objects

**Objects properties:**

| Name | Type | Description |
|---|---|---|
| text | string | Button label. |
| onPress | function | Callback function when button is pressed. |
| style (iOS) | AlertButtonStyle | Button style, on Android this property will be ignored. |
| isPreferred (iOS) | boolean | Whether button should be emphasized, on Android this property will be ignored. |

---

### AlertOptions

Type: object

**Properties:**

| Name | Type | Description |
|---|---|---|
| cancelable (Android) | boolean | Defines if alert can be dismissed by tapping outside of the alert box. |
| userInterfaceStyle (iOS) | string | The interface style used for the alert, can be set to `light` or `dark`, otherwise the default system style will be used. |
| onDismiss (Android) | function | Callback function fired when alert has been dismissed. |

---

## Animated
Source: https://reactnative.dev/docs/animated

The `Animated` library is designed to make animations fluid, powerful, and painless to build and maintain. `Animated` focuses on declarative relationships between inputs and outputs, configurable transforms in between, and `start`/`stop` methods to control time-based animation execution.

The core workflow for creating an animation is to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and then drive updates via animations using `Animated.timing()`.

> Don't modify the animated value directly. You can use the `useRef` Hook to return a mutable ref object. This ref object's `current` property is initialized as the given argument and persists throughout the component lifecycle.

## Example

The following example contains a `View` which will fade in and fade out based on the animated value `fadeAnim`

Refer to the Animations guide to see additional examples of `Animated` in action.

## Overview

There are two value types you can use with `Animated`:

- `Animated.Value()` for single values
- `Animated.ValueXY()` for vectors

`Animated.Value` can bind to style properties or other props, and can be interpolated as well. A single `Animated.Value` can drive any number of properties.

### Configuring animations

`Animated` provides three types of animation types:

- `Animated.decay()` starts with an initial velocity and gradually slows to a stop.
- `Animated.spring()` provides a basic spring physics model.
- `Animated.timing()` animates a value over time using easing functions.

### Working with animations

Animations are started by calling `start()` on your animation. `start()` takes a completion callback that will be called when the animation is done. If the animation finished running normally, the completion callback will be invoked with `{finished: true}`. If the animation is done because `stop()` was called on it before it could finish (e.g. because it was interrupted by a gesture or another animation), then it will receive `{finished: false}`.

```
Animated.timing({}).start(({finished}) => {  /* completion callback */});
```

### Using the native driver

By using the native driver, we send everything about the animation to native before starting the animation, allowing native code to perform the animation on the UI thread without having to go through the bridge on every frame. Once the animation has started, the JS thread can be blocked without affecting the animation.

You can use the native driver by specifying `useNativeDriver: true` in your animation configuration.

### Animatable components

Only animatable components can be animated. These unique components do the magic of binding the animated values to the properties, and do targeted native updates to avoid the cost of the React render and reconciliation process on every frame.

- `createAnimatedComponent()` can be used to make a component animatable.

`Animated` exports the following animatable components using the above wrapper:

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`
- `Animated.FlatList`
- `Animated.SectionList`

### Composing animations

- `Animated.delay()` starts an animation after a given delay.
- `Animated.parallel()` starts a number of animations at the same time.
- `Animated.sequence()` starts the animations in order, waiting for each to complete before starting the next.
- `Animated.stagger()` starts animations in order and in parallel, but with successive delays.

### Combining animated values

- `Animated.add()`
- `Animated.subtract()`
- `Animated.divide()`
- `Animated.modulo()`
- `Animated.multiply()`

### Interpolation

The `interpolate()` function allows input ranges to map to different output ranges. By default, it will extrapolate the curve beyond the ranges given, but you can also have it clamp the output value. It uses linear interpolation by default but also supports easing functions.

- `interpolate()`

### Handling gestures and other events

Gestures, like panning or scrolling, and other events can map directly to animated values using `Animated.event()`. This is done with a structured map syntax so that values can be extracted from complex event objects.

- `Animated.event()`

For example, when working with horizontal scrolling gestures, you would do the following in order to map `event.nativeEvent.contentOffset.x` to `scrollX` (an `Animated.Value`):

```
 onScroll={Animated.event(   // scrollX = e.nativeEvent.contentOffset.x   [{nativeEvent: {        contentOffset: {          x: scrollX        }      }    }] )}
```

---

# Reference

## Methods

### `decay()`

```
static decay(value, config): CompositeAnimation;
```

Animates a value from an initial velocity to zero based on a decay coefficient.

Config options:
- `velocity`: Initial velocity. Required.
- `deceleration`: Rate of decay. Default 0.997.
- `isInteraction`: Whether or not this animation creates an "interaction handle" on the `InteractionManager`. Default true.
- `useNativeDriver`: Uses the native driver when true. Required.

---

### `timing()`

```
static timing(value, config): CompositeAnimation;
```

Animates a value along a timed easing curve.

Config options:
- `duration`: Length of animation (milliseconds). Default 500.
- `easing`: Easing function to define curve. Default is `Easing.inOut(Easing.ease)`.
- `delay`: Start the animation after delay (milliseconds). Default 0.
- `isInteraction`: Whether or not this animation creates an "interaction handle" on the `InteractionManager`. Default true.
- `useNativeDriver`: Uses the native driver when true. Required.

---

### `spring()`

```
static spring(value, config): CompositeAnimation;
```

Animates a value according to an analytical spring model based on damped harmonic oscillation.

Config options (use only one group): friction/tension, bounciness/speed, or stiffness/damping/mass:
- `friction`: Controls "bounciness"/overshoot. Default 7.
- `tension`: Controls speed. Default 40.
- `speed`: Controls speed of the animation. Default 12.
- `bounciness`: Controls bounciness. Default 8.
- `stiffness`: The spring stiffness coefficient. Default 100.
- `damping`: Defines how the spring's motion should be damped due to the forces of friction. Default 10.
- `mass`: The mass of the object attached to the end of the spring. Default 1.
- `velocity`: The initial velocity of the object attached to the spring. Default 0.
- `overshootClamping`: Boolean indicating whether the spring should be clamped and not bounce. Default false.
- `restDisplacementThreshold`: The threshold of displacement from rest below which the spring should be considered at rest. Default 0.001.
- `restSpeedThreshold`: The speed at which the spring should be considered at rest in pixels per second. Default 0.001.
- `delay`: Start the animation after delay (milliseconds). Default 0.
- `isInteraction`: Whether or not this animation creates an "interaction handle" on the `InteractionManager`. Default true.
- `useNativeDriver`: Uses the native driver when true. Required.

---

### `add()`

```
static add(a: Animated, b: Animated): AnimatedAddition;
```

Creates a new Animated value composed from two Animated values added together.

---

### `subtract()`

```
static subtract(a: Animated, b: Animated): AnimatedSubtraction;
```

---

### `divide()`

```
static divide(a: Animated, b: Animated): AnimatedDivision;
```

---

### `multiply()`

```
static multiply(a: Animated, b: Animated): AnimatedMultiplication;
```

---

### `modulo()`

```
static modulo(a: Animated, modulus: number): AnimatedModulo;
```

---

### `diffClamp()`

```
static diffClamp(a: Animated, min: number, max: number): AnimatedDiffClamp;
```

Create a new Animated value that is limited between 2 values. It uses the difference between the last value so even if the value is far from the bounds it will start changing when the value starts getting closer again. (`value = clamp(value + diff, min, max)`).

---

### `delay()`

```
static delay(time: number): CompositeAnimation;
```

---

### `sequence()`

```
static sequence(animations: CompositeAnimation[]): CompositeAnimation;
```

---

### `parallel()`

```
static parallel(  animations: CompositeAnimation[],  config?: ParallelConfig): CompositeAnimation;
```

---

### `stagger()`

```
static stagger(  time: number,  animations: CompositeAnimation[]): CompositeAnimation;
```

---

### `loop()`

```
static loop(  animation: CompositeAnimation[],  config?: LoopAnimationConfig): CompositeAnimation;
```

Config options:
- `iterations`: Number of times the animation should loop. Default `-1` (infinite).

---

### `event()`

```
static event(  argMapping: Mapping[],  config?: EventConfig): (...args: any[]) => void;
```

Config options:
- `listener`: Optional async listener.
- `useNativeDriver`: Uses the native driver when true. Required.

---

### `forkEvent()`

```
static forkEvent(event: AnimatedEvent, listener: Function): AnimatedEvent;
```

---

### `unforkEvent()`

```
static unforkEvent(event: AnimatedEvent, listener: Function);
```

---

### `start()`

```
static start(callback?: (result: {finished: boolean}) => void);
```

### `stop()`

```
static stop();
```

### `reset()`

```
static reset();
```

## Properties

### `Value`

Standard value class for driving animations. Typically initialized with `useAnimatedValue(0);` or `new Animated.Value(0);` in class components.

### `ValueXY`

2D value class for driving 2D animations, such as pan gestures.

### `Interpolation`

Exported to use the Interpolation type in flow.

### `Node`

Exported for ease of type checking. All animated values derive from this class.

### `createAnimatedComponent`

Make any React component Animatable. Used to create `Animated.View`, etc.

### `attachNativeEvent`

Imperative API to attach an animated value to an event on a view. Prefer using `Animated.event` with `useNativeDriver: true` if possible.

---

## Animated.Value
Source: https://reactnative.dev/docs/animatedvalue

Standard value for driving animations. One `Animated.Value` can drive multiple properties in a synchronized fashion, but can only be driven by one mechanism at a time. Using a new mechanism (e.g. starting a new animation, or calling `setValue`) will stop any previous ones.

Typically initialized with `useAnimatedValue(0);` or `new Animated.Value(0);` in class components.

---

# Reference

## Methods

### `setValue()`

```
setValue(value: number);
```

Directly set the value. This will stop any animations running on the value and update all the bound properties.

**Parameters:**

| Name | Type | Required | Description |
|---|---|---|---|
| value | number | Yes | Value |

---

### `setOffset()`

```
setOffset(offset: number);
```

Sets an offset that is applied on top of whatever value is set, whether via `setValue`, an animation, or `Animated.event`. Useful for compensating things like the start of a pan gesture.

---

### `flattenOffset()`

```
flattenOffset();
```

Merges the offset value into the base value and resets the offset to zero. The final output of the value is unchanged.

---

### `extractOffset()`

```
extractOffset();
```

Sets the offset value to the base value, and resets the base value to zero. The final output of the value is unchanged.

---

### `addListener()`

```
addListener(callback: (state: {value: number}) => void): string;
```

Adds an asynchronous listener to the value so you can observe updates from animations. Returns a string that serves as an identifier for the listener.

---

### `removeListener()`

```
removeListener(id: string);
```

---

### `removeAllListeners()`

```
removeAllListeners();
```

---

### `stopAnimation()`

```
stopAnimation(callback?: (value: number) => void);
```

Stops any running animation or tracking. `callback` is invoked with the final value after stopping the animation.

---

### `resetAnimation()`

```
resetAnimation(callback?: (value: number) => void);
```

Stops any animation and resets the value to its original.

---

### `interpolate()`

```
interpolate(config: InterpolationConfigType);
```

The `config` object is composed of the following keys:
- `inputRange`: an array of numbers
- `outputRange`: an array of numbers or strings
- `easing` (optional): a function that returns a number, given an input number
- `extrapolate` (optional): a string such as 'extend', 'identity', or 'clamp'
- `extrapolateLeft` (optional): a string such as 'extend', 'identity', or 'clamp'
- `extrapolateRight` (optional): a string such as 'extend', 'identity', or 'clamp'

---

### `animate()`

```
animate(animation, callback);
```

Typically only used internally, but could be used by a custom Animation class.

---

## Animated.ValueXY
Source: https://reactnative.dev/docs/animatedvaluexy

2D Value for driving 2D animations, such as pan gestures. Almost identical API to normal `Animated.Value`, but multiplexed. Contains two regular `Animated.Value`s under the hood.

## Example

---

# Reference

## Methods

### `setValue()`

```
setValue(value: {x: number; y: number});
```

---

### `setOffset()`

```
setOffset(offset: {x: number; y: number});
```

---

### `flattenOffset()`

```
flattenOffset();
```

---

### `extractOffset()`

```
extractOffset();
```

---

### `addListener()`

```
addListener(callback: (value: {x: number; y: number}) => void);
```

---

### `removeListener()`

```
removeListener(id: string);
```

---

### `removeAllListeners()`

```
removeAllListeners();
```

---

### `stopAnimation()`

```
stopAnimation(callback?: (value: {x: number; y: number}) => void);
```

---

### `resetAnimation()`

```
resetAnimation(callback?: (value: {x: number; y: number}) => void);
```

---

### `getLayout()`

```
getLayout(): {left: Animated.Value, top: Animated.Value};
```

Converts `{x, y}` into `{left, top}` for use in style, e.g.

```
style={this.state.anim.getLayout()}
```

---

### `getTranslateTransform()`

```
getTranslateTransform(): [  {translateX: Animated.Value},  {translateY: Animated.Value},];
```

Converts `{x, y}` into a useable translation transform, e.g.

```
style={{  transform: this.state.anim.getTranslateTransform()}}
```

---

## Appearance
Source: https://reactnative.dev/docs/appearance

```
import {Appearance} from 'react-native';
```

The `Appearance` module exposes information about the user's appearance preferences, such as their preferred system color scheme (light or dark).

> The `Appearance` API is inspired by the Media Queries draft from the W3C. The color scheme preference is modeled after the `prefers-color-scheme` CSS media feature.

> The color scheme preference will map to the user's Light or Dark theme preference on Android 10 (API level 29) devices and higher.

> The color scheme preference will map to the user's Light or Dark Mode preference on iOS 13 devices and higher.

> When taking a screenshot, by default, the color scheme may flicker between light and dark mode. It happens because the iOS takes snapshots on both color schemes and updating the user interface with color scheme is asynchronous.

## Example

You can use the `Appearance` module to determine if the user prefers a dark color scheme:

```
const colorScheme = Appearance.getColorScheme();if (colorScheme === 'dark') {  // Use dark color scheme}
```

**Recommended:** Use the `useColorScheme` hook.

### App-level overriding

`setColorScheme()` overrides the color scheme at the application level — it does not affect the system setting or other applications. Passing `'unspecified'` removes any override, restoring the system preference.

---

# Reference

## Methods

### `getColorScheme()`

```
static getColorScheme(): 'light' | 'dark' | 'unspecified' | null;
```

Returns the active color scheme.

Return values:
- `'light'`: The light color scheme is applied.
- `'dark'`: The dark color scheme is applied.
- `'unspecified'`: ***Never returned*** (incorrectly typed).
- `null`: May be returned if the native Appearance module is not available.

---

### `setColorScheme()`

```
static setColorScheme('light' | 'dark' | 'unspecified'): void;
```

Forces the application to always adopt a light or dark interface style. The change applies to the application and all native elements within it (Alerts, Pickers, etc.).

Supported values:
- `'light'`: Apply light color scheme.
- `'dark'`: Apply dark color scheme.
- `'unspecified'`: Follow the system color scheme (removes any override).

---

### `addChangeListener()`

```
static addChangeListener(  listener: (preferences: {colorScheme: 'light' | 'dark' | null}) => void,): NativeEventSubscription;
```

Add an event handler that is fired when appearance preferences change. On iOS and Android, the `colorScheme` value in the callback is always `'light'` or `'dark'`.

---

## AppRegistry
Source: https://reactnative.dev/docs/appregistry

### Project with Native Code Required

If you are using the managed Expo workflow there is only ever one entry component registered with `AppRegistry` and it is handled automatically (or through registerRootComponent). You do not need to use this API.

`AppRegistry` is the JS entry point to running all React Native apps. App root components should register themselves with `AppRegistry.registerComponent`, then the native system can load the bundle for the app and then actually run the app when it's ready by invoking `AppRegistry.runApplication`.

```
import {Text, AppRegistry} from 'react-native';const App = () => (  <View>    <Text>App1</Text>  </View>);AppRegistry.registerComponent('Appname', () => App);
```

To "stop" an application when a view should be destroyed, call `AppRegistry.unmountApplicationComponentAtRootTag` with the tag that was passed into `runApplication`. These should always be used as a pair.

`AppRegistry` should be required early in the `require` sequence to make sure the JS execution environment is setup before other modules are required.

---

# Reference

## Methods

### `getAppKeys()`

```
static getAppKeys(): string[];
```

### `getRegistry()`

```
static getRegistry(): {sections: string[]; runnables: Runnable[]};
```

### `getRunnable()`

```
static getRunnable(appKey: string): : Runnable | undefined;
```

### `getSectionKeys()`

```
static getSectionKeys(): string[];
```

### `getSections()`

```
static getSections(): Record<string, Runnable>;
```

### `registerCancellableHeadlessTask()`

```
static registerCancellableHeadlessTask(  taskKey: string,  taskProvider: TaskProvider,  taskCancelProvider: TaskCancelProvider,);
```

### `registerComponent()`

```
static registerComponent(  appKey: string,  getComponentFunc: ComponentProvider,  section?: boolean,): string;
```

### `registerConfig()`

```
static registerConfig(config: AppConfig[]);
```

### `registerHeadlessTask()`

```
static registerHeadlessTask(  taskKey: string,  taskProvider: TaskProvider,);
```

### `registerRunnable()`

```
static registerRunnable(appKey: string, func: Runnable): string;
```

### `registerSection()`

```
static registerSection(  appKey: string,  component: ComponentProvider,);
```

### `runApplication()`

```
static runApplication(appKey: string, appParameters: any): void;
```

### `setComponentProviderInstrumentationHook()`

```
static setComponentProviderInstrumentationHook(  hook: ComponentProviderInstrumentationHook,);
```

### `setWrapperComponentProvider()`

```
static setWrapperComponentProvider(  provider: WrapperComponentProvider,);
```

### `startHeadlessTask()`

```
static startHeadlessTask(  taskId: number,  taskKey: string,  data: any,);
```

### `unmountApplicationComponentAtRootTag()`

```
static unmountApplicationComponentAtRootTag(rootTag: number);
```

## Type Definitions

### AppConfig

Type: object

**Properties:**

| Name | Type |
|---|---|
| appKey (Required) | string |
| component | ComponentProvider |
| run | function |
| section | boolean |

### Registry

Type: object

**Properties:**

| Name | Type |
|---|---|
| runnables | array of Runnables |
| sections | array of strings |

### Runnable

Type: object

**Properties:**

| Name | Type |
|---|---|
| component | ComponentProvider |
| run | function |

### Runnables

An object with key of `appKey` and value of type of `Runnable`.

### Task

A `Task` is a function that accepts any data as argument and returns a Promise that resolves to `undefined`.

### TaskCanceller

A `TaskCanceller` is a function that accepts no argument and returns void.

### TaskCancelProvider

A valid `TaskCancelProvider` is a function that returns a `TaskCanceller`.

### TaskProvider

A valid `TaskProvider` is a function that returns a `Task`.

---

## AppState
Source: https://reactnative.dev/docs/appstate

`AppState` can tell you if the app is in the foreground or background, and notify you when the state changes.

AppState is frequently used to determine the intent and proper behavior when handling push notifications.

### App States

- `active` - The app is running in the foreground
- `background` - The app is running in the background. The user is either: in another app, on the home screen, or [Android] on another `Activity`, including temporary system activities such as autofill credential pickers (even if launched by your app or the system)
- [iOS] `inactive` - This is a state that occurs when transitioning between foreground & background, and during periods of inactivity such as entering the multitasking view, opening the Notification Center or in the event of an incoming call.

## Basic Usage

To see the current state, you can check `AppState.currentState`, which will be kept up-to-date.

> If you are using the legacy architecture, `currentState` will be `null` at launch until it is retrieved asynchronously from the native side.

---

# Reference

## Events

### `change`

This event is received when the app state has changed. The listener is called with one of the current app state values.

### `memoryWarning` (iOS)

Fires when the app receives a memory warning from the operating system.

### `focus` (Android)

Received when the app gains focus (the user is interacting with the app).

### `blur` (Android)

Received when the user is not actively interacting with the app. Useful in situations when the user pulls down the notification drawer. `AppState` won't change but the `blur` event will get fired.

## Methods

### `addEventListener()`

```
static addEventListener(  type: AppStateEvent,  listener: (state: AppStateStatus) => void,): NativeEventSubscription;
```

## Properties

### `currentState`

```
static currentState: AppStateStatus;
```

---

## DevSettings
Source: https://reactnative.dev/docs/devsettings

The `DevSettings` module exposes methods for customizing settings for developers in development.

---

# Reference

## Methods

### `addMenuItem()`

```
static addMenuItem(title: string, handler: () => any);
```

Add a custom menu item to the Dev Menu.

**Example:**

```
DevSettings.addMenuItem('Show Secret Dev Screen', () => {  Alert.alert('Showing secret dev screen!');});
```

---

### `reload()`

```
static reload(reason?: string): void;
```

Reload the application. Can be invoked directly or on user interaction.

**Example:**

```
<Button title="Reload" onPress={() => DevSettings.reload()} />
```

---

## Dimensions
Source: https://reactnative.dev/docs/dimensions

> `useWindowDimensions` is the preferred API for React components. Unlike `Dimensions`, it updates as the window's dimensions update.

```
import {Dimensions} from 'react-native';
```

You can get the application window's width and height using the following code:

```
const windowWidth = Dimensions.get('window').width;const windowHeight = Dimensions.get('window').height;
```

> Although dimensions are available immediately, they may change (e.g due to device rotation, foldable devices etc) so any rendering logic or styles that depend on these constants should try to call this function on every render, rather than caching the value (for example, using inline styles rather than setting a value in a `StyleSheet`).

## Example

# Reference

## Methods

### `addEventListener()`

```
static addEventListener(  type: 'change',  handler: ({    window,    screen,  }: DimensionsValue) => void,): EmitterSubscription;
```

- `change`: Fires when a property within the `Dimensions` object changes.

---

### `get()`

```
static get(dim: 'window' | 'screen'): ScaledSize;
```

Example: `const {height, width} = Dimensions.get('window');`

> For Android the `window` dimension will be reduced by the size of status bar (if not translucent) and bottom navigation bar.

## Type Definitions

### DimensionsValue

**Properties:**

| Name | Type | Description |
|---|---|---|
| window | ScaledSize | Size of the visible Application window. |
| screen | ScaledSize | Size of the device's screen. |

### ScaledSize

Type: object

**Properties:**

| Name | Type |
|---|---|
| width | number |
| height | number |
| scale | number |
| fontScale | number |

---

## Easing
Source: https://reactnative.dev/docs/easing

The `Easing` module implements common easing functions. This module is used by `Animated.timing()` to convey physically believable motion in animations.

You can find a visualization of some common easing functions at https://easings.net/

### Predefined animations

- `back` provides a basic animation where the object goes slightly back before moving forward
- `bounce` provides a bouncing animation
- `ease` provides a basic inertial animation
- `elastic` provides a basic spring interaction

### Standard functions

- `linear`
- `quad`
- `cubic`

The `poly` function can be used to implement quartic, quintic, and other higher power functions.

### Additional functions

- `bezier` provides a cubic bezier curve
- `circle` provides a circular function
- `sin` provides a sinusoidal function
- `exp` provides an exponential function

The following helpers are used to modify other easing functions:

- `in` runs an easing function forwards
- `inOut` makes any easing function symmetrical
- `out` runs an easing function backwards

## Example

---

# Reference

## Methods

### `step0()`

```
static step0(n: number);
```

A stepping function, returns 1 for any positive value of `n`.

### `step1()`

```
static step1(n: number);
```

A stepping function, returns 1 if `n` is greater than or equal to 1.

### `linear()`

```
static linear(t: number);
```

A linear function, `f(t) = t`. Position correlates to elapsed time one to one.

### `ease()`

```
static ease(t: number);
```

A basic inertial interaction, similar to an object slowly accelerating to speed.

### `quad()`

```
static quad(t: number);
```

A quadratic function, `f(t) = t * t`. Position equals the square of elapsed time.

### `cubic()`

```
static cubic(t: number);
```

A cubic function, `f(t) = t * t * t`. Position equals the cube of elapsed time.

### `poly()`

```
static poly(n: number);
```

A power function. Position is equal to the Nth power of elapsed time.

### `sin()`

```
static sin(t: number);
```

A sinusoidal function.

### `circle()`

```
static circle(t: number);
```

A circular function.

### `exp()`

```
static exp(t: number);
```

An exponential function.

### `elastic()`

```
static elastic(bounciness: number);
```

A basic elastic interaction, similar to a spring oscillating back and forth. Default bounciness is 1.

### `back()`

```
static back(s)
```

Use with `Animated.parallel()` to create a basic effect where the object animates back slightly as the animation starts.

### `bounce()`

```
static bounce(t: number);
```

Provides a basic bouncing effect.

### `bezier()`

```
static bezier(x1: number, y1: number, x2: number, y2: number);
```

Provides a cubic bezier curve, equivalent to CSS Transitions' `transition-timing-function`.

### `in()`

```
static in(easing: number);
```

Runs an easing function forwards.

### `out()`

```
static out(easing: number);
```

Runs an easing function backwards.

### `inOut()`

```
static inOut(easing: number);
```

Makes any easing function symmetrical. The easing function will run forwards for half of the duration, then backwards for the rest of the duration.

---

## I18nManager
Source: https://reactnative.dev/docs/i18nmanager

The `I18nManager` module provides utilities for managing Right-to-Left (RTL) layout support for languages like Arabic, Hebrew, and others. It provides methods to control RTL behavior and check the current layout direction.

## Examples

### Change positions and animations based on RTL

If you absolutely position elements to align with other flexbox elements, they may not align in RTL languages. Using `isRTL` can be used to adjust alignment or animations.

### During Development

# Reference

## Properties

### `isRTL`

```
static isRTL: boolean;
```

A boolean value indicating whether the app is currently in RTL layout mode.

The value of `isRTL` is determined by:
- If `forceRTL` is `true`, `isRTL` returns `true`
- If `allowRTL` is `false`, `isRTL` returns `false`
- Otherwise, `isRTL` will be `true` given the following:
  - **iOS:** The user-preferred language on the device is an RTL language and the application-defined localizations include the user-chosen language.
  - **Android:** The user-preferred language on the device is an RTL language and the application's `AndroidManifest.xml` defines `android:supportsRTL="true"`.

### `doLeftAndRightSwapInRTL`

```
static doLeftAndRightSwapInRTL: boolean;
```

A boolean value indicating whether left and right style properties should be automatically swapped when in RTL mode.

## Methods

### `allowRTL()`

```
static allowRTL: (allowRTL: boolean) => void;
```

Enables or disables RTL layout support for the application. Changes take effect on the next application start, not immediately. This setting is persisted across app restarts.

### `forceRTL()`

```
static forceRTL: (forced: boolean) => void;
```

Forces the app to use RTL layout regardless of the device language settings. This is primarily useful for testing RTL layouts during development. Changes take full effect on the next application start.

### `swapLeftAndRightInRTL()`

```
static swapLeftAndRightInRTL: (swapLeftAndRight: boolean) => void;
```

Swap left and right style properties in RTL mode. Does not affect the value of `isRTL`.

---

## 🗑️ InteractionManager
Source: https://reactnative.dev/docs/interactionmanager

> Deprecated: Avoid long-running work and use `requestIdleCallback` instead.

InteractionManager allows long-running work to be scheduled after any interactions/animations have completed. In particular, this allows JavaScript animations to run smoothly.

Applications can schedule tasks to run after interactions with the following:

```
InteractionManager.runAfterInteractions(() => {  // ...long-running synchronous task...});
```

Compare this to other scheduling alternatives:
- `requestAnimationFrame()` for code that animates a view over time.
- `setImmediate/setTimeout()` run code later, note this may delay animations.
- `runAfterInteractions()` run code later, without delaying active animations.

The touch handling system considers one or more active touches to be an 'interaction' and will delay `runAfterInteractions()` callbacks until all touches have ended or been cancelled.

InteractionManager also allows applications to register animations by creating an interaction 'handle' on animation start, and clearing it upon completion:

```
const handle = InteractionManager.createInteractionHandle();// run animation... (`runAfterInteractions` tasks are queued)// later, on animation completion:InteractionManager.clearInteractionHandle(handle);// queued tasks run if all handles were cleared
```

`runAfterInteractions` takes either a plain callback function, or a `PromiseTask` object with a `gen` method that returns a `Promise`. If a `PromiseTask` is supplied, then it is fully resolved (including asynchronous dependencies that also schedule more tasks via `runAfterInteractions`) before starting on the next task that might have been queued up synchronously earlier.

By default, queued tasks are executed together in a loop in one `setImmediate` batch. If `setDeadline` is called with a positive number, then tasks will only be executed until the deadline (in terms of js event loop run time) approaches, at which point execution will yield via setTimeout, allowing events such as touches to start interactions and block queued tasks from executing, making apps more responsive.

## Example

### Basic

### Advanced

# Reference

## Methods

### `runAfterInteractions()`

```
static runAfterInteractions(task?: (() => any) | SimpleTask | PromiseTask);
```

### `createInteractionHandle()`

```
static createInteractionHandle(): Handle;
```

### `clearInteractionHandle()`

```
static clearInteractionHandle(handle: Handle);
```

### `setDeadline()`

```
static setDeadline(deadline: number);
```

---

## Keyboard
Source: https://reactnative.dev/docs/keyboard

`Keyboard` module to control keyboard events.

### Usage

The Keyboard module allows you to listen for native events and react to them, as well as make changes to the keyboard, like dismissing it.

---

# Reference

## Methods

### `addListener()`

```
static addListener: (  eventType: KeyboardEventName,  listener: KeyboardEventListener,) => EmitterSubscription;
```

**Parameters:**

| Name | Type | Description |
|---|---|---|
| eventName (Required) | string | The string that identifies the event you're listening for. |
| callback (Required) | function | The function to be called when the event fires |

**`eventName` values:**
- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`
- `keyboardWillChangeFrame`
- `keyboardDidChangeFrame`

> Only `keyboardDidShow` and `keyboardDidHide` events are available on Android. The events will not be fired when using Android 10 or below if your activity has `android:windowSoftInputMode` set to `adjustResize` or `adjustNothing`.

---

### `dismiss()`

```
static dismiss();
```

Dismisses the active keyboard and removes focus.

---

### `scheduleLayoutAnimation`

```
static scheduleLayoutAnimation(event: KeyboardEvent);
```

Useful for syncing TextInput (or other keyboard accessory view) size of position changes with keyboard movements.

---

### `isVisible()`

```
static isVisible(): boolean;
```

Whether the keyboard is last known to be visible.

---

### `metrics()`

```
static metrics(): KeyboardMetrics | undefined;
```

Return the metrics of the soft-keyboard if visible.

---

## LayoutAnimation
Source: https://reactnative.dev/docs/layoutanimation

Automatically animates views to their new positions when the next layout happens.

A common way to use this API is to call it before updating the state hook in functional components and calling `setState` in class components.

Note that in order to get this to work on **Android** you need to set the following flags via `UIManager`:

```
if (Platform.OS === 'android') {  if (UIManager.setLayoutAnimationEnabledExperimental) {    UIManager.setLayoutAnimationEnabledExperimental(true);  }}
```

## Example

---

# Reference

## Methods

### `configureNext()`

```
static configureNext(  config: LayoutAnimationConfig,  onAnimationDidEnd?: () => void,  onAnimationDidFail?: () => void,);
```

The `config` parameter is an object with the keys below:
- `duration` in milliseconds
- `create`, optional config for animating in new views
- `update`, optional config for animating views that have been updated
- `delete`, optional config for animating views as they are removed

The config that's passed to `create`, `update`, or `delete` has the following keys:
- `type`, the animation type to use
- `property`, the layout property to animate (optional, but recommended for `create` and `delete`)
- `springDamping` (number, optional and only for use with `type: Type.spring`)
- `initialVelocity` (number, optional)
- `delay` (number, optional)
- `duration` (number, optional)

---

### `create()`

```
static create(duration, type, creationProp)
```

Helper that creates an object (with `create`, `update`, and `delete` fields) to pass into `configureNext`.

## Properties

### Types

An enumeration of animation types: `spring`, `linear`, `easeInEaseOut`, `easeIn`, `easeOut`, `keyboard`

### Properties

An enumeration of layout properties: `opacity`, `scaleX`, `scaleY`, `scaleXY`

### Presets

| Presets | Value |
|---|---|
| easeInEaseOut | `create(300, 'easeInEaseOut', 'opacity')` |
| linear | `create(500, 'linear', 'opacity')` |
| spring | `{duration: 700, create: {type: 'linear', property: 'opacity'}, update: {type: 'spring', springDamping: 0.4}, delete: {type: 'linear', property: 'opacity'} }` |

### `easeInEaseOut`

Calls `configureNext()` with `Presets.easeInEaseOut`.

### `linear`

Calls `configureNext()` with `Presets.linear`.

### `spring`

Calls `configureNext()` with `Presets.spring`.

---

## Linking
Source: https://reactnative.dev/docs/linking

`Linking` gives you a general interface to interact with both incoming and outgoing app links.

Every Link (URL) has a URL Scheme, some websites are prefixed with `https://` or `http://` and the `http` is the URL Scheme. Let's call it scheme for short.

In addition to `https`, you're likely also familiar with the `mailto` scheme. When you open a link with the mailto scheme, your operating system will open an installed mail application. Similarly, there are schemes for making phone calls and sending SMS.

### Built-in URL Schemes

| Scheme | Description | iOS | Android |
|---|---|---|---|
| `mailto` | Open mail app, eg: mailto: hello@world.dev | ✅ | ✅ |
| `tel` | Open phone app, eg: tel:+123456789 | ✅ | ✅ |
| `sms` | Open SMS app, eg: sms:+123456789 | ✅ | ✅ |
| `https` / `http` | Open web browser app, eg: https://expo.dev | ✅ | ✅ |

### Enabling Deep Links

#### Projects with Native Code Only

If you want to enable deep links in your app:

- **Android:** Refer to Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links. You may set the `launchMode` of MainActivity to `singleTask` in `AndroidManifest.xml`.
- **iOS:** You'll need to add the `LinkingIOS` folder into your header search paths. If you also want to listen to incoming app links during your app's execution, you'll need to add the following lines to your `*AppDelegate.m`:

AppDelegate.mm (iOS 9.x or newer):
```
#import <React/RCTLinkingManager.h>
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

For Universal Links:
```
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler{
 return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}
```

### Handling Deep Links

There are two ways to handle URLs that open your app.

1. **If the app is already open:** The app is foregrounded and a Linking 'url' event is fired. You can handle these events with `Linking.addEventListener('url', callback)`.

2. **If the app is not already open:** It is opened and the url is passed in as the initialURL. You can handle these events with `Linking.getInitialURL()` - it returns a Promise that resolves to the URL, if there is one.

## Example

### Open Links and Deep Links (Universal Links)

### Open Custom Settings

### Get the Deep Link

### Send Intents (Android)

# Reference

## Methods

### `addEventListener()`

```
static addEventListener(  type: 'url',  handler: (event: {url: string}) => void,): EmitterSubscription;
```

### `canOpenURL()`

```
static canOpenURL(url: string): Promise<boolean>;
```

Determine whether or not an installed app can handle a given URL.

> For web URLs, the protocol (`"http://"`, `"https://"`) must be set accordingly!
> This method has limitations on iOS 9+. If your app is linked against an earlier version of iOS but is running in iOS 9.0 or later, you can call this method up to 50 times. After reaching that limit, subsequent calls always resolve to `false`.
> When targeting Android 11 (SDK 30) you must specify the intents for the schemes you want to handle in `AndroidManifest.xml`.

### `getInitialURL()`

```
static getInitialURL(): Promise<string | null>;
```

If the app launch was triggered by an app link, it will give the link url, otherwise it will give `null`.

### `openSettings()`

```
static openSettings(): Promise<void>;
```

Open the Settings app and displays the app's custom settings, if it has any.

### `openURL()`

```
static openURL(url: string): Promise<any>;
```

Try to open the given `url` with any of the installed apps.

> This method will fail if the system doesn't know how to open the specified URL. If you're passing in a non-http(s) URL, it's best to check `canOpenURL()` first.

### `sendIntent()` (Android)

```
static sendIntent(  action: string,  extras?: Array<{key: string; value: string | number | boolean}>,): Promise<void>;
```

Launch an Android intent with extras.

---

## PanResponder
Source: https://reactnative.dev/docs/panresponder

`PanResponder` reconciles several touches into a single gesture. It makes single-touch gestures resilient to extra touches, and can be used to recognize basic multi-touch gestures.

By default, `PanResponder` holds an `InteractionManager` handle to block long-running JS events from interrupting active gestures.

It provides a predictable wrapper of the responder handlers provided by the gesture responder system. For each handler, it provides a new `gestureState` object alongside the native event object:

```
onPanResponderMove: (event, gestureState) => {}
```

A `gestureState` object has the following:
- `stateID` - ID of the gestureState- persisted as long as there's at least one touch on screen
- `moveX` - the latest screen coordinates of the recently-moved touch
- `moveY` - the latest screen coordinates of the recently-moved touch
- `x0` - the screen coordinates of the responder grant
- `y0` - the screen coordinates of the responder grant
- `dx` - accumulated distance of the gesture since the touch started
- `dy` - accumulated distance of the gesture since the touch started
- `vx` - current velocity of the gesture
- `vy` - current velocity of the gesture
- `numberActiveTouches` - Number of touches currently on screen

## Usage Pattern

```
const ExampleComponent = () => {  const panResponder = useRef(    PanResponder.create({      onStartShouldSetPanResponder: (evt, gestureState) => true,      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,      onMoveShouldSetPanResponder: (evt, gestureState) => true,      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,      onPanResponderGrant: (evt, gestureState) => {},      onPanResponderMove: (evt, gestureState) => {},      onPanResponderTerminationRequest: (evt, gestureState) => true,      onPanResponderRelease: (evt, gestureState) => {},      onPanResponderTerminate: (evt, gestureState) => {},      onShouldBlockNativeResponder: (evt, gestureState) => { return true; },    }),  ).current;  return <View {...panResponder.panHandlers} />;};
```

## Example

`PanResponder` works with `Animated` API to help build complex gestures in the UI. The following example contains an animated `View` component which can be dragged freely across the screen.

Try the PanResponder example in RNTester.

---

# Reference

## Methods

### `create()`

```
static create(config: PanResponderCallbacks): PanResponderInstance;
```

The `config` object provides enhanced versions of all of the responder callbacks that provide not only the `PressEvent`, but also the `PanResponder` gesture state, by replacing the word `Responder` with `PanResponder` in each of the typical `onResponder*` callbacks:

- `onMoveShouldSetPanResponder: (e, gestureState) => {...}`
- `onMoveShouldSetPanResponderCapture: (e, gestureState) => {...}`
- `onStartShouldSetPanResponder: (e, gestureState) => {...}`
- `onStartShouldSetPanResponderCapture: (e, gestureState) => {...}`
- `onPanResponderReject: (e, gestureState) => {...}`
- `onPanResponderGrant: (e, gestureState) => {...}`
- `onPanResponderStart: (e, gestureState) => {...}`
- `onPanResponderEnd: (e, gestureState) => {...}`
- `onPanResponderRelease: (e, gestureState) => {...}`
- `onPanResponderMove: (e, gestureState) => {...}`
- `onPanResponderTerminate: (e, gestureState) => {...}`
- `onPanResponderTerminationRequest: (e, gestureState) => {...}`
- `onShouldBlockNativeResponder: (e, gestureState) => {...}`

---

## PixelRatio
Source: https://reactnative.dev/docs/pixelratio

`PixelRatio` gives you access to the device's pixel density and font scale.

## Fetching a correctly sized image

You should get a higher resolution image if you are on a high pixel density device. A good rule of thumb is to multiply the size of the image you display by the pixel ratio.

```
const image = getImage({  width: PixelRatio.getPixelSizeForLayoutSize(200),  height: PixelRatio.getPixelSizeForLayoutSize(100),});<Image source={image} style={{width: 200, height: 100}} />;
```

## Pixel grid snapping

In iOS, you can specify positions and dimensions for elements with arbitrary precision, for example 29.674825. But, ultimately the physical display only have a fixed number of pixels. iOS tries to be as faithful as possible to the user value by spreading one original pixel into multiple ones to trick the eye. The downside of this technique is that it makes the resulting element look blurry.

In practice, we found out that developers do not want this feature and they have to work around it by doing manual rounding in order to avoid having blurry elements. In React Native, we are rounding all the pixels automatically.

We have to be careful when to do this rounding. You never want to work with rounded and unrounded values at the same time as you're going to accumulate rounding errors. Having even one rounding error is deadly because a one pixel border may vanish or be twice as big.

In React Native, everything in JavaScript and within the layout engine works with arbitrary precision numbers. It's only when we set the position and dimensions of the native element on the main thread that we round. Also, rounding is done relative to the root rather than the parent, again to avoid accumulating rounding errors.

## Example

---

# Reference

## Methods

### `get()`

```
static get(): number;
```

Returns the device pixel density. Some examples:
- `PixelRatio.get() === 1` - mdpi Android devices
- `PixelRatio.get() === 1.5` - hdpi Android devices
- `PixelRatio.get() === 2` - iPhone SE, 6S, 7, 8, iPhone XR, iPhone 11, xhdpi Android devices
- `PixelRatio.get() === 3` - iPhone 6S Plus, 7 Plus, 8 Plus, iPhone X, XS, XS Max, iPhone 11 Pro, 11 Pro Max, Pixel, Pixel 2, xxhdpi Android devices
- `PixelRatio.get() === 3.5` - Nexus 6, Pixel XL, Pixel 2 XL, xxxhdpi Android devices

---

### `getFontScale()`

```
static getFontScale(): number;
```

Returns the scaling factor for font sizes.
- on Android value reflects the user preference set in **Settings > Display > Font size**
- on iOS value reflects the user preference set in **Settings > Display & Brightness > Text Size**, value can also be updated in **Settings > Accessibility > Display & Text Size > Larger Text**

If a font scale is not set, this returns the device pixel ratio.

---

### `getPixelSizeForLayoutSize()`

```
static getPixelSizeForLayoutSize(layoutSize: number): number;
```

Converts a layout size (dp) to pixel size (px). Guaranteed to return an integer number.

---

### `roundToNearestPixel()`

```
static roundToNearestPixel(layoutSize: number): number;
```

Rounds a layout size (dp) to the nearest layout size that corresponds to an integer number of pixels. For example, on a device with a PixelRatio of 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, which corresponds to exactly (8.33 * 3) = 25 pixels.

---


## Platform
Source: https://reactnative.dev/docs/platform

## Example

---

# Reference

## Properties

### `constants`

```
static constants: PlatformConstants;
```

Returns an object which contains all available common and specific constants related to the platform.

**Properties:**

| Name | Type | Optional | Description |
|---|---|---|---|
| isTesting | boolean | No | |
| reactNativeVersion | object | No | Information about React Native version. Keys are `major`, `minor`, `patch` with optional `prerelease` and values are `number`s. |
| Version (Android) | number | No | OS version constant specific to Android. |
| Release (Android) | string | No | |
| Serial (Android) | string | No | Hardware serial number of an Android device. |
| Fingerprint (Android) | string | No | A string that uniquely identifies the build. |
| Model (Android) | string | No | The end-user-visible name for the Android device. |
| Brand (Android) | string | No | The consumer-visible brand with which the product/hardware will be associated. |
| Manufacturer (Android) | string | No | The manufacturer of the Android device. |
| ServerHost (Android) | string | Yes | |
| uiMode (Android) | string | No | Possible values are: `'car'`, `'desk'`, `'normal'`,`'tv'`, `'watch'` and `'unknown'`. |
| forceTouchAvailable (iOS) | boolean | No | Indicate the availability of 3D Touch on a device. |
| interfaceIdiom (iOS) | string | No | The interface type for the device. |
| osVersion (iOS) | string | No | OS version constant specific to iOS. |
| systemName (iOS) | string | No | OS name constant specific to iOS. |

### `isPad` (iOS)

```
static isPad: boolean;
```

Returns a boolean which defines if device is an iPad. Type: boolean

### `isTV`

```
static isTV: boolean;
```

Returns a boolean which defines if device is a TV. Type: boolean

### `isVision`

```
static isVision: boolean;
```

Returns a boolean which defines if device is an Apple Vision. *If you are using Apple Vision Pro (Designed for iPad) `isVision` will be `false` but `isPad` will be `true`*. Type: boolean

### `isTesting`

```
static isTesting: boolean;
```

Returns a boolean which defines if application is running in Developer Mode with testing flag set. Type: boolean

### `OS`

```
static OS: 'android' | 'ios';
```

Returns string value representing the current OS. Type: enum(`'android'`, `'ios'`)

### `Version`

```
static Version: 'number' | 'string';
```

Returns the version of the OS. Type: number (Android) | string (iOS)

## Methods

### `select()`

```
static select(config: Record<string, T>): T;
```

Returns the most fitting value for the platform you are currently running on.

**Parameters:** `config` - object with keys: `android`, `ios`, `native`, `default` (any type).

**Example usage:**

```
import {Platform, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: { backgroundColor: 'green' },
      ios: { backgroundColor: 'red' },
      default: { backgroundColor: 'blue' },
    }),
  },
});
```

`select` can also return platform-specific components:

```
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();
<Component />;
```

```
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();
<Component />;
```

---

## PlatformColor
Source: https://reactnative.dev/docs/platformcolor

```
PlatformColor(color1, [color2, ...colorN]);
```

You can use the `PlatformColor` function to access native colors on the target platform by supplying the native color's corresponding string value. You pass a string to the `PlatformColor` function and, provided it exists on that platform, it will return the corresponding native color, which you can apply in any part of your application.

If you pass more than one string value to the `PlatformColor` function, it will treat the first value as the default and the rest as fallback.

```
PlatformColor('bogusName', 'linkColor');
```

Since native colors can be sensitive to themes and/or high contrast, this platform specific logic also translates inside your components.

### Supported colors

For a full list of the types of system colors supported, see:

- Android:
  - [R.attr](https://developer.android.com/reference/android/R.attr) - `?attr` prefix
  - [R.color](https://developer.android.com/reference/android/R.color) - `@android:color` prefix
- iOS (Objective-C and Swift notations):
  - [UIColor Standard Colors](https://developer.apple.com/documentation/uikit/uicolor/standard_colors)
  - [UIColor UI Element Colors](https://developer.apple.com/documentation/uikit/uicolor/ui_element_colors)

### Example

The string value provided to the `PlatformColor` function must match the string as it exists on the native platform where the app is running. In order to avoid runtime errors, the function should be wrapped in a platform check, either through a `Platform.OS === 'platform'` or a `Platform.select()`.

---

## RootTag
Source: https://reactnative.dev/docs/roottag

`RootTag` is an opaque identifier assigned to the native root view of your React Native surface — i.e. the `ReactRootView` or `RCTRootView` instance for Android or iOS respectively. In short, it is a surface identifier.

### When to use a RootTag?

For most React Native developers, you likely won't need to deal with `RootTag`s.

`RootTag`s are useful for when an app renders **multiple React Native root views** and you need to handle native API calls differently depending on the surface. An example of this is when an app is using native navigation and each screen is a separate React Native root view.

### How to access the RootTag... if you need it

Access `RootTag` via the `RootTagContext`:

```
import {RootTagContext} from 'react-native';
import NativeAnalytics from 'native-analytics';
import NativeNavigation from 'native-navigation';

function ScreenA() {
  const rootTag = useContext(RootTagContext);
  const updateTitle = title => {
    NativeNavigation.setTitle(rootTag, title);
  };
  const handleOneEvent = () => {
    NativeAnalytics.logEvent(rootTag, 'one_event');
  };
  // ...
}

class ScreenB extends React.Component {
  static contextType: typeof RootTagContext = RootTagContext;
  updateTitle(title) {
    NativeNavigation.setTitle(this.context, title);
  }
  handleOneEvent() {
    NativeAnalytics.logEvent(this.context, 'one_event');
  }
  // ...
}
```

### Breaking Change in 0.65

`RootTagContext` was formerly named `unstable_RootTagContext` and changed to `RootTagContext` in 0.65.

### Breaking Change in 0.66

The legacy context access to `RootTag` will be removed and replaced by `RootTagContext`.

### Future Plans

With the new React Native architecture progressing, there will be future iterations to `RootTag`, with the intention to keep the `RootTag` type opaque.

---

## Share
Source: https://reactnative.dev/docs/share

## Example

## Reference

### Methods

#### `share()`

```
static share(content: ShareContent, options?: ShareOptions);
```

Open a dialog to share text content.

In iOS, returns a Promise which will be invoked with an object containing `action` and `activityType`. If the user dismissed the dialog, the Promise will still be resolved with action being `Share.dismissedAction`.

In Android, returns a Promise which will always be resolved with action being `Share.sharedAction`.

**Properties:**

- `content` (required): object with `message` (a message to share), `url` (a URL to share - iOS), `title` (title of the message - Android). At least one of `url` and `message` is required.
- `options` (object): `dialogTitle` (Android), `excludedActivityTypes` (iOS), `subject` (a subject to share via email - iOS), `tintColor` (iOS), `anchor` (the node to which the action sheet should be anchored, used for iPad - iOS).

### Properties

#### `sharedAction`

```
static sharedAction: 'sharedAction';
```

The content was successfully shared.

#### `dismissedAction` (iOS)

```
static dismissedAction: 'dismissedAction';
```

The dialog has been dismissed.

---

## StyleSheet
Source: https://reactnative.dev/docs/stylesheet

A StyleSheet is an abstraction similar to CSS StyleSheets.

Code quality tips:
- By moving styles away from the render function, you're making the code easier to understand.
- Naming the styles is a good way to add meaning to the low level components in the render function, and encourage reuse.
- In most IDEs, using `StyleSheet.create()` will offer static type checking and suggestions to help you write valid styles.

## Reference

### Methods

#### `compose()`

```
static compose(style1: Object, style2: Object): Object | Object[];
```

Combines two styles such that `style2` will override any styles in `style1`.

#### `create()`

```
static create(styles: Object extends Record<string, ViewStyle | ImageStyle | TextStyle>): Object;
```

An identity function for creating styles.

#### `flatten()`

```
static flatten(style: Array<Object extends Record<string, ViewStyle | ImageStyle | TextStyle>>): Object;
```

Flattens an array of style objects, into one aggregated style object.

#### `setStyleAttributePreprocessor()` (Experimental)

```
static setStyleAttributePreprocessor(property: string, process: (propValue: any) => any);
```

Sets a function to use to pre-process a style property value.

### Properties

#### `absoluteFill`

A very common pattern is to create overlays with position absolute and zero positioning (`position: 'absolute', left: 0, right: 0, top: 0, bottom: 0`), so `absoluteFill` can be used for convenience.

#### `hairlineWidth`

This is defined as the width of a thin line on the platform. It can be used as the thickness of a border or division between two elements. This constant will always be a round number of pixels.

---

## Systrace
Source: https://reactnative.dev/docs/systrace

`Systrace` is a standard Android marker-based profiling tool (and is installed when you install the Android platform-tools package). Profiled code blocks are surrounded by start/end markers which are then visualized in a colorful chart format.

## Example

## Reference

### Methods

#### `isEnabled()`

```
static isEnabled(): boolean;
```

#### `beginEvent()`

```
static beginEvent(eventName: string | (() => string), args?: EventArgs);
```

beginEvent/endEvent for starting and then ending a profile within the same call stack frame.

#### `endEvent()`

```
static endEvent(args?: EventArgs);
```

#### `beginAsyncEvent()`

```
static beginAsyncEvent(eventName: string | (() => string), args?: EventArgs): number;
```

beginAsyncEvent/endAsyncEvent for starting and then ending a profile where the end can either occur on another thread or out of the current stack frame, eg await the returned cookie variable should be used as input into the endAsyncEvent call to end the profile.

#### `endAsyncEvent()`

```
static endAsyncEvent(eventName: EventName, cookie: number, args?: EventArgs);
```

#### `counterEvent()`

```
static counterEvent(eventName: string | (() => string), value: number);
```

Register the value to the profileName on the systrace timeline.

---

## Transforms
Source: https://reactnative.dev/docs/transforms

Transforms are style properties that will help you modify the appearance and position of your components using 2D or 3D transformations. However, once you apply transforms, the layouts remain the same around the transformed component hence it might overlap with the nearby components.

## Example

## Reference

### Transform

`transform` accepts an array of transformation objects or space-separated string values.

The rotate transformations require a string so that the transform may be expressed in degrees (deg) or radians (rad). For example:

```
{ transform: [{rotateX: '45deg'}, {rotateZ: '0.785398rad'}] }
```

Space-separated string equivalent:

```
{ transform: 'rotateX(45deg) rotateZ(0.785398rad)' }
```

The skew transformations require a string so that the transform may be expressed in degrees (deg).

### Matrix Transform

The `matrix` transform accepts a 4x4 transformation matrix as an array of 16 numbers in column-major order:

```
{
  transform: [{
    matrix: [
      scaleX, skewY, 0, 0,
      skewX, scaleY, 0, 0,
      0,     0,      1, 0,
      translateX, translateY, 0, 1,
    ],
  }]
}
```

| Type | Required |
|---|---|
| array of objects: `{matrix: number[]}`, `{perspective: number}`, `{rotate: string}`, `{rotateX: string}`, `{rotateY: string}`, `{rotateZ: string}`, `{scale: number}`, `{scaleX: number}`, `{scaleY: number}`, `{translateX: number}`, `{translateY: number}`, `{skewX: string}`, `{skewY: string}` or string | No |

### 🗑️ `decomposedMatrix`, `rotation`, `scaleX`, `scaleY`, `transformMatrix`, `translateX`, `translateY` (Deprecated)

Use the `transform` prop instead.

### Transform Origin

The `transformOrigin` property sets the origin for a view's transformations. By default, the origin of a transform is `center`.

Supports `px`, `percentage` and keywords `top`, `left`, `right`, `bottom`, `center` values.

**One-value syntax:**
```
{ transformOrigin: '20px', transformOrigin: 'bottom' }
```

**Two-value syntax:**
```
{ transformOrigin: '10px 2px', transformOrigin: 'left top', transformOrigin: 'top right' }
```

**Three-value syntax:**
```
{ transformOrigin: '2px 30% 10px', transformOrigin: 'right bottom 20px' }
```

**Array syntax:**
```
{ transformOrigin: [10, 30, 40] }
{ transformOrigin: [10, '20%', 0] }
```

---

## Vibration
Source: https://reactnative.dev/docs/vibration

Vibrates the device.

## Example

Android apps should request the `android.permission.VIBRATE` permission by adding `<uses-permission android:name="android.permission.VIBRATE"/>` to `AndroidManifest.xml`.

The Vibration API is implemented as a `AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)` call on iOS.

## Reference

### Methods

#### `cancel()`

```
static cancel();
```

Call this to stop vibrating after having invoked `vibrate()` with repetition enabled.

#### `vibrate()`

```
static vibrate(pattern?: number | number[], repeat?: boolean);
```

Triggers a vibration with a fixed duration.

**On Android,** the vibration duration defaults to 400 milliseconds. **On iOS,** the vibration duration is fixed at roughly 400 milliseconds.

The `vibrate()` method can take a `pattern` argument with an array of numbers that represent time in milliseconds. You may set `repeat` to true to run through the vibration pattern in a loop until `cancel()` is called.

**Parameters:**

| Name | Type | Default | Description |
|---|---|---|---|
| pattern | number (Android) or array of numbers | `400` | Vibration duration in milliseconds or vibration pattern as an array of numbers in milliseconds |
| repeat | boolean | `false` | Repeat vibration pattern until `cancel()` |

---

## ✨ \_\_DEV\_\_
Source: https://reactnative.dev/docs/global-__DEV__

You can use the `__DEV__` pseudo-global variable in the codebase to guard development-only blocks of code.

It is inlined during compilation and gets completely stripped out with the `if` blocks it guards in the minified build.

---

## useColorScheme
Source: https://reactnative.dev/docs/usecolorscheme

```
import {useColorScheme} from 'react-native';
```

The `useColorScheme` React hook provides and subscribes to color scheme updates from the `Appearance` module. The return value indicates the active color scheme.

### Return values

- `'light'`: The light color scheme is applied.
- `'dark'`: The dark color scheme is applied.
- `'unspecified'`: ***Never returned*** (incorrectly typed).
- `null`: May be returned if the native Appearance module is not available.

## Example

---

## useWindowDimensions
Source: https://reactnative.dev/docs/usewindowdimensions

```
import {useWindowDimensions} from 'react-native';
```

`useWindowDimensions` automatically updates all of its values when screen size or font scale changes.

```
const {height, width} = useWindowDimensions();
```

## Example

## Properties

### `fontScale`

```
useWindowDimensions().fontScale;
```

The scale of the font currently used.

### `height`

```
useWindowDimensions().height;
```

The height in pixels of the window or screen your app occupies.

### `scale`

```
useWindowDimensions().scale;
```

The pixel ratio of the device your app is running on. Values can be: `1`, `2` or `3`.

### `width`

```
useWindowDimensions().width;
```

The width in pixels of the window or screen your app occupies.

---

## BackHandler
Source: https://reactnative.dev/docs/backhandler

The Backhandler API detects hardware button presses for back navigation, lets you register event listeners for the system's back action, and lets you control how your application responds. It is Android-only.

The event subscriptions are called in reverse order (i.e. the last registered subscription is called first).

- **If one subscription returns true,** then subscriptions registered earlier will not be called.
- **If no subscription returns true or none are registered,** it programmatically invokes the default back button functionality to exit the app.

### Pattern

```
const subscription = BackHandler.addEventListener(
  'hardwareBackPress',
  function () {
    if (!this.onMainScreen()) {
      this.goBack();
      return true;
    }
    return false;
  },
);
subscription.remove();
```

## Example

`BackHandler.addEventListener` creates an event listener & returns a `NativeEventSubscription` object which should be cleared using `NativeEventSubscription.remove` method.

## Usage with React Navigation

If you are using React Navigation to navigate across different screens, you can follow their guide on [Custom Android back button behaviour](https://reactnavigation.org/docs/custom-android-back-button-handling/).

## Reference

### Methods

#### `addEventListener()`

```
static addEventListener(eventName: BackPressEventName, handler: () => boolean | null | undefined): NativeEventSubscription;
```

#### `exitApp()`

```
static exitApp();
```

---

## PermissionsAndroid
Source: https://reactnative.dev/docs/permissionsandroid

### Project with Native Code Required

`PermissionsAndroid` provides access to Android M's new permissions model. The so-called "normal" permissions are granted by default when the application is installed as long as they appear in `AndroidManifest.xml`. However, "dangerous" permissions require a dialog prompt.

On devices before SDK version 23, the permissions are automatically granted if they appear in the manifest, so `check` should always result to `true` and `request` should always resolve to `PermissionsAndroid.RESULTS.GRANTED`.

### Example

### Permissions that require prompting the user

Available as constants under `PermissionsAndroid.PERMISSIONS`:
`READ_CALENDAR`, `WRITE_CALENDAR`, `CAMERA`, `READ_CONTACTS`, `WRITE_CONTACTS`, `GET_ACCOUNTS`, `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`, `ACCESS_BACKGROUND_LOCATION`, `RECORD_AUDIO`, `READ_PHONE_STATE`, `CALL_PHONE`, `READ_CALL_LOG`, `WRITE_CALL_LOG`, `ADD_VOICEMAIL`, `USE_SIP`, `PROCESS_OUTGOING_CALLS`, `BODY_SENSORS`, `SEND_SMS`, `RECEIVE_SMS`, `READ_SMS`, `RECEIVE_WAP_PUSH`, `RECEIVE_MMS`, `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`, `BLUETOOTH_CONNECT`, `BLUETOOTH_SCAN`, `BLUETOOTH_ADVERTISE`, `ACCESS_MEDIA_LOCATION`, `ACCEPT_HANDOVER`, `ACTIVITY_RECOGNITION`, `ANSWER_PHONE_CALLS`, `READ_PHONE_NUMBERS`, `UWB_RANGING`, `BODY_SENSORS_BACKGROUND`, `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`, `READ_MEDIA_AUDIO`, `POST_NOTIFICATIONS`, `NEARBY_WIFI_DEVICES`, `READ_VOICEMAIL`, `WRITE_VOICEMAIL`.

### Result strings for requesting permissions

Available as constants under `PermissionsAndroid.RESULTS`:
- `GRANTED`: 'granted'
- `DENIED`: 'denied'
- `NEVER_ASK_AGAIN`: 'never_ask_again'

## Reference

### Methods

#### `check()`

```
static check(permission: Permission): Promise<boolean>;
```

#### `request()`

```
static request(permission: Permission, rationale?: Rationale): Promise<PermissionStatus>;
```

**Rationale:** object with `title`, `message`, `buttonPositive` (required), `buttonNegative`, `buttonNeutral` (optional).

#### `requestMultiple()`

```
static requestMultiple(permissions: Permission[]): Promise<{[key in Permission]: PermissionStatus}>;
```

---

## ToastAndroid
Source: https://reactnative.dev/docs/toastandroid

React Native's ToastAndroid API exposes the Android platform's ToastAndroid module as a JS module. It provides the method `show(message, duration)` which takes the following parameters:
- *message* A string with the text to toast
- *duration* The duration of the toast—either `ToastAndroid.SHORT` or `ToastAndroid.LONG`

You can alternatively use `showWithGravity(message, duration, gravity)` to specify where the toast appears in the screen's layout. May be `ToastAndroid.TOP`, `ToastAndroid.BOTTOM` or `ToastAndroid.CENTER`.

The `showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)` method adds the ability to specify an offset with in pixels.

Starting with Android 11 (API level 30), setting the gravity has no effect on text toasts.

## Reference

### Methods

#### `show()`

```
static show(message: string, duration: number);
```

#### `showWithGravity()`

This property will only work on Android API 29 and below.

```
static showWithGravity(message: string, duration: number, gravity: number);
```

#### `showWithGravityAndOffset()`

This property will only work on Android API 29 and below.

```
static showWithGravityAndOffset(message: string, duration: number, gravity: number, xOffset: number, yOffset: number);
```

### Properties

- `SHORT`: number
- `LONG`: number
- `TOP`: number
- `BOTTOM`: number
- `CENTER`: number

---

## ActionSheetIOS
Source: https://reactnative.dev/docs/actionsheetios

Displays native to iOS Action Sheet component.

## Example

## Reference

### Methods

#### `showActionSheetWithOptions()`

```
static showActionSheetWithOptions: (options: ActionSheetIOSOptions, callback: (buttonIndex: number) => void);
```

Display an iOS action sheet. The `options` object must contain one or more of:
- `options` (array of strings) - a list of button titles (required)
- `cancelButtonIndex` (int) - index of cancel button in `options`
- `cancelButtonTintColor` (string) - the color used for the change the text color of the cancel button
- `destructiveButtonIndex` (int or array of ints) - indices of destructive buttons in `options`
- `title` (string) - a title to show above the action sheet
- `message` (string) - a message to show below the title
- `anchor` (number) - the node to which the action sheet should be anchored (used for iPad)
- `tintColor` (string) - the color used for non-destructive button titles
- `disabledButtonIndices` (array of numbers) - a list of button indices which should be disabled
- `userInterfaceStyle` (string) - the interface style used for the action sheet, can be set to `light` or `dark`

#### `dismissActionSheet()`

```
static dismissActionSheet();
```

#### `showShareActionSheetWithOptions()`

```
static showShareActionSheetWithOptions: (options: ShareActionSheetIOSOptions, failureCallback: (error: Error) => void, successCallback: (success: boolean, method: string) => void);
```

Display the iOS share sheet. The `options` object should contain one or both of `message` and `url` and can additionally have a `subject` or `excludedActivityTypes`:
- `url` (string) - a URL to share
- `message` (string) - a message to share
- `subject` (string) - a subject for the message
- `excludedActivityTypes` (array) - the activities to exclude from the ActionSheet

---

## DynamicColorIOS
Source: https://reactnative.dev/docs/dynamiccolorios

The `DynamicColorIOS` function is a platform color type specific to iOS.

```
DynamicColorIOS({
  light: color,
  dark: color,
  highContrastLight: color, // (optional) will fallback to "light" if not provided
  highContrastDark: color, // (optional) will fallback to "dark" if not provided
});
```

`DynamicColorIOS` takes a single argument as an object with two mandatory keys: `dark` and `light`, and two optional keys `highContrastLight` and `highContrastDark`. These correspond to the colors you want to use for "light mode" and "dark mode" on iOS, and when high contrast accessibility mode is enabled, high contrast version of them.

### Example

```
import {DynamicColorIOS} from 'react-native';

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue',
});

const customContrastDynamicTextColor = DynamicColorIOS({
  dark: 'darkgray',
  light: 'lightgray',
  highContrastDark: 'black',
  highContrastLight: 'white',
});
```

---

## Settings
Source: https://reactnative.dev/docs/settings

`Settings` serves as a wrapper for `NSUserDefaults`, a persistent key-value store available only on iOS.

## Example

## Reference

### Methods

#### `clearWatch()`

```
static clearWatch(watchId: number);
```

`watchId` is the number returned by `watchKeys()` when the subscription was originally configured.

#### `get()`

```
static get(key: string): any;
```

Get the current value for a given `key` in `NSUserDefaults`.

#### `set()`

```
static set(settings: Record<string, any>);
```

Set one or more values in `NSUserDefaults`.

#### `watchKeys()`

```
static watchKeys(keys: string | array<string>, callback: () => void): number;
```

Subscribe to be notified when the value for any of the keys specified by the `keys` parameter has been changed in `NSUserDefaults`. Returns a `watchId` number that may be used with `clearWatch()` to unsubscribe.

`watchKeys()` by design ignores internal `set()` calls and fires callback only on changes preformed outside of React Native code.

---

## Nodes from refs
Source: https://reactnative.dev/docs/nodes

React Native apps render a native view tree that represents the UI, similar to how React DOM does on Web (the DOM tree). React Native provides imperative access to this tree via refs, which are returned by all native components.

React Native provides 3 types of nodes:

- **Elements**: element nodes represent native components in the native view tree (similar to Element nodes on Web). They are provided by all native components via refs.
- **Text**: text nodes represent raw text content on the tree (similar to Text nodes on Web). They are not directly accessible via `refs`, but can be accessed using methods like `childNodes` on element refs.
- **Documents**: document nodes represent a complete native view tree (similar to Document nodes on Web). Like text nodes, they can only be accessed through other nodes, using properties like `ownerDocument`.

As on Web, these nodes can be used to traverse the rendered UI tree, access layout information or execute imperative operations like `focus`.

**Unlike on Web, these nodes do not allow mutation** (e.g.: `node.appendChild`), as the tree contents are fully managed by the React renderer.

---

## Element nodes
Source: https://reactnative.dev/docs/element-nodes

Element nodes represent native components in the native view tree (similar to Element nodes on Web).

They are provided by all native components, and by many built-in components, via refs.

## Reference

### Web-compatible API

From `HTMLElement`:
- **Properties**: `offsetHeight`, `offsetLeft`, `offsetParent`, `offsetTop`, `offsetWidth`
- **Methods**: `blur()`, `focus()` (⚠️ `options` parameter not supported)

From `Element`:
- **Properties**: `childElementCount`, `children`, `clientHeight`, `clientLeft`, `clientTop`, `clientWidth`, `firstElementChild`, `id` (ℹ️ Returns the value of the `id` or `nativeID` props), `lastElementChild`, `nextElementSibling`, `nodeName`, `nodeType`, `nodeValue`, `previousElementSibling`, `scrollHeight`, `scrollLeft` (⚠️ only `ScrollView` instances can return a value other than zero), `scrollTop` (⚠️ only `ScrollView` instances can return a value other than zero), `scrollWidth`, `tagName` (ℹ️ Returns a normalized native component name prefixed with `RN:`, like `RN:View`), `textContent`
- **Methods**: `getBoundingClientRect()`, `hasPointerCapture()`, `setPointerCapture()`, `releasePointerCapture()`

From `Node`:
- **Properties**: `childNodes`, `firstChild`, `isConnected`, `lastChild`, `nextSibling`, `nodeName`, `nodeType`, `nodeValue`, `ownerDocument` (ℹ️ Will return the document node where this component was rendered), `parentElement`, `parentNode`, `previousSibling`, `textContent`
- **Methods**: `compareDocumentPosition()`, `contains()`, `getRootNode()` (ℹ️ Will return a reference to itself if the component is not mounted), `hasChildNodes()`

### Legacy API

- `measure()`
- `measureInWindow()`
- `measureLayout()`
- `setNativeProps()`

---

## Text nodes
Source: https://reactnative.dev/docs/text-nodes

Text nodes represent raw text content on the tree (similar to Text nodes on Web). They are not directly accessible via `refs`, but can be accessed using methods like `childNodes` on element refs.

## Reference

### Web-compatible API

From `CharacterData`:
- **Properties**: `data`, `length`, `nextElementSibling`, `previousElementSibling`
- **Methods**: `substringData()`

From `Node`:
- **Properties**: `childNodes`, `firstChild`, `isConnected`, `lastChild`, `nextSibling`, `nodeName`, `nodeType`, `nodeValue`, `ownerDocument` (ℹ️ Will return the document node where this component was rendered), `parentElement`, `parentNode`, `previousSibling`, `textContent`
- **Methods**: `compareDocumentPosition()`, `contains()`, `getRootNode()` (ℹ️ Will return a reference to itself if the component is not mounted), `hasChildNodes()`

---

## Document nodes
Source: https://reactnative.dev/docs/document-nodes

Document nodes represent a complete native view tree. Apps using native navigation would provide a separate document node for each screen. Apps not using native navigation would generally provide a single document for the whole app (similar to single-page apps on Web).

## Reference

### Web-compatible API

From `Document`:
- **Properties**: `childElementCount`, `children`, `documentElement`, `firstElementChild`, `lastElementChild`
- **Methods**: `getElementById()`

From `Node`:
- **Properties**: `childNodes`, `firstChild`, `isConnected`, `lastChild`, `nextSibling`, `nodeName`, `nodeType`, `nodeValue`, `ownerDocument`, `parentElement`, `parentNode`, `previousSibling`, `textContent`
- **Methods**: `compareDocumentPosition()`, `contains()`, `getRootNode()`, `hasChildNodes()`

---

## Image Style Props
Source: https://reactnative.dev/docs/image-style-props

## Examples: Image Resize Mode, Image Border, Image Border Radius, Image Tint

## Reference

### Props

#### `backfaceVisibility`
Type: enum(`'visible'`, `'hidden'`), Default: `'visible'`

#### `backgroundColor`
Type: color

#### `borderBottomLeftRadius`
Type: number

#### `borderBottomRightRadius`
Type: number

#### `borderColor`
Type: color

#### `borderRadius`
Type: number

#### `borderTopLeftRadius`
Type: number

#### `borderTopRightRadius`
Type: number

#### `borderWidth`
Type: number

#### `opacity`
Set an opacity value for the image. The number should be in the range from `0.0` to `1.0`. Type: number, Default: `1.0`

#### `overflow`
Type: enum(`'visible'`, `'hidden'`), Default: `'visible'`

#### `overlayColor` (Android)
When the image has rounded corners, specifying an overlayColor will cause the remaining space in the corners to be filled with a solid color. Type: string

#### `resizeMode`
Determines how to resize the image when the frame doesn't match the raw image dimensions.
- `cover`: Scale the image uniformly so that both dimensions are equal to or larger than the view.
- `contain`: Scale the image uniformly so that both dimensions are equal to or less than the view.
- `stretch`: Scale width and height independently.
- `repeat`: Repeat the image to cover the frame.
- `center`: Center the image in the view.
Type: enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`), Default: `'cover'`

#### `objectFit`
Type: enum(`'cover'`, `'contain'`, `'fill'`, `'scale-down'`), Default: `'cover'`

#### `tintColor`
Changes the color of all the non-transparent pixels to the tintColor. Type: color

---

## Layout Props
Source: https://reactnative.dev/docs/layout-props

## Reference

### Props

`alignContent`: enum('flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly')
`alignItems`: enum('flex-start', 'flex-end', 'center', 'stretch', 'baseline')
`alignSelf`: enum('auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline')
`aspectRatio`: number, string
`borderBottomWidth`: number
`borderEndWidth`: number
`borderLeftWidth`: number
`borderRightWidth`: number
`borderStartWidth`: number
`borderTopWidth`: number
`borderWidth`: number
`bottom`: number, string
`boxSizing`: enum('border-box', 'content-box')
`columnGap`: number
`direction`: enum('inherit', 'ltr', 'rtl')
`display`: enum('none', 'flex', 'contents')
`end`: number, string
`flex`: number
`flexBasis`: number, string
`flexDirection`: enum('row', 'row-reverse', 'column', 'column-reverse')
`flexGrow`: number
`flexShrink`: number
`flexWrap`: enum('wrap', 'nowrap', 'wrap-reverse')
`gap`: number
`height`: number, string
`inset` (New Architecture only): number, string
`insetBlock` (New Architecture only): number, string
`insetBlockEnd` (New Architecture only): number, string
`insetBlockStart` (New Architecture only): number, string
`insetInline` (New Architecture only): number, string
`insetInlineEnd` (New Architecture only): number, string
`insetInlineStart` (New Architecture only): number, string
`isolation` (New Architecture only): enum('auto', 'isolate')
`justifyContent`: enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly')
`left`: number, string
`margin`: number, string
`marginBottom`: number, string
`marginBlock`: number, string
`marginBlockEnd`: number, string
`marginBlockStart`: number, string
`marginEnd`: number, string
`marginHorizontal`: number, string
`marginInline`: number, string
`marginInlineEnd`: number, string
`marginInlineStart`: number, string
`marginLeft`: number, string
`marginRight`: number, string
`marginStart`: number, string
`marginTop`: number, string
`marginVertical`: number, string
`maxHeight`: number, string
`maxWidth`: number, string
`minHeight`: number, string
`minWidth`: number, string
`overflow`: enum('visible', 'hidden', 'scroll')
`padding`: number, string
`paddingBottom`: number, string
`paddingBlock`: number, string
`paddingBlockEnd`: number, string
`paddingBlockStart`: number, string
`paddingEnd`: number, string
`paddingHorizontal`: number, string
`paddingInline`: number, string
`paddingInlineEnd`: number, string
`paddingInlineStart`: number, string
`paddingLeft`: number, string
`paddingRight`: number, string
`paddingStart`: number, string
`paddingTop`: number, string
`paddingVertical`: number, string
`position`: enum('absolute', 'relative', 'static')
`right`: number, string
`rowGap`: number
`start`: number, string
`top`: number, string
`width`: number, string
`zIndex`: number

---

## Shadow Props
Source: https://reactnative.dev/docs/shadow-props

There are 3 sets of shadow APIs in React Native:
- `boxShadow`: A View style prop and a spec-compliant implementation of the web style prop.
- `dropShadow`: A specific filter function available as part of the `filter` View style prop.
- Various `shadow` props (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`): These map directly to their native counterparts.

The difference between `dropShadow` and `boxShadow`:
- `dropShadow` exists as part of `filter`, whereas `boxShadow` is a standalone style prop.
- `dropShadow` is an alpha mask, so only pixels with a positive alpha value will "cast" a shadow.
- `dropShadow` is only available on Android, `boxShadow` is available on iOS and Android.
- `dropShadow` cannot be inset like `boxShadow`.
- `dropShadow` does not have the `spreadDistance` argument like `boxShadow`.

## Props

### `boxShadow`
See View Style Props for documentation.

### `dropShadow` (Android)
See View Style Props for documentation.

### `shadowColor`
Sets the drop shadow color. This property will only work on Android API 28 and above. Type: color

### `shadowOffset` (iOS)
Sets the drop shadow offset. Type: object: `{width: number, height: number}`

### `shadowOpacity` (iOS)
Sets the drop shadow opacity (multiplied by the color's alpha component). Type: number

### `shadowRadius` (iOS)
Sets the drop shadow blur radius. Type: number

---

## Text Style Props
Source: https://reactnative.dev/docs/text-style-props

## Reference

### Props

`color`: color
`fontFamily`: string (generic font families `system-ui`, `ui-sans-serif`, `ui-serif`, `ui-monospace`, `ui-rounded` are supported on iOS)
`fontSize`: number
`fontStyle`: enum(`'normal'`, `'italic'`)
`fontWeight`: enum(`'normal'`, `'bold'`, `'100'`, `'200'`, `'300'`, `'400'`, `'500'`, `'600'`, `'700'`, `'800'`, `'900'`) or number, Default: `'normal'`
`includeFontPadding` (Android): bool, Default: `true`
`fontVariant`: array of enum(`'small-caps'`, `'oldstyle-nums'`, `'lining-nums'`, `'tabular-nums'`, `'proportional-nums'`) or string, Default: `[]`
`letterSpacing`: number
`lineHeight`: number
`textAlign`: enum(`'auto'`, `'left'`, `'right'`, `'center'`, `'justify'`), Default: `'auto'`
`textAlignVertical` (Android): enum(`'auto'`, `'top'`, `'bottom'`, `'center'`), Default: `'auto'`
`textDecorationColor` (iOS): color
`textDecorationLine`: enum(`'none'`, `'underline'`, `'line-through'`, `'underline line-through'`), Default: `'none'`
`textDecorationStyle` (iOS): enum(`'solid'`, `'double'`, `'dotted'`, `'dashed'`), Default: `'solid'`
`textShadowColor`: color
`textShadowOffset`: object: `{width?: number, height?: number}`
`textShadowRadius`: number
`textTransform`: enum(`'none'`, `'uppercase'`, `'lowercase'`, `'capitalize'`), Default: `'none'`
`verticalAlign` (Android): enum(`'auto'`, `'top'`, `'bottom'`, `'middle'`), Default: `'auto'`
`writingDirection` (iOS): enum(`'auto'`, `'ltr'`, `'rtl'`), Default: `'auto'`
`userSelect`: enum(`'auto'`, `'text'`, `'none'`, `'contain'`, `'all'`), Default: `none`

---

## View Style Props
Source: https://reactnative.dev/docs/view-style-props

### Example

## Reference

### Props

`backfaceVisibility`: enum(`'visible'`, `'hidden'`)
`backgroundColor`: color
`experimental_backgroundImage`: string (linear-gradient, radial-gradient), array of objects
`borderBottomColor`: color
`borderBlockColor`: color
`borderBlockEndColor`: color
`borderBlockStartColor`: color
`borderBottomEndRadius`: number, string (percentage value)
`borderBottomLeftRadius`: number, string (percentage value)
`borderBottomRightRadius`: number, string (percentage value)
`borderBottomStartRadius`: number, string (percentage value)
`borderStartEndRadius`: number, string (percentage value)
`borderStartStartRadius`: number, string (percentage value)
`borderEndEndRadius`: number, string (percentage value)
`borderEndStartRadius`: number, string (percentage value)
`borderBottomWidth`: number
`borderColor`: color
`borderCurve` (iOS): enum(`'circular'`, `'continuous'`)
`borderEndColor`: color
`borderLeftColor`: color
`borderLeftWidth`: number
`borderRadius`: number, string (percentage value)
`borderRightColor`: color
`borderRightWidth`: number
`borderStartColor`: color
`borderStyle`: enum(`'solid'`, `'dotted'`, `'dashed'`)
`borderTopColor`: color
`borderTopEndRadius`: number, string (percentage value)
`borderTopLeftRadius`: number, string (percentage value)
`borderTopRightRadius`: number, string (percentage value)
`borderTopStartRadius`: number, string (percentage value)
`borderTopWidth`: number, string (percentage value)
`borderWidth`: number
`boxShadow` (New Architecture only): array of BoxShadowValue objects | string
`cursor` (iOS): enum(`'auto'`, `'pointer'`)
`elevation` (Android): number
`filter` (New Architecture only): array of filter function objects | string
`mixBlendMode` (New Architecture only, Android 10+): enum(`'normal'`, `'multiply'`, `'screen'`, `'overlay'`, `'darken'`, `'lighten'`, `'color-dodge'`, `'color-burn'`, `'hard-light'`, `'soft-light'`, `'difference'`, `'exclusion'`, `'hue'`, `'saturation'`, `'color'`, `'luminosity'`)
`opacity`: number
`outlineColor` (New Architecture only): color
`outlineOffset` (New Architecture only): number
`outlineStyle` (New Architecture only): enum(`'solid'`, `'dotted'`, `'dashed'`)
`outlineWidth` (New Architecture only): number
`pointerEvents`: enum(`'auto'`, `'box-none'`, `'box-only'`, `'none'`)

---

## BoxShadowValue Object Type
Source: https://reactnative.dev/docs/boxshadowvalue

The `BoxShadowValue` object is taken by the `boxShadow` style prop. It is comprised of 2-4 lengths, an optional color, and an optional `inset` boolean.

### Example
```
{ offsetX: 10, offsetY: -3, blurRadius: '15px', spreadDistance: '10px', color: 'red', inset: true }
```

### Keys and values

`offsetX`: number | string (Required)
`offsetY`: number | string (Required)
`blurRadius`: number | string (Optional) - The larger the value the blurrier the shadow. Only non-negative values. Default: 0.
`spreadDistance`: number | string (Optional) - How much larger or smaller the shadow grows or shrinks.
`color`: color (Optional) - Default: `black`.
`inset`: boolean (Optional) - Whether the shadow is inset or not.

### Used by
- `boxShadow`

---

## DropShadowValue Object Type
Source: https://reactnative.dev/docs/dropshadowvalue

The `DropShadowValue` object is taken by the `filter` style prop for the `dropShadow` function. It is comprised of 2 or 3 lengths and an optional color.

### Example
```
{ offsetX: 10, offsetY: -3, standardDeviation: '15px', color: 'blue' }
```

### Keys and values

`offsetX`: number | string (Required)
`offsetY`: number | string (Required)
`standardDeviation`: number | string (Optional) - The larger the value the blurrier the shadow. Only non-negative values. Default: 0.
`color`: color (Optional) - Default: `black`.

### Used by
- `filter`

---

## LayoutEvent Object Type
Source: https://reactnative.dev/docs/layoutevent

`LayoutEvent` object is returned in the callback as a result of component layout change, for example `onLayout` in View component.

### Example
```
{ layout: { width: 520, height: 70.5, x: 0, y: 42.5 }, target: 1127 }
```

### Keys and values

`height`: number (Required) - Height of the component after the layout changes.
`width`: number (Required) - Width of the component after the layout changes.
`x`: number (Required) - Component X coordinate inside the parent component.
`y`: number (Required) - Component Y coordinate inside the parent component.
`target`: number, `null`, `undefined` (Required) - The node id of the element receiving the LayoutEvent.

### Used by
`Image`, `Pressable`, `ScrollView`, `Text`, `TextInput`, `TouchableWithoutFeedback`, `View`

---

## PressEvent Object Type
Source: https://reactnative.dev/docs/pressevent

`PressEvent` object is returned in the callback as a result of user press interaction, for example `onPress` in Button component.

### Example
```
{ changedTouches: [PressEvent], identifier: 1, locationX: 8, locationY: 4.5, pageX: 24, pageY: 49.5, target: 1127, timestamp: 85131876.58868201, touches: [] }
```

### Keys and values

`changedTouches`: array of PressEvents (Required)
`force` (iOS): number (Optional) - Amount of force used during the 3D Touch press. Range from `0.0` to `1.0`.
`identifier`: number (Required) - Unique numeric identifier assigned to the event.
`locationX`: number (Required) - Touch origin X coordinate inside touchable area.
`locationY`: number (Required) - Touch origin Y coordinate inside touchable area.
`pageX`: number (Required) - Touch origin X coordinate on the screen.
`pageY`: number (Required) - Touch origin Y coordinate on the screen.
`target`: number, `null`, `undefined` (Required) - The node id of the element receiving the PressEvent.
`timestamp`: number (Required) - Timestamp value when a PressEvent occurred in milliseconds.
`touches`: array of PressEvents (Required) - Array of all current PressEvents on the screen.

### Used by
`Button`, `PanResponder`, `Pressable`, `ScrollView`, `Text`, `TextInput`, `TouchableHighlight`, `TouchableOpacity`, `TouchableNativeFeedback`, `TouchableWithoutFeedback`, `View`

---

## React Node Object Type
Source: https://reactnative.dev/docs/react-node

A React Node is one of the following types:
- Boolean (which is ignored)
- `null` or `undefined` (which is ignored)
- Number
- String
- A React element (result of JSX)
- An array of any of the above, possibly a nested one

---

## Rect Object Type
Source: https://reactnative.dev/docs/rect

`Rect` accepts numeric pixel values to describe how far to extend a rectangular area. These values are added to the original area's size to expand it.

### Example
```
{ bottom: 20, left: null, right: undefined, top: 50 }
```

### Keys and values

`bottom`: number, `null`, `undefined` (Required)
`left`: number, `null`, `undefined` (Required)
`right`: number, `null`, `undefined` (Required)
`top`: number, `null`, `undefined` (Required)

### Used by
`Image`, `Pressable`, `Text`, `TouchableWithoutFeedback`

---

## TargetEvent Object Type
Source: https://reactnative.dev/docs/targetevent

`TargetEvent` object is returned in the callback as a result of focus change, for example `onFocus` or `onBlur` in the TextInput component.

### Example
```
{ target: 1127 }
```

### Keys and values

`target`: number, `null`, `undefined` (Required) - The node id of the element receiving the TargetEvent.

### Used by
`TextInput`, `TouchableWithoutFeedback`

---

## ViewToken Object Type
Source: https://reactnative.dev/docs/viewtoken

`ViewToken` object is returned as one of the properties in the `onViewableItemsChanged` callback (for example, in the FlatList component). It is exported by `ViewabilityHelper.js`.

### Example
```
{ item: {key: "key-12"}, key: "key-12", index: 11, isViewable: true }
```

### Keys and values

`index`: number (Optional) - Unique numeric identifier assigned to the data element.
`isViewable`: boolean (Required) - Specifies if at least some part of list element is visible in the viewport.
`item`: any (Required) - Item data.
`key`: string (Required) - Key identifier assigned to the data element extracted to the top level.
`section`: any (Optional) - Item section data when used with `SectionList`.

### Used by
`FlatList`, `SectionList`, `VirtualizedList`
