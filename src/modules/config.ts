import dotenv from "dotenv";
import * as googleCredentials from "../../gapi_client_secret.json";

dotenv.config();

export default {
  contentSpreadsheetCredentials: googleCredentials,
  contentSpreadsheetId: process.env.CONTENT_SPREADSHEET_ID,
  drupalBaseUrl: process.env.DRUPAL_BASE_URL,
  drupalPass: process.env.DRUPAL_API_AUTH_PASS,
  drupalUser: process.env.DRUPAL_API_AUTH_USER,
};
