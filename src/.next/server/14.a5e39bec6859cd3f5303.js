exports.ids = [14];
exports.modules = {

/***/ "+9AK":
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__("JSas");

var iterableToArrayLimit = __webpack_require__("WFcy");

var nonIterableRest = __webpack_require__("w2uB");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "+hrH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = flyToViewport;
exports.getFlyToDuration = getFlyToDuration;

var _mathUtils = __webpack_require__("p58Y");

var _webMercatorUtils = __webpack_require__("ixny");

var vec2 = _interopRequireWildcard(__webpack_require__("HMxd"));

var EPSILON = 0.01;
var VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom'];
var DEFAULT_OPTS = {
  curve: 1.414,
  speed: 1.2
};

function flyToViewport(startProps, endProps, t) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var viewport = {};

  var _getFlyToTransitionPa = getFlyToTransitionParams(startProps, endProps, opts),
      startZoom = _getFlyToTransitionPa.startZoom,
      startCenterXY = _getFlyToTransitionPa.startCenterXY,
      uDelta = _getFlyToTransitionPa.uDelta,
      w0 = _getFlyToTransitionPa.w0,
      u1 = _getFlyToTransitionPa.u1,
      S = _getFlyToTransitionPa.S,
      rho = _getFlyToTransitionPa.rho,
      rho2 = _getFlyToTransitionPa.rho2,
      r0 = _getFlyToTransitionPa.r0;

  if (u1 < EPSILON) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = VIEWPORT_TRANSITION_PROPS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;
        var startValue = startProps[key];
        var endValue = endProps[key];
        viewport[key] = (0, _mathUtils.lerp)(startValue, endValue, t);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return viewport;
  }

  var s = t * S;
  var w = Math.cosh(r0) / Math.cosh(r0 + rho * s);
  var u = w0 * ((Math.cosh(r0) * Math.tanh(r0 + rho * s) - Math.sinh(r0)) / rho2) / u1;
  var scaleIncrement = 1 / w;
  var newZoom = startZoom + (0, _webMercatorUtils.scaleToZoom)(scaleIncrement);
  var newCenterWorld = vec2.scale([], uDelta, u);
  vec2.add(newCenterWorld, newCenterWorld, startCenterXY);
  var newCenter = (0, _webMercatorUtils.worldToLngLat)(newCenterWorld);
  viewport.longitude = newCenter[0];
  viewport.latitude = newCenter[1];
  viewport.zoom = newZoom;
  return viewport;
}

function getFlyToDuration(startProps, endProps) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  opts = Object.assign({}, DEFAULT_OPTS, opts);
  var _opts = opts,
      screenSpeed = _opts.screenSpeed,
      speed = _opts.speed,
      maxDuration = _opts.maxDuration;

  var _getFlyToTransitionPa2 = getFlyToTransitionParams(startProps, endProps, opts),
      S = _getFlyToTransitionPa2.S,
      rho = _getFlyToTransitionPa2.rho;

  var length = 1000 * S;
  var duration;

  if (Number.isFinite(screenSpeed)) {
    duration = length / (screenSpeed / rho);
  } else {
    duration = length / speed;
  }

  return Number.isFinite(maxDuration) && duration > maxDuration ? 0 : duration;
}

function getFlyToTransitionParams(startProps, endProps, opts) {
  opts = Object.assign({}, DEFAULT_OPTS, opts);
  var rho = opts.curve;
  var startZoom = startProps.zoom;
  var startCenter = [startProps.longitude, startProps.latitude];
  var startScale = (0, _webMercatorUtils.zoomToScale)(startZoom);
  var endZoom = endProps.zoom;
  var endCenter = [endProps.longitude, endProps.latitude];
  var scale = (0, _webMercatorUtils.zoomToScale)(endZoom - startZoom);
  var startCenterXY = (0, _webMercatorUtils.lngLatToWorld)(startCenter);
  var endCenterXY = (0, _webMercatorUtils.lngLatToWorld)(endCenter);
  var uDelta = vec2.sub([], endCenterXY, startCenterXY);
  var w0 = Math.max(startProps.width, startProps.height);
  var w1 = w0 / scale;
  var u1 = vec2.length(uDelta) * startScale;

  var _u1 = Math.max(u1, EPSILON);

  var rho2 = rho * rho;
  var b0 = (w1 * w1 - w0 * w0 + rho2 * rho2 * _u1 * _u1) / (2 * w0 * rho2 * _u1);
  var b1 = (w1 * w1 - w0 * w0 - rho2 * rho2 * _u1 * _u1) / (2 * w1 * rho2 * _u1);
  var r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
  var r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
  var S = (r1 - r0) / rho;
  return {
    startZoom: startZoom,
    startCenterXY: startCenterXY,
    uDelta: uDelta,
    w0: w0,
    u1: u1,
    S: S,
    rho: rho,
    rho2: rho2,
    r0: r0,
    r1: r1
  };
}
//# sourceMappingURL=fly-to-viewport.js.map

/***/ }),

/***/ "+kui":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__("V+JD");

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "/9UB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = deepEqual;

var _typeof2 = _interopRequireDefault(__webpack_require__("32EC"));

function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  } else if (Array.isArray(b)) {
    return false;
  }

  if ((0, _typeof2["default"])(a) === 'object' && (0, _typeof2["default"])(b) === 'object') {
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (var _i = 0, _aKeys = aKeys; _i < _aKeys.length; _i++) {
      var key = _aKeys[_i];

      if (!b.hasOwnProperty(key)) {
        return false;
      }

      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}
//# sourceMappingURL=deep-equal.js.map

/***/ }),

/***/ "/NxZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _mapContext = _interopRequireDefault(__webpack_require__("VNOJ"));

var propTypes = {
  captureScroll: _propTypes["default"].bool,
  captureDrag: _propTypes["default"].bool,
  captureClick: _propTypes["default"].bool,
  captureDoubleClick: _propTypes["default"].bool
};
var defaultProps = {
  captureScroll: false,
  captureDrag: true,
  captureClick: true,
  captureDoubleClick: true
};

var BaseControl = function (_PureComponent) {
  (0, _inherits2["default"])(BaseControl, _PureComponent);

  function BaseControl() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, BaseControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(BaseControl)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_context", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_events", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_containerRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onScroll", function (evt) {
      if (_this.props.captureScroll) {
        evt.stopPropagation();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragStart", function (evt) {
      if (_this.props.captureDrag) {
        evt.stopPropagation();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDblClick", function (evt) {
      if (_this.props.captureDoubleClick) {
        evt.stopPropagation();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (evt) {
      if (_this.props.captureClick) {
        evt.stopPropagation();
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(BaseControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var ref = this._containerRef.current;

      if (!ref) {
        return;
      }

      var eventManager = this._context.eventManager;

      if (eventManager) {
        this._events = {
          wheel: this._onScroll,
          panstart: this._onDragStart,
          anyclick: this._onClick,
          click: this._onClick,
          dblclick: this._onDblClick
        };
        eventManager.watch(this._events, ref);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var eventManager = this._context.eventManager;

      if (eventManager && this._events) {
        eventManager.off(this._events);
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      throw new Error('_render() not implemented');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(_mapContext["default"].Consumer, null, function (context) {
        _this2._context = context;
        return _this2._render();
      });
    }
  }]);
  return BaseControl;
}(React.PureComponent);

exports["default"] = BaseControl;
(0, _defineProperty2["default"])(BaseControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(BaseControl, "defaultProps", defaultProps);
//# sourceMappingURL=base-control.js.map

/***/ }),

/***/ "/TI7":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("+kui")();
}


/***/ }),

/***/ "/qpQ":
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__("i6L4");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "0FIn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__("egBX"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _mapContext = _interopRequireDefault(__webpack_require__("VNOJ"));

var _assert = _interopRequireDefault(__webpack_require__("uEn3"));

var _deepEqual = _interopRequireDefault(__webpack_require__("/9UB"));

var propTypes = {
  type: _propTypes["default"].string.isRequired,
  id: _propTypes["default"].string,
  source: _propTypes["default"].string,
  beforeId: _propTypes["default"].string
};

function diffLayerStyles(map, id, props, prevProps) {
  var _props$layout = props.layout,
      layout = _props$layout === void 0 ? {} : _props$layout,
      _props$paint = props.paint,
      paint = _props$paint === void 0 ? {} : _props$paint,
      filter = props.filter,
      minzoom = props.minzoom,
      maxzoom = props.maxzoom,
      beforeId = props.beforeId,
      otherProps = (0, _objectWithoutProperties2["default"])(props, ["layout", "paint", "filter", "minzoom", "maxzoom", "beforeId"]);

  if (beforeId !== prevProps.beforeId) {
    map.moveLayer(id, beforeId);
  }

  if (layout !== prevProps.layout) {
    for (var key in layout) {
      if (!(0, _deepEqual["default"])(layout[key], prevProps.layout[key])) {
        map.setLayoutProperty(id, key, layout[key]);
      }
    }
  }

  if (paint !== prevProps.paint) {
    for (var _key in paint) {
      if (!(0, _deepEqual["default"])(paint[_key], prevProps.paint[_key])) {
        map.setPaintProperty(id, _key, paint[_key]);
      }
    }
  }

  if (!(0, _deepEqual["default"])(filter, prevProps.filter)) {
    map.setFilter(id, filter);
  }

  if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
    map.setLayerZoomRange(id, minzoom, maxzoom);
  }

  for (var _key2 in otherProps) {
    if (!(0, _deepEqual["default"])(otherProps[_key2], prevProps[_key2])) {
      map.setLayerProperty(id, _key2, otherProps[_key2]);
    }
  }
}

var layerCounter = 0;

var Layer = function (_PureComponent) {
  (0, _inherits2["default"])(Layer, _PureComponent);

  function Layer(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Layer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Layer).call(this, _props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "id", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "type", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_map", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_layerOptions", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateLayer", function () {
      var map = _this._map;

      if (!map) {
        return;
      }

      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          props = _assertThisInitialize.props,
          layerOptions = _assertThisInitialize._layerOptions;

      (0, _assert["default"])(!props.id || props.id === _this.id, 'layer id changed');
      (0, _assert["default"])(props.type === _this.type, 'layer type changed');

      if (!_this.getLayer()) {
        _this._createLayer();

        return;
      }

      try {
        diffLayerStyles(map, _this.id, props, layerOptions);
        Object.assign(layerOptions, props);
      } catch (error) {
        console.warn(error);
      }
    });
    _this.id = _props.id || "jsx-layer-".concat(layerCounter++);
    _this.type = _props.type;
    return _this;
  }

  (0, _createClass2["default"])(Layer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._updateLayer();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._updateLayer();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var map = this._map;

      if (map) {
        map.off('styledata', this._updateLayer);

        if (map.style) {
          map.removeLayer(this.id);
        }
      }
    }
  }, {
    key: "getLayer",
    value: function getLayer() {
      var map = this._map;
      return map && map.style && map.getLayer(this.id);
    }
  }, {
    key: "_createLayer",
    value: function _createLayer() {
      var map = this._map;

      if (map.style && map.style._loaded) {
        var options = Object.assign({}, this.props);
        options.id = this.id;
        delete options.beforeId;
        map.addLayer(options, this.props.beforeId);
        this._layerOptions = options;
      }
    }
  }, {
    key: "_render",
    value: function _render(context) {
      if (!this._map && context.map) {
        this._map = context.map;

        this._map.on('styledata', this._updateLayer);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_mapContext["default"].Consumer, null, this._render.bind(this));
    }
  }]);
  return Layer;
}(React.PureComponent);

exports["default"] = Layer;
(0, _defineProperty2["default"])(Layer, "propTypes", propTypes);
//# sourceMappingURL=layer.js.map

/***/ }),

/***/ "1INm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var EVENT_TYPE = 'contextmenu';

var ContextmenuInput = function () {
  function ContextmenuInput(element, callback) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, ContextmenuInput);
    this.element = element;
    this.callback = callback;
    this.options = Object.assign({
      enable: true
    }, options);
    this.handleEvent = this.handleEvent.bind(this);
    element.addEventListener('contextmenu', this.handleEvent);
  }

  (0, _createClass2["default"])(ContextmenuInput, [{
    key: "destroy",
    value: function destroy() {
      this.element.removeEventListener('contextmenu', this.handleEvent);
    }
  }, {
    key: "enableEventType",
    value: function enableEventType(eventType, enabled) {
      if (eventType === EVENT_TYPE) {
        this.options.enable = enabled;
      }
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      if (!this.options.enable) {
        return;
      }

      this.callback({
        type: EVENT_TYPE,
        center: {
          x: event.clientX,
          y: event.clientY
        },
        srcEvent: event,
        pointerType: 'mouse',
        target: event.target
      });
    }
  }]);
  return ContextmenuInput;
}();

exports["default"] = ContextmenuInput;
//# sourceMappingURL=contextmenu-input.js.map

/***/ }),

/***/ "1Pnb":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("32EC");

var assertThisInitialized = __webpack_require__("rfrw");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "2HkX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.random = random;
exports.transformMat4 = transformMat4;
exports.transformQuat = transformQuat;
exports.zero = zero;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;

var glMatrix = _interopRequireWildcard(__webpack_require__("VrCi"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(4);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */


function fromValues(x, y, z, w) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */


function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */


function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */


function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */


function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */


function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */


function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */


function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {ReadonlyVec4} result the receiving vector
 * @param {ReadonlyVec4} U the first vector
 * @param {ReadonlyVec4} V the second vector
 * @param {ReadonlyVec4} W the third vector
 * @returns {vec4} result
 */


function cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */


function random(out, scale) {
  scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;

  var v1, v2, v3, v4;
  var s1, s2;

  do {
    v1 = glMatrix.RANDOM() * 2 - 1;
    v2 = glMatrix.RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);

  do {
    v3 = glMatrix.RANDOM() * 2 - 1;
    v4 = glMatrix.RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */


function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */


function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */


function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


function str(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Alias for {@link vec4.subtract}
 * @function
 */


var sub = subtract;
/**
 * Alias for {@link vec4.multiply}
 * @function
 */

exports.sub = sub;
var mul = multiply;
/**
 * Alias for {@link vec4.divide}
 * @function
 */

exports.mul = mul;
var div = divide;
/**
 * Alias for {@link vec4.distance}
 * @function
 */

exports.div = div;
var dist = distance;
/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */

exports.dist = dist;
var sqrDist = squaredDistance;
/**
 * Alias for {@link vec4.length}
 * @function
 */

exports.sqrDist = sqrDist;
var len = length;
/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */

exports.len = len;
var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

exports.sqrLen = sqrLen;

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

exports.forEach = forEach;

/***/ }),

/***/ "2VkX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _interactiveMap["default"];
  }
});
Object.defineProperty(exports, "InteractiveMap", {
  enumerable: true,
  get: function get() {
    return _interactiveMap["default"];
  }
});
Object.defineProperty(exports, "StaticMap", {
  enumerable: true,
  get: function get() {
    return _staticMap["default"];
  }
});
Object.defineProperty(exports, "Source", {
  enumerable: true,
  get: function get() {
    return _source["default"];
  }
});
Object.defineProperty(exports, "Layer", {
  enumerable: true,
  get: function get() {
    return _layer["default"];
  }
});
Object.defineProperty(exports, "BaseControl", {
  enumerable: true,
  get: function get() {
    return _baseControl["default"];
  }
});
Object.defineProperty(exports, "Marker", {
  enumerable: true,
  get: function get() {
    return _marker["default"];
  }
});
Object.defineProperty(exports, "Popup", {
  enumerable: true,
  get: function get() {
    return _popup["default"];
  }
});
Object.defineProperty(exports, "FullscreenControl", {
  enumerable: true,
  get: function get() {
    return _fullscreenControl["default"];
  }
});
Object.defineProperty(exports, "GeolocateControl", {
  enumerable: true,
  get: function get() {
    return _geolocateControl["default"];
  }
});
Object.defineProperty(exports, "NavigationControl", {
  enumerable: true,
  get: function get() {
    return _navigationControl["default"];
  }
});
Object.defineProperty(exports, "ScaleControl", {
  enumerable: true,
  get: function get() {
    return _scaleControl["default"];
  }
});
Object.defineProperty(exports, "CanvasOverlay", {
  enumerable: true,
  get: function get() {
    return _canvasOverlay["default"];
  }
});
Object.defineProperty(exports, "HTMLOverlay", {
  enumerable: true,
  get: function get() {
    return _htmlOverlay["default"];
  }
});
Object.defineProperty(exports, "SVGOverlay", {
  enumerable: true,
  get: function get() {
    return _svgOverlay["default"];
  }
});
Object.defineProperty(exports, "TRANSITION_EVENTS", {
  enumerable: true,
  get: function get() {
    return _transitionManager.TRANSITION_EVENTS;
  }
});
Object.defineProperty(exports, "TransitionInterpolator", {
  enumerable: true,
  get: function get() {
    return _transition.TransitionInterpolator;
  }
});
Object.defineProperty(exports, "LinearInterpolator", {
  enumerable: true,
  get: function get() {
    return _transition.LinearInterpolator;
  }
});
Object.defineProperty(exports, "FlyToInterpolator", {
  enumerable: true,
  get: function get() {
    return _transition.ViewportFlyToInterpolator;
  }
});
Object.defineProperty(exports, "MapController", {
  enumerable: true,
  get: function get() {
    return _mapController["default"];
  }
});
Object.defineProperty(exports, "WebMercatorViewport", {
  enumerable: true,
  get: function get() {
    return _viewportMercatorProject.WebMercatorViewport;
  }
});
Object.defineProperty(exports, "setRTLTextPlugin", {
  enumerable: true,
  get: function get() {
    return _setRtlTextPlugin["default"];
  }
});
Object.defineProperty(exports, "_MapContext", {
  enumerable: true,
  get: function get() {
    return _mapContext["default"];
  }
});

var _interactiveMap = _interopRequireDefault(__webpack_require__("4xm+"));

var _staticMap = _interopRequireDefault(__webpack_require__("r6bA"));

var _source = _interopRequireDefault(__webpack_require__("ADbe"));

var _layer = _interopRequireDefault(__webpack_require__("0FIn"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var _marker = _interopRequireDefault(__webpack_require__("3E9Y"));

var _popup = _interopRequireDefault(__webpack_require__("qZ/K"));

var _fullscreenControl = _interopRequireDefault(__webpack_require__("irS1"));

var _geolocateControl = _interopRequireDefault(__webpack_require__("3Hdt"));

var _navigationControl = _interopRequireDefault(__webpack_require__("J8En"));

var _scaleControl = _interopRequireDefault(__webpack_require__("qkV/"));

var _canvasOverlay = _interopRequireDefault(__webpack_require__("aeV+"));

var _htmlOverlay = _interopRequireDefault(__webpack_require__("Wuc6"));

var _svgOverlay = _interopRequireDefault(__webpack_require__("dmgn"));

var _transitionManager = __webpack_require__("vNCp");

var _transition = __webpack_require__("PwPu");

var _mapController = _interopRequireDefault(__webpack_require__("vnie"));

var _viewportMercatorProject = __webpack_require__("r/8N");

var _setRtlTextPlugin = _interopRequireDefault(__webpack_require__("YF+h"));

var _mapContext = _interopRequireDefault(__webpack_require__("VNOJ"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "32EC":
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "3E9Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__("fAZL"));

var _get2 = _interopRequireDefault(__webpack_require__("NWOx"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _draggableControl = _interopRequireDefault(__webpack_require__("lRTT"));

var _crispPixel = __webpack_require__("RZd7");

var propTypes = Object.assign({}, _draggableControl["default"].propTypes, {
  className: _propTypes["default"].string,
  longitude: _propTypes["default"].number.isRequired,
  latitude: _propTypes["default"].number.isRequired
});
var defaultProps = Object.assign({}, _draggableControl["default"].defaultProps, {
  className: ''
});

var Marker = function (_DraggableControl) {
  (0, _inherits2["default"])(Marker, _DraggableControl);

  function Marker() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Marker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Marker)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_control", null);
    return _this;
  }

  (0, _createClass2["default"])(Marker, [{
    key: "_getPosition",
    value: function _getPosition() {
      var _this$props = this.props,
          longitude = _this$props.longitude,
          latitude = _this$props.latitude,
          offsetLeft = _this$props.offsetLeft,
          offsetTop = _this$props.offsetTop;
      var _this$state = this.state,
          dragPos = _this$state.dragPos,
          dragOffset = _this$state.dragOffset;

      if (dragPos && dragOffset) {
        return this._getDraggedPosition(dragPos, dragOffset);
      }

      var _this$_context$viewpo = this._context.viewport.project([longitude, latitude]),
          _this$_context$viewpo2 = (0, _slicedToArray2["default"])(_this$_context$viewpo, 2),
          x = _this$_context$viewpo2[0],
          y = _this$_context$viewpo2[1];

      x += offsetLeft;
      y += offsetTop;
      return [x, y];
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this$_getPosition = this._getPosition(),
          _this$_getPosition2 = (0, _slicedToArray2["default"])(_this$_getPosition, 2),
          x = _this$_getPosition2[0],
          y = _this$_getPosition2[1];

      var transform = "translate(".concat((0, _crispPixel.crispPixel)(x), "px, ").concat((0, _crispPixel.crispPixel)(y), "px)");
      var div = this._containerRef.current;

      if (this._control && div) {
        div.style.transform = transform;
      } else {
        var _this$props2 = this.props,
            className = _this$props2.className,
            draggable = _this$props2.draggable;
        var dragPos = this.state.dragPos;
        var containerStyle = {
          position: 'absolute',
          left: 0,
          top: 0,
          transform: transform,
          cursor: draggable ? dragPos ? 'grabbing' : 'grab' : 'auto'
        };
        this._control = React.createElement("div", {
          className: "mapboxgl-marker ".concat(className),
          ref: this._containerRef,
          style: containerStyle
        }, this.props.children);
      }

      return this._control;
    }
  }, {
    key: "render",
    value: function render() {
      this._control = null;
      return (0, _get2["default"])((0, _getPrototypeOf3["default"])(Marker.prototype), "render", this).call(this);
    }
  }]);
  return Marker;
}(_draggableControl["default"]);

exports["default"] = Marker;
(0, _defineProperty2["default"])(Marker, "propTypes", propTypes);
(0, _defineProperty2["default"])(Marker, "defaultProps", defaultProps);
//# sourceMappingURL=marker.js.map

/***/ }),

/***/ "3Hdt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _viewportMercatorProject = _interopRequireDefault(__webpack_require__("r/8N"));

var _mapboxgl = _interopRequireDefault(__webpack_require__("LKQx"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var _marker = _interopRequireDefault(__webpack_require__("3E9Y"));

var _mapState = _interopRequireDefault(__webpack_require__("SjBN"));

var _transitionManager = _interopRequireDefault(__webpack_require__("vNCp"));

var _geolocateUtils = __webpack_require__("Z5ky");

var LINEAR_TRANSITION_PROPS = Object.assign({}, _transitionManager["default"].defaultProps, {
  transitionDuration: 500
});

var noop = function noop() {};

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  label: _propTypes["default"].string,
  positionOptions: _propTypes["default"].object,
  fitBoundsOptions: _propTypes["default"].object,
  trackUserLocation: _propTypes["default"].bool,
  showUserLocation: _propTypes["default"].bool,
  onViewStateChange: _propTypes["default"].func,
  onViewportChange: _propTypes["default"].func,
  onGeolocate: _propTypes["default"].func
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  className: '',
  style: {},
  label: 'Geolocate',
  positionOptions: null,
  fitBoundsOptions: null,
  trackUserLocation: false,
  showUserLocation: true,
  onGeolocate: function onGeolocate() {}
});

var GeolocateControl = function (_BaseControl) {
  (0, _inherits2["default"])(GeolocateControl, _BaseControl);

  function GeolocateControl() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, GeolocateControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(GeolocateControl)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      supportsGeolocation: false,
      markerPosition: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxGeolocateControl", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_geolocateButtonRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setupMapboxGeolocateControl", function (supportsGeolocation) {
      if (!supportsGeolocation) {
        console.warn('Geolocation support is not available, the GeolocateControl will not be visible.');
        return;
      }

      var controlOptions = {
        showUserLocation: false
      };
      ['positionOptions', 'fitBoundsOptions', 'trackUserLocation'].forEach(function (prop) {
        if (prop in _this.props && _this.props[prop] !== null) {
          controlOptions[prop] = _this.props[prop];
        }
      });
      var control = new _mapboxgl["default"].GeolocateControl(controlOptions);
      _this._mapboxGeolocateControl = control;
      control._watchState = 'OFF';
      control._geolocateButton = _this._geolocateButtonRef.current;

      if (control.options.trackUserLocation && control._geolocateButton) {
        control._geolocateButton.setAttribute('aria-pressed', 'false');
      }

      control._updateMarker = _this._updateMarker;
      control._updateCamera = _this._updateCamera;
      control._setup = true;
      var eventManager = _this._context.eventManager;

      if (control.options.trackUserLocation && eventManager) {
        eventManager.on('panstart', function () {
          if (control._watchState === 'ACTIVE_LOCK') {
            control._watchState = 'BACKGROUND';

            control._geolocateButton.classList.add('mapboxgl-ctrl-geolocate-background');

            control._geolocateButton.classList.remove('mapboxgl-ctrl-geolocate-active');
          }
        });
      }

      control.on('geolocate', _this.props.onGeolocate);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClickGeolocate", function () {
      var control = _this._mapboxGeolocateControl;
      control._map = _this._context.map;

      if (_this.props.showUserLocation) {
        control.on('geolocate', _this._updateMarker);
        control.on('trackuserlocationend', _this._updateMarker);
      }

      return _this._mapboxGeolocateControl.trigger();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateMarker", function (position) {
      if (position) {
        _this.setState({
          markerPosition: position.coords
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getBounds", function (position) {
      var center = new _mapboxgl["default"].LngLat(position.coords.longitude, position.coords.latitude);
      var radius = position.coords.accuracy;
      var bounds = center.toBounds(radius);
      return [[bounds._ne.lng, bounds._ne.lat], [bounds._sw.lng, bounds._sw.lat]];
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateCamera", function (position) {
      var viewport = _this._context.viewport;

      var bounds = _this._getBounds(position);

      var _fitBounds = new _viewportMercatorProject["default"](viewport).fitBounds(bounds),
          longitude = _fitBounds.longitude,
          latitude = _fitBounds.latitude,
          zoom = _fitBounds.zoom;

      var newViewState = Object.assign({}, viewport, {
        longitude: longitude,
        latitude: latitude,
        zoom: zoom
      });
      var mapState = new _mapState["default"](newViewState);
      var viewState = Object.assign({}, mapState.getViewportProps(), LINEAR_TRANSITION_PROPS);
      var onViewportChange = _this.props.onViewportChange || _this._context.onViewportChange || noop;
      var onViewStateChange = _this.props.onViewStateChange || _this._context.onViewStateChange || noop;
      onViewStateChange({
        viewState: viewState
      });
      onViewportChange(viewState);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderButton", function (type, label, callback) {
      return React.createElement("button", {
        key: type,
        className: "mapboxgl-ctrl-icon mapboxgl-ctrl-".concat(type),
        ref: _this._geolocateButtonRef,
        type: "button",
        title: label,
        onClick: callback
      }, React.createElement("span", {
        className: "mapboxgl-ctrl-icon",
        "aria-hidden": "true"
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderMarker", function () {
      var markerPosition = _this.state.markerPosition;
      var showUserLocation = _this.props.showUserLocation;

      if (!markerPosition || !showUserLocation) {
        return null;
      }

      return React.createElement(_marker["default"], {
        key: "location-maker",
        className: "mapboxgl-user-location-dot",
        longitude: markerPosition.longitude,
        latitude: markerPosition.latitude,
        onContextMenu: function onContextMenu(e) {
          return e.preventDefault();
        },
        captureDrag: false,
        captureDoubleClick: false
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(GeolocateControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      (0, _geolocateUtils.isGeolocationSupported)().then(function (result) {
        _this2.setState({
          supportsGeolocation: result
        });

        _this2._setupMapboxGeolocateControl(result);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._mapboxGeolocateControl) {
        var geolocationWatchID = this._mapboxGeolocateControl._geolocationWatchID;

        if (geolocationWatchID !== undefined) {
          window.navigator.geolocation.clearWatch(geolocationWatchID);
          this._mapboxGeolocateControl._geolocationWatchID = undefined;
        }
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      if (!this.state.supportsGeolocation) {
        return null;
      }

      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          label = _this$props.label;
      return React.createElement("div", null, this._renderMarker(), React.createElement("div", {
        key: "geolocate-control",
        className: "mapboxgl-ctrl mapboxgl-ctrl-group ".concat(className),
        ref: this._containerRef,
        style: style,
        onContextMenu: function onContextMenu(e) {
          return e.preventDefault();
        }
      }, this._renderButton('geolocate', label, this._onClickGeolocate)));
    }
  }]);
  return GeolocateControl;
}(_baseControl["default"]);

exports["default"] = GeolocateControl;
(0, _defineProperty2["default"])(GeolocateControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(GeolocateControl, "defaultProps", defaultProps);
//# sourceMappingURL=geolocate-control.js.map

/***/ }),

/***/ "4xm+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("xzYX"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _staticMap = _interopRequireDefault(__webpack_require__("r6bA"));

var _mapState = __webpack_require__("SjBN");

var _viewportMercatorProject = _interopRequireDefault(__webpack_require__("r/8N"));

var _transitionManager = _interopRequireDefault(__webpack_require__("vNCp"));

var _mapContext = _interopRequireDefault(__webpack_require__("VNOJ"));

var _mjolnir = __webpack_require__("KG2U");

var _mapController = _interopRequireDefault(__webpack_require__("vnie"));

var _deprecateWarn = _interopRequireDefault(__webpack_require__("i8dk"));

var propTypes = Object.assign({}, _staticMap["default"].propTypes, {
  maxZoom: _propTypes["default"].number,
  minZoom: _propTypes["default"].number,
  maxPitch: _propTypes["default"].number,
  minPitch: _propTypes["default"].number,
  onViewStateChange: _propTypes["default"].func,
  onViewportChange: _propTypes["default"].func,
  onInteractionStateChange: _propTypes["default"].func,
  transitionDuration: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  transitionInterpolator: _propTypes["default"].object,
  transitionInterruption: _propTypes["default"].number,
  transitionEasing: _propTypes["default"].func,
  onTransitionStart: _propTypes["default"].func,
  onTransitionInterrupt: _propTypes["default"].func,
  onTransitionEnd: _propTypes["default"].func,
  scrollZoom: _propTypes["default"].bool,
  dragPan: _propTypes["default"].bool,
  dragRotate: _propTypes["default"].bool,
  doubleClickZoom: _propTypes["default"].bool,
  touchZoom: _propTypes["default"].bool,
  touchRotate: _propTypes["default"].bool,
  keyboard: _propTypes["default"].bool,
  onHover: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  onDblClick: _propTypes["default"].func,
  onContextMenu: _propTypes["default"].func,
  onMouseDown: _propTypes["default"].func,
  onMouseMove: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func,
  onTouchStart: _propTypes["default"].func,
  onTouchMove: _propTypes["default"].func,
  onTouchEnd: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  onMouseOut: _propTypes["default"].func,
  onWheel: _propTypes["default"].func,
  touchAction: _propTypes["default"].string,
  clickRadius: _propTypes["default"].number,
  interactiveLayerIds: _propTypes["default"].array,
  getCursor: _propTypes["default"].func,
  controller: _propTypes["default"].instanceOf(_mapController["default"])
});

var getDefaultCursor = function getDefaultCursor(_ref) {
  var isDragging = _ref.isDragging,
      isHovering = _ref.isHovering;
  return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';
};

var defaultProps = Object.assign({}, _staticMap["default"].defaultProps, _mapState.MAPBOX_LIMITS, _transitionManager["default"].defaultProps, {
  onViewStateChange: null,
  onViewportChange: null,
  onClick: null,
  onNativeClick: null,
  onHover: null,
  onContextMenu: function onContextMenu(event) {
    return event.preventDefault();
  },
  scrollZoom: true,
  dragPan: true,
  dragRotate: true,
  doubleClickZoom: true,
  touchZoom: true,
  touchRotate: false,
  keyboard: true,
  touchAction: 'none',
  clickRadius: 0,
  getCursor: getDefaultCursor
});

var InteractiveMap = function (_PureComponent) {
  (0, _inherits2["default"])(InteractiveMap, _PureComponent);
  (0, _createClass2["default"])(InteractiveMap, null, [{
    key: "supported",
    value: function supported() {
      return _staticMap["default"].supported();
    }
  }]);

  function InteractiveMap(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, InteractiveMap);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(InteractiveMap).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      isLoaded: false,
      isDragging: false,
      isHovering: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_controller", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_eventManager", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_interactiveContext", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_width", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_height", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_eventCanvasRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_staticMapRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getMap", function () {
      return _this._staticMapRef.current ? _this._staticMapRef.current.getMap() : null;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "queryRenderedFeatures", function (geometry) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var map = _this.getMap();

      return map && map.queryRenderedFeatures(geometry, options);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onInteractionStateChange", function (interactionState) {
      var _interactionState$isD = interactionState.isDragging,
          isDragging = _interactionState$isD === void 0 ? false : _interactionState$isD;

      if (isDragging !== _this.state.isDragging) {
        _this._updateInteractiveContext({
          isDragging: isDragging
        });

        _this.setState({
          isDragging: isDragging
        });
      }

      var onInteractionStateChange = _this.props.onInteractionStateChange;

      if (onInteractionStateChange) {
        onInteractionStateChange(interactionState);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResize", function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      _this._width = width;
      _this._height = height;

      _this._setControllerProps(_this.props);

      _this.props.onResize({
        width: width,
        height: height
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onViewportChange", function (viewState, interactionState, oldViewState) {
      var _this$props = _this.props,
          onViewStateChange = _this$props.onViewStateChange,
          onViewportChange = _this$props.onViewportChange;

      if (onViewStateChange) {
        onViewStateChange({
          viewState: viewState,
          interactionState: interactionState,
          oldViewState: oldViewState
        });
      }

      if (onViewportChange) {
        onViewportChange(viewState, interactionState, oldViewState);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLoad", function (event) {
      _this.setState({
        isLoaded: true
      });

      _this.props.onLoad(event);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onEvent", function (callbackName, event) {
      var func = _this.props[callbackName];

      if (func) {
        func(_this._normalizeEvent(event));
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPointerDown", function (event) {
      switch (event.pointerType) {
        case 'touch':
          _this._onEvent('onTouchStart', event);

          break;

        default:
          _this._onEvent('onMouseDown', event);

      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPointerUp", function (event) {
      switch (event.pointerType) {
        case 'touch':
          _this._onEvent('onTouchEnd', event);

          break;

        default:
          _this._onEvent('onMouseUp', event);

      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onPointerMove", function (event) {
      switch (event.pointerType) {
        case 'touch':
          _this._onEvent('onTouchMove', event);

          break;

        default:
          _this._onEvent('onMouseMove', event);

      }

      if (!_this.state.isDragging) {
        var _this$props2 = _this.props,
            onHover = _this$props2.onHover,
            interactiveLayerIds = _this$props2.interactiveLayerIds;
        var features;
        event = _this._normalizeEvent(event);

        if (_this.state.isLoaded && (interactiveLayerIds || onHover)) {
          features = _this._getFeatures({
            pos: event.point,
            radius: _this.props.clickRadius
          });
        }

        if (onHover) {
          event.features = features;
          onHover(event);
        }

        var isHovering = Boolean(interactiveLayerIds && features && features.length > 0);
        var isEntering = isHovering && !_this.state.isHovering;
        var isExiting = !isHovering && _this.state.isHovering;

        if (isEntering) {
          _this._onEvent('onMouseEnter', event);
        }

        if (isExiting) {
          _this._onEvent('onMouseLeave', event);
        }

        if (isEntering || isExiting) {
          _this.setState({
            isHovering: isHovering
          });
        }
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (event) {
      var _this$props3 = _this.props,
          onClick = _this$props3.onClick,
          onNativeClick = _this$props3.onNativeClick,
          onDblClick = _this$props3.onDblClick,
          doubleClickZoom = _this$props3.doubleClickZoom;
      var callbacks = [];
      var isDoubleClickEnabled = onDblClick || doubleClickZoom;

      switch (event.type) {
        case 'anyclick':
          callbacks.push(onNativeClick);

          if (!isDoubleClickEnabled) {
            callbacks.push(onClick);
          }

          break;

        case 'click':
          if (isDoubleClickEnabled) {
            callbacks.push(onClick);
          }

          break;

        default:
      }

      callbacks = callbacks.filter(Boolean);

      if (callbacks.length) {
        event = _this._normalizeEvent(event);
        event.features = _this._getFeatures({
          pos: event.point,
          radius: _this.props.clickRadius
        });
        callbacks.forEach(function (cb) {
          return cb(event);
        });
      }
    });
    (0, _deprecateWarn["default"])(props);
    _this._controller = props.controller || new _mapController["default"]();
    _this._eventManager = new _mjolnir.EventManager(null, {
      touchAction: props.touchAction
    });

    _this._updateInteractiveContext({
      isDragging: false,
      eventManager: _this._eventManager
    });

    return _this;
  }

  (0, _createClass2["default"])(InteractiveMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var eventManager = this._eventManager;
      var mapContainer = this._eventCanvasRef.current;
      eventManager.setElement(mapContainer);
      eventManager.on({
        pointerdown: this._onPointerDown,
        pointermove: this._onPointerMove,
        pointerup: this._onPointerUp,
        pointerleave: this._onEvent.bind(this, 'onMouseOut'),
        click: this._onClick,
        anyclick: this._onClick,
        dblclick: this._onEvent.bind(this, 'onDblClick'),
        wheel: this._onEvent.bind(this, 'onWheel'),
        contextmenu: this._onEvent.bind(this, 'onContextMenu')
      });

      this._setControllerProps(this.props);

      this._updateInteractiveContext({
        mapContainer: mapContainer
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._setControllerProps(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._eventManager.destroy();
    }
  }, {
    key: "_setControllerProps",
    value: function _setControllerProps(props) {
      props = Object.assign({}, props, props.viewState, {
        isInteractive: Boolean(props.onViewStateChange || props.onViewportChange),
        onViewportChange: this._onViewportChange,
        onStateChange: this._onInteractionStateChange,
        eventManager: this._eventManager,
        width: this._width,
        height: this._height
      });

      this._controller.setOptions(props);

      var context = this._interactiveContext;
      context.onViewportChange = props.onViewportChange;
      context.onViewStateChange = props.onViewStateChange;
    }
  }, {
    key: "_getFeatures",
    value: function _getFeatures(_ref3) {
      var pos = _ref3.pos,
          radius = _ref3.radius;
      var features;
      var queryParams = {};
      var map = this.getMap();

      if (this.props.interactiveLayerIds) {
        queryParams.layers = this.props.interactiveLayerIds;
      }

      if (radius) {
        var size = radius;
        var bbox = [[pos[0] - size, pos[1] + size], [pos[0] + size, pos[1] - size]];
        features = map && map.queryRenderedFeatures(bbox, queryParams);
      } else {
        features = map && map.queryRenderedFeatures(pos, queryParams);
      }

      return features;
    }
  }, {
    key: "_updateInteractiveContext",
    value: function _updateInteractiveContext(updatedContext) {
      this._interactiveContext = Object.assign({}, this._interactiveContext, updatedContext);
    }
  }, {
    key: "_normalizeEvent",
    value: function _normalizeEvent(event) {
      if (event.lngLat) {
        return event;
      }

      var _event$offsetCenter = event.offsetCenter,
          x = _event$offsetCenter.x,
          y = _event$offsetCenter.y;
      var pos = [x, y];
      var viewport = new _viewportMercatorProject["default"](Object.assign({}, this.props, {
        width: this._width,
        height: this._height
      }));
      event.point = pos;
      event.lngLat = viewport.unproject(pos);
      return event;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          width = _this$props4.width,
          height = _this$props4.height,
          style = _this$props4.style,
          getCursor = _this$props4.getCursor;
      var eventCanvasStyle = Object.assign({
        position: 'relative'
      }, style, {
        width: width,
        height: height,
        cursor: getCursor(this.state)
      });
      return React.createElement(_mapContext["default"].Provider, {
        value: this._interactiveContext
      }, React.createElement("div", {
        key: "event-canvas",
        ref: this._eventCanvasRef,
        style: eventCanvasStyle
      }, React.createElement(_staticMap["default"], (0, _extends2["default"])({}, this.props, {
        width: "100%",
        height: "100%",
        style: null,
        onResize: this._onResize,
        onLoad: this._onLoad,
        ref: this._staticMapRef
      }), this.props.children)));
    }
  }]);
  return InteractiveMap;
}(React.PureComponent);

exports["default"] = InteractiveMap;
(0, _defineProperty2["default"])(InteractiveMap, "propTypes", propTypes);
(0, _defineProperty2["default"])(InteractiveMap, "defaultProps", defaultProps);
//# sourceMappingURL=interactive-map.js.map

/***/ }),

/***/ "5Mot":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = assert;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || '@math.gl/web-mercator: assertion failed.');
  }
}
//# sourceMappingURL=assert.js.map

/***/ }),

/***/ "8q48":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.length = length;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.hermite = hermite;
exports.bezier = bezier;
exports.random = random;
exports.transformMat4 = transformMat4;
exports.transformMat3 = transformMat3;
exports.transformQuat = transformQuat;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.angle = angle;
exports.zero = zero;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;

var glMatrix = _interopRequireWildcard(__webpack_require__("VrCi"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(3);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */


function fromValues(x, y, z) {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */


function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to ceil
 * @returns {vec3} out
 */


function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to floor
 * @returns {vec3} out
 */


function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */


function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */


function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to round
 * @returns {vec3} out
 */


function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */


function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to invert
 * @returns {vec3} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */


function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */


function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */


function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */


function random(out, scale) {
  scale = scale || 1.0;
  var r = glMatrix.RANDOM() * 2.0 * Math.PI;
  var z = glMatrix.RANDOM() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */


function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */


function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */


function rotateX(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */


function rotateY(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */


function rotateZ(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */


function angle(a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      bx = b[0],
      by = b[1],
      bz = b[2],
      mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
      mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
      mag = mag1 * mag2,
      cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */


function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


function str(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */


var sub = subtract;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

exports.sub = sub;
var mul = multiply;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

exports.mul = mul;
var div = divide;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

exports.div = div;
var dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

exports.dist = dist;
var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

exports.sqrDist = sqrDist;
var len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

exports.len = len;
var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

exports.sqrLen = sqrLen;

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

exports.forEach = forEach;

/***/ }),

/***/ "ADbe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _mapContext = _interopRequireDefault(__webpack_require__("VNOJ"));

var _assert = _interopRequireDefault(__webpack_require__("uEn3"));

var _deepEqual = _interopRequireDefault(__webpack_require__("/9UB"));

var propTypes = {
  type: _propTypes["default"].string.isRequired,
  id: _propTypes["default"].string
};
var sourceCounter = 0;

var Source = function (_PureComponent) {
  (0, _inherits2["default"])(Source, _PureComponent);

  function Source(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Source);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Source).call(this, _props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "id", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "type", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_map", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_sourceOptions", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateSource", function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          type = _assertThisInitialize.type,
          map = _assertThisInitialize._map;

      if (!map) {
        return;
      }

      var _assertThisInitialize2 = (0, _assertThisInitialized2["default"])(_this),
          sourceOptions = _assertThisInitialize2._sourceOptions,
          props = _assertThisInitialize2.props;

      (0, _assert["default"])(!props.id || props.id === _this.id, 'source id changed');
      (0, _assert["default"])(props.type === type, 'source type changed');
      var changedKey = '';
      var changedKeyCount = 0;

      for (var key in props) {
        if (key !== 'children' && key !== 'id' && !(0, _deepEqual["default"])(sourceOptions[key], props[key])) {
          sourceOptions[key] = props[key];
          changedKey = key;
          changedKeyCount++;
        }
      }

      var source = _this.getSource();

      if (!source) {
        _this._createSource(sourceOptions);

        return;
      }

      if (!changedKeyCount) {
        return;
      }

      if (type === 'geojson') {
        source.setData(sourceOptions.data);
      } else if (type === 'image') {
        source.updateImage({
          url: sourceOptions.url,
          coordinates: sourceOptions.coordinates
        });
      } else if ((type === 'canvas' || type === 'video') && changedKeyCount === 1 && changedKey === 'coordinates') {
        source.setCoordinates(sourceOptions.coordinates);
      } else {
        console.warn("Unable to update <Source> prop: ".concat(changedKey));
      }
    });
    _this.id = _props.id || "jsx-source-".concat(sourceCounter++);
    _this.type = _props.type;
    return _this;
  }

  (0, _createClass2["default"])(Source, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      var map = this._map;

      if (map) {
        map.off('styledata', this._updateSource);

        if (map.style) {
          requestAnimationFrame(function () {
            return map.removeSource(_this2.id);
          });
        }
      }
    }
  }, {
    key: "getSource",
    value: function getSource() {
      var map = this._map;
      return map && map.style && map.getSource(this.id);
    }
  }, {
    key: "_createSource",
    value: function _createSource(sourceOptions) {
      var map = this._map;

      if (map.style && map.style._loaded) {
        map.addSource(this.id, sourceOptions);
      }
    }
  }, {
    key: "_render",
    value: function _render(context) {
      var _this3 = this;

      if (!this._map && context.map) {
        this._map = context.map;

        this._map.on('styledata', this._updateSource);
      }

      this._updateSource();

      return React.Children.map(this.props.children, function (child) {
        return (0, React.cloneElement)(child, {
          source: _this3.id
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(_mapContext["default"].Consumer, null, this._render.bind(this));
    }
  }]);
  return Source;
}(React.PureComponent);

exports["default"] = Source;
(0, _defineProperty2["default"])(Source, "propTypes", propTypes);
//# sourceMappingURL=source.js.map

/***/ }),

/***/ "AEuh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__("gmCQ");

/**
 * Detect Element Resize.
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * Forked from version 0.5.3; includes the following modifications:
 * 1) Guard against unsafe 'window' and 'document' references (to support SSR).
 * 2) Defer initialization code via a top-level function wrapper (to support SSR).
 * 3) Avoid unnecessary reflows by not measuring size for scroll events bubbling from children.
 * 4) Add nonce for style element.
 **/

function createDetectElementResize(nonce) {
  // Check `document` and `window` in case of server-side rendering
  var _window;
  if (typeof window !== 'undefined') {
    _window = window;
  } else if (typeof self !== 'undefined') {
    _window = self;
  } else {
    _window = global;
  }

  var attachEvent = typeof document !== 'undefined' && document.attachEvent;

  if (!attachEvent) {
    var requestFrame = function () {
      var raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function (fn) {
        return _window.setTimeout(fn, 20);
      };
      return function (fn) {
        return raf(fn);
      };
    }();

    var cancelFrame = function () {
      var cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;
      return function (id) {
        return cancel(id);
      };
    }();

    var resetTriggers = function resetTriggers(element) {
      var triggers = element.__resizeTriggers__,
          expand = triggers.firstElementChild,
          contract = triggers.lastElementChild,
          expandChild = expand.firstElementChild;
      contract.scrollLeft = contract.scrollWidth;
      contract.scrollTop = contract.scrollHeight;
      expandChild.style.width = expand.offsetWidth + 1 + 'px';
      expandChild.style.height = expand.offsetHeight + 1 + 'px';
      expand.scrollLeft = expand.scrollWidth;
      expand.scrollTop = expand.scrollHeight;
    };

    var checkTriggers = function checkTriggers(element) {
      return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
    };

    var scrollListener = function scrollListener(e) {
      // Don't measure (which forces) reflow for scrolls that happen inside of children!
      if (e.target.className.indexOf('contract-trigger') < 0 && e.target.className.indexOf('expand-trigger') < 0) {
        return;
      }

      var element = this;
      resetTriggers(this);
      if (this.__resizeRAF__) {
        cancelFrame(this.__resizeRAF__);
      }
      this.__resizeRAF__ = requestFrame(function () {
        if (checkTriggers(element)) {
          element.__resizeLast__.width = element.offsetWidth;
          element.__resizeLast__.height = element.offsetHeight;
          element.__resizeListeners__.forEach(function (fn) {
            fn.call(element, e);
          });
        }
      });
    };

    /* Detect CSS Animations support to detect element display/re-attach */
    var animation = false,
        keyframeprefix = '',
        animationstartevent = 'animationstart',
        domPrefixes = 'Webkit Moz O ms'.split(' '),
        startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
        pfx = '';
    {
      var elm = document.createElement('fakeelement');
      if (elm.style.animationName !== undefined) {
        animation = true;
      }

      if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
          if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            pfx = domPrefixes[i];
            keyframeprefix = '-' + pfx.toLowerCase() + '-';
            animationstartevent = startEvents[i];
            animation = true;
            break;
          }
        }
      }
    }

    var animationName = 'resizeanim';
    var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
    var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
  }

  var createStyles = function createStyles(doc) {
    if (!doc.getElementById('detectElementResize')) {
      //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
      var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
          head = doc.head || doc.getElementsByTagName('head')[0],
          style = doc.createElement('style');

      style.id = 'detectElementResize';
      style.type = 'text/css';

      if (nonce != null) {
        style.setAttribute('nonce', nonce);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(doc.createTextNode(css));
      }

      head.appendChild(style);
    }
  };

  var addResizeListener = function addResizeListener(element, fn) {
    if (attachEvent) {
      element.attachEvent('onresize', fn);
    } else {
      if (!element.__resizeTriggers__) {
        var doc = element.ownerDocument;
        var elementStyle = _window.getComputedStyle(element);
        if (elementStyle && elementStyle.position == 'static') {
          element.style.position = 'relative';
        }
        createStyles(doc);
        element.__resizeLast__ = {};
        element.__resizeListeners__ = [];
        (element.__resizeTriggers__ = doc.createElement('div')).className = 'resize-triggers';
        element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
        element.appendChild(element.__resizeTriggers__);
        resetTriggers(element);
        element.addEventListener('scroll', scrollListener, true);

        /* Listen for a css animation to detect element display/re-attach */
        if (animationstartevent) {
          element.__resizeTriggers__.__animationListener__ = function animationListener(e) {
            if (e.animationName == animationName) {
              resetTriggers(element);
            }
          };
          element.__resizeTriggers__.addEventListener(animationstartevent, element.__resizeTriggers__.__animationListener__);
        }
      }
      element.__resizeListeners__.push(fn);
    }
  };

  var removeResizeListener = function removeResizeListener(element, fn) {
    if (attachEvent) {
      element.detachEvent('onresize', fn);
    } else {
      element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
      if (!element.__resizeListeners__.length) {
        element.removeEventListener('scroll', scrollListener, true);
        if (element.__resizeTriggers__.__animationListener__) {
          element.__resizeTriggers__.removeEventListener(animationstartevent, element.__resizeTriggers__.__animationListener__);
          element.__resizeTriggers__.__animationListener__ = null;
        }
        try {
          element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
        } catch (e) {
          // Preact compat; see developit/preact-compat/issues/228
        }
      }
    }
  };

  return {
    addResizeListener: addResizeListener,
    removeResizeListener: removeResizeListener
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var AutoSizer = function (_React$PureComponent) {
  inherits(AutoSizer, _React$PureComponent);

  function AutoSizer() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, AutoSizer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = AutoSizer.__proto__ || Object.getPrototypeOf(AutoSizer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      height: _this.props.defaultHeight || 0,
      width: _this.props.defaultWidth || 0
    }, _this._onResize = function () {
      var _this$props = _this.props,
          disableHeight = _this$props.disableHeight,
          disableWidth = _this$props.disableWidth,
          onResize = _this$props.onResize;


      if (_this._parentNode) {
        // Guard against AutoSizer component being removed from the DOM immediately after being added.
        // This can result in invalid style values which can result in NaN values if we don't handle them.
        // See issue #150 for more context.

        var _height = _this._parentNode.offsetHeight || 0;
        var _width = _this._parentNode.offsetWidth || 0;

        var _style = window.getComputedStyle(_this._parentNode) || {};
        var paddingLeft = parseInt(_style.paddingLeft, 10) || 0;
        var paddingRight = parseInt(_style.paddingRight, 10) || 0;
        var paddingTop = parseInt(_style.paddingTop, 10) || 0;
        var paddingBottom = parseInt(_style.paddingBottom, 10) || 0;

        var newHeight = _height - paddingTop - paddingBottom;
        var newWidth = _width - paddingLeft - paddingRight;

        if (!disableHeight && _this.state.height !== newHeight || !disableWidth && _this.state.width !== newWidth) {
          _this.setState({
            height: _height - paddingTop - paddingBottom,
            width: _width - paddingLeft - paddingRight
          });

          onResize({ height: _height, width: _width });
        }
      }
    }, _this._setRef = function (autoSizer) {
      _this._autoSizer = autoSizer;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(AutoSizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var nonce = this.props.nonce;

      if (this._autoSizer && this._autoSizer.parentNode && this._autoSizer.parentNode.ownerDocument && this._autoSizer.parentNode.ownerDocument.defaultView && this._autoSizer.parentNode instanceof this._autoSizer.parentNode.ownerDocument.defaultView.HTMLElement) {
        // Delay access of parentNode until mount.
        // This handles edge-cases where the component has already been unmounted before its ref has been set,
        // As well as libraries like react-lite which have a slightly different lifecycle.
        this._parentNode = this._autoSizer.parentNode;

        // Defer requiring resize handler in order to support server-side rendering.
        // See issue #41
        this._detectElementResize = createDetectElementResize(nonce);
        this._detectElementResize.addResizeListener(this._parentNode, this._onResize);

        this._onResize();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._detectElementResize && this._parentNode) {
        this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          disableHeight = _props.disableHeight,
          disableWidth = _props.disableWidth,
          style = _props.style;
      var _state = this.state,
          height = _state.height,
          width = _state.width;

      // Outer div should not force width/height since that may prevent containers from shrinking.
      // Inner component should overflow and use calculated width/height.
      // See issue #68 for more information.

      var outerStyle = { overflow: 'visible' };
      var childParams = {};

      // Avoid rendering children before the initial measurements have been collected.
      // At best this would just be wasting cycles.
      var bailoutOnChildren = false;

      if (!disableHeight) {
        if (height === 0) {
          bailoutOnChildren = true;
        }
        outerStyle.height = 0;
        childParams.height = height;
      }

      if (!disableWidth) {
        if (width === 0) {
          bailoutOnChildren = true;
        }
        outerStyle.width = 0;
        childParams.width = width;
      }

      return React.createElement(
        'div',
        {
          className: className,
          ref: this._setRef,
          style: _extends({}, outerStyle, style) },
        !bailoutOnChildren && children(childParams)
      );
    }
  }]);
  return AutoSizer;
}(React.PureComponent);

AutoSizer.defaultProps = {
  onResize: function onResize() {},
  disableHeight: false,
  disableWidth: false,
  style: {}
};

module.exports = AutoSizer;


/***/ }),

/***/ "DKXK":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("32EC");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "FoBZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeStyle = normalizeStyle;

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var refProps = ['type', 'source', 'source-layer', 'minzoom', 'maxzoom', 'filter', 'layout'];

function normalizeStyle(style) {
  if (!style) {
    return null;
  }

  if (typeof style === 'string') {
    return style;
  }

  if (style.toJS) {
    style = style.toJS();
  }

  var layerIndex = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = style.layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var layer = _step.value;
      layerIndex[layer.id] = layer;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var layers = style.layers.map(function (layer) {
    var layerRef = layerIndex[layer.ref];
    var normalizedLayer = null;

    if ('interactive' in layer) {
      normalizedLayer = _objectSpread({}, layer);
      delete normalizedLayer.interactive;
    }

    if (layerRef) {
      normalizedLayer = normalizedLayer || _objectSpread({}, layer);
      delete normalizedLayer.ref;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = refProps[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var propName = _step2.value;

          if (propName in layerRef) {
            normalizedLayer[propName] = layerRef[propName];
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    return normalizedLayer || layer;
  });
  return _objectSpread({}, style, {
    layers: layers
  });
}
//# sourceMappingURL=style-utils.js.map

/***/ }),

/***/ "HMxd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.random = random;
exports.transformMat2 = transformMat2;
exports.transformMat2d = transformMat2d;
exports.transformMat3 = transformMat3;
exports.transformMat4 = transformMat4;
exports.rotate = rotate;
exports.angle = angle;
exports.zero = zero;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.forEach = exports.sqrLen = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = exports.len = void 0;

var glMatrix = _interopRequireWildcard(__webpack_require__("VrCi"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(2);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {ReadonlyVec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */


function fromValues(x, y) {
  var out = new glMatrix.ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the source vector
 * @returns {vec2} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */


function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to ceil
 * @returns {vec2} out
 */


function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to floor
 * @returns {vec2} out
 */


function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */


function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */


function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to round
 * @returns {vec2} out
 */


function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */


function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0],
      y = a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to negate
 * @returns {vec2} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to invert
 * @returns {vec2} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to normalize
 * @returns {vec2} out
 */


function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec3} out
 */


function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */


function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */


function random(out, scale) {
  scale = scale || 1.0;
  var r = glMatrix.RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2d} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat3} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {ReadonlyVec2} a The vec2 point to rotate
 * @param {ReadonlyVec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec2} out
 */


function rotate(out, a, b, rad) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(rad),
      cosC = Math.cos(rad); //perform rotation and translate to correct position

  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {ReadonlyVec2} a The first operand
 * @param {ReadonlyVec2} b The second operand
 * @returns {Number} The angle in radians
 */


function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1],
      // mag is the product of the magnitudes of a and b
  mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2),
      // mag &&.. short circuits if mag == 0
  cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1

  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */


function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


function str(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}
/**
 * Alias for {@link vec2.length}
 * @function
 */


var len = length;
/**
 * Alias for {@link vec2.subtract}
 * @function
 */

exports.len = len;
var sub = subtract;
/**
 * Alias for {@link vec2.multiply}
 * @function
 */

exports.sub = sub;
var mul = multiply;
/**
 * Alias for {@link vec2.divide}
 * @function
 */

exports.mul = mul;
var div = divide;
/**
 * Alias for {@link vec2.distance}
 * @function
 */

exports.div = div;
var dist = distance;
/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */

exports.dist = dist;
var sqrDist = squaredDistance;
/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */

exports.sqrDist = sqrDist;
var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

exports.sqrLen = sqrLen;

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

exports.forEach = forEach;

/***/ }),

/***/ "HdUV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__("32EC"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _eventUtils = __webpack_require__("jAXA");

var DEFAULT_OPTIONS = {
  srcElement: 'root',
  priority: 0
};

var EventRegistrar = function () {
  function EventRegistrar(eventManager) {
    (0, _classCallCheck2["default"])(this, EventRegistrar);
    this.eventManager = eventManager;
    this.handlers = [];
    this.handlersByElement = new Map();
    this.handleEvent = this.handleEvent.bind(this);
    this._active = false;
  }

  (0, _createClass2["default"])(EventRegistrar, [{
    key: "isEmpty",
    value: function isEmpty() {
      return !this._active;
    }
  }, {
    key: "add",
    value: function add(type, handler, opts) {
      var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var passive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var handlers = this.handlers,
          handlersByElement = this.handlersByElement;

      if (opts && ((0, _typeof2["default"])(opts) !== 'object' || opts.addEventListener)) {
        opts = {
          srcElement: opts
        };
      }

      opts = opts ? Object.assign({}, DEFAULT_OPTIONS, opts) : DEFAULT_OPTIONS;
      var entries = handlersByElement.get(opts.srcElement);

      if (!entries) {
        entries = [];
        handlersByElement.set(opts.srcElement, entries);
      }

      var entry = {
        type: type,
        handler: handler,
        srcElement: opts.srcElement,
        priority: opts.priority
      };

      if (once) {
        entry.once = true;
      }

      if (passive) {
        entry.passive = true;
      }

      handlers.push(entry);
      this._active = this._active || !entry.passive;
      var insertPosition = entries.length - 1;

      while (insertPosition >= 0) {
        if (entries[insertPosition].priority >= entry.priority) {
          break;
        }

        insertPosition--;
      }

      entries.splice(insertPosition + 1, 0, entry);
    }
  }, {
    key: "remove",
    value: function remove(type, handler) {
      var handlers = this.handlers,
          handlersByElement = this.handlersByElement;

      for (var i = handlers.length - 1; i >= 0; i--) {
        var entry = handlers[i];

        if (entry.type === type && entry.handler === handler) {
          handlers.splice(i, 1);
          var entries = handlersByElement.get(entry.srcElement);
          entries.splice(entries.indexOf(entry), 1);

          if (entries.length === 0) {
            handlersByElement["delete"](entry.srcElement);
          }
        }
      }

      this._active = handlers.some(function (entry) {
        return !entry.passive;
      });
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      if (this.isEmpty()) {
        return;
      }

      var mjolnirEvent = this._normalizeEvent(event);

      var target = event.srcEvent.target;

      while (target && target !== mjolnirEvent.rootElement) {
        this._emit(mjolnirEvent, target);

        if (mjolnirEvent.handled) {
          return;
        }

        target = target.parentNode;
      }

      this._emit(mjolnirEvent, 'root');
    }
  }, {
    key: "_emit",
    value: function _emit(event, srcElement) {
      var entries = this.handlersByElement.get(srcElement);

      if (entries) {
        var immediatePropagationStopped = false;

        var stopPropagation = function stopPropagation() {
          event.handled = true;
        };

        var stopImmediatePropagation = function stopImmediatePropagation() {
          event.handled = true;
          immediatePropagationStopped = true;
        };

        var entriesToRemove = [];

        for (var i = 0; i < entries.length; i++) {
          var _entries$i = entries[i],
              type = _entries$i.type,
              handler = _entries$i.handler,
              once = _entries$i.once;
          handler(Object.assign({}, event, {
            type: type,
            stopPropagation: stopPropagation,
            stopImmediatePropagation: stopImmediatePropagation
          }));

          if (once) {
            entriesToRemove.push(entries[i]);
          }

          if (immediatePropagationStopped) {
            break;
          }
        }

        for (var _i = 0; _i < entriesToRemove.length; _i++) {
          var _entriesToRemove$_i = entriesToRemove[_i],
              type = _entriesToRemove$_i.type,
              handler = _entriesToRemove$_i.handler;
          this.remove(type, handler);
        }
      }
    }
  }, {
    key: "_normalizeEvent",
    value: function _normalizeEvent(event) {
      var rootElement = this.eventManager.element;
      return Object.assign({}, event, (0, _eventUtils.whichButtons)(event), (0, _eventUtils.getOffsetPosition)(event, rootElement), {
        handled: false,
        rootElement: rootElement
      });
    }
  }]);
  return EventRegistrar;
}();

exports["default"] = EventRegistrar;
//# sourceMappingURL=event-registrar.js.map

/***/ }),

/***/ "IR/O":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = debounce;

function debounce(func, delay) {
  var _this;

  var _arguments;

  var timeout;

  var executeNow = function executeNow() {
    timeout = null;
    return func.apply(_this, _arguments);
  };

  return function () {
    _this = this;
    _arguments = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(executeNow, delay);
  };
}
//# sourceMappingURL=debounce.js.map

/***/ }),

/***/ "IaJi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Map; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("gmCQ");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_map_gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2VkX");
/* harmony import */ var react_map_gl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_map_gl__WEBPACK_IMPORTED_MODULE_1__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



let navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};
function Map() {
  let {
    0: state,
    1: setState
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    viewport: {
      width: '800px',
      height: '600px',
      latitiude: 21.5,
      longitude: -158,
      zoom: 3,
      bearing: 0,
      pitch: 0
    }
  });
  return __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_1___default.a, _extends({
    mapStyle: "mapbox://styles/branomap/ck9rqnqqz0d5e1im9s3xm1k9a",
    mapboxApiAccessToken: process.env.MAPBOX_API_ACCESS_TOKEN,
    onViewportChange: viewport => setState({
      viewport
    })
  }, state.viewport), __jsx("div", {
    style: navStyle
  }, __jsx(react_map_gl__WEBPACK_IMPORTED_MODULE_1__["NavigationControl"], null)));
}

/***/ }),

/***/ "J8En":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var _mapState = _interopRequireDefault(__webpack_require__("SjBN"));

var _mapController = __webpack_require__("vnie");

var _deprecateWarn = _interopRequireDefault(__webpack_require__("i8dk"));

var _version = __webpack_require__("eLnH");

var noop = function noop() {};

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  className: _propTypes["default"].string,
  onViewStateChange: _propTypes["default"].func,
  onViewportChange: _propTypes["default"].func,
  showCompass: _propTypes["default"].bool,
  showZoom: _propTypes["default"].bool,
  zoomInLabel: _propTypes["default"].string,
  zoomOutLabel: _propTypes["default"].string,
  compassLabel: _propTypes["default"].string
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  className: '',
  showCompass: true,
  showZoom: true,
  zoomInLabel: 'Zoom In',
  zoomOutLabel: 'Zoom Out',
  compassLabel: 'Reset North'
});
var VERSION_LEGACY = 1;
var VERSION_1_6 = 2;

function getUIVersion(mapboxVersion) {
  return (0, _version.compareVersions)(mapboxVersion, '1.6.0') >= 0 ? VERSION_1_6 : VERSION_LEGACY;
}

var NavigationControl = function (_BaseControl) {
  (0, _inherits2["default"])(NavigationControl, _BaseControl);

  function NavigationControl(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, NavigationControl);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(NavigationControl).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_uiVersion", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onZoomIn", function () {
      _this._updateViewport({
        zoom: _this._context.viewport.zoom + 1
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onZoomOut", function () {
      _this._updateViewport({
        zoom: _this._context.viewport.zoom - 1
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResetNorth", function () {
      _this._updateViewport({
        bearing: 0,
        pitch: 0
      });
    });
    (0, _deprecateWarn["default"])(props);
    return _this;
  }

  (0, _createClass2["default"])(NavigationControl, [{
    key: "_updateViewport",
    value: function _updateViewport(opts) {
      var viewport = this._context.viewport;
      var mapState = new _mapState["default"](Object.assign({}, viewport, opts));
      var viewState = Object.assign({}, mapState.getViewportProps(), _mapController.LINEAR_TRANSITION_PROPS);
      var onViewportChange = this.props.onViewportChange || this._context.onViewportChange || noop;
      var onViewStateChange = this.props.onViewStateChange || this._context.onViewStateChange || noop;
      onViewStateChange({
        viewState: viewState
      });
      onViewportChange(viewState);
    }
  }, {
    key: "_renderCompass",
    value: function _renderCompass() {
      var bearing = this._context.viewport.bearing;
      var style = {
        transform: "rotate(".concat(-bearing, "deg)")
      };
      return this._uiVersion === VERSION_1_6 ? React.createElement("span", {
        className: "mapboxgl-ctrl-icon",
        "aria-hidden": "true",
        style: style
      }) : React.createElement("span", {
        className: "mapboxgl-ctrl-compass-arrow",
        style: style
      });
    }
  }, {
    key: "_renderButton",
    value: function _renderButton(type, label, callback, children) {
      return React.createElement("button", {
        key: type,
        className: "mapboxgl-ctrl-icon mapboxgl-ctrl-".concat(type),
        type: "button",
        title: label,
        onClick: callback
      }, children || React.createElement("span", {
        className: "mapboxgl-ctrl-icon",
        "aria-hidden": "true"
      }));
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this$props = this.props,
          className = _this$props.className,
          showCompass = _this$props.showCompass,
          showZoom = _this$props.showZoom,
          zoomInLabel = _this$props.zoomInLabel,
          zoomOutLabel = _this$props.zoomOutLabel,
          compassLabel = _this$props.compassLabel;

      if (!this._uiVersion) {
        var map = this._context.map;
        this._uiVersion = getUIVersion(map && map.version);
      }

      return React.createElement("div", {
        className: "mapboxgl-ctrl mapboxgl-ctrl-group ".concat(className),
        ref: this._containerRef
      }, showZoom && this._renderButton('zoom-in', zoomInLabel, this._onZoomIn), showZoom && this._renderButton('zoom-out', zoomOutLabel, this._onZoomOut), showCompass && this._renderButton('compass', compassLabel, this._onResetNorth, this._renderCompass()));
    }
  }]);
  return NavigationControl;
}(_baseControl["default"]);

exports["default"] = NavigationControl;
(0, _defineProperty2["default"])(NavigationControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(NavigationControl, "defaultProps", defaultProps);
//# sourceMappingURL=navigation-control.js.map

/***/ }),

/***/ "JSas":
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "K3mW":
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__("fAZL");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "KG2U":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "EventManager", {
  enumerable: true,
  get: function get() {
    return _eventManager["default"];
  }
});

var _eventManager = _interopRequireDefault(__webpack_require__("za9Z"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Ku1M":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _viewport = _interopRequireDefault(__webpack_require__("Sb9D"));

var _webMercatorUtils = __webpack_require__("ixny");

var _fitBounds3 = _interopRequireDefault(__webpack_require__("jJdG"));

var vec2 = _interopRequireWildcard(__webpack_require__("HMxd"));

var WebMercatorViewport = function (_Viewport) {
  (0, _inherits2["default"])(WebMercatorViewport, _Viewport);

  function WebMercatorViewport() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        width = _ref.width,
        height = _ref.height,
        _ref$latitude = _ref.latitude,
        latitude = _ref$latitude === void 0 ? 0 : _ref$latitude,
        _ref$longitude = _ref.longitude,
        longitude = _ref$longitude === void 0 ? 0 : _ref$longitude,
        _ref$zoom = _ref.zoom,
        zoom = _ref$zoom === void 0 ? 0 : _ref$zoom,
        _ref$pitch = _ref.pitch,
        pitch = _ref$pitch === void 0 ? 0 : _ref$pitch,
        _ref$bearing = _ref.bearing,
        bearing = _ref$bearing === void 0 ? 0 : _ref$bearing,
        _ref$altitude = _ref.altitude,
        altitude = _ref$altitude === void 0 ? 1.5 : _ref$altitude,
        _ref$nearZMultiplier = _ref.nearZMultiplier,
        nearZMultiplier = _ref$nearZMultiplier === void 0 ? 0.02 : _ref$nearZMultiplier,
        _ref$farZMultiplier = _ref.farZMultiplier,
        farZMultiplier = _ref$farZMultiplier === void 0 ? 1.01 : _ref$farZMultiplier;

    (0, _classCallCheck2["default"])(this, WebMercatorViewport);
    width = width || 1;
    height = height || 1;
    var scale = (0, _webMercatorUtils.zoomToScale)(zoom);
    altitude = Math.max(0.75, altitude);
    var center = (0, _webMercatorUtils.lngLatToWorld)([longitude, latitude]);
    center[2] = 0;
    var projectionMatrix = (0, _webMercatorUtils.getProjectionMatrix)({
      width: width,
      height: height,
      pitch: pitch,
      bearing: bearing,
      altitude: altitude,
      nearZMultiplier: nearZMultiplier,
      farZMultiplier: farZMultiplier
    });
    var viewMatrix = (0, _webMercatorUtils.getViewMatrix)({
      height: height,
      scale: scale,
      center: center,
      pitch: pitch,
      bearing: bearing,
      altitude: altitude
    });
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(WebMercatorViewport).call(this, {
      width: width,
      height: height,
      scale: scale,
      viewMatrix: viewMatrix,
      projectionMatrix: projectionMatrix
    }));
    _this.latitude = latitude;
    _this.longitude = longitude;
    _this.zoom = zoom;
    _this.pitch = pitch;
    _this.bearing = bearing;
    _this.altitude = altitude;
    _this.center = center;
    _this.unitsPerMeter = (0, _webMercatorUtils.getDistanceScales)((0, _assertThisInitialized2["default"])(_this)).unitsPerMeter[2];
    Object.freeze((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(WebMercatorViewport, [{
    key: "projectFlat",
    value: function projectFlat(lngLat) {
      return (0, _webMercatorUtils.lngLatToWorld)(lngLat);
    }
  }, {
    key: "unprojectFlat",
    value: function unprojectFlat(xy) {
      return (0, _webMercatorUtils.worldToLngLat)(xy);
    }
  }, {
    key: "getMapCenterByLngLatPosition",
    value: function getMapCenterByLngLatPosition(_ref2) {
      var lngLat = _ref2.lngLat,
          pos = _ref2.pos;
      var fromLocation = (0, _webMercatorUtils.pixelsToWorld)(pos, this.pixelUnprojectionMatrix);
      var toLocation = (0, _webMercatorUtils.lngLatToWorld)(lngLat);
      var translate = vec2.add([], toLocation, vec2.negate([], fromLocation));
      var newCenter = vec2.add([], this.center, translate);
      return (0, _webMercatorUtils.worldToLngLat)(newCenter, this.scale);
    }
  }, {
    key: "getLocationAtPoint",
    value: function getLocationAtPoint(_ref3) {
      var lngLat = _ref3.lngLat,
          pos = _ref3.pos;
      return this.getMapCenterByLngLatPosition({
        lngLat: lngLat,
        pos: pos
      });
    }
  }, {
    key: "fitBounds",
    value: function fitBounds(bounds) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var width = this.width,
          height = this.height;

      var _fitBounds2 = (0, _fitBounds3["default"])(Object.assign({
        width: width,
        height: height,
        bounds: bounds
      }, options)),
          longitude = _fitBounds2.longitude,
          latitude = _fitBounds2.latitude,
          zoom = _fitBounds2.zoom;

      return new WebMercatorViewport({
        width: width,
        height: height,
        longitude: longitude,
        latitude: latitude,
        zoom: zoom
      });
    }
  }]);
  return WebMercatorViewport;
}(_viewport["default"]);

exports["default"] = WebMercatorViewport;
//# sourceMappingURL=web-mercator-viewport.js.map

/***/ }),

/***/ "LKQx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = null;
exports["default"] = _default;
//# sourceMappingURL=mapboxgl.js.map

/***/ }),

/***/ "LlPl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GESTURE_EVENT_ALIASES = exports.EVENT_RECOGNIZER_MAP = exports.INPUT_EVENT_TYPES = exports.BASIC_EVENT_ALIASES = exports.RECOGNIZER_FALLBACK_MAP = exports.RECOGNIZER_COMPATIBLE_MAP = exports.RECOGNIZERS = void 0;

var _hammer = _interopRequireDefault(__webpack_require__("ZIYu"));

var RECOGNIZERS = _hammer["default"] ? [[_hammer["default"].Rotate, {
  enable: false
}], [_hammer["default"].Pinch, {
  enable: false
}], [_hammer["default"].Swipe, {
  enable: false
}], [_hammer["default"].Pan, {
  threshold: 0,
  enable: false
}], [_hammer["default"].Press, {
  enable: false
}], [_hammer["default"].Tap, {
  event: 'doubletap',
  taps: 2,
  enable: false
}], [_hammer["default"].Tap, {
  event: 'anytap',
  enable: false
}], [_hammer["default"].Tap, {
  enable: false
}]] : null;
exports.RECOGNIZERS = RECOGNIZERS;
var RECOGNIZER_COMPATIBLE_MAP = {
  rotate: ['pinch'],
  pinch: ['pan'],
  pan: ['press', 'doubletap', 'anytap', 'tap'],
  doubletap: ['anytap'],
  anytap: ['tap']
};
exports.RECOGNIZER_COMPATIBLE_MAP = RECOGNIZER_COMPATIBLE_MAP;
var RECOGNIZER_FALLBACK_MAP = {
  doubletap: ['tap']
};
exports.RECOGNIZER_FALLBACK_MAP = RECOGNIZER_FALLBACK_MAP;
var BASIC_EVENT_ALIASES = {
  pointerdown: 'pointerdown',
  pointermove: 'pointermove',
  pointerup: 'pointerup',
  touchstart: 'pointerdown',
  touchmove: 'pointermove',
  touchend: 'pointerup',
  mousedown: 'pointerdown',
  mousemove: 'pointermove',
  mouseup: 'pointerup'
};
exports.BASIC_EVENT_ALIASES = BASIC_EVENT_ALIASES;
var INPUT_EVENT_TYPES = {
  KEY_EVENTS: ['keydown', 'keyup'],
  MOUSE_EVENTS: ['mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout', 'mouseleave'],
  WHEEL_EVENTS: ['wheel', 'mousewheel', 'DOMMouseScroll']
};
exports.INPUT_EVENT_TYPES = INPUT_EVENT_TYPES;
var EVENT_RECOGNIZER_MAP = {
  tap: 'tap',
  anytap: 'anytap',
  doubletap: 'doubletap',
  press: 'press',
  pinch: 'pinch',
  pinchin: 'pinch',
  pinchout: 'pinch',
  pinchstart: 'pinch',
  pinchmove: 'pinch',
  pinchend: 'pinch',
  pinchcancel: 'pinch',
  rotate: 'rotate',
  rotatestart: 'rotate',
  rotatemove: 'rotate',
  rotateend: 'rotate',
  rotatecancel: 'rotate',
  pan: 'pan',
  panstart: 'pan',
  panmove: 'pan',
  panup: 'pan',
  pandown: 'pan',
  panleft: 'pan',
  panright: 'pan',
  panend: 'pan',
  pancancel: 'pan',
  swipe: 'swipe',
  swipeleft: 'swipe',
  swiperight: 'swipe',
  swipeup: 'swipe',
  swipedown: 'swipe'
};
exports.EVENT_RECOGNIZER_MAP = EVENT_RECOGNIZER_MAP;
var GESTURE_EVENT_ALIASES = {
  click: 'tap',
  anyclick: 'anytap',
  dblclick: 'doubletap',
  mousedown: 'pointerdown',
  mousemove: 'pointermove',
  mouseup: 'pointerup',
  mouseover: 'pointerover',
  mouseout: 'pointerout',
  mouseleave: 'pointerleave'
};
exports.GESTURE_EVENT_ALIASES = GESTURE_EVENT_ALIASES;
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "Md60":
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "NP6S":
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "NWOx":
/***/ (function(module, exports, __webpack_require__) {

var superPropBase = __webpack_require__("K3mW");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),

/***/ "NrMJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _viewportMercatorProject = _interopRequireDefault(__webpack_require__("r/8N"));

var _assert = _interopRequireDefault(__webpack_require__("uEn3"));

var _transitionInterpolator = _interopRequireDefault(__webpack_require__("uTCq"));

var _transitionUtils = __webpack_require__("eA6b");

var _mathUtils = __webpack_require__("sg3N");

var VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];

var LinearInterpolator = function (_TransitionInterpolat) {
  (0, _inherits2["default"])(LinearInterpolator, _TransitionInterpolat);

  function LinearInterpolator() {
    var _this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, LinearInterpolator);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LinearInterpolator).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "around", void 0);

    if (Array.isArray(opts)) {
      opts = {
        transitionProps: opts
      };
    }

    _this.propNames = opts.transitionProps || VIEWPORT_TRANSITION_PROPS;

    if (opts.around) {
      _this.around = opts.around;
    }

    return _this;
  }

  (0, _createClass2["default"])(LinearInterpolator, [{
    key: "initializeProps",
    value: function initializeProps(startProps, endProps) {
      var startViewportProps = {};
      var endViewportProps = {};

      if (this.around) {
        startViewportProps.around = this.around;
        var aroundLngLat = new _viewportMercatorProject["default"](startProps).unproject(this.around);
        Object.assign(endViewportProps, endProps, {
          around: new _viewportMercatorProject["default"](endProps).project(aroundLngLat),
          aroundLngLat: aroundLngLat
        });
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.propNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;
          var startValue = startProps[key];
          var endValue = endProps[key];
          (0, _assert["default"])((0, _transitionUtils.isValid)(startValue) && (0, _transitionUtils.isValid)(endValue), "".concat(key, " must be supplied for transition"));
          startViewportProps[key] = startValue;
          endViewportProps[key] = (0, _transitionUtils.getEndValueByShortestPath)(key, startValue, endValue);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return {
        start: startViewportProps,
        end: endViewportProps
      };
    }
  }, {
    key: "interpolateProps",
    value: function interpolateProps(startProps, endProps, t) {
      var viewport = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.propNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;
          viewport[key] = (0, _mathUtils.lerp)(startProps[key], endProps[key], t);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (endProps.around) {
        var _getMapCenterByLngLat = new _viewportMercatorProject["default"](Object.assign({}, endProps, viewport)).getMapCenterByLngLatPosition({
          lngLat: endProps.aroundLngLat,
          pos: (0, _mathUtils.lerp)(startProps.around, endProps.around, t)
        }),
            _getMapCenterByLngLat2 = (0, _slicedToArray2["default"])(_getMapCenterByLngLat, 2),
            longitude = _getMapCenterByLngLat2[0],
            latitude = _getMapCenterByLngLat2[1];

        viewport.longitude = longitude;
        viewport.latitude = latitude;
      }

      return viewport;
    }
  }]);
  return LinearInterpolator;
}(_transitionInterpolator["default"]);

exports["default"] = LinearInterpolator;
//# sourceMappingURL=linear-interpolator.js.map

/***/ }),

/***/ "OMdT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _constants = __webpack_require__("LlPl");

var KEY_EVENTS = _constants.INPUT_EVENT_TYPES.KEY_EVENTS;
var DOWN_EVENT_TYPE = 'keydown';
var UP_EVENT_TYPE = 'keyup';

var KeyInput = function () {
  function KeyInput(element, callback) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, KeyInput);
    this.element = element;
    this.callback = callback;
    this.options = Object.assign({
      enable: true
    }, options);
    this.enableDownEvent = this.options.enable;
    this.enableUpEvent = this.options.enable;
    this.events = KEY_EVENTS.concat(options.events || []);
    this.handleEvent = this.handleEvent.bind(this);
    element.tabIndex = options.tabIndex || 0;
    element.style.outline = 'none';
    this.events.forEach(function (event) {
      return element.addEventListener(event, _this.handleEvent);
    });
  }

  (0, _createClass2["default"])(KeyInput, [{
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.events.forEach(function (event) {
        return _this2.element.removeEventListener(event, _this2.handleEvent);
      });
    }
  }, {
    key: "enableEventType",
    value: function enableEventType(eventType, enabled) {
      if (eventType === DOWN_EVENT_TYPE) {
        this.enableDownEvent = enabled;
      }

      if (eventType === UP_EVENT_TYPE) {
        this.enableUpEvent = enabled;
      }
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      var targetElement = event.target || event.srcElement;

      if (targetElement.tagName === 'INPUT' && targetElement.type === 'text' || targetElement.tagName === 'TEXTAREA') {
        return;
      }

      if (this.enableDownEvent && event.type === 'keydown') {
        this.callback({
          type: DOWN_EVENT_TYPE,
          srcEvent: event,
          key: event.key,
          target: event.target
        });
      }

      if (this.enableUpEvent && event.type === 'keyup') {
        this.callback({
          type: UP_EVENT_TYPE,
          srcEvent: event,
          key: event.key,
          target: event.target
        });
      }
    }
  }]);
  return KeyInput;
}();

exports["default"] = KeyInput;
//# sourceMappingURL=key-input.js.map

/***/ }),

/***/ "OSiu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDynamicPosition = getDynamicPosition;
exports.ANCHOR_POSITION = void 0;
var ANCHOR_POSITION = {
  top: {
    x: 0.5,
    y: 0
  },
  'top-left': {
    x: 0,
    y: 0
  },
  'top-right': {
    x: 1,
    y: 0
  },
  bottom: {
    x: 0.5,
    y: 1
  },
  'bottom-left': {
    x: 0,
    y: 1
  },
  'bottom-right': {
    x: 1,
    y: 1
  },
  left: {
    x: 0,
    y: 0.5
  },
  right: {
    x: 1,
    y: 0.5
  }
};
exports.ANCHOR_POSITION = ANCHOR_POSITION;
var ANCHOR_TYPES = Object.keys(ANCHOR_POSITION);

function getDynamicPosition(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      selfWidth = _ref.selfWidth,
      selfHeight = _ref.selfHeight,
      anchor = _ref.anchor,
      _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? 0 : _ref$padding;
  var _ANCHOR_POSITION$anch = ANCHOR_POSITION[anchor],
      anchorX = _ANCHOR_POSITION$anch.x,
      anchorY = _ANCHOR_POSITION$anch.y;
  var top = y - anchorY * selfHeight;
  var bottom = top + selfHeight;
  var yStep = 0.5;

  if (top < padding) {
    while (top < padding && anchorY >= yStep) {
      anchorY -= yStep;
      top += yStep * selfHeight;
    }
  } else if (bottom > height - padding) {
    while (bottom > height - padding && anchorY <= 1 - yStep) {
      anchorY += yStep;
      bottom -= yStep * selfHeight;
    }
  }

  var left = x - anchorX * selfWidth;
  var right = left + selfWidth;
  var xStep = 0.5;

  if (anchorY === 0.5) {
    anchorX = Math.floor(anchorX);
    xStep = 1;
  }

  if (left < padding) {
    while (left < padding && anchorX >= xStep) {
      anchorX -= xStep;
      left += xStep * selfWidth;
    }
  } else if (right > width - padding) {
    while (right > width - padding && anchorX <= 1 - xStep) {
      anchorX += xStep;
      right -= xStep * selfWidth;
    }
  }

  return ANCHOR_TYPES.find(function (positionType) {
    var anchorPosition = ANCHOR_POSITION[positionType];
    return anchorPosition.x === anchorX && anchorPosition.y === anchorY;
  }) || anchor;
}
//# sourceMappingURL=dynamic-position.js.map

/***/ }),

/***/ "POR0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = normalizeViewportProps;

var _webMercatorViewport = _interopRequireDefault(__webpack_require__("Ku1M"));

var _mathUtils = __webpack_require__("p58Y");

var MAX_LATITUDE = 85.05113;
var MIN_LATITUDE = -85.05113;

function normalizeViewportProps(_ref) {
  var width = _ref.width,
      height = _ref.height,
      longitude = _ref.longitude,
      latitude = _ref.latitude,
      zoom = _ref.zoom,
      _ref$pitch = _ref.pitch,
      pitch = _ref$pitch === void 0 ? 0 : _ref$pitch,
      _ref$bearing = _ref.bearing,
      bearing = _ref$bearing === void 0 ? 0 : _ref$bearing;

  if (longitude < -180 || longitude > 180) {
    longitude = (0, _mathUtils.mod)(longitude + 180, 360) - 180;
  }

  if (bearing < -180 || bearing > 180) {
    bearing = (0, _mathUtils.mod)(bearing + 180, 360) - 180;
  }

  var flatViewport = new _webMercatorViewport["default"]({
    width: width,
    height: height,
    longitude: longitude,
    latitude: latitude,
    zoom: zoom
  });
  var topY = flatViewport.project([longitude, MAX_LATITUDE])[1];
  var bottomY = flatViewport.project([longitude, MIN_LATITUDE])[1];
  var shiftY = 0;

  if (bottomY - topY < height) {
    zoom += Math.log2(height / (bottomY - topY));
    flatViewport = new _webMercatorViewport["default"]({
      width: width,
      height: height,
      longitude: longitude,
      latitude: latitude,
      zoom: zoom
    });
    topY = flatViewport.project([longitude, MAX_LATITUDE])[1];
    bottomY = flatViewport.project([longitude, MIN_LATITUDE])[1];
  }

  if (topY > 0) {
    shiftY = topY;
  } else if (bottomY < height) {
    shiftY = bottomY - height;
  }

  if (shiftY) {
    latitude = flatViewport.unproject([width / 2, height / 2 + shiftY])[1];
  }

  return {
    width: width,
    height: height,
    longitude: longitude,
    latitude: latitude,
    zoom: zoom,
    pitch: pitch,
    bearing: bearing
  };
}
//# sourceMappingURL=normalize-viewport-props.js.map

/***/ }),

/***/ "PwPu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TransitionInterpolator", {
  enumerable: true,
  get: function get() {
    return _transitionInterpolator["default"];
  }
});
Object.defineProperty(exports, "ViewportFlyToInterpolator", {
  enumerable: true,
  get: function get() {
    return _viewportFlyToInterpolator["default"];
  }
});
Object.defineProperty(exports, "LinearInterpolator", {
  enumerable: true,
  get: function get() {
    return _linearInterpolator["default"];
  }
});

var _transitionInterpolator = _interopRequireDefault(__webpack_require__("uTCq"));

var _viewportFlyToInterpolator = _interopRequireDefault(__webpack_require__("TCcG"));

var _linearInterpolator = _interopRequireDefault(__webpack_require__("NrMJ"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "Q0G1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passiveSupported = exports.document = exports.global = exports.window = exports.userAgent = void 0;
var userAgent = typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
exports.userAgent = userAgent;
var window_ = typeof window !== 'undefined' ? window : global;
exports.window = window_;
var global_ = typeof global !== 'undefined' ? global : window;
exports.global = global_;
var document_ = typeof document !== 'undefined' ? document : {};
exports.document = document_;
var passiveSupported = false;
exports.passiveSupported = passiveSupported;

try {
  var options = {
    get passive() {
      exports.passiveSupported = passiveSupported = true;
      return true;
    }

  };
  window_.addEventListener('test', options, options);
  window_.removeEventListener('test', options, options);
} catch (err) {}
//# sourceMappingURL=globals.js.map

/***/ }),

/***/ "RZd7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crispPercentage = exports.crispPixel = void 0;
var pixelRatio = typeof window !== 'undefined' && window.devicePixelRatio || 1;

var crispPixel = function crispPixel(size) {
  return Math.round(size * pixelRatio) / pixelRatio;
};

exports.crispPixel = crispPixel;

var crispPercentage = function crispPercentage(el, percentage) {
  var dimension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'x';

  if (el === null) {
    return percentage;
  }

  var origSize = dimension === 'x' ? el.offsetWidth : el.offsetHeight;
  return crispPixel(percentage / 100 * origSize) / origSize * 100;
};

exports.crispPercentage = crispPercentage;
//# sourceMappingURL=crisp-pixel.js.map

/***/ }),

/***/ "SDdp":
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "Sb9D":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _mathUtils = __webpack_require__("p58Y");

var _webMercatorUtils = __webpack_require__("ixny");

var mat4 = _interopRequireWildcard(__webpack_require__("qWEl"));

var IDENTITY = (0, _mathUtils.createMat4)();

var Viewport = function () {
  function Viewport() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        width = _ref.width,
        height = _ref.height,
        scale = _ref.scale,
        _ref$viewMatrix = _ref.viewMatrix,
        viewMatrix = _ref$viewMatrix === void 0 ? IDENTITY : _ref$viewMatrix,
        _ref$projectionMatrix = _ref.projectionMatrix,
        projectionMatrix = _ref$projectionMatrix === void 0 ? IDENTITY : _ref$projectionMatrix;

    (0, _classCallCheck2["default"])(this, Viewport);
    this.width = width || 1;
    this.height = height || 1;
    this.scale = scale;
    this.unitsPerMeter = 1;
    this.viewMatrix = viewMatrix;
    this.projectionMatrix = projectionMatrix;
    var vpm = (0, _mathUtils.createMat4)();
    mat4.multiply(vpm, vpm, this.projectionMatrix);
    mat4.multiply(vpm, vpm, this.viewMatrix);
    this.viewProjectionMatrix = vpm;
    var m = (0, _mathUtils.createMat4)();
    mat4.scale(m, m, [this.width / 2, -this.height / 2, 1]);
    mat4.translate(m, m, [1, -1, 0]);
    mat4.multiply(m, m, this.viewProjectionMatrix);
    var mInverse = mat4.invert((0, _mathUtils.createMat4)(), m);

    if (!mInverse) {
      throw new Error('Pixel project matrix not invertible');
    }

    this.pixelProjectionMatrix = m;
    this.pixelUnprojectionMatrix = mInverse;
    this.equals = this.equals.bind(this);
    this.project = this.project.bind(this);
    this.unproject = this.unproject.bind(this);
    this.projectPosition = this.projectPosition.bind(this);
    this.unprojectPosition = this.unprojectPosition.bind(this);
    this.projectFlat = this.projectFlat.bind(this);
    this.unprojectFlat = this.unprojectFlat.bind(this);
  }

  (0, _createClass2["default"])(Viewport, [{
    key: "equals",
    value: function equals(viewport) {
      if (!(viewport instanceof Viewport)) {
        return false;
      }

      return viewport.width === this.width && viewport.height === this.height && mat4.equals(viewport.projectionMatrix, this.projectionMatrix) && mat4.equals(viewport.viewMatrix, this.viewMatrix);
    }
  }, {
    key: "project",
    value: function project(xyz) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$topLeft = _ref2.topLeft,
          topLeft = _ref2$topLeft === void 0 ? true : _ref2$topLeft;

      var worldPosition = this.projectPosition(xyz);
      var coord = (0, _webMercatorUtils.worldToPixels)(worldPosition, this.pixelProjectionMatrix);

      var _coord = (0, _slicedToArray2["default"])(coord, 2),
          x = _coord[0],
          y = _coord[1];

      var y2 = topLeft ? y : this.height - y;
      return xyz.length === 2 ? [x, y2] : [x, y2, coord[2]];
    }
  }, {
    key: "unproject",
    value: function unproject(xyz) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$topLeft = _ref3.topLeft,
          topLeft = _ref3$topLeft === void 0 ? true : _ref3$topLeft,
          targetZ = _ref3.targetZ;

      var _xyz = (0, _slicedToArray2["default"])(xyz, 3),
          x = _xyz[0],
          y = _xyz[1],
          z = _xyz[2];

      var y2 = topLeft ? y : this.height - y;
      var targetZWorld = targetZ && targetZ * this.unitsPerMeter;
      var coord = (0, _webMercatorUtils.pixelsToWorld)([x, y2, z], this.pixelUnprojectionMatrix, targetZWorld);

      var _this$unprojectPositi = this.unprojectPosition(coord),
          _this$unprojectPositi2 = (0, _slicedToArray2["default"])(_this$unprojectPositi, 3),
          X = _this$unprojectPositi2[0],
          Y = _this$unprojectPositi2[1],
          Z = _this$unprojectPositi2[2];

      if (Number.isFinite(z)) {
        return [X, Y, Z];
      }

      return Number.isFinite(targetZ) ? [X, Y, targetZ] : [X, Y];
    }
  }, {
    key: "projectPosition",
    value: function projectPosition(xyz) {
      var _this$projectFlat = this.projectFlat(xyz),
          _this$projectFlat2 = (0, _slicedToArray2["default"])(_this$projectFlat, 2),
          X = _this$projectFlat2[0],
          Y = _this$projectFlat2[1];

      var Z = (xyz[2] || 0) * this.unitsPerMeter;
      return [X, Y, Z];
    }
  }, {
    key: "unprojectPosition",
    value: function unprojectPosition(xyz) {
      var _this$unprojectFlat = this.unprojectFlat(xyz),
          _this$unprojectFlat2 = (0, _slicedToArray2["default"])(_this$unprojectFlat, 2),
          X = _this$unprojectFlat2[0],
          Y = _this$unprojectFlat2[1];

      var Z = (xyz[2] || 0) / this.unitsPerMeter;
      return [X, Y, Z];
    }
  }, {
    key: "projectFlat",
    value: function projectFlat(xyz) {
      var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.scale;
      return xyz;
    }
  }, {
    key: "unprojectFlat",
    value: function unprojectFlat(xyz) {
      var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.scale;
      return xyz;
    }
  }]);
  return Viewport;
}();

exports["default"] = Viewport;
//# sourceMappingURL=viewport.js.map

/***/ }),

/***/ "SjBN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MAPBOX_LIMITS = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _viewportMercatorProject = _interopRequireWildcard(__webpack_require__("r/8N"));

var _transition = __webpack_require__("PwPu");

var _mathUtils = __webpack_require__("sg3N");

var _assert = _interopRequireDefault(__webpack_require__("uEn3"));

var MAPBOX_LIMITS = {
  minZoom: 0,
  maxZoom: 24,
  minPitch: 0,
  maxPitch: 60
};
exports.MAPBOX_LIMITS = MAPBOX_LIMITS;
var DEFAULT_STATE = {
  pitch: 0,
  bearing: 0,
  altitude: 1.5
};

var MapState = function () {
  function MapState(_ref) {
    var width = _ref.width,
        height = _ref.height,
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        zoom = _ref.zoom,
        _ref$bearing = _ref.bearing,
        bearing = _ref$bearing === void 0 ? DEFAULT_STATE.bearing : _ref$bearing,
        _ref$pitch = _ref.pitch,
        pitch = _ref$pitch === void 0 ? DEFAULT_STATE.pitch : _ref$pitch,
        _ref$altitude = _ref.altitude,
        altitude = _ref$altitude === void 0 ? DEFAULT_STATE.altitude : _ref$altitude,
        _ref$maxZoom = _ref.maxZoom,
        maxZoom = _ref$maxZoom === void 0 ? MAPBOX_LIMITS.maxZoom : _ref$maxZoom,
        _ref$minZoom = _ref.minZoom,
        minZoom = _ref$minZoom === void 0 ? MAPBOX_LIMITS.minZoom : _ref$minZoom,
        _ref$maxPitch = _ref.maxPitch,
        maxPitch = _ref$maxPitch === void 0 ? MAPBOX_LIMITS.maxPitch : _ref$maxPitch,
        _ref$minPitch = _ref.minPitch,
        minPitch = _ref$minPitch === void 0 ? MAPBOX_LIMITS.minPitch : _ref$minPitch,
        transitionDuration = _ref.transitionDuration,
        transitionEasing = _ref.transitionEasing,
        transitionInterpolator = _ref.transitionInterpolator,
        transitionInterruption = _ref.transitionInterruption,
        startPanLngLat = _ref.startPanLngLat,
        startZoomLngLat = _ref.startZoomLngLat,
        startBearing = _ref.startBearing,
        startPitch = _ref.startPitch,
        startZoom = _ref.startZoom;
    (0, _classCallCheck2["default"])(this, MapState);
    (0, _defineProperty2["default"])(this, "_viewportProps", void 0);
    (0, _defineProperty2["default"])(this, "_interactiveState", void 0);
    (0, _assert["default"])(Number.isFinite(width), '`width` must be supplied');
    (0, _assert["default"])(Number.isFinite(height), '`height` must be supplied');
    (0, _assert["default"])(Number.isFinite(longitude), '`longitude` must be supplied');
    (0, _assert["default"])(Number.isFinite(latitude), '`latitude` must be supplied');
    (0, _assert["default"])(Number.isFinite(zoom), '`zoom` must be supplied');
    this._viewportProps = this._applyConstraints({
      width: width,
      height: height,
      latitude: latitude,
      longitude: longitude,
      zoom: zoom,
      bearing: bearing,
      pitch: pitch,
      altitude: altitude,
      maxZoom: maxZoom,
      minZoom: minZoom,
      maxPitch: maxPitch,
      minPitch: minPitch,
      transitionDuration: transitionDuration,
      transitionEasing: transitionEasing,
      transitionInterpolator: transitionInterpolator,
      transitionInterruption: transitionInterruption
    });
    this._interactiveState = {
      startPanLngLat: startPanLngLat,
      startZoomLngLat: startZoomLngLat,
      startBearing: startBearing,
      startPitch: startPitch,
      startZoom: startZoom
    };
  }

  (0, _createClass2["default"])(MapState, [{
    key: "getViewportProps",
    value: function getViewportProps() {
      return this._viewportProps;
    }
  }, {
    key: "getInteractiveState",
    value: function getInteractiveState() {
      return this._interactiveState;
    }
  }, {
    key: "panStart",
    value: function panStart(_ref2) {
      var pos = _ref2.pos;
      return this._getUpdatedMapState({
        startPanLngLat: this._unproject(pos)
      });
    }
  }, {
    key: "pan",
    value: function pan(_ref3) {
      var pos = _ref3.pos,
          startPos = _ref3.startPos;

      var startPanLngLat = this._interactiveState.startPanLngLat || this._unproject(startPos);

      if (!startPanLngLat) {
        return this;
      }

      var _this$_calculateNewLn = this._calculateNewLngLat({
        startPanLngLat: startPanLngLat,
        pos: pos
      }),
          _this$_calculateNewLn2 = (0, _slicedToArray2["default"])(_this$_calculateNewLn, 2),
          longitude = _this$_calculateNewLn2[0],
          latitude = _this$_calculateNewLn2[1];

      return this._getUpdatedMapState({
        longitude: longitude,
        latitude: latitude
      });
    }
  }, {
    key: "panEnd",
    value: function panEnd() {
      return this._getUpdatedMapState({
        startPanLngLat: null
      });
    }
  }, {
    key: "rotateStart",
    value: function rotateStart(_ref4) {
      var pos = _ref4.pos;
      return this._getUpdatedMapState({
        startBearing: this._viewportProps.bearing,
        startPitch: this._viewportProps.pitch
      });
    }
  }, {
    key: "rotate",
    value: function rotate(_ref5) {
      var _ref5$deltaScaleX = _ref5.deltaScaleX,
          deltaScaleX = _ref5$deltaScaleX === void 0 ? 0 : _ref5$deltaScaleX,
          _ref5$deltaScaleY = _ref5.deltaScaleY,
          deltaScaleY = _ref5$deltaScaleY === void 0 ? 0 : _ref5$deltaScaleY;
      var _this$_interactiveSta = this._interactiveState,
          startBearing = _this$_interactiveSta.startBearing,
          startPitch = _this$_interactiveSta.startPitch;

      if (!Number.isFinite(startBearing) || !Number.isFinite(startPitch)) {
        return this;
      }

      var _this$_calculateNewPi = this._calculateNewPitchAndBearing({
        deltaScaleX: deltaScaleX,
        deltaScaleY: deltaScaleY,
        startBearing: startBearing || 0,
        startPitch: startPitch || 0
      }),
          pitch = _this$_calculateNewPi.pitch,
          bearing = _this$_calculateNewPi.bearing;

      return this._getUpdatedMapState({
        bearing: bearing,
        pitch: pitch
      });
    }
  }, {
    key: "rotateEnd",
    value: function rotateEnd() {
      return this._getUpdatedMapState({
        startBearing: null,
        startPitch: null
      });
    }
  }, {
    key: "zoomStart",
    value: function zoomStart(_ref6) {
      var pos = _ref6.pos;
      return this._getUpdatedMapState({
        startZoomLngLat: this._unproject(pos),
        startZoom: this._viewportProps.zoom
      });
    }
  }, {
    key: "zoom",
    value: function zoom(_ref7) {
      var pos = _ref7.pos,
          startPos = _ref7.startPos,
          scale = _ref7.scale;
      (0, _assert["default"])(scale > 0, '`scale` must be a positive number');
      var _this$_interactiveSta2 = this._interactiveState,
          startZoom = _this$_interactiveSta2.startZoom,
          startZoomLngLat = _this$_interactiveSta2.startZoomLngLat;

      if (!Number.isFinite(startZoom)) {
        startZoom = this._viewportProps.zoom;
        startZoomLngLat = this._unproject(startPos) || this._unproject(pos);
      }

      (0, _assert["default"])(startZoomLngLat, '`startZoomLngLat` prop is required ' + 'for zoom behavior to calculate where to position the map.');

      var zoom = this._calculateNewZoom({
        scale: scale,
        startZoom: startZoom || 0
      });

      var zoomedViewport = new _viewportMercatorProject["default"](Object.assign({}, this._viewportProps, {
        zoom: zoom
      }));

      var _zoomedViewport$getMa = zoomedViewport.getMapCenterByLngLatPosition({
        lngLat: startZoomLngLat,
        pos: pos
      }),
          _zoomedViewport$getMa2 = (0, _slicedToArray2["default"])(_zoomedViewport$getMa, 2),
          longitude = _zoomedViewport$getMa2[0],
          latitude = _zoomedViewport$getMa2[1];

      return this._getUpdatedMapState({
        zoom: zoom,
        longitude: longitude,
        latitude: latitude
      });
    }
  }, {
    key: "zoomEnd",
    value: function zoomEnd() {
      return this._getUpdatedMapState({
        startZoomLngLat: null,
        startZoom: null
      });
    }
  }, {
    key: "_getUpdatedMapState",
    value: function _getUpdatedMapState(newProps) {
      return new MapState(Object.assign({}, this._viewportProps, this._interactiveState, newProps));
    }
  }, {
    key: "_applyConstraints",
    value: function _applyConstraints(props) {
      var maxZoom = props.maxZoom,
          minZoom = props.minZoom,
          zoom = props.zoom;
      props.zoom = (0, _mathUtils.clamp)(zoom, minZoom, maxZoom);
      var maxPitch = props.maxPitch,
          minPitch = props.minPitch,
          pitch = props.pitch;
      props.pitch = (0, _mathUtils.clamp)(pitch, minPitch, maxPitch);
      Object.assign(props, (0, _viewportMercatorProject.normalizeViewportProps)(props));
      return props;
    }
  }, {
    key: "_unproject",
    value: function _unproject(pos) {
      var viewport = new _viewportMercatorProject["default"](this._viewportProps);
      return pos && viewport.unproject(pos);
    }
  }, {
    key: "_calculateNewLngLat",
    value: function _calculateNewLngLat(_ref8) {
      var startPanLngLat = _ref8.startPanLngLat,
          pos = _ref8.pos;
      var viewport = new _viewportMercatorProject["default"](this._viewportProps);
      return viewport.getMapCenterByLngLatPosition({
        lngLat: startPanLngLat,
        pos: pos
      });
    }
  }, {
    key: "_calculateNewZoom",
    value: function _calculateNewZoom(_ref9) {
      var scale = _ref9.scale,
          startZoom = _ref9.startZoom;
      var _this$_viewportProps = this._viewportProps,
          maxZoom = _this$_viewportProps.maxZoom,
          minZoom = _this$_viewportProps.minZoom;
      var zoom = startZoom + Math.log2(scale);
      return (0, _mathUtils.clamp)(zoom, minZoom, maxZoom);
    }
  }, {
    key: "_calculateNewPitchAndBearing",
    value: function _calculateNewPitchAndBearing(_ref10) {
      var deltaScaleX = _ref10.deltaScaleX,
          deltaScaleY = _ref10.deltaScaleY,
          startBearing = _ref10.startBearing,
          startPitch = _ref10.startPitch;
      deltaScaleY = (0, _mathUtils.clamp)(deltaScaleY, -1, 1);
      var _this$_viewportProps2 = this._viewportProps,
          minPitch = _this$_viewportProps2.minPitch,
          maxPitch = _this$_viewportProps2.maxPitch;
      var bearing = startBearing + 180 * deltaScaleX;
      var pitch = startPitch;

      if (deltaScaleY > 0) {
        pitch = startPitch + deltaScaleY * (maxPitch - startPitch);
      } else if (deltaScaleY < 0) {
        pitch = startPitch - deltaScaleY * (minPitch - startPitch);
      }

      return {
        pitch: pitch,
        bearing: bearing
      };
    }
  }]);
  return MapState;
}();

exports["default"] = MapState;
//# sourceMappingURL=map-state.js.map

/***/ }),

/***/ "TCcG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _assert = _interopRequireDefault(__webpack_require__("uEn3"));

var _transitionInterpolator = _interopRequireDefault(__webpack_require__("uTCq"));

var _viewportMercatorProject = __webpack_require__("r/8N");

var _transitionUtils = __webpack_require__("eA6b");

var _mathUtils = __webpack_require__("sg3N");

var VIEWPORT_TRANSITION_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];
var REQUIRED_PROPS = ['latitude', 'longitude', 'zoom', 'width', 'height'];
var LINEARLY_INTERPOLATED_PROPS = ['bearing', 'pitch'];
var DEFAULT_OPTS = {
  speed: 1.2,
  curve: 1.414
};

var ViewportFlyToInterpolator = function (_TransitionInterpolat) {
  (0, _inherits2["default"])(ViewportFlyToInterpolator, _TransitionInterpolat);

  function ViewportFlyToInterpolator() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, ViewportFlyToInterpolator);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ViewportFlyToInterpolator).call(this));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "speed", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "propNames", VIEWPORT_TRANSITION_PROPS);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "props", void 0);
    _this.props = Object.assign({}, DEFAULT_OPTS, props);
    return _this;
  }

  (0, _createClass2["default"])(ViewportFlyToInterpolator, [{
    key: "initializeProps",
    value: function initializeProps(startProps, endProps) {
      var startViewportProps = {};
      var endViewportProps = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = REQUIRED_PROPS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;
          var startValue = startProps[key];
          var endValue = endProps[key];
          (0, _assert["default"])((0, _transitionUtils.isValid)(startValue) && (0, _transitionUtils.isValid)(endValue), "".concat(key, " must be supplied for transition"));
          startViewportProps[key] = startValue;
          endViewportProps[key] = (0, _transitionUtils.getEndValueByShortestPath)(key, startValue, endValue);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = LINEARLY_INTERPOLATED_PROPS[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _key = _step2.value;

          var _startValue = startProps[_key] || 0;

          var _endValue = endProps[_key] || 0;

          startViewportProps[_key] = _startValue;
          endViewportProps[_key] = (0, _transitionUtils.getEndValueByShortestPath)(_key, _startValue, _endValue);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return {
        start: startViewportProps,
        end: endViewportProps
      };
    }
  }, {
    key: "interpolateProps",
    value: function interpolateProps(startProps, endProps, t) {
      var viewport = (0, _viewportMercatorProject.flyToViewport)(startProps, endProps, t, this.props);
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = LINEARLY_INTERPOLATED_PROPS[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var key = _step3.value;
          viewport[key] = (0, _mathUtils.lerp)(startProps[key], endProps[key], t);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return viewport;
    }
  }, {
    key: "getDuration",
    value: function getDuration(startProps, endProps) {
      var transitionDuration = endProps.transitionDuration;

      if (transitionDuration === 'auto') {
        transitionDuration = (0, _viewportMercatorProject.getFlyToDuration)(startProps, endProps, this.props);
      }

      return transitionDuration;
    }
  }]);
  return ViewportFlyToInterpolator;
}(_transitionInterpolator["default"]);

exports["default"] = ViewportFlyToInterpolator;
//# sourceMappingURL=viewport-fly-to-interpolator.js.map

/***/ }),

/***/ "V+JD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "VNOJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = __webpack_require__("gmCQ");

var _default = (0, _react.createContext)({
  viewport: null,
  map: null,
  mapContainer: null,
  onViewportChange: null,
  onViewStateChange: null,
  eventManager: null,
  isDragging: false
});

exports["default"] = _default;
//# sourceMappingURL=map-context.js.map

/***/ }),

/***/ "VlTr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.document = exports.global = exports.window = void 0;
var window_ = typeof window !== 'undefined' ? window : global;
exports.window = window_;
var global_ = typeof global !== 'undefined' ? global : window;
exports.global = global_;
var document_ = typeof document !== 'undefined' ? document : {};
exports.document = document_;
//# sourceMappingURL=globals.js.map

/***/ }),

/***/ "VrCi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMatrixArrayType = setMatrixArrayType;
exports.toRadian = toRadian;
exports.equals = equals;
exports.RANDOM = exports.ARRAY_TYPE = exports.EPSILON = void 0;

/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
exports.EPSILON = EPSILON;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
exports.ARRAY_TYPE = ARRAY_TYPE;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */

exports.RANDOM = RANDOM;

function setMatrixArrayType(type) {
  exports.ARRAY_TYPE = ARRAY_TYPE = type;
}

var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */


function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}

if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/***/ }),

/***/ "WFcy":
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "WVW/":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "Wuc6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("fAZL"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  redraw: _propTypes["default"].func.isRequired,
  style: _propTypes["default"].object
});
var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var HTMLOverlay = function (_BaseControl) {
  (0, _inherits2["default"])(HTMLOverlay, _BaseControl);

  function HTMLOverlay() {
    (0, _classCallCheck2["default"])(this, HTMLOverlay);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HTMLOverlay).apply(this, arguments));
  }

  (0, _createClass2["default"])(HTMLOverlay, [{
    key: "_render",
    value: function _render() {
      var _this$_context = this._context,
          viewport = _this$_context.viewport,
          isDragging = _this$_context.isDragging;
      var style = Object.assign({
        position: 'absolute',
        left: 0,
        top: 0,
        width: viewport.width,
        height: viewport.height
      }, this.props.style);
      return React.createElement("div", {
        ref: this._containerRef,
        style: style
      }, this.props.redraw({
        width: viewport.width,
        height: viewport.height,
        isDragging: isDragging,
        project: viewport.project.bind(viewport),
        unproject: viewport.unproject.bind(viewport)
      }));
    }
  }]);
  return HTMLOverlay;
}(_baseControl["default"]);

exports["default"] = HTMLOverlay;
(0, _defineProperty2["default"])(HTMLOverlay, "propTypes", propTypes);
(0, _defineProperty2["default"])(HTMLOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=html-overlay.js.map

/***/ }),

/***/ "X7j5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkVisibilityConstraints = checkVisibilityConstraints;

var _mapState = __webpack_require__("SjBN");

function decapitalize(s) {
  return s[0].toLowerCase() + s.slice(1);
}

function checkVisibilityConstraints(props) {
  var constraints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _mapState.MAPBOX_LIMITS;

  for (var constraintName in constraints) {
    var type = constraintName.slice(0, 3);
    var propName = decapitalize(constraintName.slice(3));

    if (type === 'min' && props[propName] < constraints[constraintName]) {
      return false;
    }

    if (type === 'max' && props[propName] > constraints[constraintName]) {
      return false;
    }
  }

  return true;
}
//# sourceMappingURL=map-constraints.js.map

/***/ }),

/***/ "XJI7":
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "YF+h":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mapboxgl = _interopRequireDefault(__webpack_require__("LKQx"));

var setRTLTextPlugin = _mapboxgl["default"] ? _mapboxgl["default"].setRTLTextPlugin : function () {};
var _default = setRTLTextPlugin;
exports["default"] = _default;
//# sourceMappingURL=set-rtl-text-plugin.js.map

/***/ }),

/***/ "Z5ky":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGeolocationSupported = isGeolocationSupported;
var supported;

function isGeolocationSupported() {
  if (supported !== undefined) {
    return Promise.resolve(supported);
  }

  if (window.navigator.permissions !== undefined) {
    return window.navigator.permissions.query({
      name: 'geolocation'
    }).then(function (p) {
      supported = p.state !== 'denied';
      return supported;
    });
  }

  supported = Boolean(window.navigator.geolocation);
  return Promise.resolve(supported);
}
//# sourceMappingURL=geolocate-utils.js.map

/***/ }),

/***/ "ZIYu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Manager = void 0;

function HammerManagerMock(m) {
  var instance = {};

  var chainedNoop = function chainedNoop() {
    return instance;
  };

  instance.get = function () {
    return null;
  };

  instance.set = chainedNoop;
  instance.on = chainedNoop;
  instance.off = chainedNoop;
  instance.destroy = chainedNoop;
  instance.emit = chainedNoop;
  return instance;
}

var Manager = HammerManagerMock;
exports.Manager = Manager;
var _default = null;
exports["default"] = _default;
//# sourceMappingURL=hammer.js.map

/***/ }),

/***/ "aeV+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var _globals = __webpack_require__("VlTr");

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  redraw: _propTypes["default"].func.isRequired
});
var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var CanvasOverlay = function (_BaseControl) {
  (0, _inherits2["default"])(CanvasOverlay, _BaseControl);

  function CanvasOverlay() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, CanvasOverlay);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(CanvasOverlay)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_canvas", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_ctx", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_redraw", function () {
      var ctx = _this._ctx;

      if (!ctx) {
        return;
      }

      var pixelRatio = _globals.window.devicePixelRatio || 1;
      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);
      var _this$_context = _this._context,
          viewport = _this$_context.viewport,
          isDragging = _this$_context.isDragging;

      _this.props.redraw({
        width: viewport.width,
        height: viewport.height,
        ctx: ctx,
        isDragging: isDragging,
        project: viewport.project.bind(viewport),
        unproject: viewport.unproject.bind(viewport)
      });

      ctx.restore();
    });
    return _this;
  }

  (0, _createClass2["default"])(CanvasOverlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var canvas = this._containerRef.current;

      if (canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
      }

      this._redraw();
    }
  }, {
    key: "_render",
    value: function _render() {
      var pixelRatio = _globals.window.devicePixelRatio || 1;
      var _this$_context$viewpo = this._context.viewport,
          width = _this$_context$viewpo.width,
          height = _this$_context$viewpo.height;

      this._redraw();

      return React.createElement("canvas", {
        ref: this._containerRef,
        width: width * pixelRatio,
        height: height * pixelRatio,
        style: {
          width: "".concat(width, "px"),
          height: "".concat(height, "px"),
          position: 'absolute',
          left: 0,
          top: 0
        }
      });
    }
  }]);
  return CanvasOverlay;
}(_baseControl["default"]);

exports["default"] = CanvasOverlay;
(0, _defineProperty2["default"])(CanvasOverlay, "propTypes", propTypes);
(0, _defineProperty2["default"])(CanvasOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=canvas-overlay.js.map

/***/ }),

/***/ "dmgn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("fAZL"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  redraw: _propTypes["default"].func.isRequired,
  style: _propTypes["default"].object
});
var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var SVGOverlay = function (_BaseControl) {
  (0, _inherits2["default"])(SVGOverlay, _BaseControl);

  function SVGOverlay() {
    (0, _classCallCheck2["default"])(this, SVGOverlay);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SVGOverlay).apply(this, arguments));
  }

  (0, _createClass2["default"])(SVGOverlay, [{
    key: "_render",
    value: function _render() {
      var _this$_context = this._context,
          viewport = _this$_context.viewport,
          isDragging = _this$_context.isDragging;
      var style = Object.assign({
        position: 'absolute',
        left: 0,
        top: 0
      }, this.props.style);
      return React.createElement("svg", {
        width: viewport.width,
        height: viewport.height,
        ref: this._containerRef,
        style: style
      }, this.props.redraw({
        width: viewport.width,
        height: viewport.height,
        isDragging: isDragging,
        project: viewport.project.bind(viewport),
        unproject: viewport.unproject.bind(viewport)
      }));
    }
  }]);
  return SVGOverlay;
}(_baseControl["default"]);

exports["default"] = SVGOverlay;
(0, _defineProperty2["default"])(SVGOverlay, "propTypes", propTypes);
(0, _defineProperty2["default"])(SVGOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=svg-overlay.js.map

/***/ }),

/***/ "eA6b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mod = mod;
exports.isValid = isValid;
exports.getEndValueByShortestPath = getEndValueByShortestPath;
var WRAPPED_ANGULAR_PROPS = {
  longitude: 1,
  bearing: 1
};

function mod(value, divisor) {
  var modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
}

function isValid(prop) {
  return Number.isFinite(prop) || Array.isArray(prop);
}

function isWrappedAngularProp(propName) {
  return propName in WRAPPED_ANGULAR_PROPS;
}

function getEndValueByShortestPath(propName, startValue, endValue) {
  if (isWrappedAngularProp(propName) && Math.abs(endValue - startValue) > 180) {
    endValue = endValue < 0 ? endValue + 360 : endValue - 360;
  }

  return endValue;
}
//# sourceMappingURL=transition-utils.js.map

/***/ }),

/***/ "eLnH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareVersions = compareVersions;

function compareVersions(version1, version2) {
  var v1 = (version1 || '').split('.').map(Number);
  var v2 = (version2 || '').split('.').map(Number);

  for (var i = 0; i < 3; i++) {
    var part1 = v1[i] || 0;
    var part2 = v2[i] || 0;

    if (part1 < part2) {
      return -1;
    }

    if (part1 > part2) {
      return 1;
    }
  }

  return 0;
}
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "egBX":
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__("XJI7");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;

/***/ }),

/***/ "fAZL":
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "i6L4":
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "i8dk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = checkDeprecatedProps;
var DEPRECATED_PROPS = [{
  old: 'onChangeViewport',
  "new": 'onViewportChange'
}, {
  old: 'perspectiveEnabled',
  "new": 'dragRotate'
}, {
  old: 'onHoverFeatures',
  "new": 'onHover'
}, {
  old: 'onClickFeatures',
  "new": 'onClick'
}, {
  old: 'touchZoomRotate',
  "new": 'touchZoom, touchRotate'
}, {
  old: 'mapControls',
  "new": 'controller'
}];

function getDeprecatedText(name) {
  return "react-map-gl: `".concat(name, "` is removed.");
}

function getNewText(name) {
  return "Use `".concat(name, "` instead.");
}

function checkDeprecatedProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  DEPRECATED_PROPS.forEach(function (depProp) {
    if (props.hasOwnProperty(depProp.old)) {
      var warnMessage = getDeprecatedText(depProp.old);

      if (depProp["new"]) {
        warnMessage = "".concat(warnMessage, " ").concat(getNewText(depProp["new"]));
      }

      console.warn(warnMessage);
    }
  });
}
//# sourceMappingURL=deprecate-warn.js.map

/***/ }),

/***/ "irS1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _globals = __webpack_require__("VlTr");

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _mapboxgl = _interopRequireDefault(__webpack_require__("LKQx"));

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  className: _propTypes["default"].string,
  container: _propTypes["default"].object
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  className: '',
  container: null
});

var FullscreenControl = function (_BaseControl) {
  (0, _inherits2["default"])(FullscreenControl, _BaseControl);

  function FullscreenControl() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, FullscreenControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(FullscreenControl)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      isFullscreen: false,
      showButton: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxFullscreenControl", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onFullscreenChange", function () {
      var nextState = !_this._mapboxFullscreenControl._fullscreen;
      _this._mapboxFullscreenControl._fullscreen = nextState;

      _this.setState({
        isFullscreen: nextState
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClickFullscreen", function () {
      _this._mapboxFullscreenControl._onClickFullscreen();
    });
    return _this;
  }

  (0, _createClass2["default"])(FullscreenControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var container = this.props.container || this._context.mapContainer;
      this._mapboxFullscreenControl = new _mapboxgl["default"].FullscreenControl({
        container: container
      });
      this.setState({
        showButton: this._mapboxFullscreenControl._checkFullscreenSupport()
      });

      _globals.document.addEventListener(this._mapboxFullscreenControl._fullscreenchange, this._onFullscreenChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _globals.document.removeEventListener(this._mapboxFullscreenControl._fullscreenchange, this._onFullscreenChange);
    }
  }, {
    key: "_renderButton",
    value: function _renderButton(type, label, callback) {
      return React.createElement("button", {
        key: type,
        className: "mapboxgl-ctrl-icon mapboxgl-ctrl-".concat(type),
        type: "button",
        title: label,
        onClick: callback
      }, React.createElement("span", {
        className: "mapboxgl-ctrl-icon",
        "aria-hidden": "true"
      }));
    }
  }, {
    key: "_render",
    value: function _render() {
      if (!this.state.showButton) {
        return null;
      }

      var className = this.props.className;
      var isFullscreen = this.state.isFullscreen;
      var type = isFullscreen ? 'shrink' : 'fullscreen';
      return React.createElement("div", {
        className: "mapboxgl-ctrl mapboxgl-ctrl-group ".concat(className),
        ref: this._containerRef
      }, this._renderButton(type, 'Toggle fullscreen', this._onClickFullscreen));
    }
  }]);
  return FullscreenControl;
}(_baseControl["default"]);

exports["default"] = FullscreenControl;
(0, _defineProperty2["default"])(FullscreenControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(FullscreenControl, "defaultProps", defaultProps);
//# sourceMappingURL=fullscreen-control.js.map

/***/ }),

/***/ "ixny":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zoomToScale = zoomToScale;
exports.scaleToZoom = scaleToZoom;
exports.lngLatToWorld = lngLatToWorld;
exports.worldToLngLat = worldToLngLat;
exports.getMeterZoom = getMeterZoom;
exports.getDistanceScales = getDistanceScales;
exports.addMetersToLngLat = addMetersToLngLat;
exports.getViewMatrix = getViewMatrix;
exports.getProjectionParameters = getProjectionParameters;
exports.getProjectionMatrix = getProjectionMatrix;
exports.worldToPixels = worldToPixels;
exports.pixelsToWorld = pixelsToWorld;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _mathUtils = __webpack_require__("p58Y");

var mat4 = _interopRequireWildcard(__webpack_require__("qWEl"));

var vec2 = _interopRequireWildcard(__webpack_require__("HMxd"));

var vec3 = _interopRequireWildcard(__webpack_require__("8q48"));

var _assert = _interopRequireDefault(__webpack_require__("5Mot"));

var PI = Math.PI;
var PI_4 = PI / 4;
var DEGREES_TO_RADIANS = PI / 180;
var RADIANS_TO_DEGREES = 180 / PI;
var TILE_SIZE = 512;
var EARTH_CIRCUMFERENCE = 40.03e6;
var DEFAULT_ALTITUDE = 1.5;

function zoomToScale(zoom) {
  return Math.pow(2, zoom);
}

function scaleToZoom(scale) {
  return Math.log2(scale);
}

function lngLatToWorld(_ref) {
  var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      lng = _ref2[0],
      lat = _ref2[1];

  (0, _assert["default"])(Number.isFinite(lng));
  (0, _assert["default"])(Number.isFinite(lat) && lat >= -90 && lat <= 90, 'invalid latitude');
  var lambda2 = lng * DEGREES_TO_RADIANS;
  var phi2 = lat * DEGREES_TO_RADIANS;
  var x = TILE_SIZE * (lambda2 + PI) / (2 * PI);
  var y = TILE_SIZE * (PI + Math.log(Math.tan(PI_4 + phi2 * 0.5))) / (2 * PI);
  return [x, y];
}

function worldToLngLat(_ref3) {
  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
      x = _ref4[0],
      y = _ref4[1];

  var lambda2 = x / TILE_SIZE * (2 * PI) - PI;
  var phi2 = 2 * (Math.atan(Math.exp(y / TILE_SIZE * (2 * PI) - PI)) - PI_4);
  return [lambda2 * RADIANS_TO_DEGREES, phi2 * RADIANS_TO_DEGREES];
}

function getMeterZoom(_ref5) {
  var latitude = _ref5.latitude;
  (0, _assert["default"])(Number.isFinite(latitude));
  var latCosine = Math.cos(latitude * DEGREES_TO_RADIANS);
  return scaleToZoom(EARTH_CIRCUMFERENCE * latCosine) - 9;
}

function getDistanceScales(_ref6) {
  var latitude = _ref6.latitude,
      longitude = _ref6.longitude,
      _ref6$highPrecision = _ref6.highPrecision,
      highPrecision = _ref6$highPrecision === void 0 ? false : _ref6$highPrecision;
  (0, _assert["default"])(Number.isFinite(latitude) && Number.isFinite(longitude));
  var result = {};
  var worldSize = TILE_SIZE;
  var latCosine = Math.cos(latitude * DEGREES_TO_RADIANS);
  var unitsPerDegreeX = worldSize / 360;
  var unitsPerDegreeY = unitsPerDegreeX / latCosine;
  var altUnitsPerMeter = worldSize / EARTH_CIRCUMFERENCE / latCosine;
  result.unitsPerMeter = [altUnitsPerMeter, altUnitsPerMeter, altUnitsPerMeter];
  result.metersPerUnit = [1 / altUnitsPerMeter, 1 / altUnitsPerMeter, 1 / altUnitsPerMeter];
  result.unitsPerDegree = [unitsPerDegreeX, unitsPerDegreeY, altUnitsPerMeter];
  result.degreesPerUnit = [1 / unitsPerDegreeX, 1 / unitsPerDegreeY, 1 / altUnitsPerMeter];

  if (highPrecision) {
    var latCosine2 = DEGREES_TO_RADIANS * Math.tan(latitude * DEGREES_TO_RADIANS) / latCosine;
    var unitsPerDegreeY2 = unitsPerDegreeX * latCosine2 / 2;
    var altUnitsPerDegree2 = worldSize / EARTH_CIRCUMFERENCE * latCosine2;
    var altUnitsPerMeter2 = altUnitsPerDegree2 / unitsPerDegreeY * altUnitsPerMeter;
    result.unitsPerDegree2 = [0, unitsPerDegreeY2, altUnitsPerDegree2];
    result.unitsPerMeter2 = [altUnitsPerMeter2, 0, altUnitsPerMeter2];
  }

  return result;
}

function addMetersToLngLat(lngLatZ, xyz) {
  var _lngLatZ = (0, _slicedToArray2["default"])(lngLatZ, 3),
      longitude = _lngLatZ[0],
      latitude = _lngLatZ[1],
      z0 = _lngLatZ[2];

  var _xyz = (0, _slicedToArray2["default"])(xyz, 3),
      x = _xyz[0],
      y = _xyz[1],
      z = _xyz[2];

  var _getDistanceScales = getDistanceScales({
    longitude: longitude,
    latitude: latitude,
    highPrecision: true
  }),
      unitsPerMeter = _getDistanceScales.unitsPerMeter,
      unitsPerMeter2 = _getDistanceScales.unitsPerMeter2;

  var worldspace = lngLatToWorld(lngLatZ);
  worldspace[0] += x * (unitsPerMeter[0] + unitsPerMeter2[0] * y);
  worldspace[1] += y * (unitsPerMeter[1] + unitsPerMeter2[1] * y);
  var newLngLat = worldToLngLat(worldspace);
  var newZ = (z0 || 0) + (z || 0);
  return Number.isFinite(z0) || Number.isFinite(z) ? [newLngLat[0], newLngLat[1], newZ] : newLngLat;
}

function getViewMatrix(_ref7) {
  var height = _ref7.height,
      pitch = _ref7.pitch,
      bearing = _ref7.bearing,
      altitude = _ref7.altitude,
      scale = _ref7.scale,
      _ref7$center = _ref7.center,
      center = _ref7$center === void 0 ? null : _ref7$center;
  var vm = (0, _mathUtils.createMat4)();
  mat4.translate(vm, vm, [0, 0, -altitude]);
  mat4.rotateX(vm, vm, -pitch * DEGREES_TO_RADIANS);
  mat4.rotateZ(vm, vm, bearing * DEGREES_TO_RADIANS);
  scale /= height;
  mat4.scale(vm, vm, [scale, scale, scale]);

  if (center) {
    mat4.translate(vm, vm, vec3.negate([], center));
  }

  return vm;
}

function getProjectionParameters(_ref8) {
  var width = _ref8.width,
      height = _ref8.height,
      _ref8$altitude = _ref8.altitude,
      altitude = _ref8$altitude === void 0 ? DEFAULT_ALTITUDE : _ref8$altitude,
      _ref8$pitch = _ref8.pitch,
      pitch = _ref8$pitch === void 0 ? 0 : _ref8$pitch,
      _ref8$nearZMultiplier = _ref8.nearZMultiplier,
      nearZMultiplier = _ref8$nearZMultiplier === void 0 ? 1 : _ref8$nearZMultiplier,
      _ref8$farZMultiplier = _ref8.farZMultiplier,
      farZMultiplier = _ref8$farZMultiplier === void 0 ? 1 : _ref8$farZMultiplier;
  var pitchRadians = pitch * DEGREES_TO_RADIANS;
  var halfFov = Math.atan(0.5 / altitude);
  var topHalfSurfaceDistance = Math.sin(halfFov) * altitude / Math.sin(Math.PI / 2 - pitchRadians - halfFov);
  var farZ = Math.cos(Math.PI / 2 - pitchRadians) * topHalfSurfaceDistance + altitude;
  return {
    fov: 2 * halfFov,
    aspect: width / height,
    focalDistance: altitude,
    near: nearZMultiplier,
    far: farZ * farZMultiplier
  };
}

function getProjectionMatrix(_ref9) {
  var width = _ref9.width,
      height = _ref9.height,
      pitch = _ref9.pitch,
      altitude = _ref9.altitude,
      nearZMultiplier = _ref9.nearZMultiplier,
      farZMultiplier = _ref9.farZMultiplier;

  var _getProjectionParamet = getProjectionParameters({
    width: width,
    height: height,
    altitude: altitude,
    pitch: pitch,
    nearZMultiplier: nearZMultiplier,
    farZMultiplier: farZMultiplier
  }),
      fov = _getProjectionParamet.fov,
      aspect = _getProjectionParamet.aspect,
      near = _getProjectionParamet.near,
      far = _getProjectionParamet.far;

  var projectionMatrix = mat4.perspective([], fov, aspect, near, far);
  return projectionMatrix;
}

function worldToPixels(xyz, pixelProjectionMatrix) {
  var _xyz2 = (0, _slicedToArray2["default"])(xyz, 3),
      x = _xyz2[0],
      y = _xyz2[1],
      _xyz2$ = _xyz2[2],
      z = _xyz2$ === void 0 ? 0 : _xyz2$;

  (0, _assert["default"])(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z));
  return (0, _mathUtils.transformVector)(pixelProjectionMatrix, [x, y, z, 1]);
}

function pixelsToWorld(xyz, pixelUnprojectionMatrix) {
  var targetZ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var _xyz3 = (0, _slicedToArray2["default"])(xyz, 3),
      x = _xyz3[0],
      y = _xyz3[1],
      z = _xyz3[2];

  (0, _assert["default"])(Number.isFinite(x) && Number.isFinite(y), 'invalid pixel coordinate');

  if (Number.isFinite(z)) {
    var coord = (0, _mathUtils.transformVector)(pixelUnprojectionMatrix, [x, y, z, 1]);
    return coord;
  }

  var coord0 = (0, _mathUtils.transformVector)(pixelUnprojectionMatrix, [x, y, 0, 1]);
  var coord1 = (0, _mathUtils.transformVector)(pixelUnprojectionMatrix, [x, y, 1, 1]);
  var z0 = coord0[2];
  var z1 = coord1[2];
  var t = z0 === z1 ? 0 : ((targetZ || 0) - z0) / (z1 - z0);
  return vec2.lerp([], coord0, coord1, t);
}
//# sourceMappingURL=web-mercator-utils.js.map

/***/ }),

/***/ "jAXA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whichButtons = whichButtons;
exports.getOffsetPosition = getOffsetPosition;
var DOWN_EVENT = 1;
var MOVE_EVENT = 2;
var UP_EVENT = 4;
var MOUSE_EVENTS = {
  pointerdown: DOWN_EVENT,
  pointermove: MOVE_EVENT,
  pointerup: UP_EVENT,
  mousedown: DOWN_EVENT,
  mousemove: MOVE_EVENT,
  mouseup: UP_EVENT
};
var MOUSE_EVENT_WHICH_LEFT = 1;
var MOUSE_EVENT_WHICH_MIDDLE = 2;
var MOUSE_EVENT_WHICH_RIGHT = 3;
var MOUSE_EVENT_BUTTON_LEFT = 0;
var MOUSE_EVENT_BUTTON_MIDDLE = 1;
var MOUSE_EVENT_BUTTON_RIGHT = 2;
var MOUSE_EVENT_BUTTONS_LEFT_MASK = 1;
var MOUSE_EVENT_BUTTONS_RIGHT_MASK = 2;
var MOUSE_EVENT_BUTTONS_MIDDLE_MASK = 4;

function whichButtons(event) {
  var eventType = MOUSE_EVENTS[event.srcEvent.type];

  if (!eventType) {
    return null;
  }

  var _event$srcEvent = event.srcEvent,
      buttons = _event$srcEvent.buttons,
      button = _event$srcEvent.button,
      which = _event$srcEvent.which;
  var leftButton = false;
  var middleButton = false;
  var rightButton = false;

  if (eventType === UP_EVENT || eventType === MOVE_EVENT && !Number.isFinite(buttons)) {
    leftButton = which === MOUSE_EVENT_WHICH_LEFT;
    middleButton = which === MOUSE_EVENT_WHICH_MIDDLE;
    rightButton = which === MOUSE_EVENT_WHICH_RIGHT;
  } else if (eventType === MOVE_EVENT) {
    leftButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_LEFT_MASK);
    middleButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_MIDDLE_MASK);
    rightButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_RIGHT_MASK);
  } else if (eventType === DOWN_EVENT) {
    leftButton = button === MOUSE_EVENT_BUTTON_LEFT;
    middleButton = button === MOUSE_EVENT_BUTTON_MIDDLE;
    rightButton = button === MOUSE_EVENT_BUTTON_RIGHT;
  }

  return {
    leftButton: leftButton,
    middleButton: middleButton,
    rightButton: rightButton
  };
}

function getOffsetPosition(event, rootElement) {
  var srcEvent = event.srcEvent;

  if (!event.center && !Number.isFinite(srcEvent.clientX)) {
    return null;
  }

  var center = event.center || {
    x: srcEvent.clientX,
    y: srcEvent.clientY
  };
  var rect = rootElement.getBoundingClientRect();
  var scaleX = rect.width / rootElement.offsetWidth;
  var scaleY = rect.height / rootElement.offsetHeight;
  var offsetCenter = {
    x: (center.x - rect.left - rootElement.clientLeft) / scaleX,
    y: (center.y - rect.top - rootElement.clientTop) / scaleY
  };
  return {
    center: center,
    offsetCenter: offsetCenter
  };
}
//# sourceMappingURL=event-utils.js.map

/***/ }),

/***/ "jJdG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fitBounds;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _webMercatorViewport = _interopRequireDefault(__webpack_require__("Ku1M"));

var _assert = _interopRequireDefault(__webpack_require__("5Mot"));

function fitBounds(_ref) {
  var width = _ref.width,
      height = _ref.height,
      bounds = _ref.bounds,
      _ref$minExtent = _ref.minExtent,
      minExtent = _ref$minExtent === void 0 ? 0 : _ref$minExtent,
      _ref$maxZoom = _ref.maxZoom,
      maxZoom = _ref$maxZoom === void 0 ? 24 : _ref$maxZoom,
      _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? 0 : _ref$padding,
      _ref$offset = _ref.offset,
      offset = _ref$offset === void 0 ? [0, 0] : _ref$offset;

  var _bounds = (0, _slicedToArray2["default"])(bounds, 2),
      _bounds$ = (0, _slicedToArray2["default"])(_bounds[0], 2),
      west = _bounds$[0],
      south = _bounds$[1],
      _bounds$2 = (0, _slicedToArray2["default"])(_bounds[1], 2),
      east = _bounds$2[0],
      north = _bounds$2[1];

  if (Number.isFinite(padding)) {
    var p = padding;
    padding = {
      top: p,
      bottom: p,
      left: p,
      right: p
    };
  } else {
    (0, _assert["default"])(Number.isFinite(padding.top) && Number.isFinite(padding.bottom) && Number.isFinite(padding.left) && Number.isFinite(padding.right));
  }

  var viewport = new _webMercatorViewport["default"]({
    width: width,
    height: height,
    longitude: 0,
    latitude: 0,
    zoom: 0
  });
  var nw = viewport.project([west, north]);
  var se = viewport.project([east, south]);
  var size = [Math.max(Math.abs(se[0] - nw[0]), minExtent), Math.max(Math.abs(se[1] - nw[1]), minExtent)];
  var targetSize = [width - padding.left - padding.right - Math.abs(offset[0]) * 2, height - padding.top - padding.bottom - Math.abs(offset[1]) * 2];
  (0, _assert["default"])(targetSize[0] > 0 && targetSize[1] > 0);
  var scaleX = targetSize[0] / size[0];
  var scaleY = targetSize[1] / size[1];
  var offsetX = (padding.right - padding.left) / 2 / scaleX;
  var offsetY = (padding.bottom - padding.top) / 2 / scaleY;
  var center = [(se[0] + nw[0]) / 2 + offsetX, (se[1] + nw[1]) / 2 + offsetY];
  var centerLngLat = viewport.unproject(center);
  var zoom = Math.min(maxZoom, viewport.zoom + Math.log2(Math.abs(Math.min(scaleX, scaleY))));
  (0, _assert["default"])(Number.isFinite(zoom));
  return {
    longitude: centerLngLat[0],
    latitude: centerLngLat[1],
    zoom: zoom
  };
}
//# sourceMappingURL=fit-bounds.js.map

/***/ }),

/***/ "lRTT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__("fAZL"));

var _get2 = _interopRequireDefault(__webpack_require__("NWOx"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  draggable: _propTypes["default"].bool,
  onDrag: _propTypes["default"].func,
  onDragEnd: _propTypes["default"].func,
  onDragStart: _propTypes["default"].func,
  offsetLeft: _propTypes["default"].number,
  offsetTop: _propTypes["default"].number
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  draggable: false,
  offsetLeft: 0,
  offsetTop: 0
});

var DraggableControl = function (_BaseControl) {
  (0, _inherits2["default"])(DraggableControl, _BaseControl);

  function DraggableControl() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, DraggableControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(DraggableControl)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      dragPos: null,
      dragOffset: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_dragEvents", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragStart", function (event) {
      var _this$props = _this.props,
          draggable = _this$props.draggable,
          captureDrag = _this$props.captureDrag;

      if (draggable || captureDrag) {
        event.stopPropagation();
      }

      if (!draggable) {
        return;
      }

      var dragPos = _this._getDragEventPosition(event);

      var dragOffset = _this._getDragEventOffset(event);

      _this.setState({
        dragPos: dragPos,
        dragOffset: dragOffset
      });

      _this._setupDragEvents();

      var onDragStart = _this.props.onDragStart;

      if (onDragStart && dragOffset) {
        var callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = _this._getDragLngLat(dragPos, dragOffset);
        onDragStart(callbackEvent);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDrag", function (event) {
      event.stopPropagation();

      var dragPos = _this._getDragEventPosition(event);

      _this.setState({
        dragPos: dragPos
      });

      var onDrag = _this.props.onDrag;
      var dragOffset = _this.state.dragOffset;

      if (onDrag && dragOffset) {
        var callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = _this._getDragLngLat(dragPos, dragOffset);
        onDrag(callbackEvent);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragEnd", function (event) {
      var _this$state = _this.state,
          dragPos = _this$state.dragPos,
          dragOffset = _this$state.dragOffset;
      event.stopPropagation();

      _this.setState({
        dragPos: null,
        dragOffset: null
      });

      _this._removeDragEvents();

      var onDragEnd = _this.props.onDragEnd;

      if (onDragEnd && dragPos && dragOffset) {
        var callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = _this._getDragLngLat(dragPos, dragOffset);
        onDragEnd(callbackEvent);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onDragCancel", function (event) {
      event.stopPropagation();

      _this.setState({
        dragPos: null,
        dragOffset: null
      });

      _this._removeDragEvents();
    });
    return _this;
  }

  (0, _createClass2["default"])(DraggableControl, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2["default"])((0, _getPrototypeOf3["default"])(DraggableControl.prototype), "componentWillUnmount", this).call(this);

      this._removeDragEvents();
    }
  }, {
    key: "_setupDragEvents",
    value: function _setupDragEvents() {
      var eventManager = this._context.eventManager;

      if (!eventManager) {
        return;
      }

      this._dragEvents = {
        panmove: this._onDrag,
        panend: this._onDragEnd,
        pancancel: this._onDragCancel
      };
      eventManager.on(this._dragEvents);
    }
  }, {
    key: "_removeDragEvents",
    value: function _removeDragEvents() {
      var eventManager = this._context.eventManager;

      if (!eventManager || !this._dragEvents) {
        return;
      }

      eventManager.off(this._dragEvents);
      this._dragEvents = null;
    }
  }, {
    key: "_getDragEventPosition",
    value: function _getDragEventPosition(event) {
      var _event$offsetCenter = event.offsetCenter,
          x = _event$offsetCenter.x,
          y = _event$offsetCenter.y;
      return [x, y];
    }
  }, {
    key: "_getDragEventOffset",
    value: function _getDragEventOffset(event) {
      var _event$center = event.center,
          x = _event$center.x,
          y = _event$center.y;
      var container = this._containerRef.current;

      if (container) {
        var rect = container.getBoundingClientRect();
        return [rect.left - x, rect.top - y];
      }

      return null;
    }
  }, {
    key: "_getDraggedPosition",
    value: function _getDraggedPosition(dragPos, dragOffset) {
      return [dragPos[0] + dragOffset[0], dragPos[1] + dragOffset[1]];
    }
  }, {
    key: "_getDragLngLat",
    value: function _getDragLngLat(dragPos, dragOffset) {
      var _this$props2 = this.props,
          offsetLeft = _this$props2.offsetLeft,
          offsetTop = _this$props2.offsetTop;

      var _this$_getDraggedPosi = this._getDraggedPosition(dragPos, dragOffset),
          _this$_getDraggedPosi2 = (0, _slicedToArray2["default"])(_this$_getDraggedPosi, 2),
          x = _this$_getDraggedPosi2[0],
          y = _this$_getDraggedPosi2[1];

      return this._context.viewport.unproject([x - offsetLeft, y - offsetTop]);
    }
  }]);
  return DraggableControl;
}(_baseControl["default"]);

exports["default"] = DraggableControl;
(0, _defineProperty2["default"])(DraggableControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(DraggableControl, "defaultProps", defaultProps);
//# sourceMappingURL=draggable-control.js.map

/***/ }),

/***/ "lwac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _constants = __webpack_require__("LlPl");

var MOUSE_EVENTS = _constants.INPUT_EVENT_TYPES.MOUSE_EVENTS;
var MOVE_EVENT_TYPE = 'pointermove';
var OVER_EVENT_TYPE = 'pointerover';
var OUT_EVENT_TYPE = 'pointerout';
var LEAVE_EVENT_TYPE = 'pointerleave';

var MoveInput = function () {
  function MoveInput(element, callback) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, MoveInput);
    this.element = element;
    this.callback = callback;
    this.pressed = false;
    this.options = Object.assign({
      enable: true
    }, options);
    this.enableMoveEvent = this.options.enable;
    this.enableLeaveEvent = this.options.enable;
    this.enableOutEvent = this.options.enable;
    this.enableOverEvent = this.options.enable;
    this.events = MOUSE_EVENTS.concat(options.events || []);
    this.handleEvent = this.handleEvent.bind(this);
    this.events.forEach(function (event) {
      return element.addEventListener(event, _this.handleEvent);
    });
  }

  (0, _createClass2["default"])(MoveInput, [{
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.events.forEach(function (event) {
        return _this2.element.removeEventListener(event, _this2.handleEvent);
      });
    }
  }, {
    key: "enableEventType",
    value: function enableEventType(eventType, enabled) {
      if (eventType === MOVE_EVENT_TYPE) {
        this.enableMoveEvent = enabled;
      }

      if (eventType === OVER_EVENT_TYPE) {
        this.enableOverEvent = enabled;
      }

      if (eventType === OUT_EVENT_TYPE) {
        this.enableOutEvent = enabled;
      }

      if (eventType === LEAVE_EVENT_TYPE) {
        this.enableLeaveEvent = enabled;
      }
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      this.handleOverEvent(event);
      this.handleOutEvent(event);
      this.handleLeaveEvent(event);
      this.handleMoveEvent(event);
    }
  }, {
    key: "handleOverEvent",
    value: function handleOverEvent(event) {
      if (this.enableOverEvent) {
        if (event.type === 'mouseover') {
          this.callback({
            type: OVER_EVENT_TYPE,
            srcEvent: event,
            pointerType: 'mouse',
            target: event.target
          });
        }
      }
    }
  }, {
    key: "handleOutEvent",
    value: function handleOutEvent(event) {
      if (this.enableOutEvent) {
        if (event.type === 'mouseout') {
          this.callback({
            type: OUT_EVENT_TYPE,
            srcEvent: event,
            pointerType: 'mouse',
            target: event.target
          });
        }
      }
    }
  }, {
    key: "handleLeaveEvent",
    value: function handleLeaveEvent(event) {
      if (this.enableLeaveEvent) {
        if (event.type === 'mouseleave') {
          this.callback({
            type: LEAVE_EVENT_TYPE,
            srcEvent: event,
            pointerType: 'mouse',
            target: event.target
          });
        }
      }
    }
  }, {
    key: "handleMoveEvent",
    value: function handleMoveEvent(event) {
      if (this.enableMoveEvent) {
        switch (event.type) {
          case 'mousedown':
            if (event.button >= 0) {
              this.pressed = true;
            }

            break;

          case 'mousemove':
            if (event.which === 0) {
              this.pressed = false;
            }

            if (!this.pressed) {
              this.callback({
                type: MOVE_EVENT_TYPE,
                srcEvent: event,
                pointerType: 'mouse',
                target: event.target
              });
            }

            break;

          case 'mouseup':
            this.pressed = false;
            break;

          default:
        }
      }
    }
  }]);
  return MoveInput;
}();

exports["default"] = MoveInput;
//# sourceMappingURL=move-input.js.map

/***/ }),

/***/ "n1S+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _webMercatorViewport["default"];
  }
});
Object.defineProperty(exports, "WebMercatorViewport", {
  enumerable: true,
  get: function get() {
    return _webMercatorViewport["default"];
  }
});
Object.defineProperty(exports, "fitBounds", {
  enumerable: true,
  get: function get() {
    return _fitBounds["default"];
  }
});
Object.defineProperty(exports, "normalizeViewportProps", {
  enumerable: true,
  get: function get() {
    return _normalizeViewportProps["default"];
  }
});
Object.defineProperty(exports, "flyToViewport", {
  enumerable: true,
  get: function get() {
    return _flyToViewport["default"];
  }
});
Object.defineProperty(exports, "getFlyToDuration", {
  enumerable: true,
  get: function get() {
    return _flyToViewport.getFlyToDuration;
  }
});
Object.defineProperty(exports, "lngLatToWorld", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.lngLatToWorld;
  }
});
Object.defineProperty(exports, "worldToLngLat", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.worldToLngLat;
  }
});
Object.defineProperty(exports, "worldToPixels", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.worldToPixels;
  }
});
Object.defineProperty(exports, "pixelsToWorld", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.pixelsToWorld;
  }
});
Object.defineProperty(exports, "zoomToScale", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.zoomToScale;
  }
});
Object.defineProperty(exports, "scaleToZoom", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.scaleToZoom;
  }
});
Object.defineProperty(exports, "getMeterZoom", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.getMeterZoom;
  }
});
Object.defineProperty(exports, "getDistanceScales", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.getDistanceScales;
  }
});
Object.defineProperty(exports, "addMetersToLngLat", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.addMetersToLngLat;
  }
});
Object.defineProperty(exports, "getViewMatrix", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.getViewMatrix;
  }
});
Object.defineProperty(exports, "getProjectionMatrix", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.getProjectionMatrix;
  }
});
Object.defineProperty(exports, "getProjectionParameters", {
  enumerable: true,
  get: function get() {
    return _webMercatorUtils.getProjectionParameters;
  }
});

var _webMercatorViewport = _interopRequireDefault(__webpack_require__("Ku1M"));

var _fitBounds = _interopRequireDefault(__webpack_require__("jJdG"));

var _normalizeViewportProps = _interopRequireDefault(__webpack_require__("POR0"));

var _flyToViewport = _interopRequireWildcard(__webpack_require__("+hrH"));

var _webMercatorUtils = __webpack_require__("ixny");
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "nfsg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _constants = __webpack_require__("LlPl");

var _globals = __webpack_require__("Q0G1");

var firefox = _globals.userAgent.indexOf('firefox') !== -1;
var WHEEL_EVENTS = _constants.INPUT_EVENT_TYPES.WHEEL_EVENTS;
var EVENT_TYPE = 'wheel';
var WHEEL_DELTA_MAGIC_SCALER = 4.000244140625;
var WHEEL_DELTA_PER_LINE = 40;
var SHIFT_MULTIPLIER = 0.25;

var WheelInput = function () {
  function WheelInput(element, callback) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, WheelInput);
    this.element = element;
    this.callback = callback;
    this.options = Object.assign({
      enable: true
    }, options);
    this.events = WHEEL_EVENTS.concat(options.events || []);
    this.handleEvent = this.handleEvent.bind(this);
    this.events.forEach(function (event) {
      return element.addEventListener(event, _this.handleEvent, _globals.passiveSupported ? {
        passive: false
      } : false);
    });
  }

  (0, _createClass2["default"])(WheelInput, [{
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      this.events.forEach(function (event) {
        return _this2.element.removeEventListener(event, _this2.handleEvent);
      });
    }
  }, {
    key: "enableEventType",
    value: function enableEventType(eventType, enabled) {
      if (eventType === EVENT_TYPE) {
        this.options.enable = enabled;
      }
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      if (!this.options.enable) {
        return;
      }

      var value = event.deltaY;

      if (_globals.window.WheelEvent) {
        if (firefox && event.deltaMode === _globals.window.WheelEvent.DOM_DELTA_PIXEL) {
          value /= _globals.window.devicePixelRatio;
        }

        if (event.deltaMode === _globals.window.WheelEvent.DOM_DELTA_LINE) {
          value *= WHEEL_DELTA_PER_LINE;
        }
      }

      var wheelPosition = {
        x: event.clientX,
        y: event.clientY
      };

      if (value !== 0 && value % WHEEL_DELTA_MAGIC_SCALER === 0) {
        value = Math.floor(value / WHEEL_DELTA_MAGIC_SCALER);
      }

      if (event.shiftKey && value) {
        value = value * SHIFT_MULTIPLIER;
      }

      this._onWheel(event, -value, wheelPosition);
    }
  }, {
    key: "_onWheel",
    value: function _onWheel(srcEvent, delta, position) {
      this.callback({
        type: EVENT_TYPE,
        center: position,
        delta: delta,
        srcEvent: srcEvent,
        pointerType: 'mouse',
        target: srcEvent.target
      });
    }
  }]);
  return WheelInput;
}();

exports["default"] = WheelInput;
//# sourceMappingURL=wheel-input.js.map

/***/ }),

/***/ "p58Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMat4 = createMat4;
exports.transformVector = transformVector;
exports.mod = mod;
exports.lerp = lerp;

var vec4 = _interopRequireWildcard(__webpack_require__("2HkX"));

function createMat4() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

function transformVector(matrix, vector) {
  var result = vec4.transformMat4([], vector, matrix);
  vec4.scale(result, result, 1 / result[3]);
  return result;
}

function mod(value, divisor) {
  var modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
}

function lerp(start, end, step) {
  return step * end + (1 - step) * start;
}
//# sourceMappingURL=math-utils.js.map

/***/ }),

/***/ "pzuw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccessToken = getAccessToken;
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _globals = __webpack_require__("VlTr");

function noop() {}

function defaultOnError(event) {
  if (event) {
    console.error(event.error);
  }
}

var propTypes = {
  container: _propTypes["default"].object,
  gl: _propTypes["default"].object,
  mapboxApiAccessToken: _propTypes["default"].string,
  mapboxApiUrl: _propTypes["default"].string,
  attributionControl: _propTypes["default"].bool,
  preserveDrawingBuffer: _propTypes["default"].bool,
  reuseMaps: _propTypes["default"].bool,
  transformRequest: _propTypes["default"].func,
  mapOptions: _propTypes["default"].object,
  mapStyle: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object]),
  visible: _propTypes["default"].bool,
  asyncRender: _propTypes["default"].bool,
  onLoad: _propTypes["default"].func,
  onError: _propTypes["default"].func,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  viewState: _propTypes["default"].object,
  longitude: _propTypes["default"].number,
  latitude: _propTypes["default"].number,
  zoom: _propTypes["default"].number,
  bearing: _propTypes["default"].number,
  pitch: _propTypes["default"].number,
  altitude: _propTypes["default"].number
};
var defaultProps = {
  container: _globals.document.body,
  mapboxApiAccessToken: getAccessToken(),
  mapboxApiUrl: 'https://api.mapbox.com',
  preserveDrawingBuffer: false,
  attributionControl: true,
  reuseMaps: false,
  mapOptions: {},
  mapStyle: 'mapbox://styles/mapbox/light-v8',
  visible: true,
  asyncRender: false,
  onLoad: noop,
  onError: defaultOnError,
  width: 0,
  height: 0,
  longitude: 0,
  latitude: 0,
  zoom: 0,
  bearing: 0,
  pitch: 0,
  altitude: 1.5
};

function getAccessToken() {
  var accessToken = null;

  if (typeof window !== 'undefined' && window.location) {
    var match = window.location.search.match(/access_token=([^&\/]*)/);
    accessToken = match && match[1];
  }

  if (!accessToken && typeof process !== 'undefined') {
    accessToken = accessToken || process.env.MapboxAccessToken || process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  }

  return accessToken || 'no-token';
}

function checkPropTypes(props) {
  var component = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'component';

  if (props.debug) {
    _propTypes["default"].checkPropTypes(propTypes, props, 'prop', component);
  }
}

var Mapbox = function () {
  function Mapbox(props) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Mapbox);
    (0, _defineProperty2["default"])(this, "mapboxgl", void 0);
    (0, _defineProperty2["default"])(this, "props", defaultProps);
    (0, _defineProperty2["default"])(this, "_map", null);
    (0, _defineProperty2["default"])(this, "width", 0);
    (0, _defineProperty2["default"])(this, "height", 0);
    (0, _defineProperty2["default"])(this, "_fireLoadEvent", function () {
      _this.props.onLoad({
        type: 'load',
        target: _this._map
      });
    });

    if (!props.mapboxgl) {
      throw new Error('Mapbox not available');
    }

    this.mapboxgl = props.mapboxgl;

    if (!Mapbox.initialized) {
      Mapbox.initialized = true;

      this._checkStyleSheet(this.mapboxgl.version);
    }

    this._initialize(props);
  }

  (0, _createClass2["default"])(Mapbox, [{
    key: "finalize",
    value: function finalize() {
      this._destroy();

      return this;
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      this._update(this.props, props);

      return this;
    }
  }, {
    key: "resize",
    value: function resize() {
      this._map.resize();

      return this;
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var map = this._map;

      if (map.style) {
        if (map._frame) {
          map._frame.cancel();

          map._frame = null;
        }

        map._render();
      }
    }
  }, {
    key: "getMap",
    value: function getMap() {
      return this._map;
    }
  }, {
    key: "_reuse",
    value: function _reuse(props) {
      this._map = Mapbox.savedMap;

      var oldContainer = this._map.getContainer();

      var newContainer = props.container;
      newContainer.classList.add('mapboxgl-map');

      while (oldContainer.childNodes.length > 0) {
        newContainer.appendChild(oldContainer.childNodes[0]);
      }

      this._map._container = newContainer;
      Mapbox.savedMap = null;

      if (props.mapStyle) {
        this._map.setStyle(props.mapStyle, {
          diff: false
        });
      }

      if (this._map.isStyleLoaded()) {
        this._fireLoadEvent();
      } else {
        this._map.once('styledata', this._fireLoadEvent);
      }
    }
  }, {
    key: "_create",
    value: function _create(props) {
      if (props.reuseMaps && Mapbox.savedMap) {
        this._reuse(props);
      } else {
        if (props.gl) {
          var getContext = HTMLCanvasElement.prototype.getContext;

          HTMLCanvasElement.prototype.getContext = function () {
            HTMLCanvasElement.prototype.getContext = getContext;
            return props.gl;
          };
        }

        var mapOptions = {
          container: props.container,
          center: [0, 0],
          zoom: 8,
          pitch: 0,
          bearing: 0,
          maxZoom: 24,
          style: props.mapStyle,
          interactive: false,
          trackResize: false,
          attributionControl: props.attributionControl,
          preserveDrawingBuffer: props.preserveDrawingBuffer
        };

        if (props.transformRequest) {
          mapOptions.transformRequest = props.transformRequest;
        }

        this._map = new this.mapboxgl.Map(Object.assign({}, mapOptions, props.mapOptions));

        this._map.once('load', props.onLoad);

        this._map.on('error', props.onError);
      }

      return this;
    }
  }, {
    key: "_destroy",
    value: function _destroy() {
      if (!this._map) {
        return;
      }

      if (!Mapbox.savedMap) {
        Mapbox.savedMap = this._map;

        this._map.off('load', this.props.onLoad);

        this._map.off('error', this.props.onError);

        this._map.off('styledata', this._fireLoadEvent);
      } else {
        this._map.remove();
      }

      this._map = null;
    }
  }, {
    key: "_initialize",
    value: function _initialize(props) {
      var _this2 = this;

      props = Object.assign({}, defaultProps, props);
      checkPropTypes(props, 'Mapbox');
      this.mapboxgl.accessToken = props.mapboxApiAccessToken || defaultProps.mapboxApiAccessToken;
      this.mapboxgl.baseApiUrl = props.mapboxApiUrl;

      this._create(props);

      var _props = props,
          container = _props.container;
      Object.defineProperty(container, 'offsetWidth', {
        get: function get() {
          return _this2.width;
        }
      });
      Object.defineProperty(container, 'clientWidth', {
        get: function get() {
          return _this2.width;
        }
      });
      Object.defineProperty(container, 'offsetHeight', {
        get: function get() {
          return _this2.height;
        }
      });
      Object.defineProperty(container, 'clientHeight', {
        get: function get() {
          return _this2.height;
        }
      });

      var canvas = this._map.getCanvas();

      if (canvas) {
        canvas.style.outline = 'none';
      }

      this._updateMapViewport({}, props);

      this._updateMapSize({}, props);

      this.props = props;
    }
  }, {
    key: "_update",
    value: function _update(oldProps, newProps) {
      if (!this._map) {
        return;
      }

      newProps = Object.assign({}, this.props, newProps);
      checkPropTypes(newProps, 'Mapbox');

      var viewportChanged = this._updateMapViewport(oldProps, newProps);

      var sizeChanged = this._updateMapSize(oldProps, newProps);

      if (!newProps.asyncRender && (viewportChanged || sizeChanged)) {
        this.redraw();
      }

      this.props = newProps;
    }
  }, {
    key: "_updateMapSize",
    value: function _updateMapSize(oldProps, newProps) {
      var sizeChanged = oldProps.width !== newProps.width || oldProps.height !== newProps.height;

      if (sizeChanged) {
        this.width = newProps.width;
        this.height = newProps.height;
        this.resize();
      }

      return sizeChanged;
    }
  }, {
    key: "_updateMapViewport",
    value: function _updateMapViewport(oldProps, newProps) {
      var oldViewState = this._getViewState(oldProps);

      var newViewState = this._getViewState(newProps);

      var viewportChanged = newViewState.latitude !== oldViewState.latitude || newViewState.longitude !== oldViewState.longitude || newViewState.zoom !== oldViewState.zoom || newViewState.pitch !== oldViewState.pitch || newViewState.bearing !== oldViewState.bearing || newViewState.altitude !== oldViewState.altitude;

      if (viewportChanged) {
        this._map.jumpTo(this._viewStateToMapboxProps(newViewState));

        if (newViewState.altitude !== oldViewState.altitude) {
          this._map.transform.altitude = newViewState.altitude;
        }
      }

      return viewportChanged;
    }
  }, {
    key: "_getViewState",
    value: function _getViewState(props) {
      var _ref = props.viewState || props,
          longitude = _ref.longitude,
          latitude = _ref.latitude,
          zoom = _ref.zoom,
          _ref$pitch = _ref.pitch,
          pitch = _ref$pitch === void 0 ? 0 : _ref$pitch,
          _ref$bearing = _ref.bearing,
          bearing = _ref$bearing === void 0 ? 0 : _ref$bearing,
          _ref$altitude = _ref.altitude,
          altitude = _ref$altitude === void 0 ? 1.5 : _ref$altitude;

      return {
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
        pitch: pitch,
        bearing: bearing,
        altitude: altitude
      };
    }
  }, {
    key: "_checkStyleSheet",
    value: function _checkStyleSheet() {
      var mapboxVersion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.47.0';

      if (typeof _globals.document === 'undefined') {
        return;
      }

      try {
        var testElement = _globals.document.createElement('div');

        testElement.className = 'mapboxgl-map';
        testElement.style.display = 'none';

        _globals.document.body.append(testElement);

        var isCssLoaded = window.getComputedStyle(testElement).position !== 'static';

        if (!isCssLoaded) {
          var link = _globals.document.createElement('link');

          link.setAttribute('rel', 'stylesheet');
          link.setAttribute('type', 'text/css');
          link.setAttribute('href', "https://api.tiles.mapbox.com/mapbox-gl-js/v".concat(mapboxVersion, "/mapbox-gl.css"));

          _globals.document.head.append(link);
        }
      } catch (error) {}
    }
  }, {
    key: "_viewStateToMapboxProps",
    value: function _viewStateToMapboxProps(viewState) {
      return {
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        bearing: viewState.bearing,
        pitch: viewState.pitch
      };
    }
  }]);
  return Mapbox;
}();

exports["default"] = Mapbox;
(0, _defineProperty2["default"])(Mapbox, "initialized", false);
(0, _defineProperty2["default"])(Mapbox, "propTypes", propTypes);
(0, _defineProperty2["default"])(Mapbox, "defaultProps", defaultProps);
(0, _defineProperty2["default"])(Mapbox, "savedMap", null);
//# sourceMappingURL=mapbox.js.map

/***/ }),

/***/ "qWEl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.copy = copy;
exports.fromValues = fromValues;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.adjoint = adjoint;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.scale = scale;
exports.rotate = rotate;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.fromTranslation = fromTranslation;
exports.fromScaling = fromScaling;
exports.fromRotation = fromRotation;
exports.fromXRotation = fromXRotation;
exports.fromYRotation = fromYRotation;
exports.fromZRotation = fromZRotation;
exports.fromRotationTranslation = fromRotationTranslation;
exports.fromQuat2 = fromQuat2;
exports.getTranslation = getTranslation;
exports.getScaling = getScaling;
exports.getRotation = getRotation;
exports.fromRotationTranslationScale = fromRotationTranslationScale;
exports.fromRotationTranslationScaleOrigin = fromRotationTranslationScaleOrigin;
exports.fromQuat = fromQuat;
exports.frustum = frustum;
exports.perspective = perspective;
exports.perspectiveFromFieldOfView = perspectiveFromFieldOfView;
exports.ortho = ortho;
exports.lookAt = lookAt;
exports.targetTo = targetTo;
exports.str = str;
exports.frob = frob;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.sub = exports.mul = void 0;

var glMatrix = _interopRequireWildcard(__webpack_require__("VrCi"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(16);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */


function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new glMatrix.ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */


function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */


function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */


function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */


function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */


function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/


function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */


function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < glMatrix.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */


function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */


function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */


function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < glMatrix.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */


function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */


function fromQuat2(out, a) {
  var translation = new glMatrix.ARRAY_TYPE(3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */


function getRotation(out, mat) {
  var scaling = new glMatrix.ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */


function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */


function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */


function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */


function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */


function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */


function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */


function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */


function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */


function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */


var mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

exports.mul = mul;
var sub = subtract;
exports.sub = sub;

/***/ }),

/***/ "qZ/K":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__("fAZL"));

var _get2 = _interopRequireDefault(__webpack_require__("NWOx"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var _dynamicPosition = __webpack_require__("OSiu");

var _crispPixel = __webpack_require__("RZd7");

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  className: _propTypes["default"].string,
  longitude: _propTypes["default"].number.isRequired,
  latitude: _propTypes["default"].number.isRequired,
  altitude: _propTypes["default"].number,
  offsetLeft: _propTypes["default"].number,
  offsetTop: _propTypes["default"].number,
  tipSize: _propTypes["default"].number,
  closeButton: _propTypes["default"].bool,
  closeOnClick: _propTypes["default"].bool,
  anchor: _propTypes["default"].oneOf(Object.keys(_dynamicPosition.ANCHOR_POSITION)),
  dynamicPosition: _propTypes["default"].bool,
  sortByDepth: _propTypes["default"].bool,
  onClose: _propTypes["default"].func
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  className: '',
  altitude: 0,
  offsetLeft: 0,
  offsetTop: 0,
  tipSize: 10,
  anchor: 'bottom',
  dynamicPosition: true,
  sortByDepth: false,
  closeButton: true,
  closeOnClick: true,
  onClose: function onClose() {}
});

var Popup = function (_BaseControl) {
  (0, _inherits2["default"])(Popup, _BaseControl);

  function Popup() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Popup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Popup)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_closeOnClick", false);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_contentRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function (evt) {
      if (_this.props.captureClick) {
        evt.stopPropagation();
      }

      if (_this.props.closeOnClick || evt.target.className === 'mapboxgl-popup-close-button') {
        _this.props.onClose();

        var eventManager = _this._context.eventManager;

        if (eventManager) {
          eventManager.once('click', function (e) {
            return e.stopPropagation();
          }, evt.target);
        }
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2["default"])((0, _getPrototypeOf3["default"])(Popup.prototype), "componentDidMount", this).call(this);
      this.forceUpdate();
    }
  }, {
    key: "_getPosition",
    value: function _getPosition(x, y) {
      var viewport = this._context.viewport;
      var _this$props = this.props,
          anchor = _this$props.anchor,
          dynamicPosition = _this$props.dynamicPosition,
          tipSize = _this$props.tipSize;
      var content = this._contentRef.current;

      if (content) {
        return dynamicPosition ? (0, _dynamicPosition.getDynamicPosition)({
          x: x,
          y: y,
          anchor: anchor,
          padding: tipSize,
          width: viewport.width,
          height: viewport.height,
          selfWidth: content.clientWidth,
          selfHeight: content.clientHeight
        }) : anchor;
      }

      return anchor;
    }
  }, {
    key: "_getContainerStyle",
    value: function _getContainerStyle(x, y, z, positionType) {
      var viewport = this._context.viewport;
      var _this$props2 = this.props,
          offsetLeft = _this$props2.offsetLeft,
          offsetTop = _this$props2.offsetTop,
          sortByDepth = _this$props2.sortByDepth;
      var anchorPosition = _dynamicPosition.ANCHOR_POSITION[positionType];
      var left = x + offsetLeft;
      var top = y + offsetTop;
      var el = this._containerRef.current;
      var xPercentage = (0, _crispPixel.crispPercentage)(el, -anchorPosition.x * 100);
      var yPercentage = (0, _crispPixel.crispPercentage)(el, -anchorPosition.y * 100, 'y');
      var style = {
        position: 'absolute',
        transform: "\n        translate(".concat(xPercentage, "%, ").concat(yPercentage, "%)\n        translate(").concat((0, _crispPixel.crispPixel)(left), "px, ").concat((0, _crispPixel.crispPixel)(top), "px)\n      "),
        display: undefined,
        zIndex: undefined
      };

      if (!sortByDepth) {
        return style;
      }

      if (z > 1 || z < -1 || x < 0 || x > viewport.width || y < 0 || y > viewport.height) {
        style.display = 'none';
      } else {
        style.zIndex = Math.floor((1 - z) / 2 * 100000);
      }

      return style;
    }
  }, {
    key: "_renderTip",
    value: function _renderTip(positionType) {
      var tipSize = this.props.tipSize;
      return React.createElement("div", {
        key: "tip",
        className: "mapboxgl-popup-tip",
        style: {
          borderWidth: tipSize
        }
      });
    }
  }, {
    key: "_renderContent",
    value: function _renderContent() {
      var _this$props3 = this.props,
          closeButton = _this$props3.closeButton,
          children = _this$props3.children;
      var onClick = this._context.eventManager ? null : this._onClick;
      return React.createElement("div", {
        key: "content",
        ref: this._contentRef,
        className: "mapboxgl-popup-content",
        onClick: onClick
      }, closeButton && React.createElement("button", {
        key: "close-button",
        className: "mapboxgl-popup-close-button",
        type: "button"
      }, "\xD7"), children);
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          longitude = _this$props4.longitude,
          latitude = _this$props4.latitude,
          altitude = _this$props4.altitude;

      var _this$_context$viewpo = this._context.viewport.project([longitude, latitude, altitude]),
          _this$_context$viewpo2 = (0, _slicedToArray2["default"])(_this$_context$viewpo, 3),
          x = _this$_context$viewpo2[0],
          y = _this$_context$viewpo2[1],
          z = _this$_context$viewpo2[2];

      var positionType = this._getPosition(x, y);

      var containerStyle = this._getContainerStyle(x, y, z, positionType);

      return React.createElement("div", {
        className: "mapboxgl-popup mapboxgl-popup-anchor-".concat(positionType, " ").concat(className),
        style: containerStyle,
        ref: this._containerRef
      }, this._renderTip(positionType), this._renderContent());
    }
  }]);
  return Popup;
}(_baseControl["default"]);

exports["default"] = Popup;
(0, _defineProperty2["default"])(Popup, "propTypes", propTypes);
(0, _defineProperty2["default"])(Popup, "defaultProps", defaultProps);
//# sourceMappingURL=popup.js.map

/***/ }),

/***/ "qkV/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _baseControl = _interopRequireDefault(__webpack_require__("/NxZ"));

var _mapboxgl = _interopRequireDefault(__webpack_require__("LKQx"));

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  maxWidth: _propTypes["default"].number,
  unit: _propTypes["default"].oneOf(['imperial', 'metric', 'nautical'])
});
var defaultProps = Object.assign({}, _baseControl["default"].defaultProps, {
  maxWidth: 100,
  unit: 'metric'
});

var ScaleControl = function (_BaseControl) {
  (0, _inherits2["default"])(ScaleControl, _BaseControl);

  function ScaleControl() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, ScaleControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(ScaleControl)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_control", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxScaleControl", null);
    return _this;
  }

  (0, _createClass2["default"])(ScaleControl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var mapboxScaleControl = new _mapboxgl["default"].ScaleControl();
      mapboxScaleControl._map = this._context.map;
      mapboxScaleControl._container = this._containerRef.current;
      this._mapboxScaleControl = mapboxScaleControl;

      this._update();
    }
  }, {
    key: "_update",
    value: function _update() {
      var mapboxScaleControl = this._mapboxScaleControl;

      if (mapboxScaleControl) {
        mapboxScaleControl.options = this.props;

        mapboxScaleControl._onMove();
      }
    }
  }, {
    key: "_render",
    value: function _render() {
      this._control = this._control || React.createElement("div", {
        ref: this._containerRef,
        className: "mapboxgl-ctrl mapboxgl-ctrl-scale"
      });

      this._update();

      return this._control;
    }
  }]);
  return ScaleControl;
}(_baseControl["default"]);

exports["default"] = ScaleControl;
(0, _defineProperty2["default"])(ScaleControl, "propTypes", propTypes);
(0, _defineProperty2["default"])(ScaleControl, "defaultProps", defaultProps);
//# sourceMappingURL=scale-control.js.map

/***/ }),

/***/ "r/8N":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("n1S+");


/***/ }),

/***/ "r6bA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("1Pnb"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__("fAZL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("rfrw"));

var _inherits2 = _interopRequireDefault(__webpack_require__("/qpQ"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var React = _interopRequireWildcard(__webpack_require__("gmCQ"));

var _propTypes = _interopRequireDefault(__webpack_require__("/TI7"));

var _styleUtils = __webpack_require__("FoBZ");

var _viewportMercatorProject = _interopRequireDefault(__webpack_require__("r/8N"));

var _reactVirtualizedAutoSizer = _interopRequireDefault(__webpack_require__("AEuh"));

var _mapbox = _interopRequireDefault(__webpack_require__("pzuw"));

var _mapboxgl = _interopRequireDefault(__webpack_require__("LKQx"));

var _mapConstraints = __webpack_require__("X7j5");

var _mapState = __webpack_require__("SjBN");

var _mapContext = _interopRequireDefault(__webpack_require__("VNOJ"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TOKEN_DOC_URL = 'https://uber.github.io/react-map-gl/docs/get-started/mapbox-tokens';
var NO_TOKEN_WARNING = 'A valid API access token is required to use Mapbox data';

function noop() {}

var UNAUTHORIZED_ERROR_CODE = 401;
var CONTAINER_STYLE = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};
var propTypes = Object.assign({}, _mapbox["default"].propTypes, {
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  onResize: _propTypes["default"].func,
  preventStyleDiffing: _propTypes["default"].bool,
  disableTokenWarning: _propTypes["default"].bool,
  visible: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  visibilityConstraints: _propTypes["default"].object
});
var defaultProps = Object.assign({}, _mapbox["default"].defaultProps, {
  preventStyleDiffing: false,
  disableTokenWarning: false,
  visible: true,
  onResize: noop,
  className: '',
  style: null,
  visibilityConstraints: _mapState.MAPBOX_LIMITS
});

var StaticMap = function (_PureComponent) {
  (0, _inherits2["default"])(StaticMap, _PureComponent);

  function StaticMap() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, StaticMap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(StaticMap)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      accessTokenInvalid: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapbox", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_map", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxMapRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapContainerRef", (0, React.createRef)());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_queryParams", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_width", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_height", 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getMap", function () {
      return _this._map;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "queryRenderedFeatures", function (geometry) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _this._map.queryRenderedFeatures(geometry, options);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_mapboxMapError", function (evt) {
      var statusCode = evt.error && evt.error.status || evt.status;

      if (statusCode === UNAUTHORIZED_ERROR_CODE && !_this.state.accessTokenInvalid) {
        console.error(NO_TOKEN_WARNING);

        _this.setState({
          accessTokenInvalid: true
        });
      }

      _this.props.onError(evt);
    });
    return _this;
  }

  (0, _createClass2["default"])(StaticMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!StaticMap.supported()) {
        return;
      }

      var mapStyle = this.props.mapStyle;
      this._mapbox = new _mapbox["default"](Object.assign({}, this.props, {
        mapboxgl: _mapboxgl["default"],
        width: this._width,
        height: this._height,
        container: this._mapboxMapRef.current,
        onError: this._mapboxMapError,
        mapStyle: (0, _styleUtils.normalizeStyle)(mapStyle)
      }));
      this._map = this._mapbox.getMap();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this._mapbox) {
        this._updateMapStyle(prevProps, this.props);

        this._updateMapProps(this.props);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._mapbox) {
        this._mapbox.finalize();

        this._mapbox = null;
        this._map = null;
      }
    }
  }, {
    key: "_updateMapSize",
    value: function _updateMapSize(width, height) {
      if (this._width !== width || this._height !== height) {
        this._width = width;
        this._height = height;

        this._updateMapProps(this.props);
      }
    }
  }, {
    key: "_updateMapStyle",
    value: function _updateMapStyle(oldProps, newProps) {
      var mapStyle = newProps.mapStyle;
      var oldMapStyle = oldProps.mapStyle;

      if (mapStyle !== oldMapStyle && mapStyle) {
        this._map.setStyle((0, _styleUtils.normalizeStyle)(mapStyle), {
          diff: !this.props.preventStyleDiffing
        });
      }
    }
  }, {
    key: "_updateMapProps",
    value: function _updateMapProps(props) {
      if (!this._mapbox) {
        return;
      }

      this._mapbox.setProps(Object.assign({}, props, {
        width: this._width,
        height: this._height
      }));
    }
  }, {
    key: "_renderNoTokenWarning",
    value: function _renderNoTokenWarning() {
      if (this.state.accessTokenInvalid && !this.props.disableTokenWarning) {
        var style = {
          position: 'absolute',
          left: 0,
          top: 0
        };
        return React.createElement("div", {
          key: "warning",
          id: "no-token-warning",
          style: style
        }, React.createElement("h3", {
          key: "header"
        }, "NO_TOKEN_WARNING"), React.createElement("div", {
          key: "text"
        }, "For information on setting up your basemap, read"), React.createElement("a", {
          key: "link",
          href: TOKEN_DOC_URL
        }, "Note on Map Tokens"));
      }

      return null;
    }
  }, {
    key: "_renderOverlays",
    value: function _renderOverlays(dimensions) {
      var _this2 = this;

      var _dimensions$width = dimensions.width,
          width = _dimensions$width === void 0 ? Number(this.props.width) : _dimensions$width,
          _dimensions$height = dimensions.height,
          height = _dimensions$height === void 0 ? Number(this.props.height) : _dimensions$height;

      this._updateMapSize(width, height);

      return React.createElement(_mapContext["default"].Consumer, null, function (interactiveContext) {
        var context = _objectSpread({}, interactiveContext, {
          viewport: new _viewportMercatorProject["default"](_objectSpread({}, _this2.props, {}, _this2.props.viewState, {
            width: width,
            height: height
          })),
          map: _this2._map,
          mapContainer: interactiveContext.mapContainer || _this2._mapContainerRef.current
        });

        return React.createElement(_mapContext["default"].Provider, {
          value: context
        }, React.createElement("div", {
          key: "map-overlays",
          className: "overlays",
          style: CONTAINER_STYLE
        }, _this2.props.children));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          width = _this$props.width,
          height = _this$props.height,
          style = _this$props.style,
          visibilityConstraints = _this$props.visibilityConstraints;
      var mapContainerStyle = Object.assign({
        position: 'relative'
      }, style, {
        width: width,
        height: height
      });
      var visible = this.props.visible && (0, _mapConstraints.checkVisibilityConstraints)(this.props.viewState || this.props, visibilityConstraints);
      var mapStyle = Object.assign({}, CONTAINER_STYLE, {
        visibility: visible ? 'inherit' : 'hidden'
      });
      return React.createElement("div", {
        key: "map-container",
        style: mapContainerStyle,
        ref: this._mapContainerRef
      }, React.createElement("div", {
        key: "map-mapbox",
        ref: this._mapboxMapRef,
        style: mapStyle,
        className: className
      }), React.createElement(_reactVirtualizedAutoSizer["default"], {
        key: "autosizer",
        disableWidth: Number.isFinite(width),
        disableHeight: Number.isFinite(height),
        onResize: this.props.onResize
      }, this._renderOverlays.bind(this)), this._renderNoTokenWarning());
    }
  }], [{
    key: "supported",
    value: function supported() {
      return _mapboxgl["default"] && _mapboxgl["default"].supported();
    }
  }]);
  return StaticMap;
}(React.PureComponent);

exports["default"] = StaticMap;
(0, _defineProperty2["default"])(StaticMap, "propTypes", propTypes);
(0, _defineProperty2["default"])(StaticMap, "defaultProps", defaultProps);
//# sourceMappingURL=static-map.js.map

/***/ }),

/***/ "rfrw":
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "sg3N":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equals = equals;
exports.clamp = clamp;
exports.lerp = lerp;
var EPSILON = 1e-7;

function isArray(value) {
  return Array.isArray(value) || ArrayBuffer.isView(value);
}

function equals(a, b) {
  if (a === b) {
    return true;
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; ++i) {
      if (!equals(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  return Math.abs(a - b) <= EPSILON;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  if (isArray(a)) {
    return a.map(function (ai, i) {
      return lerp(ai, b[i], t);
    });
  }

  return t * b + (1 - t) * a;
}
//# sourceMappingURL=math-utils.js.map

/***/ }),

/***/ "uEn3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = assert;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'react-map-gl: assertion failed.');
  }
}
//# sourceMappingURL=assert.js.map

/***/ }),

/***/ "uTCq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _mathUtils = __webpack_require__("sg3N");

var _assert = _interopRequireDefault(__webpack_require__("uEn3"));

var TransitionInterpolator = function () {
  function TransitionInterpolator() {
    (0, _classCallCheck2["default"])(this, TransitionInterpolator);
    (0, _defineProperty2["default"])(this, "propNames", []);
  }

  (0, _createClass2["default"])(TransitionInterpolator, [{
    key: "arePropsEqual",
    value: function arePropsEqual(currentProps, nextProps) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (this.propNames || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!(0, _mathUtils.equals)(currentProps[key], nextProps[key])) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }, {
    key: "initializeProps",
    value: function initializeProps(startProps, endProps) {
      return {
        start: startProps,
        end: endProps
      };
    }
  }, {
    key: "interpolateProps",
    value: function interpolateProps(startProps, endProps, t) {
      (0, _assert["default"])(false, 'interpolateProps is not implemented');
    }
  }, {
    key: "getDuration",
    value: function getDuration(startProps, endProps) {
      return endProps.transitionDuration;
    }
  }]);
  return TransitionInterpolator;
}();

exports["default"] = TransitionInterpolator;
//# sourceMappingURL=transition-interpolator.js.map

/***/ }),

/***/ "vNCp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cropEasingFunction = cropEasingFunction;
exports["default"] = exports.TRANSITION_EVENTS = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _assert = _interopRequireDefault(__webpack_require__("uEn3"));

var _transition = __webpack_require__("PwPu");

var _mapState = _interopRequireDefault(__webpack_require__("SjBN"));

var noop = function noop() {};

function cropEasingFunction(easing, x0) {
  var y0 = easing(x0);
  return function (t) {
    return 1 / (1 - y0) * (easing(t * (1 - x0) + x0) - y0);
  };
}

var TRANSITION_EVENTS = {
  BREAK: 1,
  SNAP_TO_END: 2,
  IGNORE: 3,
  UPDATE: 4
};
exports.TRANSITION_EVENTS = TRANSITION_EVENTS;
var DEFAULT_PROPS = {
  transitionDuration: 0,
  transitionEasing: function transitionEasing(t) {
    return t;
  },
  transitionInterpolator: new _transition.LinearInterpolator(),
  transitionInterruption: TRANSITION_EVENTS.BREAK,
  onTransitionStart: noop,
  onTransitionInterrupt: noop,
  onTransitionEnd: noop,
  onViewportChange: noop,
  onStateChange: noop
};

var TransitionManager = function () {
  function TransitionManager(props, getTime) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, TransitionManager);
    (0, _defineProperty2["default"])(this, "props", void 0);
    (0, _defineProperty2["default"])(this, "state", void 0);
    (0, _defineProperty2["default"])(this, "time", void 0);
    (0, _defineProperty2["default"])(this, "_animationFrame", null);
    (0, _defineProperty2["default"])(this, "_onTransitionFrame", function () {
      _this._animationFrame = requestAnimationFrame(_this._onTransitionFrame);

      _this._updateViewport();
    });

    if (props) {
      this.props = props;
    }

    this.time = getTime || Date.now;
  }

  (0, _createClass2["default"])(TransitionManager, [{
    key: "getViewportInTransition",
    value: function getViewportInTransition() {
      return this._animationFrame ? this.state.propsInTransition : null;
    }
  }, {
    key: "processViewportChange",
    value: function processViewportChange(nextProps) {
      var currentProps = this.props;
      this.props = nextProps;

      if (this._shouldIgnoreViewportChange(currentProps, nextProps)) {
        return false;
      }

      if (this._isTransitionEnabled(nextProps)) {
        var startProps = Object.assign({}, currentProps);
        var endProps = Object.assign({}, nextProps);

        if (this._isTransitionInProgress()) {
          currentProps.onTransitionInterrupt();

          if (this.state.interruption === TRANSITION_EVENTS.SNAP_TO_END) {
            Object.assign(startProps, this.state.endProps);
          } else {
            Object.assign(startProps, this.state.propsInTransition);
          }

          if (this.state.interruption === TRANSITION_EVENTS.UPDATE) {
            var currentTime = this.time();
            var x0 = (currentTime - this.state.startTime) / this.state.duration;
            endProps.transitionDuration = this.state.duration - (currentTime - this.state.startTime);
            endProps.transitionEasing = cropEasingFunction(this.state.easing, x0);
            endProps.transitionInterpolator = startProps.transitionInterpolator;
          }
        }

        endProps.onTransitionStart();

        this._triggerTransition(startProps, endProps);

        return true;
      }

      if (this._isTransitionInProgress()) {
        currentProps.onTransitionInterrupt();

        this._endTransition();
      }

      return false;
    }
  }, {
    key: "_isTransitionInProgress",
    value: function _isTransitionInProgress() {
      return Boolean(this._animationFrame);
    }
  }, {
    key: "_isTransitionEnabled",
    value: function _isTransitionEnabled(props) {
      var transitionDuration = props.transitionDuration,
          transitionInterpolator = props.transitionInterpolator;
      return (transitionDuration > 0 || transitionDuration === 'auto') && Boolean(transitionInterpolator);
    }
  }, {
    key: "_isUpdateDueToCurrentTransition",
    value: function _isUpdateDueToCurrentTransition(props) {
      if (this.state.propsInTransition) {
        return this.state.interpolator.arePropsEqual(props, this.state.propsInTransition);
      }

      return false;
    }
  }, {
    key: "_shouldIgnoreViewportChange",
    value: function _shouldIgnoreViewportChange(currentProps, nextProps) {
      if (!currentProps) {
        return true;
      }

      if (this._isTransitionInProgress()) {
        return this.state.interruption === TRANSITION_EVENTS.IGNORE || this._isUpdateDueToCurrentTransition(nextProps);
      }

      if (this._isTransitionEnabled(nextProps)) {
        return nextProps.transitionInterpolator.arePropsEqual(currentProps, nextProps);
      }

      return true;
    }
  }, {
    key: "_triggerTransition",
    value: function _triggerTransition(startProps, endProps) {
      (0, _assert["default"])(this._isTransitionEnabled(endProps));

      if (this._animationFrame) {
        cancelAnimationFrame(this._animationFrame);
      }

      var transitionInterpolator = endProps.transitionInterpolator;
      var duration = transitionInterpolator.getDuration ? transitionInterpolator.getDuration(startProps, endProps) : endProps.transitionDuration;

      if (duration === 0) {
        return;
      }

      var initialProps = endProps.transitionInterpolator.initializeProps(startProps, endProps);
      var interactionState = {
        inTransition: true,
        isZooming: startProps.zoom !== endProps.zoom,
        isPanning: startProps.longitude !== endProps.longitude || startProps.latitude !== endProps.latitude,
        isRotating: startProps.bearing !== endProps.bearing || startProps.pitch !== endProps.pitch
      };
      this.state = {
        duration: duration,
        easing: endProps.transitionEasing,
        interpolator: endProps.transitionInterpolator,
        interruption: endProps.transitionInterruption,
        startTime: this.time(),
        startProps: initialProps.start,
        endProps: initialProps.end,
        animation: null,
        propsInTransition: {},
        interactionState: interactionState
      };

      this._onTransitionFrame();

      this.props.onStateChange(interactionState);
    }
  }, {
    key: "_endTransition",
    value: function _endTransition() {
      if (this._animationFrame) {
        cancelAnimationFrame(this._animationFrame);
        this._animationFrame = null;
      }

      this.props.onStateChange({
        inTransition: false,
        isZooming: false,
        isPanning: false,
        isRotating: false
      });
    }
  }, {
    key: "_updateViewport",
    value: function _updateViewport() {
      var currentTime = this.time();
      var _this$state = this.state,
          startTime = _this$state.startTime,
          duration = _this$state.duration,
          easing = _this$state.easing,
          interpolator = _this$state.interpolator,
          startProps = _this$state.startProps,
          endProps = _this$state.endProps;
      var shouldEnd = false;
      var t = (currentTime - startTime) / duration;

      if (t >= 1) {
        t = 1;
        shouldEnd = true;
      }

      t = easing(t);
      var viewport = interpolator.interpolateProps(startProps, endProps, t);
      var mapState = new _mapState["default"](Object.assign({}, this.props, viewport));
      this.state.propsInTransition = mapState.getViewportProps();
      this.props.onViewportChange(this.state.propsInTransition, this.state.interactionState, this.props);

      if (shouldEnd) {
        this._endTransition();

        this.props.onTransitionEnd();
      }
    }
  }]);
  return TransitionManager;
}();

exports["default"] = TransitionManager;
(0, _defineProperty2["default"])(TransitionManager, "defaultProps", DEFAULT_PROPS);
//# sourceMappingURL=transition-manager.js.map

/***/ }),

/***/ "vnie":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("DKXK");

var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LINEAR_TRANSITION_PROPS = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__("Md60"));

var _mapState = _interopRequireDefault(__webpack_require__("SjBN"));

var _transition = __webpack_require__("PwPu");

var _transitionManager = _interopRequireWildcard(__webpack_require__("vNCp"));

var _debounce = _interopRequireDefault(__webpack_require__("IR/O"));

var NO_TRANSITION_PROPS = {
  transitionDuration: 0
};
var LINEAR_TRANSITION_PROPS = {
  transitionDuration: 300,
  transitionEasing: function transitionEasing(t) {
    return t;
  },
  transitionInterpolator: new _transition.LinearInterpolator(),
  transitionInterruption: _transitionManager.TRANSITION_EVENTS.BREAK
};
exports.LINEAR_TRANSITION_PROPS = LINEAR_TRANSITION_PROPS;
var PITCH_MOUSE_THRESHOLD = 5;
var PITCH_ACCEL = 1.2;
var ZOOM_ACCEL = 0.01;
var EVENT_TYPES = {
  WHEEL: ['wheel'],
  PAN: ['panstart', 'panmove', 'panend'],
  PINCH: ['pinchstart', 'pinchmove', 'pinchend', 'pinchcancel'],
  DOUBLE_TAP: ['doubletap'],
  KEYBOARD: ['keydown']
};

var MapController = function () {
  function MapController() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, MapController);
    (0, _defineProperty2["default"])(this, "events", []);
    (0, _defineProperty2["default"])(this, "mapState", void 0);
    (0, _defineProperty2["default"])(this, "onViewportChange", void 0);
    (0, _defineProperty2["default"])(this, "onStateChange", void 0);
    (0, _defineProperty2["default"])(this, "mapStateProps", void 0);
    (0, _defineProperty2["default"])(this, "eventManager", void 0);
    (0, _defineProperty2["default"])(this, "scrollZoom", true);
    (0, _defineProperty2["default"])(this, "dragPan", true);
    (0, _defineProperty2["default"])(this, "dragRotate", true);
    (0, _defineProperty2["default"])(this, "doubleClickZoom", true);
    (0, _defineProperty2["default"])(this, "touchZoom", true);
    (0, _defineProperty2["default"])(this, "touchRotate", false);
    (0, _defineProperty2["default"])(this, "keyboard", true);
    (0, _defineProperty2["default"])(this, "_state", {
      isDragging: false
    });
    (0, _defineProperty2["default"])(this, "_events", {});
    (0, _defineProperty2["default"])(this, "_transitionManager", new _transitionManager["default"]());
    (0, _defineProperty2["default"])(this, "setState", function (newState) {
      Object.assign(_this._state, newState);

      if (_this.onStateChange) {
        _this.onStateChange(_this._state);
      }
    });
    this.handleEvent = this.handleEvent.bind(this);
    this._onWheelEnd = (0, _debounce["default"])(this._onWheelEnd, 100);
  }

  (0, _createClass2["default"])(MapController, [{
    key: "handleEvent",
    value: function handleEvent(event) {
      this.mapState = this.getMapState();

      switch (event.type) {
        case 'panstart':
          return this._onPanStart(event);

        case 'panmove':
          return this._onPan(event);

        case 'panend':
          return this._onPanEnd(event);

        case 'pinchstart':
          return this._onPinchStart(event);

        case 'pinchmove':
          return this._onPinch(event);

        case 'pinchcancel':
        case 'pinchend':
          return this._onPinchEnd(event);

        case 'doubletap':
          return this._onDoubleTap(event);

        case 'wheel':
          return this._onWheel(event);

        case 'keydown':
          return this._onKeyDown(event);

        default:
          return false;
      }
    }
  }, {
    key: "getCenter",
    value: function getCenter(event) {
      var _event$offsetCenter = event.offsetCenter,
          x = _event$offsetCenter.x,
          y = _event$offsetCenter.y;
      return [x, y];
    }
  }, {
    key: "isFunctionKeyPressed",
    value: function isFunctionKeyPressed(event) {
      var srcEvent = event.srcEvent;
      return Boolean(srcEvent.metaKey || srcEvent.altKey || srcEvent.ctrlKey || srcEvent.shiftKey);
    }
  }, {
    key: "updateViewport",
    value: function updateViewport(newMapState) {
      var extraProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var extraState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var oldViewport = this.mapState ? this.mapState.getViewportProps() : {};
      var newViewport = Object.assign({}, newMapState.getViewportProps(), extraProps);
      var viewStateChanged = Object.keys(newViewport).some(function (key) {
        return oldViewport[key] !== newViewport[key];
      });

      if (viewStateChanged) {
        this.onViewportChange(newViewport, extraState, oldViewport);
      }

      this.setState(Object.assign({}, newMapState.getInteractiveState(), extraState));
    }
  }, {
    key: "getMapState",
    value: function getMapState(overrides) {
      return new _mapState["default"](Object.assign({}, this.mapStateProps, this._state, overrides));
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var onViewportChange = options.onViewportChange,
          onStateChange = options.onStateChange,
          _options$eventManager = options.eventManager,
          eventManager = _options$eventManager === void 0 ? this.eventManager : _options$eventManager,
          _options$isInteractiv = options.isInteractive,
          isInteractive = _options$isInteractiv === void 0 ? true : _options$isInteractiv,
          _options$scrollZoom = options.scrollZoom,
          scrollZoom = _options$scrollZoom === void 0 ? this.scrollZoom : _options$scrollZoom,
          _options$dragPan = options.dragPan,
          dragPan = _options$dragPan === void 0 ? this.dragPan : _options$dragPan,
          _options$dragRotate = options.dragRotate,
          dragRotate = _options$dragRotate === void 0 ? this.dragRotate : _options$dragRotate,
          _options$doubleClickZ = options.doubleClickZoom,
          doubleClickZoom = _options$doubleClickZ === void 0 ? this.doubleClickZoom : _options$doubleClickZ,
          _options$touchZoom = options.touchZoom,
          touchZoom = _options$touchZoom === void 0 ? this.touchZoom : _options$touchZoom,
          _options$touchRotate = options.touchRotate,
          touchRotate = _options$touchRotate === void 0 ? this.touchRotate : _options$touchRotate,
          _options$keyboard = options.keyboard,
          keyboard = _options$keyboard === void 0 ? this.keyboard : _options$keyboard;
      this.onViewportChange = onViewportChange;
      this.onStateChange = onStateChange;
      var dimensionChanged = !this.mapStateProps || this.mapStateProps.height !== options.height;
      this.mapStateProps = options;

      if (dimensionChanged) {
        this.updateViewport(new _mapState["default"](options));
      }

      this._transitionManager.processViewportChange(Object.assign({}, options, {
        onStateChange: this.setState
      }));

      if (this.eventManager !== eventManager) {
        this.eventManager = eventManager;
        this._events = {};
        this.toggleEvents(this.events, true);
      }

      this.toggleEvents(EVENT_TYPES.WHEEL, isInteractive && scrollZoom);
      this.toggleEvents(EVENT_TYPES.PAN, isInteractive && (dragPan || dragRotate));
      this.toggleEvents(EVENT_TYPES.PINCH, isInteractive && (touchZoom || touchRotate));
      this.toggleEvents(EVENT_TYPES.DOUBLE_TAP, isInteractive && doubleClickZoom);
      this.toggleEvents(EVENT_TYPES.KEYBOARD, isInteractive && keyboard);
      this.scrollZoom = scrollZoom;
      this.dragPan = dragPan;
      this.dragRotate = dragRotate;
      this.doubleClickZoom = doubleClickZoom;
      this.touchZoom = touchZoom;
      this.touchRotate = touchRotate;
      this.keyboard = keyboard;
    }
  }, {
    key: "toggleEvents",
    value: function toggleEvents(eventNames, enabled) {
      var _this2 = this;

      if (this.eventManager) {
        eventNames.forEach(function (eventName) {
          if (_this2._events[eventName] !== enabled) {
            _this2._events[eventName] = enabled;

            if (enabled) {
              _this2.eventManager.on(eventName, _this2.handleEvent);
            } else {
              _this2.eventManager.off(eventName, _this2.handleEvent);
            }
          }
        });
      }
    }
  }, {
    key: "_onPanStart",
    value: function _onPanStart(event) {
      var pos = this.getCenter(event);
      var newMapState = this.mapState.panStart({
        pos: pos
      }).rotateStart({
        pos: pos
      });
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isDragging: true
      });
      return true;
    }
  }, {
    key: "_onPan",
    value: function _onPan(event) {
      return this.isFunctionKeyPressed(event) || event.rightButton ? this._onPanRotate(event) : this._onPanMove(event);
    }
  }, {
    key: "_onPanEnd",
    value: function _onPanEnd(event) {
      var newMapState = this.mapState.panEnd().rotateEnd();
      this.updateViewport(newMapState, null, {
        isDragging: false,
        isPanning: false,
        isRotating: false
      });
      return true;
    }
  }, {
    key: "_onPanMove",
    value: function _onPanMove(event) {
      if (!this.dragPan) {
        return false;
      }

      var pos = this.getCenter(event);
      var newMapState = this.mapState.pan({
        pos: pos
      });
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isPanning: true
      });
      return true;
    }
  }, {
    key: "_onPanRotate",
    value: function _onPanRotate(event) {
      if (!this.dragRotate) {
        return false;
      }

      var deltaX = event.deltaX,
          deltaY = event.deltaY;

      var _this$getCenter = this.getCenter(event),
          _this$getCenter2 = (0, _slicedToArray2["default"])(_this$getCenter, 2),
          centerY = _this$getCenter2[1];

      var startY = centerY - deltaY;

      var _this$mapState$getVie = this.mapState.getViewportProps(),
          width = _this$mapState$getVie.width,
          height = _this$mapState$getVie.height;

      var deltaScaleX = deltaX / width;
      var deltaScaleY = 0;

      if (deltaY > 0) {
        if (Math.abs(height - startY) > PITCH_MOUSE_THRESHOLD) {
          deltaScaleY = deltaY / (startY - height) * PITCH_ACCEL;
        }
      } else if (deltaY < 0) {
        if (startY > PITCH_MOUSE_THRESHOLD) {
          deltaScaleY = 1 - centerY / startY;
        }
      }

      deltaScaleY = Math.min(1, Math.max(-1, deltaScaleY));
      var newMapState = this.mapState.rotate({
        deltaScaleX: deltaScaleX,
        deltaScaleY: deltaScaleY
      });
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isRotating: true
      });
      return true;
    }
  }, {
    key: "_onWheel",
    value: function _onWheel(event) {
      if (!this.scrollZoom) {
        return false;
      }

      event.preventDefault();
      var pos = this.getCenter(event);
      var delta = event.delta;
      var scale = 2 / (1 + Math.exp(-Math.abs(delta * ZOOM_ACCEL)));

      if (delta < 0 && scale !== 0) {
        scale = 1 / scale;
      }

      var newMapState = this.mapState.zoom({
        pos: pos,
        scale: scale
      });
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isZooming: true
      });

      this._onWheelEnd();

      return true;
    }
  }, {
    key: "_onWheelEnd",
    value: function _onWheelEnd() {
      this.setState({
        isZooming: false
      });
    }
  }, {
    key: "_onPinchStart",
    value: function _onPinchStart(event) {
      var pos = this.getCenter(event);
      var newMapState = this.mapState.zoomStart({
        pos: pos
      }).rotateStart({
        pos: pos
      });
      this._state.startPinchRotation = event.rotation;
      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isDragging: true
      });
      return true;
    }
  }, {
    key: "_onPinch",
    value: function _onPinch(event) {
      if (!this.touchZoom && !this.touchRotate) {
        return false;
      }

      var newMapState = this.mapState;

      if (this.touchZoom) {
        var scale = event.scale;
        var pos = this.getCenter(event);
        newMapState = newMapState.zoom({
          pos: pos,
          scale: scale
        });
      }

      if (this.touchRotate) {
        var rotation = event.rotation;
        var startPinchRotation = this._state.startPinchRotation;
        newMapState = newMapState.rotate({
          deltaScaleX: -(rotation - startPinchRotation) / 180
        });
      }

      this.updateViewport(newMapState, NO_TRANSITION_PROPS, {
        isDragging: true,
        isPanning: this.touchZoom,
        isZooming: this.touchZoom,
        isRotating: this.touchRotate
      });
      return true;
    }
  }, {
    key: "_onPinchEnd",
    value: function _onPinchEnd(event) {
      var newMapState = this.mapState.zoomEnd().rotateEnd();
      this._state.startPinchRotation = 0;
      this.updateViewport(newMapState, null, {
        isDragging: false,
        isPanning: false,
        isZooming: false,
        isRotating: false
      });
      return true;
    }
  }, {
    key: "_onDoubleTap",
    value: function _onDoubleTap(event) {
      if (!this.doubleClickZoom) {
        return false;
      }

      var pos = this.getCenter(event);
      var isZoomOut = this.isFunctionKeyPressed(event);
      var newMapState = this.mapState.zoom({
        pos: pos,
        scale: isZoomOut ? 0.5 : 2
      });
      this.updateViewport(newMapState, Object.assign({}, LINEAR_TRANSITION_PROPS, {
        transitionInterpolator: new _transition.LinearInterpolator({
          around: pos
        })
      }), {
        isZooming: true
      });
      return true;
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      if (!this.keyboard) {
        return false;
      }

      var funcKey = this.isFunctionKeyPressed(event);
      var mapStateProps = this.mapStateProps;
      var newMapState;

      switch (event.srcEvent.keyCode) {
        case 189:
          if (funcKey) {
            newMapState = this.getMapState({
              zoom: mapStateProps.zoom - 2
            });
          } else {
            newMapState = this.getMapState({
              zoom: mapStateProps.zoom - 1
            });
          }

          break;

        case 187:
          if (funcKey) {
            newMapState = this.getMapState({
              zoom: mapStateProps.zoom + 2
            });
          } else {
            newMapState = this.getMapState({
              zoom: mapStateProps.zoom + 1
            });
          }

          break;

        case 37:
          if (funcKey) {
            newMapState = this.getMapState({
              bearing: mapStateProps.bearing - 15
            });
          } else {
            newMapState = this.mapState.pan({
              pos: [100, 0],
              startPos: [0, 0]
            });
          }

          break;

        case 39:
          if (funcKey) {
            newMapState = this.getMapState({
              bearing: mapStateProps.bearing + 15
            });
          } else {
            newMapState = this.mapState.pan({
              pos: [-100, 0],
              startPos: [0, 0]
            });
          }

          break;

        case 38:
          if (funcKey) {
            newMapState = this.getMapState({
              pitch: mapStateProps.pitch + 10
            });
          } else {
            newMapState = this.mapState.pan({
              pos: [0, 100],
              startPos: [0, 0]
            });
          }

          break;

        case 40:
          if (funcKey) {
            newMapState = this.getMapState({
              pitch: mapStateProps.pitch - 10
            });
          } else {
            newMapState = this.mapState.pan({
              pos: [0, -100],
              startPos: [0, 0]
            });
          }

          break;

        default:
          return false;
      }

      return this.updateViewport(newMapState, LINEAR_TRANSITION_PROPS);
    }
  }]);
  return MapController;
}();

exports["default"] = MapController;
//# sourceMappingURL=map-controller.js.map

/***/ }),

/***/ "w2uB":
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "xzYX":
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "za9Z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("WVW/");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("+9AK"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("SDdp"));

var _createClass2 = _interopRequireDefault(__webpack_require__("NP6S"));

var _hammer = __webpack_require__("ZIYu");

var _wheelInput = _interopRequireDefault(__webpack_require__("nfsg"));

var _moveInput = _interopRequireDefault(__webpack_require__("lwac"));

var _keyInput = _interopRequireDefault(__webpack_require__("OMdT"));

var _contextmenuInput = _interopRequireDefault(__webpack_require__("1INm"));

var _eventRegistrar = _interopRequireDefault(__webpack_require__("HdUV"));

var _constants = __webpack_require__("LlPl");

var DEFAULT_OPTIONS = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager: _hammer.Manager,
  touchAction: 'none',
  tabIndex: 0
};

var EventManager = function () {
  function EventManager() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, EventManager);
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.events = new Map();
    this._onBasicInput = this._onBasicInput.bind(this);
    this._onOtherEvent = this._onOtherEvent.bind(this);
    this.setElement(element);
    var events = options.events;

    if (events) {
      this.on(events);
    }
  }

  (0, _createClass2["default"])(EventManager, [{
    key: "setElement",
    value: function setElement(element) {
      var _this = this;

      if (this.element) {
        this.destroy();
      }

      this.element = element;

      if (!element) {
        return;
      }

      var options = this.options;
      var ManagerClass = options.Manager;
      this.manager = new ManagerClass(element, {
        touchAction: options.touchAction,
        recognizers: options.recognizers || _constants.RECOGNIZERS
      }).on('hammer.input', this._onBasicInput);

      if (!options.recognizers) {
        Object.keys(_constants.RECOGNIZER_COMPATIBLE_MAP).forEach(function (name) {
          var recognizer = _this.manager.get(name);

          if (recognizer) {
            _constants.RECOGNIZER_COMPATIBLE_MAP[name].forEach(function (otherName) {
              recognizer.recognizeWith(otherName);
            });
          }
        });
      }

      for (var recognizerName in options.recognizerOptions) {
        var recognizer = this.manager.get(recognizerName);

        if (recognizer) {
          var recognizerOption = options.recognizerOptions[recognizerName];
          delete recognizerOption.enable;
          recognizer.set(recognizerOption);
        }
      }

      this.wheelInput = new _wheelInput["default"](element, this._onOtherEvent, {
        enable: false
      });
      this.moveInput = new _moveInput["default"](element, this._onOtherEvent, {
        enable: false
      });
      this.keyInput = new _keyInput["default"](element, this._onOtherEvent, {
        enable: false,
        tabIndex: options.tabIndex
      });
      this.contextmenuInput = new _contextmenuInput["default"](element, this._onOtherEvent, {
        enable: false
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
              eventAlias = _step$value[0],
              eventRegistrar = _step$value[1];

          if (!eventRegistrar.isEmpty()) {
            this._toggleRecognizer(eventRegistrar.recognizerName, true);

            this.manager.on(eventAlias, eventRegistrar.handleEvent);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.element) {
        this.wheelInput.destroy();
        this.moveInput.destroy();
        this.keyInput.destroy();
        this.contextmenuInput.destroy();
        this.manager.destroy();
        this.wheelInput = null;
        this.moveInput = null;
        this.keyInput = null;
        this.contextmenuInput = null;
        this.manager = null;
        this.element = null;
      }
    }
  }, {
    key: "on",
    value: function on(event, handler, opts) {
      this._addEventHandler(event, handler, opts, false);
    }
  }, {
    key: "once",
    value: function once(event, handler, opts) {
      this._addEventHandler(event, handler, opts, true);
    }
  }, {
    key: "watch",
    value: function watch(event, handler, opts) {
      this._addEventHandler(event, handler, opts, false, true);
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      this._removeEventHandler(event, handler);
    }
  }, {
    key: "_toggleRecognizer",
    value: function _toggleRecognizer(name, enabled) {
      var manager = this.manager;

      if (!manager) {
        return;
      }

      var recognizer = manager.get(name);

      if (recognizer && recognizer.options.enable !== enabled) {
        recognizer.set({
          enable: enabled
        });
        var fallbackRecognizers = _constants.RECOGNIZER_FALLBACK_MAP[name];

        if (fallbackRecognizers && !this.options.recognizers) {
          fallbackRecognizers.forEach(function (otherName) {
            var otherRecognizer = manager.get(otherName);

            if (enabled) {
              otherRecognizer.requireFailure(name);
              recognizer.dropRequireFailure(otherName);
            } else {
              otherRecognizer.dropRequireFailure(name);
            }
          });
        }
      }

      this.wheelInput.enableEventType(name, enabled);
      this.moveInput.enableEventType(name, enabled);
      this.keyInput.enableEventType(name, enabled);
      this.contextmenuInput.enableEventType(name, enabled);
    }
  }, {
    key: "_addEventHandler",
    value: function _addEventHandler(event, handler, opts, once, passive) {
      if (typeof event !== 'string') {
        opts = handler;

        for (var eventName in event) {
          this._addEventHandler(eventName, event[eventName], opts, once, passive);
        }

        return;
      }

      var manager = this.manager,
          events = this.events;
      var eventAlias = _constants.GESTURE_EVENT_ALIASES[event] || event;
      var eventRegistrar = events.get(eventAlias);

      if (!eventRegistrar) {
        eventRegistrar = new _eventRegistrar["default"](this);
        events.set(eventAlias, eventRegistrar);
        eventRegistrar.recognizerName = _constants.EVENT_RECOGNIZER_MAP[eventAlias] || eventAlias;

        if (manager) {
          manager.on(eventAlias, eventRegistrar.handleEvent);
        }
      }

      eventRegistrar.add(event, handler, opts, once, passive);

      if (!eventRegistrar.isEmpty()) {
        this._toggleRecognizer(eventRegistrar.recognizerName, true);
      }
    }
  }, {
    key: "_removeEventHandler",
    value: function _removeEventHandler(event, handler) {
      if (typeof event !== 'string') {
        for (var eventName in event) {
          this._removeEventHandler(eventName, event[eventName]);
        }

        return;
      }

      var events = this.events;
      var eventAlias = _constants.GESTURE_EVENT_ALIASES[event] || event;
      var eventRegistrar = events.get(eventAlias);

      if (!eventRegistrar) {
        return;
      }

      eventRegistrar.remove(event, handler);

      if (eventRegistrar.isEmpty()) {
        var recognizerName = eventRegistrar.recognizerName;
        var isRecognizerUsed = false;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = events.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var eh = _step2.value;

            if (eh.recognizerName === recognizerName && !eh.isEmpty()) {
              isRecognizerUsed = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (!isRecognizerUsed) {
          this._toggleRecognizer(recognizerName, false);
        }
      }
    }
  }, {
    key: "_onBasicInput",
    value: function _onBasicInput(event) {
      var srcEvent = event.srcEvent;
      var alias = _constants.BASIC_EVENT_ALIASES[srcEvent.type];

      if (alias) {
        this.manager.emit(alias, event);
      }
    }
  }, {
    key: "_onOtherEvent",
    value: function _onOtherEvent(event) {
      this.manager.emit(event.type, event);
    }
  }]);
  return EventManager;
}();

exports["default"] = EventManager;
//# sourceMappingURL=event-manager.js.map

/***/ })

};;