import dotenv from "dotenv";

dotenv.config();

export default {
  drupalBaseUrl: process.env.DRUPAL_BASE_URL,
  drupalPass: process.env.DRUPAL_API_AUTH_PASS,
  drupalUser: process.env.DRUPAL_API_AUTH_USER,
};
