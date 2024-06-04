import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "../reportWebVitals.js";

//react router
import {
  RouterProvider,
  useLoaderData,
  Navigate,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import router from "../routers/index.js";
//react router end

//redux toolkit
import { store } from "../store/index.js";
import { Provider, useSelector, useDispatch } from "react-redux";

//nprogress
import NProgress from "nprogress";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

//services
import { httpRequest } from "../services/CommonService.js";

//helpers
import { authHeaders } from "../helpers/AuthHelper.js";
import {
  makeQueryStringUrl,
  nagigateComponent,
} from "../helpers/CommonHelper.js";

import {
  BASE_URL,
  useLoginUrl,
  authUserUrl,
  categoryTypeUrl,
  selectedCategoryTypeDltUrl,
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
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";

//jsPDF
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

//excel
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

//uuid
import { v4 as uuidv4 } from "uuid";

//sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);



export {

  useSelector,
  useDispatch,
  MySwal,
  Image,
  uuidv4,
  Modal,
  FileUpload,
  nagigateComponent,
  Form,
  Outlet,
  NavLink,
  saveAs,
  XLSX,
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
  categoryTypeUrl,
  Button,
  Tag,
  useLoaderData,
  Navigate,
  BASE_URL,
  useLoginUrl,
  authUserUrl,
  makeQueryStringUrl,
  useNavigate,
  selectedCategoryTypeDltUrl,
};
