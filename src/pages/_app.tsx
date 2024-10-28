import type { AppProps } from "next/app";
import AppLayout from "./layout/app";

import "@/styles/globals.css";
import "@/styles/toast.css";
import "@/styles/wallet.css";
import "@/styles/table.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

import Router from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Disable right-click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // Disable F12 and Ctrl+Shift+I
    document.onkeydown = function (e) {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        return false;
      }
    };

    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
    };
  }, []);
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
