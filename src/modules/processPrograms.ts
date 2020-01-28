import slugify from "slugify";
import Config from "./config";
import fetchSheet from "./fetchSheet";
import postProgram from "./postProgram";

const { contentSpreadsheetId, contentSpreadsheetCredentials } = Config;

export default async (isDryRun: boolean) => {
  const profileInfo = {
    startTime: Date.now(),
    totalProgramsCreated: 0,
  };

  // Fetch data
  const data = await fetchSheet(contentSpreadsheetId, "programs", contentSpreadsheetCredentials);

  console.log("\x1b[36m%s\x1b[0m", `Start processing ${data.length} programs\n`);

  for (const item of data) {
    console.info(`Posting program: ${slugify(item.code)}`);
    if (!isDryRun) {
      const response = await postProgram(item);
      break;
      if (!response) {
        console.log("\x1b[31m%s\x1b[0m", "Error creating program");
        continue;
      }
      console.log("\x1b[32m%s\x1b[0m", `Program ${response.id} created succesfully`);
      profileInfo.totalProgramsCreated++;
    }
  }

  // Profiling info
  const date = new Date(Date.now() - profileInfo.startTime);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getUTCSeconds();

  console.log("\n\x1b[42m%s\x1b[0m", `Total programs created: ${profileInfo.totalProgramsCreated}`);
  console.log("\x1b[36m%s\x1b[0m", `Time spent: ${((h * 60) + m)} mins ${s} secs`);
};
