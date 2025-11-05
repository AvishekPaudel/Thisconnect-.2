import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts/profile", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUser(response.data.user || null);
        }
      } catch (error) {
        const publicPaths = ["/UserLogin", "/UserRegister", "/"];
        if (!publicPaths.includes(location.pathname)) {
          navigate("/UserLogin");
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [location.pathname, navigate]);

  const logout = async () => {
      try {
        await axios.post('http://localhost:8000/api/logout', {}, {
          withCredentials: true 
        });
        
        setUser(null);
        
        navigate('/UserLogin');
      } catch (error) {
        console.error('Logout error:', error);
        setUser(null);
        navigate('/UserLogin');
      }
    };

  if (loading) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ user,logout,setUser}}>
      {children}
    </UserContext.Provider>
  );
};
