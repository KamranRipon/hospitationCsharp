import { onStoryHinzufugen } from "../support/page_objects/01_Trainingsdaten/07_Stories/01_Stories_Hinzufuegen"
import { onStoryBearbeiten } from "../support/page_objects/01_Trainingsdaten/07_Stories/02_Stories_Bearbeiten"
import { onStoriesSuchen } from "../support/page_objects/01_Trainingsdaten/07_Stories/03_Stories_Suchen"
import { onStoriesLoeschen } from "../support/page_objects/01_Trainingsdaten/07_Stories/04_Stories_Loeschen"

describe ('Test Case : Stories', () => {

    beforeEach('visit url', () => {
        //cy.login('admin', 'cciAdmin#2022+')
        cy.visit('/')
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        cy.wait(500)
    })

    it('Test Case CCI-T72: Story Hinzufugen', () => {
        onStoryHinzufugen.storyHinzufuegen()
        /*
        A. Story Hinzufügen
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

    it('Test Case CCI-T73: Story Bearbeiten', () => {
        onStoryBearbeiten.storyBearbeiten()
        /*
        A. Story Bearbeiten
        1. Edit name should not be empty, error message should contain "Name"
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
        5. leave site via menu or breadcrump is possible, saves edited data
        6. Leave site via Abbrechen data must not be saved
        7. Click on "Anlegen" navigates to table of strories
        */
    })

    it('Test Case CCI-T74: Story Suchen', () => {
        onStoriesSuchen.storiesSuchen()
        /*
        A. Story Suchen
        1. Searching for single specific action works
        2. Searching for some chars multiple actions has in common 
           filters correctly
        3. Searching for some chars no actions has shows empty table
        */
    })

    it.only('Test Case CCI-T75: Story Löschen', () => {
        onStoriesLoeschen.storiesLoeschen()
        /*
        D. Story Loeschen
        1. Story can be remove form Story Table
            1.1 Assert notification
            1.2 Assert in Story Table
        */
    })
})