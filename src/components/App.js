import React from "react";
// import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
// import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Auth from "./Auth";
import { PrivateRoute } from "./PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgotPassword from "./ForgotPassword";
import Success from "./Success";
function App() {
  const client = new QueryClient();

  return (
    // //
    // <Container
    //   className="d-flex align-items-center justify-content-center font"
    //   style={{
    //     minHeight: "100vh",
    //     //backgroundColor: "whitesmoke"
    //   }}
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

            <Route path="/success" element={<Success />} />

            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
      <div className="footer">
        <p style={{ color: "grey", fontSize: "0.7rem" }}>
          Brought to you by SUS UBC | By Ryan Wang{" "}
        </p>
      </div>
    </Router>

    // </Container>
    //
  );
}

export default App;
