const fs = require('fs');
const yargs = require('yargs');
// Load existing people data from file
const loadPeople = () => {
    try {
      const dataBuffer = fs.readFileSync('people.json');
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
    } catch (e) {
      return [];
    }
  };
  
  // Save people data to file
  const savePeople = (people) => {
    const dataJSON = JSON.stringify(people);
    fs.writeFileSync('people.json', dataJSON);
  };
  
  // Add a new person
  const addPerson = ({ id, fname, lname, age, city }) => {
    const people = loadPeople();
    const duplicatePerson = people.find((person) => person.id === id);
  
    if (duplicatePerson) {
      console.log('Person with this ID already exists.');
      return;
    }
  
    if (people.length >= 10) {
      console.log('Cannot add more than 10 people.');
      return;
    }
  
    people.push({ id, fname, lname, age, city });
    savePeople(people);
    console.log('Person added successfully.');
  };
  
  // View all people
  const viewAllPeople = () => {
    const people = loadPeople();
    if (people.length === 0) {
      console.log('No people found.');
    } else {
      console.log('People Data:');
      people.forEach((person) => console.log(person));
    }
  };
  
  // View a specific person by ID
  const viewPerson = (id) => {
    const people = loadPeople();
    const person = people.find((p) => p.id === id);
  
    if (!person) {
      console.log('Person not found.');
    } else {
      console.log('Person Data:', person);
    }
  };
  
  // Delete all people
  const deleteAllPeople = () => {
    savePeople([]);
    console.log('All people have been deleted.');
  };
  
  // Delete a specific person by ID
  const deletePerson = (id) => {
    const people = loadPeople();
    const updatedPeople = people.filter((person) => person.id !== id);
  
    if (people.length === updatedPeople.length) {
      console.log('Person not found.');
    } else {
      savePeople(updatedPeople);
      console.log('Person deleted successfully.');
    }
  }

// Configure yargs commands
yargs
  .command({
    command: 'add',
    describe: 'Add a new person',
    builder: {
      id: { describe: 'Person ID', demandOption: true, type: 'string' },
      fname: { describe: 'First Name', demandOption: true, type: 'string' },
      lname: { describe: 'Last Name', demandOption: true, type: 'string' },
      age: { describe: 'Age', demandOption: true, type: 'number' },
      city: { describe: 'City', demandOption: true, type: 'string' },
    },
    handler(argv) {
      addPerson(argv);
    },
  })
  .command({
    command: 'viewAll',
    describe: 'View all people',
    handler() {
      viewAllPeople();
    },
  })
  .command({
    command: 'view',
    describe: 'View a person by ID',
    builder: {
      id: { describe: 'Person ID', demandOption: true, type: 'string' },
    },
    handler(argv) {
      viewPerson(argv.id);
    },
  })
  .command({
    command: 'deleteAll',
    describe: 'Delete all people',
    handler() {
      deleteAllPeople();
    },
  })
  .command({
    command: 'delete',
    describe: 'Delete a person by ID',
    builder: {
      id: { describe: 'Person ID', demandOption: true, type: 'string' },
    },
    handler(argv) {
      deletePerson(argv.id);
    },
  })
  yargs.parse()