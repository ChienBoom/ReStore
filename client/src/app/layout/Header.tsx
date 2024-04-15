import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

export default function Header(props: any) {
  const { theme, onTheme } = props;
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">Re-Store</Typography>
        <Switch value={theme} onChange={(e) => onTheme(e.target.checked)} />
      </Toolbar>
    </AppBar>
  );
}
