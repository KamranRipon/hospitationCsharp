import { onSynonym } from "../support/page_objects/01_Trainingsdaten/04_Synonyms/Synonyms"

describe.skip('Test Case 7: Synonyms', () => {

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        
    })

    it('Test Case: Synonym Anlegen', () => {
        onSynonym.synonymAnlegen()
    })

    it('Test Case: Synonym Bearbeiten', () => {
        onSynonym.synonymBearbeiten()
    })

    it('Test Case: Synonym Loeschen', () => {
        onSynonym.synonymLoeschen()
    })

    it('Test Case: Synonym Suchen', () => {
        onSynonym.synonymSuchen()
    })

})