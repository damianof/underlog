(function($,T){typeof exports=="object"&&typeof module<"u"?T(exports):typeof define=="function"&&define.amd?define(["exports"],T):($=typeof globalThis<"u"?globalThis:$||self,T($.underlog={}))})(this,function($){"use strict";var le=Object.defineProperty;var ae=($,T,_)=>T in $?le($,T,{enumerable:!0,configurable:!0,writable:!0,value:_}):$[T]=_;var L=($,T,_)=>(ae($,typeof T!="symbol"?T+"":T,_),_);var T=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},_={exports:{}};(function(j,r){(function(s,i){j.exports=i()})(T,function(){var s=1e3,i=6e4,f=36e5,g="millisecond",d="second",y="minute",M="hour",b="day",D="week",S="month",V="quarter",H="year",P="date",q="Invalid Date",se=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,re=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,ie={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},U=function(u,n,e){var o=String(u);return!o||o.length>=n?u:""+Array(n+1-o.length).join(e)+u},oe={s:U,z:function(u){var n=-u.utcOffset(),e=Math.abs(n),o=Math.floor(e/60),t=e%60;return(n<=0?"+":"-")+U(o,2,"0")+":"+U(t,2,"0")},m:function u(n,e){if(n.date()<e.date())return-u(e,n);var o=12*(e.year()-n.year())+(e.month()-n.month()),t=n.clone().add(o,S),a=e-t<0,l=n.clone().add(o+(a?-1:1),S);return+(-(o+(e-t)/(a?t-l:l-t))||0)},a:function(u){return u<0?Math.ceil(u)||0:Math.floor(u)},p:function(u){return{M:S,y:H,w:D,d:b,D:P,h:M,m:y,s:d,ms:g,Q:V}[u]||String(u||"").toLowerCase().replace(/s$/,"")},u:function(u){return u===void 0}},W="en",z={};z[W]=ie;var F=function(u){return u instanceof N},J=function u(n,e,o){var t;if(!n)return W;if(typeof n=="string"){var a=n.toLowerCase();z[a]&&(t=a),e&&(z[a]=e,t=a);var l=n.split("-");if(!t&&l.length>1)return u(l[0])}else{var c=n.name;z[c]=n,t=c}return!o&&t&&(W=t),t||!o&&W},p=function(u,n){if(F(u))return u.clone();var e=typeof n=="object"?n:{};return e.date=u,e.args=arguments,new N(e)},h=oe;h.l=J,h.i=F,h.w=function(u,n){return p(u,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var N=function(){function u(e){this.$L=J(e.locale,null,!0),this.parse(e)}var n=u.prototype;return n.parse=function(e){this.$d=function(o){var t=o.date,a=o.utc;if(t===null)return new Date(NaN);if(h.u(t))return new Date;if(t instanceof Date)return new Date(t);if(typeof t=="string"&&!/Z$/i.test(t)){var l=t.match(se);if(l){var c=l[2]-1||0,v=(l[7]||"0").substring(0,3);return a?new Date(Date.UTC(l[1],c,l[3]||1,l[4]||0,l[5]||0,l[6]||0,v)):new Date(l[1],c,l[3]||1,l[4]||0,l[5]||0,l[6]||0,v)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},n.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},n.$utils=function(){return h},n.isValid=function(){return this.$d.toString()!==q},n.isSame=function(e,o){var t=p(e);return this.startOf(o)<=t&&t<=this.endOf(o)},n.isAfter=function(e,o){return p(e)<this.startOf(o)},n.isBefore=function(e,o){return this.endOf(o)<p(e)},n.$g=function(e,o,t){return h.u(e)?this[o]:this.set(t,e)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(e,o){var t=this,a=!!h.u(o)||o,l=h.p(e),c=function(Y,O){var A=h.w(t.$u?Date.UTC(t.$y,O,Y):new Date(t.$y,O,Y),t);return a?A:A.endOf(b)},v=function(Y,O){return h.w(t.toDate()[Y].apply(t.toDate("s"),(a?[0,0,0,0]:[23,59,59,999]).slice(O)),t)},m=this.$W,w=this.$M,k=this.$D,x="set"+(this.$u?"UTC":"");switch(l){case H:return a?c(1,0):c(31,11);case S:return a?c(1,w):c(0,w+1);case D:var E=this.$locale().weekStart||0,I=(m<E?m+7:m)-E;return c(a?k-I:k+(6-I),w);case b:case P:return v(x+"Hours",0);case M:return v(x+"Minutes",1);case y:return v(x+"Seconds",2);case d:return v(x+"Milliseconds",3);default:return this.clone()}},n.endOf=function(e){return this.startOf(e,!1)},n.$set=function(e,o){var t,a=h.p(e),l="set"+(this.$u?"UTC":""),c=(t={},t[b]=l+"Date",t[P]=l+"Date",t[S]=l+"Month",t[H]=l+"FullYear",t[M]=l+"Hours",t[y]=l+"Minutes",t[d]=l+"Seconds",t[g]=l+"Milliseconds",t)[a],v=a===b?this.$D+(o-this.$W):o;if(a===S||a===H){var m=this.clone().set(P,1);m.$d[c](v),m.init(),this.$d=m.set(P,Math.min(this.$D,m.daysInMonth())).$d}else c&&this.$d[c](v);return this.init(),this},n.set=function(e,o){return this.clone().$set(e,o)},n.get=function(e){return this[h.p(e)]()},n.add=function(e,o){var t,a=this;e=Number(e);var l=h.p(o),c=function(w){var k=p(a);return h.w(k.date(k.date()+Math.round(w*e)),a)};if(l===S)return this.set(S,this.$M+e);if(l===H)return this.set(H,this.$y+e);if(l===b)return c(1);if(l===D)return c(7);var v=(t={},t[y]=i,t[M]=f,t[d]=s,t)[l]||1,m=this.$d.getTime()+e*v;return h.w(m,this)},n.subtract=function(e,o){return this.add(-1*e,o)},n.format=function(e){var o=this,t=this.$locale();if(!this.isValid())return t.invalidDate||q;var a=e||"YYYY-MM-DDTHH:mm:ssZ",l=h.z(this),c=this.$H,v=this.$m,m=this.$M,w=t.weekdays,k=t.months,x=function(O,A,G,B){return O&&(O[A]||O(o,a))||G[A].slice(0,B)},E=function(O){return h.s(c%12||12,O,"0")},I=t.meridiem||function(O,A,G){var B=O<12?"AM":"PM";return G?B.toLowerCase():B},Y={YY:String(this.$y).slice(-2),YYYY:this.$y,M:m+1,MM:h.s(m+1,2,"0"),MMM:x(t.monthsShort,m,k,3),MMMM:x(k,m),D:this.$D,DD:h.s(this.$D,2,"0"),d:String(this.$W),dd:x(t.weekdaysMin,this.$W,w,2),ddd:x(t.weekdaysShort,this.$W,w,3),dddd:w[this.$W],H:String(c),HH:h.s(c,2,"0"),h:E(1),hh:E(2),a:I(c,v,!0),A:I(c,v,!1),m:String(v),mm:h.s(v,2,"0"),s:String(this.$s),ss:h.s(this.$s,2,"0"),SSS:h.s(this.$ms,3,"0"),Z:l};return a.replace(re,function(O,A){return A||Y[O]||l.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(e,o,t){var a,l=h.p(o),c=p(e),v=(c.utcOffset()-this.utcOffset())*i,m=this-c,w=h.m(this,c);return w=(a={},a[H]=w/12,a[S]=w,a[V]=w/3,a[D]=(m-v)/6048e5,a[b]=(m-v)/864e5,a[M]=m/f,a[y]=m/i,a[d]=m/s,a)[l]||m,t?w:h.a(w)},n.daysInMonth=function(){return this.endOf(S).$D},n.$locale=function(){return z[this.$L]},n.locale=function(e,o){if(!e)return this.$L;var t=this.clone(),a=J(e,o,!0);return a&&(t.$L=a),t},n.clone=function(){return h.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},u}(),Q=N.prototype;return p.prototype=Q,[["$ms",g],["$s",d],["$m",y],["$H",M],["$W",b],["$M",S],["$y",H],["$D",P]].forEach(function(u){Q[u[1]]=function(n){return this.$g(n,u[0],u[1])}}),p.extend=function(u,n){return u.$i||(u(n,N,p),u.$i=!0),p},p.locale=J,p.isDayjs=F,p.unix=function(u){return p(1e3*u)},p.en=z[W],p.Ls=z,p.p={},p})})(_);const K=_.exports;class Z{getTimestamp(){return K().format()}}class C{constructor(r){L(this,"level");L(this,"levelOnly");this.level=Object.freeze(r.level),this.levelOnly=Object.freeze(r.levelOnly)}tryGetData(r){let s={dataAsString:"",dataRaw:[],hasData:!1,message:""};const i=r.args||[];if(s.hasData=i.length>1,i.length===1)s.message=i[0];else if(i.length>1){s.message=i[0],i.shift(),s.dataRaw=i;try{return Array.isArray(i)?s.dataAsString=i.map(f=>{if(typeof f=="object")try{return JSON.stringify(f)}catch{return f.toString()}else return f.toString()}).join(": "):s.dataAsString=JSON.stringify(i),s}catch{return s.dataAsString=i.join(", "),s}}return s}}class R extends C{constructor(r){super(r)}async write(r){return new Promise(s=>{const{timestamp:i,level:f,args:g}=r,d=`${i} ${f}`;g?console.log(`${d}:`,...g):console.log(d),s(!0)})}}class X extends C{constructor(s){super(s);L(this,"prefix",Object.freeze("%c "));L(this,"levelStyles",{log:"background: blue; color: white",highlight:"background: yellow;",debug:"background: blue; color: white",info:"background: green; color: white",warn:"background: orange; color: white",["warn-high"]:"font-size: 20px; background: orange; color: white",error:"background: red; color: white"});s.levelStyles&&(this.levelStyles=Object.freeze(s.levelStyles))}async write(s){return new Promise(i=>{const{timestamp:f}=s,g=(s.level||"").trim(),{message:d,dataRaw:y,hasData:M}=this.tryGetData(s);let b=!1;if(navigator&&(b=/chrome/gi.test(navigator.userAgent)),g!=="log"&&b){const D=`${f} ${this.prefix+g} ${d}`.trim();M?console.log(`${D}:`,this.levelStyles[g],...y):console.log(`${D}:`,this.levelStyles[g])}else{const D=`${f} ${g} ${d}`.trim();M?console.log(`${D}:`,...y):console.log(D)}i(!0)})}}class ee extends C{constructor(s){super(s);L(this,"domElement");L(this,"levelStyles",{log:"color: black",highlight:"background-color: yellow; color: black",debug:"color: blue",info:"color: green",warn:"color: orange",["warn-high"]:"font-size: 20px; background: orange; color: white",error:"color: red"});this.domElement=s.domElement,s.levelStyles&&(this.levelStyles=Object.freeze(s.levelStyles))}async write(s){return new Promise((i,f)=>{if(!this.domElement||this.domElement.innerHTML===void 0)f("HtmlTransport: write: Invalid or undefined dom element");else{const{timestamp:g,level:d}=s,{dataAsString:y,hasData:M}=this.tryGetData(s),b=`<span>${g}</span>`;let D="";d!=="log"?D=`<span style="${this.levelStyles[d]}">${d}</span>`:D=`<span>${d}</span>`;let S=`${b} ${D}`;M?S=`${S}: <span>${y}</span><br/>`:S=`${S}<br/>`,this.domElement.innerHTML+=S,i(!0)}})}}class te extends C{constructor(s){super(s);L(this,"prefix",Object.freeze("\x1B["));L(this,"suffix",Object.freeze("\x1B[0;37m"));L(this,"levelStyles",{log:"0;1;37m",highlight:"7;1;36m",debug:"0;1;34m",info:"0;1;32m",warn:"0;1;33m",["warn-high"]:"0;1;35m",error:"0;1;31m"});s.levelStyles&&(this.levelStyles=Object.freeze(s.levelStyles))}async write(s){return new Promise(i=>{const{timestamp:f,level:g}=s,d=`${f} ${this.prefix}${this.levelStyles[g]}${g}${this.suffix}:`,y=s.args||[];y.length>0?console.log(`${d}:`,...y):console.log(d),i(!0)})}}class ne{constructor(r){L(this,"supportedLevels");L(this,"transports");L(this,"timestampService");if(r){const{levels:s,transports:i,timestampService:f}=r;s?this.initLevels(s):this.initLevels(),i&&i.length>0?this.initTransports(i):this.initTransports(),f?this.initTimestampService(f):this.initTimestampService()}else this.initLevels(),this.initTransports(),this.initTimestampService()}timestamp(){return this.timestampService?this.timestampService.getTimestamp():new Date().toString()}initLevels(r){const s=["highlight","debug"];(r||[]).length>0?this.supportedLevels=[...s,...r]:this.supportedLevels=s}initTransports(r){(r||[]).length>0?this.transports=r:this.transports=[new R({level:"error",levelOnly:!1})]}initTimestampService(r){r?this.timestampService=r:this.timestampService=new Z}async canProceed(r){return new Promise(s=>{let i=!1;const{transportLevel:f,transportLevelOnly:g,level:d}=r;if(g)i=f===d;else if(f===d||["log","highlight"].indexOf(d)>-1)i=!0;else{const y=this.supportedLevels,M=y.indexOf(f);M>1&&(i=y.slice(0,M).includes(d))}s(i)})}async transportsWrite(r){return new Promise(s=>{this.transports.forEach(async i=>{if(await this.canProceed({transportLevel:i.level,transportLevelOnly:i.levelOnly,level:r.level})){const g=await i.write(r);s(g)}})})}log(...r){let s="log",i=[];if((r||[]).length>0){const g=(r[0]||"").toString().trim().toLowerCase();this.supportedLevels.indexOf(g)>-1?(s=g,r.shift(),r.length>0&&(i=r)):(s="log",i=r)}const f={timestamp:this.timestamp(),level:s,args:i};this.transportsWrite(f).then(()=>{})}highlight(...r){this.log("highlight",...r)}debug(...r){this.log("debug",...r)}info(...r){this.log("info",...r)}warn(...r){this.log("warn",...r)}error(...r){this.log("error",...r)}}$.BaseTransport=C,$.ChromeTransport=X,$.DayJsTimestampService=Z,$.DefaultTransport=R,$.HtmlTransport=ee,$.Logger=ne,$.StdErrTransport=te,Object.defineProperties($,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
