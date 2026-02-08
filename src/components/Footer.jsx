import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
              LuxeThreads
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Premium fashion for the modern individual. Quality, style, and
              sustainability.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  to="/about"
                  className="hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-accent transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 text-center text-xs text-gray-400 tracking-wide">
          &copy; {new Date().getFullYear()} LuxeThreads. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
