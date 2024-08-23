export interface Node {
  id: string;
  name: string;
}

export interface Tree extends Node {
  id: string;
  name: string;
  children: Tree[];
}

export enum Action {
  add = "add",
  rename = "rename",
  delete = "delete",
  addAll = "addAll",
}
