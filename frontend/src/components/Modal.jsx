export default function Modal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded">
          <h2>{title}</h2>
          <p>{message}</p>
          <div className="flex justify-end mt-4">
            <button onClick={onClose}>Cancel</button>
            <button onClick={onConfirm} className="ml-2 bg-red-500 text-white">Delete</button>
          </div>
        </div>
      </div>
    );
  }
  