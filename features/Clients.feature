Feature:
When working with the bank application everything should be working to specifications

#Background: 
#Given That there is a bank application browser
#And I have a account as a client
#When I log in with my informations

Scenario: Logging in
Given I navigate to Sweden Bank website
When I log in with my information
And am logged in as a customer
And i click on Mina konto 
And chose to create a new account with the name SparingKonto
Then i should be able to see my 2 accounts 

Scenario: puting in 100K in my löneKonto
Given I navigate to Sweden Bank website1
And I log in with my information1
When i surf to the simulating page 
And i enter the right sum
And chose Isättning 
And submited my transaction 
Then when on the Start page i can see the new balance of my account 

Scenario: i transfer between my accounts
Given I log into my account
When i click on Överföringar mina konton
And i transfer 100 kr to my other account Sparingkonto
Then i should be able to see a correct new balance for both accounts

Scenario: I withdraw cash from ATM
Given I am logged in as a bank customer
When I visit the simulation page
And i make a 200 kr cash withdrawal
Then I navigate to my online account and here I can see the new balance

Scenario: Changing account name
Given I have a account as a client
When i am on Myaccounts page
And click on Bytanamn
And i chose to name the account mynewaccount2
Then I should be able to see the new changes on the same page

Scenario: Deleting an Account
Given I have a account as a client
When  am on Myaccounts page
And click on Tabort Konto on the side of my mynewaccount2 account
Then I should be able to see that the account has been deleted


Scenario: Transfering money from one of my accounts to an other
Given I have a account as a client
And i have 10K in my löneKonto
When i surf to transfermyaccount 
And i chose the sum i want to send
And the account that we want to recive the money as Sparingkonto
And click on Utför to submit the transaction
Then i should be able to see the new balance for the 2 accounts correctly

Scenario: five transactions on the start page
Given I have a account as a client
And i Repeated the last scenario for 5 times 
When i surf to my Start page 
Then I should be able to see my last five transactions for my accounts

Scenario: 10 or more transactions on my account page
Given I have a account as a client
And i repeated transaction between my accounts for 7 times more
When  I am on my account page 
And i click on my account Lönekonto 
And then clicked on the Show more button
Then I should see my last 10 transactions for my accounts

Scenario: warninig massege when your transfer more than 30000
Given I have a account as a client
And i have enough money in my Lönekonto
When i surf to Transfer money to another account page
And i choose Annat Konot 
And i choose the reciver account number
And i a bigger sum than thirty thousends
Then transaction should not go through and i should get a warning

Scenario: Making a Card withdraw 
Given I have a account as a client
When i Am on the simulating page 
And i enter the 10 as sum
And chose Uttag 
And submit my transaction 
When am on the Start page 
Then i can see the new balance of my account 