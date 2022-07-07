import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_SECRET_KEY,
});

function getNotionDatabaseInfoList(fetchInfoList) {
  const resultInfoList = [];
  for (let i = 0; i < fetchInfoList.length; i++) {
    const fetchInfo = fetchInfoList[i];
    const propertyKeyList = Object.keys(fetchInfo.properties);
    let rowData = {
      usability: "",
      developer: "",
      content: "",
      creativity: "",
      mobile: "",
      design: "",
      id: fetchInfo.id,
    };
    const resultInfo = propertyKeyList.reduce((rowData, propertyKey) => {
      switch (fetchInfo.properties[propertyKey].type) {
        case "rich_text":
          Object.assign(rowData, {
            [propertyKey]:
              fetchInfo.properties[propertyKey].rich_text[0].plain_text,
          });
          break;
        case "title":
          Object.assign(rowData, {
            [propertyKey]:
              fetchInfo.properties[propertyKey].title[0].plain_text,
          });
          break;
        default:
          break;
      }
      return rowData;
    }, {});
    resultInfoList.push(resultInfo);
  }
  return resultInfoList;
}

(async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  const resultInfoList = getNotionDatabaseInfoList(response.results);
  console.log(JSON.stringify(response));
})();
