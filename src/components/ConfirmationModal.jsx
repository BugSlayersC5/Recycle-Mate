
/**
 * Reusable confirmation modal for approval/deletion or any user confirmation needs.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Determines if modal is visible.
 * @param {function} props.onClose - Function to close the modal.
 * @param {function} props.onConfirm - Function triggered on confirmation.
 * @param {string} props.title - Modal heading text.
 * @param {string} props.message - Confirmation message to the user.
 * @param {string} [props.confirmText='Yes'] - Text for the confirm button.
 * @param {string} [props.cancelText='No'] - Text for the cancel button.
 */
export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Yes',
  cancelText = 'No',
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div
        className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-lg font-semibold mb-3 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
