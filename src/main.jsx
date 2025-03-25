import { createRoot } from "react-dom/client";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    {/* <StrictMode> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* </StrictMode> */}
  </HelmetProvider>
);
