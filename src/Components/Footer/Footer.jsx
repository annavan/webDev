import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer;