import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Image, Badge } from "react-bootstrap";
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
    <div className="container col d-flex flex-wrap align-items-center">
      <Card
        className="centerCardPhoto w-100"
        bg="light"
        style={{ borderRadius: "20px" }}
      >
        <Card.Header
          as="h1"
          className="text-center"
          style={{ border: "white" }}
        >
          {data?.firstname} {data?.lastname}
        </Card.Header>
        <Card.Body className="idBody">
          <h2 className="text-center mb-4">
            <strong></strong>
          </h2>
          {/* <Image
            fluid="true"
            rounded="true"
            src={data?.image}
            className="image"
            alt="Responsive image"
          ></Image> */}
          {/* <Card.Img src={data?.image} alt="Responsive image" /> */}
          {error && <Alert variant="danger"> {error}</Alert>}
          <img
            src={data?.image}
            className="image centerCard"
            alt="Responsive image"
          />
        </Card.Body>
        <div className="w-100 text-center mt-1">
          <Button variant="outline-primary mb-3" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
        <Card.Footer className="text-right" style={{ border: "white" }}>
          <Badge bg="secondary"> Approved </Badge>
        </Card.Footer>
      </Card>
    </div>
  );
};
export default Dashboard;
