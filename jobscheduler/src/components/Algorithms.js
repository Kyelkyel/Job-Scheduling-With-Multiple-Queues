import React from "react";
import "../styles/Algorithms.css";

function Algorithms() {
  return (
    <section className="algorithms">
      <h2>Algorithms</h2>
      <div className="algo-grid">
        <div className="algo-card">FCFS<br/><small>First Come First Serve</small></div>
        <div className="algo-card">Round Robin<br/><small>Time quantum fair share</small></div>
        <div className="algo-card">Priority<br/><small>High priority jobs run first</small></div>
        <div className="algo-card">Multi-Level Queue<br/><small>Multiple queues with policies</small></div>
      </div>
    </section>
  );
}

export default Algorithms;