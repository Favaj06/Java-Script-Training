import axios from "axios";

export const getPlans = async () => {
  const res = await axios.get("/api/plan");
  return res.data;
};

export const getDiscoveryCalls = async () => {
  const res = await axios.get("/api/discovery");
  return res.data;
};