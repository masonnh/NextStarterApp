import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Hero() {
    return (
        <div className="home-title-section">
            <div className="square-container">
                <div className="left-square"></div>
            </div>
            <div className='home-content-section'>

                <div className='home-title'>
                    <h1>
                        One-click <br/>
                        <span className='text-accent'>cashflow</span> for <br/>
                        eCommerce
                    </h1>
                    <p>
                        Waste time on number crunching? <br/>
                        We fixed that.
                    </p>
                </div>
                <div className='home-links'>
                    <Link href="/login">
                        <Button className='button button-contained' variant="contained">Get Started</Button>
                    </Link>
                </div>
            </div>
            <div className="square-container">
                <div className="right-square"></div>
            </div>
        </div>
    );
}