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

# Pawsitive Pet Academy - React Native Mobile Application

An interactive, cross-platform mobile application built with **React Native** and **Expo / React Navigation** designed for the Pawsitive Pet Academy. This application administers client registrations, course selections, tiered pricing discounts, secure checkout payments, institutional information, and user feedback.

---

## Project Overview & Code References

This project integrates standard React Native navigation, state management, and UI libraries along with custom academic business logic derived from the Pawsitive Pet Academy curriculum and web development reference architectures.

### 1. Navigation Architecture
* **Implementation:** React Navigation (Native Stack v6).
* **Reference & Documentation:** 
  * [React Navigation Official Docs](https://reactnavigation.org/)
  * [React Native Navigation Guide - GeeksforGeeks](https://www.geeksforgeeks.org/react-native-navigation/)
  * React Native Core Concepts Tutorial via [YouTube - Academund React Native Course](https://www.youtube.com/watch?v=ANdSdIlgsug)

### 2. Form State Management & Validation
* **Implementation:** React hooks (`useState`, `useEffect`, `useRef`) combined with custom validation helpers (`isEmpty`).
* **Reference & Documentation:**
  * [React Hooks Documentation - React.dev](https://react.dev/reference/react)
  * [React Native TextInput Component Guide](https://reactnative.dev/docs/textinput)
  * Form Handling Best Practices via [YouTube - Programming with Mosh](https://www.youtube.com/watch?v=0-S5a0eXPoc)

### 3. Course Catalog & Tiered Discount Business Logic
* **Implementation:** Array manipulation (`find`, `reduce`, `filter`) mapping course types (`6-Month` and `6-Week`) to dynamic pricing and volume-based discounts (2 courses = 5%, 3 courses = 10%, >3 courses = 15%).
* **Reference & Documentation:**
  * [JavaScript Array Methods - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  * Pawsitive Pet Academy Official Syllabus & Fee Policy Guidelines.

### 4. UI Layouts, Accordions & Styling
* **Implementation:** Flexbox layout styling (`StyleSheet`), `ScrollView`, `SafeAreaView`, `TouchableOpacity`, and custom interactive accordions for the About screen.
* **Reference & Documentation:**
  * [React Native Styling & Flexbox Guide](https://reactnative.dev/docs/flexbox)
  * UI Component Design Patterns via [YouTube - Not Just Dev React Native Tutorials](https://www.youtube.com/watch?v=ZBCjXtZV-wQ)

