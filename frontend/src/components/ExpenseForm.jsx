import { useState } from "react";
import API from "../api";

function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.amount || !form.category || !form.date) {
      setError("Please fill all required fields");
      return;
    }

    if (form.amount <= 0) {
      setError("Amount must be positive");
      return;
    }

    if (loading) return;

    setLoading(true);

    const payload = {
      ...form,
      amount: Math.round(Number(form.amount) * 100),
    };

    const idempotencyKey = Date.now().toString();

    try {
      const res = await API.post("/expenses", payload, {
        headers: {
          "Idempotency-Key": idempotencyKey,
        },
      });

      onAdd(res.data);

      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });

    } catch (err) {
      console.error(err);
      setError("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Expense</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="number"
        placeholder="Amount (₹)"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <button disabled={loading}>
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;