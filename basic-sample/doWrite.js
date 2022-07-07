import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

(async () => {
  const postDataInfoList = [
    {
      usability: "c",
      developer: "o",
      content: "w",
      creativity: "b",
      mobile: "o",
      design: "y",
      id: "xxxyyyzzz",
    },
    {
      usability: "AAa",
      developer: "BBB",
      content: "CCC",
      creativity: "DDD",
      mobile: "EEE",
      design: "FFF",
      id: "fffvvvggg",
    },
  ];

  // https://developers.notion.com/reference/create-a-database
  // https://github.com/alexiscolin/awwwards-notion-scraping/blob/master/app.js#L22
  for (let index = 0; index < postDataInfoList.length; index++) {
    const postDataInfo = postDataInfoList[index];
    const resultInfo = await notion.request({
      path: "pages",
      method: "POST",
      body: {
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
          Usability: [{ text: { content: postDataInfo.usability } }],
          Developer: [{ text: { content: postDataInfo.developer } }],
          Content: [{ text: { content: postDataInfo.content } }],
          Creativity: [{ text: { content: postDataInfo.creativity } }],
          Mobile: [{ text: { content: postDataInfo.mobile } }],
          Design: [{ text: { content: postDataInfo.design } }],
        },
      },
    });
    console.log(resultInfo);
  }
})();
