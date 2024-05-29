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
} from "../../../helpers/global-files";

//sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

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

const CategoryTypeList = () => {
  //react router
  const navigate = useNavigate();
  const [categoryTypes, setCategoryTypes] = useState([]);
  //datatable

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState(null);
  const [lazyState, setlazyState] = useState({ ...defaultLazyData });

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

  const createHandler = () => {
    setLoading(true);
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
      setLoading(false);
      navigate("/admin/dashboard");
    }, 1000);
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
      sortField: null,
      sortOrder: null,
      filters: ["name", "status"],
      totalPages: 0,
    };
    await getProductCategory(defaultLazyData);
    NProgress.done();
    setLoading(false);
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

  return (
    <div>
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
