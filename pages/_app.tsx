import { Navbar, Loading } from "../components";
import GlobalStyle from "../styles/Global";
import { ThemeProvider } from "styled-components";
import theme from "../styles/Theme";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://rs-personal-server.herokuapp.com/public";
function App({ Component, pageProps }) {
  const router = useRouter();
  const path = router.pathname;
  const [isLoading, setIsLoading] = useState(false);

  const noNavbarRoutes = ["/account/login", "/account/register"];
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
    router.events.on("routeChangeError", () => {
      setIsLoading(false);
    });

    return () => {
      router.events.off("routeChangeStart", () => {});
    };
  }, []);

  const isNoNavbar = noNavbarRoutes.includes(path);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Loading wholePage isVisible={isLoading} />
      {!isNoNavbar && <Navbar />}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// const RevalidateLogin = () => {
//   const { refreshToken } = useGlobalContext(({ actions }) => actions);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       refreshToken(token);
//     }
//   }, []);

//   return <> </>;
// };
export default App;
