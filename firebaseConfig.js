  // js/firebaseConfig.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKHimcKggdVY3GBV-1TxkKJekToYC4WKA",
  authDomain: "ai-powered-daily-time-tracking.firebaseapp.com",
  projectId: "ai-powered-daily-time-tracking",
  storageBucket: "ai-powered-daily-time-tracking.firebasestorage.app",
  messagingSenderId: "1015718526026",
  appId: "1:1015718526026:web:c6cb96b78360d8ea317ab3",
  measurementId: "G-Y5R2DE4Y5C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app);
const analytics = getAnalytics(app);
