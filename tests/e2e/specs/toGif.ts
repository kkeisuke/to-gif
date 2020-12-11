describe('toGif', () => {
  before(() => {
    cy.visit('/')
    cy.wait(5000)
  })

  it('video convert', () => {
    cy.get('#description').should('have.css', 'display', 'block')
    cy.get('#FileUpLoad').attachFile({filePath: 'mock.mp4', encoding: 'binary', mimeType: 'application/octet-stream' }, { subjectType: 'drag-n-drop' })
    cy.get('#imageName').contains('mock.mp4.gif')
    cy.get('#imageSize').contains('78 KB')
    cy.get('#preview').should('have.css', 'display', 'block')
    cy.get('#description').should('have.css', 'display', 'none')
  })
})
