# GoalMint Bets

A simple, responsive betting prediction platform built with pure HTML, CSS, and JavaScript.

## Features

- **Home Page**: Welcome screen with quick access to Free Games and VIP predictions
- **Free Games Page**: Display 2 free predictions without any payment
- **VIP College Score Page**: Locked predictions that unlock after Paystack payment
- **Payment Integration**: Seamless Paystack payment system for VIP access
- **Persistent Storage**: VIP access remains unlocked using browser localStorage
- **Dark Modern Design**: Football betting themed with blue and red accents
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices

## Pages

### 1. Home Page
- Site branding "GoalMint Bets"
- Tagline: "Free Games and VIP Correct Score Predictions"
- Two main action buttons
- Clean hero section

### 2. Free Games Page
- **Game 1**: Over 1.5 Goals (FREE)
- **Game 2**: BTTS Yes (FREE)
- Back to home navigation
- Simple, clean card design

### 3. VIP College Score Page
- **Locked State**: Shows payment required message
  - Lock icon and description
  - Paystack payment button
  - Amount: 20 GHS

- **Unlocked State**: Shows after successful payment
  - **Correct Score 1**: 2-1
  - **Correct Score 2**: 1-0
  - Revoke access button

## Payment Details

- **Payment Gateway**: Paystack
- **Currency**: GHS (Ghana Cedis)
- **Amount**: 20 GHS (2000 kobo)
- **Storage**: VIP access stored in `localStorage` as `vipAccessUnlocked`

## Setup Instructions

### 1. Get Paystack API Key
1. Go to [Paystack](https://paystack.com)
2. Create an account and verify your business
3. Navigate to Settings → API Keys & Webhooks
4. Copy your **Public Key**

### 2. Update API Key
In `script.js`, find this line:
```javascript
key: 'pk_live_YOUR_PAYSTACK_KEY_HERE',
