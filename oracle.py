import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def hu(n, d): return (2*n + d) // (2*d)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def volume(l, w, h):
    return f"The pile of {l} ft by {w} ft by {h} ft is {dec(hu(l*w*h*100,27))} cu yd."
def loads(c, s):
    n = (c+s-1)//s
    return f"The {c} cu yd in dumpsters of {s} cu yd takes {pl(n,' dumpster',' dumpsters')}, leaving {n*s-c} cu yd of room in the last."
def weight(c, w):
    return f"The {c} cu yd at {w} lb a cubic yard weigh {c*w} lb, or {dec(hu(c*w*100,2000))} tons."
def cost(d, r, t, inc, o):
    free = d*inc*100; extra = t-free if t > free else 0
    c = d*r + hu(extra*o,100)
    return f"The {pl(d,' dumpster',' dumpsters')} at ${dec(r)} for {dec(t)} tons, with {inc} " + ("ton" if inc==1 else "tons") + f" included each, run over by {dec(extra)} tons and cost ${money(c)}."
random.seed(759)
R=random.randint
cases = [
 dict(fn="volume", args=["20","10","3"], expect=volume(20,10,3)),
 dict(fn="loads", args=["22","20"], expect=loads(22,20)),
 dict(fn="weight", args=["22","400"], expect=weight(22,400)),
 dict(fn="cost", args=["2","400","4.4","2","75"], expect=cost(2,40000,440,2,7500)),
]
for _ in range(20):
    l,w,h=R(1,1000),R(1,1000),R(1,1000); cases.append(dict(fn="volume", args=[str(l),str(w),str(h)], expect=volume(l,w,h)))
for _ in range(20):
    c,s=R(1,1000000),R(1,100); cases.append(dict(fn="loads", args=[str(c),str(s)], expect=loads(c,s)))
for _ in range(20):
    c,w=R(1,1000000),R(1,5000); cases.append(dict(fn="weight", args=[str(c),str(w)], expect=weight(c,w)))
for _ in range(15):
    d,r,t,i,o=R(1,1000),R(1,1000000),R(1,10000000),R(0,100),R(1,1000000)
    cases.append(dict(fn="cost", args=[str(d),dec(r),dec(t),str(i),dec(o)], expect=cost(d,r,t,i,o)))
for _ in range(15):
    d,i=R(1,50),R(0,10); t=R(1,d*i*100+5000); r,o=R(1,1000000),R(1,1000000)
    cases.append(dict(fn="cost", args=[str(d),dec(r),dec(t),str(i),dec(o)], expect=cost(d,r,t,i,o)))
errs=[["volume",["0","10","3"]],["volume",["20","0","3"]],["volume",["20","10","1001"]],["loads",["0","20"]],["loads",["22","0"]],["weight",["22","0"]],
 ["weight",["0","400"]],["cost",["0","400","4.4","2","75"]],["cost",["2","0","4.4","2","75"]],["cost",["2","400","0","2","75"]],["cost",["2","400","4.4","101","75"]],["cost",["2","400","4.4","2","0"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
