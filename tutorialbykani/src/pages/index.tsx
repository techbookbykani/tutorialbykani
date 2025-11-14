import React from 'react';
import Layout from '../components/Layout';
import TutorialCard from '../components/TutorialCard';
import { GetStaticProps } from 'next';

interface HomeProps {
  featuredTutorials: Array<{
    id: string;
    title: string;
    description: string;
    slug: string;
    category: string;
    author: string;
    readTime: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    publishedAt: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    tutorialCount: number;
  }>;
}

const Home: React.FC<HomeProps> = ({ featuredTutorials, categories }) => {
  return (
    <Layout>
      <div className="home">
        <section className="hero">
          <div className="container">
            <h1 className="hero-title">Master Cloud Computing & Programming</h1>
            <p className="hero-description">
              Learn Google Cloud Platform, programming languages, and modern development practices with comprehensive tutorials and hands-on examples
            </p>
            <div className="hero-cta">
              <a href="/tutorials/gcp" className="cta-button gcp-primary">
                Start with Google Cloud ☁️
              </a>
              <a href="/tutorials" className="cta-button secondary">
                Browse All Tutorials
              </a>
            </div>
          </div>
        </section>
        
        <section className="gcp-spotlight">
          <div className="container">
            <div className="spotlight-content">
              <h2>🚀 Google Cloud Platform Spotlight</h2>
              <p>Master the world's most advanced cloud platform with our comprehensive GCP tutorials</p>
              <div className="gcp-services-preview">
                <div className="service-item">☁️ Compute Engine</div>
                <div className="service-item">📊 BigQuery</div>
                <div className="service-item">🔧 Kubernetes Engine</div>
                <div className="service-item">⚡ Cloud Functions</div>
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section">
          <div className="container">
            <h2>Popular Categories</h2>
            <div className="categories-grid">
              {categories.map((category) => (
                <div key={category.id} className="category-card">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="tutorial-count">
                    {category.tutorialCount} tutorials
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="featured-section">
          <div className="container">
            <h2>Featured Tutorials</h2>
            <div className="tutorials-grid">
              {featuredTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // In a real app, this would fetch from an API or database
  const featuredTutorials = [
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
      title: 'Compute Engine: Virtual Machines in the Cloud',
      description: 'Learn to create, configure, and manage virtual machines on Google Compute Engine',
      slug: 'gcp-compute-engine-vms',
      category: 'gcp',
      author: 'Cloud Infrastructure Team',
      readTime: '30 min',
      difficulty: 'Beginner' as const,
      publishedAt: '2024-11-02',
    },
    {
      id: '19',
      title: 'BigQuery: Analytics and Data Warehousing',
      description: 'Learn BigQuery for massive-scale analytics, SQL queries, and data warehousing solutions',
      slug: 'gcp-bigquery-analytics',
      category: 'gcp',
      author: 'Data Analytics Team',
      readTime: '35 min',
      difficulty: 'Intermediate' as const,
      publishedAt: '2024-11-04',
    },
    {
      id: '29',
      title: 'AI Platform and Machine Learning',
      description: 'Build and deploy machine learning models using Google AI Platform and AutoML',
      slug: 'gcp-ai-platform-ml',
      category: 'gcp',
      author: 'AI/ML Team',
      readTime: '45 min',
      difficulty: 'Advanced' as const,
      publishedAt: '2024-09-30',
    },
    {
      id: '1',
      title: 'Java Basics for Beginners',
      description: 'Learn the fundamentals of Java programming language',
      slug: 'java-basics-beginners',
      category: 'java',
      author: 'John Doe',
      readTime: '15 min',
      difficulty: 'Beginner' as const,
      publishedAt: '2024-01-15',
    },
    {
      id: '4',
      title: 'Python Data Structures',
      description: 'Master lists, dictionaries, and sets in Python',
      slug: 'python-data-structures',
      category: 'python',
      author: 'Jane Smith',
      readTime: '20 min',
      difficulty: 'Intermediate' as const,
      publishedAt: '2024-01-20',
    },
  ];

  const categories = [
    {
      id: '6',
      name: 'Google Cloud Platform',
      slug: 'gcp',
      description: 'Master Google Cloud services and infrastructure',
      tutorialCount: 35,
    },
    {
      id: '1',
      name: 'Java',
      slug: 'java',
      description: 'Object-oriented programming with Java',
      tutorialCount: 25,
    },
    {
      id: '2',
      name: 'Python',
      slug: 'python',
      description: 'Versatile programming for all purposes',
      tutorialCount: 30,
    },
    {
      id: '3',
      name: 'JavaScript',
      slug: 'javascript',
      description: 'Web development and beyond',
      tutorialCount: 35,
    },
    {
      id: '4',
      name: 'React',
      slug: 'react',
      description: 'Modern frontend development',
      tutorialCount: 20,
    },
    {
      id: '5',
      name: 'TypeScript',
      slug: 'typescript',
      description: 'Type-safe JavaScript development',
      tutorialCount: 15,
    },
  ];

  return {
    props: {
      featuredTutorials,
      categories,
    },
  };
};

export default Home;