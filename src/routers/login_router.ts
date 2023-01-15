import express from 'express';
import { User } from '../database/models/User';
import bcrypt from "bcrypt";
import { isAuthenticated } from '../middleware/authentication';

const router = express();

router.post("/login", async (req, res, next) => {

    const { username, password } = req.body;
    /**
     * 1. validate username and password
     * 2. if step 1 passed, create and link session ID to this user, store in DB?
     * 3. send 204 back + session ID from 2 as cookies
     */
    const user = await User.findOne({
        username, // we need to ensure that email addresses are unique, or this won't always work
    }).exec();
    
    if (user && bcrypt.compareSync(password, user.password)) {
        // create and link session ID to this user
        // send 204 + session ID as cookies

        req.session.regenerate((err) => {
            if (err) next(err);

            req.session.userId = user.id;

            req.session.save((err) => {
                if (err) next(err);
                res.status(200).redirect("/");
            });
        });
    } else {
        res.status(404).send({
            error: "User was not found."
        });
    }
});

router.post("/logout", isAuthenticated, async (req, res, next) => {

    delete req.session.userId;

    req.session.destroy((err) => {
        console.log('logged out');
        res.redirect("/");
    });
})

export default router;