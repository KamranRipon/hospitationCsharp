import { onPpAnlegen } from "../support/page_objects/02_Konfiguration/01_Pipeline_&_Policies.js"

describe('Test Case 8: Konfigurations', () => {

    beforeEach('visit url', () => {
        
        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it('Test Case: Pipeline & Policies Anlegen', () => {
        onPpAnlegen.ppAnlegen()
    })
})