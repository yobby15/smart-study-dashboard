const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/authentications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message); 
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.accessToken };
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.user };
}

async function getClasses() {
  const response = await fetchWithToken(`${BASE_URL}/classes`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success' && responseJson.status !== 'succes') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.classes };
}

async function getModules() {
  const response = await fetchWithToken(`${BASE_URL}/modules`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success' && responseJson.status !== 'succes') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.modules };
}

async function getTasks() {
  const response = await fetchWithToken(`${BASE_URL}/tasks`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.tasks };
}

async function getSchedules() {
  const response = await fetchWithToken(`${BASE_URL}/schedules`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.schedules };
}

async function addSchedule(payload) {
  const response = await fetchWithToken(`${BASE_URL}/schedules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteSchedule(id) {
  const response = await fetchWithToken(`${BASE_URL}/schedules/${id}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.message };
}

async function updateSchedule(id, payload) {
  const response = await fetchWithToken(`${BASE_URL}/schedules/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.message };
}

async function getAttendances() {
  const response = await fetchWithToken(`${BASE_URL}/attendances`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.attendances };
}

async function addAttendance(payload) {
  const response = await fetchWithToken(`${BASE_URL}/attendances`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data.attendanceId };
}

export {
  getAccessToken,
  putAccessToken,
  login,
  getUserLogged,
  getClasses,
  getModules,
  getTasks,
  getSchedules,
  addSchedule,
  deleteSchedule,
  updateSchedule,
  getAttendances,
  addAttendance
};