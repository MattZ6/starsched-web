import { SuspenseRouterOutlet } from "@/components/suspense-router-outlet";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Loading } from "./components/loading";

export function BaseLayout() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />

      <div className="grow">
        <SuspenseRouterOutlet
          loadingComponent={<Loading />}
        />
      </div>

      <Footer />
    </div>
  )
}
