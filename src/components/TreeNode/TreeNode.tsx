import { FC, useState } from "react";
import ActionMenu from "src/components/ActionMenu/ActionMenu";
import { Action, Node, Tree } from "src/types";

interface TreeNodeProps extends Tree {
  selectedId?: string;
  onClick: (data: Node) => void;
  setAction: (action: Action) => void;
}

const TreeNode: FC<TreeNodeProps> = ({
  children,
  selectedId,
  onClick,
  setAction,
  ...nodeData
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSelected = selectedId === nodeData.id;

  const onAdd = (): void => setAction(Action.add);
  const onRename = (): void => setAction(Action.rename);
  const onDelete = (): void => setAction(Action.delete);

  const handleClick = (): void => {
    onClick(nodeData);
    setIsExpanded((prev) => !prev);
  };

  return (
    <li>
      <div
        className={`relative cursor-pointer hover:text-primary w-min ${isSelected && "text-secondary"}`}
      >
        <div onClick={handleClick} className="p-2 flex items-center">
          {!!children.length && (
            <span className="p-1 text-warning">{isExpanded ? "⯆" : "⯈"}</span>
          )}
          {nodeData.name}
        </div>
        {isSelected && (
          <ActionMenu onAdd={onAdd} onRename={onRename} onDelete={onDelete} />
        )}
      </div>
      {isExpanded && (
        <ul className="pl-4">
          {children.map((node) => (
            <TreeNode
              key={node.id}
              {...node}
              selectedId={selectedId}
              onClick={onClick}
              setAction={setAction}
            >
              {node.children}
            </TreeNode>
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;
