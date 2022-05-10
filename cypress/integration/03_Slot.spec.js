import { onSlotHizufuegen } from "../support/page_objects/01_Trainingsdaten/03_Slots/01_Slot_Hinzufuegen"
import { onSlotBearbeiten } from "../support/page_objects/01_Trainingsdaten/03_Slots/02_Slot_Bearbeiten"
import { onSlotSuchen } from '../support/page_objects/01_Trainingsdaten/03_Slots/03_Slot_Suchen';
import { onSlotLoeschen } from '../support/page_objects/01_Trainingsdaten/03_Slots/04_Slot_Loeschen';

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
        /*
        1. Check for error message for invalid Name
            1.1 Name should not be empty
            1.2 name should not contain space or Slash (/)
        2. Check for successfully saved or not
            2.1 success Notification
            2.2 check saved data on table
        3. Check for duplicate name
        4. Leave site via menu or breadcrump, data must not be saved
        5. click on "Anlegen" navigates to table of slots
        */
    })

    it("Slot Bearbeiten", () => {
        onSlotBearbeiten.slotBearbeiten()
    })

    it("Slot Suchen", () => {
        onSlotSuchen.slotSuchen()
    })

    it("Slot Loeschen", () => {
        onSlotLoeschen.slotLoeschen()
    })
})