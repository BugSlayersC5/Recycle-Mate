import { useState } from "react";
import { Link, useNavigate } from "react-router"; // ✅ fixed import
import RecycleMateNavbar from "../components/Navbar";
import RecycleMateFooter from "../components/Footer";
import { apiClient } from "../../api/client";
import { toast } from "react-toastify";

export default function CollectorSignUpPage() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "collector",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const signupCollector = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiClient.post("/collectors/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, "The response data");
      toast.success("Signed up successfully as a collector!");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-gradient-to-br from-teal-50 to-white">
      <RecycleMateNavbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Sign Up as a Collector
          </h3>
          <form className="space-y-6" onSubmit={signupCollector}>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                placeholder="Create a password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters.
              </p>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1ABC9C] focus:border-transparent transition duration-200"
                placeholder="Confirm your password"
              />
            </div>

            {/* ✅ Role Radio Button (Fixed to Collector) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <label className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-md">
                <input
                  type="radio"
                  name="role"
                  value="collector"
                  checked
                  disabled
                  className="form-radio text-[#1ABC9C] mr-2"
                />
                <span className="text-gray-700 font-medium">
                  Collector (default)
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={`w-full font-semibold py-3 rounded-md shadow-md transition duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-400 text-white"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>

            <Link
              to="/signup"
              className="block text-center w-full mt-4 bg-[#1ABC9C] hover:bg-teal-600 text-white font-semibold py-3 rounded-md shadow-md transition duration-300"
            >
              Choose another role
            </Link>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#1ABC9C] hover:text-teal-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <RecycleMateFooter />
    </div>
  );
}
