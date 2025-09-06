import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔹 Clear tokens/localStorage/session
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 🔹 Purane toast hatao
    toast.remove();

    // 🔹 Logout success toast
    toast.success("Logged out successfully!", {
      duration: 2000,
      style: {
        borderRadius: "10px",
        background: "#EF4444",
        color: "#fff",
        fontWeight: "500",
      },
    });

    // 🔹 2 sec baad login page pe redirect
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);
  };

  return handleLogout;
};

export default useLogout;
