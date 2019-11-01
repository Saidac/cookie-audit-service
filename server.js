const express = require("express");

const scraper = require("./utils/scraper");
const app = express();

app.set("view engine", "pug");

app.get("/", async (req, res) => {
  // const mediumArticles = new Promise((resolve, reject) => {
  //   scraper
  //     .scrapeMedium()
  //     .then(data => {
  //       resolve(data);
  //     })
  //     .catch(err => reject("Medium scrape failed"));
  // });
  try {
    const collectedCookies = await scraper.cookieCollector();

    // const youtubeVideos = new Promise((resolve, reject) => {
    //   scraper
    //     .scrapeYoutube()
    //     .then(data => {
    //       resolve(data);
    //     })
    //     .catch(err => reject("YouTube scrape failed"));
    // });
    console.log(">>>>route", collectedCookies);
    res.render("index", {
      data: { cookies: collectedCookies }
    });
  } catch (error) {
    console.log(">>> error", error);

    res.status(500).send("broken, fix me");
  }
});

app.listen(process.env.PORT || 3000);
