// Debris Math engine: the cubic yards a pile takes, the dumpsters it fills, the tons it weighs, and the bill with overage. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the tape and the rental ticket.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _HGT = "the wall height must be from 1 to 240 inches with no decimal places";
var _DIM = "the size must be from 1 to 1000 ft with no decimal places";
var _CY = "the cubic yards must be from 1 to 1000000 with no decimal places";
var _DS = "the dumpster size must be from 1 to 100 cu yd with no decimal places";
var _LB = "the pounds a cubic yard must be from 1 to 5000 lb with no decimal places";
var _ND = "the dumpster count must be from 1 to 1000 with no decimal places";
var _TONS = "the tons must be from 0.01 to 100000 with at most two decimal places";
var _INC = "the included tons must be from 0 to 100 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function volumeTruth(len, wid, hgt) {
  var l = _i(len, _DIM, 4, 1, 1000), w = _i(wid, _DIM, 4, 1, 1000), h = _i(hgt, _DIM, 4, 1, 1000);
  return "The pile of " + l + " ft by " + w + " ft by " + h + " ft is " + _dec(_hu(l * w * h * 100, 27), 2) + " cu yd.";
}
function loadsTruth(cy, size) {
  var c = _i(cy, _CY, 7, 1, 1000000), s = _i(size, _DS, 3, 1, 100);
  var n = Math.floor((c + s - 1) / s), spare = n * s - c;
  return "The " + c + " cu yd in dumpsters of " + s + " cu yd takes " + _pl(n, " dumpster", " dumpsters") + ", leaving " + spare + " cu yd of room in the last.";
}
function weightTruth(cy, lb) {
  var c = _i(cy, _CY, 7, 1, 1000000), w = _i(lb, _LB, 4, 1, 5000);
  return "The " + c + " cu yd at " + w + " lb a cubic yard weigh " + c * w + " lb, or " + _dec(_hu(c * w * 100, 2000), 2) + " tons.";
}
function costTruth(n, rental, tons, included, over) {
  var d = _i(n, _ND, 4, 1, 1000), r = _p(rental, _PRICE, 5, 2, 1, 1000000), t = _p(tons, _TONS, 6, 2, 1, 10000000);
  var inc = _i(included, _INC, 3, 0, 100), o = _p(over, _PRICE, 5, 2, 1, 1000000);
  var free = d * inc * 100, extra = t > free ? t - free : 0;
  var cents = d * r + _hu(extra * o, 100);
  return "The " + _pl(d, " dumpster", " dumpsters") + " at $" + _dec(r, 2) + " for " + _dec(t, 2) + " tons, with " + inc + (inc === 1 ? " ton" : " tons") + " included each, run over by " + _dec(extra, 2) + " tons and cost $" + _money(cents) + ".";
}
