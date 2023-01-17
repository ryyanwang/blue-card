import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./styling.css";

//default function Dashboard() {
const Dashboard = () => {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery(["user"], () => {
    return getDoc(doc(db, "users", currentUser?.email)).then((user) =>
      user.data()
    );
  });

  useEffect(() => {
    refetch();
  }, [currentUser, refetch]);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("error Logging Out");
    }
  }

  if (isLoading) {
    return <h1> Loading... </h1>;
  }
  return (
    <>
      <Card className="centerCard">
        <Card.Body>
          <h2 className="text-center mb-4">
            {data?.firstname} {data?.lastname}
          </h2>

          {error && <Alert variant="danger"> {error}</Alert>}
          <img src={data?.image} className="img" alt="Responsive image" />
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Card>
    </>
  );
};
export default Dashboard;
