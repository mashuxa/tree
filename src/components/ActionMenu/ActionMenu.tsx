import { FC, memo } from "react";

interface ActionMenuProps {
  onAdd: () => void;
  onRename: () => void;
  onDelete: () => void;
}

const baseButtonClass = "text-xs py-1 px-2 text-white rounded";

const ActionMenu: FC<ActionMenuProps> = ({ onAdd, onRename, onDelete }) => (
  <div className="absolute top-0 right-0 translate-x-full bg-gray-200 p-2 rounded shadow-lg flex space-x-2 w-min">
    <button onClick={onAdd} className={`${baseButtonClass} bg-secondary`}>
      Add
    </button>
    <button onClick={onRename} className={`${baseButtonClass} bg-blue-500`}>
      Rename
    </button>
    <button onClick={onDelete} className={`${baseButtonClass} bg-dangerous`}>
      Delete
    </button>
  </div>
);

export default memo(ActionMenu);
