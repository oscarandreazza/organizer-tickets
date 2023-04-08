import { useRef } from "react";
import "./Modal.css";

const Modal = ({ showModal, heigth, width, children }) => {
    const modalRef = useRef(null);

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            showModal(false);
        }
    }

    return (
        <div className="modal" onClick={handleClickOutside}>
            <div className="container-modal" ref={modalRef} style={{ height: heigth, width: width }}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
