import React from "react";
import { LuTrophy, LuMedal, LuAward } from "react-icons/lu";

const mockUsers = [
    { id: "1", name: "Jane Smith", points: 1200, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=JS", rank: 1, eventsAttended: ["1", "3", "5", "7"], spirit_score: 95, events_attended: 4 },
    { id: "2", name: "John Doe", points: 980, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=JD", rank: 2, eventsAttended: ["2", "4", "6"], spirit_score: 90, events_attended: 3 },
    { id: "3", name: "Alex Johnson", points: 870, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=AJ", rank: 3, eventsAttended: ["1", "2", "8"], spirit_score: 88, events_attended: 3 },
    { id: "4", name: "Maria Garcia", points: 750, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=MG", rank: 4, eventsAttended: ["3", "5", "7"], spirit_score: 85, events_attended: 3 },
    { id: "5", name: "Robert Chen", points: 680, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=RC", rank: 5, eventsAttended: ["1", "6"], spirit_score: 80, events_attended: 2 },
    { id: "6", name: "Sarah Williams", points: 620, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=SW", rank: 6, eventsAttended: ["4", "8"], spirit_score: 78, events_attended: 2 },
    { id: "7", name: "Michael Brown", points: 590, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=MB", rank: 7, eventsAttended: ["2", "7"], spirit_score: 75, events_attended: 2 },
    { id: "8", name: "Emily Davis", points: 540, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=ED", rank: 8, eventsAttended: ["1", "5"], spirit_score: 72, events_attended: 2 },
    { id: "9", name: "David Wilson", points: 510, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=DW", rank: 9, eventsAttended: ["3"], spirit_score: 70, events_attended: 1 },
    { id: "10", name: "Linda Martinez", points: 480, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=LM", rank: 10, eventsAttended: ["8"], spirit_score: 68, events_attended: 1 },
    { id: "11", name: "Chris Evans", points: 460, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=CE", rank: 11, eventsAttended: ["2", "4"], spirit_score: 65, events_attended: 2 },
    { id: "12", name: "Sophia Turner", points: 450, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=ST", rank: 12, eventsAttended: ["1", "3", "6"], spirit_score: 63, events_attended: 3 },
    { id: "13", name: "Liam Johnson", points: 440, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=LJ", rank: 13, eventsAttended: ["5", "7"], spirit_score: 60, events_attended: 2 },
    { id: "14", name: "Olivia Brown", points: 430, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=OB", rank: 14, eventsAttended: ["2", "8"], spirit_score: 58, events_attended: 2 },
    { id: "15", name: "Noah Davis", points: 420, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=ND", rank: 15, eventsAttended: ["1", "4"], spirit_score: 55, events_attended: 2 },
    { id: "16", name: "Emma Wilson", points: 410, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=EW", rank: 16, eventsAttended: ["3", "6"], spirit_score: 53, events_attended: 2 },
    { id: "17", name: "James Lee", points: 400, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=JL", rank: 17, eventsAttended: ["5", "7"], spirit_score: 50, events_attended: 2 },
    { id: "18", name: "Mia Garcia", points: 390, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=MG", rank: 18, eventsAttended: ["2", "8"], spirit_score: 48, events_attended: 2 },
    { id: "19", name: "Benjamin Martinez", points: 380, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=BM", rank: 19, eventsAttended: ["1", "4"], spirit_score: 45, events_attended: 2 },
    { id: "20", name: "Charlotte Chen", points: 370, avatar: "https://placehold.co/40x40/47ACDF/FFFFFF?text=CC", rank: 20, eventsAttended: ["3", "6"], spirit_score: 43, events_attended: 2 },
    // Add more users as needed...
];

const Leaderboard = () => {

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
        <section className="min-h-screen bg-[#FFFAFD] flex flex-col items-center pb-20 pt-[120px]">
            <div className="w-full max-w-[860px] space-y-8">
                {/* Page Title */}
                <div>
                    <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
                    <p>Top 50</p>
                </div>
                {/* Leaderboard */}
                <div className="bg-white border-2 border-black rounded-[10px] shadow-[2px_2px_0_#000] overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b-2 border-b-black">
                                    <th className="h-12 px-4 w-16 text-center align-middle font-medium text-muted-foreground">Rank</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Events Attended</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Spirit Score</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Points</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {mockUsers.map((user) => (
                                <tr 
                                    key={user.id} 
                                    className="border-b transition-colors hover:bg-muted/50"
                                >
                                    <td className="p-4 text-center align-middle">
                                        <div className="flex justify-center">
                                            {getRankIcon(user.rank || 0)}
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden">
                                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-left font-bold align-middle">
                                        {user.events_attended}
                                    </td>
                                    <td className="p-4 text-left font-bold align-middle">
                                        {user.spirit_score}%
                                    </td>
                                    <td className="p-4 text-right font-bold align-middle">
                                        {user.points.toLocaleString()} pts
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
}

export default Leaderboard;