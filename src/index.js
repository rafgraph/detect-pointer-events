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

/**
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
      if ('PointerEvent' in window) {
        this.hasApi = true;
        this.requiresPrefix = false;
      } else if (window.navigator && 'msPointerEnabled' in window.navigator) {
        this.hasApi = true;
        this.requiresPrefix = true;
      } else {
        this.hasApi = false;
        this.requiresPrefix = undefined;
      }
      this.maxTouchPoints =
      (this.hasApi && window.navigator && window.navigator[this.prefix('maxTouchPoints')])
      || undefined;
      this.hasTouch = this.hasApi ? this.maxTouchPoints > 0 : undefined;
    }
  },
  prefix(value) {
    return (this.requiresPrefix && prefixMap[value]) || value;
  },
};

detectPointerEvents.update();
export default detectPointerEvents;
