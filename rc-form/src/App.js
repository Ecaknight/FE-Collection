// import logo from './logo.svg';
import "./App.css";
// import { Provider } from "react-redux";
// import RCForm from "./pages/RCForm";
// import MyFieldForm from "./pages/MyFieldForm";
// import RefPage1 from "./pages/RefPage-1";

// import ReduxPage from "./pages/reduxDemo-5/ReduxPage";
// import store from "./pages/reactreduxDemo/store";
// import ReactReduxDemo from "./pages/reactreduxDemo";
// import ReactHook from "./pages/reactreduxDemo/hooks";
// import store from "./pages/ReactRedux2/store";
// import ReactReduxPage from "./pages/ReactRedux3/ReactReduxPage";
// import ReactHookPage from "./pages/ReactRedux3/ReactHookPage";
// import { Provider } from "./pages/ReactRedux3/mreactredux";
import { Provider } from "./lib/react-redux";
import store from "./pages/Redux+ReactDemo/store";
import ReactReduxPage from "./pages/Redux+ReactDemo/Redux+ReactPage";

function App() {
  return (
    <div className="App">
      {/* <br />
      <RCForm />

      <br />
      <MyFieldForm />`

      <br />
      <RefPage1 /> */}
      {/* <ReduxPage /> */}
      <Provider store={store}>
        {/* <ReactReduxDemo /> */}
        <ReactReduxPage />
        {/* <ReactHookPage /> */}
      </Provider>
    </div>
  );
}

export default App;
