import { onDataiAnlegen } from "../support/page_objects/01_Trainingsdaten/08_Benutzerdefiniert/01_Datai_Hizufuegen"

describe ('Test Case : Benutzerdefiniert', () => {

    beforeEach('visit url', () => {
        cy.visit('/')
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        cy.wait(500)
    })

    it('Test Case CCI-T79: Datai Anlegen', () => {
        onDataiAnlegen.dataiAnlegen()
        /*
        A. Datai Anlegen
        1. Name should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Error message after unsuccessful saving 
        2. Check for duplicate name
            2.1 Error message after unsuccessful saving 
            2.2 Valaue should be in the Story table, assert action Table
        3. Saving on validation error not possible
            3.1 Case 1: "no intent is chossen"    --> Assert error message
            3.2 Case 2: multiple intents in a row --> Assert error message
            3.3 Case 3: intents is last step      --> Assert error message
        4. Check for successfully saved values
            4.1 Assert Notification
            4.2 Assert in table
        5. Leave site via menu or breadcrump, data must not be saved
        6. Click on "Anlegen" navigates to table of strories
        */
    })
})