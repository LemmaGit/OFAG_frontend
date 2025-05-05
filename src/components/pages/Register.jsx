import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-center text-2xl font-bold text-blue-700 mb-4">
            OFAG Library Management System
          </h1>
          <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
            Create an Account
          </h2>

          <form action="register.php" method="post" className="space-y-5">
            {/* Error message can go here if needed */}

            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                name="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Register
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// export default function Register() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-5xl text-white text-center font-bold mt-2 relative drop-shadow-lg">
//         OFAG LIBRARY MANAGEMENT SYSTEM
//       </h1>
//       <div className="w-1/2 bg-white p-8 rounded-lg shadow-md mt-6">
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-semibold">Register</h2>
//         </div>
//         <form action="register.php" method="post" className="space-y-4">
//           {/* Error Message */}
//           {/* {typeof error !== 'undefined' && (
//               <div className="bg-red-500 text-white text-center py-2 rounded-md">
//                 {error}
//               </div>
//             )} */}

//           <div>
//             <label htmlFor="firstname" className="block text-sm font-medium">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstname"
//               name="firstname"
//               placeholder="First Name"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="lastname" className="block text-sm font-medium">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastname"
//               name="lastname"
//               placeholder="Last Name"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Email"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="username" className="block text-sm font-medium">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               placeholder="Username"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Password"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="cpassword" className="block text-sm font-medium">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="cpassword"
//               name="cpassword"
//               placeholder="Confirm Password"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="flex justify-center mt-4">
//             <button
//               type="submit"
//               name="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//         <p className="text-center mt-4">
//           Already have an account?
//           <a href="login.php" className="text-blue-600 hover:underline ml-2">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
