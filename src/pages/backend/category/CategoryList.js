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
} from "../../../helpers/global-files.js";
//default image
import defaultImage from "../../../assets/images/default.png";

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

const CategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lazyState, setlazyState] = useState({ ...defaultLazyData });
  const [selectAll, setSelectAll] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

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
        if (response && response.data.length > 0) {
          response.data.forEach((item) => {
            item.image = "bamboo-watch.jpg";
          });
          setTotalRecords(response.total);
          setData(response.data);
          defaultLazyData = {
            ...data,
            totalPages: response.total,
          };
          setlazyState((prevData) => {
            return { ...prevData, ...defaultLazyData };
          });
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
            // console.log("response", response);
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
          //   onClick={() =>editHandler (data.id)}
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
            // onClick={createHandler}
            size="small"
          />
          <Button
            label="PDF"
            icon="pi pi-file-pdf"
            severity="success"
            rounded
            loading={loading}
            className="rounded-pill me-2"
            // onClick={pdfGenerateHandler}
            size="small"
          />
          <Button
            label="Excel"
            icon="pi pi-file-excel"
            severity="warning"
            rounded
            loading={loading}
            className="rounded-pill me-2"
            // onClick={generateExcelHandler}
            size="small"
          />
          <Button
            label="Reload"
            icon="pi pi-refresh"
            severity="help"
            rounded
            loading={loading}
            className="rounded-pill me-2"
            // onClick={reloadDatatableHandler}
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
            // onClick={selectedItemDeleteHandler}
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

  return (
    <div>
      {/* Toaster Prime React  */}
      <ToastNotification />
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
