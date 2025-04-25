import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white">
      <div className="container mt-12 pt-5">
        <h1 className="mb-4">
          Settings
        </h1>

        <div className="space-y-6 max-w-2xl mx-auto text-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <ul className="space-y-4">
            <li>
              <Link
                to="/account-settings"
                className="block w-full text-blue-600 hover:underline font-medium text-base"
              >
                Account Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
