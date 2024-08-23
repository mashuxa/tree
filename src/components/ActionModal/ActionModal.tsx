import { FC, FormEvent } from "react";
import Button from "src/components/Button/Button";
import { Action, Node } from "src/types";

interface ActionModalProps {
  onClose: () => void;
  action: Action;
  selectedNode: Node;
  onSubmit: (nodeName?: string) => void;
}

const ActionModal: FC<ActionModalProps> = ({
  onClose,
  action,
  onSubmit,
  selectedNode,
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    onSubmit(name);
  };
  const handleDelete = (): void => onSubmit();

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-dangerous text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          X
        </button>
        <h2 className="first-letter:uppercase text-lg font-bold">
          {action} Node
        </h2>
        <div className="text-center">
          {action === Action.delete ? (
            <>
              <p className="mt-4">Are you sure you want to delete this node?</p>
              <div className="flex justify-end space-x-2 mt-6">
                <Button onClick={onClose} className="bg-gray-500">
                  Cancel
                </Button>
                <Button onClick={handleDelete} className="bg-dangerous">
                  Submit
                </Button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                defaultValue={action === Action.rename ? selectedNode.name : ""}
                name="name"
                placeholder="Enter node name"
                type="text"
                className="mt-4 p-2 border rounded w-full"
                required
              />
              <div className="flex justify-end space-x-2 mt-6">
                <Button onClick={onClose} className="bg-gray-500">
                  Cancel
                </Button>
                <Button className="bg-blue-500">Submit</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
