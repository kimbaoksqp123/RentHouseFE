import AppRoutes from "./routes";
import './common/customStyle.css'
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" autoClose={1000} />
      <AppRoutes />
    </div>
  );
}

export default App;
