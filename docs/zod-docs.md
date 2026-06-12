# Zod Documentation

> Scraped from https://zod.dev

---


## Zod

> Introduction to Zod - TypeScript-first schema validation library with static type inference

_Source: [https://zod.dev/](https://zod.dev/)_

# Zod

TypeScript-first schema validation with static type inference  
by [@colinhacks](https://x.com/colinhacks)

  

[Website](https://zod.dev)  •  [Discord](https://discord.gg/RcG33DQJdf)  •  [𝕏](https://twitter.com/colinhacks)  •  [Bluesky](https://bsky.app/profile/zod.dev)

  


Zod 4 is stable. Read the [release notes](/v4) and [migration guide](/v4/changelog).

  
  
  

## [Introduction](?id=introduction#introduction)

Zod is a TypeScript-first validation library. Using Zod, you can define *schemas* you can use to validate data, from a simple `string` to a complex nested object.

```
import * as z from "zod";
 
const User = z.object({
  name: z.string(),
});
 
// some untrusted data...
const input = { /* stuff */ };
 
// the parsed result is validated and type safe!
const data = User.parse(input);
 
// so you can use it with confidence :)
console.log(data.name);
```

## [Features](?id=features#features)

* Zero external dependencies
* Works in Node.js and all modern browsers
* Tiny: 2kb core bundle (gzipped)
* Immutable API: methods return a new instance
* Concise interface
* Works with TypeScript and plain JS
* Built-in JSON Schema conversion
* Extensive ecosystem

## [Installation](?id=installation#installation)

```
npm install zod
```

Zod is also available as `@zod/zod` on [jsr.io](https://jsr.io/@zod/zod).

Zod provides an MCP server that can be used by agents to search Zod's docs. To add to your editor, follow [these instructions](https://share.inkeep.com/zod/mcp). Zod also provides an [llms.txt](https://zod.dev/llms.txt) file.

## [Requirements](?id=requirements#requirements)

Zod is tested against *TypeScript v5.5* and later. Older versions may work but are not officially supported.

### [`"strict"`](?id=strict#strict)

You must enable `strict` mode in your `tsconfig.json`. This is a best practice for all TypeScript projects.

```
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "strict": true
  }
}
```

## [Ecosystem](?id=ecosystem#ecosystem)

Zod has a thriving ecosystem of libraries, tools, and integrations. Refer to the [Ecosystem page](/ecosystem) for a complete list of libraries that support Zod or are built on top of it.

* [Resources](/ecosystem?id=resources)
* [API Libraries](/ecosystem?id=api-libraries)
* [Form Integrations](/ecosystem?id=form-integrations)
* [Zod to X](/ecosystem?id=zod-to-x)
* [X to Zod](/ecosystem?id=x-to-zod)
* [Mocking Libraries](/ecosystem?id=mocking-libraries)
* [Powered by Zod](/ecosystem?id=powered-by-zod)

I also contribute to the following projects, which I'd like to highlight:

* [tRPC](https://trpc.io) - End-to-end typesafe APIs, with support for Zod schemas
* [React Hook Form](https://react-hook-form.com) - Hook-based form validation with a [Zod resolver](https://react-hook-form.com/docs/useform#resolver)
* [zshy](https://github.com/colinhacks/zshy) - Originally created as Zod's internal build tool. Bundler-free, batteries-included build tool for TypeScript libraries. Powered by `tsc`.

## [Sponsors](?id=sponsors#sponsors)

Sponsorship at any level is appreciated and encouraged. If you built a paid product using Zod, consider one of the [corporate tiers](https://github.com/sponsors/colinhacks).

### [Platinum](?id=platinum#platinum)

Cut code review time & bugs in half

[coderabbit.ai](https://www.coderabbit.ai/)

  

### [Gold](?id=gold#gold)

Social APIs for developers and AI agents

[zernio.com](https://zernio.com/?utm_source=zod)

Serverless Postgres — Ship faster

[neon.tech](https://neon.tech)

Generate best-in-class SDKs

[stainlessapi.com](https://stainlessapi.com)

  

### [Silver](?id=silver#silver)

[sanity.io](https://www.sanity.io/)

[subtotal.com](https://www.subtotal.com/?utm_source=zod)

[nitric.io](https://nitric.io/)

[propelauth.com](https://www.propelauth.com/)

[cerbos.dev](https://cerbos.dev/)

[scalar.com](https://scalar.com/)

[transloadit.com](https://transloadit.com/?utm_source=zod&utm_medium=referral&utm_campaign=sponsorship&utm_content=github)

[whop.com](https://whop.com/)

[cryptojobslist.com](https://cryptojobslist.com/)

[plain.com](https://plain.com/)

[inngest.com](https://inngest.com/)

[storyblok.com](https://storyblok.com/)

[mux.link/zod](https://mux.link/zod)

[cybozu.co.jp](https://www.cybozu.co.jp/)

[9thco.com](https://www.9thco.com/?utm_source=zod)

[ferry.health](https://ferry.health/?utm_source=zod)

  

### [Bronze](?id=bronze#bronze)

[github.com/jasonLaster](https://github.com/jasonLaster)

[clipboardhealth.com/engineering](https://www.clipboardhealth.com/engineering)

[convex.dev](https://convex.dev/?utm_source=zod)

[n8n.io](https://n8n.io/?utm_source=zod)

---

## Defining schemas

> Complete API reference for all Zod schema types, methods, and validation features

_Source: [https://zod.dev/api](https://zod.dev/api)_

To validate data, you must first define a *schema*. Schemas represent *types*, from simple primitive values to complex nested objects and arrays.

## [Primitives](?id=primitives#primitives)

```
import * as z from "zod";
 
// primitive types
z.string();
z.number();
z.bigint();
z.boolean();
z.symbol();
z.undefined();
z.null();
```

### [Coercion](?id=coercion#coercion)

To coerce input data to the appropriate type, use `z.coerce` instead:

```
z.coerce.string();    // String(input)
z.coerce.number();    // Number(input)
z.coerce.boolean();   // Boolean(input)
z.coerce.bigint();    // BigInt(input)
```

The coerced variant of these schemas attempts to convert the input value to the appropriate type.

```
const schema = z.coerce.string();
 
schema.parse("tuna");    // => "tuna"
schema.parse(42);        // => "42"
schema.parse(true);      // => "true"
schema.parse(null);      // => "null"
```

The input type of these coerced schemas is `unknown` by default. To specify a more specific input type, pass a generic parameter:

```
const A = z.coerce.number();
type AInput = z.input<typeof A>; // => unknown
 
const B = z.coerce.number<number>();
type BInput = z.input<typeof B>; // => number
```

### How coercion works in Zod

### Customizing the input type

## [Literals](?id=literals#literals)

Literal schemas represent a [literal type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types), like `"hello world"` or `5`.

```
const tuna = z.literal("tuna");
const twelve = z.literal(12);
const twobig = z.literal(2n);
const tru = z.literal(true);
```

To represent the JavaScript literals `null` and `undefined`:

```
z.null();
z.undefined();
z.void(); // equivalent to z.undefined()
```

To allow multiple literal values:

```
const colors = z.literal(["red", "green", "blue"]);
 
colors.parse("green"); // ✅
colors.parse("yellow"); // ❌
```

To extract the set of allowed values from a literal schema:

ZodZod Mini

```
colors.values; // => Set<"red" | "green" | "blue">
```

## [Strings](?id=strings#strings)

Zod provides a handful of built-in string validation and transform APIs. To perform some common string validations:

ZodZod Mini

```
z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().regex(/^[a-z]+$/);
z.string().startsWith("aaa");
z.string().endsWith("zzz");
z.string().includes("---");
z.string().uppercase();
z.string().lowercase();
```

To perform some simple string transforms:

ZodZod Mini

```
z.string().trim(); // trim whitespace
z.string().toLowerCase(); // toLowerCase
z.string().toUpperCase(); // toUpperCase
z.string().normalize(); // normalize unicode characters
```

## [String formats](?id=string-formats#string-formats)

To validate against some common string formats:

```
z.email();
z.uuid();
z.url();
z.httpUrl();       // http or https URLs only
z.hostname();
z.e164();          // E.164 phone numbers
z.emoji();         // validates a single emoji character
z.base64();
z.base64url();
z.hex();
z.jwt();
z.nanoid();
z.cuid();
z.cuid2();
z.ulid();
z.ipv4();
z.ipv6();
z.mac();
z.cidrv4();        // ipv4 CIDR block
z.cidrv6();        // ipv6 CIDR block
z.hash("sha256");  // or "sha1", "sha384", "sha512", "md5"
z.iso.date();
z.iso.time();
z.iso.datetime();
z.iso.duration();
```

### [Emails](?id=emails#emails)

To validate email addresses:

```
z.email();
```

By default, Zod uses a comparatively strict email regex designed to validate normal email addresses containing common characters. It's roughly equivalent to the rules enforced by Gmail. To learn more about this regex, refer to [this post](https://colinhacks.com/essays/reasonable-email-regex).

```
/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i
```

To customize the email validation behavior, you can pass a custom regular expression to the `pattern` param.

```
z.email({ pattern: /your regex here/ });
```

Zod exports several useful regexes you could use.

```
// Zod's default email regex
z.email();
z.email({ pattern: z.regexes.email }); // equivalent
 
// the regex used by browsers to validate input[type=email] fields
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
z.email({ pattern: z.regexes.html5Email });
 
// the classic emailregex.com regex (RFC 5322)
z.email({ pattern: z.regexes.rfc5322Email });
 
// a loose regex that allows Unicode (good for intl emails)
z.email({ pattern: z.regexes.unicodeEmail });
```

### [UUIDs](?id=uuids#uuids)

To validate UUIDs:

```
z.uuid();
```

To specify a particular UUID version:

```
// supports "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8"
z.uuid({ version: "v4" });
 
// for convenience
z.uuidv4();
z.uuidv6();
z.uuidv7();
```

The RFC 9562/4122 UUID spec requires the first two bits of byte 8 to be `10`. Other UUID-like identifiers do not enforce this constraint. To validate any UUID-like identifier:

```
z.guid();
```

### [URLs](?id=urls#urls)

To validate any WHATWG-compatible URL:

```
const schema = z.url();
 
schema.parse("https://example.com"); // ✅
schema.parse("http://localhost"); // ✅
schema.parse("mailto:[email protected]"); // ✅
```

As you can see this is quite permissive. Internally this uses the `new URL()` constructor to validate inputs; this behavior may differ across platforms and runtimes but it's the mostly rigorous way to validate URIs/URLs on any given JS runtime/engine.

To validate the hostname against a specific regex:

```
const schema = z.url({ hostname: /^example\.com$/ });
 
schema.parse("https://example.com"); // ✅
schema.parse("https://zombo.com"); // ❌
```

To validate the protocol against a specific regex, use the `protocol` param.

```
const schema = z.url({ protocol: /^https$/ });
 
schema.parse("https://example.com"); // ✅
schema.parse("http://example.com"); // ❌
```

**Web URLs** — In many cases, you'll want to validate Web URLs specifically. Here's the recommended schema for doing so:

```
const httpUrl = z.url({
  protocol: /^https?$/,
  hostname: z.regexes.domain
});
```

This restricts the protocol to `http`/`https` and ensures the hostname is a valid domain name with the `z.regexes.domain` regular expression:

```
/^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
```

To normalize URLs, use the `normalize` flag. This will overwrite the input value with the [normalized URL](https://chatgpt.com/share/6881547f-bebc-800f-9093-f5981e277c2c) returned by `new URL()`.

```
new URL("HTTP://ExAmPle.com:80/./a/../b?X=1#f oo").href
// => "http://example.com/b?X=1#f%20oo"
```

### [Phone numbers](?id=phone-numbers#phone-numbers)

To validate phone numbers in E.164 format:

```
const phone = z.e164();
 
phone.parse("+15555555555"); // ✅
phone.parse("555-555-5555"); // ❌
```

This schema validates strings with a leading `+`, a non-zero country code, and 7 to 15 digits total.

### [ISO datetimes](?id=iso-datetimes#iso-datetimes)

As you may have noticed, Zod string includes a few date/time related validations. These validations are regular expression based, so they are not as strict as a full date/time library. However, they are very convenient for validating user input.

The `z.iso.datetime()` method enforces ISO 8601; by default, no timezone offsets are allowed:

```
const datetime = z.iso.datetime();
 
datetime.parse("2020-01-01T06:15:00Z"); // ✅
datetime.parse("2020-01-01T06:15:00.123Z"); // ✅
datetime.parse("2020-01-01T06:15:00.123456Z"); // ✅ (arbitrary precision)
datetime.parse("2020-01-01T06:15:00+02:00"); // ❌ (offsets not allowed)
datetime.parse("2020-01-01T06:15:00"); // ❌ (local not allowed)
```

To allow timezone offsets:

```
const datetime = z.iso.datetime({ offset: true });
 
// allows timezone offsets
datetime.parse("2020-01-01T06:15:00+02:00"); // ✅
 
// basic offsets not allowed
datetime.parse("2020-01-01T06:15:00+02");    // ❌
datetime.parse("2020-01-01T06:15:00+0200");  // ❌
 
// Z is still supported
datetime.parse("2020-01-01T06:15:00Z"); // ✅
```

To allow unqualified (timezone-less) datetimes:

```
const schema = z.iso.datetime({ local: true });
schema.parse("2020-01-01T06:15:01"); // ✅
schema.parse("2020-01-01T06:15"); // ✅ seconds optional
```

To constrain the allowable time `precision`. By default, seconds are optional and arbitrary sub-second precision is allowed.

```
const a = z.iso.datetime();
a.parse("2020-01-01T06:15Z"); // ✅
a.parse("2020-01-01T06:15:00Z"); // ✅
a.parse("2020-01-01T06:15:00.123Z"); // ✅
 
const b = z.iso.datetime({ precision: -1 }); // minute precision (no seconds)
b.parse("2020-01-01T06:15Z"); // ✅
b.parse("2020-01-01T06:15:00Z"); // ❌
b.parse("2020-01-01T06:15:00.123Z"); // ❌
 
const c = z.iso.datetime({ precision: 0 }); // second precision only
c.parse("2020-01-01T06:15Z"); // ❌
c.parse("2020-01-01T06:15:00Z"); // ✅
c.parse("2020-01-01T06:15:00.123Z"); // ❌
 
const d = z.iso.datetime({ precision: 3 }); // millisecond precision only
d.parse("2020-01-01T06:15Z"); // ❌
d.parse("2020-01-01T06:15:00Z"); // ❌
d.parse("2020-01-01T06:15:00.123Z"); // ✅
```

### [ISO dates](?id=iso-dates#iso-dates)

The `z.iso.date()` method validates strings in the format `YYYY-MM-DD`.

```
const date = z.iso.date();
 
date.parse("2020-01-01"); // ✅
date.parse("2020-1-1"); // ❌
date.parse("2020-01-32"); // ❌
```

### [ISO times](?id=iso-times#iso-times)

The `z.iso.time()` method validates strings in the format `HH:MM[:SS[.s+]]`. By default seconds are optional, as are sub-second decimals.

```
const time = z.iso.time();
 
time.parse("03:15"); // ✅
time.parse("03:15:00"); // ✅
time.parse("03:15:00.9999999"); // ✅ (arbitrary precision)
```

No offsets of any kind are allowed.

```
time.parse("03:15:00Z"); // ❌ (no `Z` allowed)
time.parse("03:15:00+02:00"); // ❌ (no offsets allowed)
```

Use the `precision` parameter to constrain the allowable decimal precision.

```
z.iso.time({ precision: -1 }); // HH:MM (minute precision)
z.iso.time({ precision: 0 });  // HH:MM:SS (second precision)
z.iso.time({ precision: 1 });  // HH:MM:SS.s (decisecond precision)
z.iso.time({ precision: 2 });  // HH:MM:SS.ss (centisecond precision)
z.iso.time({ precision: 3 });  // HH:MM:SS.sss (millisecond precision)
```

### [IP addresses](?id=ip-addresses#ip-addresses)

```
const ipv4 = z.ipv4();
ipv4.parse("192.168.0.0"); // ✅
 
const ipv6 = z.ipv6();
ipv6.parse("2001:db8:85a3::8a2e:370:7334"); // ✅
```

### [IP blocks (CIDR)](?id=ip-blocks-cidr#ip-blocks-cidr)

Validate IP address ranges specified with [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).

```
const cidrv4 = z.cidrv4();
cidrv4.parse("192.168.0.0/24"); // ✅
 
const cidrv6 = z.cidrv6();
cidrv6.parse("2001:db8::/32"); // ✅
```

### [MAC Addresses](?id=mac-addresses#mac-addresses)

Validate standard 48-bit MAC address [IEEE 802](https://en.wikipedia.org/wiki/MAC_address).

```
const mac = z.mac(); 
mac.parse("00:1A:2B:3C:4D:5E");  // ✅
mac.parse("00-1a-2b-3c-4d-5e");  // ❌ colon-delimited by default
mac.parse("001A:2B3C:4D5E");     // ❌ standard formats only
mac.parse("00:1A:2b:3C:4d:5E");  // ❌ no mixed case
 
// custom delimiter
const dashMac = z.mac({ delimiter: "-" });
dashMac.parse("00-1A-2B-3C-4D-5E"); // ✅
```

### [JWTs](?id=jwts#jwts)

Validate [JSON Web Tokens](https://jwt.io/).

```
z.jwt();
z.jwt({ alg: "HS256" });
```

### [Hashes](?id=hashes#hashes)

To validate cryptographic hash values:

```
z.hash("md5");
z.hash("sha1");
z.hash("sha256");
z.hash("sha384");
z.hash("sha512");
```

By default, `z.hash()` expects hexadecimal encoding, as is conventional. You can specify a different encoding with the `enc` parameter:

```
z.hash("sha256", { enc: "hex" });       // default
z.hash("sha256", { enc: "base64" });    // base64 encoding
z.hash("sha256", { enc: "base64url" }); // base64url encoding (no padding)
```

### Expected lengths and padding

### [Custom formats](?id=custom-formats#custom-formats)

To define your own string formats:

```
const coolId = z.stringFormat("cool-id", (val)=>{
  // arbitrary validation here
  return val.length === 100 && val.startsWith("cool-");
});
 
// a regex is also accepted
z.stringFormat("cool-id", /^cool-[a-z0-9]{95}$/);
```

This schema will produce `"invalid_format"` issues, which are more descriptive than the `"custom"` errors produced by refinements or `z.custom()`.

```
myFormat.parse("invalid input!");
// ZodError: [
//   {
//     "code": "invalid_format",
//     "format": "cool-id",
//     "path": [],
//     "message": "Invalid cool-id"
//   }
// ]
```

## [Template literals](?id=template-literals#template-literals)

Introduced in `[email protected]`.

To define a template literal schema:

```
const schema = z.templateLiteral([ "hello, ", z.string(), "!" ]);
// `hello, ${string}!`
```

The `z.templateLiteral` API can handle any number of string literals (e.g. `"hello"`) and schemas. Any schema with an inferred type that's assignable to `string | number | bigint | boolean | null | undefined` can be passed.

```
z.templateLiteral([ "hi there" ]);
// `hi there`
 
z.templateLiteral([ "email: ", z.string() ]);
// `email: ${string}`
 
z.templateLiteral([ "high", z.literal(5) ]);
// `high5`
 
z.templateLiteral([ z.nullable(z.literal("grassy")) ]);
// `grassy` | `null`
 
z.templateLiteral([ z.number(), z.enum(["px", "em", "rem"]) ]);
// `${number}px` | `${number}em` | `${number}rem`
```

## [Numbers](?id=numbers#numbers)

Use `z.number()` to validate numbers. It allows any finite number.

```
const schema = z.number();
 
schema.parse(3.14);      // ✅
schema.parse(NaN);       // ❌
schema.parse(Infinity);  // ❌
```

Zod implements a handful of number-specific validations:

ZodZod Mini

```
z.number().gt(5);
z.number().gte(5);                     // alias .min(5)
z.number().lt(5);
z.number().lte(5);                     // alias .max(5)
z.number().positive();                 // alias .gt(0)
z.number().nonnegative();    
z.number().negative(); 
z.number().nonpositive(); 
z.number().multipleOf(5);              // alias .step(5)
```

If (for some reason) you want to validate `NaN`, use `z.nan()`.

```
z.nan().parse(NaN);              // ✅
z.nan().parse("anything else");  // ❌
```

## [Integers](?id=integers#integers)

To validate integers:

```
z.int();     // restricts to safe integer range
z.int32();   // restrict to int32 range
```

## [BigInts](?id=bigints#bigints)

To validate BigInts:

```
z.bigint();
```

Zod includes a handful of bigint-specific validations.

ZodZod Mini

```
z.bigint().gt(5n);
z.bigint().gte(5n);                    // alias `.min(5n)`
z.bigint().lt(5n);
z.bigint().lte(5n);                    // alias `.max(5n)`
z.bigint().positive();                 // alias `.gt(0n)`
z.bigint().nonnegative(); 
z.bigint().negative(); 
z.bigint().nonpositive(); 
z.bigint().multipleOf(5n);             // alias `.step(5n)`
```

## [Booleans](?id=booleans#booleans)

To validate boolean values:

```
z.boolean().parse(true); // => true
z.boolean().parse(false); // => false
```

## [Dates](?id=dates#dates)

Use `z.date()` to validate `Date` instances.

```
z.date().safeParse(new Date()); // success: true
z.date().safeParse("2022-01-12T06:15:00.000Z"); // success: false
```

To customize the error message:

```
z.date({
  error: issue => issue.input === undefined ? "Required" : "Invalid date"
});
```

Zod provides a handful of date-specific validations.

ZodZod Mini

```
z.date().min(new Date("1900-01-01"), { error: "Too old!" });
z.date().max(new Date(), { error: "Too young!" });
```

## [Enums](?id=enums#enums)

Use `z.enum` to validate inputs against a fixed set of allowable *string* values.

```
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
 
FishEnum.parse("Salmon"); // => "Salmon"
FishEnum.parse("Swordfish"); // => ❌
```

Careful — If you declare your string array as a variable, Zod won't be able to properly infer the exact values of each element.

```
const fish = ["Salmon", "Tuna", "Trout"];
 
const FishEnum = z.enum(fish);
type FishEnum = z.infer<typeof FishEnum>; // string
```

To fix this, always pass the array directly into the `z.enum()` function, or use [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions).

```
const fish = ["Salmon", "Tuna", "Trout"] as const;
 
const FishEnum = z.enum(fish);
type FishEnum = z.infer<typeof FishEnum>; // "Salmon" | "Tuna" | "Trout"
```

Enum-like object literals (`{ [key: string]: string | number }`) are supported.

```
const Fish = {
  Salmon: 0,
  Tuna: 1
} as const
 
const FishEnum = z.enum(Fish)
FishEnum.parse(Fish.Salmon); // => ✅
FishEnum.parse(0); // => ✅
FishEnum.parse(2); // => ❌
```

You can also pass in an externally-declared TypeScript enum.

```
enum Fish {
  Salmon = 0,
  Tuna = 1
}
 
const FishEnum = z.enum(Fish);
FishEnum.parse(Fish.Salmon); // => ✅
FishEnum.parse(0); // => ✅
FishEnum.parse(2); // => ❌
```

Use `z.enum()` for externally declared TypeScript enums. The `z.nativeEnum()` API is deprecated.

Note that using TypeScript's `enum` keyword is [not recommended](https://www.totaltypescript.com/why-i-dont-like-typescript-enums).

```
enum Fish {
  Salmon = "Salmon",
  Tuna = "Tuna",
  Trout = "Trout",
}
 
const FishEnum = z.enum(Fish);
```

### [`.enum`](?id=enum#enum)

To extract the schema's values as an enum-like object:

ZodZod Mini

```
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
 
FishEnum.enum;
// => { Salmon: "Salmon", Tuna: "Tuna", Trout: "Trout" }
```

### [`.exclude()`](?id=exclude#exclude)

To create a new enum schema, excluding certain values:

ZodZod Mini

```
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
const TunaOnly = FishEnum.exclude(["Salmon", "Trout"]);
```

### [`.extract()`](?id=extract#extract)

To create a new enum schema, extracting certain values:

ZodZod Mini

```
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);
const SalmonAndTroutOnly = FishEnum.extract(["Salmon", "Trout"]);
```

## [Stringbools](?id=stringbool#stringbool)

Introduced in `[email protected]`.

In some cases (e.g. parsing environment variables) it's valuable to parse certain string "boolish" values to a plain `boolean` value. Use `z.stringbool()` for this:

```
const strbool = z.stringbool();
 
strbool.parse("true")         // => true
strbool.parse("1")            // => true
strbool.parse("yes")          // => true
strbool.parse("on")           // => true
strbool.parse("y")            // => true
strbool.parse("enabled")      // => true
 
strbool.parse("false");       // => false
strbool.parse("0");           // => false
strbool.parse("no");          // => false
strbool.parse("off");         // => false
strbool.parse("n");           // => false
strbool.parse("disabled");    // => false
 
strbool.parse(/* anything else */); // ZodError<[{ code: "invalid_value" }]>
```

To customize the truthy and falsy values:

```
// these are the defaults
z.stringbool({
  truthy: ["true", "1", "yes", "on", "y", "enabled"],
  falsy: ["false", "0", "no", "off", "n", "disabled"],
});
```

By default the schema is *case-insensitive*; all inputs are converted to lowercase before comparison to the `truthy`/`falsy` values. To make it case-sensitive:

```
z.stringbool({
  case: "sensitive"
});
```

## [Optionals](?id=optionals#optionals)

To make a schema *optional* (that is, to allow `undefined` inputs).

ZodZod Mini

```
z.optional(z.literal("yoda")); // or z.literal("yoda").optional()
```

This returns a `ZodOptional` instance that wraps the original schema. To extract the inner schema:

ZodZod Mini

```
optionalYoda.unwrap(); // ZodLiteral<"yoda">
```

## [Nullables](?id=nullables#nullables)

To make a schema *nullable* (that is, to allow `null` inputs).

ZodZod Mini

```
z.nullable(z.literal("yoda")); // or z.literal("yoda").nullable()
```

This returns a `ZodNullable` instance that wraps the original schema. To extract the inner schema:

ZodZod Mini

```
nullableYoda.unwrap(); // ZodLiteral<"yoda">
```

## [Nullish](?id=nullish#nullish)

To make a schema *nullish* (both optional and nullable):

ZodZod Mini

```
const nullishYoda = z.nullish(z.literal("yoda"));
```

Refer to the TypeScript manual for more about the concept of [nullish](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing).

## [Unknown](?id=unknown#unknown)

Zod aims to mirror TypeScript's type system one-to-one. As such, Zod provides APIs to represent the following special types:

```
// allows any values
z.any(); // inferred type: `any`
z.unknown(); // inferred type: `unknown`
```

## [Never](?id=never#never)

No value will pass validation.

```
z.never(); // inferred type: `never`
```

## [Objects](?id=objects#objects)

To define an object type:

```
  // all properties are required by default
  const Person = z.object({
    name: z.string(),
    age: z.number(),
  });
 
  type Person = z.infer<typeof Person>;
  // => { name: string; age: number; }
```

By default, all properties are required. To make certain properties optional:

ZodZod Mini

```
const Dog = z.object({
  name: z.string(),
  age: z.number().optional(),
});
 
Dog.parse({ name: "Yeller" }); // ✅
```

By default, unrecognized keys are *stripped* from the parsed result:

```
Dog.parse({ name: "Yeller", extraKey: true });
// => { name: "Yeller" }
```

### [`z.strictObject`](?id=zstrictobject#zstrictobject)

To define a *strict* schema that throws an error when unknown keys are found:

```
const StrictDog = z.strictObject({
  name: z.string(),
});
 
StrictDog.parse({ name: "Yeller", extraKey: true });
// ❌ throws
```

### [`z.looseObject`](?id=zlooseobject#zlooseobject)

To define a *loose* schema that allows unknown keys to pass through:

```
const LooseDog = z.looseObject({
  name: z.string(),
});
 
LooseDog.parse({ name: "Yeller", extraKey: true });
// => { name: "Yeller", extraKey: true }
```

### [`.catchall()`](?id=catchall#catchall)

To define a *catchall schema* that will be used to validate any unrecognized keys:

ZodZod Mini

```
const DogWithStrings = z
  .object({
    name: z.string(),
    age: z.number().optional(),
  })
  .catchall(z.string());
 
 
DogWithStrings.parse({ name: "Yeller", extraKey: "extraValue" }); // ✅
DogWithStrings.parse({ name: "Yeller", extraKey: 42 }); // ❌
```

### [`.shape`](?id=shape#shape)

To access the internal schemas:

ZodZod Mini

```
Dog.shape.name; // => string schema
Dog.shape.age; // => number schema
```

### [`.keyof()`](?id=keyof#keyof)

To create a `ZodEnum` schema from the keys of an object schema:

ZodZod Mini

```
const keySchema = Dog.keyof();
// => ZodEnum<["name", "age"]>
```

### [`.extend()`](?id=extend#extend)

To add additional fields to an object schema:

ZodZod Mini

```
const DogWithBreed = Dog.extend({
  breed: z.string(),
});
```

This API can be used to overwrite existing fields! Be careful with this power! If the two schemas share keys, B will override A.

**Alternative: spread syntax** — You can alternatively avoid `.extend()` altogether by creating a new object schema entirely. This makes the strictness level of the resulting schema visually obvious.

```
const DogWithBreed = z.object({ // or z.strictObject() or z.looseObject()...
  ...Dog.shape,
  breed: z.string(),
});
```

You can also use this to merge multiple objects in one go.

```
const DogWithBreed = z.object({
  ...Animal.shape,
  ...Pet.shape,
  breed: z.string(),
});
```

This approach has a few advantages:

1. It uses language-level features ([spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)) instead of library-specific APIs
2. The same syntax works in Zod and Zod Mini
3. It's more `tsc`-efficient — the `.extend()` method can be expensive on large schemas, and due to [a TypeScript limitation](https://github.com/microsoft/TypeScript/pull/61505) it gets quadratically more expensive when calls are chained
4. If you wish, you can change the strictness level of the resulting schema by using `z.strictObject()` or `z.looseObject()`

### [`.safeExtend()`](?id=safeextend#safeextend)

The `.safeExtend()` method works similarly to `.extend()`, but it won't let you overwrite an existing property with a non-assignable schema. In other words, the result of `.safeExtend()` will have an inferred type that [`extends`](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#conditional-type-constraints) the original (in the TypeScript sense).

```
z.object({ a: z.string() }).safeExtend({ a: z.string().min(5) }); // ✅
z.object({ a: z.string() }).safeExtend({ a: z.any() }); // ✅
z.object({ a: z.string() }).safeExtend({ a: z.number() });
//                                       ^  ❌ ZodNumber is not assignable
```

Use `.safeExtend()` to extend schemas that contain refinements. (Regular `.extend()` will throw an error when used on schemas with refinements.)

ZodZod Mini

```
const Base = z.object({
  a: z.string(),
  b: z.string()
}).refine(user => user.a === user.b);
 
// Extended inherits the refinements of Base
const Extended = Base.safeExtend({
  a: z.string().min(10)
});
```

### [`.pick()`](?id=pick#pick)

Inspired by TypeScript's built-in `Pick` and `Omit` utility types, Zod provides dedicated APIs for picking and omitting certain keys from an object schema.

Starting from this initial schema:

```
const Recipe = z.object({
  title: z.string(),
  description: z.string().optional(),
  ingredients: z.array(z.string()),
});
// { title: string; description?: string | undefined; ingredients: string[] }
```

To pick certain keys:

ZodZod Mini

```
const JustTheTitle = Recipe.pick({ title: true });
```

### [`.omit()`](?id=omit#omit)

To omit certain keys:

ZodZod Mini

```
const RecipeNoId = Recipe.omit({ id: true });
```

### [`.partial()`](?id=partial#partial)

For convenience, Zod provides a dedicated API for making some or all properties optional, inspired by the built-in TypeScript utility type [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype).

To make all fields optional:

ZodZod Mini

```
const PartialRecipe = Recipe.partial();
// { title?: string | undefined; description?: string | undefined; ingredients?: string[] | undefined }
```

To make certain properties optional:

ZodZod Mini

```
const RecipeOptionalIngredients = Recipe.partial({
  ingredients: true,
});
// { title: string; description?: string | undefined; ingredients?: string[] | undefined }
```

### [`.required()`](?id=required#required)

Zod provides an API for making some or all properties *required*, inspired by TypeScript's [`Required`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype) utility type.

To make all properties required:

ZodZod Mini

```
const RequiredRecipe = Recipe.required();
// { title: string; description: string; ingredients: string[] }
```

To make certain properties required:

ZodZod Mini

```
const RecipeRequiredDescription = Recipe.required({description: true});
// { title: string; description: string; ingredients: string[] }
```

## [Recursive objects](?id=recursive-objects#recursive-objects)

To define a self-referential type, use a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) on the key. This lets JavaScript resolve the cyclical schema at runtime.

```
const Category = z.object({
  name: z.string(),
  get subcategories(){
    return z.array(Category)
  }
});
 
type Category = z.infer<typeof Category>;
// { name: string; subcategories: Category[] }
```

Though recursive schemas are supported, passing cyclical data into Zod will cause an infinite loop.

You can also represent *mutually recursive types*:

```
const User = z.object({
  email: z.email(),
  get posts(){
    return z.array(Post)
  }
});
 
const Post = z.object({
  title: z.string(),
  get author(){
    return User
  }
});
```

All object APIs (`.pick()`, `.omit()`, `.required()`, `.partial()`, etc.) work as you'd expect.

### [Circularity errors](?id=circularity-errors#circularity-errors)

Due to TypeScript limitations, recursive type inference can be finicky, and it only works in certain scenarios. Some more complicated types may trigger recursive type errors like this:

```
const Activity = z.object({
  name: z.string(),
  get subactivities() {
    // ^ ❌ 'subactivities' implicitly has return type 'any' because it does not
    // have a return type annotation and is referenced directly or indirectly
    // in one of its return expressions.ts(7023)
 
    return z.nullable(z.array(Activity));
  },
});
```

In these cases, you can resolve the error with a type annotation on the offending getter:

```
const Activity = z.object({
  name: z.string(),
  get subactivities(): z.ZodNullable<z.ZodArray<typeof Activity>> {
    return z.nullable(z.array(Activity));
  },
});
```


## [Arrays](?id=arrays#arrays)

To define an array schema:

ZodZod Mini

```
const stringArray = z.array(z.string()); // or z.string().array()
```

To access the inner schema for an element of the array.

ZodZod Mini

```
stringArray.unwrap(); // => string schema
```

Zod implements a number of array-specific validations:

ZodZod Mini

```
z.array(z.string()).min(5); // must contain 5 or more items
z.array(z.string()).max(5); // must contain 5 or fewer items
z.array(z.string()).length(5); // must contain 5 items exactly
```

## [Tuples](?id=tuples#tuples)

Unlike arrays, tuples are typically fixed-length arrays that specify different schemas for each index.

```
const MyTuple = z.tuple([
  z.string(),
  z.number(),
  z.boolean()
]);
 
type MyTuple = z.infer<typeof MyTuple>;
// [string, number, boolean]
```

To add a variadic ("rest") argument:

```
const variadicTuple = z.tuple([z.string()], z.number());
// => [string, ...number[]];
```

## [Unions](?id=unions#unions)

Union types (`A | B`) represent a logical "OR". Zod union schemas will check the input against each option in order. The first value that validates successfully is returned.

```
const stringOrNumber = z.union([z.string(), z.number()]);
// string | number
 
stringOrNumber.parse("foo"); // passes
stringOrNumber.parse(14); // passes
```

To extract the internal option schemas:

ZodZod Mini

```
stringOrNumber.options; // [ZodString, ZodNumber]
```


## [Exclusive unions (XOR)](?id=exclusive-unions-xor#exclusive-unions-xor)

An exclusive union (XOR) is a union where exactly one option must match. Unlike regular unions that succeed when any option matches, `z.xor()` fails if zero options match OR if multiple options match.

```
const schema = z.xor([z.string(), z.number()]);
 
schema.parse("hello"); // ✅ passes
schema.parse(42);      // ✅ passes
schema.parse(true);    // ❌ fails (zero matches)
```

This is useful when you want to ensure mutual exclusivity between options:

```
// Validate that exactly ONE of these matches
const payment = z.xor([
  z.object({ type: z.literal("card"), cardNumber: z.string() }),
  z.object({ type: z.literal("bank"), accountNumber: z.string() }),
]);
 
payment.parse({ type: "card", cardNumber: "1234" }); // ✅ passes
```

If the input could match multiple options, `z.xor()` will fail:

```
const overlapping = z.xor([z.string(), z.any()]);
overlapping.parse("hello"); // ❌ fails (matches both string and any)
```

## [Discriminated unions](?id=discriminated-unions#discriminated-unions)

A [discriminated union](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) is a special kind of union in which a) all the options are object schemas that b) share a particular key (the "discriminator"). Based on the value of the discriminator key, TypeScript is able to "narrow" the type signature as you'd expect.

```
type MyResult =
  | { status: "success"; data: string }
  | { status: "failed"; error: string };
 
function handleResult(result: MyResult){
  if(result.status === "success"){
    result.data; // string
  } else {
    result.error; // string
  }
}
```

You could represent it with a regular `z.union()`. But regular unions are *naive*—they check the input against each option in order and return the first one that passes. This can be slow for large unions.

So Zod provides a `z.discriminatedUnion()` API that uses a *discriminator key* to make parsing more efficient.

```
const MyResult = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("failed"), error: z.string() }),
]);
```

Each option should be an *object schema* whose discriminator prop (`status` in the example above) corresponds to some literal value or set of values, usually `z.enum()`, `z.literal()`, `z.null()`, or `z.undefined()`.

### Nesting discriminated unions

## [Intersections](?id=intersections#intersections)

Intersection types (`A & B`) represent a logical "AND".

```
const a = z.union([z.number(), z.string()]);
const b = z.union([z.number(), z.boolean()]);
const c = z.intersection(a, b);
 
type c = z.infer<typeof c>; // => number
```

This can be useful for intersecting two object types.

```
const Person = z.object({ name: z.string() });
type Person = z.infer<typeof Person>;
 
const Employee = z.object({ role: z.string() });
type Employee = z.infer<typeof Employee>;
 
const EmployedPerson = z.intersection(Person, Employee);
type EmployedPerson = z.infer<typeof EmployedPerson>;
// Person & Employee
```

When merging object schemas, prefer [`A.extend(B)`](#extend) over intersections. Using `.extend()` will give you a new object schema, whereas `z.intersection(A, B)` returns a `ZodIntersection` instance which lacks common object methods like `pick` and `omit`.

## [Records](?id=records#records)

Record schemas are used to validate types such as `Record<string, string>`.

### [`z.record`](?id=zrecord#zrecord)

```
const IdCache = z.record(z.string(), z.string());
type IdCache = z.infer<typeof IdCache>; // Record<string, string>
 
IdCache.parse({
  carlotta: "77d2586b-9e8e-4ecf-8b21-ea7e0530eadd",
  jimmie: "77d2586b-9e8e-4ecf-8b21-ea7e0530eadd",
});
```

The key schema can be any Zod schema that is assignable to `string | number | symbol`.

```
const Keys = z.union([z.string(), z.number(), z.symbol()]);
const AnyObject = z.record(Keys, z.unknown());
// Record<string | number | symbol, unknown>
```

To create an object schemas containing keys defined by an enum:

```
const Keys = z.enum(["id", "name", "email"]);
const Person = z.record(Keys, z.string());
// { id: string; name: string; email: string }
```

Zod supports numeric keys inside records in a way that closely mirrors TypeScript itself. A `number` schema, when used as a record key, will validate that the key is a valid "numeric string". Additional numerical constraints (min, max, step, etc.) will also be validated.

```
const numberKeys = z.record(z.number(), z.string());
numberKeys.parse({ 
  1: "one", // ✅
  2: "two", // ✅
  "1.5": "one", // ✅
  "-3": "two", // ✅
  abc: "one" // ❌
});
 
// further validation is also supported
const intKeys = z.record(z.int().step(1).min(0).max(10), z.string());
intKeys.parse({ 
  0: "zero", // ✅
  1: "one", // ✅
  2: "two", // ✅
  12: "twelve", // ❌
  abc: "one" // ❌
});
```

### [`z.partialRecord`](?id=zpartialrecord#zpartialrecord)

If you pass a `z.enum` as the first argument to `z.record()`, Zod will exhaustively check that all enum values exist in the input as keys. This behavior agrees with TypeScript:

```
type MyRecord = Record<"a" | "b", string>;
const myRecord: MyRecord = { a: "foo", b: "bar" }; // ✅
const myRecord: MyRecord = { a: "foo" }; // ❌ missing required key `b`
```

For partial key sets, use `z.partialRecord()`.

If you want a *partial* record type, use `z.partialRecord()`. This skips the special exhaustiveness checks Zod normally runs with `z.enum()` and `z.literal()` key schemas.

```
const Keys = z.enum(["id", "name", "email"]).or(z.never()); 
const Person = z.partialRecord(Keys, z.string());
// { id?: string; name?: string; email?: string }
```

### [`z.looseRecord`](?id=zlooserecord#zlooserecord)

By default, `z.record()` errors on keys that don't match the key schema. Use `z.looseRecord()` to pass through non-matching keys unchanged. This is particularly useful when combined with intersections to model multiple pattern properties:

```
const schema = z
  .object({ name: z.string() })
  .and(z.looseRecord(z.string().regex(/_phone$/), z.e164()));
 
type schema = z.infer<typeof schema>;
// => { name: string } & Record<string, string>
 
schema.parse({ 
  name: "John",
  home_phone: "+12345678900",     // validated as phone number
  work_phone: "+12345678900",     // validated as phone number
});
```

## [Maps](?id=maps#maps)

```
const StringNumberMap = z.map(z.string(), z.number());
type StringNumberMap = z.infer<typeof StringNumberMap>; // Map<string, number>
 
const myMap: StringNumberMap = new Map();
myMap.set("one", 1);
myMap.set("two", 2);
 
StringNumberMap.parse(myMap);
```

## [Sets](?id=sets#sets)

```
const NumberSet = z.set(z.number());
type NumberSet = z.infer<typeof NumberSet>; // Set<number>
 
const mySet: NumberSet = new Set();
mySet.add(1);
mySet.add(2);
NumberSet.parse(mySet);
```

Set schemas can be further constrained with the following utility methods.

ZodZod Mini

```
z.set(z.string()).min(5); // must contain 5 or more items
z.set(z.string()).max(5); // must contain 5 or fewer items
z.set(z.string()).size(5); // must contain 5 items exactly
```

## [Files](?id=files#files)

To validate `File` instances:

ZodZod Mini

```
const fileSchema = z.file();
 
fileSchema.min(10_000); // minimum .size (bytes)
fileSchema.max(1_000_000); // maximum .size (bytes)
fileSchema.mime("image/png"); // MIME type
fileSchema.mime(["image/png", "image/jpeg"]); // multiple MIME types
```

## [Promises](?id=promises#promises)

**Deprecated** — `z.promise()` is deprecated. There are vanishingly few valid uses cases for a `Promise` schema. If you suspect a value might be a `Promise`, simply `await` it before parsing it with Zod.

### See z.promise() documentation

## [Instanceof](?id=instanceof#instanceof)

You can use `z.instanceof` to check that the input is an instance of a class. This is useful to validate inputs against classes that are exported from third-party libraries.

```
class Test {
  name: string;
}
 
const TestSchema = z.instanceof(Test);
 
TestSchema.parse(new Test()); // ✅
TestSchema.parse("whatever"); // ❌
```

### [Property](?id=property#property)

To validate a particular property of a class instance against a Zod schema:

```
const blobSchema = z.instanceof(URL).check(
  z.property("protocol", z.literal("https:" as string, "Only HTTPS allowed"))
);
 
blobSchema.parse(new URL("https://example.com")); // ✅
blobSchema.parse(new URL("http://example.com")); // ❌
```

The `z.property()` API works with any data type (but it's most useful when used in conjunction with `z.instanceof()`).

```
const blobSchema = z.string().check(
  z.property("length", z.number().min(10))
);
 
blobSchema.parse("hello there!"); // ✅
blobSchema.parse("hello."); // ❌
```

## [Refinements](?id=refinements#refinements)

Every Zod schema stores an array of *refinements*. Refinements are a way to perform custom validation that Zod doesn't provide a native API for.

### [`.refine()`](?id=refine#refine)

ZodZod Mini

```
const myString = z.string().refine((val) => val.length <= 255);
```

Refinement functions should never throw. Instead they should return a falsy value to signal failure. Thrown errors are not caught by Zod.

#### [`error`](?id=error#error)

To customize the error message:

ZodZod Mini

```
const myString = z.string().refine((val) => val.length > 8, { 
  error: "Too short!" 
});
```

#### [`abort`](?id=abort#abort)

By default, validation issues from checks are considered *continuable*; that is, Zod will execute *all* checks in sequence, even if one of them causes a validation error. This is usually desirable, as it means Zod can surface as many errors as possible in one go.

ZodZod Mini

```
const myString = z.string()
  .refine((val) => val.length > 8, { error: "Too short!" })
  .refine((val) => val === val.toLowerCase(), { error: "Must be lowercase" });
  
 
const result = myString.safeParse("OH NO");
result.error?.issues;
/* [
  { "code": "custom", "message": "Too short!" },
  { "code": "custom", "message": "Must be lowercase" }
] */
```

To mark a particular refinement as *non-continuable*, use the `abort` parameter. Validation will terminate if the check fails.

ZodZod Mini

```
const myString = z.string()
  .refine((val) => val.length > 8, { error: "Too short!", abort: true })
  .refine((val) => val === val.toLowerCase(), { error: "Must be lowercase", abort: true });
 
 
const result = myString.safeParse("OH NO");
result.error?.issues;
// => [{ "code": "custom", "message": "Too short!" }]
```

#### [`path`](?id=path#path)

To customize the error path, use the `path` parameter. This is typically only useful in the context of object schemas.

ZodZod Mini

```
const passwordForm = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords don't match",
    path: ["confirm"], // path of error
  });
```

This will set the `path` parameter in the associated issue:

ZodZod Mini

```
const result = passwordForm.safeParse({ password: "asdf", confirm: "qwer" });
result.error.issues;
/* [{
  "code": "custom",
  "path": [ "confirm" ],
  "message": "Passwords don't match"
}] */
```

To define an asynchronous refinement, just pass an `async` function:

```
const userId = z.string().refine(async (id) => {
  // verify that ID exists in database
  return true;
});
```

If you use async refinements, you must use the `.parseAsync` method to parse data! Otherwise Zod will throw an error.

ZodZod Mini

```
const result = await userId.parseAsync("abc123");
```

#### [`when`](?id=when#when)

**Note** — This is a power user feature and can absolutely be abused in ways that will increase the probability of uncaught errors originating from inside your refinements.

By default, refinements don't run if any *non-continuable* issues have already been encountered. Zod is careful to ensure the type signature of the value is correct before passing it into any refinement functions.

```
const schema = z.string().refine((val) => {
  return val.length > 8
});
 
schema.parse(1234); // invalid_type: refinement won't be executed
```

In some cases, you want finer control over when refinements run. For instance consider this "password confirm" check:

ZodZod Mini

```
const schema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
    anotherField: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
 
schema.parse({
  password: "asdf",
  confirmPassword: "asdf",
  anotherField: 1234 // ❌ this error will prevent the password check from running
});
```

An error on `anotherField` will prevent the password confirmation check from executing, even though the check doesn't depend on `anotherField`. To control when a refinement will run, use the `when` parameter:

ZodZod Mini

```
const baseSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
  anotherField: z.string(),
});
 
const schema = baseSchema
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
 
    // run if password & confirmPassword are valid
    when(payload) { 
      return baseSchema 
        .pick({ password: true, confirmPassword: true }) 
        .safeParse(payload.value).success; 
    },  
  });
 
schema.parse({
  password: "asdf",
  confirmPassword: "asdf",
  anotherField: 1234 // ❌ this error will not prevent the password check from running
});
```

### [`.superRefine()`](?id=superrefine#superrefine)

The regular `.refine` API only generates a single issue with a `"custom"` error code, but `.superRefine()` makes it possible to create multiple issues using any of Zod's [internal issue types](https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/errors.ts).

ZodZod Mini

```
const UniqueStringArray = z.array(z.string()).superRefine((val, ctx) => {
  if (val.length > 3) {
    ctx.addIssue({
      code: "too_big",
      maximum: 3,
      origin: "array",
      inclusive: true,
      message: "Too many items 😡",
      input: val,
    });
  }
 
  if (val.length !== new Set(val).size) {
    ctx.addIssue({
      code: "custom",
      message: `No duplicates allowed.`,
      input: val,
    });
  }
});
```

### [`.check()`](?id=check#check)

**Note** — The `.check()` API is a more low-level API that's generally more complex than `.superRefine()`. It can be faster in performance-sensitive code paths, but it's also more verbose.

### View example

## [Codecs](?id=codecs#codecs)

Introduced in `[email protected]`. Refer to the dedicated [Codecs](/codecs) page for more information.

Codecs are a special kind of schema that implement *bidirectional transformations* between two other schemas.

```
const stringToDate = z.codec(
  z.iso.datetime(),  // input schema: ISO date string
  z.date(),          // output schema: Date object
  {
    decode: (isoString) => new Date(isoString), // ISO string → Date
    encode: (date) => date.toISOString(),       // Date → ISO string
  }
);
```

A regular `.parse()` operations performs the *forward transform*. It calls the codec's `decode` function.

```
stringToDate.parse("2024-01-15T10:30:00.000Z"); // => Date
```

You can alternatively use the top-level `z.decode()` function. Unlike `.parse()` (which accepts `unknown` input), `z.decode()` expects a strongly-typed input (`string` in this example).

```
z.decode(stringToDate, "2024-01-15T10:30:00.000Z"); // => Date
```

To perform the *reverse transform*, use the inverse: `z.encode()`.

```
z.encode(stringToDate, new Date("2024-01-15")); // => "2024-01-15T00:00:00.000Z"
```

Use `z.invertCodec()` to derive a new codec with the input and output schemas swapped.

```
const dateToString = z.invertCodec(stringToDate);
 
z.decode(dateToString, new Date("2024-01-15")); // => string
z.encode(dateToString, "2024-01-15T00:00:00.000Z"); // => Date
```

Refer to the dedicated [Codecs](/codecs) page for more information. That page contains implementations for commonly-needed codecs that you can copy/paste into your project:

* [**`stringToNumber`**](/codecs#stringtonumber)
* [**`stringToInt`**](/codecs#stringtoint)
* [**`stringToBigInt`**](/codecs#stringtobigint)
* [**`numberToBigInt`**](/codecs#numbertobigint)
* [**`isoDatetimeToDate`**](/codecs#isodatetimetodate)
* [**`epochSecondsToDate`**](/codecs#epochsecondstodate)
* [**`epochMillisToDate`**](/codecs#epochmillistodate)
* [**`jsonCodec`**](/codecs#jsoncodec)
* [**`utf8ToBytes`**](/codecs#utf8tobytes)
* [**`bytesToUtf8`**](/codecs#bytestoutf8)
* [**`base64ToBytes`**](/codecs#base64tobytes)
* [**`base64urlToBytes`**](/codecs#base64urltobytes)
* [**`hexToBytes`**](/codecs#hextobytes)
* [**`stringToURL`**](/codecs#stringtourl)
* [**`stringToHttpURL`**](/codecs#stringtohttpurl)
* [**`uriComponent`**](/codecs#uricomponent)
* [**`stringToBoolean`**](/codecs#stringtoboolean)

## [Pipes](?id=pipes#pipes)

Schemas can be chained together into "pipes". Pipes are primarily useful when used in conjunction with [Transforms](#transforms).

ZodZod Mini

```
const stringToLength = z.string().pipe(z.transform(val => val.length));
 
stringToLength.parse("hello"); // => 5
```

## [Transforms](?id=transforms#transforms)

**Note** — For bi-directional transforms, use [codecs](/codecs).

Transforms are a special kind of schema that perform a unidirectional transformation. Instead of validating input, they accept anything and perform some transformation on the data. To define a transform:

ZodZod Mini

```
const castToString = z.transform((val) => String(val));
 
castToString.parse("asdf"); // => "asdf"
castToString.parse(123); // => "123"
castToString.parse(true); // => "true"
```

Transform functions should never throw. Thrown errors are not caught by Zod.

To perform validation logic inside a transform, use `ctx`. To report a validation issue, push a new issue onto `ctx.issues` (similar to the [`.check()`](#check) API).

```
const coercedInt = z.transform((val, ctx) => {
  try {
    const parsed = Number.parseInt(String(val));
    return parsed;
  } catch (e) {
    ctx.issues.push({
      code: "custom",
      message: "Not a number",
      input: val,
    });
 
    // this is a special constant with type `never`
    // returning it lets you exit the transform without impacting the inferred return type
    return z.NEVER;
  }
});
```

Most commonly, transforms are used in conjunction with [Pipes](#pipes). This combination is useful for performing some initial validation, then transforming the parsed data into another form.

ZodZod Mini

```
const stringToLength = z.string().pipe(z.transform(val => val.length));
 
stringToLength.parse("hello"); // => 5
```

### [`.transform()`](?id=transform#transform)

Piping some schema into a transform is a common pattern, so Zod provides a convenience `.transform()` method.

ZodZod Mini

```
const stringToLength = z.string().transform(val => val.length);
```

Transforms can also be async:

ZodZod Mini

```
const idToUser = z
  .string()
  .transform(async (id) => {
    // fetch user from database
    return db.getUserById(id); 
  });
 
const user = await idToUser.parseAsync("abc123");
```

If you use async transforms, you must use a `.parseAsync` or `.safeParseAsync` when parsing data! Otherwise Zod will throw an error.

### [`.preprocess()`](?id=preprocess#preprocess)

Piping a transform into another schema is another common pattern, so Zod provides a convenience `z.preprocess()` function.

```
const coercedInt = z.preprocess((val) => {
  if (typeof val === "string") {
    return Number.parseInt(val);
  }
  return val;
}, z.int());
```

By default, the input type of a `z.preprocess()` schema is `unknown`, since the preprocessor is expected to handle arbitrary input. To narrow the input type, annotate the preprocessor's parameter directly:

```
const trimmed = z.preprocess(
  (val: string | null | undefined) => val?.trim() ?? "",
  z.string()
);
 
type Input = z.input<typeof trimmed>;  // string | null | undefined
type Output = z.output<typeof trimmed>; // string
```

This is useful when integrating with libraries like `react-hook-form` that derive their form value type from `z.input<>`.

## [Defaults](?id=defaults#defaults)

To set a default value for a schema:

ZodZod Mini

```
const defaultTuna = z.string().default("tuna");
 
defaultTuna.parse(undefined); // => "tuna"
```

Alternatively, you can pass a function which will be re-executed whenever a default value needs to be generated:

ZodZod Mini

```
const randomDefault = z.number().default(Math.random);
 
randomDefault.parse(undefined);    // => 0.4413456736055323
randomDefault.parse(undefined);    // => 0.1871840107401901
randomDefault.parse(undefined);    // => 0.7223408162401552
```

## [Prefaults](?id=prefaults#prefaults)

In Zod, setting a *default* value will short-circuit the parsing process. If the input is `undefined`, the default value is eagerly returned. As such, the default value must be assignable to the *output type* of the schema.

```
const schema = z.string().transform(val => val.length).default(0);
schema.parse(undefined); // => 0
```

Sometimes, it's useful to define a *prefault* ("pre-parse default") value. If the input is `undefined`, the prefault value will be parsed instead. The parsing process is *not* short circuited. As such, the prefault value must be assignable to the *input type* of the schema.

```
z.string().transform(val => val.length).prefault("tuna");
schema.parse(undefined); // => 4
```

This is also useful if you want to pass some input value through some mutating refinements.

```
const a = z.string().trim().toUpperCase().prefault("  tuna  ");
a.parse(undefined); // => "TUNA"
 
const b = z.string().trim().toUpperCase().default("  tuna  ");
b.parse(undefined); // => "  tuna  "
```

## [Catch](?id=catch#catch)

Use `.catch()` to define a fallback value to be returned in the event of a validation error:

ZodZod Mini

```
const numberWithCatch = z.number().catch(42);
 
numberWithCatch.parse(5); // => 5
numberWithCatch.parse("tuna"); // => 42
```

Alternatively, you can pass a function which will be re-executed whenever a catch value needs to be generated.

ZodZod Mini

```
const numberWithRandomCatch = z.number().catch((ctx) => {
  ctx.error; // the caught ZodError
 
  return Math.random();
});
 
numberWithRandomCatch.parse("sup"); // => 0.4413456736055323
numberWithRandomCatch.parse("sup"); // => 0.1871840107401901
numberWithRandomCatch.parse("sup"); // => 0.7223408162401552
```

## [Branded types](?id=branded-types#branded-types)

TypeScript's type system is [structural](https://www.typescriptlang.org/docs/handbook/type-compatibility.html), meaning that two types that are structurally equivalent are considered the same.

```
type Cat = { name: string };
type Dog = { name: string };
 
const pluto: Dog = { name: "pluto" };
const simba: Cat = pluto; // works fine
```

In some cases, it can be desirable to simulate [nominal typing](https://en.wikipedia.org/wiki/Nominal_type_system) inside TypeScript. This can be achieved with *branded types* (also known as "opaque types").

```
const Cat = z.object({ name: z.string() }).brand<"Cat">();
const Dog = z.object({ name: z.string() }).brand<"Dog">();
 
type Cat = z.infer<typeof Cat>; // { name: string } & z.$brand<"Cat">
type Dog = z.infer<typeof Dog>; // { name: string } & z.$brand<"Dog">
 
const pluto = Dog.parse({ name: "pluto" });
const simba: Cat = pluto; // ❌ not allowed
```

Under the hood, this works by attaching a "brand" to the schema's inferred type.

```
const Cat = z.object({ name: z.string() }).brand<"Cat">();
type Cat = z.output<typeof Cat>; // { name: string } & z.$brand<"Cat">
```

With this brand, plain (unbranded) data structures are not assignable to the inferred type. You have to parse some data with the schema to get branded data.

Note that branded types do not affect the runtime result of `.parse`. It is a static-only construct.

By default, only the *output type* is branded.

```
const USD = z.string().brand<"USD">();
 
type USDOutput = z.output<typeof USD>; // string & z.$brand<"USD">
type USDInput = z.input<typeof USD>; // string
```

To customize this, pass a second generic to `.brand()` to specify the direction of the brand.

```
// requires Zod 4.2+
z.string().brand<"Cat", "out">(); // output is branded (default)
z.string().brand<"Cat", "in">(); // input is branded
z.string().brand<"Cat", "inout">(); // both are branded
```

## [Readonly](?id=readonly#readonly)

To mark a schema as readonly:

ZodZod Mini

```
const ReadonlyUser = z.object({ name: z.string() }).readonly();
type ReadonlyUser = z.infer<typeof ReadonlyUser>;
// Readonly<{ name: string }>
```

The inferred type is marked as `readonly`. Note that in TypeScript, this only affects objects, arrays, tuples, `Set`, and `Map`:

ZodZod Mini

```
z.object({ name: z.string() }).readonly(); // { readonly name: string }
z.array(z.string()).readonly(); // readonly string[]
z.tuple([z.string(), z.number()]).readonly(); // readonly [string, number]
z.map(z.string(), z.date()).readonly(); // ReadonlyMap<string, Date>
z.set(z.string()).readonly(); // ReadonlySet<string>
```

Inputs will be parsed like normal, then the result will be frozen with [`Object.freeze()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) to prevent modifications.

ZodZod Mini

```
const result = ReadonlyUser.parse({ name: "fido" });
result.name = "simba"; // throws TypeError
```

## [JSON](?id=json#json)

To validate any JSON-encodable value:

```
const jsonSchema = z.json();
```

This is a convenience API that returns the following union schema:

```
const jsonSchema = z.lazy(() => {
  return z.union([
    z.string(params), 
    z.number(), 
    z.boolean(), 
    z.null(), 
    z.array(jsonSchema), 
    z.record(z.string(), jsonSchema)
  ]);
});
```

## [Functions](?id=functions#functions)

Zod provides a `z.function()` utility for defining Zod-validated functions. This way, you can avoid intermixing validation code with your business logic.

```
const MyFunction = z.function({
  input: [z.string()], // parameters (must be an array or a ZodTuple)
  output: z.number()  // return type
});
 
type MyFunction = z.infer<typeof MyFunction>;
// (input: string) => number
```

Function schemas have an `.implement()` method which accepts a function and returns a new function that automatically validates its inputs and outputs.

```
const computeTrimmedLength = MyFunction.implement((input) => {
  // TypeScript knows input is a string!
  return input.trim().length;
});
 
computeTrimmedLength("sandwich"); // => 8
computeTrimmedLength(" asdf "); // => 4
```

This function will throw a `ZodError` if the input is invalid:

```
computeTrimmedLength(42); // throws ZodError
```

If you only care about validating inputs, you can omit the `output` field.

```
const MyFunction = z.function({
  input: [z.string()], // parameters (must be an array or a ZodTuple)
});
 
const computeTrimmedLength = MyFunction.implement((input) => input.trim.length);
```

Use the `.implementAsync()` method to create an async function.

```
const computeTrimmedLengthAsync = MyFunction.implementAsync(
  async (input) => input.trim().length
);
 
computeTrimmedLengthAsync("sandwich"); // => Promise<8>
```

## [Custom](?id=custom#custom)

You can create a Zod schema for any TypeScript type by using `z.custom()`. This is useful for validating types from third-party libraries or any other type that isn't covered by a built-in schema. For class instances, prefer [`z.instanceof()`](#instanceof); for template literal types, prefer [`z.templateLiteral()`](#template-literals).

```
import { Decimal } from "decimal.js";
 
const decimalSchema = z.custom<Decimal>((val) => Decimal.isDecimal(val));
 
decimalSchema.parse(new Decimal("1.5")); // passes
decimalSchema.parse("1.5");              // throws
```

If you don't provide a validation function, Zod will allow any value. This can be dangerous!

```
z.custom<{ arg: string }>(); // performs no validation
```

You can customize the error message and other options by passing a second argument. This parameter works the same way as the params parameter of [`.refine`](#refine).

```
z.custom<...>((val) => ..., "custom error message");
```

## [Apply](?id=apply#apply)

Use `.apply()` to incorporate external functions into Zod's method chain:

ZodZod Mini

```
function setCommonNumberChecks<T extends z.ZodNumber>(schema: T) {
  return schema
    .min(0)
    .max(100);
}
 
const schema = z.number()
  .apply(setCommonNumberChecks)
  .nullable();
 
schema.parse(0);  // => 0
schema.parse(-1); // ❌ throws
schema.parse(101); // ❌ throws
schema.parse(null); // => null
```

---

## Basic usage

> Basic usage guide covering schema definition, parsing data, error handling, and type inference

_Source: [https://zod.dev/basics](https://zod.dev/basics)_

This page will walk you through the basics of creating schemas, parsing data, and using inferred types. For complete documentation on Zod's schema API, refer to [Defining schemas](/api).

## [Defining a schema](?id=defining-a-schema#defining-a-schema)

Before you can do anything else, you need to define a schema. For the purposes of this guide, we'll use a simple object schema.

ZodZod Mini

```
import * as z from "zod"; 
 
const Player = z.object({ 
  username: z.string(),
  xp: z.number()
});
```

## [Parsing data](?id=parsing-data#parsing-data)

Given any Zod schema, use `.parse` to validate an input. If it's valid, Zod returns a strongly-typed *deep clone* of the input.

```
Player.parse({ username: "billie", xp: 100 }); 
// => returns { username: "billie", xp: 100 }
```

**Note** — If your schema uses certain asynchronous APIs like `async` [refinements](/api#refinements) or [transforms](/api#transforms), you'll need to use the `.parseAsync()` method instead.

```
await Player.parseAsync({ username: "billie", xp: 100 });
```

## [Handling errors](?id=handling-errors#handling-errors)

When validation fails, the `.parse()` method will throw a `ZodError` instance with granular information about the validation issues.

ZodZod Mini

```
try {
  Player.parse({ username: 42, xp: "100" });
} catch(error){
  if(error instanceof z.ZodError){
    error.issues; 
    /* [
      {
        expected: 'string',
        code: 'invalid_type',
        path: [ 'username' ],
        message: 'Invalid input: expected string'
      },
      {
        expected: 'number',
        code: 'invalid_type',
        path: [ 'xp' ],
        message: 'Invalid input: expected number'
      }
    ] */
  }
}
```

To avoid a `try/catch` block, you can use the `.safeParse()` method to get back a plain result object containing either the successfully parsed data or a `ZodError`. The result type is a [discriminated union](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions), so you can handle both cases conveniently.

```
const result = Player.safeParse({ username: 42, xp: "100" });
if (!result.success) {
  result.error;   // ZodError instance
} else {
  result.data;    // { username: string; xp: number }
}
```

**Note** — If your schema uses certain asynchronous APIs like `async` [refinements](/api#refinements) or [transforms](/api#transforms), you'll need to use the `.safeParseAsync()` method instead.

```
await schema.safeParseAsync("hello");
```

## [Inferring types](?id=inferring-types#inferring-types)

Zod infers a static type from your schema definitions. You can extract this type with the `z.infer<>` utility and use it however you like.

```
const Player = z.object({ 
  username: z.string(),
  xp: z.number()
});
 
// extract the inferred type
type Player = z.infer<typeof Player>;
 
// use it in your code
const player: Player = { username: "billie", xp: 100 };
```

In some cases, the input & output types of a schema can diverge. For instance, the `.transform()` API can convert the input from one type to another. In these cases, you can extract the input and output types independently:

```
const mySchema = z.string().transform((val) => val.length);
 
type MySchemaIn = z.input<typeof mySchema>;
// => string
 
type MySchemaOut = z.output<typeof mySchema>; // equivalent to z.infer<typeof mySchema>
// number
```


---

Now that we have the basics covered, let's jump into the Schema API.

---

## Codecs

> Bidirectional transformations with encode and decode

_Source: [https://zod.dev/codecs](https://zod.dev/codecs)_

Introduced in `[email protected]`.

All Zod schemas can process inputs in both the forward and backward direction:

* **Forward**: `Input` to `Output`
  + `.parse()`
  + `.decode()`
* **Backward**: `Output` to `Input`
  + `.encode()`

In most cases, this is a distinction without a difference. The input and output types are identical, so there's no difference between "forward" and "backward".

ZodZod Mini

```
const schema = z.string();
 
type Input = z.input<typeof schema>;    // string
type Output = z.output<typeof schema>;  // string
 
schema.parse("asdf");   // => "asdf"
schema.decode("asdf");  // => "asdf"
schema.encode("asdf");  // => "asdf"
```

However, some schema types cause the input and output types to diverge, notably `z.codec()`. Codecs are a special type of schema that defines a *bi-directional transformation* between two other schemas.

```
const stringToDate = z.codec(
  z.iso.datetime(),  // input schema: ISO date string
  z.date(),          // output schema: Date object
  {
    decode: (isoString) => new Date(isoString), // ISO string → Date
    encode: (date) => date.toISOString(),       // Date → ISO string
  }
);
```

In these cases, `z.decode()` and `z.encode()` behave quite differently.

ZodZod Mini

```
stringToDate.decode("2024-01-15T10:30:00.000Z")
// => Date
 
stringToDate.encode(new Date("2024-01-15T10:30:00.000Z"))
// => string
```

**Note** —There's nothing special about the directions or terminology here. Instead of *encoding* with an `A -> B` codec, you could instead *decode* with a `B -> A` codec. The use of the terms "decode" and "encode" is just a convention.

This is particularly useful when parsing data at a network boundary. You can share a single Zod schema between your client and server, then use this single schema to convert between a network-friendly format (say, JSON) and a richer JavaScript representation.

### [Inverting codecs](?id=inverting-codecs#inverting-codecs)

Use `z.invertCodec()` to derive the reverse codec from an existing one. The returned codec swaps the input and output schemas, then swaps the `decode` and `encode` transforms.

ZodZod Mini

```
const dateToString = z.invertCodec(stringToDate);
 
dateToString.decode(new Date("2024-01-15T10:30:00.000Z"));
// => string
 
dateToString.encode("2024-01-15T10:30:00.000Z");
// => Date
```

`z.invertCodec()` only inverts the codec you pass to it. It does not recursively invert codecs nested inside another schema; invert those codecs where you define the reversed schema.

### [Composability](?id=composability#composability)

**Note** — You can use `z.encode()` and `z.decode()` with any schema. It doesn't have to be a ZodCodec.

Codecs are a schema like any other. You can nest them inside objects, arrays, pipes, etc. There are no rules on where you can use them!

```
const payloadSchema = z.object({ 
  startDate: stringToDate 
});
 
payloadSchema.decode({
  startDate: "2024-01-15T10:30:00.000Z"
}); // => { startDate: Date }
```

### [Type-safe inputs](?id=type-safe-inputs#type-safe-inputs)

While `.parse()` and `.decode()` behave identically at *runtime*, they have different type signatures. The `.parse()` method accepts `unknown` as input, and returns a value that matches the schema's inferred *output type*. By contrast, the `z.decode()` and `z.encode()` functions have *strongly-typed inputs*.

```
stringToDate.parse(12345); 
// no complaints from TypeScript (fails at runtime)
 
stringToDate.decode(12345); 
// ❌ TypeScript error: Argument of type 'number' is not assignable to parameter of type 'string'.
 
stringToDate.encode(12345); 
// ❌ TypeScript error: Argument of type 'number' is not assignable to parameter of type 'Date'.
```

Why the difference? Encoding and decoding imply *transformation*. In many cases, the inputs to these methods are already strongly typed in application code, so z.decode/z.encode accept strongly typed inputs to surface mistakes at compile time.
Here's a diagram demonstrating the differences between the type signatures for `parse()`, `decode()`, and `encode()`.

### [Async and safe variants](?id=async-and-safe-variants#async-and-safe-variants)

As with `.transform()` and `.refine()`, codecs support async transforms.

```
const asyncCodec = z.codec(z.string(), z.number(), {
  decode: async (str) => Number(str),
  encode: async (num) => num.toString(),
});
```

As with regular `parse()`, there are "safe" and "async" variants of `decode()` and `encode()`.

```
stringToDate.decode("2024-01-15T10:30:00.000Z"); 
// => Date
 
stringToDate.decodeAsync("2024-01-15T10:30:00.000Z"); 
// => Promise<Date>
 
stringToDate.safeDecode("2024-01-15T10:30:00.000Z"); 
// => { success: true, data: Date } | { success: false, error: ZodError }
 
stringToDate.safeDecodeAsync("2024-01-15T10:30:00.000Z"); 
// => Promise<{ success: true, data: Date } | { success: false, error: ZodError }>
```

## [How encoding works](?id=how-encoding-works#how-encoding-works)

There are some subtleties to how certain Zod schemas "reverse" their parse behavior.

### [Codecs](?id=codecs#codecs)

This one is fairly self-explanatory. Codecs encapsulate a bi-directional transformation between two types. `z.decode()` triggers the `decode` transform to convert input into a parsed value, while `z.encode()` triggers the `encode` transform to serialize it back.

```
const stringToDate = z.codec(
  z.iso.datetime(),  // input schema: ISO date string
  z.date(),          // output schema: Date object
  {
    decode: (isoString) => new Date(isoString), // ISO string → Date
    encode: (date) => date.toISOString(),       // Date → ISO string
  }
);
 
stringToDate.decode("2024-01-15T10:30:00.000Z"); 
// => Date
 
stringToDate.encode(new Date("2024-01-15")); 
// => string
```

### [Pipes](?id=pipes#pipes)

**Fun fact** — Codecs are implemented internally as *subclasses* of pipes with "interstitial" transform logic.

During regular decoding, a `ZodPipe<A, B>` schema will first parse the data with `A`, then pass it into `B`. As you might expect, during encoding, the data is first encoded with `B`, then passed into `A`.

### [Refinements](?id=refinements#refinements)

All checks (`.refine()`, `.min()`, `.max()`, etc.) are still executed in both directions.

```
const schema = stringToDate.refine((date) => date.getFullYear() >= 2000, "Must be this millennium");
 
schema.encode(new Date("2000-01-01"));
// => Date
 
schema.encode(new Date("1999-01-01"));
// => ❌ ZodError: [
//   {
//     "code": "custom",
//     "path": [],
//     "message": "Must be this millennium"
//   }
// ]
```

To avoid unexpected errors in your custom `.refine()` logic, Zod performs two "passes" during `z.encode()`. The first pass ensures the input type conforms to the expected type (no `invalid_type` errors). If that passes, Zod performs the second pass which executes the refinement logic.

This approach also supports "mutating transforms" like `z.string().trim()` or `z.string().toLowerCase()`:

```
const schema = z.string().trim();
 
schema.decode("  hello  ");
// => "hello"
 
schema.encode("  hello  ");
// => "hello"
```

### [Defaults and prefaults](?id=defaults-and-prefaults#defaults-and-prefaults)

Defaults and prefaults are only applied in the "forward" direction.

```
const stringWithDefault = z.string().default("hello");
 
stringWithDefault.decode(undefined); 
// => "hello"
 
stringWithDefault.encode(undefined); 
// => ZodError: Expected string, received undefined
```

When you attach a default value to a schema, the input becomes optional (`| undefined`) but the output does not. As such, `undefined` is not a valid input to `z.encode()` and defaults/prefaults will not be applied.

### [Catch](?id=catch#catch)

Similarly, `.catch()` is only applied in the "forward" direction.

```
const stringWithCatch = z.string().catch("hello");
 
stringWithCatch.decode(1234); 
// => "hello"
 
stringWithCatch.encode(1234); 
// => ZodError: Expected string, received number
```

### [Stringbool](?id=stringbool#stringbool)

**Note** — [Stringbool](/api#stringbool) pre-dates the introduction of codecs in Zod. It has since been internally re-implemented as a codec.

The `z.stringbool()` API converts string values (`"true"`, `"false"`, `"yes"`, `"no"`, etc.) into `boolean`. By default, it will convert `true` to `"true"` and `false` to `"false"` during `z.encode()`.

```
const stringbool = z.stringbool();
 
stringbool.decode("true");  // => true
stringbool.decode("false"); // => false
 
stringbool.encode(true);    // => "true"
stringbool.encode(false);   // => "false"
```

If you specify a custom set of `truthy` and `falsy` values, the *first element in the array* will be used instead.

```
const stringbool = z.stringbool({ truthy: ["yes", "y"], falsy: ["no", "n"] });
 
stringbool.encode(true);    // => "yes"
stringbool.encode(false);   // => "no"
```

### [Transforms](?id=transforms#transforms)

⚠️ — The `.transform()` API implements a *unidirectional* transformation. If any `.transform()` exists anywhere in your schema, attempting a `z.encode()` operation will throw a *runtime error* (not a `ZodError`).

```
const schema = z.string().transform(val => val.length);
 
schema.encode(1234); 
// ❌ Error: Encountered unidirectional transform during encode: ZodTransform
```


## [Useful codecs](?id=useful-codecs#useful-codecs)

Below are implementations for a bunch of commonly-needed codecs. For the sake of customizability, these are not included as first-class APIs in Zod itself. Instead, you should copy/paste them into your project and modify them as needed.

**Note** — The codec implementations below are tested for correctness.

### [`stringToNumber`](?id=stringtonumber#stringtonumber)

Converts string representations of numbers to JavaScript `number` type using `parseFloat()`.

```
const stringToNumber = z.codec(z.string().regex(z.regexes.number), z.number(), {
  decode: (str) => Number.parseFloat(str),
  encode: (num) => num.toString(),
});
 
stringToNumber.decode("42.5");  // => 42.5
stringToNumber.encode(42.5);    // => "42.5"
```

### [`stringToInt`](?id=stringtoint#stringtoint)

Converts string representations of integers to JavaScript `number` type using `parseInt()`.

```
const stringToInt = z.codec(z.string().regex(z.regexes.integer), z.int(), {
  decode: (str) => Number.parseInt(str, 10),
  encode: (num) => num.toString(),
});
 
stringToInt.decode("42");  // => 42
stringToInt.encode(42);    // => "42"
```

### [`stringToBigInt`](?id=stringtobigint#stringtobigint)

Converts string representations to JavaScript `bigint` type.

```
const stringToBigInt = z.codec(z.string(), z.bigint(), {
  decode: (str) => BigInt(str),
  encode: (bigint) => bigint.toString(),
});
 
stringToBigInt.decode("12345");  // => 12345n
stringToBigInt.encode(12345n);   // => "12345"
```

### [`numberToBigInt`](?id=numbertobigint#numbertobigint)

Converts JavaScript `number` to `bigint` type.

```
const numberToBigInt = z.codec(z.int(), z.bigint(), {
  decode: (num) => BigInt(num),
  encode: (bigint) => Number(bigint),
});
 
numberToBigInt.decode(42);   // => 42n
numberToBigInt.encode(42n);  // => 42
```

### [`isoDatetimeToDate`](?id=isodatetimetodate#isodatetimetodate)

Converts ISO datetime strings to JavaScript `Date` objects.

```
const isoDatetimeToDate = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});
 
isoDatetimeToDate.decode("2024-01-15T10:30:00.000Z");  // => Date object
isoDatetimeToDate.encode(new Date("2024-01-15"));       // => "2024-01-15T00:00:00.000Z"
```

### [`epochSecondsToDate`](?id=epochsecondstodate#epochsecondstodate)

Converts Unix timestamps (seconds since epoch) to JavaScript `Date` objects.

```
const epochSecondsToDate = z.codec(z.int().min(0), z.date(), {
  decode: (seconds) => new Date(seconds * 1000),
  encode: (date) => Math.floor(date.getTime() / 1000),
});
 
epochSecondsToDate.decode(1705314600);  // => Date object
epochSecondsToDate.encode(new Date());  // => Unix timestamp in seconds
```

### [`epochMillisToDate`](?id=epochmillistodate#epochmillistodate)

Converts Unix timestamps (milliseconds since epoch) to JavaScript `Date` objects.

```
const epochMillisToDate = z.codec(z.int().min(0), z.date(), {
  decode: (millis) => new Date(millis),
  encode: (date) => date.getTime(),
});
 
epochMillisToDate.decode(1705314600000);  // => Date object
epochMillisToDate.encode(new Date());     // => Unix timestamp in milliseconds
```

### [`json(schema)`](?id=jsonschema#jsonschema)

Parses JSON strings into structured data and serializes back to JSON. This generic function accepts an output schema to validate the parsed JSON data.

```
const jsonCodec = <T extends z.core.$ZodType>(schema: T) =>
  z.codec(z.string(), schema, {
    decode: (jsonString, ctx) => {
      try {
        return JSON.parse(jsonString);
      } catch (err: any) {
        ctx.issues.push({
          code: "invalid_format",
          format: "json",
          input: jsonString,
          message: err.message,
        });
        return z.NEVER;
      }
    },
    encode: (value) => JSON.stringify(value),
  });
```

Usage example with a specific schema:

```
const jsonToObject = jsonCodec(z.object({ name: z.string(), age: z.number() }));
 
jsonToObject.decode('{"name":"Alice","age":30}');  
// => { name: "Alice", age: 30 }
 
jsonToObject.encode({ name: "Bob", age: 25 });     
// => '{"name":"Bob","age":25}'
 
jsonToObject.decode('~~invalid~~'); 
// ZodError: [
//   {
//     "code": "invalid_format",
//     "format": "json",
//     "path": [],
//     "message": "Unexpected token '~', \"~~invalid~~\" is not valid JSON"
//   }
// ]
```

### [`utf8ToBytes`](?id=utf8tobytes#utf8tobytes)

Converts UTF-8 strings to `Uint8Array` byte arrays.

```
const utf8ToBytes = z.codec(z.string(), z.instanceof(Uint8Array), {
  decode: (str) => new TextEncoder().encode(str),
  encode: (bytes) => new TextDecoder().decode(bytes),
});
 
utf8ToBytes.decode("Hello, 世界!");  // => Uint8Array
utf8ToBytes.encode(bytes);          // => "Hello, 世界!"
```

### [`bytesToUtf8`](?id=bytestoutf8#bytestoutf8)

Converts `Uint8Array` byte arrays to UTF-8 strings.

```
const bytesToUtf8 = z.codec(z.instanceof(Uint8Array), z.string(), {
  decode: (bytes) => new TextDecoder().decode(bytes),
  encode: (str) => new TextEncoder().encode(str),
});
 
bytesToUtf8.decode(bytes);          // => "Hello, 世界!"
bytesToUtf8.encode("Hello, 世界!");  // => Uint8Array
```

### [`base64ToBytes`](?id=base64tobytes#base64tobytes)

Converts base64 strings to `Uint8Array` byte arrays and vice versa.

```
const base64ToBytes = z.codec(z.base64(), z.instanceof(Uint8Array), {
  decode: (base64String) => z.util.base64ToUint8Array(base64String),
  encode: (bytes) => z.util.uint8ArrayToBase64(bytes),
});
 
base64ToBytes.decode("SGVsbG8=");  // => Uint8Array([72, 101, 108, 108, 111])
base64ToBytes.encode(bytes);       // => "SGVsbG8="
```

### [`base64urlToBytes`](?id=base64urltobytes#base64urltobytes)

Converts base64url strings (URL-safe base64) to `Uint8Array` byte arrays.

```
const base64urlToBytes = z.codec(z.base64url(), z.instanceof(Uint8Array), {
  decode: (base64urlString) => z.util.base64urlToUint8Array(base64urlString),
  encode: (bytes) => z.util.uint8ArrayToBase64url(bytes),
});
 
base64urlToBytes.decode("SGVsbG8");  // => Uint8Array([72, 101, 108, 108, 111])
base64urlToBytes.encode(bytes);      // => "SGVsbG8"
```

### [`hexToBytes`](?id=hextobytes#hextobytes)

Converts hexadecimal strings to `Uint8Array` byte arrays and vice versa.

```
const hexToBytes = z.codec(z.hex(), z.instanceof(Uint8Array), {
  decode: (hexString) => z.util.hexToUint8Array(hexString),
  encode: (bytes) => z.util.uint8ArrayToHex(bytes),
});
 
hexToBytes.decode("48656c6c6f");     // => Uint8Array([72, 101, 108, 108, 111])
hexToBytes.encode(bytes);            // => "48656c6c6f"
```

### [`stringToURL`](?id=stringtourl#stringtourl)

Converts URL strings to JavaScript `URL` objects.

```
const stringToURL = z.codec(z.url(), z.instanceof(URL), {
  decode: (urlString) => new URL(urlString),
  encode: (url) => url.href,
});
 
stringToURL.decode("https://example.com/path");  // => URL object
stringToURL.encode(new URL("https://example.com"));  // => "https://example.com/"
```

### [`stringToHttpURL`](?id=stringtohttpurl#stringtohttpurl)

Converts HTTP/HTTPS URL strings to JavaScript `URL` objects.

```
const stringToHttpURL = z.codec(z.httpUrl(), z.instanceof(URL), {
  decode: (urlString) => new URL(urlString),
  encode: (url) => url.href,
});
 
stringToHttpURL.decode("https://api.example.com/v1");  // => URL object
stringToHttpURL.encode(url);                           // => "https://api.example.com/v1"
```

### [`uriComponent`](?id=uricomponent#uricomponent)

Encodes and decodes URI components using `encodeURIComponent()` and `decodeURIComponent()`.

```
const uriComponent = z.codec(z.string(), z.string(), {
  decode: (encodedString) => decodeURIComponent(encodedString),
  encode: (decodedString) => encodeURIComponent(decodedString),
});
 
uriComponent.decode("Hello%20World%21");  // => "Hello World!"
uriComponent.encode("Hello World!");      // => "Hello%20World!"
```

---

## Ecosystem

> Overview of the Zod ecosystem including integrations, tools, and community resources

_Source: [https://zod.dev/ecosystem](https://zod.dev/ecosystem)_

**Note** — The Ecosystem section focuses on libraries that support Zod 4. If your library supports Zod 4, please submit a PR to add it. For libraries that work with Zod 3, refer to [v3.zod.dev](https://v3.zod.dev/?id=ecosystem).

There are a growing number of tools that are built atop or support Zod natively! If you've built a tool or library on top of Zod, let me know [on Twitter](https://x.com/colinhacks) or [start a Discussion](https://github.com/colinhacks/zod/discussions). I'll add it below and tweet it out.

## [Resources](?id=resources#resources)

* [Total TypeScript Zod Tutorial](https://www.totaltypescript.com/tutorials/zod) by [@mattpocockuk](https://x.com/mattpocockuk)
* [Fixing TypeScript's Blindspot: Runtime Typechecking](https://www.youtube.com/watch?v=rY_XqfSHock) by [@jherr](https://x.com/jherr)
* [Validate Environment Variables With Zod](https://catalins.tech/validate-environment-variables-with-zod/) by [@catalinmpit](https://x.com/catalinmpit)

## [API Libraries](?id=api-libraries#api-libraries)

| Name | Stars | Description |
| --- | --- | --- |
| [`tRPC`](https://github.com/trpc/trpc) | ⭐️ 40305 | Build end-to-end typesafe APIs without GraphQL. |
| [`upfetch`](https://github.com/L-Blondy/up-fetch) | ⭐️ 1399 | Advanced fetch client builder |
| [`nestjs-zod`](https://github.com/BenLorantfy/nestjs-zod) | ⭐️ 1074 | Integrate nestjs and zod. Create nestjs DTOs using zod, serialize with zod, and generate OpenAPI documentation from zod schemas |
| [`Express Zod API`](https://github.com/RobinTail/express-zod-api) | ⭐️ 826 | Build Express-based API with I/O validation and middlewares, OpenAPI docs and type-safe client. |
| [`Zod Sockets`](https://github.com/RobinTail/zod-sockets) | ⭐️ 115 | Socket.IO solution with I/O validation, an AsyncAPI generator, and a type-safe events map. |
| [`GQLoom`](https://gqloom.dev/) | ⭐️ 99 | Weave GraphQL schema and resolvers using Zod. |
| [`Zod JSON-RPC`](https://github.com/danscan/zod-jsonrpc) | ⭐️ 22 | Type-safe JSON-RPC 2.0 client/server library using Zod. |
| [`oRPC`](https://orpc.unnoq.com/) | ⭐️ 5 | Typesafe APIs Made Simple |

## [Form Integrations](?id=form-integrations#form-integrations)

| Name | Stars | Description |
| --- | --- | --- |
| [`Superforms`](https://superforms.rocks) | ⭐️ 2750 | Making SvelteKit forms a pleasure to use! |
| [`conform`](https://conform.guide/api/zod/parseWithZod) | ⭐️ 2557 | A type-safe form validation library utilizing web fundamentals to progressively enhance HTML Forms with full support for server frameworks like Remix and Next.js. |
| [`zod-validation-error`](https://github.com/causaly/zod-validation-error) | ⭐️ 1017 | Generate user-friendly error messages from ZodError instances. |
| [`regle`](https://github.com/victorgarciaesgi/regle) | ⭐️ 459 | Headless form validation library for Vue.js. |
| [`svelte-jsonschema-form`](https://x0k.dev/svelte-jsonschema-form/validators/zod4/) | ⭐️ 162 | Svelte 5 library for creating forms based on JSON schema. |
| [`frrm`](https://www.npmjs.com/package/frrm) | ⭐️ 31 | Tiny 0.5kb Zod-based, HTML form abstraction that goes brr. |
| [`react-f3`](https://www.npmjs.com/package/react-f3) | ⭐️ 11 | Components, hooks & utilities for creating and managing delightfully simple form experiences in React. |

## [Zod to X](?id=zod-to-x#zod-to-x)

| Name | Stars | Description |
| --- | --- | --- |
| [`prisma-zod-generator`](https://github.com/omar-dulaimi/prisma-zod-generator) | ⭐️ 823 | Generate Zod schemas from Prisma schema with full ZodObject method support |
| [`zod-openapi`](https://github.com/samchungy/zod-openapi) | ⭐️ 628 | Use Zod Schemas to create OpenAPI v3.x documentation |
| [`convex-helpers`](https://github.com/get-convex/convex-helpers/blob/main/packages/convex-helpers/README.md#zod-validation) | ⭐️ 478 | Use Zod to validate arguments and return values of Convex functions, and to create Convex database schemas |
| [`@traversable/zod`](https://github.com/traversable/schema/tree/main/packages/zod) | ⭐️ 157 | Build your own "Zod to x" library, or pick one of 25+ off-the-shelf transformers |
| [`zod2md`](https://github.com/matejchalk/zod2md) | ⭐️ 146 | Generate Markdown docs from Zod schemas |
| [`fastify-zod-openapi`](https://github.com/samchungy/fastify-zod-openapi) | ⭐️ 122 | Fastify type provider, validation, serialization and @fastify/swagger support for Zod schemas |
| [`zod-to-mongo-schema`](https://github.com/udohjeremiah/zod-to-mongo-schema) | ⭐️ 8 | Convert Zod schemas to MongoDB-compatible JSON Schemas effortlessly |

## [X to Zod](?id=x-to-zod#x-to-zod)

| Name | Stars | Description |
| --- | --- | --- |
| [`orval`](https://github.com/orval-labs/orval) | ⭐️ 6104 | Generate Zod schemas from OpenAPI schemas |
| [`Hey API`](https://heyapi.dev/openapi-ts/plugins/zod) | ⭐️ 4927 | OpenAPI to TypeScript codegen. Production-ready SDKs, Zod schemas, TanStack Query hooks, and 20+ plugins. Used by Vercel, OpenCode, and PayPal. |
| [`kubb`](https://github.com/kubb-labs/kubb) | ⭐️ 1734 | The ultimate toolkit for working with APIs. |
| [`Prisma Zod Generator`](https://github.com/omar-dulaimi/prisma-zod-generator) | ⭐️ 823 | Generates Zod schemas with input/result/pure variants, minimal/full/custom, selective emit/filtering, single/multi-file output, @zod rules, relation depth guards. |
| [`convex-helpers`](https://github.com/get-convex/convex-helpers/blob/main/packages/convex-helpers/README.md#zod-validation) | ⭐️ 478 | Generate Zod schemas from Convex validators |
| [`DRZL`](https://github.com/use-drzl/drzl) | ⭐️ 103 | Drizzle ORM toolkit that can generate Zod validators from schema(s), plus typed services and strongly typed routers (oRPC/tRPC/etc). |
| [`valype`](https://github.com/yuzheng14/valype) | ⭐️ 69 | Typescript's type definition to runtime validator (including zod). |
| [`Hono Takibi`](https://github.com/nakita628/hono-takibi) | ⭐️ 51 | Hono Takibi is a code generator from OpenAPI to @hono/zod-openapi |

## [Mocking Libraries](?id=mocking-libraries#mocking-libraries)

| Name | Stars | Description |
| --- | --- | --- |
| [`@traversable/zod-test`](https://github.com/traversable/schema/tree/main/packages/zod-test) | ⭐️ 157 | Random zod schema generator built for fuzz testing; includes generators for both valid and invalid data |
| [`zod-schema-faker`](https://github.com/soc221b/zod-schema-faker) | ⭐️ 113 | Generate mock data from zod schemas. Powered by @faker-js/faker and randexp.js. |
| [`zocker`](https://zocker.sigrist.dev) | ⭐️ 96 | Generates valid, semantically meaningful data for your Zod schemas. |

## [Powered by Zod](?id=powered-by-zod#powered-by-zod)

| Name | Stars | Description |
| --- | --- | --- |
| [`Composable Functions`](https://github.com/seasonedcc/composable-functions) | ⭐️ 740 | Types and functions to make composition easy and safe. |
| [`zod-config`](https://github.com/alexmarqs/zod-config) | ⭐️ 136 | Load configurations across multiple sources with flexible adapters, ensuring type safety with Zod. |
| [`zod-xlsx`](https://github.com/sidwebworks/zod-xlsx) | ⭐️ 53 | A xlsx based resource validator using Zod schemas for data imports and more |
| [`Fn Sphere`](https://github.com/lawvs/fn-sphere) | ⭐️ 34 | A Zod-first toolkit for building powerful, type-safe filter experiences across web apps. |
| [`zodgres`](https://github.com/endel/zodgres) | ⭐️ 23 | Postgres.js + Zod: Database collections with static type inference and automatic migrations |
| [`validex`](https://github.com/chiptoma/validex) | ⭐️ 20 | 25 tree-shakeable validation rules for common fields (email, phone, password, etc.) with structured error codes, i18n, and framework adapters. |
| [`json-up`](https://github.com/Nano-Collective/json-up) | ⭐️ 15 | A fast, type-safe JSON migration tool with Zod schema validation. |
| [`bupkis`](https://github.com/boneskull/bupkis) | ⭐️ 7 | Uncommonly extensible assertions for the beautiful people |

## [Zod Utilities](?id=zod-utilities#zod-utilities)

| Name | Stars | Description |
| --- | --- | --- |
| [`zod-playground`](https://github.com/marilari88/zod-playground) | ⭐️ 135 | Interactive playground for testing and exploring Zod and Zod mini schemas in real-time. |
| [`eslint-plugin-zod`](https://github.com/marcalexiei/eslint-plugin-zod) | ⭐️ 69 | ESLint plugin that adds custom linting rules to enforce best practices when using Zod |
| [`zod-ir`](https://github.com/Reza-kh80/zod-ir) | ⭐️ 62 | Comprehensive validation for Iranian data structures (National Code, Bank Cards, Sheba, Crypto, etc) with smart metadata extraction (Bank Names, Logos). Zero dependencies. |
| [`eslint-plugin-import-zod`](https://github.com/samchungy/eslint-plugin-import-zod) | ⭐️ 51 | ESLint plugin to enforce namespace imports for Zod. |
| [`babel-plugin-zod-hoist`](https://github.com/gajus/babel-plugin-zod-hoist) | ⭐️ 25 | Babel plugin that optimizes Zod performance by hoisting schema definitions to the top of the file, avoiding repeated initialization overhead. |
| [`Zod AOT`](https://github.com/wakita181009/zod-aot) | ⭐️ 19 | Compile Zod schemas into zero-overhead validation functions at build time. 2-64x faster validation with no code changes. |
| [`Zod Compare`](https://github.com/lawvs/zod-compare) | ⭐️ 12 | A utility library for recursively comparing Zod schemas. |

---

## Customizing errors

> Guide to customizing validation error messages and error handling patterns

_Source: [https://zod.dev/error-customization](https://zod.dev/error-customization)_

In Zod, validation errors are surfaced as instances of the `z.core.$ZodError` class.

The `ZodError` class in the `zod` package is a subclass that implements some additional convenience methods.

Instances of `$ZodError` contain an `.issues` array. Each issue contains a human-readable `message` and additional structured metadata about the issue.

ZodZod Mini

```
import * as z from "zod";
 
const result = z.string().safeParse(12); // { success: false, error: ZodError }
result.error.issues;
// [
//   {
//     expected: 'string',
//     code: 'invalid_type',
//     path: [],
//     message: 'Invalid input: expected string, received number'
//   }
// ]
```

Every issue contains a `message` property with a human-readable error message. Error messages can be customized in a number of ways.

## [The `error` param](?id=the-error-param#the-error-param)

Virtually every Zod API accepts an optional error message.

```
z.string("Not a string!");
```

This custom error will show up as the `message` property of any validation issues that originate from this schema.

```
z.string("Not a string!").parse(12);
// ❌ throws ZodError {
//   issues: [
//     {
//       expected: 'string',
//       code: 'invalid_type',
//       path: [],
//       message: 'Not a string!'   <-- 👀 custom error message
//     }
//   ]
// }
```

All `z` functions and schema methods accept custom errors.

ZodZod Mini

```
z.string("Bad!");
z.string().min(5, "Too short!");
z.uuid("Bad UUID!");
z.iso.date("Bad date!");
z.array(z.string(), "Not an array!");
z.array(z.string()).min(5, "Too few items!");
z.set(z.string(), "Bad set!");
```

If you prefer, you can pass a params object with an `error` parameter instead.

ZodZod Mini

```
z.string({ error: "Bad!" });
z.string().min(5, { error: "Too short!" });
z.uuid({ error: "Bad UUID!" });
z.iso.date({ error: "Bad date!" });
z.array(z.string(), { error: "Bad array!" });
z.array(z.string()).min(5, { error: "Too few items!" });
z.set(z.string(), { error: "Bad set!" });
```

The `error` param optionally accepts a function. An error customization function is known as an **error map** in Zod terminology. The error map will run at parse time if a validation error occurs.

```
z.string({ error: ()=>`[${Date.now()}]: Validation failure.` });
```

The error map receives a context object you can use to customize the error message based on the validation issue.

```
z.string({
  error: (iss) => iss.input === undefined ? "Field is required." : "Invalid input."
});
```

For advanced cases, the `iss` object provides additional information you can use to customize the error.

```
z.string({
  error: (iss) => {
    iss.code; // the issue code
    iss.input; // the input data
    iss.inst; // the schema/check that originated this issue
    iss.path; // the path of the error
  },
});
```

Depending on the API you are using, there may be additional properties available. Use TypeScript's autocomplete to explore the available properties.

```
z.string().min(5, {
  error: (iss) => {
    // ...the same as above
    iss.minimum; // the minimum value
    iss.inclusive; // whether the minimum is inclusive
    return `Password must have ${iss.minimum} characters or more`;
  },
});
```

Return `undefined` to avoid customizing the error message and fall back to the default message. (More specifically, Zod will yield control to the next error map in the [precedence chain](#error-precedence).) This is useful for selectively customizing certain error messages but not others.

```
z.int64({
  error: (issue) => {
    // override too_big error message
    if (issue.code === "too_big") {
      return { message: `Value must be <${issue.maximum}` };
    }
 
    //  defer to default
    return undefined;
  },
});
```

## [Per-parse error customization](?id=per-parse-error-customization#per-parse-error-customization)

To customize errors on a *per-parse* basis, pass an error map into the parse method:

```
const schema = z.string();
 
schema.parse(12, {
  error: iss => "per-parse custom error"
});
```

This has *lower precedence* than any schema-level custom messages.

```
const schema = z.string({ error: "highest priority" });
const result = schema.safeParse(12, {
  error: (iss) => "lower priority",
});
 
result.error.issues;
// [{ message: "highest priority", ... }]
```

The `iss` object is a [discriminated union](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) of all possible issue types. Use the `code` property to discriminate between them.

For a breakdown of all Zod issue codes, see the [`zod/v4/core`](/packages/core#issue-types) documentation.

```
const result = schema.safeParse(12, {
  error: (iss) => {
    if (iss.code === "invalid_type") {
      return `invalid type, expected ${iss.expected}`;
    }
    if (iss.code === "too_small") {
      return `minimum is ${iss.minimum}`;
    }
    // ...
  }
});
```

### [Include input in issues](?id=include-input-in-issues#include-input-in-issues)

By default, Zod does not include input data in issues. This is to prevent unintentional logging of potentially sensitive input data. To include the input data in each issue, use the `reportInput` flag:

```
z.string().parse(12, {
  reportInput: true
})
 
// ZodError: [
//   {
//     "expected": "string",
//     "code": "invalid_type",
//     "input": 12, // 👀
//     "path": [],
//     "message": "Invalid input: expected string, received number"
//   }
// ]
```

## [Global error customization](?id=global-error-customization#global-error-customization)

To specify a global error map, use `z.config()` to set Zod's `customError` configuration setting:

```
z.config({
  customError: (iss) => {
    return "globally modified error";
  },
});
```

Global error messages have *lower precedence* than schema-level or per-parse error messages.

The `iss` object is a [discriminated union](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) of all possible issue types. Use the `code` property to discriminate between them.

For a breakdown of all Zod issue codes, see the [`zod/v4/core`](/packages/core#issue-types) documentation.

```
z.config({
  customError: (iss) => {
    if (iss.code === "invalid_type") {
      return `invalid type, expected ${iss.expected}`;
    }
    if (iss.code === "too_small") {
      return `minimum is ${iss.minimum}`;
    }
    // ...
  },
});
```

## [Internationalization](?id=internationalization#internationalization)

To support internationalization of error message, Zod provides several built-in **locales**. These are exported from the `zod/v4/core` package.

**Note** — The regular `zod` library loads the `en` locale automatically. Zod Mini does not load any locale by default; instead all error messages default to `Invalid input`.

ZodZod Mini

```
import * as z from "zod";
import { en } from "zod/locales"
 
z.config(en());
```

To lazily load a locale, consider dynamic imports:

```
import * as z from "zod";
 
async function loadLocale(locale: string) {
  const { default: locale } = await import(`zod/v4/locales/${locale}.js`);
  z.config(locale());
};
 
await loadLocale("fr");
```

For convenience, all locales are exported as `z.locales` from `"zod"`. In some bundlers, this may not be tree-shakable.

ZodZod Mini

```
import * as z from "zod";
 
z.config(z.locales.en());
```

### [Locales](?id=locales#locales)

The following locales are available:

* `ar` — Arabic
* `az` — Azerbaijani
* `be` — Belarusian
* `bg` — Bulgarian
* `ca` — Catalan
* `cs` — Czech
* `da` — Danish
* `de` — German
* `en` — English
* `eo` — Esperanto
* `es` — Spanish
* `fa` — Farsi
* `fi` — Finnish
* `fr` — French
* `frCA` — Canadian French
* `he` — Hebrew
* `hu` — Hungarian
* `hy` — Armenian
* `id` — Indonesian
* `is` — Icelandic
* `it` — Italian
* `ja` — Japanese
* `ka` — Georgian
* `km` — Khmer
* `ko` — Korean
* `lt` — Lithuanian
* `mk` — Macedonian
* `ms` — Malay
* `nl` — Dutch
* `no` — Norwegian
* `ota` — Türkî
* `ps` — Pashto
* `pl` — Polish
* `pt` — Portuguese
* `ro` — Romanian
* `ru` — Russian
* `sl` — Slovenian
* `sv` — Swedish
* `ta` — Tamil
* `th` — Thai
* `tr` — Türkçe
* `uk` — Ukrainian
* `ur` — Urdu
* `uz` — Uzbek
* `vi` — Tiếng Việt
* `zhCN` — Simplified Chinese
* `zhTW` — Traditional Chinese
* `yo` — Yorùbá

## [Error precedence](?id=error-precedence#error-precedence)

Below is a quick reference for determining error precedence: if multiple error customizations have been defined, which one takes priority? From *highest to lowest* priority:

1. **Schema-level error** — Any error message "hard coded" into a schema definition.

```
z.string("Not a string!");
```

2. **Per-parse error** — A custom error map passed into the `.parse()` method.

```
z.string().parse(12, {
  error: (iss) => "My custom error"
});
```

3. **Global error map** — A custom error map passed into `z.config()`.

```
z.config({
  customError: (iss) => "My custom error"
});
```

4. **Locale error map** — A custom error map passed into `z.config()`.

```
z.config(z.locales.en());
```

---

## Formatting errors

> Utilities for formatting and displaying Zod errors

_Source: [https://zod.dev/error-formatting](https://zod.dev/error-formatting)_

Zod emphasizes *completeness* and *correctness* in its error reporting. In many cases, it's helpful to convert the `$ZodError` to a more useful format. Zod provides some utilities for this.

Consider this simple object schema.

```
import * as z from "zod";
 
const schema = z.strictObject({
  username: z.string(),
  favoriteNumbers: z.array(z.number()),
});
```

Attempting to parse this invalid data results in an error containing three issues.

```
const result = schema.safeParse({
  username: 1234,
  favoriteNumbers: [1234, "4567"],
  extraKey: 1234,
});
 
result.error!.issues;
[
  {
    expected: 'string',
    code: 'invalid_type',
    path: [ 'username' ],
    message: 'Invalid input: expected string, received number'
  },
  {
    expected: 'number',
    code: 'invalid_type',
    path: [ 'favoriteNumbers', 1 ],
    message: 'Invalid input: expected number, received string'
  },
  {
    code: 'unrecognized_keys',
    keys: [ 'extraKey' ],
    path: [],
    message: 'Unrecognized key: "extraKey"'
  }
];
```

## [`z.treeifyError()`](?id=ztreeifyerror#ztreeifyerror)

To convert ("treeify") this error into a nested object, use `z.treeifyError()`.

```
const tree = z.treeifyError(result.error);
 
// =>
{
  errors: [ 'Unrecognized key: "extraKey"' ],
  properties: {
    username: { errors: [ 'Invalid input: expected string, received number' ] },
    favoriteNumbers: {
      errors: [],
      items: [
        undefined,
        {
          errors: [ 'Invalid input: expected number, received string' ]
        }
      ]
    }
  }
}
```

The result is a nested structure that mirrors the schema itself. You can easily access the errors that occurred at a particular path. The `errors` field contains the error messages at a given path, and the special properties `properties` and `items` let you traverse deeper into the tree.

```
tree.properties?.username?.errors;
// => ["Invalid input: expected string, received number"]
 
tree.properties?.favoriteNumbers?.items?.[1]?.errors;
// => ["Invalid input: expected number, received string"];
```

Be sure to use optional chaining (`?.`) to avoid errors when accessing nested properties.

## [`z.prettifyError()`](?id=zprettifyerror#zprettifyerror)

The `z.prettifyError()` provides a human-readable string representation of the error.

```
const pretty = z.prettifyError(result.error);
```

This returns the following string:

```
✖ Unrecognized key: "extraKey"
✖ Invalid input: expected string, received number
  → at username
✖ Invalid input: expected number, received string
  → at favoriteNumbers[1]
```

## [`z.formatError()`](?id=zformaterror#zformaterror)

Deprecated. Use `z.treeifyError()` instead.

### Show docs

## [`z.flattenError()`](?id=zflattenerror#zflattenerror)

While `z.treeifyError()` is useful for traversing a potentially complex nested structure, the majority of schemas are *flat*—just one level deep. In this case, use `z.flattenError()` to retrieve a clean, shallow error object.

```
const flattened = z.flattenError(result.error);
// { errors: string[], properties: { [key: string]: string[] } }
 
{
  formErrors: [ 'Unrecognized key: "extraKey"' ],
  fieldErrors: {
    username: [ 'Invalid input: expected string, received number' ],
    favoriteNumbers: [ 'Invalid input: expected number, received string' ]
  }
}
```

The `formErrors` array contains any top-level errors (where `path` is `[]`). The `fieldErrors` object provides an array of errors for each field in the schema.

```
flattened.fieldErrors.username; // => [ 'Invalid input: expected string, received number' ]
flattened.fieldErrors.favoriteNumbers; // => [ 'Invalid input: expected number, received string' ]
```

---

## JSON Schema

> How to convert Zod schemas to JSON Schema

_Source: [https://zod.dev/json-schema](https://zod.dev/json-schema)_

💎

Introduced in `[email protected]`, Zod supports native [JSON Schema](https://json-schema.org/) conversion. JSON Schema is a standard for describing the structure of JSON (with JSON). It's widely used in [OpenAPI](https://www.openapis.org/) definitions and defining [structured outputs](https://platform.openai.com/docs/guides/structured-outputs?api-mode=chat) for AI.

## [`z.fromJSONSchema()`](?id=zfromjsonschema#zfromjsonschema)

**Experimental** — The `z.fromJSONSchema()` function is experimental and is not considered part of Zod's stable API. It is likely to undergo implementation changes in future releases.

Zod provides `z.fromJSONSchema()` to convert a JSON Schema into a Zod schema.

```
import * as z from "zod";
 
const jsonSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
  },
  required: ["name", "age"],
};
 
const zodSchema = z.fromJSONSchema(jsonSchema);
```

## [`z.toJSONSchema()`](?id=ztojsonschema#ztojsonschema)

To convert a Zod schema to JSON Schema, use the `z.toJSONSchema()` function.

```
import * as z from "zod";
 
const schema = z.object({
  name: z.string(),
  age: z.number(),
});
 
z.toJSONSchema(schema)
// => {
//   type: 'object',
//   properties: { name: { type: 'string' }, age: { type: 'number' } },
//   required: [ 'name', 'age' ],
//   additionalProperties: false,
// }
```

All schema & checks are converted to their closest JSON Schema equivalent. Some types have no analog and cannot be reasonably represented. See the [`unrepresentable`](#unrepresentable) section below for more information on handling these cases.

```
z.bigint(); // ❌
z.int64(); // ❌
z.symbol(); // ❌
z.undefined(); // ❌
z.void(); // ❌
z.date(); // ❌
z.map(); // ❌
z.set(); // ❌
z.transform(); // ❌
z.nan(); // ❌
z.custom(); // ❌
```

A second argument can be used to customize the conversion logic.

```
z.toJSONSchema(schema, {
  // ...params
})
```

Below is a quick reference for each supported parameter. Each one is explained in more detail below.

```
interface ToJSONSchemaParams {
  /** The JSON Schema version to target.
   * - `"draft-2020-12"` — Default. JSON Schema Draft 2020-12
   * - `"draft-07"` — JSON Schema Draft 7
   * - `"draft-04"` — JSON Schema Draft 4
   * - `"openapi-3.0"` — OpenAPI 3.0 Schema Object */
  target?:
    | "draft-04"
    | "draft-4"
    | "draft-07"
    | "draft-7"
    | "draft-2020-12"
    | "openapi-3.0"
    | ({} & string)
    | undefined;
 
  /** A registry used to look up metadata for each schema. 
   * Any schema with an `id` property will be extracted as a $def. */
  metadata?: $ZodRegistry<Record<string, any>>;
 
  /** How to handle unrepresentable types.
   * - `"throw"` — Default. Unrepresentable types throw an error
   * - `"any"` — Unrepresentable types become `{}` */
  unrepresentable?: "throw" | "any";
 
  /** How to handle cycles.
   * - `"ref"` — Default. Cycles will be broken using $defs
   * - `"throw"` — Cycles will throw an error if encountered */
  cycles?: "ref" | "throw";
 
  /* How to handle reused schemas.
   * - `"inline"` — Default. Reused schemas will be inlined
   * - `"ref"` — Reused schemas will be extracted as $defs */
  reused?: "ref" | "inline";
 
  /** A function used to convert `id` values to URIs to be used in *external* $refs.
   *
   * Default is `(id) => id`.
   */
  uri?: (id: string) => string;
}
```

### [`io`](?id=io#io)

Some schema types have different input and output types, e.g. `ZodPipe`, `ZodDefault`, and coerced primitives. By default, the result of `z.toJSONSchema` represents the *output type*; use `"io": "input"` to extract the input type instead.

```
const mySchema = z.string().transform(val => val.length).pipe(z.number());
// ZodPipe
 
const jsonSchema = z.toJSONSchema(mySchema); 
// => { type: "number" }
 
const jsonSchema = z.toJSONSchema(mySchema, { io: "input" }); 
// => { type: "string" }
```

### [`target`](?id=target#target)

To set the target JSON Schema version, use the `target` parameter. By default, Zod will target Draft 2020-12.

```
z.toJSONSchema(schema, { target: "draft-07" });
z.toJSONSchema(schema, { target: "draft-2020-12" });
z.toJSONSchema(schema, { target: "draft-04" });
z.toJSONSchema(schema, { target: "openapi-3.0" });
```

### [`metadata`](?id=metadata#metadata)

If you haven't already, read through the [Metadata and registries](/metadata) page for context on storing metadata in Zod.

In Zod, metadata is stored in registries. Zod exports a global registry `z.globalRegistry` that can be used to store common metadata fields like `id`, `title`, `description`, and `examples`.

ZodZod Mini

```
import * as z from "zod";
 
// `.meta()` is a convenience method for registering a schema in `z.globalRegistry`
const emailSchema = z.string().meta({ 
  title: "Email address",
  description: "Your email address",
});
 
z.toJSONSchema(emailSchema);
// => { type: "string", title: "Email address", description: "Your email address", ... }
```

All metadata fields get copied into the resulting JSON Schema.

```
const schema = z.string().meta({
  whatever: 1234
});
 
z.toJSONSchema(schema);
// => { type: "string", whatever: 1234 }
```

### [`unrepresentable`](?id=unrepresentable#unrepresentable)

The following APIs are not representable in JSON Schema. By default, Zod will throw an error if they are encountered. It is unsound to attempt a conversion to JSON Schema; you should modify your schemas as they have no equivalent in JSON. An error will be thrown if any of these are encountered.

```
z.bigint(); // ❌
z.int64(); // ❌
z.symbol(); // ❌
z.undefined(); // ❌
z.void(); // ❌
z.date(); // ❌
z.map(); // ❌
z.set(); // ❌
z.transform(); // ❌
z.nan(); // ❌
z.custom(); // ❌
```

By default, Zod will throw an error if any of these are encountered.

```
z.toJSONSchema(z.bigint());
// => throws Error
```

You can change this behavior by setting the `unrepresentable` option to `"any"`. This will convert any unrepresentable types to `{}` (the equivalent of `unknown` in JSON Schema).

```
z.toJSONSchema(z.bigint(), { unrepresentable: "any" });
// => {}
```

### [`cycles`](?id=cycles#cycles)

How to handle cycles. If a cycle is encountered as `z.toJSONSchema()` traverses the schema, it will be represented using `$ref`.

```
const User = z.object({
  name: z.string(),
  get friend() {
    return User;
  },
});
 
z.toJSONSchema(User);
// => {
//   type: 'object',
//   properties: { name: { type: 'string' }, friend: { '$ref': '#' } },
//   required: [ 'name', 'friend' ],
//   additionalProperties: false,
// }
```

If instead you want to throw an error, set the `cycles` option to `"throw"`.

```
z.toJSONSchema(User, { cycles: "throw" });
// => throws Error
```

### [`reused`](?id=reused#reused)

How to handle schemas that occur multiple times in the same schema. By default, Zod will inline these schemas.

```
const name = z.string();
const User = z.object({
  firstName: name,
  lastName: name,
});
 
z.toJSONSchema(User);
// => {
//   type: 'object',
//   properties: { 
//     firstName: { type: 'string' }, 
//     lastName: { type: 'string' } 
//   },
//   required: [ 'firstName', 'lastName' ],
//   additionalProperties: false,
// }
```

Instead you can set the `reused` option to `"ref"` to extract these schemas into `$defs`.

```
z.toJSONSchema(User, { reused: "ref" });
// => {
//   type: 'object',
//   properties: {
//     firstName: { '$ref': '#/$defs/__schema0' },
//     lastName: { '$ref': '#/$defs/__schema0' }
//   },
//   required: [ 'firstName', 'lastName' ],
//   additionalProperties: false,
//   '$defs': { __schema0: { type: 'string' } }
// }
```

### [`override`](?id=override#override)

To define some custom override logic, use `override`. The provided callback has access to the original Zod schema and the default JSON Schema. *This function should directly modify `ctx.jsonSchema`.*

```
const mySchema = /* ... */
z.toJSONSchema(mySchema, {
  override: (ctx)=>{
    ctx.zodSchema; // the original Zod schema
    ctx.jsonSchema; // the default JSON Schema
 
    // directly modify
    ctx.jsonSchema.whatever = "sup";
  }
});
```

Note that unrepresentable types will throw an `Error` before this function is called. If you are trying to define custom behavior for an unrepresentable type, you'll need to set the `unrepresentable: "any"` alongside `override`.

```
// support z.date() as ISO datetime strings
const result = z.toJSONSchema(z.date(), {
  unrepresentable: "any",
  override: (ctx) => {
    const def = ctx.zodSchema._zod.def;
    if(def.type ==="date"){
      ctx.jsonSchema.type = "string";
      ctx.jsonSchema.format = "date-time";
    }
  },
});
```

## [Conversion](?id=conversion#conversion)

Below are additional details regarding Zod's JSON Schema conversion logic.

### [String formats](?id=string-formats#string-formats)

Zod converts the following schema types to the equivalent JSON Schema `format`:

```
// Supported via `format`
z.email(); // => { type: "string", format: "email" }
z.iso.datetime(); // => { type: "string", format: "date-time" }
z.iso.date(); // => { type: "string", format: "date" }
z.iso.duration(); // => { type: "string", format: "duration" }
z.ipv4(); // => { type: "string", format: "ipv4" }
z.ipv6(); // => { type: "string", format: "ipv6" }
z.uuid(); // => { type: "string", format: "uuid" }
z.guid(); // => { type: "string", format: "uuid" }
z.url(); // => { type: "string", format: "uri" }
```

These schemas are supported via `contentEncoding`:

```
z.base64(); // => { type: "string", contentEncoding: "base64" }
```

All other string formats are supported via `pattern`:

```
z.iso.time();
z.base64url();
z.cuid();
z.emoji();
z.nanoid();
z.cuid2();
z.ulid();
z.cidrv4();
z.cidrv6();
z.mac();
```

### [Numeric types](?id=numeric-types#numeric-types)

Zod converts the following numeric types to JSON Schema:

```
// number
z.number(); // => { type: "number" }
z.float32(); // => { type: "number", exclusiveMinimum: ..., exclusiveMaximum: ... }
z.float64(); // => { type: "number", exclusiveMinimum: ..., exclusiveMaximum: ... }
 
// integer
z.int(); // => { type: "integer" }
z.int32(); // => { type: "integer", exclusiveMinimum: ..., exclusiveMaximum: ... }
```

### [Object schemas](?id=object-schemas#object-schemas)

By default, `z.object()` schemas contain `additionalProperties: "false"`. This is an accurate representation of Zod's default behavior, as plain `z.object()` schema strip additional properties.

```
import * as z from "zod";
 
const schema = z.object({
  name: z.string(),
  age: z.number(),
});
 
z.toJSONSchema(schema)
// => {
//   type: 'object',
//   properties: { name: { type: 'string' }, age: { type: 'number' } },
//   required: [ 'name', 'age' ],
//   additionalProperties: false,
// }
```

When converting to JSON Schema in `"input"` mode, `additionalProperties` is not set. See the [`io` docs](#io) for more information.

```
import * as z from "zod";
 
const schema = z.object({
  name: z.string(),
  age: z.number(),
});
 
z.toJSONSchema(schema, { io: "input" });
// => {
//   type: 'object',
//   properties: { name: { type: 'string' }, age: { type: 'number' } },
//   required: [ 'name', 'age' ],
// }
```

By contrast:

* `z.looseObject()` will *never* set `additionalProperties: false`
* `z.strictObject()` will *always* set `additionalProperties: false`

### [File schemas](?id=file-schemas#file-schemas)

Zod converts `z.file()` to the following OpenAPI-friendly schema:

```
z.file();
// => { type: "string", format: "binary", contentEncoding: "binary" }
```

Size and MIME checks are also represented:

```
z.file().min(1).max(1024 * 1024).mime("image/png");
// => {
//   type: "string",
//   format: "binary",
//   contentEncoding: "binary",
//   contentMediaType: "image/png",
//   minLength: 1,
//   maxLength: 1048576,
// }
```

### [Nullability](?id=nullability#nullability)

Zod converts `z.null()` to `{ type: "null" }` in JSON Schema.

```
z.null();
// => { type: "null" }
```

Note that `z.undefined()` is unrepresentable in JSON Schema (see [below](#unrepresentable)).

Similarly, `nullable` is represented via a union with `null`:

```
z.nullable(z.string());
// => { oneOf: [{ type: "string" }, { type: "null" }] }
```

Optional schemas are represented as-is, though they are decorated with an `optional` annotation.

```
z.optional(z.string());
// => { type: "string" }
```


## [Registries](?id=registries#registries)

Passing a schema into `z.toJSONSchema()` will return a *self-contained* JSON Schema.

In other cases, you may have a set of Zod schemas you'd like to represent using multiple interlinked JSON Schemas, perhaps to write to `.json` files and serve from a web server.

```
import * as z from "zod";
 
const User = z.object({
  name: z.string(),
  get posts(){
    return z.array(Post);
  }
});
 
const Post = z.object({
  title: z.string(),
  content: z.string(),
  get author(){
    return User;
  }
});
 
z.globalRegistry.add(User, {id: "User"});
z.globalRegistry.add(Post, {id: "Post"});
```

To achieve this, you can pass a [registry](/metadata#registries) into `z.toJSONSchema()`.

**Important** — All schemas should have a registered `id` property in the registry! Any schemas without an `id` will be ignored.

```
z.toJSONSchema(z.globalRegistry);
// => {
//   schemas: {
//     User: {
//       id: 'User',
//       type: 'object',
//       properties: {
//         name: { type: 'string' },
//         posts: { type: 'array', items: { '$ref': 'Post' } }
//       },
//       required: [ 'name', 'posts' ],
//       additionalProperties: false,
//     },
//     Post: {
//       id: 'Post',
//       type: 'object',
//       properties: {
//         title: { type: 'string' },
//         content: { type: 'string' },
//         author: { '$ref': 'User' }
//       },
//       required: [ 'title', 'content', 'author' ],
//       additionalProperties: false,
//     }
//   }
// }
```

By default, the `$ref` URIs are simple relative paths like `"User"`. To make these absolute URIs, use the `uri` option. This expects a function that converts an `id` to a fully-qualified URI.

```
z.toJSONSchema(z.globalRegistry, {
  uri: (id) => `https://example.com/${id}.json`
});
// => {
//   schemas: {
//     User: {
//       id: 'User',
//       type: 'object',
//       properties: {
//         name: { type: 'string' },
//         posts: {
//           type: 'array',
//           items: { '$ref': 'https://example.com/Post.json' }
//         }
//       },
//       required: [ 'name', 'posts' ],
//       additionalProperties: false,
//     },
//     Post: {
//       id: 'Post',
//       type: 'object',
//       properties: {
//         title: { type: 'string' },
//         content: { type: 'string' },
//         author: { '$ref': 'https://example.com/User.json' }
//       },
//       required: [ 'title', 'content', 'author' ],
//       additionalProperties: false,
//     }
//   }
// }
```

---

## For library authors

> Guidelines and best practices for library authors integrating with Zod

_Source: [https://zod.dev/library-authors](https://zod.dev/library-authors)_

This page is primarily intended for consumption by *library authors* who are building tooling on top of Zod.

If you are a library author and think this page should include some additional guidance, please open an issue!

Zod 3 is functionally end-of-life. It still receives security fixes and unambiguous bug fixes, but no new features will land on `[email protected]`. For any new library — or any new major version of an existing library — target Zod 4 only. See [How to support Zod 3 alongside Zod 4?](#how-to-support-zod-3-alongside-zod-4) for the dual-support pattern, intended for maintainers extending existing libraries.

## [Do I need to depend on Zod?](?id=do-i-need-to-depend-on-zod#do-i-need-to-depend-on-zod)

First things first, make sure you need to depend on Zod at all.

If you're building a library that accepts user-defined schemas to perform black-box validation, you may not need to integrate with Zod specifically. Instead look into [Standard Schema](https://standardschema.dev/). It's a shared interface implemented by most popular validation libraries in the TypeScript ecosystem (see the [full list](https://standardschema.dev/#what-schema-libraries-implement-the-spec)), including Zod.

This spec works great if you accept user-defined schemas and treat them like "black box" validators. Given any compliant library, you can extract inferred input/output types, validate inputs, and get back a standardized error.

If you need Zod specific functionality, read on.

## [How to configure peer dependencies?](?id=how-to-configure-peer-dependencies#how-to-configure-peer-dependencies)

Any library built on top of Zod should include `"zod"` in `"peerDependencies"`. This lets your users "bring their own Zod".

```
// package.json
{
  // ...
  "peerDependencies": {
    "zod": "^4.0.0"
  }
}
```

During development, you need to meet your own peer dependency requirement, so add `"zod"` to your `"devDependencies"` as well.

```
// package.json
{
  "peerDependencies": {
    "zod": "^4.0.0"
  },
  "devDependencies": {
    "zod": "^4.0.0"
  }
}
```

If you're extending an existing library and wish to keep supporting Zod 3 users, see [How to support Zod 3 alongside Zod 4?](#how-to-support-zod-3-alongside-zod-4) for the wider peer dependency range.

## [Which subpaths should I import from?](?id=which-subpaths-should-i-import-from#which-subpaths-should-i-import-from)

Import the Zod 4 core package from the `"zod/v4/core"` subpath:

```
import * as z4 from "zod/v4/core";
```

Think of this subpath as a "permalink" to Zod 4. It will remain available forever, even across future major versions of the `zod` package. The only other permalink subpath is `"zod/v3"`, which you only need if you're [also supporting Zod 3](#how-to-support-zod-3-alongside-zod-4).

You generally shouldn't be importing from any other paths. The Zod Core library is a shared library that undergirds both Zod 4 Classic and Zod 4 Mini. It's generally a bad idea to implement any functionality that is specific to one or the other. Do not import from these subpaths:

* `"zod"` — ❌ In 3.x releases, this exports Zod 3. In 4.x releases, this exports Zod 4. Use the permalinks instead.
* `"zod/v4"` and `"zod/v4/mini"` — ❌ These subpaths are the homes of Zod 4 Classic and Mini, respectively. If you want your library to work with both Zod and Zod Mini, you should build against the base classes defined in `"zod/v4/core"`. If you reference classes from the `"zod/v4"` module, your library will not work with Zod Mini, and vice versa. This is extremely discouraged. Use `"zod/v4/core"` instead, which exports the `$`-prefixed subclasses that are extended by Zod Classic and Zod Mini. The internals of the classic & mini subclasses are identical; they only differ in which helper methods they implement.

For full context on this versioning approach, see the [Versioning in Zod 4](https://github.com/colinhacks/zod/issues/4371) writeup.

## [How to support Zod 3 alongside Zod 4?](?id=how-to-support-zod-3-alongside-zod-4#how-to-support-zod-3-alongside-zod-4)

This section is for maintainers of existing libraries with Zod 3 users. For new libraries (or new major versions of existing libraries), support `^4.0.0` only — Zod 3 is functionally end-of-life and won't receive new features.

If you maintain a library with existing Zod 3 users, you can extend it to cover Zod 4 without dropping them. Widen your peer dependency to span both ranges — the `"zod/v4"` subpath is available starting in `3.25.0`:

```
// package.json
{
  // ...
  "peerDependencies": {
    "zod": "^3.25.0 || ^4.0.0"
  }
}
```

This doesn't require a new major version of your library. Bumping the peer dependency requires your users to `npm upgrade zod`, but there were no breaking changes (in fact, no code changes at all) between `[email protected]` and `[email protected]`, so adding Zod 4 support can land in a minor. If your library is due for a major anyway, cutting one that drops Zod 3 and narrows the peer range to `^4.0.0` is the cleaner option.

Since `v3.25.0` the `zod` package contains copies of both Zod 3 and Zod 4 at their respective subpaths, so you can import both side by side:

```
import * as z3 from "zod/v3";
import * as z4 from "zod/v4/core";
 
type Schema = z3.ZodTypeAny | z4.$ZodType;
 
function acceptUserSchema(schema: z3.ZodTypeAny | z4.$ZodType) {
  // ...
}
```

To differentiate between Zod 3 and Zod 4 schemas at runtime, check for the `"_zod"` property. This property is only defined on Zod 4 schemas.

```
import type * as z3 from "zod/v3";
import type * as z4 from "zod/v4/core";
 
declare const schema: z3.ZodTypeAny | z4.$ZodType;
 
if ("_zod" in schema) {
  schema._zod.def; // Zod 4 schema
} else {
  schema._def; // Zod 3 schema
}
```

## [How to support Zod and Zod Mini simultaneously?](?id=how-to-support-zod-and-zod-mini-simultaneously#how-to-support-zod-and-zod-mini-simultaneously)

Your library code should only import from `"zod/v4/core"`. This sub-package defines the interfaces, classes, and utilities that are shared between Zod and Zod Mini. As long as you follow this rule, both Zod and Zod Mini will work automatically.

```
// library code
import * as z4 from "zod/v4/core";
 
export function acceptObjectSchema<T extends z4.$ZodObject>(schema: T){
  // parse data
  z4.parse(schema, { /* somedata */});
  // inspect internals
  schema._zod.def.shape;
}
```

By building against the shared base interfaces, you can reliably support both sub-packages simultaneously. This function can accept both Zod and Zod Mini schemas.

```
// user code
import { acceptObjectSchema } from "your-library";
 
// Zod 4
import * as z from "zod";
acceptObjectSchema(z.object({ name: z.string() }));
 
// Zod 4 Mini
import * as zm from "zod/mini";
acceptObjectSchema(zm.object({ name: zm.string() }))
```

Refer to the [Zod Core](/packages/core) page for more information on the contents of the core sub-library.

## [How to accept user-defined schemas?](?id=how-to-accept-user-defined-schemas#how-to-accept-user-defined-schemas)

Accepting user-defined schemas is the a fundamental operation for any library built on Zod. This section outlines the best practices for doing so.

When starting out, it may be tempting to write a function that accepts a Zod schema like this:

```
import * as z4 from "zod/v4/core";
 
function inferSchema<T>(schema: z4.$ZodType<T>) {
  return schema;
}
```

This approach is incorrect, and limits TypeScript's ability to properly infer the argument. No matter what you pass in, the type of `schema` will be an instance of `$ZodType`.

```
inferSchema(z.string());
// => $ZodType<string>
```

This approach loses type information, namely *which subclass* the input actually is (in this case, `ZodString`). That means you can't call any string-specific methods like `.min()` on the result of `inferSchema`. Instead, your generic parameter should extend the core Zod schema interface:

```
function inferSchema<T extends z4.$ZodType>(schema: T) {
  return schema;
}
 
inferSchema(z.string());
// => ZodString ✅
```

To constrain the input schema to a specific subclass:

```
import * as z4 from "zod/v4/core";
 
// only accepts object schemas
function inferSchema<T extends z4.$ZodObject>(schema: T) {
  return schema;
}
```

To constrain the inferred output type of the input schema:

```
import * as z4 from "zod/v4/core";
 
// only accepts string schemas
function inferSchema<T extends z4.$ZodType<string>>(schema: T) {
  return schema;
}
 
inferSchema(z.string()); // ✅ 
 
inferSchema(z.number()); 
// ❌ The types of '_zod.output' are incompatible between these types. 
// // Type 'number' is not assignable to type 'string'
```

To parse data with the schema, use the top-level `z4.parse`/`z4.safeParse`/`z4.parseAsync`/`z4.safeParseAsync` functions. The `z4.$ZodType` subclass has no methods on it. The usual parsing methods are implemented by Zod and Zod Mini, but are not available in Zod Core.

```
function parseData<T extends z4.$ZodType>(data: unknown, schema: T): z4.output<T> {
  return z.parse(schema, data);
}
 
parseData("sup", z.string());
// => string
```

---

## Metadata and registries

> Attaching and manipulatinvg metadata on Zod schemas

_Source: [https://zod.dev/metadata](https://zod.dev/metadata)_

It's often useful to associate a schema with some additional *metadata* for documentation, code generation, AI structured outputs, form validation, and other purposes.

## [Registries](?id=registries#registries)

Metadata in Zod is handled via *registries*. Registries are collections of schemas, each associated with some *strongly-typed* metadata. To create a simple registry:

```
import * as z from "zod";
 
const myRegistry = z.registry<{ description: string }>();
```

To register, lookup, and remove schemas from this registry:

```
const mySchema = z.string();
 
myRegistry.add(mySchema, { description: "A cool schema!"});
myRegistry.has(mySchema); // => true
myRegistry.get(mySchema); // => { description: "A cool schema!" }
myRegistry.remove(mySchema);
myRegistry.clear(); // wipe registry
```

TypeScript enforces that the metadata for each schema matches the registry's **metadata type**.

```
myRegistry.add(mySchema, { description: "A cool schema!" }); // ✅
myRegistry.add(mySchema, { description: 123 }); // ❌
```

**Special handling for `id`** — Zod registries treat the `id` property specially. An `Error` will be thrown if multiple schemas are registered with the same `id` value. This is true for all registries, including the global registry.

### [`.register()`](?id=register#register)

**Note** — This method is special in that it does not return a new schema; instead, it returns the original schema. No other Zod method does this! That includes `.meta()` and `.describe()` (documented below) which return a new instance.

Schemas provide a `.register()` method to more conveniently add it to a registry.

```
const mySchema = z.string();
 
mySchema.register(myRegistry, { description: "A cool schema!" });
// => mySchema
```

This lets you define metadata "inline" in your schemas.

```
const mySchema = z.object({
  name: z.string().register(myRegistry, { description: "The user's name" }),
  age: z.number().register(myRegistry, { description: "The user's age" }),
})
```

If a registry is defined without a metadata type, you can use it as a generic "collection", no metadata required.

```
const myRegistry = z.registry();
 
myRegistry.add(z.string());
myRegistry.add(z.number());
```

## [Metadata](?id=metadata#metadata)

### [`z.globalRegistry`](?id=zglobalregistry#zglobalregistry)

For convenience, Zod provides a global registry (`z.globalRegistry`) that can be used to store metadata for JSON Schema generation or other purposes. It accepts the following metadata:

```
export interface GlobalMeta {
  id?: string ;
  title?: string ;
  description?: string;
  deprecated?: boolean;
  [k: string]: unknown;
}
```

To register some metadata in `z.globalRegistry` for a schema:

```
import * as z from "zod";
 
const emailSchema = z.email().register(z.globalRegistry, { 
  id: "email_address",
  title: "Email address",
  description: "Your email address",
  examples: ["[email protected]"]
});
```

To globally augment the `GlobalMeta` interface, use [*declaration merging*](https://www.typescriptlang.org/docs/handbook/declaration-merging.html). Add the following anywhere in your codebase. Creating a `zod.d.ts` file in your project root is a common convention.

```
declare module "zod" {
  interface GlobalMeta {
    // add new fields here
    examples?: unknown[];
  }
}
 
// forces TypeScript to consider the file a module
export {}
```

### [`.meta()`](?id=meta#meta)

For a more convenient approach, use the `.meta()` method to register a schema in `z.globalRegistry`.

ZodZod Mini

```
const emailSchema = z.email().meta({ 
  id: "email_address",
  title: "Email address",
  description: "Please enter a valid email address",
});
```

Calling `.meta()` without an argument will *retrieve* the metadata for a schema.

```
emailSchema.meta();
// => { id: "email_address", title: "Email address", ... }
```

Metadata is associated with a *specific schema instance.* This is important to keep in mind, especially since Zod methods are immutable—they always return a new instance.

```
const A = z.string().meta({ description: "A cool string" });
A.meta(); // => { description: "A cool string" }
 
const B = A.refine(_ => true);
B.meta(); // => undefined
```

### [`.describe()`](?id=describe#describe)

The `.describe()` method remains available, but `.meta()` is the recommended approach.

The `.describe()` method is a shorthand for registering a schema in `z.globalRegistry` with just a `description` field.

ZodZod Mini

```
const emailSchema = z.email();
emailSchema.describe("An email address");
 
// equivalent to
emailSchema.meta({ description: "An email address" });
```

## [Custom registries](?id=custom-registries#custom-registries)

You've already seen a simple example of a custom registry:

```
import * as z from "zod";
 
const myRegistry = z.registry<{ description: string };>();
```

Let's look at some more advanced patterns.

### [Referencing inferred types](?id=referencing-inferred-types#referencing-inferred-types)

It's often valuable for the metadata type to reference the *inferred type* of a schema. For instance, you may want an `examples` field to contain examples of the schema's output.

```
import * as z from "zod";
 
type MyMeta = { examples: z.$output[] };
const myRegistry = z.registry<MyMeta>();
 
myRegistry.add(z.string(), { examples: ["hello", "world"] });
myRegistry.add(z.number(), { examples: [1, 2, 3] });
```

The special symbol `z.$output` is a reference to the schemas inferred output type (`z.infer<typeof schema>`). Similarly you can use `z.$input` to reference the input type.

### [Constraining schema types](?id=constraining-schema-types#constraining-schema-types)

Pass a second generic to `z.registry()` to constrain the schema types that can be added to a registry. This registry only accepts string schemas.

```
import * as z from "zod";
 
const myRegistry = z.registry<{ description: string }, z.ZodString>();
 
myRegistry.add(z.string(), { description: "A number" }); // ✅
myRegistry.add(z.number(), { description: "A number" }); // ❌ 
//             ^ 'ZodNumber' is not assignable to parameter of type 'ZodString'
```

---

## Migration guide

> Complete changelog and migration guide for upgrading from Zod 3 to Zod 4

_Source: [https://zod.dev/v4/changelog](https://zod.dev/v4/changelog)_

This migration guide aims to list the breaking changes in Zod 4 in order of highest to lowest impact. To learn more about the performance enhancements and new features of Zod 4, read the [introductory post](/v4).


```
npm install zod@^4.0.0
```


Many of Zod's behaviors and APIs have been made more intuitive and cohesive. The breaking changes described in this document often represent major quality-of-life improvements for Zod users. I strongly recommend reading this guide thoroughly.

**Note** — Zod 3 exported a number of undocumented quasi-internal utility types and functions that are not considered part of the public API. Changes to those are not documented here.

**Unofficial codemod** — A community-maintained codemod [`zod-v3-to-v4`](https://github.com/nicoespeon/zod-v3-to-v4) is available.

## [Error customization](?id=error-customization#error-customization)

Zod 4 standardizes the APIs for error customization under a single, unified `error` param. Previously Zod's error customization APIs were fragmented and inconsistent. This is cleaned up in Zod 4.

### [deprecates `message` parameter](?id=deprecates-message-parameter#deprecates-message-parameter)

Replaces `message` param with `error`. The old `message` parameter is still supported but deprecated.

Zod 4Zod 3

```
z.string().min(5, { error: "Too short." });
```

### [drops `invalid_type_error` and `required_error`](?id=drops-invalid_type_error-and-required_error#drops-invalid_type_error-and-required_error)

The `invalid_type_error` / `required_error` params have been dropped. These were hastily added years ago as a way to customize errors that was less verbose than `errorMap`. They came with all sorts of footguns (they can't be used in conjunction with `errorMap`) and do not align with Zod's actual issue codes (there is no `required` issue code).

These can now be cleanly represented with the new `error` parameter.

Zod 4Zod 3

```
z.string({ 
  error: (issue) => issue.input === undefined 
    ? "This field is required" 
    : "Not a string" 
});
```

### [drops `errorMap`](?id=drops-errormap#drops-errormap)

This is renamed to `error`.

Error maps can also now return a plain `string` (instead of `{message: string}`). They can also return `undefined`, which tells Zod to yield control to the next error map in the chain.

Zod 4Zod 3

```
z.string().min(5, {
  error: (issue) => {
    if (issue.code === "too_small") {
      return `Value must be >${issue.minimum}`
    }
  },
});
```

## [`ZodError`](?id=zoderror#zoderror)

### [updates issue formats](?id=updates-issue-formats#updates-issue-formats)

The issue formats have been dramatically streamlined.

```
import * as z from "zod"; // v4
 
type IssueFormats = 
  | z.core.$ZodIssueInvalidType
  | z.core.$ZodIssueTooBig
  | z.core.$ZodIssueTooSmall
  | z.core.$ZodIssueInvalidStringFormat
  | z.core.$ZodIssueNotMultipleOf
  | z.core.$ZodIssueUnrecognizedKeys
  | z.core.$ZodIssueInvalidValue
  | z.core.$ZodIssueInvalidUnion
  | z.core.$ZodIssueInvalidKey // new: used for z.record/z.map 
  | z.core.$ZodIssueInvalidElement // new: used for z.map/z.set
  | z.core.$ZodIssueCustom;
```

Below is the list of Zod 3 issues types and their Zod 4 equivalent:

```
import * as z from "zod"; // v3
 
export type IssueFormats =
  | z.ZodInvalidTypeIssue // ♻️ renamed to z.core.$ZodIssueInvalidType
  | z.ZodTooBigIssue  // ♻️ renamed to z.core.$ZodIssueTooBig
  | z.ZodTooSmallIssue // ♻️ renamed to z.core.$ZodIssueTooSmall
  | z.ZodInvalidStringIssue // ♻️ z.core.$ZodIssueInvalidStringFormat
  | z.ZodNotMultipleOfIssue // ♻️ renamed to z.core.$ZodIssueNotMultipleOf
  | z.ZodUnrecognizedKeysIssue // ♻️ renamed to z.core.$ZodIssueUnrecognizedKeys
  | z.ZodInvalidUnionIssue // ♻️ renamed to z.core.$ZodIssueInvalidUnion
  | z.ZodCustomIssue // ♻️ renamed to z.core.$ZodIssueCustom
  | z.ZodInvalidEnumValueIssue // ❌ merged in z.core.$ZodIssueInvalidValue
  | z.ZodInvalidLiteralIssue // ❌ merged into z.core.$ZodIssueInvalidValue
  | z.ZodInvalidUnionDiscriminatorIssue // ❌ throws an Error at schema creation time
  | z.ZodInvalidArgumentsIssue // ❌ z.function throws ZodError directly
  | z.ZodInvalidReturnTypeIssue // ❌ z.function throws ZodError directly
  | z.ZodInvalidDateIssue // ❌ merged into invalid_type
  | z.ZodInvalidIntersectionTypesIssue // ❌ removed (throws regular Error)
  | z.ZodNotFiniteIssue // ❌ infinite values no longer accepted (invalid_type)
```

While certain Zod 4 issue types have been merged, dropped, and modified, each issue remains structurally similar to Zod 3 counterpart (identical, in most cases). All issues still conform to the same base interface as Zod 3, so most common error handling logic will work without modification.

```
export interface $ZodIssueBase {
  readonly code?: string;
  readonly input?: unknown;
  readonly path: PropertyKey[];
  readonly message: string;
}
```

### [changes error map precedence](?id=changes-error-map-precedence#changes-error-map-precedence)

The error map precedence has been changed to be more consistent. Specifically, an error map passed into `.parse()` *no longer* takes precedence over a schema-level error map.

```
const mySchema = z.string({ error: () => "Schema-level error" });
 
// in Zod 3
mySchema.parse(12, { error: () => "Contextual error" }); // => "Contextual error"
 
// in Zod 4
mySchema.parse(12, { error: () => "Contextual error" }); // => "Schema-level error"
```

### [deprecates `.format()`](?id=deprecates-format#deprecates-format)

The `.format()` method on `ZodError` has been deprecated. Instead use the top-level `z.treeifyError()` function. Read the [Formatting errors docs](/error-formatting) for more information.

### [deprecates `.flatten()`](?id=deprecates-flatten#deprecates-flatten)

The `.flatten()` method on `ZodError` has also been deprecated. Instead use the top-level `z.treeifyError()` function. Read the [Formatting errors docs](/error-formatting) for more information.

### [drops `.formErrors`](?id=drops-formerrors#drops-formerrors)

This API was identical to `.flatten()`. It exists for historical reasons and isn't documented.

### [drops `.errors`](?id=drops-errors#drops-errors)

This API was an alias for `.issues` in Zod v3 but has been removed. Use `.issues` instead.

### [deprecates `.addIssue()` and `.addIssues()`](?id=deprecates-addissue-and-addissues#deprecates-addissue-and-addissues)

Directly push to `err.issues` array instead, if necessary.

```
myError.issues.push({ 
  // new issue
});
```


## [`z.number()`](?id=znumber#znumber)

### [no infinite values](?id=no-infinite-values#no-infinite-values)

`POSITIVE_INFINITY` and `NEGATIVE_INFINITY` are no longer considered valid values for `z.number()`.

### [`.safe()` no longer accepts floats](?id=safe-no-longer-accepts-floats#safe-no-longer-accepts-floats)

In Zod 3, `z.number().safe()` is deprecated. It now behaves identically to `.int()` (see below). Importantly, that means it no longer accepts floats.

### [`.int()` accepts safe integers only](?id=int-accepts-safe-integers-only#int-accepts-safe-integers-only)

The `z.number().int()` API no longer accepts unsafe integers (outside the range of `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`). Using integers out of this range causes spontaneous rounding errors. (Also: You should switch to `z.int()`.)

## [`z.string()` updates](?id=zstring-updates#zstring-updates)

### [deprecates `.email()` etc](?id=deprecates-email-etc#deprecates-email-etc)

String formats are now represented as *subclasses* of `ZodString`, instead of simple internal refinements. As such, these APIs have been moved to the top-level `z` namespace. Top-level APIs are also less verbose and more tree-shakable.

```
z.email();
z.uuid();
z.url();
z.emoji();         // validates a single emoji character
z.base64();
z.base64url();
z.nanoid();
z.cuid();
z.cuid2();
z.ulid();
z.ipv4();
z.ipv6();
z.cidrv4();          // ip range
z.cidrv6();          // ip range
z.iso.date();
z.iso.time();
z.iso.datetime();
z.iso.duration();
```

The method forms (`z.string().email()`) still exist and work as before, but are now deprecated.

```
z.string().email(); // ❌ deprecated
z.email(); // ✅
```

### [stricter `.uuid()`](?id=stricter-uuid#stricter-uuid)

The `z.uuid()` now validates UUIDs more strictly against the RFC 9562/4122 specification; specifically, the variant bits must be `10` per the spec. For a more permissive "UUID-like" validator, use `z.guid()`.

```
z.uuid(); // RFC 9562/4122 compliant UUID
z.guid(); // any 8-4-4-4-12 hex pattern
```

### [no padding in `.base64url()`](?id=no-padding-in-base64url#no-padding-in-base64url)

Padding is no longer allowed in `z.base64url()` (formerly `z.string().base64url()`). Generally it's desirable for base64url strings to be unpadded and URL-safe.

### [drops `z.string().ip()`](?id=drops-zstringip#drops-zstringip)

This has been replaced with separate `.ipv4()` and `.ipv6()` methods. Use `z.union()` to combine them if you need to accept both.

```
z.string().ip() // ❌
z.ipv4() // ✅
z.ipv6() // ✅
```

### [updates `z.string().ipv6()`](?id=updates-zstringipv6#updates-zstringipv6)

Validation now happens using the `new URL()` constructor, which is far more robust than the old regular expression approach. Some invalid values that passed validation previously may now fail.

### [drops `z.string().cidr()`](?id=drops-zstringcidr#drops-zstringcidr)

Similarly, this has been replaced with separate `.cidrv4()` and `.cidrv6()` methods. Use `z.union()` to combine them if you need to accept both.

```
z.string().cidr() // ❌
z.cidrv4() // ✅
z.cidrv6() // ✅
```

## [`z.coerce` updates](?id=zcoerce-updates#zcoerce-updates)

The input type of all `z.coerce` schemas is now `unknown`.

```
const schema = z.coerce.string();
type schemaInput = z.input<typeof schema>;
 
// Zod 3: string;
// Zod 4: unknown;
```

## [`.default()` updates](?id=default-updates#default-updates)

The application of `.default()` has changed in a subtle way. If the input is `undefined`, `ZodDefault` short-circuits the parsing process and returns the default value. The default value must be assignable to the *output type*.

```
const schema = z.string()
  .transform(val => val.length)
  .default(0); // should be a number
schema.parse(undefined); // => 0
```

In Zod 3, `.default()` expected a value that matched the *input type*. `ZodDefault` would parse the default value, instead of short-circuiting. As such, the default value must be assignable to the *input type* of the schema.

```
// Zod 3
const schema = z.string()
  .transform(val => val.length)
  .default("tuna");
schema.parse(undefined); // => 4
```

To replicate the old behavior, Zod implements a new `.prefault()` API. This is short for "pre-parse default".

```
// Zod 3
const schema = z.string()
  .transform(val => val.length)
  .prefault("tuna");
schema.parse(undefined); // => 4
```

## [`z.object()`](?id=zobject#zobject)

### [defaults applied within optional fields](?id=defaults-applied-within-optional-fields#defaults-applied-within-optional-fields)

Defaults inside your properties are applied, even within optional fields. This aligns better with expectations and resolves a long-standing usability issue with Zod 3. This is a subtle change that may cause breakage in code paths that rely on key existence, etc.

```
const schema = z.object({
  a: z.string().default("tuna").optional(),
});
 
schema.parse({});
// Zod 4: { a: "tuna" }
// Zod 3: {}
```

### [deprecates `.strict()` and `.passthrough()`](?id=deprecates-strict-and-passthrough#deprecates-strict-and-passthrough)

These methods are generally no longer necessary. Instead use the top-level `z.strictObject()` and `z.looseObject()` functions.

```
// Zod 3
z.object({ name: z.string() }).strict();
z.object({ name: z.string() }).passthrough();
 
// Zod 4
z.strictObject({ name: z.string() });
z.looseObject({ name: z.string() });
```

These methods are still available for backwards compatibility, and they will not be removed. They are considered legacy.

### [deprecates `.strip()`](?id=deprecates-strip#deprecates-strip)

This was never particularly useful, as it was the default behavior of `z.object()`. To convert a strict object to a "regular" one, use `z.object(A.shape)`.

### [drops `.nonstrict()`](?id=drops-nonstrict#drops-nonstrict)

This long-deprecated alias for `.strip()` has been removed.

### [drops `.deepPartial()`](?id=drops-deeppartial#drops-deeppartial)

This has been long deprecated in Zod 3 and it now removed in Zod 4. There is no direct alternative to this API. There were lots of footguns in its implementation, and its use is generally an anti-pattern.

### [changes `z.unknown()` optionality](?id=changes-zunknown-optionality#changes-zunknown-optionality)

The `z.unknown()` and `z.any()` types are no longer marked as "key optional" in the inferred types.

```
const mySchema = z.object({
  a: z.any(),
  b: z.unknown()
});
// Zod 3: { a?: any; b?: unknown };
// Zod 4: { a: any; b: unknown };
```

### [deprecates `.merge()`](?id=deprecates-merge#deprecates-merge)

The `.merge()` method on `ZodObject` has been deprecated in favor of `.extend()`. The `.extend()` method provides the same functionality, avoids ambiguity around strictness inheritance, and has better TypeScript performance.

```
// .merge (deprecated)
const ExtendedSchema = BaseSchema.merge(AdditionalSchema);
 
// .extend (recommended)
const ExtendedSchema = BaseSchema.extend(AdditionalSchema.shape);
 
// or use destructuring (best tsc performance)
const ExtendedSchema = z.object({
  ...BaseSchema.shape,
  ...AdditionalSchema.shape,
});
```

**Note**: For even better TypeScript performance, consider using object destructuring instead of `.extend()`. See the [API documentation](/api?id=extend) for more details.

## [`z.nativeEnum()` deprecated](?id=znativeenum-deprecated#znativeenum-deprecated)

The `z.nativeEnum()` function is now deprecated in favor of just `z.enum()`. The `z.enum()` API has been overloaded to support an enum-like input.

```
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}
 
const ColorSchema = z.enum(Color); // ✅
```

As part of this refactor of `ZodEnum`, a number of long-deprecated and redundant features have been removed. These were all identical and only existed for historical reasons.

```
ColorSchema.enum.Red; // ✅ => "Red" (canonical API)
ColorSchema.Enum.Red; // ❌ removed
ColorSchema.Values.Red; // ❌ removed
```

## [`z.array()`](?id=zarray#zarray)

### [changes `.nonempty()` type](?id=changes-nonempty-type#changes-nonempty-type)

This now behaves identically to `z.array().min(1)`. The inferred type does not change.

```
const NonEmpty = z.array(z.string()).nonempty();
 
type NonEmpty = z.infer<typeof NonEmpty>; 
// Zod 3: [string, ...string[]]
// Zod 4: string[]
```

The old behavior is now better represented with `z.tuple()` and a "rest" argument. This aligns more closely to TypeScript's type system.

```
z.tuple([z.string()], z.string());
// => [string, ...string[]]
```

## [`z.promise()` deprecated](?id=zpromise-deprecated#zpromise-deprecated)

There's rarely a reason to use `z.promise()`. If you have an input that may be a `Promise`, just `await` it before parsing it with Zod.

If you are using `z.promise` to define an async function with `z.function()`, that's no longer necessary either; see the [`ZodFunction`](#function) section below.

## [`z.function()`](?id=zfunction#zfunction)

The result of `z.function()` is no longer a Zod schema. Instead, it acts as a standalone "function factory" for defining Zod-validated functions. The API has also changed; you define an `input` and `output` schema upfront, instead of using `args()` and `.returns()` methods.

Zod 4Zod 3

```
const myFunction = z.function({
  input: [z.object({
    name: z.string(),
    age: z.number().int(),
  })],
  output: z.string(),
});
 
myFunction.implement((input) => {
  return `Hello ${input.name}, you are ${input.age} years old.`;
});
```

If you have a desperate need for a Zod schema with a function type, consider [this workaround](https://github.com/colinhacks/zod/issues/4143#issuecomment-2845134912).

### [adds `.implementAsync()`](?id=adds-implementasync#adds-implementasync)

To define an async function, use `implementAsync()` instead of `implement()`.

```
myFunction.implementAsync(async (input) => {
  return `Hello ${input.name}, you are ${input.age} years old.`;
});
```

## [`.refine()`](?id=refine#refine)

### [ignores type predicates](?id=ignores-type-predicates#ignores-type-predicates)

In Zod 3, passing a [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) as a refinement functions could still narrow the type of a schema. This wasn't documented but was discussed in some issues. This is no longer the case.

```
const mySchema = z.unknown().refine((val): val is string => {
  return typeof val === "string"
});
 
type MySchema = z.infer<typeof mySchema>; 
// Zod 3: `string`
// Zod 4: still `unknown`
```

### [drops `ctx.path`](?id=drops-ctxpath#drops-ctxpath)

Zod's new parsing architecture does not eagerly evaluate the `path` array. This was a necessary change that unlocks Zod 4's dramatic performance improvements.

```
z.string().superRefine((val, ctx) => {
  ctx.path; // ❌ no longer available
});
```

### [drops function as second argument](?id=drops-function-as-second-argument#drops-function-as-second-argument)

The following horrifying overload has been removed.

```
const longString = z.string().refine(
  (val) => val.length > 10,
  (val) => ({ message: `${val} is not more than 10 characters` })
);
```


## [`z.ostring()`, etc dropped](?id=zostring-etc-dropped#zostring-etc-dropped)

The undocumented convenience methods `z.ostring()`, `z.onumber()`, etc. have been removed. These were shorthand methods for defining optional string schemas.

## [`z.literal()`](?id=zliteral#zliteral)

### [drops `symbol` support](?id=drops-symbol-support#drops-symbol-support)

Symbols aren't considered literal values, nor can they be simply compared with `===`. This was an oversight in Zod 3.

## [static `.create()` factories dropped](?id=static-create-factories-dropped#static-create-factories-dropped)

Previously all Zod classes defined a static `.create()` method. These are now implemented as standalone factory functions.

```
z.ZodString.create(); // ❌
```

## [`z.record()`](?id=zrecord#zrecord)

### [drops single argument usage](?id=drops-single-argument-usage#drops-single-argument-usage)

Before, `z.record()` could be used with a single argument. This is no longer supported.

```
// Zod 3
z.record(z.string()); // ✅
 
// Zod 4
z.record(z.string()); // ❌
z.record(z.string(), z.string()); // ✅
```

### [improves enum support](?id=improves-enum-support#improves-enum-support)

Records have gotten a lot smarter. In Zod 3, passing an enum into `z.record()` as a key schema would result in a partial type

```
const myRecord = z.record(z.enum(["a", "b", "c"]), z.number()); 
// { a?: number; b?: number; c?: number; }
```

In Zod 4, this is no longer the case. The inferred type is what you'd expect, and Zod ensures exhaustiveness; that is, it makes sure all enum keys exist in the input during parsing.

```
const myRecord = z.record(z.enum(["a", "b", "c"]), z.number());
// { a: number; b: number; c: number; }
```

To replicate the old behavior with optional keys, use `z.partialRecord()`:

```
const myRecord = z.partialRecord(z.enum(["a", "b", "c"]), z.number());
// { a?: number; b?: number; c?: number; }
```

## [`z.intersection()`](?id=zintersection#zintersection)

### [throws `Error` on merge conflict](?id=throws-error-on-merge-conflict#throws-error-on-merge-conflict)

Zod intersection parses the input against two schemas, then attempts to merge the results. In Zod 3, when the results were unmergable, Zod threw a `ZodError` with a special `"invalid_intersection_types"` issue.

In Zod 4, this will throw a regular `Error` instead. The existence of unmergable results indicates a structural problem with the schema: an intersection of two incompatible types. Thus, a regular error is more appropriate than a validation error.

## [Internal changes](?id=internal-changes#internal-changes)

The typical user of Zod can likely ignore everything below this line. These changes do not impact the user-facing `z` APIs.

There are too many internal changes to list here, but some may be relevant to regular users who are (intentionally or not) relying on certain implementation details. These changes will be of particular interest to library authors building tools on top of Zod.

### [updates generics](?id=updates-generics#updates-generics)

The generic structure of several classes has changed. Perhaps most significant is the change to the `ZodType` base class:

```
// Zod 3
class ZodType<Output, Def extends z.ZodTypeDef, Input = Output> {
  // ...
}
 
// Zod 4
class ZodType<Output = unknown, Input = unknown> {
  // ...
}
```

The second generic `Def` has been entirely removed. Instead the base class now only tracks `Output` and `Input`. While previously the `Input` value defaulted to `Output`, it now defaults to `unknown`. This allows generic functions involving `z.ZodType` to behave more intuitively in many cases.

```
function inferSchema<T extends z.ZodType>(schema: T): T {
  return schema;
};
 
inferSchema(z.string()); // z.ZodString
```

The need for `z.ZodTypeAny` has been eliminated; just use `z.ZodType` instead.

### [adds `z.core`](?id=adds-zcore#adds-zcore)

Many utility functions and types have been moved to the new `zod/v4/core` sub-package, to facilitate code sharing between Zod and Zod Mini.

```
import * as z from "zod/v4/core";
 
function handleError(iss: z.$ZodError) {
  // do stuff
}
```

For convenience, the contents of `zod/v4/core` are also re-exported from `zod` and `zod/mini` under the `z.core` namespace.

```
import * as z from "zod";
 
function handleError(iss: z.core.$ZodError) {
  // do stuff
}
```

Refer to the [Zod Core](/packages/core) docs for more information on the contents of the core sub-library.

### [moves `._def`](?id=moves-_def#moves-_def)

The `._def` property is now moved to `._zod.def`. The structure of all internal defs is subject to change; this is relevant to library authors but won't be comprehensively documented here.

### [drops `ZodEffects`](?id=drops-zodeffects#drops-zodeffects)

This doesn't affect the user-facing APIs, but it's an internal change worth highlighting. It's part of a larger restructure of how Zod handles *refinements*.

Previously both refinements and transformations lived inside a wrapper class called `ZodEffects`. That means adding either one to a schema would wrap the original schema in a `ZodEffects` instance. In Zod 4, refinements now live inside the schemas themselves. More accurately, each schema contains an array of "checks"; the concept of a "check" is new in Zod 4 and generalizes the concept of a refinement to include potentially side-effectful transforms like `z.toLowerCase()`.

This is particularly apparent in the Zod Mini API, which heavily relies on the `.check()` method to compose various validations together.

```
import * as z from "zod/mini";
 
z.string().check(
  z.minLength(10),
  z.maxLength(100),
  z.toLowerCase(),
  z.trim(),
);
```

### [adds `ZodTransform`](?id=adds-zodtransform#adds-zodtransform)

Meanwhile, transforms have been moved into a dedicated `ZodTransform` class. This schema class represents an input transform; in fact, you can actually define standalone transformations now:

```
import * as z from "zod";
 
const schema = z.transform(input => String(input));
 
schema.parse(12); // => "12"
```

This is primarily used in conjunction with `ZodPipe`. The `.transform()` method now returns an instance of `ZodPipe`.

```
z.string().transform(val => val); // ZodPipe<ZodString, ZodTransform>
```

### [drops `ZodPreprocess`](?id=drops-zodpreprocess#drops-zodpreprocess)

As with `.transform()`, the `z.preprocess()` function now returns a `ZodPipe` instance instead of a dedicated `ZodPreprocess` instance.

```
z.preprocess(val => val, z.string()); // ZodPipe<ZodTransform, ZodString>
```

### [drops `ZodBranded`](?id=drops-zodbranded#drops-zodbranded)

Branding is now handled with a direct modification to the inferred type, instead of a dedicated `ZodBranded` class. The user-facing APIs remain the same.

---

## Release notes

> Zod 4 release notes and new features including performance improvements and breaking changes

_Source: [https://zod.dev/v4](https://zod.dev/v4)_

After a year of active development: Zod 4 is now stable! It's faster, slimmer, more `tsc`-efficient, and implements some long-requested features.

❤️

Huge thanks to [Clerk](https://go.clerk.com/zod-clerk), who supported my work on Zod 4 through their extremely generous [OSS Fellowship](https://clerk.com/blog/zod-fellowship). They were an amazing partner throughout the (much longer than anticipated!) development process.

## [Versioning](?id=versioning#versioning)


To upgrade:

```
npm install zod@^4.0.0
```


For a complete list of breaking changes, refer to the [Migration guide](/v4/changelog). This post focuses on new features & enhancements.

## [Why a new major version?](?id=why-a-new-major-version#why-a-new-major-version)

Zod v3.0 was released in May 2021 (!). Back then Zod had 2700 stars on GitHub and 600k weekly downloads. Today it has 37.8k stars and 31M weekly downloads (up from 23M when the beta came out 6 weeks ago!). After 24 minor versions, the Zod 3 codebase had hit a ceiling; the most commonly requested features and improvements require breaking changes.

Zod 4 fixes a number of long-standing design limitations of Zod 3 in one fell swoop, paving the way for several long-requested features and a huge leap in performance. It closes 9 of Zod's [10 most upvoted open issues](https://github.com/colinhacks/zod/issues?q=is%3Aissue%20state%3Aopen%20sort%3Areactions-%2B1-desc). With luck, it will serve as the new foundation for many more years to come.

For a scannable breakdown of what's new, see the table of contents. Click on any item to jump to that section.

## [Benchmarks](?id=benchmarks#benchmarks)

You can run these benchmarks yourself in the Zod repo:

```
$ git clone [email protected]:colinhacks/zod.git
$ cd zod
$ git switch v4
$ pnpm install
```

Then to run a particular benchmark:

```
$ pnpm bench <name>
```

### [14x faster string parsing](?id=14x-faster-string-parsing#14x-faster-string-parsing)

```
$ pnpm bench string
runtime: node v22.13.0 (arm64-darwin)
 
benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.string().parse
------------------------------------------------- -----------------------------
zod3          363 µs/iter       (338 µs … 683 µs)    351 µs    467 µs    572 µs
zod4       24'674 ns/iter    (21'083 ns … 235 µs) 24'209 ns 76'125 ns    120 µs
 
summary for z.string().parse
  zod4
   14.71x faster than zod3
```

### [7x faster array parsing](?id=7x-faster-array-parsing#7x-faster-array-parsing)

```
$ pnpm bench array
runtime: node v22.13.0 (arm64-darwin)
 
benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.array() parsing
------------------------------------------------- -----------------------------
zod3          147 µs/iter       (137 µs … 767 µs)    140 µs    246 µs    520 µs
zod4       19'817 ns/iter    (18'125 ns … 436 µs) 19'125 ns 44'500 ns    137 µs
 
summary for z.array() parsing
  zod4
   7.43x faster than zod3
```

### [6.5x faster object parsing](?id=65x-faster-object-parsing#65x-faster-object-parsing)

This runs the [Moltar validation library benchmark](https://moltar.github.io/typescript-runtime-type-benchmarks/).

```
$ pnpm bench object-moltar
benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.object() safeParse
------------------------------------------------- -----------------------------
zod3          805 µs/iter     (771 µs … 2'802 µs)    804 µs    928 µs  2'802 µs
zod4          124 µs/iter     (118 µs … 1'236 µs)    119 µs    231 µs    329 µs
 
summary for z.object() safeParse
  zod4
   6.5x faster than zod3
```

## [100x reduction in `tsc` instantiations](?id=100x-reduction-in-tsc-instantiations#100x-reduction-in-tsc-instantiations)

Consider the following simple file:

```
import * as z from "zod";
 
export const A = z.object({
  a: z.string(),
  b: z.string(),
  c: z.string(),
  d: z.string(),
  e: z.string(),
});
 
export const B = A.extend({
  f: z.string(),
  g: z.string(),
  h: z.string(),
});
```

Compiling this file with `tsc --extendedDiagnostics` using `"zod/v3"` results in >25000 type instantiations. With `"zod/v4"` it only results in ~175.

The Zod repo contains a `tsc` benchmarking playground. Try this for yourself using the compiler benchmarks in `packages/tsc`. The exact numbers may change as the implementation evolves.

```
$ cd packages/tsc
$ pnpm bench object-with-extend
```

More importantly, Zod 4 has redesigned and simplified the generics of `ZodObject` and other schema classes to avoid some pernicious "instantiation explosions". For instance, chaining `.extend()` and `.omit()` repeatedly—something that previously caused compiler issues:

```
import * as z from "zod";
 
export const a = z.object({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
 
export const b = a.omit({
  a: true,
  b: true,
  c: true,
});
 
export const c = b.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
 
export const d = c.omit({
  a: true,
  b: true,
  c: true,
});
 
export const e = d.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
 
export const f = e.omit({
  a: true,
  b: true,
  c: true,
});
 
export const g = f.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
 
export const h = g.omit({
  a: true,
  b: true,
  c: true,
});
 
export const i = h.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
 
export const j = i.omit({
  a: true,
  b: true,
  c: true,
});
 
export const k = j.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
 
export const l = k.omit({
  a: true,
  b: true,
  c: true,
});
 
export const m = l.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
 
export const n = m.omit({
  a: true,
  b: true,
  c: true,
});
 
export const o = n.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
 
export const p = o.omit({
  a: true,
  b: true,
  c: true,
});
 
export const q = p.extend({
  a: z.string(),
  b: z.string(),
  c: z.string(),
});
```

In Zod 3, this took `4000ms` to compile; and adding additional calls to `.extend()` would trigger a "Possibly infinite" error. In Zod 4, this compiles in `400ms`, `10x` faster.

Coupled with the upcoming [`tsgo`](https://github.com/microsoft/typescript-go) compiler, Zod 4's editor performance will scale to vastly larger schemas and codebases.

## [2x reduction in core bundle size](?id=2x-reduction-in-core-bundle-size#2x-reduction-in-core-bundle-size)

Consider the following simple script.

```
import * as z from "zod";
 
const schema = z.boolean();
 
schema.parse(true);
```

It's about as simple as it gets when it comes to validation. That's intentional; it's a good way to measure the *core bundle size*—the code that will end up in the bundle even in simple cases. We'll bundle this with `rollup` using both Zod 3 and Zod 4 and compare the final bundles.

| Package | Bundle (gzip) |
| --- | --- |
| Zod 3 | `12.47kb` |
| Zod 4 | `5.36kb` |

The core bundle is ~57% smaller in Zod 4 (2.3x). That's good! But we can do a lot better.

## [Introducing Zod Mini](?id=introducing-zod-mini#introducing-zod-mini)

Zod's method-heavy API is fundamentally difficult to tree-shake. Even our simple `z.boolean()` script pulls in the implementations of a bunch of methods we didn't use, like `.optional()`, `.array()`, etc. Writing slimmer implementations can only get you so far. That's where Zod Mini comes in.

```
npm install zod@^4.0.0
```

It's a Zod variant with a functional, tree-shakable API that corresponds one-to-one with `zod`. Where Zod uses methods, Zod Mini generally uses wrapper functions:

Zod MiniZod

```
import * as z from "zod/mini";
 
z.optional(z.string());
 
z.union([z.string(), z.number()]);
 
z.extend(z.object({ /* ... */ }), { age: z.number() });
```

Not all methods are gone! The parsing methods are identical in Zod and Zod Mini:

```
import * as z from "zod/mini";
 
z.string().parse("asdf");
z.string().safeParse("asdf");
await z.string().parseAsync("asdf");
await z.string().safeParseAsync("asdf");
```

There's also a general-purpose `.check()` method used to add refinements.

Zod MiniZod

```
import * as z from "zod/mini";
 
z.array(z.number()).check(
  z.minLength(5), 
  z.maxLength(10),
  z.refine(arr => arr.includes(5))
);
```

The following top-level refinements are available in Zod Mini. It should be fairly self-explanatory which Zod methods they correspond to.

```
import * as z from "zod/mini";
 
// custom checks
z.refine();
 
// first-class checks
z.lt(value);
z.lte(value); // alias: z.maximum()
z.gt(value);
z.gte(value); // alias: z.minimum()
z.positive();
z.negative();
z.nonpositive();
z.nonnegative();
z.multipleOf(value);
z.maxSize(value);
z.minSize(value);
z.size(value);
z.maxLength(value);
z.minLength(value);
z.length(value);
z.regex(regex);
z.lowercase();
z.uppercase();
z.includes(value);
z.startsWith(value);
z.endsWith(value);
z.property(key, schema); // for object schemas; check `input[key]` against `schema`
z.mime(value); // for file schemas (see below)
 
// overwrites (these *do not* change the inferred type!)
z.overwrite(value => newValue);
z.normalize();
z.trim();
z.toLowerCase();
z.toUpperCase();
```

This more functional API makes it easier for bundlers to tree-shake the APIs you don't use. While regular Zod is still recommended for the majority of use cases, any projects with uncommonly strict bundle size constraints should consider Zod Mini.

### [6.6x reduction in core bundle size](?id=66x-reduction-in-core-bundle-size#66x-reduction-in-core-bundle-size)

Here's the script from above, updated to use `"zod/mini"` instead of `"zod"`.

```
import * as z from "zod/mini";
 
const schema = z.boolean();
schema.parse(false);
```

When we build this with `rollup`, the gzipped bundle size is `1.88kb`. That's an 85% (6.6x) reduction in core bundle size compared to `zod@3`.

| Package | Bundle (gzip) |
| --- | --- |
| Zod 3 | `12.47kb` |
| Zod 4 (regular) | `5.36kb` |
| Zod 4 (mini) | `1.88kb` |

Learn more on the dedicated [`zod/mini`](/packages/mini) docs page. Complete API details are mixed into existing documentation pages; code blocks contain separate tabs for `"Zod"` and `"Zod Mini"` wherever their APIs diverge.

## [Metadata](?id=metadata#metadata)

Zod 4 introduces a new system for adding strongly-typed metadata to your schemas. Metadata isn't stored inside the schema itself; instead it's stored in a "schema registry" that associates a schema with some typed metadata. To create a registry with `z.registry()`:

```
import * as z from "zod";
 
const myRegistry = z.registry<{ title: string; description: string }>();
```

To add schemas to your registry:

```
const emailSchema = z.string().email();
 
myRegistry.add(emailSchema, { title: "Email address", description: "..." });
myRegistry.get(emailSchema);
// => { title: "Email address", ... }
```

Alternatively, you can use the `.register()` method on a schema for convenience:


```
emailSchema.register(myRegistry, { title: "Email address", description: "..." })
// => returns emailSchema
```

### [The global registry](?id=the-global-registry#the-global-registry)

Zod also exports a global registry `z.globalRegistry` that accepts some common JSON Schema-compatible metadata:

```
z.globalRegistry.add(z.string(), { 
  id: "email_address",
  title: "Email address",
  description: "Provide your email",
  examples: ["[email protected]"],
  extraKey: "Additional properties are also allowed"
});
```

### [`.meta()`](?id=meta#meta)

To conveniently add a schema to `z.globalRegistry`, use the `.meta()` method.


```
z.string().meta({ 
  id: "email_address",
  title: "Email address",
  description: "Provide your email",
  examples: ["[email protected]"],
  // ...
});
```

For compatibility with Zod 3, `.describe()` is still available, but `.meta()` is preferred.

```
z.string().describe("An email address");
 
// equivalent to
z.string().meta({ description: "An email address" });
```

## [JSON Schema conversion](?id=json-schema-conversion#json-schema-conversion)

Zod 4 introduces first-party JSON Schema conversion via `z.toJSONSchema()`.

```
import * as z from "zod";
 
const mySchema = z.object({name: z.string(), points: z.number()});
 
z.toJSONSchema(mySchema);
// => {
//   type: "object",
//   properties: {
//     name: {type: "string"},
//     points: {type: "number"},
//   },
//   required: ["name", "points"],
// }
```

Any metadata in `z.globalRegistry` is automatically included in the JSON Schema output.

```
const mySchema = z.object({
  firstName: z.string().describe("Your first name"),
  lastName: z.string().meta({ title: "last_name" }),
  age: z.number().meta({ examples: [12, 99] }),
});
 
z.toJSONSchema(mySchema);
// => {
//   type: 'object',
//   properties: {
//     firstName: { type: 'string', description: 'Your first name' },
//     lastName: { type: 'string', title: 'last_name' },
//     age: { type: 'number', examples: [ 12, 99 ] }
//   },
//   required: [ 'firstName', 'lastName', 'age' ]
// }
```

Refer to the [JSON Schema docs](/json-schema) for information on customizing the generated JSON Schema.

## [Recursive objects](?id=recursive-objects#recursive-objects)

This was an unexpected one. After years of trying to crack this problem, I finally [found a way](https://x.com/colinhacks/status/1919286275133378670) to properly infer recursive object types in Zod. To define a recursive type:

```
const Category = z.object({
  name: z.string(),
  get subcategories(){
    return z.array(Category)
  }
});
 
type Category = z.infer<typeof Category>;
// { name: string; subcategories: Category[] }
```

You can also represent *mutually recursive types*:

```
const User = z.object({
  email: z.email(),
  get posts(){
    return z.array(Post)
  }
});
 
const Post = z.object({
  title: z.string(),
  get author(){
    return User
  }
});
```

Unlike the Zod 3 pattern for recursive types, there's no type casting required. The resulting schemas are plain `ZodObject` instances and have the full set of methods available.

```
Post.pick({ title: true })
Post.partial();
Post.extend({ publishDate: z.date() });
```

## [File schemas](?id=file-schemas#file-schemas)

To validate `File` instances:

```
const fileSchema = z.file();
 
fileSchema.min(10_000); // minimum .size (bytes)
fileSchema.max(1_000_000); // maximum .size (bytes)
fileSchema.mime(["image/png"]); // MIME type
```

## [Internationalization](?id=internationalization#internationalization)

Zod 4 introduces a new `locales` API for globally translating error messages into different languages.

```
import * as z from "zod";
 
// configure English locale (default)
z.config(z.locales.en());
```

See the full list of supported locales in [Customizing errors](/error-customization#locales); this section is always updated with a list of supported languages as they become available.

## [Error pretty-printing](?id=error-pretty-printing#error-pretty-printing)

The popularity of the [`zod-validation-error`](https://www.npmjs.com/package/zod-validation-error) package demonstrates that there's significant demand for an official API for pretty-printing errors. If you are using that package currently, by all means continue using it.

Zod now implements a top-level `z.prettifyError` function for converting a `ZodError` to a user-friendly formatted string.

```
const myError = new z.ZodError([
  {
    code: 'unrecognized_keys',
    keys: [ 'extraField' ],
    path: [],
    message: 'Unrecognized key: "extraField"'
  },
  {
    expected: 'string',
    code: 'invalid_type',
    path: [ 'username' ],
    message: 'Invalid input: expected string, received number'
  },
  {
    origin: 'number',
    code: 'too_small',
    minimum: 0,
    inclusive: true,
    path: [ 'favoriteNumbers', 1 ],
    message: 'Too small: expected number to be >=0'
  }
]);
 
z.prettifyError(myError);
```

This returns the following pretty-printable multi-line string:

```
✖ Unrecognized key: "extraField"
✖ Invalid input: expected string, received number
  → at username
✖ Invalid input: expected number, received string
  → at favoriteNumbers[1]
```

Currently the formatting isn't configurable; this may change in the future.

## [Top-level string formats](?id=top-level-string-formats#top-level-string-formats)

All "string formats" (email, etc.) have been promoted to top-level functions on the `z` module. This is both more concise and more tree-shakable. The method equivalents (`z.string().email()`, etc.) are still available but have been deprecated. They'll be removed in the next major version.

```
z.email();
z.uuidv4();
z.uuidv7();
z.uuidv8();
z.ipv4();
z.ipv6();
z.cidrv4();
z.cidrv6();
z.url();
z.e164();
z.base64();
z.base64url();
z.jwt();
z.lowercase();
z.iso.date();
z.iso.datetime();
z.iso.duration();
z.iso.time();
```

### [Custom email regex](?id=custom-email-regex#custom-email-regex)

The `z.email()` API now supports a custom regular expression. There is no one canonical email regex; different applications may choose to be more or less strict. For convenience Zod exports some common ones.

```
// Zod's default email regex (Gmail rules)
// see colinhacks.com/essays/reasonable-email-regex
z.email(); // z.regexes.email
 
// the regex used by browsers to validate input[type=email] fields
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
z.email({ pattern: z.regexes.html5Email });
 
// the classic emailregex.com regex (RFC 5322)
z.email({ pattern: z.regexes.rfc5322Email });
 
// a loose regex that allows Unicode (good for intl emails)
z.email({ pattern: z.regexes.unicodeEmail });
```

## [Template literal types](?id=template-literal-types#template-literal-types)

Zod 4 implements `z.templateLiteral()`. Template literal types are perhaps the biggest feature of TypeScript's type system that wasn't previously representable.

```
const hello = z.templateLiteral(["hello, ", z.string()]);
// `hello, ${string}`
 
const cssUnits = z.enum(["px", "em", "rem", "%"]);
const css = z.templateLiteral([z.number(), cssUnits]);
// `${number}px` | `${number}em` | `${number}rem` | `${number}%`
 
const email = z.templateLiteral([
  z.string().min(1),
  "@",
  z.string().max(64),
]);
// `${string}@${string}` (the min/max refinements are enforced!)
```

Every Zod schema type that can be stringified stores an internal regex: strings, string formats like `z.email()`, numbers, boolean, bigint, enums, literals, undefined/optional, null/nullable, and other template literals. The `z.templateLiteral` constructor concatenates these into a super-regex, so things like string formats (`z.email()`) are properly enforced (but custom refinements are not!).

Read the [template literal docs](/api#template-literals) for more info.

## [Number formats](?id=number-formats#number-formats)

New numeric "formats" have been added for representing fixed-width integer and float types. These return a `ZodNumber` instance with proper inclusive minimum/maximum constraints already added.

```
z.int();      // [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
z.float32();  // [-3.4028234663852886e38, 3.4028234663852886e38]
z.float64();  // [-1.7976931348623157e308, 1.7976931348623157e308]
z.int32();    // [-2147483648, 2147483647]
z.uint32();   // [0, 4294967295]
```

Similarly the following `bigint` numeric formats have also been added. These integer types exceed what can be safely represented by a `number` in JavaScript, so these return a `ZodBigInt` instance with the proper inclusive minimum/maximum constraints already added.

```
z.int64();    // [-9223372036854775808n, 9223372036854775807n]
z.uint64();   // [0n, 18446744073709551615n]
```

## [Stringbool](?id=stringbool#stringbool)

The existing `z.coerce.boolean()` API is very simple: falsy values (`false`, `undefined`, `null`, `0`, `""`, `NaN` etc) become `false`, truthy values become `true`.

This is still a good API, and its behavior aligns with the other `z.coerce` APIs. But some users requested a more sophisticated "env-style" boolean coercion. To support this, Zod 4 introduces `z.stringbool()`:

```
const strbool = z.stringbool();
 
strbool.parse("true")         // => true
strbool.parse("1")            // => true
strbool.parse("yes")          // => true
strbool.parse("on")           // => true
strbool.parse("y")            // => true
strbool.parse("enabled")      // => true
 
strbool.parse("false");       // => false
strbool.parse("0");           // => false
strbool.parse("no");          // => false
strbool.parse("off");         // => false
strbool.parse("n");           // => false
strbool.parse("disabled");    // => false
 
strbool.parse(/* anything else */); // ZodError<[{ code: "invalid_value" }]>
```

To customize the truthy and falsy values:

```
z.stringbool({
  truthy: ["yes", "true"],
  falsy: ["no", "false"]
})
```

Refer to the [`z.stringbool()` docs](/api#stringbool) for more information.

## [Simplified error customization](?id=simplified-error-customization#simplified-error-customization)

The majority of breaking changes in Zod 4 involve the *error customization* APIs. They were a bit of a mess in Zod 3; Zod 4 makes things significantly more elegant, to the point where I think it's worth highlighting here.

Long story short, there is now a single, unified `error` parameter for customizing errors, replacing the following APIs:

Replace `message` with `error`. (The `message` parameter is still supported but deprecated.)

```
- z.string().min(5, { message: "Too short." });
+ z.string().min(5, { error: "Too short." });
```

Replace `invalid_type_error` and `required_error` with `error` (function syntax):

```
// Zod 3
- z.string({ 
-   required_error: "This field is required" 
-   invalid_type_error: "Not a string", 
- });
 
// Zod 4 
+ z.string({ error: (issue) => issue.input === undefined ? 
+  "This field is required" :
+  "Not a string" 
+ });
```

Replace `errorMap` with `error` (function syntax):

```
// Zod 3 
- z.string({
-   errorMap: (issue, ctx) => {
-     if (issue.code === "too_small") {
-       return { message: `Value must be >${issue.minimum}` };
-     }
-     return { message: ctx.defaultError };
-   },
- });
 
// Zod 4
+ z.string({
+   error: (issue) => {
+     if (issue.code === "too_small") {
+       return `Value must be >${issue.minimum}`
+     }
+   },
+ });
```

## [Upgraded `z.discriminatedUnion()`](?id=upgraded-zdiscriminatedunion#upgraded-zdiscriminatedunion)

Discriminated unions now support a number of schema types not previously supported, including unions and pipes:

```
const MyResult = z.discriminatedUnion("status", [
  // simple literal
  z.object({ status: z.literal("aaa"), data: z.string() }),
  // union discriminator
  z.object({ status: z.union([z.literal("bbb"), z.literal("ccc")]) }),
  // pipe discriminator
  z.object({ status: z.literal("fail").transform(val => val.toUpperCase()) }),
]);
```

Perhaps most importantly, discriminated unions now *compose*—you can use one discriminated union as a member of another.

```
const BaseError = z.object({ status: z.literal("failed"), message: z.string() });
 
const MyResult = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.discriminatedUnion("code", [
    BaseError.extend({ code: z.literal(400) }),
    BaseError.extend({ code: z.literal(401) }),
    BaseError.extend({ code: z.literal(500) })
  ])
]);
```

## [Multiple values in `z.literal()`](?id=multiple-values-in-zliteral#multiple-values-in-zliteral)

The `z.literal()` API now optionally supports multiple values.

```
const httpCodes = z.literal([ 200, 201, 202, 204, 206, 207, 208, 226 ]);
 
// previously in Zod 3:
const httpCodes = z.union([
  z.literal(200),
  z.literal(201),
  z.literal(202),
  z.literal(204),
  z.literal(206),
  z.literal(207),
  z.literal(208),
  z.literal(226)
]);
```

## [Refinements live inside schemas](?id=refinements-live-inside-schemas#refinements-live-inside-schemas)

In Zod 3, they were stored in a `ZodEffects` class that wrapped the original schema. This was inconvenient, as it meant you couldn't interleave `.refine()` with other schema methods like `.min()`.

```
z.string()
  .refine(val => val.includes("@"))
  .min(5);
// ^ ❌ Property 'min' does not exist on type ZodEffects<ZodString, string, string>
```

In Zod 4, refinements are stored inside the schemas themselves, so the code above works as expected.

```
z.string()
  .refine(val => val.includes("@"))
  .min(5); // ✅
```

### [`.overwrite()`](?id=overwrite#overwrite)

The `.transform()` method is extremely useful, but it has one major downside: the output type is no longer *introspectable* at runtime. The transform function is a black box that can return anything. This means (among other things) there's no sound way to convert the schema to JSON Schema.

```
const Squared = z.number().transform(val => val ** 2);
// => ZodPipe<ZodNumber, ZodTransform>
```

Zod 4 introduces a new `.overwrite()` method for representing transforms that *don't change the inferred type*. Unlike `.transform()`, this method returns an instance of the original class. The overwrite function is stored as a refinement, so it doesn't (and can't) modify the inferred type.

```
z.number().overwrite(val => val ** 2).max(100);
// => ZodNumber
```

The existing `.trim()`, `.toLowerCase()` and `.toUpperCase()` methods have been reimplemented using `.overwrite()`.

## [An extensible foundation: `zod/v4/core`](?id=an-extensible-foundation-zodv4core#an-extensible-foundation-zodv4core)

While this will not be relevant to the majority of Zod users, it's worth highlighting. The addition of Zod Mini necessitated the creation of a shared sub-package `zod/v4/core` which contains the core functionality shared between Zod and Zod Mini.

I was resistant to this at first, but now I see it as one of Zod 4's most important features. It lets Zod level up from a simple library to a fast validation "substrate" that can be sprinkled into other libraries.

If you're building a schema library, refer to the implementations of Zod and Zod Mini to see how to build on top of the foundation `zod/v4/core` provides. Don't hesitate to get in touch in GitHub discussions or via [X](https://x.com/colinhacks)/[Bluesky](https://bsky.app/profile/colinhacks.com) for help or feedback.

## [Wrapping up](?id=wrapping-up#wrapping-up)

I'm planning to write up a series of additional posts explaining the design process behind some major features like Zod Mini. I'll update this section as those get posted.

For library authors, there is now a dedicated [For library authors](/library-authors) guide that describes the best practices for building on top of Zod. It answers common questions about how to support Zod 3 & Zod 4 (including Mini) simultaneously.

```
pnpm upgrade zod@latest
```

Happy parsing!  
— Colin McDonnell [@colinhacks](https://x.com/colinhacks)

---

## Versioning

> Versioning strategy and compatibility information for Zod 4

_Source: [https://zod.dev/v4/versioning](https://zod.dev/v4/versioning)_

### [**Update — July 8th, 2025**](?id=update--july-8th-2025#update--july-8th-2025)

`[email protected]` has been published to `npm`. The package root (`"zod"`) now exports Zod 4. All other subpaths have not changed and will remain available forever.

To upgrade to Zod 4:

```
npm install zod@^4.0.0
```

If you are using Zod 4, your existing imports (`"zod/v4"` and `"zod/v4-mini"`) will continue to work forever. However, after upgrading, you can *optionally* rewrite your imports as follows:

|  | Before | After |
| --- | --- | --- |
| Zod 4 | `"zod/v4"` | `"zod"` |
| Zod 4 Mini | `"zod/v4-mini"` | `"zod/mini"` |
| Zod 3 | `"zod"` | `"zod/v3"` |

**Library authors** — if you've already implemented Zod 4 support according to the best practices outlined in the [Library authors](/library-authors) guide, bump your peer dependency to include `zod@^4.0.0`:

```
// package.json
{
  "peerDependencies": {
    "zod": "^3.25.0 || ^4.0.0"
  }
}
```

*There should be no other code changes necessary.* No code changes were made between the latest `3.25.x` release and `4.0.0`. This does not require a major version bump.

**Some notes on subpath versioning**

Ultimately, the subpath versioning scheme was a necessary evil to force the ecosystem to upgrade in a non-breaking way. If I'd published `[email protected]` out of the gate, most libraries would have naively bumped their peer dependencies, forcing a "version bump avalanche" across the ecosystem.

As it stands, there is now [broad support](https://x.com/colinhacks/status/1932323805705482339) for Zod 4 across the ecosystem. No migration process is totally painless, but it seems like the "version avalanche" I'd feared didn't happen. By and large, libraries have been able to support Zod 3 and Zod 4 simultaneously: Hono, LangChain, React Hook Form, etc. Several ecosystem maintainers reached out to me specifically to indicate how convenient it was to incrementally add support for Zod 4 (something that would typically require a major version bump). Long story short: this approach worked great! Few other libraries are subject to the same constraints as Zod, but I strongly encourage other libraries with large associated ecosystems to consider a similar approach.

## [Versioning in Zod 4](?id=versioning-in-zod-4#versioning-in-zod-4)

This is a writeup of Zod 4's approach to versioning, with the goal of making it easier for users and Zod's ecosystem of associated libraries to migrate to Zod 4.

The general approach:

* Zod 4 will not initially be published as `[email protected]` on npm. Instead it will be exported at a subpath (`"zod/v4"`) alongside `[email protected]`
* Despite this, Zod 4 is considered stable and production-ready
* Zod 3 will continue to be exported from the package root (`"zod"`) as well as a new subpath `"zod/v3"`. It will continue to receive bug fixes & stability improvements.

This approach is analogous to how Golang handles major version changes: <https://go.dev/doc/modules/major-version>

Sometime later:

* The package root (`"zod"`) will switch over from exporting Zod 3 to Zod 4
* At this point `[email protected]` will get published to npm
* The `"zod/v4"` subpath will remain available forever

## [Why?](?id=why#why)

Zod occupies a unique place in the ecosystem. Many libraries/frameworks in the ecosystem accept user-defined Zod schemas. This means their user-facing API is strongly coupled to Zod and its various classes/interfaces/utilities. For these libraries/frameworks, a breaking change to Zod necessarily causes a breaking change for their users. A Zod 3 `ZodType` is not assignable to a Zod 4 `ZodType`.

### [Why can't libraries just support v3 and v4 simultaneously?](?id=why-cant-libraries-just-support-v3-and-v4-simultaneously#why-cant-libraries-just-support-v3-and-v4-simultaneously)

Unfortunately the limitations of peerDependencies (and inconsistencies between package managers) make it extremely difficult to elegantly support two major versions of one library simultaneously.

If I naively published `[email protected]` to npm, the vast majority of the libraries in Zod's ecosystem would need to publish a new major version to properly support Zod 4, include some high-profile libraries like the AI SDK. It would trigger a "version bump avalanche" across the ecosystem and generally create a huge amount of frustration and work.

With subpath versioning, we solve this problem. it provides a straightforward way for libraries to support Zod 3 and Zod 4 (including Zod Mini) simultaneously. They can continue defining a single peerDependency on `"zod"`; no need for more arcane solutions like npm aliases, optional peer dependencies, a `"zod-compat"` package, or other such hacks.

Libraries will need to bump the minimum version of their `"zod"` peer dependency to `zod@^3.25.0`. They can then reference both Zod 3 and Zod 4 in their implementation:

```
import * as z3 from "zod/v3"
import * as z4 from "zod/v4"
```

Later, once there's broad support for v4, we'll bump the major version on `npm` and start exporting Zod 4 from the package root, completing the transition. (This has now happened—see the note at the top of this page.)

As long as libraries are importing exclusively from the associated subpaths (not the root), their implementations will continue to work across the major version bump without code changes.

While it may seem unorthodox (at least for people who don't use Go!), this is the only approach I'm aware of that enables a clean, incremental migration path for both Zod's users and the libraries in the broader ecosystem.

---

A deeper dive into why peer dependencies don't work in this situation.

Imagine you're a library trying to build a function `acceptSchema` that accepts a Zod schema. You want to be able to accept Zod 3 or Zod 4 schemas. In this hypothetical, I'm imagine Zod 4 was published as `zod@4` on npm, no subpaths. Here are your options:

1. Install both zod@3 and zod@4 as `dependencies` simultaneously using npm aliases. This works but you end up including your own copies of both Zod 3 and Zod 4. You have no guarantee that your user's Zod schemas are instances of the same z.ZodType class you're pulling from dependencies (`instanceof` checks will probably fail).
2. Use a peer dependency that spans multiple major versions: `"zod@>=3.0.0"` …but when developing a library you’d still need to pick a version to develop against. Usually you'd install this as a dev dependency. The onus is on you to painstakingly ensure your code works, character-for-character, across both versions. This is impossible in the case of Zod 3 & Zod 4 because a number of very fundamental classes have simplified/different generics.
3. Optional peer dependencies. i just couldn't find a straight answer about how to reliably determine which peer dep is installed at runtime across all platforms. Many answers online will say "use dynamic imports in a try/catch to check it a package exists". Those folks are assuming you're on the backend because no frontend bundlers have no affordance for this. They'll fail when you try to bundle a dependency that isn't installed. Obviuosly it doesn't matter if you're inside a try/catch during a build step. Also: since we're talking about multiple versions of the same library, you'd need to use npm aliases to differentiate the two versions in your `package.json`. Versions of npm as recent as v10 cannot handle the combination of peer dependencies + npm aliases.
4. `zod-compat`. This extremely hand-wavy solution you see online is "define interfaces for each version that represents some basic functionality". Basically some utility types libraries can use to approximate the real deal. This is error prone, a ton of work, needs to be kept synchronized with the real implementations, and ultimately libraries are developing against a shadow version of your library that probably lacks detail. It also only works for types: if a library depends on any runtime code in Zod it falls apart.

Hence, subpaths.

---

## Zod Core

> Zod Core package - minimal core functionality for custom implementations

_Source: [https://zod.dev/packages/core](https://zod.dev/packages/core)_

This sub-package exports the core classes and utilities that are consumed by Zod and Zod Mini. It is not intended to be used directly; instead it's designed to be extended by other packages. It implements:

```
import * as z from "zod/v4/core";
 
// the base class for all Zod schemas
z.$ZodType;
 
// subclasses of $ZodType that implement common parsers
z.$ZodString
z.$ZodObject
z.$ZodArray
// ...
 
// the base class for all Zod checks
z.$ZodCheck;
 
// subclasses of $ZodCheck that implement common checks
z.$ZodCheckMinLength
z.$ZodCheckMaxLength
 
// the base class for all Zod errors
z.$ZodError;
 
// issue formats (types only)
{} as z.$ZodIssue;
 
// utils
z.util.isValidJWT(...);
```

## [Schemas](?id=schemas#schemas)

The base class for all Zod schemas is `$ZodType`. It accepts two generic parameters: `Output` and `Input`.

```
export class $ZodType<Output = unknown, Input = unknown> {
  _zod: { /* internals */}
}
```

`zod/v4/core` exports a number of subclasses that implement some common parsers. A union of all first-party subclasses is exported as `z.$ZodTypes`.

```
export type $ZodTypes =
  | $ZodString
  | $ZodNumber
  | $ZodBigInt
  | $ZodBoolean
  | $ZodDate
  | $ZodSymbol
  | $ZodUndefined
  | $ZodNullable
  | $ZodNull
  | $ZodAny
  | $ZodUnknown
  | $ZodNever
  | $ZodVoid
  | $ZodArray
  | $ZodObject
  | $ZodUnion // $ZodDiscriminatedUnion extends this
  | $ZodIntersection
  | $ZodTuple
  | $ZodRecord
  | $ZodMap
  | $ZodSet
  | $ZodLiteral
  | $ZodEnum
  | $ZodPromise
  | $ZodLazy
  | $ZodOptional
  | $ZodDefault
  | $ZodTemplateLiteral
  | $ZodCustom
  | $ZodTransform
  | $ZodNonOptional
  | $ZodReadonly
  | $ZodNaN
  | $ZodPipe // $ZodCodec and $ZodPreprocess extend this
  | $ZodSuccess
  | $ZodCatch
  | $ZodFile;
```

### Inheritance diagram

## [Internals](?id=internals#internals)

All `zod/v4/core` subclasses only contain a single property: `_zod`. This property is an object containing the schemas *internals*. The goal is to make `zod/v4/core` as extensible and unopinionated as possible. Other libraries can "build their own Zod" on top of these classes without `zod/v4/core` cluttering up the interface. Refer to the implementations of `zod` and `zod/mini` for examples of how to extend these classes.

The `_zod` internals property contains some notable properties:

* `.def` — The schema's *definition*: this is the object you pass into the class's constructor to create an instance. It completely describes the schema, and it's JSON-serializable.
  + `.def.type` — A string representing the schema's type, e.g. `"string"`, `"object"`, `"array"`, etc.
  + `.def.checks` — An array of *checks* that are executed by the schema after parsing.
* `.input` — A virtual property that "stores" the schema's *inferred input type*.
* `.output` — A virtual property that "stores" the schema's *inferred output type*.
* `.run()` — The schema's internal parser implementation.

If you are implementing a tool (say, a code generator) that must traverse Zod schemas, you can cast any schema to `$ZodTypes` and use the `def` property to discriminate between these classes.

```
export function walk(_schema: z.$ZodType) {
  const schema = _schema as z.$ZodTypes;
  const def = schema._zod.def;
  switch (def.type) {
    case "string": {
      // ...
      break;
    }
    case "object": {
      // ...
      break;
    }
  }
}
```

There are a number of subclasses of `$ZodString` that implement various *string formats*. These are exported as `z.$ZodStringFormatTypes`.

```
export type $ZodStringFormatTypes =
  | $ZodGUID
  | $ZodUUID
  | $ZodEmail
  | $ZodURL
  | $ZodEmoji
  | $ZodNanoID
  | $ZodCUID
  | $ZodCUID2
  | $ZodULID
  | $ZodXID
  | $ZodKSUID
  | $ZodISODateTime
  | $ZodISODate
  | $ZodISOTime
  | $ZodISODuration
  | $ZodIPv4
  | $ZodIPv6
  | $ZodCIDRv4
  | $ZodCIDRv6
  | $ZodBase64
  | $ZodBase64URL
  | $ZodE164
  | $ZodJWT
```

## [Parsing](?id=parsing#parsing)

As the Zod Core schema classes have no methods, there are top-level functions for parsing data.

```
import * as z from "zod/v4/core";
 
const schema = new z.$ZodString({ type: "string" });
z.parse(schema, "hello");
z.safeParse(schema, "hello");
await z.parseAsync(schema, "hello");
await z.safeParseAsync(schema, "hello");
```

## [Checks](?id=checks#checks)

Every Zod schema contains an array of *checks*. These perform post-parsing refinements (and occasionally mutations) that *do not affect* the inferred type.

```
const schema = z.string().check(z.email()).check(z.min(5));
// => $ZodString
 
schema._zod.def.checks;
// => [$ZodCheckEmail, $ZodCheckMinLength]
```

The base class for all Zod checks is `$ZodCheck`. It accepts a single generic parameter `T`.

```
export class $ZodCheck<in T = unknown> {
  _zod: { /* internals */}
}
```

The `_zod` internals property contains some notable properties:

* `.def` — The check's *definition*: this is the object you pass into the class's constructor to create the check. It completely describes the check, and it's JSON-serializable.
  + `.def.check` — A string representing the check's type, e.g. `"min_length"`, `"less_than"`, `"string_format"`, etc.
* `.check()` — Contains the check's validation logic.

`zod/v4/core` exports a number of subclasses that perform some common refinements. All first-party subclasses are exported as a union called `z.$ZodChecks`.

```
export type $ZodChecks =
  | $ZodCheckLessThan
  | $ZodCheckGreaterThan
  | $ZodCheckMultipleOf
  | $ZodCheckNumberFormat
  | $ZodCheckBigIntFormat
  | $ZodCheckMaxSize
  | $ZodCheckMinSize
  | $ZodCheckSizeEquals
  | $ZodCheckMaxLength
  | $ZodCheckMinLength
  | $ZodCheckLengthEquals
  | $ZodCheckProperty
  | $ZodCheckMimeType
  | $ZodCheckOverwrite
  | $ZodCheckStringFormat
```

You can use the `._zod.def.check` property to discriminate between these classes.

```
const check = {} as z.$ZodChecks;
const def = check._zod.def;
 
switch (def.check) {
  case "less_than":
  case "greater_than":
    // ...
    break;
}
```

As with schema types, there are a number of subclasses of `$ZodCheckStringFormat` that implement various *string formats*.

```
export type $ZodStringFormatChecks =
  | $ZodCheckRegex
  | $ZodCheckLowerCase
  | $ZodCheckUpperCase
  | $ZodCheckIncludes
  | $ZodCheckStartsWith
  | $ZodCheckEndsWith
  | $ZodGUID
  | $ZodUUID
  | $ZodEmail
  | $ZodURL
  | $ZodEmoji
  | $ZodNanoID
  | $ZodCUID
  | $ZodCUID2
  | $ZodULID
  | $ZodXID
  | $ZodKSUID
  | $ZodISODateTime
  | $ZodISODate
  | $ZodISOTime
  | $ZodISODuration
  | $ZodIPv4
  | $ZodIPv6
  | $ZodCIDRv4
  | $ZodCIDRv6
  | $ZodBase64
  | $ZodBase64URL
  | $ZodE164
  | $ZodJWT;
```

Use a nested `switch` to discriminate between the different string format checks.

```
const check = {} as z.$ZodChecks;
const def = check._zod.def;
 
switch (def.check) {
  case "less_than":
  case "greater_than":
  // ...
  case "string_format":
    {
      const formatCheck = check as z.$ZodStringFormatChecks;
      const formatCheckDef = formatCheck._zod.def;
 
      switch (formatCheckDef.format) {
        case "email":
        case "url":
          // do stuff
      }
    }
    break;
}
```

You'll notice some of these string format *checks* overlap with the string format *types* above. That's because these classes implement both the `$ZodCheck` and `$ZodType` interfaces. That is, they can be used as either a check or a type. In these cases, both `._zod.parse` (the schema parser) and `._zod.check` (the check validation) are executed during parsing. In effect, the instance is prepended to its own `checks` array (though it won't actually exist in `._zod.def.checks`).

```
// as a type
z.email().parse("[email protected]");
 
// as a check
z.string().check(z.email()).parse("[email protected]")
```

## [Errors](?id=errors#errors)

The base class for all errors in Zod is `$ZodError`.

For performance reasons, `$ZodError` *does not* extend the built-in `Error` class! So using `instanceof Error` will return `false`.

* The `zod` package implements a subclass of `$ZodError` called `ZodError` with some additional convenience methods.
* The `zod/mini` sub-package directly uses `$ZodError`

```
export class $ZodError<T = unknown> implements Error {
 public issues: $ZodIssue[];
}
```

## [Issues](?id=issues#issues)

The `issues` property corresponds to an array of `$ZodIssue` objects. All issues extend the `z.$ZodIssueBase` interface.

```
export interface $ZodIssueBase {
  readonly code?: string;
  readonly input?: unknown;
  readonly path: PropertyKey[];
  readonly message: string;
}
```

Zod defines the following issue subtypes:

```
export type $ZodIssue =
  | $ZodIssueInvalidType
  | $ZodIssueTooBig
  | $ZodIssueTooSmall
  | $ZodIssueInvalidStringFormat
  | $ZodIssueNotMultipleOf
  | $ZodIssueUnrecognizedKeys
  | $ZodIssueInvalidUnion
  | $ZodIssueInvalidKey
  | $ZodIssueInvalidElement
  | $ZodIssueInvalidValue
  | $ZodIssueCustom;
```

For details on each type, refer to [the implementation](https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/errors.ts).

---

## Zod Mini

> Zod Mini - a tree-shakable Zod

_Source: [https://zod.dev/packages/mini](https://zod.dev/packages/mini)_

**Note** — The docs for Zod Mini are interleaved with the regular Zod docs via tabbed code blocks. This page is designed to explain why Zod Mini exists, when to use it, and some key differences from regular Zod.

Zod Mini is a tree-shakable variant of Zod. To try it:

```
npm install zod@^4.0.0
```

To import it:

```
import * as z from "zod/mini";
```

Zod Mini implements the exact same functionality as `zod`, but using a *functional*, *tree-shakable* API. If you're coming from `zod`, this means you generally will use *functions* in place of methods.

```
// regular Zod
const mySchema = z.string().optional().nullable();
 
// Zod Mini
const mySchema = z.nullable(z.optional(z.string()));
```

## [Tree-shaking](?id=tree-shaking#tree-shaking)

Tree-shaking is a technique used by modern bundlers to remove unused code from the final bundle. It's also referred to as *dead-code elimination*.

In regular Zod, schemas provide a range of convenience methods to perform some common operations (e.g. `.min()` on string schemas). Bundlers are generally not able to remove ("treeshake") unused method implementations from your bundle, but they are able to remove unused top-level functions. As such, the API of Zod Mini uses more functions than methods.

```
// regular Zod
z.string().min(5).max(10).trim()
 
// Zod Mini
z.string().check(z.minLength(5), z.maxLength(10), z.trim());
```

To give a general idea about the bundle size reduction, consider this simple script:

```
z.boolean().parse(true)
```

Bundling this with Zod and Zod Mini results in the following bundle sizes. Zod Mini results in a 64% reduction.

| Package | Bundle size (gzip) |
| --- | --- |
| Zod Mini | `2.12kb` |
| Zod | `5.91kb` |

With a marginally more complex schema that involves object types:

```
const schema = z.object({ a: z.string(), b: z.number(), c: z.boolean() });
 
schema.parse({
  a: "asdf",
  b: 123,
  c: true,
});
```

| Package | Bundle size (gzip) |
| --- | --- |
| Zod Mini | `4.0kb` |
| Zod | `13.1kb` |

This gives you a sense of the bundle sizes involved. Look closely at these numbers and run your own benchmarks to determine if using Zod Mini is worth it for your use case.

## [When (not) to use Zod Mini](?id=when-not-to-use-zod-mini#when-not-to-use-zod-mini)

In general you should probably use regular Zod unless you have uncommonly strict constraints around bundle size. Many developers massively overestimate the importance of bundle size to application performance. In practice, bundle size on the scale of Zod (`5-10kb` typically) is only a meaningful concern when optimizing front-end bundles for a user base with slow mobile network connections in rural or developing areas.

Let's run through some considerations:

### [DX](?id=dx#dx)

The API of Zod Mini is more verbose and less discoverable. The methods in Zod's API are much easier to discover & autocomplete through Intellisense than the top-level functions in Zod Mini. It isn't possible to quickly build a schema with chained APIs. (Speaking as the creator of Zod: I spent a lot of time designing the Zod Mini API to be as ergonomic as possible, but I still have a strong preference the standard Zod API.)

### [Backend development](?id=backend-development#backend-development)

If you are using Zod on the backend, bundle size on the scale of Zod is not meaningful. This is true even in resource-constrained environments like Lambda. [This post](https://medium.com/@adtanasa/size-is-almost-all-that-matters-for-optimizing-aws-lambda-cold-starts-cad54f65cbb) benchmarks cold start times with bundles of various sizes. Here is a subset of the results:

| Bundle size | Lambda cold start time |
| --- | --- |
| `1kb` | `171ms` |
| `17kb` (size of gzipped non-Mini Zod) | `171.6ms` (interpolated) |
| `128kb` | `176ms` |
| `256kb` | `182ms` |
| `512kb` | `279ms` |
| `1mb` | `557ms` |

The minimum cold start time for a negligible `1kb` bundle is `171ms`. The next bundle size tested is `128kb`, which added only `5ms`. When gzipped, the bundle size for the entirely of regular Zod is roughly `17kb`, which would correspond to a `0.6ms` increase in startup time.

### [Internet speed](?id=internet-speed#internet-speed)

Generally, the round trip time to the server (`100-200ms`) will dwarf the time required to download an additional `10kb`. Only on slow 3G connections (sub-`1Mbps`) does the download time for an additional `10kb` become more significant. If you aren't optimizing specifically for users in rural or developing areas, your time is likely better spent optimizing something else.

## [`ZodMiniType`](?id=zodminitype#zodminitype)

All Zod Mini schemas extend the `z.ZodMiniType` base class, which in turn extends `z.core.$ZodType` from [`zod/v4/core`](/packages/core). While this class implements far fewer methods than `ZodType` in `zod`, some particularly useful methods remain.

### [`.parse`](?id=parse#parse)

This is an obvious one. All Zod Mini schemas implement the same parsing methods as `zod`.

```
import * as z from "zod/mini"
 
const mySchema = z.string();
 
mySchema.parse('asdf')
await mySchema.parseAsync('asdf')
mySchema.safeParse('asdf')
await mySchema.safeParseAsync('asdf')
```

### [`.check()`](?id=check#check)

In regular Zod there are dedicated methods on schema subclasses for performing common checks:

```
import * as z from "zod";
 
z.string()
  .min(5)
  .max(10)
  .refine(val => val.includes("@"))
  .trim()
```

In Zod Mini such methods aren't implemented. Instead you pass these checks into schemas using the `.check()` method:

```
import * as z from "zod/mini"
 
z.string().check(
  z.minLength(5), 
  z.maxLength(10),
  z.refine(val => val.includes("@")),
  z.trim()
);
```

The following checks are implemented. Some of these checks only apply to schemas of certain types (e.g. strings or numbers). The APIs are all type-safe; TypeScript won't let you add an unsupported check to your schema.

```
z.lt(value);
z.lte(value); // alias: z.maximum()
z.gt(value);
z.gte(value); // alias: z.minimum()
z.positive();
z.negative();
z.nonpositive();
z.nonnegative();
z.multipleOf(value);
z.maxSize(value);
z.minSize(value);
z.size(value);
z.maxLength(value);
z.minLength(value);
z.length(value);
z.regex(regex);
z.lowercase();
z.uppercase();
z.includes(value);
z.startsWith(value);
z.endsWith(value);
z.property(key, schema);
z.mime(value);
 
// custom checks
z.refine()
z.check()   // replaces .superRefine()
 
// mutations (these do not change the inferred types)
z.overwrite(value => newValue);
z.normalize();
z.trim();
z.toLowerCase();
z.toUpperCase();
 
// metadata (registers schema in z.globalRegistry)
z.meta({ title: "...", description: "..." });
z.describe("...");
```

### [`.register()`](?id=register#register)

For registering a schema in a [registry](/metadata#registries).

```
const myReg = z.registry<{title: string}>();
 
z.string().register(myReg, { title: "My cool string schema" });
```

### [`.brand()`](?id=brand#brand)

For *branding* a schema. Refer to the [Branded types](/api#branded-types) docs for more information.

```
import * as z from "zod/mini"
 
const USD = z.string().brand("USD");
```

### [`.clone(def)`](?id=clonedef#clonedef)

Returns an identical clone of the current schema using the provided `def`.

```
const mySchema = z.string()
 
mySchema.clone(mySchema._zod.def);
```

## [No default locale](?id=no-default-locale#no-default-locale)

While regular Zod automatically loads the English (`en`) locale, Zod Mini does not. This reduces the bundle size in scenarios where error messages are unnecessary, localized to a non-English language, or otherwise customized.

This means, by default the `message` property of all issues will simply read `"Invalid input"`. To load the English locale:

```
import * as z from "zod/mini"
 
z.config(z.locales.en());
```

Refer to the [Locales](/error-customization#internationalization) docs for more on localization.

---

## Zod

> Internals and structure of the Zod library

_Source: [https://zod.dev/packages/zod](https://zod.dev/packages/zod)_

The `zod/v4` package is the "flagship" library of the Zod ecosystem. It strikes a balance between developer experience and bundle size that's ideal for the vast majority of applications.

If you have uncommonly strict constraints around bundle size, consider [Zod Mini](/packages/mini).

Zod aims to provide a schema API that maps one-to-one to TypeScript's type system.

```
import * as z from "zod";
 
const schema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.email(),
});
```

The API relies on methods to provide a concise, chainable, autocomplete-friendly way to define complex types.

```
z.string()
  .min(5)
  .max(10)
  .toLowerCase();
```

All schemas extend the `z.ZodType` base class, which in turn extends `z.$ZodType` from [`zod/v4/core`](/packages/core). All instance of `ZodType` implement the following methods:

```
import * as z from "zod";
 
const mySchema = z.string();
 
// parsing
mySchema.parse(data);
mySchema.safeParse(data);
mySchema.parseAsync(data);
mySchema.safeParseAsync(data);
 
 
// refinements
mySchema.refine(refinementFunc);
mySchema.superRefine(refinementFunc); // deprecated, use `.check()`
mySchema.overwrite(overwriteFunc);
 
// wrappers
mySchema.optional();
mySchema.nonoptional();
mySchema.nullable();
mySchema.nullish();
mySchema.default(defaultValue);
mySchema.array();
mySchema.or(otherSchema);
mySchema.transform(transformFunc);
mySchema.catch(catchValue);
mySchema.pipe(otherSchema);
mySchema.readonly();
 
// metadata and registries
mySchema.register(registry, metadata);
mySchema.describe(description);
mySchema.meta(metadata);
 
// utilities
mySchema.check(checkOrFunction);
mySchema.clone(def);
mySchema.brand<T>();
mySchema.isOptional(); // boolean
mySchema.isNullable(); // boolean
```

---
