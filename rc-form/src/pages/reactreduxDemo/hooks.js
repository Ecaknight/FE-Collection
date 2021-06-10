import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Mhooks() {
  const count = useSelector((store) => {
    return store;
  });
  const dispatch = useDispatch();

  const add = React.useCallback(() => {
    dispatch({ type: "ADD" });
  }, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={add}>加1</button>
    </div>
  );
}
