import { onFormHinzufuegen } from "../support/page_objects/01_Trainingsdaten/11_Forms/01_Form_Hinzufuegen"

describe ('Test Case: Form', () => {

    beforeEach('visit url', () => {

        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it('Test Case CCI-T84: Form Hinzufuegen', () => {
        onFormHinzufuegen.formHinzufuegen()
        /* 
        1. Name should not be empty, error message should contain "Name"
            1.1 Test error and warning messages
                1.1 Under Name input
                1.2 with space and Slace
                1.3 try to save without name
        2. Check for successfully saved values
            2.1 Assert Notification
            2.2 Assert in table
        3. Check for duplicate name
            2.1 Assert warning
            2.2 Assert in table
        4. Leave site via menu or breadcrump, data must not be saved
            4.1 Assert in table
        */
    })

})
