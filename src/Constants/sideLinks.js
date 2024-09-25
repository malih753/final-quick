import {
  BannerIcon,
  BellIcon,
  CategoryIcon,
  DashboardIcon,
  DiscountIcon,
  LabIcon,
  MedicineIcon,
  OrderIcon,
  OrdersIcon,
  PrescriptionIcon,
  ProdcutIcon,
  QuestionMarkIcon,
  UsersIcon,
  VendorIcon,
} from "../assets/icons";

export const sideLinks = [
  {
    name: "Dashboard",
    path: "/",
    Icon: DashboardIcon,
  },
  {
    name: "Orders",
    path: "/orders",
    Icon: OrderIcon,
  },
  {
    name: "Users",
    path: "/users",
    Icon: UsersIcon,
  },
  {
    name: "Vendors",
    path: "/vendors",
    Icon: VendorIcon,
  },
  {
    name: "Products",
    path: "/products",
    Icon: ProdcutIcon,
  },
  {
    name: "Questions",
    path: "/asked-questions",
    Icon: QuestionMarkIcon,
  },
  {
    name: "Requests",
    path: "/requested-medicines",
    Icon: MedicineIcon,
  },
  {
    name: "Admin Orders",
    path: "/admin-orders",
    Icon: OrdersIcon,
  },
  {
    name: "Category",
    path: "/category",
    Icon: CategoryIcon,
  },
  {
    name: "Discounts",
    path: "/coupons",
    Icon: DiscountIcon,
  },
  // {
  //   name: "Banners",
  //   path: "/banners",
  //   Icon: BannerIcon,
  // },
  {
    name: "Lab Tests",
    path: "/lab-tests",
    Icon: LabIcon,
  },
  {
    name: "Push Notification",
    path: "/push-notifications",
    Icon: BellIcon,
  },
  {
    name: "Prescription",
    path: "/prescriptions",
    Icon: PrescriptionIcon,
  },
];
