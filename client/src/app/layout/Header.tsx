import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header(props: any) {
  const { theme, onTheme } = props;
  const { basket } = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Re-Store
          </Typography>
          <Switch value={theme} onChange={(e) => onTheme(e.target.checked)} />
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map((item: any) => (
            <ListItem
              component={NavLink}
              to={item.path}
              key={item.path}
              sx={navStyles}
            >
              {item.title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            edge="start"
            color="inherit"
            sx={{
              mr: 2,
              "&:hover": {
                color: "grey.500",
              },
              "&.active": {
                color: "text.secondary",
              },
            }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightLinks.map((item: any) => (
              <ListItem
                component={NavLink}
                to={item.path}
                key={item.path}
                sx={navStyles}
              >
                {item.title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
