import { render, screen } from "@testing-library/vue";
import NoteList from "../components/NotesList.vue";

describe("NoteList", () => {
  it("renders with given props", () => {
    const allNotes = [
      {
        note: "fakeNote",
        time: "fakeTime",
        area: "fakeArea",
        location: "fakeLocation",
      },
    ];

    const { container } = render(NoteList, {
      props: {
        allNotes,
      },
    });

    expect(container).toMatchSnapshot();

    const tableHeaders = screen.queryAllByRole("columnheader");
    expect(tableHeaders).toBeDefined();

    const tableDataRows = screen.queryAllByRole("row");
    expect(tableDataRows).toBeDefined();
  });
});
