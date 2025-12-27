const mongoose = require("mongoose");
const Joi = require("joi");

/* 🔹 Step-1: custom ObjectId validator */
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid user id");
  }
  return value;
};

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    detail: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    },
    encrypted: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: function () {
        return this.encrypted === true;
      },
      minlength: 4
    },
    user: {                                          ///referncing(link user with their task)
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

/*
   JOI VALIDATION
*/

function validateTask(data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    detail: Joi.string().min(5).required(),
    encrypted: Joi.boolean(),
    password: Joi.when("encrypted", {
      is: true,
      then: Joi.string().min(4).required(),
      otherwise: Joi.optional().allow("")
    }),
     user: Joi.custom(objectId).required()
  });

  return schema.validate(data);
}

module.exports.taskModel = mongoose.model("task", taskSchema);
module.exports.validateTask = validateTask;
