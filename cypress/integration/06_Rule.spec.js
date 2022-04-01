//import { onRules } from "../support/page_objects/01_Trainingsdaten/10_Rules/Rules"

import { onRulesAnlegen } from "../support/page_objects/01_Trainingsdaten/10_Rules/01_Rules_Anlegen"
import { onRulesBearbeiten } from "../support/page_objects/01_Trainingsdaten/10_Rules/02_Rules_Bearbeiten"
//import { onIntentSuchen } from "../support/page_objects/01_Trainingsdaten/01_Intents/03_Intent_Suchen"
// import { onIntentExampleHinzufuegen } from "../support/page_objects/01_Trainingsdaten/01_Intents/04_Intent_Example_Hinzufuegen"
// import { onIntentExampleBearbeiten } from "../support/page_objects/01_Trainingsdaten/01_Intents/05_Intent_Example_Bearbeiten"
// import { onIntentExampleSuchen } from "../support/page_objects/01_Trainingsdaten/01_Intents/06_Intent_Example_Suchen"
// import { onIntentExampleLoeschen } from "../support/page_objects/01_Trainingsdaten/01_Intents/07_Intent_Example_Loeschen"


describe('Test Case 8: Rules', () => {

    beforeEach('visit url', () => {
        
        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it('Test Case: Rules Anlegen', () => {
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

    it('Test Case: Rules Bearbeiten', () => {
        onRulesBearbeiten.rulesBearbeiten()

        // A. Rules Bearbeiten
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

    it('Test Case: Rules Suchen', () => {
        onRules.rulesSuchen()
    })

    it('Test Case: Rules Loeschen', () => {
        onRules.rulesLoeschen()
    })
})