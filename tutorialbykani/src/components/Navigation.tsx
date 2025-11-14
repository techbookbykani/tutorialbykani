import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavigationProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
  }>;
}

const Navigation: React.FC<NavigationProps> = ({ categories }) => {
  const router = useRouter();

  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-categories">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/tutorials/${category.slug}`}
              className={`nav-category ${
                router.pathname.includes(category.slug) ? 'active' : ''
              }`}
            >
              <span className="category-name">{category.name}</span>
              <span className="category-desc">{category.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;