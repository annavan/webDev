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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto text-sm">

      {/* Inputs */}
      {[
        { label: "First Name", name: "firstName", type: "text" },
        { label: "Last Name", name: "lastName", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Phone", name: "phone", type: "tel" },
        { label: "Birthday", name: "birthday", type: "date" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block font-semibold mb-1">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      ))}

      {/* Password Update */}
      <div className="pt-4 space-y-2">
        <h2 className="font-semibold">Change Password</h2>
        <input
          type="password"
          name="password"
          placeholder="Current Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* add line break */}

      <hr/>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
