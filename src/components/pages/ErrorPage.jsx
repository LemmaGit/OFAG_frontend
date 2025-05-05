import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-10 text-center">
          {/* Book Stack SVG */}
          <div className="mx-auto w-40 h-40 mb-6">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4F46E5" d="M40 40h120v120H40z" opacity="0.1" />
              <path
                fill="#4F46E5"
                d="M50 50v110h20V50H50zm30 20v90h20V70H80zm30-10v100h20V60h-20z"
                opacity="0.3"
              />
              <path fill="#4F46E5" d="M50 50h20v110H50z" opacity="0.8" />
              <path fill="#4F46E5" d="M80 70h20v90H80z" opacity="0.6" />
              <path fill="#4F46E5" d="M110 60h20v100h-20z" opacity="0.4" />
              <path fill="#EF4444" d="M90 30h20v20H90z" />
            </svg>
          </div>

          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-3">
            Unexpected Chapter
          </h1>

          <p className="text-lg text-stone-600 mb-6">
            We couldn&apos;t find the page you&apos;re looking for. It might
            have been archived or moved.
          </p>

          <div className="text-stone-500 mb-8 p-4 bg-amber-50 rounded-lg">
            <p className="font-mono text-sm">
              {/* {error.statusText || error.message} */}
              <span className="text-3xl">Oops, something went wrong!</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
