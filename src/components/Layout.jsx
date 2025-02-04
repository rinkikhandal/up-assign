import PropTypes from "prop-types";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <div className=" ">
        <Navbar />
        <main className="flex w-[100%] min-h-[100dvh] overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
