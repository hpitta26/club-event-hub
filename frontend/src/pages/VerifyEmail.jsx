import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backend from '../components/backend';

function VerifyEmail() {
    const { token } = useParams();
    const [status, setStatus] = useState('Verifying...');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await backend.get(`/student-verify-email/${token}/`);
                if (response.status === 200) {
                    setStatus("✅ Email successfully verified! Redirecting to login...");
                    navigate('/student-login');
                } else {
                    setError("❌ Verification failed: " + data.message);
                }
            } catch (e) {
                console.log(e);
                setError("❌ An error occurred: " + error.message);
            }
        };
        verifyToken();
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
