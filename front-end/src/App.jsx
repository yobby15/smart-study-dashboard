import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import ClassPage from './pages/ClassPage';
import SchedulePage from "./pages/SchedulePage";
import StatisticPage from './pages/StatisticPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/task" element={<TaskPage />} />
      <Route path="/class" element={<ClassPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/statistic" element={<StatisticPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App;