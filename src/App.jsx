import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./pages/AppLayout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import InterviewMode from "./pages/InterviewMode";
import SelfIntroductionQuestion from "./pages/SelfIntroductionQuestion";
import FeedbackPage from "./pages/FeedbackPage";
import ScheduledInterviewPage from "./pages/ScheduledInterviewPage"

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          element={
            token ? (
              <AppLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route
            path="/client-dashboard"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview-modes"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <InterviewMode />
              </ProtectedRoute>
            }
          />

          <Route
            path="/self-introduction"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <SelfIntroductionQuestion />
              </ProtectedRoute>
            }
          />

          <Route
            path="/feedback"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/scheduled-Interview"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ScheduledInterviewPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;