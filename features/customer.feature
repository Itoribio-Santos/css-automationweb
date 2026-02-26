@CustomerManagement
Feature: Manage card products in the application

    @CreateCustomer
    Scenario Outline: Successfully create a new customer
        Given I navigate to the customer creation page
        # When I complete the form with "<IdCategory>", "<name>", "<lastName>", "<marStatus>", "<resiStatus>", "<gender>"
        When I complete the form with "<name>", "<lastName>", "<marStatus>", "<resiStatus>", "<gender>"
        And I complete the contact information form
        Then I capture the CIF number
        Examples:
            | IdCategory | name | lastName   | marStatus | resiStatus | gender |
            | 1          | Test | Automation | 1         | 1          | 1      |
# | IdCategory | name | lastName   | marStatus | resiStatus | gender |
# | 1          | Test | Automation | 1         | 1          | 1      |