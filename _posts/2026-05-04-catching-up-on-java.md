---
title: "Catching Up on Java"
excerpt: "A tour of the language and library changes an early 2000s-era Java developer should know about, from lambdas and records to pattern matching and virtual threads."
description: "A tour of the language and library changes a 2000s-era Java developer should know about, from lambdas and records to pattern matching and virtual threads."
date: 2026-05-04
last_modified_at: 2026-05-04
categories: [meta]
tags: [java, language-features, generics, records, pattern-matching, streams, lambdas, virtual-threads]
published: true
---

[![Time traveler stepping from Java 2010 into a modern Java 2026 city]({{ '/assets/images/2026-05-04-catching-up-on-java/01-java-time-traveller.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/01-java-time-traveller.png' | relative_url }})

Welcome to the 2026 edition of Catching up on Java! If you last wrote Java around 2010, you've probably noticed that it has changed quite a bit since then. The changes are mostly additive rather than breaking, but there are enough of them that a modern codebase will look unfamiliar at first glance. Lambdas, records, pattern matching, virtual threads. The class system, the type system, and the JVM are still recognizable; the syntax people reach for and the libraries they call have changed.

This post is a tour of the language and standard library changes worth knowing about, specifically for someone who knew Java well in the early 2000s and hasn't kept close tabs since. I'm not going to list every change. That would be far too much work and impossible in a single blog article. Instead, I'll just focus on the changes that stood out to me.

[![Boilerplate cleanup salon replacing old Java verbosity with smaller syntax]({{ '/assets/images/2026-05-04-catching-up-on-java/02-boilerplate-cleanup-salon.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/02-boilerplate-cleanup-salon.png' | relative_url }})

## The Small Syntactic Wins

There were a handful of quality-of-life changes that arrived in Java 7 through 10. Small individually, but together they remove a lot of the boilerplate the older language was known for. Nothing here is conceptually new.

### try-with-resources (Java 7)

[`try-with-resources`](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20.3) replaces the old close-in-finally idiom. Pre-7:

```java
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("data.txt"));
    return reader.readLine();
} finally {
    if (reader != null) {
        try {
            reader.close();
        } catch (IOException ignored) {
            // swallow, because what else can finally do?
        }
    }
}
```

Post-7:

```java
try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    return reader.readLine();
}
```

[![Resource butler closing files, sockets, and database connections after a try-with-resources block]({{ '/assets/images/2026-05-04-catching-up-on-java/03-resource-butler.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/03-resource-butler.png' | relative_url }})

The resource is declared in the `try` header, and the compiler generates the close-with-suppressed-exception machinery for you. Anything implementing [`AutoCloseable`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/AutoCloseable.html) works. You can declare more than one resource, separated by semicolons; they close in reverse order.

> **When to reach for it.** Always, for anything that needs closing. The only reason not to use it is if you genuinely need to keep the resource open past the end of the block, in which case you weren't going to write the close-in-finally pattern anyway. One subtle point: if the body throws and `close` also throws, the body's exception is the primary and `close`'s is attached via [`Throwable.getSuppressed()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Throwable.html#getSuppressed()) - the opposite of what the old hand-written idiom usually did, and almost always the more useful behavior.

### Diamond operator (Java 7)

Pre-7, you repeated the type parameters on both sides:

```java
Map<String, List<Integer>> index = new HashMap<String, List<Integer>>();
```

Post-7, the right-hand side infers from the left:

```java
Map<String, List<Integer>> index = new HashMap<>();
```

[JEP 213](https://openjdk.org/jeps/213) (Java 9) extended this to anonymous classes (`new Comparator<>() { ... }`).

> **When to reach for it.** Always when the type appears on the left-hand side. The one place to leave the parameters explicit is a fluent builder chain where the compiler can't infer them from a target type, but those cases are rare in everyday code.

### Multi-catch (Java 7)

When two catch blocks had identical bodies, you used to write them twice. With [multi-catch](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20), you don't:

```java
try {
    riskyCall();
} catch (IOException | SQLException e) {
    log.error("call failed", e);
    throw new ServiceException(e);
}
```

The exception variable's static type is the least upper bound of the listed exception types. In practice, that is the most specific type that can hold any of them.

> **When to reach for it.** Whenever two or more catch blocks would have identical bodies. Don't force it if the handlers actually differ - a multi-catch with branching `instanceof` checks inside is worse than two separate catch blocks. Note that the exception variable is implicitly `final`, so you can't reassign it in the handler.

### Strings in switch (Java 7)

A [switch on a `String`](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.11) does what you'd expect:

```java
String role = user.role();
int level = switch (role) {
    case "admin" -> 3;
    case "editor" -> 2;
    case "viewer" -> 1;
    default -> 0;
};
```

(That uses the Java 14 switch-expression form covered in the next section. Pre-14 you'd write `case "admin": ... break;`.) Matching is case-sensitive and a `null` selector throws `NullPointerException`. `javac` commonly lowers a string switch to `hashCode` plus `equals` checks, but that's an implementation detail, not something to depend on.

> **When to reach for it.** Good for dispatching on a small fixed set of well-known string tokens (HTTP methods, role names, command verbs). For anything user-supplied or open-ended, a `Map<String, Handler>` lookup is more flexible and easier to extend. And if the string set is really an enumeration in disguise, define an actual `enum` and switch on that - switch expressions over enums get exhaustiveness checking from the compiler.

### Underscores in numeric literals (Java 7)

Purely cosmetic, purely useful. Per the JLS rules for [integer](https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.1) and [floating-point](https://docs.oracle.com/javase/specs/jls/se21/html/jls-3.html#jls-3.10.2) literals, underscores can go between digits and the compiler ignores them:

```java
long bytesPerGib = 1_073_741_824L;
int creditCardMask = 0b1111_0000_1111_0000;
double pi = 3.141_592_653_589_793;
```

> **When to reach for it.** Whenever a numeric literal is long enough that you have to count digits to read it. Group decimals in threes, hex and binary in fours or eights. No tradeoff worth mentioning - it's purely a readability win.

### var for local variables (Java 10)

[JEP 286](https://openjdk.org/jeps/286) introduced `var` for local variable type inference:

```java
var index = new HashMap<String, List<Integer>>();
var users = List.of("ada", "alan", "grace");
var line = reader.readLine();
```

Local variables only. Not fields, not method parameters, not return types. It's a compile-time inference, not a runtime feature, and not C#-style `dynamic`. The variable still has a single static type; the compiler just figured it out for you. Java 11 later added `var` for implicitly typed lambda parameters, but that is a narrow lambda-specific form, not a general method-signature feature.

The judgment call is when to use it. Where the right-hand side already names the type, `var` removes noise:

```java
var users = new ArrayList<User>();              // good: type is right there
```

Where the right-hand side hides the type, it costs the reader more than it saves the writer:

```java
var result = service.lookup(id);                // bad: what is result?
```

There's also one subtle trap that bites people coming back to the language. With an empty generic constructor and no target type, `var` plus the diamond operator falls back to `Object`:

```java
var list = new ArrayList<>();                    // ArrayList<Object>, almost certainly not what you wanted
var copied = new ArrayList<>(List.of("ada"));    // ArrayList<String>, inferred from the constructor argument
```

Either give the diamond a target type, or write the parameter explicitly: `var list = new ArrayList<String>();`.

> **When to reach for it.** Use `var` when the right-hand side already names the type (a constructor call, a static factory like `List.of(...)`, a `new Foo()`). Avoid it when the type comes from a method whose name doesn't make the return type obvious; a reader shouldn't have to chase the declaration to know what `result` is. Avoid it for numeric literals where the inferred type matters (`var x = 1` is `int`, not `long`). And remember the boundary: Java 10 `var` is for local variables, not field declarations, method signatures, or return types. Java 11's lambda form (`(var x, var y) -> ...`) is the special case, and all lambda parameters have to use `var` or none of them can.

[![Expression machine turning legacy statements into lambdas, switch expressions, and text blocks]({{ '/assets/images/2026-05-04-catching-up-on-java/04-expressions.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/04-expressions.png' | relative_url }})

## Expression-Oriented Code

The bigger shift over the last decade has been Java moving from a statement-oriented language toward one where more constructs return values. Three features account for most of that shift: lambdas, switch expressions, and text blocks. Together they let you write code that says what you mean rather than how to compute it.

### Lambdas and method references (Java 8)

[JEP 126](https://openjdk.org/jeps/126) introduced lambdas. Before them, passing behavior around meant writing an anonymous inner class:

```java
List<String> names = new ArrayList<>(Arrays.asList("ada", "alan", "grace"));
Collections.sort(names, new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
});
```

A lambda expresses the same comparator without the boilerplate:

```java
List<String> names = new ArrayList<>(Arrays.asList("ada", "alan", "grace"));
names.sort((a, b) -> a.length() - b.length());
```

A lambda is convertible to any [functional interface](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/FunctionalInterface.html), meaning an interface with a single abstract method after default methods and public `Object` methods are ignored. The standard ones live in [`java.util.function`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html): `Function<T, R>`, `Predicate<T>`, `Consumer<T>`, `Supplier<T>`, and so on. Older single-method interfaces like `Comparator` and `Runnable` work too, retroactively.

When the lambda body is just a call to an existing method, you can use a [method reference](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html#jls-15.13) instead:

```java
names.sort(Comparator.comparingInt(String::length));
List<Integer> lengths = names.stream()
    .map(String::length)
    .collect(Collectors.toList());
names.forEach(System.out::println);
```

[![Lambda costume change from anonymous inner class boilerplate to concise functional interfaces]({{ '/assets/images/2026-05-04-catching-up-on-java/05-costume-change.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/05-costume-change.png' | relative_url }})

The common shapes are: `Type::staticMethod`, `instance::method`, `Type::instanceMethod` (the receiver becomes the first lambda argument), and `Type::new` (constructor reference). There are a few less-common forms too, including `super::method`, `TypeName.super::method`, and array constructor references like `int[]::new`.

> **When to reach for it.** Use lambdas anywhere you'd previously have written an anonymous inner class for a single-method interface. Prefer a method reference when it reads better than the equivalent lambda (`String::length` over `s -> s.length()`); fall back to a lambda when the body is non-trivial or the parameter names add meaning. Two tradeoffs worth knowing: lambdas can't throw checked exceptions unless the target interface declares them, which is awkward when streaming over IO; and stack traces from inside lambdas point at synthetic method names like `lambda$0`, which can hurt debugging in deeply nested pipelines.

### Switch expressions (Java 14)

#### Flashback: enums

Enums arrived in Java 5 (2004), the same release as generics. Pre-enum, "a fixed set of named constants" was usually expressed as `public static final int` declarations, which had every problem you'd expect. They had no namespace - `Color.RED` and `Status.RED` were both just `int 0`, freely substitutable, freely combinable in ways that didn't make sense. They printed as numbers in logs. There was no way to iterate over them. And nothing stopped you from passing `42` to a method expecting "a color."

`enum` replaced the int-constant pattern with a real type:

```java
public enum Status { ACTIVE, INACTIVE, SUSPENDED }
```

Each constant is a singleton instance of the enum type. The compiler enforces type safety (no passing a `Color` where a `Status` is expected), generates `name()`, `ordinal()`, `values()`, and `valueOf(String)` for free, and gives you a useful `toString` by default. Enums work as `Map` keys with the specialized `EnumMap`, as set elements with `EnumSet`, and they implement `Comparable` based on declaration order.

Enums can carry data and methods, which is the part 2010-era code often underuses:

```java
public enum HttpMethod {
    GET(false), POST(true), PUT(true), DELETE(false);

    private final boolean hasBody;

    HttpMethod(boolean hasBody) {
        this.hasBody = hasBody;
    }

    public boolean hasBody() {
        return hasBody;
    }
}
```

Each constant can even override methods individually, which is a niche but useful feature for state-machine-style enums.

The reason this flashback matters here: switch and enums were designed to work together. Inside a `switch` over an enum, you write the constant names without the type prefix (`case ACTIVE`, not `case Status.ACTIVE`), and the compiler can reason about which constants are covered. That second property is what makes the next subsection's expression-form switch useful in practice - a switch expression without `default` will fail to compile when a new enum constant makes it incomplete.

#### The expression form

The classic switch was a statement. It executed for its side effects, fell through unless you remembered `break`, and couldn't directly produce a value. [JEP 361](https://openjdk.org/jeps/361) made switch double as an expression:

```java
enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

String kind = switch (day) {
    case SAT, SUN -> "weekend";
    case MON, TUE, WED, THU, FRI -> "weekday";
};
```

Three properties to notice. First, the arrow form (`->`) replaces `case:` plus `break`. There's no fall-through. Second, the switch returns a value, so you can assign it directly. Third, the compiler checks exhaustiveness: omit one of the enum constants and the code won't compile (unless you add a `default`). That last property is what makes it pleasant; the compiler will tell you when adding a new enum constant breaks an existing switch.

If a branch needs more than one statement, use a block with `yield`:

```java
int score = switch (grade) {
    case "A" -> 4;
    case "B" -> 3;
    case "C" -> 2;
    case "D" -> 1;
    case "F" -> 0;
    default -> {
        log.warn("unknown grade {}", grade);
        yield -1;
    }
};
```

The old colon-and-break form still works, so existing code keeps compiling. Mixing the two forms in one switch is a compile error, which is the right call.

> **When to reach for it.** Use the expression form whenever the switch is producing a value, especially over an enum or sealed type, where the compiler's exhaustiveness check will catch missing cases for you. Stick with the classic statement form for side-effecting branches with no return value. Avoid `default` on enum or sealed switches when you actually want exhaustiveness, since `default` defeats the compiler check. The main tradeoff: chained `yield` blocks read worse than equivalent `if/else if` chains once branches grow past a few lines, so don't force the expression form when the branches aren't really value-producing.

### Text blocks (Java 15)

[JEP 378](https://openjdk.org/jeps/378) added triple-quoted strings for multi-line literals:

```java
String json = """
        {
          "name": "ada",
          "role": "admin"
        }
        """;

String sql = """
        SELECT id, name
        FROM users
        WHERE active = true
        ORDER BY name
        """;
```

The leading whitespace common to the text block's determining lines is stripped automatically; the closing `"""` participates in that calculation when it sits on its own line, so its indentation still matters. Embedded double quotes usually don't need escaping, but a literal `"""` sequence has to escape at least one quote. Trailing newlines work the way you'd expect: a line break before the closing `"""` produces a final `\n`; placing `"""` directly after the last character does not.

Two interpolation-adjacent features round it out. `String.formatted` lets you template a text block without `String.format(...)` on every call site:

```java
String greeting = """
        Hello, %s. You have %d new messages.
        """.formatted(name, count);
```

And inside a text block, a trailing `\` suppresses the line break, which is occasionally useful for very long single-line content split across source lines for readability.

Java still has no string interpolation. A preview feature ([JEP 430](https://openjdk.org/jeps/430), string templates) shipped briefly and was withdrawn for redesign, so for now `formatted` is the idiomatic choice.

> **When to reach for it.** Use text blocks for any embedded literal that has natural line structure: SQL, JSON, HTML, regex with `Pattern.COMMENTS`, multi-line error messages. The auto-stripping rule means the indentation of the closing `"""` matters, so eyeball it when copying snippets between files. The main tradeoff is that text blocks are still plain `String`, not a templating type, so for anything with many substitutions a real template engine still beats `formatted`.

[![Records, sealed types, and pattern matching presented together as a closed family with exhaustive switch]({{ '/assets/images/2026-05-04-catching-up-on-java/06-fashion-show.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/06-fashion-show.png' | relative_url }})

## Data and Pattern Matching

This is the cluster of features that most changes how new Java code is shaped. If you read one section, read this one. Records, pattern matching, and sealed types are individually useful, but they were designed to be used together: a closed family of record types, switched over with a single exhaustive expression. That combination is the closest Java has come to algebraic data types, and it changes how a lot of domain modeling looks.

### Records (Java 16)

Records exist to fix a specific, long-standing complaint about Java: writing a small value class was wildly out of proportion to what the class actually meant. A type that represented "a pair of integer coordinates" needed two final fields, a constructor that assigned them, two accessors, an `equals` method that checked both components, a `hashCode` method that combined them, and a `toString` that printed them. Sixty lines of code to express what was conceptually two integers and a name. Worse, every one of those sixty lines was a place where the implementation could drift out of sync with the intent: an `equals` that forgot a new field, a `hashCode` that didn't include a field that `equals` did, a constructor that assigned in the wrong order. IDEs could generate the boilerplate, but generated code still has to be read, reviewed, and maintained.

The pre-record landscape was full of partial fixes. Many teams used Lombok's `@Value` or `@Data` annotations to generate the boilerplate at compile time. Others used `AutoValue` or built abstract classes with hand-rolled builders. Each of these solved the symptom but added a dependency, a build-time code generator, or both. Records solve the underlying problem in the language itself.

[JEP 395](https://openjdk.org/jeps/395) finalized records in Java 16 (with previews in 14 and 15). The design goal stated in the JEP is direct: provide a "nominal tuple" - a class whose contract is that it transparently holds a fixed set of values, defined once in the header, with all the obvious behavior derived from that declaration. The class declares its components, and the language fills in everything that follows from that declaration.

```java
public record Point(int x, int y) {}
```

That declaration generates the canonical constructor (`new Point(1, 2)`), accessors (`p.x()`, `p.y()`, note no `get` prefix), structural `equals` and `hashCode` based on the components, and a `toString` of the form `Point[x=1, y=2]`. The class is implicitly `final` and the components are implicitly `private final`. The record's own fields can't be reassigned, but immutability is shallow: a component can still refer to a mutable object unless you make a defensive copy. There is no subclassing and no place for a subclass to reinterpret what equality means. That intentional rigidity is the point: a record is supposed to be a transparent carrier of its components and nothing more.

[![Record value class generating a constructor, accessors, equals, hashCode, and toString]({{ '/assets/images/2026-05-04-catching-up-on-java/07-value-class.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/07-value-class.png' | relative_url }})

You can add behavior:

```java
public record Point(int x, int y) {
    public double distanceTo(Point other) {
        int dx = x - other.x;
        int dy = y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
```

Methods are fine; what records discourage is hidden state. You can declare static fields and static methods, but you can't add instance fields beyond the components - if a value isn't a declared component, it can't be part of the record's identity, and the language refuses to let you add it.

You can also validate components in a [compact constructor](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.10.4), which is the canonical constructor written in a shorter form:

```java
public record Range(int low, int high) {
    public Range {
        if (low > high) {
            throw new IllegalArgumentException("low > high");
        }
    }
}
```

The compact constructor doesn't list parameters or perform field assignment; it lets you validate or normalize the incoming values. After the constructor body runs, the compiler assigns the component fields from the current parameter values in order. You can also declare the canonical constructor explicitly if you need to, and you can add additional constructors that delegate to the canonical one with `this(...)`.

A few constraints to know. Records can't extend another class (they implicitly extend [`java.lang.Record`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Record.html)) but they can implement interfaces. Records aren't a substitute for entities with mutable lifecycle - they're for data, not state. And because the components are part of the public API by name (the accessors take their names from the components), renaming a component is a breaking change in a way that renaming a private field of a regular class isn't.

The bigger purpose, beyond the boilerplate fix, is what records enable elsewhere in the language. Pattern matching for switch destructures records by component. Sealed types plus records give you closed algebraic data types. Stream pipelines that produce intermediate value tuples become much easier to write because you can define a small record inline as a return type instead of wrestling with `Map.Entry` or `Object[]`. Records were introduced to remove the boilerplate around transparent value carriers, but they ended up being a building block several other features build on.

> **When to reach for it.** Use records for simple value carriers: DTOs, query results, parameter bundles, coordinate types, multi-value return values from helper methods. If a component refers to mutable data, make a defensive copy in the constructor if callers should not be able to mutate the record's observable state. The constraint that records are final and have all-public accessors makes them a poor fit for ORM entities or anything that needs hidden state. The other tradeoff is that record components are part of the public API by name, so renaming a component is a breaking change in a way that renaming a private field of a regular class isn't.

### Pattern matching for instanceof (Java 16)

[JEP 394](https://openjdk.org/jeps/394) made `instanceof` introduce a binding. The old cast-after-check pattern:

```java
if (shape instanceof Circle) {
    Circle c = (Circle) shape;
    return Math.PI * c.radius() * c.radius();
}
```

becomes:

```java
if (shape instanceof Circle c) {
    return Math.PI * c.radius() * c.radius();
}
```

The binding `c` is in scope wherever the compiler can prove the test succeeded. That includes the rest of the `if`, and (via flow analysis) the `else` branch's negation:

```java
if (!(obj instanceof String s)) {
    return Optional.empty();
}
return Optional.of(s.toUpperCase());   // s is in scope here
```

> **When to reach for it.** Anywhere you'd have written a cast right after an `instanceof` check. The pattern form is shorter, can't drift out of sync with the test, and the compiler will refuse code that uses the binding in a branch where the test could have failed. There's no real downside; treat the old form as legacy.

### Sealed types (Java 17)

[JEP 409](https://openjdk.org/jeps/409) added `sealed`, which lets you close a class hierarchy to a known set of subtypes:

```java
public sealed interface Shape permits Circle, Square, Triangle {}

public record Circle(double radius) implements Shape {}
public record Square(double side) implements Shape {}
public record Triangle(double base, double height) implements Shape {}
```

Every direct subtype must be listed in `permits`, unless the permitted subtypes are declared in the same source file and the compiler can infer the list. Each subtype must live in the same module (or same package, for unnamed modules), and must declare itself as `final`, `sealed`, or `non-sealed`. Records cover the `final` case for free.

On its own, `sealed` enforces an extension boundary in the type system. Paired with the next subsection, it's the feature that lets the compiler check exhaustiveness over a closed family of types.

> **When to reach for it.** Use sealed types for closed domain hierarchies you control: result types (`Success | Failure`), AST or IR node types, finite state machines, command/event types in messaging code. Don't reach for `sealed` on hierarchies you expect third parties to extend - it's the wrong tool for an open extension point. The tradeoff against `enum` is that sealed-plus-records can carry per-case data, where enum constants share a single shape.

### Pattern matching for switch and record patterns (Java 21)

[JEP 441](https://openjdk.org/jeps/441) added type patterns to `switch`, and [JEP 440](https://openjdk.org/jeps/440) added record patterns that destructure components. Together, they let you write:

```java
double area(Shape shape) {
    return switch (shape) {
        case Circle(double r) -> Math.PI * r * r;
        case Square(double s) -> s * s;
        case Triangle(double b, double h) -> 0.5 * b * h;
    };
}
```

Three operations are happening at once. The switch matches on the runtime type of `shape`. Each case destructures the matched record into its components, binding them as local variables. And because `Shape` is sealed and the cases cover every permitted subtype, the compiler accepts the switch without a `default` branch - and will refuse to compile if you later add a fourth `Shape` variant without updating the switch.

You can guard a case with `when`:

```java
String describe(Shape shape) {
    return switch (shape) {
        case Circle(double r) when r > 100 -> "huge circle";
        case Circle(double r) -> "circle of radius " + r;
        case Square s -> "square";
        case Triangle t -> "triangle";
    };
}
```

Patterns nest. If a record component is itself a record (or sealed type), you can destructure it inline:

```java
record Line(Point start, Point end) {}

String describe(Line line) {
    return switch (line) {
        case Line(Point(int x1, int y1), Point(int x2, int y2)) when x1 == x2 -> "vertical";
        case Line(Point(int x1, int y1), Point(int x2, int y2)) when y1 == y2 -> "horizontal";
        case Line l -> "diagonal";
    };
}
```

`null` is handled explicitly with `case null` (otherwise a `null` selector throws `NullPointerException`, same as classic switch).

> **When to reach for it.** Use this combination for any dispatch over a closed family of types: AST traversals, message handlers, result-type unwrapping, formatter logic. The most important property is the exhaustiveness check: when you add a new variant to the sealed parent, the compiler immediately tells you every switch that needs updating. The main tradeoff is one most languages share: very wide type families can produce sprawling switch blocks. If a single switch handles ten variants and each branch is non-trivial, consider extracting per-variant methods and dispatching to them, or splitting the variants into sub-hierarchies.

[![Airport generic type check showing type inference, wildcards, PECS, and runtime erasure]({{ '/assets/images/2026-05-04-catching-up-on-java/08-generics.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/08-generics.png' | relative_url }})

## Generics: A Flashback, Then What's New

Generics arrived in Java 5 (2004), so the basics are pre-2010 territory. But what changed since 2010 only makes sense if the basics are fresh, so we'll take a quick look back before walking through the new parts. If your generics intuition is sharp, skim the flashback and skip to the next subsection.

### Flashback: generics as you learned them

**Why they exist.** Pre-generics, collections held `Object`, and you cast on the way out:

```java
List names = new ArrayList();
names.add("ada");
String first = (String) names.get(0);   // cast, with the runtime check that goes with it
```

Generics moved the type check to compile time:

```java
List<String> names = new ArrayList<String>();
names.add("ada");
String first = names.get(0);            // no cast in source; bad writes are caught earlier
```

Generics are still erased in the running JVM, so the compiler may insert casts in the generated bytecode. The useful shift is that type mistakes move to compile time and disappear from the source you read.

**Erasure.** Generics are checked at compile time and erased at runtime. `List<String>` and `List<Integer>` are both just `List` in the running JVM. The consequences are well-known and still apply:

```java
// All of these are compile errors:
T[] arr = new T[10];                    // can't create an array of a type variable
if (obj instanceof List<String>) { }    // can't test parameterized type at runtime
Class<?> c = T.class;                   // T isn't a real class at runtime

// And this is illegal because both signatures erase to the same method:
void process(List<String> xs) { }
void process(List<Integer> xs) { }
```

**Bounded type parameters.** You can constrain what `T` can be:

```java
public static <T extends Comparable<T>> T max(List<T> xs) {
    T best = xs.get(0);
    for (T x : xs) {
        if (x.compareTo(best) > 0) best = x;
    }
    return best;
}
```

The bound is `extends`, and it's used for both classes and interfaces; there's no separate keyword.

**Wildcards and PECS.** A `List<? extends Number>` is a list whose element type is some unknown subtype of `Number`. You can read `Number` out, but you can't add non-null values of a useful element type (the compiler doesn't know what specific subtype to accept):

```java
public static double sum(List<? extends Number> xs) {
    double total = 0;
    for (Number n : xs) total += n.doubleValue();
    // xs.add(1) would be a compile error; only null is allowed
    return total;
}
```

A `List<? super Integer>` is a list whose element type is some unknown supertype of `Integer`. You can add `Integer`s to it, but reading gives you `Object`:

```java
public static void fillWithZeros(List<? super Integer> xs, int count) {
    for (int i = 0; i < count; i++) xs.add(0);
}
```

The mnemonic: **P**roducer **E**xtends, **C**onsumer **S**uper. If a parameter is something you read from, use `extends`. If it's something you write to, use `super`. If you do both, use a regular type parameter, not a wildcard.

**Raw types.** `List` (no parameter) still compiles for backward compatibility with pre-Java-5 code:

```java
List names = new ArrayList();   // compiles, with rawtypes warnings under -Xlint
```

In modern code, treat any raw type as a bug. The warnings are telling you the type system has a hole.

**The verbosity of the era.** Pre-Java-7, generic-heavy code was wordy in ways that didn't carry meaning:

```java
Map<String, List<Integer>> index = new HashMap<String, List<Integer>>();
List<String> empty = Collections.<String>emptyList();
List<Integer> sorted = new ArrayList<Integer>(input);
Collections.sort(sorted);
```

Hold this picture; the next subsection is largely about how these verbose patterns shrank or disappeared.

### What changed since

**Diamond operator (Java 7), extended to anonymous classes (Java 9).** Already covered above. The right-hand side infers from the left:

```java
Map<String, List<Integer>> index = new HashMap<>();
Comparator<String> byLength = new Comparator<>() {       // Java 9+
    public int compare(String a, String b) { return a.length() - b.length(); }
};
```

**Target-type inference got dramatically better in Java 8.** Pre-8, generic calls used fewer target contexts, so calls nested inside method arguments often needed an explicit type witness:

```java
void processStringList(List<String> xs) { ... }

// Pre-8: the compiler can't infer T for emptyList() from the method argument.
processStringList(Collections.<String>emptyList());
```

Java 8's improved inference uses more surrounding context (method parameter type, lambda return type, and other target types) to drive inference through a chain. This is what makes modern stream code work without annotation:

```java
Map<Integer, List<String>> byLength = names.stream()
    .collect(Collectors.groupingBy(String::length));
```

That call infers the stream element type and the collector's key and result types from context. In older code, the same shape of nested call often needed explicit type witnesses. The change rarely gets called out by name, but it's a big reason modern stream chains type-check without extra annotations scattered through them.

**The `var` gotcha.** Already mentioned in the syntax section, worth restating in a generics frame:

```java
var explicit = new ArrayList<String>();           // ArrayList<String>, fine
var empty = new ArrayList<>();                    // ArrayList<Object>, almost certainly not what you wanted
var copied = new ArrayList<>(List.of("ada"));     // ArrayList<String>, inferred from the constructor argument
```

An empty diamond needs either a target type or useful constructor arguments to drive inference, and bare `new ArrayList<>()` provides neither.

**Generic method references.** Method references compose with generic inference in ways that didn't exist when lambdas didn't exist:

```java
Function<String, Integer> length = String::length;
Map<String, Integer> m = names.stream()
    .collect(Collectors.toMap(Function.identity(), String::length));
```

The compiler reconstructs the parameter and return types of the referenced method against the target functional interface, then inferred type arguments flow outward through the surrounding call.

**Records and generics play nicely.** The concise generic value type the language never had:

```java
public record Pair<A, B>(A first, B second) {}
public record Result<T>(T value, List<String> warnings) {}

Pair<String, Integer> p = new Pair<>("ada", 42);
```

**Pattern matching and generics.** A parameterized type in an `instanceof` pattern has to be something the compiler can validate from the expression's static type. The runtime still doesn't know generic element types. In practice that means: if the tested expression is just `Object`, `List<String>` is not checkable; if the static type already constrains the parameterization, a parameterized pattern can be valid.

```java
Object obj = ...;
// Compile error: List<String> is not safely checkable from Object alone.
// if (obj instanceof List<String> list) { ... }

// Workaround: test the raw shape, then accept the unchecked element-type cast.
if (obj instanceof List<?> list) {
    @SuppressWarnings("unchecked")
    List<String> strings = (List<String>) list;
}

// Where the static type already pins the parameterization, the pattern works.
List<? extends Number> nums = ...;
if (nums instanceof ArrayList<? extends Number> al) {
    // al is ArrayList<? extends Number>; no element-type test happened at runtime.
}
```

This is an honest limitation. Don't expect Scala-level pattern power over generic types.

**What hasn't changed: erasure.** Still no `new T[]`, still no `T.class` without a `Class<T>` token, still no `List<int>` (you use `IntStream` or boxed `List<Integer>`). [Project Valhalla](https://openjdk.org/projects/valhalla/) has been promising value types and specialized generics for years - the recent push is around [JEP 401](https://openjdk.org/jeps/401) for value classes - but as of writing, none of it has landed in a release.

**Canonical generic APIs.** If you want to recalibrate generics intuition fast, read the signatures of the heavily-generic post-2010 APIs:

```java
<R, A> R collect(Collector<? super T, A, R> collector);                     // Stream.collect
<U> CompletableFuture<U> thenApply(Function<? super T, ? extends U> fn);    // CompletableFuture
<U> Optional<U> map(Function<? super T, ? extends U> mapper);               // Optional
<T> HttpResponse<T> send(HttpRequest req, HttpResponse.BodyHandler<T> h)     // HttpClient
    throws IOException, InterruptedException;
```

PECS appears everywhere. Multiple type parameters on a single method are routine. Once these signatures stop looking dense, you can read a method's contract directly off its declaration without running it through a translator in your head.

> **When to reach for it.** A few rules of thumb that come up a lot. Use bounded wildcards (`? extends`, `? super`) on parameter types in public APIs when you only consume or only produce; use a regular type parameter when the method does both. Don't put wildcards on return types - they push the wildcard problem onto every caller. Suppress unchecked warnings only at the smallest scope where the cast is genuinely safe, and write a one-line comment explaining why. And avoid raw types entirely; the only place they belong in modern code is in narrow interop with very old libraries that haven't been generified.

## The Java 8 Core Library Trio

Three libraries arrived together in Java 8 and reshaped how everyday code looks: streams for declarative collection processing, `Optional` for explicit absence, and `java.time` for working with dates and times without the design flaws of the old `Date` and `Calendar` APIs. None of them are conceptually surprising, but each one displaces an older idiom that a 2010-era reader will have written hundreds of times.

### Streams

[![Stream pipeline transforming user values through filter, map, sorted, and collect stages]({{ '/assets/images/2026-05-04-catching-up-on-java/09-stream-pipeline.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/09-stream-pipeline.png' | relative_url }})

[JEP 107](https://openjdk.org/jeps/107) introduced [`java.util.stream`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html). A stream is a pipeline of operations over a sequence of values. The classic before/after:

```java
// Before: build the result by hand.
List<String> activeNames = new ArrayList<>();
for (User u : users) {
    if (u.isActive()) {
        activeNames.add(u.name().toUpperCase());
    }
}
Collections.sort(activeNames);
```

```java
// After: describe the pipeline.
List<String> activeNames = users.stream()
    .filter(User::isActive)
    .map(u -> u.name().toUpperCase())
    .sorted()
    .collect(Collectors.toList());
```

The intermediate operations (`filter`, `map`, `sorted`, `distinct`, `limit`, `peek`) are lazy and return a new stream. The terminal operation (`collect`, `forEach`, `reduce`, `count`, `findFirst`, `toList`) drives the pipeline and produces a result. A stream is meant to be consumed once; implementations may throw `IllegalStateException` when they detect reuse, though not every reuse can be detected. The example uses Java 8's `collect(Collectors.toList())`; Java 16 added the shorter `Stream.toList()`, but it returns an unmodifiable list. `Collectors.toList()` makes no guarantee about mutability or implementation type.

Grouping and partitioning go through [`Collectors`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html):

```java
Map<Department, List<User>> byDept = users.stream()
    .collect(Collectors.groupingBy(User::department));

Map<Department, Long> countByDept = users.stream()
    .collect(Collectors.groupingBy(User::department, Collectors.counting()));

Map<Boolean, List<User>> active = users.stream()
    .collect(Collectors.partitioningBy(User::isActive));
```

Primitive streams (`IntStream`, `LongStream`, `DoubleStream`) avoid boxing for numeric work:

```java
int totalAge = users.stream().mapToInt(User::age).sum();
OptionalDouble avgAge = users.stream().mapToInt(User::age).average();
```

And `parallelStream()` (or `stream().parallel()`) splits the source for parallel execution, usually on the common ForkJoinPool in the JDK implementation. Tempting and often a trap.

> **When to reach for it.** Use a stream when the body of the loop is a sequence of transformations - filter, map, group, reduce - and especially when the alternative is multiple temporary collections built by hand. Reach for a plain `for` loop when the body has early returns, accumulator side effects, or branching that would force you into stream gymnastics. Two specific tradeoffs: stack traces inside long pipelines are painful (the operations all show up as `lambda$N`), and `parallelStream` is rarely faster than the sequential version - the source has to split well, the work has to be substantial, and the operations have to be stateless and order-independent. Default to sequential streams; reach for parallel only with a real benchmark in hand.

[![Optional boxes showing a present Optional user and an empty Optional user]({{ '/assets/images/2026-05-04-catching-up-on-java/10-optional.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/10-optional.png' | relative_url }})

### Optional

[`Optional<T>`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html) is a container that holds either a value or nothing. The aim is to make absence explicit in a method's return type:

```java
public Optional<User> findByEmail(String email) {
    User u = cache.get(email);
    return Optional.ofNullable(u);
}

// At the call site, the type forces you to handle absence.
Optional<User> maybe = repo.findByEmail("ada@example.com");
String display = maybe.map(User::name).orElse("unknown");
```

The useful methods: `map`, `flatMap`, `filter` for transformation; `orElse`, `orElseGet`, `orElseThrow` for unwrapping; `ifPresent`, `ifPresentOrElse` for side-effecting use. Avoid `get()` - it throws if empty, and the same call written with `orElseThrow(...)` is clearer about why.

A few well-known gotchas. `Optional.of(null)` throws (use `ofNullable`). `Optional` is a value-based class and does not implement `Serializable`, so don't put it in fields you persist. And the constructor for `Optional` is private; the factories (`of`, `ofNullable`, `empty`) are the only way in.

> **When to reach for it.** Use `Optional` as a return type for methods that may legitimately have no answer: lookups, parses, first-match queries. Don't use it as a field type (it adds a wrapper to every read for no benefit) or as a parameter type (callers will pass `Optional.empty()` instead of just calling the no-arg overload, which is worse). Don't use it for collections - return an empty list, not `Optional<List<T>>`. The whole feature is contested; plenty of teams use it heavily and plenty consider it overused. The pragmatic rule that holds up: return-type only, and only when absence is a genuine, expected outcome.

[![java.time dashboard contrasting legacy Date and Calendar with Instant, LocalDateTime, ZonedDateTime, Duration, and Period]({{ '/assets/images/2026-05-04-catching-up-on-java/11-time-zone.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/11-time-zone.png' | relative_url }})

### java.time

[JSR-310](https://jcp.org/en/jsr/detail?id=310) gave Java a real date/time API in [`java.time`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/package-summary.html), retiring `Date`, `Calendar`, and `SimpleDateFormat` for almost all modern code. The package is large, but the types you'll actually reach for are a small set:

```java
Instant now = Instant.now();                               // a moment in UTC
LocalDate today = LocalDate.now();                         // a calendar date, no time, no zone
LocalTime time = LocalTime.of(14, 30);                     // a wall-clock time, no date, no zone
LocalDateTime ts = LocalDateTime.of(today, time);          // date + time, still no zone
ZonedDateTime zdt = ts.atZone(ZoneId.of("America/New_York")); // date + time + zone

Duration d = Duration.ofMinutes(90);                       // a length of machine time
Period p = Period.ofDays(7);                               // a length of calendar time
```

The split between `Instant` (a moment), `LocalDateTime` (a description without zone), and `ZonedDateTime` (the two combined) is the single most useful piece of the design. Most bugs in old `Date`/`Calendar` code trace back to mixing these concepts.

Arithmetic is immutable and chainable:

```java
LocalDate twoWeeksAgo = LocalDate.now().minusWeeks(2);
ZonedDateTime nextStandup = ZonedDateTime.now()
    .withHour(10).withMinute(0).withSecond(0).withNano(0)
    .plusDays(1);
```

Formatting and parsing go through [`DateTimeFormatter`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html), which is thread-safe (unlike `SimpleDateFormat`):

```java
DateTimeFormatter iso = DateTimeFormatter.ISO_LOCAL_DATE;
String s = LocalDate.now().format(iso);
LocalDate parsed = LocalDate.parse("2026-05-04", iso);
```

`Duration` is for elapsed time (seconds, milliseconds, nanos); `Period` is for calendar time (days, months, years). The distinction matters because "one month from today" depends on which calendar month you started in, while "30 days from now" doesn't.

> **When to reach for it.** Always, for new code. The legacy `Date`/`Calendar` types are still around for backward compatibility, but you should treat them as legacy interop only; convert to a `java.time` type at the boundary and keep the rest of your code in the new API. The one place to be careful is at the JDBC and JSON layers: older drivers and serializers may not handle the `java.time` types out of the box, and you may need an explicit converter. The bigger conceptual tradeoff is choosing the right type. If you're not sure whether you need `Instant`, `LocalDateTime`, or `ZonedDateTime`, ask: does the value have to anchor to a real moment on the timeline (`Instant` or `ZonedDateTime`) or is it a description that has no zone until you give it one (`LocalDateTime`)? Getting that question right at design time prevents a class of timezone bugs that no amount of testing fully catches.

## Filling in the Gaps

A handful of smaller standard-library additions from Java 9 onward that delete utility classes you used to write or pull in from Guava and Apache Commons.

- **Collection factory methods (Java 9).** `List.of(1, 2, 3)`, `Map.of("a", 1, "b", 2)`. Unmodifiable collection factories, especially handy for literals, that reject `null`; mutable elements can still mutate. Use `Map.ofEntries(...)` for larger maps.
- **Stream additions (Java 9, 16).** `takeWhile`, `dropWhile`, and `Stream.toList()`.
- **String methods and Files helpers (Java 11).** `strip`, `isBlank`, `lines`, `repeat`, plus `Files.readString` and `Files.writeString`.
- **Built-in HttpClient (Java 11).** `java.net.http.HttpClient` with HTTP/2 support out of the box. You can drop Apache HttpClient for many use cases.
- **Sequenced collections (Java 21).** `getFirst`, `getLast`, `reversed`. A unified API across ordered collections.

[![Virtual thread cafe with many lightweight requests served beside larger operating system threads]({{ '/assets/images/2026-05-04-catching-up-on-java/12-concurrency.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/12-concurrency.png' | relative_url }})

## Concurrency, in Brief

Concurrency deserves its own post, but two changes are worth naming here so you know they exist.

`CompletableFuture` (Java 8) is the composable async story. It replaced most uses of the older `Future` for callback-style chaining and combination of asynchronous computations.

The bigger change is virtual threads (Java 21). They're cheap threads scheduled by the JVM rather than the OS, which means you can create very large numbers of them. For high-concurrency, blocking I/O-bound request-per-thread server code, they remove much of the case for reactive frameworks: write straight-line blocking code, run it on a virtual thread, and many blocked requests can coexist without tying up an OS thread per request. They do not make CPU-bound work faster by themselves. Scoped values were finalized in Java 25, and structured concurrency is still a preview API in Java 26.

## Tooling and Packaging, in Brief

A few tooling changes you'll bump into. `jshell` (Java 9) is a real REPL. `java Hello.java` (Java 11) runs a single-file source program directly, with no separate `javac` step. Helpful NullPointerExceptions arrived in Java 14 and tell you which variable was null; in Java 14 they were behind `-XX:+ShowCodeDetailsInExceptionMessages`, and later releases made them the normal experience. The JDK is now modular under the JPMS module system (Java 9), which most application code still ignores; it's mostly why you sometimes see `--add-opens` flags. GraalVM Native Image is worth a name-check for startup-sensitive workloads, though it lives outside the JDK proper.

[![Java museum of almosts with exhibits for Optional, JPMS modules, checked exceptions, and Project Valhalla]({{ '/assets/images/2026-05-04-catching-up-on-java/13-java-museum.png' | relative_url }})]({{ '/assets/images/2026-05-04-catching-up-on-java/full/13-java-museum.png' | relative_url }})

## What Didn't Pan Out as Expected

Honest notes for someone returning to the ecosystem.

- `Optional` is contested. Plenty of teams use it heavily; plenty consider it overused.
- JPMS modules are widely skipped by application code, even a decade after they shipped.
- Checked exceptions are still here. Lambdas made them more awkward, not less.
- Project Valhalla (value types, specialized generics) has been promised for years and hasn't landed.

## Summary

The arc from Java 7 to Java 21 is, in a sentence, the language taking over the boilerplate it could already have generated itself. The 2000-2010 version of Java had a reputation for being precise and verbose at the same time. You'd say the same type three times, you'd write the same `equals` and `hashCode` boilerplate for every value class, you'd rebuild the same close-in-finally pattern every time you opened a file. Most of that is gone. The type system is the same in spirit, the JVM is recognizable, the `java.lang` types are where you remember them, but the surface code reads differently because the language now does more of the rote work itself.

Java 8 was the pivot point: lambdas, method references, streams, `Optional`, and `java.time` arrived together and reset what idiomatic Java looks like. Once functions could be passed as arguments without writing an inner class, library APIs started designing around that capability, and the standard library followed. After Java 9, the six-month release cadence took over, and the changes started landing in clusters: text blocks, switch expressions, records, pattern matching, sealed types, virtual threads. None of these is individually a paradigm shift, but together they have moved Java from a strictly object-oriented language with some functional bolt-ons toward a language that supports immutable data, expression-oriented control flow, and exhaustive case analysis as first-class concerns.

The generics story is interesting because the feature itself was already there in 2010. What changed is that the type inference around it got better, the diamond operator and `var` removed most of the redundant declarations, and the standard library started using bounded wildcards consistently enough that you can read a method's contract directly off its declaration. Generics-heavy code from 2010 reads as wordy now; generics-heavy code today reads about as compact as a modern C-family language for most everyday cases.

If you want a starting place: read the `java.time` package summary, then the records JEP, then write one small program. A reasonable one is a single-file script that uses virtual threads and the new `HttpClient` to fan out a handful of HTTP requests. It's about thirty lines, it touches three of the changes covered in this post, and the experience of writing it is the fastest way to recalibrate what modern Java feels like.

You don't need to switch your production code to the newest JDK to get value out of any of this. Java 17 gets you records, sealed types, switch expressions, text blocks, and pattern matching for `instanceof`. Java 21 gets you finalized pattern matching for `switch`, record patterns, virtual threads, and sequenced collections. Java 25 is the current Oracle LTS as of May 2026 and adds finalized scoped values, while Java 26 keeps structured concurrency in preview. The library additions go back further: streams, `Optional`, and `java.time` are Java 8, which means even conservative shops have had access to them for a decade. The biggest practical shift, virtual threads, does require Java 21, and is the one feature where moving the version genuinely changes what your application can do rather than just how its code reads.

Java has been a much-improved language for some time now, the changes are largely additive, and if you stopped paying attention around 2010 there's about a weekend's worth of reading to get caught up on what's worth using.
