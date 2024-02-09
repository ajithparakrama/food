(() => {
    "use strict";

    function t(t) {
        return function (t) {
            if (Array.isArray(t)) return e(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || function (t, n) {
            if (!t) return;
            if ("string" == typeof t) return e(t, n);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === r && t.constructor && (r = t.constructor.name);
            if ("Map" === r || "Set" === r) return Array.from(t);
            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return e(t, n)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function e(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function n(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function r(t) {
        for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2 ? n(Object(r), !0).forEach((function (e) {
                i(t, e, r[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
            }))
        }
        return t
    }

    function i(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function a(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var s = {
        alwaysOpen: !1,
        activeClasses: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white",
        inactiveClasses: "text-gray-500 dark:text-gray-400",
        onOpen: function () {
        },
        onClose: function () {
        },
        onToggle: function () {
        }
    }, c = function () {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            o(this, e), this._items = t, this._options = r(r({}, s), n), this._init()
        }

        var n, i, c;
        return n = e, (i = [{
            key: "_init", value: function () {
                var t = this;
                this._items.length && this._items.map((function (e) {
                    e.active && t.open(e.id), e.triggerEl.addEventListener("click", (function () {
                        t.toggle(e.id)
                    }))
                }))
            }
        }, {
            key: "getItem", value: function (t) {
                return this._items.filter((function (e) {
                    return e.id === t
                }))[0]
            }
        }, {
            key: "open", value: function (e) {
                var n, r, i = this, o = this.getItem(e);
                this._options.alwaysOpen || this._items.map((function (e) {
                    var n, r;
                    e !== o && ((n = e.triggerEl.classList).remove.apply(n, t(i._options.activeClasses.split(" "))), (r = e.triggerEl.classList).add.apply(r, t(i._options.inactiveClasses.split(" "))), e.targetEl.classList.add("hidden"), e.triggerEl.setAttribute("aria-expanded", !1), e.active = !1, e.iconEl && e.iconEl.classList.remove("rotate-180"))
                })), (n = o.triggerEl.classList).add.apply(n, t(this._options.activeClasses.split(" "))), (r = o.triggerEl.classList).remove.apply(r, t(this._options.inactiveClasses.split(" "))), o.triggerEl.setAttribute("aria-expanded", !0), o.targetEl.classList.remove("hidden"), o.active = !0, o.iconEl && o.iconEl.classList.add("rotate-180"), this._options.onOpen(this, o)
            }
        }, {
            key: "toggle", value: function (t) {
                var e = this.getItem(t);
                e.active ? this.close(t) : this.open(t), this._options.onToggle(this, e)
            }
        }, {
            key: "close", value: function (e) {
                var n, r, i = this.getItem(e);
                (n = i.triggerEl.classList).remove.apply(n, t(this._options.activeClasses.split(" "))), (r = i.triggerEl.classList).add.apply(r, t(this._options.inactiveClasses.split(" "))), i.targetEl.classList.add("hidden"), i.triggerEl.setAttribute("aria-expanded", !1), i.active = !1, i.iconEl && i.iconEl.classList.remove("rotate-180"), this._options.onClose(this, i)
            }
        }]) && a(n.prototype, i), c && a(n, c), Object.defineProperty(n, "prototype", {writable: !1}), e
    }();

    function l() {
        document.querySelectorAll("[data-accordion]").forEach((function (t) {
            var e = t.getAttribute("data-accordion"), n = t.getAttribute("data-active-classes"),
                r = t.getAttribute("data-inactive-classes"), i = [];
            t.querySelectorAll("[data-accordion-target]").forEach((function (t) {
                var e = {
                    id: t.getAttribute("data-accordion-target"),
                    triggerEl: t,
                    targetEl: document.querySelector(t.getAttribute("data-accordion-target")),
                    iconEl: t.querySelector("[data-accordion-icon]"),
                    active: "true" === t.getAttribute("aria-expanded")
                };
                i.push(e)
            })), new c(i, {
                alwaysOpen: "open" === e,
                activeClasses: n || s.activeClasses,
                inactiveClasses: r || s.inactiveClasses
            })
        }))
    }

    window.Accordion = c, "loading" !== document.readyState ? l() : document.addEventListener("DOMContentLoaded", l);

    function u(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function f(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? u(Object(n), !0).forEach((function (e) {
                d(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function d(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function p(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function h(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var g = {
        triggerEl: null, onCollapse: function () {
        }, onExpand: function () {
        }, onToggle: function () {
        }
    }, v = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                n = arguments.length > 1 ? arguments[1] : void 0;
            p(this, t), this._targetEl = e, this._triggerEl = n ? n.triggerEl : g.triggerEl, this._options = f(f({}, g), n), this._visible = !1, this._init()
        }

        var e, n, r;
        return e = t, (n = [{
            key: "_init", value: function () {
                var t = this;
                this._triggerEl && (this._triggerEl.hasAttribute("aria-expanded") ? this._visible = "true" === this._triggerEl.getAttribute("aria-expanded") : this._visible = !this._targetEl.classList.contains("hidden"), this._triggerEl.addEventListener("click", (function () {
                    t._visible ? t.collapse() : t.expand()
                })))
            }
        }, {
            key: "collapse", value: function () {
                this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = !1, this._options.onCollapse(this)
            }
        }, {
            key: "expand", value: function () {
                this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = !0, this._options.onExpand(this)
            }
        }, {
            key: "toggle", value: function () {
                this._visible ? this.collapse() : this.expand()
            }
        }]) && h(e.prototype, n), r && h(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();

    function b() {
        document.querySelectorAll("[data-collapse-toggle]").forEach((function (t) {
            var e = document.getElementById(t.getAttribute("data-collapse-toggle"));
            new v(e, {triggerEl: t})
        }))
    }

    window.Collapse = v, "loading" !== document.readyState ? b() : document.addEventListener("DOMContentLoaded", b);

    function m(t) {
        return function (t) {
            if (Array.isArray(t)) return y(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return y(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return y(t, e)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function y(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function w(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function _(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? w(Object(n), !0).forEach((function (e) {
                O(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : w(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function O(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function E(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function j(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var k = {
        defaultPosition: 0,
        indicators: {
            items: [],
            activeClasses: "bg-white dark:bg-gray-800",
            inactiveClasses: "bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
        },
        interval: 3e3,
        onNext: function () {
        },
        onPrev: function () {
        },
        onChange: function () {
        }
    }, A = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            E(this, t), this._items = e, this._options = _(_(_({}, k), n), {}, {indicators: _(_({}, k.indicators), n.indicators)}), this._activeItem = this.getItem(this._options.defaultPosition), this._indicators = this._options.indicators.items, this._interval = null, this._init()
        }

        var e, n, r;
        return e = t, (n = [{
            key: "_init", value: function () {
                var t = this;
                this._items.map((function (t) {
                    t.el.classList.add("absolute", "inset-0", "transition-all", "transform")
                })), this._getActiveItem() ? this.slideTo(this._getActiveItem().position) : this.slideTo(0), this._indicators.map((function (e, n) {
                    e.el.addEventListener("click", (function () {
                        t.slideTo(n)
                    }))
                }))
            }
        }, {
            key: "getItem", value: function (t) {
                return this._items[t]
            }
        }, {
            key: "slideTo", value: function (t) {
                var e = this._items[t], n = {
                    left: 0 === e.position ? this._items[this._items.length - 1] : this._items[e.position - 1],
                    middle: e,
                    right: e.position === this._items.length - 1 ? this._items[0] : this._items[e.position + 1]
                };
                this._rotate(n), this._setActiveItem(e.position), this._interval && (this.pause(), this.cycle()), this._options.onChange(this)
            }
        }, {
            key: "next", value: function () {
                var t = this._getActiveItem(), e = null;
                e = t.position === this._items.length - 1 ? this._items[0] : this._items[t.position + 1], this.slideTo(e.position), this._options.onNext(this)
            }
        }, {
            key: "prev", value: function () {
                var t = this._getActiveItem(), e = null;
                e = 0 === t.position ? this._items[this._items.length - 1] : this._items[t.position - 1], this.slideTo(e.position), this._options.onPrev(this)
            }
        }, {
            key: "_rotate", value: function (t) {
                this._items.map((function (t) {
                    t.el.classList.add("hidden")
                })), t.left.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), t.left.el.classList.add("-translate-x-full", "z-10"), t.middle.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-10"), t.middle.el.classList.add("translate-x-0", "z-20"), t.right.el.classList.remove("-translate-x-full", "translate-x-full", "translate-x-0", "hidden", "z-20"), t.right.el.classList.add("translate-x-full", "z-10")
            }
        }, {
            key: "cycle", value: function () {
                var t = this;
                this._interval = setInterval((function () {
                    t.next()
                }), this._options.interval)
            }
        }, {
            key: "pause", value: function () {
                clearInterval(this._interval)
            }
        }, {
            key: "_getActiveItem", value: function () {
                return this._activeItem
            }
        }, {
            key: "_setActiveItem", value: function (t) {
                var e, n, r = this;
                this._activeItem = this._items[t], this._indicators.length && (this._indicators.map((function (t) {
                    var e, n;
                    t.el.setAttribute("aria-current", "false"), (e = t.el.classList).remove.apply(e, m(r._options.indicators.activeClasses.split(" "))), (n = t.el.classList).add.apply(n, m(r._options.indicators.inactiveClasses.split(" ")))
                })), (e = this._indicators[t].el.classList).add.apply(e, m(this._options.indicators.activeClasses.split(" "))), (n = this._indicators[t].el.classList).remove.apply(n, m(this._options.indicators.inactiveClasses.split(" "))), this._indicators[t].el.setAttribute("aria-current", "true"))
            }
        }]) && j(e.prototype, n), r && j(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();

    function P() {
        document.querySelectorAll("[data-carousel]").forEach((function (t) {
            var e = t.getAttribute("data-carousel-interval"), n = "slide" === t.getAttribute("data-carousel"), r = [],
                i = 0;
            t.querySelectorAll("[data-carousel-item]").length && m(t.querySelectorAll("[data-carousel-item]")).map((function (t, e) {
                r.push({position: e, el: t}), "active" === t.getAttribute("data-carousel-item") && (i = e)
            }));
            var o = [];
            t.querySelectorAll("[data-carousel-slide-to]").length && m(t.querySelectorAll("[data-carousel-slide-to]")).map((function (t) {
                o.push({position: t.getAttribute("data-carousel-slide-to"), el: t})
            }));
            var a = new A(r, {defaultPosition: i, indicators: {items: o}, interval: e || k.interval});
            n && a.cycle();
            var s = t.querySelector("[data-carousel-next]"), c = t.querySelector("[data-carousel-prev]");
            s && s.addEventListener("click", (function () {
                a.next()
            })), c && c.addEventListener("click", (function () {
                a.prev()
            }))
        }))
    }

    window.Carousel = A, "loading" !== document.readyState ? P() : document.addEventListener("DOMContentLoaded", P);

    function x(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function L(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? x(Object(n), !0).forEach((function (e) {
                S(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : x(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function S(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function C(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function D(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var T = {
        triggerEl: null, transition: "transition-opacity", duration: 300, timing: "ease-out", onHide: function () {
        }
    }, I = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            C(this, t), this._targetEl = e, this._triggerEl = n ? n.triggerEl : T.triggerEl, this._options = L(L({}, T), n), this._init()
        }

        var e, n, r;
        return e = t, (n = [{
            key: "_init", value: function () {
                var t = this;
                this._triggerEl && this._triggerEl.addEventListener("click", (function () {
                    t.hide()
                }))
            }
        }, {
            key: "hide", value: function () {
                var t = this;
                this._targetEl.classList.add(this._options.transition, "duration-".concat(this._options.duration), this._options.timing, "opacity-0"), setTimeout((function () {
                    t._targetEl.classList.add("hidden")
                }), this._options.duration), this._options.onHide(this, this._targetEl)
            }
        }]) && D(e.prototype, n), r && D(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();

    function q() {
        document.querySelectorAll("[data-dismiss-target]").forEach((function (t) {
            var e = document.querySelector(t.getAttribute("data-dismiss-target"));
            new I(e, {triggerEl: t})
        }))
    }

    window.Dismiss = I, "loading" !== document.readyState ? q() : document.addEventListener("DOMContentLoaded", q);

    function M(t) {
        if (null == t) return window;
        if ("[object Window]" !== t.toString()) {
            var e = t.ownerDocument;
            return e && e.defaultView || window
        }
        return t
    }

    function H(t) {
        return t instanceof M(t).Element || t instanceof Element
    }

    function B(t) {
        return t instanceof M(t).HTMLElement || t instanceof HTMLElement
    }

    function W(t) {
        return "undefined" != typeof ShadowRoot && (t instanceof M(t).ShadowRoot || t instanceof ShadowRoot)
    }

    var R = Math.max, V = Math.min, U = Math.round;

    function z(t, e) {
        void 0 === e && (e = !1);
        var n = t.getBoundingClientRect(), r = 1, i = 1;
        if (B(t) && e) {
            var o = t.offsetHeight, a = t.offsetWidth;
            a > 0 && (r = U(n.width) / a || 1), o > 0 && (i = U(n.height) / o || 1)
        }
        return {
            width: n.width / r,
            height: n.height / i,
            top: n.top / i,
            right: n.right / r,
            bottom: n.bottom / i,
            left: n.left / r,
            x: n.left / r,
            y: n.top / i
        }
    }

    function N(t) {
        var e = M(t);
        return {scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset}
    }

    function $(t) {
        return t ? (t.nodeName || "").toLowerCase() : null
    }

    function F(t) {
        return ((H(t) ? t.ownerDocument : t.document) || window.document).documentElement
    }

    function X(t) {
        return z(F(t)).left + N(t).scrollLeft
    }

    function Y(t) {
        return M(t).getComputedStyle(t)
    }

    function G(t) {
        var e = Y(t), n = e.overflow, r = e.overflowX, i = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + i + r)
    }

    function J(t, e, n) {
        void 0 === n && (n = !1);
        var r, i, o = B(e), a = B(e) && function (t) {
            var e = t.getBoundingClientRect(), n = U(e.width) / t.offsetWidth || 1,
                r = U(e.height) / t.offsetHeight || 1;
            return 1 !== n || 1 !== r
        }(e), s = F(e), c = z(t, a), l = {scrollLeft: 0, scrollTop: 0}, u = {x: 0, y: 0};
        return (o || !o && !n) && (("body" !== $(e) || G(s)) && (l = (r = e) !== M(r) && B(r) ? {
            scrollLeft: (i = r).scrollLeft,
            scrollTop: i.scrollTop
        } : N(r)), B(e) ? ((u = z(e, !0)).x += e.clientLeft, u.y += e.clientTop) : s && (u.x = X(s))), {
            x: c.left + l.scrollLeft - u.x,
            y: c.top + l.scrollTop - u.y,
            width: c.width,
            height: c.height
        }
    }

    function K(t) {
        var e = z(t), n = t.offsetWidth, r = t.offsetHeight;
        return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
            x: t.offsetLeft,
            y: t.offsetTop,
            width: n,
            height: r
        }
    }

    function Q(t) {
        return "html" === $(t) ? t : t.assignedSlot || t.parentNode || (W(t) ? t.host : null) || F(t)
    }

    function Z(t) {
        return ["html", "body", "#document"].indexOf($(t)) >= 0 ? t.ownerDocument.body : B(t) && G(t) ? t : Z(Q(t))
    }

    function tt(t, e) {
        var n;
        void 0 === e && (e = []);
        var r = Z(t), i = r === (null == (n = t.ownerDocument) ? void 0 : n.body), o = M(r),
            a = i ? [o].concat(o.visualViewport || [], G(r) ? r : []) : r, s = e.concat(a);
        return i ? s : s.concat(tt(Q(a)))
    }

    function et(t) {
        return ["table", "td", "th"].indexOf($(t)) >= 0
    }

    function nt(t) {
        return B(t) && "fixed" !== Y(t).position ? t.offsetParent : null
    }

    function rt(t) {
        for (var e = M(t), n = nt(t); n && et(n) && "static" === Y(n).position;) n = nt(n);
        return n && ("html" === $(n) || "body" === $(n) && "static" === Y(n).position) ? e : n || function (t) {
            var e = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            if (-1 !== navigator.userAgent.indexOf("Trident") && B(t) && "fixed" === Y(t).position) return null;
            for (var n = Q(t); B(n) && ["html", "body"].indexOf($(n)) < 0;) {
                var r = Y(n);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || e && "filter" === r.willChange || e && r.filter && "none" !== r.filter) return n;
                n = n.parentNode
            }
            return null
        }(t) || e
    }

    var it = "top", ot = "bottom", at = "right", st = "left", ct = "auto", lt = [it, ot, at, st], ut = "start",
        ft = "end", dt = "viewport", pt = "popper", ht = lt.reduce((function (t, e) {
            return t.concat([e + "-" + ut, e + "-" + ft])
        }), []), gt = [].concat(lt, [ct]).reduce((function (t, e) {
            return t.concat([e, e + "-" + ut, e + "-" + ft])
        }), []),
        vt = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function bt(t) {
        var e = new Map, n = new Set, r = [];

        function i(t) {
            n.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach((function (t) {
                if (!n.has(t)) {
                    var r = e.get(t);
                    r && i(r)
                }
            })), r.push(t)
        }

        return t.forEach((function (t) {
            e.set(t.name, t)
        })), t.forEach((function (t) {
            n.has(t.name) || i(t)
        })), r
    }

    var mt = {placement: "bottom", modifiers: [], strategy: "absolute"};

    function yt() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
        return !e.some((function (t) {
            return !(t && "function" == typeof t.getBoundingClientRect)
        }))
    }

    function wt(t) {
        void 0 === t && (t = {});
        var e = t, n = e.defaultModifiers, r = void 0 === n ? [] : n, i = e.defaultOptions, o = void 0 === i ? mt : i;
        return function (t, e, n) {
            void 0 === n && (n = o);
            var i, a, s = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, mt, o),
                modifiersData: {},
                elements: {reference: t, popper: e},
                attributes: {},
                styles: {}
            }, c = [], l = !1, u = {
                state: s, setOptions: function (n) {
                    var i = "function" == typeof n ? n(s.options) : n;
                    f(), s.options = Object.assign({}, o, s.options, i), s.scrollParents = {
                        reference: H(t) ? tt(t) : t.contextElement ? tt(t.contextElement) : [],
                        popper: tt(e)
                    };
                    var a = function (t) {
                        var e = bt(t);
                        return vt.reduce((function (t, n) {
                            return t.concat(e.filter((function (t) {
                                return t.phase === n
                            })))
                        }), [])
                    }(function (t) {
                        var e = t.reduce((function (t, e) {
                            var n = t[e.name];
                            return t[e.name] = n ? Object.assign({}, n, e, {
                                options: Object.assign({}, n.options, e.options),
                                data: Object.assign({}, n.data, e.data)
                            }) : e, t
                        }), {});
                        return Object.keys(e).map((function (t) {
                            return e[t]
                        }))
                    }([].concat(r, s.options.modifiers)));
                    return s.orderedModifiers = a.filter((function (t) {
                        return t.enabled
                    })), s.orderedModifiers.forEach((function (t) {
                        var e = t.name, n = t.options, r = void 0 === n ? {} : n, i = t.effect;
                        if ("function" == typeof i) {
                            var o = i({state: s, name: e, instance: u, options: r}), a = function () {
                            };
                            c.push(o || a)
                        }
                    })), u.update()
                }, forceUpdate: function () {
                    if (!l) {
                        var t = s.elements, e = t.reference, n = t.popper;
                        if (yt(e, n)) {
                            s.rects = {
                                reference: J(e, rt(n), "fixed" === s.options.strategy),
                                popper: K(n)
                            }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function (t) {
                                return s.modifiersData[t.name] = Object.assign({}, t.data)
                            }));
                            for (var r = 0; r < s.orderedModifiers.length; r++) if (!0 !== s.reset) {
                                var i = s.orderedModifiers[r], o = i.fn, a = i.options, c = void 0 === a ? {} : a,
                                    f = i.name;
                                "function" == typeof o && (s = o({state: s, options: c, name: f, instance: u}) || s)
                            } else s.reset = !1, r = -1
                        }
                    }
                }, update: (i = function () {
                    return new Promise((function (t) {
                        u.forceUpdate(), t(s)
                    }))
                }, function () {
                    return a || (a = new Promise((function (t) {
                        Promise.resolve().then((function () {
                            a = void 0, t(i())
                        }))
                    }))), a
                }), destroy: function () {
                    f(), l = !0
                }
            };
            if (!yt(t, e)) return u;

            function f() {
                c.forEach((function (t) {
                    return t()
                })), c = []
            }

            return u.setOptions(n).then((function (t) {
                !l && n.onFirstUpdate && n.onFirstUpdate(t)
            })), u
        }
    }

    var _t = {passive: !0};

    function Ot(t) {
        return t.split("-")[0]
    }

    function Et(t) {
        return t.split("-")[1]
    }

    function jt(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
    }

    function kt(t) {
        var e, n = t.reference, r = t.element, i = t.placement, o = i ? Ot(i) : null, a = i ? Et(i) : null,
            s = n.x + n.width / 2 - r.width / 2, c = n.y + n.height / 2 - r.height / 2;
        switch (o) {
            case it:
                e = {x: s, y: n.y - r.height};
                break;
            case ot:
                e = {x: s, y: n.y + n.height};
                break;
            case at:
                e = {x: n.x + n.width, y: c};
                break;
            case st:
                e = {x: n.x - r.width, y: c};
                break;
            default:
                e = {x: n.x, y: n.y}
        }
        var l = o ? jt(o) : null;
        if (null != l) {
            var u = "y" === l ? "height" : "width";
            switch (a) {
                case ut:
                    e[l] = e[l] - (n[u] / 2 - r[u] / 2);
                    break;
                case ft:
                    e[l] = e[l] + (n[u] / 2 - r[u] / 2)
            }
        }
        return e
    }

    var At = {top: "auto", right: "auto", bottom: "auto", left: "auto"};

    function Pt(t) {
        var e, n = t.popper, r = t.popperRect, i = t.placement, o = t.variation, a = t.offsets, s = t.position,
            c = t.gpuAcceleration, l = t.adaptive, u = t.roundOffsets, f = t.isFixed, d = a.x, p = void 0 === d ? 0 : d,
            h = a.y, g = void 0 === h ? 0 : h, v = "function" == typeof u ? u({x: p, y: g}) : {x: p, y: g};
        p = v.x, g = v.y;
        var b = a.hasOwnProperty("x"), m = a.hasOwnProperty("y"), y = st, w = it, _ = window;
        if (l) {
            var O = rt(n), E = "clientHeight", j = "clientWidth";
            if (O === M(n) && "static" !== Y(O = F(n)).position && "absolute" === s && (E = "scrollHeight", j = "scrollWidth"), i === it || (i === st || i === at) && o === ft) w = ot, g -= (f && _.visualViewport ? _.visualViewport.height : O[E]) - r.height, g *= c ? 1 : -1;
            if (i === st || (i === it || i === ot) && o === ft) y = at, p -= (f && _.visualViewport ? _.visualViewport.width : O[j]) - r.width, p *= c ? 1 : -1
        }
        var k, A = Object.assign({position: s}, l && At), P = !0 === u ? function (t) {
            var e = t.x, n = t.y, r = window.devicePixelRatio || 1;
            return {x: U(e * r) / r || 0, y: U(n * r) / r || 0}
        }({x: p, y: g}) : {x: p, y: g};
        return p = P.x, g = P.y, c ? Object.assign({}, A, ((k = {})[w] = m ? "0" : "", k[y] = b ? "0" : "", k.transform = (_.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + g + "px)" : "translate3d(" + p + "px, " + g + "px, 0)", k)) : Object.assign({}, A, ((e = {})[w] = m ? g + "px" : "", e[y] = b ? p + "px" : "", e.transform = "", e))
    }

    const xt = {
        name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function (t) {
            var e = t.state, n = t.options, r = t.name, i = n.offset, o = void 0 === i ? [0, 0] : i,
                a = gt.reduce((function (t, n) {
                    return t[n] = function (t, e, n) {
                        var r = Ot(t), i = [st, it].indexOf(r) >= 0 ? -1 : 1,
                            o = "function" == typeof n ? n(Object.assign({}, e, {placement: t})) : n, a = o[0],
                            s = o[1];
                        return a = a || 0, s = (s || 0) * i, [st, at].indexOf(r) >= 0 ? {x: s, y: a} : {x: a, y: s}
                    }(n, e.rects, o), t
                }), {}), s = a[e.placement], c = s.x, l = s.y;
            null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += l), e.modifiersData[r] = a
        }
    };
    var Lt = {left: "right", right: "left", bottom: "top", top: "bottom"};

    function St(t) {
        return t.replace(/left|right|bottom|top/g, (function (t) {
            return Lt[t]
        }))
    }

    var Ct = {start: "end", end: "start"};

    function Dt(t) {
        return t.replace(/start|end/g, (function (t) {
            return Ct[t]
        }))
    }

    function Tt(t, e) {
        var n = e.getRootNode && e.getRootNode();
        if (t.contains(e)) return !0;
        if (n && W(n)) {
            var r = e;
            do {
                if (r && t.isSameNode(r)) return !0;
                r = r.parentNode || r.host
            } while (r)
        }
        return !1
    }

    function It(t) {
        return Object.assign({}, t, {left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height})
    }

    function qt(t, e) {
        return e === dt ? It(function (t) {
            var e = M(t), n = F(t), r = e.visualViewport, i = n.clientWidth, o = n.clientHeight, a = 0, s = 0;
            return r && (i = r.width, o = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a = r.offsetLeft, s = r.offsetTop)), {
                width: i,
                height: o,
                x: a + X(t),
                y: s
            }
        }(t)) : H(e) ? function (t) {
            var e = z(t);
            return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e
        }(e) : It(function (t) {
            var e, n = F(t), r = N(t), i = null == (e = t.ownerDocument) ? void 0 : e.body,
                o = R(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
                a = R(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
                s = -r.scrollLeft + X(t), c = -r.scrollTop;
            return "rtl" === Y(i || n).direction && (s += R(n.clientWidth, i ? i.clientWidth : 0) - o), {
                width: o,
                height: a,
                x: s,
                y: c
            }
        }(F(t)))
    }

    function Mt(t, e, n) {
        var r = "clippingParents" === e ? function (t) {
            var e = tt(Q(t)), n = ["absolute", "fixed"].indexOf(Y(t).position) >= 0 && B(t) ? rt(t) : t;
            return H(n) ? e.filter((function (t) {
                return H(t) && Tt(t, n) && "body" !== $(t)
            })) : []
        }(t) : [].concat(e), i = [].concat(r, [n]), o = i[0], a = i.reduce((function (e, n) {
            var r = qt(t, n);
            return e.top = R(r.top, e.top), e.right = V(r.right, e.right), e.bottom = V(r.bottom, e.bottom), e.left = R(r.left, e.left), e
        }), qt(t, o));
        return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
    }

    function Ht(t) {
        return Object.assign({}, {top: 0, right: 0, bottom: 0, left: 0}, t)
    }

    function Bt(t, e) {
        return e.reduce((function (e, n) {
            return e[n] = t, e
        }), {})
    }

    function Wt(t, e) {
        void 0 === e && (e = {});
        var n = e, r = n.placement, i = void 0 === r ? t.placement : r, o = n.boundary,
            a = void 0 === o ? "clippingParents" : o, s = n.rootBoundary, c = void 0 === s ? dt : s,
            l = n.elementContext, u = void 0 === l ? pt : l, f = n.altBoundary, d = void 0 !== f && f, p = n.padding,
            h = void 0 === p ? 0 : p, g = Ht("number" != typeof h ? h : Bt(h, lt)), v = u === pt ? "reference" : pt,
            b = t.rects.popper, m = t.elements[d ? v : u],
            y = Mt(H(m) ? m : m.contextElement || F(t.elements.popper), a, c), w = z(t.elements.reference),
            _ = kt({reference: w, element: b, strategy: "absolute", placement: i}), O = It(Object.assign({}, b, _)),
            E = u === pt ? O : w, j = {
                top: y.top - E.top + g.top,
                bottom: E.bottom - y.bottom + g.bottom,
                left: y.left - E.left + g.left,
                right: E.right - y.right + g.right
            }, k = t.modifiersData.offset;
        if (u === pt && k) {
            var A = k[i];
            Object.keys(j).forEach((function (t) {
                var e = [at, ot].indexOf(t) >= 0 ? 1 : -1, n = [it, ot].indexOf(t) >= 0 ? "y" : "x";
                j[t] += A[n] * e
            }))
        }
        return j
    }

    function Rt(t, e, n) {
        return R(t, V(e, n))
    }

    const Vt = {
        name: "preventOverflow", enabled: !0, phase: "main", fn: function (t) {
            var e = t.state, n = t.options, r = t.name, i = n.mainAxis, o = void 0 === i || i, a = n.altAxis,
                s = void 0 !== a && a, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, f = n.padding,
                d = n.tether, p = void 0 === d || d, h = n.tetherOffset, g = void 0 === h ? 0 : h,
                v = Wt(e, {boundary: c, rootBoundary: l, padding: f, altBoundary: u}), b = Ot(e.placement),
                m = Et(e.placement), y = !m, w = jt(b), _ = "x" === w ? "y" : "x", O = e.modifiersData.popperOffsets,
                E = e.rects.reference, j = e.rects.popper,
                k = "function" == typeof g ? g(Object.assign({}, e.rects, {placement: e.placement})) : g,
                A = "number" == typeof k ? {mainAxis: k, altAxis: k} : Object.assign({mainAxis: 0, altAxis: 0}, k),
                P = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, x = {x: 0, y: 0};
            if (O) {
                if (o) {
                    var L, S = "y" === w ? it : st, C = "y" === w ? ot : at, D = "y" === w ? "height" : "width",
                        T = O[w], I = T + v[S], q = T - v[C], M = p ? -j[D] / 2 : 0, H = m === ut ? E[D] : j[D],
                        B = m === ut ? -j[D] : -E[D], W = e.elements.arrow, U = p && W ? K(W) : {width: 0, height: 0},
                        z = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }, N = z[S], $ = z[C], F = Rt(0, E[D], U[D]),
                        X = y ? E[D] / 2 - M - F - N - A.mainAxis : H - F - N - A.mainAxis,
                        Y = y ? -E[D] / 2 + M + F + $ + A.mainAxis : B + F + $ + A.mainAxis,
                        G = e.elements.arrow && rt(e.elements.arrow),
                        J = G ? "y" === w ? G.clientTop || 0 : G.clientLeft || 0 : 0,
                        Q = null != (L = null == P ? void 0 : P[w]) ? L : 0, Z = T + Y - Q,
                        tt = Rt(p ? V(I, T + X - Q - J) : I, T, p ? R(q, Z) : q);
                    O[w] = tt, x[w] = tt - T
                }
                if (s) {
                    var et, nt = "x" === w ? it : st, ct = "x" === w ? ot : at, lt = O[_],
                        ft = "y" === _ ? "height" : "width", dt = lt + v[nt], pt = lt - v[ct],
                        ht = -1 !== [it, st].indexOf(b), gt = null != (et = null == P ? void 0 : P[_]) ? et : 0,
                        vt = ht ? dt : lt - E[ft] - j[ft] - gt + A.altAxis,
                        bt = ht ? lt + E[ft] + j[ft] - gt - A.altAxis : pt, mt = p && ht ? function (t, e, n) {
                            var r = Rt(t, e, n);
                            return r > n ? n : r
                        }(vt, lt, bt) : Rt(p ? vt : dt, lt, p ? bt : pt);
                    O[_] = mt, x[_] = mt - lt
                }
                e.modifiersData[r] = x
            }
        }, requiresIfExists: ["offset"]
    };
    const Ut = {
        name: "arrow", enabled: !0, phase: "main", fn: function (t) {
            var e, n = t.state, r = t.name, i = t.options, o = n.elements.arrow, a = n.modifiersData.popperOffsets,
                s = Ot(n.placement), c = jt(s), l = [st, at].indexOf(s) >= 0 ? "height" : "width";
            if (o && a) {
                var u = function (t, e) {
                        return Ht("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, {placement: e.placement})) : t) ? t : Bt(t, lt))
                    }(i.padding, n), f = K(o), d = "y" === c ? it : st, p = "y" === c ? ot : at,
                    h = n.rects.reference[l] + n.rects.reference[c] - a[c] - n.rects.popper[l],
                    g = a[c] - n.rects.reference[c], v = rt(o),
                    b = v ? "y" === c ? v.clientHeight || 0 : v.clientWidth || 0 : 0, m = h / 2 - g / 2, y = u[d],
                    w = b - f[l] - u[p], _ = b / 2 - f[l] / 2 + m, O = Rt(y, _, w), E = c;
                n.modifiersData[r] = ((e = {})[E] = O, e.centerOffset = O - _, e)
            }
        }, effect: function (t) {
            var e = t.state, n = t.options.element, r = void 0 === n ? "[data-popper-arrow]" : n;
            null != r && ("string" != typeof r || (r = e.elements.popper.querySelector(r))) && Tt(e.elements.popper, r) && (e.elements.arrow = r)
        }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"]
    };

    function zt(t, e, n) {
        return void 0 === n && (n = {x: 0, y: 0}), {
            top: t.top - e.height - n.y,
            right: t.right - e.width + n.x,
            bottom: t.bottom - e.height + n.y,
            left: t.left - e.width - n.x
        }
    }

    function Nt(t) {
        return [it, at, ot, st].some((function (e) {
            return t[e] >= 0
        }))
    }

    var $t = wt({
        defaultModifiers: [{
            name: "eventListeners", enabled: !0, phase: "write", fn: function () {
            }, effect: function (t) {
                var e = t.state, n = t.instance, r = t.options, i = r.scroll, o = void 0 === i || i, a = r.resize,
                    s = void 0 === a || a, c = M(e.elements.popper),
                    l = [].concat(e.scrollParents.reference, e.scrollParents.popper);
                return o && l.forEach((function (t) {
                    t.addEventListener("scroll", n.update, _t)
                })), s && c.addEventListener("resize", n.update, _t), function () {
                    o && l.forEach((function (t) {
                        t.removeEventListener("scroll", n.update, _t)
                    })), s && c.removeEventListener("resize", n.update, _t)
                }
            }, data: {}
        }, {
            name: "popperOffsets", enabled: !0, phase: "read", fn: function (t) {
                var e = t.state, n = t.name;
                e.modifiersData[n] = kt({
                    reference: e.rects.reference,
                    element: e.rects.popper,
                    strategy: "absolute",
                    placement: e.placement
                })
            }, data: {}
        }, {
            name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function (t) {
                var e = t.state, n = t.options, r = n.gpuAcceleration, i = void 0 === r || r, o = n.adaptive,
                    a = void 0 === o || o, s = n.roundOffsets, c = void 0 === s || s, l = {
                        placement: Ot(e.placement),
                        variation: Et(e.placement),
                        popper: e.elements.popper,
                        popperRect: e.rects.popper,
                        gpuAcceleration: i,
                        isFixed: "fixed" === e.options.strategy
                    };
                null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, Pt(Object.assign({}, l, {
                    offsets: e.modifiersData.popperOffsets,
                    position: e.options.strategy,
                    adaptive: a,
                    roundOffsets: c
                })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, Pt(Object.assign({}, l, {
                    offsets: e.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: c
                })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {"data-popper-placement": e.placement})
            }, data: {}
        }, {
            name: "applyStyles", enabled: !0, phase: "write", fn: function (t) {
                var e = t.state;
                Object.keys(e.elements).forEach((function (t) {
                    var n = e.styles[t] || {}, r = e.attributes[t] || {}, i = e.elements[t];
                    B(i) && $(i) && (Object.assign(i.style, n), Object.keys(r).forEach((function (t) {
                        var e = r[t];
                        !1 === e ? i.removeAttribute(t) : i.setAttribute(t, !0 === e ? "" : e)
                    })))
                }))
            }, effect: function (t) {
                var e = t.state, n = {
                    popper: {position: e.options.strategy, left: "0", top: "0", margin: "0"},
                    arrow: {position: "absolute"},
                    reference: {}
                };
                return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function () {
                    Object.keys(e.elements).forEach((function (t) {
                        var r = e.elements[t], i = e.attributes[t] || {},
                            o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : n[t]).reduce((function (t, e) {
                                return t[e] = "", t
                            }), {});
                        B(r) && $(r) && (Object.assign(r.style, o), Object.keys(i).forEach((function (t) {
                            r.removeAttribute(t)
                        })))
                    }))
                }
            }, requires: ["computeStyles"]
        }, xt, {
            name: "flip", enabled: !0, phase: "main", fn: function (t) {
                var e = t.state, n = t.options, r = t.name;
                if (!e.modifiersData[r]._skip) {
                    for (var i = n.mainAxis, o = void 0 === i || i, a = n.altAxis, s = void 0 === a || a, c = n.fallbackPlacements, l = n.padding, u = n.boundary, f = n.rootBoundary, d = n.altBoundary, p = n.flipVariations, h = void 0 === p || p, g = n.allowedAutoPlacements, v = e.options.placement, b = Ot(v), m = c || (b === v || !h ? [St(v)] : function (t) {
                        if (Ot(t) === ct) return [];
                        var e = St(t);
                        return [Dt(t), e, Dt(e)]
                    }(v)), y = [v].concat(m).reduce((function (t, n) {
                        return t.concat(Ot(n) === ct ? function (t, e) {
                            void 0 === e && (e = {});
                            var n = e, r = n.placement, i = n.boundary, o = n.rootBoundary, a = n.padding,
                                s = n.flipVariations, c = n.allowedAutoPlacements, l = void 0 === c ? gt : c, u = Et(r),
                                f = u ? s ? ht : ht.filter((function (t) {
                                    return Et(t) === u
                                })) : lt, d = f.filter((function (t) {
                                    return l.indexOf(t) >= 0
                                }));
                            0 === d.length && (d = f);
                            var p = d.reduce((function (e, n) {
                                return e[n] = Wt(t, {placement: n, boundary: i, rootBoundary: o, padding: a})[Ot(n)], e
                            }), {});
                            return Object.keys(p).sort((function (t, e) {
                                return p[t] - p[e]
                            }))
                        }(e, {
                            placement: n,
                            boundary: u,
                            rootBoundary: f,
                            padding: l,
                            flipVariations: h,
                            allowedAutoPlacements: g
                        }) : n)
                    }), []), w = e.rects.reference, _ = e.rects.popper, O = new Map, E = !0, j = y[0], k = 0; k < y.length; k++) {
                        var A = y[k], P = Ot(A), x = Et(A) === ut, L = [it, ot].indexOf(P) >= 0,
                            S = L ? "width" : "height",
                            C = Wt(e, {placement: A, boundary: u, rootBoundary: f, altBoundary: d, padding: l}),
                            D = L ? x ? at : st : x ? ot : it;
                        w[S] > _[S] && (D = St(D));
                        var T = St(D), I = [];
                        if (o && I.push(C[P] <= 0), s && I.push(C[D] <= 0, C[T] <= 0), I.every((function (t) {
                            return t
                        }))) {
                            j = A, E = !1;
                            break
                        }
                        O.set(A, I)
                    }
                    if (E) for (var q = function (t) {
                        var e = y.find((function (e) {
                            var n = O.get(e);
                            if (n) return n.slice(0, t).every((function (t) {
                                return t
                            }))
                        }));
                        if (e) return j = e, "break"
                    }, M = h ? 3 : 1; M > 0; M--) {
                        if ("break" === q(M)) break
                    }
                    e.placement !== j && (e.modifiersData[r]._skip = !0, e.placement = j, e.reset = !0)
                }
            }, requiresIfExists: ["offset"], data: {_skip: !1}
        }, Vt, Ut, {
            name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: function (t) {
                var e = t.state, n = t.name, r = e.rects.reference, i = e.rects.popper,
                    o = e.modifiersData.preventOverflow, a = Wt(e, {elementContext: "reference"}),
                    s = Wt(e, {altBoundary: !0}), c = zt(a, r), l = zt(s, i, o), u = Nt(c), f = Nt(l);
                e.modifiersData[n] = {
                    referenceClippingOffsets: c,
                    popperEscapeOffsets: l,
                    isReferenceHidden: u,
                    hasPopperEscaped: f
                }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-reference-hidden": u,
                    "data-popper-escaped": f
                })
            }
        }]
    });

    function Ft(t) {
        return function (t) {
            if (Array.isArray(t)) return Xt(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return Xt(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Xt(t, e)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function Xt(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function Yt(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function Gt(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? Yt(Object(n), !0).forEach((function (e) {
                Jt(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Yt(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function Jt(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function Kt(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function Qt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var Zt = {
        placement: "bottom", triggerType: "click", onShow: function () {
        }, onHide: function () {
        }
    }, te = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            Kt(this, t), this._targetEl = e, this._triggerEl = n, this._options = Gt(Gt({}, Zt), r), this._popperInstance = this._createPopperInstace(), this._visible = !1, this._init()
        }

        var e, n, r;
        return e = t, (n = [{
            key: "_init", value: function () {
                var t = this;
                this._triggerEl && this._triggerEl.addEventListener("click", (function () {
                    t.toggle()
                }))
            }
        }, {
            key: "_createPopperInstace", value: function () {
                return $t(this._triggerEl, this._targetEl, {
                    placement: this._options.placement,
                    modifiers: [{name: "offset", options: {offset: [0, 10]}}]
                })
            }
        }, {
            key: "_handleClickOutside", value: function (t, e) {
                var n = t.target;
                n === e || e.contains(n) || this._triggerEl.contains(n) || !this._visible || this.hide(), document.body.removeEventListener("click", this._handleClickOutside, !0)
            }
        }, {
            key: "toggle", value: function () {
                this._visible ? (this.hide(), document.body.removeEventListener("click", this._handleClickOutside, !0)) : this.show()
            }
        }, {
            key: "show", value: function () {
                var t = this;
                this._targetEl.classList.remove("hidden"), this._targetEl.classList.add("block"), this._popperInstance.setOptions((function (t) {
                    return Gt(Gt({}, t), {}, {
                        modifiers: [].concat(Ft(t.modifiers), [{
                            name: "eventListeners",
                            enabled: !0
                        }])
                    })
                })), document.body.addEventListener("click", (function (e) {
                    t._handleClickOutside(e, t._targetEl)
                }), !0), this._popperInstance.update(), this._visible = !0, this._options.onShow(this)
            }
        }, {
            key: "hide", value: function () {
                this._targetEl.classList.remove("block"), this._targetEl.classList.add("hidden"), this._popperInstance.setOptions((function (t) {
                    return Gt(Gt({}, t), {}, {
                        modifiers: [].concat(Ft(t.modifiers), [{
                            name: "eventListeners",
                            enabled: !1
                        }])
                    })
                })), this._visible = !1, this._options.onHide(this)
            }
        }]) && Qt(e.prototype, n), r && Qt(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();

    function ee() {
        document.querySelectorAll("[data-dropdown-toggle]").forEach((function (t) {
            var e = document.getElementById(t.getAttribute("data-dropdown-toggle")),
                n = t.getAttribute("data-dropdown-placement");
            new te(e, t, {placement: n || Zt.placement})
        }))
    }

    window.Dropdown = te, "loading" !== document.readyState ? ee() : document.addEventListener("DOMContentLoaded", ee);

    function ne(t) {
        return function (t) {
            if (Array.isArray(t)) return re(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return re(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return re(t, e)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function re(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function ie(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function oe(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? ie(Object(n), !0).forEach((function (e) {
                ae(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ie(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function ae(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function se(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function ce(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var le = {
        placement: "center",
        backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
        backdrop: "dynamic",
        onHide: function () {
        },
        onShow: function () {
        },
        onToggle: function () {
        }
    }, ue = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            se(this, t), this._targetEl = e, this._options = oe(oe({}, le), n), this._isHidden = !0, this._backdropEl = null, this._init()
        }

        var e, n, r;
        return e = t, (n = [{
            key: "_init", value: function () {
                var t = this;
                this._targetEl && (this._getPlacementClasses().map((function (e) {
                    t._targetEl.classList.add(e)
                })), this._targetEl.addEventListener("click", (function (e) {
                    t._handleOutsideClick(e.target)
                })))
            }
        }, {
            key: "_createBackdrop", value: function () {
                if (this._isHidden) {
                    var t, e = document.createElement("div");
                    e.setAttribute("modal-backdrop", ""), (t = e.classList).add.apply(t, ne(this._options.backdropClasses.split(" "))), document.querySelector("body").append(e), this._backdropEl = e
                }
            }
        }, {
            key: "_destroyBackdropEl", value: function () {
                this._isHidden || document.querySelector("[modal-backdrop]").remove()
            }
        }, {
            key: "_handleOutsideClick", value: function (t) {
                "dynamic" === this._options.backdrop && (t !== this._targetEl && t !== this._backdropEl || this.hide())
            }
        }, {
            key: "_getPlacementClasses", value: function () {
                switch (this._options.placement) {
                    case"top-left":
                        return ["justify-start", "items-start"];
                    case"top-center":
                        return ["justify-center", "items-start"];
                    case"top-right":
                        return ["justify-end", "items-start"];
                    case"center-left":
                        return ["justify-start", "items-center"];
                    case"center":
                    default:
                        return ["justify-center", "items-center"];
                    case"center-right":
                        return ["justify-end", "items-center"];
                    case"bottom-left":
                        return ["justify-start", "items-end"];
                    case"bottom-center":
                        return ["justify-center", "items-end"];
                    case"bottom-right":
                        return ["justify-end", "items-end"]
                }
            }
        }, {
            key: "toggle", value: function () {
                this._isHidden ? this.show() : this.hide(), this._options.onToggle(this)
            }
        }, {
            key: "show", value: function () {
                this._targetEl.classList.add("flex"), this._targetEl.classList.remove("hidden"), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._createBackdrop(), this._isHidden = !1, document.body.classList.add("overflow-hidden"), this._options.onShow(this)
            }
        }, {
            key: "hide", value: function () {
                this._targetEl.classList.add("hidden"), this._targetEl.classList.remove("flex"), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._destroyBackdropEl(), this._isHidden = !0, document.body.classList.remove("overflow-hidden"), this._options.onHide(this)
            }
        }, {
            key: "isHidden", value: function () {
                return this._isHidden
            }
        }]) && ce(e.prototype, n), r && ce(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();
    window.Modal = ue;
    var fe = function (t, e) {
        return !!e.some((function (e) {
            return e.id === t
        })) && e.find((function (e) {
            return e.id === t
        }))
    }, de = function (t) {
        var e = [];
        document.querySelectorAll("[".concat(t.main, "]")).forEach((function (n) {
            var r = n.getAttribute(t.main), i = document.getElementById(r), o = i.getAttribute(t.placement),
                a = i.getAttribute(t.backdrop);
            i && (i.hasAttribute("aria-hidden") || i.hasAttribute("aria-modal") || i.setAttribute("aria-hidden", "true"));
            var s = null;
            fe(r, e) ? s = (s = fe(r, e)).object : (s = new ue(i, {
                placement: o || le.placement,
                backdrop: a || le.backdrop
            }), e.push({
                id: r,
                object: s
            })), i.hasAttribute(t.show) && "true" === i.getAttribute(t.show) && s.show(), n.addEventListener("click", (function () {
                s.toggle()
            }))
        }))
    }, pe = {
        main: "data-modal-toggle",
        placement: "data-modal-placement",
        show: "data-modal-show",
        backdrop: "data-modal-backdrop"
    };
    "loading" !== document.readyState ? de(pe) : document.addEventListener("DOMContentLoaded", de(pe));

    function he(t) {
        return function (t) {
            if (Array.isArray(t)) return ge(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return ge(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ge(t, e)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function ge(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function ve(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function be(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? ve(Object(n), !0).forEach((function (e) {
                me(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ve(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function me(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function ye(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function we(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var _e = {
        placement: "left",
        bodyScrolling: !1,
        backdrop: !0,
        edge: !1,
        edgeOffset: "bottom-[60px]",
        backdropClasses: "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30",
        onShow: function () {
        },
        onHide: function () {
        },
        onToggle: function () {
        }
    }, Oe = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                n = arguments.length > 1 ? arguments[1] : void 0;
            ye(this, t), this._targetEl = e, this._options = be(be({}, _e), n), this._visible = !1, this._init()
        }

        var e, n, r;
        return e = t, (n = [{
            key: "_init", value: function () {
                var t = this;
                this._targetEl && (this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.classList.add("transition-transform")), this._getPlacementClasses(this._options.placement).base.map((function (e) {
                    t._targetEl.classList.add(e)
                })), this.hide()
            }
        }, {
            key: "isVisible", value: function () {
                return this._visible
            }
        }, {
            key: "hide", value: function () {
                var t = this;
                this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map((function (e) {
                    t._targetEl.classList.remove(e)
                })), this._getPlacementClasses(this._options.placement + "-edge").inactive.map((function (e) {
                    t._targetEl.classList.add(e)
                }))) : (this._getPlacementClasses(this._options.placement).active.map((function (e) {
                    t._targetEl.classList.remove(e)
                })), this._getPlacementClasses(this._options.placement).inactive.map((function (e) {
                    t._targetEl.classList.add(e)
                }))), this._targetEl.setAttribute("aria-hidden", "true"), this._targetEl.removeAttribute("aria-modal"), this._targetEl.removeAttribute("role"), this._options.bodyScrolling || document.body.classList.remove("overflow-hidden"), this._options.backdrop && this._destroyBackdropEl(), this._visible = !1, this._options.onHide(this)
            }
        }, {
            key: "show", value: function () {
                var t = this;
                this._options.edge ? (this._getPlacementClasses(this._options.placement + "-edge").active.map((function (e) {
                    t._targetEl.classList.add(e)
                })), this._getPlacementClasses(this._options.placement + "-edge").inactive.map((function (e) {
                    t._targetEl.classList.remove(e)
                }))) : (this._getPlacementClasses(this._options.placement).active.map((function (e) {
                    t._targetEl.classList.add(e)
                })), this._getPlacementClasses(this._options.placement).inactive.map((function (e) {
                    t._targetEl.classList.remove(e)
                }))), this._targetEl.setAttribute("aria-modal", "true"), this._targetEl.setAttribute("role", "dialog"), this._targetEl.removeAttribute("aria-hidden"), this._options.bodyScrolling || document.body.classList.add("overflow-hidden"), this._options.backdrop && this._createBackdrop(), this._visible = !0, this._options.onShow(this)
            }
        }, {
            key: "toggle", value: function () {
                this.isVisible() ? this.hide() : this.show()
            }
        }, {
            key: "_createBackdrop", value: function () {
                var t = this;
                if (!this._visible) {
                    var e, n = document.createElement("div");
                    n.setAttribute("drawer-backdrop", ""), (e = n.classList).add.apply(e, he(this._options.backdropClasses.split(" "))), document.querySelector("body").append(n), n.addEventListener("click", (function () {
                        t.hide()
                    }))
                }
            }
        }, {
            key: "_destroyBackdropEl", value: function () {
                this._visible && document.querySelector("[drawer-backdrop]").remove()
            }
        }, {
            key: "_getPlacementClasses", value: function (t) {
                switch (t) {
                    case"top":
                        return {
                            base: ["top-0", "left-0", "right-0"],
                            active: ["transform-none"],
                            inactive: ["-translate-y-full"]
                        };
                    case"right":
                        return {base: ["right-0", "top-0"], active: ["transform-none"], inactive: ["translate-x-full"]};
                    case"bottom":
                        return {
                            base: ["bottom-0", "left-0", "right-0"],
                            active: ["transform-none"],
                            inactive: ["translate-y-full"]
                        };
                    case"left":
                    default:
                        return {base: ["left-0", "top-0"], active: ["transform-none"], inactive: ["-translate-x-full"]};
                    case"bottom-edge":
                        return {
                            base: ["left-0", "top-0"],
                            active: ["transform-none"],
                            inactive: ["translate-y-full", this._options.edgeOffset]
                        }
                }
            }
        }]) && we(e.prototype, n), r && we(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();
    window.Drawer = Oe;
    var Ee = function (t, e) {
        return !!e.some((function (e) {
            return e.id === t
        })) && e.find((function (e) {
            return e.id === t
        }))
    };

    function je() {
        var t = [];
        document.querySelectorAll("[data-drawer-target]").forEach((function (e) {
            var n = document.getElementById(e.getAttribute("data-drawer-target")), r = n.id,
                i = e.getAttribute("data-drawer-placement"), o = e.getAttribute("data-drawer-body-scrolling"),
                a = e.getAttribute("data-drawer-backdrop"), s = e.getAttribute("data-drawer-edge"),
                c = e.getAttribute("data-drawer-edge-offset"), l = null;
            Ee(r, t) ? l = (l = Ee(r, t)).object : (l = new Oe(n, {
                placement: i || _e.placement,
                bodyScrolling: o ? "true" === o : _e.bodyScrolling,
                backdrop: a ? "true" === a : _e.backdrop,
                edge: s ? "true" === s : _e.edge,
                edgeOffset: c || _e.edgeOffset
            }), t.push({id: r, object: l}))
        })), document.querySelectorAll("[data-drawer-toggle]").forEach((function (e) {
            var n = document.getElementById(e.getAttribute("data-drawer-toggle")).id, r = Ee(n, t);
            e.addEventListener("click", (function () {
                r.object.isVisible() ? r.object.hide() : r.object.show()
            }))
        })), document.querySelectorAll("[data-drawer-dismiss]").forEach((function (e) {
            var n = document.getElementById(e.getAttribute("data-drawer-dismiss")).id, r = Ee(n, t);
            e.addEventListener("click", (function () {
                r.object.hide()
            }))
        })), document.querySelectorAll("[data-drawer-show]").forEach((function (e) {
            var n = document.getElementById(e.getAttribute("data-drawer-show")).id, r = Ee(n, t);
            e.addEventListener("click", (function () {
                r.object.show()
            }))
        }))
    }

    "loading" !== document.readyState ? je() : document.addEventListener("DOMContentLoaded", je);

    function ke(t) {
        return function (t) {
            if (Array.isArray(t)) return Ae(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return Ae(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Ae(t, e)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function Ae(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function Pe(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function xe(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? Pe(Object(n), !0).forEach((function (e) {
                Le(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Pe(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function Le(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function Se(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function Ce(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var De = {
        defaultTabId: null,
        activeClasses: "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500",
        inactiveClasses: "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
        onShow: function () {
        }
    }, Te = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            Se(this, t), this._items = e, this._activeTab = n ? this.getTab(n.defaultTabId) : null, this._options = xe(xe({}, De), n), this._init()
        }

        var e, n, r;
        return e = t, n = [{
            key: "_init", value: function () {
                var t = this;
                this._items.length && (this._activeTab || this._setActiveTab(this._items[0]), this.show(this._activeTab.id, !0), this._items.map((function (e) {
                    e.triggerEl.addEventListener("click", (function () {
                        t.show(e.id)
                    }))
                })))
            }
        }, {
            key: "getActiveTab", value: function () {
                return this._activeTab
            }
        }, {
            key: "_setActiveTab", value: function (t) {
                this._activeTab = t
            }
        }, {
            key: "getTab", value: function (t) {
                return this._items.filter((function (e) {
                    return e.id === t
                }))[0]
            }
        }, {
            key: "show", value: function (t) {
                var e, n, r = this, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    o = this.getTab(t);
                (o !== this._activeTab || i) && (this._items.map((function (t) {
                    var e, n;
                    t !== o && ((e = t.triggerEl.classList).remove.apply(e, ke(r._options.activeClasses.split(" "))), (n = t.triggerEl.classList).add.apply(n, ke(r._options.inactiveClasses.split(" "))), t.targetEl.classList.add("hidden"), t.triggerEl.setAttribute("aria-selected", !1))
                })), (e = o.triggerEl.classList).add.apply(e, ke(this._options.activeClasses.split(" "))), (n = o.triggerEl.classList).remove.apply(n, ke(this._options.inactiveClasses.split(" "))), o.triggerEl.setAttribute("aria-selected", !0), o.targetEl.classList.remove("hidden"), this._setActiveTab(o), this._options.onShow(this, o))
            }
        }], n && Ce(e.prototype, n), r && Ce(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();

    function Ie() {
        document.querySelectorAll("[data-tabs-toggle]").forEach((function (t) {
            var e = [], n = null;
            t.querySelectorAll('[role="tab"]').forEach((function (t) {
                var r = "true" === t.getAttribute("aria-selected"), i = {
                    id: t.getAttribute("data-tabs-target"),
                    triggerEl: t,
                    targetEl: document.querySelector(t.getAttribute("data-tabs-target"))
                };
                e.push(i), r && (n = i.id)
            })), new Te(e, {defaultTabId: n})
        }))
    }

    window.Tabs = Te, "loading" !== document.readyState ? Ie() : document.addEventListener("DOMContentLoaded", Ie);

    function qe(t) {
        return function (t) {
            if (Array.isArray(t)) return Me(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return Me(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Me(t, e)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function Me(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function He(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function Be(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? He(Object(n), !0).forEach((function (e) {
                We(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : He(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function We(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function Re(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function Ve(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var Ue = {
        placement: "top", triggerType: "hover", onShow: function () {
        }, onHide: function () {
        }
    }, ze = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            Re(this, t), this._targetEl = e, this._triggerEl = n, this._options = Be(Be({}, Ue), r), this._popperInstance = this._createPopperInstace(), this._init()
        }

        var e, n, r;
        return e = t, (n = [{
            key: "_init", value: function () {
                var t = this;
                if (this._triggerEl) {
                    var e = this._getTriggerEvents();
                    e.showEvents.forEach((function (e) {
                        t._triggerEl.addEventListener(e, (function () {
                            t.show()
                        }))
                    })), e.hideEvents.forEach((function (e) {
                        t._triggerEl.addEventListener(e, (function () {
                            t.hide()
                        }))
                    }))
                }
            }
        }, {
            key: "_createPopperInstace", value: function () {
                return $t(this._triggerEl, this._targetEl, {
                    placement: this._options.placement,
                    modifiers: [{name: "offset", options: {offset: [0, 8]}}]
                })
            }
        }, {
            key: "_getTriggerEvents", value: function () {
                switch (this._options.triggerType) {
                    case"hover":
                    default:
                        return {showEvents: ["mouseenter", "focus"], hideEvents: ["mouseleave", "blur"]};
                    case"click":
                        return {showEvents: ["click", "focus"], hideEvents: ["focusout", "blur"]}
                }
            }
        }, {
            key: "show", value: function () {
                this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions((function (t) {
                    return Be(Be({}, t), {}, {
                        modifiers: [].concat(qe(t.modifiers), [{
                            name: "eventListeners",
                            enabled: !0
                        }])
                    })
                })), this._popperInstance.update(), this._options.onShow(this)
            }
        }, {
            key: "hide", value: function () {
                this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions((function (t) {
                    return Be(Be({}, t), {}, {
                        modifiers: [].concat(qe(t.modifiers), [{
                            name: "eventListeners",
                            enabled: !1
                        }])
                    })
                })), this._options.onHide(this)
            }
        }]) && Ve(e.prototype, n), r && Ve(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();

    function Ne() {
        document.querySelectorAll("[data-tooltip-target]").forEach((function (t) {
            var e = document.getElementById(t.getAttribute("data-tooltip-target")),
                n = t.getAttribute("data-tooltip-trigger"), r = t.getAttribute("data-tooltip-placement");
            new ze(e, t, {placement: r || Ue.placement, triggerType: n || Ue.triggerType})
        }))
    }

    window.Tooltip = ze, "loading" !== document.readyState ? Ne() : document.addEventListener("DOMContentLoaded", Ne);

    function $e(t) {
        return function (t) {
            if (Array.isArray(t)) return Fe(t)
        }(t) || function (t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || function (t, e) {
            if (!t) return;
            if ("string" == typeof t) return Fe(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Fe(t, e)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function Fe(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }

    function Xe(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function Ye(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? Xe(Object(n), !0).forEach((function (e) {
                Ge(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Xe(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function Ge(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function Je(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function Ke(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var Qe = {
        placement: "top", offset: 10, triggerType: "hover", onShow: function () {
        }, onHide: function () {
        }
    }, Ze = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            Je(this, t), this._targetEl = e, this._triggerEl = n, this._options = Ye(Ye({}, Qe), r), this._popperInstance = this._createPopperInstace(), this._init()
        }

        var e, n, r;
        return e = t, (n = [{
            key: "_init", value: function () {
                var t = this;
                if (this._triggerEl) {
                    var e = this._getTriggerEvents();
                    e.showEvents.forEach((function (e) {
                        t._triggerEl.addEventListener(e, (function () {
                            t.show()
                        })), t._targetEl.addEventListener(e, (function () {
                            t.show()
                        }))
                    })), e.hideEvents.forEach((function (e) {
                        t._triggerEl.addEventListener(e, (function () {
                            setTimeout((function () {
                                t._targetEl.matches(":hover") || t.hide()
                            }), 100)
                        })), t._targetEl.addEventListener(e, (function () {
                            setTimeout((function () {
                                t._triggerEl.matches(":hover") || t.hide()
                            }), 100)
                        }))
                    }))
                }
            }
        }, {
            key: "_createPopperInstace", value: function () {
                return $t(this._triggerEl, this._targetEl, {
                    placement: this._options.placement,
                    modifiers: [{name: "offset", options: {offset: [0, this._options.offset]}}]
                })
            }
        }, {
            key: "_getTriggerEvents", value: function () {
                switch (this._options.triggerType) {
                    case"hover":
                    default:
                        return {showEvents: ["mouseenter", "focus"], hideEvents: ["mouseleave", "blur"]};
                    case"click":
                        return {showEvents: ["click", "focus"], hideEvents: ["focusout", "blur"]}
                }
            }
        }, {
            key: "show", value: function () {
                this._targetEl.classList.remove("opacity-0", "invisible"), this._targetEl.classList.add("opacity-100", "visible"), this._popperInstance.setOptions((function (t) {
                    return Ye(Ye({}, t), {}, {
                        modifiers: [].concat($e(t.modifiers), [{
                            name: "eventListeners",
                            enabled: !0
                        }])
                    })
                })), this._popperInstance.update(), this._options.onShow(this)
            }
        }, {
            key: "hide", value: function () {
                this._targetEl.classList.remove("opacity-100", "visible"), this._targetEl.classList.add("opacity-0", "invisible"), this._popperInstance.setOptions((function (t) {
                    return Ye(Ye({}, t), {}, {
                        modifiers: [].concat($e(t.modifiers), [{
                            name: "eventListeners",
                            enabled: !1
                        }])
                    })
                })), this._options.onHide(this)
            }
        }]) && Ke(e.prototype, n), r && Ke(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();

    function tn() {
        document.querySelectorAll("[data-popover-target]").forEach((function (t) {
            var e = document.getElementById(t.getAttribute("data-popover-target")),
                n = t.getAttribute("data-popover-trigger"), r = t.getAttribute("data-popover-placement"),
                i = t.getAttribute("data-popover-offset");
            new Ze(e, t, {
                placement: r || Qe.placement,
                offset: i ? parseInt(i) : Qe.offset,
                triggerType: n || Qe.triggerType
            })
        }))
    }

    window.Popover = Ze, "loading" !== document.readyState ? tn() : document.addEventListener("DOMContentLoaded", tn);

    function en(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter((function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, r)
        }
        return n
    }

    function nn(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? en(Object(n), !0).forEach((function (e) {
                rn(t, e, n[e])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : en(Object(n)).forEach((function (e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }

    function rn(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function on(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function an(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
        }
    }

    var sn = {
        triggerType: "hover", onShow: function () {
        }, onHide: function () {
        }, onToggle: function () {
        }
    }, cn = function () {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                i = arguments.length > 3 ? arguments[3] : void 0;
            on(this, t), this._parentEl = e, this._triggerEl = n, this._targetEl = r, this._options = nn(nn({}, sn), i), this._visible = !1, this._init()
        }

        var e, n, r;
        return e = t, (n = [{
            key: "_init", value: function () {
                var t = this;
                if (this._triggerEl) {
                    var e = this._getTriggerEvents();
                    e.showEvents.forEach((function (e) {
                        t._triggerEl.addEventListener(e, (function () {
                            t.show()
                        })), t._targetEl.addEventListener(e, (function () {
                            t.show()
                        }))
                    })), e.hideEvents.forEach((function (e) {
                        t._parentEl.addEventListener(e, (function () {
                            setTimeout((function () {
                                t._parentEl.matches(":hover") || t.hide()
                            }), 100)
                        }))
                    }))
                }
            }
        }, {
            key: "hide", value: function () {
                this._targetEl.classList.add("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "false"), this._visible = !1, this._options.onHide(this)
            }
        }, {
            key: "show", value: function () {
                this._targetEl.classList.remove("hidden"), this._triggerEl && this._triggerEl.setAttribute("aria-expanded", "true"), this._visible = !0, this._options.onShow(this)
            }
        }, {
            key: "toggle", value: function () {
                this._visible ? this.hide() : this.show()
            }
        }, {
            key: "_getTriggerEvents", value: function () {
                switch (this._options.triggerType) {
                    case"hover":
                    default:
                        return {showEvents: ["mouseenter", "focus"], hideEvents: ["mouseleave", "blur"]};
                    case"click":
                        return {showEvents: ["click", "focus"], hideEvents: ["focusout", "blur"]}
                }
            }
        }]) && an(e.prototype, n), r && an(e, r), Object.defineProperty(e, "prototype", {writable: !1}), t
    }();

    function ln() {
        document.querySelectorAll("[data-dial-init]").forEach((function (t) {
            var e = t.querySelector("[data-dial-toggle]"),
                n = document.getElementById(e.getAttribute("data-dial-toggle")),
                r = e.getAttribute("data-dial-trigger");
            new cn(t, e, n, {triggerType: r || sn.triggerType})
        }))
    }

    window.Dial = cn, "loading" !== document.readyState ? ln() : document.addEventListener("DOMContentLoaded", ln)
})();
//# sourceMappingURL=flowbite.js.map
