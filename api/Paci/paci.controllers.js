const Paci = require("../../models/Paci");

//these controllers are just to deal with PACI schema
//this is suppoed to be an API for PACI
exports.createPaci = async (req, res, next) => {
  try {
    const newPaci = await Paci.create(req.body);
    return res.status(204).json(newPaci);
  } catch (error) {
    return next(error);
  }
};

exports.getAllCivil = async (req, res, next) => {
  try {
    const civils = await Paci.find();
    return res.status(200).json(civils);
  } catch (err) {
    return next(err);
  }
};
