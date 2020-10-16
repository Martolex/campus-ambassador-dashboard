import { MdHome } from "react-icons/md";

import React from "react";
import LeadsDashboard from "../content/Leads/LeadsDashboard";
import OrdersDashboard from "../content/orders/OrdersDashboard";

import { BiLogOut, BiPackage } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import StatsDashboard from "../content/Home/StatsDashboard";

import { logout } from "../../redux/actions/authActions";
import { Redirect, useHistory } from "react-router";
const { store } = require("../../redux");

const Logout = (props) => {
  const confirm = window.confirm("are you sure you want to logout ? ");
  if (confirm) {
    store.dispatch(logout());
    return <Redirect to="/" />;
  } else {
    props.history.goBack();
    return null;
  }
};
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
  {
    title: "logout",
    path: "/logout",
    exact: true,
    icon: { component: BiLogOut, size: 28 },
    component: Logout,
  },
];

export default routes;
