# SkillSwap Backend

Node.js/Express backend API for the SkillSwap application - a platform for connecting people to learn and teach skills.

## Features

- **RESTful API**: Complete CRUD operations for skills
- **JWT Authentication**: Secure user authentication and authorization
- **MongoDB Integration**: Data persistence with Mongoose ODM
- **Skill Matching Algorithm**: Find users with complementary skills
- **Input Validation**: Express-validator for data validation
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Express-validator for input validation
- CORS for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB**
   - Local: Start MongoDB service
   - Atlas: Use connection string in .env

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Verify the server**
   Navigate to http://localhost:5000/api/health

## Project Structure

```
backend/
├── controllers/        # Route controllers
│   ├── authController.js
│   └── skillController.js
├── middleware/         # Custom middleware
│   └── auth.js
├── models/            # Mongoose models
│   ├── User.js
│   └── Skill.js
├── routes/            # API routes
│   ├── auth.js
│   └── skills.js
├── server.js          # Express server
├── package.json
└── env.example
```

## API Endpoints

### Authentication

#### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### GET /api/auth/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Skills

#### GET /api/skills/teach
Get user's teach skills (requires authentication).

**Response:**
```json
[
  {
    "_id": "skill_id",
    "user": "user_id",
    "skill": "JavaScript",
    "type": "teach",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### POST /api/skills/teach
Add a teach skill (requires authentication).

**Request Body:**
```json
{
  "skill": "JavaScript"
}
```

#### DELETE /api/skills/teach/:id
Remove a teach skill (requires authentication).

#### GET /api/skills/learn
Get user's learn skills (requires authentication).

#### POST /api/skills/learn
Add a learn skill (requires authentication).

**Request Body:**
```json
{
  "skill": "Python"
}
```

#### DELETE /api/skills/learn/:id
Remove a learn skill (requires authentication).

#### GET /api/skills/matches
Get skill matches with other users (requires authentication).

**Response:**
```json
[
  {
    "_id": "user_id",
    "user": {
      "_id": "user_id",
      "name": "Jane Doe",
      "email": "jane@example.com"
    },
    "canTeachYou": ["JavaScript", "React"],
    "youCanTeachThem": ["Python", "Django"],
    "matchScore": 80
  }
]
```

## Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, min 6 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Skill Model
```javascript
{
  user: ObjectId (ref: User, required),
  skill: String (required),
  type: String (enum: ['teach', 'learn'], required),
  createdAt: Date
}
```

## Middleware

### Authentication Middleware
- Verifies JWT tokens
- Adds user object to request
- Protects routes from unauthorized access

### Validation Middleware
- Validates input data using express-validator
- Returns appropriate error messages
- Sanitizes user input

## Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/skillswap

# JWT Secret Key
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

## Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `skillswap`

### MongoDB Atlas
1. Create Atlas account
2. Create cluster
3. Get connection string
4. Add to .env file

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Express-validator sanitization
- **CORS Configuration**: Controlled cross-origin access
- **Error Handling**: Comprehensive error responses

## Skill Matching Algorithm

The matching algorithm works as follows:

1. **Get User Skills**: Retrieve current user's teach and learn skills
2. **Find Other Users**: Get all users except current user
3. **Calculate Matches**: For each other user:
   - Find skills they can teach that you want to learn
   - Find skills you can teach that they want to learn
4. **Calculate Score**: Match percentage based on mutual skills
5. **Sort Results**: Return matches sorted by score

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Development

### Adding New Routes
1. Create controller function
2. Add validation middleware if needed
3. Create route in appropriate route file
4. Add to server.js if needed

### Adding New Models
1. Create Mongoose schema
2. Add validation and methods
3. Export model
4. Update controllers as needed

### Testing API
Use tools like Postman or curl to test endpoints:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure MongoDB Atlas
4. Set up environment variables
5. Use PM2 or similar process manager

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MongoDB service is running
   - Verify connection string in .env
   - Check network connectivity

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper Authorization header

3. **CORS Errors**
   - Verify CORS configuration
   - Check frontend proxy settings
   - Ensure proper headers

## Contributing

1. Follow existing code structure
2. Add proper error handling
3. Include input validation
4. Test all endpoints
5. Update documentation 