import React from "react";

/**
 * Reusable confirmation modal for approval/deletion or any user confirmation needs.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Determines if modal is visible.
 * @param {function} props.onClose - Function to close the modal.
 * @param {function} props.onConfirm - Function triggered on confirmation.
 * @param {string} props.title - Modal heading text.
 * @param {string} props.message - Confirmation message to the user.
 * @param {string} [props.confirmText='Confirm'] - Text for the confirm button.
 * @param {string} [props.cancelText='Cancel'] - Text for the cancel button.
 * @param {React.ReactNode} [props.icon] - Optional SVG or component for the modal icon.
 * @param {string} [props.iconBgColor='bg-yellow-100'] - Background color for the icon circle.
 * @param {string} [props.iconTextColor='text-yellow-600'] - Text/stroke color for the icon.
 */
export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  // You can pass a custom icon component or SVG here if needed
  icon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 text-yellow-600">
      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  iconBgColor = 'bg-yellow-100', // Default to yellow for RecycleMate theme
  iconTextColor = 'text-yellow-600',
}) {
  if (!isOpen) return null;

  return (
    // Overlay: Fixed position, covers viewport, semi-transparent gray background, blurred backdrop.
    // Transition classes added for entrance/exit (requires component to mount/unmount or use libraries like react-transition-group)
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-700/75 backdrop-blur-sm transition-opacity duration-300 ease-out sm:items-center px-4 py-6">
      {/* Modal Panel: Centered, responsive max-width, elevated with shadow, rounded corners. */}
      {/* Animation classes simulate the 'scale-in' and 'translate-y' effect from the example */}
      <div
        className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl
                   transition-all duration-300 ease-out
                   sm:my-8 sm:w-full sm:max-w-lg
                   // Simulating initial animation state if using a library for data-attributes:
                   // data-closed:translate-y-4 data-closed:opacity-0 data-closed:sm:translate-y-0 data-closed:sm:scale-95
                   // On mount, it would transition to:
                   // data-open:translate-y-0 data-open:opacity-100 data-open:sm:scale-100
                   animate-scaleUpFadeIn // Custom animation for simple mount-based entrance
        "
        role="dialog" // ARIA role for accessibility
        aria-modal="true" // ARIA attribute
        aria-labelledby="modal-title" // Connects to the title for screen readers
        onClick={(e) => e.stopPropagation()} // Prevents clicks on the modal content from closing the modal
      >
        {/* Modal Content Area */}
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            {/* Icon Circle */}
            <div className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${iconBgColor} sm:mx-0 sm:size-10`}>
              {React.cloneElement(icon, { className: `${iconTextColor} size-6` })}
            </div>
            {/* Title and Message */}
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 id="modal-title" className="text-base font-semibold text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Area */}
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:ml-3 sm:w-auto transition-colors duration-200"
          >
            {confirmText}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:mt-0 sm:w-auto transition-colors duration-200"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}