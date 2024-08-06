const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const {check, validationResult} = require("express-validator");

router.post("/auth", async (req,res,) => {
    const { name,email,password,age,weight,height } = req.body;

    try{
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists"});
        }
        user = new User({
            name,email,password,age,height,weight,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err,token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/login", 
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.message});
        }

        const{ email, password } = req.body;

        try{
            let user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({ msg: "Invalid Credentials for user."});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({msg: "Invalid password credentials"});
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, process.env.JWT_SECRET,
                {expiresIn: "1h" },
                (err, token) => {
                    if(err) throw err;
                    res.json({token});
                }
            );

        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
)

module.exports = router;