import { useEffect, useState } from "react";
import Parse from "parse";

export default function AccountSettingsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    phone: "",
    password: "",
    newPassword: "",
  });

  const currentUser = Parse.User.current();

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        firstName: currentUser.get("firstName") || "",
        lastName: currentUser.get("lastName") || "",
        email: currentUser.get("email") || "",
        birthday: currentUser.get("birthday") || "",
        phone: currentUser.get("phone") || "",
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      currentUser.set("firstName", formData.firstName);
      currentUser.set("lastName", formData.lastName);
      currentUser.set("email", formData.email);
      currentUser.set("birthday", formData.birthday);
      currentUser.set("phone", formData.phone);

      if (formData.newPassword) {
        currentUser.set("password", formData.newPassword);
      }

      await currentUser.save();
      alert("Account updated successfully!");
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Update Account Details</h2>

      <div className="grid grid-cols-1 gap-6">
        {[
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "tel" },
          { label: "Birthday", name: "birthday", type: "date" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        ))}
      </div>

      {/* Password Section */}
      <div className="pt-2 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
        <input
          type="password"
          name="password"
          placeholder="Current Password"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div className="border-t border-gray-200" />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors shadow-md"
      >
        Save Changes
      </button>
    </form>
  );
}
