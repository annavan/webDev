import Footer from "../Footer/Footer";

// things you've posted
// things you've liked
// things you've commented on
// notifications?

export default function Settings() {
    return (
        <div>
        <h1>Settings</h1>
        {/* link to account settings */}
        <p>
            <a href="/account-settings">Account Settings</a>
        </p>
        <Footer />
        </div>
    );
}