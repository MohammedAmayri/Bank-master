Feature:
When working with the bank application everything should be working to specifications

Background: 
Given That there is a bank application browser
And I have a account as a client
When I log in with my informations

Scenario: (1)
Then I should be able to log in as a client
And i should have 2 accounts Lönekonto with 10000 sek and sparingkonto with no balance

Scenario: (7.1):
Given I create an account
Then I should be able to name the account mynewaccount

Scenario: 7.2
Given I click on the button Change account name
Then I should be able to change the name of the account to mynewaccount2

Scenario: 7.3
Given I click on the button Delete the account
Then I should be able to Delete the account

Scenario: (2)
When I transfer money from lönekonto to account to sparingkonto
Then i should be able to see that the transaction is right

Scenario: (5)
Given I  clicked on the start menu after that i made five transactions 
Then I should see my last five transactions for my accounts

Scenario: (6):
Given I am on my account page and click on the Show more button
Then I should see my last 10 transactions for my accounts

Scenario: 14
Given I choose payment over thirty thousends SEK with pg number:''
Then transaction should not go through and i should get a warning

Scenario: (12)
Given I choose PG payment to account number
Then I should be able to pay the chosen sum

Scenario: (3)
Given i have already made a card withdraw
Then I should see the result of the transaction 
