import { mount } from '@vue/test-utils';
import CustomTextarea from '../components/CustomTextarea.vue';

describe('CustomTextarea', () => {
  it('emits an "updateText" event when text is changed', async () => {
    const id = 'note';
    const label = 'Note';
    const placeholder = 'Enter the note';

    const wrapper = mount(CustomTextarea, {
      props: {
        id,
        label,
        placeholder,
      },
    });

    const textArea = wrapper.find('input');
    await textArea.setValue('New note text');

    expect(wrapper.emitted('updateText')).toBeTruthy();
  });

  it('correctly renders the label and placeholder', () => {
    const id = 'note';
    const label = 'Note';
    const placeholder = 'Enter the note';

    const wrapper = mount(CustomTextarea, {
      props: {
        id,
        label,
        placeholder,
      },
    });

    expect(wrapper.text()).toContain(label);
    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder);
  });
});
