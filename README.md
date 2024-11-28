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

## Backend Setup:
1. - **Clone** the repository and navigate to the backend directory:
   cd backend

## Install dependencies:
    npm install

## Create a .env file in the backend directory and add the following configuration:
    PORT=3001
    MONGO_URL=<Your_MongoDB_URI>
    HUGGING_FACE_API_KEY=<Your_Hugging_Face_API_Key>
    CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
    CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
    CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
    
## Start the backend server:
    
    npm start
    
## Frontend Setup:
## Navigate to the frontend directory:
    cd frontend
    
## Install dependencies:
    npm install
    
Update the API base URL in src/config.js to point to the hosted backend:
## javascript
    export const API_BASE_URL = "https://imagegeneratorai-r9p8.onrender.com/api";
    
## Start the frontend development server:
    npm start
## Build for Production:
## Create a production build for the frontend:
    npm run build
    
## Deploy the build folder to a static file hosting service or integrate it with the backend.
    Frontend: Hosted on Render at ImageGeneratorAI Frontend.
    Backend: Hosted on Render at ImageGeneratorAI Backend.
    Ensure the frontend and backend are properly linked by setting the correct API base URL in the frontend configuration.

## Usage
- Visit the app at ImageGeneratorAI.
- Register or log in with your credentials.
- Enter a prompt to generate an AI-powered image.
- Save and view the generated images.
- Provide feedback by rating the images.
## Contributing
- Report issues by creating a GitHub issue in this repository.
- Contributions are welcome. Fork the repository, make changes, a
