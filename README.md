# Amazing Note App

# Description

```
- This Nuxt 3 web app is responsive, built with a scalable architecture that allows users to input and view notes and timezone details. It employs Tailwind CSS for styling and features server-side rendering (SSR).

```

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Demo Link


[https://amazing-note-app.netlify.app/](https://amazing-note-app.netlify.app/)


## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

## Testing

Run the unit test of the app

```bash
# yarn
yarn run test
```

See the coverage report

```bash
# yarn
yarn run coverage
```

## Task Completed

```
1. The app has the responsive form UI to take inputs from the user to and make network request call.
2. The app has a table to display all the stored notes along with the time, area and location.
3. The app has pagination service for multiple notes.
4. The app is mobile responsive.
5. The app covers unit test cases for the important components.
6. The app has been structured in modularized fashion.

```

## Bonus

# Integration Tests Documentation

This document provides an overview of the integration tests for our project. Integration tests focus on verifying that different components, services, or modules work together as expected.

## Test Points

### 1. Adding a Note

**Test Objective:** Verify that the functionality to enter a note, along with area and location selection, and submitting the data by clicking the "Add Note" button works correctly.

**Steps to Reproduce:**

1. Launch the application.
2. Enter a note in the provided text field.
3. Select an area and a location.
4. Click the "Add Note" button.

**Expected Result:** The submitted data should be successfully stored.

### 2. Data Storage

**Test Objective:** Verify that the submitted data is stored in `localStorage`.

**Steps to Reproduce:**

1. Complete the steps in "Adding a Note" test.
2. Verify that the data is stored in `localStorage`.

**Expected Result:** The data should be saved in `localStorage`.

### 3. Table Display

**Test Objective:** Ensure that the table displays the note, time, area, and location.

**Steps to Reproduce:**

1. Check the table on the application.

**Expected Result:** The table should display the note, time, area, and location for the stored data.

### 4. Pagination

**Test Objective:** Verify that the pagination feature allows navigation across stored data.

**Steps to Reproduce:**

1. Check for pagination under the table.
2. Click the "Previous" and "Next" buttons.

**Expected Result:**

- Clicking "Previous" should display previous data from `localStorage`.
- Clicking "Next" should display the next set of data from `localStorage`.

### 5. Table Data Limit

**Test Objective:** Verify that the table displays a maximum of 5 data entries at a time.

**Steps to Reproduce:**

1. Check the table on the application.

**Expected Result:** The table should display a maximum of 5 data entries at a time.
