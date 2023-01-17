import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { PrivateRoute } from "./PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgotPassword from "./ForgotPassword";

function App() {
  const client = new QueryClient();

  return (
    //
    <Container
      className="d-flex alignup-itmes-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWitdh: "400px" }}>
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
