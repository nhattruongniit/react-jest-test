import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import App, { Counter, dataReducer } from "./App";

const list = ["a", "b", "c"];

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App", () => {
  test("snapshot renders", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("Reducer", () => {
    it("should set a list", () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, {
        type: "SET_LIST",
        list
      });
      expect(newState).toEqual({ list, error: null });
    });

    it("should reset the error if list is set", () => {
      const state = { list: [], error: true };
      const newState = dataReducer(state, {
        type: "SET_LIST",
        list
      });
      expect(newState).toEqual({ list, error: null });
    });

    it("should set the error", () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, { type: "SET_ERROR" });
      expect(newState.error).toBeTruthy();
    });

    it("should set default state", () => {
      const state = { list: [], error: null };
      const newState = dataReducer(state, { type: "" });
      expect(newState).toEqual(state);
    });
  });
});

describe("Counter", () => {
  test("snapshot renders", () => {
    const component = renderer.create(<Counter counter={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
