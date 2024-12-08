import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer bg-light py-3">
            <p>
                &copy; 2024 EZremove. All Rights Reserved.{" "}
                <Link to="/policy" className="text-muted inline-block">
                    Policy
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
