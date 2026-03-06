import { useEffect, useState } from "react";

const Login = () => {
    const [user, setUser] = useState(null);
    const BASE_URL = "https://auth-project-bai2.onrender.com";

    const handleLogin = () => {
        window.location.href = `${BASE_URL}/api/auth/google`;
    };
    
    const handleLogout = async () => {
        try {
            await fetch(`${BASE_URL}/api/auth/logout`, {
                credentials: "include",
            });

            setUser(null); 
            window.location.href = "/"; 
        } catch (err) {
            console.error("Logout error:", err);
        }
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/user/me`, {
                    credentials: "include",
                });

                if (!res.ok) {
                    setUser(null);
                    return;
                }

                const data = await res.json();
                setUser(data.user || data);
            } catch (err) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                background: "linear-gradient(to right, #667eea, #764ba2)",
                color: "white",
            }}
        >
            <div
                style={{
                    background: "white",
                    color: "black",
                    padding: "40px",
                    borderRadius: "12px",
                    textAlign: "center",
                    width: "350px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
            >
                <h1>{user ? `Welcome, ${user.name}` : "Login Page"}</h1>

                {!user ? (
                    <button
                        onClick={handleLogin}
                        style={{
                            marginTop: "10px",
                            padding: "12px 20px",
                            background: "#4285F4",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            width: "100%",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    >
                        Login with Google
                    </button>
                ) : (
                    <button
                        onClick={handleLogout}
                        style={{
                            marginTop: "10px",
                            padding: "12px 20px",
                            background: "#e53e3e",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            width: "100%",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    >
                        Logout
                    </button>
                )}

                {user && (
                    <div style={{ marginTop: "15px" }}>
                        <img
                            src={user.photo}
                            alt="profile"
                            width={80}
                            style={{ borderRadius: "50%" }}
                        />
                        <p style={{ marginTop: "8px" }}>{user.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
