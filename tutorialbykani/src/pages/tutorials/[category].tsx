import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import TutorialCard from '../../components/TutorialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  author: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  publishedAt: string;
}

interface CategoryPageProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
  };
  tutorials: Tutorial[];
  totalTutorials: number;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, tutorials, totalTutorials }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tutorialsPerPage = 12;
  
  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = tutorials.slice(indexOfFirstTutorial, indexOfLastTutorial);
  
  const totalPages = Math.ceil(totalTutorials / tutorialsPerPage);
  
  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="category-page">
        <div className="category-header">
          <h1 className="category-title">{category.name}</h1>
          <p className="category-description">{category.description}</p>
          
          <div className="category-stats">
            <div className="tutorials-count">
              Showing {indexOfFirstTutorial + 1}-{Math.min(indexOfLastTutorial, totalTutorials)} of {totalTutorials} tutorials
            </div>
          </div>
          
          <div className="tutorials-grid">
            {currentTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>
                
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`page-btn ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="pagination-info">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['gcp', 'java', 'python', 'javascript', 'react', 'typescript', 'nodejs'];
  
  const paths = categories.map((category) => ({
    params: { category },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params?.category as string;
  
  // In a real app, this would fetch from an API or database
  const categoryData = {
    gcp: {
      id: '6',
      name: 'Google Cloud Platform',
      slug: 'gcp',
      description: 'Master Google Cloud services including Compute Engine, Cloud Storage, BigQuery, Kubernetes, and more',
    },
    java: {
      id: '1',
      name: 'Java',
      slug: 'java',
      description: 'Learn Java programming from basics to advanced concepts',
    },
    python: {
      id: '2',
      name: 'Python',
      slug: 'python',
      description: 'Master Python programming for web development, data science, and more',
    },
    javascript: {
      id: '3',
      name: 'JavaScript',
      slug: 'javascript',
      description: 'Modern JavaScript for web development and beyond',
    },
    react: {
      id: '4',
      name: 'React',
      slug: 'react',
      description: 'Build modern user interfaces with React',
    },
    typescript: {
      id: '5',
      name: 'TypeScript',
      slug: 'typescript',
      description: 'Add type safety to JavaScript with TypeScript for better development experience',
    },
    nodejs: {
      id: '7',
      name: 'Node.js',
      slug: 'nodejs',
      description: 'Server-side JavaScript development with Node.js, Express, and backend technologies',
    },
  };

  const tutorialsData = {
    gcp: [
      {
        id: '16',
        title: 'GCP Fundamentals and Getting Started',
        description: 'Introduction to Google Cloud Platform, account setup, billing, and core concepts',
        slug: 'gcp-fundamentals-getting-started',
        category: 'gcp',
        author: 'Google Cloud Expert',
        readTime: '20 min',
        difficulty: 'Beginner' as const,
        publishedAt: '2024-11-01',
      },
      {
        id: '17',
        title: 'Google Cloud Analytics: BigQuery and Data Studio',
        description: 'Master Google Cloud\'s analytics services including BigQuery for data warehousing and Data Studio for visualization',
        slug: 'gcp-analytics-bigquery-data-studio',
        category: 'gcp',
        author: 'Data Analytics Team',
        readTime: '35 min',
        difficulty: 'Intermediate' as const,
        publishedAt: '2024-11-03',
      },
      {
        id: '18',
        readTime: '40 min',
        difficulty: 'Intermediate' as const,
        publishedAt: '2024-11-04',
      },
      {
        id: '19',
        title: 'Data Transfer Tools',
        description: 'Comprehensive guide to Google Cloud data transfer services including Transfer Service, Database Migration Service, and more',
        slug: 'gcp-data-transfer-tools',
        category: 'gcp',
        author: 'Data Migration Team',
        readTime: '45 min',
        difficulty: 'Intermediate' as const,
        publishedAt: '2024-11-05',
      },
    ],
  };

  const category = categoryData[categorySlug as keyof typeof categoryData];
  const tutorials = tutorialsData[categorySlug as keyof typeof tutorialsData] || [];

  return {
    props: {
      category,
      tutorials,
      totalTutorials: tutorials.length,
    },
  };
};

export default CategoryPage;