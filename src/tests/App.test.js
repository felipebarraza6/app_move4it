import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

test("renders login screen after initialization", async () => {
  render(<App />);

  // Initially it shows the loading screen
  expect(screen.getByText(/Preparando tu experiencia.../i)).toBeInTheDocument();

  // Wait for the login screen to appear
  await waitFor(() => {
    // We look for this text because "Bienvenido" is split into two spans with different colors
    const loginPrompt = screen.getByText(/Ingresa tus credenciales para continuar/i);
    expect(loginPrompt).toBeInTheDocument();
  }, { timeout: 3000 });
});
