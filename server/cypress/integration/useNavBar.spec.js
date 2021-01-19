describe('Use NavBar to...', () => {
  it('visit AboutView', () => {
    cy.visit('http://localhost:4000')
    cy.contains('About').click()

    cy.url().should('include', '/about')
    cy.contains('Welcome to PokéBook!')
  })
  it('return to PokedexListView', () => {
    cy.contains('Pokédex').click()

    cy.contains('#150')
    cy.contains('Mewtwo')
    cy.contains('psychic')
  })
})
