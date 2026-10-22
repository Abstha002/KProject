
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  ChartNoAxesCombined,
  CreditCard,
  Settings,
  Bell,
  Search,
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  ShoppingBag,
  Utensils,
  Car,
  ReceiptText,
  CircleDollarSign,
  Landmark,
  PiggyBank,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  accounts,
  transactions,
  cashFlow,
  spendingBreakdown,
} from "@/lib/bank-data";

const currency = (amount) =>
  `रू ${Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const navItems = [
  { label: "Overview", href: "#overview", icon: LayoutDashboard },
  { label: "Accounts", href: "#accounts", icon: Wallet },
  { label: "Transactions", href: "#transactions", icon: ArrowLeftRight },
  { label: "Analytics", href: "#insights", icon: ChartNoAxesCombined },
  { label: "Cards", href: "#cards", icon: CreditCard },
];

const categoryIcons = {
  Shopping: ShoppingBag,
  Food: Utensils,
  Transport: Car,
  Utilities: ReceiptText,
  Income: ArrowDownLeft,
};

const chartColors = ["#173D35", "#C2A878", "#7C9A8E", "#A6B7AF", "#D7DCD8"];

function BankSidebar({ mobileOpen, closeMobile }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white p-5 transition-transform dark:border-gray-800 dark:bg-gray-950 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173D35] text-white">
              <Landmark size={23} />
            </span>
            <span>
              <span className="block text-xl font-bold tracking-tight text-gray-950 dark:text-white">
                kriBank
              </span>
              <span className="text-xs text-gray-500">Digital banking</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMobile}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Banking
        </p>

        <nav className="space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              onClick={closeMobile}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                label === "Overview"
                  ? "bg-[#173D35] text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <Icon size={19} />
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-[#F3F5F2] p-4 dark:bg-gray-900">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#173D35] dark:bg-gray-800 dark:text-[#A8C6B7]">
            <ShieldIcon />
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Banking made simple
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
            This is a demo dashboard with fictional financial data.
          </p>
        </div>
      </aside>
    </>
  );
}

function ShieldIcon() {
  return <CheckCircle2 size={20} />;
}

function BankTopbar({ search, setSearch, openMobile, notify }) {
  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-4 border-b border-gray-200 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8 dark:border-gray-800 dark:bg-gray-950/90">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={openMobile}
          className="rounded-xl border border-gray-200 p-2 text-gray-700 lg:hidden dark:border-gray-700 dark:text-gray-200"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back,
          </p>
          <h1 className="text-lg font-bold text-gray-950 sm:text-xl dark:text-white">
            Abhaya
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <label className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 md:flex dark:border-gray-700 dark:bg-gray-900">
          <Search size={17} className="text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search transactions..."
            className="w-44 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 lg:w-56 dark:text-white"
          />
        </label>

        <button
          type="button"
          onClick={notify}
          aria-label="Notifications"
          className="relative rounded-xl border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E1EAE4] text-sm font-bold text-[#173D35] dark:bg-[#26463B] dark:text-white">
          AS
        </div>
      </div>
    </header>
  );
}

function BalanceCard({ hidden, toggleHidden }) {
  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#173D35] p-6 text-white shadow-sm sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" />
      <div className="pointer-events-none absolute -bottom-28 right-20 h-56 w-56 rounded-full border-[28px] border-white/5" />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            Total account balance
            <button
              type="button"
              onClick={toggleHidden}
              aria-label={hidden ? "Show balance" : "Hide balance"}
              className="rounded-lg p-1 hover:bg-white/10"
            >
              {hidden ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {hidden ? "रू ••••••••" : currency(totalBalance)}
          </p>

          <p className="mt-3 text-sm text-white/70">
            Across {accounts.length} demo accounts
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 p-3">
          <Wallet size={25} />
        </div>
      </div>

      <div className="relative mt-8 flex flex-wrap items-center gap-6 border-t border-white/15 pt-5">
        <div>
          <p className="text-xs text-white/60">Income this month</p>
          <p className="mt-1 font-semibold">+ रू 65,000.00</p>
        </div>
        <div>
          <p className="text-xs text-white/60">Expenses this month</p>
          <p className="mt-1 font-semibold">− रू 32,400.00</p>
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs text-[#D9E9DE]">
          <ChartNoAxesCombined size={15} />
          Monthly overview
        </div>
      </div>
    </section>
  );
}

function QuickActions({ onAction }) {
  const actions = [
    { label: "Transfer", icon: ArrowLeftRight },
    { label: "Add money", icon: Plus },
    { label: "Pay bills", icon: ReceiptText },
    { label: "My accounts", icon: Wallet },
  ];

  return (
    <section>
      <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
        Quick actions
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => onAction(label)}
            className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#9DB7A8] hover:shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF0EB] text-[#173D35] group-hover:bg-[#173D35] group-hover:text-white dark:bg-gray-800 dark:text-[#B8D0C1]">
              <Icon size={19} />
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function AccountList({ hidden }) {
  return (
    <section id="accounts" className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-bold text-gray-900 dark:text-white">
          My accounts
        </h2>
        <span className="text-xs text-gray-500">2 accounts</span>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/70"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                account.color === "green"
                  ? "bg-[#DDE9E0] text-[#173D35] dark:bg-[#26463B] dark:text-[#C5DACE]"
                  : "bg-[#EEE8DA] text-[#78643B] dark:bg-[#413A2C] dark:text-[#E3D0A3]"
              }`}
            >
              {account.color === "green" ? (
                <Wallet size={20} />
              ) : (
                <PiggyBank size={20} />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {account.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {account.type} · •••• {account.number}
              </p>
            </div>

            <p className="text-right text-sm font-bold text-gray-900 dark:text-white">
              {hidden ? "••••••" : currency(account.balance)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CashFlowChart() {
  return (
    <section id="insights" className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white">
            Cash flow
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Income vs. expenses · Last 6 months
          </p>
        </div>
        <span className="rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          6 months
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cashFlow} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F8A70" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4F8A70" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C2A878" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#C2A878" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              formatter={(value, name) => [currency(value), name === "income" ? "Income" : "Expenses"]}
              contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#4F8A70"
              strokeWidth={2.5}
              fill="url(#incomeFill)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#C2A878"
              strokeWidth={2.5}
              fill="url(#expenseFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex gap-5 text-xs text-gray-500">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#4F8A70]" />
          Income
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#C2A878]" />
          Expenses
        </span>
      </div>
    </section>
  );
}

function SpendingBreakdown() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="font-bold text-gray-900 dark:text-white">
        Spending breakdown
      </h2>
      <p className="mt-1 text-xs text-gray-500">
        Example monthly expenses by category
      </p>

      <div className="relative mt-2 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spendingBreakdown}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
            >
              {spendingBreakdown.map((item, index) => (
                <Cell key={item.name} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => currency(value)} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500">Total</span>
          <span className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
            रू 32,400
          </span>
        </div>
      </div>

      <div className="mt-2 space-y-3">
        {spendingBreakdown.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: chartColors[index % chartColors.length] }}
            />
            <span className="flex-1 text-gray-600 dark:text-gray-300">
              {item.name}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {currency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TransactionList({ search }) {
  const [filter, setFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.id.toLowerCase().includes(query);

      const matchesType =
        filter === "all" || transaction.type === filter;

      return matchesSearch && matchesType;
    });
  }, [search, filter]);

  return (
    <section id="transactions" className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white">
            Recent transactions
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Your latest account activity
          </p>
        </div>

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Filter transactions by type"
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="all">All transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400 dark:border-gray-800">
              <th className="pb-3 font-medium">Transaction</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => {
              const Icon =
                categoryIcons[transaction.category] || CircleDollarSign;

              return (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 last:border-0 dark:border-gray-800"
                >
                  <td className="py-4 pr-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        <Icon size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {transaction.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {transaction.id} · {transaction.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 text-sm text-gray-500">
                    {new Date(`${transaction.date}T00:00:00`).toLocaleDateString(
                      "en-NP",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        transaction.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td
                    className={`py-4 text-right text-sm font-bold ${
                      transaction.type === "income"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "−"}
                    {" "}
                    {currency(transaction.amount)}
                  </td>
                </tr>
              );
            })}

            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-sm text-gray-500">
                  No transactions match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function BankCard() {
  return (
    <section id="cards" className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900 dark:text-white">My card</h2>
          <p className="mt-1 text-xs text-gray-500">Virtual demo card</p>
        </div>
        <MoreHorizontal size={21} className="text-gray-400" />
      </div>

      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#244F43] to-[#0E2822] p-5 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <Landmark size={25} />
          <span className="text-xs font-semibold tracking-widest text-white/70">
            DEBIT
          </span>
        </div>

        <p className="mt-8 text-lg tracking-[0.2em]">
          •••• •••• •••• 4821
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/60">
              Card holder
            </p>
            <p className="mt-1 text-sm font-medium">ABHAYA SHRESTHA</p>
          </div>
          <span className="text-xl font-bold italic">VISA</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">Card status</span>
        <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Demo active
        </span>
      </div>
    </section>
  );
}

export default function BankDashboard() {
  const [hidden, setHidden] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");

  function handleAction(action) {
    setNotice(`${action} is a demo action. We can build this flow next.`);
  }

  return (
    <div className="min-h-screen bg-[#F7F8F6] text-gray-900 dark:bg-gray-950 dark:text-white">
      <BankSidebar
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <div className="min-h-screen lg:pl-64">
        <BankTopbar
          search={search}
          setSearch={setSearch}
          openMobile={() => setMobileOpen(true)}
          notify={() =>
            setNotice("You are all caught up. This is demo notification data.")
          }
        />

        <main id="overview" className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
          {notice && (
            <div
              role="status"
              className="flex items-start justify-between gap-4 rounded-xl border border-[#C7D8CC] bg-[#EDF4EF] px-4 py-3 text-sm text-[#173D35] dark:border-[#315544] dark:bg-[#142B21] dark:text-[#D5E7DB]"
            >
              <p>{notice}</p>
              <button
                type="button"
                onClick={() => setNotice("")}
                className="shrink-0 font-semibold"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Thursday, October 22, 2026
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl dark:text-white">
                Your financial overview
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Here's what's happening with your money.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleAction("Download statement")}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <ArrowUpRight size={17} />
              Download statement
            </button>
          </div>

          <BalanceCard
            hidden={hidden}
            toggleHidden={() => setHidden((current) => !current)}
          />

          <QuickActions onAction={handleAction} />

          <div className="grid gap-5 xl:grid-cols-2">
            <AccountList hidden={hidden} />
            <BankCard />
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
            <CashFlowChart />
            <SpendingBreakdown />
          </div>

          <TransactionList search={search} />

          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 py-5 text-xs text-gray-500 dark:border-gray-800">
            <p>© 2026 kriBank · Learning project</p>
            <p>Fictional data only · No real banking services</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
