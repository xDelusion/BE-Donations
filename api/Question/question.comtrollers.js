
const User = require("../../models/User");
const Question = require ("../../models/Question")
exports.createQuestion = async (req, res, next) => {
  try {

      const newQuestion = await Question.create(req.body);
      return res.status(201).json(newQuestion);
    
  } catch (err) {
    // return res.status(500).json(err.message);
    return next(err);
  }
};

exports.getAllQuestion = async (req, res, next) => {
    try {
        const question = await Question.find();

        return res.status(200).json(question);
        
    } catch (err) {
      // return res.status(500).json(err.message);
      return next(err);
    }
  };