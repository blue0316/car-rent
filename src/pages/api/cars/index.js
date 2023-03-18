const { chromium } = require("playwright");
const { parse } = require("node-html-parser");
// const express = require('express');
const fs = require('fs');
// const cors = require('cors');
const data = require("./data.json");


let productData = [];
async function getData(html, page) {
    let htmlPage = page;

    let productWrapper = parse(html);
    // let productWrapper = htmlContent.querySelector("#skip-to-resultlist");

    productWrapper.querySelectorAll(":scope > div.Box-sc-wfmb7k-0.jYFQjC").forEach(async (item, index) => {
        // let detailPath = "https://d-themes.com" /react/riode/demo-1/product/default/beyond-riode-original-t-shirt/";
        // let detailPath = "https://d-themes.com" + item.querySelector(".product-media a").getAttribute("href");

        // for (const li of await page.locator('.product-media').all()) {
        //     console.log("clicked");
        //     await li.click();
        // }
        // await htmlPage.getByRle(".product-media a");
        // await page.waitForLoadState("load");
        // let detailHTML = await page.innerHTML(".product-details");
        // detailHTML = parse(detailHTML);
        // let desc = detailHTML.querySelector(".product-short-desc").innerHTML;
        // htmlPage.goBack();
        item.querySelector("a").click();
        let detailHTML = await page.innerHTML(".product-details");
        detailHTML = parse(detailHTML);
        let desc = detailHTML.querySelector("h1").textContent;
        htmlPage.goBack();

        // console.log("item is", index, "item content 0", item.querySelectorAll("span")[1].textContent);
        // console.log("item is", index, "item content 1", item.querySelectorAll("span")[1].textContent);
        // console.log("item is", index, "item content 2", item.querySelectorAll("span")[2].textContent);
        // console.log("item is", index, "item content 3", item.querySelectorAll("span")[3].textContent);
        // console.log("item is", index, "item content 4", item.querySelectorAll("span")[4].textContent);
        // console.log("item is", index, "item content 5", item.querySelectorAll("span")[5].textContent);
        // console.log("item is", index, "item content 6", item.querySelectorAll("span")[6].textContent);

        // console.log("item is", index, "item content 7", item.querySelectorAll("span")[7].textContent);
        // console.log("item is", index, "item content 9", item.querySelectorAll("span")[9].textContent);

        let product = {
            id: productData.length,
            desc: desc,
            img: item.querySelector("img").getAttribute("src"),
            name: item.querySelector("h3").textContent,
            place: item.querySelectorAll("span")[7].textContent,
            capacity: item.querySelectorAll("span")[3].textContent,
            power: item.querySelectorAll("span")[5].textContent,
            price: item.querySelectorAll("span")[9] && item.querySelectorAll("span")[9].textContent
        };

        productData.push(product);
    });
}

async function init() {
    // navigate to the next page
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.willhaben.at/iad/gebrauchtwagen/nutzfahrzeuge/nutzfahrzeugboerse");
    console.log("we are on shop page !!!");

    // get page content and save to the database
    let temp, html;
    while (1) {
        // temp = html;
        await page.mouse.wheel(0, 15000);
        html = await page.innerHTML("#skip-to-resultlist");

        if (productData.length >= 30) break;
        if (temp === html) break;

        setTimeout(() => {
            getData(html, page);
        }, 3)
        console.log("next button is", page.getByTestId("pagination-top-next-button"));
        // await page.click(".page-link-next.page-link");
        await page.getByTestId("pagination-top-next-button").click();
        await page.waitForLoadState("load");
    }

    fs.writeFile('data.json', JSON.stringify(productData), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    // close browser
    await page.close();
    await context.close();
    await browser.close();
};

// return data;

// var app = express();
// app.use(cors());

// app.get('/cars', (req, res) => {
//     res.status(200).json(data);
// })

// let port = 8000;

// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });

// run init function
// setInterval(() => {
//     init();
// }, 86400000);

export default function handler(req, res) {
    res.status(200).json(data);
}