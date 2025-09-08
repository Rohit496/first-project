const name = 'John';

if (name === 'John') {
  console.log('Hello');
}

// create some sample code
const age = 25;

if (age > 18) {
  console.log('Adult');
}

// create some sample code
const city = 'New York';

if (city === 'New York') {
  console.log('New York');
}

// create some sample code
const country = 'USA';

if (country === 'USA') {
  console.log('USA');
}

// Add a test without error
if (country === 'USA') {
  // Fixed - using === instead of ==
  console.log('No error test');
}
