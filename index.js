
const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide installation instructions:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide usage information:',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Provide contribution guidelines:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide test instructions:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'None'],
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
  },
];

function generateREADME(answers) {
  return `
# ${answers.title}

![License](https://img.shields.io/badge/license-${answers.license}-blue)

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project is licensed under the ${answers.license} License.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For questions, please contact me on GitHub at [${answers.github}](https://github.com/${answers.github}) or email me at [${answers.email}](mailto:${answers.email}).
  `;
}

function writeToFile(data) {
  fs.writeFileSync('README.md', data, (err) =>
    err ? console.log(err) : console.log('Successfully created README.md!')
  );
}


inquirer
  .prompt(questions)
  .then((answers) => {
    const readmeContent = generateREADME(answers);
    writeToFile(readmeContent);
  })
  .catch((error) => {
    console.log(error);
  });
