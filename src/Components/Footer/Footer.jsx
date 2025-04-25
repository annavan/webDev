import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t py-4 px-6 mt-auto">
      <nav>
        <ul className="flex justify-center space-x-6 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/settings" className="hover:text-blue-600 transition-colors">Settings</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
