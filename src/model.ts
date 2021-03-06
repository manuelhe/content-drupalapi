export enum ParagraphType {
  rich_text = "rich_text",
  program_hero = "program_hero",
}

export interface IGoogleCredentials {
  client_email: string;
  private_key: string;
}

export interface IProgram {
  courseId: string;
  programName: string;
  programType: string;
  description: string;
  interest_areas: string;
  prerequisites: string;
  overview: string;
  degreeRequirements: string;
  curriculum: string;
  careers: string;
  college: string;
  startDate: string;
  image: string;
  interestAreas1: string;
  interestAreas2: string;
  interestAreas3: string;
  interestAreas4: string;
  interestAreas5: string;
  interestAreas6: string;
  weeksPerClass: string;
  totalClasses: string;
  credits: string;
  programStudy: string;
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
