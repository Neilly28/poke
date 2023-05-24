// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export const useLogout = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // remove user from storage
//     localStorage.removeItem("user");

//     // perform logout actions
//     logout();

//     // navigate to login
//     navigate("/");
//   };

//   return { handleLogout };
// };
