import { onSlotHizufuegen } from "../support/page_objects/01_Trainingsdaten/03_Slots/01_Slot_Hinzufuegen"
import { onSlotBearbeiten } from "../support/page_objects/01_Trainingsdaten/03_Slots/02_Slot_Bearbeiten"

describe("Test Case 6: Slots", () => {
   
    beforeEach('visit url', () => {
        //cy.login('admin', 'cciAdmin#2022+')
        
        cy.wait(500)
        cy.visit('/')
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
        
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it("Slot Hinzufuegen", () => {
        onSlotHizufuegen.slotHinzufuegen()
    })

    it("Slot Bearbeiten", () => {
        onSlotBearbeiten.slotBearbeiten()
    })

    it("Slot Suchen", () => {
        onSlot.slotSuchen()
    })

    it("Slot Loeschen", () => {
        onSlot.slotLoeschen()
    })
})