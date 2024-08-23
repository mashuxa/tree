import { Action, Node, Tree } from "src/types";
import deleteNode from "./deleteNode";
import renameNode from "./renameNode";

export interface ActionPayload {
  type: Action;
  payload: Partial<Node> | Tree;
}

export const initialState: Tree = {
  id: "root",
  name: "Root Node",
  children: [],
};

export const treeReducer = (state: Tree, action: ActionPayload): Tree => {
  if ("children" in action.payload) {
    return action.payload;
  }

  switch (action.type) {
    case Action.rename:
      if (action.payload.id && action.payload.name) {
        return renameNode(state, action.payload.id, action.payload.name);
      }

      return state;

    case Action.delete:
      if (action.payload.id) {
        return deleteNode(state, action.payload.id);
      }

      return state;

    default:
      return state;
  }
};
