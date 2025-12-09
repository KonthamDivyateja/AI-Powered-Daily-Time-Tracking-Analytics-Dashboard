#  AI-Powered Daily Time Tracking & Analytics Dashboard

##  Project Title & Short Description

This project is a sophisticated **Daily Time Tracking Web Application** designed to help users log their daily activities in minutes and visualize how their 24 hours (1440 minutes) are spent. It enforces a strict $1440$ minute validation limit per day and provides a detailed, date-based analytics dashboard with graphical representations of time usage.

The development process leveraged **AI Tools** (such as Gemini/ChatGPT) for scaffolding, UI component generation, and optimizing helper functions, ensuring a high standard of code quality and user experience (UI/UX).

##  Live Demo Link (Deployed Link)

**[Deployment Link Here]**
*(Replace this with the live URL of your deployed application on GitHub Pages or a similar platform.)*

## Video Walkthrough Link

**[Video Link Here]**
*(Replace this with the YouTube or Google Drive link to your 2-5 minute video walkthrough.)*

### Video Content Requirements:
1.  **Walk-through:** Demonstrate the main features (Login, Adding Activities, Viewing Dashboard).
2.  **Dashboard/No Data:** Show both the detailed dashboard view and the designed "No data available" state.
3.  **AI Usage:** Briefly explain *how* you used AI tools (e.g., "I used Gemini to generate the initial Flexbox grid layout for responsiveness" or "I used an LLM to suggest the color palette and ensure accessibility contrast ratios").

## Features

The application meets all core functional requirements:

* **User Authentication:** Secure login and registration using **Firebase Authentication**. Only authenticated users can access tracking features.
* **Activity Logging:** Users can select a date and log activities with a name, category (e.g., Work, Sleep, Exercise), and duration in minutes.
* **Time Validation:** Strict validation ensures the total duration for any given day does not exceed **1440 minutes (24 hours)**, providing real-time feedback on remaining time.
* **Date-Based Analytics Dashboard:** A comprehensive dashboard that updates instantly when a new date is selected.
* **Summary Statistics:** Displays total hours spent and the total number of activities logged for the day.
* **Visualizations:** Includes graphical representations of time utilization:
    * **Pie Chart** showing time spent per category.
    * *(If implemented: Bar Chart showing activity durations or Timeline representation.)*
* **UI/UX:** Highly responsive design across **Mobile, Tablets, and Laptops/Desktops**, featuring smooth animations, a consistent color palette, and intuitive navigation.
* **Data Handling:** Allows users to **add, edit, and delete** activities for a specific date.

##  Tech Stack

| Type | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | Core application structure and logic. |
| **Styling** | Custom CSS (Flexbox/Grid) | Ensures responsiveness and clean UI/UX. |
| **Visualization** | Chart.js / D3.js *(Specify which one)* | Used to render Pie Charts and other required visualizations. |
| **Backend/DB** | **Firebase** (Firestore or Realtime DB) | Primary data storage for activity logs. |
| **Authentication** | **Firebase Authentication** | Secure user login/signup handling. |
| **Deployment** | GitHub Pages | Hosting the live web application. |
| **Version Control** | Git / GitHub | Code management and collaboration. |
| **AI Tooling** | Gemini / ChatGPT *(Specify which one(s))* | Leveraged for component generation, UI scaffolding, and documentation. |

##  How to Run the Project Locally

Follow these steps to set up and run the application on your local machine:

1.  **Clone the Repository:**
    ```bash
    git clone [Your GitHub Repo Link]
    cd time-tracker-dashboard
    ```

2.  **Install Dependencies (If using frameworks/libraries like Chart.js, no `npm install` is strictly needed for the core app if using CDNs, but include this if you used package managers):**
    ```bash
    # If necessary, otherwise skip
    # npm install
    ```

3.  **Set Up Firebase Configuration:**
    * Create a Firebase project in the console.
    * Enable **Authentication** (Email/Password or Google Sign-In).
    * Enable **Firestore** or **Realtime Database**.
    * Update the `firebaseConfig` object in **`js/firebaseConfig.js`** with your project's credentials.

4.  **Run Dev Server:**
    * Open `index.html` in your browser. Since modern browsers restrict file access when using modules, it is best to use a simple local server.
    * You can use the **Live Server** extension in VS Code or run a simple Python server:
        ```bash
        python3 -m http.server 8000 
        ```
    * Access the application at `http://localhost:8000`.

## 📸 Screenshots / GIFs of the App (Recommended)

| Login Page | Activity Logging Interface | Analytics Dashboard |
| :---: | :---: | :---: |
| [attachment_0](attachment) | [attachment_1](attachment) | [attachment_2](attachment) |

##  Future Improvements

*(Optional but good — demonstrate forward thinking.)*

* **Recurring Activities:** Implement an option to set activities that repeat daily or weekly.
* **Export Data:** Feature to export activity logs (e.g., as CSV or PDF).
* **Advanced Analytics:** Calculate and display weekly and monthly trends, comparison charts, and productivity scores.
* **Notification System:** Reminders for users to log their day if the full $1440$ minutes are not yet accounted for by evening.
