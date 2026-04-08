import { createBrowserRouter } from "react-router";
import { MarketplaceHome } from "./screens/MarketplaceHome";
import { ProductListing } from "./screens/ProductListing";
import { ProductDetail } from "./screens/ProductDetail";
import { Cart } from "./screens/Cart";
import { Checkout } from "./screens/Checkout";
import { VendorDashboard } from "./screens/VendorDashboard";
import { OrderTracking } from "./screens/OrderTracking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MarketplaceHome,
  },
  {
    path: "/products",
    Component: ProductListing,
  },
  {
    path: "/product/:id",
    Component: ProductDetail,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/checkout",
    Component: Checkout,
  },
  {
    path: "/vendor",
    Component: VendorDashboard,
  },
  {
    path: "/orders/:id",
    Component: OrderTracking,
  },
]);
