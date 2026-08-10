import { Store } from "lucide-react";
import { motion } from "framer-motion";

const baseUrl = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

const Login = () => {
  const handleGoogle = () => {
    window.location.href = `${baseUrl}/oauth2/authorization/google`;
  };

  const handleGitHub = () => {
    window.location.href = `${baseUrl}/oauth2/authorization/github`;
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Aurora background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[100px] animate-aurora" />
        <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent2/20 blur-[100px] animate-aurora [animation-delay:-6s]" />
        <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px] animate-aurora [animation-delay:-12s]" />
      </div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, black, transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* Glow ring behind card */}
        <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-primary/40 via-accent2/20 to-transparent opacity-60 blur-xl" />

        {/* Card */}
        <div className="glass relative rounded-[1.75rem] px-8 py-10 shadow-glow-lg">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-8 flex flex-col items-center gap-3"
          >
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent2 shadow-glow animate-float">
              <Store className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gradient-animated">ShopEase</h1>
            <p className="text-center text-sm leading-relaxed text-muted-foreground">
              Sign in to manage products, place orders,<br />and track your purchases.
            </p>
          </motion.div>

          {/* OAuth buttons */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            className="flex flex-col gap-3"
          >
            <motion.button
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              onClick={handleGoogle}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-md active:scale-[0.98]"
            >
              <GoogleIcon />
              Continue with Google
            </motion.button>

            <motion.button
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              onClick={handleGitHub}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-gradient-to-br from-primary to-accent2 px-4 py-2.5 text-sm font-medium text-white shadow-glow-sm transition-all hover:-translate-y-0.5 hover:shadow-glow active:scale-[0.98]"
            >
              <GitHubIcon className="text-white" />
              Continue with GitHub
            </motion.button>
          </motion.div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing in you agree to our{" "}
            <span className="cursor-pointer underline decoration-primary/40 underline-offset-2 transition-colors hover:text-foreground hover:decoration-primary">
              Terms of Service
            </span>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 fill-current ${className}`} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default Login;
