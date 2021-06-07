export default function logger({ getState }) {
  return (next) => (action) => {
    console.log("---prev---", getState());
    console.log("---type---", action.type);
    const nextaction = next(action);
    console.log("next", nextaction, getState());
    return nextaction;
  };
}
