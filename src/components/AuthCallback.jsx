import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Store } from "lucide-react";
import AppContext from "../Context/Context";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) login(token);
    navigate("/", { replace: true });
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-4 overflow-hidden bg-background">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-[100px] animate-aurora" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent2/15 blur-[100px] animate-aurora [animation-delay:-6s]" />

      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin-slow rounded-2xl border-2 border-transparent border-t-primary border-r-accent2" />
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent2 shadow-glow">
          <Store className="h-6 w-6 text-white" />
        </div>
      </div>
      <p className="relative text-sm font-medium text-muted-foreground animate-pulse">Signing you in…</p>
    </div>
  );
};

export default AuthCallback;
