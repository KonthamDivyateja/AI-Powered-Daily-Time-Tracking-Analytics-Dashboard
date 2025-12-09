import { 
    auth 
} from './firebaseConfig.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

export async function signupUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed up successfully:", userCredential.user.uid);
        alert("Account created successfully! Redirecting to dashboard.");
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error("Signup Error:", error.code, error.message);
        alert(`Signup Failed: ${error.message}`);
    }
}

export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in successfully:", userCredential.user.uid);
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error("Login Error:", error.code, error.message);
        alert(`Login Failed: ${error.message}`);
    }
}

export async function logoutUser() {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Logout Error:", error.message);
    }
}

export function checkAuth(requiredAuth) {
    onAuthStateChanged(auth, (user) => {
        if (requiredAuth && !user) {
            window.location.href = 'index.html';
        } else if (!requiredAuth && user) {
            window.location.href = 'dashboard.html';
        }
    });
}