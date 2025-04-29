// profile picture
// first name
// last name
// email
// password-> change password?
// birthday
// phone number

import AccountSettingsForm from "./AccountSettingsForm";
import Footer from "../Footer/Footer";

export default function AccountSettings() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
    <div className="container mt-12 pt-5">
      <h1 className="mb-4">Account Settings</h1>
      <AccountSettingsForm />
      </div>
      <Footer />
    </div>
  );
}

