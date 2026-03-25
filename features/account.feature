@AccountProductManagement
Feature: Manage account products

    @CreateDebitAccountProduct
    Scenario Outline: Successfully create a Debit Account Product
        Given I navigate to Account Products page
        When I click the Add button to create a new account product
        And I choose "<productType>" on the product type selection popup
        And I complete the Account Product Definition form with "<accountCategory>", "<accProdNumber>", "<accProdName>"
        And I complete the Account Product Configuration form
        Then I validate that the account product "<accProdNumber>" should be created successfully
        Examples:
            | productType                  | accountCategory | accProdNumber | accProdName   |
            | Debit Account Product / Pre- | Saving - 02     | 041           | DEBIT AUTO 01 |