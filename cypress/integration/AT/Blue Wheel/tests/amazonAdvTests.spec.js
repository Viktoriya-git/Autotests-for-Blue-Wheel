import amazonAdv from "../page-object/amazon-adv.js"
import pages from "../page-object/pages.js"

describe("blue wheel media", () => {
  before(() => {

    let default_domain = "bluewheelmedia.com";
    let domain = Cypress.env("B3_REACT_DOMAIN") ? Cypress.env("B3_REACT_DOMAIN") : default_domain;
    let base_url = "https://" + domain;

    Cypress.config(
      "baseUrl",
      "https://bluewheelmedia.com/"
    );
    cy.viewport(1280, 800);

  });

  beforeEach(() => {
    cy.visit("/amazon-marketing-agency/");
    cy.get("a").contains("Accept")
      .should("be.visible")
      .click();
  });

  it("should check if the 'here' link redirects to the 'Our Work' page", () => {
    cy.get(amazonAdv.sectionAmazonAdv).scrollIntoView().should("be.visible");
    cy.get(amazonAdv.hereLink).should("be.visible").and("contain", "here").click();
    cy.get(pages.sectionCnCr).scrollIntoView();
    cy.get("h2").contains("Our Case Studies").should("be.visible");
  })

  it("should check that clicking on the case studies images the corresponding pages open", () => {
    cy.get(amazonAdv.sectionOurCase).scrollIntoView().should("be.visible");
    cy.get(amazonAdv.imgApparel).should("be.visible").click();
    cy.get(pages.dsMainBanner).should("be.visible").go('back');
    cy.get(amazonAdv.imgBeauty).scrollIntoView().should("be.visible").click();
    cy.get(pages.caseStudiesHairLogo).should("be.visible").go('back');
    cy.get(pages.headingAmazonAdv).should("be.visible");
  });

  it("should check that all fields in the 'Next Steps? Get a No-Cost Audit' form are filling", () => {
    
    var advertisingValues = [
      "Currently Advertising on Amazon...",
      "Yes",
      "No"
    ];
    var resellerValues = [
      "Reseller or Brand...",
      "Reseller",
      "Brand"
    ];
    
    cy.get(amazonAdv.placeholderFN).scrollIntoView().should("be.visible");
    cy.get(amazonAdv.firstNameField).should("be.visible").type('QA');
    cy.get(amazonAdv.placeholderLN).should("be.visible");
    cy.get(amazonAdv.lastNameField).focus().should("be.visible").type('autotests');
    cy.get(amazonAdv.placeholderEmail).should("be.visible");
    cy.get(amazonAdv.emailField).focus().should("be.visible").type('qa@casualsushi.com');
    cy.get(amazonAdv.placeholderPhone).should("be.visible");
    cy.get(amazonAdv.phoneField).focus().should("be.visible").type('0003330000');
    cy.get(amazonAdv.placeholderBrand).should("be.visible");
    cy.get(amazonAdv.brandField).focus().should("be.visible").type('New Brand');
    cy.get(amazonAdv.placeholderAnnual).should("be.visible");
    cy.get(amazonAdv.annualField).focus().should("be.visible").type('zero');
    cy.get(amazonAdv.selectCurrently).should("be.visible").and("contain", "Currently Advertising on Amazon...")
      for (var i = 0; i < advertisingValues.length; i++) {
    cy.get(amazonAdv.selectCurrently).select(advertisingValues[i]).should("be.visible");
      };
    cy.get(amazonAdv.selectCurrently).select("Yes");
    cy.get(amazonAdv.selectReseller).should("be.visible").and("contain", "Reseller or Brand...")
      for (var i = 0; i < resellerValues.length; i++) {
    cy.get(amazonAdv.selectReseller).select(resellerValues[i]).should("be.visible");
      };
    cy.get(amazonAdv.selectReseller).select("Reseller");
    cy.get(amazonAdv.placeholderMessage).should("be.visible");
    cy.get(amazonAdv.messageField).focus().should("be.visible").type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem');
    cy.get(amazonAdv.recaptcha).should("be.visible");
    cy.get(amazonAdv.letsGetConnectedBtn).should("be.visible").click();
  });

  it("should check that all required fields are highlighted in red and corresponding messages appear when submitting an empty form", () => {
    cy.get(amazonAdv.letsGetConnectedBtn).scrollIntoView().should("be.visible").click();
    cy.get(amazonAdv.valError).should("be.visible").and("contain", "There was a problem with your submission. Errors have been highlighted below.");
    cy.get(amazonAdv.valMessage).should("be.visible").and("contain", "This field is required.");
    cy.get(amazonAdv.valMessage1).should("be.visible").and("contain", "This field is required.");
    cy.get(amazonAdv.valMessage2).should("be.visible").and("contain", "This field is required.");
    cy.get(amazonAdv.valMessage3).should("be.visible").and("contain", "This field is required.");
    cy.get(amazonAdv.valMessage4).should("be.visible").and("contain", "This field is required.");
    cy.get(amazonAdv.valRecaptcha).should("be.visible").and("contain", "The reCAPTCHA was invalid. Go back and try it again.");
  });
})