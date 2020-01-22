import Config from "./config";
import fetchSheet from "./fetchSheet";
import postProgram from "./postProgram";

const { contentSpreadsheetId, contentSpreadsheetCredentials } = Config;

export default async (isDryRun: boolean) => {
  // Fetch data
  const data = await fetchSheet(contentSpreadsheetId, "programs", contentSpreadsheetCredentials);

  console.log(`Starting processing ${data.length} programs`);

  for (const item of data) {
    console.info(`Posting program: ${item.code}`);
    if (!isDryRun) {
      const response = await postProgram(item);

      console.log(`Program ${response} created succesfully`);
    }
  }
};
