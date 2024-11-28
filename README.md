# ImageGeneratorAI

ImageGeneratorAI is an AI-powered application that generates custom images based on user input prompts. The project is hosted on Render and integrates with Cloudinary for secure image storage. Users can generate, view, and rate AI-generated images with inspiration drawn from predefined themes.

## Features
- **AI Image Generation:** Utilizes Hugging Face's AI model to create images from textual prompts.
- **User Authentication:** Secure login and registration via JWT tokens.
- **Image Storage:** Images are stored and managed in Cloudinary.
- **Rating System:** Users can provide feedback by rating generated images.
- **Hosted Online:**
  - **Frontend:** [ImageGeneratorAI Frontend](https://imagegeneratorai-1.onrender.com/)
  - **Backend:** [ImageGeneratorAI Backend](https://imagegeneratorai-r9p8.onrender.com/)

## Tech Stack
- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Image Hosting:** Cloudinary
- **AI Integration:** Hugging Face API
- **Hosting:** Render

## Prerequisites
1. **Node.js** and **npm** installed.
2. MongoDB instance running (local or cloud).
3. Cloudinary account for image storage.
4. Hugging Face API key.

## Installation and Setup
### Backend Setup:
1. Navigate to the backend directory:
   ```bash
   cd backend
