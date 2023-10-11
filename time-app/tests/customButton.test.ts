import {mount} from "@vue/test-utils";
import  CustomButton  from "../components/CustomButton.vue";

 
describe('CustomButton', () => {
    it('renders correctly when not disabled', () => {
      const wrapper = mount(CustomButton, {
        props: {
          text: 'Button Text',
          disabled: false,
        },
      });
      
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('button').classes()).toContain('bg-blue-700');
      expect(wrapper.find('button').text()).toBe('Button Text');
  
      wrapper.find('button').trigger('click');
  
      expect(wrapper.emitted('handleClick')).toHaveLength(1);
    });
  
    it('renders correctly when disabled', () => {
      const wrapper = mount(CustomButton, {
        props: {
          text: 'Button Text',
          disabled: true,
        },
      });
  
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('button').classes()).toContain('bg-gray-700');
      expect(wrapper.find('button').text()).toBe('Button Text');
  
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    });
  });
  