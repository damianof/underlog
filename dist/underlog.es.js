var K = Object.defineProperty;
var X = (w, r, s) => r in w ? K(w, r, { enumerable: !0, configurable: !0, writable: !0, value: s }) : w[r] = s;
var T = (w, r, s) => (X(w, typeof r != "symbol" ? r + "" : r, s), s);
var ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Z = { exports: {} };
(function(w, r) {
  (function(s, i) {
    w.exports = i();
  })(ee, function() {
    var s = 1e3, i = 6e4, f = 36e5, g = "millisecond", d = "second", p = "minute", M = "hour", D = "day", b = "week", y = "month", B = "quarter", x = "year", A = "date", F = "Invalid Date", R = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, V = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, q = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, J = function(u, n, e) {
      var o = String(u);
      return !o || o.length >= n ? u : "" + Array(n + 1 - o.length).join(e) + u;
    }, Q = { s: J, z: function(u) {
      var n = -u.utcOffset(), e = Math.abs(n), o = Math.floor(e / 60), t = e % 60;
      return (n <= 0 ? "+" : "-") + J(o, 2, "0") + ":" + J(t, 2, "0");
    }, m: function u(n, e) {
      if (n.date() < e.date())
        return -u(e, n);
      var o = 12 * (e.year() - n.year()) + (e.month() - n.month()), t = n.clone().add(o, y), a = e - t < 0, l = n.clone().add(o + (a ? -1 : 1), y);
      return +(-(o + (e - t) / (a ? t - l : l - t)) || 0);
    }, a: function(u) {
      return u < 0 ? Math.ceil(u) || 0 : Math.floor(u);
    }, p: function(u) {
      return { M: y, y: x, w: b, d: D, D: A, h: M, m: p, s: d, ms: g, Q: B }[u] || String(u || "").toLowerCase().replace(/s$/, "");
    }, u: function(u) {
      return u === void 0;
    } }, z = "en", k = {};
    k[z] = q;
    var N = function(u) {
      return u instanceof W;
    }, C = function u(n, e, o) {
      var t;
      if (!n)
        return z;
      if (typeof n == "string") {
        var a = n.toLowerCase();
        k[a] && (t = a), e && (k[a] = e, t = a);
        var l = n.split("-");
        if (!t && l.length > 1)
          return u(l[0]);
      } else {
        var c = n.name;
        k[c] = n, t = c;
      }
      return !o && t && (z = t), t || !o && z;
    }, $ = function(u, n) {
      if (N(u))
        return u.clone();
      var e = typeof n == "object" ? n : {};
      return e.date = u, e.args = arguments, new W(e);
    }, h = Q;
    h.l = C, h.i = N, h.w = function(u, n) {
      return $(u, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var W = function() {
      function u(e) {
        this.$L = C(e.locale, null, !0), this.parse(e);
      }
      var n = u.prototype;
      return n.parse = function(e) {
        this.$d = function(o) {
          var t = o.date, a = o.utc;
          if (t === null)
            return new Date(NaN);
          if (h.u(t))
            return new Date();
          if (t instanceof Date)
            return new Date(t);
          if (typeof t == "string" && !/Z$/i.test(t)) {
            var l = t.match(R);
            if (l) {
              var c = l[2] - 1 || 0, v = (l[7] || "0").substring(0, 3);
              return a ? new Date(Date.UTC(l[1], c, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, v)) : new Date(l[1], c, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, v);
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
      }, n.isSame = function(e, o) {
        var t = $(e);
        return this.startOf(o) <= t && t <= this.endOf(o);
      }, n.isAfter = function(e, o) {
        return $(e) < this.startOf(o);
      }, n.isBefore = function(e, o) {
        return this.endOf(o) < $(e);
      }, n.$g = function(e, o, t) {
        return h.u(e) ? this[o] : this.set(t, e);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(e, o) {
        var t = this, a = !!h.u(o) || o, l = h.p(e), c = function(H, O) {
          var j = h.w(t.$u ? Date.UTC(t.$y, O, H) : new Date(t.$y, O, H), t);
          return a ? j : j.endOf(D);
        }, v = function(H, O) {
          return h.w(t.toDate()[H].apply(t.toDate("s"), (a ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), t);
        }, m = this.$W, S = this.$M, _ = this.$D, L = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case x:
            return a ? c(1, 0) : c(31, 11);
          case y:
            return a ? c(1, S) : c(0, S + 1);
          case b:
            var Y = this.$locale().weekStart || 0, P = (m < Y ? m + 7 : m) - Y;
            return c(a ? _ - P : _ + (6 - P), S);
          case D:
          case A:
            return v(L + "Hours", 0);
          case M:
            return v(L + "Minutes", 1);
          case p:
            return v(L + "Seconds", 2);
          case d:
            return v(L + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(e) {
        return this.startOf(e, !1);
      }, n.$set = function(e, o) {
        var t, a = h.p(e), l = "set" + (this.$u ? "UTC" : ""), c = (t = {}, t[D] = l + "Date", t[A] = l + "Date", t[y] = l + "Month", t[x] = l + "FullYear", t[M] = l + "Hours", t[p] = l + "Minutes", t[d] = l + "Seconds", t[g] = l + "Milliseconds", t)[a], v = a === D ? this.$D + (o - this.$W) : o;
        if (a === y || a === x) {
          var m = this.clone().set(A, 1);
          m.$d[c](v), m.init(), this.$d = m.set(A, Math.min(this.$D, m.daysInMonth())).$d;
        } else
          c && this.$d[c](v);
        return this.init(), this;
      }, n.set = function(e, o) {
        return this.clone().$set(e, o);
      }, n.get = function(e) {
        return this[h.p(e)]();
      }, n.add = function(e, o) {
        var t, a = this;
        e = Number(e);
        var l = h.p(o), c = function(S) {
          var _ = $(a);
          return h.w(_.date(_.date() + Math.round(S * e)), a);
        };
        if (l === y)
          return this.set(y, this.$M + e);
        if (l === x)
          return this.set(x, this.$y + e);
        if (l === D)
          return c(1);
        if (l === b)
          return c(7);
        var v = (t = {}, t[p] = i, t[M] = f, t[d] = s, t)[l] || 1, m = this.$d.getTime() + e * v;
        return h.w(m, this);
      }, n.subtract = function(e, o) {
        return this.add(-1 * e, o);
      }, n.format = function(e) {
        var o = this, t = this.$locale();
        if (!this.isValid())
          return t.invalidDate || F;
        var a = e || "YYYY-MM-DDTHH:mm:ssZ", l = h.z(this), c = this.$H, v = this.$m, m = this.$M, S = t.weekdays, _ = t.months, L = function(O, j, U, E) {
          return O && (O[j] || O(o, a)) || U[j].slice(0, E);
        }, Y = function(O) {
          return h.s(c % 12 || 12, O, "0");
        }, P = t.meridiem || function(O, j, U) {
          var E = O < 12 ? "AM" : "PM";
          return U ? E.toLowerCase() : E;
        }, H = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: m + 1, MM: h.s(m + 1, 2, "0"), MMM: L(t.monthsShort, m, _, 3), MMMM: L(_, m), D: this.$D, DD: h.s(this.$D, 2, "0"), d: String(this.$W), dd: L(t.weekdaysMin, this.$W, S, 2), ddd: L(t.weekdaysShort, this.$W, S, 3), dddd: S[this.$W], H: String(c), HH: h.s(c, 2, "0"), h: Y(1), hh: Y(2), a: P(c, v, !0), A: P(c, v, !1), m: String(v), mm: h.s(v, 2, "0"), s: String(this.$s), ss: h.s(this.$s, 2, "0"), SSS: h.s(this.$ms, 3, "0"), Z: l };
        return a.replace(V, function(O, j) {
          return j || H[O] || l.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(e, o, t) {
        var a, l = h.p(o), c = $(e), v = (c.utcOffset() - this.utcOffset()) * i, m = this - c, S = h.m(this, c);
        return S = (a = {}, a[x] = S / 12, a[y] = S, a[B] = S / 3, a[b] = (m - v) / 6048e5, a[D] = (m - v) / 864e5, a[M] = m / f, a[p] = m / i, a[d] = m / s, a)[l] || m, t ? S : h.a(S);
      }, n.daysInMonth = function() {
        return this.endOf(y).$D;
      }, n.$locale = function() {
        return k[this.$L];
      }, n.locale = function(e, o) {
        if (!e)
          return this.$L;
        var t = this.clone(), a = C(e, o, !0);
        return a && (t.$L = a), t;
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
      }, u;
    }(), G = W.prototype;
    return $.prototype = G, [["$ms", g], ["$s", d], ["$m", p], ["$H", M], ["$W", D], ["$M", y], ["$y", x], ["$D", A]].forEach(function(u) {
      G[u[1]] = function(n) {
        return this.$g(n, u[0], u[1]);
      };
    }), $.extend = function(u, n) {
      return u.$i || (u(n, W, $), u.$i = !0), $;
    }, $.locale = C, $.isDayjs = N, $.unix = function(u) {
      return $(1e3 * u);
    }, $.en = k[z], $.Ls = k, $.p = {}, $;
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
    T(this, "level");
    T(this, "levelOnly");
    this.level = Object.freeze(r.level), this.levelOnly = Object.freeze(r.levelOnly);
  }
  tryGetData(r) {
    let s = {
      dataAsString: "",
      dataRaw: [],
      hasData: !1,
      message: ""
    };
    const i = r.args || [];
    if (s.hasData = i.length > 1, i.length === 1)
      s.message = i[0];
    else if (i.length > 1) {
      s.message = i[0], i.shift(), s.dataRaw = i;
      try {
        return Array.isArray(i) ? s.dataAsString = i.map((f) => {
          if (typeof f == "object")
            try {
              return JSON.stringify(f);
            } catch {
              return f.toString();
            }
          else
            return f.toString();
        }).join(": ") : s.dataAsString = JSON.stringify(i), s;
      } catch {
        return s.dataAsString = i.join(", "), s;
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
      const { timestamp: i, level: f, args: g } = r, d = `${i} ${f}`;
      g ? console.log(`${d}:`, ...g) : console.log(d), s(!0);
    });
  }
}
class ie extends I {
  constructor(s) {
    super(s);
    T(this, "prefix", Object.freeze("%c "));
    T(this, "levelStyles", {
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
    return new Promise((i) => {
      const { timestamp: f } = s, g = (s.level || "").trim(), { message: d, dataRaw: p, hasData: M } = this.tryGetData(s);
      let D = !1;
      if (navigator && (D = /chrome/gi.test(navigator.userAgent)), g !== "log" && D) {
        const b = `${f} ${this.prefix + g} ${d}`.trim();
        M ? console.log(`${b}:`, this.levelStyles[g], ...p) : console.log(`${b}:`, this.levelStyles[g]);
      } else {
        const b = `${f} ${g} ${d}`.trim();
        M ? console.log(`${b}:`, ...p) : console.log(b);
      }
      i(!0);
    });
  }
}
class oe extends I {
  constructor(s) {
    super(s);
    T(this, "domElement");
    T(this, "levelStyles", {
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
    return new Promise((i, f) => {
      if (!this.domElement || this.domElement.innerHTML === void 0)
        f("HtmlTransport: write: Invalid or undefined dom element");
      else {
        const { timestamp: g, level: d } = s, { dataAsString: p, hasData: M } = this.tryGetData(s), D = `<span>${g}</span>`;
        let b = "";
        d !== "log" ? b = `<span style="${this.levelStyles[d]}">${d}</span>` : b = `<span>${d}</span>`;
        let y = `${D} ${b}`;
        M ? y = `${y}: <span>${p}</span><br/>` : y = `${y}<br/>`, this.domElement.innerHTML += y, i(!0);
      }
    });
  }
}
class le extends I {
  constructor(s) {
    super(s);
    T(this, "prefix", Object.freeze("\x1B["));
    T(this, "suffix", Object.freeze("\x1B[0;37m"));
    T(this, "levelStyles", {
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
    return new Promise((i) => {
      const { timestamp: f, level: g } = s, d = `${f} ${this.prefix}${this.levelStyles[g]}${g}${this.suffix}:`, p = s.args || [];
      p.length > 0 ? console.log(`${d}:`, ...p) : console.log(d), i(!0);
    });
  }
}
class ae {
  constructor(r) {
    T(this, "supportedLevels");
    T(this, "transports");
    T(this, "timestampService");
    if (r) {
      const { levels: s, transports: i, timestampService: f } = r;
      s ? this.initLevels(s) : this.initLevels(), i && i.length > 0 ? this.initTransports(i) : this.initTransports(), f ? this.initTimestampService(f) : this.initTimestampService();
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
      let i = !1;
      const { transportLevel: f, transportLevelOnly: g, level: d } = r;
      if (g)
        i = f === d;
      else if (f === d || ["log", "highlight"].indexOf(d) > -1)
        i = !0;
      else {
        const p = this.supportedLevels, M = p.indexOf(f);
        M > 1 && (i = p.slice(
          0,
          M
        ).includes(d));
      }
      s(i);
    });
  }
  async transportsWrite(r) {
    return new Promise((s) => {
      this.transports.forEach(async (i) => {
        if (await this.canProceed({
          transportLevel: i.level,
          transportLevelOnly: i.levelOnly,
          level: r.level
        })) {
          const g = await i.write(r);
          s(g);
        }
      });
    });
  }
  log(...r) {
    let s = "log", i = [];
    if ((r || []).length > 0) {
      const g = (r[0] || "").toString().trim().toLowerCase();
      this.supportedLevels.indexOf(g) > -1 ? (s = g, r.shift(), r.length > 0 && (i = r)) : (s = "log", i = r);
    }
    const f = {
      timestamp: this.timestamp(),
      level: s,
      args: i
    };
    this.transportsWrite(f).then(() => {
    });
  }
  highlight(...r) {
    this.log("highlight", ...r);
  }
  debug(...r) {
    this.log("debug", ...r);
  }
  info(...r) {
    this.log("info", ...r);
  }
  warn(...r) {
    this.log("warn", ...r);
  }
  error(...r) {
    this.log("error", ...r);
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
