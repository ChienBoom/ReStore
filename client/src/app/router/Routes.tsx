import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetail from "../../features/catalog/ProductDetail";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
      {
        path: "/catalog/:id",
        element: <ProductDetail />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/basket",
        element: <BasketPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
