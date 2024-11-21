// InfoCard.tsx
// Props: title, accent, text, imgSrc, imgAlt, default
// Usage: <InfoCard title='Create Effortless Forecasts' accent='Effortless' text='Connect your QuickBooks, Track your daily cashflow, Automate your forecasts' imgSrc='img/LineGraph.svg' imgAlt='Cashflow Line Graph' default={true} />

import React from 'react';

interface InfoCardProps {
    title: string;
    accent?: string;
    text: string;
    imgSrc: string;
    imgAlt: string;
    default?: boolean;
}

export default function InfoCard(props: InfoCardProps) {
    const renderTitle = () => {
        if (props.accent && props.title) {
            const words = props.title.split(' ');
            return (
                <h2>
                    {words.map((word: string, index: number) => (
                        word === props.accent ? 
                            <span key={index}>
                                {index > 0 ? ' ' : ''}<span className='text-accent'>{word}</span>
                            </span> :
                            <span key={index}>{index > 0 ? ' ' : ''}{word}</span>
                    ))}
                </h2>
            );
        }
        return <h2>{props.title}</h2>;
    };

    return (
        <div className={`info-card ${props.default === true ? 'purple-bg' : ''}`}>
            {props.default === true &&
                <div className='info-content-container'>
                    <div className='info-visual'>
                        <img src={props.imgSrc} alt={props.imgAlt} width="100%"/>
                    </div>
                </div>
            }
            <div className='info-content-container'>
                <div className='info-text'>
                    {renderTitle()}
                    <p className='info-text-content'>{props.text}</p>
                </div>
            </div>
            {props.default === false &&
                <div className='info-content-container'>
                    <div className='info-visual'>
                        <img src={props.imgSrc} alt={props.imgAlt} width="100%"/>
                    </div>
                </div>
            }
        </div>
    );
}