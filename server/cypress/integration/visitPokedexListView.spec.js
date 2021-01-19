describe('Visit PokedexList View', () => {
  it('view opens and contains first, last, and random', () => {
    const pokemonId = `#${Math.floor(Math.random() * 150).toString().padStart(3, '0')}`
    cy.visit('http://localhost:4000')
    cy.contains('Bulbasaur')
    cy.contains('grass')
    cy.contains('poison')

    cy.contains(pokemonId)

    cy.contains('Mewtwo')
    cy.contains('psychic')
  })
})
