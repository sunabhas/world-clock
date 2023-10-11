import { mount } from '@vue/test-utils';
import CustomNotesTable from '../components/CustomNotesTable.vue';

describe('CustomNotesTable', () => {
  it('renders the table headers and data correctly', () => {
    const tableHeaders = ['Note', 'Time'];
    const tableData = [
      { note: 'Note 1', time: '2023-01-01' },
      { note: 'Note 2', time: '2023-02-01' },
    ];

    const wrapper = mount(CustomNotesTable, {
      props: {
        tableHeaders,
        tableData,
      },
    });

    const headerCells = wrapper.findAll('thead th');
    expect(headerCells).toHaveLength(tableHeaders.length);

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(tableData.length);
  });
});
