import mongoose from "mongoose";

const codeScript = new mongoose.Schema({
  code_id: {
    type: String,
    unique: true,
  },
  code_name: String,
  code_script: String,
  time_stamp: {
    type: Date,
    default: new Date().toUTCString(),
  },
});

export default mongoose.model("codescript", codeScript);
