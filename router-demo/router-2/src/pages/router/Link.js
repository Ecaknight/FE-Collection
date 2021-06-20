import React from "react";
import RouterContext from "./RouterContext";

const Link = React.forwardRef(({ to, children, ...restProps }, ref) => {
  const context = React.useContext(RouterContext);

  const onClick = React.useCallback((e) => {
    e.preventDefault();
    context.history.push(to);
  }, []);

  return (
    <a href={to} ref={ref} onClick={onClick} {...restProps}>
      {children}
    </a>
  );
});

export default Link;
