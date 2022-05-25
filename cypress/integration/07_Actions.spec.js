import { onActionAnlegen } from "../support/page_objects/01_Trainingsdaten/06_Actions/01_Action_Hinzufuegen"
import { onActionBearbeiten } from "../support/page_objects/01_Trainingsdaten/06_Actions/02_Action_Bearbeiten"
import { onActionSuchen } from "../support/page_objects/01_Trainingsdaten/06_Actions/03_Action_Suchen"
import { onActionLoeschen } from "../support/page_objects/01_Trainingsdaten/06_Actions/04_Action_Loeschen"
import { onActionVerwendungen } from "../support/page_objects/01_Trainingsdaten/06_Actions/05_Actions_Verwendungen"

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

    it('Test Case CCI-T95: Actions Loeschen', () => {
        onActionLoeschen.actionLoeschen()
        /*
        D. Action Loeschen
        1. Action Name can be remove form Action Table
            1.1 Assert notification
            1.2 Assert in Action Table
        */
    })

    it('Test Case CCI-T96: Actions Verwendungen', () => {
        onActionVerwendungen.actionVerwendungen()
        /*
        D. Action Verwendungen
        1.  Add an Actions „action_used“
        2.	Navigate to Intents-Rules
        3.	Add a new Rules with steps “action_used”
        4.	Add a new Form
        5.	Navigate to POST RULE
        6.	Add a step
        7.	Add a story with step “action_used” 
        8.	Enter to saved action button through action search (search this action button)
        9.	Navigate to Verwendungen
        10.	Assert buttons used this action button
        11.	Click Intent Rules button 
        12.	Assert portion of url
        13.	Return to  action button 
        14.	Do the save for Post-Form Rule & Stories

        */
    })
})