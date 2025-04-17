import { useNavigate } from "react-router-dom";
import gatherULogo from '../assets/icons/GatherUIcon.png';

function Landing() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#FFFAFD] flex justify-center items-center p-6">
      <div className="bg-white border-[1.5px] border-black shadow-[4px_4px_0px_#000000] rounded-2xl p-8 sm:p-12 w-full max-w-md text-center space-y-6">
        
        <img src={gatherULogo} alt="GatherU Logo" className="h-16 mx-auto" />

        <h1 className="text-3xl sm:text-4xl font-bold text-black leading-snug">
          Meet your next <span className="text-[#FD4EB7]">skill</span>, <span className="text-[#4D9FFD]">connection</span>, or <span className="text-[#FD4EB7]">moment</span>
        </h1>

        <p className="text-sm text-gray-700">
          Discover events. Join your people. Do cool stuff.
        </p>

        <button
          onClick={() => navigate('/discover')}
          className="bg-white text-black font-medium text-sm px-5 py-2.5 rounded-md border-[1.5px] border-black hover:bg-pink-100 transition-all"
        >
          Explore Events
        </button>

        <p className="text-xs text-gray-500">
          No account needed. Just start exploring. 🌍
        </p>
      </div>
    </section>
  );
}

export default Landing;
