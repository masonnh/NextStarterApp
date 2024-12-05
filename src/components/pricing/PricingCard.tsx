import React from 'react';
import { Feature } from '@/utils/user/license/feature';

interface PricingCardProps {
    id: string;
    description: string;
    priceId: string;
    name: string;
    price: string;
    // period: string;
    features: Feature[];
    special?: boolean;
}

export default function PricingCard(props: PricingCardProps) {
    return (
        <div className="pricing-card">
            <div className={`plan-name ${props.special === true ? 'plan-name-special' : ''}`}>
                {props.name}
                {props.special && <span className="plan-special">Popular</span>}
            </div>

            <div>
                <span className={`plan-price ${props.special === true ? 'plan-price-special' : ''}`}>
                    &#x24;{props.price.split(' ')[0]}
                </span> 
                <span className="plan-period">/ month</span>
                <hr></hr>
            </div>

            <ul className="plan-features">
                {props.features.map((feature: Feature, index: number) => (
                    <li key={index}>&#10003; {feature.name}</li>
                ))}

            </ul>

            <div className={`plan-button ${props.special === true ? 'plan-button-special' : ''}`}>Select plan</div>
        </div>
    );
}