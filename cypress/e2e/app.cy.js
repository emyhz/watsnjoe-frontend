describe('App - Home Page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/App')
    })

    //Layout
    describe('Layout', () => {
        it('shows the WatsNJoe logo', () => {
            cy.get('img[alt="WatsNJoe"]').should('be.visible')
        })

        it('shows the Hallo! banner in Dutch by default', () => {
            cy.contains('Hallo!').should('be.visible')
        })

        it('shows all 4 navigation buttons', () => {
            cy.contains('Bezoeken').should('be.visible')
            cy.contains('Plattegrond').should('be.visible')
            cy.contains('Openingstijden').should('be.visible')
            cy.contains('Veelgestelde vragen').should('be.visible')
        })

        it('shows the footer', () => {
            cy.get('.bottomNav').should('be.visible')
        })
    })

    //Language toggle
    describe('Language toggle', () => {
        it('switches all nav buttons to English', () => {
            cy.get('[aria-label="Switch to English"]').click()
            cy.contains('Hello!').should('be.visible')
            cy.contains('Visiting').should('be.visible')
            cy.contains('Floor plan').should('be.visible')
            cy.contains('Opening hours').should('be.visible')
            cy.contains('Frequently asked questions').should('be.visible')
        })

        it('switches back to Dutch from English', () => {
            cy.get('[aria-label="Switch to English"]').click()
            cy.get('[aria-label="Schakel naar Nederlands"]').click()
            cy.contains('Hallo!').should('be.visible')
            cy.contains('Bezoeken').should('be.visible')
        })

        it('NL flag is active by default', () => {
            cy.get('[aria-label="Schakel naar Nederlands"]')
                .closest('.langFlag')
                .should('have.class', 'langFlag--active')
        })

        it('EN flag becomes active after switching', () => {
            cy.get('[aria-label="Switch to English"]').click()
            cy.get('[aria-label="Switch to English"]')
                .closest('.langFlag')
                .should('have.class', 'langFlag--active')
        })
    })

    //Navigation
    describe('Navigation', () => {
        it('navigates to Visiting page', () => {
            cy.contains('Bezoeken').click()
            cy.url().should('include', '/Visiting')
        })

        it('navigates to Opening Hours page', () => {
            cy.contains('Openingstijden').click()
            cy.url().should('include', '/OpeningHours')
        })

        it('navigates to FAQ page', () => {
            cy.contains('Veelgestelde vragen').click()
            cy.url().should('include', '/Faq')
        })

        it('footer home button stays on App page', () => {
            cy.get('.bottomNav').find('a').first().click()
            cy.url().should('include', '/App')
        })

        it('footer map button navigates to Map', () => {
            cy.get('.bottomNav__pin').click()
            cy.url().should('include', '/Map')
        })

        it('footer help button navigates to Help', () => {
            cy.get('.bottomNav').find('a').last().click()
            cy.url().should('include', '/Help')
        })
    })

    //Skip modal
    describe('Skip modal', () => {
        beforeEach(() => {
            cy.visit('http://localhost:5173/App?skipped=1')
        })

        it('shows the skip modal when arriving via ?skipped=1', () => {
            cy.get('.skipCard').should('be.visible')
            cy.contains('Introductie gemist?').should('be.visible')
        })

        it('closes the modal when skip button is clicked', () => {
            cy.contains('Overslaan').click()
            cy.get('.skipCard').should('not.exist')
        })

        it('closes the modal when clicking the overlay', () => {
            cy.get('.skipOverlay').click({ force: true })
            cy.get('.skipCard').should('not.exist')
        })

        it('navigates to Welcome1 when Intro is clicked', () => {
          cy.contains('Intro').click()
          cy.url().should('include', '/Welcome1', { timeout: 8000 })
        })
        
    })
})