import React from 'react';
import { DollarSign, Calculator, TrendingUp } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
}

interface GCPPricingProps {
  serviceName: string;
  tiers: PricingTier[];
  calculator?: boolean;
}

const GCPPricing: React.FC<GCPPricingProps> = ({ serviceName, tiers, calculator = false }) => {
  return (
    <div className="gcp-pricing-section">
      <div className="gcp-pricing-header">
        <div className="pricing-icon">
          <DollarSign size={24} />
        </div>
        <h3>{serviceName} Pricing</h3>
        {calculator && (
          <button className="pricing-calculator-btn">
            <Calculator size={16} />
            <span>Pricing Calculator</span>
          </button>
        )}
      </div>
      
      <div className="gcp-pricing-tiers">
        {tiers.map((tier, index) => (
          <div key={index} className="pricing-tier-card">
            <div className="tier-header">
              <h4 className="tier-name">{tier.name}</h4>
              <div className="tier-price">
                <span className="price">{tier.price}</span>
                <span className="unit">{tier.unit}</span>
              </div>
            </div>
            
            <p className="tier-description">{tier.description}</p>
            
            <ul className="tier-features">
              {tier.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="pricing-notes">
        <div className="pricing-note">
          <TrendingUp size={16} />
          <span>Prices shown are estimates. Actual costs may vary based on usage patterns.</span>
        </div>
        <div className="pricing-note">
          <span>💡 Many GCP services offer generous free tiers for getting started.</span>
        </div>
      </div>
    </div>
  );
};

export default GCPPricing;