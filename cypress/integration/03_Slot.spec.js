import { onSlot } from "../support/page_objects/01_Trainingsdaten/03_Slots/Slot"

describe.skip("Test Case 6: Slot", () => {
   
    beforeEach('visit url', () => {
        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.wait(500)
        cy.visit('/')
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it("Slot Hinzufuegen", () => {
        onSlot.slotHinzufuegen()
    })

    it("Slot Bearbeiten", () => {
        onSlot.slotBearbeiten()
    })

    it("Slot Suchen", () => {
        onSlot.slotSuchen()
    })

    it("Slot Loeschen", () => {
        onSlot.slotLoeschen()
    })
})