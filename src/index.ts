import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import chardet from "chardet";
import { db } from "./Db";
import Iconv from "iconv";
import utf8 from "utf8";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const a = Iconv.Iconv("cp1251", "utf8");

async function getData() {
  try {
    const xmlResult = await axios.get(
      "https://torgi.gov.ru/opendata/7710349494-torgi/data-20220528T0000-20220611T0000-structure-20130401T0000.xml"
    );
    const xmlParser = new XMLParser();

    const result = xmlParser.parse(xmlResult.data);

    result.openData.notification.forEach(async (element: any) => {
      console.log(a.convert(element.organizationName).toString());
      // await db.one(
      //   `INSERT INTO example (name) VALUES ${element.organizationName}`
      // );
    });

    // console.log({ result: result.openData.notification });
  } catch (error: unknown) {
    console.log({ error });
  }
}

getData();
