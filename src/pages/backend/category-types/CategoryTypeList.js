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

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState(null);
  const [lazyState, setlazyState] = useState({ ...defaultLazyData });

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
          setlazyState((prevData) => {
            return { ...prevData, ...defaultLazyData };
          });
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
  // const onSelectAllChange = async (event) => {
  //   const selectAll = event.checked;

  //   if (selectAll) {
  //     setSelectAll(true);
  //     await getProductCategory(defaultLazyData);
  //   } else {
  //     setSelectAll(false);
  //     setSelectedCategoryTypes([]);
  //   }
  // };
  const onSelectionChange = (event) => {
    const value = event.value;
    setSelectedCategoryTypes(value);
    setSelectAll(value.length === totalRecords);
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
  const onSort = (event) => {
    defaultLazyData = {
      ...defaultLazyData,
      ...event,
    };

    setlazyState((prevData) => {
      return { ...prevData, ...defaultLazyData };
    });
    console.log("on sort", event);
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
                <DataTable
                  header={header}
                  footer={footer}
                  value={categoryTypes}
                  rows={10}
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
                  // onSelectAllChange={onSelectAllChange}
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
                </DataTable>
                {/* <DataTable
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
                  //sort
                  onSort={onSort}
                  sortField={defaultLazyData.sortField}
                  sortOrder={defaultLazyData.sortOrder}
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
                  ></Column>
                </DataTable> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryTypeList;
