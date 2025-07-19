# SkillSwap - Learn and Teach Skills Platform

A full-stack web application that connects people who want to learn skills with those who can teach them. Built with React, Node.js, Express, and MongoDB.

## Features

- 🔐 User authentication (signup/login with JWT)
- 📚 Add skills you can teach and want to learn
- 🎯 Smart skill matching algorithm
- 📞 Video call functionality (WebRTC)
- 💬 Messaging system
- 📱 Responsive design with Tailwind CSS
- ✨ Beautiful animations with Framer Motion

## Tech Stack

### Frontend
- React 18
- React Router
- Tailwind CSS
- Framer Motion
- React Icons
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Socket.IO for real-time features

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd skillswap
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
   - Create `.env` file in backend folder
   - Add your MongoDB connection string and JWT secret

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend (in a new terminal):
```bash
cd frontend
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Skills
- `GET /api/skills/teach` - Get user's teach skills
- `POST /api/skills/teach` - Add teach skill
- `DELETE /api/skills/teach/:id` - Remove teach skill
- `GET /api/skills/learn` - Get user's learn skills
- `POST /api/skills/learn` - Add learn skill
- `DELETE /api/skills/learn/:id` - Remove learn skill
- `GET /api/skills/matches` - Get skill matches

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Live Demo

[Your deployed application URL will go here] 