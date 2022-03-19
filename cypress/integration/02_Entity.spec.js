import { onEntityHinzufuegen } from "../support/page_objects/01_Trainingsdaten/02_Entities/01_Entity_Hinzufuegen"
import { onEntityBearbeiten } from "../support/page_objects/01_Trainingsdaten/02_Entities/02_Entity_Bearbeiten"
import { onEntitySuchen } from "../support/page_objects/01_Trainingsdaten/02_Entities/03_Entity_Suchen"

describe("Test Case 5: Entity", () => {

    beforeEach('visit url', () => {
        cy.visit('/', {force:true})
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it("Test Case CCI-T10:Entity Hinzufuegen", () => {
        onEntityHinzufuegen.entityHinzufuegen()
        /*
        A. Entity Hinzufügen 
        1. Name should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Error message after unsuccessful saving 
        2. Check for duplicate name
            2.1 Error message after unsuccessful saving 
            2.2 Valaue should be in the Response table, assert response Table
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
        4. Leave site via menu or breadcrump, data must not be saved
        */
    })

    it("Test Case CCI-T12: Entity Bearbeiten", () => {
        onEntityBearbeiten.entityBearbeiten()
        /* 
        B. Entity Bearbeiten
        1. Edit Name should not be empty, error message should contain "Name"
            1.1 Warning message below input field
            1.2 Error message after unsuccessful saving
        2. Check for duplicate name
            2.1 Error message after unsuccessful saving
            2.2 Valaue should be double in the Response table, assert response Table
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in response table
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */
    })

    it("Test Case CCI-T13: Entity Suchen", () => {
        onEntitySuchen.entitySuchen()
        /* 
        C. Entity Suchen
        1. Searching for single specific intent works
        2. Searching for some chars multiple intents has in common filters correctly
        3. Searching for some chars no intent has shows empty table
        ** Assert All in Intent TAble **
        */

    })
})