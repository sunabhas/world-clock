import { mount } from "@vue/test-utils";
import CustomDropdown from "../components/CustomDropdown.vue";

describe("CustomDropdown", () => {
  it("renders correctly", async () => {
    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ];
    const wrapper = mount(CustomDropdown, {
      props: {
        id: "my-dropdown",
        label: "Select an option",
        options,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("label").text()).toBe("* Select an option");
    expect(wrapper.findAll("option").length).toBe(options.length);

    wrapper.find("select").setValue({ selectedOption: "option1" });

    expect(wrapper.emitted("updateSelection")).toHaveLength(1);
  });
});
