import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

function App() {
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header theme={theme} onTheme={handleTheme} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
