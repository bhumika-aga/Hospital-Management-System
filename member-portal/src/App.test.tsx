import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders login form", () => {
  render(<App />);
  const loginTitle = screen.getByText(/Welcome Back/i);
  expect(loginTitle).toBeInTheDocument();
});
