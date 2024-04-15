import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList(props: any) {
  const { products } = props;
  return (
    <Grid container spacing={4}>
      {products.map((item: any, index: any) => (
        <Grid item xs={3} key={item.id}>
          <ProductCard product={item} />
        </Grid>
      ))}
    </Grid>
  );
}
