import { MathJax } from "better-react-mathjax";
import Layout from "components/Layout";
import { derivative, MathNode } from "mathjs";
import { useState } from "react";

export default function Home() {
  const [fpx, setFpx] = useState<MathNode | null>(null);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold pb-1">양함수 미분기</h2>
      <div className="text-gray-500 font-light">
        일반적인 y = f(x) 꼴의 함수에 대하여 미분합니다.
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-5 h-24">
        <div className="col-span-1 border-r-[1px] border-r-gray-200">
          <div className="flex items-center pr-4">
            <MathJax>{"\\(f(x) =\\)"}</MathJax>
            <input
              type="text"
              className="ml-2 rounded-xl border border-gray-300 text-xl outline-none px-3 py-1.5 w-full"
              onChange={(e) => {
                let result;
                try {
                  result = derivative(e.target.value, "x");
                } catch (e) {
                  return;
                }

                setFpx(result);
              }}
            />
          </div>
          <div className="h-4" />
          <MathJax>{`\\(f'(x) = ${
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
