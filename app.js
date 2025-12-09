import { 
    checkAuth, 
    logoutUser 
} from './auth.js';
import { 
    getActivitiesForDate, 
    addActivity 
} from './db.js';

const MAX_MINUTES_PER_DAY = 1440;
const dateInput = document.getElementById('activityDate');
const form = document.getElementById('activityForm');
const remainingMinutesMsg = document.getElementById('remainingMinutesMsg');
const activitiesList = document.getElementById('currentActivitiesList');
const analyzeBtn = document.getElementById('analyzeBtn');

checkAuth(true);

document.getElementById('logoutBtn').addEventListener('click', logoutUser);

dateInput.valueAsDate = new Date();
dateInput.addEventListener('change', () => {
    loadDataForDate(dateInput.value);
});

async function loadDataForDate(date) {
    const data = await getActivitiesForDate(date);
    
    if (data) {
        renderActivities(data.activities);
        updateRemainingMinutes(data.totalMinutes);
        renderDashboard(data.activities, data.totalMinutes);
    } else {
        renderActivities([]);
        updateRemainingMinutes(0);
        renderNoData();
    }
}

function updateRemainingMinutes(totalMinutes) {
    const remainingMinutes = MAX_MINUTES_PER_DAY - totalMinutes;
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;
    
    if (remainingMinutes < 0) {
        remainingMinutesMsg.textContent = "Error: Time exceeded 1440 minutes!";
    } else {
        remainingMinutesMsg.textContent = `You have ${hours}h ${minutes}m (${remainingMinutes} minutes) left for this day.`;
    }

    analyzeBtn.disabled = totalMinutes < MAX_MINUTES_PER_DAY;
}

function renderActivities(activities) {
    activitiesList.innerHTML = '<h3>Activities for Selected Date:</h3>';
    if (activities.length === 0) {
        activitiesList.innerHTML += '<p>No activities logged yet.</p>';
        return;
    }
    
    const ul = document.createElement('ul');
    activities.forEach(activity => {
        const li = document.createElement('li');
        li.textContent = `${activity.name} (${activity.category}) - ${activity.duration} min`;
        ul.appendChild(li);
    });
    activitiesList.appendChild(ul);
}

function renderDashboard(activities, totalMinutes) {
    document.getElementById('noDataMessage').classList.add('hidden');
    document.getElementById('visualizationContainer').classList.remove('hidden');

    const totalHours = (totalMinutes / 60).toFixed(1);
    document.getElementById('totalHours').textContent = totalHours;
    document.getElementById('totalActivities').textContent = activities.length;

    const categoryTotals = activities.reduce((acc, activity) => {
        const category = activity.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + activity.duration;
        return acc;
    }, {});
    
    renderPieChart(categoryTotals);
}

function renderNoData() {
    document.getElementById('totalHours').textContent = '0';
    document.getElementById('totalActivities').textContent = '0';
    
    document.getElementById('visualizationContainer').classList.add('hidden');
    document.getElementById('noDataMessage').classList.remove('hidden');
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newActivity = {
        name: document.getElementById('activityName').value,
        category: document.getElementById('activityCategory').value,
        duration: document.getElementById('activityDuration').value,
    };

    const date = dateInput.value;
    const success = await addActivity(date, newActivity);

    if (success) {
        form.reset();
        document.getElementById('activityDate').value = date;
        await loadDataForDate(date);
    }
});

let timeChart = null; 

function renderPieChart(categoryTotals) {
    const categories = Object.keys(categoryTotals);
    const durations = Object.values(categoryTotals);

    const ctx = document.getElementById('timePieChart').getContext('2d');
    
    if (timeChart) {
        timeChart.destroy();
    }
    
    timeChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: durations,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Time Spent by Category (Minutes)'
                }
            }
        }
    });
}

loadDataForDate(dateInput.value);