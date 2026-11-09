import { auth } from "../auth";
import { AppShell } from "../components/omni-hub/app-shell";
import { StorageScreen } from "../components/omni-hub/storage-screen";

export default auth.protectPage(async () => {
  return (
    <AppShell active="armazenamento-midias">
      <StorageScreen />
    </AppShell>
  );
});