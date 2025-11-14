import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TutorialHub</h3>
            <p>Learn programming with comprehensive tutorials and examples.</p>
          </div>
          
          <div className="footer-section">
            <h4>Popular Topics</h4>
            <ul>
              <li><Link href="/tutorials/java">Java</Link></li>
              <li><Link href="/tutorials/python">Python</Link></li>
              <li><Link href="/tutorials/javascript">JavaScript</Link></li>
              <li><Link href="/tutorials/react">React</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 TutorialHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;