import * as lib from "./libraries/app.js";
const App = () => {
  return (
    <lib.BrowserRouter>
      <lib.Routes>
        <lib.Route path="/" element={<lib.Home />} />
      </lib.Routes>
      <lib.Toaster></lib.Toaster>
    </lib.BrowserRouter>
  );
};

export default App;
