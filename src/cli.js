import arg from 'arg';
import inquirer from "inquirer";
import {createProject} from "./main";

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
    }
}

async function promptForMissingOptions(options) {
    const defaultTemplate = "Website with HTML,";
    let projectName;
    const defaultName = "your_project";
    const questions = [];

    if (options.skipPrompts) {
        return {
            ...options,
            template: defaultTemplate,
            projectName: defaultName,
        }
    }

    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: "Please choose what do you want to do today, a",
            choices: ["html", "discord"],
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

    if (!options.projectName) {
        projectName = defaultName
    } else {
        projectName = options.projectName
    }


    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
        projectName: projectName,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createProject(options);
}