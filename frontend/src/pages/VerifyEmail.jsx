import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerifyEmail() {
    const { token } = useParams();
    const [status, setStatus] = useState('Verifying...');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/restapi/student-verify/${token}/`, {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            // working but with bugs, success status and failure status both displayed
            if (data.status === "success") {
                setStatus("✅ Email successfully verified! Redirecting to login...");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 3000);
            } else {
                setError("❌ Verification failed: " + data.message);
            }
        })
        .catch(error => setError("❌ An error occurred: " + error.message));
    }, [token]);

    return (
        <section className="min-h-screen bg-stone-900 flex justify-center items-center text-center">
            <div>
                {status && <p className="text-green-400 text-2xl">{status}</p>}
                {error && <p className="text-red-400 text-2xl">{error}</p>}
            </div>
        </section>
    );
}

export default VerifyEmail;
