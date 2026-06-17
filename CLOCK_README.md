# Digital Clock - Multiple Time Zones

A modern, responsive digital clock application that displays the current time in multiple time zones simultaneously.

## Features

- **Multiple Time Zones**: Display time in up to 33+ different time zones
- **Real-time Updates**: Clock updates every second
- **Add/Remove Zones**: Dynamically add or remove time zones
- **Persistent Storage**: Your selected time zones are saved in browser localStorage
- **Timezone Offsets**: See UTC offset for each timezone
- **Date Display**: Shows full date (weekday, month, day, year) for each timezone
- **Dark Modern Design**: Beautiful gradient-based UI with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **No Dependencies**: Pure HTML, CSS, and JavaScript

## Available Time Zones

The clock includes 33 major time zones:

### Americas
- UTC
- America/New_York (Eastern)
- America/Chicago (Central)
- America/Denver (Mountain)
- America/Los_Angeles (Pacific)
- America/Anchorage (Alaska)
- Pacific/Honolulu (Hawaii)
- America/Toronto (Canada East)
- America/Vancouver (Canada West)
- America/Mexico_City
- America/Sao_Paulo (Brazil)
- America/Buenos_Aires (Argentina)

### Europe
- Europe/London (GMT)
- Europe/Paris (CET)
- Europe/Berlin (CET)
- Europe/Moscow (MSK)

### Asia
- Asia/Dubai (GST)
- Asia/Kolkata (IST)
- Asia/Bangkok (ICT)
- Asia/Singapore (SGT)
- Asia/Hong_Kong (HKT)
- Asia/Tokyo (JST)
- Asia/Seoul (KST)
- Asia/Jakarta (WIB)
- Asia/Manila (PHT)
- Asia/Shanghai (CST)
- Asia/Taipei (CST)

### Africa
- Africa/Cairo (EET)
- Africa/Lagos (WAT)
- Africa/Johannesburg (SAST)

### Australia & Pacific
- Australia/Sydney (AEDT/AEST)
- Australia/Melbourne (AEDT/AEST)
- Pacific/Auckland (NZDT/NZST)

## How to Use

### Add a Time Zone
1. Click the "+ Add Time Zone" button
2. Select a time zone from the dropdown menu
3. Click "Add" to display it on the main view

### Remove a Time Zone
1. Click the "Remove" button on any clock card
2. The time zone will be removed from the display
3. (Note: You must have at least one time zone active)

### Reset to Default
1. Click the "Reset Default" button
2. The clock will return to displaying the default 5 time zones

## Default Time Zones

When you first load the page, it displays:
- UTC (Coordinated Universal Time)
- America/New_York (Eastern Time)
- Europe/London (GMT/BST)
- Asia/Tokyo (Japan Time)
- Australia/Sydney (Australian Time)

## File Structure

```
clock/
├── clock.html          # Main HTML file
├── clock-styles.css    # All styling and responsive design
├── clock-script.js     # Clock logic and timezone management
└── CLOCK_README.md     # This file
```

## Technology Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: No external dependencies
- **Intl API**: Browser's native timezone and date formatting
- **localStorage**: Client-side data persistence

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Fully responsive

## Local Development

1. Clone or download the files
2. Open `clock.html` in a web browser
3. The clock will start automatically
4. Add/remove time zones as needed

## How It Works

### Real-time Updates
The clock uses JavaScript's `setInterval()` to update every second:
```javascript
setInterval(renderClocks, 1000);
```

### Timezone Handling
The app uses the native Intl API to format dates and times for different timezones:
```javascript
const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
});
```

### Data Persistence
Selected timezones are saved to localStorage:
```javascript
localStorage.setItem('activeTimezones', JSON.stringify(activeTimezones));
```

## Customization

### Add More Time Zones
Edit `clock-script.js` and add to the `allTimezones` array:
```javascript
const allTimezones = [
    'UTC',
    'Your/Timezone',
    // ...
];
```

### Change Default Time Zones
Edit the `defaultTimezones` array:
```javascript
const defaultTimezones = ['UTC', 'America/New_York', 'Europe/London'];
```

### Customize Colors
Edit `clock-styles.css` CSS variables:
```css
:root {
    --primary-blue: #0066ff;
    --dark-bg: #0f172a;
    /* ... */
}
```

## Notes

- Timezone data is provided by your browser's JavaScript engine
- The clock automatically handles daylight saving time changes
- All times are calculated based on your device's current time
- No internet connection required for timezone data

## License

Free to use and modify.

## Support

For timezone information, visit:
- [IANA Time Zone Database](https://www.iana.org/time-zones)
- [MDN - Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
