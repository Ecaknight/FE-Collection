import React, { Component } from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const {
            children,
            component,
            render,
            path,
            computeMatch,
          } = this.props;
          const location = this.props.location || context.location;
          const match = computeMatch
            ? computeMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match;
          // children > component > render
          const props = {
            ...context,
            location,
            match,
          };
          return (
            // Consumer可以拿到最近的Provider消费
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === "function"
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
