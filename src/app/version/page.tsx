import { Metadata } from 'next';

export default function ProductVersion() {
    return (
        <div>
            <h1>Version History</h1>

            <section>
                <h2>Current Version: v0.1.0</h2>
                <p>Released: November 13, 2024</p>
                <div>
                    <h3>New Features</h3>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                </div>
                <div>
                    <h3>Bug Patches</h3>
                    <ul>
                        <li>Patch 1</li>
                        <li>Patch 2</li>
                        <li>Patch 3</li>
                    </ul>
                </div>
            </section>

            <section>
                <h2>Previous Releases</h2>

                <div>
                    <h3>Beta v0.9.0</h3>
                    <p>Released: October 15, 2024</p>
                    <div>
                        <h4>Features</h4>
                        <ul>
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    );
}

export const metadata: Metadata = {
    title: 'Product Version',
    description: 'Current version information and release history'
};