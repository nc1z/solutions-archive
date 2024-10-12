# Solutions Archive

An archive of real-world useful software solutions, patterns, algorithms.

## 1. Async Promise Scheduler

Default: 2 concurrent async tasks.

There are two scenarios where runNext() might be executed:

- New tasks are added to the scheduler, and activeTasks < maxConcurrentTasks
- Existing task is completed, and activeTasks < maxConcurrentTasks

```bash
npm run schedule
```

#### Context

Tasks are scheduled in this order: 1, 2, 3, 4

```
Task 1 - 3000ms
Task 2 - 1000ms
Task 3 - 2000ms
Task 4 - 500ms
```

- Since there can only be 2 maximum concurrent tasks, when tasks 1 and 2 are added, runNext() executes. Tasks 1 and 2 will start, tasks 3 and 4 are queued.

- Task 2 completes, executing runNext() and Task 3 gets pulled from the queue and executes.

- Task 1 finally completes, executing runNext() and Task 4 gets pulled from the queue and executes.

- AS Task 4 starts, Task 3 reaches completion.

- Finally Task 4 completes.

#### Results

```
[11:10:40 am] Task 1 started
[11:10:40 am] Task 2 started
[11:10:41 am] Task 2 completed
[11:10:41 am] Task 3 started
[11:10:41 am] Result of Task 2: hello
[11:10:43 am] Task 1 completed
[11:10:43 am] Task 4 started
[11:10:43 am] Result of Task 1: 42
[11:10:43 am] Task 3 completed
[11:10:43 am] Result of Task 3: {"success":true}
[11:10:43 am] Task 4 completed
[11:10:43 am] Result of Task 4: undefined
[11:10:46 am] All results:  [ 'hello', 42, { success: true }, undefined ]
```
