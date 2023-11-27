if (!self.define) {
  let e,
    a = {};
  const o = (o, i) => (
    (o = new URL(o + ".js", i).href),
    a[o] ||
      new Promise(a => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = o), (e.onload = a), document.head.appendChild(e);
        } else (e = o), importScripts(o), a();
      }).then(() => {
        let e = a[o];
        if (!e) throw new Error(`Module ${o} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, r) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[n]) return;
    let s = {};
    const t = e => o(e, n),
      p = { module: { uri: n }, exports: s, require: t };
    a[n] = Promise.all(i.map(e => p[e] || t(e))).then(e => (r(...e), s));
  };
}
define(["./workbox-2b403519"], function(e) {
  "use strict";
  self.addEventListener("message", e => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "/",
          revision: "72b24c12e10d65f15377dcf44c6d4f50"
        },
        {
          url: "nota",
          revision: "26437fe566af07453295b22b87d49272"
        },
        {
          url: "email",
          revision: "8b6b2f2ee5655ae1989b17b883524285"
        },
        {
          url: "man",
          revision: "3319791c403d66d09b7c5421c2a37da6"
        },
      ],
      {}
    );
});
//# sourceMappingURL=sw.js.map
