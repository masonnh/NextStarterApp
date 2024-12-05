import FAQ from '@/components/page/FAQ';
import PricingCard from '@/components/pricing/PricingCard';
import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import { getPlans } from '@/components/pricing/getplans';

export default async function Pricing(): Promise<JSX.Element> {
    const client = await createClient();
    const user = await client.auth.getUser();

    // Check for a license; if the user has one, they can manage their sub
    const hasLicense = !!(
        user.data.user &&
        (
            await client
                .from("profiles")
                .select("license_id")
                .eq("id", user.data.user.id)
                .single()
        ).data?.license_id
    );

    const plans = await getPlans();

    return (
        <div className='pricing-page'>
            <div className='pricing-title'>
                <h1>Reduce costs with the best plan for your business</h1>
                <p>Every plan starts with a simple 30 day free trial</p>
            </div>

            <div className="pricing-container">
                {plans.map(({ id, name, description, price, priceId, features }) => (
                    <PricingCard
                        key={id}
                        id={id}
                        priceId={priceId}
                        name={name}
                        description={description}
                        price={price}
                        features={features.map((feature) => (feature.name))}
                        special={name === 'Premium' ? true : false}
                    />
                ))}
                {!hasLicense ? null : (
                    <form method="POST" action="/api/checkout/portal-session">
                        <button role="submit">Manage Subscription</button>
                    </form>
                )}
            </div>

            {/* <div className="pricing-container">
                <PricingCard 
                    name="Free Trial" 
                    price="$0" 
                    period="month"
                    features={["30 day free trial", "All premium features", "No credit card required"]}
                />
                <PricingCard 
                    name="Premium" 
                    price="$199" 
                    period="month"
                    features={["Squashed bugs", "Time back", "Happy users", "Example", "Example", "Example"]}
                    special={true}
                />
                <PricingCard 
                    name="Enterprise" 
                    price="$489" 
                    period="month"
                    features={["All premium features", "Dedicated support", "Infinite profit glitch", "Example",]}
                />
            </div> */}

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