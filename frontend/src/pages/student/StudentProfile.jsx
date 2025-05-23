import { useEffect, useState, useContext } from "react";
import backend from "../../middleware/backend";
import { UserContext } from "../../context/UserContext";

function StudentProfile() {
  const [name, setName] = useState(""); 
  const [gradYear, setGradYear] = useState("");
  const [major, setMajor] = useState("");
  const [loading, setLoading] = useState(false);
  const { userContext } = useContext(UserContext);

  // fetch full name and pfp
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        setLoading(true);
        const response = await backend.get("students/");
        setName(response.data.first_name + " " + response.data.last_name);
        setGradYear(response.data.graduation_year);
        setMajor(response.data.major);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserDetails();
  }, []);

  // generate a 2d array of contribution data
  function generateRandomContributionData() {
    const data = [];
    let totalRows = 7;
    let totalCols = 28;
    for (let i = 0; i < totalRows; i++) {
      const row = [];
      for (let j = 0; j < totalCols; j++) {
        const rand = Math.random();
        let intensity;
        if (rand < 0.2) intensity = 0;
        else if (rand < 0.5) intensity = 1;
        else if (rand < 0.7) intensity = 2;
        else if (rand < 0.9) intensity = 2;
        else intensity = 4;
        row.push(intensity);
      }
      data.push(row);
    }
    console.log(data);
    return data;
  }

  const contributionData = generateRandomContributionData();

  if (loading) {
    return;
  }

  return (
    <div className="flex flex-col max-w-5xl mx-auto pt-40 p-3 ">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-2 sm:mb-4 border-2 border-black">
        <img
          src={userContext.profile_picture || "something"}
          alt="Profile Picture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* full name */}
      <h1 className="text-4xl font-bold mb-1">{name}</h1>
      {/* graduation year */}
      <p className="text-gray-800 mb-2 sm:mb-4 text-xs sm:text-lg">
        {gradYear} | {major} @ FIU
      </p>
      {/* description */}
      <p className="text-gray-800 mb-4 sm:mb-7 text-xs sm:text-lg">
        Your bio goes here!
      </p>

      {/* grid */}
      <div className="border-black border-[1.5px] md:p-6 sm:p-4 rounded-lg p-2 shadow-sm">
        <div className="flex flex-col w-full gap-1">
          {contributionData.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex w-full items-center justify-between gap-[2px]"
            >

              {row.map((intensity, colIndex) => {
                let bgColor;
                switch (intensity) {
                  case 0:
                    bgColor = "bg-gray-100";
                    break;
                  case 1:
                    bgColor = "bg-green-300";
                    break;
                  case 2:
                    bgColor = "bg-green-500";
                    break;
                  case 3:
                    bgColor = "bg-green-600";
                    break;
                  case 4:
                    bgColor = "bg-green-800";
                    break;
                  default:
                    bgColor = "bg-gray-100";
                }

                return (
                  <div
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`w-4 h-4 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-md ${bgColor} border-[1.5px] border-black cursor-pointer`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;