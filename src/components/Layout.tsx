import Head from "next/head";
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Calculus Sandbox</title>
        <meta name="description" content="미적분 계산기" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-3 xl:col-span-2 bg-slate-200 h-full shadow-2xl border-r-[1px] border-r-slate-300/75 px-5 py-5">
          <div>
            <div className="text-xl font-semibold pb-1 uppercase">
              Calculus Sandbox
            </div>
            <div className="text-gray-500 text-sm">미적분 계산기</div>
          </div>
          <hr className="w-full border-b-[1px] border-gray-300/50 my-2" />
          <div className="flex flex-col gap-1">
            <Link href="/simplify" passHref>
              <div
                className={classNames(
                  router.pathname === "/simplify" && "bg-slate-300/60",
                  "px-3 py-2 rounded-lg"
                )}
              >
                식 정리
              </div>
            </Link>
            <Link href="/" passHref>
              <div
                className={classNames(
                  router.pathname === "/" && "bg-slate-300/60",
                  "px-3 py-2 rounded-lg"
                )}
              >
                양함수 미분
              </div>
            </Link>

            <Link href="/n-derivative" passHref>
              <div
                className={classNames(
                  router.pathname === "/n-derivative" && "bg-slate-300/60",
                  "px-3 py-2 rounded-lg"
                )}
              >
                N계도함수 미분
              </div>
            </Link>
            <Link href="/implicit-derivative" passHref>
              <div
                className={classNames(
                  router.pathname === "/implicit-derivative" &&
                    "bg-slate-300/60",
                  "px-3 py-2 rounded-lg"
                )}
              >
                음함수 미분
              </div>
            </Link>
            <Link href="/indefinite-integral" passHref>
              <div
                className={classNames(
                  router.pathname === "/indefinite-integral" &&
                    "bg-slate-300/60",
                  "px-3 py-2 rounded-lg"
                )}
              >
                부정적분
              </div>
            </Link>
            <Link href="/definite-integral" passHref>
              <div
                className={classNames(
                  router.pathname === "/definite-integral" && "bg-slate-300/60",
                  "px-3 py-2 rounded-lg"
                )}
              >
                정적분
              </div>
            </Link>
          </div>
        </div>
        <div className="col-span-9 xl:col-span-10 px-8 py-6 h-screen overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
