// Clean JavaScript file - should allow commits
const name = 'John';

function greet(person) {
  return `Hello ${person}`;
}

// This will show a warning but won't block the commit
console.log('This is just a warning');

if (name === 'John') {
  const greeting = greet(name);
  document.title = greeting;
}

// Good code that should pass
const userInfo = {
  name: 'John',
  age: 30,
  city: 'New York',
};

console.log(userInfo.name);
