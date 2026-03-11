import tydlineLogo from '../assets/tydeline-cropped.png';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-12 py-4 flex justify-between items-center">
        <img src={tydlineLogo} alt="Tydline" className="h-8" />

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-black">About Us</a>
          <a href="#" className="hover:text-black">Service</a>
          <a href="#" className="hover:text-black">Pricing</a>
          <a href="#" className="hover:text-black">Testimonials</a>
          <a href="#" className="hover:text-black">FAQ</a>
        </nav>

        <button className="bg-[#0753BB] px-4 py-2 text-sm font-bold text-white hover:bg-[#064299] transition-colors cursor-pointer">
          Get Started
        </button>
      </div>
    </header>
  );
}
