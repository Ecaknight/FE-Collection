// import logo from './logo.svg';
import "./App.css";
import { Provider } from "react-redux";
// import RCForm from "./pages/RCForm";
// import MyFieldForm from "./pages/MyFieldForm";
// import RefPage1 from "./pages/RefPage-1";

// import ReduxPage from "./pages/reduxDemo-5/ReduxPage";
import store from "./pages/reactreduxDemo/store";
// import ReactReduxDemo from "./pages/reactreduxDemo/ReactRedux1";
import ReactHook from "./pages/reactreduxDemo/ReduxHook1";

function App() {
  return (
    <div className="App">
      {/* <br />
      <RCForm />

      <br />
      <MyFieldForm />

      <br />
      <RefPage1 /> */}
      {/* <ReduxPage /> */}
      <Provider store={store}>
        {/* <ReactReduxDemo /> */}
        <ReactHook />
      </Provider>
    </div>
  );
}

export default App;
