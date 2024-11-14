import { Metadata } from 'next';

export default function TermsAndConditions() {
    return (
        <div>
            <h1>Terms and Conditions</h1>

            <section>
                <h2>1. Agreement to Terms</h2>
                <p>
                    By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, do not use our service.
                </p>
            </section>

            <section>
                <h2>2. Description of Service</h2>
                <p>
                    We provide a software-as-a-service platform. The service is provided "as is" and may be modified, updated, or discontinued at any time without notice.
                </p>
            </section>

            <section>
                <h2>3. User Accounts</h2>
                <p>
                    To access certain features of the service, you must create an account. You are responsible for:
                </p>
                <ul>
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized access</li>
                </ul>
            </section>

            <section>
                <h2>4. Payment Terms</h2>
                <p>
                    Subscription fees are billed in advance on a monthly or annual basis. All payments are non-refundable. We reserve the right to change our pricing with 30 days notice.
                </p>
            </section>

            <section>
                <h2>5. Acceptable Use</h2>
                <p>
                    You agree not to:
                </p>
                <ul>
                    <li>Use the service for any illegal purpose</li>
                    <li>Violate any laws or regulations</li>
                    <li>Infringe upon intellectual property rights</li>
                    <li>Transmit harmful code or interfere with the service</li>
                    <li>Attempt to gain unauthorized access to the service</li>
                </ul>
            </section>

            <section>
                <h2>6. Data and Privacy</h2>
                <p>
                    Your use of the service is also governed by our Privacy Policy. By using the service, you consent to the collection and use of information as detailed in our Privacy Policy.
                </p>
            </section>

            <section>
                <h2>7. Intellectual Property</h2>
                <p>
                    All content, features, and functionality of the service, including but not limited to text, graphics, logos, and software, are owned by us and protected by intellectual property laws.
                </p>
            </section>

            <section>
                <h2>8. Limitation of Liability</h2>
                <p>
                    We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                </p>
            </section>

            <section>
                <h2>9. Termination</h2>
                <p>
                    We reserve the right to terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
                </p>
            </section>

            <section>
                <h2>10. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service. Continued use of the service after such modifications constitutes acceptance of the updated terms.
                </p>
            </section>

            <section>
                <h2>11. Governing Law</h2>
                <p>
                    These terms shall be governed by and construed in accordance with the laws of the United States of America, without regard to its conflict of law provisions.
                </p>
            </section>

            <section>
                <h2>12. Contact Information</h2>
                <p>
                    For any questions about these Terms and Conditions, please contact us.
                </p>
            </section>
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Terms and Conditions',
    description: 'Terms and conditions for using our service'
};