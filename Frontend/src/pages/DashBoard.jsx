import { UseAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./DashBoard.css";

const Dashboard = () => {
    const { user, loading } = UseAuth();
    const navigate = useNavigate();
    const [logoutLoading, setLogoutLoading] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    const handleLogout = () => {
        setLogoutLoading(true);
        window.location.href = "https://auth-project-bai2.onrender.com/api/auth/logout";
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-card">

                {/* 🔥 Enhanced Profile Section */}
                <div className="profile-section">
                    <div className="profile-img-wrapper">
                        <img
                            src={user?.photo || "https://via.placeholder.com/120"}
                            alt="Profile"
                            className="profile-img"
                        />
                    </div>

                    <h2 className="username">{user?.name}</h2>

                    <p className="email-badge">{user?.email}</p>
                </div>

                <div className="divider"></div>

                {/* Action Buttons */}
                <div className="action-section">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/")}
                    >
                        Continue to App
                    </button>

                    <button
                        className="btn btn-outline"
                        onClick={handleLogout}
                        disabled={logoutLoading}
                    >
                        {logoutLoading ? "Logging out..." : "Logout"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
