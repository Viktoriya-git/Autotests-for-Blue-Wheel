import homePage from "../page-object/home-page.js"
import menu from "../page-object/menu.js"
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
    cy.visit("/");
    cy.get("a").contains("Accept")
      .should("be.visible")
      .click();
  });

  it("should open the menu and check if all links are present", () => {
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.contains("Amazon Advertising").should("be.visible");
    cy.contains("Digital Marketing").should("be.visible");
    cy.contains("Digital Advertising").should("be.visible");
    cy.contains("Content Creation").should("be.visible");
    cy.contains("Amazon Academy").should("be.visible");
    cy.contains("Case Studies").should("be.visible");
    cy.contains("News & Press").should("be.visible");
    cy.contains("Careers").should("be.visible");
    cy.contains("Contact").should("be.visible");
    cy.get(menu.closeMenuBtn).should("be.visible").click();
    cy.get(menu.closeMenuBtn).should("not.exist");
  });

  it("should check if links in the menu redirect to corresponding pages", () => {
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.amazonAdv).should("be.visible").click();
    cy.get(menu.learnMoreAmazonAdv).should("be.visible").click();
    cy.get(pages.headingAmazonAdv).should("be.visible");
    
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.digitalMrc).should("be.visible").click();
    cy.get(menu.learnMoreDigMrc).should("be.visible").click();
    cy.get("h2").contains("Digital Marketing").should("be.visible");
    
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.digitalAdv).should("be.visible").click();
    cy.get(menu.learnMoreDigAdv).should("be.visible").click();
    cy.get(pages.headingDigitalAdv).should("be.visible");
    
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.contentCr).should("be.visible").click();
    cy.get("h2").contains("Content is Queen").should("be.visible");
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.amazonAcd).should("be.visible").click();
    cy.get(pages.amazonAcdImage).should("be.visible");
    
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.caseStudies).should("be.visible").click();
    cy.get(pages.sectionCnCr).scrollIntoView();
    cy.get("h2").contains("Our Case Studies").should("be.visible");
    
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.newsPress).should("be.visible").click();
    cy.get("h1").contains("Around the Wheel").should("be.visible");
    
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.careers).should("be.visible").click();
    cy.get(pages.headingCareers).should("be.visible");
    
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.contacts).should("be.visible").click();
    cy.get(pages.headingContacts).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();
  });

  it("should check if the 'Back' button in the burger menu (for the first three items) return to the main page", () => {
    cy.get(homePage.menuBtn).should("be.visible").click();
    cy.get(menu.amazonAdv).should("be.visible").click();
    cy.get(menu.backMenuBtn).should("be.visible").click();
    cy.get(menu.menu).should("be.visible");
    cy.get(menu.digitalMrc).should("be.visible").click();
    cy.get(menu.backMenuBtn).should("be.visible").click();
    cy.get(menu.menu).should("be.visible");
    cy.get(menu.digitalAdv).should("be.visible").click();
    cy.get(menu.backMenuBtn).should("be.visible").click();
    cy.get(menu.menu).should("be.visible");
    cy.get(menu.backMenuBtn).should("not.exist");
  });

  it("should check if the home page opens after clicking on the logo", () => {
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.url().should("include", "/");
  });

  it("should check the 'Let's Chat' form opens", () => {
    cy.get(homePage.mailBtn).should("be.visible").click();
    cy.get("h2").contains("Let's Chat").should("be.visible");
    cy.get(menu.closeMailBtn).should("be.visible").click();
    cy.get(menu.closeMailBtn).should("not.exist");
  });

  it("should check that all fields in the 'Let's Chat' form are filling and the 'Connect with us' button works", () => {
    cy.get(homePage.mailBtn).should("be.visible").click();
    cy.get("h2").contains("Let's Chat").should("be.visible");
    cy.get(homePage.fNameField).should("be.visible").type("QA");
    cy.get(homePage.lNameField).focus().type('autotests');
    cy.get(homePage.emailFld).focus().type('qa@casualsushi.com');
    cy.get(homePage.phoneFld).focus().type('0003330000');
    cy.get(homePage.plcholderMessage).should("be.visible");
    cy.get(homePage.aboutField).focus().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore');
    cy.get(homePage.recaptcha).should("be.visible");
    cy.get(homePage.connectWithUsBtn).should("be.visible").click();
  });

  it("should check if the error messages appear and all required fields are highlighted in red when submitting an empty form, drop-down", () => {
    cy.get(homePage.mailBtn).should("be.visible").click();
    cy.get("h2").contains("Let's Chat").should("be.visible");
    cy.get(homePage.connectWithUsBtn).should("be.visible").click();
    cy.get(homePage.valError).should("be.visible").and("contain", "There was a problem with your submission. Errors have been highlighted below.");
    cy.get(homePage.valMessage).should("be.visible").and("contain", "This field is required.");
    cy.get(homePage.valRecaptcha).should("be.visible").and("contain", "The reCAPTCHA was invalid. Go back and try it again.");
  });

  it("should check that all tabs show corresponding information and the 'Learn more' button opens the corresponding page", () => {
    cy.get(homePage.sectionProblems).scrollIntoView();
    cy.get(homePage.tabDgMrc).should("be.visible").click();
    cy.get("h2").contains('Marketing').should("be.visible");
    cy.get('h4').contains('Digital marketing is not plug and play').should("be.visible");
    cy.get(homePage.imgSeoDgMrcTab).should('be.visible');
    cy.get(homePage.imgSocialDgMrcTab).should("be.visible");
    cy.get(homePage.imgCreativeDgMrcTab).should("be.visible");
    cy.get(homePage.imgContentDgMrcTab).should("be.visible");
    cy.get(homePage.imgAnaliticsDgMrcTab).should("be.visible");
    cy.get(homePage.imgMarcAutDgMrcTab).should("be.visible");
    cy.get(homePage.lrnMrBtnDgMrc).contains("LEARN MORE").should("be.visible").click();
    cy.get("h2").contains("Digital Marketing").should("be.visible");    
    cy.get(homePage.logoLink).should("be.visible").click();
    
    cy.get(homePage.sectionProblems).scrollIntoView();
    cy.get(homePage.tabDgAdv).should("be.visible").click();
    cy.get("h2").contains('Advertising').should("be.visible");
    cy.get('h4').contains('Paid digital advertising is critical to a brand').should("be.visible");
    cy.get(homePage.imgDgAdvTab).should('be.visible');
    cy.get(homePage.lrnMrBtnDgAdv).contains("LEARN MORE").should("be.visible").click();
    cy.get(pages.headingDigitalAdv).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();
    
    cy.get(homePage.sectionProblems).scrollIntoView();
    cy.get(homePage.tabConCr).should("be.visible").click();
    cy.get("h2").contains('creating').should("be.visible");
    cy.get('h4').contains('Rich content is the driving force behind our marketing efforts').should("be.visible");
    cy.get(homePage.imgConCrTab).should('be.visible');
    cy.get(homePage.lrnMrBtnConCr).contains("LEARN MORE").should("be.visible").click();
    cy.get("h2").contains("Content is Queen").should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();
    
    cy.get(homePage.sectionProblems).scrollIntoView();
    cy.get(homePage.tabAmAdv).should("be.visible").click();
    cy.get("h2").contains('advertising on').should("be.visible");
    cy.get('h4').contains('we aren’t just another Amazon Advertising Agency').should("be.visible");
    cy.get(homePage.imgAmAdvTab).should('be.visible');
    cy.get(homePage.lrnMrBtnAmAdv).contains("LEARN MORE").should("be.visible").click();
    cy.get(pages.headingAmazonAdv).should("be.visible");
  });

  it("should check if the 'View More' button on each slade opens the corresponding page", () => {
    cy.get(homePage.sectionSlider).scrollIntoView();
    cy.get(homePage.viewMrBtnBty).contains("View More").should("be.visible").click();
    cy.get(pages.sectionBeauty).scrollIntoView();
    cy.get('h1').contains("The Best Beauty & Skincare Marketing Agency").should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();

    cy.get(homePage.sectionSlider).scrollIntoView()
    cy.get(homePage.slider).first().should("be.visible")
    .trigger('mousedown', "right", { force: true })
    .trigger('mousemove',  0, 700)
    .trigger('mouseup', 'left', { force: true })
    cy.get(homePage.viewMrBtnHealth).contains("View More").should("be.visible").click();
    cy.get(pages.sectionHealth).scrollIntoView();
    cy.get('h1').contains("Health & Fitness").should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();

    cy.get(homePage.sectionSlider).scrollIntoView()
    cy.get(homePage.slider).first().should("be.visible")
    .trigger('mousedown', "right", { force: true })
    .trigger('mousemove',  0, 700)
    .trigger('mouseup', 'left', { force: true })
    .trigger('mousedown', "right", { force: true })
    .trigger('mousemove',  0, 700)
    .trigger('mouseup', 'left', { force: true })
    cy.get(homePage.viewMrBtnB2B).contains("View More").should("be.visible").click();
    cy.get(pages.sectionB2B).scrollIntoView();
    cy.get('h1').contains("B2B Marketing Agency").should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();

    cy.get(homePage.sectionSlider).scrollIntoView()
    cy.get(homePage.slider).first().should("be.visible")
    .trigger('mousedown', "right", { force: true })
    .trigger('mousemove',  0, 700)
    .trigger('mouseup', 'left', { force: true })
    .trigger('mousedown', "right", { force: true })
    .trigger('mousemove',  0, 700)
    .trigger('mouseup', 'left', { force: true })
    .trigger('mousedown', "right", { force: true })
    .trigger('mousemove',  0, 700)
    .trigger('mouseup', 'left', { force: true })
    cy.get(homePage.viewMrBtnHome).contains("View More").should("be.visible").click();
    cy.get(pages.sectionHome).scrollIntoView();
    cy.get('h1').contains("Home Improvement").should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.mainBanner).should("be.visible");
  });

  it("should check that the images/titles in the 'Case studies' section the corresponding page opens", () => {
    cy.get(homePage.sectionWork).scrollIntoView().should("be.visible");
    cy.get(homePage.imgWorkSmells).should("be.visible").click();
    cy.get(pages.smellsBegone).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.sectionWork).scrollIntoView().should("be.visible");
    cy.get('h2').contains("Smells Begone").should("be.visible").click();
    cy.get(pages.smellsBanner).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();

    cy.get(homePage.sectionWork).scrollIntoView().should("be.visible");
    cy.get(homePage.imgWorkCrafts).should("be.visible").click();
    cy.get(pages.craftsIcon).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.sectionWork).scrollIntoView().should("be.visible");
    cy.get('h2').contains("Crafts 4 All").should("be.visible").click();
    cy.get(pages.craftsBanner).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();

    cy.get(homePage.sectionWork).scrollIntoView().should("be.visible");
    cy.get(homePage.imgWorkBanila).should("be.visible").click();
    cy.get(pages.banilaCo).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.sectionWork).scrollIntoView().should("be.visible");
    cy.get('h2').contains("Banila Co").should("be.visible").click();
    cy.get(pages.banilaBanner).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();

    cy.get(homePage.sectionWork).scrollIntoView().should("be.visible");
    cy.get(homePage.imgWorkErzo).should("be.visible").click();
    cy.get(pages.ernoIcon).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();
    cy.get(homePage.sectionWork).scrollIntoView().should("be.visible");
    cy.get('h2').contains("Erno Laszlo").should("be.visible").click();
    cy.get(pages.ernoBanner).should("be.visible");
    cy.get(homePage.logoLink).should("be.visible").click();
  });

  it("should check if all fields in the 'Let's Chat' form are filling and the 'Let's get connected' button works", () => {
    cy.get(homePage.placeholderFN).scrollIntoView().should("be.visible");
    cy.get(homePage.firstNameField).should("be.visible").type("QA");
    cy.get(homePage.placeholderLN).should("be.visible");
    cy.get(homePage.lastNameField).focus().type('autotests');
    cy.get(homePage.placeholderEmail).should("be.visible");
    cy.get(homePage.emailField).focus().type('qa@casualsushi.com');
    cy.get(homePage.placeholderPhone).should("be.visible");
    cy.get(homePage.phoneField).focus().type('0003330000');
    cy.get(homePage.placeholderMessage).should("be.visible");
    cy.get(homePage.messageField).focus().type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem');
    cy.get(homePage.recaptcha).should("be.visible");
    cy.get(homePage.letsGetConnectedBtn).should("be.visible").click();
    //cy.get('p').contains("Thanks for contacting us! We will get in touch with you shortly").should("be.visible");
  });

  it("should check if the error messages appear and all required fields are highlighted in red when submitting an empty form", () => {
    cy.get(homePage.letsGetConnectedBtn).scrollIntoView().should("be.visible").click();
    cy.get(homePage.validationError).should("be.visible").and("contain", "There was a problem with your submission. Errors have been highlighted below.");
    cy.get(homePage.validationMessage).should("be.visible").and("contain", "This field is required.");
    cy.get(homePage.validationReCaptcha).should("be.visible").and("contain", "The reCAPTCHA was invalid. Go back and try it again.");
  });
})