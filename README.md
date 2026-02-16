# Artwork - Digital Art Portfolio & Commission Platform

A modern full-stack web application built with Next.js to showcase digital artwork and manage commission requests. Features a role-based access system, interactive UI animations, and integrated chatbot for seamless client communication.

## ✨ Features

### 🎨 For Visitors
- **Artwork Gallery**: Browse through a curated collection of digital artwork
- **Responsive Carousel**: Smooth image viewing experience with touch-enabled carousel
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Toast Notifications**: Real-time feedback for user actions
- **Commission Requests**: Easy-to-use form for requesting custom artwork
- **Live Chat**: Integrated Botpress chatbot for instant inquiries

### 👤 For Clients
- **Request Tracking**: Monitor the status of commission requests
- **Request History**: View past commissions and artwork
- **Secure Authentication**: Role-based access control (User/Admin) alongside Google Sign in.

### ⚙️ For Admin
- **Dashboard**: Centralized management of artwork and commissions
- **Request Management**: Approve, reject, or update commission status
- **Artwork Upload**: Add new pieces to the gallery with descriptions
- **User Management**: View and manage registered users

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS / CSS Modules
- **Animations**: 
  - GSAP (GreenSock Animation Platform) for advanced animations
  - Smooth Scroll for enhanced UX
- **UI Components**:
  - React Toastify for notifications
  - Responsive carousel for artwork display
- **State Management**: React Context / Redux (depending on implementation)

### Backend
- **Runtime**: Node.js (Next.js API routes)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based role system (User/Admin)
- **File Storage**: (Specify your storage solution, e.g., Cloudinary, AWS S3, local)

### Integrations
- **Chatbot**: Botpress for automated client communication
- **Email**: (Optional - for commission notifications)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)
- Botpress account (for chatbot features)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SadgeRaf/Artwork.git
   cd Artwork

2. Install dependencies

bash
npm install
# or
yarn install
3.  Set up environment variables
    Create a .env.local file in the root directory:

env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
BOTPRESS_CONFIG=your_botpress_configuration
# Add any other environment variables
Run the development server

bash
npm run dev
# or
yarn dev
Open your browser
Navigate to http://localhost:3000

📁 Project Structure
text
artwork/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   ├── artwork/        # Artwork display components
│   ├── commission/     # Commission forms and tracking
│   └── ui/             # UI elements (carousel, toast, etc.)
├── pages/               # Next.js pages
│   ├── api/            # API routes
│   ├── admin/          # Admin dashboard
│   ├── dashboard/      # User dashboard
│   └── gallery/        # Public gallery
├── models/              # MongoDB models
├── middleware/          # Authentication & role middleware
├── lib/                 # Utilities and helpers
├── public/              # Static assets
│   └── images/         # Artwork images
├── styles/              # Global styles
└── config/              # Configuration files
