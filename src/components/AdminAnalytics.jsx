import { useEffect, useState } from "react";
import API from "../api/axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function AdminAnalytics() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/admin/jobs/stats");
    setStats(res.data);
  };

  const data = [
    { name: "Applied", value: stats.APPLIED || 0 },
    { name: "Interview", value: stats.INTERVIEW || 0 },
    { name: "Offer", value: stats.OFFER || 0 },
    { name: "Rejected", value: stats.REJECTED || 0 },
  ];

  const COLORS = ["#2563eb", "#f59e0b", "#10b981", "#ef4444"];

  return (
    <div>
      <h2>Application Analytics</h2>

      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  );
}

export default AdminAnalytics;
