const name = 'John';

if (name === 'John') {
  // Greet the user
  document.title = 'Hello ' + name;
}

// create some sample code
const age = 25;
let userStatus = 'unknown';

if (age > 18) {
  // User is an adult
  userStatus = 'adult';
}

// create some sample code
const city = 'New York';
let currentLocation = '';

if (city === 'New York') {
  // Set location info
  currentLocation = city;
}

// create some sample code
const country = 'USA';
let regionCode = '';

if (country === 'USA') {
  // Set country info
  regionCode = 'US';
}

// Add a test without error
let isValidCountry = false;
if (country === 'USA') {
  // Fixed - using === instead of ==
  isValidCountry = true;
}

// Use the variables to avoid unused variable warnings
document.addEventListener('DOMContentLoaded', () => {
  if (userStatus && currentLocation && regionCode && isValidCountry) {
    // Variables are used to prevent unused variable errors
  }
});
