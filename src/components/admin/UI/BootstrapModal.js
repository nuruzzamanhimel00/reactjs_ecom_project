import { Modal, Button } from "../../../helpers/global-files.js";
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {
  return (
    <Modal {...props}>
      {props.header && (
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>{props.children}</Modal.Body>
      {props.footer && (
        <Modal.Footer>
          {props.footer.cancle_btn && (
            <Button variant="secondary" onClick={props.onHide}>
              {props.footer.cancle_btn}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

const portalElement = document.getElementById("overlays");
const BootstrapModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay {...props}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default BootstrapModal;
