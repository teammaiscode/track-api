import { Router } from "express"
import { AuthMeController } from "../controllers/admin/AuthMeController";
import { ChangeEmailController } from "../controllers/app/ChangeEmailController";
import { ChangePasswordController } from "../controllers/app/ChangePasswordController";
import { ListBusesOnTripController } from "../controllers/app/ListBusesOnTripController";
import { ListBusOnGarageController } from "../controllers/app/ListBusOnGarageController";
import { ListLineClientController } from "../controllers/app/ListLineClientController";
import { ListNearBusesController } from "../controllers/app/ListNearBusesController";
import { LoginUsersController } from "../controllers/app/LoginUsersController";
import { SendCodeController } from "../controllers/app/SendCodeController";
import { SendTokenEmailController } from "../controllers/app/SendTokenEmailController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const routerWeb = Router()

const authMeController = new AuthMeController();
const loginUsersController = new LoginUsersController();
const sendTokenEmailController = new SendTokenEmailController();
const sendCodeController = new SendCodeController();
const changePasswordController = new ChangePasswordController();
const changeEmailController = new ChangeEmailController();
const listBusOnGarageController = new ListBusOnGarageController();
const listNearBusesController = new ListNearBusesController();
const listBusesOnTripController = new ListBusesOnTripController();
const listLineClientController = new ListLineClientController();

routerWeb.post("/api/auth/me", ensureAuthenticated, authMeController.handle);
routerWeb.post("/api/auth/signin", loginUsersController.handle);
routerWeb.post("/api/send/token-email", sendTokenEmailController.handle);
routerWeb.post("/api/send/code-confirm", sendCodeController.handle);
routerWeb.post("/api/list/available-buses", listBusOnGarageController.handle);
routerWeb.post("/api/list/near-buses", listNearBusesController.handle);
routerWeb.post("/api/list/trip-buses", listBusesOnTripController.handle);
routerWeb.post("/api/list/line-client", listLineClientController.handle);

routerWeb.put("/api/update/password", changePasswordController.handle);
routerWeb.put("/api/update/email", ensureAuthenticated, changeEmailController.handle);

export { routerWeb }