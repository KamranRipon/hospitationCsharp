import { onFormHinzufuegen } from "../support/page_objects/01_Trainingsdaten/11_Forms/01_Form_Hinzufuegen"
import { onFormBearbeiten } from "../support/page_objects/01_Trainingsdaten/11_Forms/02_Form_Bearbeiten"
import { onFormSuchen } from "../support/page_objects/01_Trainingsdaten/11_Forms/04_Form_Suchen"
import { onPostRule } from "../support/page_objects/01_Trainingsdaten/11_Forms/05_Form_POST_RULE"
import { onFormVerwendungen } from "../support/page_objects/01_Trainingsdaten/11_Forms/06_Form_Verwendungen"

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
        C. Form Suchen
        1. Searching for single specific Form works
           1.1 Form table should display single element
        2. searching for some chars multiple Forms has in common filters correctly
            2.1 Form table should display multiple elements
        3.searching for some chars no Forms has shows empty table
            3.1 Form table should display no element
        */
        
    })

    it('Test Case CCI-T99: POST RULE', () => {
        onPostRule.postRule()
        /*
        C. Form Post Rules
        1. Step-Typ could be selected as many as want, There is no limit.
        2. All the Step-Typ could be deleted and save.
        */
        
    })

    it('Test Case CCI-T100-101: Form Verwendungen', () => {
        onFormVerwendungen.verwendugen()
        /*
        C. Form Form Verwendungen
             1. Test the existance of Verwendungen column in Form Table. 
             2. Compare showed uses number on Form table with under Verwendungen tab
             3. Under Verwendungen tab enter to each element and assert where it uses
        */
        
    })
})