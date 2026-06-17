// Available Time Zones
const allTimezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Moscow',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Singapore',
    'Asia/Hong_Kong',
    'Asia/Tokyo',
    'Asia/Seoul',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Pacific/Auckland',
    'Africa/Cairo',
    'Africa/Lagos',
    'Africa/Johannesburg',
    'America/Sao_Paulo',
    'America/Buenos_Aires',
    'America/Mexico_City',
    'America/Toronto',
    'America/Vancouver',
    'Asia/Jakarta',
    'Asia/Manila',
    'Asia/Shanghai',
    'Asia/Taipei',
];

// Default Time Zones
const defaultTimezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];

// Initialize
let activeTimezones = [...defaultTimezones];

// Load from localStorage
function loadTimezones() {
    const saved = localStorage.getItem('activeTimezones');
    if (saved) {
        activeTimezones = JSON.parse(saved);
    } else {
        activeTimezones = [...defaultTimezones];
        saveTimezones();
    }
}

// Save to localStorage
function saveTimezones() {
    localStorage.setItem('activeTimezones', JSON.stringify(activeTimezones));
}

// Get timezone display name
function getTimezoneDisplayName(timezone) {
    return timezone.replace(/_/g, ' ');
}

// Get timezone offset
function getTimezoneOffset(timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour12: false,
    });
    
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).formatToParts(now);
    
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - now) / (1000 * 60);
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? '+' : '-';
    
    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Format time for a timezone
function getFormattedTime(timezone, include12Hour = true) {
    const time = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const timeStr = formatter.format(time);
    const [hours, minutes, seconds] = timeStr.split(':');
    
    return {
        time: `${hours}:${minutes}:${seconds}`,
        hours: parseInt(hours),
        minutes: minutes,
        seconds: seconds,
        period: parseInt(hours) >= 12 ? 'PM' : 'AM',
        hour12: String(parseInt(hours) % 12 || 12).padStart(2, '0')
    };
}

// Get date for timezone
function getFormattedDate(timezone) {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return formatter.format(date);
}

// Render clocks
function renderClocks() {
    const grid = document.getElementById('clocksGrid');
    grid.innerHTML = '';

    activeTimezones.forEach(timezone => {
        const timeData = getFormattedTime(timezone);
        const date = getFormattedDate(timezone);
        const offset = getTimezoneOffset(timezone);
        const displayName = getTimezoneDisplayName(timezone);

        const card = document.createElement('div');
        card.className = 'clock-card';
        card.innerHTML = `
            <div class="timezone-name">${displayName}</div>
            <div class="timezone-label">Time Zone</div>
            <div class="digital-time">${timeData.time}</div>
            <div class="period">${timeData.period}</div>
            <div class="date-display">${date}</div>
            <div class="timezone-offset">UTC ${offset}</div>
            ${activeTimezones.length > 1 ? `<button class="btn btn-remove" onclick="removeTimezone('${timezone}')">Remove</button>` : ''}
        `;

        grid.appendChild(card);
    });
}

// Update clocks every second
function startClock() {
    renderClocks();
    setInterval(renderClocks, 1000);
}

// Populate timezone select
function populateTimezoneSelect() {
    const select = document.getElementById('timezoneSelect');
    
    allTimezones.forEach(timezone => {
        if (!activeTimezones.includes(timezone)) {
            const option = document.createElement('option');
            option.value = timezone;
            option.textContent = getTimezoneDisplayName(timezone);
            select.appendChild(option);
        }
    });
}

// Open add timezone modal
function openAddTimezone() {
    const modal = document.getElementById('addTimezoneModal');
    modal.classList.add('show');
    populateTimezoneSelect();
}

// Close add timezone modal
function closeAddTimezone() {
    const modal = document.getElementById('addTimezoneModal');
    modal.classList.remove('show');
}

// Add timezone
function addTimezone() {
    const select = document.getElementById('timezoneSelect');
    const timezone = select.value;

    if (timezone && !activeTimezones.includes(timezone)) {
        activeTimezones.push(timezone);
        saveTimezones();
        renderClocks();
        closeAddTimezone();
    }
}

// Remove timezone
function removeTimezone(timezone) {
    if (activeTimezones.length > 1) {
        activeTimezones = activeTimezones.filter(tz => tz !== timezone);
        saveTimezones();
        renderClocks();
    } else {
        alert('You must have at least one time zone!');
    }
}

// Reset to default
function resetToDefault() {
    activeTimezones = [...defaultTimezones];
    saveTimezones();
    renderClocks();
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('addTimezoneModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    loadTimezones();
    startClock();
    console.log('Digital Clock loaded successfully');
});