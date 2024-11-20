// InfoCard.tsx
// Props: title, accent, text, imgSrc, imgAlt, default
// Usage: <InfoCard title='Create Effortless Forecasts' accent='Effortless' text='Connect your QuickBooks, Track your daily cashflow, Automate your forecasts' imgSrc='img/LineGraph.svg' imgAlt='Cashflow Line Graph' default={true} />


export default function InfoCard(props: any) {
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
        <div className={`feature-card ${props.default === true ? 'purple-bg' : ''}`}>
            {props.default === true &&
                <div className='feature-content-container'>
                    <div className='feature-visual'>
                        <img src={props.imgSrc} alt={props.imgAlt} width="100%"/>
                    </div>
                </div>
            }
            <div className='feature-content-container'>
                <div className='feature-text'>
                    {renderTitle()}
                    <p className='feature-text-content'>{props.text}</p>
                </div>
            </div>
            {props.default === false &&
                <div className='feature-content-container'>
                    <div className='feature-visual'>
                        <img src={props.imgSrc} alt={props.imgAlt} width="100%"/>
                    </div>
                </div>
            }
        </div>
    );
}