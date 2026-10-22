# Debris Math

Debris and dumpster arithmetic. The pile of 20 ft by 10 ft by 3 ft is 22.22 cu yd.

## What it computes

- **The volume truth** - cubic yards: the length, width and height (1 to 1000 ft each) multiplied, over 27 cubic feet a yard.
- **The loads truth** - dumpsters: the cubic yards (1 to 1000000) divided by the dumpster size (1 to 100 cu yd), rounded up, and the room left in the last.
- **The weight truth** - weight: the cubic yards times the pounds a cubic yard (1 to 5000), in pounds and tons (2000 lb).
- **The cost truth** - cost: the dumpsters (1 to 1000) at their rental price, plus the tons (0.01 to 100000) over the included tons (0 to 100 each) at the overage price.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any pile and does not know what the material really weighs, what a hauler accepts, permits or hazardous material rules, and it gives no verdict that a load is allowed or fits a weight limit. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/debrismath/
Repo: https://github.com/iLanis-agent/debrismath
