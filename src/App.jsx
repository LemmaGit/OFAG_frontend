import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalErrorBoundary from "./components/pages/GlobalErrorBoundary";
import { useAuth } from "./hooks/useAuth";
import { createRoleBasedRouter } from "./route/RoleBasedRouter";
import Spinner from "./hooks/Spinner";
import Context from "./hooks/Context";

function App() {
  const { user, role, isLoading } = useAuth();
  if (isLoading) return <Spinner />;

  const router = createRoleBasedRouter(role);
  return (
    <GlobalErrorBoundary>
      <Context user={user}>
        <RouterProvider router={router} />
      </Context>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />
    </GlobalErrorBoundary>
  );
}

export default App;
