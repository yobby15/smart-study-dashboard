export const DUMMY_USERS = [
  {
    id: 1,
    email: "admin@example.com",
    password: "password123",
    name: "Admin User",
    id_program: "A202500001",
    program: "Sistem Informasi",
    university: "Universitas Teknologi Digital",
    semester: 8,
    mentor: "Pak Asep Suherman",
    lecturer: "Prof. Budi Darmawan",
    
    attendance: {
      "2025-12-22": { 
        emoji: "🙂", 
        note: "Weekly standup berjalan lancar, server aman.", 
        timestamp: "09:05" 
      }
    },

    tasks: [
      { id: 1, title: "Review Server Logs", status: "In Progress" },
      { id: 2, title: "Update Database", status: "Completed", score: 95 }
    ],

    classes: [
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
        ]
      },
      { 
        id: 3, 
        title: "UI/UX Fundamental", 
        percentage: 100,
        modules: []
      }
    ],

    schedules: {
      "2025-12-22": [ 
        { title: "Weekly Standup", startTime: "09:00", endTime: "10:00" },
        { title: "Review Server Logs", startTime: "10:30", endTime: "12:00" }
      ],
      "2025-12-23": [ 
        { title: "Client Meeting", startTime: "13:00", endTime: "14:30" },
        { title: "Database Optimization", startTime: "15:00", endTime: "17:00" }
      ],
      "2025-12-24": [ 
        { title: "Pre-Holiday Deployment", startTime: "08:00", endTime: "11:00" },
        { title: "Office Gathering", startTime: "16:00", endTime: "18:00" }
      ],
      "2025-12-25": [ 
        { title: "Cuti Bersama (Christmas)", startTime: "All Day", endTime: "" }
      ],
      "2025-12-26": [ 
        { title: "Monitoring System", startTime: "10:00", endTime: "11:00" }
      ],
      "2025-12-27": [ 
        { title: "Urgent Patch (On Call)", startTime: "20:00", endTime: "21:00" }
      ],
      "2025-12-28": [] 
    }
  },

  {
    id: 2,
    email: "user@test.com",
    password: "1234abcd",
    name: "John Doe",
    id_program: "M202512345",
    program: "Front-End Web Development with React",
    university: "Universitas Teknologi Digital",
    semester: 6,
    mentor: "Kak Budi Santoso",
    lecturer: "Dr. Siti Aminah, M.Kom",
    
    attendance: {
      "2025-12-22": { 
        emoji: "😐", 
        note: "Hadir, tapi kurang tidur ngerjain tugas.", 
        timestamp: "07:55" 
      },
      "2025-12-23": { 
        emoji: "🙂", 
        note: "Siap untuk Quiz Logic Gate!", 
        timestamp: "08:50" 
      }
    },

    tasks: [
      { id: 98, title: "Quiz: HTML Structure", status: "Completed", score: 80 },
      { id: 99, title: "Quiz: CSS Flexbox", status: "Completed", score: 92 },
      { id: 100, title: "Quiz: JS Variables", status: "Completed", score: 75 },
      { id: 101, title: "Submission 1: React Basics", status: "In Progress" },
      { id: 102, title: "Quiz 1: Logic Gate", status: "Completed", score: 85 }, 
      { id: 103, title: "Final Project", status: "Overdue" }
    ],

    classes: [
      { 
        id: 1, 
        title: "Server Management", 
        percentage: 100,
        modules: [
          { id: 1, title: "Linux Basics", status: "completed" },
          { id: 2, title: "Security", status: "completed" }
        ]
      },
      { 
        id: 2, 
        title: "Database Administration", 
        percentage: 50,
        modules: [
            { id: 1, title: "SQL Basics", status: "completed" },
            { id: 2, title: "Indexing", status: "uncompleted" }
        ]
      }
    ],
    
    schedules: {
      "2025-12-22": [
        { title: "Kuliah: Web Programming", startTime: "08:00", endTime: "10:00" },
        { title: "Praktikum: React Basics", startTime: "10:30", endTime: "12:30" },
        { title: "Kerja Kelompok", startTime: "14:00", endTime: "16:00" }
      ],
      "2025-12-23": [
        { title: "Kuliah: Algoritma", startTime: "09:00", endTime: "11:00" },
        { title: "Quiz 1: Logic Gate", startTime: "13:00", endTime: "14:00" }
      ],
      "2025-12-24": [ 
        { title: "Mentoring Session", startTime: "10:00", endTime: "11:00" },
        { title: "Submission Deadline", startTime: "23:59", endTime: "" } 
      ],
      "2025-12-25": [
        { title: "Libur Natal", startTime: "All Day", endTime: "" }
      ],
      "2025-12-26": [ 
        { title: "Workshop UI/UX", startTime: "13:00", endTime: "16:00" }
      ],
      "2025-12-27": [ 
        { title: "Ekskul Badminton", startTime: "08:00", endTime: "11:00" },
        { title: "Belajar Mandiri", startTime: "19:00", endTime: "21:00" }
      ],
      "2025-12-28": [ 
        { title: "Review Materi Mingguan", startTime: "09:00", endTime: "10:00" }
      ]
    }
  }
];

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];