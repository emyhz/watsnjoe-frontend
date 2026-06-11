describe('FloorMap Page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/MapCombined')
    })

    //Layout
    describe('Layout', () => {
        it('shows the floor map image', () => {
            cy.get('.fm-map-img').should('be.visible')
        })

        it('shows the From and To selects', () => {
            cy.get('#from-select').should('be.visible')
            cy.get('#to-select').should('be.visible')
        })

        it('shows the swap button', () => {
            cy.get('.fm-swap').should('be.visible')
        })

        it('shows the legend', () => {
            cy.get('.fm-legend').should('be.visible')
            cy.contains('Start')
            cy.contains('Destination')
            cy.contains('On route')
            cy.contains('Room')
        })

        it('shows room markers on the map', () => {
            cy.get('.fm-marker').should('have.length.greaterThan', 0)
        })

        it('shows the route panel', () => {
            cy.get('.fm-route-panel').should('be.visible')
        })
    })

    //Default state
    describe('Default state', () => {
        it('has Entrance Hall as the default From room', () => {
            cy.get('#from-select').should('have.value', '0.01')
        })

        it('has a route calculated on load', () => {
            cy.get('.fm-route-steps').should('be.visible')
        })

        it('shows the origin marker on the map', () => {
            cy.get('.fm-marker--origin').should('exist')
        })

        it('shows the destination marker on the map', () => {
            cy.get('.fm-marker--dest').should('exist')
        })

        it('draws a path line on load', () => {
            cy.get('.fm-svg-overlay polyline').should('exist')
        })
    })

    //Route calculation
    describe('Route calculation', () => {
        it('updates the route when To is changed', () => {
            cy.get('#to-select').select('0.80')
            cy.get('.fm-route-text').should('contain', '0.80')
        })

        it('updates the route when From is changed', () => {
            cy.get('#from-select').select('0.60')
            cy.get('.fm-route-text').should('contain', '0.60')
        })

        it('shows "You are already there" when From and To are the same', () => {
            cy.get('#from-select').select('0.80')
            cy.get('#to-select').select('0.80')
            cy.contains('You are already there').should('be.visible')
        })

        it('shows correct step count for a known route', () => {
            cy.get('#from-select').select('0.01')
            cy.get('#to-select').select('0.75')
            // 0.01 → 0.75 is 1 step (direct connection)
            cy.get('.fm-route-steps').should('contain', '1 step')
        })

        it('shows route text containing both room IDs', () => {
            cy.get('#from-select').select('0.01')
            cy.get('#to-select').select('0.80')
            cy.get('.fm-route-text').should('contain', '0.01')
            cy.get('.fm-route-text').should('contain', '0.80')
        })

        it('removes the path line when same room is selected', () => {
            cy.get('#from-select').select('0.80')
            cy.get('#to-select').select('0.80')
            cy.get('.fm-svg-overlay polyline').should('not.exist')
        })
    })

    //Swap button
    describe('Swap button', () => {
        it('swaps the From and To values', () => {
            cy.get('#from-select').select('0.01')
            cy.get('#to-select').select('0.80')
            cy.get('.fm-swap').click()
            cy.get('#from-select').should('have.value', '0.80')
            cy.get('#to-select').should('have.value', '0.01')
        })

        it('recalculates the route after swapping', () => {
            cy.get('#from-select').select('0.01')
            cy.get('#to-select').select('0.80')
            cy.get('.fm-route-text').then(($before) => {
                const beforeText = $before.text()
                cy.get('.fm-swap').click()
                cy.get('.fm-route-text').should(($after) => {
                    expect($after.text()).not.to.equal(beforeText)
                })
            })
        })
    })

    //Marker interaction
    describe('Marker interaction', () => {
        it('clicking a marker sets it as the destination', () => {
            cy.get('[aria-label="Navigate to Digitaal Grand Café"]').click()
            cy.get('#to-select').should('have.value', '0.80')
        })

        it('clicked marker gets the destination class', () => {
            cy.get('[aria-label="Navigate to Digitaal Grand Café"]').click()
            cy.get('.fm-marker--dest').should('exist')
        })

        it('shows a tooltip on marker hover', () => {
            cy.get('.fm-marker').first().trigger('mouseover')
            cy.get('.fm-tooltip').should('be.visible')
        })

        it('hides the tooltip when mouse leaves', () => {
            cy.get('.fm-marker').first().trigger('mouseover')
            cy.get('.fm-marker').first().trigger('mouseleave')
            cy.get('.fm-tooltip').should('not.exist')
        })

        it('tooltip shows the room label', () => {
            cy.get('[aria-label="Navigate to Entrance Hall"]')
                .trigger('mouseover')
            cy.get('.fm-tooltip').should('contain', 'Entrance Hall')
        })

        it('tooltip shows the room area', () => {
            cy.get('[aria-label="Navigate to Entrance Hall"]')
                .trigger('mouseover')
            cy.get('.fm-tooltip-area').should('contain', 'm²')
        })
    })

    //On-path markers
    describe('On-path markers', () => {
        it('marks intermediate rooms with the onpath class', () => {
            cy.get('#from-select').select('0.01')
            cy.get('#to-select').select('0.93')
            // Route goes through intermediate rooms
            cy.get('.fm-marker--onpath').should('have.length.greaterThan', 0)
        })

        it('no onpath markers when rooms are adjacent', () => {
            cy.get('#from-select').select('0.01')
            cy.get('#to-select').select('0.75')
            // Direct connection, no intermediate stops
            cy.get('.fm-marker--onpath').should('not.exist')
        })
    })
})