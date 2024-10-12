/**
 * Promise scheduler with default max concurrent tasks of 2.
 */
export class AsyncScheduler {
  private queue: (() => Promise<unknown>)[] = [];
  private activeTasks: number = 0;
  private maxConcurrentTasks: number = 2;
  private results: unknown[] = [];

  constructor(maxConcurrentTasks?: number) {
    if (maxConcurrentTasks) {
      this.maxConcurrentTasks = maxConcurrentTasks;
    }
  }

  add(task: () => Promise<unknown>): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const wrappedTask = async () => {
        try {
          const result = await task();
          this.results.push(result);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.taskCompleted();
        }
      };
      this.queue.push(wrappedTask);
      this.runNext();
    });
  }

  private runNext(): void {
    if (this.activeTasks < this.maxConcurrentTasks && this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        this.activeTasks++;
        task(); // Task itself is async, no need to await here
      }
    }
  }

  private taskCompleted(): void {
    this.activeTasks--;
    this.runNext();
  }

  getResults(): unknown[] {
    return this.results;
  }
}
