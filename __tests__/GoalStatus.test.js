import React from "react";
import { render } from "@testing-library/react-native";
import GoalStatus from "../src/components/GoalStatus";

describe("GoalStatus", () => {
  it('renders "Complete" when status is "complete"', () => {
    const { getByText } = render(<GoalStatus status="complete" />);
    expect(getByText("Complete")).toBeTruthy();
  });

  it('renders "Incomplete" when status is "incomplete"', () => {
    const { getByText } = render(<GoalStatus status="incomplete" />);
    expect(getByText("Incomplete")).toBeTruthy();
  });

  it('renders "Unknown" when status is not "complete" or "incomplete"', () => {
    const { getByText } = render(<GoalStatus status="other" />);
    expect(getByText("Unknown")).toBeTruthy();
  });
});
