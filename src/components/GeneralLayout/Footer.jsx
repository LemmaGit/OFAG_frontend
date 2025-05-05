import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0F123F] text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About the Library */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold">About the Library</h5>
            <hr className="border-white/20 w-12" />
            <p className="text-gray-300 leading-relaxed">
              Our mission is to link readers with engaging narratives, offer a
              welcoming environment for exploration, and cultivate a passion for
              continuous learning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold">Quick Links</h5>
            <hr className="border-white/20 w-12" />
            <ul className="text-gray-300 space-y-2">
              <li>
                <Link to="/home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/activities"
                  className="hover:text-white transition-colors"
                >
                  My Activity
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold">Location</h5>
            <hr className="border-white/20 w-12" />
            <ul className="text-gray-300 space-y-2">
              <li>Addis Ababa</li>
              <li>Bole Street</li>
              <li>Near to Flamengo Hotel</li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold">Operating Hours</h5>
            <hr className="border-white/20 w-12" />

            <div className="w-full text-gray-300 flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span>Mon - Fri:</span>
                <span>9am - 5pm</span>
              </div>
              <div className="flex gap-2 items-center">
                <span>Sat - Sun:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 flex justify-center gap-6">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.56v14.91c0 .97-.79 1.76-1.76 1.76H1.76C.79 21.23 0 20.44 0 19.47V4.56C0 3.59.79 2.8 1.76 2.8h20.48c.97 0 1.76.79 1.76 1.76zM9.6 18.24V9.6H7.2v8.64h2.4zm-1.2-9.84c.84 0 1.44-.6 1.44-1.44-.02-.84-.6-1.44-1.44-1.44-.84 0-1.44.6-1.44 1.44 0 .84.6 1.44 1.44 1.44zm10.08 9.84v-4.8c0-2.52-1.44-3.6-3.36-3.6-1.56 0-2.28.84-2.64 1.44v-1.2H10.8v8.64h2.4v-4.32c0-1.08.24-2.16 1.56-2.16 1.32 0 1.32 1.2 1.32 2.28v4.2h2.4z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.23 5.924c-.806.358-1.67.6-2.577.708a4.515 4.515 0 001.98-2.49 9.02 9.02 0 01-2.86 1.09 4.51 4.51 0 00-7.69 4.11 12.81 12.81 0 01-9.3-4.71 4.51 4.51 0 001.4 6.02 4.49 4.49 0 01-2.04-.56v.06a4.51 4.51 0 003.62 4.42 4.52 4.52 0 01-2.04.08 4.51 4.51 0 004.21 3.13 9.05 9.05 0 01-5.6 1.93c-.36 0-.72-.02-1.08-.06a12.78 12.78 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.39-.01-.58a9.17 9.17 0 002.26-2.34z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.42 3.44 8.1 7.9 8.1v-5.72H7.9v-2.38h2.04V9.85c0-2.02 1.23-3.13 3.04-3.13.88 0 1.8.16 1.8.16v1.98h-1.02c-1 0-1.32.62-1.32 1.26v1.5h2.22l-.36 2.38h-1.86v5.72c4.46 0 7.9-3.68 7.9-8.1 0-5.5-4.46-9.96-9.96-9.96z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-300 border-t border-white/20 pt-6">
          <p>&copy; 2025 OFAG Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
