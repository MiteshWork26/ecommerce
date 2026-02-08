import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-serif font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-sm text-gray-500">
        <p className="mb-4">Last updated: December 30, 2025</p>
        <p className="mb-6">
          LuxeThreads ("we", "our", or "us") is committed to protecting your
          privacy. This Privacy Policy explains how your personal information is
          collected, used, and disclosed by LuxeThreads.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          1. Information We Collect
        </h3>
        <p className="mb-4">
          We collect information you provide directly to us, such as when you
          create an account, make a purchase, sign up for our newsletter, or
          contact customer support. This may include your name, email address,
          shipping/billing address, and payment information.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          2. How We Use Your Information
        </h3>
        <p className="mb-4">
          We use the information we collect to:
          <ul className="list-disc ml-6 mt-2">
            <li>Process your transactions and manage your orders.</li>
            <li>
              Send you transaction-related emails (confirmations, shipping
              updates).
            </li>
            <li>
              Communicate with you about new products, services, and offers (if
              you opted in).
            </li>
            <li>Analyze trends and improve our website and products.</li>
          </ul>
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
          3. Sharing of Information
        </h3>
        <p className="mb-4">
          We do not sell your personal information. We may share information
          with third-party vendors who perform services on our behalf, such as
          payment processing, shipping, and email marketing.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
