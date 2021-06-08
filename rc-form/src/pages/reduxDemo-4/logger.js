export default function logger({ getState }) {
  return (dispatch) => (action) => {
    console.log("---prev---", getState());
    const next = dispatch(action);
    console.log("---next---", getState());
    return next;
  };
}
