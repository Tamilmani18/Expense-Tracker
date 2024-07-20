const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive integer!" });
    }

    await income.save();

    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add expense" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const incomes = await ExpenseSchema.find().sort({ createdAt: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete expense" });
    });
};
