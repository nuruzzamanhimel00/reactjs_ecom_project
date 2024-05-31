import {
  React,
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  NavLink,
  Form,
  useState,
  uuidv4,
} from "../../../helpers/global-files";
import BootstrapModal from "../../../components/admin/UI/BootstrapModal";

const CategoryTyepCreate = () => {
  const [inputData, setInputData] = useState({
    name: "",
    file: "",
  });

  const [show, setShow] = useState(false);

  const deleteFileHandler = (event) => {
    event.preventDefault();
    setInputData((prevData) => {
      return {
        ...prevData,
        file: "",
      };
    });
  };
  const fileChangeHandler = (event) => {
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
      setInputData((prevData) => {
        return {
          ...prevData,
          file: {
            id: uuid,
            type: file.type,
            name: file.name,
            path: event.target.result,
          },
        };
      });
    };
    reader.readAsDataURL(file);
  };

  const viewFileHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <BootstrapModal
        show={show}
        handleClose={handleClose}
        footer={{
          cancle_btn: "Close",
        }}
        header="My Modal"
      ></BootstrapModal>
      <Container>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Breadcrumb>
                  <Breadcrumb.Item href="#">
                    <NavLink to="/admin/dashboard">Dashboard </NavLink>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item active>Category Create</Breadcrumb.Item>
                </Breadcrumb>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="name@example.com"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="name@example.com"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
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
                          />
                          <Form.Check // prettier-ignore
                            type="radio"
                            id={`default-Inactive`}
                            name="status"
                            label={` Inactive`}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group
                        controlId="formFile"
                        className="mb-3 d-flex flex-column"
                      >
                        <Form.Label>Images</Form.Label>
                        <input
                          id="formFile"
                          type="file"
                          accept="image/*"
                          onChange={fileChangeHandler}
                        />
                      </Form.Group>
                      {inputData.file !== "" && (
                        <div class="multile_image">
                          <div class="image_preview">
                            {["image/jpeg", "image/jpg", "image/png"].includes(
                              inputData.file.type
                            ) ? (
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100"
                                  height="100"
                                  fill="currentColor"
                                  class="bi bi-card-image"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                                </svg>
                                <p>dfdfd</p>
                              </div>
                            ) : (
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="100"
                                  height="100"
                                  fill="currentColor"
                                  class="bi bi-file-earmark-pdf-fill"
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
                                class="btn btn-primary btn-sm me-2"
                                onClick={viewFileHandler}
                              >
                                View
                              </button>
                              <button
                                class="btn btn-danger btn-sm"
                                onClick={deleteFileHandler}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CategoryTyepCreate;
