import express from "express";
import { UserRoute } from "../modules/user/user.route";
import { AnimalRoute } from "../modules/animal/animal.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoute,
  },
  {
    path:"/animal",
    route:AnimalRoute
  }
];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
