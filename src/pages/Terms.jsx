import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-serif font-bold mb-8">Terms & Conditions</h1>
      <div className="prose prose-sm text-gray-500">
        <p className="mb-4">Welcome to LuxeThreads.</p>
        <p className="mb-6">
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use LuxeThreads if you do not agree to
          take all of the terms and conditions stated on this page.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          1. Cookies
        </h3>
        <p className="mb-4">
          We employ the use of cookies. By accessing LuxeThreads, you agreed to
          use cookies in agreement with the LuxeThreads's Privacy Policy.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          2. License
        </h3>
        <p className="mb-4">
          Unless otherwise stated, LuxeThreads and/or its licensors own the
          intellectual property rights for all material on LuxeThreads. All
          intellectual property rights are reserved. You may access this from
          LuxeThreads for your own personal use subjected to restrictions set in
          these terms and conditions.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          3. User Account
        </h3>
        <p className="mb-4">
          If you create an account on our website, you are responsible for
          maintaining the security of your account and you are fully responsible
          for all activities that occur under the account.
        </p>
      </div>
    </div>
  );
};

export default Terms;
