Feature:
When working with the bank application everything should be working to specifications

Background: 
Given That there is a bank application browser
When I log in with my credentials
Then I should be able to log in as a client successfully

Scenario: 4 - transfer amount between own accounts
Given I navigate to överföringar mina konton from the side menu
When I transfer an amount from my sender account to my other account
Then the receiver account shall receive the amount

Scenario: 6 - click show more button to see all transactions 
Given I am logged in and navigate to Mina konton
When I make 11 transactions from Lönekonto to Savings
And I click on Visa mer button
Then I will see all transactions for this account

Scenario: 7.3 - name change of account
Given I am logged in 
When I want to change account name 
Then the account name shall change successfully

Scenario: 5 - See account history for each account showing last 10 transactions
Given I navigate to mina konton
When I click on any of my accounts
Then I am shown my last 10 transactions for that particular account



