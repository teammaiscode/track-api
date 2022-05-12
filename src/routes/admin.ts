import { Router } from "express";
import { CreateUsersController } from "../controllers/admin/CreateUsersController";
import { LoginAdminController } from "../controllers/admin/LoginAdminController";
import { AuthMeController } from "../controllers/admin/AuthMeController";
import { ListUsersController } from "../controllers/admin/ListUsersController";
import { FindUserConstroller } from "../controllers/admin/FindUserConstroller";
import { DeleteUsersController } from "../controllers/admin/DeleteUsersController";
import { ChangePasswordController } from "../controllers/app/ChangePasswordController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
const routerAdmin = Router()

const loginAdminController = new LoginAdminController();
const authMeController = new AuthMeController();
const createUsersController = new CreateUsersController();
const listUsersController = new ListUsersController();
const deleteUsersController = new DeleteUsersController();
const changePasswordController = new ChangePasswordController();
const findUserConstroller = new FindUserConstroller();

routerAdmin.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando" });
})
routerAdmin.post("/list/users", ensureAuthenticated, ensureAdmin, listUsersController.handle);
routerAdmin.post("/present/user/:id", ensureAuthenticated, ensureAdmin, findUserConstroller.handle);

routerAdmin.post("/register-user", createUsersController.handle);
routerAdmin.post("/auth/signin", loginAdminController.handle);
routerAdmin.post("/auth/me", ensureAuthenticated, authMeController.handle);
routerAdmin.post("/reset/password/user", ensureAuthenticated, changePasswordController.handle)
routerAdmin.delete("/delete-user/:id", ensureAuthenticated, ensureAdmin, deleteUsersController.handle);

export { routerAdmin }

