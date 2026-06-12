# TanStack Query Documentation

> Source: https://tanstack.com/query/latest/docs
> Framework: React
> Generated: Combined documentation from official TanStack Query docs

---

## Overview

# Overview

TanStack Query (formerly known as React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes **fetching, caching, synchronizing and updating server state** in your web applications a breeze.

## Motivation

Most core web frameworks **do not** come with an opinionated way of fetching or updating data in a holistic way. Because of this developers end up building either meta-frameworks which encapsulate strict opinions about data-fetching, or they invent their own ways of fetching data. This usually means cobbling together component-based state and side-effects, or using more general purpose state management libraries to store and provide asynchronous data throughout their apps.

While most traditional state management libraries are great for working with client state, they are **not so great at working with async or server state**. This is because **server state is totally different**. For starters, server state:

- Is persisted remotely in a location you may not control or own
- Requires asynchronous APIs for fetching and updating
- Implies shared ownership and can be changed by other people without your knowledge
- Can potentially become "out of date" in your applications if you're not careful

Once you grasp the nature of server state in your application, **even more challenges will arise** as you go, for example:

- Caching... (possibly the hardest thing to do in programming)
- Deduping multiple requests for the same data into a single request
- Updating "out of date" data in the background
- Knowing when data is "out of date"
- Reflecting updates to data as quickly as possible
- Performance optimizations like pagination and lazy loading data
- Managing memory and garbage collection of server state
- Memoizing query results with structural sharing

If you're not overwhelmed by that list, then that must mean that you've probably solved all of your server state problems already and deserve an award. However, if you are like a vast majority of people, you either have yet to tackle all or most of these challenges and we're only scratching the surface!

TanStack Query is hands down one of the _best_ libraries for managing server state. It works amazingly well **out-of-the-box, with zero-config, and can be customized** to your liking as your application grows.

TanStack Query allows you to defeat and overcome the tricky challenges and hurdles of _server state_ and control your app data before it starts to control you.

On a more technical note, TanStack Query will likely:

- Help you remove **many** lines of complicated and misunderstood code from your application and replace with just a handful of lines of TanStack Query logic
- Make your application more maintainable and easier to build new features without worrying about wiring up new server state data sources
- Have a direct impact on your end-users by making your application feel faster and more responsive than ever before
- Potentially help you save on bandwidth and increase memory performance

## Enough talk, show me some code already!

In the example below, you can see TanStack Query in its most basic and simple form being used to fetch the GitHub stats for the TanStack Query GitHub project itself:

[Open in StackBlitz](https://stackblitz.com/github/TanStack/query/tree/main/examples/react/simple)

```tsx
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}
```

## You talked me into it, so what now?

- Consider taking the official [TanStack Query Course](https://query.gg?s=tanstack) (or buying it for your whole team!)
- Learn TanStack Query at your own pace with our amazingly thorough [Walkthrough Guide](./installation.md) and [API Reference](./reference/useQuery.md)
- See the Article [Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query).

---

## Installation

# Installation

You can install React Query via [NPM](https://npmjs.com/),
or a good ol' `<script>` via
[ESM.sh](https://esm.sh/).

### NPM

```bash
npm i @tanstack/react-query
```

or

```bash
pnpm add @tanstack/react-query
```

or

```bash
yarn add @tanstack/react-query
```

or

```bash
bun add @tanstack/react-query
```

React Query is compatible with React v18+ and works with ReactDOM and React Native.

> Wanna give it a spin before you download? Try out the [simple](./examples/simple) or [basic](./examples/basic) examples!

### CDN

If you're not using a module bundler or package manager, you can also use this library via an ESM-compatible CDN such as [ESM.sh](https://esm.sh/). Simply add a `<script type="module">` tag to the bottom of your HTML file:

```html
<script type="module">
  import React from 'https://esm.sh/react@18.2.0'
  import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
  import { QueryClient } from 'https://esm.sh/@tanstack/react-query'
</script>
```

> You can find instructions on how to use React without JSX [here](https://react.dev/reference/react/createElement#creating-an-element-without-jsx).

### Requirements

React Query is optimized for modern browsers. It is compatible with the following browsers config

```
Chrome >= 91
Firefox >= 90
Edge >= 91
Safari >= 15
iOS >= 15
Opera >= 77
```

> Depending on your environment, you might need to add polyfills. If you want to support older browsers, you need to transpile the library from `node_modules` yourselves.

### Recommendations

It is recommended to also use our [ESLint Plugin Query](../../eslint/eslint-plugin-query.md) to help you catch bugs and inconsistencies while you code. You can install it via:

```bash
npm i -D @tanstack/eslint-plugin-query
```

or

```bash
pnpm add -D @tanstack/eslint-plugin-query
```

or

```bash
yarn add -D @tanstack/eslint-plugin-query
```

or

```bash
bun add -D @tanstack/eslint-plugin-query
```

---

## Quick Start

# Quick Start

This code snippet very briefly illustrates the 3 core concepts of React Query:

- [Queries](./guides/queries.md)
- [Mutations](./guides/mutations.md)
- [Query Invalidation](./guides/query-invalidation.md)

If you're looking for a fully functioning example, please have a look at our [simple StackBlitz example](./examples/simple)

```tsx
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <ul>
        {query.data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```

These three concepts make up most of the core functionality of React Query. The next sections of the documentation will go over each of these core concepts in great detail.

---

## Devtools

# Devtools

Wave your hands in the air and shout hooray because React Query comes with dedicated devtools! 🥳

When you begin your React Query journey, you'll want these devtools by your side. They help visualize all the inner workings of React Query and will likely save you hours of debugging if you find yourself in a pinch!

> For Chrome, Firefox, and Edge users: Third-party browser extensions are available for debugging TanStack Query directly in browser DevTools. These provide the same functionality as the framework-specific devtools packages:
>
> - <img alt="Chrome logo" src="https://www.google.com/chrome/static/images/chrome-logo.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Chrome](https://chromewebstore.google.com/detail/tanstack-query-devtools/annajfchloimdhceglpgglpeepfghfai)
> - <img alt="Firefox logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tanstack-query-devtools/)
> - <img alt="Edge logo" src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" width="16" height="16" class="inline mr-1 not-prose" /> [Devtools for Edge](https://microsoftedge.microsoft.com/addons/detail/tanstack-query-devtools/edmdpkgkacmjopodhfolmphdenmddobj)

> For React Native users: A third-party native macOS app is available for debugging React Query in ANY js-based application. Monitor queries across devices in real-time. Check it out here: [rn-better-dev-tools](https://github.com/LovesWorking/rn-better-dev-tools)

> Note that since version 5, the dev tools support observing mutations as well.

## Install and Import the Devtools

The devtools are a separate package that you need to install:

```bash
npm i @tanstack/react-query-devtools
```

or

```bash
pnpm add @tanstack/react-query-devtools
```

or

```bash
yarn add @tanstack/react-query-devtools
```

or

```bash
bun add @tanstack/react-query-devtools
```

For Next 13+ App Dir you must install it as a dev dependency for it to work.

You can import the devtools like this:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
```

By default, React Query Devtools are only included in bundles when `process.env.NODE_ENV === 'development'`, so you don't need to worry about excluding them during a production build.

## Floating Mode

Floating Mode will mount the devtools as a fixed, floating element in your app and provide a toggle in the corner of the screen to show and hide the devtools. This toggle state will be stored and remembered in localStorage across reloads.

Place the following code as high in your React app as you can. The closer it is to the root of the page, the better it will work!

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### Options

- `initialIsOpen: boolean`
  - Set this `true` if you want the dev tools to default to being open
- `buttonPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "relative"`
  - Defaults to `bottom-right`
  - The position of the TanStack logo to open and close the devtools panel
  - If `relative`, the button is placed in the location that you render the devtools.
- `position?: "top" | "bottom" | "left" | "right"`
  - Defaults to `bottom`
  - The position of the React Query devtools panel
- `client?: QueryClient`,
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.
- `errorTypes?: { name: string; initializer: (query: Query) => TError}[]`
  - Use this to predefine some errors that can be triggered on your queries. Initializer will be called (with the specific query) when that error is toggled on from the UI. It must return an Error.
- `styleNonce?: string`
  - Use this to pass a nonce to the style tag that is added to the document head. This is useful if you are using a Content Security Policy (CSP) nonce to allow inline styles.
- `shadowDOMTarget?: ShadowRoot`
  - Default behavior will apply the devtool's styles to the head tag within the DOM.
  - Use this to pass a shadow DOM target to the devtools so that the styles will be applied within the shadow DOM instead of within the head tag in the light DOM.
- `theme?: "light" | "dark" | "system"`
  - Defaults to `system`.
  - Set this to change the theme of the devtools panel.

## Embedded Mode

Embedded mode will show the development tools as a fixed element in your application, so you can use our panel in your own development tools.

Place the following code as high in your React app as you can. The closer it is to the root of the page, the better it will work!

```tsx
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

function App() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <button
        onClick={() => setIsOpen(!isOpen)}
      >{`${isOpen ? 'Close' : 'Open'} the devtools panel`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </QueryClientProvider>
  )
}
```

### Options

- `style?: React.CSSProperties`
  - Custom styles for the devtools panel
  - Default: `{ height: '500px' }`
  - Example: `{ height: '100%' }`
  - Example: `{ height: '100%', width: '100%' }`
- `onClose?: () => void`
  - Callback function that is called when the devtools panel is closed
- `client?: QueryClient`,
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.
- `errorTypes?: { name: string; initializer: (query: Query) => TError}[]`
  - Use this to predefine some errors that can be triggered on your queries. Initializer will be called (with the specific query) when that error is toggled on from the UI. It must return an Error.
- `styleNonce?: string`
  - Use this to pass a nonce to the style tag that is added to the document head. This is useful if you are using a Content Security Policy (CSP) nonce to allow inline styles.
- `shadowDOMTarget?: ShadowRoot`
  - Default behavior will apply the devtool's styles to the head tag within the DOM.
  - Use this to pass a shadow DOM target to the devtools so that the styles will be applied within the shadow DOM instead of within the head tag in the light DOM.
- `theme?: "light" | "dark" | "system"`
  - Defaults to `system`.
  - Set this to change the theme of the devtools panel.

## Devtools in production

Devtools are excluded in production builds. However, it might be desirable to lazy load the devtools in production:

```tsx
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Example } from './Example'

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

function App() {
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  )
}

export default App
```

With this, calling `window.toggleDevtools()` will download the devtools bundle and show them.

### Modern bundlers

If your bundler supports package exports, you can use the following import path:

```tsx
const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/production').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
)
```

For TypeScript, you would need to set `moduleResolution: 'nodenext'` in your tsconfig, which requires at least TypeScript v4.7.

---

## Comparison

# Comparison | React Query vs SWR vs Apollo vs RTK Query vs React Router

> This comparison table strives to be as accurate and as unbiased as possible. If you use any of these libraries and feel the information could be improved, feel free to suggest changes (with notes or evidence of claims) using the "Edit this page on Github" link at the bottom of this page.

Feature/Capability Key:

- ✅ 1st-class, built-in, and ready to use with no added configuration or code
- 🟡 Supported, but as an unofficial 3rd party or community library/contribution
- 🔶 Supported and documented, but requires extra user-code to implement
- 🛑 Not officially supported or documented.

|                                                    | React Query                              | SWR [_(Website)_][swr]                   | Apollo Client [_(Website)_][apollo]        | RTK-Query [_(Website)_][rtk-query]   | React Router [_(Website)_][react-router]                                  |
| -------------------------------------------------- | ---------------------------------------- | ---------------------------------------- | ------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------- |
| Github Repo / Stars                                | [![][stars-react-query]][gh-react-query] | [![][stars-swr]][gh-swr]                 | [![][stars-apollo]][gh-apollo]             | [![][stars-rtk-query]][gh-rtk-query] | [![][stars-react-router]][gh-react-router]                                |
| Platform Requirements                              | React                                    | React                                    | React, GraphQL                             | Redux                                | React                                                                     |
| Their Comparison                                   |                                          | (none)                                   | (none)                                     | [Comparison][rtk-query-comparison]   | (none)                                                                    |
| Supported Query Syntax                             | Promise, REST, GraphQL                   | Promise, REST, GraphQL                   | GraphQL, Any (Reactive Variables)          | Promise, REST, GraphQL               | Promise, REST, GraphQL                                                    |
| Supported Frameworks                               | React                                    | React                                    | React + Others                             | Any                                  | React                                                                     |
| Caching Strategy                                   | Hierarchical Key -> Value                | Unique Key -> Value                      | Normalized Schema                          | Unique Key -> Value                  | Nested Route -> value                                                     |
| Cache Key Strategy                                 | JSON                                     | JSON                                     | GraphQL Query                              | JSON                                 | Route Path                                                                |
| Cache Change Detection                             | Deep Compare Keys (Stable Serialization) | Deep Compare Keys (Stable Serialization) | Deep Compare Keys (Unstable Serialization) | Key Referential Equality (===)       | Route Change                                                              |
| Data Change Detection                              | Deep Comparison + Structural Sharing     | Deep Compare (via `stable-hash`)         | Deep Compare (Unstable Serialization)      | Key Referential Equality (===)       | Loader Run                                                                |
| Data Memoization                                   | Full Structural Sharing                  | Identity (===)                           | Normalized Identity                        | Identity (===)                       | Identity (===)                                                            |
| Bundle Size                                        | [![][bp-react-query]][bpl-react-query]   | [![][bp-swr]][bpl-swr]                   | [![][bp-apollo]][bpl-apollo]               | [![][bp-rtk-query]][bpl-rtk-query]   | [![][bp-react-router]][bpl-react-router] + [![][bp-history]][bpl-history] |
| API Definition Location                            | Component, External Config               | Component                                | GraphQL Schema                             | External Config                      | Route Tree Configuration                                                  |
| Queries                                            | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Cache Persistence                                  | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑 Active Routes Only <sup>8</sup>                                        |
| Devtools                                           | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Polling/Intervals                                  | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Parallel Queries                                   | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Dependent Queries                                  | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Paginated Queries                                  | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Infinite Queries                                   | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Bi-directional Infinite Queries                    | ✅                                       | 🔶                                       | 🔶                                         | ✅                                   | 🛑                                                                        |
| Infinite Query Refetching                          | ✅                                       | ✅                                       | 🛑                                         | ✅                                   | 🛑                                                                        |
| Lagged Query Data<sup>1</sup>                      | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Selectors                                          | ✅                                       | 🛑                                       | ✅                                         | ✅                                   | N/A                                                                       |
| Initial Data                                       | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Scroll Recovery                                    | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Cache Manipulation                                 | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Outdated Query Dismissal                           | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Render Batching & Optimization<sup>2</sup>         | ✅                                       | ✅                                       | 🛑                                         | ✅                                   | ✅                                                                        |
| Auto Garbage Collection                            | ✅                                       | 🛑                                       | 🛑                                         | ✅                                   | N/A                                                                       |
| Mutation Hooks                                     | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Offline Mutation Support                           | ✅                                       | 🛑                                       | 🟡                                         | 🛑                                   | 🛑                                                                        |
| Prefetching APIs                                   | ✅                                       | ✅                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Query Cancellation                                 | ✅                                       | 🛑                                       | 🛑                                         | 🛑                                   | ✅                                                                        |
| Partial Query Matching<sup>3</sup>                 | ✅                                       | 🔶                                       | ✅                                         | ✅                                   | N/A                                                                       |
| Stale While Revalidate                             | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Stale Time Configuration                           | ✅                                       | 🛑<sup>7</sup>                           | 🛑                                         | ✅                                   | 🛑                                                                        |
| Pre-usage Query/Mutation Configuration<sup>4</sup> | ✅                                       | 🛑                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Window Focus Refetching                            | ✅                                       | ✅                                       | 🛑                                         | ✅                                   | 🛑                                                                        |
| Network Status Refetching                          | ✅                                       | ✅                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| General Cache Dehydration/Rehydration              | ✅                                       | 🛑                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Offline Caching                                    | ✅                                       | 🛑                                       | ✅                                         | 🔶                                   | 🛑                                                                        |
| React Suspense                                     | ✅                                       | ✅                                       | ✅                                         | 🛑                                   | ✅                                                                        |
| Abstracted/Agnostic Core                           | ✅                                       | 🛑                                       | ✅                                         | ✅                                   | 🛑                                                                        |
| Automatic Refetch after Mutation<sup>5</sup>       | 🔶                                       | 🔶                                       | ✅                                         | ✅                                   | ✅                                                                        |
| Normalized Caching<sup>6</sup>                     | 🛑                                       | 🛑                                       | ✅                                         | 🛑                                   | 🛑                                                                        |

### Notes

> **<sup>1</sup> Lagged Query Data** - React Query provides a way to continue to see an existing query's data while the next query loads (similar to the same UX that suspense will soon provide natively). This is extremely important when writing pagination UIs or infinite loading UIs where you do not want to show a hard loading state whenever a new query is requested. Other libraries do not have this capability and render a hard loading state for the new query (unless it has been prefetched), while the new query loads.

> **<sup>2</sup> Render Optimization** - React Query has excellent rendering performance. By default, it will automatically track which fields are accessed and only re-render if one of them changes. If you would like to opt-out of this optimization, setting `notifyOnChangeProps` to `'all'` will re-render your components whenever the query is updated. For example because it has new data, or to indicate it is fetching. React Query also batches updates together to make sure your application only re-renders once when multiple components are using the same query. If you are only interested in the `data` or `error` properties, you can reduce the number of renders even more by setting `notifyOnChangeProps` to `['data', 'error']`.

> **<sup>3</sup> Partial query matching** - Because React Query uses deterministic query key serialization, this allows you to manipulate variable groups of queries without having to know each individual query-key that you want to match, eg. you can refetch every query that starts with `todos` in its key, regardless of variables, or you can target specific queries with (or without) variables or nested properties, and even use a filter function to only match queries that pass your specific conditions.

> **<sup>4</sup> Pre-usage Query Configuration** - This is simply a fancy name for being able to configure how queries and mutations will behave before they are used. For instance, a query can be fully configured with defaults beforehand and when the time comes to use it, only `useQuery({ queryKey })` is necessary, instead of being required to pass the fetcher and/or options with every usage. SWR does have a partial form of this feature by allowing you to pre-configure a default fetcher, but only as a global fetcher, not on a per-query basis and definitely not for mutations.

> **<sup>5</sup> Automatic Refetch after Mutation** - For truly automatic refetching to happen after a mutation occurs, a schema is necessary (like the one graphQL provides) along with heuristics that help the library know how to identify individual entities and entities types in that schema.

> **<sup>6</sup> Normalized Caching** - React Query, SWR and RTK-Query do not currently support automatic-normalized caching which describes storing entities in a flat architecture to avoid some high-level data duplication.

> **<sup>7</sup> SWR's Immutable Mode** - SWR ships with an "immutable" mode that does allow you to only fetch a query once for the life of the cache, but it still does not have the concept of stale-time or conditional auto-revalidation

> **<sup>8</sup> React Router cache persistence** - React Router does not cache data beyond the currently matched routes. If a route is left, its data is lost.

[bpl-react-query]: https://bundlephobia.com/result?p=@tanstack/react-query
[bp-react-query]: https://badgen.net/bundlephobia/minzip/@tanstack/react-query?label=💾
[gh-react-query]: https://github.com/TanStack/query
[stars-react-query]: https://img.shields.io/github/stars/TanStack/query?label=%F0%9F%8C%9F
[swr]: https://github.com/vercel/swr
[bp-swr]: https://badgen.net/bundlephobia/minzip/swr?label=💾
[gh-swr]: https://github.com/vercel/swr
[stars-swr]: https://img.shields.io/github/stars/vercel/swr?label=%F0%9F%8C%9F
[bpl-swr]: https://bundlephobia.com/result?p=swr
[apollo]: https://github.com/apollographql/apollo-client
[bp-apollo]: https://badgen.net/bundlephobia/minzip/@apollo/client?label=💾
[gh-apollo]: https://github.com/apollographql/apollo-client
[stars-apollo]: https://img.shields.io/github/stars/apollographql/apollo-client?label=%F0%9F%8C%9F
[bpl-apollo]: https://bundlephobia.com/result?p=@apollo/client
[rtk-query]: https://redux-toolkit.js.org/rtk-query/overview
[rtk-query-comparison]: https://redux-toolkit.js.org/rtk-query/comparison
[rtk-query-bundle-size]: https://redux-toolkit.js.org/rtk-query/comparison#bundle-size
[bp-rtk]: https://badgen.net/bundlephobia/minzip/@reduxjs/toolkit?label=💾
[bp-rtk-query]: https://badgen.net/bundlephobia/minzip/@reduxjs/toolkit?label=💾
[gh-rtk-query]: https://github.com/reduxjs/redux-toolkit
[stars-rtk-query]: https://img.shields.io/github/stars/reduxjs/redux-toolkit?label=🌟
[bpl-rtk]: https://bundlephobia.com/result?p=@reduxjs/toolkit
[bpl-rtk-query]: https://bundlephobia.com/package/@reduxjs/toolkit
[react-router]: https://github.com/remix-run/react-router
[bp-react-router]: https://badgen.net/bundlephobia/minzip/react-router-dom?label=💾
[gh-react-router]: https://github.com/remix-run/react-router
[stars-react-router]: https://img.shields.io/github/stars/remix-run/react-router?label=%F0%9F%8C%9F
[bpl-react-router]: https://bundlephobia.com/result?p=react-router-dom
[bp-history]: https://badgen.net/bundlephobia/minzip/history?label=💾
[bpl-history]: https://bundlephobia.com/result?p=history

---

## TypeScript

# TypeScript

React Query is now written in **TypeScript** to make sure the library and your projects are type-safe!

Things to keep in mind:

- TanStack Query follows [DefinitelyTyped's support window](https://github.com/DefinitelyTyped/DefinitelyTyped#support-window) and supports TypeScript versions released within the last 2 years. At the moment, that means TypeScript **5.4** and newer.
- Changes to types in this repository are considered **non-breaking** and are usually released as **patch** semver changes (otherwise every type enhancement would be a major version!).
- It is **highly recommended that you lock your react-query package version to a specific patch release and upgrade with the expectation that types may be fixed or upgraded between any release**
- The non-type-related public API of React Query still follows semver very strictly.

## Type Inference

Types in React Query generally flow through very well so that you don't have to provide type annotations for yourself

```tsx
const { data } = useQuery({
  //    ^? const data: number | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAORToCGAxjALQCOO+VAsAFC8MQAdqnhIAJnRh0icALwoM2XHgAUAbSqDkIAEa4qAXQA0cFQEo5APjgAFciGAYAdLVQQANgDd0KgKxmzXgB6ILgw8IA9AH5eIA)

```tsx
const { data } = useQuery({
  //      ^? const data: string | undefined
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
  select: (data) => data.toString(),
})
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAORToCGAxjALQCOO+VAsAFC8MQAdqnhIAJnRh0icALwoM2XHgAUAbSox0IqgF0ANHBUBKOQD44ABXIhgGAHS1UEADYA3dCoCsxw0gwu6EwAXHASUuZhknT2MBAAyjBQwIIA5iaExrwA9Nlw+QUAegD8vEA)

This works best if your `queryFn` has a well-defined returned type. Keep in mind that most data fetching libraries return `any` per default, so make sure to extract it to a properly typed function:

```tsx
const fetchGroups = (): Promise<Group[]> =>
  axios.get('/groups').then((response) => response.data)

const { data } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const data: Group[] | undefined
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAORToCGAxjALQCOO+VAsAFCiSw4dAB7AIqUuUpURY1Nx68YeMOjgBxcsjBwAvIjjAAJgC44AO2QgARriK9eDCOdTwS6GAwAWmiNon6ABQAlGYAClLAGAA8vtoA2gC6AHx6qbLiAHQA5h6BVAD02Vpg8sGZMF7o5oG0qJAuarqpdQ0YmUZ0MHTBDjxOLvBInd1EeigY2Lh4gfFUxX6lVIkANKQe3nGlvTwFBXAHhwB6APxwA65wI3RmW0lwAD4o5kboJMDm6Ea8QA)

## Type Narrowing

React Query uses a [discriminated union type](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for the query result, discriminated by the `status` field and the derived status boolean flags. This will allow you to check for e.g. `success` status to make `data` defined:

```tsx
const { data, isSuccess } = useQuery({
  queryKey: ['test'],
  queryFn: () => Promise.resolve(5),
})

if (isSuccess) {
  data
  //  ^? const data: number
}
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAORToCGAxjALQCOO+VAsAFC8MQAdqnhIAJnRh0ANHGCoAysgYN0qVETgBeFBmy48ACgDaVGGphUAurMMBKbQD44ABXIh56AHS1UEADYAbuiGAKx2dry8wCRwhvJKKmqoDgi8cBlwElK8APS5GQB6APy8hLxAA)

## Typing the error field

The type for error defaults to `Error`, because that is what most users expect.

```tsx
const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPRTr2swBaAI458VALAAoUJFhx6AD2ARUpcpSqLlqCZKkw8YdHADi5ZGDgBeRHGAATAFxxGyEACNcRKVNYRm8CToMKwAFmYQFqo2ABQAlM4ACurAGAA8ERYA2gC6AHzWBVoqAHQA5sExVJxl5mA6cSUwoeiMMTyokMzGVgUdXRgl9vQMcT6SfgG2uORQRNYoGNi4eDFZVLWR9VQ5ADSkwWGZ9WOSnJxwl1cAegD8QA)

If you want to throw a custom error, or something that isn't an `Error` at all, you can specify the type of the error field:

```tsx
const { error } = useQuery<Group[], string>(['groups'], fetchGroups)
//      ^? const error: string | null
```

However, this has the drawback that type inference for all other generics of `useQuery` will not work anymore. It is generally not considered a good practice to throw something that isn't an `Error`, so if you have a subclass like `AxiosError` you can use _type narrowing_ to make the error field more specific:

```tsx
import axios from 'axios'

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: Error | null

if (axios.isAxiosError(error)) {
  error
  // ^? const error: AxiosError
}
```

[typescript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgVwM4FMCKz1QJ5wC+cAZlBCHAOQACMAhgHaoMDGA1gPRTr2swBaAI458VALAAoUJFhx6AD2ARUpcpSqLlqCZKkw8YdHADi5ZGDgBeRHGAATAFxxGyEACNcRKVNYRm8CToMKwAFmYQFqo2ABQAlM4ACurAGAA8ERYA2gC6AHzWBVoqAHQA5sExVJxl5mA6cSUwoeiMMTyokMzGVgUdXRgl9vQMcT6SfgG2uORQRNYoGNi4eDFIIisA0uh4zllUtZH1VDkANHAb+ABijM5BIeF1qoRjkpyccJ9fAHoA-OPAEhwGLFVAlVIAQSUKgAolBZjEZtA4nFEFJPkioOi4O84H8pIQgA)

### Registering a global Error

TanStack Query v5 allows for a way to set a global Error type for everything, without having to specify generics on call-sides, by amending the `Register` interface. This will make sure inference still works, but the error field will be of the specified type. If you want to enforce that call-sides must do explicit type-narrowing, set `defaultError` to `unknown`:

```tsx
import '@tanstack/react-query'

declare module '@tanstack/react-query' {
  interface Register {
    // Use unknown so call sites must narrow explicitly.
    defaultError: unknown
  }
}

const { error } = useQuery({ queryKey: ['groups'], queryFn: fetchGroups })
//      ^? const error: unknown | null
```

## Typing meta

### Registering global Meta

Similarly to registering a [global error type](#registering-a-global-error) you can also register a global `Meta` type. This ensures the optional `meta` field on [queries](./reference/useQuery.md) and [mutations](./reference/useMutation.md) stays consistent and is type-safe. Note that the registered type must extend `Record<string, unknown>` so that `meta` remains an object.

```ts
import '@tanstack/react-query'

interface MyMeta extends Record<string, unknown> {
  // Your meta type definition.
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: MyMeta
    mutationMeta: MyMeta
  }
}
```

## Typing query and mutation keys

### Registering the query and mutation key types

Also similarly to registering a [global error type](#registering-a-global-error), you can also register a global `QueryKey` and `MutationKey` type. This allows you to provide more structure to your keys, that matches your application's hierarchy, and have them be typed across all of the library's surface area. Note that the registered type must extend the `Array` type, so that your keys remain an array.

```ts
import '@tanstack/react-query'

type QueryKey = ['dashboard' | 'marketing', ...ReadonlyArray<unknown>]

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey
    mutationKey: QueryKey
  }
}
```

## Typing Query Options

If you inline query options into `useQuery`, you'll get automatic type inference. However, you might want to extract the query options into a separate function to share them between `useQuery` and e.g. `prefetchQuery`. In that case, you'd lose type inference. To get it back, you can use the `queryOptions` helper:

```ts
import { queryOptions } from '@tanstack/react-query'

function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

useQuery(groupOptions())
queryClient.prefetchQuery(groupOptions())
```

Further, the `queryKey` returned from `queryOptions` knows about the `queryFn` associated with it, and we can leverage that type information to make functions like `queryClient.getQueryData` aware of those types as well:

```ts
function groupOptions() {
  return queryOptions({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 5 * 1000,
  })
}

const data = queryClient.getQueryData(groupOptions().queryKey)
//     ^? const data: Group[] | undefined
```

Without `queryOptions`, the type of `data` would be `unknown`, unless we'd pass a generic to it:

```ts
const data = queryClient.getQueryData<Group[]>(['groups'])
```

Note that type inference via `queryOptions` does _not_ work for `queryClient.getQueriesData`, because it returns an array of tuples with heterogeneous, `unknown` data. If you are sure of the type of data that your query will return, specify it explicitly:

```ts
const entries = queryClient.getQueriesData<Group[]>(groupOptions().queryKey)
//     ^? const entries: Array<[QueryKey, Group[] | undefined]>
```

## Typing Mutation Options

Similarly to `queryOptions`, you can use `mutationOptions` to extract mutation options into a separate function:

```ts
function groupMutationOptions() {
  return mutationOptions({
    mutationKey: ['addGroup'],
    mutationFn: addGroup,
  })
}

useMutation({
  ...groupMutationOptions(),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groups'] }),
})
useIsMutating(groupMutationOptions())
queryClient.isMutating(groupMutationOptions())
```

## Typesafe disabling of queries using `skipToken`

If you are using TypeScript, you can use the `skipToken` to disable a query. This is useful when you want to disable a query based on a condition, but you still want to keep the query to be type safe.
Read more about it in the [Disabling Queries](./guides/disabling-queries.md) guide.

## Further Reading

For tips and tricks around type inference, see the article [React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script). To find out how to get the best possible type-safety, you can read [Type-safe React Query](https://tkdodo.eu/blog/type-safe-react-query). [The Query Options API](https://tkdodo.eu/blog/the-query-options-api) outlines how type inference works with the `queryOptions` helper function.

---

## GraphQL

# GraphQL

Because React Query's fetching mechanisms are agnostically built on Promises, you can use React Query with literally any asynchronous data fetching client, including GraphQL!

> Keep in mind that React Query does not support normalized caching. While a vast majority of users do not actually need a normalized cache or even benefit from it as much as they believe they do, there may be very rare circumstances that may warrant it so be sure to check with us first to make sure it's truly something you need!

## Type-Safety and Code Generation

React Query, used in combination with `graphql-request^5` and [GraphQL Code Generator](https://graphql-code-generator.com/) provides full-typed GraphQL operations:

```tsx
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'

import { graphql } from './gql/gql'

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`)

function App() {
  // `data` is fully typed!
  const { data } = useQuery({
    queryKey: ['films'],
    queryFn: async () =>
      request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allFilmsWithVariablesQueryDocument,
        // variables are type-checked too!
        { first: 10 },
      ),
  })
  // ...
}
```

_You can find a [complete example in the repo](https://github.com/dotansimha/graphql-code-generator/tree/7c25c4eeb77f88677fd79da557b7b5326e3f3950/examples/front-end/react/tanstack-react-query)_

Get started with the [dedicated guide on GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/guides/react-vue).

---

## React Native

# React Native

React Query is designed to work out of the box with React Native.

## DevTools Support

There are several options available for React Native DevTools integration:

1. **Native macOS App**: A 3rd party app for debugging React Query in any js-based application:
   https://github.com/LovesWorking/rn-better-dev-tools

2. **Flipper Plugin**: A 3rd party plugin for Flipper users:
   https://github.com/bgaleotti/react-query-native-devtools

3. **Reactotron Plugin**: A 3rd party plugin for Reactotron users:
   https://github.com/hsndmr/reactotron-react-query

## Online status management

React Query already supports auto refetch on reconnect in web browser.
To add this behavior in React Native you have to use React Query `onlineManager` as in the example below:

```tsx
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})
```

or

```tsx
import { onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'

onlineManager.setEventListener((setOnline) => {
  let initialised = false

  const eventSubscription = Network.addNetworkStateListener((state) => {
    initialised = true
    setOnline(!!state.isConnected)
  })

  Network.getNetworkStateAsync()
    .then((state) => {
      if (!initialised) {
        setOnline(!!state.isConnected)
      }
    })
    .catch(() => {
      // getNetworkStateAsync can reject on some platforms/SDK versions
    })

  return eventSubscription.remove
})
```

## Refetch on App focus

Instead of event listeners on `window`, React Native provides focus information through the [`AppState` module](https://reactnative.dev/docs/appstate#app-states). You can use the `AppState` "change" event to trigger an update when the app state changes to "active":

```tsx
import { useEffect } from 'react'
import { AppState, Platform } from 'react-native'
import type { AppStateStatus } from 'react-native'
import { focusManager } from '@tanstack/react-query'

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

useEffect(() => {
  const subscription = AppState.addEventListener('change', onAppStateChange)

  return () => subscription.remove()
}, [])
```

## Refresh on Screen focus

In some situations, you may want to refetch the query when a React Native Screen is focused again.
This custom hook will refetch **all active stale queries** when the screen is focused again.

```tsx
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

export function useRefreshOnFocus() {
  const queryClient = useQueryClient()
  const firstTimeRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      // refetch all stale active queries
      queryClient.refetchQueries({
        queryKey: ['posts'],
        stale: true,
        type: 'active',
      })
    }, [queryClient]),
  )
}
```

In the above code, the first focus (when the screen is initially mounted) is skipped because `useFocusEffect` calls our callback on mount in addition to screen focus.

## Disable queries on out of focus screens

If you don't want certain queries to remain "live" while a screen is out of focus, you can use the subscribed prop on useQuery. This prop lets you control whether a query stays subscribed to updates. Combined with React Navigation's useIsFocused, it allows you to seamlessly unsubscribe from queries when a screen isn't in focus:

Example usage:

```tsx
import React from 'react'
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Text } from 'react-native'

function MyComponent() {
  const isFocused = useIsFocused()

  const { dataUpdatedAt } = useQuery({
    queryKey: ['key'],
    queryFn: () => fetch(...),
    subscribed: isFocused,
  })

  return <Text>DataUpdatedAt: {dataUpdatedAt}</Text>
}
```

When subscribed is false, the query unsubscribes from updates and won't trigger re-renders or fetch new data for that screen. Once it becomes true again (e.g., when the screen regains focus), the query re-subscribes and stays up to date.

</task>

---

All 19 pages fetched successfully. Here is the complete content:

## Important Defaults

Out of the box, TanStack Query is configured with **aggressive but sane** defaults. **Sometimes these defaults can catch new users off guard or make learning/debugging difficult if they are unknown by the user.** Keep them in mind as you continue to learn and use TanStack Query:

- Query instances via `useQuery` or `useInfiniteQuery` by default **consider cached data as stale**.

> To change this behavior, you can configure your queries both globally and per-query using the `staleTime` option. Specifying a longer `staleTime` means queries will not refetch their data as often

- A Query that has a `staleTime` set is considered **fresh** until that `staleTime` has elapsed.
  - set `staleTime` to e.g. `2 * 60 * 1000` to make sure data is read from the cache, without triggering any kinds of refetches, for 2 minutes, or until the Query is [invalidated manually](./query-invalidation.md).
  - set `staleTime` to `Infinity` to never trigger a refetch until the Query is [invalidated manually](./query-invalidation.md).
  - set `staleTime` to `'static'` to **never** trigger a refetch, even if the Query is [invalidated manually](./query-invalidation.md).

> `'static'` and `Infinity` both prevent staleness-based refetches, but `'static'` is stricter: `queryClient.invalidateQueries()` can invalidate a query with `staleTime: Infinity`, but has no effect on `staleTime: 'static'`. `refetchOnMount`, `refetchOnWindowFocus`, and `refetchOnReconnect` set to `"always"` are also blocked by `'static'`. Use `'static'` for data that cannot change while the app is running: feature flags fetched at boot, user permissions loaded at login, static reference tables. Use `Infinity` when you still want manual invalidation to work.

- Stale queries are refetched automatically in the background when:
  - New instances of the query mount
  - The window is refocused
  - The network is reconnected

> Setting `staleTime` is the recommended way to avoid excessive refetches, but you can also customize the points in time for refetches by setting options like `refetchOnMount`, `refetchOnWindowFocus` and `refetchOnReconnect`.

- Queries can optionally be configured with a `refetchInterval` to trigger refetches periodically, which is independent of the `staleTime` setting. See [Polling](./polling.md) for details.

- Query results that have no more active instances of `useQuery`, `useInfiniteQuery` or query observers are labeled as "inactive" and remain in the cache in case they are used again at a later time.
- By default, "inactive" queries are garbage collected after **5 minutes**.

  > To change this, you can alter the default `gcTime` for queries to something other than `1000 * 60 * 5` milliseconds.

- Queries that fail are **silently retried 3 times, with exponential backoff delay** before capturing and displaying an error to the UI.

  > To change this, you can alter the default `retry` and `retryDelay` options for queries to something other than `3` and the default exponential backoff function.

- Query results by default are **structurally shared to detect if data has actually changed** and if not, **the data reference remains unchanged** to better help with value stabilization with regards to useMemo and useCallback. If this concept sounds foreign, then don't worry about it! 99.9% of the time you will not need to disable this and it makes your app more performant at zero cost to you.

> Structural sharing only works with JSON-compatible values, any other value types will always be considered as changed. If you are seeing performance issues because of large responses for example, you can disable this feature with the `config.structuralSharing` flag. If you are dealing with non-JSON compatible values in your query responses and still want to detect if data has changed or not, you can provide your own custom function as `config.structuralSharing` to compute a value from the old and new responses, retaining references as required.

## Further Reading

Have a look at the following articles from our [Community Resources](../../../community-resources) for further explanations of the defaults:

- [Practical React Query](https://tkdodo.eu/blog/practical-react-query)
- [React Query as a State Manager](https://tkdodo.eu/blog/react-query-as-a-state-manager)
- [Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query)

---

## Queries

## Query Basics

A query is a declarative dependency on an asynchronous source of data that is tied to a **unique key**. A query can be used with any Promise based method (including GET and POST methods) to fetch data from a server. If your method modifies data on the server, we recommend using [Mutations](./mutations.md) instead.

To subscribe to a query in your components or custom hooks, call the `useQuery` hook with at least:

- A **unique key for the query**
- A function that returns a promise that:
  - Resolves the data, or
  - Throws an error

```tsx
import { useQuery } from '@tanstack/react-query'

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
}
```

The **unique key** you provide is used internally for refetching, caching, and sharing your queries throughout your application.

The query result returned by `useQuery` contains all of the information about the query that you'll need for templating and any other usage of the data:

```tsx
const result = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
```

The `result` object contains a few very important states you'll need to be aware of to be productive. A query can only be in one of the following states at any given moment:

- `isPending` or `status === 'pending'` - The query has no data yet
- `isError` or `status === 'error'` - The query encountered an error
- `isSuccess` or `status === 'success'` - The query was successful and data is available

Beyond those primary states, more information is available depending on the state of the query:

- `error` - If the query is in an `isError` state, the error is available via the `error` property.
- `data` - If the query is in an `isSuccess` state, the data is available via the `data` property.
- `isFetching` - In any state, if the query is fetching at any time (including background refetching) `isFetching` will be `true`.

For **most** queries, it's usually sufficient to check for the `isPending` state, then the `isError` state, then finally, assume that the data is available and render the successful state:

```tsx
function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

If booleans aren't your thing, you can always use the `status` state as well:

```tsx
function Todos() {
  const { status, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

TypeScript will also narrow the type of `data` correctly if you've checked for `pending` and `error` before accessing it.

### FetchStatus

In addition to the `status` field, you will also get an additional `fetchStatus` property with the following options:

- `fetchStatus === 'fetching'` - The query is currently fetching.
- `fetchStatus === 'paused'` - The query wanted to fetch, but it is paused. Read more about this in the [Network Mode](./network-mode.md) guide.
- `fetchStatus === 'idle'` - The query is not doing anything at the moment.

### Why two different states?

Background refetches and stale-while-revalidate logic make all combinations for `status` and `fetchStatus` possible. For example:

- a query in `success` status will usually be in `idle` fetchStatus, but it could also be in `fetching` if a background refetch is happening.
- a query that mounts and has no data will usually be in `pending` status and `fetching` fetchStatus, but it could also be `paused` if there is no network connection.

So keep in mind that a query can be in `pending` state without actually fetching data. As a rule of thumb:

- The `status` gives information about the `data`: Do we have any or not?
- The `fetchStatus` gives information about the `queryFn`: Is it running or not?

## Further Reading

For an alternative way of performing status checks, have a look at [this article by TkDodo](https://tkdodo.eu/blog/status-checks-in-react-query).

---

## Query Keys

At its core, TanStack Query manages query caching for you based on query keys. Query keys have to be an Array at the top level, and can be as simple as an Array with a single string, or as complex as an array of many strings and nested objects. As long as the query key is serializable using `JSON.stringify`, and **unique to the query's data**, you can use it!

## Simple Query Keys

The simplest form of a key is an array with constants values. This format is useful for:

- Generic List/Index resources
- Non-hierarchical resources

```tsx
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

## Array Keys with variables

When a query needs more information to uniquely describe its data, you can use an array with a string and any number of serializable objects to describe it. This is useful for:

- Hierarchical or nested resources
  - It's common to pass an ID, index, or other primitive to uniquely identify the item
- Queries with additional parameters
  - It's common to pass an object of additional options

```tsx
// An individual todo
useQuery({ queryKey: ['todo', 5], ... })

// An individual todo in a "preview" format
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})

// A list of todos that are "done"
useQuery({ queryKey: ['todos', { type: 'done' }], ... })
```

## Query Keys are hashed deterministically!

This means that no matter the order of keys in objects, all of the following queries are considered equal:

```tsx
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
useQuery({ queryKey: ['todos', { page, status, other: undefined }], ... })
```

The following query keys, however, are not equal. Array item order matters!

```tsx
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

## If your query function depends on a variable, include it in your query key

Since query keys uniquely describe the data they are fetching, they should include any variables you use in your query function that **change**. For example:

```tsx
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  })
}
```

Note that query keys act as dependencies for your query functions. Adding dependent variables to your query key will ensure that queries are cached independently, and that any time a variable changes, _queries will be refetched automatically_ (depending on your `staleTime` settings). See the [exhaustive-deps](../../../eslint/exhaustive-deps.md) section for more information and examples.

## Further reading

For tips on organizing Query Keys in larger applications, have a look at [Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys) and check the [Query Key Factory Package](https://github.com/lukemorales/query-key-factory) from the [Community Resources](../../../community-resources).

---

## Query Functions

A query function can be literally any function that **returns a promise**. The promise that is returned should either **resolve the data** or **throw an error**.

On success, the resolved value may be anything **except `undefined`**. Queries that resolve to `undefined` will be [treated as failed](https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-react-query-4#undefined-is-an-illegal-cache-value-for-successful-queries). To store "nothing" as a successful result in the query cache, resolve `null` instead.

All of the following are valid query function configurations:

```tsx
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

## Handling and Throwing Errors

For TanStack Query to determine a query has errored, the query function **must throw** or return a **rejected Promise**. Any error that is thrown in the query function will be persisted on the `error` state of the query.

```tsx
const { error } = useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    if (somethingGoesWrong) {
      throw new Error('Oh no!')
    }
    if (somethingElseGoesWrong) {
      return Promise.reject(new Error('Oh no!'))
    }

    return data
  },
})
```

## Usage with `fetch` and other clients that do not throw by default

While most utilities like `axios` or `graphql-request` automatically throw errors for unsuccessful HTTP calls, some utilities like `fetch` do not throw errors by default. If that's the case, you'll need to throw them on your own. Here is a simple way to do that with the popular `fetch` API:

```tsx
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const response = await fetch('/todos/' + todoId)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  },
})
```

## Query Function Variables

Query keys are not just for uniquely identifying the data you are fetching, but are also conveniently passed into your query function as part of the QueryFunctionContext. While not always necessary, this makes it possible to extract your query functions if needed:

```tsx
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos', { status, page }],
    queryFn: fetchTodoList,
  })
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```

### QueryFunctionContext

The `QueryFunctionContext` is the object passed to each query function. It consists of:

- `queryKey: QueryKey`: [Query Keys](./query-keys.md)
- `client: QueryClient`: [QueryClient](../../../reference/QueryClient.md)
- `signal?: AbortSignal`
  - [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) instance provided by TanStack Query
  - Can be used for [Query Cancellation](./query-cancellation.md)
- `meta: Record<string, unknown> | undefined`
  - an optional field you can fill with additional information about your query

Additionally, [Infinite Queries](./infinite-queries.md) get the following options passed:

- `pageParam: TPageParam`
  - the page parameter used to fetch the current page
- `direction: 'forward' | 'backward'`
  - **deprecated**
  - the direction of the current page fetch
  - To get access to the direction of the current page fetch, please add a direction to `pageParam` from `getNextPageParam` and `getPreviousPageParam`.

---

## Query Options

One of the best ways to share `queryKey` and `queryFn` between multiple places, yet keep them co-located to one another, is to use the `queryOptions` helper. At runtime, this helper just returns whatever you pass into it, but it has a lot of advantages when using it [with TypeScript](../typescript.md#typing-query-options). You can define all possible options for a query in one place, and you'll also get type inference and type safety for all of them.

```ts
import { queryOptions } from '@tanstack/react-query'

function groupOptions(id: number) {
  return queryOptions({
    queryKey: ['groups', id],
    queryFn: () => fetchGroups(id),
    staleTime: 5 * 1000,
  })
}

// usage:

useQuery(groupOptions(1))
useSuspenseQuery(groupOptions(5))
useQueries({
  queries: [groupOptions(1), groupOptions(2)],
})
queryClient.prefetchQuery(groupOptions(23))
queryClient.setQueryData(groupOptions(42).queryKey, newGroups)
```

For Infinite Queries, a separate [`infiniteQueryOptions`](../reference/infiniteQueryOptions.md) helper is available.

You can still override some options at the component level. A very common and useful pattern is to create per-component [`select`](./render-optimizations.md#select) functions:

```ts
// Type inference still works, so query.data will be the return type of select instead of queryFn

const query = useQuery({
  ...groupOptions(1),
  select: (data) => data.groupName,
})
```

---

## Network Mode

TanStack Query provides three different network modes to distinguish how [Queries](./queries.md) and [Mutations](./mutations.md) should behave if you have no network connection. This mode can be set for each Query / Mutation individually, or globally via the query / mutation defaults.

Since TanStack Query is most often used for data fetching in combination with data fetching libraries, the default network mode is [online](#network-mode-online).

## Network Mode: online

In this mode, Queries and Mutations will not fire unless you have network connection. This is the default mode. If a fetch is initiated for a query, it will always stay in the `state` (`pending`, `error`, `success`) it is in if the fetch cannot be made because there is no network connection. However, a [fetchStatus](./queries.md#fetchstatus) is exposed additionally. This can be either:

- `fetching`: The `queryFn` is really executing - a request is in-flight.
- `paused`: The query is not executing - it is `paused` until you have connection again
- `idle`: The query is not fetching and not paused

The flags `isFetching` and `isPaused` are derived from this state and exposed for convenience.

> Keep in mind that it might not be enough to check for `pending` state to show a loading spinner. Queries can be in `state: 'pending'`, but `fetchStatus: 'paused'` if they are mounting for the first time, and you have no network connection.

If a query runs because you are online, but you go offline while the fetch is still happening, TanStack Query will also pause the retry mechanism. Paused queries will then continue to run once you re-gain network connection. This is independent of `refetchOnReconnect` (which also defaults to `true` in this mode), because it is not a `refetch`, but rather a `continue`. If the query has been [cancelled](./query-cancellation.md) in the meantime, it will not continue.

## Network Mode: always

In this mode, TanStack Query will always fetch and ignore the online / offline state. This is likely the mode you want to choose if you use TanStack Query in an environment where you don't need an active network connection for your Queries to work - e.g. if you just read from `AsyncStorage`, or if you just want to return `Promise.resolve(5)` from your `queryFn`.

- Queries will never be `paused` because you have no network connection.
- Retries will also not pause - your Query will go to `error` state if it fails.
- `refetchOnReconnect` defaults to `false` in this mode, because reconnecting to the network is not a good indicator anymore that stale queries should be refetched. You can still turn it on if you want.

## Network Mode: offlineFirst

This mode is the middle ground between the first two options, where TanStack Query will run the `queryFn` once, but then pause retries. This is very handy if you have a serviceWorker that intercepts a request for caching like in an [offline-first PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers), or if you use HTTP caching via the [Cache-Control header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#the_cache-control_header).

In those situations, the first fetch might succeed because it comes from an offline storage / cache. However, if there is a cache miss, the network request will go out and fail, in which case this mode behaves like an `online` query - pausing retries.

## Devtools

The [TanStack Query Devtools](../devtools.md) will show Queries in a `paused` state if they would be fetching, but there is no network connection. There is also a toggle button to _Mock offline behavior_. Please note that this button will _not_ actually mess with your network connection (you can do that in the browser devtools), but it will set the [OnlineManager](../../../reference/onlineManager.md) in an offline state.

## Signature

- `networkMode: 'online' | 'always' | 'offlineFirst'`
  - optional
  - defaults to `'online'`

---

## Parallel Queries

"Parallel" queries are queries that are executed in parallel, or at the same time so as to maximize fetching concurrency.

## Manual Parallel Queries

When the number of parallel queries does not change, there is **no extra effort** to use parallel queries. Just use any number of TanStack Query's `useQuery` and `useInfiniteQuery` hooks side-by-side!

```tsx
function App () {
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  ...
}
```

> When using React Query in suspense mode, this pattern of parallelism does not work, since the first query would throw a promise internally and would suspend the component before the other queries run. To get around this, you'll either need to use the `useSuspenseQueries` hook (which is suggested) or orchestrate your own parallelism with separate components for each `useSuspenseQuery` instance.

## Dynamic Parallel Queries with `useQueries`

If the number of queries you need to execute is changing from render to render, you cannot use manual querying since that would violate the rules of hooks. Instead, TanStack Query provides a `useQueries` hook, which you can use to dynamically execute as many queries in parallel as you'd like.

`useQueries` accepts an **options object** with a **queries key** whose value is an **array of query objects**. It returns an **array of query results**:

```tsx
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => {
      return {
        queryKey: ['user', user.id],
        queryFn: () => fetchUserById(user.id),
      }
    }),
  })
}
```

---

## Dependent Queries

## useQuery dependent Query

Dependent (or serial) queries depend on previous ones to finish before they can execute. To achieve this, it's as easy as using the `enabled` option to tell a query when it is ready to run:

```tsx
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```

The `projects` query will start in:

```tsx
status: 'pending'
isPending: true
fetchStatus: 'idle'
```

As soon as the `user` is available, the `projects` query will be `enabled` and will then transition to:

```tsx
status: 'pending'
isPending: true
fetchStatus: 'fetching'
```

Once we have the projects, it will go to:

```tsx
status: 'success'
isPending: false
fetchStatus: 'idle'
```

## useQueries dependent Query

Dynamic parallel query - `useQueries` can depend on a previous query also, here's how to achieve this:

```tsx
// Get the users ids
const { data: userIds } = useQuery({
  queryKey: ['users'],
  queryFn: getUsersData,
  select: (users) => users.map((user) => user.id),
})

// Then get the users messages
const usersMessages = useQueries({
  queries: userIds
    ? userIds.map((id) => {
        return {
          queryKey: ['messages', id],
          queryFn: () => getMessagesByUsers(id),
        }
      })
    : [],
})
```

**Note** that `useQueries` return an **array of query results**

## A note about performance

Dependent queries by definition constitutes a form of [request waterfall](./request-waterfalls.md), which hurts performance. If we pretend both queries take the same amount of time, doing them serially instead of in parallel always takes twice as much time, which is especially hurtful when it happens on a client that has high latency. If you can, it's always better to restructure the backend APIs so that both queries can be fetched in parallel, though that might not always be practically feasible.

In the example above, instead of first fetching `getUserByEmail` to be able to `getProjectsByUser`, introducing a new `getProjectsByUserEmail` query would flatten the waterfall.

---

## Background Fetching Indicators

A query's `status === 'pending'` state is sufficient enough to show the initial hard-loading state for a query, but sometimes you may want to display an additional indicator that a query is refetching in the background. To do this, queries also supply you with an `isFetching` boolean that you can use to show that it's in a fetching state, regardless of the state of the `status` variable:

```tsx
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  return status === 'pending' ? (
    <span>Loading...</span>
  ) : status === 'error' ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  )
}
```

## Displaying Global Background Fetching Loading State

In addition to individual query loading states, if you would like to show a global loading indicator when **any** queries are fetching (including in the background), you can use the `useIsFetching` hook:

```tsx
import { useIsFetching } from '@tanstack/react-query'

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching()

  return isFetching ? (
    <div>Queries are fetching in the background...</div>
  ) : null
}
```

---

## Window Focus Refetching

If a user leaves your application and returns and the query data is stale, **TanStack Query automatically requests fresh data for you in the background**. You can disable this globally or per-query using the `refetchOnWindowFocus` option:

#### Disabling Globally

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

#### Disabling Per-Query

```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  refetchOnWindowFocus: false,
})
```

## Custom Window Focus Event

In rare circumstances, you may want to manage your own window focus events that trigger TanStack Query to revalidate. To do this, TanStack Query provides a `focusManager.setEventListener` function that supplies you the callback that should be fired when the window is focused and allows you to set up your own events. When calling `focusManager.setEventListener`, the previously set handler is removed (which in most cases will be the default handler) and your new handler is used instead. For example, this is the default handler:

```tsx
focusManager.setEventListener((handleFocus) => {
  if (typeof window !== 'undefined' && window.addEventListener) {
    const visibilitychangeHandler = () => {
      handleFocus(document.visibilityState === 'visible')
    }
    window.addEventListener('visibilitychange', visibilitychangeHandler, false)
    return () => {
      window.removeEventListener('visibilitychange', visibilitychangeHandler)
    }
  }
})
```

## Managing Focus in React Native

Instead of event listeners on `window`, React Native provides focus information through the [`AppState` module](https://reactnative.dev/docs/appstate#app-states). You can use the `AppState` "change" event to trigger an update when the app state changes to "active":

```tsx
import { AppState } from 'react-native'
import { focusManager } from '@tanstack/react-query'

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

useEffect(() => {
  const subscription = AppState.addEventListener('change', onAppStateChange)

  return () => subscription.remove()
}, [])
```

## Managing focus state

```tsx
import { focusManager } from '@tanstack/react-query'

// Override the default focus state
focusManager.setFocused(true)

// Fallback to the default focus check
focusManager.setFocused(undefined)
```

---

## Polling

`refetchInterval` makes a query refetch on a timer. Set it to a number in milliseconds and the query runs every N ms while there's at least one active observer:

```tsx
useQuery({
  queryKey: ['prices'],
  queryFn: fetchPrices,
  refetchInterval: 5_000,
})
```

Polling is independent of `staleTime`. A query can be fresh and still poll on schedule; see [Important Defaults](./important-defaults.md) for how `staleTime` interacts with other refetch behaviors. `refetchInterval` fires on its own clock regardless of freshness.

## Adapting the interval to query state

Pass a function instead of a number to compute the interval from the current query. The function receives the `Query` object and should return a number in ms or `false` to stop polling:

```tsx
useQuery({
  queryKey: ['job', jobId],
  queryFn: () => fetchJobStatus(jobId),
  refetchInterval: (query) => {
    if (query.state.data?.status === 'complete') return false
    return 2_000
  },
})
```

Returning `false` clears the interval timer. If the query result changes so the function would return a positive number again, polling resumes automatically.

## Background polling

By default, polling pauses when the browser tab loses focus. For dashboards or any interface where data needs to stay current even while the user is in another tab, disable that behavior:

```tsx
useQuery({
  queryKey: ['portfolio'],
  queryFn: fetchPortfolio,
  refetchInterval: 30_000,
  refetchIntervalInBackground: true,
})
```

## Pausing polling

Pass a function to `refetchInterval` and close over component state to control when polling runs:

```tsx
useQuery({
  queryKey: ['prices', tokenAddress],
  queryFn: () => fetchPrice(tokenAddress),
  refetchInterval: () => {
    if (!tokenAddress || isPaused) return false
    return 15_000
  },
})
```

## Polling with offline support

TanStack Query detects connectivity by listening to the browser's `online` and `offline` events. In environments where those events don't fire reliably (Electron, some embedded WebViews), set `networkMode: 'always'` to skip the connectivity check:

```tsx
useQuery({
  queryKey: ['chainStatus'],
  queryFn: fetchChainStatus,
  refetchInterval: 10_000,
  networkMode: 'always',
})
```

For more on network modes, see [Network Mode](./network-mode.md).

## Note on deduplication

Each `QueryObserver` (each component using `useQuery` with `refetchInterval`) runs its own timer. Two components subscribed to the same key with `refetchInterval: 5000` each fire their timer every 5 seconds. What gets deduplicated is concurrent in-flight fetches: if two timers fire at the same time, only one network request goes out. The timers are observer-level; the deduplication is query-level.

## Non-browser environments

For non-browser runtimes like React Native, the standard `online`/`offline` and focus events aren't available. The [React Native guide](../react-native.md) covers how to connect `focusManager` and `onlineManager` to native app state APIs.

---

## Disabling Queries

If you ever want to disable a query from automatically running, you can use the `enabled = false` option. The enabled option also accepts a callback that returns a boolean.

When `enabled` is `false`:

- If the query has cached data, then the query will be initialized in the `status === 'success'` or `isSuccess` state.
- If the query does not have cached data, then the query will start in the `status === 'pending'` and `fetchStatus === 'idle'` state.
- The query will not automatically fetch on mount.
- The query will not automatically refetch in the background.
- The query will ignore query client `invalidateQueries` and `refetchQueries` calls that would normally result in the query refetching.
- `refetch` returned from `useQuery` can be used to manually trigger the query to fetch. However, it will not work with `skipToken`.

> TypeScript users may prefer to use [skipToken](#typesafe-disabling-of-queries-using-skiptoken) as an alternative to `enabled = false`.

```tsx
function Todos() {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
    enabled: false,
  })

  return (
    <div>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {data ? (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}

      <div>{isFetching ? 'Fetching...' : null}</div>
    </div>
  )
}
```

Permanently disabling a query opts out of many great features that TanStack Query has to offer (like background refetches), and it's also not the idiomatic way. It takes you from the declarative approach (defining dependencies when your query should run) into an imperative mode (fetch whenever I click here). It is also not possible to pass parameters to `refetch`. Oftentimes, all you want is a lazy query that defers the initial fetch:

## Lazy Queries

The enabled option can not only be used to permanently disable a query, but also to enable / disable it at a later time. A good example would be a filter form where you only want to fire off the first request once the user has entered a filter value:

```tsx
function Todos() {
  const [filter, setFilter] = React.useState('')

  const { data } = useQuery({
    queryKey: ['todos', filter],
    queryFn: () => fetchTodos(filter),
    enabled: !!filter,
  })

  return (
    <div>
      <FiltersForm onApply={setFilter} />
      {data && <TodosTable data={data} />}
    </div>
  )
}
```

### isLoading (Previously: `isInitialLoading`)

Lazy queries will be in `status: 'pending'` right from the start because `pending` means that there is no data yet. This is technically true, however, since we are not currently fetching any data (as the query is not _enabled_), it also means you likely cannot use this flag to show a loading spinner.

If you are using disabled or lazy queries, you can use the `isLoading` flag instead. It's a derived flag that is computed from:

`isPending && isFetching`

so it will only be true if the query is currently fetching for the first time.

## Typesafe disabling of queries using `skipToken`

If you are using TypeScript, you can use the `skipToken` to disable a query. This is useful when you want to disable a query based on a condition, but you still want the query to be type safe.

> **IMPORTANT**: `refetch` from `useQuery` will not work with `skipToken`. Calling `refetch()` on a query that uses `skipToken` will result in a `Missing queryFn` error because there is no valid query function to execute. If you need to manually trigger queries, consider using `enabled: false` instead, which allows `refetch()` to work properly. Other than this limitation, `skipToken` works the same as `enabled: false`.

```tsx
import { skipToken, useQuery } from '@tanstack/react-query'

function Todos() {
  const [filter, setFilter] = React.useState<string | undefined>()

  const { data } = useQuery({
    queryKey: ['todos', filter],
    queryFn: filter ? () => fetchTodos(filter) : skipToken,
  })

  return (
    <div>
      <FiltersForm onApply={setFilter} />
      {data && <TodosTable data={data} />}
    </div>
  )
}
```

---

## Query Retries

When a `useQuery` query fails (the query function throws an error), TanStack Query will automatically retry the query if that query's request has not reached the max number of consecutive retries (defaults to `3`) or a function is provided to determine if a retry is allowed.

You can configure retries both on a global level and an individual query level.

- Setting `retry = false` will disable retries.
- Setting `retry = 6` will retry failing requests 6 times before showing the final error thrown by the function.
- Setting `retry = true` will infinitely retry failing requests.
- Setting `retry = (failureCount, error) => ...` allows for custom logic based on why the request failed. Note that `failureCount` starts at `0` for the first retry attempt.

> On the server, retries default to `0` to make server rendering as fast as possible.

```tsx
import { useQuery } from '@tanstack/react-query'

const result = useQuery({
  queryKey: ['todos', 1],
  queryFn: fetchTodoListPage,
  retry: 10,
})
```

> Info: Contents of the `error` property will be part of `failureReason` response property of `useQuery` until the last retry attempt. So in above example any error contents will be part of `failureReason` property for first 9 retry attempts (Overall 10 attempts) and finally they will be part of `error` after last attempt if error persists after all retry attempts.

## Retry Delay

By default, retries in TanStack Query do not happen immediately after a request fails. As is standard, a back-off delay is gradually applied to each retry attempt.

The default `retryDelay` is set to double (starting at `1000`ms) with each attempt, but not exceed 30 seconds:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

Though it is not recommended, you can obviously override the `retryDelay` function/integer in both the Provider and individual query options. If set to an integer instead of a function the delay will always be the same amount of time:

```tsx
const result = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
  retryDelay: 1000,
})
```

## Background Retry Behavior

When using `refetchInterval` with `refetchIntervalInBackground: true`, retries will pause when the browser tab is inactive. This happens because retries respect the same focus behavior as regular refetches.

If you need continuous retries in the background, consider disabling retries and implementing a custom refetch strategy:

```tsx
const result = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  refetchInterval: (query) => {
    return query.state.status === 'error' ? 5000 : 30000
  },
  refetchIntervalInBackground: true,
  retry: false,
})
```

This approach lets you control retry timing manually while keeping refetches active in the background.

---

## Paginated Queries

Rendering paginated data is a very common UI pattern and in TanStack Query, it "just works" by including the page information in the query key:

```tsx
const result = useQuery({
  queryKey: ['projects', page],
  queryFn: () => fetchProjects(page),
})
```

However, if you run this simple example, you might notice something strange:

**The UI jumps in and out of the `success` and `pending` states because each new page is treated like a brand new query.**

This experience is not optimal and unfortunately is how many tools today insist on working. But not TanStack Query! As you may have guessed, TanStack Query comes with an awesome feature called `placeholderData` that allows us to get around this.

## Better Paginated Queries with `placeholderData`

Consider the following example where we would ideally want to increment a pageIndex (or cursor) for a query. If we were to use `useQuery`, **it would still technically work fine**, but the UI would jump in and out of the `success` and `pending` states as different queries are created and destroyed for each page or cursor. By setting `placeholderData` to `(previousData) => previousData` or `keepPreviousData` function exported from TanStack Query, we get a few new things:

- **The data from the last successful fetch is available while new data is being requested, even though the query key has changed**.
- When the new data arrives, the previous `data` is seamlessly swapped to show the new data.
- `isPlaceholderData` is made available to know what data the query is currently providing you

```tsx
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React from 'react'

function Todos() {
  const [page, setPage] = React.useState(0)

  const fetchProjects = (page = 0) =>
    fetch('/api/projects?page=' + page).then((res) => res.json())

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ['projects', page],
      queryFn: () => fetchProjects(page),
      placeholderData: keepPreviousData,
    })

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.projects.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData && data.hasMore) {
            setPage((old) => old + 1)
          }
        }}
        disabled={isPlaceholderData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  )
}
```

## Lagging Infinite Query results with `placeholderData`

While not as common, the `placeholderData` option also works flawlessly with the `useInfiniteQuery` hook, so you can seamlessly allow your users to continue to see cached data while infinite query keys change over time.

---

## Infinite Queries

Rendering lists that can additively "load more" data onto an existing set of data or "infinite scroll" is also a very common UI pattern. TanStack Query supports a useful version of `useQuery` called `useInfiniteQuery` for querying these types of lists.

When using `useInfiniteQuery`, you'll notice a few things are different:

- `data` is now an object containing infinite query data:
- `data.pages` array containing the fetched pages
- `data.pageParams` array containing the page params used to fetch the pages
- The `fetchNextPage` and `fetchPreviousPage` functions are now available (`fetchNextPage` is required)
- The `initialPageParam` option is now available (and required) to specify the initial page param
- The `getNextPageParam` and `getPreviousPageParam` options are available for both determining if there is more data to load and the information to fetch it. This information is supplied as an additional parameter in the query function
- A `hasNextPage` boolean is now available and is `true` if `getNextPageParam` returns a value other than `null` or `undefined`
- A `hasPreviousPage` boolean is now available and is `true` if `getPreviousPageParam` returns a value other than `null` or `undefined`
- The `isFetchingNextPage` and `isFetchingPreviousPage` booleans are now available to distinguish between a background refresh state and a loading more state

> Note: Options `initialData` or `placeholderData` need to conform to the same structure of an object with `data.pages` and `data.pageParams` properties.

## Example

Let's assume we have an API that returns pages of `projects` 3 at a time based on a `cursor` index along with a cursor that can be used to fetch the next group of projects:

```tsx
fetch('/api/projects?cursor=0')
// { data: [...], nextCursor: 3}
fetch('/api/projects?cursor=3')
// { data: [...], nextCursor: 6}
fetch('/api/projects?cursor=6')
// { data: [...], nextCursor: 9}
fetch('/api/projects?cursor=9')
// { data: [...] }
```

With this information, we can create a "Load More" UI by:

- Waiting for `useInfiniteQuery` to request the first group of data by default
- Returning the information for the next query in `getNextPageParam`
- Calling `fetchNextPage` function

```tsx
import { useInfiniteQuery } from '@tanstack/react-query'

function Projects() {
  const fetchProjects = async ({ pageParam }) => {
    const res = await fetch('/api/projects?cursor=' + pageParam)
    return res.json()
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}
```

It's essential to understand that calling `fetchNextPage` while an ongoing fetch is in progress runs the risk of overwriting data refreshes happening in the background. This situation becomes particularly critical when rendering a list and triggering `fetchNextPage` simultaneously.

Remember, there can only be a single ongoing fetch for an InfiniteQuery. A single cache entry is shared for all pages, attempting to fetch twice simultaneously might lead to data overwrites.

If you intend to enable simultaneous fetching, you can utilize the `{ cancelRefetch: false }` option (default: true) within `fetchNextPage`.

To ensure a seamless querying process without conflicts, it's highly recommended to verify that the query is not in an `isFetching` state, especially if the user won't directly control that call.

```jsx
<List onEndReached={() => hasNextPage && !isFetching && fetchNextPage()} />
```

## What happens when an infinite query needs to be refetched?

When an infinite query becomes `stale` and needs to be refetched, each group is fetched `sequentially`, starting from the first one. This ensures that even if the underlying data is mutated, we're not using stale cursors and potentially getting duplicates or skipping records. If an infinite query's results are ever removed from the queryCache, the pagination restarts at the initial state with only the initial group being requested.

## What if I want to implement a bi-directional infinite list?

Bi-directional lists can be implemented by using the `getPreviousPageParam`, `fetchPreviousPage`, `hasPreviousPage` and `isFetchingPreviousPage` properties and functions.

```tsx
useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
})
```

## What if I want to show the pages in reversed order?

Sometimes you may want to show the pages in reversed order. If this is case, you can use the `select` option:

```tsx
useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  select: (data) => ({
    pages: [...data.pages].reverse(),
    pageParams: [...data.pageParams].reverse(),
  }),
})
```

## What if I want to manually update the infinite query?

### Manually removing first page:

```tsx
queryClient.setQueryData(['projects'], (data) => ({
  pages: data.pages.slice(1),
  pageParams: data.pageParams.slice(1),
}))
```

### Manually removing a single value from an individual page:

```tsx
const newPagesArray =
  oldPagesArray?.pages.map((page) =>
    page.filter((val) => val.id !== updatedId),
  ) ?? []

queryClient.setQueryData(['projects'], (data) => ({
  pages: newPagesArray,
  pageParams: data.pageParams,
}))
```

### Keep only the first page:

```tsx
queryClient.setQueryData(['projects'], (data) => ({
  pages: data.pages.slice(0, 1),
  pageParams: data.pageParams.slice(0, 1),
}))
```

Make sure to always keep the same data structure of pages and pageParams!

## What if I want to limit the number of pages?

In some use cases you may want to limit the number of pages stored in the query data to improve the performance and UX:

- when the user can load a large number of pages (memory usage)
- when you have to refetch an infinite query that contains dozens of pages (network usage: all the pages are sequentially fetched)

The solution is to use a "Limited Infinite Query". This is made possible by using the `maxPages` option in conjunction with `getNextPageParam` and `getPreviousPageParam` to allow fetching pages when needed in both directions.

In the following example only 3 pages are kept in the query data pages array. If a refetch is needed, only 3 pages will be refetched sequentially.

```tsx
useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,
  maxPages: 3,
})
```

## What if my API doesn't return a cursor?

If your API doesn't return a cursor, you can use the `pageParam` as a cursor. Because `getNextPageParam` and `getPreviousPageParam` also get the `pageParam`of the current page, you can use it to calculate the next / previous page param.

```tsx
return useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  initialPageParam: 0,
  getNextPageParam: (lastPage, allPages, lastPageParam) => {
    if (lastPage.length === 0) {
      return undefined
    }
    return lastPageParam + 1
  },
  getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
    if (firstPageParam <= 1) {
      return undefined
    }
    return firstPageParam - 1
  },
})
```

## Further reading

To get a better understanding of how Infinite Queries work under the hood, see the article [How Infinite Queries work](https://tkdodo.eu/blog/how-infinite-queries-work).

---

## Initial Query Data

There are many ways to supply initial data for a query to the cache before you need it:

- Declaratively:
  - Provide `initialData` to a query to prepopulate its cache if empty
- Imperatively:
  - [Prefetch the data using `queryClient.prefetchQuery`](./prefetching.md)
  - [Manually place the data into the cache using `queryClient.setQueryData`](./prefetching.md)

## Using `initialData` to prepopulate a query

There may be times when you already have the initial data for a query available in your app and can simply provide it directly to your query. If and when this is the case, you can use the `config.initialData` option to set the initial data for a query and skip the initial loading state!

> IMPORTANT: `initialData` is persisted to the cache, so it is not recommended to provide placeholder, partial or incomplete data to this option and instead use `placeholderData`

```tsx
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: initialTodos,
})
```

### `staleTime` and `initialDataUpdatedAt`

By default, `initialData` is treated as totally fresh, as if it were just fetched. This also means that it will affect how it is interpreted by the `staleTime` option.

- If you configure your query observer with `initialData`, and no `staleTime` (the default `staleTime: 0`), the query will immediately refetch when it mounts:

  ```tsx
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    initialData: initialTodos,
  })
  ```

- If you configure your query observer with `initialData` and a `staleTime` of `1000` ms, the data will be considered fresh for that same amount of time, as if it was just fetched from your query function.

  ```tsx
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    initialData: initialTodos,
    staleTime: 1000,
  })
  ```

- So what if your `initialData` isn't totally fresh? That leaves us with the last configuration that is actually the most accurate and uses an option called `initialDataUpdatedAt`. This option allows you to pass a numeric JS timestamp in milliseconds of when the initialData itself was last updated, e.g. what `Date.now()` provides. Take note that if you have a unix timestamp, you'll need to convert it to a JS timestamp by multiplying it by `1000`.

  ```tsx
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    initialData: initialTodos,
    staleTime: 60 * 1000, // 1 minute
    initialDataUpdatedAt: initialTodosUpdatedTimestamp,
  })
  ```

  This option allows the staleTime to be used for its original purpose, determining how fresh the data needs to be, while also allowing the data to be refetched on mount if the `initialData` is older than the `staleTime`. In the example above, our data needs to be fresh within 1 minute, and we can hint to the query when the initialData was last updated so the query can decide for itself whether the data needs to be refetched again or not.

  > If you would rather treat your data as **prefetched data**, we recommend that you use the `prefetchQuery` or `fetchQuery` APIs to populate the cache beforehand, thus letting you configure your `staleTime` independently from your initialData

### Initial Data Function

If the process for accessing a query's initial data is intensive or just not something you want to perform on every render, you can pass a function as the `initialData` value. This function will be executed only once when the query is initialized, saving you precious memory and/or CPU:

```tsx
const result = useQuery({
  queryKey: ['todos'],
  queryFn: () => fetch('/todos'),
  initialData: () => getExpensiveTodos(),
})
```

### Initial Data from Cache

In some circumstances, you may be able to provide the initial data for a query from the cached result of another. A good example of this would be searching the cached data from a todos list query for an individual todo item, then using that as the initial data for your individual todo query:

```tsx
const result = useQuery({
  queryKey: ['todo', todoId],
  queryFn: () => fetch('/todos'),
  initialData: () => {
    return queryClient.getQueryData(['todos'])?.find((d) => d.id === todoId)
  },
})
```

### Initial Data from the cache with `initialDataUpdatedAt`

Getting initial data from the cache means the source query you're using to look up the initial data from is likely old. Instead of using an artificial `staleTime` to keep your query from refetching immediately, it's suggested that you pass the source query's `dataUpdatedAt` to `initialDataUpdatedAt`. This provides the query instance with all the information it needs to determine if and when the query needs to be refetched, regardless of initial data being provided.

```tsx
const result = useQuery({
  queryKey: ['todos', todoId],
  queryFn: () => fetch(`/todos/${todoId}`),
  initialData: () =>
    queryClient.getQueryData(['todos'])?.find((d) => d.id === todoId),
  initialDataUpdatedAt: () =>
    queryClient.getQueryState(['todos'])?.dataUpdatedAt,
})
```

### Conditional Initial Data from Cache

If the source query you're using to look up the initial data from is old, you may not want to use the cached data at all and just fetch from the server. To make this decision easier, you can use the `queryClient.getQueryState` method instead to get more information about the source query, including a `state.dataUpdatedAt` timestamp you can use to decide if the query is "fresh" enough for your needs:

```tsx
const result = useQuery({
  queryKey: ['todo', todoId],
  queryFn: () => fetch(`/todos/${todoId}`),
  initialData: () => {
    const state = queryClient.getQueryState(['todos'])

    if (state && Date.now() - state.dataUpdatedAt <= 10 * 1000) {
      return state.data.find((d) => d.id === todoId)
    }

    // Otherwise, return undefined and let it fetch from a hard loading state!
  },
})
```

## Further reading

For a comparison between `Initial Data` and `Placeholder Data`, see the [article by TkDodo](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query).

---

## Placeholder Query Data

## What is placeholder data?

Placeholder data allows a query to behave as if it already has data, similar to the `initialData` option, but **the data is not persisted to the cache**. This comes in handy for situations where you have enough partial (or fake) data to render the query successfully while the actual data is fetched in the background.

> Example: An individual blog post query could pull "preview" data from a parent list of blog posts that only include title and a small snippet of the post body. You would not want to persist this partial data to the query result of the individual query, but it is useful for showing the content layout as quickly as possible while the actual query finishes to fetch the entire object.

There are a few ways to supply placeholder data for a query to the cache before you need it:

- Declaratively:
  - Provide `placeholderData` to a query to prepopulate its cache if empty
- Imperatively:
  - [Prefetch or fetch the data using `queryClient` and the `placeholderData` option](./prefetching.md)

When we use `placeholderData`, our Query will not be in a `pending` state - it will start out as being in `success` state, because we have `data` to display - even if that data is just "placeholder" data. To distinguish it from "real" data, we will also have the `isPlaceholderData` flag set to `true` on the Query result.

## Placeholder Data as a Value

```tsx
function Todos() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    placeholderData: placeholderTodos,
  })
}
```

### Placeholder Data Memoization

If the process for accessing a query's placeholder data is intensive or just not something you want to perform on every render, you can memoize the value:

```tsx
function Todos() {
  const placeholderData = useMemo(() => generateFakeTodos(), [])
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/todos'),
    placeholderData,
  })
}
```

## Placeholder Data as a Function

`placeholderData` can also be a function, where you can get access to the data and Query meta information of a "previous" successful Query. This is useful for situations where you want to use the data from one query as the placeholder data for another query. When the QueryKey changes, e.g. from `['todos', 1]` to `['todos', 2]`, we can keep displaying "old" data instead of having to show a loading spinner while data is _transitioning_ from one Query to the next. For more information, see [Paginated Queries](./paginated-queries.md).

```tsx
const result = useQuery({
  queryKey: ['todos', id],
  queryFn: () => fetch(`/todos/${id}`),
  placeholderData: (previousData, previousQuery) => previousData,
})
```

### Placeholder Data from Cache

In some circumstances, you may be able to provide the placeholder data for a query from the cached result of another. A good example of this would be searching the cached data from a blog post list query for a preview version of the post, then using that as the placeholder data for your individual post query:

```tsx
function BlogPost({ blogPostId }) {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['blogPost', blogPostId],
    queryFn: () => fetch(`/blogPosts/${blogPostId}`),
    placeholderData: () => {
      return queryClient
        .getQueryData(['blogPosts'])
        ?.find((d) => d.id === blogPostId)
    },
  })
}
```

## Further reading

For a comparison between `Placeholder Data` and `Initial Data`, see the [article by TkDodo](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query).

---

## Mutations

Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, TanStack Query exports a `useMutation` hook.

Here's an example of a mutation that adds a new todo to the server:

```tsx
function App() {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post('/todos', newTodo)
    },
  })

  return (
    <div>
      {mutation.isPending ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  )
}
```

A mutation can only be in one of the following states at any given moment:

- `isIdle` or `status === 'idle'` - The mutation is currently idle or in a fresh/reset state
- `isPending` or `status === 'pending'` - The mutation is currently running
- `isError` or `status === 'error'` - The mutation encountered an error
- `isSuccess` or `status === 'success'` - The mutation was successful and mutation data is available

Beyond those primary states, more information is available depending on the state of the mutation:

- `error` - If the mutation is in an `error` state, the error is available via the `error` property.
- `data` - If the mutation is in a `success` state, the data is available via the `data` property.

In the example above, you also saw that you can pass variables to your mutations function by calling the `mutate` function with a **single variable or object**.

Even with just variables, mutations aren't all that special, but when used with the `onSuccess` option, the [Query Client's `invalidateQueries` method](../../../reference/QueryClient.md#queryclientinvalidatequeries) and the [Query Client's `setQueryData` method](../../../reference/QueryClient.md#queryclientsetquerydata), mutations become a very powerful tool.

> IMPORTANT: The `mutate` function is an asynchronous function, which means you cannot use it directly in an event callback in **React 16 and earlier**. If you need to access the event in `onSubmit` you need to wrap `mutate` in another function. This is due to [React event pooling](https://reactjs.org/docs/legacy-event-pooling.html).

```tsx
// This will not work in React 16 and earlier
const CreateTodo = () => {
  const mutation = useMutation({
    mutationFn: (event) => {
      event.preventDefault()
      return fetch('/api', new FormData(event.target))
    },
  })

  return <form onSubmit={mutation.mutate}>...</form>
}

// This will work
const CreateTodo = () => {
  const mutation = useMutation({
    mutationFn: (formData) => {
      return fetch('/api', formData)
    },
  })
  const onSubmit = (event) => {
    event.preventDefault()
    mutation.mutate(new FormData(event.target))
  }

  return <form onSubmit={onSubmit}>...</form>
}
```

## Resetting Mutation State

It's sometimes the case that you need to clear the `error` or `data` of a mutation request. To do this, you can use the `reset` function to handle this:

```tsx
const CreateTodo = () => {
  const [title, setTitle] = useState('')
  const mutation = useMutation({ mutationFn: createTodo })

  const onCreateTodo = (e) => {
    e.preventDefault()
    mutation.mutate({ title })
  }

  return (
    <form onSubmit={onCreateTodo}>
      {mutation.error && (
        <h5 onClick={() => mutation.reset()}>{mutation.error}</h5>
      )}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <button type="submit">Create Todo</button>
    </form>
  )
}
```

## Mutation Side Effects

`useMutation` comes with some helper options that allow quick and easy side-effects at any stage during the mutation lifecycle. These come in handy for both [invalidating and refetching queries after mutations](./invalidations-from-mutations.md) and even [optimistic updates](./optimistic-updates.md)

```tsx
useMutation({
  mutationFn: addTodo,
  onMutate: (variables) => {
    return { id: 1 }
  },
  onError: (error, variables, onMutateResult) => {
    console.log(`rolling back optimistic update with id ${onMutateResult.id}`)
  },
  onSuccess: (data, variables, onMutateResult) => {
    // Boom baby!
  },
  onSettled: (data, error, variables, onMutateResult) => {
    // Error or success... doesn't matter!
  },
})
```

When returning a promise in any of the callback functions it will first be awaited before the next callback is called:

```tsx
useMutation({
  mutationFn: addTodo,
  onSuccess: async () => {
    console.log("I'm first!")
  },
  onSettled: async () => {
    console.log("I'm second!")
  },
})
```

You might find that you want to **trigger additional callbacks** beyond the ones defined on `useMutation` when calling `mutate`. This can be used to trigger component-specific side effects. To do that, you can provide any of the same callback options to the `mutate` function after your mutation variable. Supported options include: `onSuccess`, `onError` and `onSettled`. Please keep in mind that those additional callbacks won't run if your component unmounts _before_ the mutation finishes.

```tsx
useMutation({
  mutationFn: addTodo,
  onSuccess: (data, variables, onMutateResult) => {
    // I will fire first
  },
  onError: (error, variables, onMutateResult) => {
    // I will fire first
  },
  onSettled: (data, error, variables, onMutateResult) => {
    // I will fire first
  },
})

mutate(todo, {
  onSuccess: (data, variables, onMutateResult) => {
    // I will fire second!
  },
  onError: (error, variables, onMutateResult) => {
    // I will fire second!
  },
  onSettled: (data, error, variables, onMutateResult) => {
    // I will fire second!
  },
})
```

### Consecutive mutations

There is a slight difference in handling `onSuccess`, `onError` and `onSettled` callbacks when it comes to consecutive mutations. When passed to the `mutate` function, they will be fired up only _once_ and only if the component is still mounted. This is due to the fact that mutation observer is removed and resubscribed every time when the `mutate` function is called. On the contrary, `useMutation` handlers execute for each `mutate` call.

> Be aware that most likely, `mutationFn` passed to `useMutation` is asynchronous. In that case, the order in which mutations are fulfilled may differ from the order of `mutate` function calls.

```tsx
useMutation({
  mutationFn: addTodo,
  onSuccess: (data, variables, onMutateResult) => {
    // Will be called 3 times
  },
})

const todos = ['Todo 1', 'Todo 2', 'Todo 3']
todos.forEach((todo) => {
  mutate(todo, {
    onSuccess: (data, variables, onMutateResult) => {
      // Will execute only once, for the last mutation (Todo 3),
      // regardless which mutation resolves first
    },
  })
})
```

## Promises

Use `mutateAsync` instead of `mutate` to get a promise which will resolve on success or throw on an error. This can for example be used to compose side effects.

```tsx
const mutation = useMutation({ mutationFn: addTodo })

try {
  const todo = await mutation.mutateAsync(todo)
  console.log(todo)
} catch (error) {
  console.error(error)
} finally {
  console.log('done')
}
```

## Retry

By default, TanStack Query will not retry a mutation on error, but it is possible with the `retry` option:

```tsx
const mutation = useMutation({
  mutationFn: addTodo,
  retry: 3,
})
```

If mutations fail because the device is offline, they will be retried in the same order when the device reconnects.

## Persist mutations

Mutations can be persisted to storage if needed and resumed at a later point. This can be done with the hydration functions:

```tsx
const queryClient = new QueryClient()

queryClient.setMutationDefaults(['addTodo'], {
  mutationFn: addTodo,
  onMutate: async (variables, context) => {
    await context.client.cancelQueries({ queryKey: ['todos'] })
    const optimisticTodo = { id: uuid(), title: variables.title }
    context.client.setQueryData(['todos'], (old) => [...old, optimisticTodo])
    return { optimisticTodo }
  },
  onSuccess: (result, variables, onMutateResult, context) => {
    context.client.setQueryData(['todos'], (old) =>
      old.map((todo) =>
        todo.id === onMutateResult.optimisticTodo.id ? result : todo,
      ),
    )
  },
  onError: (error, variables, onMutateResult, context) => {
    context.client.setQueryData(['todos'], (old) =>
      old.filter((todo) => todo.id !== onMutateResult.optimisticTodo.id),
    )
  },
  retry: 3,
})

const mutation = useMutation({ mutationKey: ['addTodo'] })
mutation.mutate({ title: 'title' })

const state = dehydrate(queryClient)
hydrate(queryClient, state)
queryClient.resumePausedMutations()
```

### Persisting Offline mutations

If you persist offline mutations with the [persistQueryClient plugin](../plugins/persistQueryClient.md), mutations cannot be resumed when the page is reloaded unless you provide a default mutation function.

This is a technical limitation. When persisting to an external storage, only the state of mutations is persisted, as functions cannot be serialized. After hydration, the component that triggers the mutation might not be mounted, so calling `resumePausedMutations` might yield an error: `No mutationFn found`.

```tsx
const persister = createSyncStoragePersister({
  storage: window.localStorage,
})
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
})

queryClient.setMutationDefaults(['todos'], {
  mutationFn: ({ id, data }) => {
    return api.updateTodo(id, data)
  },
})

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        queryClient.resumePausedMutations()
      }}
    >
      <RestOfTheApp />
    </PersistQueryClientProvider>
  )
}
```

We also have an extensive [offline example](../examples/offline) that covers both queries and mutations.

## Mutation Scopes

Per default, all mutations run in parallel - even if you invoke `.mutate()` of the same mutation multiple times. Mutations can be given a `scope` with an `id` to avoid that. All mutations with the same `scope.id` will run in serial, which means when they are triggered, they will start in `isPaused: true` state if there is already a mutation for that scope in progress. They will be put into a queue and will automatically resume once their time in the queue has come.

```tsx
const mutation = useMutation({
  mutationFn: addTodo,
  scope: {
    id: 'todo',
  },
})
```

## Further reading

For more information about mutations, have a look at [TkDodo's article on Mastering Mutations in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query).

---

## Query Invalidation

Waiting for queries to become stale before they are fetched again doesn't always work, especially when you know for a fact that a query's data is out of date because of something the user has done. For that purpose, the `QueryClient` has an `invalidateQueries` method that lets you intelligently mark queries as stale and potentially refetch them too!

```tsx
// Invalidate every query in the cache
queryClient.invalidateQueries()
// Invalidate every query with a key that starts with `todos`
queryClient.invalidateQueries({ queryKey: ['todos'] })
```

> Note: Where other libraries that use normalized caches would attempt to update local queries with the new data either imperatively or via schema inference, TanStack Query gives you the tools to avoid the manual labor that comes with maintaining normalized caches and instead prescribes **targeted invalidation, background-refetching and ultimately atomic updates**.

When a query is invalidated with `invalidateQueries`, two things happen:

- It is marked as stale. This stale state overrides any `staleTime` configurations being used in `useQuery` or related hooks
- If the query is currently being rendered via `useQuery` or related hooks, it will also be refetched in the background

## Query Matching with `invalidateQueries`

When using APIs like `invalidateQueries` and `removeQueries` (and others that support partial query matching), you can match multiple queries by their prefix, or get really specific and match an exact query. For information on the types of filters you can use, please see [Query Filters](./filters.md#query-filters).

In this example, we can use the `todos` prefix to invalidate any queries that start with `todos` in their query key:

```tsx
import { useQuery, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

queryClient.invalidateQueries({ queryKey: ['todos'] })

const todoListQuery = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
})
const todoListQuery = useQuery({
  queryKey: ['todos', { page: 1 }],
  queryFn: fetchTodoList,
})
```

You can even invalidate queries with specific variables by passing a more specific query key to the `invalidateQueries` method:

```tsx
queryClient.invalidateQueries({
  queryKey: ['todos', { type: 'done' }],
})

const todoListQuery = useQuery({
  queryKey: ['todos', { type: 'done' }],
  queryFn: fetchTodoList,
})

const todoListQuery = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
})
```

The `invalidateQueries` API is very flexible, so even if you want to **only** invalidate `todos` queries that don't have any more variables or subkeys, you can pass an `exact: true` option to the `invalidateQueries` method:

```tsx
queryClient.invalidateQueries({
  queryKey: ['todos'],
  exact: true,
})

const todoListQuery = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodoList,
})

const todoListQuery = useQuery({
  queryKey: ['todos', { type: 'done' }],
  queryFn: fetchTodoList,
})
```

If you find yourself wanting **even more** granularity, you can pass a predicate function to the `invalidateQueries` method. This function will receive each `Query` instance from the query cache and allow you to return `true` or `false` for whether you want to invalidate that query:

```tsx
queryClient.invalidateQueries({
  predicate: (query) =>
    query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 10,
})

const todoListQuery = useQuery({
  queryKey: ['todos', { version: 20 }],
  queryFn: fetchTodoList,
})

const todoListQuery = useQuery({
  queryKey: ['todos', { version: 10 }],
  queryFn: fetchTodoList,
})

const todoListQuery = useQuery({
  queryKey: ['todos', { version: 5 }],
  queryFn: fetchTodoList,
})
```

---

All 19 pages fetched successfully, no errors. That is the complete, unmodified markdown content for each page.

</task>

---

All 19 pages fetched successfully. Here is the complete content:

```
## Invalidations from Mutations

Invalidating queries is only half the battle. Knowing **when** to invalidate them is the other half. Usually when a mutation in your app succeeds, it's VERY likely that there are related queries in your application that need to be invalidated and possibly refetched to account for the new changes from your mutation.

For example, assume we have a mutation to post a new todo:

[//]: # 'Example'

```tsx
const mutation = useMutation({ mutationFn: postTodo })
```

[//]: # 'Example'

When a successful `postTodo` mutation happens, we likely want all `todos` queries to get invalidated and possibly refetched to show the new todo item. To do this, you can use `useMutation`'s `onSuccess` options and the `client`'s `invalidateQueries` function:

[//]: # 'Example2'

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

// When this mutation succeeds, invalidate any queries with the `todos` or `reminders` query key
const mutation = useMutation({
  mutationFn: addTodo,
  onSuccess: async () => {
    // If you're invalidating a single query
    await queryClient.invalidateQueries({ queryKey: ['todos'] })

    // If you're invalidating multiple queries
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['todos'] }),
      queryClient.invalidateQueries({ queryKey: ['reminders'] }),
    ])
  },
})
```

[//]: # 'Example2'

Returning a Promise on `onSuccess` makes sure the data is updated before the mutation is entirely complete (i.e., isPending is true until onSuccess is fulfilled)

[//]: # 'Example2'

You can wire up your invalidations to happen using any of the callbacks available in the [`useMutation` hook](./mutations.md)

[//]: # 'Materials'

## Further reading

For a technique to automatically invalidate Queries after Mutations, have a look at [TkDodo's article on Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations).

[//]: # 'Materials'
```

```
## Updates from Mutation Responses

When dealing with mutations that **update** objects on the server, it's common for the new object to be automatically returned in the response of the mutation. Instead of refetching any queries for that item and wasting a network call for data we already have, we can take advantage of the object returned by the mutation function and update the existing query with the new data immediately using the [Query Client's `setQueryData`](../../../reference/QueryClient.md#queryclientsetquerydata) method:

[//]: # 'Example'

```tsx
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: editTodo,
  onSuccess: (data) => {
    queryClient.setQueryData(['todo', { id: 5 }], data)
  },
})

mutation.mutate({
  id: 5,
  name: 'Do the laundry',
})

// The query below will be updated with the response from the
// successful mutation
const { status, data, error } = useQuery({
  queryKey: ['todo', { id: 5 }],
  queryFn: fetchTodoById,
})
```

[//]: # 'Example'

You might want to tie the `onSuccess` logic into a reusable mutation, for that you can
create a custom hook like this:

[//]: # 'Example2'

```tsx
const useMutateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editTodo,
    // Notice the second argument is the variables object that the `mutate` function receives
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['todo', { id: variables.id }], data)
    },
  })
}
```

[//]: # 'Example2'

## Immutability

Updates via `setQueryData` must be performed in an _immutable_ way. **DO NOT** attempt to write directly to the cache by mutating data (that you retrieved from the cache) in place. It might work at first but can lead to subtle bugs along the way.

[//]: # 'Example3'

```tsx
queryClient.setQueryData(['posts', { id }], (oldData) => {
  if (oldData) {
    // ❌ do not try this
    oldData.title = 'my new post title'
  }
  return oldData
})

queryClient.setQueryData(
  ['posts', { id }],
  // ✅ this is the way
  (oldData) =>
    oldData
      ? {
          ...oldData,
          title: 'my new post title',
        }
      : oldData,
)
```

[//]: # 'Example3'
```

```
## Optimistic Updates

React Query provides two ways to optimistically update your UI before a mutation has completed. You can either use the `onMutate` option to update your cache directly, or leverage the returned `variables` to update your UI from the `useMutation` result.

## Via the UI

This is the simpler variant, as it doesn't interact with the cache directly.

[//]: # 'ExampleUI1'

```tsx
const addTodoMutation = useMutation({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  // make sure to _return_ the Promise from the query invalidation
  // so that the mutation stays in `pending` state until the refetch is finished
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

const { isPending, submittedAt, variables, mutate, isError } = addTodoMutation
```

[//]: # 'ExampleUI1'

you will then have access to `addTodoMutation.variables`, which contain the added todo. In your UI list, where the query is rendered, you can append another item to the list while the mutation `isPending`:

[//]: # 'ExampleUI2'

```tsx
<ul>
  {todoQuery.items.map((todo) => (
    <li key={todo.id}>{todo.text}</li>
  ))}
  {isPending && <li style={{ opacity: 0.5 }}>{variables}</li>}
</ul>
```

[//]: # 'ExampleUI2'

We're rendering a temporary item with a different `opacity` as long as the mutation is pending. Once it completes, the item will automatically no longer be rendered. Given that the refetch succeeded, we should see the item as a "normal item" in our list.

If the mutation errors, the item will also disappear. But we could continue to show it, if we want, by checking for the `isError` state of the mutation. `variables` are _not_ cleared when the mutation errors, so we can still access them, maybe even show a retry button:

[//]: # 'ExampleUI3'

```tsx
{
  isError && (
    <li style={{ color: 'red' }}>
      {variables}
      <button onClick={() => mutate(variables)}>Retry</button>
    </li>
  )
}
```

[//]: # 'ExampleUI3'

### If the mutation and the query don't live in the same component

This approach works very well if the mutation and the query live in the same component. However, you also get access to all mutations in other components via the dedicated `useMutationState` hook. It is best combined with a `mutationKey`:

[//]: # 'ExampleUI4'

```tsx
// somewhere in your app
const { mutate } = useMutation({
  mutationFn: (newTodo: string) => axios.post('/api/data', { text: newTodo }),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  mutationKey: ['addTodo'],
})

// access variables somewhere else
const variables = useMutationState<string>({
  filters: { mutationKey: ['addTodo'], status: 'pending' },
  select: (mutation) => mutation.state.variables,
})
```

[//]: # 'ExampleUI4'

`variables` will be an `Array`, because there might be multiple mutations running at the same time. If we need a unique key for the items, we can also select `mutation.state.submittedAt`. This will even make displaying concurrent optimistic updates a breeze.

## Via the cache

When you optimistically update your state before performing a mutation, there is a chance that the mutation will fail. In most of these failure cases, you can just trigger a refetch for your optimistic queries to revert them to their true server state. In some circumstances though, refetching may not work correctly and the mutation error could represent some type of server issue that won't make it possible to refetch. In this event, you can instead choose to roll back your update.

To do this, `useMutation`'s `onMutate` handler option allows you to return a value that will later be passed to both `onError` and `onSettled` handlers as the last argument. In most cases, it is most useful to pass a rollback function.

### Updating a list of todos when adding a new todo

[//]: # 'Example'

```tsx
const queryClient = useQueryClient()

useMutation({
  mutationFn: updateTodo,
  // When mutate is called:
  onMutate: async (newTodo, context) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await context.client.cancelQueries({ queryKey: ['todos'] })

    // Snapshot the previous value
    const previousTodos = context.client.getQueryData(['todos'])

    // Optimistically update to the new value
    context.client.setQueryData(['todos'], (old) => [...old, newTodo])

    // Return a result with the snapshotted value
    return { previousTodos }
  },
  // If the mutation fails,
  // use the result returned from onMutate to roll back
  onError: (err, newTodo, onMutateResult, context) => {
    context.client.setQueryData(['todos'], onMutateResult.previousTodos)
  },
  // Always refetch after error or success:
  onSettled: (data, error, variables, onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: ['todos'] }),
})
```

[//]: # 'Example'

### Updating a single todo

[//]: # 'Example2'

```tsx
useMutation({
  mutationFn: updateTodo,
  // When mutate is called:
  onMutate: async (newTodo, context) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await context.client.cancelQueries({ queryKey: ['todos', newTodo.id] })

    // Snapshot the previous value
    const previousTodo = context.client.getQueryData(['todos', newTodo.id])

    // Optimistically update to the new value
    context.client.setQueryData(['todos', newTodo.id], newTodo)

    // Return a result with the previous and new todo
    return { previousTodo, newTodo }
  },
  // If the mutation fails, use the result we returned above
  onError: (err, newTodo, onMutateResult, context) => {
    context.client.setQueryData(
      ['todos', onMutateResult.newTodo.id],
      onMutateResult.previousTodo,
    )
  },
  // Always refetch after error or success:
  onSettled: (newTodo, error, variables, onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: ['todos', newTodo.id] }),
})
```

[//]: # 'Example2'

You can also use the `onSettled` function in place of the separate `onError` and `onSuccess` handlers if you wish:

[//]: # 'Example3'

```tsx
useMutation({
  mutationFn: updateTodo,
  // ...
  onSettled: async (newTodo, error, variables, onMutateResult, context) => {
    if (error) {
      // do something
    }
  },
})
```

[//]: # 'Example3'

## When to use what

If you only have one place where the optimistic result should be shown, using `variables` and updating the UI directly is the approach that requires less code and is generally easier to reason about. For example, you don't need to handle rollbacks at all.

However, if you have multiple places on the screen that would require to know about the update, manipulating the cache directly will take care of this for you automatically.

[//]: # 'Materials'

## Further reading

Have a look at the guide by TkDodo on [Concurrent Optimistic Updates](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query).

[//]: # 'Materials'
```

```
## Query Cancellation

TanStack Query provides each query function with an [`AbortSignal` instance](https://developer.mozilla.org/docs/Web/API/AbortSignal). When a query becomes out-of-date or inactive, this `signal` will become aborted. This means that all queries are cancellable, and you can respond to the cancellation inside your query function if desired. The best part about this is that it allows you to continue to use normal async/await syntax while getting all the benefits of automatic cancellation.

The `AbortController` API is available in [most runtime environments](https://developer.mozilla.org/docs/Web/API/AbortController#browser_compatibility), but if your runtime environment does not support it, you will need to provide a polyfill. There are [several available](https://www.npmjs.com/search?q=abortcontroller%20polyfill).

## Default behavior

By default, queries that unmount or become unused before their promises are resolved are _not_ cancelled. This means that after the promise has resolved, the resulting data will be available in the cache. This is helpful if you've started receiving a query, but then unmount the component before it finishes. If you mount the component again and the query has not been garbage collected yet, data will be available.

However, if you consume the `AbortSignal`, the Promise will be cancelled (e.g. aborting the fetch) and therefore, also the Query must be cancelled. Cancelling the query will result in its state being _reverted_ to its previous state.

## Using `fetch`

[//]: # 'Example'

```tsx
const query = useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const todosResponse = await fetch('/todos', {
      // Pass the signal to one fetch
      signal,
    })
    const todos = await todosResponse.json()

    const todoDetails = todos.map(async ({ details }) => {
      const response = await fetch(details, {
        // Or pass it to several
        signal,
      })
      return response.json()
    })

    return Promise.all(todoDetails)
  },
})
```

[//]: # 'Example'

## Using `axios` [v0.22.0+](https://github.com/axios/axios/releases/tag/v0.22.0)

[//]: # 'Example2'

```tsx
import axios from 'axios'

const query = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) =>
    axios.get('/todos', {
      // Pass the signal to `axios`
      signal,
    }),
})
```

[//]: # 'Example2'

### Using `axios` with version lower than v0.22.0

[//]: # 'Example3'

```tsx
import axios from 'axios'

const query = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) => {
    // Create a new CancelToken source for this request
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    const promise = axios.get('/todos', {
      // Pass the source token to your request
      cancelToken: source.token,
    })

    // Cancel the request if TanStack Query signals to abort
    signal?.addEventListener('abort', () => {
      source.cancel('Query was cancelled by TanStack Query')
    })

    return promise
  },
})
```

[//]: # 'Example3'

## Using `XMLHttpRequest`

[//]: # 'Example4'

```tsx
const query = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) => {
    return new Promise((resolve, reject) => {
      var oReq = new XMLHttpRequest()
      oReq.addEventListener('load', () => {
        resolve(JSON.parse(oReq.responseText))
      })
      signal?.addEventListener('abort', () => {
        oReq.abort()
        reject()
      })
      oReq.open('GET', '/todos')
      oReq.send()
    })
  },
})
```

[//]: # 'Example4'

## Using `graphql-request`

An `AbortSignal` can be set in the client `request` method.

[//]: # 'Example5'

```tsx
const client = new GraphQLClient(endpoint)

const query = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) => {
    client.request({ document: query, signal })
  },
})
```

[//]: # 'Example5'

## Using `graphql-request` with version lower than v4.0.0

An `AbortSignal` can be set in the `GraphQLClient` constructor.

[//]: # 'Example6'

```tsx
const query = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) => {
    const client = new GraphQLClient(endpoint, {
      signal,
    })
    return client.request(query, variables)
  },
})
```

[//]: # 'Example6'

## Manual Cancellation

You might want to cancel a query manually. For example, if the request takes a long time to finish, you can allow the user to click a cancel button to stop the request. To do this, you just need to call `queryClient.cancelQueries({ queryKey })`, which will cancel the query and revert it back to its previous state. If you have consumed the `signal` passed to the query function, TanStack Query will additionally also cancel the Promise.

[//]: # 'Example7'

```tsx
const query = useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const resp = await fetch('/todos', { signal })
    return resp.json()
  },
})

const queryClient = useQueryClient()

return (
  <button
    onClick={(e) => {
      e.preventDefault()
      queryClient.cancelQueries({ queryKey: ['todos'] })
    }}
  >
    Cancel
  </button>
)
```

[//]: # 'Example7'

## `Cancel Options`

Cancel options are used to control the behavior of query cancellation operations.

```tsx
// Cancel specific queries silently
await queryClient.cancelQueries({ queryKey: ['posts'] }, { silent: true })
```

A cancel options object supports the following properties:

- `silent?: boolean`
  - When set to `true`, suppresses propagation of `CancelledError` to observers (e.g., `onError` callbacks) and related notifications, and returns the retry promise instead of rejecting.
  - Defaults to `false`
- `revert?: boolean`
  - When set to `true`, restores the query's state (data and status) from immediately before the in-flight fetch, sets `fetchStatus` back to `idle`, and only throws if there was no prior data.
  - Defaults to `true`

## Limitations

[//]: # 'Limitations'

Cancellation does not work when working with `Suspense` hooks: `useSuspenseQuery`, `useSuspenseQueries` and `useSuspenseInfiniteQuery`.

[//]: # 'Limitations'
```

```
## Scroll Restoration

Traditionally, when you navigate to a previously visited page on a web browser, you would find that the page would be scrolled to the exact position where you were before you navigated away from that page. This is called **scroll restoration** and has been in a bit of a regression since web applications have started moving towards client side data fetching. With TanStack Query however, that's no longer the case.

TanStack Query doesn't implement scroll restoration by itself, but it removes one of the biggest causes of broken restoration in SPA's: refetch-induced UI resets. By keeping previously fetched data in cache (and optionally using `placeholderData`), navigation back to a page can render instantly with stable layout, making scroll restoration reliable when handled by the router (e.g. React Router's ScrollRestoration, TanStack Router's scroll restoration, or a small custom history-based solution).

Out of the box, "scroll restoration" for all queries (including paginated and infinite queries) Just Works™️ in TanStack Query. The reason for this is that query results are cached and able to be retrieved synchronously when a query is rendered. As long as your queries are being cached long enough (the default time is 5 minutes) and have not been garbage collected, scroll restoration will work out of the box all the time.
```

```
## Filters

Some methods within TanStack Query accept a `QueryFilters` or `MutationFilters` object.

## `Query Filters`

A query filter is an object with certain conditions to match a query with:

```tsx
// Cancel all queries
await queryClient.cancelQueries()

// Remove all inactive queries that begin with `posts` in the key
queryClient.removeQueries({ queryKey: ['posts'], type: 'inactive' })

// Refetch all active queries
await queryClient.refetchQueries({ type: 'active' })

// Refetch all active queries that begin with `posts` in the key
await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
```

A query filter object supports the following properties:

- `queryKey?: QueryKey`
  - Set this property to define a query key to match on.
- `exact?: boolean`
  - If you don't want to search queries inclusively by query key, you can pass the `exact: true` option to return only the query with the exact query key you have passed.
- `type?: 'active' | 'inactive' | 'all'`
  - Defaults to `all`
  - When set to `active` it will match active queries.
  - When set to `inactive` it will match inactive queries.
- `stale?: boolean`
  - When set to `true` it will match stale queries.
  - When set to `false` it will match fresh queries.
- `fetchStatus?: FetchStatus`
  - When set to `fetching` it will match queries that are currently fetching.
  - When set to `paused` it will match queries that wanted to fetch, but have been `paused`.
  - When set to `idle` it will match queries that are not fetching.
- `predicate?: (query: Query) => boolean`
  - This predicate function will be used as a final filter on all matching queries. If no other filters are specified, this function will be evaluated against every query in the cache.

## `Mutation Filters`

A mutation filter is an object with certain conditions to match a mutation with:

```tsx
// Get the number of all fetching mutations
await queryClient.isMutating()

// Filter mutations by mutationKey
await queryClient.isMutating({ mutationKey: ['post'] })

// Filter mutations using a predicate function
await queryClient.isMutating({
  predicate: (mutation) => mutation.state.variables?.id === 1,
})
```

A mutation filter object supports the following properties:

- `mutationKey?: MutationKey`
  - Set this property to define a mutation key to match on.
- `exact?: boolean`
  - If you don't want to search mutations inclusively by mutation key, you can pass the `exact: true` option to return only the mutation with the exact mutation key you have passed.
- `status?: MutationStatus`
  - Allows for filtering mutations according to their status.
- `predicate?: (mutation: Mutation) => boolean`
  - This predicate function will be used as a final filter on all matching mutations. If no other filters are specified, this function will be evaluated against every mutation in the cache.

## Utils

### `matchQuery`

```tsx
const isMatching = matchQuery(filters, query)
```

Returns a boolean that indicates whether a query matches the provided set of query filters.

### `matchMutation`

```tsx
const isMatching = matchMutation(filters, mutation)
```

Returns a boolean that indicates whether a mutation matches the provided set of mutation filters.
```

```
## Performance & Request Waterfalls

Application performance is a broad and complex area and while React Query can't make your APIs faster, there are still things to be mindful about in how you use React Query to ensure the best performance.

The biggest performance footgun when using React Query, or indeed any data fetching library that lets you fetch data inside of components, is request waterfalls. The rest of this page will explain what they are, how you can spot them and how you can restructure your application or APIs to avoid them.

The [Prefetching & Router Integration guide](./prefetching.md) builds on this and teaches you how to prefetch data ahead of time when it's not possible or feasible to restructure your application or APIs.

The [Server Rendering & Hydration guide](./ssr.md) teaches you how to prefetch data on the server and pass that data down to the client so you don't have to fetch it again.

[//]: # 'AdvancedSSRLink'

The [Advanced Server Rendering guide](./advanced-ssr.md) further teaches you how to apply these patterns to Server Components and Streaming Server Rendering.

[//]: # 'AdvancedSSRLink'

## What is a Request Waterfall?

A request waterfall is what happens when a request for a resource (code, css, images, data) does not start until _after_ another request for a resource has finished.

Consider a web page. Before you can load things like the CSS, JS etc, the browser first needs to load the markup. This is a request waterfall.

```
1. |-> Markup
2.   |-> CSS
2.   |-> JS
2.   |-> Image
```

If you fetch your CSS inside a JS file, you now have a double waterfall:

```
1. |-> Markup
2.   |-> JS
3.     |-> CSS
```

If that CSS uses a background image, it's a triple waterfall:

```
1. |-> Markup
2.   |-> JS
3.     |-> CSS
4.       |-> Image
```

The best way to spot and analyze your request waterfalls is usually by opening your browsers devtools "Network" tab.

Each waterfall represents at least one roundtrip to the server, unless the resource is locally cached (in practice, some of these waterfalls might represent more than one roundtrip because the browser needs to establish a connection which requires some back and forth, but let's ignore that here). Because of this, the negative effects of request waterfalls are highly dependent on the users latency. Consider the example of the triple waterfall, which actually represents 4 server roundtrips. With 250ms latency, which is not uncommon on 3g networks or in bad network conditions, we end up with a total time of 4\*250=1000ms **only counting latency**. If we were able to flatten that to the first example with only 2 roundtrips, we get 500ms instead, possibly loading that background image in half the time!

## Request Waterfalls & React Query

Now let's consider React Query. We'll focus on the case without Server Rendering first. Before we can even start making a query, we need to load the JS, so before we can show that data on the screen, we have a double waterfall:

```
1. |-> Markup
2.   |-> JS
3.     |-> Query
```

With this as a basis, let's look at a few different patterns that can lead to Request Waterfalls in React Query, and how to avoid them.

- Single Component Waterfalls / Serial Queries
- Nested Component Waterfalls
- Code Splitting

### Single Component Waterfalls / Serial Queries

When a single component first fetches one query, and then another, that's a request waterfall. This can happen when the second query is a [Dependent Query](./dependent-queries.md), that is, it depends on data from the first query when fetching:

[//]: # 'DependentExample'

```tsx
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```

[//]: # 'DependentExample'

While not always feasible, for optimal performance it's better to restructure your API so you can fetch both of these in a single query. In the example above, instead of first fetching `getUserByEmail` to be able to `getProjectsByUser`, introducing a new `getProjectsByUserEmail` query would flatten the waterfall.

[//]: # 'ServerComponentsNote1'

> Another way to mitigate dependent queries without restructuring your API is to move the waterfall to the server where latency is lower. This is the idea behind Server Components which are covered in the [Advanced Server Rendering guide](./advanced-ssr.md).

[//]: # 'ServerComponentsNote1'
[//]: # 'SuspenseSerial'

Another example of serial queries is when you use React Query with Suspense:

```tsx
function App () {
  // The following queries will execute in serial, causing separate roundtrips to the server:
  const usersQuery = useSuspenseQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useSuspenseQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useSuspenseQuery({ queryKey: ['projects'], queryFn: fetchProjects })

  // Note that since the queries above suspend rendering, no data
  // gets rendered until all of the queries finished
  ...
}
```

Note that with regular `useQuery` these would happen in parallel.

Luckily, this is easy to fix, by always using the hook `useSuspenseQueries` when you have multiple suspenseful queries in a component.

```tsx
const [usersQuery, teamsQuery, projectsQuery] = useSuspenseQueries({
  queries: [
    { queryKey: ['users'], queryFn: fetchUsers },
    { queryKey: ['teams'], queryFn: fetchTeams },
    { queryKey: ['projects'], queryFn: fetchProjects },
  ],
})
```

[//]: # 'SuspenseSerial'

### Nested Component Waterfalls

[//]: # 'NestedIntro'

Nested Component Waterfalls is when both a parent and a child component contains queries, and the parent does not render the child until its query is done. This can happen both with `useQuery` and `useSuspenseQuery`.

[//]: # 'NestedIntro'

If the child renders conditionally based on the data in the parent, or if the child relies on some part of the result being passed down as a prop from the parent to make its query, we have a _dependent_ nested component waterfall.

Let's first look at an example where the child is **not** dependent on the parent.

[//]: # 'NestedExample'

```tsx
function Article({ id }) {
  const { data: articleData, isPending } = useQuery({
    queryKey: ['article', id],
    queryFn: getArticleById,
  })

  if (isPending) {
    return 'Loading article...'
  }

  return (
    <>
      <ArticleHeader articleData={articleData} />
      <ArticleBody articleData={articleData} />
      <Comments id={id} />
    </>
  )

}

function Comments({ id }) {
  const { data, isPending } = useQuery({
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
  })

  ...
}
```

[//]: # 'NestedExample'

Note that while `<Comments>` takes a prop `id` from the parent, that id is already available when the `<Article>` renders so there is no reason we could not fetch the comments at the same time as the article. In real world applications, the child might be nested far below the parent and these kinds of waterfalls are often trickier to spot and fix, but for our example, one way to flatten the waterfall would be to hoist the comments query to the parent instead:

[//]: # 'NestedHoistedExample'

```tsx
function Article({ id }) {
  const { data: articleData, isPending: articlePending } = useQuery({
    queryKey: ['article', id],
    queryFn: getArticleById,
  })

  const { data: commentsData, isPending: commentsPending } = useQuery({
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
  })

  if (articlePending) {
    return 'Loading article...'
  }

  return (
    <>
      <ArticleHeader articleData={articleData} />
      <ArticleBody articleData={articleData} />
      {commentsPending ? (
        'Loading comments...'
      ) : (
        <Comments commentsData={commentsData} />
      )}
    </>
  )
}
```

[//]: # 'NestedHoistedExample'
[//]: # 'NestedHoistedOutro'

The two queries will now fetch in parallel. Note that if you are using suspense, you'd want to combine these two queries into a single `useSuspenseQueries` instead.

[//]: # 'NestedHoistedOutro'

Another way to flatten this waterfall would be to prefetch the comments in the `<Article>` component, or prefetch both of these queries at the router level on page load or page navigation, read more about this in the [Prefetching & Router Integration guide](./prefetching.md).

Next, let's look at a _Dependent Nested Component Waterfall_.

[//]: # 'DependentNestedExample'

```tsx
function Feed() {
  const { data, isPending } = useQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
  })

  if (isPending) {
    return 'Loading feed...'
  }

  return (
    <>
      {data.map((feedItem) => {
        if (feedItem.type === 'GRAPH') {
          return <GraphFeedItem key={feedItem.id} feedItem={feedItem} />
        }

        return <StandardFeedItem key={feedItem.id} feedItem={feedItem} />
      })}
    </>
  )
}

function GraphFeedItem({ feedItem }) {
  const { data, isPending } = useQuery({
    queryKey: ['graph', feedItem.id],
    queryFn: getGraphDataById,
  })

  ...
}
```

[//]: # 'DependentNestedExample'

The second query `getGraphDataById` is dependent on its parent in two different ways. First of all, it doesn't ever happen unless the `feedItem` is a graph, and second, it needs an `id` from the parent.

```
1. |> getFeed()
2.   |> getGraphDataById()
```

[//]: # 'ServerComponentsNote2'

In this example, we can't trivially flatten the waterfall by just hoisting the query to the parent, or even adding prefetching. Just like the dependent query example at the beginning of this guide, one option is to refactor our API to include the graph data in the `getFeed` query. Another more advanced solution is to leverage Server Components to move the waterfall to the server where latency is lower (read more about this in the [Advanced Server Rendering guide](./advanced-ssr.md)) but note that this can be a very big architectural change.

[//]: # 'ServerComponentsNote2'

You can have good performance even with a few query waterfalls here and there, just know they are a common performance concern and be mindful about them. An especially insidious version is when Code Splitting is involved, let's take a look at this next.

### Code Splitting

Splitting an applications JS-code into smaller chunks and only loading the necessary parts is usually a critical step in achieving good performance. It does have a downside however, in that it often introduces request waterfalls. When that code split code also has a query inside it, this problem is worsened further.

Consider this a slightly modified version of the Feed example.

[//]: # 'LazyExample'

```tsx
// This lazy loads the GraphFeedItem component, meaning
// it wont start loading until something renders it
const GraphFeedItem = React.lazy(() => import('./GraphFeedItem'))

function Feed() {
  const { data, isPending } = useQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
  })

  if (isPending) {
    return 'Loading feed...'
  }

  return (
    <>
      {data.map((feedItem) => {
        if (feedItem.type === 'GRAPH') {
          return <GraphFeedItem key={feedItem.id} feedItem={feedItem} />
        }

        return <StandardFeedItem key={feedItem.id} feedItem={feedItem} />
      })}
    </>
  )
}

// GraphFeedItem.tsx
function GraphFeedItem({ feedItem }) {
  const { data, isPending } = useQuery({
    queryKey: ['graph', feedItem.id],
    queryFn: getGraphDataById,
  })

  ...
}
```

[//]: # 'LazyExample'

This example has a double waterfall, looking like this:

```
1. |> getFeed()
2.   |> JS for <GraphFeedItem>
3.     |> getGraphDataById()
```

But that's just looking at the code from the example, if we consider what the first page load of this page looks like, we actually have to complete 5 round trips to the server before we can render the graph!

```
1. |> Markup
2.   |> JS for <Feed>
3.     |> getFeed()
4.       |> JS for <GraphFeedItem>
5.         |> getGraphDataById()
```

Note that this looks a bit different when server rendering, we will explore that further in the [Server Rendering & Hydration guide](./ssr.md). Also note that it's not uncommon for the route that contains `<Feed>` to also be code split, which could add yet another hop.

In the code split case, it might actually help to hoist the `getGraphDataById` query to the `<Feed>` component and make it conditional, or add a conditional prefetch. That query could then be fetched in parallel with the code, turning the example part into this:

```
1. |> getFeed()
2.   |> getGraphDataById()
2.   |> JS for <GraphFeedItem>
```

This is very much a tradeoff however. You are now including the data fetching code for `getGraphDataById` in the same bundle as `<Feed>`, so evaluate what is best for your case. Read more about how to do this in the [Prefetching & Router Integration guide](./prefetching.md).

[//]: # 'ServerComponentsNote3'

> The tradeoff between:
>
> - Include all data fetching code in the main bundle, even if we seldom use it
> - Put the data fetching code in the code split bundle, but with a request waterfall
>
> is not great and has been one of the motivations for Server Components. With Server Components, it's possible to avoid both, read more about how this applies to React Query in the [Advanced Server Rendering guide](./advanced-ssr.md).

[//]: # 'ServerComponentsNote3'

## Summary and takeaways

Request Waterfalls are a very common and complex performance concern with many tradeoffs. There are many ways to accidentally introduce them into your application:

- Adding a query to a child, not realizing a parent already has a query
- Adding a query to a parent, not realizing a child already has a query
- Moving a component with descendants that has a query to a new parent with an ancestor that has a query
- Etc..

Because of this accidental complexity, it pays off to be mindful of waterfalls and regularly examine your application looking for them (a good way is to examine the Network tab every now and then!). You don't necessarily have to flatten them all to have good performance, but keep an eye out for the high impact ones.

In the next guide, we'll look at more ways to flatten waterfalls, by leveraging [Prefetching & Router Integration](./prefetching.md).
```

```
## Prefetching & Router Integration

When you know or suspect that a certain piece of data will be needed, you can use prefetching to populate the cache with that data ahead of time, leading to a faster experience.

There are a few different prefetching patterns:

1. In event handlers
2. In components
3. Via router integration
4. During Server Rendering (another form of router integration)

In this guide, we'll take a look at the first three, while the fourth will be covered in depth in the [Server Rendering & Hydration guide](./ssr.md) and the [Advanced Server Rendering guide](./advanced-ssr.md).

One specific use of prefetching is to avoid Request Waterfalls, for an in-depth background and explanation of those, see the [Performance & Request Waterfalls guide](./request-waterfalls.md).

## prefetchQuery & prefetchInfiniteQuery

Before jumping into the different specific prefetch patterns, let's look at the `prefetchQuery` and `prefetchInfiniteQuery` functions. First a few basics:

- Out of the box, these functions use the default `staleTime` configured for the `queryClient` to determine whether existing data in the cache is fresh or needs to be fetched again
- You can also pass a specific `staleTime` like this: `prefetchQuery({ queryKey: ['todos'], queryFn: fn, staleTime: 5000 })`
  - This `staleTime` is only used for the prefetch, you still need to set it for any `useQuery` call as well
  - If you want to ignore `staleTime` and instead always return data if it's available in the cache, you can use the `ensureQueryData` function.
  - Tip: If you are prefetching on the server, set a default `staleTime` higher than `0` for that `queryClient` to avoid having to pass in a specific `staleTime` to each prefetch call
- If no instances of `useQuery` appear for a prefetched query, it will be deleted and garbage collected after the time specified in `gcTime`
- These functions return `Promise<void>` and thus never return query data. If that's something you need, use `fetchQuery`/`fetchInfiniteQuery` instead.
- The prefetch functions never throw errors because they usually try to fetch again in a `useQuery` which is a nice graceful fallback. If you need to catch errors, use `fetchQuery`/`fetchInfiniteQuery` instead.

This is how you use `prefetchQuery`:

[//]: # 'ExamplePrefetchQuery'

```tsx
const prefetchTodos = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}
```

[//]: # 'ExamplePrefetchQuery'

Infinite Queries can be prefetched like regular Queries. Per default, only the first page of the Query will be prefetched and will be stored under the given QueryKey. If you want to prefetch more than one page, you can use the `pages` option, in which case you also have to provide a `getNextPageParam` function:

[//]: # 'ExamplePrefetchInfiniteQuery'

```tsx
const prefetchProjects = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    pages: 3, // prefetch the first 3 pages
  })
}
```

[//]: # 'ExamplePrefetchInfiniteQuery'

Next, let's look at how you can use these and other ways to prefetch in different situations.

## Prefetch in event handlers

A straightforward form of prefetching is doing it when the user interacts with something. In this example we'll use `queryClient.prefetchQuery` to start a prefetch on `onMouseEnter` or `onFocus`.

[//]: # 'ExampleEventHandler'

```tsx
function ShowDetailsButton() {
  const queryClient = useQueryClient()

  const prefetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['details'],
      queryFn: getDetailsData,
      // Prefetch only fires when data is older than the staleTime,
      // so in a case like this you definitely want to set one
      staleTime: 60000,
    })
  }

  return (
    <button onMouseEnter={prefetch} onFocus={prefetch} onClick={...}>
      Show Details
    </button>
  )
}
```

[//]: # 'ExampleEventHandler'

## Prefetch in components

Prefetching during the component lifecycle is useful when we know some child or descendant will need a particular piece of data, but we can't render that until some other query has finished loading. Let's borrow an example from the Request Waterfall guide to explain:

[//]: # 'ExampleComponent'

```tsx
function Article({ id }) {
  const { data: articleData, isPending } = useQuery({
    queryKey: ['article', id],
    queryFn: getArticleById,
  })

  if (isPending) {
    return 'Loading article...'
  }

  return (
    <>
      <ArticleHeader articleData={articleData} />
      <ArticleBody articleData={articleData} />
      <Comments id={id} />
    </>
  )
}

function Comments({ id }) {
  const { data, isPending } = useQuery({
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
  })

  ...
}
```

[//]: # 'ExampleComponent'

This results in a request waterfall looking like this:

```
1. |> getArticleById()
2.   |> getArticleCommentsById()
```

As mentioned in that guide, one way to flatten this waterfall and improve performance is to hoist the `getArticleCommentsById` query to the parent and pass down the result as a prop, but what if this is not feasible or desirable, for example when the components are unrelated and have multiple levels between them?

In that case, we can instead prefetch the query in the parent. The simplest way to do this is to use a query but ignore the result:

[//]: # 'ExampleParentComponent'

```tsx
function Article({ id }) {
  const { data: articleData, isPending } = useQuery({
    queryKey: ['article', id],
    queryFn: getArticleById,
  })

  // Prefetch
  useQuery({
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
    // Optional optimization to avoid rerenders when this query changes:
    notifyOnChangeProps: [],
  })

  if (isPending) {
    return 'Loading article...'
  }

  return (
    <>
      <ArticleHeader articleData={articleData} />
      <ArticleBody articleData={articleData} />
      <Comments id={id} />
    </>
  )
}

function Comments({ id }) {
  const { data, isPending } = useQuery({
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
  })

  ...
}
```

[//]: # 'ExampleParentComponent'

This starts fetching `'article-comments'` immediately and flattens the waterfall:

```
1. |> getArticleById()
1. |> getArticleCommentsById()
```

[//]: # 'Suspense'

If you want to prefetch together with Suspense, you will have to do things a bit differently. You can't use `useSuspenseQueries` to prefetch, since the prefetch would block the component from rendering. You also can not use `useQuery` for the prefetch, because that wouldn't start the prefetch until after suspenseful query had resolved. For this scenario, you can use the [`usePrefetchQuery`](../reference/usePrefetchQuery.md) or the [`usePrefetchInfiniteQuery`](../reference/usePrefetchInfiniteQuery.md) hooks available in the library.

You can now use `useSuspenseQuery` in the component that actually needs the data. You _might_ want to wrap this later component in its own `<Suspense>` boundary so the "secondary" query we are prefetching does not block rendering of the "primary" data.

```tsx
function ArticleLayout({ id }) {
  usePrefetchQuery({
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
  })

  return (
    <Suspense fallback="Loading article">
      <Article id={id} />
    </Suspense>
  )
}

function Article({ id }) {
  const { data: articleData, isPending } = useSuspenseQuery({
    queryKey: ['article', id],
    queryFn: getArticleById,
  })

  ...
}
```

Another way is to prefetch inside of the query function. This makes sense if you know that every time an article is fetched it's very likely comments will also be needed. For this, we'll use `queryClient.prefetchQuery`:

```tsx
const queryClient = useQueryClient()
const { data: articleData, isPending } = useQuery({
  queryKey: ['article', id],
  queryFn: (...args) => {
    queryClient.prefetchQuery({
      queryKey: ['article-comments', id],
      queryFn: getArticleCommentsById,
    })

    return getArticleById(...args)
  },
})
```

Prefetching in an effect also works, but note that if you are using `useSuspenseQuery` in the same component, this effect wont run until _after_ the query finishes which might not be what you want.

```tsx
const queryClient = useQueryClient()

useEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['article-comments', id],
    queryFn: getArticleCommentsById,
  })
}, [queryClient, id])
```

To recap, if you want to prefetch a query during the component lifecycle, there are a few different ways to do it, pick the one that suits your situation best:

- Prefetch before a suspense boundary using `usePrefetchQuery` or `usePrefetchInfiniteQuery` hooks
- Use `useQuery` or `useSuspenseQueries` and ignore the result
- Prefetch inside the query function
- Prefetch in an effect

Let's look at a slightly more advanced case next.

[//]: # 'Suspense'

### Dependent Queries & Code Splitting

Sometimes we want to prefetch conditionally, based on the result of another fetch. Consider this example borrowed from the [Performance & Request Waterfalls guide](./request-waterfalls.md):

[//]: # 'ExampleConditionally1'

```tsx
// This lazy loads the GraphFeedItem component, meaning
// it wont start loading until something renders it
const GraphFeedItem = React.lazy(() => import('./GraphFeedItem'))

function Feed() {
  const { data, isPending } = useQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
  })

  if (isPending) {
    return 'Loading feed...'
  }

  return (
    <>
      {data.map((feedItem) => {
        if (feedItem.type === 'GRAPH') {
          return <GraphFeedItem key={feedItem.id} feedItem={feedItem} />
        }

        return <StandardFeedItem key={feedItem.id} feedItem={feedItem} />
      })}
    </>
  )
}

// GraphFeedItem.tsx
function GraphFeedItem({ feedItem }) {
  const { data, isPending } = useQuery({
    queryKey: ['graph', feedItem.id],
    queryFn: getGraphDataById,
  })

  ...
}
```

[//]: # 'ExampleConditionally1'

As noted over in that guide, this example leads to the following double request waterfall:

```
1. |> getFeed()
2.   |> JS for <GraphFeedItem>
3.     |> getGraphDataById()
```

If we can not restructure our API so `getFeed()` also returns the `getGraphDataById()` data when necessary, there is no way to get rid of the `getFeed->getGraphDataById` waterfall, but by leveraging conditional prefetching, we can at least load the code and data in parallel. Just like described above, there are multiple ways to do this, but for this example, we'll do it in the query function:

[//]: # 'ExampleConditionally2'

```tsx
function Feed() {
  const queryClient = useQueryClient()
  const { data, isPending } = useQuery({
    queryKey: ['feed'],
    queryFn: async (...args) => {
      const feed = await getFeed(...args)

      for (const feedItem of feed) {
        if (feedItem.type === 'GRAPH') {
          queryClient.prefetchQuery({
            queryKey: ['graph', feedItem.id],
            queryFn: getGraphDataById,
          })
        }
      }

      return feed
    }
  })

  ...
}
```

[//]: # 'ExampleConditionally2'

This would load the code and data in parallel:

```
1. |> getFeed()
2.   |> JS for <GraphFeedItem>
2.   |> getGraphDataById()
```

There is a tradeoff however, in that the code for `getGraphDataById` is now included in the parent bundle instead of in `JS for <GraphFeedItem>` so you'll need to determine what's the best performance tradeoff on a case by case basis. If `GraphFeedItem` are likely, it's probably worth to include the code in the parent. If they are exceedingly rare, it's probably not.

[//]: # 'Router'

## Router Integration

Because data fetching in the component tree itself can easily lead to request waterfalls and the different fixes for that can be cumbersome as they accumulate throughout the application, an attractive way to do prefetching is integrating it at the router level.

In this approach, you explicitly declare for each _route_ what data is going to be needed for that component tree, ahead of time. Because Server Rendering has traditionally needed all data to be loaded before rendering starts, this has been the dominating approach for SSR'd apps for a long time. This is still a common approach and you can read more about it in the [Server Rendering & Hydration guide](./ssr.md).

For now, let's focus on the client side case and look at an example of how you can make this work with [TanStack Router](https://tanstack.com/router). These examples leave out a lot of setup and boilerplate to stay concise, you can check out a [full React Query example](https://tanstack.com/router/latest/docs/framework/react/examples/basic-react-query-file-based) over in the [TanStack Router docs](https://tanstack.com/router/latest/docs).

When integrating at the router level, you can choose to either _block_ rendering of that route until all data is present, or you can start a prefetch but not await the result. That way, you can start rendering the route as soon as possible. You can also mix these two approaches and await some critical data, but start rendering before all the secondary data has finished loading. In this example, we'll configure an `/article` route to not render until the article data has finished loading, as well as start prefetching comments as soon as possible, but not block rendering the route if comments haven't finished loading yet.

```tsx
const queryClient = new QueryClient()
const routerContext = new RouterContext()
const rootRoute = routerContext.createRootRoute({
  component: () => { ... }
})

const articleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'article',
  beforeLoad: () => {
    return {
      articleQueryOptions: { queryKey: ['article'], queryFn: fetchArticle },
      commentsQueryOptions: { queryKey: ['comments'], queryFn: fetchComments },
    }
  },
  loader: async ({
    context: { queryClient },
    routeContext: { articleQueryOptions, commentsQueryOptions },
  }) => {
    // Fetch comments asap, but don't block
    queryClient.prefetchQuery(commentsQueryOptions)

    // Don't render the route at all until article has been fetched
    await queryClient.prefetchQuery(articleQueryOptions)
  },
  component: ({ useRouteContext }) => {
    const { articleQueryOptions, commentsQueryOptions } = useRouteContext()
    const articleQuery = useQuery(articleQueryOptions)
    const commentsQuery = useQuery(commentsQueryOptions)

    return (
      ...
    )
  },
  errorComponent: () => 'Oh crap!',
})
```

Integration with other routers is also possible, see the [react-router](../examples/react-router) for another demonstration.

[//]: # 'Router'

## Manually Priming a Query

If you already have the data for your query synchronously available, you don't need to prefetch it. You can just use the [Query Client's `setQueryData` method](../../../reference/QueryClient.md#queryclientsetquerydata) to directly add or update a query's cached result by key.

[//]: # 'ExampleManualPriming'

```tsx
queryClient.setQueryData(['todos'], todos)
```

[//]: # 'ExampleManualPriming'
[//]: # 'Materials'

## Further reading

For a deep-dive on how to get data into your Query Cache before you fetch, see the [article Seeding the Query Cache by TkDodo](https://tkdodo.eu/blog/seeding-the-query-cache).

Integrating with Server Side routers and frameworks is very similar to what we just saw, with the addition that the data has to be passed from the server to the client to be hydrated into the cache there. To learn how, continue on to the [Server Rendering & Hydration guide](./ssr.md).

[//]: # 'Materials'
```

```
## Server Rendering & Hydration

In this guide you'll learn how to use React Query with server rendering.

See the guide on [Prefetching & Router Integration](./prefetching.md) for some background. You might also want to check out the [Performance & Request Waterfalls guide](./request-waterfalls.md) before that.

For deeper examples on hydration + prefetching (including code splitting), see the [Dependent Queries & Code Splitting](./prefetching.md#dependent-queries-code-splitting) section.

For advanced server rendering patterns, such as streaming, Server Components and the new Next.js app router, see the [Advanced Server Rendering guide](./advanced-ssr.md).

If you just want to see some code, you can skip ahead to the [Full Next.js pages router example](#full-nextjs-pages-router-example) or the [Full Remix example](#full-remix-example) below.

## Server Rendering & React Query

So what is server rendering anyway? The rest of this guide will assume you are familiar with the concept, but let's spend some time to look at how it relates to React Query. Server rendering is the act of generating the initial html on the server, so that the user has some content to look at as soon as the page loads. This can happen on demand when a page is requested (SSR). It can also happen ahead of time either because a previous request was cached, or at build time (SSG).

If you've read the [Performance & Request Waterfalls guide](./request-waterfalls.md), you might remember this:

```
1. |-> Markup (without content)
2.   |-> JS
3.     |-> Query
```

With a client rendered application, these are the minimum 3 server roundtrips you will need to make before getting any content on the screen for the user. One way of viewing server rendering is that it turns the above into this:

```
1. |-> Markup (with content AND initial data)
2.   |-> JS
```

As soon as **1.** is complete, the user can see the content and when **2.** finishes, the page is interactive and clickable. Because the markup also contains the initial data we need, step **3.** does not need to run on the client at all, at least until you want to revalidate the data for some reason.

This is all from the clients perspective. On the server, we need to **prefetch** that data before we generate/render the markup, we need to **dehydrate** that data into a serializable format we can embed in the markup, and on the client we need to **hydrate** that data into a React Query cache so we can avoid doing a new fetch on the client.

Read on to learn how to implement these three steps with React Query.

## A quick note on Suspense

This guide uses the regular `useQuery` API. While we don't necessarily recommend it, it is possible to replace this with `useSuspenseQuery` instead **as long as you always prefetch all your queries**. The upside is that you get to use `<Suspense>` for loading states on the client.

If you do forget to prefetch a query when you are using `useSuspenseQuery`, the consequences will depend on the framework you are using. In some cases, the data will Suspend and get fetched on the server but never be hydrated to the client, where it will fetch again. In these cases you will get a markup hydration mismatch, because the server and the client tried to render different things.

## Initial setup

The first steps of using React Query is always to create a `queryClient` and wrap the application in a `<QueryClientProvider>`. When doing server rendering, it's important to create the `queryClient` instance **inside of your app**, in React state (an instance ref works fine too). **This ensures that data is not shared between different users and requests**, while still only creating the `queryClient` once per component lifecycle.

Next.js pages router:

```tsx
// _app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// NEVER DO THIS:
// const queryClient = new QueryClient()
//
// Creating the queryClient at the file root level makes the cache shared
// between all requests and means _all_ data gets passed to _all_ users.
// Besides being bad for performance, this also leaks any sensitive data.

export default function MyApp({ Component, pageProps }) {
  // Instead do this, which ensures each request has its own cache:
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
```

Remix:

```tsx
// app/root.tsx
import { Outlet } from '@remix-run/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function MyApp() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}
```

## Get started fast with `initialData`

The quickest way to get started is to not involve React Query at all when it comes to prefetching and not use the `dehydrate`/`hydrate` APIs. What you do instead is passing the raw data in as the `initialData` option to `useQuery`. Let's look at an example using Next.js pages router, using `getServerSideProps`.

```tsx
export async function getServerSideProps() {
  const posts = await getPosts()
  return { props: { posts } }
}

function Posts(props) {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: props.posts,
  })

  // ...
}
```

This also works with `getStaticProps` or even the older `getInitialProps` and the same pattern can be applied in any other framework that has equivalent functions. This is what the same example looks like with Remix:

```tsx
export async function loader() {
  const posts = await getPosts()
  return json({ posts })
}

function Posts() {
  const { posts } = useLoaderData<typeof loader>()

  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: posts,
  })

  // ...
}
```

The setup is minimal and this can be a quick solution for some cases, but there are a **few tradeoffs to consider** when compared to the full approach:

- If you are calling `useQuery` in a component deeper down in the tree you need to pass the `initialData` down to that point
- If you are calling `useQuery` with the same query in multiple locations, passing `initialData` to only one of them can be brittle and break when your app changes since. If you remove or move the component that has the `useQuery` with `initialData`, the more deeply nested `useQuery` might no longer have any data. Passing `initialData` to **all** queries that needs it can also be cumbersome.
- There is no way to know at what time the query was fetched on the server, so `dataUpdatedAt` and determining if the query needs refetching is based on when the page loaded instead
- If there is already data in the cache for a query, `initialData` will never overwrite this data, **even if the new data is fresher than the old one**.
  - To understand why this is especially bad, consider the `getServerSideProps` example above. If you navigate back and forth to a page several times, `getServerSideProps` would get called each time and fetch new data, but because we are using the `initialData` option, the client cache and data would never be updated.

Setting up the full hydration solution is straightforward and does not have these drawbacks, this will be the focus for the rest of the documentation.

## Using the Hydration APIs

With just a little more setup, you can use a `queryClient` to prefetch queries during a preload phase, pass a serialized version of that `queryClient` to the rendering part of the app and reuse it there. This avoids the drawbacks above. Feel free to skip ahead for full Next.js pages router and Remix examples, but at a general level these are the extra steps:

- In the framework loader function, create a `const queryClient = new QueryClient(options)`
- In the loader function, do `await queryClient.prefetchQuery(...)` for each query you want to prefetch
  - You want to use `await Promise.all(...)` to fetch the queries in parallel when possible
  - It's fine to have queries that aren't prefetched. These wont be server rendered, instead they will be fetched on the client after the application is interactive. This can be great for content that are shown only after user interaction, or is far down on the page to avoid blocking more critical content.
- From the loader, return `dehydrate(queryClient)`, note that the exact syntax to return this differs between frameworks
- Wrap your tree with `<HydrationBoundary state={dehydratedState}>` where `dehydratedState` comes from the framework loader. How you get `dehydratedState` also differs between frameworks.
  - This can be done for each route, or at the top of the application to avoid boilerplate, see examples

> An interesting detail is that there are actually _three_ `queryClient`s involved. The framework loaders are a form of "preloading" phase that happens before rendering, and this phase has its own `queryClient` that does the prefetching. The dehydrated result of this phase gets passed to **both** the server rendering process **and** the client rendering process which each has its own `queryClient`. This ensures they both start with the same data so they can return the same markup.

> Server Components are another form of "preloading" phase, that can also "preload" (pre-render) parts of a React component tree. Read more in the [Advanced Server Rendering guide](./advanced-ssr.md).

### Full Next.js pages router example

> For app router documentation, see the [Advanced Server Rendering guide](./advanced-ssr.md).

Initial setup:

```tsx
// _app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
```

In each route:

```tsx
// pages/posts.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'

// This could also be getServerSideProps
export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the <PostsRoute>, data will be available immediately either way
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  const { data: commentsData } = useQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
  })

  // ...
}

export default function PostsRoute({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  )
}
```

### Full Remix example

Initial setup:

```tsx
// app/root.tsx
import { Outlet } from '@remix-run/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function MyApp() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}
```

In each route, note that it's fine to do this in nested routes too:

```tsx
// app/routes/posts.tsx
import { json } from '@remix-run/node'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'

export async function loader() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return json({ dehydratedState: dehydrate(queryClient) })
}

function Posts() {
  // This useQuery could just as well happen in some deeper
  // child to <PostsRoute>, data will be available immediately either way
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  const { data: commentsData } = useQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
  })

  // ...
}

export default function PostsRoute() {
  const { dehydratedState } = useLoaderData<typeof loader>()
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  )
}
```

## Optional - Remove boilerplate

Having this part in every route might seem like a lot of boilerplate:

```tsx
export default function PostsRoute({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  )
}
```

While there is nothing wrong with this approach, if you want to get rid of this boilerplate, here's how you can modify your setup in Next.js:

```tsx
// _app.tsx
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

// pages/posts.tsx
// Remove PostsRoute with the HydrationBoundary and instead export Posts directly:
export default function Posts() { ... }
```

With Remix, this is a little bit more involved, we recommend checking out the [use-dehydrated-state](https://github.com/maplegrove-io/use-dehydrated-state) package.

## Prefetching dependent queries

Over in the Prefetching guide we learned how to [prefetch dependent queries](./prefetching.md#dependent-queries-code-splitting), but how do we do this in framework loaders? Consider the following code, taken from the [Dependent Queries guide](./dependent-queries.md):

```tsx
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
```

How would we prefetch this so it can be server rendered? Here's an example:

```tsx
// For Remix, rename this to loader instead
export async function getServerSideProps() {
  const queryClient = new QueryClient()

  const user = await queryClient.fetchQuery({
    queryKey: ['user', email],
    queryFn: getUserByEmail,
  })

  if (user?.userId) {
    await queryClient.prefetchQuery({
      queryKey: ['projects', userId],
      queryFn: getProjectsByUser,
    })
  }

  // For Remix:
  // return json({ dehydratedState: dehydrate(queryClient) })
  return { props: { dehydratedState: dehydrate(queryClient) } }
}
```

This can get more complex of course, but since these loader functions are just JavaScript, you can use the full power of the language to build your logic. Make sure you prefetch all queries that you want to be server rendered.

## Error handling

React Query defaults to a graceful degradation strategy. This means:

- `queryClient.prefetchQuery(...)` never throws errors
- `dehydrate(...)` only includes successful queries, not failed ones

This will lead to any failed queries being retried on the client and that the server rendered output will include loading states instead of the full content.

While a good default, sometimes this is not what you want. When critical content is missing, you might want to respond with a 404 or 500 status code depending on the situation. For these cases, use `queryClient.fetchQuery(...)` instead, which will throw errors when it fails, letting you handle things in a suitable way.

```tsx
let result

try {
  result = await queryClient.fetchQuery(...)
} catch (error) {
  // Handle the error, refer to your framework documentation
}

// You might also want to check and handle any invalid `result` here
```

If you for some reason want to include failed queries in the dehydrated state to avoid retries, you can use the option `shouldDehydrateQuery` to override the default function and implement your own logic:

```tsx
dehydrate(queryClient, {
  shouldDehydrateQuery: (query) => {
    // This will include all queries, including failed ones,
    // but you can also implement your own logic by inspecting `query`
    return true
  },
})
```

## Serialization

When doing `return { props: { dehydratedState: dehydrate(queryClient) } }` in Next.js, or `return json({ dehydratedState: dehydrate(queryClient) })` in Remix, what happens is that the `dehydratedState` representation of the `queryClient` is serialized by the framework so it can be embedded into the markup and transported to the client.

By default, these frameworks only support returning things that are safely serializable/parsable, and therefore do not support `undefined`, `Error`, `Date`, `Map`, `Set`, `BigInt`, `Infinity`, `NaN`, `-0`, regular expressions etc. This also means that you can not return any of these things from your queries. If returning these values is something you want, check out [superjson](https://github.com/blitz-js/superjson) or similar packages.

If you are using a custom SSR setup, you need to take care of this step yourself. Your first instinct might be to use `JSON.stringify(dehydratedState)`, but because this doesn't escape things like `<script>alert('Oh no..')</script>` by default, this can easily lead to **XSS-vulnerabilities** in your application. [superjson](https://github.com/blitz-js/superjson) also **does not** escape values and is unsafe to use by itself in a custom SSR setup (unless you add an extra step for escaping the output). Instead we recommend using a library like [Serialize JavaScript](https://github.com/yahoo/serialize-javascript) or [devalue](https://github.com/Rich-Harris/devalue) which are both safe against XSS injections out of the box.

## A note about request waterfalls

In the [Performance & Request Waterfalls guide](./request-waterfalls.md) we mentioned we would revisit how server rendering changes one of the more complex nested waterfalls. Check back for the [specific code example](./request-waterfalls#code-splitting), but as a refresher, we have a code split `<GraphFeedItem>` component inside a `<Feed>` component. This only renders if the feed contains a graph item and both of these components fetches their own data. With client rendering, this leads to the following request waterfall:

```
1. |> Markup (without content)
2.   |> JS for <Feed>
3.     |> getFeed()
4.       |> JS for <GraphFeedItem>
5.         |> getGraphDataById()
```

The nice thing about server rendering is that we can turn the above into:

```
1. |> Markup (with content AND initial data)
2.   |> JS for <Feed>
2.   |> JS for <GraphFeedItem>
```

Note that the queries are no longer fetched on the client, instead their data was included in the markup. The reason we can now load the JS in parallel is that since `<GraphFeedItem>` was rendered on the server we know that we are going to need this JS on the client as well and can insert a script-tag for this chunk in the markup. On the server, we would still have this request waterfall:

```
1. |> getFeed()
2.   |> getGraphDataById()
```

We simply can not know before we have fetched the feed if we also need to fetch graph data, they are dependent queries. Because this happens on the server where latency is generally both lower and more stable, this often isn't such a big deal.

Amazing, we've mostly flattened our waterfalls! There's a catch though. Let's call this page the `/feed` page, and let's pretend we also have another page like `/posts`. If we type in `www.example.com/feed` directly in the url bar and hit enter, we get all these great server rendering benefits, BUT, if we instead type in `www.example.com/posts` and then **click a link** to `/feed`, we're back to this:

```
1. |> JS for <Feed>
2.   |> getFeed()
3.     |> JS for <GraphFeedItem>
4.       |> getGraphDataById()
```

This is because with SPA's, server rendering only works for the initial page load, not for any subsequent navigation.

Modern frameworks often try to solve this by fetching the initial code and data in parallel, so if you were using Next.js or Remix with the prefetching patterns we outlined in this guide, including how to prefetch dependent queries, it would actually look like this instead:

```
1. |> JS for <Feed>
1. |> getFeed() + getGraphDataById()
2.   |> JS for <GraphFeedItem>
```

This is much better, but if we want to improve this further we can flatten this to a single roundtrip with Server Components. Learn how in the [Advanced Server Rendering guide](./advanced-ssr.md).

## Tips, Tricks and Caveats

### Staleness is measured from when the query was fetched on the server

A query is considered stale depending on when it was `dataUpdatedAt`. A caveat here is that the server needs to have the correct time for this to work properly, but UTC time is used, so timezones do not factor into this.

Because `staleTime` defaults to `0`, queries will be refetched in the background on page load by default. You might want to use a higher `staleTime` to avoid this double fetching, especially if you don't cache your markup.

This refetching of stale queries is a perfect match when caching markup in a CDN! You can set the cache time of the page itself decently high to avoid having to re-render pages on the server, but configure the `staleTime` of the queries lower to make sure data is refetched in the background as soon as a user visits the page. Maybe you want to cache the pages for a week, but refetch the data automatically on page load if it's older than a day?

### High memory consumption on server

In case you are creating the `QueryClient` for every request, React Query creates the isolated cache for this client, which is preserved in memory for the `gcTime` period. That may lead to high memory consumption on server in case of high number of requests during that period.

On the server, `gcTime` defaults to `Infinity` which disables manual garbage collection and will automatically clear memory once a request has finished. If you are explicitly setting a non-Infinity `gcTime` then you will be responsible for clearing the cache early.

Avoid setting `gcTime` to `0` as it may result in a hydration error. This occurs because the [Hydration Boundary](../reference/hydration.md#hydrationboundary) places necessary data into the cache for rendering, but if the garbage collector removes the data before the rendering completes, issues may arise. If you require a shorter `gcTime`, we recommend setting it to `2 * 1000` to allow sufficient time for the app to reference the data.

To clear the cache after it is not needed and to lower memory consumption, you can add a call to [`queryClient.clear()`](../../../reference/QueryClient.md#queryclientclear) after the request is handled and dehydrated state has been sent to the client.

Alternatively, you can set a smaller `gcTime`.

### Caveat for Next.js rewrites

There's a catch if you're using [Next.js' rewrites feature](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites) together with [Automatic Static Optimization](https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization) or `getStaticProps`: It will cause a second hydration by React Query. That's because [Next.js needs to ensure that they parse the rewrites](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites#rewrite-parameters) on the client and collect any params after hydration so that they can be provided in `router.query`.

The result is missing referential equality for all the hydration data, which for example triggers wherever your data is used as props of components or in the dependency array of `useEffect`s/`useMemo`s.
```

```
## Advanced Server Rendering

Welcome to the Advanced Server Rendering guide, where you will learn all about using React Query with streaming, Server Components and the Next.js app router.

You might want to read the [Server Rendering & Hydration guide](./ssr.md) before this one as it teaches the basics for using React Query with SSR, and [Performance & Request Waterfalls](./request-waterfalls.md) as well as [Prefetching & Router Integration](./prefetching.md) also contains valuable background.

Before we start, let's note that while the `initialData` approach outlined in the SSR guide also works with Server Components, we'll focus this guide on the hydration APIs.

## Server Components & Next.js app router

We won't cover Server Components in depth here, but the short version is that they are components that are guaranteed to _only_ run on the server, both for the initial page view and **also on page transitions**. This is similar to how Next.js `getServerSideProps`/`getStaticProps` and Remix `loader` works, as these also always run on the server but while those can only return data, Server Components can do a lot more. The data part is central to React Query however, so let's focus on that.

How do we take what we learned in the Server Rendering guide about [passing data prefetched in framework loaders to the app](./ssr.md#using-the-hydration-apis) and apply that to Server Components and the Next.js app router? The best way to start thinking about this is to consider Server Components as "just" another framework loader.

### A quick note on terminology

So far in these guides, we've been talking about the _server_ and the _client_. It's important to note that confusingly enough this does not match 1-1 with _Server Components_ and _Client Components_. Server Components are guaranteed to only run on the server, but Client Components can actually run in both places. The reason for this is that they can also render during the initial _server rendering_ pass.

One way to think of this is that even though Server Components also _render_, they happen during a "loader phase" (always happens on the server), while Client Components run during the "application phase". That application can run both on the server during SSR, and in for example a browser. Where exactly that application runs and if it runs during SSR or not might differ between frameworks.

### Initial setup

The first step of any React Query setup is always to create a `queryClient` and wrap your application in a `QueryClientProvider`. With Server Components, this looks mostly the same across frameworks, one difference being the filename conventions:

```tsx
// In Next.js, this file would be called: app/providers.tsx
'use client'

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (environmentManager.isServer()) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

```tsx
// In Next.js, this file would be called: app/layout.tsx
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

This part is pretty similar to what we did in the SSR guide, we just need to split things up into two different files.

### Prefetching and de/hydrating data

Next, let's look at how to actually prefetch data, then dehydrate and hydrate it. This is what it looked like using the **Next.js Pages Router**:

```tsx
// pages/posts.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'

// This could also be getServerSideProps
export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the <PostsRoute>, data will be available immediately either way
  //
  // Note that we are using useQuery here instead of useSuspenseQuery.
  // Because this data has already been prefetched, there is no need to
  // ever suspend in the component itself. If we forget or remove the
  // prefetch, this will instead fetch the data on the client, while
  // using useSuspenseQuery would have had worse side effects.
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  const { data: commentsData } = useQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
  })

  // ...
}

export default function PostsRoute({ dehydratedState }) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Posts />
    </HydrationBoundary>
  )
}
```

Converting this to the app router actually looks pretty similar, we just need to move things around a bit. First, we'll create a Server Component to do the prefetching part:

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Posts from './posts'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}
```

Next, we'll look at what the Client Component part looks like:

```tsx
// app/posts/posts.tsx
'use client'

export default function Posts() {
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix.
  const { data: commentsData } = useQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
  })

  // ...
}
```

One neat thing about the examples above is that the only thing that is Next.js-specific here are the file names, everything else would look the same in any other framework that supports Server Components.

In the SSR guide, we noted that you could get rid of the boilerplate of having `<HydrationBoundary>` in every route. This is not possible with Server Components.

> NOTE: If you encounter a type error while using async Server Components with TypeScript versions lower than `5.1.3` and `@types/react` versions lower than `18.2.8`, it is recommended to update to the latest versions of both. Alternatively, you can use the temporary workaround of adding `{/* @ts-expect-error Server Component */}` when calling this component inside another. For more information, see [Async Server Component TypeScript Error](https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error) in the Next.js TypeScript docs.

> NOTE: If you encounter an error `Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.` make sure that you're **not** passing to queryFn a function reference, instead call the function because queryFn args has a bunch of properties and not all of it would be serializable. see [Server Action only works when queryFn isn't a reference](https://github.com/TanStack/query/issues/6264).

### Nesting Server Components

A nice thing about Server Components is that they can be nested and exist on many levels in the React tree, making it possible to prefetch data closer to where it's actually used instead of only at the top of the application (just like Remix loaders). This can be as simple as a Server Component rendering another Server Component (we'll leave the Client Components out in this example for brevity):

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Posts from './posts'
import CommentsServerComponent from './comments-server'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
      <CommentsServerComponent />
    </HydrationBoundary>
  )
}

// app/posts/comments-server.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Comments from './comments'

export default async function CommentsServerComponent() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts-comments'],
    queryFn: getComments,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Comments />
    </HydrationBoundary>
  )
}
```

As you can see, it's perfectly fine to use `<HydrationBoundary>` in multiple places, and create and dehydrate multiple `queryClient` for prefetching.

Note that because we are awaiting `getPosts` before rendering `CommentsServerComponent` this would lead to a server side waterfall:

```
1. |> getPosts()
2.   |> getComments()
```

If the server latency to the data is low, this might not be a huge issue, but is still worth pointing out.

In Next.js, besides prefetching data in `page.tsx`, you can also do it in `layout.tsx`, and in [parallel routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes). Because these are all part of the routing, Next.js knows how to fetch them all in parallel. So if `CommentsServerComponent` above was instead expressed as a parallel route, the waterfall would be flattened automatically.

As more frameworks start supporting Server Components, they might have other routing conventions. Read your framework docs for details.

### Alternative: Use a single `queryClient` for prefetching

In the example above, we create a new `queryClient` for each Server Component that fetches data. This is the recommended approach, but if you want to, you can alternatively create a single one that is reused across all Server Components:

```tsx
// app/getQueryClient.tsx
import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

// cache() is scoped per request, so we don't leak data between requests
const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
```

The benefit of this is that you can call `getQueryClient()` to get a hold of this client anywhere that gets called from a Server Component, including utility functions. The downside is that every time you call `dehydrate(getQueryClient())`, you serialize _the entire_ `queryClient`, including queries that have already been serialized before and are unrelated to the current Server Component which is unnecessary overhead.

Next.js already dedupes requests that utilize `fetch()`, but if you are using something else in your `queryFn`, or if you use a framework that does _not_ dedupe these requests automatically, using a single `queryClient` as described above might make sense, despite the duplicated serialization.

> As a future improvement, we might look into creating a `dehydrateNew()` function (name pending) that only dehydrate queries that are _new_ since the last call to `dehydrateNew()`. Feel free to get in touch if this sounds interesting and like something you want to help out with!

### Data ownership and revalidation

With Server Components, it's important to think about data ownership and revalidation. To explain why, let's look at a modified example from above:

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Posts from './posts'

export default async function PostsPage() {
  const queryClient = new QueryClient()

  // Note we are now using fetchQuery()
  const posts = await queryClient.fetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* This is the new part */}
      <div>Nr of posts: {posts.length}</div>
      <Posts />
    </HydrationBoundary>
  )
}
```

We are now rendering data from the `getPosts` query both in a Server Component and in a Client Component. This will be fine for the initial page render, but what happens when the query revalidates on the client for some reason when `staleTime` has been passed?

React Query has no idea of how to _revalidate the Server Component_, so if it refetches the data on the client, causing React to rerender the list of posts, the `Nr of posts: {posts.length}` will end up out of sync.

This is fine if you set `staleTime: Infinity`, so that React Query never revalidates, but this is probably not what you want if you are using React Query in the first place.

Using React Query with Server Components makes most sense if:

- You have an app using React Query and want to migrate to Server Components without rewriting all the data fetching
- You want a familiar programming paradigm, but want to still sprinkle in the benefits of Server Components where it makes most sense
- You have some use case that React Query covers, but that your framework of choice does not cover

It's hard to give general advice on when it makes sense to pair React Query with Server Components and not. **If you are just starting out with a new Server Components app, we suggest you start out with any tools for data fetching your framework provides you with and avoid bringing in React Query until you actually need it.** This might be never, and that's fine, use the right tool for the job!

If you do use it, a good rule of thumb is to avoid `queryClient.fetchQuery` unless you need to catch errors. If you do use it, don't render its result on the server or pass the result to another component, even a Client Component one.

From the React Query perspective, treat Server Components as a place to prefetch data, nothing more.

Of course, it's fine to have Server Components own some data, and Client Components own other, just make sure those two realities don't get out of sync.

## Streaming with Server Components

The Next.js app router automatically streams any part of the application that is ready to be displayed to the browser as soon as possible, so finished content can be displayed immediately without waiting for still pending content. It does this along `<Suspense>` boundary lines. Note that if you create a file `loading.tsx`, this automatically creates a `<Suspense>` boundary behind the scenes.

With the prefetching patterns described above, React Query is perfectly compatible with this form of streaming. As the data for each Suspense boundary resolves, Next.js can render and stream the finished content to the browser. This works even if you are using `useQuery` as outlined above because the suspending actually happens when you `await` the prefetch.

As of React Query v5.40.0, you don't have to `await` all prefetches for this to work, as `pending` Queries can also be dehydrated and sent to the client. This lets you kick off prefetches as early as possible without letting them block an entire Suspense boundary, and streams the _data_ to the client as the query finishes. This can be useful for example if you want to prefetch some content that is only visible after some user interaction, or say if you want to `await` and render the first page of an infinite query, but start prefetching page 2 without blocking rendering.

To make this work, we have to instruct the `queryClient` to also `dehydrate` pending Queries. We can do this globally, or by passing that option directly to `dehydrate`.

We will also need to move the `getQueryClient()` function out of our `app/providers.tsx` file as we want to use it in our server component and our client provider.

```tsx
// app/get-query-client.ts
import {
  environmentManager,
  QueryClient,
  defaultShouldDehydrateQuery,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        shouldRedactErrors: (error) => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false
        },
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (environmentManager.isServer()) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
```

> Note: This works in NextJs and Server Components because React can serialize Promises over the wire when you pass them down to Client Components.

Then, all we need to do is provide a `HydrationBoundary`, but we don't need to `await` prefetches anymore:

```tsx
// app/posts/page.tsx
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from './get-query-client'
import Posts from './posts'

// the function doesn't need to be `async` because we don't `await` anything
export default function PostsPage() {
  const queryClient = getQueryClient()

  // look ma, no await
  queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}
```

On the client, the Promise will be put into the QueryCache for us. That means we can now call `useSuspenseQuery` inside the `Posts` component to "use" that Promise (which was created on the Server):

```tsx
// app/posts/posts.tsx
'use client'

export default function Posts() {
  const { data } = useSuspenseQuery({ queryKey: ['posts'], queryFn: getPosts })

  // ...
}
```

> Note that you could also `useQuery` instead of `useSuspenseQuery`, and the Promise would still be picked up correctly. However, NextJs won't suspend in that case and the component will render in the `pending` status, which also opts out of server rendering the content.

If you're using non-JSON data types and serialize the query results on the server, you can specify the `dehydrate.serializeData` and `hydrate.deserializeData` options to serialize and deserialize the data on each side of the boundary to ensure the data in the cache is the same format both on the server and the client:

```tsx
// app/get-query-client.ts
import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'
import { deserialize, serialize } from './transformer'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      // ...
      hydrate: {
        deserializeData: deserialize,
      },
      dehydrate: {
        serializeData: serialize,
      },
    },
  })
}

// ...
```

```tsx
// app/posts/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getQueryClient } from './get-query-client'
import { serialize } from './transformer'
import Posts from './posts'

export default function PostsPage() {
  const queryClient = getQueryClient()

  // look ma, no await
  queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts().then(serialize), // <-- serialize the data on the server
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  )
}
```

```tsx
// app/posts/posts.tsx
'use client'

export default function Posts() {
  const { data } = useSuspenseQuery({ queryKey: ['posts'], queryFn: getPosts })

  // ...
}
```

Now, your `getPosts` function can return e.g. `Temporal` datetime objects and the data will be serialized and deserialized on the client, assuming your transformer can serialize and deserialize those data types.

For more information, check out the [Next.js App with Prefetching Example](../examples/nextjs-app-prefetching).

### Using the Persist Adapter with Streaming

If you're using the persist adapter with the [Streaming with Server Components](#streaming-with-server-components) feature, you need to be careful not to save promises to storage. Since pending queries can be dehydrated and streamed to the client, you should configure the persister to only persist successful queries:

```tsx
<PersistQueryClientProvider
  client={queryClient}
  persistOptions={{
    persister,
    // We don't want to save promises into the storage, so we only persist successful queries
    dehydrateOptions: { shouldDehydrateQuery: defaultShouldDehydrateQuery },
  }}
>
  {children}
</PersistQueryClientProvider>
```

This ensures that only successfully resolved queries are persisted to storage, preventing serialization issues with pending promises.

## Experimental streaming without prefetching in Next.js

While we recommend the prefetching solution detailed above because it flattens request waterfalls both on the initial page load **and** any subsequent page navigation, there is an experimental way to skip prefetching altogether and still have streaming SSR work: `@tanstack/react-query-next-experimental`

This package will allow you to fetch data on the server (in a Client Component) by just calling `useSuspenseQuery` in your component. Results will then be streamed from the server to the client as SuspenseBoundaries resolve. If you call `useSuspenseQuery` without wrapping it in a `<Suspense>` boundary, the HTML response won't start until the fetch resolves. This can be what you want depending on the situation, but keep in mind that this will hurt your TTFB.

To achieve this, wrap your app in the `ReactQueryStreamedHydration` component:

```tsx
// app/providers.tsx
'use client'

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import * as React from 'react'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (environmentManager.isServer()) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export function Providers(props: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}
```

For more information, check out the [NextJs Suspense Streaming Example](../examples/nextjs-suspense-streaming).

The big upside is that you no longer need to prefetch queries manually to have SSR work, and it even still streams in the result! This gives you phenomenal DX and lower code complexity.

The downside is easiest to explain if we look back at [the complex request waterfall example](./request-waterfalls.md#code-splitting) in the Performance & Request Waterfalls guide. Server Components with prefetching effectively eliminates the request waterfalls both for the initial page load **and** any subsequent navigation. This prefetch-less approach however will only flatten the waterfalls on the initial page load but ends up the same deep waterfall as the original example on page navigations:

```
1. |> JS for <Feed>
2.   |> getFeed()
3.     |> JS for <GraphFeedItem>
4.       |> getGraphDataById()
```

This is even worse than with `getServerSideProps`/`getStaticProps`, since with those we could at least parallelize data- and code-fetching.

If you value DX/iteration/shipping speed with low code complexity over performance, don't have deeply nested queries, or are on top of your request waterfalls with parallel fetching using tools like `useSuspenseQueries`, this can be a good tradeoff.

> It might be possible to combine the two approaches, but even we haven't tried that out yet. If you do try this, please report back your findings, or even update these docs with some tips!

## Final words

Server Components and streaming are still fairly new concepts and we are still figuring out how React Query fits in and what improvements we can make to the API. We welcome suggestions, feedback and bug reports!

Similarly, it would be impossible to teach all the intricacies of this new paradigm all in one guide, on the first try. If you are missing some piece of information here or have suggestions on how to improve this content, also get in touch, or even better, click the "Edit on GitHub" button below and help us out.

[//]: # 'Materials'

## Further reading

To understand if your application can benefit from React Query when also using Server Components, see the article [You Might Not Need React Query](https://tkdodo.eu/blog/you-might-not-need-react-query).

[//]: # 'Materials'
```

```
## Caching

> Please thoroughly read the [Important Defaults](./important-defaults.md) before reading this guide

## Basic Example

This caching example illustrates the story and lifecycle of:

- Query Instances with and without cache data
- Background Refetching
- Inactive Queries
- Garbage Collection

Let's assume we are using the default `gcTime` of **5 minutes** and the default `staleTime` of `0`.

- A new instance of `useQuery({ queryKey: ['todos'], queryFn: fetchTodos })` mounts.
  - Since no other queries have been made with the `['todos']` query key, this query will show a hard loading state and make a network request to fetch the data.
  - When the network request has completed, the returned data will be cached under the `['todos']` key.
  - The data will be marked as stale after the configured `staleTime` (defaults to `0`, or immediately).
- A second instance of `useQuery({ queryKey: ['todos'], queryFn: fetchTodos })` mounts elsewhere.
  - Since the cache already has data for the `['todos']` key from the first query, that data is immediately returned from the cache.
  - The new instance triggers a new network request using its query function.
    - Note that regardless of whether both `fetchTodos` query functions are identical or not, both queries' [`status`](../reference/useQuery.md) are updated (including `isFetching`, `isPending`, and other related values) because they have the same query key.
  - When the request completes successfully, the cache's data under the `['todos']` key is updated with the new data, and both instances are updated with the new data.
- Both instances of the `useQuery({ queryKey: ['todos'], queryFn: fetchTodos })` query are unmounted and no longer in use.
  - Since there are no more active instances of this query, a garbage collection timeout is set using `gcTime` to delete and garbage collect the query (defaults to **5 minutes**).
- Before the cache timeout (gcTime) has completed, another instance of `useQuery({ queryKey: ['todos'], queryFn: fetchTodos })` mounts. The query immediately returns the available cached data while the `fetchTodos` function is being run in the background. When it completes successfully, it will populate the cache with fresh data.
- The final instance of `useQuery({ queryKey: ['todos'], queryFn: fetchTodos })` unmounts.
- No more instances of `useQuery({ queryKey: ['todos'], queryFn: fetchTodos })` appear within **5 minutes**.
  - The cached data under the `['todos']` key is deleted and garbage collected.
```

```
## Render Optimizations

React Query applies a couple of optimizations automatically to ensure that your components only re-render when they actually need to. This is done by the following means:

## structural sharing

React Query uses a technique called "structural sharing" to ensure that as many references as possible will be kept intact between re-renders. If data is fetched over the network, usually, you'll get a completely new reference by json parsing the response. However, React Query will keep the original reference if _nothing_ changed in the data. If a subset changed, React Query will keep the unchanged parts and only replace the changed parts.

> Note: This optimization only works if the `queryFn` returns JSON compatible data. You can turn it off by setting `structuralSharing: false` globally or on a per-query basis, or you can implement your own structural sharing by passing a function to it.

### referential identity

The top level object returned from `useQuery`, `useInfiniteQuery`, `useMutation` and the Array returned from `useQueries` is **not referentially stable**. It will be a new reference on every render. However, the `data` properties returned from these hooks will be as stable as possible.

## tracked properties

React Query will only trigger a re-render if one of the properties returned from `useQuery` is actually "used". This is done by using [Proxy object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). This avoids a lot of unnecessary re-renders, e.g. because properties like `isFetching` or `isStale` might change often, but are not used in the component.

You can customize this feature by setting `notifyOnChangeProps` manually globally or on a per-query basis. If you want to turn that feature off, you can set `notifyOnChangeProps: 'all'`.

> Note: The get trap of a proxy is invoked by accessing a property, either via destructuring or by accessing it directly. If you use object rest destructuring, you will disable this optimization. We have a [lint rule](../../../eslint/no-rest-destructuring.md) to guard against this pitfall.

## select

You can use the `select` option to select a subset of the data that your component should subscribe to. This is useful for highly optimized data transformations or to avoid unnecessary re-renders.

```js
export const useTodos = (select) => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    select,
  })
}

export const useTodoCount = () => {
  return useTodos((data) => data.length)
}
```

A component using the `useTodoCount` custom hook will only re-render if the length of the todos changes. It will **not** re-render if e.g. the name of a todo changed.

> Note: `select` operates on successfully cached data and is not the appropriate place to throw errors. The source of truth for errors is the `queryFn`, and a `select` function that returns an error results in `data` being `undefined` and `isSuccess` being `true`. We recommend handling errors in the `queryFn` if you wish to have a query fail on incorrect data, or outside of the query hook if you have a error case not related to caching.

### memoization

The `select` function will only re-run if:

- the `select` function itself changed referentially
- `data` changed

This means that an inlined `select` function, as shown above, will run on every render. To avoid this, you can wrap the `select` function in `useCallback`, or extract it to a stable function reference if it doesn't have any dependencies:

```js
// wrapped in useCallback
export const useTodoCount = () => {
  return useTodos(useCallback((data) => data.length, []))
}
```

```js
// extracted to a stable function reference
const selectTodoCount = (data) => data.length

export const useTodoCount = () => {
  return useTodos(selectTodoCount)
}
```

## Further Reading

For an in-depth guide about these topics, read [React Query Render Optimizations](https://tkdodo.eu/blog/react-query-render-optimizations) from
the TkDodo. To learn how to best optimize the `select` option, read [React Query Selectors, Supercharged](https://tkdodo.eu/blog/react-query-selectors-supercharged)
```

```
## Default Query Function

If you find yourself wishing for whatever reason that you could just share the same query function for your entire app and just use query keys to identify what it should fetch, you can do that by providing a **default query function** to TanStack Query:

[//]: # 'Example'

```tsx
// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  )
  return data
}

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}

// All you have to do now is pass a key!
function Posts() {
  const { status, data, error, isFetching } = useQuery({ queryKey: ['/posts'] })

  // ...
}

// You can even leave out the queryFn and just go straight into options
function Post({ postId }) {
  const { status, data, error, isFetching } = useQuery({
    queryKey: [`/posts/${postId}`],
    enabled: !!postId,
  })

  // ...
}
```

[//]: # 'Example'

If you ever want to override the default queryFn, you can just provide your own like you normally would.
```

```
## Suspense

React Query can also be used with React's Suspense for Data Fetching APIs. For this, we have dedicated hooks:

- [useSuspenseQuery](../reference/useSuspenseQuery.md)
- [useSuspenseInfiniteQuery](../reference/useSuspenseInfiniteQuery.md)
- [useSuspenseQueries](../reference/useSuspenseQueries.md)
- Additionally, you can use the `useQuery().promise` and `React.use()` (Experimental)

When using suspense mode, `status` states and `error` objects are not needed and are then replaced by usage of the `React.Suspense` component (including the use of the `fallback` prop and React error boundaries for catching errors). Please read the [Resetting Error Boundaries](#resetting-error-boundaries) and look at the [Suspense Example](../examples/suspense) for more information on how to set up suspense mode.

If you want mutations to propagate errors to the nearest error boundary (similar to queries), you can set the `throwOnError` option to `true` as well.

Enabling suspense mode for a query:

```tsx
import { useSuspenseQuery } from '@tanstack/react-query'

const { data } = useSuspenseQuery({ queryKey, queryFn })
```

This works nicely in TypeScript, because `data` is guaranteed to be defined (as errors and loading states are handled by Suspense- and ErrorBoundaries).

On the flip side, you therefore can't conditionally enable / disable the Query. This generally shouldn't be necessary for dependent Queries because with suspense, all your Queries inside one component are fetched in serial.

`placeholderData` also doesn't exist for this Query. To prevent the UI from being replaced by a fallback during an update, wrap your updates that change the QueryKey into [startTransition](https://react.dev/reference/react/Suspense#preventing-unwanted-fallbacks).

### throwOnError default

Not all errors are thrown to the nearest Error Boundary per default - we're only throwing errors if there is no other data to show. That means if a Query ever successfully got data in the cache, the component will render, even if data is `stale`. Thus, the default for `throwOnError` is:

```
throwOnError: (error, query) => typeof query.state.data === 'undefined'
```

Since you can't change `throwOnError` (because it would allow for `data` to become potentially `undefined`), you have to throw errors manually if you want all errors to be handled by Error Boundaries:

```tsx
import { useSuspenseQuery } from '@tanstack/react-query'

const { data, error, isFetching } = useSuspenseQuery({ queryKey, queryFn })

if (error && !isFetching) {
  throw error
}

// continue rendering data
```

## Resetting Error Boundaries

Whether you are using **suspense** or **throwOnError** in your queries, you will need a way to let queries know that you want to try again when re-rendering after some error occurred.

Query errors can be reset with the `QueryErrorResetBoundary` component or with the `useQueryErrorResetBoundary` hook.

When using the component it will reset any query errors within the boundaries of the component:

```tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
          </div>
        )}
      >
        <Page />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)
```

When using the hook it will reset any query errors within the closest `QueryErrorResetBoundary`. If there is no boundary defined it will reset them globally:

```tsx
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <Page />
    </ErrorBoundary>
  )
}
```

## Fetch-on-render vs Render-as-you-fetch

Out of the box, React Query in `suspense` mode works really well as a **Fetch-on-render** solution with no additional configuration. This means that when your components attempt to mount, they will trigger query fetching and suspend, but only once you have imported them and mounted them. If you want to take it to the next level and implement a **Render-as-you-fetch** model, we recommend implementing [Prefetching](./prefetching.md) on routing callbacks and/or user interactions events to start loading queries before they are mounted and hopefully even before you start importing or mounting their parent components.

## Suspense on the Server with streaming

If you are using `NextJs`, you can use our **experimental** integration for Suspense on the Server: `@tanstack/react-query-next-experimental`. This package will allow you to fetch data on the server (in a client component) by just calling `useSuspenseQuery` in your component. Results will then be streamed from the server to the client as SuspenseBoundaries resolve.

To achieve this, wrap your app in the `ReactQueryStreamedHydration` component:

```tsx
// app/providers.tsx
'use client'

import {
  environmentManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import * as React from 'react'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (environmentManager.isServer()) {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export function Providers(props: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}
```

For more information, check out the [NextJs Suspense Streaming Example](../examples/nextjs-suspense-streaming) and the [Advanced Rendering & Hydration](./advanced-ssr.md) guide.

## Using `useQuery().promise` and `React.use()` (Experimental)

> To enable this feature, you need to set the `experimental_prefetchInRender` option to `true` when creating your `QueryClient`

**Example code:**

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
})
```

**Usage:**

```tsx
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchTodos, type Todo } from './api'

function TodoList({ query }: { query: UseQueryResult<Todo[]> }) {
  const data = React.use(query.promise)

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}

export function App() {
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })

  return (
    <>
      <h1>Todos</h1>
      <React.Suspense fallback={<div>Loading...</div>}>
        <TodoList query={query} />
      </React.Suspense>
    </>
  )
}
```

For a more complete example, see [suspense example on GitHub](https://github.com/TanStack/query/tree/main/examples/react/suspense).

For a Next.js streaming example, see [nextjs-suspense-streaming example on GitHub](https://github.com/TanStack/query/tree/main/examples/react/nextjs-suspense-streaming).
```

```
## Testing

React Query works by means of hooks - either the ones we offer or custom ones that wrap around them.

With React 17 or earlier, writing unit tests for these custom hooks can be done by means of the [React Hooks Testing Library](https://react-hooks-testing-library.com/) library.

Install this by running:

```sh
npm install @testing-library/react-hooks react-test-renderer --save-dev
```

(The `react-test-renderer` library is needed as a peer dependency of `@testing-library/react-hooks`, and needs to correspond to the version of React that you are using.)

_Note_: when using React 18 or later, `renderHook` is available directly through the `@testing-library/react` package, and `@testing-library/react-hooks` is no longer required.

## Our First Test

Once installed, a simple test can be written. Given the following custom hook:

```tsx
export function useCustomHook() {
  return useQuery({ queryKey: ['customHook'], queryFn: () => 'Hello' })
}
```

We can write a test for this as follows:

```tsx
import { renderHook, waitFor } from '@testing-library/react'

const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const { result } = renderHook(() => useCustomHook(), { wrapper })

await waitFor(() => expect(result.current.isSuccess).toBe(true))

expect(result.current.data).toEqual('Hello')
```

Note that we provide a custom wrapper that builds the `QueryClient` and `QueryClientProvider`. This helps to ensure that our test is completely isolated from any other tests.

It is possible to write this wrapper only once, but if so we need to ensure that the `QueryClient` gets cleared before every test, and that tests don't run in parallel otherwise one test will influence the results of others.

## Turn off retries

The library defaults to three retries with exponential backoff, which means that your tests are likely to timeout if you want to test an erroneous query. The easiest way to turn retries off is via the QueryClientProvider. Let's extend the above example:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
})
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
```

This will set the defaults for all queries in the component tree to "no retries". It is important to know that this will only work if your actual useQuery has no explicit retries set. If you have a query that wants 5 retries, this will still take precedence, because defaults are only taken as a fallback.

## Set gcTime to Infinity with Jest

If you use Jest, you can set the `gcTime` to `Infinity` to prevent "Jest did not exit one second after the test run completed" error message. This is the default behavior on the server, and is only necessary to set if you are explicitly setting a `gcTime`.

## Testing Network Calls

The primary use for React Query is to cache network requests, so it's important that we can test our code is making the correct network requests in the first place.

There are plenty of ways that these can be tested, but for this example we are going to use [nock](https://www.npmjs.com/package/nock).

Given the following custom hook:

```tsx
function useFetchData() {
  return useQuery({
    queryKey: ['fetchData'],
    queryFn: () => request('/api/data'),
  })
}
```

We can write a test for this as follows:

```tsx
const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const expectation = nock('http://example.com').get('/api/data').reply(200, {
  answer: 42,
})

const { result } = renderHook(() => useFetchData(), { wrapper })

await waitFor(() => expect(result.current.isSuccess).toBe(true))

expect(result.current.data).toEqual({ answer: 42 })
```

Here we are making use of `waitFor` and waiting until the query status indicates that the request has succeeded. This way we know that our hook has finished and should have the correct data. _Note_: when using React 18, the semantics of `waitFor` have changed as noted above.

## Testing Load More / Infinite Scroll

First we need to mock our API response

```tsx
function generateMockedResponse(page) {
  return {
    page: page,
    items: [...]
  }
}
```

Then, our `nock` configuration needs to differentiate responses based on the page, and we'll be using `uri` to do this.
`uri`'s value here will be something like `"/?page=1` or `/?page=2`

```tsx
const expectation = nock('http://example.com')
  .persist()
  .query(true)
  .get('/api/data')
  .reply(200, (uri) => {
    const url = new URL(`http://example.com${uri}`)
    const { page } = Object.fromEntries(url.searchParams)
    return generateMockedResponse(page)
  })
```

(Notice the `.persist()`, because we'll be calling from this endpoint multiple times)

Now we can safely run our tests, the trick here is to await for the data assertion to pass:

```tsx
const { result } = renderHook(() => useInfiniteQueryCustomHook(), {
  wrapper,
})

await waitFor(() => expect(result.current.isSuccess).toBe(true))

expect(result.current.data.pages).toStrictEqual(generateMockedResponse(1))

result.current.fetchNextPage()

await waitFor(() =>
  expect(result.current.data.pages).toStrictEqual([
    ...generateMockedResponse(1),
    ...generateMockedResponse(2),
  ]),
)

expectation.done()
```

_Note_: when using React 18, the semantics of `waitFor` have changed as noted above.

## Further reading

For additional tips and an alternative setup using `mock-service-worker`, have a look at [this article by TkDodo on Testing React Query](https://tkdodo.eu/blog/testing-react-query).
```

```
## Does this replace Redux, MobX, etc?

Well, let's start with a few important items:

- TanStack Query is a **server-state** library, responsible for managing asynchronous operations between your server and client
- Redux, MobX, Zustand, etc. are **client-state** libraries that _can be used to store asynchronous data, albeit inefficiently when compared to a tool like TanStack Query_

With those points in mind, the short answer is that TanStack Query **replaces the boilerplate code and related wiring used to manage cache data in your client-state and replaces it with just a few lines of code.**

For a vast majority of applications, the truly **globally accessible client state** that is left over after migrating all of your async code to TanStack Query is usually very tiny.

> There are still some circumstances where an application might indeed have a massive amount of synchronous client-only state (like a visual designer or music production application), in which case, you will probably still want a client state manager. In this situation it's important to note that **TanStack Query is not a replacement for local/client state management**. However, you can use TanStack Query alongside most client state managers with zero issues.

## A Contrived Example

Here we have some "global" state being managed by a global state library:

```tsx
const globalState = {
  projects,
  teams,
  tasks,
  users,
  themeMode,
  sidebarStatus,
}
```

Currently, the global state manager is caching 4 types of server-state: `projects`, `teams`, `tasks`, and `users`. If we were to move these server-state assets to TanStack Query, our remaining global state would look more like this:

```tsx
const globalState = {
  themeMode,
  sidebarStatus,
}
```

This also means that with a few hook calls to `useQuery` and `useMutation`, we also get to remove any boilerplate code that was used to manage our server state e.g.

- Connectors
- Action Creators
- Middlewares
- Reducers
- Loading/Error/Result states
- Contexts

With all of those things removed, you may ask yourself, **"Is it worth it to keep using our client state manager for this tiny global state?"**

**And that's up to you!**

But TanStack Query's role is clear. It removes asynchronous wiring and boilerplate from your application and replaces it with just a few lines of code.

What are you waiting for, give it a go already!
```

```
## Migrating to v3

Previous versions of React Query were awesome and brought some amazing new features, more magic, and an overall better experience to the library. They also brought on massive adoption and likewise a lot of refining fire (issues/contributions) to the library and brought to light a few things that needed more polish to make the library even better. v3 contains that very polish.

## Overview

- More scalable and testable cache configuration
- Better SSR support
- Data-lag (previously usePaginatedQuery) anywhere!
- Bi-directional Infinite Queries
- Query data selectors!
- Fully configure defaults for queries and/or mutations before use
- More granularity for optional rendering optimization
- New `useQueries` hook! (Variable-length parallel query execution)
- Query filter support for the `useIsFetching()` hook!
- Retry/offline/replay support for mutations
- Observe queries/mutations outside of React
- Use the React Query core logic anywhere you want!
- Bundled/Colocated Devtools via `react-query/devtools`
- Cache Persistence to web storage (experimental via `react-query/persistQueryClient-experimental` and `react-query/createWebStoragePersistor-experimental`)

## Breaking Changes

### The `QueryCache` has been split into a `QueryClient` and lower-level `QueryCache` and `MutationCache` instances.

The `QueryCache` contains all queries, the `MutationCache` contains all mutations, and the `QueryClient` can be used to set configuration and to interact with them.

This has some benefits:

- Allows for different types of caches.
- Multiple clients with different configurations can use the same cache.
- Clients can be used to track queries, which can be used for shared caches on SSR.
- The client API is more focused towards general usage.
- Easier to test the individual components.

When creating a `new QueryClient()`, a `QueryCache` and `MutationCache` are automatically created for you if you don't supply them.

```tsx
import { QueryClient } from 'react-query'

const queryClient = new QueryClient()
```

### `ReactQueryConfigProvider` and `ReactQueryCacheProvider` have both been replaced by `QueryClientProvider`

Default options for queries and mutations can now be specified in `QueryClient`:

**Notice that it's now defaultOptions instead of defaultConfig**

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // query options
    },
    mutations: {
      // mutation options
    },
  },
})
```

The `QueryClientProvider` component is now used to connect a `QueryClient` to your application:

```tsx
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

### The default `QueryCache` is gone. **For real this time!**

As previously noted with a deprecation, there is no longer a default `QueryCache` that is created or exported from the main package. **You must create your own via `new QueryClient()` or `new QueryCache()` (which you can then pass to `new QueryClient({ queryCache })` )**

### The deprecated `makeQueryCache` utility has been removed.

It's been a long time coming, but it's finally gone :)

### `QueryCache.prefetchQuery()` has been moved to `QueryClient.prefetchQuery()`

The new `QueryClient.prefetchQuery()` function is async, but **does not return the data from the query**. If you require the data, use the new `QueryClient.fetchQuery()` function

```tsx
// Prefetch a query:
await queryClient.prefetchQuery('posts', fetchPosts)

// Fetch a query:
try {
  const data = await queryClient.fetchQuery('posts', fetchPosts)
} catch (error) {
  // Error handling
}
```

### `ReactQueryErrorResetBoundary` and `QueryCache.resetErrorBoundaries()` have been replaced by `QueryErrorResetBoundary` and `useQueryErrorResetBoundary()`.

Together, these provide the same experience as

</task>

---

All 32 pages fetched successfully. Here is the complete content:

## useQuery

```tsx
const {
  data,
  dataUpdatedAt,
  error,
  errorUpdatedAt,
  failureCount,
  failureReason,
  fetchStatus,
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  isEnabled,
  promise,
  refetch,
  status,
} = useQuery(
  {
    queryKey,
    queryFn,
    gcTime,
    enabled,
    networkMode,
    initialData,
    initialDataUpdatedAt,
    meta,
    notifyOnChangeProps,
    placeholderData,
    queryKeyHashFn,
    refetchInterval,
    refetchIntervalInBackground,
    refetchOnMount,
    refetchOnReconnect,
    refetchOnWindowFocus,
    retry,
    retryOnMount,
    retryDelay,
    select,
    staleTime,
    structuralSharing,
    subscribed,
    throwOnError,
  },
  queryClient,
)
```

**Parameter1 (Options)**

- `queryKey: unknown[]`
  - **Required**
  - The query key to use for this query.
  - The query key will be hashed into a stable hash. See [Query Keys](../guides/query-keys.md) for more information.
  - The query will automatically update when this key changes (as long as `enabled` is not set to `false`).
- `queryFn: (context: QueryFunctionContext) => Promise<TData>`
  - **Required, but only if no default query function has been defined** See [Default Query Function](../guides/default-query-function.md) for more information.
  - The function that the query will use to request data.
  - Receives a [QueryFunctionContext](../guides/query-functions.md#queryfunctioncontext)
  - Must return a promise that will either resolve data or throw an error. The data cannot be `undefined`.
- `enabled: boolean | (query: Query) => boolean`
  - Set this to `false` to disable this query from automatically running.
  - Can be used for [Dependent Queries](../guides/dependent-queries.md).
- `networkMode: 'online' | 'always' | 'offlineFirst'`
  - optional
  - defaults to `'online'`
  - see [Network Mode](../guides/network-mode.md) for more information.
- `retry: boolean | number | (failureCount: number, error: TError) => boolean`
  - If `false`, failed queries will not retry by default.
  - If `true`, failed queries will retry infinitely.
  - If set to a `number`, e.g. `3`, failed queries will retry until the failed query count meets that number.
  - If set to a function, it will be called with `failureCount` (starting at `0` for the first retry) and `error` to determine if a retry should be attempted.
  - defaults to `3` on the client and `0` on the server
- `retryOnMount: boolean | (query: Query) => boolean`
  - If set to `false`, the query will not be retried on mount if it contains an error and has no data. Defaults to `true`.
  - If set to a function, the function will be executed with the query to compute the value.
- `retryDelay: number | (retryAttempt: number, error: TError) => number`
  - This function receives a `retryAttempt` integer and the actual Error and returns the delay to apply before the next attempt in milliseconds.
  - A function like `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)` applies exponential backoff.
  - A function like `attempt => attempt * 1000` applies linear backoff.
- `staleTime: number | 'static' | ((query: Query) => number | 'static')`
  - Optional
  - Defaults to `0`
  - The time in milliseconds after which data is considered stale. This value only applies to the hook it is defined on.
  - If set to `Infinity`, the data will not be considered stale unless manually invalidated
  - If set to a function, the function will be executed with the query to compute a `staleTime`.
  - If set to `'static'`, the data will never be considered stale
- `gcTime: number | Infinity`
  - Defaults to `5 * 60 * 1000` (5 minutes) or `Infinity` during SSR
  - The time in milliseconds that unused/inactive cache data remains in memory. When a query's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different garbage collection times are specified, the longest one will be used.
  - Note: the maximum allowed time is about [24 days](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value), although it is possible to work around this limit using [timeoutManager.setTimeoutProvider](../../../reference/timeoutManager.md#timeoutmanagersettimeoutprovider).
  - If set to `Infinity`, will disable garbage collection
- `queryKeyHashFn: (queryKey: QueryKey) => string`
  - Optional
  - If specified, this function is used to hash the `queryKey` to a string.
- `refetchInterval: number | false | ((query: Query) => number | false | undefined)`
  - Optional
  - If set to a number, all queries will continuously refetch at this frequency in milliseconds
  - If set to a function, the function will be executed with the query to compute a frequency
- `refetchIntervalInBackground: boolean`
  - Optional
  - If set to `true`, queries that are set to continuously refetch with a `refetchInterval` will continue to refetch while their tab/window is in the background
- `refetchOnMount: boolean | "always" | ((query: Query) => boolean | "always")`
  - Optional
  - Defaults to `true`
  - If set to `true`, the query will refetch on mount if the data is stale.
  - If set to `false`, the query will not refetch on mount.
  - If set to `"always"`, the query will always refetch on mount (except when `staleTime: 'static'` is used).
  - If set to a function, the function will be executed with the query to compute the value
- `refetchOnWindowFocus: boolean | "always" | ((query: Query) => boolean | "always")`
  - Optional
  - Defaults to `true`
  - If set to `true`, the query will refetch on window focus if the data is stale.
  - If set to `false`, the query will not refetch on window focus.
  - If set to `"always"`, the query will always refetch on window focus (except when `staleTime: 'static'` is used).
  - If set to a function, the function will be executed with the query to compute the value
- `refetchOnReconnect: boolean | "always" | ((query: Query) => boolean | "always")`
  - Optional
  - Defaults to `true`
  - If set to `true`, the query will refetch on reconnect if the data is stale.
  - If set to `false`, the query will not refetch on reconnect.
  - If set to `"always"`, the query will always refetch on reconnect (except when `staleTime: 'static'` is used).
  - If set to a function, the function will be executed with the query to compute the value
- `notifyOnChangeProps: string[] | "all" | (() => string[] | "all" | undefined)`
  - Optional
  - If set, the component will only re-render if any of the listed properties change.
  - If set to `['data', 'error']` for example, the component will only re-render when the `data` or `error` properties change.
  - If set to `"all"`, the component will opt-out of smart tracking and re-render whenever a query is updated.
  - If set to a function, the function will be executed to compute the list of properties.
  - By default, access to properties will be tracked, and the component will only re-render when one of the tracked properties change.
- `select: (data: TData) => unknown`
  - Optional
  - This option can be used to transform or select a part of the data returned by the query function. It affects the returned `data` value, but does not affect what gets stored in the query cache.
  - The `select` function will only run if `data` changed, or if the reference to the `select` function itself changes. To optimize, wrap the function in `useCallback`.
- `initialData: TData | () => TData`
  - Optional
  - If set, this value will be used as the initial data for the query cache (as long as the query hasn't been created or cached yet)
  - If set to a function, the function will be called **once** during the shared/root query initialization, and be expected to synchronously return the initialData
  - Initial data is considered stale by default unless a `staleTime` has been set.
  - `initialData` **is persisted** to the cache
- `initialDataUpdatedAt: number | (() => number | undefined)`
  - Optional
  - If set, this value will be used as the time (in milliseconds) of when the `initialData` itself was last updated.
- `placeholderData: TData | (previousValue: TData | undefined, previousQuery: Query | undefined) => TData`
  - Optional
  - If set, this value will be used as the placeholder data for this particular query observer while the query is still in the `pending` state.
  - `placeholderData` is **not persisted** to the cache
  - If you provide a function for `placeholderData`, as a first argument you will receive previously watched query data if available, and the second argument will be the complete previousQuery instance.
- `structuralSharing: boolean | (oldData: unknown | undefined, newData: unknown) => unknown`
  - Optional
  - Defaults to `true`
  - If set to `false`, structural sharing between query results will be disabled.
  - If set to a function, the old and new data values will be passed through this function, which should combine them into resolved data for the query. This way, you can retain references from the old data to improve performance even when that data contains non-serializable values.
- `subscribed: boolean`
  - Optional
  - Defaults to `true`
  - If set to `false`, this instance of `useQuery` will not be subscribed to the cache. This means it won't trigger the `queryFn` on its own, and it won't receive updates if data gets into cache by other means.
- `throwOnError: undefined | boolean | (error: TError, query: Query) => boolean`
  - Set this to `true` if you want errors to be thrown in the render phase and propagate to the nearest error boundary
  - Set this to `false` to disable `suspense`'s default behavior of throwing errors to the error boundary.
  - If set to a function, it will be passed the error and the query, and it should return a boolean indicating whether to show the error in an error boundary (`true`) or return the error as state (`false`)
- `meta: Record<string, unknown>`
  - Optional
  - If set, stores additional information on the query cache entry that can be used as needed. It will be accessible wherever the `query` is available, and is also part of the `QueryFunctionContext` provided to the `queryFn`.

**Parameter2 (QueryClient)**

- `queryClient?: QueryClient`
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

**Returns**

- `status: QueryStatus`
  - Will be:
    - `pending` if there's no cached data and no query attempt was finished yet.
    - `error` if the query attempt resulted in an error. The corresponding `error` property has the error received from the attempted fetch
    - `success` if the query has received a response with no errors and is ready to display its data. The corresponding `data` property on the query is the data received from the successful fetch or if the query's `enabled` property is set to `false` and has not been fetched yet `data` is the first `initialData` supplied to the query on initialization.
- `isPending: boolean`
  - A derived boolean from the `status` variable above, provided for convenience.
- `isSuccess: boolean`
  - A derived boolean from the `status` variable above, provided for convenience.
- `isError: boolean`
  - A derived boolean from the `status` variable above, provided for convenience.
- `isLoadingError: boolean`
  - Will be `true` if the query failed while fetching for the first time.
- `isRefetchError: boolean`
  - Will be `true` if the query failed while refetching.
- `data: TData`
  - Defaults to `undefined`.
  - The last successfully resolved data for the query.
- `dataUpdatedAt: number`
  - The timestamp for when the query most recently returned the `status` as `"success"`.
- `error: null | TError`
  - Defaults to `null`
  - The error object for the query, if an error was thrown.
- `errorUpdatedAt: number`
  - The timestamp for when the query most recently returned the `status` as `"error"`.
- `isStale: boolean`
  - Will be `true` if the data in the cache is invalidated or if the data is older than the given `staleTime`.
- `isPlaceholderData: boolean`
  - Will be `true` if the data shown is the placeholder data.
- `isFetched: boolean`
  - Will be `true` if the query has been fetched.
- `isFetchedAfterMount: boolean`
  - Will be `true` if the query has been fetched after the component mounted.
  - This property can be used to not show any previously cached data.
- `fetchStatus: FetchStatus`
  - `fetching`: Is `true` whenever the queryFn is executing, which includes initial `pending` as well as background refetches.
  - `paused`: The query wanted to fetch, but has been `paused`.
  - `idle`: The query is not fetching.
  - see [Network Mode](../guides/network-mode.md) for more information.
- `isFetching: boolean`
  - A derived boolean from the `fetchStatus` variable above, provided for convenience.
- `isPaused: boolean`
  - A derived boolean from the `fetchStatus` variable above, provided for convenience.
- `isRefetching: boolean`
  - Is `true` whenever a background refetch is in-flight, which _does not_ include initial `pending`
  - Is the same as `isFetching && !isPending`
- `isLoading: boolean`
  - Is `true` whenever the first fetch for a query is in-flight
  - Is the same as `isFetching && isPending`
- `isInitialLoading: boolean`
  - **deprecated**
  - An alias for `isLoading`, will be removed in the next major version.
- `isEnabled: boolean`
  - Is `true` if this query observer is enabled, `false` otherwise.
- `failureCount: number`
  - The failure count for the query.
  - Incremented every time the query fails.
  - Reset to `0` when the query succeeds.
- `failureReason: null | TError`
  - The failure reason for the query retry.
  - Reset to `null` when the query succeeds.
- `errorUpdateCount: number`
  - The sum of all errors.
- `refetch: (options: { throwOnError: boolean, cancelRefetch: boolean }) => Promise<UseQueryResult>`
  - A function to manually refetch the query.
  - If the query errors, the error will only be logged. If you want an error to be thrown, pass the `throwOnError: true` option
  - `cancelRefetch?: boolean`
    - Defaults to `true`
      - Per default, a currently running request will be cancelled before a new request is made
    - When set to `false`, no refetch will be made if there is already a request running.
- `promise: Promise<TData>`
  - A stable promise that will be resolved with the data of the query.
  - Requires the `experimental_prefetchInRender` feature flag to be enabled on the `QueryClient`.

---

## useQueries

The `useQueries` hook can be used to fetch a variable number of queries:

```tsx
const ids = [1, 2, 3]
const results = useQueries({
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    staleTime: Infinity,
  })),
})
```

**Options**

The `useQueries` hook accepts an options object with a **queries** key whose value is an array with query option objects identical to the [`useQuery` hook](./useQuery.md) (excluding the `queryClient` option - because the `QueryClient` can be passed in on the top level).

- `queryClient?: QueryClient`
  - Use this to provide a custom QueryClient. Otherwise, the one from the nearest context will be used.
- `combine?: (result: UseQueriesResults) => TCombinedResult`
  - Use this to combine the results of the queries into a single value.

> Having the same query key more than once in the array of query objects may cause some data to be shared between queries. To avoid this, consider de-duplicating the queries and map the results back to the desired structure.

**placeholderData**

The `placeholderData` option exists for `useQueries` as well, but it doesn't get information passed from previously rendered Queries like `useQuery` does, because the input to `useQueries` can be a different number of Queries on each render.

**Returns**

The `useQueries` hook returns an array with all the query results. The order returned is the same as the input order.

## Combine

If you want to combine `data` (or other Query information) from the results into a single value, you can use the `combine` option. The result will be structurally shared to be as referentially stable as possible.

```tsx
const ids = [1, 2, 3]
const combinedQueries = useQueries({
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  })),
  combine: (results) => {
    return {
      data: results.map((result) => result.data),
      pending: results.some((result) => result.isPending),
    }
  },
})
```

In the above example, `combinedQueries` will be an object with a `data` and a `pending` property. Note that all other properties of the Query results will be lost.

### Memoization

The `combine` function will only re-run if:

- the `combine` function itself changed referentially
- any of the query results changed

This means that an inlined `combine` function, as shown above, will run on every render. To avoid this, you can wrap the `combine` function in `useCallback`, or extract it to a stable function reference if it doesn't have any dependencies.

---

## useInfiniteQuery

```tsx
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  promise,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
```

**Options**

The options for `useInfiniteQuery` are identical to the [`useQuery` hook](../reference/useQuery.md) with the addition of the following:

- `queryFn: (context: QueryFunctionContext) => Promise<TData>`
  - **Required, but only if no default query function has been defined** [`defaultQueryFn`](../guides/default-query-function.md)
  - The function that the query will use to request data.
  - Receives a [QueryFunctionContext](../guides/query-functions.md#queryfunctioncontext)
  - Must return a promise that will either resolve data or throw an error.
- `initialPageParam: TPageParam`
  - **Required**
  - The default page param to use when fetching the first page.
- `getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => TPageParam | undefined | null`
  - **Required**
  - When new data is received for this query, this function receives both the last page of the infinite list of data and the full array of all pages, as well as pageParam information.
  - It should return a **single variable** that will be passed as the last optional parameter to your query function.
  - Return `undefined` or `null` to indicate there is no next page available.
- `getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => TPageParam | undefined | null`
  - When new data is received for this query, this function receives both the first page of the infinite list of data and the full array of all pages, as well as pageParam information.
  - It should return a **single variable** that will be passed as the last optional parameter to your query function.
  - Return `undefined` or `null`to indicate there is no previous page available.
- `maxPages: number | undefined`
  - The maximum number of pages to store in the infinite query data.
  - When the maximum number of pages is reached, fetching a new page will result in the removal of either the first or last page from the pages array, depending on the specified direction.
  - If `undefined` or equals `0`, the number of pages is unlimited
  - Default value is `undefined`
  - `getNextPageParam` and `getPreviousPageParam` must be properly defined if `maxPages` value is greater than `0` to allow fetching a page in both directions when needed.

**Returns**

The returned properties for `useInfiniteQuery` are identical to the [`useQuery` hook](../reference/useQuery.md), with the addition of the following properties and a small difference in `isRefetching` and `isRefetchError`:

- `data.pages: TData[]`
  - Array containing all pages.
- `data.pageParams: unknown[]`
  - Array containing all page params.
- `isFetchingNextPage: boolean`
  - Will be `true` while fetching the next page with `fetchNextPage`.
- `isFetchingPreviousPage: boolean`
  - Will be `true` while fetching the previous page with `fetchPreviousPage`.
- `fetchNextPage: (options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>`
  - This function allows you to fetch the next "page" of results.
  - `options.cancelRefetch: boolean` if set to `true`, calling `fetchNextPage` repeatedly will invoke `queryFn` every time, whether the previous
    invocation has resolved or not. Also, the result from previous invocations will be ignored. If set to `false`, calling `fetchNextPage`
    repeatedly won't have any effect until the first invocation has resolved. Default is `true`.
- `fetchPreviousPage: (options?: FetchPreviousPageOptions) => Promise<UseInfiniteQueryResult>`
  - This function allows you to fetch the previous "page" of results.
  - `options.cancelRefetch: boolean` same as for `fetchNextPage`.
- `hasNextPage: boolean`
  - Will be `true` if there is a next page to be fetched (known via the `getNextPageParam` option).
- `hasPreviousPage: boolean`
  - Will be `true` if there is a previous page to be fetched (known via the `getPreviousPageParam` option).
- `isFetchNextPageError: boolean`
  - Will be `true` if the query failed while fetching the next page.
- `isFetchPreviousPageError: boolean`
  - Will be `true` if the query failed while fetching the previous page.
- `isRefetching: boolean`
  - Will be `true` whenever a background refetch is in-flight, which _does not_ include initial `pending` or fetching of next or previous page
  - Is the same as `isFetching && !isPending && !isFetchingNextPage && !isFetchingPreviousPage`
- `isRefetchError: boolean`
  - Will be `true` if the query failed while refetching a page.
- `promise: Promise<TData>`
  - A stable promise that resolves to the query result.
  - This can be used with `React.use()` to fetch data
  - Requires the `experimental_prefetchInRender` feature flag to be enabled on the `QueryClient`.

Keep in mind that imperative fetch calls, such as `fetchNextPage`, may interfere with the default refetch behaviour, resulting in outdated data. Make sure to call these functions only in response to user actions, or add conditions like `hasNextPage && !isFetching`.

---

## useMutation

```tsx
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate,
  mutateAsync,
  reset,
  status,
  submittedAt,
  variables,
} = useMutation(
  {
    mutationFn,
    gcTime,
    meta,
    mutationKey,
    networkMode,
    onError,
    onMutate,
    onSettled,
    onSuccess,
    retry,
    retryDelay,
    scope,
    throwOnError,
  },
  queryClient,
)

mutate(variables, {
  onError,
  onSettled,
  onSuccess,
})
```

**Parameter1 (Options)**

- `mutationFn: (variables: TVariables, context: MutationFunctionContext) => Promise<TData>`
  - **Required, but only if no default mutation function has been defined**
  - A function that performs an asynchronous task and returns a promise.
  - `variables` is an object that `mutate` will pass to your `mutationFn`
  - `context` is an object that `mutate` will pass to your `mutationFn`. Contains reference to `QueryClient`, `mutationKey` and optional `meta` object.
- `gcTime: number | Infinity`
  - The time in milliseconds that unused/inactive cache data remains in memory. When a mutation's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different cache times are specified, the longest one will be used.
  - If set to `Infinity`, will disable garbage collection
  - Note: the maximum allowed time is about [24 days](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value), although it is possible to work around this limit using [timeoutManager.setTimeoutProvider](../../../reference/timeoutManager.md#timeoutmanagersettimeoutprovider).
- `mutationKey: unknown[]`
  - Optional
  - A mutation key can be set to inherit defaults set with `queryClient.setMutationDefaults`.
- `networkMode: 'online' | 'always' | 'offlineFirst'`
  - Optional
  - defaults to `'online'`
  - see [Network Mode](../guides/network-mode.md) for more information.
- `onMutate: (variables: TVariables, context: MutationFunctionContext) => Promise<TOnMutateResult | void> | TOnMutateResult | void`
  - Optional
  - This function will fire before the mutation function is fired and is passed the same variables the mutation function would receive
  - Useful to perform optimistic updates to a resource in hopes that the mutation succeeds
  - The value returned from this function will be passed to both the `onError` and `onSettled` functions in the event of a mutation failure and can be useful for rolling back optimistic updates.
- `onSuccess: (data: TData, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => Promise<unknown> | unknown`
  - Optional
  - This function will fire when the mutation is successful and will be passed the mutation's result.
  - If a promise is returned, it will be awaited and resolved before proceeding
- `onError: (err: TError, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => Promise<unknown> | unknown`
  - Optional
  - This function will fire if the mutation encounters an error and will be passed the error.
  - If a promise is returned, it will be awaited and resolved before proceeding
- `onSettled: (data: TData, error: TError, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => Promise<unknown> | unknown`
  - Optional
  - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
  - If a promise is returned, it will be awaited and resolved before proceeding
- `retry: boolean | number | (failureCount: number, error: TError) => boolean`
  - Defaults to `0`.
  - If `false`, failed mutations will not retry.
  - If `true`, failed mutations will retry infinitely.
  - If set to an `number`, e.g. `3`, failed mutations will retry until the failed mutations count meets that number.
- `retryDelay: number | (retryAttempt: number, error: TError) => number`
  - This function receives a `retryAttempt` integer and the actual Error and returns the delay to apply before the next attempt in milliseconds.
  - A function like `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)` applies exponential backoff.
  - A function like `attempt => attempt * 1000` applies linear backoff.
- `scope: { id: string }`
  - Optional
  - Defaults to a unique id (so that all mutations run in parallel)
  - Mutations with the same scope id will run in serial
- `throwOnError: undefined | boolean | (error: TError) => boolean`
  - Set this to `true` if you want mutation errors to be thrown in the render phase and propagate to the nearest error boundary
  - Set this to `false` to disable the behavior of throwing errors to the error boundary.
  - If set to a function, it will be passed the error and should return a boolean indicating whether to show the error in an error boundary (`true`) or return the error as state (`false`)
- `meta: Record<string, unknown>`
  - Optional
  - If set, stores additional information on the mutation cache entry that can be used as needed. It will be accessible wherever the `mutation` is available (eg. `onError`, `onSuccess` functions of the `MutationCache`).

**Parameter2 (QueryClient)**

- `queryClient?: QueryClient`
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

**Returns**

- `mutate: (variables: TVariables, { onSuccess, onSettled, onError }) => void`
  - The mutation function you can call with variables to trigger the mutation and optionally hooks on additional callback options.
  - `variables: TVariables`
    - Optional
    - The variables object to pass to the `mutationFn`.
  - `onSuccess: (data: TData, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => void`
    - Optional
    - This function will fire when the mutation is successful and will be passed the mutation's result.
    - Void function, the returned value will be ignored
  - `onError: (err: TError, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => void`
    - Optional
    - This function will fire if the mutation encounters an error and will be passed the error.
    - Void function, the returned value will be ignored
  - `onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, onMutateResult: TOnMutateResult | undefined, context: MutationFunctionContext) => void`
    - Optional
    - This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
    - Void function, the returned value will be ignored
  - If you make multiple requests, `onSuccess` will fire only after the latest call you've made.
- `mutateAsync: (variables: TVariables, { onSuccess, onSettled, onError }) => Promise<TData>`
  - Similar to `mutate` but returns a promise which can be awaited.
- `status: MutationStatus`
  - Will be:
    - `idle` initial status prior to the mutation function executing.
    - `pending` if the mutation is currently executing.
    - `error` if the last mutation attempt resulted in an error.
    - `success` if the last mutation attempt was successful.
- `isIdle`, `isPending`, `isSuccess`, `isError`: boolean variables derived from `status`
- `isPaused: boolean`
  - will be `true` if the mutation has been `paused`
  - see [Network Mode](../guides/network-mode.md) for more information.
- `data: undefined | unknown`
  - Defaults to `undefined`
  - The last successfully resolved data for the mutation.
- `error: null | TError`
  - The error object for the query, if an error was encountered.
- `reset: () => void`
  - A function to clean the mutation internal state (i.e., it resets the mutation to its initial state).
- `failureCount: number`
  - The failure count for the mutation.
  - Incremented every time the mutation fails.
  - Reset to `0` when the mutation succeeds.
- `failureReason: null | TError`
  - The failure reason for the mutation retry.
  - Reset to `null` when the mutation succeeds.
- `submittedAt: number`
  - The timestamp for when the mutation was submitted.
  - Defaults to `0`.
- `variables: undefined | TVariables`
  - The `variables` object passed to the `mutationFn`.
  - Defaults to `undefined`.

---

## useIsFetching

`useIsFetching` is an optional hook that returns the `number` of the queries that your application is loading or fetching in the background (useful for app-wide loading indicators).

```tsx
import { useIsFetching } from '@tanstack/react-query'
// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
```

**Options**

- `filters?: QueryFilters`: [Query Filters](../guides/filters.md#query-filters)
- `queryClient?: QueryClient`
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

**Returns**

- `isFetching: number`
  - Will be the `number` of the queries that your application is currently loading or fetching in the background.

---

## useIsMutating

`useIsMutating` is an optional hook that returns the `number` of mutations that your application is fetching (useful for app-wide loading indicators).

```tsx
import { useIsMutating } from '@tanstack/react-query'
// How many mutations are fetching?
const isMutating = useIsMutating()
// How many mutations matching the posts prefix are fetching?
const isMutatingPosts = useIsMutating({ mutationKey: ['posts'] })
```

**Options**

- `filters?: MutationFilters`: [Mutation Filters](../guides/filters.md#mutation-filters)
- `queryClient?: QueryClient`
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

**Returns**

- `isMutating: number`
  - Will be the `number` of the mutations that your application is currently fetching.

---

## useMutationState

`useMutationState` is a hook that gives you access to all mutations in the `MutationCache`. You can pass `filters` to it to narrow down your mutations, and `select` to transform the mutation state.

**Example 1: Get all variables of all running mutations**

```tsx
import { useMutationState } from '@tanstack/react-query'

const variables = useMutationState({
  filters: { status: 'pending' },
  select: (mutation) => mutation.state.variables,
})
```

**Example 2: Get all data for specific mutations via the `mutationKey`**

```tsx
import { useMutation, useMutationState } from '@tanstack/react-query'

const mutationKey = ['posts']

// Some mutation that we want to get the state for
const mutation = useMutation({
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post('/posts', newPost)
  },
})

const data = useMutationState({
  // this mutation key needs to match the mutation key of the given mutation (see above)
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
})
```

**Example 3: Access the latest mutation data via the `mutationKey`**.
Each invocation of `mutate` adds a new entry to the mutation cache for `gcTime` milliseconds.

To access the latest invocation, you can check for the last item that `useMutationState` returns.

```tsx
import { useMutation, useMutationState } from '@tanstack/react-query'

const mutationKey = ['posts']

// Some mutation that we want to get the state for
const mutation = useMutation({
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post('/posts', newPost)
  },
})

const data = useMutationState({
  // this mutation key needs to match the mutation key of the given mutation (see above)
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
})

// Latest mutation data
const latest = data[data.length - 1]
```

**Options**

- `options`
  - `filters?: MutationFilters`: [Mutation Filters](../guides/filters.md#mutation-filters)
  - `select?: (mutation: Mutation) => TResult`
    - Use this to transform the mutation state.
- `queryClient?: QueryClient`
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

**Returns**

- `Array<TResult>`
  - Will be an Array of whatever `select` returns for each matching mutation.

---

## useSuspenseQuery

```tsx
const result = useSuspenseQuery(options)
```

**Options**

The same as for [useQuery](./useQuery.md), except for:

- `throwOnError`
- `enabled`
- `placeholderData`

**Returns**

Same object as [useQuery](./useQuery.md), except that:

- `data` is guaranteed to be defined
- `isPlaceholderData` is missing
- `status` is either `success` or `error`
  - the derived flags are set accordingly.

**Caveat**

[Cancellation](../guides/query-cancellation.md) does not work.

---

## useSuspenseInfiniteQuery

```tsx
const result = useSuspenseInfiniteQuery(options)
```

**Options**

The same as for [useInfiniteQuery](./useInfiniteQuery.md), except for:

- `suspense`
- `throwOnError`
- `enabled`
- `placeholderData`

**Returns**

Same object as [useInfiniteQuery](./useInfiniteQuery.md), except that:

- `data` is guaranteed to be defined
- `isPlaceholderData` is missing
- `status` is either `success` or `error`
  - the derived flags are set accordingly.

**Caveat**

[Cancellation](../guides/query-cancellation.md) does not work.

---

## useSuspenseQueries

```tsx
const result = useSuspenseQueries(options)
```

**Options**

The same as for [useQueries](./useQueries.md), except that each `query` can't have:

- `suspense`
- `throwOnError`
- `enabled`
- `placeholderData`

**Returns**

Same structure as [useQueries](./useQueries.md), except that for each `query`:

- `data` is guaranteed to be defined
- `isPlaceholderData` is missing
- `status` is either `success` or `error`
  - the derived flags are set accordingly.

**Caveats**

Keep in mind that the component will only re-mount after **all queries** have finished loading. Hence, if a query has gone stale in the time it took for all the queries to complete, it will be fetched again at re-mount. To avoid this, make sure to set a high enough `staleTime`.

[Cancellation](../guides/query-cancellation.md) does not work.

---

## QueryClientProvider

Use the `QueryClientProvider` component to connect and provide a `QueryClient` to your application:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

**Options**

- `client: QueryClient`
  - **Required**
  - the QueryClient instance to provide

---

## useQueryClient

The `useQueryClient` hook returns the current `QueryClient` instance.

```tsx
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient(queryClient?: QueryClient)
```

**Options**

- `queryClient?: QueryClient`
  - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

---

## queryOptions

```tsx
queryOptions({
  queryKey,
  ...options,
})
```

**Options**

You can generally pass everything to `queryOptions` that you can also pass to [`useQuery`](./useQuery.md). Some options will have no effect when then forwarded to a function like `queryClient.prefetchQuery`, but TypeScript will still be fine with those excess properties.

- `queryKey: QueryKey`
  - **Required**
  - The query key to generate options for.
- `experimental_prefetchInRender?: boolean`
  - Optional
  - Defaults to `false`
  - When set to `true`, queries will be prefetched during render, which can be useful for certain optimization scenarios
  - Needs to be turned on for the experimental `useQuery().promise` functionality

## Further reading

To learn more about `QueryOptions`, have a look at [this article by TkDodo The Query Options API](https://tkdodo.eu/blog/the-query-options-api).

---

## infiniteQueryOptions

```tsx
infiniteQueryOptions({
  queryKey,
  ...options,
})
```

**Options**

You can generally pass everything to `infiniteQueryOptions` that you can also pass to [`useInfiniteQuery`](./useInfiniteQuery.md). Some options will have no effect when then forwarded to a function like `queryClient.prefetchInfiniteQuery`, but TypeScript will still be fine with those excess properties.

- `queryKey: QueryKey`
  - **Required**
  - The query key to generate options for.

See [useInfiniteQuery](./useInfiniteQuery.md) for more information.

---

## mutationOptions

```tsx
mutationOptions({
  mutationFn,
  ...options,
})
```

**Options**

You can generally pass everything to `mutationOptions` that you can also pass to [`useMutation`](./useMutation.md).

---

## usePrefetchQuery

```tsx
usePrefetchQuery(options)
```

**Options**

You can pass everything to `usePrefetchQuery` that you can pass to [`queryClient.prefetchQuery`](../../../reference/QueryClient.md#queryclientprefetchquery). Remember that some of them are required as below:

- `queryKey: QueryKey`
  - **Required**
  - The query key to prefetch during render

- `queryFn: (context: QueryFunctionContext) => Promise<TData>`
  - **Required, but only if no default query function has been defined** See [Default Query Function](../guides/default-query-function.md) for more information.

**Returns**

The `usePrefetchQuery` does not return anything, it should be used just to fire a prefetch during render, before a suspense boundary that wraps a component that uses [`useSuspenseQuery`](./useSuspenseQuery.md).

---

## usePrefetchInfiniteQuery

```tsx
usePrefetchInfiniteQuery(options)
```

**Options**

You can pass everything to `usePrefetchInfiniteQuery` that you can pass to [`queryClient.prefetchInfiniteQuery`](../../../reference/QueryClient.md#queryclientprefetchinfinitequery). Remember that some of them are required as below:

- `queryKey: QueryKey`
  - **Required**
  - The query key to prefetch during render

- `queryFn: (context: QueryFunctionContext) => Promise<TData>`
  - **Required, but only if no default query function has been defined** See [Default Query Function](../guides/default-query-function.md) for more information.

- `initialPageParam: TPageParam`
  - **Required**
  - The default page param to use when fetching the first page.

- `getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => TPageParam | undefined | null`
  - **Required**
  - When new data is received for this query, this function receives both the last page of the infinite list of data and the full array of all pages, as well as pageParam information.
  - It should return a **single variable** that will be passed as the last optional parameter to your query function.
  - Return `undefined` or `null` to indicate there is no next page available.

- **Returns**

The `usePrefetchInfiniteQuery` does not return anything, it should be used just to fire a prefetch during render, before a suspense boundary that wraps a component that uses [`useSuspenseInfiniteQuery`](./useSuspenseInfiniteQuery.md)

---

## QueryErrorResetBoundary

When using **suspense** or **throwOnError** in your queries, you need a way to let queries know that you want to try again when re-rendering after some error occurred. With the `QueryErrorResetBoundary` component you can reset any query errors within the boundaries of the component.

```tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
          </div>
        )}
      >
        <Page />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)
```

---

## useQueryErrorResetBoundary

This hook will reset any query errors within the closest `QueryErrorResetBoundary`. If there is no boundary defined it will reset them globally:

```tsx
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <Page />
    </ErrorBoundary>
  )
}
```

---

## Hydration

### `dehydrate`

`dehydrate` creates a frozen representation of a `cache` that can later be hydrated with `HydrationBoundary` or `hydrate`. This is useful for passing prefetched queries from server to client or persisting queries to localStorage or other persistent locations. It only includes currently successful queries by default.

```tsx
import { dehydrate } from '@tanstack/react-query'

const dehydratedState = dehydrate(queryClient, {
  shouldDehydrateQuery,
  shouldDehydrateMutation,
})
```

**Options**

- `client: QueryClient`
  - **Required**
  - The `queryClient` that should be dehydrated
- `options: DehydrateOptions`
  - Optional
  - `shouldDehydrateMutation: (mutation: Mutation) => boolean`
    - Optional
    - Whether to dehydrate mutations.
    - The function is called for each mutation in the cache
      - Return `true` to include this mutation in dehydration, or `false` otherwise
    - Defaults to only including paused mutations
    - If you would like to extend the function while retaining the default behavior, import and execute `defaultShouldDehydrateMutation` as part of the return statement
  - `shouldDehydrateQuery: (query: Query) => boolean`
    - Optional
    - Whether to dehydrate queries.
    - The function is called for each query in the cache
      - Return `true` to include this query in dehydration, or `false` otherwise
    - Defaults to only including successful queries
    - If you would like to extend the function while retaining the default behavior, import and execute `defaultShouldDehydrateQuery` as part of the return statement
  - `serializeData?: (data: any) => any` A function to transform (serialize) data during dehydration.
  - `shouldRedactErrors?: (error: unknown) => boolean`
    - Optional
    - Whether to redact errors from the server during dehydration.
    - The function is called for each error in the cache
      - Return `true` to redact this error, or `false` otherwise
    - Defaults to redacting all errors

**Returns**

- `dehydratedState: DehydratedState`
  - This includes everything that is needed to hydrate the `queryClient` at a later point
  - You **should not** rely on the exact format of this response, it is not part of the public API and can change at any time
  - This result is not in serialized form, you need to do that yourself if desired

### Limitations

Some storage systems (such as browser [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)) require values to be JSON serializable. If you need to dehydrate values that are not automatically serializable to JSON (like `Error` or `undefined`), you have to serialize them for yourself. Since only successful queries are included per default, to also include `Errors`, you have to provide `shouldDehydrateQuery`, e.g.:

```tsx
// server
const state = dehydrate(client, { shouldDehydrateQuery: () => true }) // to also include Errors
const serializedState = mySerialize(state) // transform Error instances to objects

// client
const state = myDeserialize(serializedState) // transform objects back to Error instances
hydrate(client, state)
```

### `hydrate`

`hydrate` adds a previously dehydrated state into a `cache`.

```tsx
import { hydrate } from '@tanstack/react-query'

hydrate(queryClient, dehydratedState, options)
```

**Options**

- `client: QueryClient`
  - **Required**
  - The `queryClient` to hydrate the state into
- `dehydratedState: DehydratedState`
  - **Required**
  - The state to hydrate into the client
- `options: HydrateOptions`
  - Optional
  - `defaultOptions: DefaultOptions`
    - Optional
    - `mutations: MutationOptions` The default mutation options to use for the hydrated mutations.
    - `queries: QueryOptions` The default query options to use for the hydrated queries.
    - `deserializeData?: (data: any) => any` A function to transform (deserialize) data before it is put into the cache.
  - `queryClient?: QueryClient`
    - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

### Limitations

If the queries you're trying to hydrate already exist in the queryCache, `hydrate` will only overwrite them if the data is newer than the data present in the cache. Otherwise, it will **not** get applied.

### `HydrationBoundary`

`HydrationBoundary` adds a previously dehydrated state into the `queryClient` that would be returned by `useQueryClient()`. If the client already contains data, the new queries will be intelligently merged based on update timestamp.

```tsx
import { HydrationBoundary } from '@tanstack/react-query'

function App() {
  return <HydrationBoundary state={dehydratedState}>...</HydrationBoundary>
}
```

> Note: Only `queries` can be dehydrated with an `HydrationBoundary`.

**Options**

- `state: DehydratedState`
  - The state to hydrate
- `options: HydrateOptions`
  - Optional
  - `defaultOptions: QueryOptions`
    - The default query options to use for the hydrated queries.
  - `queryClient?: QueryClient`
    - Use this to use a custom QueryClient. Otherwise, the one from the nearest context will be used.

---

## QueryClient

### `QueryClient`

The `QueryClient` can be used to interact with a cache:

```tsx
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: fetchPosts })
```

Its available methods are:

- [`queryClient.fetchQuery`](#queryclientfetchquery)
- [`queryClient.fetchInfiniteQuery`](#queryclientfetchinfinitequery)
- [`queryClient.prefetchQuery`](#queryclientprefetchquery)
- [`queryClient.prefetchInfiniteQuery`](#queryclientprefetchinfinitequery)
- [`queryClient.getQueryData`](#queryclientgetquerydata)
- [`queryClient.ensureQueryData`](#queryclientensurequerydata)
- [`queryClient.ensureInfiniteQueryData`](#queryclientensureinfinitequerydata)
- [`queryClient.getQueriesData`](#queryclientgetqueriesdata)
- [`queryClient.setQueryData`](#queryclientsetquerydata)
- [`queryClient.getQueryState`](#queryclientgetquerystate)
- [`queryClient.setQueriesData`](#queryclientsetqueriesdata)
- [`queryClient.invalidateQueries`](#queryclientinvalidatequeries)
- [`queryClient.refetchQueries`](#queryclientrefetchqueries)
- [`queryClient.cancelQueries`](#queryclientcancelqueries)
- [`queryClient.removeQueries`](#queryclientremovequeries)
- [`queryClient.resetQueries`](#queryclientresetqueries)
- [`queryClient.isFetching`](#queryclientisfetching)
- [`queryClient.isMutating`](#queryclientismutating)
- [`queryClient.getDefaultOptions`](#queryclientgetdefaultoptions)
- [`queryClient.setDefaultOptions`](#queryclientsetdefaultoptions)
- [`queryClient.getQueryDefaults`](#queryclientgetquerydefaults)
- [`queryClient.setQueryDefaults`](#queryclientsetquerydefaults)
- [`queryClient.getMutationDefaults`](#queryclientgetmutationdefaults)
- [`queryClient.setMutationDefaults`](#queryclientsetmutationdefaults)
- [`queryClient.getQueryCache`](#queryclientgetquerycache)
- [`queryClient.getMutationCache`](#queryclientgetmutationcache)
- [`queryClient.clear`](#queryclientclear)
- [`queryClient.resumePausedMutations`](#queryclientresumepausedmutations)

**Options**

- `queryCache?: QueryCache`
  - Optional
  - The query cache this client is connected to.
- `mutationCache?: MutationCache`
  - Optional
  - The mutation cache this client is connected to.
- `defaultOptions?: DefaultOptions`
  - Optional
  - Define defaults for all queries and mutations using this queryClient.
  - You can also define defaults to be used for [hydration](../framework/react/reference/hydration.md)

### `queryClient.fetchQuery`

`fetchQuery` is an asynchronous method that can be used to fetch and cache a query. It will either resolve with the data or throw with the error. Use the `prefetchQuery` method if you just want to fetch a query without needing the result.

If the query exists and the data is not invalidated or older than the given `staleTime`, then the data from the cache will be returned. Otherwise it will try to fetch the latest data.

```tsx
try {
  const data = await queryClient.fetchQuery({ queryKey, queryFn })
} catch (error) {
  console.log(error)
}
```

Specify a `staleTime` to only fetch when the data is older than a certain amount of time:

```tsx
try {
  const data = await queryClient.fetchQuery({
    queryKey,
    queryFn,
    staleTime: 10000,
  })
} catch (error) {
  console.log(error)
}
```

**Options**

The options for `fetchQuery` are exactly the same as those of [`useQuery`](../framework/react/reference/useQuery.md), except the following: `enabled, refetchInterval, refetchIntervalInBackground, refetchOnWindowFocus, refetchOnReconnect, refetchOnMount, notifyOnChangeProps, throwOnError, select, suspense, placeholderData`; which are strictly for useQuery and useInfiniteQuery. You can check the [source code](https://github.com/TanStack/query/blob/7cd2d192e6da3df0b08e334ea1cf04cd70478827/packages/query-core/src/types.ts#L119) for more clarity.

**Returns**

- `Promise<TData>`

### `queryClient.fetchInfiniteQuery`

`fetchInfiniteQuery` is similar to `fetchQuery` but can be used to fetch and cache an infinite query.

```tsx
try {
  const data = await queryClient.fetchInfiniteQuery({ queryKey, queryFn })
  console.log(data.pages)
} catch (error) {
  console.log(error)
}
```

**Options**

The options for `fetchInfiniteQuery` are exactly the same as those of [`fetchQuery`](#queryclientfetchquery).

**Returns**

- `Promise<InfiniteData<TData, TPageParam>>`

### `queryClient.prefetchQuery`

`prefetchQuery` is an asynchronous method that can be used to prefetch a query before it is needed or rendered with `useQuery` and friends. The method works the same as `fetchQuery` except that it will not throw or return any data.

```tsx
await queryClient.prefetchQuery({ queryKey, queryFn })
```

You can even use it with a default queryFn in your config!

```tsx
await queryClient.prefetchQuery({ queryKey })
```

**Options**

The options for `prefetchQuery` are exactly the same as those of [`fetchQuery`](#queryclientfetchquery).

**Returns**

- `Promise<void>`
  - A promise is returned that will either immediately resolve if no fetch is needed or after the query has been executed. It will not return any data or throw any errors.

### `queryClient.prefetchInfiniteQuery`

`prefetchInfiniteQuery` is similar to `prefetchQuery` but can be used to prefetch and cache an infinite query.

```tsx
await queryClient.prefetchInfiniteQuery({ queryKey, queryFn })
```

**Options**

The options for `prefetchInfiniteQuery` are exactly the same as those of [`fetchQuery`](#queryclientfetchquery).

**Returns**

- `Promise<void>`
  - A promise is returned that will either immediately resolve if no fetch is needed or after the query has been executed. It will not return any data or throw any errors.

### `queryClient.getQueryData`

`getQueryData` is a synchronous function that can be used to get an existing query's cached data. If the query does not exist, `undefined` will be returned.

```tsx
const data = queryClient.getQueryData(queryKey)
```

**Options**

- `queryKey: QueryKey`: [Query Keys](../framework/react/guides/query-keys.md)

**Returns**

- `data: TQueryFnData | undefined`
  - The data for the cached query, or `undefined` if the query does not exist.

### `queryClient.ensureQueryData`

`ensureQueryData` is an asynchronous function that can be used to get an existing query's cached data. If the query does not exist, `queryClient.fetchQuery` will be called and its results returned.

```tsx
const data = await queryClient.ensureQueryData({ queryKey, queryFn })
```

**Options**

- the same options as [`fetchQuery`](#queryclientfetchquery)
- `revalidateIfStale: boolean`
  - Optional
  - Defaults to `false`
  - If set to `true`, stale data will be refetched in the background, but cached data will be returned immediately.

**Returns**

- `Promise<TData>`

### `queryClient.ensureInfiniteQueryData`

`ensureInfiniteQueryData` is an asynchronous function that can be used to get an existing infinite query's cached data. If the query does not exist, `queryClient.fetchInfiniteQuery` will be called and its results returned.

```tsx
const data = await queryClient.ensureInfiniteQueryData({
  queryKey,
  queryFn,
  initialPageParam,
  getNextPageParam,
})
```

**Options**

- the same options as [`fetchInfiniteQuery`](#queryclientfetchinfinitequery)
- `revalidateIfStale: boolean`
  - Optional
  - Defaults to `false`
  - If set to `true`, stale data will be refetched in the background, but cached data will be returned immediately.

**Returns**

- `Promise<InfiniteData<TData, TPageParam>>`

### `queryClient.getQueriesData`

`getQueriesData` is a synchronous function that can be used to get the cached data of multiple queries. Only queries that match the passed queryKey or queryFilter will be returned. If there are no matching queries, an empty array will be returned.

```tsx
const data = queryClient.getQueriesData(filters)
```

**Options**

- `filters: QueryFilters`: [Query Filters](../framework/react/guides/filters.md#query-filters)
  - if a filter is passed, the data with queryKeys matching the filter will be returned

**Returns**

- `[queryKey: QueryKey, data: TQueryFnData | undefined][]`
  - An array of tuples for the matched query keys, or `[]` if there are no matches. The tuples are the query key and its associated data.

**Caveats**

Because the returned data in each tuple can be of varying structures (i.e. using a filter to return "active" queries can return different data types), the `TData` generic defaults to `unknown`. If you provide a more specific type to `TData` it is assumed that you are certain each tuple's data entry is all the same type.

This distinction is more a "convenience" for ts devs that know which structure will be returned.

### `queryClient.setQueryData`

`setQueryData` is a synchronous function that can be used to immediately update a query's cached data. If the query does not exist, it will be created. **If the query is not utilized by a query hook within the default `gcTime`, the query will be garbage collected. If the default `gcTime` has not been configured, it defaults to 5 minutes.** To update multiple queries at once and match query keys partially, you need to use [`queryClient.setQueriesData`](#queryclientsetqueriesdata) instead.

> The difference between using `setQueryData` and `fetchQuery` is that `setQueryData` is sync and assumes that you already synchronously have the data available. If you need to fetch the data asynchronously, it's suggested that you either refetch the query key or use `fetchQuery` to handle the asynchronous fetch.

```tsx
queryClient.setQueryData(queryKey, updater)
```

**Options**

- `queryKey: QueryKey`: [Query Keys](../framework/react/guides/query-keys.md)
- `updater: TQueryFnData | undefined | ((oldData: TQueryFnData | undefined) => TQueryFnData | undefined)`
  - If non-function is passed, the data will be updated to this value
  - If a function is passed, it will receive the old data value and be expected to return a new one.

**Using an updater value**

```tsx
setQueryData(queryKey, newData)
```

If the value is `undefined`, the query data is not updated.

**Using an updater function**

For convenience in syntax, you can also pass an updater function which receives the current data value and returns the new one:

```tsx
setQueryData(queryKey, (oldData) => newData)
```

If the updater function returns `undefined`, the query data will not be updated. If the updater function receives `undefined` as input, you can return `undefined` to bail out of the update and thus _not_ create a new cache entry.

**Immutability**

Updates via `setQueryData` must be performed in an _immutable_ way. **DO NOT** attempt to write directly to the cache by mutating `oldData` or data that you retrieved via `getQueryData` in place.

### `queryClient.getQueryState`

`getQueryState` is a synchronous function that can be used to get an existing query's state. If the query does not exist, `undefined` will be returned.

```tsx
const state = queryClient.getQueryState(queryKey)
console.log(state.dataUpdatedAt)
```

**Options**

- `queryKey: QueryKey`: [Query Keys](../framework/react/guides/query-keys.md)

### `queryClient.setQueriesData`

`setQueriesData` is a synchronous function that can be used to immediately update cached data of multiple queries by using filter function or partially matching the query key. Only queries that match the passed queryKey or queryFilter will be updated - no new cache entries will be created. Under the hood, [`setQueryData`](#queryclientsetquerydata) is called for each existing query.

```tsx
queryClient.setQueriesData(filters, updater)
```

**Options**

- `filters: QueryFilters`: [Query Filters](../framework/react/guides/filters.md#query-filters)
  - if a filter is passed, queryKeys matching the filter will be updated
- `updater: TQueryFnData | (oldData: TQueryFnData | undefined) => TQueryFnData`
  - the [setQueryData](#queryclientsetquerydata) updater function or new data, will be called for each matching queryKey

### `queryClient.invalidateQueries`

The `invalidateQueries` method can be used to invalidate and refetch single or multiple queries in the cache based on their query keys or any other functionally accessible property/state of the query. By default, all matching queries are immediately marked as invalid and active queries are refetched in the background.

- If you **do not want active queries to refetch**, and simply be marked as invalid, you can use the `refetchType: 'none'` option.
- If you **want inactive queries to refetch** as well, use the `refetchType: 'all'` option
- For refetching, [queryClient.refetchQueries](#queryclientrefetchqueries) is called.

```tsx
await queryClient.invalidateQueries(
  {
    queryKey: ['posts'],
    exact,
    refetchType: 'active',
  },
  { throwOnError, cancelRefetch },
)
```

**Options**

- `filters?: QueryFilters`: [Query Filters](../framework/react/guides/filters.md#query-filters)
  - `queryKey?: QueryKey`: [Query Keys](../framework/react/guides/query-keys.md)
  - `refetchType?: 'active' | 'inactive' | 'all' | 'none'`
    - Defaults to `'active'`
    - When set to `active`, only queries that match the refetch predicate and are actively being rendered via `useQuery` and friends will be refetched in the background.
    - When set to `inactive`, only queries that match the refetch predicate and are NOT actively being rendered via `useQuery` and friends will be refetched in the background.
    - When set to `all`, all queries that match the refetch predicate will be refetched in the background.
    - When set to `none`, no queries will be refetched, and those that match the refetch predicate will be marked as invalid only.
- `options?: InvalidateOptions`:
  - `throwOnError?: boolean`
    - When set to `true`, this method will throw if any of the query refetch tasks fail.
  - `cancelRefetch?: boolean`
    - Defaults to `true`
      - Per default, a currently running request will be cancelled before a new request is made
    - When set to `false`, no refetch will be made if there is already a request running.

**Notes**

- Unlike [`refetchQueries`](#queryclientrefetchqueries), `invalidateQueries` marks matching queries as invalidated and then refetches `active` queries (unless otherwise specified with the `refetchType` option).
- Unlike [`removeQueries`](#queryclientremovequeries), `invalidateQueries` keeps matching queries in the cache.

### `queryClient.refetchQueries`

The `refetchQueries` method can be used to refetch queries based on certain conditions.

Examples:

```tsx
// refetch all queries:
await queryClient.refetchQueries()

// refetch all stale queries:
await queryClient.refetchQueries({ stale: true })

// refetch all active queries partially matching a query key:
await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })

// refetch all active queries exactly matching a query key:
await queryClient.refetchQueries({
  queryKey: ['posts', 1],
  type: 'active',
  exact: true,
})
```

**Options**

- `filters?: QueryFilters`: [Query Filters](../framework/react/guides/filters.md#query-filters)
- `options?: RefetchOptions`:
  - `throwOnError?: boolean`
    - When set to `true`, this method will throw if any of the query refetch tasks fail.
  - `cancelRefetch?: boolean`
    - Defaults to `true`
      - Per default, a currently running request will be cancelled before a new request is made
    - When set to `false`, no refetch will be made if there is already a request running.

**Returns**

This function returns a promise that will resolve when all of the queries are done being refetched. By default, it **will not** throw an error if any of those queries refetches fail, but this can be configured by setting the `throwOnError` option to `true`

**Notes**

- Queries that are "disabled" because they only have disabled Observers will never be refetched.
- Queries that are "static" because they only have Observers with a Static StaleTime will never be refetched.
- Unlike [`invalidateQueries`](#queryclientinvalidatequeries), `refetchQueries` refetches all matching queries.

### `queryClient.cancelQueries`

The `cancelQueries` method can be used to cancel outgoing queries based on their query keys or any other functionally accessible property/state of the query.

This is most useful when performing optimistic updates since you will likely need to cancel any outgoing query refetches so they don't clobber your optimistic update when they resolve.

```tsx
await queryClient.cancelQueries(
  { queryKey: ['posts'], exact: true },
  { silent: true },
)
```

**Options**

- `filters?: QueryFilters`: [Query Filters](../framework/react/guides/filters.md#query-filters)
- `cancelOptions?: CancelOptions`: [Cancel Options](../framework/react/guides/query-cancellation.md#cancel-options)

**Returns**

This method does not return anything

### `queryClient.removeQueries`

The `removeQueries` method can be used to remove queries from the cache based on their query keys or any other functionally accessible property/state of the query.

```tsx
queryClient.removeQueries({ queryKey, exact: true })
```

**Options**

- `filters?: QueryFilters`: [Query Filters](../framework/react/guides/filters.md#query-filters)

**Returns**

This method does not return anything

**Notes**

- Unlike [`invalidateQueries`](#queryclientinvalidatequeries) or [`refetchQueries`](#queryclientrefetchqueries), `removeQueries` removes matching queries from the cache instead of refetching them.

### `queryClient.resetQueries`

The `resetQueries` method can be used to reset queries in the cache to their
initial state based on their query keys or any other functionally accessible
property/state of the query.

This will notify subscribers &mdash; unlike `clear`, which removes all
subscribers &mdash; and reset the query to its pre-loaded state &mdash; unlike
`invalidateQueries`. If a query has `initialData`, the query's data will be
reset to that. If a query is active, it will be refetched.

```tsx
queryClient.resetQueries({ queryKey, exact: true })
```

**Options**

- `filters?: QueryFilters`: [Query Filters](../framework/react/guides/filters.md#query-filters)
- `options?: ResetOptions`:
  - `throwOnError?: boolean`
    - When set to `true`, this method will throw if any of the query refetch tasks fail.
  - `cancelRefetch?: boolean`
    - Defaults to `true`
      - Per default, a currently running request will be cancelled before a new request is made
    - When set to `false`, no refetch will be made if there is already a request running.

**Returns**

This method returns a promise that resolves when all active queries have been refetched.

### `queryClient.isFetching`

This `isFetching` method returns an `integer` representing how many queries, if any, in the cache are currently fetching (including background-fetching, loading new pages, or loading more infinite query results)

```tsx
if (queryClient.isFetching()) {
  console.log('At least one query is fetching!')
}
```

TanStack Query also exports a handy [`useIsFetching`](../framework/react/reference/useIsFetching.md) hook that will let you subscribe to this state in your components without creating a manual subscription to the query cache.

**Options**

- `filters?: QueryFilters`: [Query Filters](../framework/react/guides/filters.md#query-filters)

**Returns**

This method returns the number of fetching queries.

### `queryClient.isMutating`

This `isMutating` method returns an `integer` representing how many mutations, if any, in the cache are currently fetching.

```tsx
if (queryClient.isMutating()) {
  console.log('At least one mutation is fetching!')
}
```

TanStack Query also exports a handy [`useIsMutating`](../framework/react/reference/useIsMutating.md) hook that will let you subscribe to this state in your components without creating a manual subscription to the mutation cache.

**Options**

- `filters: MutationFilters`: [Mutation Filters](../framework/react/guides/filters.md#mutation-filters)

**Returns**

This method returns the number of fetching mutations.

### `queryClient.getDefaultOptions`

The `getDefaultOptions` method returns the default options which have been set when creating the client or with `setDefaultOptions`.

```tsx
const defaultOptions = queryClient.getDefaultOptions()
```

### `queryClient.setDefaultOptions`

The `setDefaultOptions` method can be used to dynamically set the default options for this queryClient. Previously defined default options will be overwritten.

```tsx
queryClient.setDefaultOptions({
  queries: {
    staleTime: Infinity,
  },
})
```

### `queryClient.getQueryDefaults`

The `getQueryDefaults` method returns the default options which have been set for specific queries:

```tsx
const defaultOptions = queryClient.getQueryDefaults(['posts'])
```

> Note that if several query defaults match the given query key, they will be merged together based on the order of registration.
> See [`setQueryDefaults`](#queryclientsetquerydefaults).

### `queryClient.setQueryDefaults`

`setQueryDefaults` can be used to set default options for specific queries:

```tsx
queryClient.setQueryDefaults(['posts'], { queryFn: fetchPosts })

function Component() {
  const { data } = useQuery({ queryKey: ['posts'] })
}
```

**Options**

- `queryKey: QueryKey`: [Query Keys](../framework/react/guides/query-keys.md)
- `options: QueryOptions`

> As stated in [`getQueryDefaults`](#queryclientgetquerydefaults), the order of registration of query defaults does matter.
> Since the matching defaults are merged by `getQueryDefaults`, the registration should be made in the following order: from the **most generic key** to the **least generic one** .
> This way, more specific defaults will override more generic defaults.

### `queryClient.getMutationDefaults`

The `getMutationDefaults` method returns the default options which have been set for specific mutations:

```tsx
const defaultOptions = queryClient.getMutationDefaults(['addPost'])
```

### `queryClient.setMutationDefaults`

`setMutationDefaults` can be used to set default options for specific mutations:

```tsx
queryClient.setMutationDefaults(['addPost'], { mutationFn: addPost })

function Component() {
  const { data } = useMutation({ mutationKey: ['addPost'] })
}
```

**Options**

- `mutationKey: unknown[]`
- `options: MutationOptions`

> Similar to [`setQueryDefaults`](#queryclientsetquerydefaults), the order of registration does matter here.

### `queryClient.getQueryCache`

The `getQueryCache` method returns the query cache this client is connected to.

```tsx
const queryCache = queryClient.getQueryCache()
```

### `queryClient.getMutationCache`

The `getMutationCache` method returns the mutation cache this client is connected to.

```tsx
const mutationCache = queryClient.getMutationCache()
```

### `queryClient.clear`

The `clear` method clears all connected caches.

```tsx
queryClient.clear()
```

### `queryClient.resumePausedMutations`

Can be used to resume mutations that have been paused because there was no network connection.

```tsx
queryClient.resumePausedMutations()
```

---

## QueryCache

The `QueryCache` is the storage mechanism for TanStack Query. It stores all the data, meta information and state of queries it contains.

**Normally, you will not interact with the QueryCache directly and instead use the `QueryClient` for a specific cache.**

```tsx
import { QueryCache } from '@tanstack/react-query'

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error)
  },
  onSuccess: (data) => {
    console.log(data)
  },
  onSettled: (data, error) => {
    console.log(data, error)
  },
})

const query = queryCache.find({ queryKey: ['posts'] })
```

Its available methods are:

- [`queryCache.find`](#querycachefind)
- [`queryCache.findAll`](#querycachefindall)
- [`queryCache.subscribe`](#querycachesubscribe)
- [`queryCache.clear`](#querycacheclear)
- [Further reading](#further-reading)

**Options**

- `onError?: (error: unknown, query: Query) => void`
  - Optional
  - This function will be called if some query encounters an error.
- `onSuccess?: (data: unknown, query: Query) => void`
  - Optional
  - This function will be called if some query is successful.
- `onSettled?: (data: unknown | undefined, error: unknown | null, query: Query) => void`
  - Optional
  - This function will be called if some query is settled (either successful or errored).

### `queryCache.find`

`find` is a slightly more advanced synchronous method that can be used to get an existing query instance from the cache. This instance not only contains **all** the state for the query, but all of the instances, and underlying guts of the query as well. If the query does not exist, `undefined` will be returned.

> Note: This is not typically needed for most applications, but can come in handy when needing more information about a query in rare scenarios (eg. Looking at the query.state.dataUpdatedAt timestamp to decide whether a query is fresh enough to be used as an initial value)

```tsx
const query = queryCache.find({ queryKey })
```

**Options**

- `filters: QueryFilters`: [Query Filters](../framework/react/guides/filters#query-filters)
  - `queryKey: QueryKey`: [Query Keys](../framework/react/guides/query-keys.md)

**Returns**

- `Query`
  - The query instance from the cache

### `queryCache.findAll`

`findAll` is even more advanced synchronous method that can be used to get existing query instances from the cache that partially match query key. If queries do not exist, empty array will be returned.

> Note: This is not typically needed for most applications, but can come in handy when needing more information about a query in rare scenarios

```tsx
const queries = queryCache.findAll({ queryKey })
```

**Options**

- `filters?: QueryFilters`: [Query Filters](../framework/react/guides/filters.md#query-filters)

**Returns**

- `Query[]`
  - Query instances from the cache

### `queryCache.subscribe`

The `subscribe` method can be used to subscribe to the query cache as a whole and be informed of safe/known updates to the cache like query states changing or queries being updated, added or removed

```tsx
const callback = (event) => {
  console.log(event.type, event.query)
}

const unsubscribe = queryCache.subscribe(callback)
```

**Options**

- `callback: (event: QueryCacheNotifyEvent) => void`
  - This function will be called with the query cache any time it is updated via its tracked update mechanisms (eg, `query.setState`, `queryClient.removeQueries`, etc). Out of scope mutations to the cache are not encouraged and will not fire subscription callbacks

**Returns**

- `unsubscribe: Function => void`
  - This function will unsubscribe the callback from the query cache.

### `queryCache.clear`

The `clear` method can be used to clear the cache entirely and start fresh.

```tsx
queryCache.clear()
```

## Further reading

To get a better understanding how the QueryCache works internally, have a look at [the Inside React Query article by TkDodo](https://tkdodo.eu/blog/inside-react-query).

---

## MutationCache

The `MutationCache` is the storage for mutations.

**Normally, you will not interact with the MutationCache directly and instead use the `QueryClient`.**

```tsx
import { MutationCache } from '@tanstack/react-query'

const mutationCache = new MutationCache({
  onError: (error) => {
    console.log(error)
  },
  onSuccess: (data) => {
    console.log(data)
  },
})
```

Its available methods are:

- [`getAll`](#mutationcachegetall)
- [`subscribe`](#mutationcachesubscribe)
- [`clear`](#mutationcacheclear)

**Options**

- `onError?: (error: unknown, variables: unknown, onMutateResult: unknown, mutation: Mutation, mutationFnContext: MutationFunctionContext) => Promise<unknown> | unknown`
  - Optional
  - This function will be called if some mutation encounters an error.
  - If you return a Promise from it, it will be awaited
- `onSuccess?: (data: unknown, variables: unknown, onMutateResult: unknown, mutation: Mutation, mutationFnContext: MutationFunctionContext) => Promise<unknown> | unknown`
  - Optional
  - This function will be called if some mutation is successful.
  - If you return a Promise from it, it will be awaited
- `onSettled?: (data: unknown | undefined, error: unknown | null, variables: unknown, onMutateResult: unknown, mutation: Mutation, mutationFnContext: MutationFunctionContext) => Promise<unknown> | unknown`
  - Optional
  - This function will be called if some mutation is settled (either successful or errored).
  - If you return a Promise from it, it will be awaited
- `onMutate?: (variables: unknown, mutation: Mutation, mutationFnContext: MutationFunctionContext) => Promise<unknown> | unknown`
  - Optional
  - This function will be called before some mutation executes.
  - If you return a Promise from it, it will be awaited

## Global callbacks

The `onError`, `onSuccess`, `onSettled` and `onMutate` callbacks on the MutationCache can be used to handle these events on a global level. They are different to `defaultOptions` provided to the QueryClient because:

- `defaultOptions` can be overridden by each Mutation - the global callbacks will **always** be called.
- `onMutate` does not allow returning a result.

### `mutationCache.getAll`

`getAll` returns all mutations within the cache.

> Note: This is not typically needed for most applications, but can come in handy when needing more information about a mutation in rare scenarios

```tsx
const mutations = mutationCache.getAll()
```

**Returns**

- `Mutation[]`
  - Mutation instances from the cache

### `mutationCache.subscribe`

The `subscribe` method can be used to subscribe to the mutation cache as a whole and be informed of safe/known updates to the cache like mutation states changing or mutations being updated, added or removed.

```tsx
const callback = (event) => {
  console.log(event.type, event.mutation)
}

const unsubscribe = mutationCache.subscribe(callback)
```

**Options**

- `callback: (mutation?: MutationCacheNotifyEvent) => void`
  - This function will be called with the mutation cache any time it is updated.

**Returns**

- `unsubscribe: Function => void`
  - This function will unsubscribe the callback from the mutation cache.

### `mutationCache.clear`

The `clear` method can be used to clear the cache entirely and start fresh.

```tsx
mutationCache.clear()
```

---

## QueryObserver

The `QueryObserver` can be used to observe and switch between queries.

```tsx
const observer = new QueryObserver(queryClient, { queryKey: ['posts'] })

const unsubscribe = observer.subscribe((result) => {
  console.log(result)
  unsubscribe()
})
```

**Options**

The options for the `QueryObserver` are exactly the same as those of [`useQuery`](../framework/react/reference/useQuery).

---

## InfiniteQueryObserver

### `InfiniteQueryObserver`

The `InfiniteQueryObserver` can be used to observe and switch between infinite queries.

```tsx
const observer = new InfiniteQueryObserver(queryClient, {
  queryKey: ['posts'],
  queryFn: fetchPosts,
  getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
})

const unsubscribe = observer.subscribe((result) => {
  console.log(result)
  unsubscribe()
})
```

**Options**

The options for the `InfiniteQueryObserver` are exactly the same as those of [`useInfiniteQuery`](../framework/react/reference/useInfiniteQuery).

---

## QueriesObserver

### `QueriesObserver`

The `QueriesObserver` can be used to observe multiple queries.

```tsx
const observer = new QueriesObserver(queryClient, [
  { queryKey: ['post', 1], queryFn: fetchPost },
  { queryKey: ['post', 2], queryFn: fetchPost },
])

const unsubscribe = observer.subscribe((result) => {
  console.log(result)
  unsubscribe()
})
```

**Options**

The options for the `QueriesObserver` are exactly the same as those of [`useQueries`](../framework/react/reference/useQueries).

---

## streamedQuery

`streamedQuery` is a helper function to create a query function that streams data from an [AsyncIterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator). Data will be an Array of all the chunks received. The query will be in a `pending` state until the first chunk of data is received, but will go to `success` after that. The query will stay in fetchStatus `fetching` until the stream ends.

To see `streamedQuery` in action, take a look at our chat example in the [examples/react/chat directory on GitHub](https://github.com/TanStack/query/tree/main/examples/react/chat).

```tsx
import { experimental_streamedQuery as streamedQuery } from '@tanstack/react-query'

const query = queryOptions({
  queryKey: ['data'],
  queryFn: streamedQuery({
    streamFn: fetchDataInChunks,
  }),
})
```

> Note: `streamedQuery` is currently marked as `experimental` because we want to gather feedback from the community. If you've tried out the API and have feedback for us, please provide it in this [GitHub discussion](https://github.com/TanStack/query/discussions/9065).

**Options**

- `streamFn: (context: QueryFunctionContext) => Promise<AsyncIterable<TData>>`
  - **Required**
  - The function that returns a Promise of an AsyncIterable with data to stream in.
  - Receives a [QueryFunctionContext](../framework/react/guides/query-functions.md#queryfunctioncontext)
- `refetchMode?: 'append' | 'reset' | 'replace'`
  - Optional
  - Defines how refetches are handled.
  - Defaults to `'reset'`
  - When set to `'reset'`, the query will erase all data and go back into `pending` state.
  - When set to `'append'`, data will be appended to existing data.
  - When set to `'replace'`, all data will be written to the cache once the stream ends.
- `reducer?: (accumulator: TData, chunk: TQueryFnData) => TData`
  - Optional
  - Reduces streamed chunks (`TQueryFnData`) into the final data shape (`TData`).
  - Default: appends each chunk to the end of the accumulator when `TData` is an array.
  - If `TData` is not an array, you must provide a custom `reducer`.
- `initialValue?: TData = TQueryFnData`
  - Optional
  - Defines the initial data to be used while the first chunk is being fetched, and it is also returned when the stream yields no values.
  - It is mandatory when custom `reducer` is provided.
  - Defaults to an empty array.

---

## focusManager

The `FocusManager` manages the focus state within TanStack Query.

It can be used to change the default event listeners or to manually change the focus state.

Its available methods are:

- [`setEventListener`](#focusmanagerseteventlistener)
- [`subscribe`](#focusmanagersubscribe)
- [`setFocused`](#focusmanagersetfocused)
- [`isFocused`](#focusmanagerisfocused)

### `focusManager.setEventListener`

`setEventListener` can be used to set a custom event listener:

```tsx
import { focusManager } from '@tanstack/react-query'

focusManager.setEventListener((handleFocus) => {
  // Listen to visibilitychange
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('visibilitychange', handleFocus, false)
  }

  return () => {
    // Be sure to unsubscribe if a new handler is set
    window.removeEventListener('visibilitychange', handleFocus)
  }
})
```

### `focusManager.subscribe`

`subscribe` can be used to subscribe to changes in the visibility state. It returns an unsubscribe function:

```tsx
import { focusManager } from '@tanstack/react-query'

const unsubscribe = focusManager.subscribe((isVisible) => {
  console.log('isVisible', isVisible)
})
```

### `focusManager.setFocused`

`setFocused` can be used to manually set the focus state. Set `undefined` to fall back to the default focus check.

```tsx
import { focusManager } from '@tanstack/react-query'

// Set focused
focusManager.setFocused(true)

// Set unfocused
focusManager.setFocused(false)

// Fallback to the default focus check
focusManager.setFocused(undefined)
```

**Options**

- `focused: boolean | undefined`

### `focusManager.isFocused`

`isFocused` can be used to get the current focus state.

```tsx
const isFocused = focusManager.isFocused()
```

---

## onlineManager

The `OnlineManager` manages the online state within TanStack Query. It can be used to change the default event listeners or to manually change the online state.

> Per default, the `onlineManager` assumes an active network connection, and listens to the `online` and `offline` events on the `window` object to detect changes.

> In previous versions, `navigator.onLine` was used to determine the network status. However, it doesn't work well in Chromium based browsers. There are [a lot of issues](https://bugs.chromium.org/p/chromium/issues/list?q=navigator.online) around false negatives, which lead to Queries being wrongfully marked as `offline`.

> To circumvent this, we now always start with `online: true` and only listen to `online` and `offline` events to update the status.

> This should reduce the likelihood of false negatives, however, it might mean false positives for offline apps that load via serviceWorkers, which can work even without an internet connection.

Its available methods are:

- [`setEventListener`](#onlinemanagerseteventlistener)
- [`subscribe`](#onlinemanagersubscribe)
- [`setOnline`](#onlinemanagersetonline)
- [`isOnline`](#onlinemanagerisonline)

### `onlineManager.setEventListener`

`setEventListener` can be used to set a custom event listener:

```tsx
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})
```

### `onlineManager.subscribe`

`subscribe` can be used to subscribe to changes in the online state. It returns an unsubscribe function:

```tsx
import { onlineManager } from '@tanstack/react-query'

const unsubscribe = onlineManager.subscribe((isOnline) => {
  console.log('isOnline', isOnline)
})
```

### `onlineManager.setOnline`

`setOnline` can be used to manually set the online state.

```tsx
import { onlineManager } from '@tanstack/react-query'

// Set to online
onlineManager.setOnline(true)

// Set to offline
onlineManager.setOnline(false)
```

**Options**

- `online: boolean`

### `onlineManager.isOnline`

`isOnline` can be used to get the current online state.

```tsx
const isOnline = onlineManager.isOnline()
```

---

## environmentManager

The `environmentManager` manages how TanStack Query detects whether the current runtime should be treated as server-side.

By default, it uses the same server detection as the exported `isServer` utility from query-core.

Use this manager to override server detection globally for runtimes that are not traditional browser/server environments (for example, extension workers).

Its available methods are:

- [`isServer`](#environmentmanagerisserver)
- [`setIsServer`](#environmentmanagersetisserver)

### `environmentManager.isServer`

Returns whether the current runtime is treated as a server environment.

```tsx
import { environmentManager } from '@tanstack/react-query'

const server = environmentManager.isServer()
```

### `environmentManager.setIsServer`

Overrides the server check globally.

```tsx
import { environmentManager } from '@tanstack/react-query'

// Override
environmentManager.setIsServer(() => {
  return typeof window === 'undefined' && !('chrome' in globalThis)
})
```

**Options**

- `isServerValue: () => boolean`

To restore the default behavior, set the function back to query-core's `isServer` utility:

```tsx
import { environmentManager, isServer } from '@tanstack/react-query'

environmentManager.setIsServer(() => isServer)
```

---

## notifyManager

The `notifyManager` handles scheduling and batching callbacks in TanStack Query.

It exposes the following methods:

- [batch](#notifymanagerbatch)
- [batchCalls](#notifymanagerbatchcalls)
- [schedule](#notifymanagerschedule)
- [setNotifyFunction](#notifymanagersetnotifyfunction)
- [setBatchNotifyFunction](#notifymanagersetbatchnotifyfunction)
- [setScheduler](#notifymanagersetscheduler)

### `notifyManager.batch`

`batch` can be used to batch all updates scheduled inside the passed callback.
This is mainly used internally to optimize queryClient updating.

```ts
function batch<T>(callback: () => T): T
```

### `notifyManager.batchCalls`

`batchCalls` is a higher-order function that takes a callback and wraps it.
All calls to the wrapped function schedule the callback to be run on the next batch.

```ts
type BatchCallsCallback<T extends Array<unknown>> = (...args: T) => void

function batchCalls<T extends Array<unknown>>(
  callback: BatchCallsCallback<T>,
): BatchCallsCallback<T>
```

### `notifyManager.schedule`

`schedule` schedules a function to be run on the next batch. By default, the batch is run
with a setTimeout, but this can be configured.

```ts
function schedule(callback: () => void): void
```

### `notifyManager.setNotifyFunction`

`setNotifyFunction` overrides the notify function. This function is passed the
callback when it should be executed. The default notifyFunction just calls it.

This can be used to for example wrap notifications with `React.act` while running tests:

```ts
import { notifyManager } from '@tanstack/react-query'
import { act } from 'react-dom/test-utils'

notifyManager.setNotifyFunction(act)
```

### `notifyManager.setBatchNotifyFunction`

`setBatchNotifyFunction` sets the function to use for batched updates

If your framework supports a custom batching function, you can let TanStack Query know about it by calling notifyManager.setBatchNotifyFunction.

For example, this is how the batch function is set in solid-query:

```ts
import { notifyManager } from '@tanstack/query-core'
import { batch } from 'solid-js'

notifyManager.setBatchNotifyFunction(batch)
```

### `notifyManager.setScheduler`

`setScheduler` configures a custom callback that should schedules when the next
batch runs. The default behaviour is `setTimeout(callback, 0)`.

```ts
import { notifyManager } from '@tanstack/react-query'

// Schedule batches in the next microtask
notifyManager.setScheduler(queueMicrotask)

// Schedule batches before the next frame is rendered
notifyManager.setScheduler(requestAnimationFrame)

// Schedule batches some time in the future
notifyManager.setScheduler((cb) => setTimeout(cb, 10))
```

---

## timeoutManager

The `TimeoutManager` handles `setTimeout` and `setInterval` timers in TanStack Query.

TanStack Query uses timers to implement features like query `staleTime` and `gcTime`, as well as retries, throttling, and debouncing.

By default, TimeoutManager uses the global `setTimeout` and `setInterval`, but it can be configured to use custom implementations instead.

Its available methods are:

- [`timeoutManager.setTimeoutProvider`](#timeoutmanagersettimeoutprovider)
  - [`TimeoutProvider`](#timeoutprovider)
- [`timeoutManager.setTimeout`](#timeoutmanagersettimeout)
- [`timeoutManager.clearTimeout`](#timeoutmanagercleartimeout)
- [`timeoutManager.setInterval`](#timeoutmanagersetinterval)
- [`timeoutManager.clearInterval`](#timeoutmanagerclearinterval)

### `timeoutManager.setTimeoutProvider`

`setTimeoutProvider` can be used to set a custom implementation of the `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` functions, called a `TimeoutProvider`.

This may be useful if you notice event loop performance issues with thousands of queries. A custom TimeoutProvider could also support timer delays longer than the global `setTimeout` maximum delay value of about [24 days](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#maximum_delay_value).

It is important to call `setTimeoutProvider` before creating a QueryClient or queries, so that the same provider is used consistently for all timers in the application, since different TimeoutProviders cannot cancel each others' timers.

```tsx
import { timeoutManager, QueryClient } from '@tanstack/react-query'
import { CustomTimeoutProvider } from './CustomTimeoutProvider'

timeoutManager.setTimeoutProvider(new CustomTimeoutProvider())

export const queryClient = new QueryClient()
```

### `TimeoutProvider`

Timers are very performance sensitive. Short term timers (such as those with delays less than 5 seconds) tend to be latency sensitive, where long-term timers may benefit more from [timer coalescing](https://en.wikipedia.org/wiki/Timer_coalescing) - batching timers with similar deadlines together - using a data structure like a [hierarchical time wheel](https://www.npmjs.com/package/timer-wheel).

The `TimeoutProvider` type requires that implementations handle timer ID objects that can be converted to `number` via [Symbol.toPrimitive][toPrimitive] because runtimes like NodeJS return [objects][nodejs-timeout] from their global `setTimeout` and `setInterval` functions. TimeoutProvider implementations are free to coerce timer IDs to number internally, or to return their own custom object type that implements `{ [Symbol.toPrimitive]: () => number }`.

[nodejs-timeout]: https://nodejs.org/api/timers.html#class-timeout
[toPrimitive]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive

```tsx
type ManagedTimerId = number | { [Symbol.toPrimitive]: () => number }

type TimeoutProvider<TTimerId extends ManagedTimerId = ManagedTimerId> = {
  readonly setTimeout: (callback: TimeoutCallback, delay: number) => TTimerId
  readonly clearTimeout: (timeoutId: TTimerId | undefined) => void

  readonly setInterval: (callback: TimeoutCallback, delay: number) => TTimerId
  readonly clearInterval: (intervalId: TTimerId | undefined) => void
}
```

### `timeoutManager.setTimeout`

`setTimeout(callback, delayMs)` schedules a callback to run after approximately `delay` milliseconds, like the global [setTimeout function](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout).The callback can be canceled with `timeoutManager.clearTimeout`.

It returns a timer ID, which may be a number or an object that can be coerced to a number via [Symbol.toPrimitive][toPrimitive].

```tsx
import { timeoutManager } from '@tanstack/react-query'

const timeoutId = timeoutManager.setTimeout(
  () => console.log('ran at:', new Date()),
  1000,
)

const timeoutIdNumber: number = Number(timeoutId)
```

### `timeoutManager.clearTimeout`

`clearTimeout(timerId)` cancels a timeout callback scheduled with `setTimeout`, like the global [clearTimeout function](https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout). It should be called with a timer ID returned by `timeoutManager.setTimeout`.

```tsx
import { timeoutManager } from '@tanstack/react-query'

const timeoutId = timeoutManager.setTimeout(
  () => console.log('ran at:', new Date()),
  1000,
)

timeoutManager.clearTimeout(timeoutId)
```

### `timeoutManager.setInterval`

`setInterval(callback, intervalMs)` schedules a callback to be called approximately every `intervalMs`, like the global [setInterval function](https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval).

Like `setTimeout`, it returns a timer ID, which may be a number or an object that can be coerced to a number via [Symbol.toPrimitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive).

```tsx
import { timeoutManager } from '@tanstack/react-query'

const intervalId = timeoutManager.setInterval(
  () => console.log('ran at:', new Date()),
  1000,
)
```

### `timeoutManager.clearInterval`

`clearInterval(intervalId)` can be used to cancel an interval, like the global [clearInterval function](https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval). It should be called with an interval ID returned by `timeoutManager.setInterval`.

```tsx
import { timeoutManager } from '@tanstack/react-query'

const intervalId = timeoutManager.setInterval(
  () => console.log('ran at:', new Date()),
  1000,
)

timeoutManager.clearInterval(intervalId)
```

---

All 32 pages fetched successfully with no errors. This covers the complete TanStack Query React API Reference (20 pages) and Core API Reference (12 pages).

</task>

---

## ESLint Plugin Query

TanStack Query comes with its own ESLint plugin. This plugin is used to enforce best practices and to help you avoid common mistakes.

## Installation

The plugin is a separate package that you need to install:

```bash
npm i -D @tanstack/eslint-plugin-query
```

```bash
pnpm add -D @tanstack/eslint-plugin-query
```

```bash
yarn add -D @tanstack/eslint-plugin-query
```

```bash
bun add -D @tanstack/eslint-plugin-query
```

## Flat Config (`eslint.config.js`)

### Recommended setup

To enable all of the recommended rules for our plugin, add the following config:

```js
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  ...pluginQuery.configs['flat/recommended'],
]
```

### Recommended strict setup

```js
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  ...pluginQuery.configs['flat/recommended-strict'],
]
```

### Custom setup

```js
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  {
    plugins: {
      '@tanstack/query': pluginQuery,
    },
    rules: {
      '@tanstack/query/exhaustive-deps': 'error',
    },
  },
]
```

## Legacy Config (`.eslintrc`)

### Recommended setup

```json
{
  "extends": ["plugin:@tanstack/query/recommended"]
}
```

### Recommended strict setup

```json
{
  "extends": ["plugin:@tanstack/query/recommendedStrict"]
}
```

### Custom setup

```json
{
  "plugins": ["@tanstack/query"],
  "rules": {
    "@tanstack/query/exhaustive-deps": "error"
  }
}
```

## Rules

- [@tanstack/query/exhaustive-deps](./exhaustive-deps.md)
- [@tanstack/query/no-rest-destructuring](./no-rest-destructuring.md)
- [@tanstack/query/stable-query-client](./stable-query-client.md)
- [@tanstack/query/no-unstable-deps](./no-unstable-deps.md)
- [@tanstack/query/infinite-query-property-order](./infinite-query-property-order.md)
- [@tanstack/query/no-void-query-fn](./no-void-query-fn.md)
- [@tanstack/query/mutation-property-order](./mutation-property-order.md)
- [@tanstack/query/prefer-query-options](./prefer-query-options.md)

---

## Exhaustive Deps

Query keys should be seen like a dependency array to your query function: Every variable that is used inside the queryFn should be added to the query key. This makes sure that queries are cached independently and that queries are refetched automatically when the variables changes.

**Incorrect**:

```tsx
useQuery({
  queryKey: ['todo'],
  queryFn: () => api.getTodo(todoId),
})
```

**Correct**:

```tsx
useQuery({
  queryKey: ['todo', todoId],
  queryFn: () => api.getTodo(todoId),
})
```

- ✅ Recommended
- 🔧 Fixable

---

## Stable Query Client

The QueryClient should only be created once, not on every render.

**Incorrect**:

```tsx
function App() {
  const queryClient = new QueryClient()
  ...
}
```

**Correct**:

```tsx
function App() {
  const [queryClient] = useState(() => new QueryClient())
  ...
}
```

or

```tsx
const queryClient = new QueryClient()
function App() { ... }
```

- ✅ Recommended
- 🔧 Fixable

---

## No Rest Destructuring

Disallow object rest destructuring on query results (which subscribes to all fields).

**Incorrect**:

```tsx
const { data: todos, ...rest } = useQuery({...})
```

**Correct**:

```tsx
const { data: todos } = useQuery({...})
```

- ✅ Recommended

---

## No Unstable Deps

Disallow putting the result of query hooks directly in a React hook dependency array.

**Incorrect**:

```tsx
const mutation = useMutation({...})
useEffect(() => { mutation.mutate() }, [mutation])
```

**Correct**:

```tsx
const { mutate } = useMutation({...})
useEffect(() => { mutate() }, [mutate])
```

- ✅ Recommended

---

## Infinite Query Property Order

Ensure correct order of inference-sensitive properties for infinite queries. Order: `queryFn`, `getPreviousPageParam`, `getNextPageParam`.

- ✅ Recommended
- 🔧 Fixable

---

## No Void Query Functions

Query functions must return a value (not void).

**Incorrect**:

```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: async () => { await api.todos.fetch() },
})
```

**Correct**:

```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: async () => { return await api.todos.fetch() },
})
```

- ✅ Recommended

---

## Mutation Property Order

Ensure correct property order in `useMutation()`. Order: `onMutate`, `onError`, `onSettled`.

- ✅ Recommended
- 🔧 Fixable

---

## Prefer Query Options

Prefer the use of `queryOptions` to co-locate keys and functions.

**Incorrect**:

```tsx
useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
```

**Correct**:

```tsx
function todoOptions() {
  return queryOptions({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}
useQuery(todoOptions())
```

- ✅ Recommended (strict)

---

## Community Resources

Community resources for TanStack Query:

- [TanStack Query Course](https://query.gg?s=tanstack)
- [React Query as a State Manager](https://tkdodo.eu/blog/react-query-as-a-state-manager)
- [Practical React Query](https://tkdodo.eu/blog/practical-react-query)
- [Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query)
- [React Query and TypeScript](https://tkdodo.eu/blog/react-query-and-type-script)
- [Type-safe React Query](https://tkdodo.eu/blog/type-safe-react-query)
- [The Query Options API](https://tkdodo.eu/blog/the-query-options-api)
- [Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys)
- [Query Key Factory Package](https://github.com/lukemorales/query-key-factory)
- [Concurrent Optimistic Updates](https://tkdodo.eu/blog/concurrent-optimistic-updates-in-react-query)
- [Automatic Query Invalidation after Mutations](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)
- [Status Checks in React Query](https://tkdodo.eu/blog/status-checks-in-react-query)