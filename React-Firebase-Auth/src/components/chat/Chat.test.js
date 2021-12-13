import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Chat } from "./Chat"

it("render correctly", () => {
	const { queryByTestId, quesryByPlaceHolderText } = render(<Chat />);
	expect(queryByTestId)
})