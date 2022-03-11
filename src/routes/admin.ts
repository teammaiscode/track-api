import { Router } from "express";
import { CreateUsersController } from "../controllers/admin/CreateUsersController";
import { LoginAdminController } from "../controllers/admin/LoginAdminController";
import { AuthMeController } from "../controllers/admin/AuthMeController";
import { ListUsersController } from "../controllers/admin/ListUsersController";
import { DeleteUsersController } from "../controllers/admin/DeleteUsersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
const routerAdmin = Router()

const loginAdminController = new LoginAdminController();
const authMeController = new AuthMeController();
const createUsersController = new CreateUsersController();
const listUsersController = new ListUsersController();
const deleteUsersController = new DeleteUsersController();

routerAdmin.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando" });
})
routerAdmin.get("/list/users", ensureAuthenticated, ensureAdmin, listUsersController.handle);

routerAdmin.post("/register-user", createUsersController.handle);
routerAdmin.post("/auth/signin", loginAdminController.handle);
routerAdmin.post("/auth/me", ensureAuthenticated, authMeController.handle);

routerAdmin.delete("/delete-user/:id", ensureAuthenticated, ensureAdmin, deleteUsersController.handle);

export { routerAdmin }

