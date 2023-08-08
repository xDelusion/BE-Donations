const Question = require("../../models/Question");

//these controllers are just to deal with PACI schema
//this is suppoed to be an API for PACI
exports.createQuestion = async (req, res, next) => {
  try {
    const newQuestion = await Question.create(req.body);
    return res.status(204).json(newQuestion);
  } catch (error) {
    return next(error);
  }
};

exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(civils);
  } catch (err) {
    return next(err);
  }
};
