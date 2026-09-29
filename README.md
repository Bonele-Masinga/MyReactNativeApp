# MyReactNativeApp
Application for XHAW Assignment
The link didn't work, so we had to make a new link and do one big commit.
# Pawsitive Pet Academy Mobile Application
This repository contains a React Native mobile application developed for Pawsitive Pet Academy, a professional pet training and care institute.

The application streamlines course selection, calculates customized fee quotes with automatic multi-course discount tiers, and allows clients to manage custom pet goals and instructor notes.

# Features & Application Flow
User Registration & Profile Setup (Screen 1): Captures client contact information (First Name, Surname, and Phone Number) with form validation to ensure all fields are complete. Features smooth animated transitions (FadeInView) and a circular branded logo badge.

Course Selection & Quote Calculator (Screen 2): Displays 6-Month and 6-Week training courses with interactive radio selections and thumbnail previews. Users can build a custom course list with real-time add/remove functionality. The app dynamically calculates subtotals, bulk-enrollment discount tiers, and final totals due.

Dynamic Wishlist & Goal Manager (Screen 3): Enables clients to enter custom training goals or special requests for pet instructors (e.g., house-training advice) and manage them dynamically.

# Technical Architecture & Dependencies
Framework: React Native (Expo)

Language: TypeScript (.tsx)

Navigation: React Navigation (@react-navigation/native, @react-navigation/native-stack)

UI Components: React Native Paper (PaperProvider, RadioButton)

Safe Area Management: react-native-safe-area-context

Local Setup & Installation
Clone the repository:

Bash
git clone https://github.com/your-username/PawsitiveApp.git
Navigate to the project root:

Bash
cd PawsitiveApp
Install dependencies:

Bash
npm install
Install required Expo packages:

Bash
npx expo install react-native-paper react-native-vector-icons
Start the development server:

Bash
npx expo start
Pricing & Discount Structure
Course Offerings
Canine Obedience Training: 6-Month Programme (12 weeks) — R1,500

Pet Grooming: 6-Month Programme (12 weeks) — R1,500

Animal Behaviour: 6-Month Programme (12 weeks) — R1,500

Pet Business Management: 6-Month Programme (12 weeks) — R1,500

Puppy Care: 6-Week Programme (6 weeks) — R750

Pet First Aid: 6-Week Programme (6 weeks) — R750

Basic Dog Walking: 6-Week Programme (6 weeks) — R750

Automatic Discount Tiers
2 Courses Selected: 5% Discount

3 Courses Selected: 10% Discount

More than 3 Courses Selected: 15% Discount

Screenshots
Screenshots showing the registration flow, course fee breakdown, and custom request manager are included in the repository assets.
