export enum ParagraphType {
  rich_text = "rich_text",
  program_hero = "program_hero",
}

export interface IGoogleCredentials {
  client_email: string;
  private_key: string;
}

export interface IProgram {
  code: string;
  title: string;
  category: string;
  interest_areas: string;
  interest_areas_2: string;
  interest_areas_3: string;
  interest_areas_4: string;
  interest_areas_5: string;
  interest_areas_6: string;
  description: string;
  overview: string;
  entry_requirements: string;
  degree_requirements: string;
  curriculum: string;
  careers: string;
  weeks_per_class: string;
  total_classes: string;
  credits: string;
  program_study: string;
  next_start_date: string;
}

export interface IParagraphRichText {
  content: string;
  id: string;
}

export interface IParagraphProgramHero {
  programId: string;
  programName: string;
}

export interface IParagraph {
  content: IParagraphProgramHero | IParagraphRichText;
  type: ParagraphType;
}

export interface IParagraphResponse {
  id: string;
  attributes: {
    drupal_internal__id: number;
    drupal_internal__revision_id: number;
  };
  type: string;
}
