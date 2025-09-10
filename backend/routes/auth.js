//require("dotenv").config({ path: __dirname + "/../.env" });
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: __dirname + "/../.env" });
}

console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);


const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const jwtSecret=process.env.JWT_SECRET

//Route 1:CreateUser
router.post('/createuser',
    [
        body("name", "enter a valid name").isLength({ min: 3 }),
        body("email", "enter a valid email").isEmail(),
        body("password", "password mmust be atleast 5 character").isLength({ min: 5 })
    ],

    async (req, res) => {
        let success=false;
        //if there are error ,return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() })
        }
        try {
            //check wheather the user with this email exists already
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({success, error: "user already exists" });
            }

            const salt = await bcrypt.genSaltSync(10);
            const secPass = await bcrypt.hashSync(req.body.password, salt);
            //create a user
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });

            //for jsonwebtoken
            const data = {
                user: {
                    id: user.id
                }
            }
            
            const authtoken = jwt.sign(data, jwtSecret)
            success=true;
            res.json({success,authtoken,
                user: {
                   name: user.name,
                   email: user.email
            }
             });
        } catch (error) {
            console.error(error.message);
            res.status(500).json("internal server error");
        }

    });

//Route 2:login
router.post('/login',
    [
        body("email", "enter a valid email").isEmail(),
        body("password", "password can't be blank").exists()
    ],
    async (req, res) => {
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({success, error: "please login with correct credentials" })
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({success, error: "please login with correct credentials" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            success=true;
            const authtoken = jwt.sign(data, jwtSecret);
            res.json({success, authtoken ,
              user: {
                name: user.name,
                email: user.email
            }
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json("internal server error");
        }
    });

    //Route 1:getuser
    router.post('/getuser',fetchuser,async(req,res)=>{
      try {
       const userId=req.user.id;
       const user=await User.findById(userId) ;
       console.log(user);
       res.send(user);
      }  catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
      }
    })

module.exports = router;