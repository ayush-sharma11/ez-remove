import { Link } from "react-router-dom";

const Policy = () => {
    return (
        <>
            <div className="container my-5">
                <div className="policy-container">
                    <h1 className="text-center mb-4">Policy</h1>
                    <p className="text-muted text-center mb-5">
                        Last Updated: December 2024
                    </p>

                    <h2 className="policy-heading">
                        1. Client-Side Processing
                    </h2>
                    <p>
                        All image conversions are performed entirely in your
                        browser. No images are uploaded to our servers.
                    </p>

                    <h2 className="policy-heading">2. Data Handling</h2>
                    <ul>
                        <li>Images never leave your device</li>
                        <li>
                            Conversion happens using your browser&apos;s local
                            processing
                        </li>
                        <li>No server-side storage or data transmission</li>
                    </ul>

                    <h2 className="policy-heading">3. Browser Data</h2>
                    <p>We do not even collect any anonymous usage data.</p>

                    <h2 className="policy-heading">4. Local Storage</h2>
                    <p>
                        Converted images are saved directly to your device via
                        browser download. No persistent storage occurs on our
                        end.
                    </p>

                    <h2 className="policy-heading">5. Security</h2>
                    <ul>
                        <li>Client-side encryption for local processing</li>
                        <li>No external data sharing</li>
                        <li>No data collection</li>
                    </ul>

                    <h2 className="policy-heading">6. User Control</h2>
                    <p>
                        You have complete control over your images. Delete or
                        keep converted files as you choose.
                    </p>

                    <h2 className="policy-heading">7. Want to contribute?</h2>
                    <p>
                        Check our{" "}
                        <a
                            href="https://github.com/ayush-sharma11/ezremove"
                            target="_blank"
                            className="text-danger"
                        >
                            GitHub repository
                        </a>{" "}
                        to contribute!
                    </p>
                </div>
                <div className="text-center mt-5">
                    <Link to="/home" className="btn btn-danger">
                        Back to removing background
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Policy;
