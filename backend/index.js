const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: "GET",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Daily news");
});

const newsDataPath = path.join(__dirname, "/mock-data/mock-news.json");
const rawData = fs.readFileSync(newsDataPath);
const newsData = JSON.parse(rawData);

app.get("/news", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate start and end indices
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Slice the articles based on pagination
    const paginatedArticles = newsData.articles.slice(startIndex, endIndex);

    const response = {
      status: newsData.status,
      page: page,
      limit: limit,
      totalResults: newsData.totalResults,
      totalPages: Math.ceil(newsData.totalResults / limit),
      articles: paginatedArticles,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching news data",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
