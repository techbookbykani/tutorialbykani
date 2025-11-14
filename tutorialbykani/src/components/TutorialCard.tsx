import React from 'react';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';

interface TutorialCardProps {
  tutorial: {
    id: string;
    title: string;
    description: string;
    slug: string;
    category: string;
    author: string;
    readTime: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    publishedAt: string;
  };
}

const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'green';
      case 'Intermediate':
        return 'orange';
      case 'Advanced':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="tutorial-card">
      <Link href={`/tutorials/${tutorial.category}/${tutorial.slug}`}>
        <div className="card-content">
          <div className="card-header">
            <span 
              className={`difficulty-badge ${getDifficultyColor(tutorial.difficulty)}`}
            >
              {tutorial.difficulty}
            </span>
          </div>
          
          <h3 className="card-title">{tutorial.title}</h3>
          <p className="card-description">{tutorial.description}</p>
          
          <div className="card-meta">
            <div className="meta-item">
              <User size={16} />
              <span>{tutorial.author}</span>
            </div>
            <div className="meta-item">
              <Clock size={16} />
              <span>{tutorial.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TutorialCard;