# Full-Stack Blog Application

This is a **full-stack web application** built with **NestJS (Backend)** and **React + MUI (Frontend)**.

- **Backend:** Built using **NestJS**, follows REST API standards, and includes **Swagger API documentation**.
- **Frontend:** Built with **React** and **Material UI (MUI)** for a clean and modern UI.

---

## 💂 **Project Structure**
```
📺 project-root
├── 📂 backend          # NestJS API with Swagger documentation
│   ├── src/           # Backend source code
│   ├── .env           # Environment variables
│   ├── README.md      # Backend documentation
│   ├── package.json   # Backend dependencies
│   ├── swagger.json   # Swagger API documentation
│   └── tsconfig.json  # TypeScript configuration
│
├── 📂 frontend         # React + MUI client
│   ├── src/           # Frontend source code
│   ├── public/        # Static files
│   ├── .env           # Environment variables
│   ├── README.md      # Frontend documentation
│   ├── package.json   # Frontend dependencies
│   └── tsconfig.json  # TypeScript configuration
│
└── README.md           # Main documentation
```

---

## 🚀 **Getting Started**
### 🛠️ **Requirements**
Ensure you have the following installed:
- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB Compass** (for backend database)
- **Postman** (optional for testing API)

---

## 📌 **Backend (NestJS + Swagger)**
### 🖊️ **Installation**
```bash
cd backend
yarn install
```

### ⚙️ **Configuration**
Create a `.env` file in the **backend/** directory:
```ini
PORT=3000
MONGO_CONNECTION_URI=your_db_connection_string
JWT_ACCESS_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=your_time
REFRESH_TOKEN_EXPIRY=your_time
```

### ▶️ **Running the Backend**
```bash
yarn start:dev  # Start NestJS in development mode
```

### 🐟 **API Documentation (Swagger)**
Once the backend is running, access **Swagger API documentation**:
- 📀 **Swagger UI:** https://react-nest-mongo-app.onrender.com/api

---

## 🎨 **Frontend (React + MUI)**
### 🖊️ **Installation**
```bash
cd frontend
npm install  
```

### ▶️ **Running the Frontend**
```bash
npm run dev
```

### 🖥️ **Accessing the Application**
Once the frontend is running, open your browser:

- 🌍 Frontend UI (Deployed on Vercel): https://react-nest-mongo-app-seven.vercel.app/
---

## 📄 **API Endpoints**
The **Swagger API documentation** provides details about each endpoint.

### 🔹 **Example API Endpoints**
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| `POST` | `/auth/register`      | Register a new user     |
| `POST` | `/auth/login`         | User login              |
| `GET`  | `/blogs`              | Get all blogs           |
| `POST` | `/blogs`              | Create a new blog       |
| `GET`  | `/blogs/:id`          | Get a blog by ID        |
| `PUT`  | `/blogs/:id`          | Update a blog           |
| `DELETE` | `/blogs/:id`        | Delete a blog           |

---

## 🔗 **Technologies Used**
### **Backend (NestJS + MongoDB)**
- **NestJS** - TypeScript-based Node.js framework
- **MongoDB** - NoSQL database for storing blog data
- **Mongoose** - ODM for MongoDB
- **Passport.js & JWT** - Authentication and authorization
- **Swagger** - API documentation
- **Docker** - Optional for deployment to rRender platform

### **Frontend (React + MUI)**
- **React.js** - Component-based UI framework
- **Material UI (MUI)** - Modern styling framework
- **Axios** - API requests
- **React Router** - Client-side routing
- **Redux (Optional)** - State management

---

## 🚀 **Deployment**
### **Docker Setup (Optional)**
Use **Docker Compose** to start the backend and database:
```bash
docker-compose up -d
```

### **Deploy to Vercel (Frontend)**
```bash
🔗 Live URL: [https://<your-vercel-url>](https://react-nest-mongo-app-seven.vercel.app/)
```

### **Deploy to Render (Backend)**
```bash
Live URL: [https://<your-render-url>](https://react-nest-mongo-app.onrender.com)
```

---

## 📝 **License**
This project is licensed under the **MIT License**.

