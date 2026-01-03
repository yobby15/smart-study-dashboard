import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import ClassPage from './pages/ClassPage';
import SchedulePage from "./pages/SchedulePage";
import StatisticPage from './pages/StatisticPage';
import ProfilePage from './pages/ProfilePage';
import { getUserLogged, putAccessToken, login } from './utils/api'; 
import LocaleContext from './contexts/LocaleContext';
import ThemeContext from './contexts/ThemeContext';

function App() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function initData() {
      const { data } = await getUserLogged();
      setAuthUser(data); 
      setInitializing(false); 
    }
    initData();
  }, []);

  const onLoginSuccess = async ({ email, password }) => {
    const { error, data } = await login({ email, password });
    if (!error) {
      putAccessToken(data);
      const { data: user } = await getUserLogged();
      setAuthUser(user);
      navigate('/home');
    }
  };

  const onLogout = () => {
    setAuthUser(null);
    putAccessToken(''); 
    navigate('/');
  }

  const updateUserData = (updatedFields) => {
    if (!authUser) return;
    const updatedUser = { ...authUser, ...updatedFields };
    setAuthUser(updatedUser);
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const localeContextValue = useMemo(() => {
    return { locale, toggleLocale };
  }, [locale]);

  const themeContextValue = useMemo(() => {
    return { theme, toggleTheme };
  }, [theme]);

  if (initializing) {
    return null; 
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div>
          {!authUser ? (
            <Routes>
              <Route path="/" element={<LandingPage />}/>
              <Route path="/login" element={<Login onLogin={onLoginSuccess} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          ) : (
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
          )}
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App;