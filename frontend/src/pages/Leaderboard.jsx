/*
  Points feature implementation
  - Add points to users: Done
    - users need to rsvp to events: Done
      - 10-15 pts for regular events: Done
      - 20-25 pts for workshops and learning sessions: Done
      - 30-35 pts for competitions: Done
  - Display points on leaderboard
*/
import React, { useState, useEffect } from "react";
import UserPointsDisplay from "../components/UserPointsDisplay";
import backend from "../components/backend";

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    points: 1200,
    rank: 1,
  },
  {
    id: "2",
    name: "Jane Smith",
    points: 980,
    rank: 2,
  },
  {
    id: "3",
    name: "Bob Wilson",
    points: 850,
    rank: 3,
  },
  {
    id: "4",
    name: "Alice Brown",
    points: 720,
    rank: 4,
  },
  {
    id: "5",
    name: "Mike Johnson",
    points: 650,
    rank: 5,
  },
];

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When fetching an event
    const fetchData = async () => {
      try {
        const usersResponse = await backend.get("/all-students/");
        console.log("Received data:", usersResponse.data);
        // Sort users by points and add rank
        const sortedUsers = usersResponse.data
          .sort((a, b) => b.spirit_points - a.spirit_points)
          .map((user, index) => ({
            ...user,
            rank: index + 1,
            name: `${user.first_name} ${user.last_name}`,
          }));

        console.log("Processed users:", sortedUsers);
        setUsers(sortedUsers);

        const response = await backend.get("students/");
        setUserPoints(response.data.spirit_points);
      } catch (error) {
        console.error("Error fetching user points:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  console.log("Current users state:", users);
  console.log("Loading state:", loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto h-[calc(100vh)]">
      <div className="px-1 py-6">
        <div className="flex justify-between mb-6 mt-20">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <UserPointsDisplay points={userPoints} />
        </div>
        <div className="bg-white border-2 border-black rounded-[10px] shadow-[2px_2px_0_#000] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-b-black">
                <th className="w-16 text-center px-4 py-2">Rank</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-[#F5F8FF]"
                >
                  <td className="text-center px-4 py-2">
                    <div className="flex justify-center">
                      {user.rank <= 3 ? (
                        <span
                          className={`
                            text-lg font-bold
                            ${user.rank === 1 ? "text-yellow-500" : ""}
                            ${user.rank === 2 ? "text-gray-500" : ""}
                            ${user.rank === 3 ? "text-amber-700" : ""}
                          `}
                        >
                          {user.rank === 1
                            ? "🥇"
                            : user.rank === 2
                              ? "🥈"
                              : "🥉"}
                        </span>
                      ) : (
                        user.rank
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden">
                        <img
                          src={user.avatar}
                          alt={user.first_name[0]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="text-right font-bold px-4 py-2">
                    {user.spirit_points.toLocaleString()} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
