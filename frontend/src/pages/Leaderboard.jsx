import React, { useEffect, useState } from "react";
import { LuTrophy, LuMedal, LuAward } from "react-icons/lu";
import backend from "../components/backend";
import { useSidebar } from "../context/SidebarContext";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loggedInStudent, setLoggedInStudent] = useState(null);
    const { setPage } = useSidebar();

    useEffect(() => {
        // Set the current page when the component mounts
        setPage("leaderboard");

        const fetchUsers = async () => {
            try {
                const response = await backend.get("get-top-students/");
                const data = response.data;

                // Add the logged-in student to the list if not already present
                const allUsers = [...data.top_students];
                if (!allUsers.some((user) => user.id === data.logged_in_student.id)) {
                    allUsers.push(data.logged_in_student);
                }

                // Sort users by rank
                allUsers.sort((a, b) => a.rank - b.rank);

                setUsers(allUsers);
                setLoggedInStudent(data.logged_in_student);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [setPage]);

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <LuTrophy className="h-5 w-5 text-yellow-500" />;
            case 2:
                return <LuMedal className="h-5 w-5 text-gray-400" />;
            case 3:
                return <LuAward className="h-5 w-5 text-amber-700" />;
            default:
                return <span className="text-sm font-medium">{rank}</span>;
        }
    };

    return (
        <section className="min-h-screen bg-[#FFFAFD] flex flex-col items-center pb-20 pt-[80px] md:pt-[120px]">
            <div className="w-full max-w-[860px] px-4 md:px-8">
                {/* Page Title - Centered for mobile */}
                <div className="text-center md:text-left mb-6">
                    <h1 className="text-3xl pt-4 md:text-4xl font-bold mb-2">Leaderboard</h1>
                    <p className="text-sm md:text-base">Top 50</p>
                </div>

                {/* Leaderboard */}
                <div className="bg-white border-2 border-black rounded-[10px] shadow-[2px_2px_0_#000] overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-xs md:text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b-2 border-b-black">
                                    <th className="h-10 md:h-12 px-2 md:px-4 w-10 md:w-16 text-center align-middle font-medium text-muted-foreground">Rank</th>
                                    <th className="h-10 md:h-12 px-2 md:px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                    <th className="h-10 md:h-12 px-2 md:px-4 text-left align-middle font-medium text-muted-foreground">Events</th>
                                    <th className="h-10 md:h-12 px-2 md:px-4 text-left align-middle font-medium text-muted-foreground">Spirit</th>
                                    <th className="h-10 md:h-12 px-2 md:px-4 text-right align-middle font-medium text-muted-foreground">Points</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className={`border-b transition-colors hover:bg-muted/50 ${
                                            loggedInStudent && user.id === loggedInStudent.id ? "bg-yellow-100" : ""
                                        }`}
                                    >
                                        <td className="p-2 md:p-4 text-center align-middle">
                                            <div className="flex justify-center">
                                                {getRankIcon(user.rank || 0)}
                                            </div>
                                        </td>
                                        <td className="p-2 md:p-4 align-middle">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black overflow-hidden">
                                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-medium text-xs md:text-sm">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-2 md:p-4 text-left font-bold align-middle text-xs md:text-sm">
                                            {user.events_attended}
                                        </td>
                                        <td className="p-2 md:p-4 text-left font-bold align-middle text-xs md:text-sm">
                                            50%
                                        </td>
                                        <td className="p-2 md:p-4 text-right font-bold align-middle text-xs md:text-sm">
                                            {user.points.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;