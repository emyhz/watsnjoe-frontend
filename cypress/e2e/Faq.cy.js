describe('FAQ Page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/Faq')
    })

    //Layout 
    describe('Layout', () => {
        it('shows the WatsNJoe logo', () => {
            cy.get('img[alt="WatsNJoe"]').should('be.visible')
        })

        it('shows the FAQ banner title', () => {
            cy.contains('FAQ').should('be.visible')
        })

        it('shows all 7 questions', () => {
            cy.get('.faq-button').should('have.length', 7)
        })

        it('shows the footer', () => {
            cy.get('.bottomNav').should('be.visible')
        })

        it('no answers are visible on load', () => {
            cy.get('.faq-item-wrapper.open').should('not.exist')
        })
    })

    //Accordion behaviour
    describe('Accordion behaviour', () => {
        it('expands a question when clicked', () => {
            cy.contains('Is er wifi beschikbaar?').click()
            cy.contains('gratis wifi beschikbaar').should('be.visible')
        })

        it('collapses a question when clicked again', () => {
            cy.contains('Is er wifi beschikbaar?').click()
            cy.contains('Is er wifi beschikbaar?').click()
            cy.get('.faq-item-wrapper.open').should('not.exist')
        })

        it('only one question is open at a time', () => {
            cy.contains('Is er wifi beschikbaar?').click()
            cy.contains('Is er parkeergelegenheid beschikbaar?').click()
            cy.get('.faq-item-wrapper.open').should('have.length', 1)
        })

        it('closes the first when a second is opened', () => {
            cy.contains('Is er wifi beschikbaar?').click()
            cy.contains('gratis wifi beschikbaar').should('be.visible')
            cy.contains('Is er parkeergelegenheid beschikbaar?').click()
            cy.contains('gratis wifi beschikbaar').should('not.be.visible')
            cy.contains('achterzijde van het gebouw').should('be.visible')
        })

        it('shows the correct answer for each question', () => {
            const faqData = [
                { q: 'Is er wifi beschikbaar?',                          a: 'gratis wifi beschikbaar' },
                { q: 'Is er parkeergelegenheid beschikbaar?',            a: 'achterzijde van het gebouw' },
                { q: 'Kunnen bewoners deelnemen aan activiteiten?',      a: 'wekelijks verschillende activiteiten' },
                { q: 'Wat gebeurt er als een gang of kamer tijdelijk geblokkeerd is?', a: 'alternatieve route' },
                { q: 'Werkt de app op elke verdieping?',                 a: 'interne lokatiebepaling' },
                { q: 'Waar kan ik de toiletten vinden?',                 a: 'naast de lift' },
                { q: 'In welke talen is de app beschikbaar?',            a: 'Nederlands en Engels' },
            ]

            faqData.forEach(({ q, a }) => {
                cy.contains(q).click()
                cy.contains(a).should('be.visible')
                cy.contains(q).click() 
            })
        })
    })

    //Language toggle 
    describe('Language toggle', () => {
        it('switches questions to English', () => {
            cy.get('[aria-label="Switch to English"]').click()
            cy.contains('Is wifi available?').should('be.visible')
            cy.contains('Is parking available?').should('be.visible')
            cy.contains('Can residents take part in activities?').should('be.visible')
        })

        it('shows English answers when expanded in English', () => {
            cy.get('[aria-label="Switch to English"]').click()
            cy.contains('Is wifi available?').click()
            cy.contains('free wifi is available').should('be.visible')
        })

        it('switches back to Dutch questions', () => {
            cy.get('[aria-label="Switch to English"]').click()
            cy.get('[aria-label="Schakel naar Nederlands"]').click()
            cy.contains('Is er wifi beschikbaar?').should('be.visible')
        })

        it('open accordion closes gracefully when language is switched', () => {
            cy.contains('Is er wifi beschikbaar?').click()
            cy.get('[aria-label="Switch to English"]').click()
            cy.get('.faq-item-wrapper.open').should('not.exist')
        })
    })

    //Navigation
    describe('Navigation', () => {
        it('back button goes to previous page', () => {
            cy.visit('http://localhost:5173/App')
            cy.contains('Veelgestelde vragen').click()
            cy.url().should('include', '/Faq')
            cy.get('.header__back-btn').click()
            cy.url().should('include', '/App')
        })

        it('footer home button navigates to App', () => {
            cy.get('.bottomNav').find('a').first().click()
            cy.url().should('include', '/App')
        })

        it('footer help button navigates to Help', () => {
            cy.get('.bottomNav').find('a').last().click()
            cy.url().should('include', '/Help')
        })
    })
})