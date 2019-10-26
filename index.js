#!/usr/bin/env node

const inquirer = require("inquirer");
const open = require("open");
const package = require("./package.json");
const commander = require("commander");

const devilmalUrl = "devimalplanet.com";
const program = setupCommander();

async function run() {
    const ranWithArgs = program.skipPrompts || program.url;
    if (!ranWithArgs) return interactiveRun();

    const url = typeof ranWithArgs === "string" ? ranWithArgs : devilmalUrl;
    return staticRun(url);
}

async function interactiveRun() {
    console.log("Hi! 👋  Welcome devimal-cli!");

    const { openDevimal } = await inquirer.prompt({
        type: "confirm",
        name: "openDevimal",
        message: "Would you like to visit devimalplanet.com?",
        default: true
    });

    const urlToVisit = openDevimal
        ? devilmalUrl
        : (await inquirer.prompt({
              type: "input",
              name: "someFunUrl",
              message: "😢  No? Which URL would you like to visit?",
              validate: function(input) {
                  return (
                      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(
                          input
                      ) || "Please enter a valid URL."
                  );
              }
          })).someFunUrl;

    await openUlr(urlToVisit);
}

async function staticRun(url) {
    // for now just opens url
    await openUlr(url);
}

async function openUlr(url) {
    url = url.startsWith("http") ? url : "https://" + url;
    await open(url);
}

function setupCommander() {
    const program = new commander.Command();

    program
        .version(package.version)
        .option(
            "-y, --skip-prompts",
            "skips questions, directly opens devimalplanet.com"
        )
        .option(
            "-u, --url <URL>",
            "skips questions, directly opens provided URL"
        )
        .parse(process.argv);

    return program;
}

run();
