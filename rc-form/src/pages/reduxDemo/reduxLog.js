export default function Log({ getState }) {
  return (dispatch) => {
    // 在compose的时候传进来的dispatch，
    console.log(dispatch);
    return (action) => {
      //
      console.log("------type-------", action.type);
      console.log("------prev-------", getState());
      const returnVal = dispatch(action);

      console.log("------next-------", getState());
      return returnVal;
    };
  };
}
