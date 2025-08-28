# 🛡️ CyberSec Portfolio Website

A stunning, futuristic portfolio website designed for BCA students specializing in cybersecurity and Python development. This modern, responsive website features a cyberpunk aesthetic with interactive animations and smooth user experience.

## ✨ Features

### 🎨 Design & Aesthetics
- **Futuristic Cyberpunk Theme**: Dark color scheme with neon green accents
- **Responsive Design**: Fully responsive across all devices
- **Modern Typography**: Orbitron and Rajdhani fonts for that tech feel
- **Smooth Animations**: CSS animations and JavaScript interactions
- **Interactive Elements**: Hover effects, scroll animations, and particle effects

### 🚀 Interactive Features
- **Animated Terminal**: Live typing effect with cybersecurity commands
- **Skill Progress Bars**: Animated skill visualization
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Form Validation**: Contact form with real-time validation
- **Notification System**: Success/error notifications
- **Particle Effects**: Floating particles in hero section

### 📱 Sections
1. **Hero Section**: Eye-catching introduction with animated terminal
2. **About Section**: Personal information with animated statistics
3. **Skills Section**: Technical skills with progress bars
4. **Projects Section**: Portfolio projects with hover effects
5. **Contact Section**: Contact form and information
6. **Footer**: Links and branding

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Font Awesome**: Icons for the interface
- **Google Fonts**: Orbitron and Rajdhani fonts

## 📁 File Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The website will load automatically

### Local Development
For local development, you can use any local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎨 Customization

### Colors
The color scheme can be customized by modifying CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00ff88;      /* Main accent color */
    --secondary-color: #ff0080;    /* Secondary accent */
    --accent-color: #0080ff;       /* Additional accent */
    --dark-bg: #0a0a0a;            /* Background color */
    --darker-bg: #050505;          /* Darker background */
    --card-bg: #1a1a1a;            /* Card background */
    --text-primary: #ffffff;       /* Primary text */
    --text-secondary: #b0b0b0;     /* Secondary text */
}
```

### Content
- **Personal Information**: Update the about section in `index.html`
- **Skills**: Modify skill categories and percentages in the skills section
- **Projects**: Add your own projects to the projects section
- **Contact Information**: Update contact details and social links

### Animations
- **Terminal Commands**: Modify the commands array in `script.js`
- **Particle Effects**: Adjust particle count and animation in `script.js`
- **Scroll Animations**: Customize animation timing in `styles.css`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🌟 Key Features Explained

### Terminal Animation
The hero section features an animated terminal that cycles through cybersecurity-related commands:
- `python --version`
- `whoami`
- `ls projects/`
- `cat skills.txt`
- `nmap -sS localhost`
- `python security_scanner.py`

### Skill Bars
Animated progress bars that fill up when scrolled into view, showing proficiency levels in various technologies.

### Particle Effects
Floating particles in the hero section create a dynamic, futuristic atmosphere.

### Form Validation
The contact form includes:
- Required field validation
- Email format validation
- Success/error notifications
- Loading states

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider sharing them with the community!

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out!

---

**Built with ❤️ for the cybersecurity community**

## 🧩 Backend (Node.js/Express)

A lightweight Express backend is included to handle:
- Contact form submissions (`POST /api/contact`) saved to a JSON file
- Health check (`GET /api/health`)
- Sample projects API (`GET /api/projects`)
- Static hosting of the frontend (open `http://localhost:5000`)

### Setup

```bash
cd backend
npm install
# Optional: copy env file
cp .env.example .env  # On Windows: copy .env.example .env
```

### Run

```bash
# Development (auto-restart)
npm run dev
# Production
npm start
```

Visit `http://localhost:5000`.

### Environment Variables
Create `backend/.env` (see `.env.example`):

```
PORT=5000
```

### API Endpoints
- `GET /api/health` → `{ status: 'ok', timestamp: '...' }`
- `GET /api/projects` → sample projects array
- `POST /api/contact` → body: `{ name, email, subject?, message }`
  - Response: `{ ok: true, message: 'Message received', entry }`
  - Messages are stored in `backend/data/messages.json`

### Frontend Integration
The contact form in `index.html` posts to the backend via `script.js`. If the backend isn't running, it falls back gracefully and shows an info notification.

### Notes
- The backend uses Helmet, CORS, request logging, and basic rate limiting for `/api/contact`.
- Static files are served from the project root, so the site is available on the backend port.

### Static Public Assets
- Put files in `backend/public/` to serve them directly, e.g. `backend/public/robots.txt` → `http://localhost:5000/robots.txt`.
- Public assets are served before the frontend fallback.
