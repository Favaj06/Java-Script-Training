import { useEffect, useState } from "react";
import { getPlans, getDiscoveryCalls } from "../services/adminService";
import type { PlanRequestData, DiscoveryCallData } from "../types/api";

interface Plan extends PlanRequestData {}

interface DiscoveryCall extends DiscoveryCallData {}

const Dashboard = (): React.ReactElement => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [calls, setCalls] = useState<DiscoveryCall[]>([]);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        const plansData = await getPlans();
        const callsData = await getDiscoveryCalls();

        setPlans(plansData.data);
        setCalls(callsData.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>📊 BuildCraft Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", margin: "30px 0" }}>
        <div className="bc-card">
          <h2>{plans.length}</h2>
          <p>Website Requests</p>
        </div>

        <div className="bc-card">
          <h2>{calls.length}</h2>
          <p>Discovery Calls</p>
        </div>
      </div>

      <h2>Latest Website Requests</h2>

      <table border={1} cellPadding={10} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Business</th>
            <th>Industry</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{plan.email}</td>
              <td>{plan.business_name}</td>
              <td>{plan.industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;