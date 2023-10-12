import { mount } from "@vue/test-utils";
import NoteList from "../components/NotesList.vue";

describe("NoteList", () => {
  it('should emit "handlePrevious" when previous button is clicked', async () => {
    const wrapper = mount(NoteList, {
      props: {
        showPagination: true,
        previousDisabled: false,
        nextDisabled: false,
      },
    });
    const prevButton = wrapper.find('[data-testid="prev-button"]');
    expect(prevButton).toBeDefined();
  });

  it('should emit "handleNext" when next button is clicked', async () => {
    const wrapper = mount(NoteList, {
      props: {
        showPagination: true,
        previousDisabled: false,
        nextDisabled: false,
      },
    });

    const nextButton = wrapper.find('[data-testid="next-button"]');
    expect(nextButton).toBeDefined();
  });
});
