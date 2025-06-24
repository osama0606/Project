
# 🛍️ MERN Admin Panel - Product Management Dashboard

This is a full-featured **MERN Stack Admin Panel** for managing products in an eCommerce application. Built with **React + Chakra UI** for the frontend and **Node.js + Express + MongoDB** for the backend.

---

## ✨ Features

- 🔍 Search, Sort, and Paginate Products
- ➕ Add New Products
- ✏️ Edit Existing Products with Image Update
- ❌ Delete Products
- 📤 Upload Product Images to Cloudinary
- 🎨 Responsive UI using Chakra UI
- ✅ Toast Notifications for Success/Error States

---

## 📦 Tech Stack

| Category     | Tech Used                          |
|--------------|------------------------------------|
| Frontend     | React, Chakra UI, Axios            |
| Backend      | Node.js, Express.js, MongoDB       |
| Image Upload | Cloudinary                         |
| Hosting (Optional) | Vercel (frontend), Render (backend) |
| Others       | dotenv, cors, mongoose, multer     |

---

## 📁 Folder Structure

```
client/
  ├── components/
  ├── pages/
  ├── utils/
server/
  ├── controllers/
  ├── models/
  ├── routes/
  └── index.js
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/osamakhan/mern-admin-panel.git
cd mern-admin-panel
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder with these values:

```env
PORT=8080
MONGO_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run server
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📸 Screenshots

| Add Product Drawer | Edit Product Drawer |
|--------------------|---------------------|
| ![Add Product](./screenshots/add-product.png) | ![Edit Product](./screenshots/edit-product.png) |

> Add real screenshots in a `screenshots/` folder inside the root.

---

## 📚 API Endpoints

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| GET    | /products              | List products (pagination, search, sort) |
| POST   | /products              | Add new product        |
| PUT    | /products/:id          | Update product         |
| DELETE | /products/:id          | Delete product         |
| POST   | /products/upload-image | Upload image to Cloudinary |

---

## 🧑‍💻 Author

**Osama Khan**  
[GitHub](https://github.com/osamakhan)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
