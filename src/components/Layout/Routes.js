import { MdHome } from "react-icons/md";

import React from "react";

const routes = [
  {
    title: "home",
    path: "/home",
    exact: true,
    icon: { component: MdHome, size: 28 },
    component: () => <h1>Home</h1>,
  },
];

export default routes;
