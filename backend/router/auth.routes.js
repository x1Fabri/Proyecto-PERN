import Router from "express-promise-router";
import { signin, signout, signup, profile } from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";
import {validateSchema} from "../middlewares/validate.middleware.js"
import { signupSchema, signinSchema } from "../schemas/auth.schemas.js";

const router = Router();

router.post("/signin", validateSchema(signinSchema), signin );

router.post("/signup", validateSchema(signupSchema), signup);

router.post("/signout", signout);

router.get("/profile", isAuth, profile);

export default router;
