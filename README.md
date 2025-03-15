# ShopSphere - E-commerce Application

ShopSphere is a full-stack e-commerce platform built with React, Firebase, and Stripe, styled with Tailwind CSS. It features user authentication, cart management, secure payments, and order history, with Firebase Functions handling backend logic.

## Features
- **Authentication**: Google/email login via Firebase Auth (`src/Login.tsx`).
- **Cart**: Real-time product updates (`src/CartPage.tsx`).
- **Checkout**: Stripe payment integration (`src/CheckoutPage.tsx`).
- **Order History**: Displays past orders with error handling (`src/OrderHistory.tsx`).
- **Storage**: Firebase Storage for images (`storage.rules`).

## Project Structure
- `src/`: React frontend (e.g., `App.tsx`, `Login.tsx`, `firebase.ts`).
- `functions/`: Firebase Functions (e.g., Stripe processing).
- `public/`: Static assets.
- `storage.rules`: Firebase Storage security rules.
- `tailwind.config.js`: Tailwind CSS configuration.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Firebase Functions (Node.js)
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Payments**: Stripe API

## Setup Instructions
1. **Clone**: `git clone https://github.com/esmael889/ecommerce-app.git`
2. **Install Frontend**: `cd ecommerce-app && npm install`
3. **Install Functions**: `cd functions && npm install`
4. **Configure**: Create `.env` in the root directory with your own keys (not tracked—see `.gitignore`):
5. **Run Frontend**: `npm start` (runs on `localhost:3000`)
6. **Deploy Functions**: `firebase deploy --only functions`

## Demo
- **Video**: [Demo Video](https://fcibuedu-my.sharepoint.com/:f:/g/personal/esmaiel195025_fci_bu_edu_eg/EjN2xHDiyXFNlh-y3l59t88Bvw_KRMfoNNl8V6LUZjSrgQ?e=oEcbib)
- **Test Account**: `testproducts464@gmail.com` (or any Google email)
- **Documentation**: [PDF Link](https://fcibuedu-my.sharepoint.com/:b:/g/personal/esmaiel195025_fci_bu_edu_eg/EclozUyBnlxIjvbwUXQkaLoBlklt1zlIIH2JXxaWWd4sMg?e=Xz06O4)

## Challenges & Solutions
- **Login**: Fixed redirect issues with Firebase Auth.
- **Order History**: Added error handling for order data.
- **Payments**: Fixed Stripe payment processing.
- **Storage**: Replaced Firebase Storage uploads with `postimg.cc` for image hosting.
- **Data Persistence**: Fixed data loss on refresh.

## Future Improvements
- Add product search and filtering.
- Enhance `src/ProfilePage.tsx` with user settings.

## Author
Esmael Mosad - [github.com/esmael889]