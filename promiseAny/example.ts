import { promiseAny } from "./promiseAny";

const p1 = new Promise((_, reject) => setTimeout(reject, 100, "p1 rejected"));
const p2 = new Promise((resolve) => setTimeout(resolve, 200, "p2 resolved"));
const p3 = new Promise((_, reject) => setTimeout(reject, 300, "p3 rejected"));

promiseAny([p1, p2, p3])
  .then((value) => console.log("Resolved with:", value))
  .catch((error) => console.log("All rejected with errors:", error.errors));
