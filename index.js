let inquirer = require("inquirer");
let fs = require("fs");
let axios = require("axios");
let generateMarkdown = require("./generateMarkdown.js");

// const path = require('path');

const uInput = [
  {
    type: "input",
    message: "GitHub user name?",
    name: "username",
  },
  {
    message: "Project Title?",
    name: "readmeT",
    default: "RS ReadMe",
  },
  {
    message: "Please write a short description of your project.",
    name: "description",
    default: "Create a simple program to generate README.md's",
  },
  {
    type: "checkbox",
    message: "Choose whats needed for the Table of Contents?",
    name: "tableC",
    choices: [
      "Description", "Installation", "Usage", "License", "Contributing", "Tests", "Questions",
    ],
    default: [
      "Description", "Installation", "Usage", "License", "Contributing", "Tests", "Questions",
    ],
  },
  {
    type: 'list',
    message: 'Select a license for this project:',
    name: 'license',
    choices: ["MIT", "Apache", "The_Unlicense", "Mozilla_PL_2", "GNU_3"]
  },
  {
    type: 'input',
    message: 'List out any contributing members',
    name: 'contributing',
  },  
  {
    type: 'input',
    message: 'List out any tests needed',
    name: 'tests',
  },

];
//printing to the readme file

const writeToFile = async (filename, data) => {
  let fileIdentifier;
  try {
    fileIdentifier = await fs.open(filename, "w");
    await fileIdentifier.writeFile(data);
    console.log("Successfully wrote to ReadME.md");
  } catch (err) {
    console.error("Failure writing to ReadME.md", err);
  } finally {
    if (fileIdentifier !== undefined) await fileIdentifier.close();
  }
};

const main = async () => {
  try {
    const result = await inquirer.prompt(uInput);

    const githubUser = await axios.get(
      `https://api.github.com/users/${result.username}`
    );

    const markdown = generateMarkdown(result, githubUser);
    fs.writeFile(result.readmeT + '.md', markdown, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("Success!");
    });
  } catch (err) {
    console.log(err);
  }
};

main();
