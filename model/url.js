import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    clickHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the model
const URL = mongoose.model("URL", urlSchema);
export default URL;
