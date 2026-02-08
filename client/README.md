# AI Trash Sorter

**Author:** Julia Lee  
**Tier Level:** Intermediate  

---

## Project Description
AI Trash Sorter allows users to sort trash quickly without having to guess which bin each item goes into. Users can also track their waste in a personal trash list by signing up, enabling them to save and view their progress over time.

The web app features:  
- AI-powered trash classification (Recycle or Landfill)  
- User authentication (signup/login)  
- Saved trash history for authenticated users  
- Responsive, green-themed user interface  

---

## Technologies Used
- **Languages:** TypeScript, JavaScript, HTML, CSS  
- **Frontend Framework:** Next.js, React  
- **Backend Framework:** Node.js, Express  
- **Database:** MongoDB (Atlas)  
- **APIs:** OpenAI API for AI classification  
- **Authentication:** JWT, bcrypt  
- **Hosting/Dev Tools:** npm, ts-node, dotenv  

---

## Project Timeline

### Friday – Planning & Setup
**Goals:**  
- Decide on project scope (solo project)  
- Install dependencies  
- Create project plan  

**Progress:**  
- Chose AI Trash Sorter as the project topic  
- Set up initial Node.js + TypeScript environment  
- Planned authenticated vs. unauthenticated modes  

**Challenges:**  
1. Prisma was difficult to configure  
   - **Solution:** Switched to MongoDB, which was easier to use  
2. Refreshing coding skills after a break  
   - **Solution:** Reviewed past projects and used ChatGPT for explanations  

**Learning:**  
- MongoDB setup and Node.js configuration  
- Organizing a project outline  

**AI Usage:**  
- OpenAI used to explain Prisma concepts and Node.js integration  

---

### Saturday – Implementation
**Goals:**  
- Integrate AI for trash classification  
- Set up frontend and backend  
- Build basic UI  

**Progress:**  
- Connected frontend to backend routes (auth and trash)  
- Built Trash page, Saved Trash page, AuthPage, and Unauthorized page  
- Implemented ProtectedRoute for authentication  

**Challenges:**  
1. OpenAI API key setup  
   - **Solution:** Used a paid key to access API  
2. UI adjustments and styling issues  
   - **Solution:** Referenced past projects and tested various styles  

**Learning:**  
- React + Next.js component structure  
- OpenAI API integration  
- CSS styling and green-themed UI design  

**AI Usage:**  
- ChatGPT used to explain OpenAI API usage and CSS implementation  

---

### Sunday – Finalization
**Goals:**  
- Polish UI  
- Finalize authentication flows  
- Complete project for submission  

**Progress:**  
- Finalized Navbar and consistent green theme  
- Implemented Saved Trash functionality  
- Fixed authentication and conditional rendering messages  

**Challenges:**  
1. Old files causing 404 errors  
   - **Solution:** Deleted unnecessary files and reorganized pages  
2. Layout improvements  
   - **Solution:** Added Navbar for consistent navigation  

**Learning:**  
- Importance of keeping automatically generated files intact  
- Building a reusable Navbar  
- Integrating backend authentication with frontend UI  

**AI Usage:**  
- Used ChatGPT to debug routing, styling, and API integration  

---

## Setup Instructions
1. Clone the repository:  
```bash
git clone https://github.com/carrotbreadd/ai-trash-sorter

