//@prepros-prepend vendor/jquery-3.2.1.min.js
//@prepros-prepend vendor/handlebars-v4.0.5.js
//@prepros-prepend vendor/flowplayer/flowplayer.min.js
//@prepros-prepend vendor/hlsjs/hls.min.js
//@prepros-prepend vendor/flowplayer/flowplayer.hlsjs.min.js
//@prepros-prepend vendor/persian-date.js
//@prepros-prepend vendor/persian-datepicker-0.4.5.min.js
//@prepros-prepend vendor/jquery.slimscroll.min.js
//@prepros-prepend vendor/jquery-ui.min_1.js

/*!
 
 Speed menu plugin for Flowplayer HTML5
 
 Copyright (c) 2017, Flowplayer Drive Oy
 
 Released under the MIT License:
 http://www.opensource.org/licenses/mit-license.php
 
 Requires Flowplayer HTML5 version 7.x or greater
 $GIT_DESC$
 
 */
(function () {
    var extension = function (flowplayer) {
        flowplayer(function (api, root) {
            var support = flowplayer.support;
            if (!support.video || !support.inlineVideo)
                return;
            var common = flowplayer.common
                    , bean = flowplayer.bean
                    , ui = common.find('.fp-ui', root)[0]
                    , controlbar = common.find('.fp-controls', ui)[0]
                    , speeds = api.conf.speeds;

            bean.on(root, 'click', '.fp-speed', function () {
                var menu = common.find('.fp-speed-menu', root)[0];
                if (common.hasClass(menu, 'fp-active'))
                    api.hideMenu();
                else
                    api.showMenu(menu);
            });

            bean.on(root, 'click', '.fp-speed-menu a', function (ev) {
                var s = ev.target.getAttribute('data-speed');
                api.speed(s);
            });

            api.on('speed', function (ev, _a, rate) {
                if (speeds.length > 1) {
                    selectSpeed(rate);
                }
            })
                    .on('ready', function (ev, api) {
                        removeMenu();
                        speeds = api.conf.speeds;
                        if (speeds.length > 1) {
                            createMenu();
                        }
                    });

            function removeMenu() {
                common.find('.fp-speed-menu', root).forEach(common.removeNode);
                common.find('.fp-speed', root).forEach(common.removeNode);
            }

            function round(val) {
                return Math.round(val * 100) / 100;
            }

            function createMenu() {
                controlbar.appendChild(common.createElement('strong', {className: 'fp-speed'}, api.currentSpeed + 'x'));
                var menu = common.createElement('div', {className: 'fp-menu fp-speed-menu', css: {width: 'auto'}}, '<strong>Speed</strong>');
                speeds.forEach(function (s) {
                    var a = common.createElement('a', {'data-speed': round(s)}, round(s) + 'x');
                    menu.appendChild(a);
                });
                ui.appendChild(menu);
                selectSpeed(api.currentSpeed);
            }

            function selectSpeed(rate) {
                common.find('.fp-speed', root)[0].innerHTML = rate + 'x';
                common.find('.fp-speed-menu a', root).forEach(function (el) {
                    common.toggleClass(el, 'fp-selected', el.getAttribute('data-speed') == rate);
                    common.toggleClass(el, 'fp-color', el.getAttribute('data-speed') == rate);
                });
            }
        });
    };

    if (typeof module === 'object' && module.exports)
        module.exports = extension;
    else if (typeof window.flowplayer === 'function')
        extension(window.flowplayer);
})();


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function ($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for (var i = types.length; i; ) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var i = types.length; i; ) {
                    this.addEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function () {
            if (this.removeEventListener) {
                for (var i = types.length; i; ) {
                    this.removeEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) {
            delta = orgEvent.wheelDelta / 120;
        }
        if (orgEvent.detail) {
            delta = -orgEvent.detail / 3;
        }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY / 120;
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);