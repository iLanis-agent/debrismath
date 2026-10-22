const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { volume: volumeTruth, loads: loadsTruth, weight: weightTruth, cost: costTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the size must be from 1 to 1000 ft with no decimal places",
  "the cubic yards must be from 1 to 1000000 with no decimal places",
  "the dumpster size must be from 1 to 100 cu yd with no decimal places",
  "the pounds a cubic yard must be from 1 to 5000 lb with no decimal places",
  "the dumpster count must be from 1 to 1000 with no decimal places",
  "the tons must be from 0.01 to 100000 with at most two decimal places",
  "the included tons must be from 0 to 100 with no decimal places",
  "the price must be from 0.01 to 10000 dollars with at most two decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
