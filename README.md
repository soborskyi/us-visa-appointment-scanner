## US visa appointment (date) scanner

This package checks the availability of dates for US Visa interview at official Canadian website for interview scheduling.

The test is executed on Cypress framework using Chrome browser. Shell script is provided to iterate the cycle until a desired date is found.

---

#### Instalation

1. Clone this repo.

2. Install NPM.

3. Install Cypress using NPM:
`npm i`

---

#### Configuration

Manually create `cypress.env.json` file and replace the values according to your data:
```
{
"email": "your-email@mail.com",
"password": "your-password",
"date": "02/20/2023"
}
```

---

#### Run

Run scheduler which executes the test every 5 minutes:
`./run.sh`

---

Debug the test in interactive Cypress mode:
`./node_modules/cypress/bin/cypress open`

Select the test spec in specs/check-availability.cy.js.

---

Run one time command in terminal:

`npx cypress run --headed --browser chrome --spec specs/check-availability.cy.js --env email=?,password=?,date=02/20/2023`

