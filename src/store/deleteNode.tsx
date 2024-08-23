import { Tree } from "src/types";

const deleteNode = (tree: Tree, id: string): Tree => {
  const deleteNodeFromTree = (nodes: Tree[]): Tree[] => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => {
        if (node.children.length) {
          return { ...node, children: deleteNodeFromTree(node.children) };
        }

        return node;
      });
  };

  return { ...tree, children: deleteNodeFromTree(tree.children) };
};

export default deleteNode;
