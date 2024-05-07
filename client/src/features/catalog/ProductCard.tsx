import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

export default function ProductCard(props: any) {
  const { product } = props;
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(false);
  const handleAddItem = (productId: any) => {
    setLoading(true);
    agent.Basket.addItem(productId, 1)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain" }}
        title={product.name}
        image="https://firebasestorage.googleapis.com/v0/b/lovekafe.appspot.com/o/files%2F1824dcab-927b-4052-818d-0381757b3965?alt=media&token=a2efe3c2-f38c-4ef1-9581-18236ff30008"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
