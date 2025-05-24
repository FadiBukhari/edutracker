// CompletedPendingChart.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStoreCategories } from "../../useStore";

const CompletedPendingChart = () => {
  let completed = 0;
  let pending = 0;
  const { categories } = useStoreCategories();
  categories.forEach((category) => {
    category.tasks.forEach((task) => {
      if (task.status === "completed") {
        completed++;
      } else if (task.status === "pending") {
        pending++;
      }
    });
  });
  const data = [
    { name: "Completed Tasks", value: completed },
    { name: "Pending Tasks", value: pending },
  ];

  const COLORS = ["#00C49F", "#FF8042"]; // Green and orange

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompletedPendingChart;
