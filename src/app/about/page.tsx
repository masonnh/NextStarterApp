import InfoCard from '@/components/home/InfoCard';
import { Metadata } from 'next';

export default function About() {
    return (
        <div>
            <h1>About us</h1>
            <p>We're bringing you the future of cashflow management</p>

            <InfoCard 
                title='Our Mission: Helping millions of ecommerce businesses succeed'
                text="We believe in financial transparency and empowering businesses to make data-driven decisions. This should't be rocket science: every business is entitled to a clear understanding of their cashflow." 
                imgSrc='img/LineGraph.svg' 
                imgAlt='Cashflow Line Graph' 
                default={true} 
            />
            <InfoCard 
                title='Our Story'
                text="We believe in financial transparency and empowering businesses to make data-driven decisions. This should't be rocket science: every business is entitled to a clear understanding of their cashflow." 
                imgSrc='img/LineGraph.svg' 
                imgAlt='Cashflow Line Graph' 
                default={false} 
            />
        </div>
    );
}

export const metadata: Metadata = {
    title: 'About us | Caster',
    description: 'The story of Caster and what we\'re all about',
};