import Link from 'next/link';
import Button from '@mui/material/Button';

export default function PromoCard() {
    return (
        <div className='free-plan-promo purple-bg'>
            <div className='free-plan-promo-text-container'>
                <div className='info-text'>
                    <h2>Join our <span className='text-accent'>Free</span> Plan</h2>
                    <ul>
                        <li>Automate your cashflow forecasts</li>
                        <li>Easily consume your data</li>
                        <li>Access strategic AI insights</li>
                    </ul>
                </div>
            </div>

            <div className='free-plan-promo-signup-container'>
                Try it out
                <div className='free-plan-price'>$0/m</div>
                Create and edit unlimited <br/>
                proformas with AI
                <Link href="/login">
                    <Button className='button button-contained' variant="contained">Get Started</Button>
                </Link>
            </div>
        </div>

    );
}