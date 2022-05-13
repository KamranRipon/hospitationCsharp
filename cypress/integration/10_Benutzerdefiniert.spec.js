import { onDataiAnlegen } from "../support/page_objects/01_Trainingsdaten/08_Benutzerdefiniert/01_Datai_Hizufuegen"
import { onDataiBearbeiten } from "../support/page_objects/01_Trainingsdaten/08_Benutzerdefiniert/02_Datai_Bearbeiten"
import { onDateiSuchen } from "../support/page_objects/01_Trainingsdaten/08_Benutzerdefiniert/03_Datai_Suchen"
import { onDateiLoeschen } from "../support/page_objects/01_Trainingsdaten/08_Benutzerdefiniert/04_Datai_Loeschen"

describe ('Test Case : Benutzerdefiniert', () => {

    beforeEach('visit url', () => {
        cy.visit('/')
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
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
        2. Name should not contain space or "/"
            2.1 warning message under input field
            2.2 Failed notification after unsuccessful save
        3. Check for duplicate name
            2.1 Error message after unsuccessful saving 
            2.2 Valaue should be in the Story table, assert Table
        4. Saving on validation error not possible
            3.1 Case 1: "no intent is chossen"    --> Assert error message
            3.2 Case 2: multiple intents in a row --> Assert error message
            3.3 Case 3: intents is last step      --> Assert error message
        5. Check for successfully saved values
            4.1 Assert Notification
            4.2 Assert in table
        6. Leave site via menu or breadcrump, data must not be saved
        7. Click on "Anlegen" navigates to table of strories
        */
    })

    it('Test Case CCI-T80: Datai Bearbeiten', () => {
        onDataiBearbeiten.dateiBearbeiten()
        /* 
        B. Datai Bearbeiten
        1. Edit Name should not be empty, error message should contain "Name"
            1.1 Datai Name
                1.1.1 Warning message below input field
                1.1.2 Error message after unsuccessful saving
        2. Edit name to contain spaces or "/" not allowed, 
           error message should contain "Name"
        3. Edit name to already known name for an response, 
           error message should contain "Response"
        4. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in response table
        5. Leave site via menu or breadcrump, data must be saved
        6. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */
    })

    it('Test Case CCI-T81: Datai Suchen', () => {
        onDateiSuchen.dateiSuchen()
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

    it('Test Case CCI-T82: Datei Löschen', () => {
        onDateiLoeschen.dateiLoeschen()
        /*
        D. Datei Loeschen
        1. Datei can be remove form Datei Table
            1.1 Assert notification
            1.2 Assert in Datei Table
        */
    })
})