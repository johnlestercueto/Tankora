import Link from "next/link";

export default function DealerLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dealer Panel</h2>

        <nav className="flex flex-col space-y-3">
          <Link href="/dashboard" className="hover:text-green-400">Dashboard</Link>
          <Link href="/products" className="hover:text-green-400">Products</Link>
          <Link href="/orders" className="hover:text-green-400">Orders</Link>
          <Link href="/logout" className="text-red-400 mt-6">Logout</Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}
