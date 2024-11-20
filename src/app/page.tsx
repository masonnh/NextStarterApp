import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import PromoCard from '@/components/home/PromoCard';
import InfoCard from '@/components/home/InfoCard';

export default function Home() {
    return (
        <>
            <div className='home-container'>
                <Hero />
                <InfoCard 
                    title='Create Effortless Forecasts' 
                    accent='Effortless' 
                    text='Connect your QuickBooks, track your daily cashflow, and automate your forecasts' 
                    imgSrc='img/LineGraph.svg' 
                    imgAlt='Cashflow Line Graph' 
                    default={true} 
                />
                <InfoCard 
                    title='Generate Real-Time Dashboards' 
                    accent='Real-Time' 
                    text='Understand trends at a glance, updated daily with real-time data, and save time and money' 
                    imgSrc='img/PieChart.svg' 
                    imgAlt='Cashflow Pie Chart' 
                    default={false} 
                />
                <InfoCard 
                    title='Gain AI Assisted Insights' 
                    accent='AI Assisted' 
                    text='24/7 access to a cashflow guru, customized insights based on your data, and learn best practices your competitors use' 
                    imgSrc='img/ChatbotButton.svg' 
                    imgAlt='Chatbot button' 
                    default={true} 
                />
            </div>
            <PromoCard />
        </>
    );
}

export const metadata: Metadata = {
    title: 'Caster (app name)',
    description: 'Caster description',
};