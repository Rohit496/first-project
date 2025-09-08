const name = 'John';
let greeting = '';

if (name === 'John') {
  // Process user greeting
  greeting = 'Hello ' + name;
}

// create some sample code
const age = 25;
let isAdult = false;

if (age > 18) {
  // Check adult status
  isAdult = true;
}

// create some sample code
const city = 'New York';
let cityCode = '';

if (city === 'New York') {
  // Handle New York specific logic
  cityCode = 'NYC';
}

// create some sample code
const country = 'USA';
let locale = '';

if (country === 'USA') {
  // Handle USA specific logic
  locale = 'en-US';
}

// Add a test without error
let countryConfirmed = false;
if (country === 'USA') {
  // Fixed - using === instead of ==
  countryConfirmed = true;
}

// Export or use variables to prevent unused warnings
const userInfo = {
  greeting,
  isAdult,
  cityCode,
  locale,
  countryConfirmed,
};

// Use the object to prevent unused variable errors
if (typeof module !== 'undefined' && module.exports) {
  module.exports = userInfo;
}
