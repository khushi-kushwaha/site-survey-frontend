import { useState } from "react";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
  const res = await registerUser(formData);
  toast.success('Registered Successfully 🚀');
} catch (err) {
  toast.error('Registration Failed ❌');
}
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-blue-600">
  <i className="ri-base-station-fill mr-1"></i> Create Account
</h2>

        <p className="text-gray-500 text-center mb-6">
          Join the Site Survey platform
        </p>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        {/* Role Dropdown */}
        <select
          name="role"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Manager</option>
        </select>


        {/* Button */}
        <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
          Create Account
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
  Already have an account?{" "}
  <span
    className="text-blue-600 cursor-pointer hover:underline"
    onClick={() => navigate("/login")}
  >
    Login here
  </span>
</p>
      </form>
    </div>
  );
}

export default Register;