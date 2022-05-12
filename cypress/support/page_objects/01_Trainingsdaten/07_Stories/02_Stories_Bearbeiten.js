const ac     = Math.floor(Math.random() * 5000);
const valErr     = Math.floor(Math.random() * 6500);
const sbar     = Math.floor(Math.random() * 6500);
const addValue = 'SryAnDummy'

export class sotries_bearbeiten {

    storyBearbeiten() {
        
        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerStories"]')
        
        // Assert URL after clicking Story
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/story/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/story/");

        // Clicking Story Hinzufuegen
        cy.createButton('[data-cy="story-create"]')

        // checking url after clicking Story Hinzufuegen
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/story/neu/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/story/neu/");

        // At first Add a Story-name
        cy.storiesAnlegen(addValue+String(ac))
        //cy.wait(500)
        // remove success notification
        cy.successRemove()

        //6. Click on "Anlegen" navigates to table of strories
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/story/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/story/")
        
        // 1. Name should not be empty, error message should contain "Name"
        //    1.1 Story 
        //        1.1.1 Warning message below the input field
        // 3. Saving on validation error not possible

        // Entering to first of
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear action name
        cy.get('[data-cy="story-name"]').clear()
    
        // Click Anlegen
        cy.get('[data-cy="save-button"]').click()
        
        //Assert Error message, indication didn't able to save data
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die','Story')
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // add a story-name
        cy.get('[data-cy="story-name"]')
            .type(addValue+String(sbar))
        
        // remove a validation step
        cy.get('[data-cy="story-remove-step"]').click()

        // Click Anlegen
        cy.get('[data-cy="save-button"]').click()
        
        // Assert Error message, indication didn't able to save data
        cy.errorMessageBody('[data-cy="errorMessageBody"]')
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        // add a validation step
        cy.get('[data-cy="story-step-type-select"]').eq(1)
            .click({force:true})
            .get('[role="option"]')
            .contains('Action')
            .click()
        // select valud for validation step
        cy.get('[data-cy="story-step-element-autocomplete"]').eq(1)
            .click()
            .get('[role="option"]').last()
            .click()

        // save edited story name
        cy.get('[data-cy="save-button"]').click()
            .wait(300)

        // 4. Check for successfully saved values
        // 4.1 Assert Notification

        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Story'+' "'+addValue+String(sbar)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.successRemove()
        //cy.get('[data-cy="success-remove"]').click()  

        // 4.2 Assert in table
        // story-table-search
        cy.get('[data-cy="story-table-search"]')
            .type(addValue+String(sbar))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Story Table
        cy.get('tbody').find('tr')
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(sbar))
            })

        // clear search field
        cy.get('[data-cy="story-table-search"]').clear()
        
        // 2. Check for duplicate name
        // 2.1 Stories
        //     2.1.1 Error message after unsuccessful saving
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear action name
        cy.get('[data-cy="story-name"]')
            .clear()
             .type(addValue+String(ac))

        // click speichern
        cy.get('[data-cy="save-button"]').click()

        // Assert Error Notification
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Story konnte nicht gespeichert werden. ')
        
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        cy.get('[data-cy="abort-button"]').click()
            //.wait(300)

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

        // 5. Leave site via menu or breadcrump, data must be saved
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear action name
        cy.get('[data-cy="story-name"]')
            .clear()
            .type(addValue+String(valErr))

        cy.get('[data-cy="navDrawerStories"]').click()

        // cy.get('[data-cy="story-create"]')
        //     .click()

        // cy.get('[data-cy="story-name"]')
        //     .type('someName')

        // cy.get('[data-cy="navDrawerStories"]')
        //     .click()

        cy.get('[data-cy="story-table-search"]')
            .type(addValue+String(valErr))

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(valErr))

        // clear search field
        cy.get('[data-cy="story-table-search"]').clear()
        
        // 6. Leave site via Abbrechen button, data must not be saved
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear action name
        cy.get('[data-cy="story-name"]')
            .clear()
            .type('someName')

        // click Abort Button
        cy.get('[data-cy="abort-button"]').click()
        
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
export const onStoryBearbeiten = new sotries_bearbeiten()