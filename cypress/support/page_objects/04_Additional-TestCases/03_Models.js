import { onIntentHinzufuegen } from "../01_Trainingsdaten/01_Intents/01_Intents_Hinzufuegen"
import 'cypress-wait-until';

const modelNr = Math.floor(Math.random() * 65500);

export class model {

    train_model() {

        cy.log('Model Training')
        //cy.visit('/')
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        
        cy.visit(`${Cypress.config().baseUrl}/training/model/`)

        // Train a Model
        cy.get('[role="button"]')
            .contains('Training')
            .click()

        
        cy.get('[data-cy="model-create"]').click()
        //cy.get('[data-cy="model-name"]').type('Model'+String(modelNr))
        //cy.get('[data-cy="create-button"]').click()

        cy.visit(`${Cypress.config().baseUrl}/training/model/`)
        cy.wait(2000)

        var idNr
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($indexNr){
                idNr = $indexNr.text()
                cy.log(idNr)
                cy.visit(`${Cypress.config().baseUrl}/training/model/`+String(idNr)+`/`)
            })

        //cy.intercept('GET', '/cci-backend/model/3', [{}]).as('getModel')

        cy.waitUntil(() => 
            cy.get('[id="statusText"]').then($ele =>
                $ele[0].value !== 'Erfolgreich'),

                {
                    errorMsg: "was expeting some other Value  " ,
                    timeout: 350000,
                    interval: 500
                }

            ).then(() => {

                cy.log("Foudn a difference in values")

            })

        cy.get('[id="statusText"]').should('have.text', 'Erfolgreich')
    }
}
// Export class einfacher_login
export const onModel = new model()