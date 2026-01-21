import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import "./UserButton.css";

const UserButton = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDisplayText = () => {
    if (!user) return "Sign In";
    if (user.isAnonymous) return "Sign In";
    return user.email?.split('@')[0] || "User";
  };

  const getStatusIcon = () => {
    if (!user || user.isAnonymous) return "👤";
    return "🦇";
  };

  return (
    <>
      <button 
        className="user-button"
        onClick={() => setIsModalOpen(true)}
        title={user && !user.isAnonymous ? (user.email || "User") : "Sign in to save your garden"}
      >
        <span className="user-icon">{getStatusIcon()}</span>
        <span className="user-text">{getDisplayText()}</span>
      </button>

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default UserButton;
