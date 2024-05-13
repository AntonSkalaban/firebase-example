import { FC } from "react";
import { AuthProvider } from "./AuthProvider";
import { Route, Routes } from "react-router-dom";
import { Home } from "./HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { Chat } from "./ChatPage";

export const App: FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};
