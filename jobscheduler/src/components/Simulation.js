import React, { useState } from "react";
import { runAlgorithm } from "../logic";
import "../styles/Simulation.css";

function Simulation() {
  const [processes, setProcesses] = useState([]);
  const [pid, setPid] = useState("");
  const [arrival, setArrival] = useState("");
  const [burst, setBurst] = useState("");
  const [priority, setPriority] = useState("");
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [results, setResults] = useState([]);

  // Add process to list
  const addProcess = () => {
    if (!pid || !arrival || !burst) {
      alert("Please fill all required fields (PID, Arrival, Burst)");
      return;
    }
    setProcesses([
      ...processes,
      {
        pid,
        arrival: parseInt(arrival),
        burst: parseInt(burst),
        priority: parseInt(priority) || 0
      }
    ]);
    // Clear input fields
    setPid("");
    setArrival("");
    setBurst("");
    setPriority("");
  };

  // Remove a single process
  const removeProcess = (index) => {
    const updated = [...processes];
    updated.splice(index, 1);
    setProcesses(updated);
  };

  // Clear everything
  const clearAll = () => {
    setProcesses([]);
    setResults([]);
  };

  // Run selected algorithm
  const runSim = () => {
    if (processes.length === 0) {
      alert("No processes to simulate!");
      return;
    }
    setResults(runAlgorithm(processes, algorithm, 2));
  };

  // Calculate averages
  const avgWaiting = results.length
    ? (results.reduce((a, b) => a + b.waiting, 0) / results.length).toFixed(2)
    : 0;
  const avgTurnaround = results.length
    ? (results.reduce((a, b) => a + b.turnaround, 0) / results.length).toFixed(2)
    : 0;

  return (
    <section className="simulation">
      <h2>Job Scheduling Simulation</h2>
      <div className="sim-container">
        {/* Left Side: Input */}
        <div className="queue-input">
          <h3>Queue Input</h3>

          <input
            placeholder="PID"
            value={pid}
            onChange={(e) => setPid(e.target.value)}
          />
          <input
            placeholder="Arrival Time"
            type="number"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          />
          <input
            placeholder="Burst Time"
            type="number"
            value={burst}
            onChange={(e) => setBurst(e.target.value)}
          />
          <input
            placeholder="Priority (optional)"
            type="number"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />

          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="FCFS">First Come First Serve (FCFS)</option>
            <option value="SJF">Shortest Job First (SJF)</option>
            <option value="Priority">Priority Scheduling</option>
            <option value="RR">Round Robin</option>
            <option value="MLQ">Multi-Level Queue</option>
          </select>

          <div className="buttons">
            <button className="btn primary" onClick={addProcess}>
              ➕ Add Process
            </button>
            <button className="btn run" onClick={runSim}>
              ▶️ Run Simulation
            </button>
            <button className="btn danger" onClick={clearAll}>
              🗑️ Clear All
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>PID</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((p, i) => (
                <tr key={i}>
                  <td>{p.pid}</td>
                  <td>{p.arrival}</td>
                  <td>{p.burst}</td>
                  <td>{p.priority}</td>
                  <td>
                    <button
                      className="btn small danger"
                      onClick={() => removeProcess(i)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
              {processes.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No processes added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right Side: Output */}
        <div className="visualization">
          <h3>Results</h3>

          <div className="gantt">
            {results.map((p, i) => (
              <span key={i} title={`${p.pid} (${p.start}-${p.end})`}>
                {p.pid}
              </span>
            ))}
          </div>

          <table>
            <thead>
              <tr>
                <th>PID</th>
                <th>Start</th>
                <th>End</th>
                <th>Waiting</th>
                <th>Turnaround</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.pid}</td>
                  <td>{r.start}</td>
                  <td>{r.end}</td>
                  <td>{r.waiting}</td>
                  <td>{r.turnaround}</td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No results yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="stats">
            <p>Average Waiting Time: {avgWaiting}</p>
            <p>Average Turnaround Time: {avgTurnaround}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Simulation;
