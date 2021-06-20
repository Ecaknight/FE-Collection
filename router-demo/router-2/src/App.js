import "./App.css";
import RouterPage from "./pages/RouterPage";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterPage />
      </Provider>
    </div>
  );
}

export default App;
