import { onRulesAnlegen } from "../support/page_objects/01_Trainingsdaten/10_Rules/01_Rules_Anlegen"
import { onRulesBearbeiten } from "../support/page_objects/01_Trainingsdaten/10_Rules/02_Rules_Bearbeiten"
import { onRulesSuchen } from "../support/page_objects/01_Trainingsdaten/10_Rules/03_Rules_Suchen"
import { onRulesLoeschen } from "../support/page_objects/01_Trainingsdaten/10_Rules/04_RulesLoeschen"


describe('Test Case 8: Rules', () => {

    beforeEach('visit url', () => {
        
        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it('Test Case CCI-T36: Rules Anlegen', () => {
        onRulesAnlegen.rulesAnlegen()

        // A. Rules Anlegen
        /* 
        1. Name should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Error message after unsuccessful saving
        2. Check for successfully saved values
            2.1 Assert Notification
            2.2 Assert in table
        3. Check for duplicate name
            3.1 Error message after unsuccessful saving 
            3.2 Table should not contain double value
        4. Number of Rules must show correctly in Intent Table
        5. Leave site via menu or breadcrump, data must not be saved
        */
    })

    it('Test Case CCI-T37: Rules Bearbeiten', () => {
        onRulesBearbeiten.rulesBearbeiten()

        // B. Rules Bearbeiten
        /* 
        1. Edited naame should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Error message after unsuccessful saving
        2. Check for successfully saved values
            2.1 Assert Notification
            2.2 Assert in table
        3. Check for duplicate name
            3.1 Error message after unsuccessful saving 
            3.2 Table should not contain double value
        4. Number of Rules must show correctly in Intent Table
        5. Leave site via menu or breadcrump, data must be saved
        6. leave site via button "Abbrechen" navigates to table of rules 
        and does not save edited data
        */
    })

    it('Test Case CCI-T46: Rules Suchen', () => {
        onRulesSuchen.rulesSuchen()
        /* 
        C. Intent Example Suchen
        1. Searching for single specific intent works
        2. Searching for some chars multiple intents has in common filters correctly
        3. Searching for some chars no intent has shows empty table
        ** Assert All in Intent Example Table**
        */
    })

    it('Test Case: Rules Loeschen', () => {
        onRulesLoeschen.rulesLoeschen()
    })
})