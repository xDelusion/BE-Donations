const User = require("../../models/User");
const passHash = require("../../utils/auth/passHash");
const generateToken = require("../../utils/auth/generateToken");
const Paci = require("../../models/Paci");

exports.getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id)
      .populate("DonorRequest Recipient")
      .select("-password");
    return res.status(200).json(me);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    //encrypt the password
    const { password } = req.body;
    const passwordPattern = /[a-zA-Z0-9]{8,30}/;
    const isPasswordValid = passwordPattern.test(password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Password must be 8-30 characters long" });
    }

    // console.log(password);
    req.body.password = await passHash(password);

    //if (isEmp = false) { // Existing User error
    const existingCivilid = await User.findOne({
      civilid: req.body.civilid,
    });

    if (existingCivilid) {
      return res.status(403).json({ message: "Email or civil already exists" });
    }

    const matchingWithPaci = await Paci.findOne({
      civilid: req.body.civilid,
    });

    if (!matchingWithPaci) {
      return res
        .status(403)
        .json({ message: "Your civil id or name are not registered in PACI." });
    }

    const exsistingEmpnoOrCivilId = await User.findOne({
      emp_no: req.body.emp_no,
      civilid: req.body.civilid,
    });

    if (exsistingEmpnoOrCivilId) {
      return res.status(403).json({ message: "Email or civil already exists" });
    }
    if (req.body.bloodType === "O-") {
      req.body.matchingTypes = ["O-"];
    } else if (req.body.bloodType === "O+") {
      req.body.matchingTypes = ["O-", "O+"];
    } else if (req.body.bloodType === "A-") {
      req.body.matchingTypes = ["O-", "A-"];
    } else if (req.body.bloodType === "A+") {
      req.body.matchingTypes = ["O-", "O+", "A-", "A+"];
    } else if (req.body.bloodType === "B-") {
      req.body.matchingTypes = ["O-", "B-"];
    } else if (req.body.bloodType === "B+") {
      req.body.matchingTypes = ["O-", "O+", "B-", "B+"];
    } else if (req.body.bloodType === "AB-") {
      req.body.matchingTypes = ["O-", "A-", "B-", "AB-"];
    } else if (req.body.bloodType === "AB+") {
      req.body.matchingTypes = [
        "O-",
        "O+",
        "A-",
        "A+",
        "B-",
        "B+",
        "AB-",
        "AB+",
      ];
    }

    console.log(` user type is = ${req.body.userType}`);
    if (req.body.userType === "donor") {
      const newUser = await User.create(req.body);
    }

    //create token
    const token = generateToken(newUser);
    //return token
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.user);
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
}; //

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    // Delete all
    await User.deleteMany({});
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userInfo = await User.findById(req.user._id);
    if (userInfo) {
      await User.findByIdAndUpdate(req.user.id, req.body);
    }
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};
