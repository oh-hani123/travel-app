# Travel Bucket List App

A full-stack web application where users can manage their travel bucket list destinations.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** React.js
- **Database:** PostgreSQL
- **Authentication:** JWT + bcryptjs
- **Logging:** Morgan

## Features
- User registration and login
- JWT-based authentication
- Add, view, update, and delete destinations
- Mark destinations as visited/unvisited
- Password hashing for security

## Setup Instructions

### Backend
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your database credentials
4. Start the server: `node src/index.js`

### Frontend
1. Go to client folder: `cd client`
2. Install dependencies: `npm install`
3. Start the React app: `npm start`

## API Endpoints

### Auth
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login and get JWT token

### Destinations (requires JWT token)
- `GET /api/destinations` - Get all destinations
- `POST /api/destinations` - Add a new destination
- `PUT /api/destinations/:id` - Update a destination
- `DELETE /api/destinations/:id` - Delete a destination