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
    <div>
      <h1>Account Settings</h1>
      <AccountSettingsForm />
      <Footer />
    </div>
  );
}
