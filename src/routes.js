import { Router } from "express";
//import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlewares/auth";
import SearchController from "./app/controllers/SearchController";
import UpdateDate from "./app/controllers/UpdateDate";
import HardwareController from "./app/controllers/HardwareController";
import InfoController from "./app/controllers/InfoController";
import DupController from "./app/controllers/DupController";

const routes = new Router();

//routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
routes.use(authMiddleware);
routes.get("/search/:name?", SearchController.store);
routes.get("/updatedate/:id/:date", UpdateDate.store);
routes.get("/hardware/:id", HardwareController.store);
routes.get("/info/:id", InfoController.store);
routes.get("/dup/:id", DupController.store);

export default routes;
