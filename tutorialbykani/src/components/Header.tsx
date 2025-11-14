import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            <span className="logo-text">TutorialHub</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/tutorials/gcp" className="nav-link gcp-highlight">Google Cloud</Link>
            <Link href="/tutorials/java" className="nav-link">Java</Link>
            <Link href="/tutorials/python" className="nav-link">Python</Link>
            <Link href="/tutorials/javascript" className="nav-link">JavaScript</Link>
            <Link href="/tutorials/react" className="nav-link">React</Link>
            <Link href="/about" className="nav-link">About</Link>
          </nav>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </form>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;