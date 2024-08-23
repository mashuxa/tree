import { Tree } from "src/types";
import endpoints from "./endpoints";

const UNIQ_TREE_ID = "9364688";
const API_BASE_URL = "https://test.vmarmysh.com";

export const fetchData = async (
  endpoint: string,
  queryParams: Record<string, string> = {},
): Promise<Response> => {
  const params = new URLSearchParams(queryParams).toString();
  const response = await fetch(
    `${API_BASE_URL}/${endpoint}?treeName=${UNIQ_TREE_ID}&${params}`,
    { method: "POST" },
  );

  if (!response.ok) {
    const { data } = await response
      .json()
      .catch(() => ({ data: { message: "Error on fetch data" } }));

    throw new Error(data.message);
  }

  return response;
};

export const getTree = async (): Promise<Tree> => {
  const data = await fetchData(endpoints.getTree);

  return data.json();
};

export const createNode = async (
  parentNodeId: string,
  nodeName: string,
): Promise<void> => {
  await fetchData(endpoints.createNode, {
    parentNodeId,
    nodeName,
  });
};

export const deleteNode = async (nodeId: string): Promise<void> => {
  await fetchData(endpoints.deleteNode, { nodeId });
};

export const renameNode = async (
  nodeId: string,
  newNodeName: string,
): Promise<void> => {
  await fetchData(endpoints.renameNode, { nodeId, newNodeName });
};
