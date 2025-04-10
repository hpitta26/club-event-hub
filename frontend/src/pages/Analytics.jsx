import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";



function Analytics() {
    const { user } = useContext(UserContext);
const navigate = useNavigate();

    return (
        <section className='min-h-screen bg-stone-900 flex justify-center items-center text-center pt-10'>
            <div className='grid grid-rows-1 gap-3'>
                <div>
                    <h1 className='text-white text-5xl'>
                        Welcome to Analytics!
                    </h1>
                </div>


                <button
        className="flex items-center justify-center w-[120px] h-[32px] bg-[#4D79FD] text-white text-[16px] font-semibold border-[1.5px] border-black rounded-[4px] hover:bg-blue-500"
        onClick={() => navigate("/settings")}
      >
        Settings
      </button>
                
            </div>
        </section>
    );
};

export default Analytics;
