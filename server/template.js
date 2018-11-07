function template(title, content = "", hashes){
    
    let page = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <link rel="shortcut icon" href="../build/favicon.ico">
                  <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"><meta name="theme-color" content="#000000">
                  <link rel="manifest" href="../build/manifest.json">
                  <title> ${title} </title>
                  <link href="static/css/main.${hashes[0]['main.css']}.css" rel="stylesheet">
                </head>
                <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">
                    <!--- magic happens here -->  ${content}
                </div>
                    <script>!function (c) { function e(e) { for (var t, r, n = e[0], o = e[1], u = e[2], i = 0, a = []; i < n.length; i++)r = n[i], f[r] && a.push(f[r][0]), f[r] = 0; for (t in o) Object.prototype.hasOwnProperty.call(o, t) && (c[t] = o[t]); for (d && d(e); a.length;)a.shift()(); return p.push.apply(p, u || []), l() } function l() { for (var e, t = 0; t < p.length; t++) { for (var r = p[t], n = !0, o = 1; o < r.length; o++) { var u = r[o]; 0 !== f[u] && (n = !1) } n && (p.splice(t--, 1), e = s(s.s = r[0])) } return e } var r = {}, f = { 3: 0 }, p = []; function s(e) { if (r[e]) return r[e].exports; var t = r[e] = { i: e, l: !1, exports: {} }; return c[e].call(t.exports, t, t.exports, s), t.l = !0, t.exports } s.e = function (u) { var e = [], r = f[u]; if (0 !== r) if (r) e.push(r[2]); else { var t = new Promise(function (e, t) { r = f[u] = [e, t] }); e.push(r[2] = t); var n, o = document.getElementsByTagName("head")[0], i = document.createElement("script"); i.charset = "utf-8", i.timeout = 120, s.nc && i.setAttribute("nonce", s.nc), i.src = s.p + "static/js/" + ({}[u] || u) + "." + { 1: "993f41cf" }[u] + ".chunk.js", n = function (e) { i.onerror = i.onload = null, clearTimeout(a); var t = f[u]; if (0 !== t) { if (t) { var r = e && ("load" === e.type ? "missing" : e.type), n = e && e.target && e.target.src, o = new Error("Loading chunk " + u + " failed.\n(" + r + ": " + n + ")"); o.type = r, o.request = n, t[1](o) } f[u] = void 0 } }; var a = setTimeout(function () { n({ type: "timeout", target: i }) }, 12e4); i.onerror = i.onload = n, o.appendChild(i) } return Promise.all(e) }, s.m = c, s.c = r, s.d = function (e, t, r) { s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }) }, s.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, s.t = function (t, e) { if (1 & e && (t = s(t)), 8 & e) return t; if (4 & e && "object" == typeof t && t && t.__esModule) return t; var r = Object.create(null); if (s.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t) for (var n in t) s.d(r, n, function (e) { return t[e] }.bind(null, n)); return r }, s.n = function (e) { var t = e && e.__esModule ? function () { return e.default } : function () { return e }; return s.d(t, "a", t), t }, s.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, s.p = "/", s.oe = function (e) { throw console.error(e), e }; var t = window.webpackJsonp = window.webpackJsonp || [], n = t.push.bind(t); t.push = e, t = t.slice(); for (var o = 0; o < t.length; o++)e(t[o]); var d = n; l() }([])</script>
    <script src="/static/js/server.js"></script>
                </body>
                </html>
                `;
  
    return page;
  }
  
  module.exports = template;