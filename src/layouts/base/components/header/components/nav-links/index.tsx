import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function NavLinks() {

  return (
    <nav className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/sign-in">
          Sign in
        </Link>
      </Button>
      <Button size="sm" asChild>
        <Link to="/sign-up">
          Sign up
        </Link>
      </Button>
    </nav >
  )
}
