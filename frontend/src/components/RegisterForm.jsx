import React, { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || "Registration failed");
        return;
      }

      setMsg("Registered successfully!");
      if (data.token) localStorage.setItem("token", data.token);
    } catch (err) {
      console.error(err);
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name input */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Email input */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Password input */}
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-all w-full font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {/* Message feedback */}
      {msg && (
        <p
          className={`text-center text-sm font-medium ${
            msg.toLowerCase().includes("success")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {msg}
        </p>
      )}
    </form>
  );
}
