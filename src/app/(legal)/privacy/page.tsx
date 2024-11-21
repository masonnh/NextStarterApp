import { Metadata } from 'next';

export default function PrivacyPolicy() {
    return (
        <div>
            <h1>Privacy Policy</h1>

            <section>
                <h2>Introduction</h2>
                <p>
                    This Privacy Policy explains how we collect, use, and protect your personal information when you use our services. We are committed to ensuring your privacy and protecting any personal data you share with us.
                </p>
            </section>

            <section>
                <h2>Information We Collect</h2>
                <p>We collect the following types of information:</p>
                <ul>
                    <p>Personal Information:</p>
                    <li>Name and email address</li>
                    <li>Billing information</li>
                    <li>Account credentials</li>
                    <p>Automatically Collected Information:</p>
                    <li>IP address</li>
                    <li>Device information</li>
                    <li>Usage data and analytics</li>
                </ul>
            </section>

            <section>
                <h2>How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                    <li>Provide and maintain our services</li>
                    <li>Process your payments</li>
                    <li>Send service updates and notifications</li>
                    <li>Improve our services</li>
                    <li>Comply with legal obligations</li>
                </ul>
            </section>

            <section>
                <h2>Data Security</h2>
                <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
            </section>

            <section>
                <h2>Third-Party Services</h2>
                <p>
                    We may share your information with trusted third-party service providers who assist us in operating our services, conducting business, or servicing you.
                </p>
            </section>

            <section>
                <h2>Your Rights</h2>
                <p>
                    You have the right to access, correct, or delete your personal information. You may also request a copy of your data or withdraw your consent for its processing.
                </p>
            </section>

            <section>
                <h2>Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us.
                </p>
            </section>
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Learn about how we collect, use, and protect your personal information'
};