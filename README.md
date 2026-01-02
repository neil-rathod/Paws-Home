# 🐾 Paws & Home

A modern, minimalist dog adoption platform built with React and TypeScript. Browse adorable dogs looking for their forever homes, filter by preferences, and submit adoption applications—all in a beautiful, responsive interface.

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)

---

## ✨ Features

- **Browse Adoptable Dogs** — View a curated gallery of dogs with detailed profiles
- **Smart Filtering** — Filter by age, size, gender, or search by name/breed/tags
- **Favorites System** — Save dogs you love with persistent local storage
- **Detailed Dog Profiles** — View comprehensive information including compatibility with cats, dogs, and kids
- **Adoption Application** — Complete multi-step application form for serious adopters
- **Responsive Design** — Seamless experience across desktop, tablet, and mobile devices
- **Smooth Animations** — Polished UI with elegant transitions and hover effects

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/paws-and-home.git
   cd paws-and-home
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
PawsANDHome/
├── components/
│   ├── AboutPage.tsx        # About the organization
│   ├── ApplicationForm.tsx  # Multi-step adoption form
│   ├── DogCard.tsx          # Individual dog card component
│   ├── DogDetail.tsx        # Full dog profile modal
│   └── ProcessPage.tsx      # Adoption process info
├── App.tsx                  # Main application component
├── constants.tsx            # Dog data and constants
├── types.ts                 # TypeScript type definitions
├── index.tsx                # Application entry point
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Fast build tool and dev server |
| **LocalStorage** | Persistent favorites storage |

---

## 🐕 Dog Data Model

Each dog profile includes:

```typescript
interface Dog {
  id: string;
  name: string;
  breed: string;
  age: 'Puppy' | 'Young' | 'Adult' | 'Senior';
  size: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  energyLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  gender: 'Male' | 'Female';
  weight: string;
  color: string;
  description: string;
  imageUrl: string;
  tags: string[];
  location: string;
  compatibility: {
    cats: boolean;
    dogs: boolean;
    kids: boolean;
  };
}
```

---

## 🎨 Screenshots

| Browse Dogs | Dog Profile | Adoption Form |
|-------------|-------------|---------------|
| Filter and search through available dogs | View detailed compatibility info | Complete multi-step application |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💖 Acknowledgments

- Dog images sourced from [Unsplash](https://unsplash.com)

---

<p align="center">
  Made with ❤️ for dogs and the people who love them
</p>
