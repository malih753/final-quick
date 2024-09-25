import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Common/Sidebar";
import Layout from "./Layout/Layout";
import { NavProvider } from "./Context/NavContext";
import LabTestsLayout from "./Layout/LabTestsLayout";
import "react-dropdown/style.css";
import Loader from "./Common/Loader";
import { useAuth } from "./Context/AuthContext";
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Orders = lazy(() => import("./Pages/Orders"));
const AdminOrders = lazy(() => import("./Pages/Admin Orders"));
const AddOrder = lazy(() => import("./Pages/Admin Orders/Add Order"));
const Products = lazy(() => import("./Pages/Products"));
const PushNotifications = lazy(() => import("./Pages/Push Notifications"));
const AddNotification = lazy(() =>
  import("./Pages/Notifications/Add Notification")
);
const Notifications = lazy(() => import("./Pages/Notifications"));

const AddProduct = lazy(() => import("./Pages/Products/Add Product"));
const ProductCombo = lazy(() => import("./Pages/Products/Product Combo"));
const OrderDetails = lazy(() => import("./Pages/Orders/Order Details"));
const Coupons = lazy(() => import("./Pages/Coupons"));
const AddCoupons = lazy(() => import("./Pages/Coupons/Add Coupons"));
const LabTests = lazy(() => import("./Pages/Lab Tests"));
const LabTestsBookings = lazy(() =>
  import("./Pages/Lab Tests/Lab Test Bookings")
);
const LabTestsPackages = lazy(() =>
  import("./Pages/Lab Tests/Lab Test Packages")
);

const AddLabTest = lazy(() => import("./Pages/Lab Tests/Add Lab Test"));
const Vendors = lazy(() => import("./Pages/Vendors"));
const Users = lazy(() => import("./Pages/Users"));
const UserProfile = lazy(() => import("./Pages/Users/User Profile"));
const Prescriptions = lazy(() => import("./Pages/Prescriptions"));
const Questions = lazy(() => import("./Pages/Questions"));
const Requests = lazy(() => import("./Pages/Requests"));
const Category = lazy(() => import("./Pages/Category"));
const CategoryDetails = lazy(() => import("./Pages/Category/Category Details"));
const DeliveryPartners = lazy(() => import("./Pages/Delivery Partners"));
const Login = lazy(() => import("./Pages/Login"));

const App = () => {
  const { user } = useAuth();
  return (
    <NavProvider>
      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin-orders" element={<AdminOrders />} />
              <Route path="/add-order" element={<AddOrder />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product-combo" element={<ProductCombo />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route
                path="/push-notifications"
                element={<PushNotifications />}
              />
              <Route
                path="/notifications/add-notification"
                element={<AddNotification />}
              />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/coupons/add-coupon" element={<AddCoupons />} />
              <Route path="/lab-tests" element={<LabTestsLayout />}>
                <Route index path="/lab-tests" element={<LabTests />} />
                <Route
                  path="/lab-tests/bookings"
                  element={<LabTestsBookings />}
                />
                <Route
                  path="/lab-tests/packages"
                  element={<LabTestsPackages />}
                />
              </Route>
              <Route path="/lab-tests/add-lab-test" element={<AddLabTest />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/user-profile/:id" element={<UserProfile />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route path="/asked-questions" element={<Questions />} />
              <Route path="/requested-medicines" element={<Requests />} />
              <Route path="/category" element={<Category />} />
              <Route path="/category/:id" element={<CategoryDetails />} />
              <Route path="/delivery-partners" element={<DeliveryPartners />} />
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Suspense>
    </NavProvider>
  );
};

export default App;
