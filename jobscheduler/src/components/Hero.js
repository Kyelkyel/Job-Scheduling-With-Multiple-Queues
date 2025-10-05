import React from "react";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Job Scheduling with Multiple Queues</h1>
        <p>Learn how operating systems and schedulers manage jobs across multiple queues</p>
        <div className="hero-buttons">
          <button className="btn primary">Start Simulation</button>
          <button className="btn">Learn More</button>
        </div>
      </div>
      <div className="hero-image">
        <div className="cpu-box">CPU</div>
        <div className="job">Job</div>
        <div className="job">Job</div>
        <div className="job">Job</div>
      </div>
    </section>
  );
}

export default Hero;