const Recipient = require("../../models/RecipientRequest");
const User = require("../../models/User");

exports.getRecipientById = async (req, res, next) => {
  try {
    const recipients = await Recipient.findById(req.recipient._id);
    return res.status(200).json(recipients);
  } catch (err) {
    next(err);
  }
};

//   exports.getDonorById = async (req, res ,next) =>{
//     try{
//         const { userId } = req.params;
//         const user = await User.findById(userId);

//         if (User.bloodType === Recipient.bloodType){
//             return user;
//         }
//     }catch (error){
//         next(error);
//     }
