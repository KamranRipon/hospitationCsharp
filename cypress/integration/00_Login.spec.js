import { onEinfacherLogin } from "../support/page_objects/04_Additional-TestCases/01_Login"

describe("Test Case: Einfacher Login", () => {
   
    beforeEach('visit url', () => {
        
        cy.visit('/')
        
        cy.loginiFunction('admin', 'cciAdmin#2022+')
        cy.wait(500)
        //Cypress.Cookies.preserveOnce('session_id', 'remember_token')
    })

    it("CCI-T11: Einfacher Login", () => {
        onEinfacherLogin.testLogin()
        /* 
        1. Log in to the app
        2. go to trainingsdaten/intent
        3. assert the link
        */
    })
})