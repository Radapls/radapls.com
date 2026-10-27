describe('hero mobile', () => {
  it('checks name layout at 375px', () => {
    cy.viewport(375, 667);
    cy.visit('/', { failOnStatusCode: false });
    cy.wait(1500);
    cy.document().then((doc) => {
      const out = {
        innerWidth: window.innerWidth,
        scrollW: doc.documentElement.scrollWidth,
        bodyScrollW: doc.body.scrollWidth,
      };
      const title = doc.querySelector('.home__title');
      if (title) {
        const r = title.getBoundingClientRect();
        out.title = {
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          overflow: r.left < 0 || r.right > window.innerWidth,
          fontSize: getComputedStyle(title).fontSize,
          scrollW: title.scrollWidth,
        };
      }
      out.offenders = [...doc.querySelectorAll('*')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.right > window.innerWidth + 1 || r.left < -1;
        })
        .slice(0, 10)
        .map((el) => el.className && el.className.toString().slice(0, 40) || el.tagName);
      cy.log(JSON.stringify(out, null, 1));
      // also print via task
      cy.task?.('log', out);
    });
    cy.screenshot({ capture: 'viewport' }); // saved under cypress/screenshots
  });
});
