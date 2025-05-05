import { Link } from "react-router-dom";

function Hero() {
  // { children }
  return (
    <div className="min-h-[80vh] bg-gradient-to-r from-[#0F123F] to-[#1E2A5F] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center mt-24 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <span className="text-lg text-gray-300 font-medium">
              &#8212; Henry Ward Beecher
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              A library is not a luxury but one of the necessities of life.
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Welcome to OFAG Library—your gateway to endless stories and
              knowledge. Browse our collection, place holds, and manage your
              checkouts with ease. Dive into a world of learning and adventure
              today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/"
                className="px-8 py-3 bg-white text-[#0F123F] text-lg font-semibold rounded-lg hover:bg-slate-300 transition-colors duration-200 cursor-pointer z-10"
              >
                Browse Books
              </Link>
              <a
                href="#services"
                className="px-8 py-3 border border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer z-10"
              >
                See More
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <img
              src="/img/pic3.png"
              alt="Library"
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[url('/img/hero-pattern.svg')] bg-cover bg-center opacity-10"></div>
    </div>
  );
}

export default Hero;
