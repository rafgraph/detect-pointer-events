# Detect Pointer Events

Detect if the browser supports the pointer events api.

[Live detection test][liveDetectionTest]

Exports a reference to a singleton object (a micro state machine with an update function) with its state set to if the browser supports the pointer events api, (and if so does the api require a prefix, is it running on a touch device, and how many touch points does the device have), as well as an `update()` function which re-runs the tests and updates the object's state. There is also a `prefix(value)` function which will return the `value` and only add a prefix to it if it's required.

Note that `detect-pointer-events` is one of the micro state machines used by [`detect-it`][detectItRepo] to determine if a device is `mouseOnly`, `touchOnly`, or `hybrid`.

*For more information on the pointer events api, please see [MDN's Pointer Events][mdnPointerEvents], or the [W3C Pointer Events specification][w3cSpecLatest].*


### `detectPointerEvents` micro state machine
```javascript
const detectPointerEvents = {
  hasApi: boolean,
  requiresPrefix: boolean,
  hasTouch: boolean,
  maxTouchPoints: whole number,

  // re-run all the detection tests and update state
  update() {...},

  // prefix the passed in value only if requiresPrefix === true
  prefix(value) {...},
}
```

### Installing `detect-pointer-events`
```terminal
$ npm install detect-pointer-events
```

### Using `detect-pointer-events`
```javascript
import detectPointerEvents from 'detect-pointer-events';
```
```javascript
// using the state
detectPointerEvents.hasApi === true; // pointer events api is present in the browser
detectPointerEvents.requiresPrefix === true; // use of pointer events requires the Microsoft prefix
detectPointerEvents.hasTouch === true; // pointer events running on a touch capable device
detectPointerEvents.maxTouchPoints; // maximum number of touch points supported by the device

// updating the state - most apps won't need to use this at all
detectPointerEvents.update();

// prefixing pointer events
detectPointerEvents.prefix(value) // returns the value and only adds the prefix if requiresPrefix

// for example, this will add an event listener for 'MSPointerDown' if requiresPrefix === true,
// otherwise it will add an event listener for 'pointerdown'
element.addEventListener(detectPointerEvents.prefix('pointerdown'), function...)
```

```javascript
/*
 * note that in the case of a browser that doesn't support pointer events,
 * including when using a legacy computer and browser, the default state will be:
 */
const detectPointerEvents = {
  hasApi: false,
  requiresPrefix: undefined,
  hasTouch: undefined,
  maxTouchPoints: undefined,
}
```

For reference, here is the [pointer events prefix map][prefixMap] used by the `prefix()` function.

Note that the `update()` function is run once at the time of import to set the object's initial state, and generally doesn't need to be run again. If it doesn't have access to the `window`, then the state will be `undefined` (`detect-pointer-events` will not throw an error), and you will have to call the `update()` function manually at a later time to update its state.


### Part of the [`detect-it`][detectItRepo] family
- [`detect-it`][detectItRepo]
  - [`detect-hover`][detectHoverRepo]
  - [`detect-pointer`][detectPointerRepo]
  - [`detect-touch-events`][detectTouchEventsRepo]
  - **`detect-pointer-events`**
  - [`detect-passive-events`][detectPassiveEventsRepo]


<!-- links -->
[liveDetectionTest]: http://detect-it-v1.rafrex.com/#detect-pointer-events
[w3cSpecLatest]: https://www.w3.org/TR/pointerevents/
[mdnPointerEvents]: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
[prefixMap]: https://github.com/rafrex/detect-pointer-events/blob/master/src/index.js#L1
[detectItRepo]: https://github.com/rafrex/detect-it/tree/v1.1.0
[detectHoverRepo]: https://github.com/rafrex/detect-hover
[detectPointerRepo]: https://github.com/rafrex/detect-pointer
[detectTouchEventsRepo]: https://github.com/rafrex/detect-touch-events
[detectPassiveEventsRepo]: https://github.com/rafrex/detect-passive-events
