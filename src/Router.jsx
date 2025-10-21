import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Layout from "./pages/Layout";
import "./index.css";
import Setting from "./pages/setting/Setting";
import Web from "./pages/web/Web";
import DealCards from "./pages/deal/DealCards";
import WareHouse from "./pages/warehouse/WareHouse";
import LoginForm from "./auth/login/Login";
import {
  ProductId,
  EditProduct,
  ProductsList,
  Users,
  Network,
  Profil,
  Category,
  UploadCard,
  Block,
  Request,
  UploadBanner,
} from "./components";
import PrivateRoute from "./auth/private/PrivateRoute";
import Login from "./auth/login/Login";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="deal" element={<DealCards />} />
          <Route path="deal/:productId" element={<ProductId />} />

          <Route path="warehouse" element={<WareHouse />}>
            <Route index element={<Navigate to={"products-list"} replace />} />
            <Route path="products-list" element={<ProductsList />} />
            <Route index element={<Navigate to={"edit-product"} replace />} />
            <Route path="edit-product" element={<EditProduct />} />
          </Route>

          <Route path="web" element={<Web />}>
            <Route index element={<Navigate to={"upload-banner"} replace />} />
            <Route path="upload-banner" element={<UploadBanner />} />
            <Route path="request" element={<Request />} />
            <Route path="block-product" element={<Block />} />
            <Route path="upload-banner2" element={<UploadCard />} />
            <Route path="category-product" element={<Category />} />
          </Route>

          <Route path="setting" element={<Setting />}>
            <Route index element={<Navigate to={"profil"} replace />} />
            <Route path="profil" element={<Profil />} />
            <Route path="reklama" element={<Network />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default AppRouter;
