import { onEntityHinzufuegen } from "../02_Entities/01_Entity_Hinzufuegen"

const exm = Math.floor(Math.random() * 25000)
const annot = Math.floor(Math.random() * 35000)
const addExample = 'testExample'

export class intent_example_hinzufuegen {
    
    intentExampleHinzufuegen() {

        // add some entity
        onEntityHinzufuegen.entityHinzufuegen()
        cy.reload()

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerIntents"]')

        // Assert URL after clicking Story
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);

        // 1.1 Example Name must not be empty
        
        // Entering to first row of the Intent Table
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        // Save Intent Name for letar assertion
        var inExName
        cy.get('[data-cy="intent-name"]')
            .invoke('val').as('name')
                    
        cy.get('@name').then((name) => {
            inExName = name
        })

        // Entering to Example Tab
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()
        
        // Clicking Example Hizufuegen Button
        cy.get('[data-cy="create-intent-example"]')
            .click()
            .wait(200)

        // Assert initial warning Message 
        cy.get('[role="alert"]').eq(0)
            .should('have.text','Der Text muss gesetzt sein')

        // Anlegen  & weiteres Example 
        cy.get('[data-cy="example-text"]')
            .type(addExample+String(exm))
        
        cy.get('[data-cy="create-button"]').eq(1)
            .click()

        // success remove
        cy.successRemove()
        
        // Add an example 
        cy.get('[data-cy="example-text"]')
            .type(addExample+String(exm))
        
        cy.get('[data-cy="create-button"]').eq(0)
            .click()
            .wait(400)

        // select entire table
        cy.selectEntireTbl()

        // Assert Successfully Saved Notification
        var idNr
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($tbIdNr) {
                idNr = $tbIdNr.text()

                // Assert Success Message
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Das Example'+String(idNr)+'wurde erfolgreich gespeichert ')
            })

        // Assert in Intent-Example Table
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(2)').then(function($text) {
                //const text = $text.text()
                cy.wrap($text).should('contain', addExample+String(exm))
            }) 

        // 1.2 Leave site via menu or breadcrump is possible
        // doesn't save given data
        cy.get('[data-cy="create-intent-example"]')
                .click()

        // Add an example 
        cy.get('[data-cy="example-text"]')
            .type('breadcrump')

        cy.get('[class="v-breadcrumbs theme--light"]')
            .contains(' Examples ')
            .click({force:true})

        // select entire table
        cy.selectEntireTbl()
        
        // Assert value in example table
        cy.get('tbody')
            .find('td:nth-child(2)')
            .should('not.have.text', 'breadcrump')

        // 2. Annotate text in editor works

        // 2.1 single annotation

        //Arrange
        cy.get('[data-cy="create-intent-example"]').click()
        cy.get('[data-cy="example-text"]').type('singleAnnot'+String(annot))
        cy.get('[data-cy="example-text"]').type('{selectAll}')
        cy.get('[role="combobox"]').click()
        cy.get('[role="option"]').last().click()
        cy.get('[data-cy="example-add-entity"]').click()
        cy.get('[data-cy="create-button"]').eq(0).click()

        //Act
        cy.get('[data-cy=example-table-search]').type('singleAnnot'+String(annot))

        //Assert
        cy.wait(300)
        cy.get('tbody')
            .find('tr').last()
            .find('td:nth-child(3)')
            .should('not.be.empty')
        
        cy.get('[data-cy=example-table-search]').clear()

        // Select entire table
        cy.selectEntireTbl()

        // 1.3 Saving saves given data correctly
        cy.wait(200)
        cy.get('tbody')
            .find('tr')
            .then((exTbSize) => {
                const tbSize = exTbSize.length

                // return to Intent table
                cy.get('[data-cy=navDrawerIntents]')
                    .click()

                cy.get('[data-cy="intent-table-search"]')
                    .type(inExName)
                    .wait(500)

                cy.get('tbody')
                    .find('tr')
                    .first()
                    .find('td:nth-child(3)')
                    .should('have.text', ' '+String(tbSize)+' ')
            })
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentExampleHinzufuegen = new intent_example_hinzufuegen()