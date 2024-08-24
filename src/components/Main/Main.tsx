import { FC, useCallback, useEffect, useReducer, useState } from "react";
import { createNode, deleteNode, getTree, renameNode } from "src/api/api";
import ActionModal from "src/components/ActionModal/ActionModal";
import ErrorNotification from "src/components/ErrorNotification/ErrorNotification";
import Preloader from "src/components/Preloader/Preloader";
import TreeNode from "src/components/TreeNode/TreeNode";
import { initialState, treeReducer } from "src/store/reducer";
import { Action, Node } from "src/types";

const Main: FC = () => {
  const [treeData, dispatch] = useReducer(treeReducer, initialState);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [action, setAction] = useState<Action | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = useCallback((): void => {
    setAction(null);
    setSelectedNode(null);
  }, []);

  const setErrorMessage = useCallback(
    (error: unknown): void => {
      handleClose();
      setError(error instanceof Error ? error.message : "Error");
    },
    //eslint-disable-next-line
    [],
  );

  const fetchTree = useCallback(
    async (): Promise<void> => {
      setLoading(true);

      try {
        const payload = await getTree();

        dispatch({ type: Action.addAll, payload });
      } catch (error) {
        setErrorMessage(error);
      } finally {
        setLoading(false);
      }
    },
    //eslint-disable-next-line
    [],
  );

  const resetError = useCallback((): void => setError(""), []);

  const updateNodes = useCallback(
    async (name?: string): Promise<void> => {
      if (!selectedNode) {
        return;
      }

      const { id } = selectedNode;

      try {
        if (action === Action.add && name) {
          await createNode(id, name);
          await fetchTree();
        } else if (action === Action.rename && name) {
          await renameNode(id, name);
          dispatch({
            type: Action.rename,
            payload: { id, name },
          });
        } else if (action === Action.delete) {
          await deleteNode(id);
          dispatch({ type: Action.delete, payload: { id } });
        }

        handleClose();
      } catch (error) {
        setErrorMessage(error);
      }
    },
    [action, fetchTree, handleClose, selectedNode, setErrorMessage],
  );

  useEffect(
    () => {
      void fetchTree();
    },
    //eslint-disable-next-line
    [],
  );

  if (!treeData) {
    return <span>No data</span>;
  }

  return (
    <main className="font-medium text-neutral-600 flex-grow overflow-y-auto">
      {error && <ErrorNotification message={error} onClose={resetError} />}
      {loading && <Preloader />}
      {action && selectedNode && (
        <ActionModal
          action={action}
          selectedNode={selectedNode}
          onSubmit={updateNodes}
          onClose={handleClose}
        />
      )}
      <ul>
        {
          <TreeNode
            {...treeData}
            selectedId={selectedNode?.id}
            onClick={setSelectedNode}
            setAction={setAction}
          >
            {treeData.children}
          </TreeNode>
        }
      </ul>
    </main>
  );
};

export default Main;
