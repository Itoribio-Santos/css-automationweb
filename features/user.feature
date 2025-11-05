@User
Feature: Manage users

  @CreateUser
  Scenario Outline: Successfully create a new user
    Given I navigate to the user creation page
    When I create a new user with "<userId>", "<branch>", "<phone>", "<email>", "<comments>", "<password>"
    Then I should see the confirmation message "Saved Successfully"

    Examples:
      | userId     | branch | phone      | email               | comments          | password   |
      | automation | 0001   | 9987229111 | automation@test.com | AutomationTesting | Testing@01 |

