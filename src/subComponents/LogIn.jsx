import { OverLay } from "./OverLay";
import PropTypes from "prop-types";

export const LogIn = ({ closeOverlay }) => {
  return (
    <>
      <OverLay closeOverlay={closeOverlay}>LogIn</OverLay>
    </>
  );
};

LogIn.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
};
