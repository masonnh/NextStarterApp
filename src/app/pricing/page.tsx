import FAQ from '@/components/page/FAQ';
import PricingCard from '@/components/pricing/PricingCard';
import { Metadata } from 'next';

export default function Pricing() {
    return (
        <div className='pricing-page'>
            <div className='pricing-title'>
                <h1>Reduce costs with the best plan for your business</h1>
                <p>Every plan starts with a simple 30 day free trial</p>
            </div>

            <div className="pricing-container">
                <PricingCard 
                    planName="Free Trial" 
                    price="$0" 
                    period="month"
                    features={["30 day free trial", "All premium features", "No credit card required"]}
                />
                <PricingCard 
                    planName="Premium" 
                    price="$199" 
                    period="month"
                    features={["Squashed bugs", "Time back", "Happy users", "Example", "Example", "Example"]}
                    special={true}
                />
                <PricingCard 
                    planName="Enterprise" 
                    price="$489" 
                    period="month"
                    features={["All premium features", "Dedicated support", "Infinite profit glitch", "Example",]}
                />
            </div>

            <FAQ faqs={[
                { question: 'What is the refund policy?', answer: 'We offer a 30 day money back guarantee.' },
                { question: 'Can I cancel my subscription?', answer: 'Yes, you can cancel your subscription at any time.' },
                { question: 'Can I upgrade my plan?', answer: 'Yes, you can upgrade your plan at any time.' },
            ]} />
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Pricing | Caster',
    description: 'Pricing information for Caster',
};