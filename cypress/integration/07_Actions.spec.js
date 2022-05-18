import { onActionAnlegen } from "../support/page_objects/01_Trainingsdaten/06_Actions/01_Action_Hinzufuegen"
import { onActionBearbeiten } from "../support/page_objects/01_Trainingsdaten/06_Actions/02_Action_Bearbeiten"
import { onActionSuchen } from "../support/page_objects/01_Trainingsdaten/06_Actions/03_Action_Suchen"

describe('Test Case : Actions', () => {

    beforeEach('visit url', () => {
        //cy.login('admin', 'cciAdmin#2022+')
        cy.visit('/')
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it('Test Case CCI-T69: Action Anlegen', () => {
        onActionAnlegen.actionAnlegen()
        /*
        A. Action Hinzufügen
        1. Name should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Error message after unsuccessful saving
        2. Name should not contain "Space" or "/"
        3. name should not be known already for an action,
           error message should contain "Action"
            2.1 Error message after unsuccessful saving 
            2.2 Valaue should be in the Action table, assert action Table
        4. name should not be known already for an response, 
           error message should contain "Response"
        5. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
        6. Leave site via menu or breadcrump, data must not be saved
        7. Click on "Anlegen" navigates to table of actions
        */
    })

    it('Test Case CCI-T70: Action Bearbeiten', () => {
        onActionBearbeiten.actionBearbeiten()
        /* 
        B. Action Bearbeiten
        1. Edit Name should not be empty, error message should contain "Name"
            1.1 Action Name
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

    it('Test Case CCI-T71: Action Suchen', () => {
        onActionSuchen.actionSuchen()
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