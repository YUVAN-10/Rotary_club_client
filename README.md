# Rotary_club_client

Client-side web application for **Rotary Club of Erode Central** built with **React**, **Tailwind CSS**, and **Firebase Firestore**.

## Features

- **Real-Time Directory**: Connects to Firebase Firestore `members` collection using modular SDK with live `onSnapshot` listener.
- **Table Directory & Pagination**: Clean 10-item pagination with search across Name, Phone, and Address.
- **Mobile Responsive**: Streamlined view showing Name and Contact with zero horizontal scroll on mobile.
- **Details Modal**: Slide-up bottom sheet on mobile / modal on desktop with profile photo, addresses, direct click-to-call, WhatsApp redirection, and Google Maps search.
- **Rotary Branding**: Rotary Royal Blue (`#0B3C8A`) and Gold (`#D4AF37`) themes.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
