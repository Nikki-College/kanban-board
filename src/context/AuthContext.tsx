// "use client";
// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";
// import { validateEmail, validatePassword } from "@/lib/validators";

// type AuthContextType = {
//   isAuthenticated: boolean;
//   signup: (email: string, password: string) => boolean;
//   login: (email: string, password: string) => boolean;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // ✅ Load persisted auth state
//   useEffect(() => {
//     const savedAuth = localStorage.getItem("isAuthenticated");
//     if (savedAuth === "true") setIsAuthenticated(true);
//   }, []);

//   const signup = (email: string, password: string) => {
//     if (!validateEmail(email) || !validatePassword(password)) return false;

//     // ✅ Save user to localStorage (basic demo, not secure)
//     localStorage.setItem("userEmail", email);
//     localStorage.setItem("userPassword", password);
//     localStorage.setItem("isAuthenticated", "true");

//     setIsAuthenticated(true);
//     return true;
//   };

//   const login = (email: string, password: string) => {
//     const storedEmail = localStorage.getItem("userEmail");
//     const storedPassword = localStorage.getItem("userPassword");

//     if (email === storedEmail && password === storedPassword) {
//       localStorage.setItem("isAuthenticated", "true");
//       setIsAuthenticated(true);
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     localStorage.setItem("isAuthenticated", "false");
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };
"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { validateEmail, validatePassword } from "@/lib/validators";

type AuthContextType = {
  isAuthenticated: boolean;
  signup: (email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Load persisted auth state (client-only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedAuth = localStorage.getItem("isAuthenticated");
        if (savedAuth === "true") {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Failed to load auth state:", err);
      }
    }
  }, []);

  const signup = (email: string, password: string) => {
    if (!validateEmail(email) || !validatePassword(password)) return false;

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    localStorage.setItem("isAuthenticated", "true");

    setIsAuthenticated(true);
    return true;
  };

  const login = (email: string, password: string) => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
