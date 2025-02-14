import { Link } from "react-router-dom";

function Landing () {
    return (
    <section className='min-h-screen bg-stone-900 flex justify-center items-center text-center'>
        <div className='grid grid-rows-2 gap-3'>
            <div>
                <h1 className='text-white text-5xl'>
                    Welcome to GatherU!
                </h1>
            </div>
            <div className=' grid grid-cols-2 gap-3 text-center'>
                <Link className='text-2xl bg-emerald-600 py-2 rounded-sm hover:bg-emerald-500 px-5 text-white' to='/login'>Login</Link>
                <Link className='text-2xl bg-emerald-600 py-2 rounded-sm hover:bg-emerald-500 px-5 text-white' to='/register'>Register</Link>
            </div>
        </div>
    </section>
    )
};

export default Landing;