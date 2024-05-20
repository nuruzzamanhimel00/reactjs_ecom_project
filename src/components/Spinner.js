//react spinner
import BounceLoader from "react-spinners/BounceLoader";
//redux
import { useSelector } from "react-redux";
const override = {
  position: "fixed",
  top: "50%",
  left: "50%",
  borderColor: "red",
  backgroundColor: "red",
  borderRadius: "50%",
  zIndex: "9999",
};

const Spinner = () => {
  const isLoading = useSelector((state) => state.adminLayout.isLoading);
  return (
    <>
      <BounceLoader
        color={`#FFF`}
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};

export default Spinner;
