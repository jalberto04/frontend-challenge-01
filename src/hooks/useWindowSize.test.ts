import { renderHook, act } from "@testing-library/react";
import useWindowSize from "./useWindowSize";
import { describe, it, expect } from "vitest";

describe("useWindowSize", () => {
  it("returns the initial window dimensions", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: 500, height: 600 });
  });

  it("updates the dimensions when the window is resized", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 600,
    });

    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 800,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 900,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 800, height: 900 });
  });
});
