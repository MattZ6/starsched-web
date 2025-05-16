import { SuspenseRouterOutlet } from "@/components/suspense-router-outlet";

import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function BaseLayout() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />

      <div className="grow">
        <SuspenseRouterOutlet />
      </div>

      <Footer />
    </div>
  )
}
