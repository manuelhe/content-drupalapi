import { Entity, GlobalClient } from "drupal-jsonapi-client";
import Config from "./config";

const { drupalBaseUrl, drupalPass, drupalUser } = Config;

GlobalClient.baseUrl = drupalBaseUrl;
GlobalClient.authorization = `Basic ${Buffer.from(`${drupalUser}:${drupalPass}`).toString("base64")}`;

export default async (isDryRun: boolean) => {
  try {
    // const entity = await Entity.Load("node", "details_page", "d4bce2c2-755f-41f5-9589-b442734209f7");
    // console.log(entity);
    const newProgram = new Entity("node", "details_page");

    newProgram.setAttribute("title", "Testing program detail page");
    newProgram.setAttribute("field_description", "A nice content that should be work as a program description.");
    newProgram.setAttribute("field_relative_path", {
      uri: "internal:/asu/programs/program-code",
    });

    const resp = await newProgram.save();

    console.log(resp.response);
  } catch (error) {
    console.error(error.response);
  }
};
