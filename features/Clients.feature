Feature:
When working with the bank application everything should be working to specifications

Background: 
Given That there is a bank application browser
And I have a account as a client
When I log in with my informations


Scenario: Logginig in //Skaffa ett nytt(lyckas)
When am logged in as Mohammed
And i click on Mina konto 
And chose to create a new account with the name SparingKonto
Then i should be able to see my 2 accounts 

Scenario: puting in 10K in my löneKonto //sätta in pengar(lyckas)
When i surf to the simulating page 
And i enter the right sum
And chose Isättning 
And submited my transaction 
Then when on the Start page i can see the new balance of my account 


Scenario: Transfering money from one of my accounts to an other //överforing(lyckas)
Given i have 10K in my löneKonto
When i surf to transfermyaccount
And i chose the sum i want to send
And the account that we want to recive the money as Sparingkonto
And click on Utför to submit the transaction
Then i should be able to see the new balance for the 2 accounts correctly

Scenario: five transactions on the start page //5transaction(lyckas)
Given i Repeated the last scenario for 5 times 
When i surf to my Start page 
Then I should be able to see my last five transactions for my accounts

Scenario: 10 or more transactions on my account page // 10 transaction (lyckas)
Given i repeated transaction between my accounts for 7 times more
When  I am on my account page 
And i click on my account Lönekonto 
And then clicked on the Show more button
Then I should see my last 10 transactions for my accounts

Scenario: warninig massege when your transfer more than 30000 //övergränsen (lyckas)
Given i have enough money in my Lönekonto
When i surf to Transfer money to another account page
And i choose Annat Konot 
And i choose the reciver account number
And i a bigger sum than thirty thousends
Then transaction should not go through and i should get a warning

Scenario: Making a Card withdraw //uttag (lyckas)
When i Am on the simulating page 
And i enter the 10 as sum
And chose Uttag 
And submit my transaction 
When am on the Start page 
Then i can see the new balance of my account 

Scenario: PG payment
Given I choose PG payment to account number
Then I should be able to pay the chosen sum

Scenario: Change the name of the account
When i surf to my account
And click on LäggTill 
And i chose to name the account mynewaccount
Then I should be able to see the new account on the same page

Scenario: Deleting an Account //tabortkonto
When  am on Myaccounts page
And click on Tabort Konto on the side of my mynewaccount2 account
Then I should be able to see that the account has been deleted


