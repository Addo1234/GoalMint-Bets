// Page Navigation
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show selected page
    let pageId;
    if (page === 'home') {
        pageId = 'homePage';
    } else if (page === 'freeGames') {
        pageId = 'freeGamesPage';
    } else if (page === 'vipCollege') {
        pageId = 'vipCollegePage';
        // Check if VIP access is already unlocked
        checkVIPStatus();
    }

    if (pageId) {
        document.getElementById(pageId).classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Check VIP Status on Page Load
function checkVIPStatus() {
    const vipUnlocked = localStorage.getItem('vipAccessUnlocked');
    const vipLockedDiv = document.getElementById('vipLocked');
    const vipUnlockedDiv = document.getElementById('vipUnlocked');

    if (vipUnlocked === 'true') {
        vipLockedDiv.style.display = 'none';
        vipUnlockedDiv.style.display = 'block';
    } else {
        vipLockedDiv.style.display = 'block';
        vipUnlockedDiv.style.display = 'none';
    }
}

// Paystack Integration
function initializePayment() {
    const email = 'user@goalmintbets.com'; // Default email
    const amount = 20 * 100; // 20 GHS in kobo
    const reference = 'goalmint_' + Math.floor((Math.random() * 1000000000) + 1);

    const handler = PaystackPop.setup({
        key: 'pk_live_96a553401ff040dedd4cd39a82aa594eb5cf68bc',
        email: email,
        amount: amount,
        currency: 'GHS',
        ref: reference,
        onClose: function () {
            console.log('Payment window closed.');
            showNotification('Payment cancelled', 'error');
        },
        onSuccess: function (response) {
            console.log('Payment successful:', response);
            // Store VIP access in localStorage
            localStorage.setItem('vipAccessUnlocked', 'true');
            localStorage.setItem('vipAccessDate', new Date().toISOString());
            localStorage.setItem('paymentReference', response.reference);

            // Update UI
            checkVIPStatus();
            showNotification('Payment successful! VIP access unlocked!', 'success');
        }
    });
    handler.openIframe();
}

// Revoke VIP Access
function revokeVIPAccess() {
    if (confirm('Are you sure you want to revoke VIP access?')) {
        localStorage.removeItem('vipAccessUnlocked');
        localStorage.removeItem('vipAccessDate');
        localStorage.removeItem('paymentReference');
        checkVIPStatus();
        showNotification('VIP access revoked', 'info');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
        max-width: 90%;
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Animation styles for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Show home page by default
    navigateTo('home');

    // Check if user has VIP access stored
    checkVIPStatus();

    // Log for debugging
    console.log('GoalMint Bets loaded successfully');
});