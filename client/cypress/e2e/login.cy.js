const existValidEmail = "hieu@gmail.com";
const exisvalidPassword = "123456";
const notExistEmail = "wrongemail@gmail.com";
const notExistPassword = "123456";

describe("Login spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");
    });
    it("Redirect to Register page", () => {
        cy.contains("Create new account").click();
        cy.location("pathname").should("eq", "/register");
        cy.go("back");
    });

    it("Check login without email input", () => {
        cy.get("#email").clear();
        cy.get(".login-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(0)
            .should("have.text", "Không được để trống")
            .and("be.exist");
    });

    it("Check login on wrong email type", () => {
        cy.get("#email").type("wrongEmail.com");
        cy.get(".login-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(0)
            .should("have.text", "Email không hợp lệ (VD: ex@gmail.com)")
            .and("be.exist");
    });

    it("Check login button without password input", () => {
        cy.get("#password").clear();
        cy.get(".login-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(1)
            .should("have.text", "Không được để trống")
            .and("be.exist");
    });

    it("Check login on password has at least 6 characters", () => {
        const text6Characters = "123456";
        cy.get("#password")
            .type(text6Characters)
            .invoke("val")
            .should("have.length", 6);
        cy.get(".login-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(1)
            .should("have.text", "Mật khẩu ít nhất 6 kí tự")
            .and("be.exist");
    });

    it("Check login failed", () => {
        cy.get("#email").clear().type(notExistEmail);
        cy.get("#password").clear().type(notExistPassword);
        cy.get(".login-container .btn-submit").click();
        cy.login(notExistEmail, notExistPassword);
        cy.get(".alert-danger", { timeout: 1000 })
            .should("be.visible")
            .should("have.text", "Invalid Credentials");
    });

    it("Check login successfully", () => {
        cy.get("#email").clear().type(existValidEmail);
        cy.get("#password").clear().type(exisvalidPassword);
        cy.get(".login-container .btn-submit").click();
        cy.login(existValidEmail, exisvalidPassword);
        cy.url().should("be.equal", "http://localhost:3000/");
    });
});
