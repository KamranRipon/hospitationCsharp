const t = Math.floor(Math.random() * 30000);
const f = Math.floor(Math.random() * 35000);
const b = Math.floor(Math.random() * 40000);
const l = Math.floor(Math.random() * 45000);
const c = Math.floor(Math.random() * 50000);
const a = Math.floor(Math.random() * 55000);
const tx = Math.floor(Math.random() * 55000);

const addValue = 'DummyValue'
const addValue_2 = 'DummyValue'
const addExample = 'testExample-1'

export class slot_hinzufuegen {

    slotHinzufuegen() {

         /*
        1. Check for notification for invalid Name
            1.1 Name should not be empty
            1.2 name should not contain space or forward Slash (/)
        2. Check for successfully saved or not
            2.1 Notification
                2.1.1 Text
                -- Float
            2.2 check table
        3. Check for duplicate name
            3.1 Existing name cannot save double
        */

        /* Slot Hinzufuegen Testing */
        
        // Entering to Trainingsdaten
        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSlots"]')

        // Assert URL after clicking Slot
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/slot/`);
        
        // Clicking Slot Hinzufuegen
        cy.get('[data-cy="slot-create"]').click()

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/slot/neu/`);

        /* Check Successfully saved */

        //1. Slot Type: TEXT
        //2. Slot Type: Float
        //3. Slot Type: Bool
        //4. Slot Type: List
        //5. Slot Type: Categorical
        //6. Slot Type: Any
        
        // 2.1 Testing saved Notification Message

        const sortTyp   = ['Text', 'Float', 'Bool', 'List', 'Categorical','Any']
        
        cy.wrap(sortTyp).each((index) => {

            if  (index == 'Text') {
                
                cy.log(' -- Text -- ')

                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                cy.get('[class="v-list-item__content"]')
                    .contains('Text')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ') // t for Text
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                cy.errorRemove()

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(t))

                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .type(addValue+String(t))
                
                
                cy.get('[data-cy="slot-text-initialvalue"]')
                    .click({force:true})
                    // Typing Text
                    .type('example Text'+String(t))

                // Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                
                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=true]').last()
                    .click({force:true})
                    .should('be.checked')

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                .contains('Anlegen')
                    .should('be.visible')
                        .click()
                
                // Assert Notification Message
                cy.wait(500)
                // Saved Notification Must appear after successfully saved
                cy.get('[class="row align-center no-gutters"]')
                    .find('[data-cy="successMessageTitle"]')
                    .then((successMsg) => {
                        expect(successMsg).to.have.text(' Der Slot "'+ addValue+String(t) +'" wurde erfolgreich gespeichert ')
                })

                cy.successRemove()
                // Assert Saved value, Case: Text
                cy.get('[data-cy="slot-table-search"]').type('Text')

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})
                
                cy.log('Line 153')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('contain', addValue+String(t))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('contain','initial: „example Text'+String(t)+'“')

                cy.get('[data-cy="slot-table-search"]').clear()
            }

            else if (index == 'Float') {
                cy.log(index)

                cy.get('[data-cy="slot-create"]').click()

                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                cy.get('[class="v-list-item__content"]')
                    .contains('Float')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ') // t for Text
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')

                cy.errorRemove();

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(f))

                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .type(addValue+String(f))

                cy.log('Line 241')
                //Minimum
                cy.get('[placeholder="Default: 0,0"]').clear().type('1')

                cy.get('[role="alert"]')
                    .should('contain','Die vorliegende Formatierung des minimalen Wertes ist nicht zulässig!')

                cy.get('[placeholder="Default: 0,0"]').clear().type('1,0')

                //Maximale
                cy.get('[placeholder="Default: 1,0"]')
                    .clear()
                    .type(2)
    
                cy.get('[class="v-messages__wrapper"]')
                    .should('have.text','Die vorliegende Formatierung des maximalen Wertes ist nicht zulässig!')
                
                cy.get('[placeholder="Default: 1,0"]')
                    .click({force:true})
                    .clear()
                    .wait(500)
                    .type(0)
                    .wait(200)
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Die vorliegende Formatierung des maximalen Wertes ist nicht zulässig!')
                    .get('[placeholder="Default: 1,0"]')
                    .clear()
                    .type("2,0")
                    .wait(200)

                cy.get('[data-cy="slot-float-initialvalue"]')
                    .find('[class="v-input__slot"]')
                    .click({force:true})
                    //.clear({force:true})
                    .type('5,0')
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der initiale Wert eines Slots muss zwischen minimalem und maximalem Wert liegen')
                    .get('[data-cy="slot-float-initialvalue"]')
                    .find('[class="v-input__slot"]')
                    .click({force:true})
                    .clear()
                    .type('1,0')
                
                // Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[class="v-input__slot"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                    
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
                    .should('be.checked')
                    
                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                    
                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=true]').last()
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                .contains('Anlegen')
                    .should('be.visible')
                        .click()
                
                cy.wait(500)
                
                // Assert Notification Message
                // Saved Notification Must appear after successfully saved
                cy.get('[class="row align-center no-gutters"]')
                    .find('[data-cy="successMessageTitle"]')
                    .then((successMsg) => {
                        expect(successMsg).to.have.text(' Der Slot "'+ addValue+String(f) +'" wurde erfolgreich gespeichert ')
                })

                cy.successRemove();

                // Assert Saved value, Case: Text
                cy.get('[data-cy="slot-table-search"]')
                    .type('Float')

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})

                cy.log('Line 359')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('contain', addValue+String(f))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('contain','min: 1,0 max: 2,0  | initial: 1,0')

                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }

            else if (index == 'Bool') {

                cy.log(' -- Bool -- ')

                cy.get('[data-cy="slot-create"]')
                    .click()

                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                cy.get('[class="v-list-item__content"]')
                    .contains('Bool')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ') // t for Text
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                cy.errorRemove();

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(b))

                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .clear()
                    .type('addValue type')

                cy.get('[data-cy="slot-bool-initialvalue"]')
                    .find('[value="false"]')
                    .click({force:true})

                cy.get('[data-cy="slot-bool-initialvalue"]')
                    .find('[value="true"]')
                    .click({force:true})

                cy.wait(500)
                
                //Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-autofill"]')
                .find('[value=false]')
                    .click({force:true})
                
                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=false]')
                    .should('be.checked')
                
                cy.get('[data-cy="slot-autofill"]')
                .find('[value=true]').last()
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                    //.should('be.visible')
                    .click({force:true})
                
                cy.successRemove();
                
                // Assert Saved Sort valud
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]').contains('Alle').click({force:true})
                cy.wait(300)
                // Check saved example saved or Not
                cy.get('tbody')
                    .find('tr')
                        //.contains('Bool')
                        .last()
                    .find('td:nth-child(1)').then(function($text) {
                        cy.log($text.text())
                        //const text = $text.text()
                        cy.wrap($text).should('have.text', addValue+String(b))
                    })

                // Assert Saved value, Case: Text
                cy.get('[data-cy="slot-table-search"]')
                    .type('Bool')

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})
                
                cy.log('Assert Bool')
                cy.log('Line 493')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(b))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text','initial: Wahr')

                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }

            else if (index == 'List') {

                cy.log(' -- List -- ')

                cy.get('[data-cy="slot-create"]')
                    .click()

                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting List
                cy.get('[class="v-list-item__content"]')
                    .contains('List')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ')
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                cy.errorRemove();

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(l))

                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(l))
                
                // cy.get('[class="v-select__slot"]')
                //     .contains('Slot-Typ')
                //     .click({force:true})

                // // 1. Selecting List
                // cy.get('[class="v-list-item__content"]')
                //     .contains('List')
                //     .click({force:true})
                
                cy.get('[data-cy="slot-list-initialvalue"]')
                    .click({force:true})
                    .clear()
                    .type('initialWert'+String(l))

                //Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})

                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .should('be.checked')

                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})

                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .should('be.checked')

                cy.get('[data-cy="slot-autofill"]')
                .find('[value=false]')
                    .click({force:true})
                
                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=false]')
                    .should('be.checked')
                
                cy.get('[data-cy="slot-autofill"]')
                .find('[value=true]').last()
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                    .click({force:true})
                
                cy.wait(500)
                
                // Assert Saved Sort valud
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]').contains('Alle').click({force:true})
                cy.wait(300)
                // Check saved value saved or Not
                cy.get('tbody')
                    .find('tr')
                        .last()
                    .find('td:nth-child(1)').then(function($text) {
                        cy.log($text.text())
                        cy.wrap($text).should('have.text', addValue+String(l))
                    }) 
                
                // Assert Saved value, Case: List
                cy.get('[data-cy="slot-table-search"]')
                    .type('List')

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})

                // Assert Successfully Saved Notification
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})
                
                cy.log('Assert List')
                cy.log('Line 655')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(l))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text','initial: „initialWert'+String(l)+'“')

                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }

            else if (index == 'Categorical') {

                cy.log(' -- Categorical -- ')

                // Slot Hinzufuegen
                cy.get('[data-cy="slot-create"]')
                    .click()

                // Slot-Typ
                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 5. Selecting Categorical
                cy.get('[class="v-list-item__content"]')
                    .contains('Categorical')
                    .click({force:true})

                /* Asserting warning message:
                    1. Field without Name
                    2. Field with invalid Name
                */
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ')
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                cy.errorRemove();

                cy.log('c '+ String(c))
                
                // Let's save with a valid Name

                // Add a Name
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(c)) // "c" stand for Category

                // Add a Short Description
                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(c))
                
                // cy.get('[class="v-select__slot"]')
                //     .contains('Slot-Typ')
                //     .click({force:true})

                // // 1. Selecting Categorical
                // cy.get('[class="v-list-item__content"]')
                //     .contains('Categorical')
                //     .click({force:true})
                
                // Add Categorical
                cy.get('[data-cy="slot-categorical-new"]')
                    .click({force:true})
                    .clear()
                    .type('Category'+String(l))
                    .blur()

                cy.wait(200)

                cy.get('[data-cy="slot-categorical-new"]')
                    .click({force:true})
                    .clear()
                    .type('Category'+String(b))
                    .blur()

                cy.get('[class="v-select__slot"]')
                    .contains('Initiale Kategorie')
                    .click({force:true})
                
                cy.get('[class="v-list-item v-list-item--link theme--light"]')
                    .last()
                    .click({force:true})

                //Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-autofill"]')
                .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                
                cy.get('[data-cy="slot-autofill"]')
                .find('[value=true]').last()
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                    .click({force:true})
                cy.successRemove();
                cy.wait(500)
                
                // Assert Saved Sort valud

                cy.wait(500)

                // Assert Saved value, Case: Categorical
                cy.get('[data-cy="slot-table-search"]')
                    .type('Categorical')

                // Select Entire Sort Table
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]')
                    .contains('Alle')
                    .click({force:true})

                // Check saved value, saved or Not
                // Name
                cy.get('tbody')
                    .find('tr')
                        .last()
                    .find('td:nth-child(1)').then(function($text) {
                        cy.log($text.text())
                        cy.wrap($text).should('have.text', addValue+String(c))
                    })

                //cy.log('Assert Categorical')

                // // Assert Saved value, Case: Categorical
                // cy.get('[data-cy="slot-table-search"]')
                //     .type('Categorical')
                cy.log('Line 790')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(c))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text', 'Category'+String(l)+', Category'+String(b)+' | initial: Category'+String(b)+'')
                
                // Clear Search field
                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }

            else if (index == 'Any') {

                // Start From Here

                cy.log(' -- Any -- ')

                // Slot Hinzufuegen
                cy.get('[data-cy="slot-create"]')
                    .click()

                // Slot-Typ
                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 6. Selecting Any
                cy.get('[class="v-list-item__content"]')
                    .contains('Any')
                    .click({force:true})

                /* Asserting warning message:
                    1. Field without Name
                    2. Field with invalid Name
                */
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ')
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                cy.errorRemove();

                // Add a Name
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(a))

                // Add a Short Description
                cy.get('[data-cy="slot-description"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(a))
                
                // Add Categorical
                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 6. Selecting Any
                cy.get('[class="v-list-item__content"]')
                    .contains('Any')
                    .click({force:true})
                
                cy.get('[data-cy="slot-any-initialvalue"]')
                    .click({force:true})
                    .clear()
                    .type(addValue+String(a))

                //Checking Radio Button
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                    
                cy.get('[data-cy="slot-influence-conversation"]')
                    .find('[value=true]')
                    .click({force:true})
                    .should('be.checked')

                cy.get('[data-cy="slot-autofill"]')
                    .find('[value=false]')
                    .click({force:true})
                    .should('be.checked')
                
                cy.get('[data-cy="slot-autofill"]')
                .find('[value=true]').last()
                    .click({force:true})

                // Click Anlegen
                cy.get('[class="v-btn__content"]')
                    .contains('Anlegen')
                    .click({force:true})
                cy.successRemove();
                
                // Assert Saved Sort valud
                cy.get('[class="v-select__slot"]').click()
                cy.get('[class="v-list-item__content"]').contains('Alle').click({force:true})
                cy.wait(500)
                // Check saved value saved or Not
                cy.get('tbody')
                    .find('tr')
                        .last()
                    .find('td:nth-child(1)').then(function($text) {
                        cy.log($text.text())
                        cy.wrap($text).should('have.text', addValue+String(a))
                    })

                // Assert Saved value, Case: List
                cy.get('[data-cy="slot-table-search"]')
                    .type('Any')
                
                cy.log('Assert Any')
                cy.log('Line 924')
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)').last()
                    .should('have.text', addValue+String(a))
                    .get('tbody')
                    .find('tr')
                    .find('td:nth-child(4)').last()
                    .should('have.text', 'initial: '+'„'+addValue+String(a)+'“')
                    
                cy.get('[data-cy="slot-table-search"]')
                    .clear()
            }
        })
        
        // 2.2 Testing saved value in Slot Table
        // Selecting Whole Table
        cy.get('[class="v-select__slot"]')
            .click()
            .wait(500)
        cy.get('[class="v-list-item__content"]')
            .contains('Alle').click({force:true})

        cy.get('[data-cy="slot-table-search"]')
            .type('Any')

        cy.log('Any')

        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                //const text = $text.text()
                cy.wrap($text).should('have.text', addValue+String(a))
            }) 

        // Leave Site with menu or Breadcrump without Anlage which doesn't save value
        // Clicking Slot Hinzufuegen
        cy.get('[data-cy="slot-create"]')
            //.should('be.visible')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue+String(l))

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue+String(l))
        
        // Slot-Typ
        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})

        // 1. Selecting Text
        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click({force:true})

        // Leave Site by Clicking Slot  
        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()

        // Check Value saved or Not
        // Select Whole Table
        cy.get('[class="v-select__slot"]')
            .click()
            .wait(500)
        cy.get('[class="v-list-item__content"]')
            .contains('Alle')
                .click()

        cy.get('[data-cy="slot-table-search"]')
            .type('Text')

        cy.log('Line 1003')

        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                cy.wrap($text).should('not.have.text', addValue+String(l))
            })
        
        // /* Chicking for Invalid Name Notification
        // 1.1 Name should not be empty Notification
        // */
        // // Slot hinzufugen
        // //cy.wait(500)
        // cy.get('[data-cy="slot-create"]')
        //     .click()

        // // Checking for a valid Name Notifications
        // cy.get('[class="v-input pb-6 v-input--has-state theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined error--text"]')
        //     .find('[class="v-text-field__details"]')
        //     .contains('Der Name muss gesetzt sein')
        //     .should('be.visible')
        
        // cy.get('[class="v-text-field__slot"]')
        //     .contains('Name')
        //         .click({force:true})
        
        // cy.get('[class="v-text-field__details"]')
        //     .contains('Der Name muss gesetzt sein')
        //     .should('be.visible')
        
        /* 1.2 name should not contain space or forward Slash (/)
        Checking for space or "/" within a Name
        */

        // cy.get('[class="v-label v-label--active theme--light error--text"]')
        // .should('be.visible')
        //     .type(' ')

        // cy.get('[class="v-text-field__details"]')
        //     .contains('Der Name enthält ungültige Zeichen!')
        //     .should('be.visible')
        
        /* 
        Checking for Duplicate Name: Name cannot be known in Intent
        3.1 Existing name cannot save double
        */
        
        cy.get('[class="v-text-field__slot"]')
            .clear()

        // Slot hinzufugen

        cy.get('[data-cy="slot-create"]')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue+String(l))

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue)

        cy.get('[class="v-select__slot"]')
            .contains('Slot-Typ')
            .click({force:true})
        
        cy.get('[class="v-list-item__content"]')
            .contains('Text')
            .click({force:true})
        
        cy.get('[class="v-text-field__slot"]')
            .contains('Initialer Wert')
            .click({force:true})
            .type('example Text')

        cy.get('[class="v-btn__content"]')
        .contains('Anlegen')
            .should('be.visible')
                .click()

        cy.get('[class="alert error white--text"]')
            .find('[data-cy="errorMessageTitle"]')
                //Der Slot konnte nicht gespeichert werden. 
                .then((errorMsg) => {
                    expect(errorMsg).to.have.text(' Der Slot konnte nicht gespeichert werden. ')
                })

        cy.errorRemove();

        cy.get('[data-cy="navDrawerSlots"]')
            .contains('Slots')
                .click()
        
        //add Names for test search field
        var textList = ["test15","test1", "weather"]
        cy.wrap(textList).each((index) => {

            cy.get('[data-cy="slot-create"]')
                .click()

            cy.get('[data-cy="slot-name"]')
                .click({force:true})
                .type(index+String(t*l))
                
                cy.get('[class="v-select__slot"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                cy.get('[class="v-list-item__content"]')
                    .contains('Text')
                    .click({force:true})
                
                cy.get('[data-cy="slot-text-initialvalue"]')
                    .click({force:true})
                    // Typing Text
                    .type('example Text')
                    
            cy.get('[class="v-btn__content"]')
                .contains('Anlegen')
                        .click();
            cy.successRemove();
        })
    }
}
// Export class
export const onSlotHizufuegen = new slot_hinzufuegen()