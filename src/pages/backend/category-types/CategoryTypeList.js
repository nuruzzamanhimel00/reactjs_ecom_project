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
} from "../../../helpers/global-files";

let defaultLazyData = {
  first: 0,
  rows: 10,
  page: 1,
  sortField: null,
  sortOrder: null,
  filters: ["name", "status"],
  totalPages: 0,
};

const CategoryTypeList = () => {
  const [categoryTypes, setCategoryTypes] = useState([]);
  //datatable
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  // const [customers, setCustomers] = useState(null);
  // const [selectAll, setSelectAll] = useState(false);
  // const [lazyState, setlazyState] = useState({ ...defaultLazyData });

  useEffect(() => {
    getProductCategory(defaultLazyData);
  }, []);

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
    // setlazyState((prev) => ({ ...prev, ...event, page: event.page + 1 }));
    await getProductCategory(defaultLazyData);
    console.log("onpage", event, defaultLazyData);
  };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    console.log("value", value);
    // let _filters = { ...filters };

    // _filters['global'].value = value;

    // setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between">
        <div></div>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
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
                  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>Data</Breadcrumb.Item>
                </Breadcrumb>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12}>
            <Card>
              <Card.Body>
                {/* <DataTable
                  value={categoryTypes}
                  header={header}
                  footer={footer}
                  tableStyle={{ minWidth: "50rem" }}
                  resizableColumns
                  columnResizeMode="expand"
                  showGridlines
                  stripedRows
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  removableSort
                  dataKey="id"
                  emptyMessage="Data not found!!"
                  //checkbox
                  selectionMode={null}
                  selection={selectedCategoryTypes}
                  onSelectionChange={(e) => setSelectedCategoryTypes(e.value)}
                  //lazy loading
                  paginator
                  first={lazyState.first}
                  rows={10}
                  totalRecords={totalRecords}
                  onPage={onPage}
                  loading={loading}
                  lazy
                > */}
                <DataTable
                  value={categoryTypes}
                  header={header}
                  footer={footer}
                  tableStyle={{ minWidth: "50rem" }}
                  showGridlines
                  stripedRows
                  dataKey="id"
                  emptyMessage="Data not found!!"
                  //checkbox
                  selectionMode={null}
                  selection={selectedCategoryTypes}
                  onSelectionChange={(e) => setSelectedCategoryTypes(e.value)}
                  //lazy loading
                  paginator
                  first={defaultLazyData.first}
                  rows={10}
                  totalRecords={totalRecords}
                  onPage={onPage}
                  loading={loading}
                  lazy
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                  ></Column>
                  <Column field="name" header="Name" sortable></Column>
                  <Column
                    header="Image"
                    body={imageBodyTemplate}
                    sortable
                  ></Column>
                  <Column
                    header="Status"
                    body={statusBodyTemplate}
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
