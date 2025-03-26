import { render, screen, fireEvent } from "@testing-library/react";
import { TodoStatusFilter } from ".";

import "@testing-library/jest-dom/extend-expect";

describe("TodoStatusFilter", () => {
  const mockOnChangeStatus = jest.fn();

  beforeEach(() => {
    mockOnChangeStatus.mockClear();
  });

  it("should render all status filters", () => {
    render(<TodoStatusFilter status="all" />);

    expect(screen.getByText("all")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("completed")).toBeInTheDocument();
  });

  it("should call onChangeStatus when item clicked", () => {
    render(<TodoStatusFilter status="all" onChangeStatus={mockOnChangeStatus} />);

    fireEvent.click(screen.getByText("completed"));
    expect(mockOnChangeStatus).toHaveBeenCalledWith("completed");
  });

  it("should not call onChangeStatus when not provided", () => {
    render(<TodoStatusFilter status="all" />);

    fireEvent.click(screen.getByText("active"));
    expect(mockOnChangeStatus).not.toHaveBeenCalled();
  });

  it("should visually indicate selected status", () => {
    const { rerender } = render(<TodoStatusFilter status="all" />);

    const allItem = screen.getByText("all");
    expect(allItem).toHaveClass("selected");

    rerender(<TodoStatusFilter status="active" />);

    const activeItem = screen.getByText("active");
    expect(activeItem).toHaveClass("selected");
    expect(allItem).not.toHaveClass("selected");
  });
});
