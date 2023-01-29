import express from 'express';
import { IUser } from "../database/models/User";
import UserController from '../controllers/UserController';
import auth from '../middleware/auth';

const router = express();

router.get("/:userId", async (req, res) => {
    const userController = new UserController();

    // need to include request/parmeter sanitizing to prevent SQL injections
    try {
        const user = await userController.getUser(req.params.userId);
        res.status(200);
        res.contentType("application/json");
        res.send(user);
    } catch (error) {
        res.status(500);
        res.send("User could not be found.");
    }
});

router.post("/register_user", async (req, res) => {
    const userController = new UserController();

    try {
        await userController.createUser(req.body as IUser);
        res.status(204).end();
    } catch (error) {
        res.status(500);
        res.send("User could not be created.");
    }
});

router.delete("/delete_user/:userId", auth.isAuthorized, async (req, res) => {
    const userController = new UserController();

    try {
        await userController.deleteUser(req.params.userId);
        res.status(204).end();
    } catch (error) {
        res.status(500);
        res.send("User could not be deleted.");
    }
});

router.put("/update_user/:userId", async (req, res) => {
    // ... TODO
});

export default router;
