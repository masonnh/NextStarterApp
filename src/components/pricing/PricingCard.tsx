import React from 'react';

interface PricingCardProps {
    planName: string;
    price: string;
    period: string;
    features: string[];
    special?: boolean;
}

export default function PricingCard(props: PricingCardProps) {
    return (
        <div className="pricing-card">
            <div className={`plan-name ${props.special === true ? 'plan-name-special' : ''}`}>{props.planName}</div>

            <div>
                <span className={`plan-price ${props.special === true ? 'plan-price-special' : ''}`}>
                    {props.price}
                </span> 
                <span className="plan-period">/ {props.period}</span>
                <hr></hr>
            </div>

            <ul className="plan-features">
                {props.features.map((feature: string, index: number) => (
                    <li key={index}>&#10003; {feature}</li>
                ))}
            </ul>

            <div className={`plan-button ${props.special === true ? 'plan-button-special' : ''}`}>Select plan</div>
        </div>
    );
}