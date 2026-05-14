import { useNavigate } from "react-router";
import { ShieldX, School } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center max-w-lg">
        <ShieldX className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Access Denied
        </h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. This may be because:
        </p>
        <ul className="text-left text-muted-foreground mb-8 space-y-2">
          <li className="flex items-start gap-2">
            <School className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span>Your account hasn't been assigned to a school yet</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldX className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span>You're trying to access a resource outside your role's permissions</span>
          </li>
        </ul>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;