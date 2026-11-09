import { auth } from "../auth";
import { AppShell } from "../components/omni-hub/app-shell";
import { StudioScreen } from "../components/omni-hub/studio-screen";

export default auth.protectPage(async () => {
  return (
    <AppShell active="estudio-banners">
      <StudioScreen />
    </AppShell>
  );
});