import "../styles/globals.css";
//import Nav from '../components/nav'
import Sidemenu from "../components/sidemenu";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Sidemenu />
      <Script src="https://www.kryogenix.org/code/browser/sorttable/sorttable.js"></Script>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
