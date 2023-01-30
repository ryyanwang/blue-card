import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Homepage from "./Homepage";
import { PrivateRoute } from "./PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgotPassword from "./ForgotPassword";
import "./styling.css";
function App() {
  const client = new QueryClient();

  return (
    //
    <Container
      className="d-flex align-items-center justify-content-center font"
      style={{
        minHeight: "100vh",
        //backgroundColor: "whitesmoke"
      }}
    >
      <div className="w-100" style={{ maxWitdh: "500px" }}>
        <Router>
          <AuthProvider>
            <QueryClientProvider client={client}>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="homepage" element={<Homepage />} />
              </Routes>
            </QueryClientProvider>
          </AuthProvider>
        </Router>
      </div>
    </Container>
    //
  );
}

export default App;
