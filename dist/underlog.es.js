var K = Object.defineProperty;
var X = (M, r, s) => r in M ? K(M, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : M[r] = s;
var O = (M, r, s) => (X(M, typeof r != "symbol" ? r + "" : r, s), s);
var ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Z = { exports: {} };
(function(M, r) {
  (function(s, u) {
    M.exports = u();
  })(ee, function() {
    var s = 1e3, u = 6e4, m = 36e5, g = "millisecond", f = "second", p = "minute", D = "hour", y = "day", x = "week", S = "month", B = "quarter", L = "year", H = "date", F = "Invalid Date", V = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, R = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, q = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, J = function(a, n, e) {
      var i = String(a);
      return !i || i.length >= n ? a : "" + Array(n + 1 - i.length).join(e) + a;
    }, Q = { s: J, z: function(a) {
      var n = -a.utcOffset(), e = Math.abs(n), i = Math.floor(e / 60), t = e % 60;
      return (n <= 0 ? "+" : "-") + J(i, 2, "0") + ":" + J(t, 2, "0");
    }, m: function a(n, e) {
      if (n.date() < e.date())
        return -a(e, n);
      var i = 12 * (e.year() - n.year()) + (e.month() - n.month()), t = n.clone().add(i, S), l = e - t < 0, o = n.clone().add(i + (l ? -1 : 1), S);
      return +(-(i + (e - t) / (l ? t - o : o - t)) || 0);
    }, a: function(a) {
      return a < 0 ? Math.ceil(a) || 0 : Math.floor(a);
    }, p: function(a) {
      return { M: S, y: L, w: x, d: y, D: H, h: D, m: p, s: f, ms: g, Q: B }[a] || String(a || "").toLowerCase().replace(/s$/, "");
    }, u: function(a) {
      return a === void 0;
    } }, z = "en", A = {};
    A[z] = q;
    var N = function(a) {
      return a instanceof C;
    }, W = function a(n, e, i) {
      var t;
      if (!n)
        return z;
      if (typeof n == "string") {
        var l = n.toLowerCase();
        A[l] && (t = l), e && (A[l] = e, t = l);
        var o = n.split("-");
        if (!t && o.length > 1)
          return a(o[0]);
      } else {
        var c = n.name;
        A[c] = n, t = c;
      }
      return !i && t && (z = t), t || !i && z;
    }, v = function(a, n) {
      if (N(a))
        return a.clone();
      var e = typeof n == "object" ? n : {};
      return e.date = a, e.args = arguments, new C(e);
    }, h = Q;
    h.l = W, h.i = N, h.w = function(a, n) {
      return v(a, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var C = function() {
      function a(e) {
        this.$L = W(e.locale, null, !0), this.parse(e);
      }
      var n = a.prototype;
      return n.parse = function(e) {
        this.$d = function(i) {
          var t = i.date, l = i.utc;
          if (t === null)
            return new Date(NaN);
          if (h.u(t))
            return new Date();
          if (t instanceof Date)
            return new Date(t);
          if (typeof t == "string" && !/Z$/i.test(t)) {
            var o = t.match(V);
            if (o) {
              var c = o[2] - 1 || 0, $ = (o[7] || "0").substring(0, 3);
              return l ? new Date(Date.UTC(o[1], c, o[3] || 1, o[4] || 0, o[5] || 0, o[6] || 0, $)) : new Date(o[1], c, o[3] || 1, o[4] || 0, o[5] || 0, o[6] || 0, $);
            }
          }
          return new Date(t);
        }(e), this.$x = e.x || {}, this.init();
      }, n.init = function() {
        var e = this.$d;
        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
      }, n.$utils = function() {
        return h;
      }, n.isValid = function() {
        return this.$d.toString() !== F;
      }, n.isSame = function(e, i) {
        var t = v(e);
        return this.startOf(i) <= t && t <= this.endOf(i);
      }, n.isAfter = function(e, i) {
        return v(e) < this.startOf(i);
      }, n.isBefore = function(e, i) {
        return this.endOf(i) < v(e);
      }, n.$g = function(e, i, t) {
        return h.u(e) ? this[i] : this.set(t, e);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(e, i) {
        var t = this, l = !!h.u(i) || i, o = h.p(e), c = function(j, b) {
          var k = h.w(t.$u ? Date.UTC(t.$y, b, j) : new Date(t.$y, b, j), t);
          return l ? k : k.endOf(y);
        }, $ = function(j, b) {
          return h.w(t.toDate()[j].apply(t.toDate("s"), (l ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(b)), t);
        }, d = this.$W, w = this.$M, _ = this.$D, T = "set" + (this.$u ? "UTC" : "");
        switch (o) {
          case L:
            return l ? c(1, 0) : c(31, 11);
          case S:
            return l ? c(1, w) : c(0, w + 1);
          case x:
            var Y = this.$locale().weekStart || 0, P = (d < Y ? d + 7 : d) - Y;
            return c(l ? _ - P : _ + (6 - P), w);
          case y:
          case H:
            return $(T + "Hours", 0);
          case D:
            return $(T + "Minutes", 1);
          case p:
            return $(T + "Seconds", 2);
          case f:
            return $(T + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(e) {
        return this.startOf(e, !1);
      }, n.$set = function(e, i) {
        var t, l = h.p(e), o = "set" + (this.$u ? "UTC" : ""), c = (t = {}, t[y] = o + "Date", t[H] = o + "Date", t[S] = o + "Month", t[L] = o + "FullYear", t[D] = o + "Hours", t[p] = o + "Minutes", t[f] = o + "Seconds", t[g] = o + "Milliseconds", t)[l], $ = l === y ? this.$D + (i - this.$W) : i;
        if (l === S || l === L) {
          var d = this.clone().set(H, 1);
          d.$d[c]($), d.init(), this.$d = d.set(H, Math.min(this.$D, d.daysInMonth())).$d;
        } else
          c && this.$d[c]($);
        return this.init(), this;
      }, n.set = function(e, i) {
        return this.clone().$set(e, i);
      }, n.get = function(e) {
        return this[h.p(e)]();
      }, n.add = function(e, i) {
        var t, l = this;
        e = Number(e);
        var o = h.p(i), c = function(w) {
          var _ = v(l);
          return h.w(_.date(_.date() + Math.round(w * e)), l);
        };
        if (o === S)
          return this.set(S, this.$M + e);
        if (o === L)
          return this.set(L, this.$y + e);
        if (o === y)
          return c(1);
        if (o === x)
          return c(7);
        var $ = (t = {}, t[p] = u, t[D] = m, t[f] = s, t)[o] || 1, d = this.$d.getTime() + e * $;
        return h.w(d, this);
      }, n.subtract = function(e, i) {
        return this.add(-1 * e, i);
      }, n.format = function(e) {
        var i = this, t = this.$locale();
        if (!this.isValid())
          return t.invalidDate || F;
        var l = e || "YYYY-MM-DDTHH:mm:ssZ", o = h.z(this), c = this.$H, $ = this.$m, d = this.$M, w = t.weekdays, _ = t.months, T = function(b, k, U, E) {
          return b && (b[k] || b(i, l)) || U[k].slice(0, E);
        }, Y = function(b) {
          return h.s(c % 12 || 12, b, "0");
        }, P = t.meridiem || function(b, k, U) {
          var E = b < 12 ? "AM" : "PM";
          return U ? E.toLowerCase() : E;
        }, j = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: d + 1, MM: h.s(d + 1, 2, "0"), MMM: T(t.monthsShort, d, _, 3), MMMM: T(_, d), D: this.$D, DD: h.s(this.$D, 2, "0"), d: String(this.$W), dd: T(t.weekdaysMin, this.$W, w, 2), ddd: T(t.weekdaysShort, this.$W, w, 3), dddd: w[this.$W], H: String(c), HH: h.s(c, 2, "0"), h: Y(1), hh: Y(2), a: P(c, $, !0), A: P(c, $, !1), m: String($), mm: h.s($, 2, "0"), s: String(this.$s), ss: h.s(this.$s, 2, "0"), SSS: h.s(this.$ms, 3, "0"), Z: o };
        return l.replace(R, function(b, k) {
          return k || j[b] || o.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(e, i, t) {
        var l, o = h.p(i), c = v(e), $ = (c.utcOffset() - this.utcOffset()) * u, d = this - c, w = h.m(this, c);
        return w = (l = {}, l[L] = w / 12, l[S] = w, l[B] = w / 3, l[x] = (d - $) / 6048e5, l[y] = (d - $) / 864e5, l[D] = d / m, l[p] = d / u, l[f] = d / s, l)[o] || d, t ? w : h.a(w);
      }, n.daysInMonth = function() {
        return this.endOf(S).$D;
      }, n.$locale = function() {
        return A[this.$L];
      }, n.locale = function(e, i) {
        if (!e)
          return this.$L;
        var t = this.clone(), l = W(e, i, !0);
        return l && (t.$L = l), t;
      }, n.clone = function() {
        return h.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, a;
    }(), G = C.prototype;
    return v.prototype = G, [["$ms", g], ["$s", f], ["$m", p], ["$H", D], ["$W", y], ["$M", S], ["$y", L], ["$D", H]].forEach(function(a) {
      G[a[1]] = function(n) {
        return this.$g(n, a[0], a[1]);
      };
    }), v.extend = function(a, n) {
      return a.$i || (a(n, C, v), a.$i = !0), v;
    }, v.locale = W, v.isDayjs = N, v.unix = function(a) {
      return v(1e3 * a);
    }, v.en = A[z], v.Ls = A, v.p = {}, v;
  });
})(Z);
const te = Z.exports;
class ne {
  getTimestamp() {
    return te().format();
  }
}
class I {
  constructor(r) {
    O(this, "level");
    O(this, "levelOnly");
    this.level = Object.freeze(r.level), this.levelOnly = Object.freeze(r.levelOnly);
  }
  tryGetData(r) {
    let s = {
      dataAsString: "",
      dataRaw: [],
      hasData: !1
    };
    const u = r.args || [];
    if (s.hasData = u.length > 0, u.length > 0) {
      s.dataRaw = u;
      try {
        return Array.isArray(u) ? s.dataAsString = u.join(", ") : s.dataAsString = JSON.stringify(u), s;
      } catch {
        return s.dataAsString = u.join(", "), s;
      }
    }
    return s;
  }
}
class se extends I {
  constructor(r) {
    super(r);
  }
  async write(r) {
    return new Promise((s) => {
      const { timestamp: u, level: m, args: g } = r, f = `${u} ${m}`;
      g ? console.log(`${f}:`, ...g) : console.log(f), s(!0);
    });
  }
}
class ie extends I {
  constructor(s) {
    super(s);
    O(this, "prefix", Object.freeze("%c "));
    O(this, "levelStyles", {
      log: "background: blue; color: white",
      highlight: "background: yellow;",
      debug: "background: blue; color: white",
      info: "background: green; color: white",
      warn: "background: orange; color: white",
      ["warn-high"]: "font-size: 20px; background: orange; color: white",
      error: "background: red; color: white"
    });
    s.levelStyles && (this.levelStyles = Object.freeze(s.levelStyles));
  }
  async write(s) {
    return new Promise((u) => {
      const { timestamp: m, level: g } = s, { dataAsString: f, hasData: p } = this.tryGetData(s);
      let D = !1;
      if (navigator && (D = /chrome/gi.test(navigator.userAgent)), g !== "log" && D) {
        const y = `${m}${this.prefix + g}`.trim();
        p ? console.log(`${y}:`, this.levelStyles[g], f) : console.log(`${y}:`, this.levelStyles[g]);
      } else {
        const y = `${m} ${g}`.trim();
        p ? console.log(`${y}:`, f) : console.log(y);
      }
      u(!0);
    });
  }
}
class oe extends I {
  constructor(s) {
    super(s);
    O(this, "domElement");
    O(this, "levelStyles", {
      log: "color: black",
      highlight: "background-color: yellow; color: black",
      debug: "color: blue",
      info: "color: green",
      warn: "color: orange",
      ["warn-high"]: "font-size: 20px; background: orange; color: white",
      error: "color: red"
    });
    this.domElement = s.domElement, s.levelStyles && (this.levelStyles = Object.freeze(s.levelStyles));
  }
  async write(s) {
    return new Promise((u, m) => {
      if (!this.domElement || this.domElement.innerHTML === void 0)
        m("HtmlTransport: write: Invalid or undefined dom element");
      else {
        const { timestamp: g, level: f } = s, { dataAsString: p, hasData: D } = this.tryGetData(s), y = `<span>${g}</span>`;
        let x = "";
        f !== "log" ? x = `<span style="${this.levelStyles[f]}">${f}</span>` : x = `<span>${f}</span>`;
        let S = `${y} ${x}`;
        D ? S = `${S}: <span>${p}</span><br/>` : S = `${S}<br/>`, this.domElement.innerHTML += S, u(!0);
      }
    });
  }
}
class le extends I {
  constructor(s) {
    super(s);
    O(this, "prefix", Object.freeze("\x1B["));
    O(this, "suffix", Object.freeze("\x1B[0;37m"));
    O(this, "levelStyles", {
      log: "0;1;37m",
      highlight: "7;1;36m",
      debug: "0;1;34m",
      info: "0;1;32m",
      warn: "0;1;33m",
      ["warn-high"]: "0;1;35m",
      error: "0;1;31m"
    });
    s.levelStyles && (this.levelStyles = Object.freeze(s.levelStyles));
  }
  async write(s) {
    return new Promise((u) => {
      const { timestamp: m, level: g } = s, f = `${m} ${this.prefix}${this.levelStyles[g]}${g}${this.suffix}:`, p = s.args || [];
      p.length > 0 ? console.log(`${f}:`, ...p) : console.log(f), u(!0);
    });
  }
}
class ae {
  constructor(r) {
    O(this, "supportedLevels");
    O(this, "transports");
    O(this, "timestampService");
    if (r) {
      const { levels: s, transports: u, timestampService: m } = r;
      this.initLevels(s), this.initTransports(u), this.initTimestampService(m);
    } else
      this.initLevels(), this.initTransports(), this.initTimestampService();
  }
  timestamp() {
    return this.timestampService ? this.timestampService.getTimestamp() : new Date().toString();
  }
  initLevels(r) {
    const s = ["highlight", "debug"];
    (r || []).length > 0 ? this.supportedLevels = [...s, ...r] : this.supportedLevels = s;
  }
  initTransports(r) {
    (r || []).length > 0 ? this.transports = r : this.transports = [
      new se({
        level: "error",
        levelOnly: !1
      })
    ];
  }
  initTimestampService(r) {
    r ? this.timestampService = r : this.timestampService = new ne();
  }
  async canProceed(r) {
    return new Promise((s) => {
      let u = !1;
      const { transportLevel: m, transportLevelOnly: g, level: f } = r;
      if (g)
        u = m === f;
      else if (m === f || ["log", "highlight"].indexOf(f) > -1)
        u = !0;
      else {
        const p = this.supportedLevels, D = p.indexOf(m);
        D > 1 && (u = p.slice(
          0,
          D
        ).includes(f));
      }
      s(u);
    });
  }
  async transportsWrite(r) {
    return new Promise((s) => {
      this.transports.forEach(async (u) => {
        if (await this.canProceed({
          transportLevel: u.level,
          transportLevelOnly: u.levelOnly,
          level: r.level
        })) {
          const g = await u.write(r);
          s(g);
        }
      });
    });
  }
  log(...r) {
    let s = "log", u = [];
    (r || []).length > 0 && (s = r.shift(), r.length > 0 && (u = r));
    const m = {
      timestamp: this.timestamp(),
      level: s,
      args: u
    };
    this.transportsWrite(m).then(() => {
    });
  }
  highlight(...r) {
    this.log(r);
  }
  debug(...r) {
    this.log(r);
  }
  info(...r) {
    this.log(r);
  }
  warn(...r) {
    this.log(r);
  }
  error(...r) {
    this.log(r);
  }
}
export {
  I as BaseTransport,
  ie as ChromeTransport,
  ne as DayJsTimestampService,
  se as DefaultTransport,
  oe as HtmlTransport,
  ae as Logger,
  le as StdErrTransport
};
