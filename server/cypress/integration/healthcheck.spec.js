describe('Server status', () => {
  it('Healthcheck returns "OK"', () => {
    cy.visit('http://localhost:4000/health')
    cy.contains('OK')
  })
})
