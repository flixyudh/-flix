import React, { useCallback } from 'react';
import InternalUseModal from '../Hook/internalUseModal';
import Modal from '../Modal/Modal';

/**
 * @typedef {object} ShowModal
 * @prop {React.JSX} renderItem - Content of Modal
 * @prop {boolean} [disabledBackdrop] - If false, disable close modal when pressing backdrop .
 * @prop {void} onPressBackdrop - function to handle when backdrop pressed, not trigger if `disabledBackdrop` set to `true`
 * @prop {number} duration - duration of show/hide animation (if `animationType` is declared and not `none`)
 * @prop {('none'|'fade'|'slide')} animationType - type of animation
 * @prop {import('react-native').ViewProps} styleContainer - custom style for container view of Modal
 */

const ModalContext = React.createContext({
  /**
   * A function to display Modal
   * @param {ShowModal} ModalData
   */
  show: (ModalData) => null,
  /**
   * function to hide modal
   *
   * @returns {void}
   */
  hide: () => null,
});

const ModalProvider = ({ children }) => {
  const { ModalData, show, hide } = InternalUseModal();
  const contextValue = React.useMemo(
    () => ({ ModalData, show, hide }),
    [ModalData, show, hide]
  );

  const RenderModalItem = useCallback(() => {
    if (ModalData) return <Modal {...ModalData} />;
    else return null;
  }, [ModalData]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <RenderModalItem />
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
