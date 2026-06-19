# Moswadda AI (مسودة) ✍️🤖

A sophisticated, bidirectional Note Management System built with **React 19**, featuring **Clerk** authentication and **AI-driven** content optimization.

## 🧠 Engineering Highlights

### 1. Intelligent Bidirectional UI (i18n)
Built a custom localization engine using `react-intl` that supports seamless switching between Arabic (RTL) and English (LTR).
- **Dynamic Direction Detection:** Implemented a regex-based utility to detect script type and adjust text alignment (`dir="rtl"`) in real-time.

### 2. AI-Powered Content Lifecycle
Integrated dedicated API endpoints for three distinct AI behaviors:
- **Summarization:** Condensing long-form notes into actionable insights.
- **Tone Rewriting:** Transforming text between Formal, Casual, and Comedy modes.
- **Translation:** Breaking language barriers within the note-taking flow.

### 3. Optimized Persistence (Auto-Save)
Engineered a **Debounced Synchronization Hook** (`useNote`) that monitors state changes and triggers a `PATCH` request to the backend only after 2 seconds of inactivity. This reduces server load while ensuring zero data loss, accompanied by a real-time `AutoSaveIndicator` for user feedback.

### 4. Secure Architecture (SSDLC)
- **Auth Layer:** Utilized **Clerk** for robust session management and JWT-based API security.
- **Data Integrity:** Enforced strict TypeScript interfaces for API responses and component props.

## 🛠️ Tech Stack
- **Frontend:** React 19, TypeScript, React Router v7
- **Styling:** Tailwind CSS v4 (Glassmorphism), Shadcn/UI
- **Security:** Clerk Auth
- **State Management:** React Context API & Custom Hooks
- **Globalization:** React-Intl

## 🚀 Getting Started

1. **Clone the repository:**
    ```bash
   git clone https://github.com/tuhamiv/moswadda-ai.git

2. **Install dependencies:**
    ```bash
   npm install

3. **Run in development mode:**
    ```bash
   npm run dev

## 🙏 Credits
Special thanks to **Yehia Tech** for the React 19 course content, which provided the foundation for exploring these modern frontend patterns.