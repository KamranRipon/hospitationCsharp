import { onIntentHinzufuegen } from "../support/page_objects/01_Trainingsdaten/01_Intents/01_Intents_Hinzufuegen"
import { onIntentBearbeiten } from "../support/page_objects/01_Trainingsdaten/01_Intents/02_Intents_Bearbeiten"
import { onIntentSuchen } from "../support/page_objects/01_Trainingsdaten/01_Intents/03_Intent_Suchen"
import { onIntentExampleHinzufuegen } from "../support/page_objects/01_Trainingsdaten/01_Intents/04_Intent_Example_Hinzufuegen"
import { onIntentExampleBearbeiten } from "../support/page_objects/01_Trainingsdaten/01_Intents/05_Intent_Example_Bearbeiten"
import { onIntentExampleSuchen } from "../support/page_objects/01_Trainingsdaten/01_Intents/06_Intent_Example_Suchen"
import { onIntentExampleLoeschen } from "../support/page_objects/01_Trainingsdaten/01_Intents/07_Intent_Example_Loeschen"

describe ('Test Case: Intents', () => {

    beforeEach('visit url', () => {

        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        cy.wait(500)
    })

    it('CCI-T4: Intents Hinzufuegen', () => {
        onIntentHinzufuegen.intentsHinzufuegen()
        /*
        A. Intent Hinzufügen
        1. Name should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Warning message for space and Slace
            1.3 Error message after unsuccessful saving
        2. Check for successfully saved values
            2.1 Assert Notification
            2.2 Assert in table
        3. Check for duplicate name
            3.1 Error message after unsuccessful saving 
            3.2 Table should not contain double value
        4. Leave site via menu or breadcrump, data must not be saved
            4.1 Assert in Table
        5. Click on "Anlegen" remains on details page
            5.1 Assert url
        */
    })

    it('Test Case: Intent bearbeiten', () => {
        onIntentBearbeiten.intentBearbeiten()
        /* 
        B. Intent Bearbeiten
        1. Edit Name should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Warning message for space and Slace
            1.3 Error message after unsuccessful saving
        2. Check for successfully saved values
            2.1 Assert Notification
            2.2 Assert in response table
        3. Check for duplicate name
            3.1 Error message after unsuccessful saving
            3.2 Table should not contain double value
        4. Leave site via menu or breadcrump, edited data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
            5.1 Assert landing page
            5.2 Assert data on table
        */
    })

    it('Test Case: Intent suchen', () => {
        onIntentSuchen.intent_suchen()
        /* 
        C. Intent Suchen
        1. Searching for single specific intent works
        2. Searching for some chars multiple intents has in common filters correctly
        3. Searching for some chars no intent has shows empty table
        ** Assert All in Intent TAble**
        */
    })

    it('Test Case: Intent Example hinzufuegen', () => {
        onIntentExampleHinzufuegen.intentExampleHinzufuegen()
        /*
        D. Intent Example Hinzufügen
        1. Name should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Error message after unsuccessful saving 
        2. Annotate text in editor works
            2.1 single annotation
            2.2 multiple annotation of same entity
            2.3 multiple annotation of different entities
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
            3.3 Unsed entitles shows correctly
        5. Table of intents has correct count of examples
        4. Leave site via menu or breadcrump, data must not be saved
        */
    })

    it('Test Case: Intent Example Bearbeiten', () => {
        onIntentExampleBearbeiten.intentExampleBearbeiten()
        /*
        D. Intent Example Hinzufügen 
        1. Edit name should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Error message after unsuccessful saving
        2. Edit annotate text in editor works
            2.1 single annotation
            2.2 multiple annotation of same entity
            2.3 multiple annotation of different entities
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
            3.3 Unsed entitles shows correctly
        4. Table of intents has correct count of examples
        5. Leave site via menu or breadcrump, data must be saved
        6. leave site via button "Abbrechen" navigates to table of intent examples 
           and does not save edited data
        */
    })

    it('Test Case: Intent Example Suchen', () => {
        onIntentExampleSuchen.intentExampleSuchen()
        /* 
        E. Intent Example Suchen
        1. Searching for single specific intent works
        2. Searching for some chars multiple intents has in common filters correctly
        3. Searching for some chars no intent has shows empty table
        ** Assert All in Intent Example Table**
        */
    })

    it('Test Case: Intent Example Loeschen', () => {
        onIntentExampleLoeschen.intentExampleLoeschen()
        /* 
        F. Intent Example Suchen
        1. Example is removed from table of examples by clicking "X" button
        2. Assert by counting number of row remain in the intent example table
        */
    })
})