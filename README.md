ImageGeneratorAI
ImageGeneratorAI is an AI-powered application that generates custom images based on user input prompts. The project is hosted on Render and integrates with Cloudinary for secure image storage. Users can generate, view, and rate AI-generated images with inspiration drawn from predefined themes.

Features
AI Image Generation: Utilizes Hugging Face's AI model to create images from textual prompts.
User Authentication: Secure login and registration via JWT tokens.
Image Storage: Images are stored and managed in Cloudinary.
Rating System: Users can provide feedback by rating generated images.
Hosted Online:
Frontend: ImageGeneratorAI Frontend
Backend: ImageGeneratorAI Backend
Tech Stack
Frontend: React.js, Redux
Backend: Node.js, Express.js
Database: MongoDB
Image Hosting: Cloudinary
AI Integration: Hugging Face API
Hosting: Render
Prerequisites
Node.js and npm installed.
MongoDB instance running (local or cloud).
Cloudinary account for image storage.
Hugging Face API key.
Installation and Setup
Backend Setup:
Navigate to the backend directory:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Create a .env file with the following:
makefile
Copy code
PORT=3001
MONGO_URL=<Your_MongoDB_URI>
HUGGING_FACE_API_KEY=<Your_Hugging_Face_API_Key>
CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
Start the backend server:
bash
Copy code
npm start
Frontend Setup:
Navigate to the frontend directory:
bash
Copy code
cd frontend
Install dependencies:
bash
Copy code
npm install
Update the API base URL in src/config.js:
javascript
Copy code
export const API_BASE_URL = "https://imagegeneratorai-r9p8.onrender.com/api";
Start the frontend development server:
bash
Copy code
npm start
Build for Production:
Create a production build for the frontend:
bash
Copy code
npm run build
Deploy the build folder to a static file hosting service or integrate it with the backend.
Deployment
Frontend: Hosted on Render at ImageGeneratorAI Frontend
Backend: Hosted on Render at ImageGeneratorAI Backend
Ensure the backend and frontend are linked by updating the API base URL in the frontend configuration.

Usage
Open the app at https://imagegeneratorai-1.onrender.com/.
Register or log in.
Enter a prompt to generate an AI image.
Save and view generated images.
Rate images to provide feedback.
Issues and Contributions
For any issues, create a GitHub issue in this repository.
Contributions are welcome. Please fork the repository and create a pull request for significant changes.
