import React from "react";
import RouterContext from "./RouterContext";
import { LifeCycle } from "./Redirect";

export default function Prompt({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        if (!when) return null;
        const release = context.history.block;
        return (
          <LifeCycle
            onMount={(self) => {
              self.release = release(message);
            }}
            onUpdate={(self, message) => {
              self.release();
              self.release = release(message);
            }}
            onUnmount={(self) => self.release()}
            message={message}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
