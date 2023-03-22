import { Html, Head, Main, NextScript } from "next/document";
import { useSelector, useDispatch } from "react-redux";
export default function Document() {
  //   const modalState = useSelector((state) => {
  //     return state.cards;
  //   });

  return (
    <Html>
      <Head />

      <body>
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
}
