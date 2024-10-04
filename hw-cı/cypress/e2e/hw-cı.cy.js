import { errorMesages } from "../../src/components/Register";

describe('hw-cı Page', () => {
  describe('Error Messages', () => {
    it("name input thr0ws error for 2 chars", ()=> {
     //arrange
      cy.visit('http://localhost:5174/')
      //act
      cy.get('[data-cy="ad-input"]').type("em")
      //assert
      cy.contains(errorMesages.ad)
    })
    it("surname input thr0ws error for 2 chars", ()=> {
      //arrange
       cy.visit('http://localhost:5174/')
       //act
       cy.get('[data-cy="soyad-input"]').type("ku")
       //assert
       cy.contains(errorMesages.surname)
     })
     it("email input thr0ws error for emr@wit.", ()=> {
      //arrange
       cy.visit('http://localhost:5174/')
       //act
       cy.get('[data-cy="email-input"]').type("emr@wit.")
       //assert
       cy.contains(errorMesages.email)
     })
     it("password input thr0ws error for 1234", ()=> {
      //arrange
       cy.visit('http://localhost:5174/')
       //act
       cy.get('[data-cy="password-input"]').type("1234")
       //assert
       cy.contains(errorMesages.password)
     })
     it("button is disabled for unvalidated inputs", ()=> {
      //arrange
       cy.visit('http://localhost:5174/')
       //act
       cy.get('[data-cy="submit-button"]').type("1234")
       //assert
       cy.get('[data-cy="submit-button"]').should("be.disabled")
     })
  });
  describe('Form input validated', () => {
    it("button enabled for validated inputs", ()=> {
     //arrange
      cy.visit('http://localhost:5174/')
      //act
      cy.get('[data-cy="ad-input"]').type("emre")
      cy.get('[data-cy="soyad-input"]').type("kurt")
      cy.get('[data-cy="email-input"]').type("emre@wit.com.tr")
      cy.get('[data-cy="password-input"]').type("1234Aa*")      
      //assert
      cy.get('[data-cy="submit-button"]').should("be.disabled")
    })
  });
});