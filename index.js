#!/usr/bin/env node

const inquirer = require("inquirer");
const open = require("open");

async function run() {
    console.log("Hi! 👋  Welcome devimal-cli!");
    let urlToVisit = "devimalplanet.com";

    const { openDevimal } = await inquirer.prompt({
        type: "confirm",
        name: "openDevimal",
        message: "Would you like to visit devimalplanet.com?",
        default: true
    });

    if (!openDevimal) {
        // not opening devimalplanet.com
        const { someFunUrl } = await inquirer.prompt({
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
        });

        urlToVisit = someFunUrl;
    }

    urlToVisit = urlToVisit.startsWith('http') ? urlToVisit : 'https://' + urlToVisit
    await open(urlToVisit);
}

run();
