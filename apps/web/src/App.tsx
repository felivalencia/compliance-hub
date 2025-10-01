import React, { useEffect, useState } from "react";
import { apiClient } from "./api";
import { Customer } from "./types/customer";

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await apiClient.get<Customer[]>("/customers");
        setCustomers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch customers"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div style={{ fontFamily: "ui-sans-serif", padding: 20 }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ fontFamily: "ui-sans-serif", padding: 20, color: "red" }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "ui-sans-serif", padding: 20 }}>
      <h1>Compliance Hub</h1>
      <h2>Customers ({customers.length})</h2>

      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id} style={{ marginBottom: 8 }}>
              <strong>{customer.name}</strong>
              {customer.curp && ` (${customer.curp})`}
              <br />
              <span style={{ fontSize: "0.9em", color: "#666" }}>
                Status: {customer.status} | Risk: {customer.riskScore} |{" "}
                {customer.occupation || "No occupation"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
