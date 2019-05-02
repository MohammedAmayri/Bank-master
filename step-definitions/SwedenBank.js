let balance;
let money;
let salaryAccount
let { $, sleep,S} = require('./funcs');

module.exports = function () {


    this.Given(/^That there is a bank application browser$/, async function () {
        //bothing to test
    });

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });
    this.When(/^I log in with my informations$/, async function () {
        await helpers.loadPage('http://localhost:3000/#login');
        await sleep(1000);
        let username = await S("username");
        myuser = 'saraa'
        console.log(myuser)
        await username.sendKeys(myuser)
        await sleep(1000);
        let password = await S("password");
        mypass = 'saraaa'
        await password.sendKeys(mypass)
        await sleep(1000);

        let submitb = await $("submitb")
        username.submit();
        await sleep(1000);


    });

    ;;;;;;;;;;;;;;;;
    //sc1
    this.When(/^am logged in as Mohammed$/, async function () {
        assert(driver.findElements(by.css('Inloggad som')), 'Something went wrong with your loging-in')
    });

    this.When(/^i click on Mina konto$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
    });
    this.When(/^chose to create a new account with the name SparingKonto$/, async function () {
       
        createAccount = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/button'))
        assert(createAccount, 'whats wrong?')
        createAccount.click()
        await sleep(2000);
        nameAccount = await driver.findElement(by.xpath('//*[@id="newAccountName"]'))
        nameAccount.sendKeys('sparingkonto')
        add = await driver.findElement(by.xpath('//*[@id="addAccountModal"]/div/div/div[3]/button[2]'))
        add.click()
        ance = await driver.findElement(by.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:last-child > th > a'));
        balance1 = await ance.getText();
        console.log(balance1)
        assert(balance1 == 'sparingkonto', 'Are you sure that your changes are made?')
    });

    this.Then(/^i should be able to see my 2 accounts$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
        let counto=0;
         let tables = await $('section.accounts.row.px-6 tr')
         console.log(tables.length)
         for (let table of tables)
         {  
            let text=await table.getText()
             console.log(text)
             if(text.includes('lönekonto')||text.includes('sparingkonto'))
             {
                counto++
             }
         }


        assert(counto == 2, 'we can not find your new account')
    
        console.log(counto)
        
    
    });

    this.When(/^i surf to the simulating page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#simulate');
        await sleep(1000);

    });
    this.When(/^i enter the right sum$/, async function () {
        amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
        assert(amount, 'whats wrong?')
        money = 100000
        amount.sendKeys(money)
        await sleep(2000);
    });
    this.When(/^chose Isättning$/, async function () {
        transChoice = await driver.findElement(by.xpath('//*[@id="depositOrWithdraw"]'))
        assert(transChoice, 'whats wrong?')
        myCChoice = 'insättning'
        transChoice.sendKeys(myCChoice)
    });
    this.When(/^submited my transaction$/, async function () {
        transChoice.submit()
    });
    this.Then(/^when on the Start page i can see the new balance of my account$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
         tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/table/tbody/tr/td[2]'));

        balance = await tdWithBalance.getText();
        balance = balance.replace(/\D/g, '') / 100;
        assert(balance==money,'your transaction did not go through')
    });
    ;;;;;;;;;;;;;;;;
    //sc2
    
    this.Given(/^i have 10K in my löneKonto$/, async function () {
        //already tested
    });
    this.When(/^i surf to transfermyaccount$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        let tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/table/tbody/tr[1]/td[2]'));
        balance= await tdWithBalance.getText()
        balance = balance.replace(/\D/g, '') / 100; // remove all charactars that are not numbers and convert to number dividing by 1
        console.log(balance)
        await helpers.loadPage('http://localhost:3000/#transfermyaccount');
        await sleep(1000)
    });
    this.When(/^i chose the sum i want to send$/, async function () {
        amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
        assert(amount, 'whats wrong?')
        money = 10
        await amount.sendKeys(money)
    });
    this.When(/^the account that we want to recive the money as Sparingkonto$/, async function () {
        accountChoice = await driver.findElement(by.xpath('//*[@id="toAccountNumber"]'))
        assert(accountChoice, 'whats wrong?')
        let myAccount = 'sparingkonto - 4508-938222'
        await accountChoice.sendKeys(myAccount)
       
    });
    this.When(/^click on Utför to submit the transaction$/, async function () {
        await accountChoice.submit()

        await sleep(1000)
    });
    this.Then(/^i should be able to see the new balance for the 2 accounts correctly$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/table/tbody/tr[1]/td[2]'));
        
        let balance2 = await tdWithBalance.getText();
        balance2 = balance2.replace(/\D/g, '') / 100; // remove all charactars that are not numbers and convert to number dividing by 1
        console.log(balance, money, balance2)
        console.warn("BALANCE", balance2);
        assert(balance - money == balance2, 'no can do')
        await sleep(2000)
    });
  
    //sc3
    this.When(/^i Am on the simulating page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#simulate');
        await sleep(1000);

    });
    this.When(/^i enter the 10 as sum$/, async function () {
        amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
        assert(amount, 'whats wrong?')
        money = 10
        amount.sendKeys(money)
        await sleep(2000);
    });
    this.When(/^chose Uttag$/, async function () {
        transChoice = await driver.findElement(by.xpath('//*[@id="depositOrWithdraw"]'))
        assert(transChoice, 'whats wrong?')
        myCChoice = 'Uttag'
        transChoice.sendKeys(myCChoice)
    });
    this.When(/^submit my transaction$/, async function () {
        transChoice.submit()
    });
    this.When(/^am on the Start page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
    });
    this.Then(/^i can see the new balance of my account$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        
        tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[1]/td[1]'));

        balance = await tdWithBalance.getText();
        balance = balance.replace(/\D/g, '') / 1;
        console.log(balance,money)
        assert(balance==money,'your transaction did not go through')
    });

    //sc5

    this.Given(/^i Repeated the last scenario for 5 times$/, async function () {
        x = 0;
        while (x != 5) {
            await helpers.loadPage('http://localhost:3000/#transfermyaccount');

            amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
            assert(amount, 'whats wrong?')
            let money = 10
            await amount.sendKeys(money)

            accountChoice = await driver.findElement(by.xpath('//*[@id="toAccountNumber"]'))
            assert(accountChoice, 'whats wrong?')
            let myAccount = 'sparingkonto - 4508-938222'
            await accountChoice.sendKeys(myAccount)
            await accountChoice.submit()
            x++
            await sleep(1000)
        }
       


    });
    this.When(/^i surf to my Start page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
    });
    this.Then(/^I should be able to see my last five transactions for my accounts$/, async function () {
        
        let trs = await driver.findElements(By.css('section.start-history table tr'));
        console.log(trs)
        assert.equal(trs.length, 6, 'Not five lines in transactions!');


        let table = await driver.findElement(by.css('body'))
        await sleep(2000)
        assert(table, 'no can do')
        tablet = await table.getText()
        await sleep(2000)
        count = tablet.match(/-10/g).length;

        assert(count == 5, 'we can not find your new account')

    });
    //sc6

    this.Given(/i repeated transaction between my accounts for 7 times more$/, async function () {
        x = 0;
        while (x != 7) {
            await helpers.loadPage('http://localhost:3000/#transfermyaccount');

            amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
            assert(amount, 'whats wrong?')
            money = 10
            await amount.sendKeys(money)

            accountChoice = await driver.findElement(by.xpath('//*[@id="toAccountNumber"]'))
            assert(accountChoice, 'whats wrong?')
            myAccount = 'sparingkonto - 4508-938222'
            await accountChoice.sendKeys(myAccount)
            await accountChoice.submit()
            x++
            await sleep(1000)
        }
        
        
    }

    );
    this.When(/^I am on my account page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
    });this.When(/^i click on my account Lönekonto$/, async function () {
        salaryAccount = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[1]/th/a'))
        assert(salaryAccount, 'whats wrong?')
        salaryAccount.click()
        await sleep(2000);
    });this.When(/^then clicked on the Show more button$/, async function () {
        let showme = await driver.findElement(by.xpath('//*[@id="show-button"]'))
        showme.click()

    });

    this.Then(/^I should see my last 10 transactions for my accounts$/, async function () {
       
        let trs = await driver.findElements(By.css('section.history table tr'));
        assert(trs.length > 10, 'cant see all the rows');



    });

    //sc7,1
    this.When(/^i surf to my account$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
    });
    this.When(/^click on LäggTill$/, async function () {
        createAccount = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/button'))
        assert(createAccount, 'whats wrong?')
        createAccount.click()
        
    });
    this.When(/^i chose to name the account mynewaccount$/, async function () {
        nameAccount=await S('newAccountName')
        await nameAccount.sendKeys('mynewaccount');
        add=await driver.findElement(by.xpath('//*[@id="addAccountModal"]/div/div/div[3]/button[2]'))
        add.click()
    });
    this.Then(/^I should be able to see the new account on the same page$/, async function () {
        let ance = await driver.findElement(by.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:last-child > th > a'));
        let balance1 = await ance.getText();
        console.log(balance1)
        assert(balance1 == 'mynewaccount', 'Are you sure that your changes are made?')
    });
    


    //sc7.2
    this.When(/^i surf to My accounts$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
    });
    this.When(/^click on Bytanamn$/, async function () {
        ChangeName = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[3]/td[4]/button'))
        assert(ChangeName, 'whats wrong?')
        ChangeName.click()
        await sleep(2000);

    });
    this.When(/^i chose to name the account mynewaccount2$/, async function () {
        let newName = await driver.findElement(by.css('#changeName'))
        newname = 'mynewaccount2'
        newName.sendKeys(newname)
        let button = await driver.findElement(by.css('#changeNameModal > div > div > div.modal-footer > button.change-account-btn.btn.btn-primary'))
        button.click()
    });
    this.Then(/^I should be able to see the new changes on the same page$/, async function () {
        tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[1]/th/a'));
        let balance1 = await tdWithBalance.getText();
        console.log(balance1)
        assert(balance != balance1, 'Are you sure that your changes are made?')
    });
    

    //sc7.3
    this.When(/am on Myaccounts page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
        
    }

    );
    this.When(/^click on Tabort Konto on the side of my mynewaccount2 account$/, async function () {
        
    deleteAccount = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[3]/td[3]/button'))
    assert(deleteAccount, 'whats wrong?')
    deleteAccount.click()
    await sleep(2000);
    });


    this.Then(/^I should be able to see that the account has been deleted$/, async function () {
        let body = await driver.findElement(by.css('body'))
        await sleep(2000)
        assert(body, 'no can do')
        bodyt = await body.getText()
        await sleep(2000)
        count = bodyt.match((/haloo/g));

        assert(count == null, 'we can not find your new account')


    });


    //sc9

    this.When(/I click on the button Transfer to other$/, async function () {
        await helpers.loadPage('http://localhost:3000/#transfermyaccount');
        await sleep(1000);
        amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
        assert(amount, 'whats wrong?')
        money = 90
        amount.sendKeys(money)
        await sleep(2000);
        accountChoice = await driver.findElement(by.xpath('//*[@id="toAccountNumber"]'))
        assert(accountChoice, 'whats wrong?')
        let myAccount = 'sparingkonto - 4508-938222'
        await accountChoice.sendKeys(myAccount)
        await accountChoice.submit()

    }

    );

    this.Then(/^I should be able to transfer to other accounts$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        let acounts = await driver.findElements(By.css('.only-if-logged-in.start-history tr'));
        let salryccount = acounts[1]
        tdWithBalance = await salryccount.findElement(by.css('td:nth-child(3)'));
        let baance1 = await tdWithBalance.getText();
        baance1 = baance1.replace(/\D/g, '') / 1; // remove all charactars that are not numbers and convert to number dividing by 1
        assert(baance1 === money, 'we can not find your new account')


    });

    //sc11.1
    this.Given(/^I can see the summary of the accounts balance$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);

        let body = await driver.findElement(by.css('body'))
        await sleep(2000)
        assert(body, 'no can do')
        bodyt = await body.getText()
        await sleep(2000)
        count = await bodyt.match((/910,00 kr/g)).length + bodyt.match((/19 000,00 kr/g)).length + bodyt.match((/90,00 kr/g)).length
        await sleep(2000)
        //console.log(count)
        assert(count == 3, 'we can not find your new account')


    });


    //sc11.2

    this.When(/^I transfer money from an account to an other 5 times$/, async function () {
        x = 0;
        while (x != 5) {
            await helpers.loadPage('http://localhost:3000/#transfermyaccount');

            amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
            assert(amount, 'whats wrong?')
            let money = 10
            await amount.sendKeys(money)

            accountChoice = await driver.findElement(by.xpath('//*[@id="toAccountNumber"]'))
            assert(accountChoice, 'whats wrong?')
            let myAccount = 'newaccount - 5899-247657'
            await accountChoice.sendKeys(myAccount)
            await accountChoice.submit()
            x++
            await sleep(1000)
        }
        await sleep(2000)
    });

    this.Then(/^i should be able to see all of them$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);


        let trs = await driver.findElements(By.css('section.start-history table tr'));
        assert.equal(trs.length, 6, 'Not five lines in transactions!');


    });


    //sc12
    this.Given(/^I choose PG payment to account number$/, async function () {

        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(2000);


        tdWithBalance = await driver.findElement(by.css('body > main > div > article > section.only-if-logged-in.accounts-start.row.px-2 > table > tbody > tr:nth-child(1) > td.text-right'));

        balance = await tdWithBalance.getText();
        balance = balance.replace(/\D/g, '') / 100; //
        console.log(balance)



        await helpers.loadPage('http://localhost:3000/#transfer');
        await sleep(2000);
        let accountTypes = await driver.findElement(by.xpath('//*[@id="accountTypes"]/label[2]/input'))
        await sleep(1000);
        accountTypes.click()
        ToAccount = await $('toAccountNumber')
        ac = '123456-7'
        await sleep(1000);
        ToAccount.sendKeys(ac)
        sum = await driver.findElement(by.xpath('//*[@id="sum"]'))
        ab = '200'
        await sleep(1000);
        sum.sendKeys(ab)
        ToAccount.submit();
        await sleep(1000);
        alert = driver.switchTo().alert()
        alert.accept();
        await sleep(2000);
    });

    this.Then(/^I should be able to pay the chosen sum$/, async function () {

        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(2000);
        tdWithBalance = await driver.findElement(by.css('body > main > div > article > section.only-if-logged-in.accounts-start.row.px-2 > table > tbody > tr:nth-child(1) > td.text-right'));
        let balance1 = await tdWithBalance.getText();
        balance1 = balance1.replace(/\D/g, '') / 100; //
        console.log(balance, ab, balance1);

        assert(balance - ab == balance1, 'no can do')
        let sentB = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[1]/td[1]'))
        let sentBT = await sentB.getText();
        sentBT = sentBT.replace(/\D/g, '')
        assert(sentBT == 200, 'the amount you sent has not been withdrawn')

    });
    //sc14
    this.Given(/^i have enough money in my Lönekonto$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(2000);
        tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/table/tbody/tr[1]/td[2]'));
        
         balance2 = await tdWithBalance.getText();
        balance2 = balance2.replace(/\D/g, '') / 100; // remove all charactars that are not numbers and convert to number dividing by 1
        console.log(balance, money, balance2)
        console.warn("BALANCE", balance2);
        assert(balance2>30000, 'No enough money')
    });

    this.When(/^i surf to Transfer money to another account page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#transfer');
        await sleep(2000);
    });
    this.When(/^i choose Annat Konot$/, async function () {
        let accountTypes = await driver.findElement(by.xpath('//*[@id="accountTypes"]/label[2]/input'))
        await sleep(1000);
        accountTypes.click()
    });
    this.When(/^i choose the reciver account number$/, async function () {
        ToAccount = await S('toAccountNumber')
        ac = '123456-7'
        await sleep(1000);
        await ToAccount.sendKeys(ac)
    });
    this.When(/^i a bigger sum than thirty thousends$/, async function () {
        sum = await driver.findElement(by.xpath('//*[@id="sum"]'))
        ab = '30001'
        await sleep(1000);
        sum.sendKeys(ab)
        
        ToAccount.submit();
        await sleep(1000);
    });
    this.Then(/^transaction should not go through and i should get a warning$/, async function () {
        let errorMessage = await driver.findElement(by.xpath('/html/body/main/div/article/form/div[4]/small'))

        assert(errorMessage, 'You can send more than 30000 SEK')
    });
    //Sc Javad

    let saldoBeforeSender;
    let saldoBeforeReceiver;
    
    
    
    this.Given(/^That there is a bank application browser$/, async function() {
        // Write code here that turns the phrase above into concrete actions
        await helpers.loadPage('http://localhost:3000');
        await sleep(2000);
    });


    this.When(/^I log in with my credentials$/, async function() {
    // Write code here that turns the phrase above into concrete actions
        await driver.findElement(By.xpath("/html/body/header/button[2]/small/a")).click();
        //let loginButton = driver.findElement(By.xpath("/html/body/header/button[2]/small/a"));
        //loginButton.click();
        await sleep(2000);


        //user 1 credentials    
        let user1 = 'javad'
        let user1password = 'davaj1'


        //await helpers.loadPage('http://localhost:3000/#login');
        username = await driver.findElement(By.css("#username"))
        username.sendKeys(user1);
        //await sleep(2000);
        pword = await driver.findElement(By.css("#password"))
        pword.sendKeys(user1password);
        //await sleep(2000);

        await driver.findElement(By.css("button[type=submit]")).click();
        //await sleep(2000);

        

    });

    this.Then(/^I should be able to log in as a client successfully$/, async function() {
    // Write code here that turns the phrase above into concrete actions
        
        await helpers.loadPage('http://localhost:3000/#start');
        
        let result = await driver.findElement(By.className("username")).getText();
        assert.ok(result.includes("javad"));
        console.log(result);
        await sleep(2000);
        
    });

  

    this.Given(/^I navigate to överföringar mina konton from the side menu$/, async function () {
        // Write code here that turns the phrase above into concrete actions
     
        
        saldoBeforeSender = await driver.findElement(By.css("body > main > div > article > section.only-if-logged-in.accounts-start.row.px-2 > table > tbody > tr:nth-child(1) > td.text-right")).getText();
        
        saldoBeforeReceiver = await driver.findElement(By.css('body > main > div > article > section.only-if-logged-in.accounts-start.row.px-2 > table > tbody > tr:nth-child(2) > td.text-right')).getText();
        
        console.log("This is Sender's saldo before transaction: " + saldoBeforeSender);
        console.log("This is Receiver's saldo before transaction " + saldoBeforeReceiver);

        let transfermyAccount = await driver.findElement(By.css('body > main > div > aside > nav > ul > li:nth-child(6) > button > a'));
        transfermyAccount.click();
        // let val = await saldo.getAttribute('value'); // value from an input field
        
        //await sleep(2000);

    });

    this.When(/^I transfer an amount from my sender account to my other account$/, async function () {
        // Write code here that turns the phrase above into concrete actions
  
        //find the elements and use them 
        let ddElementFromAccount = await driver.findElement(By.css('#fromAccountNumber'));
        ddElementFromAccount.click();
        await sleep(2000);

        let selectedElement1 = await driver.findElement(By.css('#fromAccountNumber > option:nth-child(1)'));
        await sleep(2000);

        let txtElementSum = await driver.findElement(By.css('#sum'));
        txtElementSum.sendKeys('100');
        await sleep(2000);

        let ddElementToAccount = await driver.findElement(By.css('#toAccountNumber > option:nth-child(2)'));
        ddElementToAccount.click();
        await sleep(2000);

        let txtElementMeddelande = await driver.findElement(By.xpath("//*[@id='label']"));
        txtElementMeddelande.sendKeys('For shopping');
        await sleep(2000);

        await driver.findElement(By.css("button[type=submit]")).click();
     
        await sleep(2000);
        
    });

      this.Then(/^the receiver account shall receive the amount$/, async function(){
        // Write code here that turns the phrase above into concrete actions
            //#2 copy #1 
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        let saldoAfterSender = await driver.findElement(By.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(1) > td.text-right')).getText();
        let saldoAfterReceiver = await driver.findElement(By.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(2) > td.text-right')).getText();
        
        console.log("This is sender's saldo after transaction  " + saldoAfterSender)
        console.log("This is receivers saldo after transaction  " + saldoAfterReceiver)
        await sleep(2000);

        assert.ok(saldoAfterSender<saldoBeforeSender);
        assert.ok(saldoBeforeReceiver<saldoAfterReceiver);

         
    });
  
    this.Given(/^I am logged in and navigate to Mina konton$/, async function () {
        
        let transfermyAccount = await driver.findElement(By.css('body > main > div > aside > nav > ul > li:nth-child(6) > button > a'));
        transfermyAccount.click();


    });
    
   
    this.When(/^I make 11 transactions from Lönekonto to Savings$/, async function () {
        // Write code here that turns the phrase above into concrete actions
        
        let i;
        for (i = 1; i < 2; i++) {

        let ddElementFromAccount = await driver.findElement(By.css('#fromAccountNumber'))
        ddElementFromAccount.click()
        await sleep(1000)

        let selectedElement1 = await driver.findElement(By.css('#fromAccountNumber > option:nth-child(1)'))
        await sleep(500)

        let txtElementSum = await driver.findElement(By.css('#sum'))
        txtElementSum.sendKeys('100')
        await sleep(500)

        let ddElementToAccount = await driver.findElement(By.css('#toAccountNumber > option:nth-child(2)'))
        ddElementToAccount.click()
        await sleep(500)

        let txtElementMeddelande = await driver.findElement(By.xpath("//*[@id='label']"))
        txtElementMeddelande.sendKeys('transaction' + i)
        await sleep(500)

        await driver.findElement(By.css("button[type=submit]")).click()

        await sleep(500)

        let transfermyAccount = await driver.findElement(By.css('body > main > div > aside > nav > ul > li:nth-child(6) > button > a'))
        transfermyAccount.click();
        
        //console.log(i)
        }

        
      });

      
    this.When(/^I click on Visa mer button$/, async function () {
        // Write code here that turns the phrase above into concrete actions

        await helpers.loadPage('http://localhost:3000/#my-accounts');
        
        let accountLF = await driver.findElement(By.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(1) > th > a'))
        accountLF.click()
        await sleep(2000)

        let showMore = await driver.findElement(By.css('#show-button'))
        showMore.click()
        await sleep(2000);
    });

    this.Then(/^I will see all transactions for this account$/, async function () {
        // Write code here that turns the phrase above into concrete actions
       
        let xpathVisaFlerButton="//*[@id='show-button']"; 
        let xpathTableTransactios = "//section[@class='history row px-6']//tbody/tr";

        //count number of transactions before pressing visa flere
        let tableTransactionsCount = await driver.findElements(By.xpath(xpathTableTransactios));
        let trCountBeforePressVisaFler = tableTransactionsCount.length; 
        console.log("dette er antal før tryk på Visa Flera " + trCountBeforePressVisaFler );
        
        //press Visa Flera
        await driver.findElement(By.xpath(xpathVisaFlerButton)).click();
        await sleep(2000);
        
        //count number of transactions before pressing visa flere
        tableTransactionsCount = await driver.findElements(By.xpath(xpathTableTransactios));
        let trCountAfterPressVisaFler = tableTransactionsCount.length;
        
        console.log("dette er antal efter tryk på visa fleera " + trCountAfterPressVisaFler);
       
        //assert that Countbefore less than countafter
        assert.ok(trCountAfterPressVisaFler>trCountBeforePressVisaFler);

        

    });

    this.Given(/^I am logged in$/, function () {
        // Write code here that turns the phrase above into concrete actions
        
    });


    this.When(/^I want to change account name$/, async function () {
        // Write code here that turns the phrase above into concrete actions

        let minaKontonCss = "body > main > div > aside > nav > ul > li:nth-child(4) > button > a"
        let changeAccountNameCss = "body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(2) > td:nth-child(5) > button"
        let changeNameInputCss = "#changeName"
        let changeButtonCss = "#changeNameModal > div > div > div.modal-footer > button.change-account-btn.btn.btn-primary"

        let minaKonton = await driver.findElement(By.css(minaKontonCss))
        minaKonton.click()
        await sleep(2000)

        let changeAccountName = await driver.findElement(By.css(changeAccountNameCss))
        changeAccountName.click()
        await sleep(2000)

        let changeNameInput = await driver.findElement(By.css(changeNameInputCss))
        changeNameInput.sendKeys('car saving')
        await sleep(2000)

        let changeButton = await driver.findElement(By.css(changeButtonCss))
        changeButton.click()
    });

    this.Then(/^the account name shall change successfully$/, async function () {

        let resultCss = "/html/body/main/div/article/section[1]/table/tbody/tr[2]/th/a"
        let result = await driver.findElement(By.xpath(resultCss)).getText();
        assert.ok(result.includes("car saving"));
        console.log(result);
        await sleep(2000);
        
        
      });

      this.Given(/^I navigate to mina konton$/, async function () {
        
        let minaKontonCss = "body > main > div > aside > nav > ul > li:nth-child(4) > button > a"
        
        let minaKonton = await driver.findElement(By.css(minaKontonCss))
        minaKonton.click()
        await sleep(2000)
        

      });

      this.When(/^I click on any of my accounts$/, async function () {
        // Write code here that turns the phrase above into concrete actions

        let accountLF = await driver.findElement(By.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:nth-child(1) > th > a'))
        accountLF.click()
        await sleep(2000)

                
      });

      this.Then(/^I am shown my last 10 transactions for that particular account$/, async function () {
       
        let xpathTableRows = "//section[@class='history row px-6']//tbody/tr"
        let tableRowCount = await driver.findElements(By.xpath(xpathTableRows))
        let trCount = tableRowCount.length                                                      
        console.log("Antal transaktioner: " + trCount)
        assert.ok(trcount = 10);
        

       
      });

}