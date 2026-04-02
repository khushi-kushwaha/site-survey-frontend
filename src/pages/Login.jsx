import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUser } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const res = await loginUser(formData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("email", res.data.email);


    toast.success("Login Successful 🚀");

    // redirect based on role
    const role = res.data.role;

    if (role === "ADMIN") {
      navigate("/admindashboard");
    } 
    else {
      navigate("/userdashboard");
    }

  } catch (err) {
    toast.error("Invalid Credentials ❌");
  }
};
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-blue-600">
          <i className="ri-base-station-fill mr-1"></i> Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to continue
        </p>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded-lg"
          onChange={handleChange}
        />

        {/* Button */}
        <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;