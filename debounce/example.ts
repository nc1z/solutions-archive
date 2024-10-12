const { debounce } = require("./debounce");

function logMessage(message) {
  console.log(message);
}

const debouncedLog = debounce(logMessage, 1000);

// Call the debounced function multiple times
debouncedLog("Call 1");
debouncedLog("Call 2");
debouncedLog("Call 3");

// Only "Call 3" will be logged, 1 second after the last call to `debouncedLog`.
