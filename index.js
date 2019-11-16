#!/usr/bin/env node

const jest = require("jest");
const path = require("path");

const options = {
  projects: [path.join(`${__dirname}/dist`)],
  silent: true
};

const args = process.argv.filter(
  arg => arg.startsWith("-") || arg.startsWith("--")
);

const shouldWatch = args.includes("--watch") || args.includes("-w");
const shouldUpdateSnapshot =
  args.includes("--updateSnapshot") || args.includes("-u");

jest
  .runCLI(
    {
      ...options,
      watch: shouldWatch,
      watchAll: shouldWatch,
      updateSnapshot: shouldUpdateSnapshot,
      config: path.resolve(__dirname, "morpheus.config.js")
    },
    options.projects
  )
  .then(() => {
    console.log("success");
  })
  .catch(failure => {
    console.error(failure);
  });
