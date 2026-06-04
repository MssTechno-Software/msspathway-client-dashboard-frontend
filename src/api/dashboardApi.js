import { dashboardData } from "../mock/dashboardData";

export const getDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardData);
    }, 800);
  });
};