import CallToAction from "../components/CallToAction";

function Landing () {
    return (
        <section className='min-h-screen bg-stone-900 flex justify-center items-center text-center'>
            <div className='grid grid-rows-2 gap-3'>
                <div>
                    <h1 className='text-white text-5xl'>
                        Welcome to GatherU!
                    </h1>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <CallToAction to={"/login"}>Login</CallToAction>
                    <CallToAction to={"/register"}>Register</CallToAction>
                </div>
            </div>
        </section>
    )
};


export default Landing;