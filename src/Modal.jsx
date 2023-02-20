import { createPortal } from 'react-dom';

function Modal({ children, onClose } = props) {
  return createPortal(
    <dialog className="w-screen h-screen h-[100dvh] fixed inset-0 bg-black/50 z-10 flex justify-center items-center" aria-modal="true" open onClick={onClose}>
      <div className="w-11/12 max-w-sm bg-white p-4 sm:p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
