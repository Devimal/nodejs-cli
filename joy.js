#!/usr/bin/env node

const figlet = require("figlet");

function generateAsciiArt() {
    figlet.text(
        "Enjoy!",
        {
            font: "ANSI Shadow",
            horizontalLayout: "default",
            verticalLayout: "default"
        },
        function(err, data) {
            if (err) {
                console.log("Something went wrong...");
                console.dir(err);
            }
            console.log(data);
        }
    );
}

generateAsciiArt();
