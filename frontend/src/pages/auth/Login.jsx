import { useState } from "react";
import { login } from "../../services/authService";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await login(form);
  
      // ✅ store token correctly
      localStorage.setItem("token", res.token);
  
      // ✅ decode role
      const payload = JSON.parse(atob(res.token.split(".")[1]));
  
      console.log("ROLE:", payload.role);
  
      // ✅ redirect based on role
      if (payload.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
  
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ border: "1px solid white", padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}