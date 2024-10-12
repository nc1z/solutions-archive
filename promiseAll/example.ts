const { promiseAll } = require("./promiseAll");

function simulateAsync(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Resolved: ${value}`);
      resolve(value);
    }, delay);
  });
}

// Create an array of promises with different delays
const promises = [simulateAsync("First", 1000), simulateAsync("Second", 500), simulateAsync("Third", 1500)];

promiseAll(promises)
  .then((results) => {
    console.log("All Promises Resolved:", results);
  })
  .catch((error) => {
    console.log("A Promise Rejected:", error);
  });
