import { backendApi } from "../config";

const ambassadorApi = `${backendApi}ambassador`;

export const loginApi = `${backendApi}auth/ambassadorSignIn`;
export const LeadsApi = {
  getLeads: `${ambassadorApi}/leads`,
  saveLeads: `${ambassadorApi}/leads/newLead`,
};

export const ordersApi = {
  getOrders: `${ambassadorApi}/orders`,
};

export const statsApi = `${ambassadorApi}/stats`;

export const collegeApi = `${ambassadorApi}/colleges`;
