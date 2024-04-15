import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";

export default function Catalog(props: any) {
  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:7291/api/Product")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);
  return (
    <>
      <ProductList products={products} />
      <Button variant="contained">Add Product</Button>
    </>
  );
}
