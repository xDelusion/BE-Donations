const User = require("../../models/User");
const passHash = require("../../utils/auth/passHash");
const generateToken = require("../../utils/auth/generateToken");
const Paci = require("../../models/Paci");

exports.getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id)
      .populate("donor_req_id recipients")
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
    //encrypt the password\
    console.log(req.body);
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

    if (existingCivilid && req.body.userType === "donor") {
      return res.status(403).json({ message: "Email or civil already exists" });
    }

    const matchingWithPaci = await Paci.findOne({
      civilid: req.body.civilid,
    });

    if (!matchingWithPaci && req.body.userType === "donor") {
      return res
        .status(403)
        .json({ message: "Your civil id or name are not registered in PACI." });
    }

    if (req.body.bloodType === "O-") {
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
    } else if (req.body.bloodType === "O+") {
      req.body.matchingTypes = ["O+", "A+", "B+", "AB+"];
    } else if (req.body.bloodType === "A-") {
      req.body.matchingTypes = ["A-", "A+", "AB-", "AB+"];
    } else if (req.body.bloodType === "A+") {
      req.body.matchingTypes = ["A+", "AB+"];
    } else if (req.body.bloodType === "B-") {
      req.body.matchingTypes = ["B-", "B+", "AB-", "AB+"];
    } else if (req.body.bloodType === "B+") {
      req.body.matchingTypes = ["B+", "AB+"];
    } else if (req.body.bloodType === "AB-") {
      req.body.matchingTypes = ["AB-", "AB+"];
    } else if (req.body.bloodType === "AB+") {
      req.body.matchingTypes = ["AB+"];
    }
    let newUser = null;
    console.log(` user type is = ${req.body.userType}`);
    if (req.body.userType === "donor") {
      req.body.emp_no = req.body.civilid;

      newUser = await User.create(req.body);
      //create token
      const token = generateToken(newUser);
      return res.status(201).json({ token });
    }
    const existingEmpno = await User.findOne({
      emp_no: req.body.emp_no,
      civilid: req.body.civilid,
      isEmp: true,
    });
    // let updatedAdmin = null;
    // if (existingEmpno && req.body.userType === "admin") {
    //   updatedAdmin = await User.findByIdAndUpdate(existingEmpno.id, req.body);
    //   const token = generateToken(updatedAdmin);
    //   return res.status(201).json({ token });
    // }

    newUser = await User.create(req.body);
    //create token
    const token = generateToken(newUser);
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
