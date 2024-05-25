import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "../reportWebVitals.js";

//react router
import {
  RouterProvider,
  useLoaderData,
  Navigate,
  useNavigate,
} from "react-router-dom";
import router from "../routers/index.js";
//react router

//redux toolkit
import { store } from "../store/index.js";
import { Provider } from "react-redux";

//nprogress
import NProgress from "nprogress";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";

//services
import { httpRequest } from "../services/CommonService.js";

//helpers
import { authHeaders } from "../helpers/AuthHelper.js";
import { makeQueryStringUrl } from "../helpers/CommonHelper.js";

import {
  BASE_URL,
  useLoginUrl,
  authUserUrl,
  categoryTypeListUrl,
} from "../helpers/apiRoutes/index.js";

//prime react
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

//jsPDF
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export {
  jsPDF,
  autoTable,
  IconField,
  InputIcon,
  InputText,
  React,
  reportWebVitals,
  ReactDOM,
  RouterProvider,
  router,
  store,
  Provider,
  NProgress,
  Toast,
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  DataTable,
  Column,
  useEffect,
  useState,
  authHeaders,
  httpRequest,
  categoryTypeListUrl,
  Button,
  Tag,
  useLoaderData,
  Navigate,
  BASE_URL,
  useLoginUrl,
  authUserUrl,
  makeQueryStringUrl,
  useNavigate,
};
