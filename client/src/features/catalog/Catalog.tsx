import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function Catalog(props: any) {
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((response) => setProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <LoadingComponent message="loading..." />;
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">Add Product</Button>
    </>
  );
}
