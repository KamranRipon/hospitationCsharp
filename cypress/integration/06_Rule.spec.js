import { onRules } from "../support/page_objects/01_Trainingsdaten/10_Rules/Rules"

describe ('Test Case 8: Rules', () => {

    beforeEach('visit url', () => {

        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        
    })

    it.only('Test Case: Rules Anlegen', () => {
        onRules.rulesAnlegen()
    })

    it('Test Case: Rules Bearbeiten', () => {
        onRules.rulesBearbeiten()
    })

    it('Test Case: Rules Suchen', () => {
        onRules.rulesSuchen()
    })

    it('Test Case: Rules Loeschen', () => {
        onRules.rulesLoeschen()
    })
})