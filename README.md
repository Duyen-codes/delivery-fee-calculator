# Delivery Fee Calculator

A web app using React and Typescript that calculates how much the delivery will cost depending on the cart value, the number of items in the cart, the time of the order and the delivery distance.

## Demo

Here is a working live demo: [https://taupe-twilight-1f8214.netlify.app/](https://taupe-twilight-1f8214.netlify.app/)

![App user interface](./images/app_UI.png)

If any of the input fields are left empty when form is submitted, input fields validation errors' messages are displayed:

![Validation errors UI](./images/error_UI.png)

## Table of contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Testing](#testing)
- [Sources](#sources)

## Technologies

Project is built with:

- React
- Typescript
- React-hook-form
- Yup
- React-datepicker
- React testing library Jest

## Installation

To run this project, clone and install it locally using npm:

```shell
# Clone this repository
$ git clone

# Go into the repository
$ cd delivery-fee-calculator

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Testing

All test files are placed in the same directory as the component being tested.
Run test normally with the command:

```shell
CI=true npm test
```

## Sources

Wolt summer 2023 Engineering internship preliminary assignment:[https://github.com/woltapp/engineering-summer-intern-2023](https://github.com/woltapp/engineering-summer-intern-2023)

## Final thoughts
