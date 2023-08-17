/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Roles from "views/Roles/Roles";
import Permissions from "views/Permissions/Permissions";
import RolesPermission from "views/Roles_Permission/Roles_Permission";
import Teacher from "views/Teacher/Teacher";
import Designation from "views/Designation/Designation";
import Department from "views/Department/Department";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/roles",
    name: "Roles",
    icon: "ni ni-tv-2 text-primary",
    component: <Roles />,
    layout: "/admin",
  },
  {
    path: "/permissions",
    name: "Permissions",
    icon: "ni ni-tv-2 text-primary",
    component: <Permissions />,
    layout: "/admin",
  },
  
  {
    path: "/roles_permissions",
    name: "Roles & Permissions",
    icon: "ni ni-tv-2 text-primary",
    component: <RolesPermission />,
    layout: "/admin",
  },
  {
    path: "/teachers",
    name: "Teachers",
    icon: "ni ni-tv-2 text-primary",
    component: <Teacher />,
    layout: "/admin",
  },
  {
    path: "/designations",
    name: "Designation",
    icon: "ni ni-tv-2 text-primary",
    component: <Designation />,
    layout: "/admin",
  },
  {
    path: "/departments",
    name: "Departments",
    icon: "ni ni-tv-2 text-primary",
    component: <Department />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
