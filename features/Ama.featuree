Feature: 
When working with the bank application everything should be working to specifications

Background: Log in process
Given That there is a bank application browser
When I log in with my informations


Scenario: 4 Send money
Given That there is a bank application browser
And I log in with my informations
When I transfer money from an account to an other
Then I should see that there is money on my new account

Scenario: 5 check my last 5 transfer
Given That there is a bank application browser
And I log in with my informations
When I click on the start menu
Then I should see my last 5 transactions for my accounts

Scenario: 6 show more button 
Given That there is a bank application browser
And I log in with my informations
When I click on the "Show more" button
Then I will see all the transactions for each account

Scenario: 7.1 create new account
Given That there is a bank application browser
And I log in with my informations
When I create an account 
Then I should be able to create a name for the account
 
Scenario: 7.2 change account name
Given That there is a bank application browser
When I log in with my informations 
When I click on the button "Change account name"
Then I should be able to change the name of the account

Scenario: 7.3 Delete the account
Given That there is a bank application browser
When I log in with my informations 
When I click on the button "Delete the account"
Then I should be able to Delete the account


Scenario: 9 transfer to other acount
Given That there is a bank application browser
When I log in with my informations
And I click on the mina konto

When I click on the button 'Transfer to other'
And I enter "5" SEK in summa
And I enter account number "5555-4444"
Then should be able to able to see my Transfer 

Scenario: 11
When I am on start page
Then I can see my last 5 transactions 
And I can see the summary of the accounts balance

Scenario: 12.1 not executable
Given That there is a bank application browser
When I log in with my informations 
When I choose PG payment
Then I should be able to pay the chossen sum

Scenario: 12.2 not executable
Given That there is a bank application browser
When I log in with my informations  
When I choose BG payment
Then I should be able to pay the chossen amount

Scenario: 14 payment limit
Given That there is a bank application browser
When I log in with my informations 
When I choose payment over 30000 SEK
Then I should not be able to pay the choosen amount and I get a message