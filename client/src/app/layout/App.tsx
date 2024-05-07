import { useEffect, useState } from "react";
import Header from "./Header";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  const handleTheme = (theme: any) => {
    console.log(theme);
    setDarkMode(theme);
  };

  useEffect(() => {
    // const buyerId = getCookie("buyerId");
    const buyerId = "a79ff52e-abff-4fa7-b32f-67a5a3666304";
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);
  if (loading)
    return <LoadingComponent message="Initialising app..."></LoadingComponent>;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header theme={theme} onTheme={handleTheme} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
