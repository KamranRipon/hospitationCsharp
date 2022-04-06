import { onSynonymAnlegen } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/01_Synonym_Anlegen"
import { onSynonymBearbeiten } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/02_Synonym_Bearbeiten"
import { onSynonymLoeschen } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/03_Synonym_Loeschen"
import { onSynonymSuchen } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/04_Synonym_Suchen"
import { onSynonymExmAnlegen } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/05_Synonyms_Example_Anlegen"
import { onSynonymExmBearbeiten } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/06_Synonyms_Example_Bearbeiten"

describe('CCI-C5: Synonyms', () => {

    beforeEach('visit url', () => {
        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it('CCI-T26: Synonym Anlegen', () => {
        onSynonymAnlegen.synonymAnlegen()

        // A. Synonym Anlegen
        /*
        1. Name should not be empty, error message should contain "Name"
            1.1 Warning message
            1.2 Error Notification after unsuccessful save
        2. Check for duplicate name
            2.1 Error message after unsuccessful saving 
            2.2 Table should not contain double value
        3. Check for successfully saved values
            3.1 Assert Success Notification
            3.2 Assert in table
        4. Leave site via menu or breadcrump, data must not be saved
            4.1 Assert in Table
        5. Click on "Anlegen" remains on details page
            5.1 Assert url
        */
    })

    it('CCI-T27: Synonym Bearbeiten', () => {
        onSynonymBearbeiten.synonymBearbeiten()

        // B. Synonym Bearbeiten
        /*
        1. Edit Name should not be empty, error message should contain "Name"
            1.1 Synonym Name
                1.1.1 Warning message
                1.1.2 Warning Notification
        2. Check for duplicate name
            2.1 Assert Notification
            2.2 Assert in table
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */
    })

    it('CCI-T28: Synonym Loeschen', () => {
        onSynonymLoeschen.synonymLoeschen()

        /*
        C. Synonym Loeschen
        1. Synonym Name can be remove form Synonym Table
            1.1 Assert notification
            1.2 Assert in Synonym Table
        */
    })

    it('CCI-T29: Synonym Suchen', () => {
        onSynonymSuchen.synonymSuchen()

        /* 
        D. Synonym Suchen
        1. Searching for single specific Synonym works
        2. Searching for some chars multiple Synonym has in common filters correctly
        3. Searching for some chars no Synonym has shows empty table
        ** Assert All in Synonym Table**
        */
    })

    it('CCI-T30: Synonym Example Anlegen', () => {
        onSynonymExmAnlegen.synonymExmAnlegen()

        // E. Synonym Example Anlegen
        /* 
        1. Name should not be empty, error message should contain "Name"
            1.1 Warning message
            1.2 Error Notification after unsuccessful save
        2. Check for duplicate name
            2.1 Error message after unsuccessful saving 
            2.2 Table should not contain double value
        3. Check for successfully saved values
            3.1 Assert Success Notification
            3.2 Assert in table
            3.3 Assert example number for each synonym in synonym table
        4. Saving with button "Anlegen" saves example and 
           navigates to table of synonym examples
        5. Leave site via menu or breadcrump, data must not save
        6. new example text is visible in table of synonyms 
        */
    })

    it('CCI-T30: Synonym Example Anlegen', () => {
        onSynonymExmBearbeiten.synonymExmBearbeiten()

        // E. Synonym Example Bearbeiten
        /* 
        1. Edited Name should not be empty, error message should contain "Name"
            1.1 Warning message
            1.2 Error Notification after unsuccessful save
        2. Check for duplicate name
            2.1 Error message after unsuccessful saving 
            2.2 Table should not contain double value
        3. Check for successfully saved values
            3.1 Assert Success Notification
            3.2 Assert in table
            3.3 Assert example number for each synonym in synonym table
        4. Saving with button "Anlegen" saves example and 
           navigates to table of synonym examples
        5. Leave site via menu or breadcrump, data must not save
        6. new example text is visible in table of synonyms 
        */
    })

    it.only('CCI-T33: Synonym Example Loeschen', () => {
        onSynonymExmLoeschen.synonymExmLoeschen()
        /*
        F. Synonym Example Loeschen
        1. Synonym Example Name can be remove form Synonym Table
            1.1 Assert notification
            1.2 Assert in Synonym Example Table
        */
    })

})