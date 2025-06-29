import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import { validate } from "../validators/validate.js";
import { createUserSchema, updateUserSchema } from "../validators/user.validate.js";
import { authenticateToken } from "../middlewares/authenticate.js";

const router = Router();

// Routes
router.route("/")
    .get(usersController.getUsers)
    .post(validate(createUserSchema, 'body'), usersController.createUser);

router.route("/:id")
    .get(authenticateToken, usersController.getUserById)
    .put(authenticateToken, usersController.updateUser)
    .delete(authenticateToken, usersController.deleteUser)
    .patch(authenticateToken, usersController.activateInactivate);

router.get("/:id/tasks", authenticateToken, usersController.getUserTasks);

export default router;


