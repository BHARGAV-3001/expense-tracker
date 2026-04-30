import { useEffect, useState } from "react";
import API from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date_desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    setLoading(true);
    setError("");

    try {
      let url = "/expenses?";
      if (category) url += `category=${category}&`;
      if (sort) url += `sort=${sort}`;

      const res = await API.get(url);
      setExpenses(res.data);

    } catch (err) {
      console.error(err);
      setError("Failed to load expenses");
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [category, sort]);

  const handleAdd = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  // ✅ DELETE HANDLER
  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense");
    }
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="app">
      <div className="header">Expense Dashboard</div>

      <div className="top-row">
        <div className="card total-card">
          <div>Total Spent</div>
          <div>₹{(total / 100).toLocaleString()}</div>
        </div>

        <div className="card controls">
          <input
            placeholder="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <button
            onClick={() =>
              setSort((prev) =>
                prev === "date_desc" ? "date_asc" : "date_desc"
              )
            }
          >
            Sort: {sort === "date_desc" ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="main">
        <div className="card form-card">
          <ExpenseForm onAdd={handleAdd} />
        </div>

        <div className="card list-card">
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;