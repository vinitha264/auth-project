export default function Home() {
    const handleLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <div className="home-container">
            <div className="card">
                <h1>✨ Welcome to OAuth App ✨</h1>
                <p>Secure login using Google Authentication</p>
                <button onClick={handleLogin}>🔐 Login with Google</button>
            </div>
        </div>
    );
}