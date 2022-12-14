import "styles/globals.scss";
import type { AppProps } from "next/app";
import { MathJaxContext } from "better-react-mathjax";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MathJaxContext>
      <Component {...pageProps} />
    </MathJaxContext>
  );
}
