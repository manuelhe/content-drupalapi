import GoogleSpreadsheet from "google-spreadsheet";
import { IGoogleCredentials } from "../model";

const getSpreadsheet = (spreadsheetId: string, credentials: IGoogleCredentials): Promise<any> => {
  return new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(spreadsheetId);
    doc.useServiceAccountAuth(credentials, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};

const getWorksheetByTitle = (spreadsheet: any, worksheetTitle: string): Promise<any> => {
  return new Promise((resolve, reject) =>
    spreadsheet.getInfo((error: any, spreadSheet: any) => {
      if (error) {
        reject(error);
      }
      const targetSheet = spreadSheet.worksheets.find((sheet: any) => sheet.title === worksheetTitle);
      if (!targetSheet) {
        reject(`Found no worksheet with the title ${worksheetTitle}`);
      }
      resolve(targetSheet);
    }),
  );
}

const getRows = (worksheet: any, options = {}): Promise<any> => {
  return new Promise((resolve, reject) =>
    worksheet.getRows(options, (err: any, rows: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    }),
  );
}

const fetchData = async (spreadsheetId: string, worksheetTitle: string, credentials: IGoogleCredentials) => {
  const spreadsheet = await getSpreadsheet(spreadsheetId, credentials);
  const worksheet = await getWorksheetByTitle(spreadsheet, worksheetTitle);
  return await getRows(worksheet);
};

export default fetchData;
