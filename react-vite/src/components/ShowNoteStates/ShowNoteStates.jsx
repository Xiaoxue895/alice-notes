import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchNoteStats } from '../../redux/notes';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const NoteStats = () => {
  const dispatch = useDispatch();
  
  const noteStats = useSelector(state => state.notes.noteStats);

  useEffect(() => {
    dispatch(thunkFetchNoteStats());
  }, [dispatch]);

  if (!noteStats) {
    return <div>Loading...</div>;
  }

  const { category_counts, daily_category_counts } = noteStats;

  // Prepare the category stats for the pie charts
  const categoryStats = Object.entries(category_counts).map(([category, stats]) => ({
    name: category,
    monthCount: stats.month_count,
    weekCount: stats.week_count,
  }));

  const categories = Object.keys(category_counts);
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Prepare the daily category stats for the bar chart
  const formattedDailyData = daily_category_counts
    .map(day => ({
      date: day.date,
      ...day.categories
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); 

  return (
    <div>
      <h1>Note States Dashboard</h1>

      {/* Bar Chart for Daily Category Stats */}
      <div>
        <h2>Daily Category Stats (Last 30 Days)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formattedDailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {categories.map((category, index) => (
              <Bar
                key={category}
                dataKey={category}
                fill={colors[index]}
                name={category}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart for Monthly Category Stats */}
      <div>
        <h2>Category Breakdown (Month)</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={categoryStats}
            dataKey="monthCount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {categoryStats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Pie Chart for Weekly Category Stats */}
      <div>
        <h2>Category Breakdown (Week)</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={categoryStats}
            dataKey="weekCount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {categoryStats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      
    </div>
  );
};

export default NoteStats;


