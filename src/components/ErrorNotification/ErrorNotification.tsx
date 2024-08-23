import { FC } from "react";

interface ErrorNotification {
  message: string;
  onClose: () => void;
}

const ErrorNotification: FC<ErrorNotification> = ({ message, onClose }) => {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2  z-40 bg-dangerous text-white p-4 rounded shadow-lg text-center">
      <p className="font-bold">Error:</p>
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-2 bg-white text-dangerous px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default ErrorNotification;
