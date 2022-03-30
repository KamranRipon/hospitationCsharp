import { onFormHinzufuegen } from "../support/page_objects/01_Trainingsdaten/11_Forms/01_Form_Hinzufuegen"
import { onFormBearbeiten } from "../support/page_objects/01_Trainingsdaten/11_Forms/02_Form_Bearbeiten"
import { onFormSuchen } from "../support/page_objects/01_Trainingsdaten/11_Forms/04_Form_Suchen"

describe ('Test Case - CCI-C11: Forms', () => {

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

    it('Test Case CCI-T85: Form Bearbeiten', () => {
        onFormBearbeiten.formBearbeiten()
        /* 
        1. Edited Name should not be empty, error message should contain "Name"
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
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */
    })

    it('Test Case CCI-T86: Form Suchen', () => {
        onFormSuchen.formSuchen()
        /*
        C. Action Suchen
        1. Searching for single specific action works
           1.1 Action table should display single element
        2. searching for some chars multiple actions has in common filters correctly
            2.1 Action table should display multiple elements
        3.searching for some chars no actions has shows empty table
            3.1 Action table should display no element
        */
        
    })

})
