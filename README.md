# Password Strength Checker

A lightweight, clean, and modern web utility built to evaluate password complexity and security in real-time. Designed with a handcrafted aesthetic, avoiding typical heavy frameworks or AI-generated visual clutter.

## Features

- **Live Evaluation:** Dynamically analyzes password strength as you type.
- **Show/Hide Toggle:** Clean inline SVG toggle to reveal or mask the password input.
- **Granular Criteria Verification:** Tracks minimum length, uppercase, lowercase, numbers, and special characters.
- **Visual Feedback System:** Responsive strength bar alongside contextual, friendly guidance messages ("Use at least 8 characters", "Add a number", etc.).
- **Responsive & Lightweight:** Styled using vanilla CSS and structured with pure semantic HTML.

## Technologies Used

- **HTML5:** Semantic document structure.
- **CSS3:** Custom properties (CSS variables), flexbox layout, refined borders, and smooth transitions.
- **Vanilla JavaScript (ES6+):** Reactive input checking and UI state management.

## How to Run

1. Clone or download the project files into a single directory:
   - `index.html`
   - `style.css`
   - `script.js`
2. Open `index.html` directly in any modern web browser (Chrome, Firefox, Safari, Edge). Alternatively, serve it via a local development server like Live Server (VS Code).

## Possible Future Improvements

- Add a secure password generator feature to instantly generate high-entropy passwords.
- Implement checking against known leaked/compromised password databases via standard hashing APIs (e.g., HaveIBeenPwned k-Anonymity API).
- Add support for custom entropy calculation metrics (bits of entropy display).
