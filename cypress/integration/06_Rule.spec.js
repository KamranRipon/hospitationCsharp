//import { onRules } from "../support/page_objects/01_Trainingsdaten/10_Rules/Rules"

import { onRulesAnlegen } from "../support/page_objects/01_Trainingsdaten/10_Rules/01_Rules_Anlegen"
import { onRulesBearbeiten } from "../support/page_objects/01_Trainingsdaten/10_Rules/02_Rules_Bearbeiten"
// import { onIntentSuchen } from "../support/page_objects/01_Trainingsdaten/01_Intents/03_Intent_Suchen"
// import { onIntentExampleHinzufuegen } from "../support/page_objects/01_Trainingsdaten/01_Intents/04_Intent_Example_Hinzufuegen"
// import { onIntentExampleBearbeiten } from "../support/page_objects/01_Trainingsdaten/01_Intents/05_Intent_Example_Bearbeiten"
// import { onIntentExampleSuchen } from "../support/page_objects/01_Trainingsdaten/01_Intents/06_Intent_Example_Suchen"
// import { onIntentExampleLoeschen } from "../support/page_objects/01_Trainingsdaten/01_Intents/07_Intent_Example_Loeschen"


describe.skip('Test Case 8: Rules', () => {

    beforeEach('visit url', () => {
        
        cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
    })

    it('Test Case: Rules Anlegen', () => {
        onRulesAnlegen.rulesAnlegen()
    })

    it.only('Test Case: Rules Bearbeiten', () => {
        onRulesBearbeiten.rulesBearbeiten()
    })

    it('Test Case: Rules Suchen', () => {
        onRules.rulesSuchen()
    })

    it('Test Case: Rules Loeschen', () => {
        onRules.rulesLoeschen()
    })
})