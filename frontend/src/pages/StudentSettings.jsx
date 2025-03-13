import {useContext, useEffect} from "react";
import {UserContext} from "../context/UserContext.jsx";
import dummyInitLogo from "../assets/dummyInitLogo.png";
import { MdOutlineFileUpload } from "react-icons/md";

function StudentSettings(){
  const { userContext } = useContext(UserContext);
    useEffect(()=> {
        console.log(userContext);
    },[])

    return(
        <section className="min-h-screen bg-stone-900 flex flex-col items-center pb-20 pt-10">
            <div className="w-full space-y-5 p-6 max-w-[860px] m-28 ">
                <div className="flex items-end ml-24 mr-10">
                    <img src={dummyInitLogo} alt="dummy picture" className="rounded-full h-32 mr-3"/>
                    <div>
                        <p className="text-3xl text-white m-2"> Username</p>
                        <p className="text-sm text-gray-400 m-2"> useremail@fiu.edu</p>
                        <div className="flex m-2">
                            <button onClick={() => console.log("X")}>
                                <MdOutlineFileUpload className="text-gray-400 size-6 hover:text-gray-200 mr-2"/>
                            </button>
                            <p className="text-l text-gray-400"> Upload Picture</p>
                        </div>
                    </div>
                </div>
                <div className="ml-24 mr-24 space-y-5">
                    <div className="flex items-end justify-between ">
                        <div className=" w-1/2 ">
                            <p className="text-sm text-white"> First Name</p>
                            <input className="text-white w-11/12 bg-gray-500 h-8"/>
                        </div>
                        <div className=" w-1/2 ">
                            <p className="text-sm text-white"> Last Name</p>
                            <input className="text-white w-full bg-gray-500 h-8"/>
                        </div>
                    </div>
                    <div className=" w-full ">
                        <p className="text-sm text-white"> Email</p>
                        <input className="text-white bg-gray-500 w-full h-8"/>
                    </div>
                    <div className="w-full">
                        <p className="text-sm text-white"> University</p>
                        <input className="text-white bg-gray-500 w-full h-8"/>
                    </div>
                    <div className="w-full">
                        <p className="text-sm text-white"> Grad Year</p>
                        <input type="number" className=" text-white bg-gray-500 w-full h-8"/>
                    </div>
                    <div className="w-full">
                        <button type= "submit" className="bg-white p-2">
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default StudentSettings;