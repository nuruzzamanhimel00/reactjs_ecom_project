import {
  ToastNotification,
  React,
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  NavLink,
  useEffect,
  makeQueryStringUrl,
  useState,
  categoryUrl,
  httpRequest,
  authHeaders,
  Button,
  DataTable,
  InputText,
  InputIcon,
  IconField,
  NProgress,
  Column,
  Tag,
  MySwal,
  selectedCategoryDltUrl,
  Form,
  Image,
  Dropdown,
  ChevronDownIcon,
  ChevronRightIcon,
  uuidv4,
  useDispatch,
  jsPDF,
  autoTable,
  saveAs,
  XLSX,

} from "../../../helpers/global-files.js";
//default image
import defaultImage from "../../../assets/images/default.png";

//modal
import BootstrapModal from "../../../components/admin/UI/BootstrapModal.js";

//redux slice
import { toasterActions } from "../../../store/toast-slice.js";
        

import { useFormik } from "formik";

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
  } else if (values.name.length > 100) {
    errors.name = "Must be 100 characters or less";
  }

  if (!values.file ) {
    errors.file = "Required";
  }

  if (!values.status) {
    errors.status = "Required";
  }
  if (!values.category_type_id) {
    errors.category_type_id = "Required";
  }

  return errors;
};

const initialValues  =  {
  name: "",
  category_type_id: "",
  parent_id: "",
  status: "active",
  file: "",
  id: "",
  method_type:'create'
}

const CategoryList = () => {
    //redux
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lazyState, setlazyState] = useState({ ...defaultLazyData });
  const [selectAll, setSelectAll] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [categoryTypes, setCategoryTypes] = useState([])
  const [selectedCategoryType, setSelectedCategoryType] = useState(null);
  const [Categories, SetCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState(null)
    //modal
    const [show, setShow] = useState(false);
    const [modalConfig, setModalConfig] = useState({
      footer: {
        cancle_btn: "Close",
      },
      header: "",
      backdrop: "static",
      size: "lg",
      type: "create",
    });
  
    //formik

    const formik = useFormik({
      initialValues: initialValues,
  
      validate,
      onSubmit: async (values, { resetForm }) => {
        NProgress.start();
  
        await httpRequest({
          url: values.method_type === 'create' ? categoryUrl : categoryUrl+"/"+values.id,
          method: values.method_type === 'create' ? "POST" : "PUT",
          headers: authHeaders(),
          body: values,
        })
          .then((response) => {
            NProgress.done();
            if (response.hasOwnProperty('errors')) {
              Object.keys(response.errors).forEach((key) => {
                dispatch(
                  toasterActions.addToast({
                    id: new Date().getTime(),
                    severity: "error",
                    summary: "Error Message",
                    detail: response.errors[key][0],
                    life: 3000,
                  })
                );
              
              })
            
            } else {
                // // Reset the form to initial values
              resetForm();
              if (response && response.status) {
                setShow(false);
                reloadDatatableHandler();
                dispatch(
                  toasterActions.addToast({
                    id: new Date().getTime(),
                    severity: "success",
                    summary: "Success Message",
                    detail: response.message,
                    life: 3000,
                  })
                );
              }
            }
          
          
          })
          
      },
    });
  
  

  useEffect(() => {
    getAllData(defaultLazyData);
  }, []);

  const getAllData = async (data) => {
    let url = makeQueryStringUrl(categoryUrl, data);
    setLoading(true);
    await httpRequest({
      url: url,
      method: "GET",
      headers: authHeaders(),
    })
      .then((response) => {
        setLoading(false);
        if (response && response.P_categories.data.length > 0) {
          response.P_categories.data.forEach((item) => {
            item.image = "bamboo-watch.jpg";
          });
          setTotalRecords(response.P_categories.total);
          setData(response.P_categories.data);
          defaultLazyData = {
            ...data,
            totalPages: response.P_categories.total,
          };
          setlazyState((prevData) => {
            return { ...prevData, ...defaultLazyData };
          });
          //category type set
          setCategoryTypes([
            ...response.category_types.map((item) => {
              return {
                name: item.name,
                id: item.id,
              }
            })
          ])
          //all categories set
          SetCategories([
            ...response.Categories
          ])
        } else {
          setData([]);
        }
        console.log("response", response);
        // console.log("loader result", response);
      })
      .catch((error) => {
        setLoading(false);
        return "";
      });
  };
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
      await getAllData(defaultLazyData);
      NProgress.done();
      setLoading(false);
    }, 1000);
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
          url: categoryUrl + "/" + id,
          method: "DELETE",
          headers: authHeaders(),
        })
          .then((response) => {
            setLoading(false);
            NProgress.done();

            if (response && response.status) {
              reloadDatatableHandler();
              NProgress.done();
              setLoading(false);
              MySwal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          
          })
          .catch((error) => {
            setLoading(false);
            return "";
          });
      },
    });
    // alert("deleteDataHandler");
  };

  const selectedItemDeleteHandler = async (e) => {
    e.preventDefault();
    if (selectedData && selectedData.length > 0) {
      let delete_ids = selectedData.map((item) => item.id);

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
            url: selectedCategoryDltUrl,
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
                reloadDatatableHandler();
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
    await getAllData(defaultLazyData);
    NProgress.done();
    setLoading(false);
  };

  const actionBodyTemplate = (data) => {
    return (
      <>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info me-2 btn-sm"
          size="sm"
          //   onClick={() => viewHandler (data.id)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success me-2 btn-sm"
          size="sm"
            onClick={() =>editHandler (data.id)}
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

  const editHandler = async (id) =>{

    setLoading(true);
    NProgress.start();
    await httpRequest({
      url: categoryUrl+"/"+id,
      method: "GET",
      headers: authHeaders(),
    })
      .then((response) => {
        setLoading(false);
        NProgress.done();
        if (response !== null) {
        
          formik.setValues({ ...response,file:response.file !== null ? response.file: null,method_type:'edit',id:id });
      
          setModalConfig((prevData) => {
            return {
              ...prevData,
              header: "edit Category",
              type: "edit",
            };
          });
          setShow(true);

          //data category type 
          if (categoryTypes.length > 0) {
            let findCT = categoryTypes.find((item) => item.id === response.category_type_id);
            if (findCT) {
              setSelectedCategoryType(findCT);
            }
          }
          //set edit category
          if (Categories.length > 0 && response.parent != null) {
            let findCT = Categories.find((item) => item.id === response.parent.id);
            if (findCT) {
              setSelectedCategories(findCT);
            }
          }

          
        }
      
    
      });
  }

  const createHandler = () => {
    setModalConfig((prevData) => {
      return {
        ...prevData,
        header: "Create Category",
        type:'create'
      };
    });
    setShow(true);
    //reset formik
    resetFormikData();
    formik.setFieldValue("method_type", "create");
    formik.setFieldValue("id", "");
  };

  const resetFormikData = () => {
  
    formik.setValues(initialValues);
    
    // formik.resetForm({ values: initialValues });
    formik.setErrors({});
    //state date reset
    setSelectedCategoryType(null)
    setSelectedCategories(null)
  
  }

    //jsPdf
    const doc = new jsPDF();
  const pdfGenerateHandler = () => {
    setLoading(true);
    NProgress.start();
    setTimeout(() => {
      if (data.length > 0) {
        NProgress.done();
        setLoading(false);
        autoTable(doc, {
          head: [["No", "Name", "Parent Category","Status"]],
          body: data.map((item, key) => {
            let parent = item.parent != null ? item.parent.name : ''
            return [key + 1, item.name,parent,  item.status];
          }),
        });

        doc.save("categories.pdf");
      }
    }, 1000);
  };

  const generateExcelHandler = () => {
    setLoading(true);
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
      setLoading(false);
      if (data.length > 0) {
        let newdata = data.map((item, key) => {
          return {
            no: key + 1,
            name: item.name,
            parent_category: item.parent != null ? item.parent.name : '',
            status: item.status,
          };
        });

        const worksheet = XLSX.utils.json_to_sheet(newdata);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "categories");
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/octet-stream",
        });
        saveAs(blob, "categories.xlsx");

        // console.log("newdata", newdata);
      }
    }, 1000);
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

  const footer = `In total there are ${data ? data.length : 0} category types.`;

  const onPage = async (event) => {
    defaultLazyData = {
      ...event,
      page: event.page + 1,
    };
    await getAllData(defaultLazyData);
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
    await getAllData(defaultLazyData);
    NProgress.done();
    setLoading(false);
  };

  const onSelectionChange = (event) => {
    const value = event.value;
    setSelectedData(value);
    setSelectAll(value.length === totalRecords);
  };
  const imageBodyTemplate = (data) => {
    return (
      <img
        src={`${
          data.file && data.file !== null ? data.file.path : defaultImage
        }`}
        alt={`${data.file && data.file !== null ? data.file.name : ""}`}
        className=" shadow-2 border-round"
        style={{ width: "5rem" }}
      />
    );
  };

  const statusBodyTemplate = (data) => {
    return <Tag value={data.status} severity={getSeverity(data)}></Tag>;
  };

  const parentCategoryBodyTemplate = (data) => {
    if (data.parent !== null) {
      return data.parent.name;
    }
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

  const handleClose = () => {
    setShow(false);
    resetFormikData()

  };

  //dropdown select
  const selectedCategoryTypeTemplate = (option, props) => {
      if (option) {
          return (
              <div className="flex align-items-center">
                  <div>{option.name}</div>
              </div>
          );
      }

      return <span>{props.placeholder}</span>;
  };

  const categoryTypeOptionTemplate = (option) => {
    return (
        <div className="flex align-items-center">
            <div>{option.name}</div>
        </div>
    );
};

  

const panelFooterTemplate = () => {
  return (
      <div className="py-2 px-3">
          {selectedCategoryType ? (
              <span>
                  <b>{selectedCategoryType.name}</b> selected.
              </span>
          ) : (
              'No category type selected.'
          )}
      </div>
  );
  };
  

  const setSelectedCategoryTypeHandler = (value) => {
    let fomikData = { ...formik.values };
    fomikData.category_type_id = value.id;
    formik.setValues({ ...fomikData });
    setSelectedCategoryType(value);
  }
  
  const setSelectedCategoryHandler = (value) => {
    let fomikData = { ...formik.values };
    fomikData.parent_id = value.id;
    formik.setValues({ ...fomikData });
    setSelectedCategories(value);
  }
  const fileChangeHandler = (event) => {
    let fomikData = { ...formik.values };

    let allowedExtension = ["image/jpeg", "image/jpg", "image/png"];
    let file = event.target.files[0];
    console.log('file',file)

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
    //reset file input 
    var formFile = document.getElementById('formFile');
    formFile.value = '';
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
                        <Form.Label>Name </Form.Label>

                        <Form.Control
                          name="name"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          disabled ={modalConfig.type === 'view' ? true : false }
                          
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
                        className="mb-3 row"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="col-md-12">Parent Category </Form.Label>

                        <Dropdown
                        
                          value={selectedCategories}
                          onChange={(e) => setSelectedCategoryHandler(e.value)}
                          options={Categories}
                          onBlur={formik.handleBlur}
                          optionLabel="name"
                          placeholder="Select a Category Type" 
                          valueTemplate={selectedCategoryTypeTemplate}
                          itemTemplate={categoryTypeOptionTemplate}
                          panelFooterTemplate={panelFooterTemplate} 
                          dropdownIcon={(opts) => {
                            return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
                        }}
                          className="w-full md:w-14rem col-md-12" />

                      

                        {formik.errors.parent_id && formik.touched.parent_id ? (
                          <div className="text-danger">
                            {formik.errors.parent_id}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group
                        className="mb-3 row"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="col-md-12">Category Types </Form.Label>

                        <Dropdown
                        
                          value={selectedCategoryType}
                          onChange={(e) => setSelectedCategoryTypeHandler(e.value)} options={categoryTypes}
                          onBlur={formik.handleBlur}
                          optionLabel="name"
                          placeholder="Select a Category Type" 
                          valueTemplate={selectedCategoryTypeTemplate}
                          itemTemplate={categoryTypeOptionTemplate}
                          panelFooterTemplate={panelFooterTemplate} 
                          dropdownIcon={(opts) => {
                            return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
                        }}
                          className="w-full md:w-14rem col-md-12" />

                      

                        {formik.errors.category_type_id && formik.touched.category_type_id ? (
                          <div className="text-danger">
                            {formik.errors.category_type_id}
                          </div>
                        ) : null}
                      </Form.Group>
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
                            disabled ={modalConfig.type === 'view' ? true : false }
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
                            disabled ={modalConfig.type === 'view' ? true : false }
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
                        {
                          modalConfig.type !== 'view' && 
                          <input
                          id="formFile"
                          type="file"
                          accept="image/*"
                          name="file"
                          onChange={fileChangeHandler}
                          // onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        }
                      
                      </Form.Group>
                      {formik.values.file !== null && (
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
                              ''
                            )}
                            {
                              modalConfig.type !== 'view'  && formik.values.file !== '' ? 
                              <div>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={deleteFileHandler}
                              >
                                Delete
                              </button>
                            </div> : ''
                            }
                          
                          </div>
                        </div>
                      )}
                      {formik.errors.file &&  formik.touched.file? (
                        <div className="text-danger">{formik.errors.file}</div>
                      ) : null}
                    </Col>
                    

                
                  
                  </Row>
                  {
                    modalConfig.type !== 'view' && 
                    <Button label="Submit" type="submit" />
                  }
                
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

                  <Breadcrumb.Item active>Category</Breadcrumb.Item>
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
                  value={data}
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
                  selection={selectedData}
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
                    field="parent_id"
                    header="Parent Category"
                    body={parentCategoryBodyTemplate}
                    sortable
                  ></Column>
                  <Column
                    field="status"
                    header="Status"
                    body={statusBodyTemplate}
                    sortable
                  ></Column>
                  <Column header="Actions" body={actionBodyTemplate}></Column>
                </DataTable>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default CategoryList;
