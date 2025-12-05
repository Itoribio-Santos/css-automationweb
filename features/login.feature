@Login
Feature: Login functionality

  Scenario: Successful login
    Given I am on the login page
    When I login with valid credentials
    Then I should see the home page


  # Scenario Outline: Successful login with valid credentials
  #   Given I am on the login page
  #   When I login with username "<username>" and password "<password>"
  #   Then I should see the home page

  #   Examples:
  #     | username | password |
  #     | standard_user | secret_sauce |
  #     | problem_user  | secret_sauce |