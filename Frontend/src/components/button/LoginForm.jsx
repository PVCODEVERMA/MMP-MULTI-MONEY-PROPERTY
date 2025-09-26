// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function LoginForm({ onClose }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     setLoading(true);

//     const fakeLogin = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (email === "test@demo.com" && password === "1234") {
//           resolve("Login success");
//         } else {
//           reject("Invalid credentials");
//         }
//       }, 1200);
//     });

//     toast.promise(fakeLogin, {
//       loading: "Logging in...",
//       success: "Welcome back!",
//       error: "Invalid email or password",
//     });

//     fakeLogin.finally(() => {
//       setLoading(false);
//       onClose?.();
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full bg-white p-6 rounded-2xl space-y-5"
//     >
//       <h1 className="text-xl font-bold text-center text-[#154056]">Login</h1>

//       <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         type="email"
//         className="w-full border-b p-2 outline-none"
//       />

//       <input
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         type="password"
//         className="w-full border-b p-2 outline-none"
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full py-3 rounded-lg text-white font-medium transition cursor-pointer bg-gradient-to-r from-[#ff9c00] to-[#ff9c00] hover:brightness-110"
//       >
//         {loading ? "Logging in…" : "Login"}
//       </button>
//     </form>
//   );
// }
