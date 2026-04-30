const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// ✅ POST /expenses
router.post("/", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const idempotencyKey = req.header("Idempotency-Key");

    if (!amount || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!idempotencyKey) {
      return res.status(400).json({ error: "Idempotency-Key required" });
    }

    // Check retry
    const existing = await Expense.findOne({
      idempotency_key: idempotencyKey,
    });

    if (existing) {
      return res.status(200).json(existing);
    }

    const expense = new Expense({
      amount,
      category,
      description,
      date,
      idempotency_key: idempotencyKey,
    });

    await expense.save();

    res.status(201).json(expense);

  } catch (err) {
    if (err.code === 11000) {
      const existing = await Expense.findOne({
        idempotency_key: req.header("Idempotency-Key"),
      });
      return res.status(200).json(existing);
    }

    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ GET /expenses
router.get("/", async (req, res) => {
  try {
    const { category, sort } = req.query;

    let query = {};
    if (category) query.category = category;

    let sortOption = {};

    if (sort === "date_desc") {
      sortOption.date = -1;
    } else if (sort === "date_asc") {
      sortOption.date = 1;
    }

    const expenses = await Expense.find(query).sort(sortOption);

    res.json(expenses);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ DELETE /expenses/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Expense.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;