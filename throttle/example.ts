import { throttle } from "./throttle";

function log() {
  console.log(`Function executed at: ${new Date()}`);
}

const throttledLog = throttle(log, 2000);

setInterval(throttledLog, 500); // Only logs every 2 seconds even though interval is 0.5s
