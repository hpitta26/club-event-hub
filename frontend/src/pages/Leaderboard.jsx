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
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When fetching an event
    const fetchUserPoints = async () => {
      try {
        const response = await backend.get("students/");
        setUserPoints(response.data.spirit_points);
      } catch (error) {
        console.error("Error fetching user points:", error);
      }
    };

    Promise.all([fetchUserPoints()]).finally(() => setLoading(false));
  });

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
              {mockUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-[#F5F8FF]"
                >
                  <td className="text-center px-4 py-2">
                    <div className="flex justify-center">{user.rank}</div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="text-right font-bold px-4 py-2">
                    {user.points.toLocaleString()} pts
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
