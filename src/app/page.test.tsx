import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import HomePage from "./page";

describe("HomePage", () => {
  it("introduces the celebration", () => {
    render(createElement(HomePage));
    expect(screen.getByRole("heading", { name: /celebrating lakshmi's 40th/i })).toBeInTheDocument();
    expect(screen.getByText("Sunday, November 15, 2026")).toBeInTheDocument();
    expect(screen.getByText(/venue details coming soon/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "RSVP now" })).toHaveAttribute("href", "/rsvp");
  });
});
