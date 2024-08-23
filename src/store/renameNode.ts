import { Tree } from "src/types";

const renameNode = (tree: Tree, id: string, newNodeName: string): Tree => {
  const renameNodeInTree = (nodes: Tree[]): Tree[] => {
    return nodes.map((node) => {
      if (node.id === id) {
        return { ...node, name: newNodeName };
      }

      if (node.children.length) {
        return { ...node, children: renameNodeInTree(node.children) };
      }

      return node;
    });
  };

  return { ...tree, children: renameNodeInTree(tree.children) };
};

export default renameNode;
