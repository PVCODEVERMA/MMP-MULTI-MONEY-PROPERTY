// src/components/findByPropertyleads/leadsExplorer/Modal.jsx
export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // keep clicks inside
      >
        {children}
      </div>
    </div>
  );
}
