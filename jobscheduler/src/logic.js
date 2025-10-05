// src/logic.js

export function runAlgorithm(processes, algorithm, quantum = 2) {
  let result = [];

  switch (algorithm) {
    case "FCFS":
      result = fcfs(processes);
      break;
    case "SJF":
      result = sjf(processes);
      break;
    case "Priority":
      result = priorityScheduling(processes);
      break;
    case "RR":
      result = roundRobin(processes, quantum);
      break;
    case "MLQ":
      result = multiLevelQueue(processes);
      break;
    default:
      result = fcfs(processes);
  }

  return result;
}

// ==================== ALGORITHMS ====================

// 1️⃣ FCFS
function fcfs(processes) {
  let sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  let currentTime = 0;
  let result = [];

  sorted.forEach((p) => {
    let start = Math.max(currentTime, p.arrival);
    let end = start + p.burst;
    let turnaround = end - p.arrival;
    let waiting = turnaround - p.burst;

    result.push({ ...p, start, end, waiting, turnaround });
    currentTime = end;
  });

  return result;
}

// 2️⃣ Shortest Job First
function sjf(processes) {
  let ready = [];
  let currentTime = 0;
  let completed = [];
  let remaining = [...processes];

  while (remaining.length > 0) {
    ready = remaining.filter((p) => p.arrival <= currentTime);
    if (ready.length === 0) {
      currentTime++;
      continue;
    }
    let shortest = ready.reduce((a, b) => (a.burst < b.burst ? a : b));
    remaining = remaining.filter((p) => p.pid !== shortest.pid);

    let start = Math.max(currentTime, shortest.arrival);
    let end = start + shortest.burst;
    let turnaround = end - shortest.arrival;
    let waiting = turnaround - shortest.burst;

    completed.push({ ...shortest, start, end, waiting, turnaround });
    currentTime = end;
  }

  return completed;
}

// 3️⃣ Priority Scheduling
function priorityScheduling(processes) {
  let ready = [];
  let currentTime = 0;
  let completed = [];
  let remaining = [...processes];

  while (remaining.length > 0) {
    ready = remaining.filter((p) => p.arrival <= currentTime);
    if (ready.length === 0) {
      currentTime++;
      continue;
    }
    let highest = ready.reduce((a, b) =>
      a.priority < b.priority ? a : b
    );
    remaining = remaining.filter((p) => p.pid !== highest.pid);

    let start = Math.max(currentTime, highest.arrival);
    let end = start + highest.burst;
    let turnaround = end - highest.arrival;
    let waiting = turnaround - highest.burst;

    completed.push({ ...highest, start, end, waiting, turnaround });
    currentTime = end;
  }

  return completed;
}

// 4️⃣ Round Robin
function roundRobin(processes, quantum = 2) {
  let queue = [...processes].sort((a, b) => a.arrival - b.arrival);
  let result = [];
  let currentTime = 0;
  let waiting = {};
  let turnaround = {};

  queue.forEach((p) => {
    waiting[p.pid] = 0;
    turnaround[p.pid] = 0;
  });

  let remaining = queue.map((p) => ({ ...p, remaining: p.burst }));

  while (remaining.length > 0) {
    let current = remaining.shift();
    if (current.arrival > currentTime) {
      currentTime = current.arrival;
    }

    let start = currentTime;
    let execTime = Math.min(quantum, current.remaining);
    currentTime += execTime;
    current.remaining -= execTime;
    let end = currentTime;

    result.push({
      pid: current.pid,
      start,
      end,
      waiting: 0,
      turnaround: 0,
    });

    if (current.remaining > 0) {
      remaining.push(current);
    } else {
      let turnaroundTime = end - current.arrival;
      let waitingTime = turnaroundTime - current.burst;
      waiting[current.pid] = waitingTime;
      turnaround[current.pid] = turnaroundTime;
    }
  }

  const summarized = processes.map((p) => ({
    ...p,
    start: result.find((r) => r.pid === p.pid)?.start ?? 0,
    end: result.filter((r) => r.pid === p.pid).slice(-1)[0]?.end ?? 0,
    waiting: waiting[p.pid],
    turnaround: turnaround[p.pid],
  }));

  return summarized;
}

// 5️⃣ Multi-Level Queue
function multiLevelQueue(processes) {
  let highPriority = processes.filter((p) => p.priority <= 3);
  let lowPriority = processes.filter((p) => p.priority > 3);

  let highResult = roundRobin(highPriority, 2);
  let lowResult = fcfs(lowPriority);

  return [...highResult, ...lowResult];
}
