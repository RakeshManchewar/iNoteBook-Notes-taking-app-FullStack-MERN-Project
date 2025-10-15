# 📝 iNoteBook - Notes Taking App

A full-stack notes taking application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to securely manage their personal notes with complete CRUD operations and user authentication.

## ✨ Features

### User Management
- **User Registration (SignUp)** - Create new user accounts with secure authentication
- **User Login** - Secure login system with JWT authentication
- **Forget Password** - Password recovery functionality
- **User Profile** - Personalized user dashboard

### Notes Management
- **Add Notes** - Create new notes with title, description, and tags
- **Update Notes** - Edit existing notes
- **Delete Notes** - Remove unwanted notes
- **View Notes** - Display all user notes in an organized manner
- **Private Notes** - Each user can only access their own notes
- **Tag System** - Organize notes with custom tags

### Security Features
- JWT-based authentication
- Protected routes
- Secure password hashing
- User-specific data isolation

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Bootstrap / CSS3
- Axios
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/RakeshManchewar/iNoteBook-Notes-taking-app-FullStack-MERN-Project.git
cd iNoteBook-Notes-taking-app-FullStack-MERN-Project
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd frontend
npm install
```

### 3. Environment Variables Setup

**⚠️ IMPORTANT:** Update the `.env` file with necessary values otherwise the project will not work.

Create a `.env` file in the backend directory and add the following variables:

```env
# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server Port
PORT=5000

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

#### MongoDB Setup Options:

**Option 1: Local MongoDB**
```env
MONGO_URI=mongodb://localhost:27017/inotebook
```

**Option 2: MongoDB Atlas (Cloud)**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/inotebook?retryWrites=true&w=majority
```

### 4. Running the Application

#### Start Backend Server

```bash
cd backend
node index.js
# OR for development with auto-restart
nodemon index.js
```

The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
iNoteBook-Notes-taking-app-FullStack-MERN-Project/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── notesController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── middleware/
│   │   └── fetchuser.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Login.js
    │   │   ├── Signup.js
    │   │   ├── Notes.js
    │   │   ├── AddNote.js
    │   │   └── NoteItem.js
    │   ├── context/
    │   │   └── notes/
    │   │       ├── NoteState.js
    │   │       └── noteContext.js
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── README.md
```

## 🔑 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/getuser` | Get logged-in user details |
| POST | `/api/auth/forgotpassword` | Request password reset |

### Notes Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes/fetchallnotes` | Get all notes of logged-in user |
| POST | `/api/notes/addnote` | Create a new note |
| PUT | `/api/notes/updatenote/:id` | Update existing note |
| DELETE | `/api/notes/deletenote/:id` | Delete a note |

## 💡 How It Works

### User Flow
1. **Sign Up** - New users create an account with email and password
2. **Login** - Users authenticate with their credentials
3. **Dashboard** - Access personal notes dashboard
4. **Create Notes** - Add new notes with title, description, and tags
5. **Manage Notes** - Edit or delete existing notes
6. **Logout** - Securely end the session

### Note Structure
Each note contains:
- Title
- Description/Content
- Tags for organization
- Date/timestamp
- User reference (ownership)

## 🔒 Security Features

- **Password Hashing** - bcrypt encryption for secure password storage
- **JWT Authentication** - Token-based authentication system
- **Protected Routes** - Middleware to verify user authentication
- **User Data Isolation** - Users can only access their own notes
- **Input Validation** - Server-side validation for all inputs
- **CORS Configuration** - Controlled cross-origin requests

## 🎨 Features in Detail

### Context API Implementation
The app uses React Context API to manage global state for:
- User authentication status
- Notes data across components
- CRUD operations on notes
- Loading states and error handling

### Responsive Design
- Mobile-friendly interface
- Bootstrap components for consistent UI
- Responsive grid layout for notes display

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues & Future Enhancements

### Future Features
- Rich text editor for notes
- Note categories and folders
- Search and filter functionality
- Export notes to PDF
- Sharing notes with other users
- Dark mode
- Note archiving

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rakesh Manchewar**

- GitHub: [@RakeshManchewar](https://github.com/RakeshManchewar)

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- MERN stack community for excellent documentation
- Bootstrap team for the UI framework
- All open-source packages used in this project

## 📧 Support

If you have any questions or need help getting started, please open an issue in the GitHub repository.

## 📸 Screenshots

> Add screenshots of your application here to showcase the UI

---

⭐ If you found this project helpful, please give it a star on GitHub!

## 🚀 Quick Start Commands

```bash
# Clone the repository
git clone https://github.com/RakeshManchewar/iNoteBook-Notes-taking-app-FullStack-MERN-Project.git

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Set up .env file (IMPORTANT!)
# Add your MongoDB URI and JWT Secret

# Run backend
cd backend && node index.js

# Run frontend (in a new terminal)
cd frontend && npm start
```

Happy Note Taking! 📝✨
