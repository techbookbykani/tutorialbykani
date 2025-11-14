import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import { Clock, User, Calendar, Menu, X, BookOpen } from 'lucide-react';

interface TutorialPageProps {
  tutorial: {
    id: string;
    title: string;
    description: string;
    content: string;
    slug: string;
    category: string;
    author: string;
    readTime: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    publishedAt: string;
  };
  allTutorials: Array<{
    id: string;
    title: string;
    slug: string;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  }>;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ tutorial, allTutorials }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'green';
      case 'Intermediate': return 'orange';
      case 'Advanced': return 'red';
      default: return 'gray';
    }
  };

  // Group tutorials by difficulty
  const groupedTutorials = allTutorials.reduce((acc, tut) => {
    if (!acc[tut.difficulty]) {
      acc[tut.difficulty] = [];
    }
    acc[tut.difficulty].push(tut);
    return acc;
  }, {} as Record<string, typeof allTutorials>);

  return (
    <Layout
      title={`${tutorial.title} - TutorialHub`}
      description={tutorial.description}
    >
      <div className="tutorial-layout">
        {/* Mobile sidebar toggle */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar Navigation */}
        <nav className={`tutorial-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-header">
            <BookOpen size={20} />
            <h3>GCP Tutorials</h3>
          </div>
          
          <div className="sidebar-content">
            {Object.entries(groupedTutorials).map(([difficulty, tutorials]) => (
              <div key={difficulty} className="sidebar-group">
                <h4 className={`sidebar-group-title ${getDifficultyColor(difficulty)}`}>
                  {difficulty} ({tutorials.length})
                </h4>
                <ul className="sidebar-list">
                  {tutorials.map((tut) => (
                    <li key={tut.id} className="sidebar-item">
                      <Link
                        href={`/tutorials/${tut.category}/${tut.slug}`}
                        className={`sidebar-link ${tut.slug === tutorial.slug ? 'active' : ''}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sidebar-link-text">{tut.title}</span>
                        <span className={`difficulty-indicator ${getDifficultyColor(tut.difficulty)}`}></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="tutorial-main">
          <article className="tutorial-article">
            <header className="tutorial-header">
              <div className="tutorial-meta">
                <span className={`difficulty-badge ${getDifficultyColor(tutorial.difficulty)}`}>
                  {tutorial.difficulty}
                </span>
                <span className="category-badge">{tutorial.category.toUpperCase()}</span>
              </div>
              
              <h1 className="tutorial-title">{tutorial.title}</h1>
              <p className="tutorial-description">{tutorial.description}</p>
              
              <div className="tutorial-info">
                <div className="info-item">
                  <User size={16} />
                  <span>{tutorial.author}</span>
                </div>
                <div className="info-item">
                  <Clock size={16} />
                  <span>{tutorial.readTime}</span>
                </div>
                <div className="info-item">
                  <Calendar size={16} />
                  <span>{new Date(tutorial.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </header>
            
            <div className="tutorial-content">
              <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
            </div>
          </article>
        </main>

        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="sidebar-overlay" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real app, this would fetch all tutorial slugs from an API or database
  const paths = [
    // GCP tutorials
    { params: { category: 'gcp', slug: 'gcp-fundamentals-getting-started' } },
    { params: { category: 'gcp', slug: 'gcp-analytics-bigquery-data-studio' } },
    { params: { category: 'gcp', slug: 'gcp-data-preparation-ingestion' } },
    { params: { category: 'gcp', slug: 'gcp-data-transfer-tools' } },
    { params: { category: 'gcp', slug: 'gcp-compute-engine-vms' } },
    { params: { category: 'gcp', slug: 'gcp-cloud-storage-guide' } },
    { params: { category: 'gcp', slug: 'gcp-bigquery-analytics' } },
    { params: { category: 'gcp', slug: 'gcp-kubernetes-engine-guide' } },
    { params: { category: 'gcp', slug: 'gcp-cloud-functions-serverless' } },
    // Other tutorials
    { params: { category: 'java', slug: 'java-basics-beginners' } },
    { params: { category: 'java', slug: 'oop-java' } },
    { params: { category: 'python', slug: 'python-data-structures' } },
    { params: { category: 'javascript', slug: 'javascript-es6-features' } },
    { params: { category: 'react', slug: 'advanced-react-patterns' } },
  ];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params?.category as string;
  const tutorialSlug = params?.slug as string;
  
  // In a real app, this would fetch from an API or database
  const tutorialsData: { [key: string]: any } = {
    'gcp-fundamentals-getting-started': {
      id: '16',
      title: 'GCP Fundamentals and Getting Started',
      description: 'Introduction to Google Cloud Platform, account setup, billing, and core concepts',
      slug: 'gcp-fundamentals-getting-started',
      category: 'gcp',
      author: 'Google Cloud Expert',
      readTime: '20 min',
      difficulty: 'Beginner',
      publishedAt: '2024-11-01',
      content: `
        <h2>Welcome to Google Cloud Platform</h2>
        <p>Google Cloud Platform (GCP) is a suite of cloud computing services that provides infrastructure, platform, and software services for building, deploying, and managing applications and data.</p>
        
        <h3>Getting Started with GCP</h3>
        <p>To begin your GCP journey, you'll need to create a Google Cloud account and set up your first project.</p>
        
        <h3>Core GCP Services</h3>
        <ul>
          <li><strong>Compute Engine</strong> - Virtual machines in the cloud</li>
          <li><strong>Cloud Storage</strong> - Object storage for any amount of data</li>
          <li><strong>BigQuery</strong> - Serverless data warehouse</li>
          <li><strong>Cloud Functions</strong> - Serverless compute platform</li>
          <li><strong>Kubernetes Engine</strong> - Managed Kubernetes service</li>
        </ul>
        
        <h3>Setting Up Your First Project</h3>
        <pre><code># Install Google Cloud CLI
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize gcloud
gcloud init

# Create a new project
gcloud projects create my-first-project --name="My First Project"</code></pre>
        
        <h3>Understanding GCP Pricing</h3>
        <p>GCP offers flexible pricing models including pay-as-you-go, committed use discounts, and free tier options for getting started.</p>
        
        <h3>Next Steps</h3>
        <p>Now that you understand the basics, explore specific services like Compute Engine for virtual machines or Cloud Storage for object storage.</p>
      `,
    },
    'gcp-analytics-bigquery-data-studio': {
      id: '17',
      title: 'Google Cloud Analytics: BigQuery and Data Studio',
      description: 'Master Google Cloud\'s analytics services including BigQuery for data warehousing and Data Studio for visualization',
      slug: 'gcp-analytics-bigquery-data-studio',
      category: 'gcp',
      author: 'Data Analytics Team',
      readTime: '35 min',
      difficulty: 'Intermediate',
      publishedAt: '2024-11-03',
      content: `
        <h2>Google Cloud Analytics Overview</h2>
        <p>Google Cloud provides powerful analytics services that enable you to store, process, and analyze large datasets. This tutorial covers BigQuery and Data Studio, two key components of GCP's analytics ecosystem.</p>

        <h3>BigQuery: Serverless Data Warehouse</h3>
        <p>BigQuery is Google's fully managed, serverless data warehouse that enables scalable analysis over petabytes of data.</p>

        <h4>Key Features</h4>
        <ul>
          <li>Serverless and fully managed</li>
          <li>Real-time analytics</li>
          <li>Machine learning integration</li>
          <li>Standard SQL support</li>
          <li>Automatic scaling</li>
        </ul>

        <h4>Getting Started with BigQuery</h4>
        <ol>
          <li>Navigate to BigQuery in the GCP Console</li>
          <li>Create a new dataset</li>
          <li>Load data from various sources</li>
          <li>Write SQL queries to analyze data</li>
        </ol>

        <h4>Sample BigQuery Query</h4>
        <pre><code>SELECT 
  country,
  COUNT(*) as user_count,
  AVG(session_duration) as avg_session
FROM 
  \`project.dataset.user_sessions\`
WHERE 
  date >= '2024-01-01'
GROUP BY 
  country
ORDER BY 
  user_count DESC</code></pre>

        <h3>Data Studio: Visualization and Reporting</h3>
        <p>Google Data Studio (now Looker Studio) transforms your data into informative, easy-to-read, customizable dashboards and reports.</p>

        <h4>Key Features</h4>
        <ul>
          <li>Free to use</li>
          <li>Real-time data connections</li>
          <li>Collaborative dashboards</li>
          <li>Multiple data source connectors</li>
          <li>Interactive visualizations</li>
        </ul>

        <h4>Creating Your First Dashboard</h4>
        <ol>
          <li>Go to datastudio.google.com</li>
          <li>Click 'Create' then 'Report'</li>
          <li>Connect to BigQuery or other data sources</li>
          <li>Add charts and configure visualizations</li>
          <li>Share with stakeholders</li>
        </ol>

        <h3>Analytics Workflow</h3>
        <h4>1. Data Ingestion</h4>
        <ul>
          <li>Cloud Storage for raw data</li>
          <li>Pub/Sub for streaming data</li>
          <li>Dataflow for ETL pipelines</li>
        </ul>

        <h4>2. Data Processing</h4>
        <ul>
          <li>BigQuery for analysis</li>
          <li>Dataproc for Hadoop/Spark</li>
          <li>Cloud Functions for triggers</li>
        </ul>

        <h4>3. Visualization</h4>
        <ul>
          <li>Data Studio for dashboards</li>
          <li>Jupyter notebooks for exploration</li>
          <li>Third-party BI tools</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Partition your BigQuery tables by date</li>
          <li>Use clustering for better performance</li>
          <li>Optimize query costs with sampling</li>
          <li>Set up data governance policies</li>
          <li>Monitor query performance and costs</li>
        </ul>

        <h3>Common Use Cases</h3>
        <ul>
          <li>Web analytics and user behavior</li>
          <li>Financial reporting and forecasting</li>
          <li>Marketing campaign analysis</li>
          <li>Operational metrics monitoring</li>
          <li>Customer segmentation</li>
        </ul>
      `,
    },
    'gcp-data-preparation-ingestion': {
      id: '18',
      title: 'Data Preparation and Ingestion',
      description: 'Learn data ingestion patterns, ETL pipelines, and data preparation techniques using Google Cloud services',
      slug: 'gcp-data-preparation-ingestion',
      category: 'gcp',
      author: 'Data Engineering Team',
      readTime: '40 min',
      difficulty: 'Intermediate',
      publishedAt: '2024-11-04',
      content: `
        <h2>Data Preparation and Ingestion Overview</h2>
        <p>Data preparation and ingestion are critical first steps in any data analytics pipeline. Google Cloud provides powerful tools to collect, transform, and prepare data for analysis.</p>

        <h3>Data Ingestion Strategies</h3>
        <p>Choose the right ingestion pattern based on your data characteristics and business requirements:</p>

        <h4>Batch Ingestion</h4>
        <ul>
          <li><strong>Cloud Storage</strong> - Store files for batch processing</li>
          <li><strong>Transfer Service</strong> - Migrate data from other clouds</li>
          <li><strong>Storage Transfer Service</strong> - Scheduled data transfers</li>
          <li><strong>gsutil</strong> - Command-line data uploads</li>
        </ul>

        <h4>Streaming Ingestion</h4>
        <ul>
          <li><strong>Cloud Pub/Sub</strong> - Real-time message streaming</li>
          <li><strong>Dataflow</strong> - Stream processing pipelines</li>
          <li><strong>Cloud Functions</strong> - Event-triggered processing</li>
          <li><strong>Datastream</strong> - Change data capture from databases</li>
        </ul>

        <h3>Cloud Storage for Data Lakes</h3>
        <p>Cloud Storage serves as the foundation for data lakes, providing scalable object storage for all data types.</p>

        <h4>Storage Classes</h4>
        <ul>
          <li><strong>Standard</strong> - Frequently accessed data</li>
          <li><strong>Nearline</strong> - Monthly access patterns</li>
          <li><strong>Coldline</strong> - Quarterly access patterns</li>
          <li><strong>Archive</strong> - Long-term archival</li>
        </ul>

        <h4>Best Practices</h4>
        <pre><code># Upload data with gsutil
gsutil cp data.csv gs://my-bucket/raw-data/

# Parallel uploads for large files
gsutil -m cp -r ./dataset/ gs://my-bucket/

# Set lifecycle policies
gsutil lifecycle set lifecycle.json gs://my-bucket/</code></pre>

        <h3>ETL with Cloud Dataflow</h3>
        <p>Dataflow provides serverless data processing for both batch and streaming scenarios using Apache Beam.</p>

        <h4>Key Features</h4>
        <ul>
          <li>Serverless and fully managed</li>
          <li>Auto-scaling based on data volume</li>
          <li>Built-in monitoring and error handling</li>
          <li>Support for Java, Python, and Go</li>
        </ul>

        <h4>Sample Dataflow Pipeline</h4>
        <pre><code>from apache_beam import Pipeline
from apache_beam.io import ReadFromText, WriteToBigQuery
from apache_beam import Map, Filter

def run_pipeline():
    with Pipeline() as p:
        (p
         | 'Read CSV' >> ReadFromText('gs://bucket/input.csv')
         | 'Parse' >> Map(parse_csv)
         | 'Filter Valid' >> Filter(lambda x: x is not None)
         | 'Transform' >> Map(transform_data)
         | 'Write to BigQuery' >> WriteToBigQuery(
             'project:dataset.table',
             schema=table_schema
         ))</code></pre>

        <h3>Cloud Pub/Sub for Streaming</h3>
        <p>Pub/Sub enables real-time data streaming with guaranteed delivery and horizontal scaling.</p>

        <h4>Creating Topics and Subscriptions</h4>
        <pre><code># Create topic
gcloud pubsub topics create data-ingestion

# Create subscription
gcloud pubsub subscriptions create data-processor \\
    --topic=data-ingestion

# Publish messages
gcloud pubsub topics publish data-ingestion \\
    --message='{"user_id": 123, "event": "click"}'</code></pre>

        <h3>Data Quality and Validation</h3>
        <h4>Data Validation Techniques</h4>
        <ul>
          <li>Schema validation against predefined structures</li>
          <li>Data profiling to understand distributions</li>
          <li>Constraint checking for business rules</li>
          <li>Duplicate detection and deduplication</li>
        </ul>

        <h4>Data Preparation Steps</h4>
        <ol>
          <li><strong>Discovery</strong> - Understand data sources and formats</li>
          <li><strong>Profiling</strong> - Analyze data quality and patterns</li>
          <li><strong>Cleansing</strong> - Remove duplicates and fix errors</li>
          <li><strong>Transformation</strong> - Convert to target schema</li>
          <li><strong>Validation</strong> - Verify data meets requirements</li>
        </ol>

        <h3>Common Ingestion Patterns</h3>
        <h4>1. File-based Ingestion</h4>
        <pre><code># Batch processing with Cloud Functions
import functions_framework
from google.cloud import storage, bigquery

@functions_framework.cloud_event
def process_file(cloud_event):
    file_name = cloud_event.data['name']
    bucket_name = cloud_event.data['bucket']
    
    # Process file and load to BigQuery
    client = bigquery.Client()
    job = client.load_table_from_uri(
        f'gs://{bucket_name}/{file_name}',
        'project.dataset.table'
    )</code></pre>

        <h4>2. API-based Ingestion</h4>
        <pre><code># REST API to Pub/Sub
from flask import Flask, request
from google.cloud import pubsub_v1

app = Flask(__name__)
publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path('project', 'events')

@app.route('/events', methods=['POST'])
def ingest_event():
    data = request.get_json()
    message = json.dumps(data).encode('utf-8')
    publisher.publish(topic_path, message)
    return {'status': 'success'}</code></pre>

        <h3>Monitoring and Troubleshooting</h3>
        <ul>
          <li>Use Cloud Monitoring for pipeline metrics</li>
          <li>Set up alerting for data quality issues</li>
          <li>Implement data lineage tracking</li>
          <li>Monitor costs and optimize resources</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Design for idempotency and fault tolerance</li>
          <li>Implement proper error handling and retry logic</li>
          <li>Use partitioning and clustering for large datasets</li>
          <li>Apply data governance and security policies</li>
          <li>Optimize for cost with appropriate storage classes</li>
        </ul>
      `,
    },
    'gcp-compute-engine-vms': {
      id: '19',
      title: 'Compute Engine: Virtual Machines in the Cloud',
      description: 'Learn to create, configure, and manage virtual machines on Google Compute Engine',
      slug: 'gcp-compute-engine-vms',
      category: 'gcp',
      author: 'Cloud Infrastructure Team',
      readTime: '30 min',
      difficulty: 'Beginner',
      publishedAt: '2024-11-02',
      content: `
        <h2>Google Compute Engine Overview</h2>
        <p>Google Compute Engine provides scalable, high-performance virtual machines running in Google's data centers.</p>
        
        <h3>Creating Your First VM Instance</h3>
        <p>You can create VM instances using the Google Cloud Console, gcloud CLI, or REST API.</p>
        
        <pre><code># Create a VM instance using gcloud CLI
gcloud compute instances create my-vm \\
    --zone=us-central1-a \\
    --machine-type=e2-medium \\
    --subnet=default \\
    --network-tier=PREMIUM \\
    --image=ubuntu-2004-focal-v20231101 \\
    --image-project=ubuntu-os-cloud \\
    --boot-disk-size=10GB \\
    --boot-disk-type=pd-standard</code></pre>
        
        <h3>Machine Types and Sizing</h3>
        <ul>
          <li><strong>E2</strong> - Cost-optimized instances for everyday workloads</li>
          <li><strong>N2</strong> - Balanced instances for general-purpose workloads</li>
          <li><strong>C2</strong> - Compute-optimized instances for compute-intensive workloads</li>
          <li><strong>M2</strong> - Memory-optimized instances for memory-intensive workloads</li>
        </ul>
        
        <h3>Connecting to Your VM</h3>
        <pre><code># SSH into your VM instance
gcloud compute ssh my-vm --zone=us-central1-a

# Or using external IP
ssh username@EXTERNAL_IP</code></pre>
        
        <h3>Managing VM Lifecycle</h3>
        <p>Learn how to start, stop, restart, and delete VM instances to optimize costs and performance.</p>
      `,
    },
    'gcp-bigquery-analytics': {
      id: '19',
      title: 'BigQuery: Analytics and Data Warehousing',
      description: 'Learn BigQuery for massive-scale analytics, SQL queries, and data warehousing solutions',
      slug: 'gcp-bigquery-analytics',
      category: 'gcp',
      author: 'Data Analytics Team',
      readTime: '35 min',
      difficulty: 'Intermediate',
      publishedAt: '2024-11-04',
      content: `
        <h2>Introduction to Google BigQuery</h2>
        <p>BigQuery is Google Cloud's fully managed, serverless data warehouse that enables super-fast SQL queries using the processing power of Google's infrastructure.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Serverless architecture - no infrastructure to manage</li>
          <li>Petabyte-scale analytics</li>
          <li>Standard SQL support</li>
          <li>Real-time analytics</li>
          <li>Machine learning integration</li>
        </ul>
        
        <h3>Your First BigQuery Query</h3>
        <pre><code>-- Query public dataset
SELECT 
  name, 
  SUM(number) as total_births
FROM \`bigquery-public-data.usa_names.usa_1910_2013\` 
WHERE state = 'CA' 
GROUP BY name 
ORDER BY total_births DESC 
LIMIT 10;</code></pre>
        
        <h3>Loading Data into BigQuery</h3>
        <pre><code># Load CSV data using bq command-line tool
bq load \\
  --source_format=CSV \\
  --skip_leading_rows=1 \\
  my_dataset.my_table \\
  gs://my-bucket/data.csv \\
  name:STRING,age:INTEGER,city:STRING</code></pre>
        
        <h3>Advanced Analytics with SQL</h3>
        <p>BigQuery supports advanced SQL features including window functions, arrays, structs, and user-defined functions.</p>
        
        <h3>Cost Optimization</h3>
        <p>Learn about slot-based pricing, partitioning, clustering, and query optimization techniques to control costs.</p>
      `,
    },
    'gcp-data-preparation-ingestion': {
      id: '18',
      title: 'Data Preparation and Ingestion',
      description: 'Learn data ingestion patterns, ETL pipelines, and data preparation techniques using Google Cloud services',
      slug: 'gcp-data-preparation-ingestion',
      category: 'gcp',
      author: 'Data Engineering Team',
      readTime: '40 min',
      difficulty: 'Intermediate',
      publishedAt: '2024-11-04',
      content: `
        <h2>Data Preparation and Ingestion Overview</h2>
        <p>Data preparation and ingestion are critical first steps in any data analytics pipeline. Google Cloud provides powerful tools to collect, transform, and prepare data for analysis.</p>

        <h3>Data Manipulation Methods</h3>
        <p>Understanding different data manipulation approaches is crucial for designing effective data pipelines:</p>

        <h4>1. ETL (Extract, Transform, Load)</h4>
        <ul>
          <li><strong>Extract:</strong> Data is pulled from various source systems (databases, APIs, files)</li>
          <li><strong>Transform:</strong> Data is cleaned, validated, and transformed in a staging area before loading</li>
          <li><strong>Load:</strong> Processed data is loaded into the target data warehouse or system</li>
          <li><strong>Best for:</strong> Traditional data warehousing with structured data and complex transformations</li>
          <li><strong>Tools:</strong> Cloud Dataflow, Cloud Data Fusion, traditional ETL tools</li>
          <li><strong>Advantages:</strong> Data validation before loading, consistent data quality, optimized for analytics</li>
        </ul>

        <h4>2. ELT (Extract, Load, Transform)</h4>
        <ul>
          <li><strong>Extract:</strong> Raw data is extracted from source systems</li>
          <li><strong>Load:</strong> Data is loaded directly into the target system (usually a data lake or modern warehouse)</li>
          <li><strong>Transform:</strong> Transformations are performed within the target system using its processing power</li>
          <li><strong>Best for:</strong> Big data scenarios, cloud-native architectures, schema-on-read approaches</li>
          <li><strong>Tools:</strong> BigQuery, Cloud Storage + Dataproc, dbt (data build tool)</li>
          <li><strong>Advantages:</strong> Faster initial data availability, leverages target system compute, flexible transformations</li>
        </ul>

        <h4>3. ETLT (Extract, Transform, Load, Transform)</h4>
        <ul>
          <li><strong>Extract:</strong> Data is extracted from source systems</li>
          <li><strong>Transform (1st):</strong> Basic transformations and data cleansing during extraction</li>
          <li><strong>Load:</strong> Data is loaded into the target system</li>
          <li><strong>Transform (2nd):</strong> Additional transformations performed in the target system for specific use cases</li>
          <li><strong>Best for:</strong> Hybrid scenarios requiring both pre-load and post-load transformations</li>
          <li><strong>Tools:</strong> Combination of Dataflow (pre-load) + BigQuery (post-load transformations)</li>
          <li><strong>Advantages:</strong> Combines benefits of both ETL and ELT, supports multiple consumer requirements</li>
        </ul>

        <h3>Comparison Table: ETL vs ELT vs ETLT</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Aspect</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">ETL</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">ELT</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">ETLT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Process Order</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Extract → Transform → Load</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Extract → Load → Transform</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Extract → Transform → Load → Transform</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Data Processing Location</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Staging area/ETL server</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Target system (warehouse/lake)</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Both staging area & target system</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Data Quality Control</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">High - validated before loading</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Medium - validated after loading</td>
              <td style="border: 1px solid #ddd; padding: 12px;">High - multiple validation points</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Data Availability</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Slower - after transformation</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Faster - immediate after loading</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Phased - basic then enhanced data</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Storage Requirements</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Lower - only final data stored</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Higher - raw + transformed data</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Medium - optimized storage usage</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Processing Power</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Dedicated ETL infrastructure</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Leverages target system compute</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Distributed across systems</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Flexibility</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Lower - schema must be predefined</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Higher - schema-on-read support</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Highest - supports multiple schemas</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Best Use Cases</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Structured data, compliance-heavy</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Big data, cloud-native, exploratory</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Multiple consumers, hybrid scenarios</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>GCP Tools</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Dataflow, Cloud Data Fusion</td>
              <td style="border: 1px solid #ddd; padding: 12px;">BigQuery, Cloud Storage + SQL</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Dataflow + BigQuery combination</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Complexity</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Medium - traditional approach</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Lower - simplified pipeline</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Higher - multiple transformation stages</td>
            </tr>
          </tbody>
        </table>

        <h3>Data Ingestion Strategies</h3>
        <p>Choose the right ingestion pattern based on your data characteristics and business requirements:</p>

        <h4>Batch Ingestion</h4>
        <ul>
          <li><strong>Cloud Storage</strong> - Store files for batch processing</li>
          <li><strong>Transfer Service</strong> - Migrate data from other clouds</li>
          <li><strong>Storage Transfer Service</strong> - Scheduled data transfers</li>
          <li><strong>gsutil</strong> - Command-line data uploads</li>
        </ul>

        <h4>Streaming Ingestion</h4>
        <ul>
          <li><strong>Cloud Pub/Sub</strong> - Real-time message streaming</li>
          <li><strong>Dataflow</strong> - Stream processing pipelines</li>
          <li><strong>Cloud Functions</strong> - Event-triggered processing</li>
          <li><strong>Datastream</strong> - Change data capture from databases</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li>Design for idempotency and fault tolerance</li>
          <li>Implement proper error handling and retry logic</li>
          <li>Use partitioning and clustering for large datasets</li>
          <li>Apply data governance and security policies</li>
          <li>Optimize for cost with appropriate storage classes</li>
        </ul>
      `,
    },
    'gcp-data-transfer-tools': {
      id: '19',
      title: 'Data Transfer Tools',
      description: 'Comprehensive guide to Google Cloud data transfer services including Transfer Service, Database Migration Service, and more',
      slug: 'gcp-data-transfer-tools',
      category: 'gcp',
      author: 'Data Migration Team',
      readTime: '45 min',
      difficulty: 'Intermediate',
      publishedAt: '2024-11-05',
      content: `
        <h2>Google Cloud Data Transfer Tools Overview</h2>
        <p>Google Cloud Platform provides a comprehensive suite of data transfer tools designed to help you migrate, synchronize, and move data efficiently across different environments and platforms.</p>

        <h3>Transfer Service for On-premises Data</h3>
        <p>Transfer Service for on-premises data enables you to transfer large amounts of data from your on-premises environment to Google Cloud Storage.</p>

        <h4>Key Features</h4>
        <ul>
          <li>High-performance parallel transfers</li>
          <li>Bandwidth throttling and scheduling</li>
          <li>Automatic retry and error handling</li>
          <li>Progress monitoring and logging</li>
          <li>Support for various file systems</li>
        </ul>

        <h4>Setting Up Transfer Service</h4>
        <pre><code># Install the transfer service agent
curl -O https://dl.google.com/transfer-service/latest/transfer_service_agent_linux.tar.gz
tar -xzf transfer_service_agent_linux.tar.gz

# Configure the agent
./transfer_service_agent \\
  --project-id=my-project \\
  --agent-id=my-agent \\
  --enable-multipart \\
  --creds-file=service-account.json</code></pre>

        <h3>Storage Transfer Service</h3>
        <p>Storage Transfer Service helps you move data from external sources like AWS S3, HTTP/HTTPS locations, or other Google Cloud Storage buckets.</p>

        <h4>Supported Source Types</h4>
        <ul>
          <li><strong>Amazon S3:</strong> Direct migration from AWS S3 buckets</li>
          <li><strong>HTTP/HTTPS:</strong> Transfer from web-accessible locations</li>
          <li><strong>Google Cloud Storage:</strong> Cross-bucket or cross-project transfers</li>
          <li><strong>Azure Blob Storage:</strong> Migration from Microsoft Azure</li>
        </ul>

        <h3>Database Migration Service</h3>
        <p>Database Migration Service provides serverless, minimal downtime migrations from MySQL, PostgreSQL, and SQL Server to Cloud SQL.</p>

        <h4>Supported Migration Paths</h4>
        <ul>
          <li><strong>MySQL to Cloud SQL for MySQL</strong></li>
          <li><strong>PostgreSQL to Cloud SQL for PostgreSQL</strong></li>
          <li><strong>SQL Server to Cloud SQL for SQL Server</strong></li>
          <li><strong>Oracle to Cloud SQL for PostgreSQL</strong> (via conversion)</li>
        </ul>

        <h3>BigQuery Data Transfer Service</h3>
        <p>BigQuery Data Transfer Service automates data movement from various sources into BigQuery on a scheduled, managed basis. It eliminates the need to write custom ETL pipelines for common data sources.</p>

        <h4>Supported Data Sources</h4>
        <ul>
          <li><strong>Google Software as a Service (SaaS):</strong>
            <ul>
              <li>Google Ads (formerly AdWords)</li>
              <li>Campaign Manager 360</li>
              <li>Display & Video 360</li>
              <li>Search Ads 360</li>
              <li>Google Ad Manager</li>
              <li>YouTube Channel reports</li>
              <li>YouTube Content Owner reports</li>
            </ul>
          </li>
          <li><strong>External Data Warehouses:</strong>
            <ul>
              <li>Amazon S3</li>
              <li>Teradata</li>
              <li>Amazon Redshift</li>
            </ul>
          </li>
          <li><strong>Other Google Services:</strong>
            <ul>
              <li>Cloud Storage</li>
              <li>Google Merchant Center</li>
              <li>Google Play Console</li>
            </ul>
          </li>
        </ul>

        <h4>Key Features</h4>
        <ul>
          <li><strong>Automated Scheduling:</strong> Set up recurring transfers with flexible scheduling</li>
          <li><strong>Managed Service:</strong> No infrastructure to maintain or monitor</li>
          <li><strong>Data Validation:</strong> Automatic data quality checks and error reporting</li>
          <li><strong>Incremental Updates:</strong> Transfer only new or changed data</li>
          <li><strong>Schema Management:</strong> Automatic schema detection and evolution</li>
          <li><strong>Notifications:</strong> Email alerts for transfer success/failure</li>
          <li><strong>Retry Logic:</strong> Automatic retry on transient failures</li>
        </ul>

        <h4>Setting Up BigQuery Data Transfer</h4>
        <h5>1. Using Google Cloud Console</h5>
        <pre><code># Navigate to BigQuery Data Transfer in Cloud Console
# 1. Go to BigQuery > Data Transfer
# 2. Click "Create Transfer"
# 3. Select data source (e.g., Google Ads)
# 4. Configure connection and authentication
# 5. Set schedule and destination dataset</code></pre>

        <h5>2. Using gcloud CLI</h5>
        <pre><code># Create a Google Ads transfer
gcloud alpha bq transfers create \\
    --data-source=adwords \\
    --display-name="Google Ads Transfer" \\
    --target-dataset=my_ads_dataset \\
    --schedule="every day 02:00" \\
    --params='{
        "customer_id": "123-456-7890",
        "login_customer_id": "123-456-7890"
    }'

# Create an S3 transfer
gcloud alpha bq transfers create \\
    --data-source=amazon_s3 \\
    --display-name="S3 Data Transfer" \\
    --target-dataset=my_s3_dataset \\
    --schedule="every 6 hours" \\
    --params='{
        "data_path": "s3://my-bucket/data/",
        "access_key_id": "ACCESS_KEY",
        "secret_access_key": "SECRET_KEY",
        "file_format": "CSV"
    }'</code></pre>

        <h5>3. Using BigQuery API</h5>
        <pre><code>from google.cloud import bigquery_datatransfer

# Initialize the client
client = bigquery_datatransfer.DataTransferServiceClient()
project_id = "my-project"
location = "US"

# Configure transfer
transfer_config = {
    "display_name": "Google Ads Daily Transfer",
    "data_source_id": "adwords",
    "destination_dataset_id": "ads_data",
    "schedule": "every day 02:00",
    "params": {
        "customer_id": "123-456-7890",
        "login_customer_id": "123-456-7890"
    }
}

# Create the transfer
parent = client.common_location_path(project_id, location)
response = client.create_transfer_config(
    parent=parent, 
    transfer_config=transfer_config
)</code></pre>

        <h4>Transfer Configuration Parameters</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Data Source</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Key Parameters</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Schedule Options</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Data Freshness</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Google Ads</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">customer_id, login_customer_id</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Daily, Weekly</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Previous day data</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Amazon S3</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">data_path, access_key_id, file_format</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Hourly, Daily, Weekly</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Near real-time</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Cloud Storage</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">data_path_template, file_format</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Every 15 min to Monthly</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Real-time</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Teradata</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">connection_id, query, write_disposition</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Daily, Weekly</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Depends on source query</td>
            </tr>
          </tbody>
        </table>

        <h4>Monitoring and Management</h4>
        <h5>Transfer Run Monitoring</h5>
        <pre><code># List transfer configurations
gcloud alpha bq transfers list --location=US

# Get transfer run details
gcloud alpha bq transfers runs describe RUN_ID \\
    --location=US \\
    --transfer-config=CONFIG_ID

# List recent runs for a transfer
gcloud alpha bq transfers runs list \\
    --location=US \\
    --transfer-config=CONFIG_ID \\
    --max-results=10</code></pre>

        <h5>Error Handling and Notifications</h5>
        <pre><code># Set up Pub/Sub notifications for transfer events
gcloud alpha bq transfers update CONFIG_ID \\
    --location=US \\
    --notification-pubsub-topic=projects/PROJECT_ID/topics/TOPIC_NAME

# Python script to handle transfer notifications
import json
from google.cloud import pubsub_v1

def handle_transfer_notification(message):
    data = json.loads(message.data.decode('utf-8'))
    
    if data['eventType'] == 'TRANSFER_RUN_FINISHED':
        if data['transferRun']['state'] == 'SUCCEEDED':
            print(f"Transfer {data['transferRun']['name']} completed successfully")
        else:
            print(f"Transfer {data['transferRun']['name']} failed: {data['transferRun']['errorStatus']}")
    
    message.ack()</code></pre>

        <h4>Advanced Features</h4>
        <h5>1. Custom Queries for External Sources</h5>
        <pre><code># Teradata custom query example
{
    "query": "SELECT customer_id, order_date, revenue FROM sales WHERE order_date >= DATE '2024-01-01'",
    "write_disposition": "WRITE_APPEND"
}</code></pre>

        <h5>2. Data Transformation During Transfer</h5>
        <pre><code># Cloud Storage with schema and transformations
{
    "data_path_template": "gs://my-bucket/sales/{run_date}/*.csv",
    "file_format": "CSV",
    "skip_leading_rows": 1,
    "schema_update_options": ["ALLOW_FIELD_ADDITION"],
    "destination_table_name_template": "sales_{run_date}"
}</code></pre>

        <h5>3. Partitioned Table Management</h5>
        <pre><code># Transfer to time-partitioned tables
{
    "destination_table_name_template": "events_{run_date}",
    "write_disposition": "WRITE_TRUNCATE",
    "create_disposition": "CREATE_IF_NEEDED"
}</code></pre>

        <h4>Cost Optimization</h4>
        <ul>
          <li><strong>Scheduling:</strong> Run transfers during off-peak hours</li>
          <li><strong>Incremental Loading:</strong> Use WRITE_APPEND for new data only</li>
          <li><strong>Data Filtering:</strong> Apply filters at source to reduce transfer volume</li>
          <li><strong>Compression:</strong> Use compressed file formats (GZIP, Snappy)</li>
          <li><strong>Partitioning:</strong> Leverage table partitioning for better performance</li>
        </ul>

        <h4>Best Practices for BigQuery Data Transfer</h4>
        <ul>
          <li><strong>Authentication:</strong> Use service accounts with minimal required permissions</li>
          <li><strong>Error Handling:</strong> Set up monitoring and alerting for failed transfers</li>
          <li><strong>Data Quality:</strong> Implement validation checks in destination tables</li>
          <li><strong>Documentation:</strong> Maintain clear documentation of transfer configurations</li>
          <li><strong>Testing:</strong> Test transfers with small datasets before production</li>
          <li><strong>Backup Strategy:</strong> Maintain backup of source data and transfer configurations</li>
        </ul>

        <h3>Transfer Appliance: Offline Data Transfer</h3>
        <p>Transfer Appliance is Google Cloud's offline data transfer solution for securely migrating large datasets (petabytes) when online transfer isn't feasible due to time, cost, or bandwidth constraints.</p>

        <h4>When to Use Transfer Appliance</h4>
        <ul>
          <li><strong>Large Data Volumes:</strong> Datasets larger than 20TB that would take weeks to transfer online</li>
          <li><strong>Limited Bandwidth:</strong> Network constraints make online transfer impractical</li>
          <li><strong>Cost Considerations:</strong> Offline transfer is more cost-effective than bandwidth costs</li>
          <li><strong>Time-Sensitive Migrations:</strong> Faster than online transfer for massive datasets</li>
          <li><strong>Remote Locations:</strong> Areas with poor or expensive internet connectivity</li>
        </ul>

        <h4>Transfer Appliance Options</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Appliance Type</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Capacity</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Use Case</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Form Factor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>TA40</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">40TB usable</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Medium datasets, single location</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Portable device</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>TA300</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">300TB usable</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Large datasets, data center deployment</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Rack-mounted server</td>
            </tr>
          </tbody>
        </table>

        <h4>Transfer Appliance Process</h4>
        <ol>
          <li><strong>Order and Setup</strong>
            <ul>
              <li>Request Transfer Appliance through Google Cloud Console</li>
              <li>Receive and configure the appliance in your data center</li>
              <li>Connect to your network and configure security settings</li>
            </ul>
          </li>
          <li><strong>Data Copy</strong>
            <ul>
              <li>Use provided software to copy data to the appliance</li>
              <li>Data is encrypted during transfer and at rest</li>
              <li>Monitor copy progress and verify data integrity</li>
            </ul>
          </li>
          <li><strong>Shipping and Processing</strong>
            <ul>
              <li>Ship the appliance back to Google using provided shipping materials</li>
              <li>Google uploads data to your designated Cloud Storage bucket</li>
              <li>Receive notification when upload is complete</li>
            </ul>
          </li>
          <li><strong>Verification and Cleanup</strong>
            <ul>
              <li>Verify transferred data in Cloud Storage</li>
              <li>Google securely wipes the appliance</li>
              <li>Process typically takes 2-3 weeks total</li>
            </ul>
          </li>
        </ol>

        <h4>Transfer Appliance Features</h4>
        <ul>
          <li><strong>High-Speed Transfer:</strong> 1GB/s sustained transfer rate</li>
          <li><strong>Enterprise Security:</strong> 256-bit AES encryption, tamper-evident design</li>
          <li><strong>Data Integrity:</strong> Built-in checksums and verification</li>
          <li><strong>Network Connectivity:</strong> Multiple 10GbE and 40GbE ports</li>
          <li><strong>Monitoring:</strong> Real-time transfer progress and health monitoring</li>
          <li><strong>Compliance:</strong> Meets various security and compliance standards</li>
        </ul>

        <h4>Setting Up Transfer Appliance</h4>
        <pre><code># Example configuration commands (run on appliance)
# Configure network settings
sudo configure-network --ip=192.168.1.100 --netmask=255.255.255.0 --gateway=192.168.1.1

# Create transfer job
transfer-appliance create-job \\
    --source-path=/mnt/source-data \\
    --manifest-file=transfer-manifest.json \\
    --encryption-key-file=encryption.key

# Start data copy
transfer-appliance start-copy --job-id=job-12345 --parallel-streams=8

# Monitor progress
transfer-appliance status --job-id=job-12345</code></pre>

        <h4>Cost Considerations</h4>
        <ul>
          <li><strong>Appliance Rental:</strong> Fixed cost per appliance per month</li>
          <li><strong>Shipping:</strong> Included in both directions</li>
          <li><strong>Data Processing:</strong> No charge for uploading data to Cloud Storage</li>
          <li><strong>Storage Costs:</strong> Standard Cloud Storage pricing applies after transfer</li>
        </ul>

        <h4>Transfer Appliance vs Other Methods</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Method</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Best for Data Size</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Transfer Time (100TB)</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Network Required</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>gsutil</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">< 1TB</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Days to weeks</td>
              <td style="border: 1px solid #ddd; padding: 12px;">High bandwidth internet</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Storage Transfer Service</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">1TB - 20TB</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Hours to days</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Cloud-to-cloud transfer</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Transfer Appliance</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">> 20TB</td>
              <td style="border: 1px solid #ddd; padding: 12px;">2-3 weeks total</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Minimal (for setup only)</td>
            </tr>
          </tbody>
        </table>

        <h3>Best Practices for Data Transfers</h3>
        <ul>
          <li>Use parallel transfers for large datasets</li>
          <li>Compress data when appropriate</li>
          <li>Choose optimal region for reduced latency</li>
          <li>Monitor transfer progress and bottlenecks</li>
          <li>Implement proper error handling and retry logic</li>
          <li><strong>For Transfer Appliance:</strong> Plan data organization before copying</li>
          <li><strong>For Transfer Appliance:</strong> Test with small datasets first</li>
          <li><strong>For Transfer Appliance:</strong> Ensure adequate power and cooling in data center</li>
        </ul>
      `,
    },
    'java-basics-beginners': {
      id: '1',
      title: 'Java Basics for Beginners',
      description: 'Learn the fundamentals of Java programming language',
      slug: 'java-basics-beginners',
      category: 'java',
      author: 'John Doe',
      readTime: '15 min',
      difficulty: 'Beginner',
      publishedAt: '2024-01-15',
      content: `
        <h2>Introduction to Java</h2>
        <p>Java is a popular programming language used for building applications across various platforms.</p>
        
        <h3>What is Java?</h3>
        <p>Java is an object-oriented programming language that was developed by Sun Microsystems in 1995.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Platform independent</li>
          <li>Object-oriented</li>
          <li>Secure</li>
          <li>Robust</li>
        </ul>
        
        <h3>Your First Java Program</h3>
        <pre><code>public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}</code></pre>
        
        <p>This simple program demonstrates the basic structure of a Java application.</p>
      `,
    },
    'oop-java': {
      id: '2',
      title: 'Object-Oriented Programming in Java',
      description: 'Understanding classes, objects, and inheritance in Java',
      slug: 'oop-java',
      category: 'java',
      author: 'John Doe',
      readTime: '25 min',
      difficulty: 'Intermediate',
      publishedAt: '2024-01-20',
      content: `
        <h2>Object-Oriented Programming Concepts</h2>
        <p>Java is built around four main OOP principles: Encapsulation, Inheritance, Polymorphism, and Abstraction.</p>
        
        <h3>Classes and Objects</h3>
        <p>A class is a blueprint for creating objects.</p>
        
        <pre><code>class Car {
    private String brand;
    private String model;
    
    public Car(String brand, String model) {
        this.brand = brand;
        this.model = model;
    }
    
    public void start() {
        System.out.println("The " + brand + " " + model + " is starting...");
    }
}</code></pre>
      `,
    },
    'gcp-data-file-formats': {
      id: '20',
      title: 'Data File Formats in Google Cloud',
      description: 'Comprehensive guide to data file formats for GCP services including structured, semi-structured, and unstructured formats',
      slug: 'gcp-data-file-formats',
      category: 'gcp',
      author: 'GCP Expert',
      readTime: '20 min',
      difficulty: 'Intermediate',
      publishedAt: '2024-01-20',
      content: `
        <h2>Data File Formats in Google Cloud</h2>
        <p>Understanding different data file formats is crucial for efficient data storage, processing, and analytics in Google Cloud Platform. This guide covers the most commonly used formats and their optimal use cases.</p>

        <h3>1. Structured Data Formats</h3>
        <p>Structured data formats organize information in a predictable, schema-defined manner, making them ideal for traditional database operations and analytics.</p>

        <h4>CSV (Comma-Separated Values)</h4>
        <p><strong>Use Cases:</strong> Simple data export/import, spreadsheet integration, basic analytics</p>
        <p><strong>GCP Services:</strong> BigQuery, Cloud Storage, Dataflow, Data Fusion</p>
        <ul>
          <li><strong>Advantages:</strong> Human-readable, widely supported, simple structure</li>
          <li><strong>Disadvantages:</strong> No data type information, larger file sizes, parsing overhead</li>
          <li><strong>Best Practices:</strong> Use headers, handle special characters, consider compression</li>
        </ul>

        <pre><code># Example CSV structure
customer_id,name,email,signup_date,premium_user
1001,John Doe,john.doe@email.com,2024-01-15,true
1002,Jane Smith,jane.smith@email.com,2024-01-16,false</code></pre>

        <h4>Parquet</h4>
        <p><strong>Use Cases:</strong> Analytics workloads, data warehousing, columnar analytics</p>
        <p><strong>GCP Services:</strong> BigQuery, Dataflow, Dataproc, Cloud Storage</p>
        <ul>
          <li><strong>Advantages:</strong> Columnar storage, excellent compression, schema preservation</li>
          <li><strong>Disadvantages:</strong> Not human-readable, requires specialized tools</li>
          <li><strong>Performance:</strong> Up to 75% smaller than CSV, 10x faster queries</li>
        </ul>

        <pre><code># Creating Parquet files in Python
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

# Create DataFrame
df = pd.DataFrame({
    'customer_id': [1001, 1002, 1003],
    'revenue': [150.75, 89.50, 203.25],
    'signup_date': pd.to_datetime(['2024-01-15', '2024-01-16', '2024-01-17'])
})

# Write to Parquet
df.to_parquet('customers.parquet', compression='snappy')</code></pre>

        <h4>Avro</h4>
        <p><strong>Use Cases:</strong> Schema evolution, streaming data, cross-language compatibility</p>
        <p><strong>GCP Services:</strong> Pub/Sub, Dataflow, BigQuery, Cloud Storage</p>
        <ul>
          <li><strong>Advantages:</strong> Schema evolution support, compact binary format, fast serialization</li>
          <li><strong>Disadvantages:</strong> More complex than CSV, requires schema definition</li>
          <li><strong>Schema Evolution:</strong> Backward and forward compatibility</li>
        </ul>

        <pre><code># Example Avro schema
{
  "type": "record",
  "name": "Customer",
  "fields": [
    {"name": "customer_id", "type": "long"},
    {"name": "name", "type": "string"},
    {"name": "email", "type": "string"},
    {"name": "signup_date", "type": {"type": "long", "logicalType": "timestamp-millis"}},
    {"name": "premium_user", "type": "boolean"}
  ]
}</code></pre>

        <h3>2. Semi-Structured Data Formats</h3>
        <p>Semi-structured formats provide flexibility while maintaining some organizational structure, ideal for modern web applications and APIs.</p>

        <h4>JSON (JavaScript Object Notation)</h4>
        <p><strong>Use Cases:</strong> API responses, configuration files, document storage, web applications</p>
        <p><strong>GCP Services:</strong> Firestore, BigQuery, Cloud Functions, App Engine</p>
        <ul>
          <li><strong>Advantages:</strong> Human-readable, flexible schema, web-native</li>
          <li><strong>Disadvantages:</strong> Verbose, no built-in compression, parsing overhead</li>
          <li><strong>BigQuery Support:</strong> Native JSON column type, SQL JSON functions</li>
        </ul>

        <pre><code># Example JSON structure
{
  "customer_id": 1001,
  "profile": {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "preferences": {
      "newsletter": true,
      "notifications": false
    }
  },
  "orders": [
    {
      "order_id": "ORD-2024-001",
      "amount": 150.75,
      "items": ["laptop", "mouse"]
    }
  ]
}</code></pre>

        <h4>JSON Lines (JSONL/NDJSON)</h4>
        <p><strong>Use Cases:</strong> Streaming data, log files, batch processing</p>
        <p><strong>GCP Services:</strong> BigQuery, Dataflow, Cloud Logging</p>
        <ul>
          <li><strong>Advantages:</strong> Streamable, easy to append, processing-friendly</li>
          <li><strong>Disadvantages:</strong> Less human-readable than regular JSON</li>
          <li><strong>Processing:</strong> Line-by-line processing, parallel-friendly</li>
        </ul>

        <pre><code># Example JSONL file content
{"customer_id": 1001, "name": "John Doe", "signup_date": "2024-01-15"}
{"customer_id": 1002, "name": "Jane Smith", "signup_date": "2024-01-16"}
{"customer_id": 1003, "name": "Bob Wilson", "signup_date": "2024-01-17"}</code></pre>

        <h3>3. Unstructured Data Formats</h3>
        <p>Unstructured formats handle diverse content types without predefined schemas, suitable for multimedia and document storage.</p>

        <h4>Text Files</h4>
        <p><strong>Use Cases:</strong> Logs, documents, raw text processing, NLP workflows</p>
        <p><strong>GCP Services:</strong> Cloud Storage, Natural Language AI, Document AI</p>
        <ul>
          <li><strong>Advantages:</strong> Simple, universal compatibility, human-readable</li>
          <li><strong>Disadvantages:</strong> No structure, difficult to query, large sizes</li>
          <li><strong>Processing:</strong> Text analytics, sentiment analysis, document parsing</li>
        </ul>

        <h4>Binary Formats</h4>
        <p><strong>Use Cases:</strong> Images, videos, audio files, compiled data</p>
        <p><strong>GCP Services:</strong> Cloud Storage, Vision AI, Video AI, Cloud CDN</p>
        <ul>
          <li><strong>Advantages:</strong> Efficient storage, specialized processing</li>
          <li><strong>Disadvantages:</strong> Requires specialized tools, not human-readable</li>
          <li><strong>AI Integration:</strong> Direct processing with GCP AI services</li>
        </ul>

        <h3>Format Comparison Table</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Format</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Storage Efficiency</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Query Performance</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Schema Support</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Best Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>CSV</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Low</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Moderate</td>
              <td style="border: 1px solid #ddd; padding: 12px;">None</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Simple data exchange</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Parquet</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">High</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Excellent</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Strong</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Analytics workloads</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>Avro</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">High</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Good</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Evolution</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Streaming data</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>JSON</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Low</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Moderate</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Flexible</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Web applications</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px;"><strong>JSONL</strong></td>
              <td style="border: 1px solid #ddd; padding: 12px;">Low</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Good</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Flexible</td>
              <td style="border: 1px solid #ddd; padding: 12px;">Log processing</td>
            </tr>
          </tbody>
        </table>

        <h3>GCP Service Integration</h3>

        <h4>BigQuery Format Support</h4>
        <ul>
          <li><strong>Native Support:</strong> CSV, JSON, Avro, Parquet, ORC</li>
          <li><strong>External Tables:</strong> Cloud Storage files without import</li>
          <li><strong>Federated Queries:</strong> Query data in place</li>
          <li><strong>Automatic Schema Detection:</strong> For JSON and CSV files</li>
        </ul>

        <pre><code># BigQuery external table creation
CREATE OR REPLACE EXTERNAL TABLE \`project.dataset.external_table\`
OPTIONS (
  format = 'PARQUET',
  uris = ['gs://bucket/path/data/*.parquet']
);</code></pre>

        <h4>Cloud Storage Optimization</h4>
        <ul>
          <li><strong>Compression:</strong> GZIP, Snappy, LZO support</li>
          <li><strong>Object Lifecycle:</strong> Automatic format conversion</li>
          <li><strong>Regional Storage:</strong> Co-locate data with compute</li>
          <li><strong>Multi-regional:</strong> For global access patterns</li>
        </ul>

        <h4>Dataflow Processing Patterns</h4>
        <pre><code># Apache Beam format transformation
import apache_beam as beam
from apache_beam.io import ReadFromText, WriteToParquet

def convert_csv_to_parquet():
    with beam.Pipeline() as pipeline:
        (pipeline 
         | 'Read CSV' >> ReadFromText('gs://bucket/input/*.csv')
         | 'Parse CSV' >> beam.Map(parse_csv_line)
         | 'Convert to Records' >> beam.Map(create_record)
         | 'Write Parquet' >> WriteToParquet('gs://bucket/output/'))
</code></pre>

        <h3>Performance Optimization Guidelines</h3>

        <h4>1. Choose the Right Format</h4>
        <ul>
          <li><strong>Analytics Workloads:</strong> Use Parquet for columnar analysis</li>
          <li><strong>Streaming Data:</strong> Use Avro for schema evolution</li>
          <li><strong>Web Applications:</strong> Use JSON for flexibility</li>
          <li><strong>Simple Exchange:</strong> Use CSV for basic requirements</li>
        </ul>

        <h4>2. Compression Strategies</h4>
        <ul>
          <li><strong>Parquet:</strong> Snappy for speed, GZIP for size</li>
          <li><strong>Avro:</strong> Deflate or Snappy compression</li>
          <li><strong>JSON:</strong> GZIP compression for storage</li>
          <li><strong>CSV:</strong> GZIP compression, consider Parquet conversion</li>
        </ul>

        <h4>3. Partitioning Strategies</h4>
        <ul>
          <li><strong>Time-based:</strong> Daily/monthly partitions for time-series data</li>
          <li><strong>Geographic:</strong> Region-based partitions for location data</li>
          <li><strong>Categorical:</strong> Department/category-based partitions</li>
          <li><strong>Size-based:</strong> Keep partitions between 1GB-10GB</li>
        </ul>

        <h3>Migration and Conversion Strategies</h3>

        <h4>CSV to Parquet Migration</h4>
        <pre><code># Using pandas for conversion
import pandas as pd

def convert_csv_to_parquet(csv_path, parquet_path):
    # Read CSV with appropriate data types
    df = pd.read_csv(csv_path, 
                    dtype={'customer_id': 'int64', 
                           'revenue': 'float64'},
                    parse_dates=['signup_date'])
    
    # Write to Parquet with compression
    df.to_parquet(parquet_path, 
                  compression='snappy',
                  index=False)
    
    print(f"Converted {csv_path} to {parquet_path}")
</code></pre>

        <h4>JSON to BigQuery Schema</h4>
        <pre><code># Automatic schema detection for JSON
bq load --source_format=NEWLINE_DELIMITED_JSON \\
        --autodetect \\
        dataset.table_name \\
        gs://bucket/data.jsonl
</code></pre>

        <h3>Best Practices Summary</h3>
        <ul>
          <li><strong>Format Selection:</strong> Choose based on use case, not convenience</li>
          <li><strong>Compression:</strong> Always compress data in Cloud Storage</li>
          <li><strong>Schema Management:</strong> Plan for schema evolution early</li>
          <li><strong>File Sizes:</strong> Aim for 100MB-1GB files for optimal processing</li>
          <li><strong>Naming Conventions:</strong> Use consistent, descriptive file names</li>
          <li><strong>Metadata:</strong> Include format version and creation timestamp</li>
          <li><strong>Testing:</strong> Validate format conversion with sample data</li>
          <li><strong>Monitoring:</strong> Track storage costs and query performance</li>
        </ul>

        <h3>Cost Optimization</h3>
        <ul>
          <li><strong>Storage Costs:</strong> Parquet reduces storage by 75% vs CSV</li>
          <li><strong>Query Costs:</strong> Columnar formats reduce BigQuery processing</li>
          <li><strong>Transfer Costs:</strong> Compressed formats reduce egress charges</li>
          <li><strong>Compute Costs:</strong> Efficient formats reduce Dataflow processing time</li>
        </ul>
      `,
    },
  };

  const tutorial = tutorialsData[tutorialSlug];

  if (!tutorial) {
    return { notFound: true };
  }

  // All GCP tutorials for sidebar navigation
  const allTutorials = [
    {
      id: '16',
      title: 'GCP Fundamentals and Getting Started',
      slug: 'gcp-fundamentals-getting-started',
      category: 'gcp',
      difficulty: 'Beginner' as const,
    },
    {
      id: '17',
      title: 'Google Cloud Analytics: BigQuery and Data Studio',
      slug: 'gcp-analytics-bigquery-data-studio',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '18',
      title: 'Data Preparation and Ingestion',
      slug: 'gcp-data-preparation-ingestion',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '19',
      title: 'Data Transfer Tools',
      slug: 'gcp-data-transfer-tools',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '20',
      title: 'Data File Formats',
      slug: 'gcp-data-file-formats',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '21',
      title: 'Compute Engine: Virtual Machines in the Cloud',
      slug: 'gcp-compute-engine-vms',
      category: 'gcp',
      difficulty: 'Beginner' as const,
    },
    {
      id: '22',
      title: 'Cloud Storage: Object Storage Solutions',
      slug: 'gcp-cloud-storage-guide',
      category: 'gcp',
      difficulty: 'Beginner' as const,
    },
    {
      id: '23',
      title: 'BigQuery: Analytics and Data Warehousing',
      slug: 'gcp-bigquery-analytics',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '24',
      title: 'Google Kubernetes Engine (GKE)',
      slug: 'gcp-kubernetes-engine-guide',
      category: 'gcp',
      difficulty: 'Advanced' as const,
    },
    {
      id: '25',
      title: 'Cloud Functions: Serverless Computing',
      slug: 'gcp-cloud-functions-serverless',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '26',
      title: 'Cloud SQL: Managed Database Services',
      slug: 'gcp-cloud-sql-databases',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '27',
      title: 'App Engine: Platform as a Service',
      slug: 'gcp-app-engine-paas',
      category: 'gcp',
      difficulty: 'Beginner' as const,
    },
    {
      id: '28',
      title: 'Cloud Pub/Sub: Messaging and Event Streaming',
      slug: 'gcp-pubsub-messaging',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '29',
      title: 'Cloud Run: Containerized Applications',
      slug: 'gcp-cloud-run-containers',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '30',
      title: 'IAM and Security Best Practices',
      slug: 'gcp-iam-security-practices',
      category: 'gcp',
      difficulty: 'Advanced' as const,
    },
    {
      id: '31',
      title: 'Cloud Monitoring and Logging',
      slug: 'gcp-monitoring-logging',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '32',
      title: 'Firebase: Mobile and Web Development',
      slug: 'gcp-firebase-development',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
    {
      id: '33',
      title: 'AI Platform and Machine Learning',
      slug: 'gcp-ai-platform-ml',
      category: 'gcp',
      difficulty: 'Advanced' as const,
    },
    {
      id: '34',
      title: 'Cost Optimization and Billing Management',
      slug: 'gcp-cost-optimization-billing',
      category: 'gcp',
      difficulty: 'Intermediate' as const,
    },
  ];

  return {
    props: { 
      tutorial,
      allTutorials: allTutorials.filter(t => t.category === categorySlug)
    },
  };
};

export default TutorialPage;