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
import LocaleContext from './contexts/LocaleContext';
import ThemeContext from './contexts/ThemeContext';

function App() {
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(() => {
    const sessionUser = sessionStorage.getItem('authUser');
    if (sessionUser) return JSON.parse(sessionUser);

    const localDataString = localStorage.getItem('authUser');
    if (localDataString) {
      try {
        const localData = JSON.parse(localDataString);

        if (localData.expiry) {
          const now = new Date().getTime();
          
          if (now > localData.expiry) {
            localStorage.removeItem('authUser'); 
            return null; 
          }
          
          return localData.value; 
        }

        return localData; 
      } catch {
        return null;
      }
    }

    return null;
  });

  const onLoginSuccess = ({ email, password, rememberMe }) => {
    const foundUser = DUMMY_USERS.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setAuthUser(foundUser);

      if (rememberMe) {
        const now = new Date().getTime();
        const expiryTime = now + (30 * 24 * 60 * 60 * 1000); // 30 Hari dalam milidetik
        
        const dataToStore = {
          value: foundUser,
          expiry: expiryTime
        };
        localStorage.setItem('authUser', JSON.stringify(dataToStore));
      } else {
        sessionStorage.setItem('authUser', JSON.stringify(foundUser));
      }
      
      navigate('/home');
    } else {
      alert('Invalid email or password');
    }
  };

  const onLogout = () => {
    setAuthUser(null);
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('authUser');
    navigate('/');
  }

  const updateUserData = (updatedFields) => {
    if (!authUser) return;

    const updatedUser = { ...authUser, ...updatedFields };
    setAuthUser(updatedUser);

    const localDataString = localStorage.getItem('authUser');

    if (localDataString) {
      try {
        const oldData = JSON.parse(localDataString);
        
        if (oldData.expiry) {
           const newData = { ...oldData, value: updatedUser };
           localStorage.setItem('authUser', JSON.stringify(newData));
        } else {
           localStorage.setItem('authUser', JSON.stringify(updatedUser));
        }
      } catch {
        localStorage.setItem('authUser', JSON.stringify(updatedUser));
      }
    } else {
      sessionStorage.setItem('authUser', JSON.stringify(updatedUser));
    }
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