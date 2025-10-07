import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} JKUAT Marks Tracker
      </div>
    </footer>
  );
}
