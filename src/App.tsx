import { useEffect, type ReactNode } from "react";
import { AssessmentProvider, useAssessment } from "./context/AssessmentContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Signup";
import { ProfileStep } from "./pages/Assessment/ProfileStep";
import { AreasStep } from "./pages/Assessment/AreasStep";
import { ResultStep } from "./pages/Assessment/ResultStep";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { navigate, ROUTES, usePath } from "./router";

function Redirect({ to }: { to: string }) {
  useEffect(() => {
    navigate(to, { replace: true });
  }, [to]);
  return null;
}

function Routes() {
  const path = usePath();
  const { user } = useAuth();
  const { completed, profileComplete, area } = useAssessment();
  const userHome = completed ? ROUTES.dashboard : ROUTES.profile;

  const requireAuth = (page: ReactNode) => (user ? page : <Redirect to={ROUTES.login} />);
  const guestOnly = (page: ReactNode) => (user ? <Redirect to={userHome} /> : page);

  switch (path) {
    case ROUTES.home:
      return <Landing />;
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
      return requireAuth(completed ? <Dashboard /> : <Redirect to={ROUTES.profile} />);
    default:
      return <Redirect to={ROUTES.home} />;
  }
}

function SessionScopedProviders({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const id = user?.email ?? "anon";
  return (
    <AssessmentProvider key={id} storageId={id}>
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
