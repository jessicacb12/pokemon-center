require("dotenv").config();
const { execSync } = require("child_process");

if (process.env.NODE_ENV_TEST) {
  process.env.NODE_ENV = process.env.NODE_ENV_TEST;
} else if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "test";
}
process.env.MOCHA_CLI = true;
console.log(`test running using environment settings: ${process.env.NODE_ENV}`);

execSync("npm run db:migrate");
