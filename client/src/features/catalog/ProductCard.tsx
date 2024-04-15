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

export default function ProductCard(props: any) {
  const { product } = props;
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
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}
