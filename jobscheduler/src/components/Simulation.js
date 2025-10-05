import React from "react";
import "../styles/Simulation.css";

function Simulation() {
  return (
    <section className="simulation">
      <h2>Simulation</h2>
      <div className="sim-container">
        <div className="queue-input">
          <h3>Queue Input</h3>
          <input placeholder="Processes (P1, P2...)" />
          <input placeholder="Arrival Times (0, 1, 2...)" />
          <input placeholder="Burst Times (5, 3, 2...)" />
          <input placeholder="Priority (1, 2, 3... optional)" />
          <select>
            <option>Round Robin</option>
            <option>FCFS</option>
            <option>Priority</option>
            <option>Multi-Level Queue</option>
          </select>
          <div className="buttons">
            <button className="btn primary">Run</button>
            <button className="btn">Reset</button>
          </div>
        </div>
        <div className="visualization">
          <h3>Visualization</h3>
          <div className="gantt">
            <span>P1</span><span>P2</span><span>P3</span>
          </div>
          <div className="queues">
            <div>High Priority</div>
            <div>Interactive Queue</div>
            <div>Low Priority</div>
          </div>
          <div className="stats">
            <p>CPU Utilization: 78%</p>
            <p>Average Waiting Time: 4.2</p>
            <p>Turnaround Time: 9.3</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Simulation;