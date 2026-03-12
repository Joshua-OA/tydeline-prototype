import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'

function App() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");

  if (view === "dashboard") {
    return (
      <Dashboard
        plan=""
        onLogout={() => {
          setView("landing");
        }}
      />
    );
  }

  return (
    <div className="bg-white antialiased font-['Inter']">
      <Header />
      <Hero
        onSubscribe={() => {
          setView("dashboard");
        }}
      />
    </div>
  )
}

export default App
