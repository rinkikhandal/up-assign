import { OverLay } from "./OverLay";
import PropTypes from "prop-types";

export const SignIn = ({ closeOverlay }) => {
  return (
    <>
      <OverLay closeOverlay={closeOverlay}>SignIn</OverLay>
    </>
  );
};

SignIn.propTypes = {
  closeOverlay: PropTypes.func.isRequired,
};
