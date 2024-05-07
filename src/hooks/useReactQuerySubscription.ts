import React, { useEffect } from "react";

import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export interface PostDetailData {
  userId: number
  userName: string
  message: string
  photo: string
  addedAt: string
}

export type InvalidateEvent = {
  operation: "invalidate";
  entity: Array<string>;
  id?: number;
};

export type UpdateEvent = {
  operation: "update";
  entity: Array<string>;
  id: number;
  payload: Partial<PostDetailData>;
};

export type WebSocketEvent = InvalidateEvent | UpdateEvent;

export const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();

  const websocket = React.useRef<WebSocket>();

  useEffect(() => {
    websocket.current = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    websocket.current.onmessage = (event) => {
      console.log("received event", event);
      const data: WebSocketEvent = JSON.parse(event.data);
      switch (data.operation) {
        case "invalidate":
          queryClient.invalidateQueries(
            [...data.entity, data.id].filter(Boolean)
          );
          break;
        case "update":
          queryClient.setQueriesData(data.entity, (oldData: any) => {
            const update = (entity: Record<string, unknown>) =>
              entity.id === data.id ? { ...entity, ...data.payload } : entity;
            return Array.isArray(oldData)
              ? oldData.map(update)
              : update(oldData as Record<string, unknown>);
          });
          break;
      }
    };
    websocket.current.onopen = () => {
      console.log("connected");
    };

    return () => {
      websocket.current?.close();
    };
  }, [queryClient]);

  return (input: WebSocketEvent) => {
    websocket.current?.send(JSON.stringify(input));
  };
};