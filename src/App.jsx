import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import InterviewMode from "./pages/InterviewMode";
import SelfIntroductionQuestion from "./pages/SelfIntroductionQuestion";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
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
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/interview-modes"
            element={<InterviewMode />}
          />

          <Route
            path="/self-introduction"
            element={<SelfIntroductionQuestion />}
          />

          <Route
            path="/feedback"
            element={<FeedbackPage />}
          />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;