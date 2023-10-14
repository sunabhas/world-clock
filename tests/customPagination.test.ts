import { mount } from "@vue/test-utils";
import CustomPagination from "../components/CustomPagination.vue";

describe("PaginationButtons", () => {
  it("should display a Previous button", async () => {
    const wrapper = mount(CustomPagination);
    const customPrevButton = wrapper.find('custom-button[text="Previous"]');
    expect(customPrevButton).toBeDefined();
  });

  it("should display a Next button", () => {
    const wrapper = mount(CustomPagination);
    const customNextButton = wrapper.find('custom-button[text="Next"]');
    expect(customNextButton).toBeDefined();
  });
});
