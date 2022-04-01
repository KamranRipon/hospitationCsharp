export class pipeline_policies {

    ppAnlegen() {

        /* Rules Anlegen Testing */

        cy.Trainingsdaten('Konfiguration', '[class="v-list-item__title pl-2"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", `${Cypress.config().baseUrl}/konfiguration/pipeline/`);

        // margin & editor
        cy.get("#editorContainer")
            .get('[role="presentation"]')
            .should('be.visible')
    }
}
// Export class
export const onPpAnlegen = new pipeline_policies()