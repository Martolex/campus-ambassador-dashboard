import { backendApi } from "../config";

const ambassadorApi = `${backendApi}ambassador`;

export const loginApi = `${backendApi}auth/ambassadorSignIn`;
export const LeadsApi = {
  getLeads: `${ambassadorApi}/leads`,
  saveLeads: `${ambassadorApi}/leads/newLead`,
};

export const ordersApi = {
  getReferralCodeOrders: `${ambassadorApi}/orders/couponCode`,
  getLeadOrders: `${ambassadorApi}/orders/leads`,
};

export const statsApi = `${ambassadorApi}/stats`;

export const collegeApi = `${ambassadorApi}/colleges`;
