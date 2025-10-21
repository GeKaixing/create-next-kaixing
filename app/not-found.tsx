import './globals.css';
// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-50">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="mt-4 text-xl text-gray-600">This page could not be found.</p>
          <a
            href="/"
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go back home
          </a>
        </div>
      </body>
    </html>
  );
}