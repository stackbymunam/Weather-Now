import { memo } from 'react';
import UnitsDropdown from './UnitsDropdown';

const Navbar = memo(function Navbar() {
  return (
    <header className="w-full px-4 sm:px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌤️</span>
        <span className="font-display font-bold text-white text-lg tracking-tight">
          Weather<span className="text-accent-400">Now</span>
        </span>
      </div>

      <UnitsDropdown />
    </header>
  );
});

export default Navbar;
