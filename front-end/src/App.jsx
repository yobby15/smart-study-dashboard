import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import ClassPage from './pages/ClassPage';
import SchedulePage from "./pages/SchedulePage";
import StatisticPage from './pages/StatisticPage';
import ProfilePage from './pages/ProfilePage';
import { DUMMY_USERS } from "./data/users";

function App() {
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const onLoginSuccess = ({ email, password }) => {
    const foundUser = DUMMY_USERS.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setAuthUser(foundUser);
      localStorage.setItem('authUser', JSON.stringify(foundUser));
      navigate('/home');
    } else {
      alert('Invalid email or password');
    }
  };

  const onLogout = () => {
    setAuthUser(null);
    localStorage.removeItem('authUser');
    navigate('/');
  }

  const updateUserData = (updatedFields) => {
    if (!authUser) return;

    const updatedUser = { ...authUser, ...updatedFields };

    setAuthUser(updatedUser);
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
  };

  if (!authUser) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<Login onLogin={onLoginSuccess} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage user={authUser} />} />
        <Route path="/task" element={<TaskPage user={authUser} />} />
        <Route path="/class" element={<ClassPage user={authUser}/>} />
        <Route path="/schedule" element={<SchedulePage user={authUser} onUpdateUser={updateUserData}/>} />
        <Route path="/statistic" element={<StatisticPage user={authUser}/>} />
        <Route path="/profile" element={<ProfilePage user={authUser} onLogout={onLogout} />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  )
}

export default App;