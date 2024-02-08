import React from 'react';

/**
 * @file InternalUseModal.js
 * This is a React component used for managing and displaying Modal.
 */
const InternalUseModal = () => {
  const [ModalData, setModalData] = React.useState(null);

  const show = React.useCallback((data) => {
    const id = Date.now().toString(36);
    requestAnimationFrame(() => {
      setModalData({ ...data, id, hide });
    });
  }, []);

  const hide = React.useCallback(() => {
    setModalData(null);
  }, []);

  return {
    /** @type {import('../Modal/Modal').ModalData} */
    ModalData,
    /**
     * A function to display Modal
     * @param {import('../Provider/ModalProvider').ShowModal} ModalData
     */
    show,
    /**
     * function to hide modal
     *
     * @returns {void}
     */
    hide,
  };
};

export default InternalUseModal;
