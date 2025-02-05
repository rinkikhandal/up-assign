import PropTypes from "prop-types";
import { OverLay } from "./OverLay";

const Popup = ({ message, cancelPopupOpen }) => {
  return (
    <>
      <OverLay closeOverlay={cancelPopupOpen}>
        <p className="mb-4 ">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-neutral-800 text-white h-10 w-20 mt-10 rounded hover:bg-transparent hover:text-black border-2 border-solid border-neutral-800 transition-all "
            onClick={cancelPopupOpen}
          >
            OK
          </button>
        </div>
      </OverLay>
    </>
  );
};

Popup.propTypes = {
  message: PropTypes.string.isRequired,
  cancelPopupOpen: PropTypes.func.isRequired,
};

export default Popup;
