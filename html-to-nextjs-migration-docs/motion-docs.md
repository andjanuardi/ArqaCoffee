# Motion React Documentation

> Scraped from https://motion.dev/docs

---


## Get started with Motion for React

> Install Motion for React, animate elements with spring animations. Complete guide with examples.

_Source: [https://motion.dev/docs/react](https://motion.dev/docs/react)_

**Motion for React** (previously Framer Motion) is a React animation library for building smooth, production-grade UI animations. You can start with simple prop-based animations before growing to layout, gesture and scroll animations.

Motion's hybrid engine runs animations natively in the browser using the Web Animations API and ScrollTimeline for 120fps performance. When you need capabilities those APIs can't provide (like spring physics, interruptible keyframes, or gesture tracking) it seamlessly falls back to JavaScript.

Motion is trusted by companies like [Framer](https://framer.com) and [Figma](https://figma.com) to power animations for their millions of users, and has over 30 million downloads per month on [npm](https://www.npmjs.com/package/framer-motion).

In this guide, we'll learn **why** and **when** you should use Motion, how to **install** it, and give you an overview of its main features.

## [Why Motion for React?](#why-motion-for-react)

React gives you the power to build dynamic user interfaces, but orchestrating complex, performant animations can be a challenge. Motion is a production-ready React animation library designed to solve this problem, making it simple to create everything from beautiful micro-interactions to complex, gesture-driven animations.

```
import { motion } from "motion/react"
  
function Component() {
  return <motion.button animate={{ opacity: 1 }} />
}
```

### [Key advantages](#key-advantages)

Hereâs when itâs the right choice for your project.

* **Built for React.** While other animation libraries like [GSAP](/docs/gsap-vs-motion) are messy to integrate with React, Motion's declarative API is a natural fit. Animations can be linked directly to state and props.
* **Hardware-acceleration.** Motion leverages the same high-performance browser animations as CSS, ensuring your UIs stay smooth and snappy. 120fps animations with a much simpler and more expressive API.
* **Animate anything.** CSS has hard limits. Values you can't animate, keyframes you can't interrupt, staggers that must be hardcoded. Motion provides a single, consistent API that scales from simple to complex.
* **App-like gestures.** Standard CSS `:hover` events are unreliable on touch devices. Motion provides robust, cross-device gesture recognisers for tap, drag, and hover that feel native and intuitive on any device.
* **Production ready.** Built on TypeScript, surrounded by an extensive test suite, and fully tree-shakable so you only include what you import.

### [When is CSS a better choice?](#when-is-css-a-better-choice)

For simple, self-contained effects (like a color change on hover) a standard CSS transition is a lightweight solution. The strength of Motion is that it can do these simple kinds of animations but also scale to anything you can imagine. All with the same easy to write and maintain API.

## [Install](#install)

Motion is available via [npm](https://www.npmjs.com/package/motion):

```
npm install motion
```

Features can now be imported via `"motion/react"`:

```
import { motion } from "motion/react"
```

Prefer to install via CDN, or looking for framework-specific instructions? Check out our [full installation guide](/docs/react-installation).

## [Create your first animation](#create-your-first-animation)

The `<motion />` component is the foundation of Motion for React. Prefix any HTML or SVG tag with `motion.` to unlock animation props like `animate`, `whileHover`, and `exit`:

```
<motion.ul animate={{ rotate: 360 }} />
```

>Live example[Open](https://examples.motion.dev/react/rotate)

When values in `animate` change, Motion automatically transitions between them.

Physical properties like `x` and `scale` use spring physics by default; visual properties like `opacity` use tween easing. Override the animation type, duration, easing, or delay via [the](/docs/react-transitions) `transition` [prop](/docs/react-transitions):

```
<motion.div
  animate={{
    scale: 2,
    transition: { duration: 2 }
  }}
/>
```

[Learn more about React animation](/docs/react-animation)

If you're the kind of developer who learns better by doing, check out our library of [Basics examples](https://motion.dev/examples#basics). Each comes complete with a live demo and copy/paste source code.

## [Enter animation](#enter-animation)

When a component enters the page, it will automatically animate to the values defined in the `animate` prop.

You can provide values to animate from via the `initial` prop (otherwise these will be read from the DOM).

```
<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} />
```

>Live example[Open](https://examples.motion.dev/react/enter-animation)

Or disable this initial animation entirely by setting `initial` to `false`.

```
<motion.button initial={false} animate={{ scale: 1 }} />
```

## [Hover & tap animation](#hover--tap-animation)

`<motion />` extends React's event system with powerful [gesture animations](/docs/react-gestures). It currently supports hover, tap, focus, and drag.

```
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
/>
```

>Live example[Open](https://examples.motion.dev/react/gestures)

Motion's gestures are designed to feel better than using CSS or JavaScript events alone.

## [Scroll animation](#scroll-animation)

Motion supports both types of [scroll animations](/docs/react-scroll-animations): **Scroll-triggered** and **scroll-linked**.

To trigger an animation on scroll, the `whileInView` prop defines a state to animate to/from when an element enters/leaves the viewport:

```
<motion.div
  initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }}
  whileInView={{ backgroundColor: "rgb(255, 0, 0)", opacity: 1 }}
/>
```

>Live example[Open](https://examples.motion.dev/react/scroll-triggered)

Whereas to link a value directly to scroll position, it's possible to use `MotionValue`s via `useScroll`.

```
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />
```

>Live example[Open](https://examples.motion.dev/react/scroll-linked)

## [Layout animation](#layout-animation)

Motion's [layout animation](/docs/react-layout-animations) engine detects layout changes (size, position, reorder) and smoothly animates between states using transforms. Unlike basic "FLIP" implementations, it does so while correcting for scale-distortion.

It's as easy as applying the `layout` prop.

```
<motion.div layout />
```

>Live example[Open](https://examples.motion.dev/react/layout-animation)

Or to animate between completely different elements, a `layoutId`:

```
<motion.div layoutId="underline" />
```

>Live example[Open](https://examples.motion.dev/react/shared-layout-animation)

## [Exit animations](#exit-animations)

By wrapping `motion` components with `<AnimatePresence>` we gain access to [exit animations](/docs/react-animate-presence). This allows us to animate elements as they're removed from the DOM.

```
<AnimatePresence>
  {show ? <motion.div key="box" exit={{ opacity: 0 }} /> : null}
</AnimatePresence>
```

>Live example[Open](https://examples.motion.dev/react/exit-animation)

## [SVG animations](#svg-animations)

Motion has full support for [SVG animations](/docs/react-svg-animation), including support for animating `viewBox` and special values for simple path drawing effects.

```
<motion.circle animate={{ pathLength: 1 }} />
```

>Live example[Open](https://examples.motion.dev/react/use-transform)

## [Development tools](#development-tools)

Enhance your animation workflow with a suite of Motion developer tools. [Motion+](/plus) provides access to the `/motion` skill, which helps your agent access the latest Motion docs, build from over 380+ examples, find and fix animation performance issues in your codebase and much more.

>Motion+ Â· AI Kit

### One click install for Cursor

Add powerful animation skills and MCP to Cursor with one click. Motion AI Kit requires [Motion+](/plus) to install.

[Add AI Kit](cursor://anysphere.cursor-deeplink/prompt?text=Install+the+Motion+AI+Kit+for+Cursor.%0A%0A1.+Ask+me+for+my+Motion%2B+API+key+if+MOTION_TOKEN+is+not+already+set+%28from+https%3A%2F%2Fmotion.dev%2Fdashboard%2Ftokens%29.%0A%0AConfigure+the+Motion+MCP+server+globally+for+Cursor%3A%0A%0AMOTION_TOKEN%3D%22%3Ctoken%3E%22+npx+-y+add-mcp+%5C%0A++%22npx+-y+https%3A%2F%2Fapi.motion.dev%2Fregistry.tgz%3Fpackage%3Dmotion-studio-mcp%26version%3Dlatest%22+%5C%0A++--name+motion+%5C%0A++--env+TOKEN%3D%22%24MOTION_TOKEN%22+%5C%0A++-y+-g+-a+cursor%0AThis+should+update+%7E%2F.cursor%2Fmcp.json.%0A%0AInstall+the+Motion+skills+into+%7E%2F.cursor%2Fskills%2F+by+fetching%3A+https%3A%2F%2Fapi.motion.dev%2Fregistry%2Fskills%2Fmotion-ai-kit%3Ftoken%3D%3Ctoken%3E+Parse+the+skill+files+from+the+bundle+and+write+them+to%3A%0A%0A%7E%2F.cursor%2Fskills%2Fmotion%2F%0AVerify%3A%0A%0A%7E%2F.cursor%2Fmcp.json+has+a+motion+server+with+env.TOKEN%0AThe+motion+skill+folder+exists+under+%7E%2F.cursor%2Fskills%2F%0ATell+me+to+fully+restart+Cursor.%0A%0ADo+not+touch+unrelated+skills+already+in+%7E%2F.cursor%2Fskills%2F.)

Motion AI Kit is also available for Claude Code, Codex, and other popular agents. [See full installation guide](/docs/ai-kit-install).

## [Learn next](#learn-next)

That covers the core building blocks. Here's where to go next based on what you want to build and your learning style.

The [React animation](/docs/react-animation) guide will teach you more about the different types of animations you can build with this React animation library.

Or, you can learn by doing, diving straight into our collection of [examples](/examples?platform=react&category=basics). Each comes complete with full source code that you can copy-paste into your project.

---

## React animation

> Create React animation with Motion components. Learn variants, gestures, and keyframes.

_Source: [https://motion.dev/docs/react-animation](https://motion.dev/docs/react-animation)_

[Motion for React](/) is a simple yet powerful animation library. Whether you're building hover effects, scroll-triggered animations, or complex animation sequences, this guide will provide an overview of all the ways you can animate in React with Motion.

## [What you'll learn](#what-youll-learn)

* How to create your first animation with the `<motion.div />` component.
* Which values and elements you can animate.
* How to customise your animations with transition options.
* How to animate elements as they enter and exit the DOM.
* How to orchestrate animations with variants.

If you haven't installed Motion already, hop over to the 
[quick start guide for full instructions](./react).

## [Animate with `<motion />`](#animate-with-motion-)

Most animations in Motion are created with the`<motion />` [component](/docs/react-motion-component). Import it from `"motion/react"`:

```
import { motion } from "motion/react"
```

Every HTML & SVG element can be defined with a `motion` component:

```
<motion.div />
```

```
<motion.a href="#" />
```

```
<motion.circle cx={0} />
```

These work identically to their HTML/SVG counterparts - same props, same behaviour - but with additional animation props like `animate`, `whileHover`, and `exit`.

The most common animation prop is `animate`. When values passed to `animate` change, the element will automatically animate to that value.

```
<motion.div animate={{ opacity: 1 }} />
```

>Live example[Open](https://examples.motion.dev/react/state-updates)

### [Enter animations](#enter-animations)

We can set initial values for an element with the `initial` prop. So an element defined like this will fade in when it enters the DOM:

```
<motion.article
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
/>
```

## [Animatable values](#animatable-values)

**Motion can animate any CSS value**, like `opacity`, `filter` etc.

```
<motion.section
  initial={{ filter: "blur(10px)" }}
  animate={{ filter: "none" }}
/>
```

It can even animate values that aren't normally animatable by browsers, like `background-image` or `mask-image`:

```
<motion.nav
  initial={{ maskImage: "linear-gradient(to right, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)" }}
  animate={{ maskImage: "linear-gradient(to right, rgba(0,0,0,1) 90%, rgba(0,0,0,1) 100%)" }}
/>
```

### [Transforms](#transforms)

Unlike CSS, Motion can animate every transform axis independently.

```
<motion.div animate={{ x: 100 }} />
```

It supports the following special transform values:

* Translate: `x`, `y`, `z`
* Scale: `scale`, `scaleX`, `scaleY`
* Rotate: `rotate`, `rotateX`, `rotateY`, `rotateZ`
* Skew: `skewX`, `skewY`
* Perspective: `transformPerspective`

`motion` components also have enhanced `style` props, allowing you to use these shorthands statically:

```
<motion.section style={{ x: -20 }} />
```

Animating transforms independently provides great flexibility, especially when animating different transforms with gestures:

```
<motion.button
  initial={{ y: 10 }}
  animate={{ y: 0 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
/>
```

```
<motion.li
  initial={{ transform: "translateX(-100px)" }}
  animate={{ transform: "translateX(0px)" }}
  transition={{ type: "spring" }}
/>
```

Independent transforms already perform great, but Motion uniquely offers
hardware acceleration when setting `transform` directly.


For SVG components, `x` and `y` attributes can be set using `attrX` and
`attrY`. 
[Learn more about SVG animations in React](./react-svg-animation).

### [Supported value types](#supported-value-types)

Motion can animate any of the following value types:

* Numbers: `0`, `100` etc.
* Strings containing numbers: `"0vh"`, `"10px"` etc.
* Colors: All CSS color formats like hex, `rgba`, `hsla`, `oklch`, `oklab`, `color-mix` etc.
* Complex strings containing multiple numbers and/or colors (like `box-shadow`).
* `display: "none"/"block"` and `visibility: "hidden"/"visible"`.

### [Value type conversion](#value-type-conversion)

In general, values can only be animated between two of the same type (i.e `"0px"` to `"100px"`).

Colors can be freely animated between hex, RGBA and HSLA types.

Additionally, `x`, `y`, `width`, `height`, `top`, `left`, `right` and `bottom` can animate between different value types.

```
<motion.div
  initial={{ x: "100%" }}
  animate={{ x: "calc(100vw - 50%)" }}
/>
```

It's also possible to animate `width` and `height` in to/out of `"auto"`.

```
<motion.div
  initial={{ height: 0 }}
  animate={{ height: "auto" }}
/>
```

If animating `height: auto` while also animating `display` in to/out of
`"none"`, replace this with `visibility` `"hidden"` as elements with `display: none` can't be measured.

### [Transform origin](#transform-origin)

`transform-origin` has three shortcut values that can be set and animated individually:

* `originX`
* `originY`
* `originZ`

If set as numbers, `originX` and `Y` default to a progress value between `0` and `1`. `originZ` defaults to pixels.

```
<motion.div style={{ originX: 0.5 }} />
```

### [CSS variables](#css-variables)

Motion for React can animate CSS variables, and also use CSS variable definitions as animation targets.

#### [Animating CSS variables](#animating-css-variables)

Sometimes it's convenient to be able to animate a CSS variable to animate many children:

```
<motion.ul
  initial={{ '--rotate': '0deg' }}
  animate={{ '--rotate': '360deg' }}
  transition={{ duration: 2, repeat: Infinity }}
>
  <li style={{ transform: 'rotate(var(--rotate))' }} />
  <li style={{ transform: 'rotate(var(--rotate))' }} />
  <li style={{ transform: 'rotate(var(--rotate))' }} />
</motion.ul>
```

Animating the value of a CSS variable always triggers paint, therefore it can
be more performant to use

[`MotionValue`s](./react-motion-value)

to setup this kind of animation.

[Learn more about web animation performance](../magazine/web-animation-performance-tier-list)

.


1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

### [CSS variables as animation targets](#css-variables-as-animation-targets)

HTML `motion` components accept animation targets with CSS variables:

```
<motion.li animate={{ backgroundColor: "var(--action-bg)" }} />
```

## [Transitions](#transitions)

By default, Motion will create appropriate transitions for snappy animations based on the type of value being animated.

For instance, physical properties like `x` or `scale` are animated with spring physics, whereas values like `opacity` or `color` are animated with duration-based easing curves.

However, you can define your own animations via [the](/docs/react-transitions) `transition` [prop](/docs/react-transitions).

```
<motion.div
  animate={{ x: 100 }}
  transition={{ ease: "easeOut", duration: 2 }}
/>
```

A default `transition` can be set for many components with the `MotionConfig` [component](/docs/react-motion-config):

```
<MotionConfig transition={{ duration: 0.3 }}>
  <motion.div animate={{ opacity: 1 }} />
  // etc
```

Or you can set a specific `transition` on any animation prop:

```
<motion.div
  animate={{ opacity: 1 }}
  whileHover={{
    opacity: 0.7,
    // Specific transitions override default transitions
    transition: { duration: 0.3 }
  }}
  transition={{ duration: 0.5 }}
/>
```

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

MOTION

EaseSpring

Duration0.3

Delay0

âºSaved transitions12

### Visual editing for IDEs.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion+. One-time fee, lifetime access.](/plus)

## [Enter animations](#enter-animations-1)

When a `motion` component is first created, it'll automatically animate to the values in `animate` if they're different from those initially rendered, which you can either do via CSS or via [the](/docs/react-motion-value) `initial` [prop.](/docs/react-motion-value)

```
<motion.li
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1 }}
/>
```

>Live example[Open](https://examples.motion.dev/react/enter-animation)

You can also disable the enter animation entirely by setting `initial={false}`. This will make the element render with the values defined in `animate`.

```
<motion.div initial={false} animate={{ y: 100 }} />
```

## [Exit animations](#exit-animations)

Motion for React can animate elements as they're removed from the DOM.

In React, when a component is removed, it's usually removed instantly. Motion provides [the](/docs/react-animate-presence) `AnimatePresence` [component](/docs/react-animate-presence) which keeps elements in the DOM while they perform an animation defined with the `exit` prop.

```
<AnimatePresence>
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

>Live example[Open](https://examples.motion.dev/react/exit-animation)

## [Keyframes](#keyframes)

So far, we've set animation props like `animate` and `exit` to single values, like `opacity: 0`.

This is great when we want to animate from the current value to a new value. But sometimes we want to animate through a **series of values**. In animation terms, these are called **keyframes**.

All animation props can accept keyframe arrays:

```
<motion.div animate={{ x: [0, 100, 0] }} />
```

>Live example[Open](https://examples.motion.dev/react/keyframes)

When we animate to an array of values, the element will animate through each of these values in sequence.

In the previous example, we explicitly set the initial value as `0`. But we can also say "use the current value" by setting the first value to `null`.

```
<motion.div animate={{ x: [null, 100, 0] }} />
```

>Live example[Open](https://examples.motion.dev/react/keyframes-wildcards)

This way, if a keyframe animation is interrupting another animation, the transition will feel more natural.

### [Wildcard keyframes](#wildcard-keyframes)

This `null` keyframe is called a **wildcard keyframe**. A wildcard keyframe simply takes the value before it (or the current value, if this is the first keyframe in the array).

Wildcard keyframes can be useful for holding a value mid-animation without having to repeat values.

```
<motion.div
  animate={{ x: [0, 100, null, 0 ] }}
  // same as x: [0, 100, 100, 0] but easier to maintain
/>
```

### [Keyframe timing](#keyframe-timing)

By default, each keyframe is spaced evenly throughout the animation. You can override this by setting [the](/docs/react-transitions#times) `times` [option](/docs/react-transitions#times) via `transition`.

`times` is an array of progress values between `0` and `1`, defining where in the animation each keyframe should be positioned.

```
<motion.circle
  cx={500}
  animate={{
    cx: [null, 100, 200],
    transition: { duration: 3, times: [0, 0.2, 1] }
  }}
/>
```

`0` is the start of the animation, and `1` is the end of the animation. Therefore, `0.2` places this keyframe somewhere towards the start of the animation.

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

## [Motion along a path](#motion-along-a-path)

By default, `x` and `y` animate in a straight line. Pass `arc()` to `transition.path` to dynamically bend that line into a curve.

>Live example[Open](https://examples.motion.dev/react/add-to-basket)

```
import { arc, motion } from "motion/react"

<motion.div
  animate={{ x: 200, y: -120 }}
  transition={{ duration: 0.6, path: arc() }}
/>
```

`arc()` works alongside any `x`/`y` animation, plus [layout animations](/docs/react-layout-animations). See the [`arc()` reference](/docs/arc) for more.

It's also possible to use CSS's [`offset-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path) to animate along a fixed path, by running an animation on `offsetDistance`:

```
<motion.div
  style={{ offsetPath: "path('M0,0 C40,-80 160,-80 200,0')" }}
  animate={{ offsetDistance: "100%" }}
  transition={{ duration: 2 }}
/>
```

The benefit of using `arc()` instead of `offset-path` is that it can create curves dynamically.

## [Gesture animations](#gesture-animations)

Motion for React has animation props that can define how an element animates when it [recognises a gesture](/docs/react-gestures).

Supported gestures are:

* `whileHover`
* `whileTap`
* `whileFocus`
* `whileDrag`
* `whileInView`

When a gesture starts, it animates to the values defined in `while-`, and then when the gesture ends it animates back to the values in `initial` or `animate`.

```
<motion.button
  initial={{ opacity: 0 }}
  whileHover={{ backgroundColor: "rgba(220, 220, 220, 1)" }}
  whileTap={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
  whileInView={{ opacity: 1 }}
/>
```

>Live example[Open](https://examples.motion.dev/react/gestures)

The custom Cursor component available in [Motion+](/plus) takes this a step further with magnetic and target-morphing effects as a user hovers clickable targets (like buttons and links):

```
<Cursor magnetic />
```

>Live example[Open](https://examples.motion.dev/react/ios-pointer)

## [Variants](#variants)

The `animate` prop works well for single elements, but real interfaces often need coordinated animations across parent and child components. Variants solve this by defining named animation states that propagate through the component tree.

Variants are a set of named targets. These names can be anything.

```
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}
```

Variants are passed to `motion` components via the `variants` prop:

```
<motion.div variants={variants} />
```

These variants can now be referred to by a label, wherever you can define an animation target:

```
<motion.div
  variants={variants}
  initial="hidden"
  whileInView="visible"
  exit="hidden"
/>
```

You can also define multiple variants via an array:

```
animate={["visible", "danger"]}
```

>Live example[Open](https://examples.motion.dev/react/notifications-stack)

### [Propagation](#propagation)

Variants are useful for reusing and combining animation targets. But it becomes powerful for orchestrating animations throughout trees.

Variants will flow down through `motion` components. So in this example when the `ul` enters the viewport, all of its children with a "visible" variant will also animate in:

```
const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

return (
  <motion.ul
    initial="hidden"
    whileInView="visible"
    variants={list}
  >
    <motion.li variants={item} />
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
)
```

>Live example[Open](https://examples.motion.dev/react/variants)

### [Orchestration](#orchestration)

By default, this children animations will start simultaneously with the parent. But with variants we gain access to new `transition` props `when` [and](/docs/react-transitions#orchestration) `delayChildren`.

```
const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: stagger(0.3), // Stagger children by .3 seconds
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}
```

### [Dynamic variants](#dynamic-variants)

Each variant can be defined as a function that resolves when a variant is made active.

```
const variants = {
  hidden: { opacity: 0 },
  visible: (index) => ({
    opacity: 1,
    transition: { delay: index * 0.3 }
  })
}
```

These functions are provided a single argument, which is passed via the `custom` prop:

```
items.map((item, index) => <motion.div custom={index} variants={variants} />)
```

This way, variants can be resolved differently for each animating element.

## [Animation controls](#animation-controls)

Declarative animations via `animate` and `whileHover` cover most UI interactions. For cases that need sequencing, timeline scrubbing, or triggering animations from events outside React's render cycle, the `useAnimate` [hook](/docs/react-use-animate) provides imperative controls:

* Animating any HTML/SVG element (not just `motion` components).
* Complex animation sequences.
* Controlling animations with `time`, `speed`, `play()`, `pause()` and other playback controls.

```
function MyComponent() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const controls = animate([
      [scope.current, { x: "100%" }],
      ["li", { opacity: 1 }]
    ])

    controls.speed = 0.8

    return () => controls.stop()
  }, [])

  return (
    <ul ref={scope}>
      <li />
      <li />
      <li />
    </ul>
  )
}
```

## [Animate content](#animate-content)

By passing [a](/docs/react-motion-value) `MotionValue` as the child of a `motion` component, it will render its latest value in the HTML.

```
import { useMotionValue, motion, animate } from "motion/react"

function Counter() {
  const count = useMotionValue(0)

  useEffect(() => {
    const controls = animate(count, 100, { duration: 5 })
    return () => controls.stop()
  }, [])

  return <motion.pre>{count}</motion.pre>
}
```

This avoids React re-renders entirely. The `motion` component updates the DOM text node directly, making it suitable for high-frequency value changes like counters or live data.

>Live example[Open](https://examples.motion.dev/react/html-content)

It's also possible to animate numbers with a ticking counter effect using the `AnimateNumber` component in [Motion+](/plus) by passing them directly to the component:

```
<AnimateNumber>{value}</AnimateNumber>
```

>Live example[Open](https://examples.motion.dev/react/number-radix-slider)

## [Next](#next)

In this guide we've covered the basic kinds of animations we can perform in Motion using its **animation props**. However, there's much more to discover.

Most of the examples on this page have used HTML elements, but Motion also has unique [SVG animation](/docs/react-svg-animation) features, like its simple line drawing API.

We've also only covered time-based animations, but Motion also provides powerful [scroll animation](/docs/react-scroll-animations) features like `useScroll` and `whileInView`.

It also provides a powerful [layout animation](/docs/react-layout-animations) engine, that can animate between any two layouts using performant transforms.

Finally, there's also a whole [Basics examples category](/examples?platform=react&category=basics) that covers all the basics of animating with Motion for React with live demos and copy-paste code.

---

## Layout animation

> Smoothly animate layout changes and create shared element animations.

_Source: [https://motion.dev/docs/react-layout-animations](https://motion.dev/docs/react-layout-animations)_

Motion (previously Framer Motion) can automatically animate an element's size and position whenever a layout change occurs - with a single prop. Add `layout` to animate a single component, or use `layoutId` to animate shared elements across components, creating seamless transitions between different UI states.

In this guide, we'll learn how to:

* **Animate layout changes** with a single prop.
* Create **shared element transitions** between components.
* Explore **advanced techniques**.
* **Troubleshoot** common layout animation issues.
* Understand the **differences** between Motion and the native View Transitions API.

Prefer to learn by doing? Check out our collection of official

[React layout animation examples](/examples?category=layout-animations&platform=react)

.

## [How to animate layout changes](#how-to-animate-layout-changes)

To enable layout animations on a `motion` component, simply add the `layout` prop. Any layout change that happens as a result of a React render will now be automatically animated.

```
<motion.div layout />
```

Layout animation can animate previously unanimatable CSS values, like switching `justify-content` between `flex-start` and `flex-end`.

```
<motion.div
  layout
  style={{ justifyContent: isOn ? "flex-start" : "flex-end" }}
/>
```

>Live example[Open](https://examples.motion.dev/react/layout-animation)

Or by using the `layoutId` prop, it's possible to match two elements and animate between them for some truly advanced animations.

```
<motion.li layoutId="item" />
```

It can handle anything from microinteractions to full page transitions.

>Live example[Open](https://examples.motion.dev/react/app-store)

When performing layout animations, changes to layout should be made via
`style` or `className`, not via animation props like `animate` or
`whileHover`, as `layout` will take care of the animation.

>Live example[Open](https://examples.motion.dev/react/reorder-items)

Layout changes can be anything, changing `width`/`height`, number of grid columns, reordering a list, or adding/removing new items:

### [Performance](#performance)

Animating layout is traditionally slow, but Motion performs all layout animations using the CSS `transform` property for the highest possible performance.

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

### [Shared layout animations](#shared-layout-animations)

For more advanced shared layout animations, `layoutId` allows you to connect two different elements.

When a new component is added with a `layoutId` prop matching an existing component, it will automatically animate out from the old component.

```
isSelected && <motion.div layoutId="underline" />
```

>Live example[Open](https://examples.motion.dev/react/shared-layout-animation)

If the original component is still on the page when the new one enters, they will automatically crossfade.

To animate an element back to its origin, you can use the `AnimatePresence` component to keep it in the DOM until its exit animation has finished.

```
<AnimatePresence>
  {isOpen && <motion.div layoutId="modal" />}
</AnimatePresence>
```

### [Customise a layout animation](#customise-a-layout-animation)

Layout animations can be customised using [the](/docs/react-transitions) `transition` [prop](/docs/react-transitions).

```
<motion.div layout transition={{ duration: 0.3 }} />
```

If you need to set a transition specifically for the layout animation while having a different transition for other properties (like `opacity`), you can define a dedicated `layout` transition.

```
<motion.div
  layout
  animate={{ opacity: 0.5 }}
  transition={{
    ease: "linear",
    layout: { duration: 0.3 }
  }}
/>
```

When performing a shared layout animation, the transition defined for element we're animating **to** will be used.

```
<>
  <motion.button
    layoutId="modal"
    onClick={() => setIsOpen(true)}
    // This transition will be used when the modal closes
    transition={{ type: "spring" }}
  >
    Open
  </motion.button>
  <AnimatePresence>
    {isOn && (
      <motion.dialog
        layoutId="modal"
        // This transition will be used when the modal opens
        transition={{ duration: 0.3 }}
      />
    )}
  </AnimatePresence>
</>
```

### [Motion along a path](#motion-along-a-path)

By default, layout animations move elements in a straight line from their old position to their new one. Pass `arc()` to `transition.layout.path` to curve that motion instead, including for shared `layoutId` transitions.

```
import { arc, motion } from "motion/react"

<motion.div layout transition={{ layout: { path: arc() } }} />
```

See the [`arc()` docs](/docs/arc) for the available options.

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

MOTION

EaseSpring

Duration0.3

Delay0

âºSaved transitions12

### Visual editing for IDEs.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion+. One-time fee, lifetime access.](/plus)

## [Advanced use-cases](#advanced-use-cases)

### [Layout animations inside scrollable containers](#layout-animations-inside-scrollable-containers)

To correctly animate layout within a scrollable container, you must add the `layoutScroll` prop to the scrollable element. This allows Motion to account for the element's scroll offset.

```
<motion.div layoutScroll style={{ overflow: "scroll" }} />
```

### [Animating within fixed containers](#animating-within-fixed-containers)

To correctly animate layout within fixed elements, we need to provide them the `layoutRoot` prop.

```
<motion.div layoutRoot style={{ position: "fixed" }} />
```

This lets Motion account for the page's scroll offset when measuring children.

### [Group layout animations](#group-layout-animations)

Layout animations are triggered when a component re-renders and its layout has changed.

```
function Accordion() {
  const [isOpen, setOpen] = useState(false)

  return (
    <motion.div
      layout
      style={{ height: isOpen ? "100px" : "500px" }}
      onClick={() => setOpen(!isOpen)}
    />
  )
}
```

But what happens when we have two or more components that don't re-render at the same time, but **do** affect each other's layout?

```
function List() {
  return (
    <>
      <Accordion />
      <Accordion />
    </>
  )
}
```

When one re-renders, for performance reasons the other won't be able to detect changes to its layout.

We can synchronise layout changes across multiple components by wrapping them in the `LayoutGroup component`.

```
import { LayoutGroup } from "motion/react"

function List() {
  return (
    <LayoutGroup>
      <Accordion />
      <Accordion />
    </LayoutGroup>
  )
}
```

When layout changes are detected in any grouped `motion` component, layout animations will trigger across all of them.

### [Relative animation](#relative-animation)

Motion's layout animations use **parent-relative** calculations instead of **viewport or page-relative**.

What this means is if you have a parent and child performing a layout animation with different transitions, unlike the browser's View Transition API, the child will never get "left behind" by its parent.

By default, these calculations use the top left of the child, but you can change this with the `layoutAnchor` prop. This accepts `0`-`1` progress values for `x` and `y` where `0` is top/left and 1 is bottom/right.

```
// Pin element to center
<motion.ul layout>
  <motion.li
    layout
    layoutAnchor={{ x: 0.5, y: 0.5 }}
    transition={{ delay: 1 }}
  />
</motion.ul>
```

>Live example[Open](https://examples.motion.dev/react/layout-anchor)

### [Fixing child distortion during layout animations](#fixing-child-distortion-during-layout-animations)

Because `layout` animations use `transform: scale()`, they can sometimes visually distort children or certain CSS properties.

* **Child elements:** To fix distortion on direct children, these can also be given the `layout` prop.
* **Border radius and box shadow:** Motion automatically corrects distortion on these properties, but they must be set via the `style`, `animate` or other animation prop.

```
<motion.div layout style={{ borderRadius: 20 }} />
```

## [Troubleshooting](#troubleshooting)

### [The component isn't animating](#the-component-isnt-animating)

Ensure the component is **not** set to `display: inline`, as browsers don't apply `transform` to these elements.

Ensure the component is re-rendering when you expect the layout animation to start.

### [Animations don't work during window resize](#animations-dont-work-during-window-resize)

Layout animations are blocked during horizontal window resize to improve performance and to prevent unnecessary animations.

### [SVG layout animations are broken](#svg-layout-animations-are-broken)

SVG components aren't currently supported with layout animations. SVGs don't have layout systems so it's recommended to directly animate their attributes like `cx` etc.

### [Content is animating when the scrollbar appears](#content-is-animating-when-the-scrollbar-appears)

Layout changes can affect whether or not a scrollbar is visible. Scrollbars take up visible space, which means layouts are then subsequently affected by the scrollbar. Layout animations will apply to any layout change.

If you're finding that this is leading to unwanted layout animations, you can ensure the scrollbar space is reserved, even when no scrollbar is visible, with the `scrollbar-gutter` CSS rule.

```
body {
  overflow-y: auto;
  scrollbar-gutter: stable;
}
```

### [The content stretches undesirably](#the-content-stretches-undesirably)

This is a natural side-effect of animating `width` and `height` with `scale`.

Often, this can be fixed by providing these elements a `layout` animation and they'll be scale-corrected.

```
<motion.section layout>
  <motion.img layout />
</motion.section>
```

Some elements, like images or text that are changing between different aspect ratios, might be better animated with `layout="position"`.

### [Border radius or box shadows are behaving strangely](#border-radius-or-box-shadows-are-behaving-strangely)

Animating `scale` is performant but can distort some styles like `border-radius` and `box-shadow`.

Motion automatically corrects for scale distortion on these properties, but they must be set on the element via `style`.

```
<motion.div layout style={{ borderRadius: 20 }} />
```

### [Border looks stretched during animation](#border-looks-stretched-during-animation)

Elements with a `border` may look stretched during the animation. This is for two reasons:

1. Because changing `border` triggers layout recalculations, it defeats the performance benefits of animating via `transform`. You might as well animate `width` and `height` classically.
2. `border` can't render smaller than `1px`, which limits the degree of scale correction that Motion can perform on this style.

A work around is to replace `border` with a parent element with padding that acts as a `border`.

```
<motion.div layout style={{ borderRadius: 10, padding: 5 }}>
  <motion.div layout style={{ borderRadius: 5 }} />
</motion.div>
```

## [Technical reading](#technical-reading)

Interested in the technical details behind layout animations? Nanda does an incredible job of [explaining the challenges](https://www.nan.fyi/magic-motion) of animating layout with transforms using interactive examples. Matt, creator of Motion, did a [talk at Vercel conference](https://www.youtube.com/watch?v=5-JIu0u42Jc&ab_channel=Vercel) about the implementation details that is largely up to date.

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

## [Motion's layout animations vs the View Transitions API](#motions-layout-animations-vs-the-view-transitions-api)

More browsers are starting to support the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API), which is similar to Motion's layout animations.

### [Benefits of View Transitions API](#benefits-of-view-transitions-api)

The main two benefits of View Transitions is that **it's included in browsers** and **features a unique rendering system**.

#### [Filesize](#filesize)

Because the View Transitions API is already included in browsers, it's cheap to implement very simple crossfade animations.

However, the CSS complexity can scale quite quickly. Motion's layout animations are around 12kb but from there it's very cheap to change transitions, add springs, mark matching

#### [Rendering](#rendering)

Whereas Motion animates the elements as they exist on the page, View Transitions API does something quite unique in that it takes an image snapshot of the previous page state, and crossfades it with a live view of the new page state.

For shared elements, it does the same thing, taking little image snapshots and then crossfading those with a live view of the element's new state.

This can be leveraged to create interesting effects like full-screen wipes that aren't really in the scope of layout animations. [Framer's Page Effects](https://www.framer.com/academy/lessons/page-effects) were built with the View Transitions API and it also extensively uses layout animations. The right tool for the right job.

### [Drawbacks to View Transitions API](#drawbacks-to-view-transitions-api)

There are quite a few drawbacks to the API vs layout animations:

* **Not interruptible**: Interrupting an animation mid-way will snap the animation to the end before starting the next one. This feels very janky.
* **Blocks interaction**: The animating elements overlay the "real" page underneath and block pointer events. Makes things feel quite sticky.
* **Difficult to manage IDs**: Layout animations allow more than one element with a `layoutId` whereas View Transitions will break if the previous element isn't removed.
* **Less performant:** View Transitions take an actual screenshot and animate via `width`/`height` vs layout animation's `transform`. This is measurably less performant when animating many elements.
* **Doesn't account for scroll**: If the page scroll changes during a view transition, elements will incorrectly animate this delta.
* **No relative animations:** If a nested element has a `delay` it will get "left behind" when its parent animates away, whereas Motion handles this kind of relative animation.
* **One animation at a time**: View Transitions animate the whole screen, which means combining it with other animations is difficult and other view animations impossible.

All-in-all, each system offers something different and each might be a better fit for your needs. In the future it might be that Motion also offers an API based on View Transitions API.

## [FAQs](#faqs)

What is a layout animation?
:   A layout animation automatically animates an element's size and position
    when the layout changes, like reordering a list, toggling an accordion, or
    switching grid columns. Instead of calculating start and end values
    yourself, add `layout` to a `<motion />` component and Motion handles it
    automatically using transforms.

How are layout animations performant if they animate size?
:   Motion measures the layout change, then animates using CSS `transform`
    (translate + scale) instead of actually animating width and height.
    Animating transforms can entirely avoid triggering paint.

Why does my content look stretched during a layout animation?
:   When Motion uses `scale` to animate a size change, child elements can get
    visually distorted. Fix this by adding `layout` to the children too and
    Motion will calculate counter-scales them so they appear undistorted. For
    elements that change aspect ratio (like images), use `layout="position"` to
    only animate the position and let the size snap.

What's the difference between Motion's layout animations and the View Transitions API?
:   Both animate elements between layout states, but they work differently.
    Motion animates the actual elements using transforms: it's interruptible,
    doesn't block pointer events, and handles multiple simultaneous animations.
    View Transitions takes a screenshot of the old state and crossfades to the
    new one. It's built into browsers but can't be interrupted, blocks
    interaction during the transition, and is less performant when animating
    many elements.

---

## React scroll animation

> Create scroll-triggered and scroll-linked effects â parallax, progress and more.

_Source: [https://motion.dev/docs/react-scroll-animations](https://motion.dev/docs/react-scroll-animations)_

Learn how to create scroll animations in React with Motion. This guide covers **scroll-linked** animations, **scroll-triggered** animations, **parallax**, **horizontal scrolling**, and more. All with live examples and copy-paste code.

## [Types of scroll animation](#types-of-scroll-animation)

There are two fundamental types of scroll animations:

* **Scroll-triggered:** An animation is triggered when an element enters or leaves the viewport. Common for fade-in effects and lazy-loading.
* **Scroll-linked:** Animation values are linked directly to scroll position. Used for parallax, progress bars, and interactive storytelling.

Motion supports both types of scroll animations with simple, performant APIs.

## [Performance](#performance)

Motion is the only animation library that runs scroll-linked animations on the browser's native `ScrollTimeline` where possible, for fully hardware-accelerated animations. Scroll-triggered animations use a pooled `IntersectionObserver` for minimal overhead.

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

## [Scroll-triggered animations](#scroll-triggered-animations)

Scroll-triggered animations fire when an element enters or leaves the viewport, or scrolls to a specific point in the viewport.

Motion provides [the](/docs/react-motion-component#whileinview) `whileInView` [prop](/docs/react-motion-component#whileinview) to set an animation target.

```
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
/>
```

>Live example[Open](https://examples.motion.dev/react/scroll-triggered)

### [Animate once on scroll](#animate-once-on-scroll)

By default, elements will animate between `initial`/`animate`, and `whileInView`, as the element enters and leaves the viewport. Via [the](/docs/react-motion-component#viewport-1) `viewport` [options](/docs/react-motion-component#viewport-1), set `once: true` so an animation only plays the first time an element scrolls into view.

```
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
/>
```

### [Changing scroll container](#changing-scroll-container)

By default, animations will trigger based on the `window` viewport. To set a custom scroll container element, pass the `ref` of another scrollable element to the `root` option:

```
function Component() {
  const scrollRef = useRef(null)
  
  return (
    <div ref={scrollRef} style={{ overflow: "scroll" }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ root: scrollRef }}
      />
    </div>
  )
}
```

For more configuration options, checkout [the](/docs/react-motion-component#viewport-1) `motion` [component](/docs/react-motion-component#viewport-1) API reference.

### [Setting state](#setting-state)

It's also possible to set React state when any element (not just a `motion` component) enters and leaves the viewport with the `useInView` [hook](/docs/react-use-in-view).

```
function Component() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <div ref={ref}>
      {isInView ? "Hello!" : "Bye..."}
    </div>
  )
}
```

## [Scroll-linked animations](#scroll-linked-animations)

Scroll-linked animations connect CSS styles directly to scroll position. In Motion, this is done with the `useScroll` [hook](/docs/react-use-scroll).

`useScroll` returns four motion values:

* `scrollX`/`scrollY`: Scroll position in pixels
* `scrollXProgress`/`scrollYProgress`: Scroll progress from `0` to `1`

### [Scroll progress bar](#scroll-progress-bar)

Create a reading progress indicator by linking `scrollYProgress` to `scaleX`:

```
const { scrollYProgress } = useScroll();

return (
  <motion.div style={{ scaleX: scrollYProgress, originX: 0 }} />  
)
```

>Live example[Open](https://examples.motion.dev/react/scroll-linked)

Build this faster with AI. [Motion AI Kit](./ai-kit-context) gives your LLM full access to the latest Motion docs and the source code of all 380+ official examples.

### [Detect scroll direction](#detect-scroll-direction)

It's possible to track scroll direction by using `useMotionValueEvent` on `scrollY`. With this, it's possible to animate items to different states, like a menu that only shows as we scroll down.

```
const { scrollY } = useScroll()
const [scrollDirection, setScrollDirection] = useState("down")

useMotionValueEvent(scrollY, "change", (current) => {
  const diff = current - scrollY.getPrevious()
  setScrollDirection(diff > 0 ? "down" : "up")
})
```

>Live example[Open](https://examples.motion.dev/react/scroll-hide-header)

### [Smoothing scroll values](#smoothing-scroll-values)

Smooth changes to a scroll value by passing one through `useSpring`:

```
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
})

return <motion.div style={{ scaleX }} />
```

### [Transform scroll position to any value](#transform-scroll-position-to-any-value)

Use the `useTransform` hook to map scroll progress to colours, positions, or any other CSS value:

```
const filter = useTransform(
  scrollYProgress,
  [0, 1],
  ["blur(0px)", "blur(10px)"]
)

return <motion.div style={{ filter }} />
```

>Live example[Open](https://examples.motion.dev/react/scroll-zoom-hero)

### [Track element scroll position through viewport](#track-element-scroll-position-through-viewport)

By default, `useScroll` progress values will represent the overall viewport scroll (or element scroll).

By passing an element via the `target` option, `scrollYProgress` will return its progress through the visible space.

```
const ref = useRef(null)
const { scrollYProgress } = useScroll({
  target: ref,
  /*
    When the top of the target meets the bottom of the container
    to when the bottom of the target meets the top of the container
  */
  offset: ["start end", "end start"]
})
```

>Live example[Open](https://examples.motion.dev/react/scroll-track-element-in-viewport)

### [Parallax scrolling](#parallax-scrolling)

Parallax creates the illusion of depth by moving elements at different speeds. Background layers should move slower than foreground layers:

```
const { foregroundY, backgroundY } = useTransform(
  scrollY,
  [0, 1],
  {
    foregroundY: [0, 2], // move 2px for every 1 scroll px
    backgroundY: [0, 0.5] // move 0.5px for every 1 scroll px
  },
  { clamp: false }
)
```

>Live example[Open](https://examples.motion.dev/react/parallax)

### [Scroll image reveal effect](#scroll-image-reveal-effect)

By linking `clipPath` to `scrollYProgress`, you can have an image "reveal" itself as it scrolls into view.

```
const ref = useRef(null)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "center center"]
})

const clipPath = useTransform(
  scrollYProgress,
  [0, 1],
  ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)"]
)

return (
  <motion.div ref={ref} style={{ clipPath }}>
    <img src="/photo.jpg" alt="Revealed image" />
  </motion.div>
)
```

>Live example[Open](https://examples.motion.dev/react/scroll-image-reveal)

### [Horizontal scroll section](#horizontal-scroll-section)

You can make a horizontally-scrolling section by combining `useScroll`, a tall container section, and a wide `position: sticky` container.

```
const containerRef = useRef(null)
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"]
})

const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

return (
  <div ref={containerRef} style={{ height: "300vh" }}>
    <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
      <motion.div style={{ x, display: "flex", gap: 20 }}>
        {items.map(item => (
          <div key={item.id} style={{ flexShrink: 0, width: 400 }}>
            {item.content}
          </div>
        ))}
      </motion.div>
    </div>
  </div>
)
```

The container should have a long viewport-relative measurement like `300vh`. Increasing this length will make the horizontal scrolling feel slower.

>Live example[Open](https://examples.motion.dev/react/scroll-horizontal)

### [Text scroll](#text-scroll)

By combining `useScroll` with the Motion+ `Ticker` we can make this popular effect where blocks of text scroll horizontally as the page itself scrolls vertically.

By passing `scrollY` to `useTransform` and multiplying it by `-1` we get a [motion value](/docs/react-motion-value) that moves in the opposite direction to the scroll.

```
const { scrollY } = useScroll()
const invertScroll = useTransform(() => scrollY.get() * -1)

const lines = [
    { text: "Creative", reverse: false },
    { text: "Design", reverse: true },
    { text: "Motion", reverse: false },
    { text: "Studio", reverse: true },
]
```

>Live example[Open](https://examples.motion.dev/react/scroll-text-lines)

```
{lines.map((line, index) => (
  <Ticker
    key={line.text}
    className={`ticker-line ticker-${index}`}
    items={[
      <span className="text-solid">{line.text}</span>,
      <span className="text-outline">{line.text}</span>,
    ]}
    offset={line.reverse ? invertScroll : scrollY}
  />
))}
```

## [Examples](#examples)

#### [Track element scroll offset](#track-element-scroll-offset)

>Live example[Open](https://examples.motion.dev/react/scroll-container)

#### [Track element within viewport](#track-element-within-viewport)

#### [3D](#3d)

#### [Scroll velocity and direction](#scroll-velocity-and-direction)

Read the [full](/docs/react-use-scroll) `useScroll` [docs](/docs/react-use-scroll) to discover more about creating the above effects.

## [FAQs](#faqs)

Are Motion scroll animations hardware accelerated?
:   Yes, when possible Motion scroll animations are hardware accelerated. Scroll-linked animations default to the browser's native `ScrollTimeline` (and soon `ViewTimeline`) when possible, falling back to JavaScript when necessary. Scroll-triggered animations use a pooled `IntersectionObserver` for extremely low overhead.

What's the difference between scroll-triggered and scroll-linked animations?
:   Scroll-triggered animations fire when an element enters or leaves the viewport, think fade-ins and reveal effects. Use `whileInView` or `useInView` for these. Scroll-linked animations tie a value directly to scroll position, think parallax and progress bars. Use `useScroll` for these.

How do I create a parallax effect in React?
:   Combine `useScroll` with `useTransform` to move elements at different speeds relative to scroll position. Pass the target ref of a container, then map `scrollYProgress` to different `y` ranges per layer: smaller ranges for background, larger for foreground.

How do I create a horizontal scroll section?
:   Wrap a wide flex container inside a `position: sticky` element, inside a tall container (e.g. `height: 300vh`). Use `useScroll` to track the tall container's progress, then `useTransform` to map `scrollYProgress` to a horizontal `x` translation. The taller the outer container, the slower the horizontal scroll feels.

---

## SVG animation

> Animate SVGs in React - Line drawing and morphing effects, and more.

_Source: [https://motion.dev/docs/react-svg-animation](https://motion.dev/docs/react-svg-animation)_

Motion makes React SVG animation straightforward. In this guide, we'll learn how to make line drawing animations, path morphing animations, animate `viewBox` and more.

>Live example[Open](https://examples.motion.dev/react/path-drawing)

## [Overview](#overview)

SVG animations are performed via the `motion` [component](/docs/react-motion-component). There's a `motion` component for every SVG element (e.g. `<motion.svg>`, `<motion.path>`, `<motion.circle>`, and even filters like `<motion.feTurbulence>` and `<motion.feDisplacementMap>`).

```
<motion.svg>
  <motion.circle />
</motion.svg>
```

A `motion` component can animate `style`, as normal:

```
<motion.circle
  style={{ fill: "#00f" }}
  animate={{ fill: "#f00" }}
/>
```

But it can also animate attributes:

```
<motion.circle
  cx={0}
  animate={{ cx: 50 }}
/>
```

### [Animate `viewBox`](#animate-viewbox)

The `motion.svg` component can additionally animate `viewBox`. This is especially useful for easy panning animations:

```
<motion.svg
  viewBox="0 0 200 200"
  animate={{ viewBox: "100 0 200 200" }} // 100px to the right
/>
```

Or zoom in/out animations:

```
<motion.svg
  viewBox="0 0 200 200"
  animate={{ viewBox: "-100 -100 300 300" }} // Zoom out
/>
```

### [Transforms](#transforms)

SVG transforms work differently to CSS transforms. When we define a CSS transform, the default origin is **relative to the element itself.** So for instance, this `div` will rotate around its center point, as you'd intuitively expect:

```
<motion.div style={{ rotate: 90 }} />
```

With SVGs, the transform point is relative to the top/left corner of the `viewBox`, which is less intuitive. Motion changes this behaviour so SVGs work the same as normal elements. Therefore, this:

```
<motion.rect style={{ rotate: 90 }} />
```

Will also rotate the `rect` element around its center point.

The default behaviour can be restored by explicitly setting an element's `transformBox` style:

```
<motion.rect style={{ rotate: 90, transformBox: "view-box" }} />
```

### [`x`/`y`/`scale` attributes](#xyscale-attributes)

`motion` components provide shorthands for `x`, `y`, and `scale` transforms:

```
<motion.div animate={{ x: 100 }} />
```

With SVG components, these will still render via the `style` tag. This is usually fine, but some SVG components accept `x`, `y`, and `scale` attributes also. You can target these via animation props using `attrX`, `attrY` and `attrScale` respectively:

```
<motion.rect attrX={0} animate={{ attrX: 100 }} />
```

### [Passing `MotionValue`](#passing-motionvalue)

[Motion values](/docs/react-motion-value) should be passed via `style`, when animating regular styles, or via the component's attribute where appropriate:

```
const cx = useMotionValue(100)
const opacity = useMotionValue(1)

return <motion.rect cx={cx} style={{ opacity }} />
```

## [Line drawing](#line-drawing)

Motion simplifies the creation of âhand-drawnâ line animations using three special values. Each is set as a `0`-`1` progress value, where `1` is the total length of the line:

* `pathLength`: total drawn length
* `pathSpacing`: length between segments
* `pathOffset`: where the segment starts

These values work on `path`, `circle`, `ellipse`, `line`, `polygon`, `polyline`, `rect`.

```
<motion.path
  d={d}
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
/>
```

>Live example[Open](https://examples.motion.dev/react/use-transform)

## [Path morphing](#path-morphing)

It's possible to also animate the shape of a `path` via its `d` attribute.

```
<motion.path
  d="M 0,0 l 0,10 l 10,10"
  animate={{ d: "M 0,0 l 10,0 l 10,10" }}
/>
```

This works natively in Motion **as long as the two paths are similar**. You can see in the example above that each path has the same number and type of path instructions.

For interpolating between very different paths, you can incorporate a third-party path mixer like [Flubber](https://www.npmjs.com/package/flubber):

>Live example[Open](https://examples.motion.dev/react/path-morphing)

> Motion+ Examples

### 380+ production-ready examples.

JavaScript, React, and Vue. Copy and paste straight into your project, adapt with AI, or pipe the whole set into your agent with the Examples MCP.

[See all examples](/examples?plus=true&platform=all)

Part of [Motion+](/plus). One-time fee, lifetime access.

## [Drag gesture](#drag-gesture)

SVG elements can be made draggable in the same way as their HTML counterparts, using the `drag` prop.

```
<motion.circle drag />
```

However, it's possible that an SVG is rendered with a `viewBox` that is different from its rendered size.

For example, this SVG has a `viewBox` of `100px` width and height, vs a rendered size of `200px`:

```
<svg viewBox="0 0 100 100" style={{ width: 200, height: 200 }} />
```

This will conflict with the drag gesture. To fix, we can use the `MotionConfig` `transformPagePoint` prop to rescale pointer movements:

```
import { motion, MotionConfig, transformViewBoxPoint } from "motion/react"

function Component() {
  const ref = useRef(null)

  return (
    <MotionConfig transformPagePoint={transformViewBoxPoint(ref)}>
      <svg ref={ref} viewBox="0 0 100 100" style={{ width: 200, height: 200 }}>
        <motion.circle drag />
      </svg>
    </MotionConfig>
  )
}
```

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## Transitions

> Control timing with duration/easing, springs, delay and stagger.

_Source: [https://motion.dev/docs/react-transitions](https://motion.dev/docs/react-transitions)_

A `transition` defines the type of animation used when animating between two values.

```
const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
}
```

```
// Motion component
<motion.div
  animate={{ x: 100 }}
  transition={transition}
/>

// animate() function
animate(".box", { x: 100 }, transition)
```

>Live example[Open](https://examples.motion.dev/react/transition)

## [Setting a transition](#setting-a-transition)

`transition` can be set on any animation prop, and that transition will be used when the animation fires.

```
<motion.div
  whileHover={{
    scale: 1.1,
    transition: { duration: 0.2 }
  }}
/>
```

### [Value-specific transitions](#value-specific-transitions)

When animating multiple values, each value can be animated with a different transition, with `default` handling all other values:

```
// Motion component
<motion.li
  animate={{
    x: 0,
    opacity: 1,
    transition: {
      default: { type: "spring" },
      opacity: { ease: "linear" }
    }
  }}
/>

// animate() function
animate("li", { x: 0, opacity: 1 }, {
  default: { type: "spring" },
  opacity: { ease: "linear" }
})
```

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

MOTION

EaseSpring

Duration0.3

Delay0

âºSaved transitions12

### Visual editing for IDEs.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion+. One-time fee, lifetime access.](/plus)

### [Default transitions](#default-transitions)

It's possible to set default transitions via the `transition` prop. Either for specific `motion` components:

```
<motion.div
  animate={{ x: 100 }}
  transition={{ type: "spring", stiffness: 100 }}
/>
```

Or for a group of `motion` components [via](/docs/react-motion-config#transition) `MotionConfig`:

```
<MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
  <App />
</MotionConfig>
```

### [Inheritance](#inheritance)

By default, transitions of higher specificity will replace default transitions. For example:

```
<MotionConfig transition={{ duration: 1, ease: "linear" }}>
  <motion.div
    animate={{ x: 100 }}
    transition={{ ease: "easeInOut" }}
  />
</MotionConfig>
```

In this above example, `x` will animate with the default `duration` of `0.3`.

By setting `inherit: true`, a transition will inherit values from transitions with lower specificity.

```
<MotionConfig transition={{ duration: 1, ease: "linear" }}>
  <motion.div
    animate={{ x: 100 }}
    transition={{
      inherit: true, // duration 1 now inherited
      ease: "easeInOut"
    }}
  />
</MotionConfig>
```

This is also true of value-specific transitions:

```
<motion.div
  animate={{ x: 100, opacity: 1 }}
  transition={{
    duration: 1,
    ease: "easeInOut",
    opacity: {
      inherit: true, // inherit 1 second
      ease: "linear"
    }
  }}
/>
```

## [Transition settings](#transition-settings)

#### [`type`](#type)

**Default:** Dynamic

`type` decides the type of animation to use. It can be `"tween"`, `"spring"` or `"inertia"`.

**Tween** animations are set with a duration and an easing curve.

**Spring** animations are either physics-based or duration-based.

Physics-based spring animations are set via `stiffness`, `damping` and `mass`, and these incorporate the velocity of any existing gestures or animations for natural feedback.

>Live example[Open](https://examples.motion.dev/react/app-store)

Duration-based spring animations are set via a `duration` and `bounce`. These don't incorporate velocity but are easier to understand.

**Inertia** animations decelerate a value based on its initial velocity, usually used to implement inertial scrolling.

```
<motion.path
  animate={{ pathLength: 1 }}
  transition={{ duration: 2, type: "tween" }}
/>
```

#### [Spring visualiser](#spring-visualiser)

### [Tween](#tween)

#### [`duration`](#duration)

**Default:** `0.3` (or `0.8` if multiple keyframes are defined)

The duration of the animation. Can also be used for `"spring"` animations when `bounce` is also set.

```
animate("ul > li", { opacity: 1 }, { duration: 1 })
```

#### [`ease`](#ease)

The easing function to use with tween animations. Accepts:

* Easing function name. E.g `"linear"`
* An array of four numbers to define a cubic bezier curve. E.g `[.17,.67,.83,.67]`
* A [JavaScript easing function](/docs/easing-functions), that accepts and returns a value `0`-`1`.

These are the available easing function names:

* `"linear"`
* `"easeIn"`, `"easeOut"`, `"easeInOut"`
* `"circIn"`, `"circOut"`, `"circInOut"`
* `"backIn"`, `"backOut"`, `"backInOut"`
* `"anticipate"`

When animating keyframes, `ease` can optionally be set as an array of easing functions to set different easings between each value:

```
<motion.div
  animate={{
    x: [0, 100, 0],
    transition: { ease: ["easeIn", "easeOut"] }
  }}
/>
```

For immediate visual feedback, you can edit CSS or Motion easing curves directly in your code editor with the [Motion AI Kit Extension](/docs/ai-kit-install).

[>Motion+ Â· AI Kit

### Animation superpowers for your agent.

Turn your agent into an animation powerhouse, with best practises, performance audits, and tools to search Motion documentation and examples.

Part of Motion+. One-time fee, lifetime access.

Cursor

âº](/docs/ai-kit)

#### [`times`](#times)

When animating multiple keyframes, `times` can be used to adjust the position of each keyframe throughout the animation.

Each value in `times` is a value between `0` and `1`, representing the start and end of the animation.

```
<motion.div
  animate={{
    x: [0, 100, 0],
    transition: { times: [0, 0.3, 1] }
  }}
/>
```

There must be the same number of `times` as there are keyframes. Defaults to an array of evenly-spread durations.

### [Spring](#spring)

#### [`bounce`](#bounce)

**Default:** `0.25`

`bounce` determines the "bounciness" of a spring animation.

`0` is no bounce, and `1` is extremely bouncy.

```
<motion.div
  animate={{ rotateX: 90 }}
  transition={{ type: "spring", bounce: 0.25 }}
/>
```

`bounce` and `duration` will be overridden if `stiffness`, `damping` or `mass` are set.

#### [`visualDuration`](#visualduration)

If `visualDuration` is set, this will override `duration`.

The visual duration is a time, **set in seconds**, that the animation will take to visually appear to reach its target.

In other words, the bulk of the transition will occur before this time, and the "bouncy bit" will mostly happen after.

This makes it easier to edit a spring, as well as visually coordinate it with other time-based animations.

```
<motion.div
  animate={{ rotateX: 90 }}
  transition={{
    type: "spring",
    visualDuration: 0.5,
    bounce: 0.25
  }}
/>
```

#### [`damping`](#damping)

**Default:** `10`

Strength of opposing force. If set to 0, spring will oscillate indefinitely.

```
<motion.a
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', damping: 300 }}
/>
```

#### [`mass`](#mass)

**Default:** `1`

Mass of the moving object. Higher values will result in more lethargic movement.

```
<motion.feTurbulence
  animate={{ baseFrequency: 0.5 }}
  transition={{ type: "spring", mass: 0.5 }}
/>
```

#### [`stiffness`](#stiffness)

**Default:** `1`

Stiffness of the spring. Higher values will create more sudden movement.

```
<motion.section
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', stiffness: 50 }}
/>
```

#### [`velocity`](#velocity)

**Default:** Current value velocity

The initial velocity of the spring.

```
<motion.div
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', velocity: 2 }}
/>
```

#### [`restSpeed`](#restspeed)

**Default:** `0.1`

End animation if absolute speed (in units per second) drops below this value and delta is smaller than `restDelta`.

```
<motion.div
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', restSpeed: 0.5 }}
/>
```

#### [`restDelta`](#restdelta)

**Default:** `0.01`

End animation if distance is below this value and speed is below `restSpeed`. When animation ends, the spring will end.

```
<motion.div
  animate={{ rotate: 180 }}
  transition={{ type: 'spring', restDelta: 0.5 }}
/>
```

### [Inertia](#inertia)

An animation that decelerates a value based on its initial velocity. Optionally, `min` and `max` boundaries can be defined, and inertia will snap to these with a spring animation.

This animation will automatically precalculate a target value, which can be modified with the `modifyTarget` property.

This allows you to add snap-to-grid or similar functionality.

Inertia is also the animation used for `dragTransition`, and can be configured via that prop.

#### [`power`](#power)

**Default:** `0.8`

A higher power value equals a further calculated target.

```
<motion.div
  drag
  dragTransition={{ power: 0.2 }}
/>
```

#### [`timeConstant`](#timeconstant)

**Default:** `700`

Adjusting the time constant will change the duration of the deceleration, thereby affecting its feel.

```
<motion.div
  drag
  dragTransition={{ timeConstant: 200 }}
/>
```

#### [`modifyTarget`](#modifytarget)

A function that receives the automatically-calculated target and returns a new one. Useful for snapping the target to a grid.

```
<motion.div
  drag
  // dragTransition always type: inertia
  dragTransition={{
    power: 0,
    // Snap calculated target to nearest 50 pixels
    modifyTarget: target => Math.round(target / 50) * 50
  }}
/>
```

#### [`min`](#min)

Minimum constraint. If set, the value will "bump" against this value (or immediately spring to it if the animation starts as less than this value).

```
<motion.div
  drag
  dragTransition={{ min: 0, max: 100 }}
/>
```

#### [`max`](#max)

Maximum constraint. If set, the value will "bump" against this value (or immediately snap to it, if the initial animation value exceeds this value).

```
<motion.div
  drag
  dragTransition={{ min: 0, max: 100 }}
/>
```

#### [`bounceStiffness`](#bouncestiffness)

**Default:** `500`

If `min` or `max` is set, this affects the stiffness of the bounce spring. Higher values will create more sudden movement.

```
<motion.div
  drag
  dragTransition={{
    min: 0,
    max: 100,
    bounceStiffness: 100
  }}
/>
```

#### [`bounceDamping`](#bouncedamping)

**Default:** `10`

If `min` or `max` is set, this affects the damping of the bounce spring. If set to `0`, spring will oscillate indefinitely.

```
<motion.div
  drag
  dragTransition={{
    min: 0,
    max: 100,
    bounceStiffness: 100
  }}
/>
```

### [Orchestration](#orchestration)

#### [`delay`](#delay)

**Default:** `0`

Delay the animation by this duration (in seconds).

```
animate(element, { filter: "blur(10px)" }, { delay: 0.3 })
```

By setting `delay` to a negative value, the animation will start that long into the animation. For instance to start 1 second in, `delay` can be set to -`1`.

#### [`repeat`](#repeat)

**Default:** `0`

The number of times to repeat the transition. Set to `Infinity` for perpetual animation.

```
<motion.div
  animate={{ rotate: 180 }}
  transition={{ repeat: Infinity, duration: 2 }}
/>
```

#### [`repeatType`](#repeattype)

**Default:** `"loop"`

How to repeat the animation. This can be either:

* `loop`: Repeats the animation from the start.
* `reverse`: Alternates between forward and backwards playback.
* `mirror`: Switches animation origin and target on each iteration.

```
<motion.div
  animate={{ rotate: 180 }}
  transition={{
    repeat: 1,
    repeatType: "reverse",
    duration: 2
  }}
/>
```

#### [`repeatDelay`](#repeatdelay)

**Default:** `0`

When repeating an animation, `repeatDelay` will set the duration of the time to wait, in seconds, between each repetition.

```
<motion.div
  animate={{ rotate: 180 }}
  transition={{ repeat: Infinity, repeatDelay: 1 }}
/>
```

#### [`when`](#when)

**Default:** `false`

With variants, describes when an animation should trigger, relative to that of its children.

* `"beforeChildren"`: Children animations will play after the parent animation finishes.
* `"afterChildren"`: Parent animations will play after the children animations finish.

```
const list = {
  hidden: {
    opacity: 0,
    transition: { when: "afterChildren" }
  }
}

const item = {
  hidden: {
    opacity: 0,
    transition: { duration: 2 }
  }
}

return (
  <motion.ul variants={list} animate="hidden">
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
)
```

#### [`delayChildren`](#delaychildren)

**Default:** `0`

With variants, setting `delayChildren` on a parent will delay child animations by this duration (in seconds).

```
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

return (
  <motion.ul
    variants={container}
    initial="hidden"
    animate="show"
  >
    <motion.li variants={item} />
    <motion.li variants={item} />
  </motion.ul>
)
```

Using the `stagger` function, we can stagger the delay across children.

```
const transition = {
  delayChildren: stagger(0.1)
}
```

By default, delay will stagger across children from first to last. By using `stagger`'s `from` option, we can stagger from the last child, the center, or a specific index.

```
const transition = {
  delayChildren: stagger(0.1, { from: "last" })
}
```

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## Gesture animation

> An overview of all the gestures available in Motion for React.

_Source: [https://motion.dev/docs/react-gestures](https://motion.dev/docs/react-gestures)_

Motion extends React's basic set of event listeners with a simple yet powerful set of UI gestures.

The `motion` component currently has support for [**hover**](/docs/react-hover-animation), **tap**, **pan**, **drag, focus** and [**inView**](/docs/react-scroll-animations).

Each gesture has both a set of event listeners and a `while-` animation prop.

## [Animation props](#animation-props)

`motion` components provide multiple gesture animation props: `whileHover`, `whileTap`, `whileFocus`, `whileDrag` and `whileInView`. These can define animation targets to temporarily animate to while a gesture is active.

```
<motion.button
  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }}
/>
```

All props can be set either as a target of values to animate to, or the name of any variants defined via the `variants` prop. Variants will flow down through children as normal.

```
<motion.button
  whileTap="tap"
  whileHover="hover"
  variants={buttonVariants}
>
  <svg>
    <motion.path variants={iconVariants} />
  </svg>
</motion.button>
```

## [Gestures](#gestures)

>Live example[Open](https://examples.motion.dev/react/gestures)

### [Hover](#hover)

The hover gesture detects when a pointer hovers over or leaves a component. [Learn more about hover animations.](/docs/react-hover-animation)

```
<motion.a
  whileHover={{ scale: 1.2 }}
  onHoverStart={event => {}}
  onHoverEnd={event => {}}
/>
```

### [Tap](#tap)

The tap gesture detects when the **primary pointer** (like a left click or first touch point) presses down and releases on the same component.

```
<motion.button whileTap={{ scale: 0.9, rotate: 3 }} />
```

It will fire a `tap` event when the tap or click ends on the same component it started on, and a `tapCancel` event if the tap or click ends outside the component.

If the tappable component is a child of a draggable component, it'll automatically cancel the tap gesture if the pointer moves further than 3 pixels during the gesture.

#### [Accessibility](#accessibility)

Elements with tap events are keyboard-accessible.

Any element with a tap prop will be able to receive focus and `Enter` can be used to trigger tap events on focused elements.

* Pressing `Enter` down will trigger `onTapStart` and `whileTap`
* Releasing `Enter` will trigger `onTap`
* If the element loses focus before `Enter` is released, `onTapCancel` will fire.

>Motion+ Â· Cursor

### Gestures, with sauce.

The Motion+ `Cursor` component creates punchy cursor replacement and cursor follow gestures. Target-snapping, morphing, multi-cursor and more.

[Get Motion+ Cursor](/docs/cursor)

Part of [Motion+](/plus). One-time fee, lifetime access.

IDLE

++++01++++02++++03

### [Pan](#pan)

The pan gesture recognises when a pointer presses down on a component and moves further than 3 pixels. The pan gesture is ended when the pointer is released.

```
<motion.div onPan={(e, pointInfo) => {}} />
```

Pan doesn't currently have an associated `while-` prop.

For pan gestures to work correctly with touch input, the element needs touch scrolling to be disabled on either x/y or both axis with the `touch-action` CSS rule.

### [Drag](#drag)

The drag gesture applies pointer movement to the x and/or y axis of the component.

```
<motion.div drag whileDrag={{ scale: 1.2, backgroundColor: "#f00" }} />
```

>Live example[Open](https://examples.motion.dev/react/drag)

[Learn more about drag animations](/docs/react-drag).

### [Focus](#focus)

The focus gesture detects when a component gains or loses focus by the same rules as the [CSS :focus-visible selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible).

Typically, this is when an `input` receives focus by any means, and when other elements receive focus by accessible means (like via keyboard navigation).

```
<motion.a whileFocus={{ scale: 1.2 }} href="#" />
```

## [Event propagation](#event-propagation)

### [React components](#react-components)

React components can prevent pointer events bubbling up to their `motion` component parents using the `-Capture` props.

For instance, a child can stop parent drag and tap gestures, and their related `while-` animations, from firing by passing `e.stopPropagation()` to `onPointerDownCapture`.

```
<motion.div whileTap={{ scale: 2 }}>
  <button onPointerDownCapture={e => e.stopPropagation()} />
</motion.div>
```

### [`motion` components](#motion-components)

Because `motion` gesture handlers are deferred, `e.stopPropagation()` can't be fired in time for event propagation to be blocked from a propagating from inside a (for instance) `onTapStart` handler. Instead, use the `propagate` prop to prevent specific gestures from propagating.

Currently, `propagate` only supports `tap`.

```
<motion.div whileTap={{ scale: 2 }}>
  <motion.button
    whileTap={{ opacity: 0.8 }}
    propagate={{ tap: false }}
  />
</motion.div>
```

## [Note: SVG filters](#note-svg-filters)

Gestures aren't recognised on SVG `filter` components, as these elements don't have a physical presence and therefore don't receive events.

You can instead add `while-` props and event handlers to a parent and use variants to animate these elements.

```
const MyComponent = () => {
  return (
    <motion.svg whileHover="hover">
      <filter id="blur">
        <motion.feGaussianBlur
          stdDeviation={0}
          variants={{ hover: { stdDeviation: 2 } }}
        />
      </filter>
    </motion.svg>
  )
}
```

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## Drag animation

> Learn to build powerful, physics-based drag interactions in your React apps.

_Source: [https://motion.dev/docs/react-drag](https://motion.dev/docs/react-drag)_

Drag animations allow users to move elements with their pointer.

Motion provides a suite of features to create app-quality drag animations with a simple API:

* Momentum
* Axis control
* Elastic constraints
* Direction locking
* Optional imperative start/stop controls

Although browsers provide a native [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API), it can be challenging to create a pleasant experience, with an odd "ghost image" effect. On the other hand, it also contains native dropzone functionality - which isn't yet in Motion.

In this guide we'll take a look at all Motion's drag features and how to customise them.

>Live example[Open](https://examples.motion.dev/react/drag)

## [Usage](#usage)

### [The `drag` prop](#the-drag-prop)

The simplest way to make a component draggable is to add the `drag` prop to a `motion` component.

```
<motion.div drag />
```

### [Axis locking](#axis-locking)

To lock dragging to a single axis, you can set the prop to `"x"` or `"y"`.

```
<motion.div drag="x" />
```

### [Visual feedback with `whileDrag`](#visual-feedback-with-whiledrag)

You can animate to an animation state while an element is being dragged using the `whileDrag` prop.

When the gesture starts, the component will animate to the state defined in `whileDrag`. When it ends, it will animate back to its default `animate` state.

This is great for creating a "lift" effect, for instance by increasing the element's scale and adding a box shadow.

```
<motion.div
  drag
  whileDrag={{
    scale: 1.1,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
  }}
/>
```

### [Momentum](#momentum)

By default, when a user releases a draggable element, it has **momentum**. It will perform an inertia animation based on the velocity of the pointer, creating a realistic, physical feel.

You can disable this behaviour by setting the `dragMomentum` prop to `false`.

```
<motion.div drag dragMomentum={false} />
```

You can also customise the physics of this inertia animation with the `dragTransition` prop. This is useful for creating a heavier or bouncier feel.

```
<motion.div
  drag
  dragTransition={{
    bounceStiffness: 600,
    bounceDamping: 10
  }}
/>
```

>Motion+ Â· Carousel

### Drag, swipe, scroll.

The Motion+ `Carousel` component creates pixel-perfect, infinite carousels with drag-to-page navigation. Snap, `wheelSwipe`, page redistribution and more.

[Get Motion+ Carousel](/docs/react-carousel)

Part of [Motion+](/plus). One-time fee, lifetime access.

snap = page

* 01
* 02
* 03
* 04
* 05

âaxis=x / loop=trueâ

### [Constraints](#constraints)

You can constrain the movement of a draggable element using the `dragConstraints` prop.

>Live example[Open](https://examples.motion.dev/react/drag-constraints)

#### [Pixel constraints](#pixel-constraints)

The simplest way to apply constraints is by passing an object of `top`, `left`, `right`, and `bottom` values, measured in pixels.

```
<motion.div
  drag
  dragConstraints={{
    top: -50,
    left: -50,
    right: 50,
    bottom: 50,
  }}
/>
```

#### [Ref-based constraints](#ref-based-constraints)

For more dynamic constraints, you can pass a `ref` to another component. The draggable element will then be constrained to the bounding box of that element.

```
import { motion } from "motion/react"
import { useRef } from "react"

export function DragContainer() {
  const constraintsRef = useRef(null)

  return (
    <motion.div ref={constraintsRef} style={{ width: 300, height: 200 }}>
      <motion.div drag dragConstraints={constraintsRef} />
    </motion.div>
  )
}
```

#### [Elastic constraints](#elastic-constraints)

By default, dragging an element beyond its constraints will "tug" with some elasticity. You can change this behavior with the `dragElastic` prop, which accepts a value between `0` (no movement) and `1` (full movement).

```
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.1}
/>
```

#### [Direction locking](#direction-locking)

You can lock an element to the first axis it's dragged on by setting the `dragDirectionLock` prop to `true`.

```
<motion.div
  drag="x"
  dragDirectionLock
  onDirectionLock={axis => console.log(`Locked to ${axis} axis`)}
/>
```

>Live example[Open](https://examples.motion.dev/react/drag-lock-direction)

### [Drag events](#drag-events)

You can listen to the lifecycle of a drag gesture with a set of event listeners. These are useful for updating other parts of your UI in response to a drag.

The main events are `onDragStart`, `onDrag`, and `onDragEnd`.

>Live example[Open](https://examples.motion.dev/react/multifollow-pointer-with-spring)

Each callback is provided with the original `PointerEvent`, and an `info` object containing valuable data about the gesture's state:

* `point`: The `x` and `y` coordinates of the pointer.
* `delta`: The distance moved since the last event.
* `offset`: The distance from the element's origin.
* `velocity`: The current velocity of the pointer.

```
function onDrag(event, info) {
  console.log(info.point.x, info.point.y)
}

<motion.div drag onDrag={onDrag} />
```

### [Manual control](#manual-control)

In some cases, you might want to initiate a drag from a different element, like a handle or a video scrubber. You can achieve this with the `useDragControls` hook.

The hook returns a set of `dragControls` that you can pass to the draggable element. You can then call the `controls.start()` method from any event to begin the gesture.

```
import { motion, useDragControls } from "motion/react"

export function Scrubber() {
  const dragControls = useDragControls()

  function startDrag(event) {
    // Start the drag gesture imperatively
    dragControls.start(event, { snapToCursor: true })
  }

  return (
    <>
      <div onPointerDown={startDrag} className="scrubber-track" />
      <motion.div
        drag="x"
        dragControls={dragControls}
        dragListener={false} // Disable the default drag handler
        className="scrubber-handle"
      />
    </>
  )
}
```

## [Troubleshooting](#troubleshooting)

### [Dragging an image shows a ghost image](#dragging-an-image-shows-a-ghost-image)

Draggable components will automatically set `draggable="false"` on their rendered HTML elements, so the browser knows not to handle drag itself. However, `<img>` children will still be actively draggable, showing the browser's default ghost image effect.

These elements need `draggable` set to `false` to disable this ghost effect.

```
<motion.li drag>
  <img draggable={false} />
</motion.li>
```

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## Hover animation

> Create hover animations and interactions using Motion for React.

_Source: [https://motion.dev/docs/react-hover-animation](https://motion.dev/docs/react-hover-animation)_

Hover animations are the most common form of [gesture animation](/docs/react-gestures).

Motion improves on the CSS `:hover` psuedo-class, which can cause frustrating "sticky" states on touch devices, where hover styles can persist after a user lifts their finger.

Motion provides three powerful methods to tap into hover gestures to create reliable, cross-device hover interactions that filter out these unwanted emulated events:

* The `whileHover` animation prop
* `onHover` events
* `hover()` gesture recogniser

In this guide, we'll take a look at how (and when) to use each.

## [The `whileHover` prop](#the-whilehover-prop)

The simplest and most common way to add a hover animation with Motion is with the `motion` [component's](/docs/react-motion-component) `whileHover` prop.

It's a declarative way to define a target animation state - when a hover gesture starts, the component will animate to the values defined in it, and when the gesture ends, it'll animate back to its previous state.

```
<motion.button whileHover={{ scale: 1.1 }} />
```

### [Customise the animation](#customise-the-animation)

Transitions can be defined for when we enter a hover gesture state by setting `transition` within the `whileHover` definition.

```
<motion.button
  whileHover={{
    scale: 1.1,
    // Will be used when gesture starts
    transition: { duration: 0.1 }
  }}
  // Will be used when gesture ends
  transition={{ duration: 0.5 }}
/>
```

> Motion+ Examples

### 380+ production-ready examples.

JavaScript, React, and Vue. Copy and paste straight into your project, adapt with AI, or pipe the whole set into your agent with the Examples MCP.

[See all examples](/examples?plus=true&platform=all)

Part of [Motion+](/plus). One-time fee, lifetime access.

## [Event handlers](#event-handlers)

You can also listen for when a hover gesture starts and ends with the `onHoverStart` and `onHoverEnd` events.

```
<motion.a
  onHoverStart={() => console.log('Hover starts')}
  onHoverEnd={() => console.log('Hover ends')}
/>
```

These events differ from the browser's native pointer event handling by only firing on devices where hover is truly possible. They explicitly **won't** fire as the result of a touch event.

## [`hover()` gesture recogniser](#hover-gesture-recogniser)

To use `onHoverStart` and `onHoverEnd`, you need to import the full `motion` component. For lightweight hover gesture handling, you can import the tiny (<1kb) `hover()` [function](/docs/hover).

Because it returns a cleanup function, it's straightforward to integrate with `useEffect`:

```
import { hover } from "motion"
import { useRef, useEffect } from "react"

function Component() {
  const ref = useRef(null)

  useEffect(() => {
    return hover(ref.current, () => {
      console.log("on hover start")

      return () => console.log("on hover end")
    })
  }, [])

  return <button ref={ref} />
}
```

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## Motion component

> Animate elements with a declarative API. Supports variants, gestures, and layout animations.

_Source: [https://motion.dev/docs/react-motion-component](https://motion.dev/docs/react-motion-component)_

Most [React animations](/docs/react-animation) in Motion are powered by the `<motion />` component.

There's a `motion` component for every HTML and SVG element, for instance `motion.div`, `motion.circle` etc. It extends standard React components with animation props that run at up to 120fps - without triggering React re-renders.

## [Usage](#usage)

Import `motion` from Motion:

```
// React
import { motion } from "motion/react"

// React Server Components (Next.js etc)
import * as motion from "motion/react-client"
```

You can use a `motion` component exactly as you would any normal HTML/SVG component:

```
<motion.div className="box" />
```

But you also gain access to powerful animation APIs like the `animate`, `layout`, `whileInView` props.

```
<motion.div
  className="box"
  // Animate when this value changes:
  animate={{ scale: 2 }}
  // Fade in when the element enters the viewport:
  whileInView={{ opacity: 1 }}
  // Animate the component when its layout changes:
  layout
  // Style now supports indepedent transforms:
  style={{ x: 100 }}
/>
```

### [Performance](#performance)

`motion` components bypass React's render cycle entirely. Animated values update on every frame via the browser's native animation pipeline, so even complex animations with dozens of animated properties won't cause React re-renders or style/layout thrashing.

Using [motion values](/docs/react-motion-value) instead of React state to update `style` will also avoid re-renders.

```
const x = useMotionValue(0)

useEffect(() => {
  // Won't trigger a re-render!
  const timeout = setTimeout(() => x.set(100), 1000)

  return () => clearTimeout(timeout)
}, [])

return <motion.div style={{ x }} />
```

### [Server-side rendering](#server-side-rendering)

`motion` components are fully compatible with server-side rendering, meaning the initial state of the component will be reflected in the server-generated output.

```
// Server will output `translateX(100px)`
<motion.div initial={false} animate={{ x: 100 }} />
```

> Motion+ Components

### Unlock premium Motion APIs.

`Carousel`, `Ticker`, `AnimateNumber`, `ScrambleText`, `splitText`, `Cursor`. All built on the `<motion>` component for minimal added bundlesize.

[Get Motion+](/plus)

Part of [Motion+](/plus). One-time fee, lifetime access.

### [Custom components](#custom-components)

You can add motion capabilities to any React component with `motion.create()`. The returned component accepts all standard motion props (`animate`, `whileHover`, `drag`, `layout`, etc.) alongside the original component's props.

```
const MotionComponent = motion.create(Component)
```

Your component **must** pass a ref to the component you want to animate.

**React 18:** Use `forwardRef` to wrap the component and pass `ref` to the element you want to animate:

```
const Component = React.forwardRef((props, ref) => {
  return <div ref={ref} />
})
```

**React 19:** React 19 can pass `ref` via `props`:

```
const Component = (props) => {
  return <div ref={props.ref} />
})
```

It's also possible to pass strings to `motion.create`, which will create custom DOM elements.

```
// Will render <custom-element /> into HTML
const MotionComponent = motion.create('custom-element')
```

By default, all `motion` props (like `animate` etc) are filtered out of the `props` forwarded to the provided component. By providing a `forwardMotionProps` config, the provided component will receive these props.

```
motion.create(Component, { forwardMotionProps: true })
```

Building with AI? The [Motion AI Kit MCP](./ai-kit-context) gives your AI editor access to the latest docs and source code of 380+ examples.


Make sure not to call `motion.create()` within a React render function! This will make a new component every render, breaking your animations.

## [Props](#props)

`motion` components accept the following props.

### [Animation](#animation)

Motion provides declarative animation props like `animate` and `exit`. [Learn more about React animations in Motion](/docs/react-animation).

#### [`initial`](#initial)

The initial visual state of the `motion` component.

This can be set as an animation target:

```
<motion.section initial={{ opacity: 0, x: 0 }} />
```

Variants:

```
<motion.li initial="visible" />
```

```
<motion.div initial={["visible", "active"]} />
```

Or set as `false` to disable the enter animation and initially render as the values found in `animate`.

```
<motion.div initial={false} animate={{ opacity: 0 }} />
```

#### [`animate`](#animate)

A target to animate to on enter, and on update.

Can be set as an animation target:

```
<motion.div
  initial={{ boxShadow: "0px 0px #000" }}
  animate={{ boxShadow: "10px 10px #000" }}
/>
```

Or variants:

```
<motion.li animate="visible" />
```

```
<motion.div initial="hidden" animate={["visible", "active"]} />
```

#### [`exit`](#exit)

A target to animate to when a component is removed from the tree. Can be set either as an animation target, or variant.

Owing to React limitations, the component being removed must be a direct child of `AnimatePresence` to enable this animation.

#### [`transition`](#transition)

The default [transition](/docs/react-transitions) for this component to use when an animation prop (`animate`, `whileHover` etc) has no `transition` defined.

```
<motion.div transition={{ type: "spring" }} animate={{ scale: 1.2 }} />
```

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

MOTION

EaseSpring

Duration0.3

Delay0

âºSaved transitions12

### Visual editing for IDEs.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion+. One-time fee, lifetime access.](/plus)

#### [`variants`](#variants)

The [variants](/docs/react-animation#variants) for this component.

```
const variants = {
  active: {
      backgroundColor: "#f00"
  },
  inactive: {
    backgroundColor: "#fff",
    transition: { duration: 2 }
  }
}

return (
  <motion.div
    variants={variants}
    animate={isActive ? "active" : "inactive"}
  />
)
```

#### [`style`](#style)

The normal React DOM `style` prop, with added support for [motion values](/docs/react-motion-value) and independent transforms.

```
const x = useMotionValue(30)

return <motion.div style={{ x, rotate: 90, originX: 0.5 }} />
```

#### [`onUpdate`](#onupdate)

Callback triggered every frame any value on the `motion` component updates. It's provided a single argument with the latest values.

```
<motion.article
  animate={{ opacity: 1 }}
  onUpdate={latest => console.log(latest.opacity)}
/>
```

#### [`onAnimationStart`](#onanimationstart)

Callback triggered when any animation (except layout animations, see `onLayoutAnimationStart`) starts.

It's provided a single argument, with the target or variant name of the started animation.

```
<motion.circle
  animate={{ r: 10 }}
  onAnimationStart={latest => console.log(latest.r)}
/>
```

#### [`onAnimationComplete`](#onanimationcomplete)

Callback triggered when any animation (except layout animations, see `onLayoutAnimationComplete`) completes.

It's provided a single argument, with the target or variant name of the completed animation.

```
<motion.circle
  animate={{ r: 10 }}
  onAnimationComplete={latest => console.log(latest.r)}
/>
```

### [Hover](#hover)

#### [`whileHover`](#whilehover)

Animation state, or variant label, to perform a [hover animation](/docs/react-hover-animation) to while the hover gesture is active.

```
// As target
<motion.button whileHover={{ scale: 1.2 }} />
```

```
// As variants
<motion.div whileHover="hovered" />
```

#### [`onHoverStart`](#onhoverstart)

Callback function that fires when a pointer starts hovering over the component. Provided the triggering `PointerEvent`.

```
<motion.div onHoverStart={(event) => console.log(event)} />
```

#### [`onHoverEnd`](#onhoverend)

Callback function that fires when a pointer stops hovering over the component. Provided the triggering `PointerEvent`.

```
<motion.div onHoverEnd={(event) => console.log(event)} />
```

#### [Tap](#tap)

#### [`whileTap`](#whiletap)

Animation state, or variant label, to perform a [press animation](/docs/react-gestures) to while the hover gesture is active.

```
// As target
<motion.button whileTap={{ scale: 0.9 }} />
```

```
// As variants
<motion.div whileTap="tapped" />
```

#### [`onTapStart`](#ontapstart)

Callback function that fires when a pointer starts pressing the component. Provided the triggering `PointerEvent`.

```
<motion.div onTapStart={(event) => console.log(event)} />
```

#### [`onTap`](#ontap)

Callback function that fires when a pointer stops pressing the component and the pointer was released **inside** the component. Provided the triggering `PointerEvent`.

```
<motion.div onTap={(event) => console.log(event)} />
```

#### [`onTapCancel`](#ontapcancel)

Callback function that fires when a pointer stops pressing the component and the pointer was released **outside** the component. Provided the triggering `PointerEvent`.

```
<motion.div onTapCancel={(event) => console.log(event)} />
```

### [Focus](#focus)

#### [`whileFocus`](#whilefocus)

Animation state, or variant label, to animate to while the focus gesture is active.

```
// As target
<motion.button whileFocus={{ outline: "dashed #000" }} />
```

```
// As variants
<motion.div whileFocus="focused" />
```

### [Pan](#pan)

#### [`onPan`](#onpan)

Callback function that fires when the pan gesture is recognised on this element.

```
function onPan(event, info) {
  console.log(info.point.x, info.point.y)
}

<motion.div onPan={onPan} />
```

Pan and drag events are provided the origin `PointerEvent` as well as an object `info` that contains `x` and `y` point values for the following:

* `point`: Relative to the device or page.
* `delta`: Distance since the last event.
* `offset`: Distance from the original event.
* `velocity`: Current velocity of the pointer.

For pan gestures to work correctly with touch input, the element needs touch scrolling to be disabled on either x/y or both axis with the `touch-action` CSS rule.

#### [`onPanStart`](#onpanstart)

Callback function that fires when a pan gesture starts. Provided the triggering `PointerEvent` and `info`.

```
<motion.div onPanStart={(event, info) => console.log(info.delta.x)} />
```

#### [`onPanEnd`](#onpanend)

Callback function that fires when a pan gesture ends. Provided the triggering `PointerEvent` and `info`.

```
<motion.div onPanEnd={(event, info) => console.log(info.delta.x)} />
```

### [Drag](#drag)

#### [`drag`](#drag-1)

**Default:** `false`

Enable dragging for this element. Set `true` to drag in both directions. Set `"x"` or `"y"` to only drag in a specific direction.

```
<motion.div drag />
```

#### [`whileDrag`](#whiledrag)

Animation state, or variant label, to perform a [drag animation](/docs/react-drag) to while the hover gesture is active.

```
// As target
<motion.div drag whileDrag={{ scale: 0.9 }} />
```

```
// As variants
<motion.div drag whileDrag="dragging" />
```

#### [`dragConstraints`](#dragconstraints)

Applies constraints on the draggable area.

Set as an object of optional `top`, `left`, `right`, and `bottom` values, measured in pixels:

```
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 300 }}
/>
```

Or as a `ref` to another element to use its bounding box as the draggable constraints:

```
const MyComponent = () => {
  const constraintsRef = useRef(null)

  return (
     <motion.div ref={constraintsRef}>
         <motion.div drag dragConstraints={constraintsRef} />
     </motion.div>
  )
}
```

#### [`dragSnapToOrigin`](#dragsnaptoorigin)

**Default:** `false`

If `true`, the draggable element will animate back to its center/origin when released.

```
<motion.div drag dragSnapToOrigin />
```

#### [`dragElastic`](#dragelastic)

**Default:** `0.5`

The degree of movement allowed outside constraints. `0` = no movement, `1` = full movement.

Set to `0.5` by default. Can also be set as `false` to disable movement.

By passing an object of `top`/`right`/`bottom`/`left`, individual values can be set per constraint. Any missing values will be set to `0`.

```
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.2}
/>
```

#### [`dragMomentum`](#dragmomentum)

**Default:** `true`

Apply momentum from the pan gesture to the component when dragging finishes. Set to `true` by default.

```
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragMomentum={false}
/>
```

#### [`dragTransition`](#dragtransition)

Allows you to change dragging momentum transition. When releasing a draggable element, an animation with type `"inertia"` starts. The animation is based on your dragging velocity. This property allows you to customize it.

```
<motion.div
  drag
  dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
/>
```

#### [`dragDirectionLock`](#dragdirectionlock)

**Default:** `false`

Locks drag direction into the soonest detected direction. For example, if the component is moved more on the `x` axis than `y` axis before the drag gesture kicks in, it will **only** drag on the `x` axis for the remainder of the gesture.

```
<motion.div drag dragDirectionLock />
```

#### [`dragPropagation`](#dragpropagation)

**Default:** `false`

Allows drag gesture propagation to child components.

```
<motion.div drag="x" dragPropagation />
```

#### [`dragControls`](#dragcontrols)

Usually, dragging is initiated by pressing down on a component and moving it. For some use-cases, for instance clicking at an arbitrary point on a video scrubber, we might want to initiate dragging from a different component than the draggable one.

By creating a `dragControls` using the `useDragControls` [hook](/docs/react-use-drag-controls), we can pass this into the draggable component's `dragControls` prop. It exposes a `start` method that can start dragging from pointer events on other components.

```
const dragControls = useDragControls()

function startDrag(event) {
  dragControls.start(event, { snapToCursor: true })
}

return (
  <>
    <div onPointerDown={startDrag} />
    <motion.div drag="x" dragControls={dragControls} />
  </>
)
```

Given that by setting `dragControls` you are taking control of initiating the drag gesture, it is possible to disable the draggable element as the initiator by setting `dragListener={false}`.

#### [`dragListener`](#draglistener)

Determines whether to trigger the drag gesture from event listeners. If passing `dragControls`, setting this to `false` will ensure dragging can only be initiated by the controls, rather than a `pointerdown` event on the draggable element.

>Motion+ Â· Carousel

### Drag, swipe, scroll.

The Motion+ `Carousel` component creates pixel-perfect, infinite carousels with drag-to-page navigation. Snap, `wheelSwipe`, page redistribution and more.

[Get Motion+ Carousel](/docs/react-carousel)

Part of [Motion+](/plus). One-time fee, lifetime access.

snap = page

* 01
* 02
* 03
* 04
* 05

âaxis=x / loop=trueâ

#### [`onDrag`](#ondrag)

Callback function that fires when the drag gesture is recognised on this element.

```
function onDrag(event, info) {
  console.log(info.point.x, info.point.y)
}

<motion.div drag onDrag={onDrag} />
```

Pan and drag events are provided the origin `PointerEvent` as well as an object `info` that contains `x` and `y` point values for the following:

* `point`: Relative to the device or page.
* `delta`: Distance since the last event.
* `offset`: Distance from the original event.
* `velocity`: Current velocity of the pointer.

#### [`onDragStart`](#ondragstart)

Callback function that fires when a drag gesture starts. Provided the triggering `PointerEvent` and `info`.

```
<motion.div drag onDragStart={(event, info) => console.log(info.delta.x)} />
```

#### [`onDragEnd`](#ondragend)

Callback function that fires when a drag gesture ends. Provided the triggering `PointerEvent` and `info`.

```
<motion.div drag onDragEnd={(event, info) => console.log(info.delta.x)} />
```

#### [`onDirectionLock`](#ondirectionlock)

Callback function that fires a drag direction is determined.

```
<motion.div
  drag
  dragDirectionLock
  onDirectionLock={axis => console.log(axis)}
/>
```

### [Gestures](#gestures)

#### [`propagate`](#propagate)

Prevent children gestures from propagating to their parents. Currently only supports `tap`.

```
<motion.div whileTap={{ scale: 2 }}>
  // Pressing this button won't fire the above scale animation
  <motion.button
    whileTap={{ opacity: 0.8 }}
    propagate={{ tap: false }}
  />
</motion.div>
```

### [Viewport](#viewport)

Learn more about [scroll-triggered animations](/docs/react-scroll-animations) in React.

#### [`whileInView`](#whileinview)

Target or variants to label to while the element is in view.

```
// As target
<motion.div whileInView={{ opacity: 1 }} />
```

```
// As variants
<motion.div whileInView="visible" />
```

#### [`viewport`](#viewport-1)

Options to define how the element is tracked within the viewport.

```
<motion.section
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
/>
```

Available options:

* `once`: If `true`, once element enters the viewport it won't detect subsequent leave/enter events.
* `root`: The `ref` of an ancestor scrollable element to detect intersections with (instead of `window`).
* `margin`: A margin to add to the viewport to change the detection area. Defaults to `"0px"`. Use multiple values to adjust top/right/bottom/left, e.g. `"0px -20px 0px 100px"`.
* `amount`: The amount of an element that should enter the viewport to be considered "entered". Either `"some"`, `"all"` or a number between `0` and `1`. Defaults to `"some"`.

#### [`onViewportEnter`](#onviewportenter)

Callback function that fires when an element enters the viewport. Provided the `IntersectionObserverEntry` with details of the intersection event.

```
<motion.div onViewportEnter={(entry) => console.log(entry.isIntersecting)} />
```

#### [`onViewportLeave`](#onviewportleave)

Callback function that fires when an element enters the viewport. Provided the `IntersectionObserverEntry` with details of the intersection event.

```
<motion.div onViewportLeave={(entry) => console.log(entry.intersectionRect)} />
```

### [Layout](#layout)

Learn more about [layout animations](/docs/react-layout-animations) in React.

#### [`layout`](#layout-1)

**Default:** `false`

If `true`, this component will perform [layout animations](/docs/react-layout-animations).

```
<motion.div layout />
```

If set to `"position"` or `"size"`, only its position or size will animate, respectively.

```
<motion.img layout="position" />
```

#### [`layoutId`](#layoutid)

If set, this component will animate changes to its layout. Additionally, when a new element enters the DOM and an element already exists with a matching `layoutId`, it will animate out from the previous element's size/position.

```
{items.map(item => (
   <motion.li layout>
      {item.name}
      {item.isSelected && <motion.div layoutId="underline" />}
   </motion.li>
))}
```

If the previous component remains in the tree, the two elements will crossfade.

#### [`layoutDependency`](#layoutdependency)

By default, layout changes are detected every render. To reduce measurements and thus improve performance, you can pass a `layoutDependency` prop. Measurements will only occur when this value changes.

```
<motion.nav layout layoutDependency={isOpen} />
```

### [`layoutAnchor`](#layoutanchor)

**Default:** `{ x: 0, y: 0 }`

Motion's layout animations look correct when a parent and child animate with different transitions, because it resolves the child's position relative to its parent.

By default, it does this using the top/left of the parent. `layoutAnchor` can customise this point, where `x` and `y` can be set as independent progress values between `0` and `1`.

* `0` = top/left
* `0.5` = center
* `1` = bottom/right

Setting to `false` disables relative projection for this element, and elements will animate relative to their page-relative change.

```
<motion.ul layout>
  <motion.li
    layout
    layoutAnchor={{ x: 1, y: 0 }} 
    transition={{ delay: 1 }}
  />
</motion.ul>
```

>Live example[Open](https://examples.motion.dev/react/layout-anchor)

#### [`layoutScroll`](#layoutscroll)

For layout animations to work correctly within scrollable elements, their scroll offset needs measuring. For performance reasons, Framer Motion doesn't measure the scroll offset of every ancestor. Add the `layoutScroll` prop to elements that should be measured.

```
<motion.div layoutScroll style={{ overflow: "scroll" }}>
  <motion.div layout />
</motion.div>
```

#### [`layoutRoot`](#layoutroot)

For layout animations to work correctly within `position: fixed` elements, we need to account for page scroll. Add `layoutRoot` to mark an element as `position: fixed`.

```
<motion.div layoutRoot style={{ position: "fixed" }}>
  <motion.div layout />
</motion.div>
```

#### [`onLayoutAnimationStart`](#onlayoutanimationstart)

A callback to run when a layout animation starts.

#### [`onLayoutAnimationComplete`](#onlayoutanimationcomplete)

A callback to run when a layout animation completes.

### [Advanced](#advanced)

#### [`inherit`](#inherit)

Set to `false` to prevent a component inheriting or propagating changes in a parent variant.

#### [`custom`](#custom)

Custom data to pass through to dynamic variants.

```
const variants = {
  visible: (custom) => ({
    opacity: 1,
    transition: { delay: custom * 0.2 }
  })
}

return (
  <motion.ul animate="visible">
    <motion.li custom={0} variants={variants} />
    <motion.li custom={1} variants={variants} />
    <motion.li custom={2} variants={variants} />
  </motion.ul>
)
```

#### [`transformTemplate`](#transformtemplate)

By default, transforms are applied in order of `translate`, `scale`, `rotate` and `skew`.

To change this, `transformTemplate` can be set as a function that accepts the latest transforms and the generated transform string and returns a new transform string.

```
// Use the latest transform values
<motion.div
  style={{ x: 0, rotate: 180 }}
  transformTemplate={
    ({ x, rotate }) => `rotate(${rotate}deg) translateX(${x}px)`
  }
/>
```

```
// Or the generated transform string
<motion.div
  style={{ x: 0, rotate: 180 }}
  transformTemplate={
    (latest, generated) => `translate(-50%, -50%) ${generated}`
  }
/>
```

## [FAQs](#faqs)

What is the `<motion />` component?
:   `<motion />` is a drop-in replacement for HTML and SVG elements that adds animation capabilities. Instead of writing `<div>`, you write `<motion.div>`. The element behaves identically but can now accept animation props like `animate`, `whileHover`, and `transition`.

How do I animate an element in React with Motion?
:   Pass an `animate` prop to any `<motion />` component with the values you want to animate to. For example, `<motion.div animate={{ opacity: 1 }} />` will animate opacity from its current value to 1. Motion automatically detects changes and animates between them.

Does `<motion />` affect performance?
:   `<motion />` is optimised to animate `transform` and `opacity` on the compositor thread wherever possible, avoiding layout and paint. For best performance, prefer animating `transform` and `opacity` over properties like `width` or `top`.

Can I use `<motion />` with custom components?
:   Yes. Use `motion.create()` to wrap any component that forwards its ref and accepts a `style` prop. For example: `const MotionButton = motion.create(Button)`.

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## AnimateActivity

> Add powerful enter, exit, and layout animations to components managed by React's <Activity>

_Source: [https://motion.dev/docs/react-animate-activity](https://motion.dev/docs/react-animate-activity)_

`AnimateActivity` is an animated version of React's `Activity` component. It allows you to add exit animations when hiding elements.

Whereas `AnimatePresence` animates elements when they're **added** and **removed** from the tree, `AnimateActivity` uses the `Activity` component to **show** and **hide** the children with `display: none`, maintaining their internal state.

```
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
</AnimateActivity>
```

`AnimateActivity` is currently available in [Motion+](../plus) Early Access. As an Early Access API, expect changes as we receive feedback.

>Live example[Open](https://examples.motion.dev/react/animate-activity)

## [Install](#install)

First, add the `motion-plus` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](../plus) to generate a private token.

```
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.0.2&token=YOUR_AUTH_TOKEN"
```

Once installed, `AnimateActivity` can be imported via `motion-plus/animate-activity`.

`AnimateActivity` requires `motion@12.23.24` and `react@19.2.0` or above.

Once out of alpha, `AnimateActivity` will be imported from the main `"motion"` package.

## [Usage](#usage)

`AnimateActivity` shares the same API as `Activity`. By switching the `mode` prop from `"visible"` to `"hidden"`, its child element will be hidden with `display: none` **after** child exit animations have completed.

```
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <Tab />
</AnimateActivity>
```

```
function Tab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
}
```

### [Sequencing](#sequencing)

As with `AnimatePresence`, we can use [variants](https://motion.dev/docs/react-animation#variants) to sequence exit animations through a tree.

```
<AnimateActivity mode={isVisible ? "visible" : "hidden"}>
  <motion.ul
    exit="hidden"
    variants={{
      hidden: { delayChildren: stagger(0.1) }
    }}
  >
    {items.map(item => (
      <motion.li
        variants={{ hidden: { opacity: 0 }}}
      >
        {item.title}
      </motion.li>
    ))}
  </motion.ul>
</AnimateActivity>
```

## [Layout](#layout)

By default, exiting children will maintain their default styles in the DOM. This means that if they're `position: static` or in some way affecting the layout of the elements around them, they continue to do so until the exit animation is complete.

We can change this by setting `layoutMode` to `"pop"`. This will immediately pop the element out of its layout, allowing surrounding elements to reflow while it exits.

```
<AnimateActivity
  mode={isVisible ? "visible" : "hidden"}
  layoutMode="pop"
/>
```

---

## AnimatePresence

> Add exit animations to React components when they're removed from the page.

_Source: [https://motion.dev/docs/react-animate-presence](https://motion.dev/docs/react-animate-presence)_

`AnimatePresence` makes exit animations easy. By wrapping one or more `motion` [components](/docs/react-motion-component) with `AnimatePresence`, we gain access to the `exit` animation prop.

```
<AnimatePresence>
  {show && <motion.div key="modal" exit={{ opacity: 0 }} />}
</AnimatePresence>
```

>Live example[Open](https://examples.motion.dev/react/exit-animation)

## [Usage](#usage)

### [Import](#import)

```
import { AnimatePresence } from "motion/react"
```

### [Exit animations](#exit-animations)

`AnimatePresence` works by detecting when its **direct children** are removed from the React tree.

This can be due to a component mounting/remounting:

```
<AnimatePresence>
  {show && <Modal key="modal" />}
</AnimatePresence>
```

Its `key` changing:

```
<AnimatePresence>
  <Slide key={activeItem.id} />
</AnimatePresence>
```

Or when children in a list are added/removed:

```
<AnimatePresence>
  {items.map(item => (
    <motion.li key={item.id} exit={{ opacity: 1 }} layout />
  ))}
</AnimatePresence>
```

Any `motion` components within the exiting component will fire animations defined on their `exit` props before the component is removed from the DOM.

```
function Slide({ img, description }) {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <img src={img.src} />
      <motion.p exit={{ y: 10 }}>{description}</motion.p>
    </motion.div>
  )
}
```

Like `initial` and `animate`, `exit` can be defined either as an object of values, or as a variant label.

```
const modalVariants = {
  visible: { opacity: 1, transition: { when: "beforeChildren" } },
  hidden: { opacity: 0, transition: { when: "afterChildren" } }
}

function Modal({ children }) {
  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      {children}
    </motion.div>
  )
}
```

Direct children must each have a unique `key` prop so `AnimatePresence` can track their presence in the tree.

### [Changing `key`](#changing-key)

Changing a `key` prop makes React create an entirely new component. So by changing the `key` of a single child of `AnimatePresence`, we can easily make components like slideshows.

```
export const Slideshow = ({ image }) => (
  <AnimatePresence>
    <motion.img
      key={image.src}
      src={image.src}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    />
  </AnimatePresence>
)
```

### [Access presence state](#access-presence-state)

Any child of `AnimatePresence` can access presence state with the `useIsPresence` hook.

```
import { useIsPresent } from "motion/react"

function Component() {
  const isPresent = useIsPresent()

  return isPresent ? "Here!" : "Exiting..."
}
```

This allows you to change content or styles when a component is no longer rendered.

### [Access presence data](#access-presence-data)

When a component has been removed from the React tree, its props can no longer be updated. We can use `AnimatePresence`'s `custom` prop to pass new data down through the tree, even into exiting components.

```
<AnimatePresence custom={swipeDirection}>
  <Slide key={activeSlideId}>
```

Then later we can extract that using `usePresenceData`.

```
import { AnimatePresence, usePresenceData } from "motion/react"

function Slide() {
  const isPresent = useIsPresent()
  const direction = usePresenceData()

  return (
    <motion.div exit={{ opacity: 0 }}>
      {isPresent ? "Here!" : "Exiting " + direction}
    </motion.div>
  )
}
```

>Live example[Open](https://examples.motion.dev/react/use-presence-data)

### [Manual usage](#manual-usage)

It's also possible to manually tell `AnimatePresence` when a component is safe to remove with the `usePresence` hook.

This returns both `isPresent` state and a callback, `safeToRemove`, that should be called when you're ready to remove the component from the DOM (for instance after a manual animation or other timeout).

```
import { usePresence } from "motion/react"

function Component() {
  const [isPresent, safeToRemove] = usePresence()

  useEffect(() => {
    // Remove from DOM 1000ms after being removed from React
    !isPresent && setTimeout(safeToRemove, 1000)
  }, [isPresent])

  return <div />
}
```

### [Propagate exit animations](#propagate-exit-animations)

By default, `AnimatePresence` controls the `exit` animations on all of its children, **until** another `AnimatePresence` component is rendered.

```
<AnimatePresence>
  {show ? (
    <motion.section exit={{ opacity: 0 }}>
      <AnimatePresence>
        {/*
          * When `show` becomes `false`, exit animations
          * on these children will not fire.
          */}
        {children}
      </AnimatePresence>
    </motion.section>
  ) : null}
</AnimatePresence>
```

By setting an `AnimatePresence` component's `propagate` prop to `true`, when it's removed from another `AnimatePresence` it will fire all of **its** children's exit animations.

```
<AnimatePresence>
  {show ? (
    <motion.section exit={{ opacity: 0 }}>
      <AnimatePresence propagate>
        {/*
          * When `show` becomes `false`, exit animations
          * on these children **will** fire.
          */}
        {children}
      </AnimatePresence>
    </motion.section>
  ) : null}
</AnimatePresence>
```

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)


> Motion+ Examples

### 380+ production-ready examples.

JavaScript, React, and Vue. Copy and paste straight into your project, adapt with AI, or pipe the whole set into your agent with the Examples MCP.

[See all examples](/examples?plus=true&platform=all)

Part of [Motion+](/plus). One-time fee, lifetime access.

## [Props](#props)

### [`initial`](#initial)

By passing `initial={false}`, `AnimatePresence` will disable any initial animations on children that are present when the component is first rendered.

```
<AnimatePresence initial={false}>
  <Slide key={activeItem.id} />
</AnimatePresence>
```

### [`custom`](#custom)

When a component is removed, there's no longer a chance to update its props (because it's no longer in the React tree). Therefore we can't update its exit animation with the same render that removed the component.

By passing a value through `AnimatePresence`'s `custom` prop, we can use dynamic variants to change the `exit` animation.

```
const variants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === 1 ? -300 : 300
  }),
  visible: { opacity: 1, x: 0 }
}

export const Slideshow = ({ image, direction }) => (
  <AnimatePresence custom={direction}>
    <motion.img
      key={image.src}
      src={image.src}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    />
  </AnimatePresence>
)
```

This data can be accessed by children via `usePresenceData`.

### [`mode`](#mode)

**Default:** `"sync"`

Decides how `AnimatePresence` handles entering and exiting children.

>Live example[Open](https://examples.motion.dev/react/animate-presence-modes)

#### [`sync`](#sync)

In `"sync"` mode, elements animate in and out as soon as they're added/removed.

This is the most basic (and default) mode - `AnimatePresence` takes no opinion on sequencing animations or layout. Therefore, if element layouts conflict (as in the above example), you can either implement your own solution (using `position: absolute` or similar), or try one of the other two `mode` options.

#### [`wait`](#wait)

In `"wait"` mode, the entering element will **wait** until the exiting child has animated out, before it animates in.

This is great for sequential animations, presenting users with one piece of information or one UI element at a time.

`wait` mode only supports one child at a time.


Try setting `ease: "easeIn"` (or similar) on the exit animation, and `ease: "easeOut"` on the enter animation for an overall `easeInOut` easing effect.

#### [`popLayout`](#poplayout)

Exiting elements will be "popped" out of the page layout, allowing surrounding elements to immediately reflow. Pairs especially well with the `layout` prop, so elements can animate to their new layout.

```
<AnimatePresence>
  {items.map(item => (
    <motion.li layout exit={{ opacity: 0 }} />
  )}
</AnimatePresence>
```

For a more detailed comparison, check out the [full AnimatePresence modes tutorial](/tutorials/react-animate-presence-modes).

When using `popLayout` mode, any immediate child of AnimatePresence that's a custom component must be wrapped in React's `forwardRef` function, forwarding the provided `ref` to the DOM node you wish to pop out of the layout.

### [`onExitComplete`](#onexitcomplete)

Fires when all exiting nodes have completed animating out.

### [`propagate`](#propagate)

**Default:** `false`

If set to `true`, exit animations on children will also trigger when this `AnimatePresence` exits from a parent `AnimatePresence`.

```
<AnimatePresence>
  {show ? (
    <motion.section exit={{ opacity: 0 }}>
      <AnimatePresence propagate>
        {/* This exit prop will now fire when show is false */}
        <motion.div exit={{ x: -100 }} />
      </AnimatePresence>
    </motion.section>
  ) : null}
</AnimatePresence>
```

### [`root`](#root)

Root element for injecting `popLayout` styles. Defaults to `document.head` but can be set to another `ShadowRoot`, for use within shadow DOM.

## [Troubleshooting](#troubleshooting)

### [Exit animations aren't working](#exit-animations-arent-working)

Ensure all **immediate** children get a unique `key` prop that **remains the same for that component every render**.

For instance, providing `index` as a `key` is **bad** because if the items reorder then the `index` will not be matched to the `item`:

```
<AnimatePresence>
  {items.map((item, index) => (
    <Component key={index} />
  ))}
</AnimatePresence>
```

It's preferred to pass something that's unique to that item, for instance an ID:

```
<AnimatePresence>
  {items.map((item) => (
    <Component key={item.id} />
  ))}
</AnimatePresence>
```

Also make sure `AnimatePresence` is **outside** of the code that unmounts the element. If `AnimatePresence` itself unmounts, then it can't control exit animations!

For example, this will **not work**:

```
isVisible && (
  <AnimatePresence>
    <Component />
  </AnimatePresence>
)
```

Instead, the conditional should be at the root of `AnimatePresence`:

```
<AnimatePresence>
  {isVisible && <Component />}
</AnimatePresence>
```

### [Layout animations not working with `mode="sync"`](#layout-animations-not-working-with-modesync)

When mixing exit and [layout animations](/docs/react-layout-animations), it might be necessary to wrap the group in `LayoutGroup` to ensure that components outside of `AnimatePresence` know when to perform a layout animation.

```
<LayoutGroup>
  <motion.ul layout>
    <AnimatePresence>
      {items.map(item => (
        <motion.li layout key={item.id} />
      ))}
    </AnimatePresence>
  </motion.ul>
</LayoutGroup>
```

### [Layout animations not working with `mode="popLayout"`](#layout-animations-not-working-with-modepoplayout)

When any HTML element has an active `transform` it temporarily becomes the [offset parent](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent) of its children. This can cause children with `position: "absolute"` not to appear where you expect.  
  
`mode="popLayout"` works by using `position: "absolute"`. So to ensure consistent and expected positioning during a layout animation, ensure that the animating parent has a `position` other than `"static"`.

```
<motion.ul layout style={{ position: "relative" }}>
  <AnimatePresence mode="popLayout">
    {items.map(item => (
      <motion.li layout key={item.id} />
    ))}
  </AnimatePresence>
</motion.ul>
```

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## AnimateView

> Animate between views and create page transitions with the AnimateView component.

_Source: [https://motion.dev/docs/react-animate-view](https://motion.dev/docs/react-animate-view)_

`AnimateView` allows you to animate elements between different views using the browser's native [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API).

It's a 3kb component built on top of Motion's mini `animate()` function and React's `ViewTransition` component, providing a simple API for adding values like `clipPath` and configuring animations with Motion's [transitions](./react-transitions), including springs.

It's possible to write specific animations for when elements enter and exit the DOM, when they update, or when performing shared element animations.

```
{isOpen && (
  <AnimateView transition={{ type: spring }}>
    <div className="modal" />
  </AnimateView>
)}
```

`AnimateView` is currently available in [Motion+](../plus) Early Access. As an Early Access API, expect changes as we receive feedback.

>Live example[Open](https://examples.motion.dev/react/animate-view-toggle)

## [Install](#install)

First, add the `motion-plus` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](../plus) to generate a private token.

```
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.8.0&token=YOUR_AUTH_TOKEN"
```

Once installed, `AnimateView` can be imported via `motion-plus/animate-view`.

`AnimateView` is built on React's `ViewTransition` component and therefore requires `motion@12.34.0` and `react@canary` or above.

Once out of alpha, `AnimateView` will be imported from the main `"motion"` package.

## [Usage](#usage)

Import `AnimateView` from `"motion-plus/animate-view"`.

```
import { AnimateView } from "motion-plus/animate-view"
```

### [Enter/exit animations](#enterexit-animations)

To animate an element as it enters and exits the DOM, we can just wrap it in `<AnimateView>`.

```
{show && (
  <AnimateView>
    <div className="box" />
  </AnimateView>
)}
```

Now, when `show` is changed within a React `startTransition`, the element will perform the browser's default fade in/out animation as it enters and leaves the DOM.

```
startTransition(() => setShow(!show))
```

View transitions will only trigger when state changes are wrapped in `startTransition`.

The full setup looks like this:

```
import { AnimateView } from "motion-plus/animate-view"
import { startTransition, useState } from "react"

function Example() {
  const [show, setShow] = useState(true)
  
  return (
    <>
      <button onClick={() => startTransition(() => setShow(!show))}>
        Toggle
      </button>
      {show && (
        <AnimateView>
          <div className="box" />
        </AnimateView>
      )}
    </>
  )
}
```

### [Configure the transition](#configure-the-transition)

It's possible to set a default transition for all view transitions via the `transition` prop. This accepts all Motion's [transition options](./react-transitions).

```
<AnimateView transition={{ duration: 1, ease: "easeOut" }}>
  <div className="box" />
</AnimateView>
```

You can also set a `transition` for specific `enter`, `exit`, `share` and `update` animations:

```
<AnimateView enter={{
  transition: { type: spring, bounce: 0, duration: 0.6 }
}}>
  <div className="box" />
</AnimateView>
```

`AnimateView` is built on Motion's mini `animate()` function for a tiny filesize. Therefore, `spring` must be explicitly imported from `"motion"` and passed to the `type` transition option.

### [Setting values](#setting-values)

By default, `AnimateView` will animate elements using the browser's default opacity animation. But, if you set your own values within `enter`, `exit`, `share` or `update` then this crossfade will be disabled.

```
<AnimateView enter={{ clipPath: ["inset(0 50% 0 100%)", "inset(0 0% 0 0%)"] }}>
```

>Live example[Open](https://examples.motion.dev/react/animate-view-clip-path)

You can re-enable a `opacity` animation by also passing this to the prop:

```
<AnimateView enter={{
  opacity: 1,
  clipPath: ["inset(0 50% 0 100%)", "inset(0 0% 0 0%)"]
}}>
```

### [Animating updates](#animating-updates)

Elements wrapped in `AnimateView` will also animate whenever their content or visual styles change, crossfading between the two views. This animation can be customised with the `update` prop.

```
<AnimateView update={{ ease: "easeInOut" }}>
  <div style={{ backgroundColor }} />
</AnimateView>
```

If the element physically moves or changes size, this change will also be animated. We can use this to create, for example, reorder list animations.

```
function ReorderList({ items }) {
  return (
    <div className="list">
      {items.map((item) => (
        <AnimateView
          key={item.id}
          transition={{ type: spring, bounce: 0.2 }}
        >
          <div className="list-item">{item.label}</div>
        </AnimateView>
      ))}
    </div>
  )
}
```

>Live example[Open](https://examples.motion.dev/react/animate-view-reorder)

### [Shared element animations](#shared-element-animations)

When an `AnimateView` component with a `name` prop exits the DOM, and another one with the same `name` enters it within the same transition, the two elements will perform a shared element animation.

```
if (selectedItem) {
  return <Modal selectedItem={selectedItem} />
}

return <Items setSelectedItem={setSelectedItem} />
```

```
function Item({ setSelectedItem }) {
  return (
    <AnimateView name="item-1">
      <div
        className="item"
        onClick={() => startTransition(() => setSelectedItem("item-1"))}
      />
    </AnimateView>
  )
}

function Modal({ selectedItem }) {
  return (
    <AnimateView name={selectedItem}>
      <div className="modal" />
    </AnimateView>
  )
}
```

>Live example[Open](https://examples.motion.dev/react/animate-view-app-store)

If there is more than one element with a specific `name` either before, or after the transition, the animation will fail.

The animation can be configured via the `transition` or `share` props on the entering element:

```
<AnimateView name="item-1" transition={{ duration: 0.4 }}>
```

### [Transition types](#transition-types)

React's `addTransitionType` lets you set contextual information (like navigation direction) to the current transition.

```
startTransition(() => {
  addTransitionType("next")
  setItem(2)
})
```

`enter`, `exit`, `share` and `update` props can all resolve dynamically, with a list of values set via `addTransitionType`. You can use this information to generate different animations.

```
<AnimateView
  key={index}
  exit={(types) => ({
      transform: `translateX(${types.includes("prev") ? 100 : -100}%)`,
  })}
  enter={(types) => ({
      transform: [
          `translateX(${types.includes("next") ? 100 : -100}%)`,
          "translateX(0%)",
      ],
  })}
>
```

>Live example[Open](https://examples.motion.dev/react/animate-view-types)

### [Suspense](#suspense)

`AnimateView` integrates with `Suspense`. You can crossfade between content and fallback by wrapping them both in `Suspense`:

```
<AnimateView>
  <Suspense fallback={<Placeholder />}>
    <Content />
  </Suspense>
</AnimateView>
```

## [Performance](#performance)

The React docs state:

> `<ViewTransition>` creates an image that can be moved around, scaled and cross-faded. Unlike Layout Animations you may have seen in React Native or Motion, this means that not every individual Element inside of it animates its position. This can lead to better performance and a more continuous feeling, smooth animation compared to animating every individual piece.

Neither of these claims are true.

From our own stress test benchmarking, creating image bitmaps and constructing a pseudo-DOM is more memory intensive and slower than the equivalent layout measurements used by Motion's [layout animations](./layout-animations).

The claim of "a more continuous feeling" is also not right. Layout animations are \*\***interruptible**\*\*, which means you can change direction mid-animation and they respond immediately. View transitions are \*\***not interruptible**\*\*, meaning they must complete before a new transition can begin. This makes layout animations a far better candidate for micro-interactions where responsiveness matters.

View transitions are best suited for \*\***page-level transitions**\*\* (route changes, full-view swaps) where the non-interruptible nature is acceptable and the snapshot-based approach avoids complex per-element coordination.

## [Props](#props)

### [`transition`](#transition)

Default transition for all animation types. Accepts any Motion transition, including springs.

```
<AnimateView transition={{ type: spring, visualDuration: 0.4, bounce: 0.3 }}>
```

### [`enter`](#enter)

\*\*Default: \*\*`{ opacity: 1 }`

An animation to use when the wrapped element enters the DOM.

```
<AnimateView enter={{ 
  opacity: 1,
  transform: ["translateX(-100%)", "none"]
}}>
```

Can also be a function that resolves with the list of current transition types.

```
<AnimateView
  enter={(types) => ({
    transform: [
      `translateX(${types.includes("next") ? 100 : -100}%)`,
      "none",
    ],
  })}
>
```

###

---

## LayoutGroup

> Coordinate React layout animations between Motion components.

_Source: [https://motion.dev/docs/react-layout-group](https://motion.dev/docs/react-layout-group)_

`motion` [components](/docs/react-motion-component) with a `layout` prop will perform [layout animations](/docs/react-layout-animations) every time they commit a React render, or (if set) when their `layoutDependency` prop changes.

`LayoutGroup` is used to group components that might not render together but do affect each-other's visual state.

## [Usage](#usage)

Take these accordion items that each handle their own state:

```
function Item({ header, content }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.h2 layout>{header}</motion.h2>
      {isOpen ? content : null}
    </motion.div>
  )
}
```

If we arrange these next to each other in an `Accordion`, when their state updates, their siblings have no way of knowing:

```
function Accordion() {
  return (
    <>
      <ToggleContent />
      <ToggleContent />
    </>  
  )
}
```

This can be fixed by grouping both components with `LayoutGroup`:

```
import { LayoutGroup } from "motion/react"

function Accordion() {
  return (
    <LayoutGroup>
      <ToggleContent />
      <ToggleContent />
    </LayoutGroup>  
  )
}
```

### [Namespace `layoutId`](#namespace-layoutid)

Components expecting to perform shared layout animations are provided a `layoutId` prop.

In this following example, each `Tab` renders an element with the `layoutId="underline"` prop.

```
function Tab({ label, isSelected }) {
  return (
    <li>
      {label}
      {isSelected
        ? <motion.div layoutId="underline" />
        : null}
    </li>  
  )
}

function TabRow({ items }) {
  return items.map(item => <Tab {...item} />)
}
```

`layoutId` is global across your site. So to render multiple `TabRow`s we want to group them with `LayoutGroup` and `id` prop:

```
function TabRow({ id, items }) {
  return (
    <LayoutGroup id={id}>
      {items.map(item => <Tab {...item} />)}
    </LayoutGroup>
}
```

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

---

## LazyMotion

> Reduce your initial bundle size with LazyMotion in Motion for React. Load animation features synchronously or asynchronously, shrinking bundles to as low as 4.6kb.

_Source: [https://motion.dev/docs/react-lazy-motion](https://motion.dev/docs/react-lazy-motion)_

For ease of use, the `motion` [component](/docs/react-motion-component) comes pre-bundled with all of its features for a bundlesize of around 34kb.

With `LazyMotion` and the `m` component, we can reduce this to 4.6kb for the initial render and then sync or async load a subset of features.

```
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

export const MyComponent = ({ isVisible }) => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)
```

Read the [Reduce bundle size](/docs/react-reduce-bundle-size) guide for full usage instructions.

## [Props](#props)

### [`features`](#features)

Define a feature bundle to load sync or async.

#### [Sync loading](#sync-loading)

Synchronous loading is useful for defining a subset of functionality for a smaller bundlesize.

```
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

export const MyComponent = ({ isVisible }) => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)
```

#### [Async loading](#async-loading)

Asynchronous loading can ensure your site is hydrated before loading in some or all animation functionality.

```
// features.js
import { domAnimation } from "motion/react"
export default domAnimation
  
// index.js
const loadFeatures = () => import("./features.js")
  .then(res => res.default)

function Component() {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div animate={{ scale: 1.5 }} />
    </LazyMotion>
  )
}
```

### [`strict`](#strict)

**Default:** `false`

If `true`, will throw an error if a `motion` component renders within a `LazyMotion` component (thereby removing the bundlesize benefits of lazy-loading).

```
// This component will throw an error that explains using a motion component
// instead of the m component will break the benefits of code-splitting.
function Component() {
  return (
    <LazyMotion features={domAnimation} strict>
      <motion.div />
    </LazyMotion>
  )
}
```

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

---

## MotionConfig

> Configure default transition options and manage reduced motion preferences.

_Source: [https://motion.dev/docs/react-motion-config](https://motion.dev/docs/react-motion-config)_

The `MotionConfig` component can be used to set configuration options for all child `motion` [components](/docs/react-motion-component).

```
import { motion, MotionConfig } from "motion/react"

export const MyComponent = ({ isVisible }) => (
  <MotionConfig transition={{ duration: 1 }}>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
  </MotionConfig>
)
```

## [Props](#props)

### [`transition`](#transition)

Define a fallback `transition` to use for all child `motion` components.

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

MOTION

EaseSpring

Duration0.3

Delay0

âºSaved transitions12

### Visual editing for IDEs.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion+. One-time fee, lifetime access.](/plus)

### [`reducedMotion`](#reducedmotion)

**Default:** `"never"`

`reducedMotion` lets you set a site-wide policy for handling reduced motion. It offers the following options:

* `"user"`: Respect the user's device setting.
* `"always"`: Enforce reduced motion (useful for debugging).
* `"never"`: Don't respect reduced motion.

When reduced motion is on, transform and [layout animations](/docs/react-layout-animations) will be disabled. Other animations, like `opacity` and `backgroundColor`, will persist.

### [`nonce`](#nonce)

If using a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src#unsafe_inline_styles) with a `nonce` attribute, passing the same attribute through `MotionConfig` will allow any `style` blocks generated by Motion to adhere the the security policy.

---

## Reorder

> Easily create drag-to-reorder lists with Motion for React's Reorder components. Use Reorder.Group and Reorder.Item to manage list order, with automatic layout and exit animations. Lightweight and simple.

_Source: [https://motion.dev/docs/react-reorder](https://motion.dev/docs/react-reorder)_

The `Reorder` components can be used to create drag-to-reorder lists, like reorderable tabs or todo items.

```
const [items, setItems] = useState([0, 1, 2, 3])

return (
  <Reorder.Group axis="y" values={items} onReorder={setItems}>
    {items.map((item) => (
      <Reorder.Item key={item} value={item}>
        {item}
      </Reorder.Item>
    ))}
  </Reorder.Group>
)
```

## [Usage](#usage)

Every reorderable list is wrapped in the `Reorder.Group` component.

```
import { Reorder } from "motion/react"

function List() {
  return (
    <Reorder.Group>
    
    </Reorder.Group>
  )
}
```

By default, this is rendered as a `<ul>`, but this can be changed with the `as` prop.

```
<Reorder.Group as="ol">
```

`Reorder.Group` must be passed the array of values in your reorderable list via the `values` prop.

Additionally, a `onReorder` event will fire with the latest calculated order. For items to reorder, this must update the `values` state.

```
import { Reorder } from "framer-motion"

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
    
    </Reorder.Group>
  )
}
```

To render each reorderable item, use `Reorder.Item`, passing it the value it represents via the `value` prop.

```
import { Reorder } from "framer-motion"

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

Now, when items are dragged and reordered, `onReorder` will fire with a new order.

### [Layout animations](#layout-animations)

`Reorder.Item` components are already configured to perform [layout animations](/docs/react-layout-animations), so if new items are added or removed to the reorderable list, surrounding items will animate to their new position automatically.

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

### [Exit animations](#exit-animations)

`AnimatePresence` can be used as normal to animate items as they enter/leave the React tree.

```
<AnimatePresence>
  {items.map(item => (
    <Reorder.Item
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={item}
    />  
  ))}
</AnimatePresence>
```

### [Drag triggers](#drag-triggers)

By default, all of a `Reorder.Item` will be draggable. `useDragControls` can be used to define a different component to act as a drag trigger.

```
import { Reorder, useDragControls } from "framer-motion"

function Item({ value }) {
  const controls = useDragControls()
  
  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className="reorder-handle"
        onPointerDown={(e) => controls.start(e)}
      />
    </Reorder.Item>
  )
}
```

### [Auto-scroll lists](#auto-scroll-lists)

If a `Reorder.Group` is within a scrollable container, the container will automatically scroll when a user drags an item towards the top and bottom of the list.

The closer to the edge of the container, the faster the scroll.

>Live example[Open](https://examples.motion.dev/react/todo-list)

### [z-index](#z-index)

`Reorder.Item` will automatically set a `z-index` style on the currently dragged item so it appears above the surrounding items.

However, `z-index` only affects items with `position !== "static"`. So to enable this effect ensure the position of the `Reorder.Item` is set to `relative` or `absolute`.

## [API](#api)

### [`Reorder.Group`](#reordergroup)

#### [`as`](#as)

**Default**: `"ul"`

The underlying element for `Reorder.Group` to render as.

```
<Reorder.Group as="div"></Reorder.Group>
```

#### [`axis`](#axis)

**Default**: `"y"`

The direction of reorder detection.

By default, all `Reorder.Item` components will visibly move only on this axis. To allow visual motion (but not reordering) on both axes, pass the `drag` prop to child `Reorder.Item` components.

#### [`values`](#values)

The values array that will be reordered. Each item in this list must match a `value` passed to each `Reorder.Item`.

#### [`onReorder`](#onreorder)

A callback that will fire when items are detected to have reordered. The provided `newOrder` should be passed to a `values` state update function.

```
const [items, setItems] = useState([0, 1, 2, 3])

return (
  <Reorder.Group values={items} onReorder={setItems}>
```

### [`Reorder.Item`](#reorderitem)

`Reorder.Item` components accept all `motion` [component props](/docs/react-motion-component) in addition to the following:

#### [`as`](#as-1)

**Default:** `"li"`

The element for `Reorder.Item` to render as.

#### [`value`](#value)

When `onReorder` is called, this is the value that will be passed through in the newly ordered array.

---

## AnimateNumber

> Create beautiful number ticker and countdown animations in React.

_Source: [https://motion.dev/docs/react-animate-number](https://motion.dev/docs/react-animate-number)_

`AnimateNumber` is a lightweight (2.5kb) React component for creating beautiful number animations with Motion. It's perfect for counters, dynamic pricing, countdowns, and more.

```
<AnimateNumber>{count}</AnimateNumber>
```

Built on top of Motion's powerful layout animations, `AnimateNumber` allows you to leverage all of Motion's existing transition settings, like `spring` and `tween`, to create fluid and engaging effects.

`AnimateNumber` is exclusive to [Motion+](../plus) members. Motion+ is a one-time payment, lifetime membership that unlocks exclusive components, premium examples and access to a private Discord community.

>Live example[Open](https://examples.motion.dev/react/number-counter)

## [Features](#features)

* \*\*Built on Motion: \*\*Leverages Motion's robust animation engine, allowing you to use familiar `transition` props like `spring`, `duration`, and `ease`.
* **Lightweight:** Adds only 2.5kb on top of Motion.
* **Advanced formatting:** Uses the built-in `Intl.NumberFormat` for powerful, locale-aware number formatting (e.g., currency, compact notation).
* \*\*Customisable: \*\*Provides distinct CSS classes for each part of the number (prefix, integer, fraction, suffix) for full styling control.

## [Install](#install)

First, add the `motion-plus` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](../plus) to generate a private token.

```
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.10.0&token=YOUR_AUTH_TOKEN"
```

## [Usage](#usage)

`AnimateNumber` accepts a single child, a number.

```
<AnimateNumber>300</AnimateNumber>
```

When this number changes, it'll animate to its latest value.

```
import { AnimateNumber } from "motion-plus/react"

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <AnimateNumber>{count}</AnimateNumber>
    </>
  )
}
```

### [Customise animation](#customise-animation)

The `transition` prop accepts Motion for React's [transition options](./react-transitions).

```
<AnimateNumber transition={{ type: "spring" }}>
```

`transition` accepts value-specific transition settings, so it's possible to set specific transitions for `layout`, `y` and `opacity`:

```
<AnimateNumber transition={{
  layout: { duration: 0.3 },
  opacity: { ease: "linear" },
  y: { type: "spring", visualDuration: 0.4, bounce: 0.2 }
}}>
```

---

## Carousel

> A performant, accessible, and infinitely scrollable carousel for React.

_Source: [https://motion.dev/docs/react-carousel](https://motion.dev/docs/react-carousel)_

The Carousel component creates performant, accessible and fully-featured carousels in React. It's designed to be flexible and easy to use, supporting pointer, wheel and keyboard navigation out the box.

>Live example[Open](https://examples.motion.dev/react/carousel)

It allows you to go beyond the traditional limitations of CSS-only approaches, with support for infinitely-scrolling carousels and without limitations on styling.

### [Features](#features)

* **Lightweight:** Just `+5.5kb` on top of [the](./react-motion-component) `motion` [component](./react-motion-component).
* **Accessible:** Automatic ARIA labels, respects reduced motion, RTL layouts, and all major input methods.
* **Performant:** Built on the same [unique rendering](../magazine/building-the-ultimate-ticker) used by the [Ticker](./react-ticker) component that achieves infinite scrolling with while minimising or eliminating item cloning.
* **Customisable:** Provides functions and state to easily create custom controls and pagination.

## [Install](#install)

First, add the `motion-plus` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](../plus) to generate a private token.

```
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.11.0&token=YOUR_AUTH_TOKEN"
```

## [Usage](#usage)

### [Import](#import)

Import the `Carousel` component from "motion-plus/react"`:

```
import { Carousel } from "motion-plus/react"
```

`Carousel` accepts a single mandatory prop, `items`. This is a list of valid React nodes (which can be components, strings or numbers):

```
const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Carousel items={items} />
```

>Live example[Open](https://examples.motion.dev/react/carousel-coverflow)

### [Direction](#direction)

By default, carousels will scroll horizontally. Setting the `axis` prop to `y`, we can make them vertical.

```
<Carousel items={items} axis="y" />
```

>Live example[Open](https://examples.motion.dev/react/carousel-vertical)

### [Layout](#layout)

Items are laid out via flexbox. Passing `gap` and `align` will adjust the spacing and off-axis alignment of them items.

```
<Carousel items={items} gap={0} align="start" />
```

### [Overflow](#overflow)

By setting `overflow` to `true`, items will visually extend out from the container to the edges of the viewport.

```
<Carousel items={items} overflow />
```

This makes it straightforward to place a `Carousel` within a document flow but still extend the ticker effect across the full viewport.

>Live example[Open](https://examples.motion.dev/react/carousel-pagination-arrows)

### [Infinite scrolling](#infinite-scrolling)

By default, carousels will scroll infinitely. This can be disabled by setting `loop={false}`.

```
<Carousel items={items} loop={false} />
```

>Live example[Open](https://examples.motion.dev/react/carousel-free-scroll)

### [Layout](#layout-1)

By default, each item will be sized according to its contents. By setting `itemSize="fill"`, items will extend the match the width of the container.

```
<Carousel items={items} itemSize="fill" />
```

>Live example[Open](https://examples.motion.dev/react/carousel-item-offset)

### [Snapping](#snapping)

By default, drag and wheel controls will snap between pages. By setting `snap={false}`, snapping can be disabled and the carousel will freely scroll.

```
<Carousel items={items} snap={false} />
```

>Live example[Open](https://examples.motion.dev/react/carousel-free-scroll)

### [Custom controls](#custom-controls)

Custom controls can be passed to `Carousel` as children.

```
<Carousel loop={false} items={items}>
  <Next />
</Carousel>
```

Any component rendered within `Carousel` can call `useCarousel` to access state and pagination functions. This hook provides:

* `nextPage`/`prevPage`: Paginate next/previous.
* `gotoPage`: Pass it a page index to animate to this page.
* `isNextActive`/`isPrevActive`: If `loop={false}` then these will be false when we hit the limits of the carousel.
* `currentPage`: Index of the current page
* `totalPages`: Number of total pages.

```
import { useCarousel } from "motion-plus/react"

function Next() {
  const { nextPage, isNextActive } = useCarousel()
  
  return (
    <button disabled={!isNextActive} onClick={nextPage}>
      Next
    </button>
  )
}
```

>Live example[Open](https://examples.motion.dev/react/carousel-pagination-page-count)

### [Autoplay](#autoplay)

With `currentPage` and `nextPage` from `useCarousel`, we can also set up our own autoplay functionality.

By passing `currentPage` to the `useEffect`, the timer will restart whenever the page changes, whether that's from a swipe/drag, or from the autoplay timer itself.

```
const { currentPage, nextPage } = useCarousel()
const progress = useMotionValue(0)

useEffect(() => {
    const animation = animate(progress, [0, 1], {
        duration,
        ease: "linear",
        onComplete: nextPage,
    })

    return () => animation.stop()
}, [duration, nextPage, progress, currentPage])
```

>Live example[Open](https://examples.motion.dev/react/carousel-autoplay)

### [Pagination visualisation](#pagination-visualisation)

By using `currentPage`, `totalPages` and `gotoPage` from `useCarousel`, a custom pagination indicator/navigator can be built.

```
function Pagination() {
  const { currentPage, totalPages, gotoPage } = useCarousel()

  return (
    <ul className="dots">
      {Array.from({ length: totalPages }, (_, index) => (
        <li className="dot">
          <motion.button
              initial={false}
              animate={{ opacity: currentPage === index ? 1 : 0.5 }}
              onClick={() => gotoPage(index)}
          />
        </li>
      )}
    </ul>
  )
}
```

>Live example[Open](https://examples.motion.dev/react/carousel-pagination-scaling)

###

---

## ScrambleText

> A customizable scramble text animation component for React with configurable timings, characters and renderless animation.

_Source: [https://motion.dev/docs/react-scramble-text](https://motion.dev/docs/react-scramble-text)_

`ScrambleText` is a 1kb React component for creating scramble text animations.

>Live example[Open](https://examples.motion.dev/react/scramble-text-stagger-center)

Unlike most scramble text implementations, `ScrambleText` uses Motion for React's [motion value](./motion-value) rendering to avoid React re-renders.

```
<ScrambleText>{text}</ScrambleText>
```

`ScrambleText` is exclusive to [Motion+](../plus) members. Motion+ is a one-time payment, lifetime membership that unlocks exclusive components, premium examples and access to a private Discord community.

## [Features](#features)

* **Stagger:** Use Motion's `stagger` function for both `delay` and `duration` to create letter-by-letter reveal effects.
* **Performant:** Renders via Motion's high-performance animation loop, skipping React re-renders.
* **Playback control:** Toggle the `active` prop to start/stop scrambling, perfect for hover effects or scroll-triggered animations.
* **Customisable characters:** Use the default alphanumeric set, or provide custom characters (including emoji).

## [Install](#install)

First, add the `motion-plus` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](../plus) to generate a private token.

```
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.6.1&token=YOUR_AUTH_TOKEN"
```

## [Usage](#usage)

By passing a string as the `ScrambleText` child, it will animate that text in character by character.

```
<ScrambleText>Hello world!</ScrambleText>
```

>Live example[Open](https://examples.motion.dev/react/scramble-text)

### [Stagger](#stagger)

Use Motion's `stagger()` function to reveal characters one by one:

```
import { stagger } from "motion"
import { StaggerText } from "motion-plus/react"

// Start scrambling at the same time, reveal after 1
// second, with a 0.05 delay between each character/
<ScrambleText duration={stagger(0.05, { startDelay: 1 })} >
  Hello world!
</ScrambleText>
```

#### [Delay](#delay)

Stagger when each character starts scrambling by passing `stagger` to `delay`:

```
// Chars start scrambling one-by-one, all reveal after 1s of scrambling
<ScrambleText delay={stagger(0.1)} duration={1}>
  Hello world!
</ScrambleText>
```

#### [Direction](#direction)

Use `stagger`'s `from` option for controlling the direction of stagger:

```
<ScrambleText
  delay={stagger(0.05, { from: "center" })}
  duration={0.5}
>
  Hello world!
</ScrambleText>
```

>Live example[Open](https://examples.motion.dev/react/scramble-text-stagger-center)

### [Infinite scramble](#infinite-scramble)

By default, text will scramble for `1` second. By setting `duration` to `Infinity`, text will scramble for as long as the `active` prop is `true`.

```
function HoverScrambleEffect() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ScrambleText
      active={isHovered}
      duration={Infinity}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Hover me!
    </ScrambleText>
  )
}
```

### [Custom characters](#custom-characters)

By default, `ScrambleText` uses the full alphanumeric character set to scramble text. You can provide other characters as a string or array

```
// Binary effect
<ScrambleText chars="01" duration={1}>Hello</ScrambleText>
```

Some useful presets include:

```
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`âââââââ â¡âªâ«âââââââ»â â¡"
const blocks = "ââââ"
const binary = "01"
const hex = "0123456789ABCDEF"
const katakana = "ã¢ã¤ã¦ã¨ãªã«ã­ã¯ã±ã³ãµã·ã¹ã»ã½ã¿ããããããããããããããããã ã¡ã¢ã¤ã¦ã¨ã©ãªã«ã¬ã­ã¯ã²ã³"
const faces =  ["ð", "ð", "ð", "ð", "ð", "ð", "ð¤£", "ð", "ð", "ð"]
const dots = "â â â â â â â â â â â â â â â "
```

Or, to use only the characters in the provided text content, pass the content itself:

```
<ScrambleText chars={text}>{text}</ScrambleText>
```

### [Playback control](#playback-control)

Toggle the `active` prop to control playback:

```
<ScrambleText active={active} duration={1}>
  Hello world!
</ScrambleText>
```

When active becomes false, characters reveal immediately (preserving any stagger offsets).

>Live example[Open](https://examples.motion.dev/react/scramble-text-hover)

---

## Ticker

> Infinitely-scrolling ticker and marquee effects, driven by time, drag or scroll.

_Source: [https://motion.dev/docs/react-ticker](https://motion.dev/docs/react-ticker)_

The `Ticker` component for React creates performant, flexible, and fully accessible ticker and marquee animations. It's perfect for showcasing logos, photos, testimonials, news headlines, and more.

`Ticker`'s simple API makes these infinitely-scrolling animations easy to build.

```
<Ticker items={items} />
```

>Live example[Open](https://examples.motion.dev/react/ticker-y-axis)

It intelligently clones only the minimum number of items needed to create a seamless loop, ensuring optimal performance. Because it's powered by Motion, you can take full manual control with a [motion value](./react-motion-value) to create scroll-driven or draggable effects.

>Live example[Open](https://examples.motion.dev/react/ticker-scroll)

`Ticker` is exclusive to [Motion+](../plus) members. Motion+ is a one-time payment, lifetime membership that unlocks exclusive components, premium examples and access to a private Discord community.

## [Features](#features)

`Ticker` is a production-ready component built with performance and accessibility at its core.

* \*\*Lightweight: \*\*Just `+2.1kb` on top of Motion for React.
* \*\*Accessible: \*\*Automatic support for "reduced motion" and intelligent keyboard focus-trapping means your site is inclusive for all users.
* \*\*Flexible: \*\*Animate horizontally or vertically. Control the animation with velocity, scroll position, or drag gestures.
* \*\*Performant: \*\*Creates the absolute minimum number of cloned elements required to fill the viewport. [Read more about Motion+ Ticker's unique renderer.](../magazine/building-the-ultimate-ticker) More efficient and maintainable than hand-rolled CSS tickers.
* **Full-width overflow:** Easily create tickers that are contained within your layout but visually extend to the edges of the viewport.
* \*\*RTL-compatible: \*\*Automatically adapts to RTL layouts.

## [Install](#install)

First, add the `motion-plus` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](../plus) to generate a private token.

```
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.0.2&token=YOUR_AUTH_TOKEN"
```

## [Usage](#usage)

`Ticker` accepts on mandatory prop, `items`. This is a list of valid React nodes (which can be components, strings or numbers):

```
const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Ticker items={items} />
```

### [Direction](#direction)

By default, tickers will scroll horizontally, but via the `axis` prop we can lay out and animate items on the `"y"` axis too.

```
<Ticker items={items} axis="y" />
```

>Live example[Open](https://examples.motion.dev/react/ticker-y-axis)

### [Adjust speed](#adjust-speed)

Setting the `velocity` prop (in pixels per second) will change the speed and direction of the ticker animation.

```
<Ticker items={items} velocity={100} />
```

Flipping this to a negative value will reverse the direction of the ticker.

```
<Ticker items={items} velocity={-100} />
```

Whereas setting it to `0` will stop all motion.

```
<Ticker items={items} velocity={0} />
```

---

## Typewriter

> A customizable typewriter animation component for React that creates realistic typing animations with human-like variance, stylable cursors and accessibility.

_Source: [https://motion.dev/docs/react-typewriter](https://motion.dev/docs/react-typewriter)_

`Typewriter` is a 1.3kb React component for creating realistic typewriter animations. It emulates natural human typing behaviour, handles dynamic content (with intelligent backspacing), and provides full playback control for scroll-triggered effects. All while ensuring screen reader accessibility.

```
<Typewriter>Hello world!</Typewriter>
```

`Typewriter` is exclusive to [Motion+](../plus) members. Motion+ is a one-time payment, lifetime membership that unlocks exclusive components, premium examples and access to a private Discord community.

>Live example[Open](https://examples.motion.dev/react/typewriter-natural-typing)

## [Features](#features)

* \*\*Natural animation: \*\*Typing speeds and variance emulate real-world behaviour.
* **Playback control:** Easily play and pause animations, perfect for scroll-triggered animations.
* **Accessible:** Correct ARIA labels for screen reader compatibility.
* **Reactive:** Will animate with backspace and typing to the latest provided value.
* \*\*Customisable: \*\*Control everything from typing speed and variance to cursor style and blink speed.

## [Install](#install)

First, add the `motion-plus` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](../plus) to generate a private token.

```
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.8.0&token=YOUR_AUTH_TOKEN"
```

## [Usage](#usage)

Import from `"motion-plus/react"`.

```
import { Typewriter } from "motion-plus/react"
```

By passing a string as the `Typewriter` child, it will animate that text in character by character.

```
<Typewriter>Hello world!</Typewriter>
```

>Live example[Open](https://examples.motion.dev/react/typewriter)

### [Dynamic content](#dynamic-content)

When the `children` prop changes, `Typewriter` will intelligently animate from the old text to the new text. By default, it backspaces character by character to the point of difference and then types out the new content.

>Live example[Open](https://examples.motion.dev/react/typewriter-change-content)

By default, each character will be backspaced individually. Using the `backspace` prop we can also backspace each word/special character:

```
<Typewriter backspace="word">{text}</Typewriter>
```

Or remove all the mismatching content immediately:

```
<Typewriter backspace="all">{text}</Typewriter>
```

### [Adjust speed](#adjust-speed)

The animation will emulate "normal" real-world typing speeds, based on real research. It's also possible to set speed as `"fast"`, `"slow"`, or a custom interval (in milliseconds).

```
<Typewriter speed="slow">Hello world!</Typewriter>
```

By default, the typing speed will vary naturally per character, based on the type of content being "typed".

For example, typing will slow down while typing long words, while at the start/end of a word, when using punctuation, or when using uncommon character combinations.

This can be configured with the `variance` prop. This is a `0`-`1` factor applied to `speed`, to create a range of speeds that we can randomly select between.

So for instance if we want no variance then we can set this to `0`.

```
<Typewriter variance={0}>Hello world!</Typewriter>
```

Or to have some variance it could be set to `0.5`:

```
<Typewriter variance={0.5}>Hello world!</Typewriter>
```

---

## Motion values overview

> Composable animatable values that can updated styles without re-renders.

_Source: [https://motion.dev/docs/react-motion-value](https://motion.dev/docs/react-motion-value)_

Motion values track the state and velocity of animated values.

They are composable, signal-like values that are performant because Motion can render them with its optimised DOM renderer.

Usually, these are created automatically by `motion` [components](/docs/react-motion-component). But for advanced use cases, it's possible to create them manually.

```
import { motion, useMotionValue } from "motion/react"

export function MyComponent() {
  const x = useMotionValue(0)
  return <motion.div style={{ x }} />
}
```

By manually creating motion values you can:

* Set and get their state.
* Pass to multiple components to synchronise motion across them.
* Chain `MotionValue`s via the `useTransform` hook.
* Update visual properties without triggering React's render cycle.
* Subscribe to updates.

```
const x = useMotionValue(0)
const opacity = useTransform(
  x,
  [-200, 0, 200],
  [0, 1, 0]
)

// Will change opacity as element is dragged left/right
return <motion.div drag="x" style={{ x, opacity }} />
```

## [Usage](#usage)

Motion values can be created with the `useMotionValue` hook. The string or number passed to `useMotionValue` will act as its initial state.

```
import { useMotionValue } from "motion/react"

const x = useMotionValue(0)
```

Motion values can be passed to a `motion` component via `style`:

```
<motion.li style={{ x }} />
```

Or for SVG attributes, via the attribute prop itself:

```
<motion.circle cx={cx} />
```

It's possible to pass the same motion value to multiple components.

Motion values can be updated with the `set` method.

```
x.set(100)
```

Changes to the motion value will update the DOM **without triggering a React re-render**. Motion values can be updated multiple times but renders will be batched to the next animation frame.

A motion value can hold any string or number. We can read it with the `get` method.

```
x.get() // 100
```

Motion values containing a number can return a velocity via the `getVelocity` method. This returns the velocity as calculated **per second** to account for variations in frame rate across devices.

```
const xVelocity = x.getVelocity()
```

For strings and colors, `getVelocity` will always return `0`.

### [Events](#events)

Listeners can be added to motion values via [the](/docs/react-motion-value#on) `on` [method](/docs/react-motion-value#on) or [the](/docs/react-use-motion-value-event) `useMotionValueEvent` [hook](/docs/react-use-motion-value-event).

```
useMotionValueEvent(x, "change", (latest) => console.log(latest))
```

Available events are `"change"`, `"animationStart"`, `"animationComplete"` `"animationCancel"`.

### [Composition](#composition)

Beyond `useMotionValue`, Motion provides a number of hooks for creating and composing motion values, like `useSpring` and `useTransform`.

For example, with `useTransform` we can take the latest state of one or more motion values and create a new motion value with the result.

```
const y = useTransform(() => x.get() * 2)
```

`useSpring` can make a motion value that's attached to another via a spring.

```
const dragX = useMotionValue(0)
const dragY = useMotionValue(0)
const x = useSpring(dragX)
const y = useSpring(dragY)
```

>Live example[Open](https://examples.motion.dev/react/shared-layout-animation)

These motion values can then go on to be passed to `motion` components, or composed with more hooks like `useVelocity`.

[>Motion+ Â· AI Kit

### Animation superpowers for your agent.

Turn your agent into an animation powerhouse, with best practises, performance audits, and tools to search Motion documentation and examples.

Part of Motion+. One-time fee, lifetime access.

Cursor

âº](/docs/ai-kit)

## [API](#api)

### [`get()`](#get)

Returns the latest state of the motion value.

### [`getVelocity()`](#getvelocity)

Returns the latest velocity of the motion value. Returns `0` if the value is non-numerical.

### [`set()`](#set)

Sets the motion value to a new state.

```
x.set("#f00")
```

### [`jump()`](#jump)

Jumps the motion value to a new state in a way that breaks continuity from previous values:

* Resets `velocity` to `0`.
* Ends active animations.
* Ignores attached effects (for instance `useSpring`'s spring).

```
const x = useSpring(0)
x.jump(10)
x.getVelocity() // 0
```

### [`isAnimating()`](#isanimating)

Returns `true` if the value is currently animating.

### [`stop()`](#stop)

Stop the active animation.

### [`on()`](#on)

Subscribe to motion value events. Available events are:

* `change`
* `animationStart`
* `animationCancel`
* `animationComplete`

It returns a function that, when called, will unsubscribe the listener.

```
const unsubscribe = x.on("change", latest => console.log(latest))
```

When calling `on` inside a React component, it should be wrapped with a `useEffect` hook, or instead use [the](/docs/react-use-motion-value-event) `useMotionValueEvent` [hook](/docs/react-use-motion-value-event).

### [`destroy()`](#destroy)

Destroy and clean up subscribers to this motion value.

This is normally handled automatically, so this method is only necessary if you've manually created a motion value outside the React render cycle using the vanilla `motionValue` hook.

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## useMotionTemplate

> Combine motion values into dynamic strings with Motion for React's useMotionTemplate. Create auto-updating, interpolated values for responsive animations.

_Source: [https://motion.dev/docs/react-use-motion-template](https://motion.dev/docs/react-use-motion-template)_

`useMotionTemplate` creates a new [motion value](/docs/react-motion-value) from a [string template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) containing other motion values.

```
const x = useMotionValue(100)
const transform = useMotionTemplate`transform(${x}px)`
```

Whenever a motion value within the string template updates, the returned motion value will update with the latest value.

## [Usage](#usage)

Import from Motion:

```
import { useMotionTemplate } from "motion/react"
```

`useMotionTemplate` is a "tagged template", so rather than being called like a normal function, it's called as a string template:

```
useMotionValue``
```

This string template can accept both text and other motion values:

```
const blur = useMotionValue(10)
const saturate = useMotionValue(50)
const filter = useMotionTemplate`blur(${10}px) saturate(${saturate}%)`

return <motion.div style={{ filter }} />
```

The latest value of the returned motion value will be the string template with each provided motion value replaced with its latest value.

```
const shadowX = useSpring(0)
const shadowY = useMotionValue(0)

const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`

return <motion.div style={{ filter }} />
```

---

## useMotionValueEvent

> Fire events when the value of a motion value changes.

_Source: [https://motion.dev/docs/react-use-motion-value-event](https://motion.dev/docs/react-use-motion-value-event)_

`useMotionValueEvent` manages a motion value event handler throughout the lifecycle of a React component.

```
function Component() {
  const x = useMotionValue(0)
  
  useMotionValueEvent(x, "animationStart", () => {
    console.log("animation started on x")
  })
  
  useMotionValueEvent(x, "change", (latest) => {
    console.log("x changed to", latest)
  })
  
  return <motion.div style={{ x }} />
}
```

When the component is unmounted, event handlers will be safely cleaned up.

## [Usage](#usage)

Import from Motion:

```
import { useMotionValueEvent } from "motion/react"
```

To add an event listener to a motion value, provide the value, event name and callback:

```
const color = useMotionValue("#00f")

useMotionValueEvent(color, "change", (latest) => {
  console.log(latest)
})
```

Available events are:

* `change`
* `animationStart`
* `animationComplete`
* `animationCancel`

`"change"` events are provided the latest value of the motion value.

### [Advanced](#advanced)

`useMotionValueEvent` is a helper function for a motion value's `on` [method](/docs/react-motion-value). With `on`, you can start listening to events whenever you like, for instance within an event handler. But remember to also unsubscribe when the component unmounts.

```
useEffect(() => {
  const doSomething = () => {}
  
  const unsubX = x.on("change", doSomething)
  const unsubY = y.on("change", doSomething)
  
  return () => {
    unsubX()
    unsubY()
  }
}, [x, y])
```

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## useScroll

> Create scroll-linked animations like progress bars & parallax with the useScroll React hook.

_Source: [https://motion.dev/docs/react-use-scroll](https://motion.dev/docs/react-use-scroll)_

`useScroll` is used to create scroll-linked animations, like progress indicators and parallax effects.

```
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />
```

`useScroll` is able to run some animations with the browser's `ScrollTimeline` [API](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline) for optimal hardware-accelerated performance, removing scroll measurements, improving scroll synchronisation and ensuring animations remain smooth even under heavy CPI usage.

## [Usage](#usage)

Import `useScroll` from Motion:

```
import { useScroll } from "motion/react"
```

`useScroll` returns four [motion values](/docs/react-motion-value):

* `scrollX`/`Y`: The absolute scroll position, in pixels.
* `scrollXProgress`/`YProgress`: The scroll position between the defined offsets, as a value between `0` and `1`.

### [Page scroll](#page-scroll)

By default, useScroll tracks the page scroll.

```
const { scrollY } = useScroll()

useMotionValueEvent(scrollY, "change", (latest) => {
  console.log("Page scroll: ", latest)
})
```

For example, we could show a page scroll indicator by passing `scrollYProgress` straight to the `scaleX` style of a progress bar.

```
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />
```

>Live example[Open](https://examples.motion.dev/react/scroll-linked)

As `useScroll` returns motion values, we can compose this scroll info with other motion value hooks like `useTransform` and `useSpring`:

```
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress)

return <motion.div style={{ scaleX }} />
```

>Live example[Open](https://examples.motion.dev/react/scroll-linked-with-spring)

> Since `scrollY` is a `MotionValue`, there's a neat trick you can use to tell when the user's scroll direction changes:
>
> ```
> const { scrollY } = useScroll()
> const [scrollDirection, setScrollDirection] = useState("down")
>
> useMotionValueEvent(scrollY, "change", (current) => {
>   const diff = current - scrollY.getPrevious()
>   setScrollDirection(diff > 0 ? "down" : "up")
> })
> ```
>
> Perfect for triggering a sticky header animation!
>
> ~ Sam Selikoff, [Motion for React Recipes](https://buildui.com/courses/framer-motion-recipes)

### [Element scroll](#element-scroll)

To track the scroll position of a scrollable element we can pass the element's `ref` to `useScroll`'s `container` option:

```
const carouselRef = useRef(null)
const { scrollX } = useScroll({
  container: carouselRef
})

return (
  <div ref={carouselRef} style={{ overflow: "scroll" }}>
    {children}
  </div>
)
```

>Live example[Open](https://examples.motion.dev/react/scroll-container)

### [Element position](#element-position)

We can track the progress of an element as it moves within a container by passing its `ref` to the `target` option.

```
const ref = useRef(null)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end end"]
})

return <div ref={ref}>
```

In this example, each item has its own progress indicator.

>Live example[Open](https://examples.motion.dev/react/scroll-track-element-in-viewport)

### [Scroll offsets](#scroll-offsets)

With [the](/docs/react-use-scroll#offset) `offset` [option](/docs/react-use-scroll#offset) we can define which parts of the element we want to track with the viewport, for instance track elements as they enter in from the bottom, leave at the top, or travel throughout the whole viewport.

## [Performance](#performance)

Browsers are capable of animating some values, like `opacity`, `transform`, `clipPath` and `filter`, entirely on the GPU. This improves scroll synchronisation and ensures animations remain smooth even when sites are performing heavy work.

`useScroll` is also capable of running animations via the GPU. By passing `scrollXProgress` or `scrollYProgress` either directly to an `opacity` style, or via `useTransform` to one of the above styles, it will create a hardware-accelerated animation.

```
const { scrollYProgress } = useScroll()
const filter = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"])

return <motion.div style={{ opacity: scrollYProgress, filter }} />
```

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

## [Options](#options)

`useScroll` accepts the following options.

### [`container`](#container)

**Default**: Viewport

The scrollable container to track the scroll position of. By default, this is the browser viewport. By passing a ref to a scrollable element, that element can be used instead.

```
const containerRef = useRef(null)
const { scrollYProgress } = useScroll({ container: containerRef })
```

### [`target`](#target)

`useScroll` tracks the progress of the `target` within the `container`. By default, the `target` is the scrollable area of the `container`. It can additionally be set as another element, to track its progress within the `container`.

```
const targetRef = useRef(null)
const { scrollYProgress } = useScroll({ target: targetRef })
```

`target` is tracked by the element's layout position, so any CSS `transform` applied to it (or its ancestors) is ignored when measuring progress.

### [`axis`](#axis)

**Default:** `"y"`

The tracked axis for the defined `offset`.

### [`offset`](#offset)

**Default:** `["start start", "end end"]`

`offset` describes intersections, points where the `target` and `container` meet.

For example, the intersection `"start end"` means when the **start of the target** on the tracked axis meets the **end of the container.**

So if the target is an element, the container is the window, and we're tracking the vertical axis then `"start end"` is where the **top of the element** meets **the bottom of the viewport**.

#### [Accepted intersections](#accepted-intersections)

Both target and container points can be defined as:

* **Number:** A value where `0` represents the start of the axis and `1` represents the end. So to define the top of the target with the middle of the container you could define `"0 0.5"`. Values outside this range are permitted.
* **Names:** `"start"`, `"center"` and `"end"` can be used as clear shortcuts for `0`, `0.5` and `1` respectively.
* **Pixels:** Pixel values like `"100px"`, `"-50px"` will be defined as that number of pixels from the start of the target/container.
* **Percent:** Same as raw numbers but expressed as `"0%"` to `"100%"`.
* **Viewport:** `"vh"` and `"vw"` units are accepted.

```
// Track an element as it enters from the bottom
const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ["start end", "end end"]
})

// Track an element as it moves out the top
const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ["start start", "end start"]
})
```

### [`trackContentSize`](#trackcontentsize)

**Default:** `false`

When the size of a page or element's content changes, its scrollable area can change too. But, because browsers don't provide a callback for changes in content size, by default `useScroll()` will not update until the next `"scroll"` event.

`useScroll` can automatically track changes to content size by setting `trackContentSize` to `true`.

```
useScroll({ trackContentSize: true })
```

Content size tracking is disabled by default because most of the time, scrollable area remains stable, and tracking changes to it involves a small overhead.


> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## useSpring

> A spring-powered motion value. Standalone or attach to another motion value.

_Source: [https://motion.dev/docs/react-use-spring](https://motion.dev/docs/react-use-spring)_

`useSpring` creates [a motion value](/docs/react-motion-value) that will animate to its latest target with a spring animation.

The target can either be set manually via `.set`, or automatically by passing in another motion value.

>Live example[Open](https://examples.motion.dev/react/follow-pointer-with-spring)

## [Usage](#usage)

Import `useSpring` from Motion:

```
import { useSpring } from "motion/react"
```

### [Direct control](#direct-control)

`useSpring` can be created with a number, or a unit-type (`px`, `%` etc) string:

```
const x = useSpring(0)
const y = useSpring("100vh")
```

Now, whenever this motion value is updated via `set()`, the value will animate to its new target with the defined spring.

```
x.set(100)
y.set("50vh")
```

It's also possible to update this value immediately, without a spring, with [the](/docs/react-motion-value#jump) `jump()` [method](/docs/react-motion-value#jump).

```
x.jump(50)
y.jump("0vh")
```

### [Track another motion value](#track-another-motion-value)

Its also possible to automatically spring towards the latest value of another motion value:

```
const x = useMotionValue(0)
const y = useSpring(x)
```

This source motion value must also be a number, or unit-type string.

### [Transition](#transition)

The type of `spring` can be defined with the usual [spring transition option](/docs/react-transitions#spring).

```
useSpring(0, { stiffness: 300 })
```

## [Options](#options)

As well as transition options, `useSpring` also accepts the following options.

### [`skipInitialAnimation`](#skipinitialanimation)

**Default:** `false`

When using `useSpring` to track a value like `useScroll`, which may change on mount after a DOM measurement, you can jump to this value instantly by setting `skipInitialAnimation` to `true`.

```
const { scrollYProgress } = useScroll()
const smoothProgress = useSpring(scrollYProgress, {
  skipInitialAnimation: true,
})
```

[card.css/motion-app

card.cssCard.tsx

```
1.card {2  transition: scale 200ms linear(3    0, 0.009, 0.036, 0.084, 0.157, 0.255, 0.378,4    0.522, 0.679, 0.832, 0.954, 1.029, 1.052, 1.038,5    1.011, 0.99, 0.984, 0.991, 1.001, 1.005, 16  );7}89.card:hover {10  scale: 1.2;11}
```

MOTION

EaseSpring

Duration0.3

Delay0

âºSaved transitions12

### Visual editing for IDEs.

Edit and preview Motion and CSS transitions live in your code. Tune ease curves, springs, and durations without leaving your editor.

Part of Motion+. One-time fee, lifetime access.](/plus)

---

## useTime

> Explore Motion for React's useTime hook. It returns elapsed time in ms every frame. Learn how it creates perpetual animations & composes with other motion values.

_Source: [https://motion.dev/docs/react-use-time](https://motion.dev/docs/react-use-time)_

`useTime` returns a [motion value](/docs/react-motion-value) that updates once per frame with the duration, in milliseconds, since it was first created.

This is especially useful in generating perpetual animations.

```
const time = useTime();
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });

return <motion.div style={{ rotate }} />
```

>Live example[Open](https://examples.motion.dev/react/use-time)

## [Usage](#usage)

Import from Motion:

```
import { useTime } from "motion/react"
```

When called, `useTime` will create a new motion value. This value will update every frame with the time since its creation.

You can use this either directly or by composing with other motion value hooks.

```
const time = useTime()
const rotate = useTransform(
  time,
  [0, 4000], // For every 4 seconds...
  [0, 360], // ...rotate 360deg
  { clamp: false }
)
```

---

## useTransform

> Transform the output of one motion value into a new motion value.

_Source: [https://motion.dev/docs/react-use-transform](https://motion.dev/docs/react-use-transform)_

`useTransform` creates a new motion value that transforms the output of one or more motion values.

```
const x = useMotionValue(1)
const y = useMotionValue(1)

const z = useTransform(() => x.get() + y.get()) // z.get() === 2
```

## [Usage](#usage)

Import from Motion:

```
import { useTransform } from "motion/react"
```

`useTransform` can be used in two ways: with a transform function and via value maps:

```
// Transform function
const doubledX = useTransform(() => x.get() * 2)

// Value mapping
const color = useTransform(x, [0, 100], ["#f00", "#00f"])
```

### [Transform function](#transform-function)

A transform function is a normal function that returns a value.

```
const doubledX = useTransform(() => x.get() * 2)
```

Any motion values read in this function via the `get()` method will be automatically subscribed to.

When these motion values change, the function will be run again on the next animation frame to calculate a new value.

```
const distance = 100
const time = useTime()
const y = useTransform(() => Math.sin(time.get() / 1000) * distance)
```

>Live example[Open](https://examples.motion.dev/react/use-transform)

### [Value mapping](#value-mapping)

`useTransform` can also map a single motion value from one range of values to another.

To illustrate, look at this `x` motion value:

```
const x = useMotionValue(0)
```

We can use `useTransform` to create a new motion value called `opacity`.

```
const opacity = useTransform(x, input, output)
```

By defining an `input` range and an `output` range, we can define relationships like "when `x` is `0`, `opacity` should be `1`. When `x` is `100` pixels either side, `opacity` should be `0`".

```
const input = [-100, 0, 100]
const output = [0, 1, 0]
```

Both ranges can be **any length** but must be the **same length** as each other.

The input range must always be a series of increasing or decreasing numbers.

The output range must be values all of the same type, but can be in any order. It can also be any [value type that Motion can animate](/docs/react-animation#animatable-values), like numbers, units, colors and other strings.

```
const backgroundColor = useTransform(
  x,
  [0, 100],
  ["#f00", "#00f"]
)
```

By setting `clamp: false`, the ranges will map perpetually. For instance, in this example we're saying "for every `100px` scrolled, rotate another `360deg`":

```
const { scrollY } = useScroll()
const rotate = useTransform(
  scrollY,
  [0, 100],
  [0, 360],
  { clamp: false }
)
```

#### [Output multiple values](#output-multiple-values)

It's common to map a single motion value and input range into multiple motion values.

```
const opacity = useTransform(offset, [100, 600], [1, 0.4])
const scale = useTransform(offset, [100, 600], [1, 0.6])
const filter = useTransform(offset, [100, 600], ["blur(0px)", "blur(10px)"])
```

This can lead to some repetition, so `useTransform` also supports mapping to multiple motion values in a single call, by providing a named map:

```
const { opacity, scale, filter } = useTransform(offset, [100, 600], {
  opacity: [1, 0.4],
  scale: [1, 0.6],
  filter: ["blur(0px)", "blur(10px)"],
})
```

## [Options](#options)

With value mapping, we can set some additional options.

### [`clamp`](#clamp)

**Default:** `true`

If `true`, will clamp output to within the provided range. If `false`, will carry on mapping even when the input falls outside the provided range.

```
const y = useTransform(x, [0, 1], [0, 2])
const z = useTransform(x, [0, 1], [0, 2], { clamp: false })

useEffect(() => {
  x.set(2)
  console.log(y.get()) // 2, input clamped
  console.log(z.get()) // 4
})
```

### [`ease`](#ease)

An easing function, or array of easing functions, to ease the mixing between each value.

These must be JavaScript functions.

```
import { cubicBezier, circOut } from "motion"
import { useTransform } from "motion/react"

// In your component
const y = useTransform(x, [0, 1], [0, 2], { ease: circOut })

const z = useTransform(
  x,
  [0, 1],
  [0, 2],
  { ease: cubicBezier(0.17, 0.67, 0.83, 0.67) }
)
```

### [`mixer`](#mixer)

A function to use to mix between each pair of output values.

This function will be called with each pair of output values and must return a new function, that accepts a progress value between `0` and `1` and returns the mixed value.

This can be used to inject more advanced mixers than Framer Motion's default, for instance [Flubber](https://github.com/veltman/flubber) for morphing SVG paths.

>Live example[Open](https://examples.motion.dev/react/path-morphing)

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## useVelocity

> Creates a new motion value that outputs the velocity of another motion value.

_Source: [https://motion.dev/docs/react-use-velocity](https://motion.dev/docs/react-use-velocity)_

`useVelocity` accepts a [motion value](/docs/react-motion-value) and returns a new one that updates with the provided motion value's velocity.

```
const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const scale = useTransform(
  xVelocity,
  [-3000, 0, 3000],
  [2, 1, 2],
  { clamp: false }
)

return <motion.div drag="x" style={{ x, scale }} />
```

## [Usage](#usage)

Import `useVelocity` from Motion:

```
import { useVelocity } from "motion/react"
```

Pass any numerical motion value to `useVelocity`. It'll return a new motion value that updates with the velocity of the original value.

```
import { useMotionValue, useVelocity } from "framer-motion"

function Component() {
  const x = useMotionValue(0)
  const xVelocity = useVelocity(x)

  useMotionValueEvent(xVelocity, "change", latest => {
    console.log("Velocity", latestVelocity)
  })
  
  return <motion.div style={{ x }} />
}
```

Any numerical motion value will work. Even one returned from `useVelocity`.

```
const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const xAcceleration = useVelocity(xVelocity)
```

---

## useAnimate

> Manually start and control animations, scoped to the current React component.

_Source: [https://motion.dev/docs/react-use-animate](https://motion.dev/docs/react-use-animate)_

`useAnimate` provides a way of using the `animate` [function](/docs/animate) that is scoped to the elements within your component.

This allows you to use manual animation controls, timelines, selectors scoped to your component, and automatic cleanup.

It provides a `scope` ref, and an `animate` function where every DOM selector is scoped to this ref.

```
function Component() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    // This "li" selector will only select children
    // of the element that receives `scope`.
    animate("li", { opacity: 1 })
  })
  
  return <ul ref={scope}>{children}</ul>
}
```

Additionally, when the component calling `useAnimate` is removed, all animations started with its `animate` function will be cleaned up automatically.

## [Usage](#usage)

Import from Motion:

```
// Mini
import { useAnimate } from "motion/react-mini"

// Hybrid
import { useAnimate } from "motion/react"
```

`useAnimate` returns two arguments, a `scope` ref and an `animate` [function](/docs/animate).

```
function Component() {
  const [scope, animate] = useAnimate()
```

This `scope` ref must be passed to either a regular HTML/SVG element or a `motion` component.

```
function Component({ children }) {
  const [scope, animate] = useAnimate()
  
  return <ul ref={scope}>{children}</ul>
}
```

This scoped `animate` function can now be used in effects and event handlers to animate elements.

We can either use the scoped element directly:

```
animate(scope.current, { opacity: 1 }, { duration: 1 })
```

Or by passing it a selector:

```
animate("li", { backgroundColor: "#000" }, { ease: "linear" })
```

This selector is `"li"`, but we're not selecting all `li` elements on the page, only those that are a child of the scoped element.

### [Scroll-triggered animations](#scroll-triggered-animations)

Animations can be triggered when the scope scrolls into view by combining `useAnimate` with `useInView`.

```
import { useAnimate, useInView } from "motion/react"

function Component() {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  
  useEffect(() => {
     if (isInView) {
       animate(scope.current, { opacity: 1 })
     }
  }, [isInView])
  
  return (
    <ul ref={scope}>
      <li />
      <li />
      <li />
    </ul>
  )
}
```

### [Exit animations](#exit-animations)

It's possible to compose your own exit animations when a component is removed using `useAnimate` in conjunction with `usePresence`.

```
import { useAnimate, usePresence } from "framer-motion"

function Component() {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()
  
  useEffect(() => {
     if (isPresent) {
       const enterAnimation = async () => {
         await animate(scope.current, { opacity: 1 })
         await animate("li", { opacity: 1, x: 0 })
       }
       enterAnimation()

     } else {
       const exitAnimation = async () => {
         await animate("li", { opacity: 0, x: -100 })
         await animate(scope.current, { opacity: 0 })
         safeToRemove()
       }
       
       exitAnimation()
     }
  }, [isPresent])
  
  return (
    <ul ref={scope}>
      <li />
      <li />
      <li />
    </ul>
  )
}
```

This component can now be conditionally rendered as a child of `AnimatePresence`.

```
<AnimatePresence>
  {show ? <Component key="dialog" /> : null}
</AnimatePresence>
```

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## useAnimationFrame

> Use Motion for React's useAnimationFrame hook to run callbacks on every frame. Leverage time & delta args for precise animation control & custom frame logic.

_Source: [https://motion.dev/docs/react-use-animation-frame](https://motion.dev/docs/react-use-animation-frame)_

`useAnimationFrame` runs a callback once every animation frame.

```
useAnimationFrame((time) => {
  ref.current.style.transform = `rotateY(${time}deg)`
})
```

The callback is provided two arguments:

* `time`, the total duration of time since the callback was first called.
* `delta`, the total duration of time since the last animation frame.

```
import { useAnimationFrame } from "motion/react"

function Component() {
  const ref = useRef(null)
  
  useAnimationFrame((time, delta) => {
    ref.current.style.transform = `rotateY(${time}deg)`
  })

  return <div ref={ref} />
}
```

## [Examples](#examples)

>Live example[Open](https://examples.motion.dev/react/use-animation-frame)

---

## useDragControls

> Manually start/stop drag gestures. Supports snap to cursor and more.

_Source: [https://motion.dev/docs/react-use-drag-controls](https://motion.dev/docs/react-use-drag-controls)_

Usually, dragging is initiated by pressing down on [a](/docs/react-gestures#drag) `motion` [component with a](/docs/react-gestures#drag) `drag` [prop](/docs/react-gestures#drag) and then moving the pointer.

For some use-cases, for example clicking at an arbitrary point on a video scrubber, we might want to initiate that dragging from a different element.

With `useDragControls`, we can create a set of controls to manually start dragging from any pointer event.

## [Usage](#usage)

Import `useDragControls` from Motion:

```
import { useDragControls } from "motion/react"
```

`useDragControls` returns drag controls that can be passed to a draggable `motion` component:

```
const controls = useDragControls()

return <motion.div drag dragControls={controls} />
```

Now we can start a drag session from another any element's `onPointerDown` event via the `start` method.

```
<div onPointerDown={event => controls.start(event)} />
```

### [Touch support](#touch-support)

To support touch screens, the triggering element should have the `touch-action: none` style applied.

```
<div onPointerDown={startDrag} style={{ touchAction: "none" }} />
```

### [Snap to cursor](#snap-to-cursor)

By default, the drag gesture will only apply **changes** to the pointer position.

We can also make the `motion` component immediately snap to the cursor by passing `snapToCursor: true` to the `start` method.

```
controls.start(event, { snapToCursor: true })
```

### [Disable automatic drag](#disable-automatic-drag)

With this configuration, the `motion` component will still automatically start a drag gesture when it receives a `pointerdown` event itself.

We can stop this behaviour by passing it a `dragListener={false}` prop.

```
<motion.div
  drag
  dragListener={false}
  dragControls={controls}
/>
```

### [Configure drag threshold](#configure-drag-threshold)

By default, a drag gesture will take `3` pixels of cursor travel before initialising and, if using `directionLock`, determining which axis to lock on to.

This distance can be configured with the `distanceThreshold` option.

```
controls.start(event, { distanceThreshold: 10 })
```

### [Manually stop and cancel](#manually-stop-and-cancel)

The drag gesture will automatically stop when the `pointerup` event is detected. It's also possible to end the gesture manually, with the `.stop()` and `.cancel()` methods.

```
controls.stop()
// or
controls.cancel()
```

Cancelling the event will skip calling the `onDragEnd` callback.

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## useInView

> Switch React state when an element enters/leaves the viewport.

_Source: [https://motion.dev/docs/react-use-in-view](https://motion.dev/docs/react-use-in-view)_

`useInView` is a tiny (0.6kb) hook that detects when the provided element is within the viewport. It can be used with any React element.

```
const ref = useRef(null)
const isInView = useInView(ref)

return <div ref={ref} />
```

## [Usage](#usage)

Import `useInView` from Motion:

```
import { useInView } from "motion/react"
```

`useInView` can track the visibility of any HTML element. Pass a `ref` object to both `useInView` and the HTML element.

```
function Component() {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return <div ref={ref} />
}
```

While the element is outside the viewport, `useInView` will return `false`. When it moves inside the view, it'll re-render the component and return `true`.

### [Effects](#effects)

`useInView` is vanilla React state, so firing functions when `isInView` changes is a matter of passing it to a `useEffect`.

```
useEffect(() => {
  console.log("Element is in view: ", isInView)
}, [isInView])
```

## [Options](#options)

`useInView` can accept options to define how the element is tracked within the viewport.

```
const isInView = useInView(ref, { once: true })
```

### [`root`](#root)

By default, `useInView` will track the visibility of an element as it enters/leaves the window viewport. Set `root` to be the ref of a scrollable parent, and it'll use that element to be the viewport instead.

```
function Carousel() {
  const container = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { root: container })
  
  return (
    <div ref={container} style={{ overflow: "scroll" }}>
      <div ref={ref} />
    </div>
  )
}
```

### [`margin`](#margin)

**Default:** `"0px"`

A margin to add to the viewport to change the detection area. Use multiple values to adjust top/right/bottom/left, e.g. `"0px -20px 0px 100px"`.

```
const isInView = useInView(ref, {
  margin: "0px 100px -50px 0px"
})
```

For browser security reasons, `margin` [won't take affect within cross-origin iframes](https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin) unless `root` is explicitly defined.

### [`once`](#once)

**Default:** `false`

If `true`, once an element is in view, useInView will stop observing the element and always return `true`.

```
const isInView = useInView(ref, { once: true })
```

### [`initial`](#initial)

**Default:** `false`

Set an initial value to return until the element has been measured.

```
const isInView = useInView(ref, { initial: true })
```

### [`amount`](#amount)

**Default:** `"some"`

The amount of an element that should enter the viewport to be considered "entered". Either `"some"`, `"all"` or a number between `0` and `1`.

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

## [Example](#example)

>Live example[Open](https://examples.motion.dev/react/scroll-triggered)

---

## usePageInView

> Track page visibility with Motion for React's usePageInView hook. Improve performance and UX by pausing animations when the document isn't visible. SSR-compatible and simple API.

_Source: [https://motion.dev/docs/react-use-page-in-view](https://motion.dev/docs/react-use-page-in-view)_

`usePageInView` is a tiny utility hook for tracking page/document visibility. This is useful for improving performance by pausing animations, video playback, or other activity when the user navigates to another tab, and resuming on return.

This saves CPU cycles, improves battery life, and helps ensure a smooth user experience.

## [Usage](#usage)

Import from `"motion/react"`:

```
import { usePageInView } from "motion/react"
```

`usePageInView` returns `true` when the current page is the user's active tab, and defaults to `true` on the server and initial client render before a measurement can be made.

```
const isPageInView = usePageInView()
```

This state can be used to pause animations or videos when the page is hidden:

```
const videoRef = useRef(null)
const isInView = usePageInView()

useEffect(() => {
  const videoElement = videoRef.current
  if (!videoElement) return

  if (isInView) {
    videoElement.play()
  } else {
    videoElement.pause()
  }
}, [isInView])
```

Or starting/stopping animation loops created with `useAnimationFrame`.

```
useAnimationFrame(isPageInView ? update : undefined)
```

---

## useReducedMotion

> Adapt or disable animations based on the device "Reduced Motion" setting.

_Source: [https://motion.dev/docs/react-use-reduced-motion](https://motion.dev/docs/react-use-reduced-motion)_

A hook that returns `true` if the current device has Reduced Motion setting enabled.

```
const shouldReduceMotion = useReducedMotion()
```

This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing potentially motion-sickness inducing `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.

It will actively respond to changes and re-render your components with the latest setting.

```
export function Sidebar({ isOpen }) {
  const shouldReduceMotion = useReducedMotion()
  const closedX = shouldReduceMotion ? 0 : "-100%"

  return (
    <motion.div animate={{
      opacity: isOpen ? 1 : 0,
      x: isOpen ? 0 : closedX
    }} />
  )
}
```

## [Usage](#usage)

Import `useReducedMotion` from Motion:

```
import { useReducedMotion } from "motion/react"
```

In any component, call `useReducedMotion` to check whether the device's Reduced Motion setting is enabled.

```
const prefersReducedMotion = useReducedMotion()
```

You can then use this `true`/`false` value to change your application logic.

---

## Motion x Framer integration guide

> Add animations to your Framer project in Code Components and Overrides.

_Source: [https://motion.dev/docs/framer](https://motion.dev/docs/framer)_

[Framer](https://framer.link/pgsExYX) is the world's best no-code website builder. If you have a Framer website, all your animations are already powered by Motion.

Framer offers a number of [animations, interactions and components](https://framer.link/bdH9gwO) that mean you usually never need to write any code to achieve amazing effects.

However, advanced users can write [code components](https://framer.link/MXPS0dB) and [overrides](https://framer.link/bdhlZ3f), which are custom React components that you can drop into your canvas.

The full Motion for React API is available to use in both.

## [Import](#import)

Import Motion for React via `"framer-motion"`:

```
import { motion, useSpring } from "framer-motion"
```

Use `"framer-motion"` whenever the Motion docs instruct you to use `"motion/react"`.

## [Overrides](#overrides)

Components returned by overrides support the full `motion` [component API](/docs/react-motion-component). This means you can pass props like `animate`, `transition`, `whileHover` etc:

```
export function withRotateAnimation(Component): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                animate={{ rotate: 90 }}
                transition={{ duration: 2 }}
                style={{ ...props.style, x: 100 }}
            />
        )
    })
}
```

## [Next](#next)

With Motion set up in your Framer project, we recommend you follow the rest of the [Quick Start](/docs/react) guide to begin learning Motion for React.

---

## Animate your Figma projects with Motion

> Animate your Figma Site with Motion. Generate Motion code with Figma Make.

_Source: [https://motion.dev/docs/figma](https://motion.dev/docs/figma)_

Figma offers powerful [site-building](https://www.figma.com/sites/) and [code generation](https://www.figma.com/make/) features. Motion is available to use in both.

When adding effects via the Figma Sites Interactions menu, you're generating Motion animations with no-code!

In upcoming versions of Figma, it'll be possible to generate and write your own Motion code into your Figma site.

For now, you can already add Motion code via the [Figma Make](https://www.figma.com/make/) beta.

## [Figma Make](#figma-make)

Figma Make is an AI code generator that can generate React code from text, image, and Figma artboard prompts.

In general, it will produce Motion code simply by asking it to animate something. For instance, you can give it a screenshot of the [Motion homepage](/) and tell it to animate:

This will produce a code file with Motion already imported:

```
<motion.div
  className={className}
  variants={container}
  initial="hidden"
  animate="visible"
>
  {words.map((word, index) => (
    <motion.span
      key={index}
      variants={child}
      style={{ display: "inline-block", marginRight: "0.25em" }}
    >
      {word}
    </motion.span>
  ))}
</motion.div>
```

If your generated Make project doesn't include a `motion` import then you can either ask the AI to add it for you, or simply add an import to the top of your component:

```
import { motion } from "motion/react"
```

### [Imports](#imports)

As with many AI generators, Figma Make has the tendency to import Motion via `"framer-motion"`. This is okay! This import will work for many versions to come.

However, you can also change this manually to `"motion/react"` and your project will continue to work the same.

## [Next](#next)

With Motion set up in your Figma project, we recommend you follow the rest of the [Quick Start](/docs/react) guide to begin learning Motion for React.

---

## Animating with Tailwind CSS

> Learn how to combine Motion with the utility-first workflow of Tailwind CSS.

_Source: [https://motion.dev/docs/react-tailwind](https://motion.dev/docs/react-tailwind)_

Motion is the perfect animation companion for [Tailwind CSS](https://tailwindcss.com) v4. In this guide, we'll learn how to:

* **Perform basic animations** with the two libraries.
* **Create responsive animations** by animating CSS variables.
* **Generate Tailwind CSS spring animations** directly in your code editor using Motion for AI.

## [Basic animations](#basic-animations)

The key to using Motion with Tailwind CSS is to let each library do what it does best.

* **Tailwind CSS**'s utility classes for static and responsive styling.
* **Motion**'s animation props like `animate` and `layout` for animation.

Motion animates by applying inline styles, or via native browser animations - both of which override Tailwind CSS classes. This separation is partly why the two work so well together.

Here's a basic example of a button with a hover effect. Tailwind styles the button, while Motion handles the interactivity.

```
import { motion } from "motion/react";

function Button() {
  return (
    <motion.button
      className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Click Me!
    </motion.button>
  );
}
```

## [Responsive animations](#responsive-animations)

It's possible to make an animation responsive to screen size by combining Tailwind CSS's ability to set responsive CSS variables together with Motion's ability to animate those variables.

To start, we can define our initial values like so:

```
<motion.div
  className="
    p-8 bg-rose-500 text-white rounded-xl shadow-lg max-w-md mx-auto
    
    /* Define the CSS variable inline, with responsive values */
    [--entry-distance-y:20px] 
    md:[--entry-distance-y:50px]
  "
  initial={{ opacity: 0, y: "var(--entry-distance-y)" }}
```

Here, on medium screens and above, the initial `y` value will be `50px`, whereas on smaller screens it'll be `20px`.

Then, we can set `animate` to animate `y` to `0` from this responsive start value.

```
animate={{ opacity: 1, y: 0 }}
```

It's possible to animate **to** and/or **from** a CSS variable, so it's equally possible to animate to a responsive value, or between responsive values.

## [Generate CSS springs](#generate-css-springs)

CSS is capable of performing spring animations using the `linear()` [easing function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/linear), so you can perform simple spring animations without including Motion in your bundle. The downside of `linear()` is its obscure syntax that makes it impossible to write or edit without a generator of some kind.

With the Motion AI Kit, it's possible to [generate CSS springs](/docs/ai-kit-generate-css) directly in your AI code editor. We can make these CSS springs reusable with Tailwind utility classes.

Once installed, we can use a prompt like "make a tailwind theme to generate a css spring utility class". You can ask for a specific spring, like a "slightly bouncy spring", or otherwise it'll default to a small selection of different-feeling springs:

```
@theme {
  --ease-spring-snappy: linear(0, 0.2375, 0.5904, 0.8358, 0.9599, 1.0061, 1.0152, 1.0116, 1.0062, 1.0025, 1.0006, 0.9999, 1);
  --ease-spring: linear(0, 0.0942, 0.2989, 0.5275, 0.73, 0.8839, 0.9858, 1.0425, 1.0655, 1.0666, 1.0558, 1.0405, 1.0255, 1.0131, 1.0043, 0.9989, 0.9962, 1);
  --ease-spring-soft: linear(0, 0.0332, 0.1241, 0.2583, 0.4207, 0.5967, 0.7729, 0.9379, 1.0826, 1.2006, 1.2883, 1.3445, 1.3701, 1.3679, 1.3423, 1.2983, 1.2415, 1.1774, 1.1113, 1.0477, 0.9904, 0.9421, 0.9047, 0.8789, 0.8648, 0.8615, 0.8677, 0.8815, 0.9009, 0.9239, 0.9485, 0.9727, 0.9952, 1.0146, 1.0303, 1.0417, 1.0487, 1.0515, 1.0506, 1.0465, 1.0401, 1.032, 1.023, 1.0138, 1.0051, 0.9974, 0.9909, 0.986, 0.9828, 0.9811, 0.9809, 0.9819, 0.984, 0.9868, 0.99, 0.9935, 0.9968, 0.9998, 1.0025, 1.0045, 1.006, 1.0069, 1.0072, 1.0069, 1.0063, 1.0054, 1.0042, 1.003, 1.0017, 1.0005, 0.9995, 0.9986, 0.998, 0.9976, 1);
}
```

This new spring easings can now be used via utility classes:

```
<div className="transition-transform duration-700 ease-spring-soft">
```

[>Motion+ Â· AI Kit

### Animation superpowers for your agent.

Turn your agent into an animation powerhouse, with best practises, performance audits, and tools to search Motion documentation and examples.

Part of Motion+. One-time fee, lifetime access.

Cursor

âº](/docs/ai-kit)

## [Troubleshooting](#troubleshooting)

### [My animation is moving weirdly](#my-animation-is-moving-weirdly)

If you find that an Motion x Tailwind CSS animation is stuttery, or moving weirdly in some way, usually there's a conflict between the Motion animation and a pre-existing Tailwind transition class.

To fix, ensure that the element has no `transition-` class applied, for instance `transition-all` etc.

---

## Base UI & Motion

> How to animate Base UI components with Motion.

_Source: [https://motion.dev/docs/base-ui](https://motion.dev/docs/base-ui)_

[Base UI](https://base-ui.com/) is a component library for React that's rapidly growing in popularity. It's possible to animate almost all Base UI components with Motion, and in this guide we'll explore how.

>Live example[Open](https://examples.motion.dev/react/base-tabs)

## [Setup `motion` components](#setup-motion-components)

By default, Base UI components render and control their own DOM elements. However most components provide [the](https://base-ui.com/react/handbook/composition#composing-custom-react-components) `render` [prop](https://base-ui.com/react/handbook/composition#composing-custom-react-components) that allows you to switch this out for a `motion` [component](/docs/react-motion-component).

```
import { Menu } from "@base-ui-components/react/menu"
import { motion } from "motion/react"

function Component() {
  return (
    <Menu.Trigger render={
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whilePress={{ scale: 0.9 }}
      />
    } />
  )
}
```

## [Exit animations](#exit-animations)

In most situations, you can animate Base UI components as they leave the DOM using `AnimatePresence` and the `exit` prop, as usual:

```
<AnimatePresence>
  {open && (
    <Menu.Trigger render={
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    } />
  )}
</AnimatePresence>
```

However, some Base UI components like `ContextMenu` and `Popover` control this conditional rendering themselves. To add exit animations to these components, we must:

* Hoist their `open` state
* Add `keepMounted` to their `Portal` component
* Conditionally render the `Portal` component with `AnimatePresence`

A component's `open` state can be hoisted by defining it manually with `useState`:

```
const [open, setOpen] = useState(false)

return (
  <ContextMenu.Root open={open} onOpenChange={setOpen}>
```

Then, conditionally render the `Portal` (with a `keepMounted` prop) as a child of `AnimatePresence`:

```
return (
   <ContextMenu.Root open={open} onOpenChange={setOpen}>
    <ContextMenu.Trigger>Open menu</ContextMenu.Trigger>
    <AnimatePresence>
      {open && (
        <ContextMenu.Portal keepMounted>
```

We can then add an exit animation via a `motion` component rendered via a `render` prop:

```
function App() {
  const [open, setOpen] = useState(false)
  
  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger>Open menu</ContextMenu.Trigger>
      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner>
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, transform: "scale(0.9)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    exit={{ opacity: 0, transform: "scale(0.9)" }}
                  />
                }
              >
                {/* Children */}
              </ContextMenu.Popup>
```

`Portal` will keep the tree mounted as long as Base UI detects animations on an element using `element.getAnimations()`. Motion will run `opacity`, `transform`, `filter`, and `clipPath` animations via hardware acceleration, so ensure at least one of these values is used for the exit animation.

## [Examples](#examples)

>Live example[Open](https://examples.motion.dev/react/base-progress)

[Motion+](/plus) unlocks the source code to the full vault of Motion examples. It's a one-time payment, lifetime update membership that also unlocks a creative animation library containing components like `Cursor` and `AnimateNumber`.

Check out all the [Motion x Base UI examples](/examples?platform=react&category=base-ui).

Motion+ also includes a custom LLM ruleset for Motion x Base UI to improve the way your AI editor will integrate the two libraries.

>Live example[Open](https://examples.motion.dev/react/base-dialog)

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## Radix UI & Motion

> How to animate Radix UI components with Motion.

_Source: [https://motion.dev/docs/radix](https://motion.dev/docs/radix)_

[Radix](https://www.radix-ui.com/primitives) is one of the most popular component libraries for React, with pre-built, accessible components for common UI patterns like Accordion, Switch etc.

It doesn't come with animations out of the box, but in this guide we'll show how to integrate Motion for React with Radix UI to add a layer of polish to these components.

In this guide, we'll learn how to use `motion` [components](/docs/react-motion-component) with Radix primitives, as well as specific setups for exit and layout animations.

>Live example[Open](https://examples.motion.dev/react/number-radix-slider)

## [Setup `motion` components with Radix](#setup-motion-components-with-radix)

Most Radix components render and control their own DOM elements. But they also provide [the](https://www.radix-ui.com/primitives/docs/guides/composition) `asChild` [prop](https://www.radix-ui.com/primitives/docs/guides/composition) that, when set to `true`, will make the component use the first provided child as its DOM node instead.

By passing a `motion` [component](/docs/react-motion-component) as this child, we can now use all of its animation props as normal:

```
<Toast.Root asChild>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    layout
```

## [Add exit animations to Radix](#add-exit-animations-to-radix)

Many Radix components, like [Toast](https://www.radix-ui.com/primitives/docs/components/toast) or [Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip), would be perfect for exit animations, but can't perform them without Motion's `AnimatePresence`.

`AnimatePresence` works by mounting and unmounting its children. This is how it tracks which components are exiting:

```
<AnimatePresence>
  {isOpen && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

By default Radix tends to control state like this `isOpen` internally. However, it provides some helper props for us to track or control this state externally.

For instance, the Tooltip component provides the `open` and `onOpenChange` props, which makes it easy to track the tooltip state:

```
const [isOpen, setOpen] = useState(false)

return (
  <Tooltip.Provider>
    <Tooltip.Root open={isOpen} onOpenChange={setOpen}>
```

Now we can use this state to conditionally render the tooltip contents.

```
<AnimatePresence>
  {isOpen && (
    <Tooltip.Portal forceMount>
      <Tooltip.Content asChild>
        <motion.div
            exit={{ opacity: 0 }}
```

You can see in the above example we use the `forceMount` prop on the `Tooltip.Portal` component. Because Radix expects all its children to be rendered at all times, when we're conditionally rendering children like this, setting `forceMount` to `true` allows our enter/exit animations to work correctly.

## [Create layout animations with Radix](#create-layout-animations-with-radix)

[Layout animations](/docs/react-layout-animations) also require this same pattern of hoisting state out of the component.

```
const [tab, setTab] = useState("account")

return (
  <Tabs.Root value={tab} onValueChange={setTab} asChild>
    <motion.div layout>
```

This is to ensure `motion` components know to perform layout animations when the state changes. You can even pass this state to `layoutDependency` for better performance.

```
<motion.div layout layoutDependency={tab}>
```

## [Radix x Motion examples](#radix-x-motion-examples)

>Live example[Open](https://examples.motion.dev/react/radix-toast)

[Motion+](/plus) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [Motion examples](/examples), as well as premium components like `Cursor` and `AnimateNumber`.

Check out all the [Motion x Radix examples](/examples?platform=react&category=radix).

>Live example[Open](https://examples.motion.dev/react/radix-tabs)

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## Installation guide for Motion for React

> Learn to install and set up Motion in your React project.

_Source: [https://motion.dev/docs/react-installation](https://motion.dev/docs/react-installation)_

This guide covers everything you need to install and set up **Motion for React**. We'll cover installation via:

* **Package managers** like npm, Yarn and pnpm.
* **CDN** via jsDelivr.
* **Frameworks** like Next.js and Vite.

## [Prerequisites](#prerequisites)

Before you install Motion, note that Motion is only compatible with React versions `18.2` and higher.

## [Install via package manager](#install-via-package-manager)

The most common way of installing Motion is via a package manager.

### [npm](#npm)

```
npm install motion
```

### [Yarn](#yarn)

```
yarn add motion
```

### [pnpm](#pnpm)

```
pnpm add motion
```

Once the package is installed, you can import Motion's components and hooks via `"motion/react"`:

```
import { motion } from "motion/react"
```

## [Add via CDN](#add-via-cdn)

It's also possible to import Motion directly from an external CDN, without installation. [jsDelivr](https://www.jsdelivr.com/package/npm/motion) mirrors packages published to npm, so you can import the exact same bundle like this:

```
<script type="module">
  import motion from "https://cdn.jsdelivr.net/npm/motion@latest/react/+esm"
</script>
```

The above URL uses the `latest` version. We recommend replacing this with a fixed version. You can see the latest published version in the site footer.

## [Frameworks](#frameworks)

Motion is designed to work seamlessly with modern React frameworks. Here are a few tips for the most popular.

### [Next.js](#nextjs)

Motion supports both the Next.js Page and App Routers.

To use with the App Router, you either need to convert the importing file to a client component with the `"use client"` directive:

```
"use client"

import { motion } from "motion/react"

export default function MyComponent() {
  return <motion.div animate={{ scale: 1.5 }} />
}
```

Or to reduce the amount of JS delivered to the client, you can replace the import with `import * as motion from "motion/react-client"`:

```
import * as motion from "motion/react-client"

export default function MyComponent() {
  return <motion.div animate={{ scale: 1.5 }} />
}
```

### [Vite](#vite)

No special configuration is needed with Vite. Motion works out of the box!

---

## Accessibility

> Learn how to create accessible animations with Motion for React by respecting users' 'Reduced Motion' preferences. Discover the reducedMotion option for site-wide settings and the useReducedMotion hook for custom solutions like replacing transforms with opacity, disabling autoplaying videos, and parallax effects.

_Source: [https://motion.dev/docs/react-accessibility](https://motion.dev/docs/react-accessibility)_

Animations can have serious usability implications, even inducing motion sickness in some people.

All modern operating systems provide a setting called "Reduced Motion", where people can indicate they prefer less physical motion, either because of personal preference or because they can suffer from motion sickness.

There are already some excellent guides about *why* and *how* we should design accessible animations, like those at [A List Apart](http://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/) and [Smashing Magazine](https://www.smashingmagazine.com/2018/04/designing-accessibility-inclusion/). The main takeaways are that for users with "Reduced Motion" enabled, we should keep educational transitions but be aware of motion sickness.

That means replacing transform animations on large elements with opacity transitions, disabling auto-playing videos, and disabling parallax animations.

Motion for React provides APIs that make it simple to respect these people's preferences. In this guide, we'll learn how to use the `reducedMotion` option and `useReducedMotion` hook to make our animations accessible.

## [Automatic](#automatic)

The `reducedMotion` option can be set on `MotionConfig` to define how you want to adhere to the Reduced Motion setting.

By setting `reducedMotion` it to `"user"`, all `motion` components will **automatically** disable transform and [layout animations](/docs/react-layout-animations), while preserving the animation of other values like `opacity` and `backgroundColor`.

```
import { MotionConfig } from "framer-motion"

export function App({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
```

[Framer](https://framer.com), the no-code site builder, uses this API and exposes it via a setting in `Site Settings > Accessibility`.

Additionally, you can allow a user to override Reduced Motion for just your site by setting reducedMotion to `"always"` or `"never"` based on their profile.

```
<MotionConfig reducedMotion={userSetting}>
```

## [Manual](#manual)

While `reducedMotion` is a great blanket tool for ensuring accessible animations across your whole site, more bespoke solutions can be created with [the](/docs/react-use-reduced-motion) `useReducedMotion` [hook](/docs/react-use-reduced-motion).

This hook returns `true`/`false` depending on whether your visitor has Reduced Motion enabled.

```
import { useReducedMotion } from "framer-motion"

// In your componentconst
shouldReduceMotion = useReducedMotion()
```

We can use this boolean to fix some of the common accessibility problems, like the following.

### [Replace `transform` with `opacity`](#replace-transform-with-opacity)

When Reduced Motion is enabled on iOS, the operating system still animates between states to help users transition between each context. But instead of the default scale and x/y animations, it fades content in and out.

We can achieve this in Motion by passing different values to `animate` based on whether `useReducedMotion` returns `true` or not.

```
function Sidebar({ isOpen }) {
  const shouldReduceMotion = useReducedMotion()
  let animate

  if (isOpen) {
    animate = shouldReduceMotion ? { opacity: 1 } : { x: 0 }
  } else {
    animate = shouldReduceMotion
      ? { opacity: 0 }
      : { x: "-100%" }
  }

  return <motion.div animate={animate} />
}
```

### [Disable auto-playing video](#disable-auto-playing-video)

`useReducedMotion` isnât only compatible with the Motion. It returns a simple boolean, so you can use it for any purpose, like disabling the autoplay of a background `video` element:

```
function BackgroundVideo() {
  const shouldReduceMotion = useReducedMotion()

  return <video autoplay={!shouldReduceMotion} />
}
```

### [Disable parallax](#disable-parallax)

Parallax animations can be very unpleasant for people pre-disposed to motion sickness.

To build parallax, we usually get `scrollY` from `useViewportScroll`, and create a new `MotionValue` via passing that to `useTransform` which will update's a `motion` component's `y` position as the scroll value changes.

To disable this for reduced motion devices, we can conditionally pass this `MotionValue` to the animating element.

```
function Parallax() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 1], [0, -0.2], {
    clamp: false,
  })

  return (
    <motion.div style={{ y: shouldReduceMotion ? 0 : y }} />
  )
}
```

## [Conclusion](#conclusion)

We've learned to respect people's Reduced Motion setting with Motion for React. The `reducedMotion` option makes it simple to implement across a whole site, while `useReducedMotion` can help us create bespoke accessibility strategies with any React API.

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## Reduce bundle size

> Reduce your Motion for React bundle size for faster loading and improved SEO.

_Source: [https://motion.dev/docs/react-reduce-bundle-size](https://motion.dev/docs/react-reduce-bundle-size)_

A great web experience doesn't just look and move beautifully, it should load quickly, too.

When measuring the gzipped and minified size of Motion for React using a bundle analysis website like [Bundlephobia](https://bundlephobia.com/package/framer-motion@7.2.0), you might see big numbers like **50kb** or more!

This is misleading. Motion for React exports many functions, most of which you won't import. JavaScript bundlers like [Rollup](https://rollupjs.org/) and [Webpack](https://webpack.js.org/) are capable of "tree shaking", which means that only the code you import is shipped to consumers.

You may only use a tiny, single hook from Motion for React, like `useReducedMotion`. So in that case the size would be closer to **1kb**.

However, Motion for React's primary animation APIs are `useAnimate` and `motion`. Most developers will choose to use at least one of these when using Motion, so let's see how to make them as small as possible.

## [`useAnimate`](#useanimate)

`useAnimate` is Motion for React's animation function, used for manually triggering and controlling animations.

It comes in two sizes, **mini** (2.3kb) and **hybrid** (17kb).

The mini version exclusively uses WAAPI for hardware accelerated animations, whereas the hybrid function can also animate sequences, motion values, independent transforms and a whole lot more.

At 2.3kb, `useAnimate` mini is the smallest animation library available for React.

## [`motion`](#motion)

The `motion` [component](/docs/react-motion-component) is Motion for React's most common animation API.

Because of its declarative, props-driven API, it's impossible for bundlers to tree shake it any smaller than **34kb**.

However, by using [the](/docs/react-lazy-motion) `m` [and](/docs/react-lazy-motion) `LazyMotion` [components](/docs/react-lazy-motion), you can bring this down significantly, to just under **4.6kb** for the initial render.

Then, with lazy-loading, you can defer the loading of animations and interactions until after your site has rendered.

### [Reduce size](#reduce-size)

Instead of importing `motion`, import the slimmer `m` component.

```
import * as m from "motion/react-m"
```

`m` is used in the exact same way as `motion`, but unlike `motion`, the `m` component doesn't come preloaded with features like animations, [layout animations](/docs/react-layout-animations), or the drag gesture.

Instead, we load these in manually via the `LazyMotion` component. This lets you choose which features you load in, and whether you load them as part of the main bundle, or lazy load them.

```
import { LazyMotion, domAnimation } from "motion/react"

// Load only the domAnimation package
function App({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  )
}
```

### [Available features](#available-features)

There are currently two **feature packages** you can load:

* `domAnimation`: This provides support for animations, variants, exit animations, and tap/hover/focus gestures. (**+15kb**)
* `domMax`: This provides support for all of the above, plus pan/drag gestures and layout animations. (**+25kb**)

In the future it might be possible to offer more granular feature packages, but for now these were chosen to reduce the amount of duplication between features, which could result in much more data being downloaded ultimately.

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

### [Synchronous loading](#synchronous-loading)

By passing one of these feature packages to `LazyMotion`, they'll be bundled into your main JavaScript bundle.

```
import { LazyMotion, domAnimation } from "motion/react"

function App({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  )
}
```

### [Lazy loading](#lazy-loading)

If you're using a bundler like Webpack or Rollup, we can pass a dynamic import function to `features` that will fetch features only after we've performed our initial render.

First, create a file that exports only the features you want to load.

```
// features.js
import { domMax } from "motion/react"
export default domMax
```

Then, pass `features` a function that will dynamically load that file.

```
import { LazyMotion } from "motion/react"
import * as m from "motion/react-m"

// Make sure to return the specific export containing the feature bundle.
const loadFeatures = () =>
  import("./features.js").then(res => res.default)

// This animation will run when loadFeatures resolves.
function App() {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </LazyMotion>
  )
}
```

### [Strict mode](#strict-mode)

Because the normal `motion` component still preloads all of its functionality, including it anywhere will break the benefits of using `LazyMotion`.

To help prevent this, the `strict` prop can be set on `LazyMotion`. If a `motion` component is loaded anywhere within, it will throw with a reminder to render the `m` component instead.

```
function App() {
  // This will throw!
  return (
    <LazyMotion strict>
      <motion.div />
    </LazyMotion>
  )
}
```

All sizes quoted in this guide are from Rollup-generated bundles. Webpack is less effective at tree-shaking and should generate slightly larger bundles.

---

## Upgrade guide

> Stay up-to-date with Motion and Motion for React using our comprehensive Upgrade Guide. Find step-by-step instructions and details on breaking API changes for each major version, ensuring a smooth upgrade process from your current version to the latest release.

_Source: [https://motion.dev/docs/react-upgrade-guide](https://motion.dev/docs/react-upgrade-guide)_

We strive to reduce the number of breaking API changes but it is occasionally necessary.

The easiest way to upgrade is to start with the version you're currently using, then follow the guide to upgrade to the next version, and so on until you're at the latest version.

Changes between major versions are usually small so this is usually a quick process.

## [Motion for React](#motion-for-react)

### [12.0](#120)

There are no breaking changes in Motion for React in version 12. Please see the [JavaScript upgrade guide](/docs/upgrade-guide) for changes to the vanilla JS API.

### [`"motion/react"`](#motionreact)

To upgrade to Motion for React, uninstall `framer-motion` and install `motion`:

```
npm uninstall framer-motion
npm install motion
```

Then simply swap imports from `"framer-motion"` to `"motion/react"`:

```
import { motion } from "motion/react"
```

## [Framer Motion](#framer-motion)

### [11.0](#110)

#### [Velocity calculation changes](#velocity-calculation-changes)

In previous versions, setting a `MotionValue` multiple times within the same animation frame would update the value's velocity:

```
const x = motionValue(0)

requestAnimationFrame(() => {
  x.set(100)
  x.getVelocity() // Velocity of 0 -> 100
  x.set(200)
  x.getVelocity() // Velocity of 100 -> 200
})
```

This behaviour is incorrect. Synchronous code, practically speaking for the purposes of animation, should be considered instantaneous. Therefore, in the above example, `x` was only `100` for a infinitely small amount of time. It essentially never happened.

From version 11, subsequent value updates within synchronous blocks of code won't be considered part of a `MotionValue`'s velocity calculations. Therefore, if `getVelocity` is called after the second update, velocity will be calculated between the latest value and the value at the end of the previous frame.

```
const x = motionValue(0)

requestAnimationFrame(() => {
  x.set(100)
  x.getVelocity() // Velocity of 0 -> 100
  x.set(200)
  x.getVelocity() // Velocity of 0 -> 200
})
```

#### [Render scheduling changes](#render-scheduling-changes)

In previous versions, `motion` components trigger a render synchronously after mount to ensure dynamically-calculated values are updated on-screen. This process has now been moved to a [microtask](https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask).

This ensures that if a component is synchronously re-rendered by a `useLayoutEffect`, the first render is swallowed and we only apply the final one (the one that will be used on-screen).

This is better for performance and in most cases won't have practical ramifications for you as a developer. However, there is a caveat for Jest tests. Previously it could be assumed that updates would have applied synchronously.

```
render(
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ false }}
  />
)

expect(element).toHaveStyle("opacity: 1")
```

Tests like this should be updated to await an animation frame.

```
render(
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ false }}
  />
)

await nextFrame()

expect(element).toHaveStyle("opacity: 1")

// utils.js
import { frame } from "framer-motion"

export async function nextFrame() {
    return new Promise<void>((resolve) => {
        frame.postRender(() => resolve())
    })
}
```

1. S
2. A
3. B
4. C
5. D
6. F

> Performance audit

### Find & fix animation performance issues with your agent.

The MotionScore performance audit skill grades every animation in your codebase S to F and hands your agent the fixes, before you ship. Part of the Motion+ AI Kit.

[Get the AI Kit](/docs/ai-kit)

### [10.0](#100)

#### [`IntersectionObserver` fallback](#intersectionobserver-fallback)

This version removes the `IntersectionObserver` fallback behaviour for `whileInView`.

`IntersectionObserver` is supported by all modern browsers, representing over 99% of visitors to sites built in [Framer](https://framer.com/). If you require support for legacy browsers like Internet Explorer or Safari 12, we recommend adding an `IntersectionObserver` polyfill.

#### [`AnimatePresence exitBeforeEnter` prop](#animatepresence-exitbeforeenter-prop)

This prop was deprecated in `7.2.0`. Usage will now throw an error with upgrade instructions (swap to `mode="wait"`).

### [9.0](#90)

This version makes **tap events keyboard-accessible**.

As a result, all elements with tap listeners or `whileTap` will receive `tabindex="0"`. Reverting this behaviour is discouraged, but can be achieved by passing `tabIndex={-1}`.

Additionally, `whileFocus` now behaves like `:focus-visible` rather than `:focus`. Loosely, this means that elements receiving focus via pointer **won't trigger** focus animations, with the exception of input elements which will trigger focus from any input.

### [8.0](#80)

Framer Motion uses pointer events to detect tap, drag and hover gestures. In previous versions, these were polyfilled with mouse and touch events in legacy browsers. Version 8 removes this polyfill.

As a result, while [DragControls.start](/docs/react-use-drag-controls) was always only documented to work with events from `onPointerDown`, it was **typed** to also accept `onMouseDown` and `onTouchStart` events. These will now throw a type error for TypeScript users and should be converted to `onPointerDown`.

### [7.0](#70)

Framer Motion 7 makes `react@18` the minimum supported version.

Framer Motion 3D users should also [upgrade React Three Fiber](https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide) to `^8.2.2`.

### [6.0](#60)

Framer Motion 3D now lives in the `framer-motion-3d` package. So to upgrade to `6.0` simply change imports from `"framer-motion/three"` to `"framer-motion-3d"`.

### [5.0](#50)

#### [Shared layout animations](#shared-layout-animations)

Framer Motion 5 removes need for using the `AnimateSharedLayout` component when performing [shared element animations](/docs/react-layout-animations).

Now, you can use the `layoutId` prop and components will animate from one to another without the need for the `AnimateSharedLayout` wrapper.

#### [Measuring layout changes](#measuring-layout-changes)

Layout changes are detected when a component with a `layout` or `layoutId` prop re-renders. But it isn't performant to measure **all** components when just **one** changes.

`AnimateSharedLayout` could be used to group components that affected each other's layout. When one rerendered, `AnimateSharedLayout` would force them all to rerender.

This was not a performant approach because all grouped components would perform a re-render. Now, components that affect each other's layout can be grouped [with LayoutGroup](/docs/react-layout-group):

```
import { LayoutGroup, motion } from "framer-motion"

export function App() {
  return (
    <LayoutGroup>
      <Submenu />
      <Submenu />
    </LayoutGroup>
  )
}

function Submenu({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.ul
      layout
      style={{ height: isOpen ? "auto" : 40 }}
    >
      {children}
    </motion.ul>
  )
}
```

Grouped components will be measured whenever one of them renders, but they won't be forced to render themselves.

#### [Scoped layout animations](#scoped-layout-animations)

Previously, because `AnimateSharedLayout` was required, it would naturally scope shared layout animations. So animating between components with the same `layoutId` would only happen within the same `AnimateSharedLayout`:

```
/**
 * These items share the same layoutId but won't animate
 * between each other because they're children of different
 * AnimateSharedLayout components.
 */
<>
  <AnimateSharedLayout>
    {isVisible ? <motion.div layoutId="modal" /> : null}
  </AnimateSharedLayout>
   <AnimateSharedLayout>
    {isVisible ? <motion.div layoutId="modal" /> : null}
  </AnimateSharedLayout>
</>
```

This could lead to very poor performance. `AnimateSharedLayout` reduces layout thrashing within itself by batching layout measurements. But it had no way of batching between many `AnimateSharedLayout` components. The more you add, the more layout thrashing will occur.

Now, there is one global tree throughout your app so all layout measurements are batched. But this means all `layoutId`s share the same global context. To bring back this old behaviour you can namespace `layoutId` by providing a `id` prop to `LayoutGroup`:

```
/**
 * These layoutIds are now namespaced with
 * the id provided to LayoutGroup.
 */
<>
  <LayoutGroup id="a">
    {isVisible ? <motion.div layoutId="modal" /> : null}
  </LayoutGroup>
  <LayoutGroup id="b">
   {isVisible ? <motion.div layoutId="modal" /> : null}
  </LayoutGroup>
</>
```

#### [Drag to reorder](#drag-to-reorder)

Previous drag-to-reorder implementations were ad-hoc, usually adapted from an old proof-of-concept sandbox that relied on the (now removed) `onViewportBoxUpdate` prop. These solutions should be reimplemented with the [new Reorder components](https://www.framer.com/docs/reorder/).

#### [ESM and `create-react-app`](#esm-and-create-react-app)

To enable Framer's experimental "Handshake" features, that allow you to publish no-code components straight from Framer into production, we've moved Framer Motion to ESM modules. Some build environments like `create-react-app` might have some trouble mixing ES modules (like Framer Motion) and CJS modules (like React).

To fix, either upgrade to `create-react-app@next`, or downgrade to `framer-motion@4.1.17`.

### [4.0](#40)

Framer Motion 4 introduces a brand new `LazyMotion` component to help reduce bundle size.

Previously, a subset of `motion` functionality could be loaded in synchronously or asynchronously via `MotionConfig`'s `features` prop. This functionality has been removed in favour of the new `LazyMotion` component.

Check out the new reduce bundle size guide to find out how to use this new API.

```
import { LazyMotion, domAnimation, m } from "framer-motion"

export const MyComponent = ({ isVisible }) => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)
```

#### [Other breaking changes](#other-breaking-changes)

`4` also removes `motion.custom()`, which was previously deprecated in favour of `motion()`.

`motion.custom()` had the default behaviour of forwarding all of Framer Motion's props to the underlying component. To replicate this, the `forwardMotionProps` option can be used.

```
const MotionComponent = motion(Component, {
    forwardMotionProps: true
})
```

### [3.0](#30)

Framer Motion 3 is major release but the type of breaking change is very specific and very small. It's unlikely, though possible, to change the way your animations function.

#### [The changing behaviour](#the-changing-behaviour)

Motion 3 features a centralisation of how animation states are computed.

All animation props are now ranked in terms of priority (left being lowest, right being highest).

When one of those props changes, or becomes active/inactive, we will recompute the necessary animations. This is an extension and codification of a behaviour that was partially implemented only for the `while` props, leading to a more consistent and predictable experience.

```
const priority = ["animate", "while-", "exit"]
```

#### [Removing animation values](#removing-animation-values)

**Before**, if a value was outright removed from an animation prop, nothing would happen.

**Now**, if a value is removed, we check for it in the next highest-priority animation state. For instance, if `opacity` is removed from `whileHover`, Motion will check for it in `animate` and animate to that.

If we don't find one in `animate`, it'll check in `style`, or fallback to its initially-recorded value (for instance if the value was initially read from the DOM because none was explicitly defined).

### [2.0](#20)

Framer Motion 2 is major release and that means there's API changes. In this guide we'll take a look at how you can upgrade your code to ensure it continues to work as expected, and highlight some features that will be broken in the new version of Motion.

#### [Layout animations](#layout-animations)

Framer Motion 1 supported a couple of ways to perform layout animations, the `positionTransition` and `layoutTransition` props.

```
// Before
<motion.div layoutTransition />
```

In Framer Motion 2, these have both been superseded by the `layout` prop.

```
// After
<motion.div layout />
```

Both of the old props used to take a transition as an argument.

```
// Before
<motion.div layoutTransition={{ duration: 2 }} />
```

Now, layout animations use the same default `transition` prop as other animations.

```
// After
<motion.div layout transition={{ duration: 2 }} />
```

In Framer Motion 1, layout animations could distort `borderRadius` and `boxShadow` properties on components that were changing size. This is now fixed if either property is animated.

```
<motion.div layout initial={{ borderRadius: 20 }} />
```

Layout animations that changed size could also distort child components. This can now be corrected by providing them with a `layout` prop, too.

Only immediate children will need to be corrected for scale.

```
<motion.div layout>
  <motion.div layout />
</motion.div>
```

#### [Breaking changes](#breaking-changes)

There are some changes that don't have an immediate fix that you should be aware of before upgrading.

##### Drag

Drag has been refactored to use the same layout projection rendering methodology that powers Motion 2's layout animations to ensure the two features are fully compatible with each other.

This has lead to some breaking changes:

* Drag listeners (like `onDrag`) now report the `point` relative to the viewport, moving in line with other pointer gestures in Motion.
* `dragOriginX` and `dragOriginY` have been removed. These were added to allow a hacky way to make `positionTransition` compatible with `drag`, but `layout` is compatible with `drag` by default.

##### `useAnimatedState`

The `useAnimatedState` API was an experimental and undocumented API for use in Framer X. This has now been removed.

> Newsletter

### Stay in the loop.

Deep dives on animation, performance, and building Motion. New issues land roughly once a month, no filler.

Subscribe

---

## Cursor

> Create custom cursor and follow-along effects in React.

_Source: [https://motion.dev/docs/cursor](https://motion.dev/docs/cursor)_

`Cursor` is a powerful React component for building creative and interactive cursor effects. Effortlessly replace the default browser cursor, create engaging follow-cursor animations, or add magnetic snapping to UI elements.

Built on Motion's [layout animations](./react-layout-animations), `Cursor` is performant and full customisable with variants, CSS and custom React components.

```
<Cursor />
```

`Cursor` is exclusive to [Motion+](../plus) members. Motion+ is a one-time payment, lifetime membership that unlocks exclusive components, premium examples and access to a private Discord community.

>Live example[Open](https://examples.motion.dev/react/ios-pointer)

## [Features](#features)

* \*\*Two modes: \*\*Easily switch between replacing the default cursor or creating a "follow" cursor effect.
* **State-aware:** Automatically adapts its appearance when hovering over links, buttons, or selectable text, and when pressed.
* **Magnetic:** Make the cursor snap to interactive elements on hover for a tactile feel.
* \*\*Customisable: \*\*Use CSS, Motion variants, and custom React components to create any cursor you can imagine.
* **Accessible:** Can be disabled for users who prefer reduced motion.

## [Install](#install)

First, add the `motion-plus` package to your project using your [private token](https://plus.motion.dev). You need to be a [Motion+ member](../plus) to generate a private token.

```
npm install "https://api.motion.dev/registry.tgz?package=motion-plus&version=2.0.2&token=YOUR_AUTH_TOKEN"
```

## [Usage](#usage)

The `Cursor` component is used for both custom cursor and follow cursor effects:

```
import { Cursor } from "motion-plus/react"
```

When `Cursor` is rendered, a default custom cursor will render on the page, hiding the browser's default cursor.

```
<Cursor />
```

You can remove the cursor and restore the browser cursor at any time by removing the component.

```
{isCursorVisible ? <Cursor /> : null}
```

>Live example[Open](https://examples.motion.dev/react/cursor)

### [Styling](#styling)

By default, the cursor is a neutral grey color. It's possible to change the cursor's styles using CSS.

```
<Cursor className="my-cursor" style={{ backgroundColor: "red" }} />
```

---

## Get started with Motion for React

> Install Motion for React, animate elements with spring animations. Complete guide with examples.

_Source: [https://motion.dev/docs/react-courses](https://motion.dev/docs/react-courses)_

**Motion for React** (previously Framer Motion) is a React animation library for building smooth, production-grade UI animations. You can start with simple prop-based animations before growing to layout, gesture and scroll animations.

Motion's hybrid engine runs animations natively in the browser using the Web Animations API and ScrollTimeline for 120fps performance. When you need capabilities those APIs can't provide (like spring physics, interruptible keyframes, or gesture tracking) it seamlessly falls back to JavaScript.

Motion is trusted by companies like [Framer](https://framer.com) and [Figma](https://figma.com) to power animations for their millions of users, and has over 30 million downloads per month on [npm](https://www.npmjs.com/package/framer-motion).

In this guide, we'll learn **why** and **when** you should use Motion, how to **install** it, and give you an overview of its main features.

## [Why Motion for React?](#why-motion-for-react)

React gives you the power to build dynamic user interfaces, but orchestrating complex, performant animations can be a challenge. Motion is a production-ready React animation library designed to solve this problem, making it simple to create everything from beautiful micro-interactions to complex, gesture-driven animations.

```
import { motion } from "motion/react"
  
function Component() {
  return <motion.button animate={{ opacity: 1 }} />
}
```

### [Key advantages](#key-advantages)

Hereâs when itâs the right choice for your project.

* **Built for React.** While other animation libraries like [GSAP](/docs/gsap-vs-motion) are messy to integrate with React, Motion's declarative API is a natural fit. Animations can be linked directly to state and props.
* **Hardware-acceleration.** Motion leverages the same high-performance browser animations as CSS, ensuring your UIs stay smooth and snappy. 120fps animations with a much simpler and more expressive API.
* **Animate anything.** CSS has hard limits. Values you can't animate, keyframes you can't interrupt, staggers that must be hardcoded. Motion provides a single, consistent API that scales from simple to complex.
* **App-like gestures.** Standard CSS `:hover` events are unreliable on touch devices. Motion provides robust, cross-device gesture recognisers for tap, drag, and hover that feel native and intuitive on any device.
* **Production ready.** Built on TypeScript, surrounded by an extensive test suite, and fully tree-shakable so you only include what you import.

### [When is CSS a better choice?](#when-is-css-a-better-choice)

For simple, self-contained effects (like a color change on hover) a standard CSS transition is a lightweight solution. The strength of Motion is that it can do these simple kinds of animations but also scale to anything you can imagine. All with the same easy to write and maintain API.

## [Install](#install)

Motion is available via [npm](https://www.npmjs.com/package/motion):

```
npm install motion
```

Features can now be imported via `"motion/react"`:

```
import { motion } from "motion/react"
```

Prefer to install via CDN, or looking for framework-specific instructions? Check out our [full installation guide](/docs/react-installation).

## [Create your first animation](#create-your-first-animation)

The `<motion />` component is the foundation of Motion for React. Prefix any HTML or SVG tag with `motion.` to unlock animation props like `animate`, `whileHover`, and `exit`:

```
<motion.ul animate={{ rotate: 360 }} />
```

>Live example[Open](https://examples.motion.dev/react/rotate)

When values in `animate` change, Motion automatically transitions between them.

Physical properties like `x` and `scale` use spring physics by default; visual properties like `opacity` use tween easing. Override the animation type, duration, easing, or delay via [the](/docs/react-transitions) `transition` [prop](/docs/react-transitions):

```
<motion.div
  animate={{
    scale: 2,
    transition: { duration: 2 }
  }}
/>
```

[Learn more about React animation](/docs/react-animation)

If you're the kind of developer who learns better by doing, check out our library of [Basics examples](https://motion.dev/examples#basics). Each comes complete with a live demo and copy/paste source code.

## [Enter animation](#enter-animation)

When a component enters the page, it will automatically animate to the values defined in the `animate` prop.

You can provide values to animate from via the `initial` prop (otherwise these will be read from the DOM).

```
<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} />
```

>Live example[Open](https://examples.motion.dev/react/enter-animation)

Or disable this initial animation entirely by setting `initial` to `false`.

```
<motion.button initial={false} animate={{ scale: 1 }} />
```

## [Hover & tap animation](#hover--tap-animation)

`<motion />` extends React's event system with powerful [gesture animations](/docs/react-gestures). It currently supports hover, tap, focus, and drag.

```
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
/>
```

>Live example[Open](https://examples.motion.dev/react/gestures)

Motion's gestures are designed to feel better than using CSS or JavaScript events alone.

## [Scroll animation](#scroll-animation)

Motion supports both types of [scroll animations](/docs/react-scroll-animations): **Scroll-triggered** and **scroll-linked**.

To trigger an animation on scroll, the `whileInView` prop defines a state to animate to/from when an element enters/leaves the viewport:

```
<motion.div
  initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }}
  whileInView={{ backgroundColor: "rgb(255, 0, 0)", opacity: 1 }}
/>
```

>Live example[Open](https://examples.motion.dev/react/scroll-triggered)

Whereas to link a value directly to scroll position, it's possible to use `MotionValue`s via `useScroll`.

```
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />
```

>Live example[Open](https://examples.motion.dev/react/scroll-linked)

## [Layout animation](#layout-animation)

Motion's [layout animation](/docs/react-layout-animations) engine detects layout changes (size, position, reorder) and smoothly animates between states using transforms. Unlike basic "FLIP" implementations, it does so while correcting for scale-distortion.

It's as easy as applying the `layout` prop.

```
<motion.div layout />
```

>Live example[Open](https://examples.motion.dev/react/layout-animation)

Or to animate between completely different elements, a `layoutId`:

```
<motion.div layoutId="underline" />
```

>Live example[Open](https://examples.motion.dev/react/shared-layout-animation)

## [Exit animations](#exit-animations)

By wrapping `motion` components with `<AnimatePresence>` we gain access to [exit animations](/docs/react-animate-presence). This allows us to animate elements as they're removed from the DOM.

```
<AnimatePresence>
  {show ? <motion.div key="box" exit={{ opacity: 0 }} /> : null}
</AnimatePresence>
```

>Live example[Open](https://examples.motion.dev/react/exit-animation)

## [SVG animations](#svg-animations)

Motion has full support for [SVG animations](/docs/react-svg-animation), including support for animating `viewBox` and special values for simple path drawing effects.

```
<motion.circle animate={{ pathLength: 1 }} />
```

>Live example[Open](https://examples.motion.dev/react/use-transform)

## [Development tools](#development-tools)

Enhance your animation workflow with a suite of Motion developer tools. [Motion+](/plus) provides access to the `/motion` skill, which helps your agent access the latest Motion docs, build from over 380+ examples, find and fix animation performance issues in your codebase and much more.

>Motion+ Â· AI Kit

### One click install for Cursor

Add powerful animation skills and MCP to Cursor with one click. Motion AI Kit requires [Motion+](/plus) to install.

[Add AI Kit](cursor://anysphere.cursor-deeplink/prompt?text=Install+the+Motion+AI+Kit+for+Cursor.%0A%0A1.+Ask+me+for+my+Motion%2B+API+key+if+MOTION_TOKEN+is+not+already+set+%28from+https%3A%2F%2Fmotion.dev%2Fdashboard%2Ftokens%29.%0A%0AConfigure+the+Motion+MCP+server+globally+for+Cursor%3A%0A%0AMOTION_TOKEN%3D%22%3Ctoken%3E%22+npx+-y+add-mcp+%5C%0A++%22npx+-y+https%3A%2F%2Fapi.motion.dev%2Fregistry.tgz%3Fpackage%3Dmotion-studio-mcp%26version%3Dlatest%22+%5C%0A++--name+motion+%5C%0A++--env+TOKEN%3D%22%24MOTION_TOKEN%22+%5C%0A++-y+-g+-a+cursor%0AThis+should+update+%7E%2F.cursor%2Fmcp.json.%0A%0AInstall+the+Motion+skills+into+%7E%2F.cursor%2Fskills%2F+by+fetching%3A+https%3A%2F%2Fapi.motion.dev%2Fregistry%2Fskills%2Fmotion-ai-kit%3Ftoken%3D%3Ctoken%3E+Parse+the+skill+files+from+the+bundle+and+write+them+to%3A%0A%0A%7E%2F.cursor%2Fskills%2Fmotion%2F%0AVerify%3A%0A%0A%7E%2F.cursor%2Fmcp.json+has+a+motion+server+with+env.TOKEN%0AThe+motion+skill+folder+exists+under+%7E%2F.cursor%2Fskills%2F%0ATell+me+to+fully+restart+Cursor.%0A%0ADo+not+touch+unrelated+skills+already+in+%7E%2F.cursor%2Fskills%2F.)

Motion AI Kit is also available for Claude Code, Codex, and other popular agents. [See full installation guide](/docs/ai-kit-install).

## [Learn next](#learn-next)

That covers the core building blocks. Here's where to go next based on what you want to build and your learning style.

The [React animation](/docs/react-animation) guide will teach you more about the different types of animations you can build with this React animation library.

Or, you can learn by doing, diving straight into our collection of [examples](/examples?platform=react&category=basics). Each comes complete with full source code that you can copy-paste into your project.

---
