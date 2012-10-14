(function(e) {
    var t;
    typeof require != "undefined" ? t = require("moment") : t = this.moment;
    var n = {
        a: "ddd",
        A: "dddd",
        b: "MMM",
        B: "MMMM",
        d: "DD",
        H: "HH",
        I: "hh",
        j: "DDDD",
        m: "MM",
        M: "mm",
        p: "A",
        S: "ss",
        U: "ww",
        w: "d",
        y: "YY",
        Y: "YYYY",
        z: "ZZ",
        "%": "%"
    }, r = function(e) {
        var t = "", r = 0, i, s;
        while (e.indexOf("%") !== -1) r = e.indexOf("%") + 1, i = n[e[r]], s = e.substr(0, r - 1), s.length && (s = "[" + s.replace(/(\[|\])/g, "\\$&") + "]"), t += s + (i ? i : e[r]), e = e.substr(r + 1);
        return t;
    };
    t.fn.strftime = function(e) {
        var n = r(e);
        return t.fn.format.call(this, n);
    }, t.fn.strptime = function(e, n) {
        var i;
        if (typeof n == "string") i = r(n); else {
            i = [];
            for (var s = 0; s < n.length; s++) i.push(r(n[s]));
        }
        return t(e, i);
    }, typeof module != "undefined" && module.exports ? module.exports = t : this.moment = t;
}).call();