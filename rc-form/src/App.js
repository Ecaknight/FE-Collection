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
import store from "./pages/ReactRedux1/store";
// import ReactReduxPage from "./pages/ReactRedux1/ReactReduxPage";
import { Provider } from './pages/ReactRedux1/mreactredux'
import HookPages from './pages/ReactRedux1/HooksPage'

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
        {/* <ReactReduxPage /> */}
        <HookPages />
      </Provider>
    </div>
  );
}

export default App;
