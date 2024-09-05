import { AppProvider } from "./AppProvider";
import { AppRouter } from "./Router";

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
