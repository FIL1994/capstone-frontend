import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import _ from "lodash";

ReactModal.setAppElement("#root");

const Modal = props => (
  <ReactModal
    style={{
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "3%",
        ...props.style
      },
      overlay: {
        backgroundColor: "rgba(14, 14, 14, 0.38)"
      }
    }}
    {..._.omit(props, "style")}
  />
);

Modal.propTypes = {
  style: PropTypes.object
};

Modal.defaultProps = {
  style: {}
};

export default Modal;
