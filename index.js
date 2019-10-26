#!/usr/bin/env node

const inquirer = require("inquirer");
const open = require("open");
const package = require("./package.json");
const commander = require("commander");
const figlet = require("figlet");
const ora = require("ora");

const devilmalUrl = "devimalplanet.com";
const program = setupCommander();

async function run() {
    const spinner = ora({text: 'Simulating some slow async task. What a Devimal Planet...', spinner: 'earth'}).start();
    await simulateSlowAsyncTask(5000);
    spinner.succeed('Heavy task finished!\n')

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
    console.log(await generateAsciiArt());
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

async function generateAsciiArt() {
    return new Promise((resolve, reject) => {
        // figlet docs: https://www.npmjs.com/package/figlet
        figlet.text(
            "Devimal",
            {
                font: "ANSI Shadow",
                horizontalLayout: "default",
                verticalLayout: "default"
            },
            function(err, data) {
                if (err) {
                    console.log("Something went wrong...");
                    console.dir(err);
                    reject(err);
                }
                resolve(data);
            }
        );
    });
}

async function simulateSlowAsyncTask(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
}

run();
