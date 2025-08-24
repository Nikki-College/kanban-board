// // redux/slices/authSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type AuthState = {
//   isAuthenticated: boolean;
//   user: { email: string } | null;
// };

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<{ email: string }>) => {
//       state.isAuthenticated = true;
//       state.user = { email: action.payload.email };
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
// "use client";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface User {
//   email: string;
// }

// interface AuthState {
//   isAuthenticated: boolean;
//   user: User | null;
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<User>) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       if (typeof window !== "undefined") {
//         localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, user: action.payload }));
//       }
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("auth");
//       }
//     },
//     hydrateAuth: (state) => {
//       if (typeof window !== "undefined") {
//         const savedAuth = localStorage.getItem("auth");
//         if (savedAuth) {
//           const parsed = JSON.parse(savedAuth);
//           state.isAuthenticated = parsed.isAuthenticated;
//           state.user = parsed.user;
//         }
//       }
//     },
//   },
// });

// export const { login, logout, hydrateAuth } = authSlice.actions;
// export default authSlice.reducer;

"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user?: { email: string };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = undefined;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
    hydrateAuth: (state) => {
      const savedAuth = localStorage.getItem("isAuthenticated");
      const savedUser = localStorage.getItem("user");
      if (savedAuth === "true" && savedUser) {
        state.isAuthenticated = true;
        state.user = JSON.parse(savedUser);
      }
    },
  },
});

export const { login, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
