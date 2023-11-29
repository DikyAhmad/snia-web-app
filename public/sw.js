if (!self.define) {
    let e, s = {};
    const i = (i, r) => (i = new URL(i + ".js", r).href, s[i] || new Promise((s => {
        if ("document" in self) {
            const e = document.createElement("script");
            e.src = i, e.onload = s, document.head.appendChild(e)
        } else e = i, importScripts(i), s()
    })).then((() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e
    })));
    self.define = (r, o) => {
        const t = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (s[t]) return;
        let n = {};
        const c = e => i(e, t),
            d = {
                module: {
                    uri: t
                },
                exports: n,
                require: c
            };
        s[t] = Promise.all(r.map((e => d[e] || c(e)))).then((e => (o(...e), n)))
    }
}
define(["./workbox-dc92d82c"], (function (e) {
    "use strict";
    self.addEventListener("message", (e => {
        self.skipWaiting()
    })), e.precacheAndRoute([{
        url: "/",
        revision: "4e85ff36426844ed22d93939d016c4c7"
    }, {
        url: "nota",
        revision: "6227bd2ee2438e4775a96db49fc6b9cc"
    }, {
        url: "man",
        revision: "0e5e68b9dab2e93bead43a4642109784"
    }], {})
}));
//# sourceMappingURL=sw.js.map