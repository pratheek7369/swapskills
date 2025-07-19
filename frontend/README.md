# SkillSwap Frontend

React-based frontend for the SkillSwap application - a platform for connecting people to learn and teach skills.

## Features

- **User Authentication**: Complete signup/login flow with JWT
- **Dashboard**: Manage your teach and learn skills
- **Skill Matching**: Find users with complementary skills
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Built with Tailwind CSS

## Tech Stack

- React 18 with functional components and hooks
- React Router for navigation
- Tailwind CSS for styling
- Axios for API communication
- JWT decode for token management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to http://localhost:3000

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/          # Reusable components
│   └── Navbar.js       # Navigation component
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication context
├── pages/             # Page components
│   ├── Home.js        # Landing page
│   ├── SignUp.js      # Registration page
│   ├── Login.js       # Login page
│   ├── Dashboard.js   # User dashboard
│   └── SkillMatching.js # Skill matching page
├── App.js             # Main app component
├── index.js           # Entry point
└── index.css          # Global styles with Tailwind
```

## Components

### AuthContext
Manages user authentication state and provides login/signup/logout functions.

### Pages
- **Home**: Landing page with call-to-action
- **SignUp**: User registration form
- **Login**: User authentication form
- **Dashboard**: Skill management interface
- **SkillMatching**: View matched users

## Styling

The application uses Tailwind CSS for styling. The configuration is in `tailwind.config.js` and includes custom colors for the primary theme.

## API Integration

The frontend communicates with the backend API using Axios. The base URL is configured in the proxy setting in `package.json` (http://localhost:5000).

## Environment Variables

No environment variables are required for the frontend as it uses the proxy configuration to communicate with the backend.

## Development

### Adding New Pages
1. Create a new component in the `pages/` directory
2. Add the route to `App.js`
3. Update navigation if needed

### Adding New Components
1. Create the component in the `components/` directory
2. Import and use in the appropriate page

### Styling Guidelines
- Use Tailwind CSS classes for styling
- Follow the existing color scheme (primary-600, etc.)
- Ensure responsive design for mobile devices

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure the backend server is running on port 5000
   - Check that CORS is properly configured

2. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT token expiration

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check that PostCSS is working

## Contributing

1. Follow the existing code structure
2. Use functional components with hooks
3. Maintain responsive design
4. Test on different screen sizes
5. Follow the established naming conventions 