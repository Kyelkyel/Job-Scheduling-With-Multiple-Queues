import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Algorithms from "./components/Algorithms";
import Simulation from "./components/Simulation";
import Footer from "./components/Footer";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Algorithms />
      <Simulation />
      <Footer />
    </div>
  );
}

export default App;