import axios from "axios";
import { MathJax } from "better-react-mathjax";
import Layout from "components/Layout";
import { MathNode, parse, simplify } from "mathjs";
import { useDeferredValue, useEffect, useState } from "react";

export default function DefiniteIntegralPage() {
  const [fx, setFx] = useState("");
  const [integral, setIntegral] = useState<MathNode | null>(null);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const deferredFx = useDeferredValue(fx);
  const deferredA = useDeferredValue(a);
  const deferredB = useDeferredValue(b);

  let parsedFx = null;
  try {
    parsedFx = parse(deferredFx);
  } catch (e) {}

  useEffect(() => {
    let parsedFx = null;
    try {
      parsedFx = parse(deferredFx);
    } catch (e) {
      return;
    }

    axios
      .post("/python/integrate", {
        expr: parsedFx.toString({
          implicit: "show",
        }),
        a: deferredA,
        b: deferredB,
      })
      .then((r) => {
        try {
          setIntegral(simplify(parse(r.data.result_str)));
        } catch (e) {
          return;
        }
      });
  }, [deferredFx, deferredA, deferredB]);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold pb-1">정적분 계산기</h2>
      <div className="text-gray-500 font-light">
        [a, b]에서 f(x)의 정적분을 계산합니다
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-5 h-24">
        <div className="col-span-1">
          <div className="flex items-center pr-4">
            <MathJax>{"\\(f(x) =\\)"}</MathJax>
            <input
              type="text"
              className="mx-2 rounded-xl border border-gray-300 text-xl outline-none px-3 py-1.5 w-full"
              value={fx}
              onChange={(e) => {
                setFx(e.target.value);
              }}
            />
          </div>
          <div className="h-4" />
          <div className="flex justify-between">
            <div className="flex items-center pr-4">
              <MathJax>{"\\(a =\\)"}</MathJax>
              <input
                type="number"
                className="mx-2 rounded-xl border border-gray-300 text-xl outline-none px-3 py-1.5 w-full"
                value={a}
                onChange={(e) => {
                  let a = Number(e.target.value);
                  if (isNaN(a)) return;
                  setA(a);
                }}
              />
            </div>
            <div className="h-4" />
            <div className="flex items-center pr-4">
              <MathJax>{"\\(b =\\)"}</MathJax>
              <input
                type="number"
                className="mx-2 rounded-xl border border-gray-300 text-xl outline-none px-3 py-1.5 w-full"
                value={b}
                onChange={(e) => {
                  let b = Number(e.target.value);
                  if (isNaN(b)) return;
                  setB(b);
                }}
              />
            </div>
          </div>
          <hr className="my-4" />
          {fx && (
            <MathJax dynamic>{`\\(\\int_${a}^${b} (${
              parsedFx
                ? simplify(parsedFx)
                    .toTex({
                      implicit: "hide",
                    })
                    .replaceAll("\\cdot", "") || ""
                : fx
            })\\, dx = ${integral?.toTex().replace("\\cdot", "")}\\)`}</MathJax>
          )}
        </div>
        <div className="col-span=1"></div>
      </div>
    </Layout>
  );
}
