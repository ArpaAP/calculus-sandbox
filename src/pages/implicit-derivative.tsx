import { MathJax } from "better-react-mathjax";
import Layout from "components/Layout";
import { derivative, MathNode, parse, simplify } from "mathjs";
import { useEffect, useState } from "react";

export default function ImplicitDerivativePage() {
  const [fxy, setFxy] = useState("");
  const [dydx, setDydx] = useState<MathNode | null>(null);

  useEffect(() => {
    try {
      let dfdx = derivative(fxy, "x");
      let dfdy = derivative(fxy, "y");
      let dydx = simplify(
        parse(`-1 * (${dfdx.toString()}) / (${dfdy.toString()})`)
      );
      setDydx(dydx);
    } catch (e) {
      return;
    }
  }, [fxy]);

  return (
    <Layout>
      <h2 className="text-2xl font-semibold pb-1">음함수 미분기</h2>
      <div className="text-gray-500 font-light">
        f(x, y) = 0 꼴의 음함수에 대하여 미분합니다.
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-5 h-24">
        <div className="col-span-1">
          <div className="flex items-center pr-4">
            <MathJax>{"\\(f(x, y) =\\)"}</MathJax>
            <input
              type="text"
              className="mx-2 rounded-xl border border-gray-300 text-xl outline-none px-3 py-1.5 w-full"
              value={fxy}
              onChange={(e) => {
                setFxy(e.target.value);
              }}
            />
            <MathJax>{"\\(= 0\\)"}</MathJax>
          </div>
          <div className="h-4" />

          <MathJax dynamic>{`\\(\\frac{dy}{dx} = ${
            dydx
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
