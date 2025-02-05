# Full Stack Notes App

A full-stack notes application built with React, Node.js, and PostgreSQL. This application allows users to create, edit, and delete notes with validation on both frontend and backend.

## Features

- Create new notes with title and content
- Edit existing notes
- Delete notes
- Data persistence with PostgreSQL
- Frontend validation
- Backend API validation
- Responsive design

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL
- Validation: Built-in form validation + custom validators

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd notes-app
```

2. Install dependencies:
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

3. Set up the database:
```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE notes_app;
```

4. Configure environment variables:
Create a `.env` file in the server directory:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=notes_app
PORT=3000
```

## Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
notes-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── types/        # TypeScript type definitions
│   │   └── App.tsx       # Main application component
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/      # Database models
    │   └── routes/      # API routes
    └── package.json
```

## API Endpoints

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/newFeature`)
3. Commit your changes (`git commit -m 'Add some new feature'`)
4. Push to the branch (`git push origin feature/newFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.