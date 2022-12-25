const existEmail = "hieu@gmail.com";
const randomUser = Math.random().toString(36).slice(2, 7)
const newUser = {
    email: randomUser + "@gmail.com",
    username: randomUser,
    password: "123456",
    confirm_password: "123456",
};

describe("Register spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/register");
    });
    it("Redirect to Login page", () => {
        cy.contains("Already have an account? Login").click();
        cy.location("pathname").should("eq", "/login");
        cy.go("back");
    });

    it("Check register without email input", () => {
        cy.get("#email").clear();
        cy.get(".register-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(0)
            .should("have.text", "Không được để trống")
            .and("be.exist");
    });

    it("Check register on wrong email type", () => {
        cy.get("#email").type("wrong email.com");
        cy.get(".register-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(0)
            .should("have.text", "Email không hợp lệ (VD: ex@gmail.com)")
            .and("be.exist");
    });

    it("Check register without username input", () => {
        cy.get("#username").clear();
        cy.get(".register-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(1)
            .should("have.text", "Không được để trống")
            .and("be.exist");
    });

    it("Check register button without password input", () => {
        cy.get("#password").clear();
        cy.get(".register-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(2)
            .should("have.text", "Không được để trống")
            .and("be.exist");
    });

    it("Check register on password has at least 6 characters", () => {
        const text6Characters = "123456";
        cy.get("#password")
            .type(text6Characters)
            .invoke("val")
            .should("have.length", 6);
        cy.get(".register-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(2)
            .should("have.text", "Mật khẩu ít nhất 6 kí tự")
            .and("be.exist");
    });

    it("Check register button without confirm-password input", () => {
        cy.get("#confirm-password").clear();
        cy.get(".register-container .btn-submit").click();
        cy.get(".ant-form-item-explain-error")
            .eq(3)
            .should("have.text", "Không được để trống")
            .and("be.exist");
    });

    it("Check register failed when register an exist email ", () => {
        newUser.email = existEmail
        cy.get("#email").clear().type(existEmail);
        cy.get("#username").clear().type(newUser.username);
        cy.get("#password").clear().type(newUser.password);
        cy.get("#confirm-password").clear().type(newUser.confirm_password);
        cy.get(".register-container .btn-submit").click();
        cy.register(newUser);
        cy.get(".alert-danger")
            .should("be.visible")
            .should("have.text", "Email already in use");
    });
    
    it("Check register successfully", () => {
        newUser.email = newUser.username + "@gmail.com"
        cy.get("#email").clear().type(newUser.email);
        cy.get("#username").clear().type(newUser.username);
        cy.get("#password").clear().type(newUser.password);
        cy.get("#confirm-password").clear().type(newUser.confirm_password);
        cy.get(".register-container .btn-submit").click();
        cy.register(newUser);
        cy.url().should("be.equal", "http://localhost:3000/");
    });
});

Cypress.Commands.add("register", (newUser) => {
    cy.request({
        method: "POST",
        url: "/api/auth/register",
        failOnStatusCode: false,
        body: {
            email: newUser.email,
            username: newUser.username,
            password: newUser.password,
        },
    });
});
