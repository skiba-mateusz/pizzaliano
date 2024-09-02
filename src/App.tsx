import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
