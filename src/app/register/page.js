"use client";

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

const RegisterPage = () => {
  const handleLogin = (data) => {
    console.log("Login data:", data);
    // Add your login logic here
  };

  const handleRegister = (data) => {
    console.log("Register data:", data);
    // Add your registration logic here
  };

  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Join Learning Souls
          </h1>
          <p className="text-lg text-gray-600">
            Login to your account or create a new one
          </p>
        </div> */}

        {/* Forms Container - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Login Form */}
          <div>
            <LoginForm onSubmit={handleLogin} />
          </div>

          {/* Register Form */}
          <div>
            <RegisterForm onSubmit={handleRegister} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
