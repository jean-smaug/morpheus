#!/usr/bin/env node

const jest = require("jest");
const path = require("path");

const options = {
  projects: [path.join(`${__dirname}/dist`)],
  silent: true
};

jest
  .runCLI({ ...options, roots: ["./dist"] }, options.projects)
  .then(() => {
    console.log("success");
  })
  .catch(failure => {
    console.error(failure);
  });
