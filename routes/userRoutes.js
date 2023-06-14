const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      if (user.username === username) {
        return res.status(400).json({
          msg: "Username already exists",
        });
      }
      if (user.email === email) {
        return res.status(400).json({
          msg: "Email already exists",
        });
      }
    }
    user = new User({
      username,
      email,
      password,
      isAdmin,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).json({
      msg: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      msg: err.name,
    });
  }
});

router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    let user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid username or email",
      });
    }
    const flag = await bcrypt.compare(password, user.password);
    if (!flag) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }

    const payload = {
      user: {
        username: user.username,
        isAdmin: user.isAdmin,
      },
    };

    jwt.sign(
      payload,
      "secret-key",
      { expiresIn: 10000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

router.get("/admin-only", auth(true), (req, res) => {
  // Handle the request logic for admin-only route
  res.json({ message: "Admin-only route accessed" });
});

router.get("/role", auth(false), async (req, res) => {
  try {
    return res.json({
      isAdmin: req.user.isAdmin,
      msg: "Authorized",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error in getting role",
    });
  }
});

router.get("/users/:id", auth(true), async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.get("/users", auth(true), async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

// router.put("/users/:id", auth(true), async (req, res) => {
//   let { username, email, password, isAdmin } = req.body;
//   try {
//     const id = req.params.id;

//     let oldUser = await User.findOne({ _id: id });
//     if (oldUser.username !== username) {
//       let existingUsername = await User.findOne({ username });
//       if (existingUsername) {
//         if (existingUsername.username === username) {
//           return res.status(400).json({
//             msg: "Username already exists",
//           });
//         }
//       }
//     }
//     if (oldUser.email !== email) {
//       let existingEmail = await User.findOne({ email });
//       if (existingEmail) {
//         if (existingEmail.email === email) {
//           return res.status(400).json({
//             msg: "Email already exists",
//           });
//         }
//       }
//     }

//     const flag = await bcrypt.compare(password, oldUser.password);
//     if (!flag) {  
//       const salt = await bcrypt.genSalt(10);
//       password = await bcrypt.hash(password, salt);
//     }
//     let user = await User.findOneAndUpdate(
//       { _id: id },
//       {username, email, password, isAdmin},
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({
//         msg: "User not found",
//       });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({
//       msg: error.message,
//     });
//   }
// });
router.put("/users/:id", auth(true), async (req, res) => {
  let { username, email, password, isAdmin } = req.body;
  try {
    const id = req.params.id;

    let oldUser = await User.findOne({ _id: id });

    if (oldUser.username !== username) {
      let existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({
          msg: "Username already exists",
        });
      }
    }

    if (oldUser.email !== email) {
      let existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          msg: "Email already exists",
        });
      }
    }

    if (password !== oldUser.password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    let user = await User.findOneAndUpdate(
      { _id: id },
      { username, email, password, isAdmin },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: error.message,
    });
  }
});


router.delete("/users/:id", auth(true), async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
