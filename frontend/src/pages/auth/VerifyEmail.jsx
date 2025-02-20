import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backend from '../../components/backend';

function VerifyEmail() {
    const { token } = useParams();
    const [status, setStatus] = useState('Verifying...');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await backend.get(`/student-verify-email/${token}/`);
                if (response.status === 200) {
                    setStatus("✅ Email successfully verified! Redirecting to login...");
                    setTimeout(() => {
                        navigate('/student-login');
                    }, 3000);    
                } else if (response.status === 205) {
                    setStatus("✅ Email was already verified, or user does not exist...");
                    setTimeout(() => {
                        navigate('/student-login');
                    }, 3000); 
                } else {
                    setError("❌ Verification failed: " + data.message);
                    setTimeout(() => {
                        setStatus(null);
                        navigate('/');
                    }, 3000);
                }
            } catch (e) {
                console.log(e);
                setError("❌ An error occurred: " + e);
                setStatus(null);
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
