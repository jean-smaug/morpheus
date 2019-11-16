"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const INSOMNIA_FILE_NAME = /insomnia.*\.json/i;
const { cwd, env: { FILE } } = process;
const insomniaFileName = FILE ||
    fs_1.default.readdirSync(cwd()).find(fileName => fileName.match(INSOMNIA_FILE_NAME));
if (!insomniaFileName || !fs_1.default.existsSync(insomniaFileName)) {
    throw new Error("Insonmia file not found");
}
const insomniaFile = JSON.parse(fs_1.default.readFileSync(insomniaFileName, { encoding: "utf-8" }));
exports.default = insomniaFile;
