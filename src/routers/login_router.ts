import express from 'express';
import { User } from '../database/models/User';
import bcrypt from "bcrypt";
import auth from '../middleware/auth';
import UserController from '../controllers/UserController';
import { csrfSync } from "csrf-sync";

const { generateToken } = csrfSync();
const router = express();

router.post("/login", async (req, res, next) => {
    const { 
        email, 
        password,
    } = req.body;

    const user = await User.findOne({
        email,
    }).exec();
    
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.regenerate((err) => {
            if (err) next(err);
            
            // regenerate synchronizer token to for extra security
            req.session.csrfToken = generateToken(req);
            req.session.userId = user.id;

            console.log("new sesh: ", req.session);

            req.session.save((err) => {
                if (err) next(err);

                res.status(200).send({
                    "newToken": req.session.csrfToken,
                });
            });
        });
    } else {
        res.status(404).send({
            error: "User was not found."
        });
    }
});

router.post("/logout", auth.isAuthenticated, async (req, res, next) => {
    delete req.session.userId;

    req.session.destroy((err) => {
        console.log('logged out');
        res.status(200).end();
    });
});

router.post("/register", async (req, res, next) => {
    const { 
        email, 
        password,
        firstName,
        lastName,
    } = req.body;

    const userController = new UserController();

    await userController.createUser({
        email, password, firstName, lastName,
    });

    res.status(204).redirect("/");
})

export default router;