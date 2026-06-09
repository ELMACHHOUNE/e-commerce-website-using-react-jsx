import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Loader from "./components/Loader";

function Root() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Loader onFinish={() => setReady(true)} />}
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
