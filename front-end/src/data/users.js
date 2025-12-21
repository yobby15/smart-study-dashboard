export const DUMMY_USERS = [
  {
    id: 1,
    email: "admin@example.com",
    password: "password123",
    name: "Admin User"
  },
  {
    id: 2,
    email: "user@test.com",
    password: "securepassword",
    name: "John Doe"
  }
];

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DAILY_SCHEDULES = {
  1: [
    { title: "Modul Perangkat Lunak", time: "08.00 - 10.00" },
    { title: "Modul Perangkat Keras", time: "10.00 - 12.00" },
  ],
  2: [
    { title: "Meet Soft Skill 1", time: "13.00 - 15.00" },
    { title: "Exercise Soft Skill 1", time: "15.00 - 17.00" },
  ],
};

export const CLASS_LIST = [
  { 
    id: 1, 
    title: "React Basics", 
    percentage: 80,
    modules: [
      { id: 1, title: "Introduction to JSX", status: "completed" },
      { id: 2, title: "Components & Props", status: "completed" },
      { id: 3, title: "State & Lifecycle", status: "completed" },
      { id: 4, title: "React Hooks (useState)", status: "uncompleted" },
      { id: 5, title: "Handling Events", status: "uncompleted" },
    ]
  },
  { 
    id: 2, 
    title: "Javascript Advanced", 
    percentage: 45,
    modules: [
      { id: 1, title: "ES6+ Features", status: "completed" },
      { id: 2, title: "Async/Await & Promises", status: "uncompleted" },
      { id: 3, title: "Closures & Scope", status: "uncompleted" },
      { id: 4, title: "DOM Manipulation", status: "uncompleted" },
    ]
  },
  { 
    id: 3, 
    title: "UI/UX Fundamental", 
    percentage: 100,
    modules: [
      { id: 1, title: "Design Thinking", status: "completed" },
      { id: 2, title: "Color Theory", status: "completed" },
      { id: 3, title: "Typography", status: "completed" },
      { id: 4, title: "Figma Basics", status: "completed" },
    ]
  },
  { 
    id: 4, 
    title: "Backend with Node", 
    percentage: 10,
    modules: [
      { id: 1, title: "Node.js Installation", status: "completed" },
      { id: 2, title: "Express Framework", status: "uncompleted" },
      { id: 3, title: "REST API Structure", status: "uncompleted" },
      { id: 4, title: "Database Connection", status: "uncompleted" },
    ]
  },
];