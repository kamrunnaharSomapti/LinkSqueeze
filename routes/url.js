import express from "express";
import { handleShortUrl, handleGetAnalytics } from "../controller/url.js";
const router = express.Router();

router.post("/", handleShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
export default router;
