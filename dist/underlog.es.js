var v = Object.defineProperty;
var f = (n, e, t) => e in n ? v(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var o = (n, e, t) => (f(n, typeof e != "symbol" ? e + "" : e, t), t);
const d = require("dayjs");
class p {
  getTimestamp() {
    return d().format();
  }
}
class u {
  constructor(e) {
    o(this, "level");
    o(this, "levelOnly");
    this.level = Object.freeze(e.level), this.levelOnly = Object.freeze(e.levelOnly);
  }
  tryGetData(e) {
    let t = {
      dataAsString: "",
      dataRaw: [],
      hasData: !1
    };
    const s = e.args || [];
    if (t.hasData = s.length > 0, s.length > 0) {
      t.dataRaw = s;
      try {
        return Array.isArray(s) ? t.dataAsString = s.join(", ") : t.dataAsString = JSON.stringify(s), t;
      } catch {
        return t.dataAsString = s.join(", "), t;
      }
    }
    return t;
  }
}
class y extends u {
  constructor(e) {
    super(e);
  }
  async write(e) {
    return new Promise((t) => {
      const { timestamp: s, level: r, args: i } = e, l = `${s} ${r}`;
      i ? console.log(`${l}:`, ...i) : console.log(l), t(!0);
    });
  }
}
class S extends u {
  constructor(t) {
    super(t);
    o(this, "prefix", Object.freeze("%c "));
    o(this, "levelStyles", {
      log: "background: blue; color: white",
      highlight: "background: yellow;",
      debug: "background: blue; color: white",
      info: "background: green; color: white",
      warn: "background: orange; color: white",
      ["warn-high"]: "font-size: 20px; background: orange; color: white",
      error: "background: red; color: white"
    });
    t.levelStyles && (this.levelStyles = Object.freeze(t.levelStyles));
  }
  async write(t) {
    return new Promise((s) => {
      const { timestamp: r, level: i } = t, { dataAsString: l, hasData: a } = this.tryGetData(t);
      let h = !1;
      if (navigator && (h = /chrome/gi.test(navigator.userAgent)), i !== "log" && h) {
        const c = `${r}${this.prefix + i}`.trim();
        a ? console.log(`${c}:`, this.levelStyles[i], l) : console.log(`${c}:`, this.levelStyles[i]);
      } else {
        const c = `${r} ${i}`.trim();
        a ? console.log(`${c}:`, l) : console.log(c);
      }
      s(!0);
    });
  }
}
class b extends u {
  constructor(t) {
    super(t);
    o(this, "domElement");
    o(this, "levelStyles", {
      log: "color: black",
      highlight: "background-color: yellow; color: black",
      debug: "color: blue",
      info: "color: green",
      warn: "color: orange",
      ["warn-high"]: "font-size: 20px; background: orange; color: white",
      error: "color: red"
    });
    this.domElement = t.domElement, t.levelStyles && (this.levelStyles = Object.freeze(t.levelStyles));
  }
  async write(t) {
    return new Promise((s, r) => {
      if (!this.domElement || this.domElement.innerHTML === void 0)
        r("HtmlTransport: write: Invalid or undefined dom element");
      else {
        const { timestamp: i, level: l } = t, { dataAsString: a, hasData: h } = this.tryGetData(t), c = `<span>${i}</span>`;
        let m = "";
        l !== "log" ? m = `<span style="${this.levelStyles[l]}">${l}</span>` : m = `<span>${l}</span>`;
        let g = `${c} ${m}`;
        h ? g = `${g}: <span>${a}</span><br/>` : g = `${g}<br/>`, this.domElement.innerHTML += g, s(!0);
      }
    });
  }
}
class $ extends u {
  constructor(t) {
    super(t);
    o(this, "prefix", Object.freeze("\x1B["));
    o(this, "suffix", Object.freeze("\x1B[0;37m"));
    o(this, "levelStyles", {
      log: "0;1;37m",
      highlight: "7;1;36m",
      debug: "0;1;34m",
      info: "0;1;32m",
      warn: "0;1;33m",
      ["warn-high"]: "0;1;35m",
      error: "0;1;31m"
    });
    t.levelStyles && (this.levelStyles = Object.freeze(t.levelStyles));
  }
  async write(t) {
    return new Promise((s) => {
      const { timestamp: r, level: i } = t, l = `${r} ${this.prefix}${this.levelStyles[i]}${i}${this.suffix}:`, a = t.args || [];
      a.length > 0 ? console.log(`${l}:`, ...a) : console.log(l), s(!0);
    });
  }
}
class L {
  constructor(e) {
    o(this, "supportedLevels");
    o(this, "transports");
    o(this, "timestampService");
    if (e) {
      const { levels: t, transports: s, timestampService: r } = e;
      this.initLevels(t), this.initTransports(s), this.initTimestampService(r);
    } else
      this.initLevels(), this.initTransports(), this.initTimestampService();
  }
  timestamp() {
    return this.timestampService ? this.timestampService.getTimestamp() : new Date().toString();
  }
  initLevels(e) {
    const t = ["highlight", "debug"];
    (e || []).length > 0 ? this.supportedLevels = [...t, ...e] : this.supportedLevels = t;
  }
  initTransports(e) {
    (e || []).length > 0 ? this.transports = e : this.transports = [
      new y({
        level: "error",
        levelOnly: !1
      })
    ];
  }
  initTimestampService(e) {
    e ? this.timestampService = e : this.timestampService = new p();
  }
  async canProceed(e) {
    return new Promise((t) => {
      let s = !1;
      const { transportLevel: r, transportLevelOnly: i, level: l } = e;
      if (i)
        s = r === l;
      else if (r === l || ["log", "highlight"].indexOf(l) > -1)
        s = !0;
      else {
        const a = this.supportedLevels, h = a.indexOf(r);
        h > 1 && (s = a.slice(
          0,
          h
        ).includes(l));
      }
      t(s);
    });
  }
  async transportsWrite(e) {
    return new Promise((t) => {
      this.transports.forEach(async (s) => {
        if (await this.canProceed({
          transportLevel: s.level,
          transportLevelOnly: s.levelOnly,
          level: e.level
        })) {
          const i = await s.write(e);
          t(i);
        }
      });
    });
  }
  log(...e) {
    let t = "log", s = [];
    (e || []).length > 0 && (t = e.shift(), e.length > 0 && (s = e));
    const r = {
      timestamp: this.timestamp(),
      level: t,
      args: s
    };
    this.transportsWrite(r).then(() => {
    });
  }
  highlight(...e) {
    this.log(e);
  }
  debug(...e) {
    this.log(e);
  }
  info(...e) {
    this.log(e);
  }
  warn(...e) {
    this.log(e);
  }
  error(...e) {
    this.log(e);
  }
}
export {
  u as BaseTransport,
  S as ChromeTransport,
  p as DayJsTimestampService,
  y as DefaultTransport,
  b as HtmlTransport,
  L as Logger,
  $ as StdErrTransport
};
