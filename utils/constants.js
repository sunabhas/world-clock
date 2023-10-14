
const constants = {
    GET_TIMEZONES_API : 'https://worldtimeapi.org/api/timezone',
    SUBMIT_DATA_API: 'https://httpstat.us/201',
    LOCAL_SAVED_NOTES: 'localSavedNotes',
    ITEMS_PER_PAGE: 5,
    NOTES_TABLE_HEADERS : ['S.No','Note', 'Time', 'Area', 'Location']
}

const errorMessages = {
    AREA_ERROR_MSG: 'Area should not be empty.',
    LOCATION_ERROR_MSG: 'Location should not be empty.',
    NOTE_ERROR_MSG: 'Note should not be empty.'
}


export {constants, errorMessages}