export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p style={{ textAlign: "center" }}>No expenses yet</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Description</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((e) => (
          <tr key={e._id}>
            <td>₹{(e.amount / 100).toFixed(2)}</td>
            <td>{e.category}</td>
            <td>{e.description}</td>
            <td>{new Date(e.date).toLocaleDateString()}</td>
            <td>
              <button
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => onDelete(e._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}