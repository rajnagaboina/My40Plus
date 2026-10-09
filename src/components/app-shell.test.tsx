import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { AppShell } from "./app-shell";

describe("AppShell", () => {
  it("provides labeled desktop and mobile navigation", () => {
    render(createElement(AppShell, null, "Content"));
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "RSVP" })).toHaveLength(2);
  });
});
