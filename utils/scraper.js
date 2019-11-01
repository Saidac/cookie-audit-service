const puppeteer = require("puppeteer");

const scrapeMedium = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://medium.com/search?q=headless%20browser");

  const scrapedData = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        "div.postArticle-content a:first-child[data-action-value]"
      )
    )
      .filter(node => node.querySelector(".graf--title"))
      .map(link => ({
        title: link.querySelector(".graf--title").textContent,
        link: link.getAttribute("data-action-value")
      }))
  );
  await browser.close();
  return scrapedData;
};

const cookieCollector = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.beltegoed.nl");

  //  const collectedCookies = await page.cookies();
  const collectedCookies = await page._client.send("Network.getAllCookies", {});

  await browser.close();

  return collectedCookies;
};

const scrapeYoutube = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.youtube.com/results?search_query=headless+browser"
  );

  const scrapedData = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".ytd-video-renderer #video-title"))
      .map(link => ({
        title: link.getAttribute("title"),
        link: link.getAttribute("href")
      }))
      .slice(0, 10)
  );

  await browser.close();
  return scrapedData;
};

module.exports.scrapeMedium = scrapeMedium;
module.exports.cookieCollector = cookieCollector;
module.exports.scrapeYoutube = scrapeYoutube;
