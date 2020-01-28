import { Entity, GlobalClient } from "drupal-jsonapi-client";
import { IParagraph, IParagraphResponse, ParagraphType } from "../model";
import Config from "./config";

const { drupalBaseUrl, drupalPass, drupalUser } = Config;

GlobalClient.baseUrl = drupalBaseUrl;
GlobalClient.authorization = `Basic ${Buffer.from(`${drupalUser}:${drupalPass}`).toString("base64")}`;

const getProgramHeroEntity = (paragraph): any => {
  const newParagraph = new Entity("paragraph", "program_hero");

  newParagraph.setAttribute("field_program_id", paragraph.programId);
  newParagraph.setAttribute("parent_type", "node");
  newParagraph.setAttribute("status", true);
  newParagraph.setRelationship("field_image", {
    data: {
      // @todo should be replaced by a real image or a placeholder
      id: "c54e2d32-dea0-4b8d-bdf4-2f07fdc8a72a",
      meta: {
        alt: paragraph.programName,
      },
      type: "file--file",
    },
  });

  return newParagraph;
};

const getRichTextEntity = (paragraph): any => {
  if (!paragraph.content.trim()) {
    return;
  }
  const newParagraph = new Entity("paragraph", "rich_text");

  newParagraph.setAttribute("field_id", paragraph.id);
  newParagraph.setAttribute("parent_type", "node");
  newParagraph.setAttribute("status", true);
  newParagraph.setAttribute("field_body", {
    format: "full_html",
    value: paragraph.content,
  });

  return newParagraph;
};

export default async (paragraph: IParagraph): Promise<IParagraphResponse> => {
  let paragraphEntity = null;
  try {
    switch (paragraph.type) {
      case ParagraphType.program_hero:
        paragraphEntity = getProgramHeroEntity(paragraph.content);
        break;
      case ParagraphType.rich_text:
        paragraphEntity = getRichTextEntity(paragraph.content);
        break;
      default:
    }

    if (!paragraphEntity) {
      return;
    }
    const resp = await paragraphEntity.save();

    return resp.data.data;
  } catch (error) {
    console.error(error.response.data.errors);
  }
};
