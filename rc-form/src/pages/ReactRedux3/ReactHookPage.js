import React from "react";
import { useSelector, useDispatch } from "./mreactredux";

export default function ReactHookPage() {
  const num = useSelector((state) => state);
  const dispatch = useDispatch();
  const add = React.useCallback(() => dispatch({ type: "ADD" }), []);

  return (
    <div>
      <p>HOOK Page3</p>
      <p>{num}</p>
      <button onClick={add}>add</button>
    </div>
  );
}
