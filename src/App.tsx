import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'

function App() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [plan, setPlan] = useState("");

  if (view === "dashboard") {
    return (
      <Dashboard
        plan={plan}
        onLogout={() => {
          setView("landing");
          setPlan("");
        }}
      />
    );
  }

  return (
    <div className="bg-white antialiased font-['Inter']">
      <Header />
      <Hero
        onSubscribe={(selectedPlan) => {
          setPlan(selectedPlan);
          setView("dashboard");
        }}
      />
    </div>
  )
}

export default App
