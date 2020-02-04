import { Entity, GlobalClient } from "drupal-jsonapi-client";
import slugify from "slugify";
import { IProgram, ParagraphType } from "../model";
import Config from "./config";
import postParagraph from "./postParagraph";

const { drupalBaseUrl, drupalPass, drupalUser } = Config;

GlobalClient.baseUrl = drupalBaseUrl;
GlobalClient.authorization = `Basic ${Buffer.from(`${drupalUser}:${drupalPass}`).toString("base64")}`;

const asyncForEach = async (array: any[], callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const richTextParagraphs = [
  "overview",
  "entry-requirements",
  "curriculum",
  "careers",
];

export default async (program: IProgram) => {
  // Creating relationships
  const sectionsData = [];

  // Program Hero
  const programHero = await postParagraph({
    content: {
      programId: program.courseId,
      programName: program.programName,
    },
    type: ParagraphType.program_hero,
  }, program);

  if (programHero) {
    sectionsData.push({
      id: programHero.id,
      meta: {
        target_revision_id: programHero.attributes.drupal_internal__revision_id,
      },
      type: programHero.type,
    });
  }

  // Rich text paragraphs
  await asyncForEach(richTextParagraphs, async (id: string) => {
    const paragraph = await postParagraph({
      content: {
        content: program[id],
        id,
      },
      type: ParagraphType.rich_text,
    });

    if (paragraph) {
      sectionsData.push({
        id: paragraph.id,
        meta: {
          target_revision_id: paragraph.attributes.drupal_internal__revision_id,
        },
        type: paragraph.type,
      });
    }
  });

  const newProgram = new Entity("node", "details_page");

  newProgram.setAttribute("status", true);
  newProgram.setAttribute("title", program.programName);
  newProgram.setAttribute("field_description", program.description);
  newProgram.setAttribute("field_relative_path", {
    uri: `internal:/asu/programs/${slugify(program.courseId)}`,
  });
  newProgram.setRelationship("field_sections", {
    data: sectionsData,
  });

  // console.log(newProgram._relationships.field_sections.data);
  try {
    const resp = await newProgram.save();
    if (resp.status !== 201) {
      return;
    }
    return resp.data.data;
  } catch (error) {
    console.error(error.response.data.errors);
  }
};
