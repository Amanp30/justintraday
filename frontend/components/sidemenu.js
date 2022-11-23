import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function sidemenu() {
  const share = useRouter();
  const base = "http://localhost:3000";

  const links = base + share.asPath;
  return (
    <>
      <div className="thesidemenu">
        <div className="insideside">
          <div
            className={
              links === "http://localhost:3000/"
                ? "thelinkdiv linkmatched"
                : "thelinkdiv"
            }
          >
            <svg
              className={
                links === "http://localhost:3000/" ? "themonk" : "thephone"
              }
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="176"
                height="176"
                x="48"
                y="48"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="176"
                height="176"
                x="288"
                y="48"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="176"
                height="176"
                x="48"
                y="288"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="176"
                height="176"
                x="288"
                y="288"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
            </svg>
            <Link href="/">Dashboard</Link>
          </div>
          <div
            className={
              links === "http://localhost:3000/trades"
                ? "thelinkdiv linkmatched"
                : "thelinkdiv"
            }
          >
            <svg
              className={
                links === "http://localhost:3000/trades"
                  ? "themonk"
                  : "thephone"
              }
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M160 144h288M160 256h288M160 368h288"
              ></path>
              <circle
                cx="80"
                cy="144"
                r="16"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              ></circle>
              <circle
                cx="80"
                cy="256"
                r="16"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              ></circle>
              <circle
                cx="80"
                cy="368"
                r="16"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              ></circle>
            </svg>
            <Link href="/trades">Trades</Link>
          </div>
          <div
            className={
              links === "http://localhost:3000/reports"
                ? "thelinkdiv linkmatched"
                : "thelinkdiv"
            }
          >
            <svg
              className={
                links === "http://localhost:3000/reports"
                  ? "themonk"
                  : "thephone"
              }
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M32 32v432a16 16 0 0016 16h432"
              ></path>
              <rect
                width="80"
                height="192"
                x="96"
                y="224"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="240"
                x="240"
                y="176"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="304"
                x="383.64"
                y="112"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
            </svg>{" "}
            <Link href="/reports">Reports</Link>
          </div>
          <div
            className={
              links === "http://localhost:3000/timeframe"
                ? "thelinkdiv linkmatched"
                : "thelinkdiv"
            }
          >
            <svg
              className={
                links === "http://localhost:3000/timeframe"
                  ? "themonk"
                  : "thephone"
              }
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M32 32v432a16 16 0 0016 16h432"
              ></path>
              <rect
                width="80"
                height="192"
                x="96"
                y="224"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="240"
                x="240"
                y="176"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="304"
                x="383.64"
                y="112"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
            </svg>{" "}
            <Link href="/timeframe">Timeframe</Link>
          </div>

          <div
            className={
              links === "http://localhost:3000/bystock"
                ? "thelinkdiv linkmatched"
                : "thelinkdiv"
            }
          >
            <svg
              className={
                links === "http://localhost:3000/bystock"
                  ? "themonk"
                  : "thephone"
              }
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M32 32v432a16 16 0 0016 16h432"
              ></path>
              <rect
                width="80"
                height="192"
                x="96"
                y="224"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="240"
                x="240"
                y="176"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="304"
                x="383.64"
                y="112"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
            </svg>{" "}
            <Link href="/bystock">By Stock</Link>
          </div>

          <div
            className={
              links === "http://localhost:3000/byactions"
                ? "thelinkdiv linkmatched"
                : "thelinkdiv"
            }
          >
            <svg
              className={
                links === "http://localhost:3000/byactions"
                  ? "themonk"
                  : "thephone"
              }
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M32 32v432a16 16 0 0016 16h432"
              ></path>
              <rect
                width="80"
                height="192"
                x="96"
                y="224"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="240"
                x="240"
                y="176"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="304"
                x="383.64"
                y="112"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
            </svg>{" "}
            <Link href="/byactions">By Action</Link>
          </div>

          <div
            className={
              links === "http://localhost:3000/monthly"
                ? "thelinkdiv linkmatched"
                : "thelinkdiv"
            }
          >
            <svg
              className={
                links === "http://localhost:3000/monthly"
                  ? "themonk"
                  : "thephone"
              }
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M32 32v432a16 16 0 0016 16h432"
              ></path>
              <rect
                width="80"
                height="192"
                x="96"
                y="224"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="240"
                x="240"
                y="176"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="304"
                x="383.64"
                y="112"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
            </svg>{" "}
            <Link href="/monthly">Monthly</Link>
          </div>

          <div
            className={
              links === "http://localhost:3000/yearly"
                ? "thelinkdiv linkmatched"
                : "thelinkdiv"
            }
          >
            <svg
              className={
                links === "http://localhost:3000/yearly"
                  ? "themonk"
                  : "thephone"
              }
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M32 32v432a16 16 0 0016 16h432"
              ></path>
              <rect
                width="80"
                height="192"
                x="96"
                y="224"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="240"
                x="240"
                y="176"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
              <rect
                width="80"
                height="304"
                x="383.64"
                y="112"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                rx="20"
                ry="20"
              ></rect>
            </svg>{" "}
            <Link href="/yearly">Yearly</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default sidemenu;
