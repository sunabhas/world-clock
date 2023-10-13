
const constants = {
    GET_TIMEZONES_API : 'http://worldtimeapi.org/api/timezone',
    SUBMIT_DATA_API: 'http://httpstat.us/201',
    LOCAL_SAVED_NOTES: 'localSavedNotes',
    ITEMS_PER_PAGE: 2,
    NOTES_TABLE_HEADERS : ['S.No','Note', 'Time', 'Area', 'Location']
}

const errorMessages = {
    AREA_ERROR_MSG: 'Area should not be empty.',
    LOCATION_ERROR_MSG: 'Location should not be empty. Please select an area that has locations.',
    NOTE_ERROR_MSG: 'Note should not be empty.'
}


export {constants, errorMessages}