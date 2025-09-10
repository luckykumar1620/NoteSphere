NoteSphere/
│
├── frontend/       # React.js frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React Context for state management
│   │   ├── pages/         # Pages: Login, Signup, Notes, About
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── backend/        # Node.js + Express backend
    ├── models/     # Mongoose models (User, Note)
    ├── routes/     # API routes (auth.js, notes.js)
    ├── middleware/ # Authentication & validation
    ├── controllers/ # Optional: Business logic
    ├── server.js   # Entry point
    └── package.json
