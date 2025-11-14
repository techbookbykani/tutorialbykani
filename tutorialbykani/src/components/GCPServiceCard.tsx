import React from 'react';
import Link from 'next/link';
import { Cloud, Database, Cpu, Shield, BarChart3, Zap } from 'lucide-react';

interface GCPService {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
  slug: string;
  icon: string;
  tier: 'free' | 'paid' | 'freemium';
}

interface GCPServiceCardProps {
  service: GCPService;
}

const GCPServiceCard: React.FC<GCPServiceCardProps> = ({ service }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'compute':
        return <Cpu size={24} />;
      case 'storage':
        return <Database size={24} />;
      case 'analytics':
        return <BarChart3 size={24} />;
      case 'security':
        return <Shield size={24} />;
      case 'serverless':
        return <Zap size={24} />;
      default:
        return <Cloud size={24} />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free':
        return 'gcp-tier-free';
      case 'freemium':
        return 'gcp-tier-freemium';
      case 'paid':
        return 'gcp-tier-paid';
      default:
        return 'gcp-tier-default';
    }
  };

  return (
    <div className="gcp-service-card">
      <Link href={`/tutorials/gcp/${service.slug}`}>
        <div className="gcp-card-content">
          <div className="gcp-card-header">
            <div className="gcp-service-icon">
              {getServiceIcon(service.icon)}
            </div>
            <div className={`gcp-tier-badge ${getTierColor(service.tier)}`}>
              {service.tier === 'freemium' ? 'Free Tier' : service.tier.toUpperCase()}
            </div>
          </div>
          
          <h3 className="gcp-service-name">{service.name}</h3>
          <p className="gcp-service-description">{service.description}</p>
          
          <div className="gcp-service-meta">
            <div className="gcp-category-tag">{service.category}</div>
            <div className="gcp-pricing">{service.pricing}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GCPServiceCard;