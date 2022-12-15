import axios from "axios";
import { MathJax } from "better-react-mathjax";
import Layout from "components/Layout";
import { parse, simplify } from "mathjs";
import { useDeferredValue, useEffect, useState } from "react";

export default function IndefiniteIntegralPage() {
  const [fx, setFx] = useState("");
  const [integral, setIntegral] = useState("");

  const deferredFx = useDeferredValue(fx);

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
      })
      .then((r) => {
        setIntegral(r.data.latex);
      });
  }, [deferredFx]);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold pb-1">부정적분 계산기</h2>
      <div className="text-gray-500 font-light">
        f(x)의 부정적분을 계산합니다
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
          <hr className="my-4" />
          {deferredFx && (
            <MathJax dynamic>{`\\(\\int (${
              parsedFx
                ? simplify(parsedFx)
                    .toTex({
                      implicit: "hide",
                    })
                    .replaceAll("\\cdot", "") || ""
                : fx
            })\\, dx = ${integral} + C\\)`}</MathJax>
          )}
        </div>
        <div className="col-span=1"></div>
      </div>
    </Layout>
  );
}
