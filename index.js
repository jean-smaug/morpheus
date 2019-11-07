#!/usr/bin/env node

const jest = require("jest");
const path = require("path");

const options = {
  projects: [path.join(`${__dirname}/dist`)],
  silent: true
};

const args = process.argv.filter(arg => arg.startsWith("-") || arg.startsWith("--"))

const shouldWatch = args.includes("--watch") || args.includes("-w") ? true : false

jest
  .runCLI({
      ...options,
      roots: ["./dist"],
      watch: shouldWatch,
      watchAll: shouldWatch
    }, 
    options.projects
  )
  .then(() => {
    console.log("success");
  })
  .catch(failure => {
    console.error(failure);
  });
