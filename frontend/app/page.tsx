export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TODO App
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Modern task management with priorities and labels
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
