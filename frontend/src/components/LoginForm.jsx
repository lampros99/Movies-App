import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const ok = await login(email, password); // <-- σωστά ορίσματα
      if (ok) {
        setMsg(`Welcome ${email}`);
        navigate("/home");
      } else {
        setMsg("Login failed");
      }
    } catch (err) {
      console.error(err);
      setMsg("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        autoComplete="email"
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        autoComplete="current-password"
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 font-semibold text-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-500"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      {msg && (
        <p className={`text-center text-sm font-medium ${msg.toLowerCase().includes("welcome") ? "text-green-600" : "text-red-600"}`}>
          {msg}
        </p>
      )}
    </form>
  );
}
