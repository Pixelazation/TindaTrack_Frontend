import { Link } from 'react-router';

export default function Home() {
  const links = [
    { path: "/items", label: "Items" },
    { path: "/salesmen", label: "Salesmen" },
    { path: "/accounts", label: "Accounts" },
    { path: "/orders", label: "Orders" },
  ];

  return (
    <div className="m-auto mt-16 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-primary mb-10">Welcome to TindaTrack</h1>

      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="bg-white text-primary rounded-xl p-6 text-center text-xl font-medium shadow-md hover:bg-accent/90 transition"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
