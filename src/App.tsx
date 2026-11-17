import { useEffect, type ReactNode } from "react";
import { AssessmentProvider, useAssessment } from "./context/AssessmentContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { ProfileStep } from "./pages/Assessment/ProfileStep";
import { AreasStep } from "./pages/Assessment/AreasStep";
import { ResultStep } from "./pages/Assessment/ResultStep";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { navigate, ROUTES, usePath } from "./router";

/** A landing é uma página estática (index.html); o app vive em app.html. */
function GoToLanding() {
  useEffect(() => {
    window.location.replace(import.meta.env.BASE_URL);
  }, []);
  return null;
}

function Redirect({ to }: { to: string }) {
  useEffect(() => {
    navigate(to, { replace: true });
  }, [to]);
  return null;
}

function Routes() {
  const path = usePath();
  const { user } = useAuth();
  const { completed, profileComplete, area, result } = useAssessment();
  const userHome = completed && result ? ROUTES.dashboard : ROUTES.profile;

  const requireAuth = (page: ReactNode) => (user ? page : <Redirect to={ROUTES.login} />);
  const guestOnly = (page: ReactNode) => (user ? <Redirect to={userHome} /> : page);

  switch (path) {
    case ROUTES.home:
      return <GoToLanding />;
    case ROUTES.login:
      return guestOnly(<Login />);
    case ROUTES.signup:
      return guestOnly(<Signup />);
    case ROUTES.profile:
      return requireAuth(<ProfileStep />);
    case ROUTES.areas:
      return requireAuth(profileComplete ? <AreasStep /> : <Redirect to={ROUTES.profile} />);
    case ROUTES.result:
      return requireAuth(area ? <ResultStep /> : <Redirect to={ROUTES.areas} />);
    case ROUTES.dashboard:
      return requireAuth(completed && result ? <Dashboard /> : <Redirect to={ROUTES.profile} />);
    default:
      return <Redirect to={ROUTES.home} />;
  }
}

function SessionScopedProviders({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const id = user?.email ?? "anon";
  return (
    <AssessmentProvider key={id} storageId={id} authenticated={!!user}>
      {children}
    </AssessmentProvider>
  );
}

export function App() {
  return (
    <AuthProvider>
      <SessionScopedProviders>
        <Routes />
      </SessionScopedProviders>
    </AuthProvider>
  );
}
