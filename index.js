import inquirer from 'inquirer';
import fs from 'fs';


const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project? (e.g., My Awesome App)',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project: (e.g., A tool for managing tasks)',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide installation instructions: (e.g., npm install)',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide usage information: (e.g., npm start)',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Provide contribution guidelines: (e.g., Fork, create branch, submit PR)',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide test instructions: (e.g., npm test)',
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
    message: 'What is your GitHub username? (e.g., johndoe)',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address? (e.g., johndoe@example.com)',
  },
];

function sanitizeLicense(license) {
  return license.replace(/ /g, '%20');
}

function generateREADME(answers) {
  const licenseBadge =
    answers.license !== 'None'
      ? `![License](https://img.shields.io/badge/license-${sanitizeLicense(answers.license)}-blue)`
      : '';

  return `
# ${answers.title}

${licenseBadge}

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
${answers.license !== 'None' ? `This project is licensed under the ${answers.license} License.` : 'No license applied.'}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For questions, please contact me:
- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: [${answers.email}](mailto:${answers.email})
  `;
}

function writeToFile(data) {
  try {
    fs.writeFileSync('README.md', data);
    console.log('Successfully created README.md!');
  } catch (err) {
    console.error('Error writing to file:', err);
  }
}

inquirer
  .prompt(questions)
  .then((answers) => {
    const readmeContent = generateREADME(answers);
    writeToFile(readmeContent);
  })
  .catch((error) => {
    console.error('Error during prompt:', error);
  });
