import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("render Card component", () => {
  it("should have a prop children", () => {
    const childElement = <div>Test Child</div>;
    render(<Card>{childElement}</Card>);
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    render(<Card />);
  });

  it("class is applied correctly", () => {
    const childElement = "Test Child";
    render(<Card>{childElement}</Card>);
    expect(screen.getByText("Test Child")).toHaveClass("card");
  });
});
