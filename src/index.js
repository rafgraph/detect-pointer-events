const prefixMap = {
  pointerdown: 'MSPointerDown',
  pointerup: 'MSPointerUp',
  pointercancel: 'MSPointerCancel',
  pointermove: 'MSPointerMove',
  pointerover: 'MSPointerOver',
  pointerout: 'MSPointerOut',
  pointerenter: 'MSPointerEnter',
  pointerleave: 'MSPointerLeave',
  gotpointercapture: 'MSGotPointerCapture',
  lostpointercapture: 'MSLostPointerCapture',
  maxTouchPoints: 'msMaxTouchPoints',
};

/*
 * detectPointerEvents object structure
 * const detectPointerEvents = {
 *   hasApi: boolean,
 *   requiresPrefix: boolean,
 *   hasTouch: boolean,
 *   maxTouchPoints: number,
 *   update() {...},
 *   prefix(value) {return value, value will only have prefix if requiresPrefix === true},
 * }
 */
const detectPointerEvents = {
  update() {
    if (typeof window !== 'undefined') {
      // reference for detection https://msdn.microsoft.com/en-us/library/dn433244(v=vs.85).aspx
      if ('PointerEvent' in window) {
        detectPointerEvents.hasApi = true;
        detectPointerEvents.requiresPrefix = false;

        // reference for detection https://msdn.microsoft.com/library/hh673557(v=vs.85).aspx
      } else if (window.navigator && 'msPointerEnabled' in window.navigator) {
        detectPointerEvents.hasApi = true;
        detectPointerEvents.requiresPrefix = true;
      } else {
        detectPointerEvents.hasApi = false;
        detectPointerEvents.requiresPrefix = undefined;
      }
      detectPointerEvents.maxTouchPoints =
        (
          detectPointerEvents.hasApi && window.navigator &&
          window.navigator[detectPointerEvents.prefix('maxTouchPoints')]
        ) || undefined;
      detectPointerEvents.hasTouch =
        detectPointerEvents.hasApi ? detectPointerEvents.maxTouchPoints > 0 : undefined;
    }
  },
  prefix(value) {
    return (detectPointerEvents.requiresPrefix && prefixMap[value]) || value;
  },
};

detectPointerEvents.update();
export default detectPointerEvents;
