import arg from 'arg';
import inquirer from "inquirer";

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            "--git": Boolean,
            "--yes": Boolean,
            "-g": "--git",
            "-y": "--yes",
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        skipPrompts: args["--yes"] || false,
        git: args["--git"] || false,
        projectName: args._[0],
        template: args._[1],
    }
}

async function promptForMissingOptions(options) {
    const defaultTemplate = "Website with HTML,";
    const defaultName = "your_project";
    if (options.projectName) {
        return {
            ...options,
            projectName: options.projectName || defaultName,
        };
    }
    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: "Please choose what do you want to do today",
            choices: ["Website with HTML,", "A discord Bot with discord.js"],
            default: defaultTemplate,
        });
    }

    if (!options.git) {
        questions.push({
            type: "confirm",
            name: "git",
            message: "Initialize a git repository ?",
            default: false,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    console.log(options);
}