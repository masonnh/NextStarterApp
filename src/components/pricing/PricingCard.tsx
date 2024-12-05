"use client";

import React from 'react';

interface PricingCardProps {
    id: number;
    description: string;
    priceId: string;
    name: string;
    price: string;
    features: string[];
    special?: boolean;
}

export default function PricingCard(props: PricingCardProps) {
    const submitForm = () => {
        const form = document.getElementById(`plan-${props.id}`) as HTMLFormElement;
        form?.submit();
    };

    return (
        <form method="POST" action="/api/checkout/checkout-session" className="pricing-card" id={`plan-${props.id}`}>
            <input type="hidden" name="id" value={props.id} />
            <input type="hidden" name="priceId" value={props.priceId} />

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
                {props.features.map((feature: string, index: number) => (
                    <li key={index}>&#10003; {feature}</li>
                ))}

            </ul>

            <div 
                className={`plan-button ${props.special === true ? 'plan-button-special' : ''}`}
                role="submit"
                onClick={submitForm}
            >
                Select plan
            </div>
        </form>
    );
}