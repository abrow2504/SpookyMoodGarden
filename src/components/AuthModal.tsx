import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { user, login, signup, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      onClose();
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setError(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ✕
        </button>

        {user && !user.isAnonymous ? (
          <div className="auth-logged-in">
            <h2>Hello again</h2>
            <p className="user-email">{user.email}</p>
            <button className="auth-button logout" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="auth-form">
            <h2>{isSignUp ? "Start Your Garden" : "Hello Again"}</h2>
            <p className="auth-subtitle">
              {isSignUp 
                ? "Create an account to save your mood garden" 
                : "Sign in to access your personal garden"
              }
            </p>

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="auth-field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button 
                type="submit" 
                className="auth-button primary"
                disabled={loading}
              >
                {loading ? "..." : (isSignUp ? "Create Account" : "Sign In")}
              </button>
            </form>

            <div className="auth-switch">
              <button
                type="button"
                className="auth-switch-button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
              >
                {isSignUp 
                  ? "Already have an account? Sign in" 
                  : "Need an account? Sign up"
                }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
