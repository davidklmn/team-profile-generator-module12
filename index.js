const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee");

// team array
const team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
inquirer
  .prompt([
    // manager questions
    {
      type: "input",
      message: "Team Manager's name: ",
      name: "managerName",
    },
    {
      type: "input",
      message: "Team Manager's employee number: ",
      name: "managerId",
    },
    {
      type: "input",
      message: "Team Manager's email address: ",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "Team Manager's office number: ",
      name: "managerOffice",
    },
  ])
  .then((response) => {
    // populate manager info
    const managerName = `${response.managerName}`;
    const managerId = `${response.managerId}`;
    const managerEmail = `${response.managerEmail}`;
    const managerOffice = `${response.managerOffice}`;

    // generate manager class
    const manager = new Manager(
      managerName,
      managerId,
      managerEmail,
      managerOffice
    );
    // push manager into the array of employees
    team.push(manager);
    // calling function for the next user input
    promptForNextEmployee();
  });

const promptForNextEmployee = () => {
  inquirer
    .prompt([
      {
        // choice of 3
        type: "list",
        message: "What's next?",
        choices: [
          "Add an engineer",
          "Add an intern",
          "Finish building the team",
        ],
        name: "choices",
      },
    ])
    .then((response) => {
      // if engineer
      if (response.choices === "Add an engineer") {
        //    promptForEngineer
        promptForEngineer();
        // else if intern
      } else if (response.choices === "Add an intern") {
        //    promptForIntern
        promptForIntern();
        // else
      } else {
        //    use the functionality from page-template to generate the team
        // buildPage(team);
        console.log("done");
      }
    });
};

const promptForEngineer = () => {
  inquirer
    .prompt([
      {
        //engineer questions
        type: "input",
        message: "Engineer's name: ",
        name: "engName",
      },
      {
        type: "input",
        message: "Engineer's id: ",
        name: "engid",
      },
      {
        type: "input",
        message: "Engineer's email: ",
        name: "engEmail",
      },
      {
        type: "input",
        message: "Engineer's GitHub username: ",
        name: "engGit",
      },
    ])
    .then((response) => {
      const engName = `${response.engName}`;
      const engId = `${response.engId}`;
      const engEmail = `${response.engEmail}`;
      const engGit = `${response.engGit}`;

      const engineer = new Engineer(engName, engId, engEmail, engGit);
      // add new engineer to employees array
      team.push(engineer);

      promptForNextEmployee();
    });
};

const promptForIntern = () => {
  inquirer
    .prompt([
      {
        //intern questions
        type: "input",
        message: "Intern's name: ",
        name: "intName",
      },
      {
        //intern questions
        type: "input",
        message: "Intern's id: ",
        name: "intId",
      },
      {
        //intern questions
        type: "input",
        message: "Intern's email: ",
        name: "intEmail",
      },
      {
        //intern questions
        type: "input",
        message: "Intern's school: ",
        name: "intSchool",
      },
    ])
    .then((response) => {
      const intName = `${response.intName}`;
      const intId = `${response.intId}`;
      const intEmail = `${response.intEmail}`;
      const intSchool = `${response.intSchool}`;

      const intern = new Intern(intName, intId, intEmail, intSchool);
      // add new intern to employees array
      team.push(intern);

      promptForNextEmployee();
    });
};

// const buildPage = () => {
//   // render(myArrayOfTeamMembers)
//   console.log("Yay!");
// };
