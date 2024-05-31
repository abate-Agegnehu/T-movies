import React from "react";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Channel from "./pages/Channel";
import Program from "./pages/Program";
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/layout" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="channel" element={<Channel />} />
            <Route path="program" element={<Program />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
