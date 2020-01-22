import { Entity, GlobalClient } from "drupal-jsonapi-client";
import slugify from "slugify";
import { IProgram } from "../model";
import Config from "./config";

const { drupalBaseUrl, drupalPass, drupalUser } = Config;

GlobalClient.baseUrl = drupalBaseUrl;
GlobalClient.authorization = `Basic ${Buffer.from(`${drupalUser}:${drupalPass}`).toString("base64")}`;

export default async (program: IProgram) => {
  try {
    const newProgram = new Entity("node", "details_page");

    newProgram.setAttribute("title", program.title);
    newProgram.setAttribute("field_description", program.description);
    newProgram.setAttribute("field_relative_path", {
      uri: `internal:/asu/programs/${slugify(program.code)}`,
    });

    const resp = await newProgram.save();
    console.log(resp.response);
    return resp;
  } catch (error) {
    console.error(error.response);
  }
};
