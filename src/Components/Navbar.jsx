import { Link } from "react-router-dom";
import { Scissors } from "lucide-react";

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm">
                <div className="container-fluid">
                    <Link className="ms-2 navbar-brand" to="/home">
                        <Scissors className="me-3" />
                        EZremove
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
