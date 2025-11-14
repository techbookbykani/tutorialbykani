import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
  return (
    <Layout
      title="About TutorialHub - Cloud Computing & Programming Tutorials"
      description="Learn about TutorialHub's mission to provide comprehensive Google Cloud Platform and programming tutorials"
    >
      <div className="about-page">
        <div className="container">
          <h1>About TutorialHub</h1>
          
          <div className="about-section">
            <h2>🚀 Our Mission</h2>
            <p>
              TutorialHub is your premier destination for mastering cloud computing and modern programming. 
              We specialize in comprehensive Google Cloud Platform (GCP) tutorials alongside essential 
              programming languages and frameworks.
            </p>
            <p>
              Our goal is to make cloud computing accessible to everyone, from beginners taking their 
              first steps into the cloud to experienced developers looking to master advanced GCP services.
            </p>
          </div>

          <div className="about-section">
            <h2>☁️ Google Cloud Platform Focus</h2>
            <p>
              As cloud computing becomes increasingly important, we've made Google Cloud Platform a cornerstone 
              of our content. Our GCP tutorials cover:
            </p>
            <ul>
              <li><strong>Compute Services:</strong> Compute Engine, App Engine, Cloud Run, and Kubernetes Engine</li>
              <li><strong>Storage Solutions:</strong> Cloud Storage, Cloud SQL, Firestore, and BigQuery</li>
              <li><strong>AI & Machine Learning:</strong> AI Platform, AutoML, and TensorFlow integration</li>
              <li><strong>DevOps & Monitoring:</strong> Cloud Build, Cloud Monitoring, and deployment strategies</li>
              <li><strong>Security & Identity:</strong> IAM, Cloud Security Command Center, and best practices</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>🎯 What Makes Us Different</h2>
            <ul>
              <li><strong>Hands-on Approach:</strong> Every tutorial includes practical examples and real-world scenarios</li>
              <li><strong>Cloud-First Mindset:</strong> We emphasize cloud-native solutions and modern architectures</li>
              <li><strong>Beginner Friendly:</strong> Complex concepts broken down into digestible steps</li>
              <li><strong>Up-to-Date Content:</strong> Regular updates to reflect the latest GCP features and best practices</li>
              <li><strong>Free Access:</strong> All our tutorials are freely available to the community</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>📚 Learning Paths</h2>
            <p>We've organized our content into clear learning paths:</p>
            <ul>
              <li><strong>GCP Fundamentals:</strong> Start your cloud journey with core concepts</li>
              <li><strong>Infrastructure & Compute:</strong> Master virtual machines, containers, and serverless</li>
              <li><strong>Data & Analytics:</strong> Learn BigQuery, data lakes, and ML pipelines</li>
              <li><strong>Application Development:</strong> Build and deploy cloud-native applications</li>
              <li><strong>DevOps & Security:</strong> Implement CI/CD and security best practices</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>🤝 Get Involved</h2>
            <p>
              We believe in community-driven learning. If you have suggestions for new tutorials, 
              spot any errors, or want to contribute content, we'd love to hear from you. 
              Together, we can make cloud computing education more accessible and effective.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;