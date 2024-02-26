import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("response: ", response);
      if (response.status === 200) {
        const res = await response.json();
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("token", res.token);
        navigate("/details");
        return;
      }
      if (response.status === 400) {
        setError("Invalid credentials");
      } else {
        setError(response.statusText);
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ error, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
