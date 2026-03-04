import { Navigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = UseAuth();

  
    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h3>Checking authentication...</h3>
            </div>
        );
    }

   
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
