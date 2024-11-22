"use client";

import React, { useState } from 'react';
import Image from 'next/image'

interface Question {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: Question[];
}

const FAQItem = (item: Question) => {
    const question = item.question;
    const answer = item.answer;

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='faq-item'>
            <div 
                className='faq-question-container'
                onClick={toggleOpen}
            >
                <h3>{question}</h3>
                <img 
                    src={`img/icons/${isOpen === true ? 'minus' : 'plus'}.svg`}
                    alt="plus icon" 
                />
            </div>
            {isOpen && (
                <p>{answer}</p>
            )}
        </div>
    );
};

export default function FAQ(props: FAQProps) {
    return (
        <div className='faq-container'>
            <h3>Frequently Asked Questions</h3>
            <div className='faq-list'>
                {props.faqs.map((faq: Question, index: number) => (
                    <FAQItem key={index} {...faq} />
                ))}
            </div>
        </div>
    );
}