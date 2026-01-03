import Link from "next/link";

export default function DealerLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-black/10 p-6">
        <h2 className="text-xl font-semibold text-black mb-8">Dealer Panel</h2>

        <nav className="flex flex-col space-y-4">
          <Link
            href="/dashboard"
            className="text-black hover:text-green-600 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/products"
            className="text-black hover:text-green-600 transition"
          >
            Products
          </Link>

          <Link
            href="/orders"
            className="text-black hover:text-green-600 transition"
          >
            Orders
          </Link>

          <Link
            href="/dealer-profile"
            className="text-black hover:text-green-600 transition"
          >
            Dealer info
          </Link>

          <Link
            href="/shop-info"
            className="text-black hover:text-green-600 transition"
          >
            Shop info
          </Link>

          <hr className="my-4 border-black/10" />

          <Link
            href="/login"
            className="text-black hover:text-red-600 transition"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-white p-8 text-black">{children}</main>
    </div>
  );
}
