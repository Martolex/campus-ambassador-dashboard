import { MdHome } from "react-icons/md";

import React from "react";
import LeadsDashboard from "../content/Leads/LeadsDashboard";
import OrdersDashboard from "../content/orders/OrdersDashboard";

import { BiPackage } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import StatsDashboard from "../content/Home/StatsDashboard";
const routes = [
  {
    title: "home",
    path: "/home",
    exact: true,
    icon: { component: MdHome, size: 28 },
    component: StatsDashboard,
  },
  {
    title: "leads",
    path: "/leads",
    exact: true,
    icon: { component: FaUsers, size: 28 },
    component: LeadsDashboard,
  },
  {
    title: "orders",
    path: "/orders",
    exact: true,
    icon: { component: BiPackage, size: 28 },
    component: OrdersDashboard,
  },
];

export default routes;
