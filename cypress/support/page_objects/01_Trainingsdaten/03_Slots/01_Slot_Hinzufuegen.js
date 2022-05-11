const t = Math.floor(Math.random() * 700000);
const f = Math.floor(Math.random() * 357000);
const b = Math.floor(Math.random() * 456000);
const l = Math.floor(Math.random() * 456000);
const c = Math.floor(Math.random() * 550000);
const a = Math.floor(Math.random() * 655000);
const le = Math.floor(Math.random() * 955000);

const addValue = 'DummyValue'

export class slot_hinzufuegen {

    slotHinzufuegen() {
        
        // Entering to Trainingsdaten > Slots
        cy.Trainingsdaten('Trainingsdaten', '[data-cy="navDrawerSlots"]')

        // Assert URL after clicking Slot
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/slot/`);
        
        // Slot Hinzufuegen
        cy.get('[data-cy="slot-create"]').click()

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
                
                //cy.get('[class="v-select__slot"]')
                cy.get('[role="button"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                //cy.get('[class="v-list-item__conten"]')
                cy.get('[role="option"]')
                    .contains('Text')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[role="alert"]')
                    .should('contain','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ') // t for Text
                    .get('[role="alert"]')
                    .should('contain', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[data-cy="create-button"]')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                cy.errorRemove()

                cy.get('[data-cy="slot-name"]')
                    //.click({force:true})
                    .clear()
                    .type(addValue+String(t))

                cy.get('[data-cy="slot-description"]')
                    //.click({force:true})
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

                cy.get('[data-cy="create-button"]')
                    .click()
                
                // Assert success Notification Message
                cy.wait(500)
                // Saved Notification Must appear after successfully saved
                //cy.get('[class="row align-center no-gutter"]')
                cy.get('[data-cy="successMessageTitle"]')
                    .then((successMsg) => {
                        expect(successMsg).to.have.text(' Der Slot "'+ addValue+String(t) +'" wurde erfolgreich gespeichert ')
                })

                cy.successRemove()
                // Assert Saved value, Case: Text
                //cy.get('[data-cy="slot-table-search"]').type('Text')
                cy.get('[data-cy="slot-table-search"]').type(addValue+String(t))

                cy.selectEntireTbl()
                
                cy.log('Line 144')
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

                cy.get('[data-cy="slot-create"]').click()

                cy.get('[role="button"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                //cy.get('[class="v-list-item__content"]')
                cy.get('[role="option"]')
                    .contains('Float')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[role="alert"]')
                    .should('contain','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ') // t for Text
                    .get('[role="alert"]')
                    .should('contain', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[data-cy="create-button"]')
                    .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')

                cy.errorRemove();

                cy.get('[data-cy="slot-name"]')
                    //.click({force:true})
                    .clear()
                    .type(addValue+String(f))

                cy.get('[data-cy="slot-description"]')
                    //.click({force:true})
                    .type(addValue+String(f))

                cy.log('Line 205')
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
                    //.wait(500)
                    .type(0)
                    .wait(200)
                    .get('[class="v-messages__wrapper"]')
                    .should('have.text', 'Die vorliegende Formatierung des maximalen Wertes ist nicht zulässig!')
                    .get('[placeholder="Default: 1,0"]')
                    .clear()
                    .type("2,0")
                    //.wait(200)

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

                cy.get('[data-cy="create-button"]')
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
                    //.type('Float')
                    .type(addValue+String(f))

                cy.selectEntireTbl()

                cy.log('Line 300')
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

                // Test Minimum value Greater than maximum 

            }

            else if (index == 'Bool') {

                cy.log(' -- Bool -- ')

                cy.get('[data-cy="slot-create"]')
                    .click()

                cy.get('[role="button"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting Text
                cy.get('[role="option"]')
                    .contains('Bool')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[role="alert"]')
                    .should('contain','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ') // t for Text
                    .get('[role="alert"]')
                    .should('contain', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[data-cy="create-button"]')
                    //.contains('Anlegen')
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
                cy.get('[data-cy="create-button"]')
                    //.contains('Anlegen')
                    //.should('be.visible')
                    .click({force:true})
                
                cy.successRemove();

                // Assert Saved value, Case: Text
                cy.get('[data-cy="slot-table-search"]')
                    .type(addValue+String(b))

                cy.selectEntireTbl()
                
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

                cy.get('[role="button"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 1. Selecting List
                cy.get('[role="option"]')
                    .contains('List')
                    .click({force:true})

                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[role="alert"]')
                    .should('contain','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ')
                    .get('[role="alert"]')
                    .should('contain', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[data-cy="create-button"]')
                    //.contains('Anlegen')
                        .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                cy.errorRemove();

                cy.get('[data-cy="slot-name"]')
                    //.click({force:true})
                    .clear()
                    .type(addValue+String(l))

                cy.get('[data-cy="slot-description"]')
                    //.click({force:true})
                    .clear()
                    .type(addValue+String(l))
                
                
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
                cy.get('[data-cy="create-button"]')
                    //.contains('Anlegen')
                    .click({force:true})
                
                cy.wait(500)
                
                // Assert Saved value, Case: List
                cy.get('[data-cy="slot-table-search"]')
                    .type(addValue+String(l))

                cy.selectEntireTbl()
                
                cy.log('Assert List')
                cy.log('Line 574')
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
                cy.get('[role="button"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 5. Selecting Categorical
                cy.get('[role="option"]')
                    .contains('Categorical')
                    .click({force:true})

                /* Asserting warning message:
                    1. Field without Name
                    2. Field with invalid Name
                */
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[role="alert"]')
                    .should('contain','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ')
                    .get('[role="alert"]')
                    .should('contain', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[data-cy="create-button"]')
                    //.contains('Anlegen')
                    .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                cy.errorRemove();

                // Add a Name
                cy.get('[data-cy="slot-name"]')
                    //.click({force:true})
                    .clear()
                    .type(addValue+String(c)) // "c" stand for Category

                // Add a Short Description
                cy.get('[data-cy="slot-description"]')
                    //.click({force:true})
                    .clear()
                    .type(addValue+String(c))
                
                // Add Categorical
                cy.get('[data-cy="slot-categorical-new"]')
                    .first()
                    .click({force:true})
                    .clear()
                    .type('Category'+String(l))
                    .blur()

                cy.wait(200)

                cy.get('[data-cy="slot-categorical-new"]')
                    .last()
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
                cy.get('[data-cy="create-button"]')
                    //.contains('Anlegen')
                    .click({force:true})
                cy.successRemove();
                //cy.wait(500)
                
                // Assert Saved Sort valud

                cy.wait(500)

                // Assert Saved value, Case: Categorical
                cy.get('[data-cy="slot-table-search"]')
                    .type(addValue+String(c))

                // Select Entire Sort Table
                cy.selectEntireTbl()

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
                cy.log('Line 731')
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
                cy.get('[role="button"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 6. Selecting Any
                cy.get('[role="option"]')
                    .contains('Any')
                    .click({force:true})

                /* Asserting warning message:
                    1. Field without Name
                    2. Field with invalid Name
                */
                cy.get('[data-cy="slot-name"]')
                    .click({force:true})
                    .get('[role="alert"]')
                    .should('contain','Der Name muss gesetzt sein')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})
                    .type(' ')
                    .get('[role="alert"]')
                    .should('contain', 'Der Name enthält ungültige Zeichen!')
                    .get('[data-cy="slot-name"]')
                    .click({force:true})

                // Click Anlegen
                cy.get('[data-cy="create-button"]')
                    //.contains('Anlegen')
                    .click()

                // Assert Error Message
                cy.get('[data-cy="errorMessageTitle"]')
                    .should('have.text', ' Der Slot konnte nicht gespeichert werden. ')
                cy.errorRemove();

                // Add a Name
                cy.get('[data-cy="slot-name"]')
                    //.click({force:true})
                    .clear()
                    .type(addValue+String(a))

                // Add a Short Description
                cy.get('[data-cy="slot-description"]')
                    //.click({force:true})
                    .clear()
                    .type(addValue+String(a))
                
                // Add Categorical
                cy.get('[role="button"]')
                    .contains('Slot-Typ')
                    .click({force:true})

                // 6. Selecting Any
                cy.get('[role="option"]')
                    .contains('Any')
                    .click({force:true})
                
                cy.get('[data-cy="slot-any-initialvalue"]')
                    //.click({force:true})
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
                cy.get('[data-cy="create-button"]')
                    //.contains('Anlegen')
                    .click({force:true})
                cy.successRemove();

                // Assert Saved value, Case: List
                cy.get('[data-cy="slot-table-search"]')
                    .type(addValue+String(a))

                cy.log('Line 863')
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
        
        // Leave Site with menu or Breadcrump without Anlage which doesn't save value
        // Clicking Slot Hinzufuegen
        cy.get('[data-cy="slot-create"]')
            //.should('be.visible')
            .click()

        cy.get('[class="v-text-field__slot"]')
            .contains('Name')
            .click({force:true})
            .type(addValue+String(le))

        cy.get('[class="v-text-field__slot"]')
            .contains('Beschreibung')
            .click({force:true})
            .type(addValue+String(le))
        
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

        cy.selectEntireTbl()

        cy.get('[data-cy="slot-table-search"]')
            .type(addValue+String(le))

        cy.log('Line 921')

        // Check saved example saved or Not
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(1)').then(function($text) {
                cy.log($text.text())
                cy.wrap($text).should('not.have.text', addValue+String(le))
            })
        
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