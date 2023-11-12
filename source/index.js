#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import open from 'open';

let playerName;

// Sets a timer, so that the animation would stop after two seconds and will call stop to move onto the next step
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); };


async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('"Hello there!" - Obi-Wan Kenobi \n');

    await sleep(2000);
    rainbowTitle.stop();

    // We are using backticks (``) for a JavaScript template literal.
    // It allows us to interpolate values into the text and also create multi-line logs
    // without manually having to add newline characters. 
    console.log(`
My name is ${chalk.bgBlue('Peter Abraham')}, a programmer, guitarist and a coffee enthusiast.
I play around with different programming projects for fun, like this CLI one.
`)

}

const choices = [
    {
        name: 'Website',
        value: 'https://peterabraham.com',
    },
    {
        name: 'LinkedIn',
        value: 'https://linkedin.com/in/peteriabraham',
    },
    {
        name: 'GitHub',
        value: 'https://github.com/peterabrahamdev',
    },
    {
        name: 'Twitter',
        value: 'https://twitter.com/iampeterabraham'
    },
    {
        name: 'Buy me a coffee ;)',
        value: 'https://github.com/sponsors/peterabrahamdev/'
    },
    {
        name: 'Exit',
        value: 'exit'
    }
];

async function showOptions() {
    const answers = await inquirer.prompt({
        name: 'contacts',
        type: 'list',
        message: 'How would you like to reach me?',
        choices: choices,
    });
    if (answers.contacts == 'exit') {
        figlet('Goodbye!', (err, data) => {
            console.log(gradient.pastel.multiline(data));
        })
        await sleep(500);
        process.exit();
    } else {
        open(answers.contacts);
        await showOptions();
    }
}

await welcome();
await showOptions();