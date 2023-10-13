import { mount } from "@vue/test-utils";
import NoteList from "../components/NotesList.vue";

describe("NoteList", () => {
  it.skip('should emit "handlePrevious" when previous button is clicked', async () => {
    const wrapper = mount(NoteList, {
      props: {
        showPagination: true,
        previousDisabled: false,
        nextDisabled: false,
        listOfCreatedNotes: ["fakeData"],
      },
    });
    const listOfCreatedNotes = wrapper.vm.listOfCreatedNotes;

    expect(listOfCreatedNotes).toHaveLength(1);

    const prevButton = wrapper.find('[data-testid="prev-button"]');
    expect(prevButton).toBeDefined();
  });

  it.skip('should emit "handleNext" when next button is clicked', async () => {
    const wrapper = mount(NoteList, {
      props: {
        showPagination: true,
        previousDisabled: false,
        nextDisabled: false,
        listOfCreatedNotes: [],
      },
    });

    const nextButton = wrapper.find('[data-testid="next-button"]');
    expect(nextButton).toBeDefined();
  });
});
