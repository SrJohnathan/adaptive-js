import { auth } from "../auth";
import { AppShell } from "../components/omni-hub/app-shell";
import { CatalogScreen } from "../components/omni-hub/catalog-screen";

export default auth.protectPage(async () => {
  return (
    <AppShell active="catalogo-erp">
      <CatalogScreen />
    </AppShell>
  );
});