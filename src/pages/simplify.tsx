import axios from "axios";
import { MathJax } from "better-react-mathjax";
import Layout from "components/Layout";
import { MathNode, parse, simplify } from "mathjs";
import { useDeferredValue, useEffect, useState } from "react";

export default function SimplifyPage() {
  const [expr, setExpr] = useState("");
  const [simplified, setSimplified] = useState<MathNode | null>(null);

  const deferredExpr = useDeferredValue(expr);

  useEffect(() => {
    try {
      setSimplified(simplify(expr));
    } catch (e) {
      return;
    }
  }, [expr]);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold pb-1">식 정리기</h2>
      <div className="text-gray-500 font-light">
        입력한 표현식을 간단히 정리합니다
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-5 h-24">
        <div className="col-span-1">
          <div className="flex items-center pr-4">
            <div className="flex-shrink-0">식 입력:</div>
            <input
              type="text"
              className="mx-2 rounded-xl border border-gray-300 text-xl outline-none px-3 py-1.5 w-full"
              value={expr}
              onChange={(e) => {
                setExpr(e.target.value);
              }}
            />
          </div>
          <hr className="my-4" />
          <MathJax dynamic>{`\\(${
            expr
              ? simplified
                  ?.toTex({
                    implicit: "hide",
                  })
                  .replaceAll("\\cdot", "") || ""
              : ""
          }\\)`}</MathJax>
        </div>
        <div className="col-span=1"></div>
      </div>
    </Layout>
  );
}
