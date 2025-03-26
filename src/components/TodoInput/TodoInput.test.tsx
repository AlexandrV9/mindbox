import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoInput } from ".";

import "@testing-library/jest-dom/extend-expect";

describe("TodoInput", () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render input with placeholder", () => {
    render(<TodoInput />);
    const input = screen.getByPlaceholderText("What need to be done?");
    expect(input).toBeInTheDocument();
  });

  it("should call onAddTodo when Enter is pressed with non-empty text", async () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText("What need to be done?");

    await userEvent.type(input, "New task{enter}");

    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
    expect(mockOnAddTodo).toHaveBeenCalledWith("New task");
  });

  it("should not call onAddTodo when Enter is pressed with empty text", async () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText("What need to be done?");

    await userEvent.type(input, "{enter}");

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it("should clear input after adding todo", async () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText("What need to be done?") as HTMLInputElement;

    await userEvent.type(input, "New task{enter}");

    expect(input.value).toBe("");
  });

  it("should not call onAddTodo for other keys", async () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText("What need to be done?");

    await userEvent.type(input, "New task");

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it("should handle undefined onAddTodo prop", async () => {
    render(<TodoInput />);
    const input = screen.getByPlaceholderText("What need to be done?");

    await userEvent.type(input, "New task{enter}");

    expect(input).toBeInTheDocument();
  });

  it("should trim whitespace from input", async () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText("What need to be done?");

    await userEvent.type(input, "   New task   {enter}");

    expect(mockOnAddTodo).toHaveBeenCalledWith("New task");
  });
});
