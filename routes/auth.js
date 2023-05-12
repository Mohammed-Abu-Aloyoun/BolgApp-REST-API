const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User.js");




router.get('/',(req,res)=>{
    res.status(200).json({message:'auth pageeee'})
})

router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, email, password: hashedPass });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error",err });
  }
});



router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json("email not found!");
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json("كلمة السر غير صحيحة");
      }
      const { password: hashedPassword, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  



module.exports = router;
