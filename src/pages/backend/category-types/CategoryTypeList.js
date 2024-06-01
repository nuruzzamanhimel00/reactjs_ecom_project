import {
  React,
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  useEffect,
  authHeaders,
  httpRequest,
  categoryTypeListUrl,
  useState,
  DataTable,
  Column,
  Tag,
  IconField,
  InputIcon,
  InputText,
  makeQueryStringUrl,
  Button,
  useNavigate,
  NProgress,
  jsPDF,
  autoTable,
  saveAs,
  XLSX,
  NavLink,
  selectedCategoryTypeDltUrl,
  Form,
  uuidv4,
  Image,
  MySwal,
  useDispatch,
} from "../../../helpers/global-files";

//modal
import BootstrapModal from "../../../components/admin/UI/BootstrapModal.js";

import { useFormik } from "formik";

import ToastNotification from "../../../components/ToastNotification.js";

//redux slice
import { authActions } from "../../../store/toast-slice.js";

let defaultLazyData = {
  first: 0,
  rows: 10,
  page: 1,
  sortField: "",
  sortOrder: "",
  search: "",
  totalPages: 0,
};

let searchColumn = "";

// which keys are symmetrical to our values/initialValues
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.file.path) {
    errors.file = "Required";
  } else if (!/^data:image\/(png|jpg|jpeg);base64,/.test(values.file.path)) {
    errors.file = "Invalid image format. Only PNG, JPG, and JPEG are accepted.";
  }

  if (!values.status) {
    errors.status = "Required";
  }

  return errors;
};

const CategoryTypeList = () => {
  //redux
  const dispatch = useDispatch();
  //react router
  const navigate = useNavigate();
  const [categoryTypes, setCategoryTypes] = useState([]);
  //datatable

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState(null);
  const [lazyState, setlazyState] = useState({ ...defaultLazyData });

  //modal
  const [show, setShow] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    footer: {
      cancle_btn: "Close",
    },
    header: "",
    backdrop: "static",
    size: "lg",
  });

  //formik

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "active",
      file: "",
    },

    validate,
    onSubmit: async (values, { resetForm }) => {
      NProgress.start();
      // alert(JSON.stringify(values, null, 2));
      await httpRequest({
        url: categoryTypeListUrl,
        method: "POST",
        headers: authHeaders(),
        body: values,
      })
        .then((response) => {
          NProgress.done();
          // // Reset the form to initial values
          resetForm();
          if (response && response.status) {
            setShow(false);
            reloadDatatableHandler();
            dispatch(
              authActions.addToast({
                id: new Date().getTime(),
                severity: "success",
                summary: "Success Message",
                detail: response.message,
                life: 3000,
              })
            );
          }
          // console.log("response", response);
        })
        .catch((error) => {
          setLoading(false);
          return "";
        });
    },
  });

  //jsPdf
  const doc = new jsPDF();

  useEffect(() => {
    getProductCategory(defaultLazyData);
  }, []);

  const onGlobalFilterChange = async (e) => {
    clearTimeout(searchColumn);
    const value = e.target.value;
    searchColumn = setTimeout(async () => {
      setLoading(true);
      NProgress.start();
      defaultLazyData = {
        ...defaultLazyData,
        search: value,
      };
      await getProductCategory(defaultLazyData);
      NProgress.done();
      setLoading(false);
    }, 1000);
  };

  const getProductCategory = async (data) => {
    let url = makeQueryStringUrl(categoryTypeListUrl, data);
    setLoading(true);
    await httpRequest({
      url: url,
      method: "GET",
      headers: authHeaders(),
    })
      .then((response) => {
        setLoading(false);
        if (response && response.data.length > 0) {
          response.data.forEach((item) => {
            item.image = "bamboo-watch.jpg";
          });
          setTotalRecords(response.total);
          setCategoryTypes(response.data);
          defaultLazyData = {
            ...data,
            totalPages: response.total,
          };
          setlazyState((prevData) => {
            return { ...prevData, ...defaultLazyData };
          });
        } else {
          setCategoryTypes([]);
        }
        console.log("response", response);
        // console.log("loader result", response);
      })
      .catch((error) => {
        setLoading(false);
        return "";
      });
  };
  //dataTable

  const onSelectionChange = (event) => {
    const value = event.value;
    setSelectedCategoryTypes(value);
    setSelectAll(value.length === totalRecords);
  };
  const selectedItemDeleteHandler = async (e) => {
    e.preventDefault();
    if (selectedCategoryTypes && selectedCategoryTypes.length > 0) {
      let delete_ids = selectedCategoryTypes.map((item) => item.id);

      await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        preConfirm: async () => {
          NProgress.start();
          setLoading(true);

          await httpRequest({
            url: selectedCategoryTypeDltUrl,
            method: "POST",
            headers: authHeaders(),
            body: {
              ids: delete_ids,
            },
          })
            .then((response) => {
              setLoading(false);
              NProgress.done();

              if (response && response.status) {
                let selected_category_types = [...selectedCategoryTypes];
                let category_types = [...categoryTypes];
                //delete datas
                selected_category_types.forEach((item) => {
                  let findIndexOfData = category_types.findIndex(
                    (data) => data.id === item.id
                  );
                  if (findIndexOfData > -1) {
                    category_types.splice(findIndexOfData, 1);
                  }
                });
                setCategoryTypes([...category_types]);

                NProgress.done();
                setLoading(false);
                MySwal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
              console.log("response", response);
              // console.log("loader result", response);
            })
            .catch((error) => {
              setLoading(false);
              return "";
            });
        },
      });
    }
  };
  const deleteDataHandler = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      preConfirm: async () => {
        NProgress.start();
        setLoading(true);

        await httpRequest({
          url: categoryTypeListUrl + "/" + id,
          method: "DELETE",
          headers: authHeaders(),
        })
          .then((response) => {
            setLoading(false);
            NProgress.done();

            if (response && response.status) {
              let category_types_data = [...categoryTypes];

              let findIndexOfData = category_types_data.findIndex(
                (item) => item.id === id
              );

              if (findIndexOfData > -1) {
                category_types_data.splice(findIndexOfData, 1);
                setCategoryTypes([...category_types_data]);
              }
              NProgress.done();
              setLoading(false);
              MySwal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            console.log("response", response);
            // console.log("loader result", response);
          })
          .catch((error) => {
            setLoading(false);
            return "";
          });
      },
    });
    // alert("deleteDataHandler");
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
        alt={product.image}
        className=" shadow-2 border-round"
        style={{ width: "5rem" }}
      />
    );
  };
  const onPage = async (event) => {
    defaultLazyData = {
      ...event,
      page: event.page + 1,
    };
    await getProductCategory(defaultLazyData);
  };

  const onSort = async (event) => {
    setLoading(true);
    NProgress.start();
    defaultLazyData = {
      ...defaultLazyData,
      ...event,
    };

    setlazyState((prevData) => {
      return { ...prevData, ...defaultLazyData };
    });
    await getProductCategory(defaultLazyData);
    NProgress.done();
    setLoading(false);
  };

  const generateExcelHandler = () => {
    setLoading(true);
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
      setLoading(false);
      if (categoryTypes.length > 0) {
        let newCategoryTypes = categoryTypes.map((category, key) => {
          return {
            no: key + 1,
            name: category.name,
            status: category.status,
          };
        });

        const worksheet = XLSX.utils.json_to_sheet(newCategoryTypes);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "category-types");
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });
        saveAs(blob, "category-types.xlsx");

        console.log("newCategoryTypes", newCategoryTypes);
      }
    }, 1000);
  };

  const pdfGenerateHandler = () => {
    setLoading(true);
    NProgress.start();
    setTimeout(() => {
      if (categoryTypes.length > 0) {
        NProgress.done();
        setLoading(false);
        autoTable(doc, {
          head: [["No", "Name", "Status"]],
          body: categoryTypes.map((category, key) => {
            return [key + 1, category.name, category.status];
          }),
        });

        doc.save("category-types.pdf");
      }
    }, 1000);
  };

  const reloadDatatableHandler = async () => {
    setLoading(true);
    NProgress.start();
    defaultLazyData = {
      first: 0,
      rows: 10,
      page: 1,
      sortField: "",
      sortOrder: "",
      filters: ["name", "status"],
      totalPages: 0,
    };
    await getProductCategory(defaultLazyData);
    NProgress.done();
    setLoading(false);
  };

  //category type create
  const createHandler = () => {
    setModalConfig((prevData) => {
      return {
        ...prevData,
        header: "Create Category Type",
      };
    });
    setShow(true);
  };

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between">
        <div>
          <Button
            label="Create"
            icon="pi pi-plus"
            rounded
            loading={loading}
            className="rounded-pill me-2"
            onClick={createHandler}
            size="small"
          />
          <Button
            label="PDF"
            icon="pi pi-file-pdf"
            severity="success"
            rounded
            loading={loading}
            className="rounded-pill me-2"
            onClick={pdfGenerateHandler}
            size="small"
          />
          <Button
            label="Excel"
            icon="pi pi-file-excel"
            severity="warning"
            rounded
            loading={loading}
            className="rounded-pill me-2"
            onClick={generateExcelHandler}
            size="small"
          />
          <Button
            label="Reload"
            icon="pi pi-refresh"
            severity="help"
            rounded
            loading={loading}
            className="rounded-pill me-2"
            onClick={reloadDatatableHandler}
            size="small"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            rounded
            loading={loading}
            className="rounded-pill me-2"
            size="small"
            onClick={selectedItemDeleteHandler}
          />
        </div>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };
  const header = renderHeader();

  const footer = `In total there are ${
    categoryTypes ? categoryTypes.length : 0
  } category types.`;
  const statusBodyTemplate = (data) => {
    return <Tag value={data.status} severity={getSeverity(data)}></Tag>;
  };

  const actionBodyTemplate = (data) => {
    return (
      <>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info me-2 btn-sm"
          size="sm"
          onClick={() => navigate("/admin/dashboard")}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success me-2 btn-sm"
          size="sm"
          onClick={() => navigate("/admin/dashboard")}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger  me-2 btn-sm"
          size="sm"
          onClick={() => deleteDataHandler(data.id)}
        />
      </>
    );
  };

  const getSeverity = (data) => {
    switch (data.status) {
      case "active":
        return "success";

      case "inactive":
        return "danger";

      default:
        return null;
    }
  };

  //category create
  const handleClose = () => {
    setShow(false);
  };

  const fileChangeHandler = (event) => {
    let fomikData = { ...formik.values };

    let allowedExtension = ["image/jpeg", "image/jpg", "image/png"];
    let file = event.target.files[0];

    if (!allowedExtension.includes(file.type)) {
      alert("Invalid file type");
      return false;
    }
    //bae64 encode the file
    let uuid = uuidv4();

    const reader = new FileReader();
    reader.onload = (event) => {
      fomikData.file = {
        id: uuid,
        type: file.type,
        name: file.name,
        path: event.target.result,
      };

      formik.setValues({ ...fomikData });
    };
    reader.readAsDataURL(file);
  };

  const deleteFileHandler = (event) => {
    event.preventDefault();
    formik.setFieldValue("file", ""); // Reset the email field
  };

  return (
    <div>
      {/* Toaster Prime React  */}
      <ToastNotification />
      <BootstrapModal show={show} onHide={handleClose} {...modalConfig}>
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Name</Form.Label>

                        <Form.Control
                          name="name"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />

                        {formik.errors.name && formik.touched.name ? (
                          <div className="text-danger">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Status</Form.Label>

                        <div className="d-flex">
                          <Form.Check
                            className="me-3" // prettier-ignore
                            type="radio"
                            name="status"
                            id={`default-Active`}
                            label={` Active`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.status === "active"}
                            value="active"
                          />
                          <Form.Check // prettier-ignore
                            type="radio"
                            id={`default-Inactive`}
                            name="status"
                            label={` Inactive`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.status === "inactive"}
                            value="inactive"
                          />
                        </div>
                        {formik.errors.status && formik.touched.status ? (
                          <div className="text-danger">
                            {formik.errors.status}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        controlId="formFile"
                        className="mb-3 d-flex flex-column"
                      >
                        <Form.Label>Images</Form.Label>
                        <input
                          id="formFile"
                          type="file"
                          accept="image/*"
                          name="file"
                          onChange={fileChangeHandler}
                          // onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Form.Group>
                      {formik.values.file !== "" && (
                        <div className="multile_image">
                          <div className="image_preview">
                            {["image/jpeg", "image/jpg", "image/png"].includes(
                              formik.values.file.type
                            ) ? (
                              <div>
                                <Image
                                  src={formik.values.file.path}
                                  alt="Image"
                                  width="100"
                                  preview
                                />
                                <p>{formik.values.file.name}</p>
                              </div>
                            ) : (
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100"
                                  height="100"
                                  fill="currentColor"
                                  className="bi bi-file-earmark-pdf-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"
                                  />
                                </svg>
                                <p>File name.jpg</p>
                              </div>
                            )}

                            <div>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={deleteFileHandler}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {formik.errors.file ? (
                        <div className="text-danger">{formik.errors.file}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Button label="Submit" type="submit" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </form>
      </BootstrapModal>
      <Container>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Breadcrumb>
                  <Breadcrumb.Item href="#">
                    <NavLink to="/admin/dashboard">Dashboard </NavLink>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item active>Category Type</Breadcrumb.Item>
                </Breadcrumb>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <Card>
              <Card.Body>
                <DataTable
                  header={header}
                  footer={footer}
                  value={categoryTypes}
                  rows={defaultLazyData.rows}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  tableStyle={{ minWidth: "50rem" }}
                  //lazy loading
                  paginator
                  first={lazyState.first}
                  totalRecords={totalRecords}
                  onPage={onPage}
                  loading={loading}
                  lazy
                  //sort
                  onSort={onSort}
                  sortField={lazyState.sortField}
                  sortOrder={lazyState.sortOrder}
                  //others
                  showGridlines
                  stripedRows
                  emptyMessage="Data not found!!"
                  //checkbox
                  selectionMode={null}
                  selection={selectedCategoryTypes}
                  onSelectionChange={onSelectionChange}
                  // //select all
                  selectAll={selectAll}
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                  ></Column>
                  <Column
                    field="image"
                    header="Image"
                    body={imageBodyTemplate}
                  ></Column>

                  <Column field="name" header="Name" sortable></Column>

                  <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                    sortable
                  ></Column>
                  <Column
                    header="Actions"
                    body={actionBodyTemplate}
                    sortable
                  ></Column>
                </DataTable>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryTypeList;
