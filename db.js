import { 
    db, 
    auth 
} from './firebaseConfig.js';
import { 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const MAX_MINUTES_PER_DAY = 1440;

function getDayRef(userId, date) {
    return doc(db, `users/${userId}/days`, date);
}

export async function getActivitiesForDate(date) {
    const userId = auth.currentUser.uid;
    const dayRef = getDayRef(userId, date);

    try {
        const docSnap = await getDoc(dayRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (e) {
        console.error("Error fetching document: ", e);
        return null;
    }
}

export async function addActivity(date, activity) {
    const userId = auth.currentUser.uid;
    const dayRef = getDayRef(userId, date);

    const data = await getActivitiesForDate(date);
    const currentTotalMinutes = data ? data.totalMinutes : 0;
    const existingActivities = data ? data.activities : [];

    const newDuration = parseInt(activity.duration);
    const newTotalMinutes = currentTotalMinutes + newDuration;

    if (newTotalMinutes > MAX_MINUTES_PER_DAY) {
        alert(`Error: Total time (${newTotalMinutes} minutes) exceeds the daily limit (1440 minutes).`);
        return false;
    }
    
    const newActivity = { 
        ...activity, 
        duration: newDuration,
        id: Date.now().toString()
    };
    
    const updatedActivities = [...existingActivities, newActivity];
    
    const newDayData = {
        totalMinutes: newTotalMinutes,
        activities: updatedActivities
    };

    try {
        await setDoc(dayRef, newDayData); 
        console.log("Activity saved successfully!");
        return true;
    } catch (e) {
        console.error("Error adding activity: ", e);
        alert("Failed to save activity to database.");
        return false;
    }
}