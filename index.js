import express from "express";
import mongoose from "mongoose";
import urlRoute from "./routes/url.js";
import URL from "./model/url.js";
import "dotenv/config";

const app = express();
const port = 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@clusterurlsshortner.ry3nm.mongodb.net/?retryWrites=true&w=majority&appName=Clusterurlsshortner`,
    {
      tls: true,
      tlsAllowInvalidCertificates: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas: ", error);
  });

// Middleware to parse JSON
app.use(express.json());
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          clickHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (entry) {
      res.redirect(entry.redirectUrl);
    } else {
      res.status(404).send("Short URL not found");
    }
  } catch (error) {
    console.error("Error fetching or updating the URL entry: ", error);
    res.status(500).send("Server error");
  }
});

const urlshortner = URL;
app.listen(port, () => {
  console.log(`the server is running on  port${port}`);
});
