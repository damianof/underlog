var ee = Object.defineProperty;
var te = (v, s, n) => s in v ? ee(v, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : v[s] = n;
var L = (v, s, n) => te(v, typeof s != "symbol" ? s + "" : s, n);
var re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ne(v) {
  return v && v.__esModule && Object.prototype.hasOwnProperty.call(v, "default") ? v.default : v;
}
var V = { exports: {} };
(function(v, s) {
  (function(n, a) {
    v.exports = a();
  })(re, function() {
    var n = 1e3, a = 6e4, h = 36e5, g = "millisecond", d = "second", y = "minute", b = "hour", M = "day", D = "week", w = "month", U = "quarter", x = "year", H = "date", B = "Invalid Date", q = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Q = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, K = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(o) {
      var r = ["th", "st", "nd", "rd"], e = o % 100;
      return "[" + o + (r[(e - 20) % 10] || r[e] || r[0]) + "]";
    } }, N = function(o, r, e) {
      var i = String(o);
      return !i || i.length >= r ? o : "" + Array(r + 1 - i.length).join(e) + o;
    }, X = { s: N, z: function(o) {
      var r = -o.utcOffset(), e = Math.abs(r), i = Math.floor(e / 60), t = e % 60;
      return (r <= 0 ? "+" : "-") + N(i, 2, "0") + ":" + N(t, 2, "0");
    }, m: function o(r, e) {
      if (r.date() < e.date()) return -o(e, r);
      var i = 12 * (e.year() - r.year()) + (e.month() - r.month()), t = r.clone().add(i, w), l = e - t < 0, u = r.clone().add(i + (l ? -1 : 1), w);
      return +(-(i + (e - t) / (l ? t - u : u - t)) || 0);
    }, a: function(o) {
      return o < 0 ? Math.ceil(o) || 0 : Math.floor(o);
    }, p: function(o) {
      return { M: w, y: x, w: D, d: M, D: H, h: b, m: y, s: d, ms: g, Q: U }[o] || String(o || "").toLowerCase().replace(/s$/, "");
    }, u: function(o) {
      return o === void 0;
    } }, C = "en", j = {};
    j[C] = K;
    var G = "$isDayjsObject", F = function(o) {
      return o instanceof W || !(!o || !o[G]);
    }, E = function o(r, e, i) {
      var t;
      if (!r) return C;
      if (typeof r == "string") {
        var l = r.toLowerCase();
        j[l] && (t = l), e && (j[l] = e, t = l);
        var u = r.split("-");
        if (!t && u.length > 1) return o(u[0]);
      } else {
        var f = r.name;
        j[f] = r, t = f;
      }
      return !i && t && (C = t), t || !i && C;
    }, $ = function(o, r) {
      if (F(o)) return o.clone();
      var e = typeof r == "object" ? r : {};
      return e.date = o, e.args = arguments, new W(e);
    }, c = X;
    c.l = E, c.i = F, c.w = function(o, r) {
      return $(o, { locale: r.$L, utc: r.$u, x: r.$x, $offset: r.$offset });
    };
    var W = function() {
      function o(e) {
        this.$L = E(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[G] = !0;
      }
      var r = o.prototype;
      return r.parse = function(e) {
        this.$d = function(i) {
          var t = i.date, l = i.utc;
          if (t === null) return /* @__PURE__ */ new Date(NaN);
          if (c.u(t)) return /* @__PURE__ */ new Date();
          if (t instanceof Date) return new Date(t);
          if (typeof t == "string" && !/Z$/i.test(t)) {
            var u = t.match(q);
            if (u) {
              var f = u[2] - 1 || 0, m = (u[7] || "0").substring(0, 3);
              return l ? new Date(Date.UTC(u[1], f, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, m)) : new Date(u[1], f, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, m);
            }
          }
          return new Date(t);
        }(e), this.init();
      }, r.init = function() {
        var e = this.$d;
        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
      }, r.$utils = function() {
        return c;
      }, r.isValid = function() {
        return this.$d.toString() !== B;
      }, r.isSame = function(e, i) {
        var t = $(e);
        return this.startOf(i) <= t && t <= this.endOf(i);
      }, r.isAfter = function(e, i) {
        return $(e) < this.startOf(i);
      }, r.isBefore = function(e, i) {
        return this.endOf(i) < $(e);
      }, r.$g = function(e, i, t) {
        return c.u(e) ? this[i] : this.set(t, e);
      }, r.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, r.valueOf = function() {
        return this.$d.getTime();
      }, r.startOf = function(e, i) {
        var t = this, l = !!c.u(i) || i, u = c.p(e), f = function(A, O) {
          var k = c.w(t.$u ? Date.UTC(t.$y, O, A) : new Date(t.$y, O, A), t);
          return l ? k : k.endOf(M);
        }, m = function(A, O) {
          return c.w(t.toDate()[A].apply(t.toDate("s"), (l ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), t);
        }, p = this.$W, S = this.$M, T = this.$D, z = "set" + (this.$u ? "UTC" : "");
        switch (u) {
          case x:
            return l ? f(1, 0) : f(31, 11);
          case w:
            return l ? f(1, S) : f(0, S + 1);
          case D:
            var _ = this.$locale().weekStart || 0, P = (p < _ ? p + 7 : p) - _;
            return f(l ? T - P : T + (6 - P), S);
          case M:
          case H:
            return m(z + "Hours", 0);
          case b:
            return m(z + "Minutes", 1);
          case y:
            return m(z + "Seconds", 2);
          case d:
            return m(z + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, r.endOf = function(e) {
        return this.startOf(e, !1);
      }, r.$set = function(e, i) {
        var t, l = c.p(e), u = "set" + (this.$u ? "UTC" : ""), f = (t = {}, t[M] = u + "Date", t[H] = u + "Date", t[w] = u + "Month", t[x] = u + "FullYear", t[b] = u + "Hours", t[y] = u + "Minutes", t[d] = u + "Seconds", t[g] = u + "Milliseconds", t)[l], m = l === M ? this.$D + (i - this.$W) : i;
        if (l === w || l === x) {
          var p = this.clone().set(H, 1);
          p.$d[f](m), p.init(), this.$d = p.set(H, Math.min(this.$D, p.daysInMonth())).$d;
        } else f && this.$d[f](m);
        return this.init(), this;
      }, r.set = function(e, i) {
        return this.clone().$set(e, i);
      }, r.get = function(e) {
        return this[c.p(e)]();
      }, r.add = function(e, i) {
        var t, l = this;
        e = Number(e);
        var u = c.p(i), f = function(S) {
          var T = $(l);
          return c.w(T.date(T.date() + Math.round(S * e)), l);
        };
        if (u === w) return this.set(w, this.$M + e);
        if (u === x) return this.set(x, this.$y + e);
        if (u === M) return f(1);
        if (u === D) return f(7);
        var m = (t = {}, t[y] = a, t[b] = h, t[d] = n, t)[u] || 1, p = this.$d.getTime() + e * m;
        return c.w(p, this);
      }, r.subtract = function(e, i) {
        return this.add(-1 * e, i);
      }, r.format = function(e) {
        var i = this, t = this.$locale();
        if (!this.isValid()) return t.invalidDate || B;
        var l = e || "YYYY-MM-DDTHH:mm:ssZ", u = c.z(this), f = this.$H, m = this.$m, p = this.$M, S = t.weekdays, T = t.months, z = t.meridiem, _ = function(O, k, Y, I) {
          return O && (O[k] || O(i, l)) || Y[k].slice(0, I);
        }, P = function(O) {
          return c.s(f % 12 || 12, O, "0");
        }, A = z || function(O, k, Y) {
          var I = O < 12 ? "AM" : "PM";
          return Y ? I.toLowerCase() : I;
        };
        return l.replace(Q, function(O, k) {
          return k || function(Y) {
            switch (Y) {
              case "YY":
                return String(i.$y).slice(-2);
              case "YYYY":
                return c.s(i.$y, 4, "0");
              case "M":
                return p + 1;
              case "MM":
                return c.s(p + 1, 2, "0");
              case "MMM":
                return _(t.monthsShort, p, T, 3);
              case "MMMM":
                return _(T, p);
              case "D":
                return i.$D;
              case "DD":
                return c.s(i.$D, 2, "0");
              case "d":
                return String(i.$W);
              case "dd":
                return _(t.weekdaysMin, i.$W, S, 2);
              case "ddd":
                return _(t.weekdaysShort, i.$W, S, 3);
              case "dddd":
                return S[i.$W];
              case "H":
                return String(f);
              case "HH":
                return c.s(f, 2, "0");
              case "h":
                return P(1);
              case "hh":
                return P(2);
              case "a":
                return A(f, m, !0);
              case "A":
                return A(f, m, !1);
              case "m":
                return String(m);
              case "mm":
                return c.s(m, 2, "0");
              case "s":
                return String(i.$s);
              case "ss":
                return c.s(i.$s, 2, "0");
              case "SSS":
                return c.s(i.$ms, 3, "0");
              case "Z":
                return u;
            }
            return null;
          }(O) || u.replace(":", "");
        });
      }, r.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, r.diff = function(e, i, t) {
        var l, u = this, f = c.p(i), m = $(e), p = (m.utcOffset() - this.utcOffset()) * a, S = this - m, T = function() {
          return c.m(u, m);
        };
        switch (f) {
          case x:
            l = T() / 12;
            break;
          case w:
            l = T();
            break;
          case U:
            l = T() / 3;
            break;
          case D:
            l = (S - p) / 6048e5;
            break;
          case M:
            l = (S - p) / 864e5;
            break;
          case b:
            l = S / h;
            break;
          case y:
            l = S / a;
            break;
          case d:
            l = S / n;
            break;
          default:
            l = S;
        }
        return t ? l : c.a(l);
      }, r.daysInMonth = function() {
        return this.endOf(w).$D;
      }, r.$locale = function() {
        return j[this.$L];
      }, r.locale = function(e, i) {
        if (!e) return this.$L;
        var t = this.clone(), l = E(e, i, !0);
        return l && (t.$L = l), t;
      }, r.clone = function() {
        return c.w(this.$d, this);
      }, r.toDate = function() {
        return new Date(this.valueOf());
      }, r.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, r.toISOString = function() {
        return this.$d.toISOString();
      }, r.toString = function() {
        return this.$d.toUTCString();
      }, o;
    }(), Z = W.prototype;
    return $.prototype = Z, [["$ms", g], ["$s", d], ["$m", y], ["$H", b], ["$W", M], ["$M", w], ["$y", x], ["$D", H]].forEach(function(o) {
      Z[o[1]] = function(r) {
        return this.$g(r, o[0], o[1]);
      };
    }), $.extend = function(o, r) {
      return o.$i || (o(r, W, $), o.$i = !0), $;
    }, $.locale = E, $.isDayjs = F, $.unix = function(o) {
      return $(1e3 * o);
    }, $.en = j[C], $.Ls = j, $.p = {}, $;
  });
})(V);
var se = V.exports;
const ie = /* @__PURE__ */ ne(se);
class oe {
  getTimestamp() {
    return ie().format();
  }
}
class J {
  constructor(s) {
    L(this, "level");
    L(this, "levelOnly");
    this.level = Object.freeze(s.level), this.levelOnly = Object.freeze(s.levelOnly);
  }
  /**
   * @name tryGetData
   * @description
   * Tries to parse the params.data to string if it was passed (even as undefined)
   * If it was passed, we still ahve to log it as 'undefined',
   * unless it was not passed at all in which case we do not want to log it.
   */
  tryGetData(s) {
    let n = {
      dataAsString: "",
      dataRaw: [],
      hasData: !1,
      message: ""
    };
    const a = s.args || [];
    if (n.hasData = a.length > 1, a.length === 1)
      n.message = a[0];
    else if (a.length > 1) {
      n.message = a[0], a.shift(), n.dataRaw = a;
      try {
        return Array.isArray(a) ? n.dataAsString = a.map((h) => {
          if (typeof h == "object")
            try {
              return JSON.stringify(h);
            } catch {
              return h.toString();
            }
          else
            return h.toString();
        }).join(": ") : n.dataAsString = JSON.stringify(a), n;
      } catch {
        return n.dataAsString = a.join(", "), n;
      }
    }
    return n;
  }
}
class ae extends J {
  constructor(s) {
    super(s);
  }
  async write(s) {
    return new Promise((n) => {
      const { timestamp: a, level: h, args: g } = s, d = `${a} ${h}`;
      g ? console.log(`${d}:`, ...g) : console.log(d), n(!0);
    });
  }
}
class ue extends J {
  constructor(n) {
    super(n);
    L(this, "prefix", Object.freeze("%c "));
    L(this, "levelStyles", {
      log: "background: blue; color: white",
      highlight: "background: lightyellow;",
      debug: "background: blue; color: white",
      info: "background: green; color: white",
      warn: "background: orange; color: white",
      warnhigh: "font-size: 20px; background: orange; color: white",
      error: "background: red; color: white"
    });
    n.levelStyles && (this.levelStyles = Object.freeze(n.levelStyles));
  }
  async write(n) {
    return new Promise((a) => {
      const { timestamp: h } = n, g = (n.level || "").trim(), { message: d, dataRaw: y, hasData: b } = this.tryGetData(n);
      let M = !1;
      if (navigator && (M = /chrome/gi.test(navigator.userAgent)), g !== "log" && M) {
        const D = `${h} ${this.prefix + g} ${d}`.trim();
        b ? console.log(`${D}:`, this.levelStyles[g], ...y) : console.log(`${D}:`, this.levelStyles[g]);
      } else {
        const D = `${h} ${g} ${d}`.trim();
        b ? console.log(`${D}:`, ...y) : console.log(D);
      }
      a(!0);
    });
  }
}
class ce extends J {
  constructor(n) {
    super(n);
    L(this, "domElement");
    //HTMLElement
    L(this, "levelStyles", {
      log: "color: black",
      highlight: "background-color: yellow; color: black",
      debug: "color: blue",
      info: "color: green",
      warn: "color: orange",
      warnhigh: "font-size: 20px; background: orange; color: white",
      error: "color: red"
    });
    this.domElement = n.domElement, n.levelStyles && (this.levelStyles = Object.freeze(n.levelStyles));
  }
  async write(n) {
    return new Promise((a, h) => {
      if (!this.domElement || this.domElement.innerHTML === void 0)
        h("HtmlTransport: write: Invalid or undefined dom element");
      else {
        const { timestamp: g, level: d } = n, { dataAsString: y, hasData: b } = this.tryGetData(n), M = `<span>${g}</span>`;
        let D = "";
        d !== "log" ? D = `<span style="${this.levelStyles[d]}">${d}</span>` : D = `<span>${d}</span>`;
        let w = `${M} ${D}`;
        b ? w = `${w}: <span>${y}</span><br/>` : w = `${w}<br/>`, this.domElement.innerHTML += w, a(!0);
      }
    });
  }
}
class he extends J {
  constructor(n) {
    super(n);
    L(this, "prefix", Object.freeze("\x1B["));
    L(this, "suffix", Object.freeze("\x1B[0;37m"));
    L(this, "levelStyles", {
      log: "0;1;37m",
      // white, bold
      highlight: "7;1;38m",
      // white background, bold
      debug: "0;1;34m",
      // blue, bold
      info: "0;1;32m",
      // green, bold
      warn: "0;1;33m",
      // yellow, bold
      warnhigh: "0;1;35m",
      // purple, bold
      error: "0;1;31m"
      // red, bold
    });
    n.levelStyles && (this.levelStyles = Object.freeze(n.levelStyles));
  }
  async write(n) {
    return new Promise((a) => {
      const { timestamp: h, level: g } = n, d = `${h} ${this.prefix}${this.levelStyles[g]}${g}${this.suffix}:`, y = n.args || [];
      y.length > 0 ? console.log(`${d}:`, ...y) : console.log(d), a(!0);
    });
  }
}
const R = Object.freeze([
  "log",
  "highlight",
  "debug",
  "info",
  "warn",
  "error"
]);
class fe {
  constructor(s) {
    L(this, "supportedLevels");
    L(this, "transports");
    L(this, "timestampService");
    if (s) {
      const { levels: n, transports: a, timestampService: h } = s;
      n && n.length > 0 ? this.initLevels(n) : this.initLevels(), a && a.length > 0 ? this.initTransports(a) : this.initTransports(), h ? this.initTimestampService(h) : this.initTimestampService();
    } else
      this.initLevels(), this.initTransports(), this.initTimestampService();
  }
  timestamp() {
    return this.timestampService ? this.timestampService.getTimestamp() : (/* @__PURE__ */ new Date()).toString();
  }
  initLevels(s) {
    const n = s || [];
    n.length > 0 ? this.supportedLevels = Object.freeze([...n]) : this.supportedLevels = Object.freeze([...R]);
  }
  initTransports(s) {
    (s || []).length > 0 ? this.transports = s : this.transports = [
      new ae({
        level: "error",
        levelOnly: !1
      })
    ];
  }
  initTimestampService(s) {
    s ? this.timestampService = s : this.timestampService = new oe();
  }
  async canProceed(s) {
    return new Promise((n) => {
      let a = !1;
      const { transportLevel: h, transportLevelOnly: g } = s, d = (s.level || "").toString().trim().toLowerCase();
      if (g)
        a = h === d;
      else if (h === d || ["log", "highlight"].indexOf(d) > -1)
        a = !0;
      else {
        const y = this.supportedLevels, b = y.indexOf(h);
        b > 1 && (a = y.slice(
          0,
          b
        ).includes(d));
      }
      n(a);
    });
  }
  async transportsWrite(s) {
    return new Promise((n) => {
      this.transports.forEach(async (a) => {
        if (await this.canProceed({
          transportLevel: a.level,
          transportLevelOnly: a.levelOnly,
          level: s.level
        })) {
          const g = await a.write(s);
          n(g);
        }
      });
    });
  }
  getDefaultLevels() {
    return R;
  }
  getSupportedLevels() {
    return this.supportedLevels;
  }
  log(...s) {
    let n = "log", a = [];
    if ((s || []).length > 0) {
      const g = (s[0] || "").toString().trim().toLowerCase();
      this.supportedLevels.indexOf(g) > -1 ? (n = g, s.shift(), s.length > 0 && (a = s)) : (n = "log", a = s);
    }
    const h = {
      timestamp: this.timestamp(),
      level: n,
      args: a
    };
    this.transportsWrite(h).then(() => {
    });
  }
  highlight(...s) {
    this.log("highlight", ...s);
  }
  debug(...s) {
    this.log("debug", ...s);
  }
  info(...s) {
    this.log("info", ...s);
  }
  warn(...s) {
    this.log("warn", ...s);
  }
  error(...s) {
    this.log("error", ...s);
  }
}
export {
  J as BaseTransport,
  ue as ChromeTransport,
  oe as DayJsTimestampService,
  ae as DefaultTransport,
  ce as HtmlTransport,
  fe as Logger,
  he as StdErrTransport
};
