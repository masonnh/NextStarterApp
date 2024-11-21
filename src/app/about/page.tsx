import Team from '@/components/about/Team';
import InfoCard from '@/components/page/InfoCard';
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
            <Team
                team={[
                    { name: 'John Doe', role: 'CEO', imgSrc: 'https://via.placeholder.com/150', imgAlt: 'John Doe' },
                    { name: 'Jane Doe', role: 'CTO', imgSrc: 'https://via.placeholder.com/150', imgAlt: 'Jane Doe' },
                    { name: 'Bob Smith', role: 'CPO', imgSrc: 'https://via.placeholder.com/150', imgAlt: 'Bob Smith' },
                ]}
            />
        </div>
    );
}

export const metadata: Metadata = {
    title: 'About us | Caster',
    description: 'The story of Caster and what we\'re all about',
};