//import { onSynonym } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/Synonyms"
import { onSynonymAnlegen } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/01_Synonym_Anlegen"
import { onSynonymBearbeiten } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/02_Synonym_Bearbeiten"
import { onSynonymLoeschen } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/03_Synonym_Loeschen"
import { onSynonymSuchen } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/04_Synonym_Suchen"

describe('Test Case 7: Synonyms', () => {

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        
    })

    it.only('CCI-T26: Synonym Anlegen', () => {
        onSynonymAnlegen.synonymAnlegen()

        // A. Synonym Anlegen
        /* 
        1. Name should not be empty, error message should contain "Name"
            1.1 Synonym
                1.1.1 Warning message
                1.1.2 Warning Notification
            1.2 Synonyms Example
                1.1.1 Warning message
                1.1.2 Warning Notification
        2. Check for duplicate name
            2.1 Synonym
            2.2 Example
        3. Check for successfully saved values
            3.1 Assert Success Notification
            3.2 Assert in table
                3.2.1 Assert Synonym name in Synonym talbe
                3.2.2 Assert name in example table
                3.2.3 Assert example number for each synonym in synonym table
        4. Leave site via menu or breadcrump, data must not be saved
        5. Click on "Anlegen" remains on details page
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
            1.2 Synonyms Example Name
                1.1.1 Warning message
                1.1.2 Warning Notification
        2. Check for duplicate name
            2.1 Synonym Name
            2.2 Synonym Example Name
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
                3.2.1 Assert Synonym name in Synonym talbe
                3.2.2 Assert name in example table
        4. Check number of example in Synonym TAble
        4. Leave site via menu or breadcrump, data must be saved
        5. leave site via button "Abbrechen" navigates to table of synonyms and 
           does not save edited data
        */
    })

    it('CCI-T28: Synonym Loeschen', () => {
        onSynonymLoeschen.synonymLoeschen()
    })

    it('CCI-T29: Synonym Suchen', () => {
        onSynonymSuchen.synonymSuchen()
    })

})