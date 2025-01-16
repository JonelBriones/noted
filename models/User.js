import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: [
      {
        type: String,
        unique: [true, "username already exists"],
        required: [true, "username is required"],
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
