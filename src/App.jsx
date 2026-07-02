import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./pages/AppLayout";
import LoginPage from "./pages/LoginPage";
import MyProfile from "./pages/MyProfile";
import Dashboard from "./pages/Dashboard";
import InterviewMode from "./pages/InterviewMode";
import SelfIntroductionQuestion from "./pages/SelfIntroductionQuestion";
import FeedbackPage from "./pages/FeedbackPage";
import TheoryTopic from "./pages/TheoryTopic";
import SubTopic from "./pages/SubTopicPage";
import TheoryStartModule from "./pages/TheoryStartModule";
import TheoryAIInterview from "./pages/TheoryAIInterview";
import TheoryFeedbackPage from "./pages/TheoryFeedackPage";
import ScheduledInterviewPage from "./pages/ScheduledInterviewPage";
import ScheduledInterviewMode from "./pages/ScheduledInterviewMode";
import ScheduledAIInterviewPage from "./pages/ScheduledAIInterviewPage";
import ScheduledInterviewFeedback from "./pages/ScheduledInterviewFeedback";
import ScoreCardPage from "./pages/ScoreCardPage";
import InterviewPerformanceReport from "./pages/InterviewPerformanceReport";
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
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <MyProfile />
              </ProtectedRoute>
            }
          />

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
            path="/theory-topic"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <TheoryTopic />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sub-topic"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <SubTopic />
              </ProtectedRoute>
            }
          />

          <Route
            path="/theory-interview-start-module"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <TheoryStartModule />
              </ProtectedRoute>
            }
          />

          <Route
            path="/theory-interview"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <TheoryAIInterview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/theory-feedback"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <TheoryFeedbackPage />
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

          <Route
            path="/scheduled-Interview-mode"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ScheduledInterviewMode />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scheduled-AI-Interview"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ScheduledAIInterviewPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scheduled-Interview-feedback"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ScheduledInterviewFeedback />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scorecards"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ScoreCardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Interview-Performance-Report"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <InterviewPerformanceReport />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;