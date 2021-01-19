describe('Visit PokemonDetailView', () => {
  it('view opens via PokemonListView', () => {
    cy.visit('http://localhost:4000')
    cy.contains('Mewtwo').click()
    cy.url().should('include', '/pokemon/150')
  })
  it('view contains details about selected pokemon', () => {
    cy.contains('ID: 150')
    cy.contains('Height: 20')
    cy.contains('Weight: 1220')
    cy.contains('Moves: mega-punch')
  })
})
