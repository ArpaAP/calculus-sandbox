import { MathJax } from "better-react-mathjax";
import Layout from "components/Layout";
import { derivative, MathNode, parse } from "mathjs";
import { useEffect, useState } from "react";

export default function Home() {
  const [N, setN] = useState(2);
  const [fx, setFx] = useState("");
  const [fpx, setFpx] = useState<MathNode | null>(null);

  useEffect(() => {
    try {
      let result: MathNode | null = parse(fx);

      for (let i = 0; i < N; i++) {
        result = derivative(result, "x");
      }

      setFpx(result);
    } catch (e) {
      return;
    }
  }, [N, fx]);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold pb-1">N계도함수 미분기</h2>
      <div className="text-gray-500 font-light">
        일반적인 y = f(x) 꼴의 함수에 대하여 N계도함수를 구합니다
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-5 h-24">
        <div className="col-span-1 flex flex-col gap-2">
          <div className="flex items-center pr-4">
            <MathJax>{"\\(N =\\)"}</MathJax>
            <input
              type="number"
              className="ml-2 rounded-xl border border-gray-300 text-xl outline-none px-3 py-1.5 w-full"
              min={1}
              value={N}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (isNaN(value) || value < 1) return;
                setN(value);
              }}
            />
          </div>
          <div className="flex items-center pr-4">
            <MathJax>{"\\(f(x) =\\)"}</MathJax>
            <input
              type="text"
              value={fx}
              className="ml-2 rounded-xl border border-gray-300 text-xl outline-none px-3 py-1.5 w-full"
              onChange={(e) => {
                setFx(e.target.value);
              }}
            />
          </div>

          <hr className="my-2" />

          <MathJax>{`\\(f${N < 3 ? "'".repeat(N) : `^{(${N})}`}(x) = ${
            fpx
              ?.toTex({
                implicit: "hide",
              })
              .replaceAll("\\cdot", "") ?? ""
          }\\)`}</MathJax>
        </div>
        <div className="col-span=1"></div>
      </div>
    </Layout>
  );
}
