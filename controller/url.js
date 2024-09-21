import { nanoid } from "nanoid";
import URL from "../model/url.js";

// database insert
export async function handleShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    clickHistory: [],
  });

  return res.json({ id: shortID });
}
export async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  try {
    const result = await URL.findOne({ shortId });

    if (!result) {
      // If the shortId is not found, return a 404 error
      return res.status(404).json({ error: "Short URL not found" });
    }

    // If the document is found, return the click history
    return res.json({
      totalClicks: result.clickHistory.length,
      analytics: result.clickHistory,
    });
  } catch (error) {
    // If there's any error during the database query, return a 500 error
    console.error("Error fetching analytics: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
