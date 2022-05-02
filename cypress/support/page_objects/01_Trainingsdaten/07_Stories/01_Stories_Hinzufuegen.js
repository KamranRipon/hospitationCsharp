import { onActionAnlegen } from "../06_Actions/01_Action_Hinzufuegen"

const ac     = Math.floor(Math.random() * 5000);
const valErr     = Math.floor(Math.random() * 6500);
const addValue = 'StoryAnDummy'
export class sotries_hinzufuegen {

    storyHinzufuegen() {

        // Add an Action for Steps
        onActionAnlegen.actionAnlegen()
        cy.reload()

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerStories"]')
        // Assert URL after clicking Story
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/story/");

        // Clicking Story Hinzufuegen
        cy.createButton('[data-cy="story-create"]')

        // checking url after clicking Story Hinzufuegen
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/story/neu/");
        
        // 1. Name should not be empty, error message should contain "Name"
        //    1.1 Story 
        //        1.1.1 Warning message below the input field
                
        //Assert warning notification
        cy.get('[role="alert"]').eq(0)
            .should('have.text','Der Name muss gesetzt sein')

        
        /* Currently Bug*/

        // // add a space or '/' to input field 
        // const space   = [' ', '/']
        // cy.wrap(space).each((index) => {
        //     cy.get('[data-cy="story-name"]')
        //     //.click({force:true})
        //         .type(index)

        //     //Assert warning notification
        //     cy.get('[role="alert"]')
        //         .should('have.text','Der Name enthält ungültige Zeichen!')

        //     // Remove space or '/'
        //     cy.get('[data-cy="story-name"]')
        //         .click({force:true})
        //         .clear()
        // })

        // Assert further alert messages
        cy.get('[role="alert"]').eq(1)
            .should('have.text', 'Auf ein Intent muss immer eine Action oder Response folgen')
        
        cy.get('[role="alert"]').eq(2)
            .should('have.text', 'Das Feld Intent darf nicht leer sein')
    
        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()
        
        //Assert Error message, indication didn't able to save data
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die','Story')
        
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
                
        // 4. Check for successfully saved values
        // 4.1 Assert Notification
        // Add a story name and assert notification & Assert in story table
        cy.storiesAnlegen(addValue+String(ac))


        //6. Click on "Anlegen" navigates to table of strories
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/story/")
        
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Story'+' "'+addValue+String(ac)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.get('[data-cy="success-remove"]').click()

        // 4. Check for successfully saved values
        // 4.2 Assert in table

        // story-table-search
        cy.get('[data-cy="story-table-search"]')
            .type(addValue+String(ac))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Story Table
        cy.get('tbody').find('tr')
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(ac))
            })

        // clear search field
        cy.get('[data-cy="story-table-search"]').clear()
        
        // 2. Check for duplicate name
        // 2.1 Stories
        //     2.1.1 Error message after unsuccessful saving 
        cy.get('[data-cy="story-create"]').click()
        cy.storiesAnlegen(addValue+String(ac))

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Story konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        cy.get('[data-cy="navDrawerStories"]')
            .click()
            .wait(300)

        // 2. Check for duplicate name
        // 2.2 Valaue should be in the Story table, assert action Table
        cy.get('[data-cy="story-table-search"]')
            .type(addValue+String(ac))
        
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(ac))
        
        cy.get('[data-cy="story-table-search"]').clear()
        
        // 3. Saving on validation error not possible
        // 3.1 Case 1: "no intent is chossen"    --> Assert error message
        
        cy.get('[data-cy="story-create"]').click()
        cy.get('[data-cy="story-name"]')
            .type(addValue+String(valErr))

        cy.get('[data-cy="create-button"]').click()

        // Assert Error Message body
        cy.get('[data-cy="errorMessageBody"]')
            .should('have.text', ' Die Regeln für die Anordnung der Elemente wurden nicht beachtet ')

        cy.get('[data-cy="error-remove"]').click()
        
        // 3. Saving on validation error not possible
        //     3.2 Case 2: multiple intents in a row --> Assert error message
        
        cy.get('[data-cy="story-step-element-autocomplete"]').eq(0)
            .click()
            .get('[role="option"]').last()
            .click({force:true})

        cy.get('[data-cy="story-step-type-select"]').eq(1)
            .click({force:true})

        cy.get('[role="option"]')
            .contains('Action').click()
        
        cy.get('[data-cy="story-step-element-autocomplete"]').eq(1).click()
            .get('[role="option"]').last().click()

        cy.get('[data-cy="story-step-type-select"]').eq(2).click({force:true})
            .get('[role="listbox"]')
            .contains('Intent').click()

        cy.get('[data-cy="story-step-element-autocomplete"]').eq(2).click()
            .get('[role="option"]').last().click()

        //click Anlegen
        cy.get('[data-cy="create-button"]').click()

        // Assert Error Message body
        cy.get('[data-cy="errorMessageBody"]')
            .should('have.text', ' Die Regeln für die Anordnung der Elemente wurden nicht beachtet ')

        cy.get('[data-cy="error-remove"]').click()
        
        // 4. Leave site via menu or breadcrump, data must not be saved
        cy.get('[data-cy="navDrawerStories"]').click()

        cy.get('[data-cy="story-create"]').click()

        cy.get('[data-cy="story-name"]')
            .type('someName')

        cy.get('[data-cy="navDrawerStories"]').click()

        cy.get('[data-cy="story-table-search"]')
            .type('someName')

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')
    }
}
// Exportint class frontEnd to End2End to test
export const onStoryHinzufugen = new sotries_hinzufuegen()