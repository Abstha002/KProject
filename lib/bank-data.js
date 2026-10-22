
export const accounts = [
  {
    id: "acc-001",
    name: "Everyday Account",
    number: "4821",
    type: "Current Account",
    balance: 182450,
    color: "green",
  },
  {
    id: "acc-002",
    name: "Savings Account",
    number: "9016",
    type: "Savings Account",
    balance: 66200.75,
    color: "dark",
  },
];

export const transactions = [
  {
    id: "TXN-1001",
    title: "Bhat-Bhateni",
    category: "Shopping",
    type: "expense",
    amount: 2450,
    date: "2026-10-22",
    status: "Completed",
    account: "Everyday Account",
  },
  {
    id: "TXN-1002",
    title: "Salary credited",
    category: "Income",
    type: "income",
    amount: 25000,
    date: "2026-10-21",
    status: "Completed",
    account: "Everyday Account",
  },
  {
    id: "TXN-1003",
    title: "Food & Dining",
    category: "Food",
    type: "expense",
    amount: 650,
    date: "2026-10-21",
    status: "Completed",
    account: "Everyday Account",
  },
  {
    id: "TXN-1004",
    title: "Internet bill",
    category: "Utilities",
    type: "expense",
    amount: 1500,
    date: "2026-10-19",
    status: "Pending",
    account: "Everyday Account",
  },
  {
    id: "TXN-1005",
    title: "Freelance project",
    category: "Income",
    type: "income",
    amount: 12000,
    date: "2026-10-18",
    status: "Completed",
    account: "Savings Account",
  },
  {
    id: "TXN-1006",
    title: "Ride sharing",
    category: "Transport",
    type: "expense",
    amount: 450,
    date: "2026-10-17",
    status: "Completed",
    account: "Everyday Account",
  },
];

export const cashFlow = [
  { month: "May", income: 42000, expenses: 28000 },
  { month: "Jun", income: 51000, expenses: 31000 },
  { month: "Jul", income: 47000, expenses: 29500 },
  { month: "Aug", income: 58000, expenses: 35000 },
  { month: "Sep", income: 53000, expenses: 32000 },
  { month: "Oct", income: 65000, expenses: 32400 },
];

export const spendingBreakdown = [
  { name: "Shopping", value: 8500 },
  { name: "Food", value: 6200 },
  { name: "Transport", value: 2800 },
  { name: "Utilities", value: 4900 },
  { name: "Other", value: 10000 },
];
