const { AsyncScheduler } = require("./AsyncScheduler");

const scheduler = new AsyncScheduler();

const createTask =
  <T>(id: number, timeout: number, result: T) =>
  async (): Promise<T> => {
    console.log(`[${new Date().toLocaleTimeString()}] Task ${id} started`);
    await new Promise((resolve) => setTimeout(resolve, timeout));
    console.log(`[${new Date().toLocaleTimeString()}] Task ${id} completed`);
    return result;
  };

scheduler
  .add(createTask(1, 3000, 42))
  .then((result) => console.log(`[${new Date().toLocaleTimeString()}] Result of Task 1: ${result}`));
scheduler
  .add(createTask(2, 1000, "hello"))
  .then((result) => console.log(`[${new Date().toLocaleTimeString()}] Result of Task 2: ${result}`));
scheduler
  .add(createTask(3, 2000, { success: true }))
  .then((result) => console.log(`[${new Date().toLocaleTimeString()}] Result of Task 3: ${JSON.stringify(result)}`));
scheduler
  .add(createTask(4, 500, undefined))
  .then((result) => console.log(`[${new Date().toLocaleTimeString()}] Result of Task 4: ${result}`));

setTimeout(() => {
  console.log(`[${new Date().toLocaleTimeString()}] All results: `, scheduler.getResults());
}, 6000);
