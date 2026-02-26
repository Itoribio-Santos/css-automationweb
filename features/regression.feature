@RegressionManagement
Feature: Manage regression escenarios

    @CreateApplicationWithNewCustomer
    Scenario Outline: Successfully create a new card application with a new customer
        Given I navigate to the customer creation page
        When I complete the form with "<name>", "<lastName>", "<marStatus>", "<resiStatus>", "<gender>"
        And I complete the contact information form
        Then I capture the CIF number
        Given I navigate to the application creation page
        When I choose the option "<customerType>" for the creation of the application
        And I choose the option "<productType>" for product type
        And I search the customer with CIF
        And I select the card type "<cpNum>", "<apNum>", "<curr>"
        And I validate the PreIssueCardValidation screen
        And I validate the Services screen
        And I validate the Fees screen
        And I complete the Branch and Sales screen with "<accountBranch>", "<reportingBranch>", "<deliveryBranch>", "<salesAgency>", "<salesPerson>"
        And I go to the Review and Submit screen
        And I complete the application
        Then I store the application id from the results table
        And I navigate to the approve card application page
        And I start the card application approve flow with the stored application id
        And I approve the card application on Level 2
        And I approve the card application on Level 3
        Examples:
            | name       | lastName | marStatus | resiStatus | gender | customerType | productType | cpNum | apNum | curr | accountBranch | reportingBranch | deliveryBranch | salesAgency | salesPerson |
            | Automation | Test     | 1         | 1          | 1      | individual   | debit       | 002   | 002   | 840  | 0001          | 0001            | 0001           | 0001        | 1100        |

# @CreateCardApplication
# Scenario Outline: Successfully create a new card application
#     Given I navigate to the application creation page
#     When I choose the option "<customerType>" for the creation of the application
#     And I choose the option "<productType>" for product type
#     And I search the customer with CIF
#     And I select the card type "<cpNum>", "<apNum>", "<curr>"
#     And I validate the PreIssueCardValidation screen
#     And I validate the Services screen
#     And I validate the Fees screen
#     And I complete the Branch and Sales screen with "<accountBranch>", "<reportingBranch>", "<deliveryBranch>", "<salesAgency>", "<salesPerson>"
#     And I go to the Review and Submit screen
#     And I complete the application
#     Then I store the application id from the results table
#     And I navigate to the approve card application page
#     And I start the card application approve flow with the stored application id
#     And I approve the card application on Level 2
#     And I approve the card application on Level 3
#     Examples:
#         | customerType | productType | cpNum | apNum | curr | accountBranch | reportingBranch | deliveryBranch | salesAgency | salesPerson |
#         | individual   | debit       | 002   | 002   | 840  | 0001          | 0001            | 0001           | 0001        | 1100        |