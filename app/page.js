
export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8 text-gray-900 transition-colors dark:bg-gray-950 dark:text-white">
      <h1 className="text-3xl font-bold">
        Welcome to my website
      </h1>

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        This page supports light and dark mode.
      </p>

      <div className="mt-6 rounded-xl bg-gray-100 p-6 dark:bg-gray-800">
        <h2 className="text-xl font-semibold">My first card</h2>
        <p className="mt-2">
          The background and text change with the themee.
        </p>
      </div>
    </main>
  );
}
