const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
const allEmployee = []

const createTeam = function(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "manager's Name",
                name: "name",
            },
            {
                type: "input",
                message: "manager's Id",
                name: "id",
            },
            {
                type: "input",
                message: "manager's Email",
                name: "email",
            },
            {
                type: "input",
                message: "manager's officeNumber",
                name: "officeNumber",
            }
        ])
        // get manager info
        .then(userResponce => {
            const manager = new Manager(userResponce.name, userResponce.id, userResponce.email, userResponce.officeNumber)
            allEmployee.push(manager)
            // call addroll function to ask if they wanna add anothe employee
            addRole();
        });


}
// this is the addroll function       
const addRole = function(){
    inquirer
        .prompt([
            {
                type: "list",
                message: "what type of employee do you wanna add",
                name: "role",
                choices: ["engineer","intern", "other", "I am done adding roles" ]
            // checking for role to be prompt
            }]).then(userResponse =>{
                if (userResponse.role === "engineer") {
                     addEngineer();
                    
                }else if (userResponse.role === "intern") {
                     addintern();
                    
                }else if (userResponse.role === "other") {
                     addEmployee();
                    
                }else {
                    buildTeam()
                }
            }) 
} 
const addEmployee = function(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "what is employee's Name",
                name: "name",
            },
            {
                type: "input",
                message: "what is employee's Id",
                name: "id",
            },
            {
                type: "input",
                message: "what is employee's Email",
                name: "email",
            }
           
        ]).then(userResponce => {
            const newEmployee = new Employee(userResponce.name, userResponce.id, userResponce.email)
            allEmployee.push(newEmployee);
            addRole();
        })


}
const addintern = function(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "what is intern's Name?",
                name: "name",
            },
            {
                type: "input",
                message: "what is intern's Id?",
                name: "id",
            },
            {
                type: "input",
                message: "what is intern's Email?",
                name: "email",
            },
            {
                type: "input",
                message: "what school did intern attend to?",
                name: "school",
            }
        ]).then(userResponce => {
            const intern = new Intern(userResponce.name, userResponce.id, userResponce.email, userResponce.school)
            allEmployee.push(intern);
            addRole();
        })
}
const addEngineer = function(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "what is engineer's Name",
                name: "name",
            },
            {
                type: "input",
                message: "what is engineer's Id",
                name: "id",
            },
            {
                type: "input",
                message: "what is engineer's Email",
                name: "email",
            },
            {
                type: "input",
                message: "what is engineer 's github",
                name: "github",
            }
        ]).then(userResponce => {
            const engineer = new Engineer(userResponce.name, userResponce.id, userResponce.email, userResponce.github)
            allEmployee.push(engineer);
            addRole();
        })
}
const buildTeam = function (){
    fs.writeFileSync(outputPath, render(allEmployee), "utf8")
}
createTeam();
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
