import fs from "fs";

const INSOMNIA_FILE_NAME = /insomnia.*\.json/i;

const {
  cwd,
  env: { FILE }
} = process;

const insomniaFileName =
  FILE ||
  fs.readdirSync(cwd()).find(fileName => fileName.match(INSOMNIA_FILE_NAME));

if (!insomniaFileName || !fs.existsSync(insomniaFileName)) {
  throw new Error("Insonmia file not found");
}

const insomniaFile = JSON.parse(
  fs.readFileSync(insomniaFileName, { encoding: "utf-8" })
);

export default insomniaFile;