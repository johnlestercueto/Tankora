import Link from "next/link";

export default function CustomerLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-green-600 text-white px-6 py-4 flex justify-between">
        <h1 className="font-bold text-lg">LPG Gas Booking</h1>

        <div className="space-x-4">
          <Link href="/shop">Shop</Link>
          <Link href="/customer-orders">My Orders</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/login" className="text-red-200">
            Logout
          </Link>
        </div>
      </nav>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
