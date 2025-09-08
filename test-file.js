// This file demonstrates proper JavaScript formatting
const name = 'John';

function greet(person) {
  return 'Hello ' + person;
}

if (name === 'John') {
  const greeting = greet(name);
  // Using the greeting variable to avoid unused variable error
  document.title = greeting;
}
