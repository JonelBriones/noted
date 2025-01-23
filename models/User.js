import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      unique: [true, "username already exists"],
      required: [true, "username is required"],
    },

    notes: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        title: {
          type: String,
          required: [true, "Title is required"],
        },
        tags: [
          {
            type: String,
          },
        ],
        lastEdited: {
          type: Number,
        },
        isArchived: {
          type: Boolean,
        },

        content: {
          type: String,
        },
      },
    ],
    settings: {
      colorTheme: {
        type: String,
      },
      fontTheme: {
        type: String,
      },
      password: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
