import { useState } from "react";
import { registerUser } from "../service/authService.js";
import { useNavigate } from "react-router-dom";
import "../style/Register.css";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        try {
            await registerUser({ name, email, password });

            setMessage("Registration successful");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setError(err.message || "Registration failed");
        }
    };

    return (
        <div id="register-page">

            {/* VIDEO BACKGROUND */}
            <video autoPlay loop muted playsInline className="bg-video">
                <source src="/soldier.mp4" type="video/mp4" />
            </video>

            {/* OVERLAY */}
            <div className="video-overlay"></div>

            {/* REGISTER BOX */}
            <div className="reg-box">

                <h1 className="reg-title">Join the Force</h1>
                <p className="reg-sub">
                    Create your account and begin your journey.
                </p>

                <form onSubmit={handleRegister} className="reg-form">

                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="reg-btn">
                        Register
                    </button>

                    {message && <p className="success-text">{message}</p>}
                    {error && <p className="error-text">{error}</p>}

                </form>

            </div>
        </div>
    );
};

export default Register;