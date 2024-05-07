import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { isFormElement } from "react-router-dom/dist/dom";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  const handleAddItem = (productId: number, name: string) => {
    setStatus({ loading: true, name: name });
    agent.Basket.addItem(productId, 1)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  };

  const handleRemoveItem = (
    productId: number,
    quantity: number,
    name: string
  ) => {
    setStatus({ loading: true, name: name });
    agent.Basket.removeItem(productId, 1)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          loading: false,
          name: "",
        })
      );
  };

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      // src={item.pictureUrl}
                      src="https://firebasestorage.googleapis.com/v0/b/lovekafe.appspot.com/o/files%2F1824dcab-927b-4052-818d-0381757b3965?alt=media&token=a2efe3c2-f38c-4ef1-9581-18236ff30008"
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    color="error"
                    loading={
                      status.loading && status.name === "rem" + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        1,
                        "rem" + item.productId
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="secondary"
                    loading={
                      status.loading && status.name === "add" + item.productId
                    }
                    onClick={() =>
                      handleAddItem(item.productId, "add" + item.productId)
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={
                      status.loading && status.name === "del" + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        "del" + item.productId
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
