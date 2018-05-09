var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Popper from 'popper.js';

var BASE_CLASS = 'h-tooltip';
var PLACEMENT = ['top', 'left', 'right', 'bottom', 'auto'];
var SUB_PLACEMENT = ['start', 'end'];

var EVENTS = {
    ADD: 1,
    REMOVE: 2
};

var DEFAULT_OPTIONS = {
    container: false,
    delay: 200,
    instance: null, // the popper.js instance
    eventsEnabled: true,
    html: false,
    modifiers: {
        arrow: {
            element: '.tooltip-arrow'
        }
    },
    placement: '',
    placementPostfix: null, // start | end
    removeOnDestroy: true,
    title: '',
    class: '', // ex: 'tooltip-custom tooltip-other-custom'
    triggers: ['hover', 'focus'],
    offset: 5
};

var includes = function includes(stack, needle) {
    return stack.indexOf(needle) > -1;
};

var Tooltip = function () {
    function Tooltip(el) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Tooltip);

        // Tooltip._defaults = DEFAULT_OPTIONS;
        this._options = _extends({}, Tooltip._defaults, {
            onCreate: function onCreate(data) {
                _this.content(_this.tooltip.options.title);
                _this._$tt.update();
            },
            onUpdate: function onUpdate(data) {
                _this.content(_this.tooltip.options.title);
                _this._$tt.update();
            }
        }, Tooltip.filterOptions(options));

        var $tpl = this._createTooltipElement(this.options);
        document.querySelector('body').appendChild($tpl);

        this._$el = el;
        this._$tt = new Popper(el, $tpl, this._options);
        this._$tpl = $tpl;
        this._disabled = false;
        this._visible = false;
        this._clearDelay = null;
        this._setEvents();
        // this._$tt.disableEventListeners();
    }

    Tooltip.prototype.destroy = function destroy() {
        this._cleanEvents();
        document.querySelector('body').removeChild(this._$tpl);
    };

    Tooltip.prototype._createTooltipElement = function _createTooltipElement(options) {
        // wrapper
        var $popper = document.createElement('div');
        $popper.setAttribute('id', 'tooltip-' + randomId());
        $popper.setAttribute('class', BASE_CLASS + ' ' + this._options.class);
        $popper.style.display = 'none';

        // make arrow
        var $arrow = document.createElement('div');
        $arrow.setAttribute('class', 'tooltip-arrow');
        $arrow.setAttribute('x-arrow', '');
        $popper.appendChild($arrow);

        // make content container
        var $content = document.createElement('div');
        $content.setAttribute('class', 'tooltip-content');
        $popper.appendChild($content);

        return $popper;
    };

    Tooltip.prototype._events = function _events() {
        var _this2 = this;

        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EVENTS.ADD;

        var evtType = type === EVENTS.ADD ? 'addEventListener' : 'removeEventListener';
        if (!Array.isArray(this.options.triggers)) {
            console.error('trigger should be an array', this.options.triggers);
            return;
        }

        var lis = function lis() {
            var _$el;

            return (_$el = _this2._$el)[evtType].apply(_$el, arguments);
        };

        if (includes(this.options.triggers, 'manual')) {
            lis('click', this._onToggle.bind(this), false);
        } else {
            this.options.triggers.map(function (evt) {
                switch (evt) {
                    case 'click':
                        lis('click', _this2._onToggle.bind(_this2), false);
                        document[evtType]('click', _this2._onDeactivate.bind(_this2), false);
                        break;
                    case 'hover':
                        lis('mouseenter', _this2._onActivate.bind(_this2), false);
                        lis('mouseleave', _this2._onDeactivate.bind(_this2), false);
                        break;
                    case 'focus':
                        lis('focus', _this2._onActivate.bind(_this2), false);
                        lis('blur', _this2._onDeactivate.bind(_this2), true);
                        break;
                }
            });

            if (includes(this.options.triggers, 'hover') || includes(this.options.triggers, 'focus')) {
                this._$tpl[evtType]('mouseenter', this._onMouseOverTooltip.bind(this), false);
                this._$tpl[evtType]('mouseleave', this._onMouseOutTooltip.bind(this), false);
            }
        }
    };

    Tooltip.prototype._setEvents = function _setEvents() {
        this._events();
    };

    Tooltip.prototype._cleanEvents = function _cleanEvents() {
        this._events(EVENTS.REMOVE);
    };

    Tooltip.prototype._onActivate = function _onActivate(e) {
        this.show();
    };

    Tooltip.prototype._onDeactivate = function _onDeactivate(e) {
        this.hide();
    };

    Tooltip.prototype._onToggle = function _onToggle(e) {
        e.stopPropagation();
        e.preventDefault();
        this.toggle();
    };

    Tooltip.prototype._onMouseOverTooltip = function _onMouseOverTooltip(e) {
        this.toggle(true, false);
    };

    Tooltip.prototype._onMouseOutTooltip = function _onMouseOutTooltip(e) {
        this.toggle(false);
    };

    Tooltip.prototype.content = function content(_content) {
        var wrapper = this.tooltip.popper.querySelector('.tooltip-content');
        if (typeof _content === 'string') {
            this.tooltip.options.title = _content;
            wrapper.textContent = _content;
        } else if (isElement(_content)) {
            if (_content !== wrapper.children[0]) {
                wrapper.innerHTML = '';
                wrapper.appendChild(_content);
            }
            // var clonedNode = content.cloneNode(true);
            // this.tooltip.options.title = clonedNode;
            // if (isElement(content.parentNode)) {
            //     content.parentNode.removeChild(content);
            // }
        } else {
            console.error('unsupported content type', _content);
        }
    };

    Tooltip.filterOptions = function filterOptions(options) {
        var opt = _extends({}, options);

        opt.modifiers = {};
        var head = null;
        var tail = null;
        if (opt.placement.indexOf('-') > -1) {
            var _opt$placement$split = opt.placement.split('-');

            head = _opt$placement$split[0];
            tail = _opt$placement$split[1];

            opt.placement = includes(PLACEMENT, head) && includes(SUB_PLACEMENT, tail) ? opt.placement : Tooltip._defaults.placement;
        } else {
            opt.placement = includes(PLACEMENT, opt.placement) ? opt.placement : Tooltip._defaults.placement;
        }

        opt.modifiers.offset = {
            fn: Tooltip._setOffset
        };

        return opt;
    };

    Tooltip._setOffset = function _setOffset(data, opts) {
        var offset = data.instance.options.offset;

        if (window.isNaN(offset) || offset < 0) {
            offset = Tooltip._defaults.offset;
        }

        if (data.placement.indexOf('top') !== -1) {
            data.offsets.popper.top -= offset;
        } else if (data.placement.indexOf('right') !== -1) {
            data.offsets.popper.left += offset;
        } else if (data.placement.indexOf('bottom') !== -1) {
            data.offsets.popper.top += offset;
        } else if (data.placement.indexOf('left') !== -1) {
            data.offsets.popper.left -= offset;
        }

        return data;
    };

    Tooltip.defaults = function defaults(data) {
        // if (data.placement) {
        //     data.originalPlacement = data.placement;
        // }
        Tooltip._defaults = _extends({}, Tooltip._defaults, data);
    };

    Tooltip.prototype.show = function show() {
        this.toggle(true);
    };

    Tooltip.prototype.hide = function hide() {
        this.toggle(false);
    };

    Tooltip.prototype.toggle = function toggle(visible) {
        var _this3 = this;

        var autoHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var delay = this._options.delay;

        if (this._disabled === true) {
            visible = false;
            delay = 0;
            return;
        }

        if (typeof visible !== 'boolean') {
            visible = !this._visible;
        }

        if (visible === true) {
            delay = 0;
        }

        clearTimeout(this._clearDelay);

        if (autoHide === true) {
            this._clearDelay = setTimeout(function () {
                _this3._visible = visible;
                _this3._$tt.popper.style.display = _this3._visible === true ? 'inline-block' : 'none';
                _this3._$tt.update();
            }, delay);
        }
    };

    _createClass(Tooltip, [{
        key: 'options',
        get: function get() {
            return _extends({}, this._options);
        }
    }, {
        key: 'tooltip',
        get: function get() {
            return this._$tt;
        }
    }, {
        key: 'class',
        set: function set(val) {
            if (typeof val === 'string') {
                var classList = this._$tpl.classList.value.replace(this.options.class, val);
                this._options.class = classList;
                this._$tpl.setAttribute('class', classList);
            }
        }
    }, {
        key: 'disabled',
        set: function set(val) {
            if (typeof val === 'boolean') {
                this._disabled = val;
            }
        }
    }]);

    return Tooltip;
}();

export default Tooltip;


Tooltip._defaults = _extends({}, DEFAULT_OPTIONS);

function randomId() {
    return Date.now() + '-' + Math.round(Math.random() * 100000000);
}

/**
 * Check if the variable is an html element
 * @param {*} value
 * @return Boolean
 */
function isElement(value) {
    return value instanceof window.Element;
}