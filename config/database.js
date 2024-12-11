import mongoose from "mongoose";

let connected = false;

try {
  await mongoose.connect("");
  connected = true;
} catch (error) {
  console.error(error);
  connected = false;
}
