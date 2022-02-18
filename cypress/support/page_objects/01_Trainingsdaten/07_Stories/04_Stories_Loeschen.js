export class stories_loeschen {

    storiesLoeschen() {

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('[data-cy="navDrawerStories"]')

        // Entering to first of
        cy.wait(300)

        // Selecting Entire Table
        cy.selectEntireTbl()
                
        // Get the size of story Table ( Nr. of Row)
        var nrRow, newNrRow                
        cy.log('Line 18')
        cy.get('tbody')
            .find('tr')
            .then(function($tRowLength) {
                nrRow = $tRowLength.length
                cy.log(nrRow)
            })
        // delete a row 
        cy.get('tbody')
            .find('tr')
            .last()
            .find('[data-cy="element-delete-button"]')
            .click({force:true})
        
        // Confirm delete
        cy.confirmDelete()
        
        // Assert Table length
        cy.get('tbody')
            .find('tr')
            .then(function($NewtRowLength) {
                //const NewnrRow = $NewtRowLength.length - 1
                cy.log(nrRow)
                newNrRow = nrRow -1 
                cy.wrap($NewtRowLength).should('have.length', newNrRow)
            })
    }
}
// Exportint class frontEnd to End2End to test
export const onStoriesLoeschen = new stories_loeschen()