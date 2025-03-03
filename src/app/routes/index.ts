import express from "express";
import { UserRoute } from "../modules/user/user.route";
import { AnimalRoute } from "../modules/animal/animal.route";
import { AdminRoute } from "../modules/admin/admin.route";
import { AuthRoute } from "../modules/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path:"/animal",
    route:AnimalRoute
  },
  {
    path:"/admin",
    route:AdminRoute
  },
  {
    path:"/auth",
    route:AuthRoute
  }
];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
