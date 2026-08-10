import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground animate-pulse">Signing you in…</p>
    </div>
  );
};

export default AuthCallback;
