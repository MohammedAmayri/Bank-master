let balance;
let money;
let salaryAccount
let { $, sleep } = require('./funcs');

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
        let username = await $("username");
        myuser = 'saraa'
        await username.sendKeys(myuser)
        await sleep(1000);
        let password = await $("password");
        mypass = 'saraaa'
        await password.sendKeys(mypass)
        await sleep(1000);

        let submitb = await $("submitb")
        username.submit();
        await sleep(1000);


    });

    ;;;;;;;;;;;;;;;;
    //sc1
    this.Then(/^I should be able to log in as a client$/, async function () {
        assert(driver.findElements(by.css('Inloggad som')), 'Something went wrong with your loging-in')
    });
    
    this.Then(/^i should have 2 accounts Lönekonto with 10000 sek and sparingkonto with no balance$/, async function () {
       //Creating the first account 
/*       await helpers.loadPage('http://localhost:3000/#my-accounts');
       await sleep(1000);
       createAccount = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/button'))
       assert(createAccount, 'whats wrong?')
       createAccount.click()
       await sleep(1000);
       nameAccount = await driver.findElement(by.xpath('//*[@id="newAccountName"]'))
        nameAccount.sendKeys('lönekonto')
        add = await driver.findElement(by.xpath('//*[@id="addAccountModal"]/div/div/div[3]/button[2]'))
        add.click()
        await sleep(1000)
         ance = await driver.findElement(by.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:last-child > th > a'));
         balance1 = await ance.getText();
        console.log(balance1)
        assert(balance1 == 'lönekonto', 'Are you sure that your changes are made?')
        */
        //putting in some cash
        await helpers.loadPage('http://localhost:3000/#simulate');
        await sleep(1000);

        amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
        assert(amount, 'whats wrong?')
         money = 100000
        amount.sendKeys(money)
        await sleep(2000);
        transChoice = await driver.findElement(by.xpath('//*[@id="depositOrWithdraw"]'))
        assert(transChoice, 'whats wrong?')
         myCChoice = 'insättning'
        transChoice.sendKeys(myCChoice)
        transChoice.submit()
        await sleep(1000)
        //creating the second Account
        await helpers.loadPage('http://localhost:3000/#my-accounts');
       await sleep(1000);
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
    
    ;;;;;;;;;;;;;;;;
    //sc2
    this.When(/^I transfer money from lönekonto to account to sparingkonto$/, async function () {

        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        let accounts = await driver.findElements(By.css('.only-if-logged-in.accounts-start tr'));
        // Find the salary account

        salaryAccount;
        for (let account of accounts) {
            let text = await account.getText();
            if (text.includes('lönekonto')) {
                salaryAccount = account;
            }
        }

        let tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/table/tbody/tr[1]/td[2]'));

        balance = await tdWithBalance.getText();
        balance = balance.replace(/\D/g, '') / 100; // remove all charactars that are not numbers and convert to number dividing by 1
        console.log(balance)
        console.warn("BALANCE", balance);



        ;;;;;;;;;
        
        await helpers.loadPage('http://localhost:3000/#transfermyaccount');
        await sleep(1000)
        amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
        assert(amount, 'whats wrong?')
        money = 10
        await amount.sendKeys(money)
        accountChoice = await driver.findElement(by.xpath('//*[@id="toAccountNumber"]'))
        assert(accountChoice, 'whats wrong?')
        let myAccount = 'sparingkonto - 4508-938222'
        await accountChoice.sendKeys(myAccount)
        await accountChoice.submit()

        await sleep(1000)

    
    
    });



    this.Then(/^i should be able to see that the transaction is right$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        // Get every account "line" from the startpage
        accounts = await driver.findElements(By.css('.only-if-logged-in.accounts-start tr'));
        // Find the salary account

        salaryAccount;
        for ( account of accounts) {
             text = await account.getText();
            if (text.includes('lönekonto')) {
                salaryAccount = account;
            }
        }
         tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/table/tbody/tr[1]/td[2]'));

        let balance2 = await tdWithBalance.getText();
        balance2 = balance2.replace(/\D/g, '') / 100; // remove all charactars that are not numbers and convert to number dividing by 1
        console.log(balance, money, balance2)
        console.warn("BALANCE", balance2);
        assert(balance - money == balance2, 'no can do')
        await sleep(2000)
    });

    ;;;;;;;;;;;
    //sc3
    this.Given(/^i have already made a card withdraw$/, async function () {
        await helpers.loadPage('http://localhost:3000/#simulate');
        await sleep(1000);

        amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
        assert(amount, 'whats wrong?')
         money = 10
        amount.sendKeys(money)
        await sleep(2000);
        transChoice = await driver.findElement(by.xpath('//*[@id="depositOrWithdraw"]'))
        assert(transChoice, 'whats wrong?')
        let myChoice = 'Uttag'
        transChoice.sendKeys(myChoice)
        transChoice.submit()
        await sleep(3000)
    }

    );

    this.Then(/^I should see the result of the transaction$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        let accounts = await driver.findElements(By.css('.only-if-logged-in.start-history tr'));
        let salaryAccount = accounts[1]
        tdWithBalance = await salaryAccount.findElement(by.css('td:nth-child(3)'));
        let balance1 = await tdWithBalance.getText();
        balance1 = balance1.replace(/\D/g, '') / 1; // remove all charactars that are not numbers and convert to number dividing by 1
        console.log(balance1,money)
        assert(balance1 === money, 'we can not find your new account')

    });

    //sc5
    this.Given(/^I  clicked on the start menu after that i made five transactions$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);

    }

    );

    this.Then(/^I should see my last five transactions for my accounts$/, async function () {
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
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);


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

    this.When(/I am on my account page and click on the Show more button$/, async function () {
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
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
        salaryAccount = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[1]/th/a'))
        assert(salaryAccount, 'whats wrong?')
        salaryAccount.click()
        await sleep(2000);
    }

    );

    this.Then(/^I should see my last 10 transactions for my accounts$/, async function () {
        let showme = await driver.findElement(by.xpath('//*[@id="show-button"]'))
        showme.click()

        let trs = await driver.findElements(By.css('section.history table tr'));
        assert(trs.length > 10, 'cant see all the rows');



    });

    //sc7,1
    this.Given(/I create an account$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
        createAccount = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/button'))
        assert(createAccount, 'whats wrong?')
        createAccount.click()
        await sleep(2000);
    }

    );

    this.Then(/^I should be able to name the account mynewaccount$/, async function () {
        nameAccount = await driver.findElement(by.xpath('//*[@id="newAccountName"]'))
        nameAccount.sendKeys('mynewaccount')
        add = await driver.findElement(by.xpath('//*[@id="addAccountModal"]/div/div/div[3]/button[2]'))
        add.click()
        let ance = await driver.findElement(by.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:last-child > th > a'));
        let balance1 = await ance.getText();
        console.log(balance1)
        assert(balance1 == 'mynewaccount', 'Are you sure that your changes are made?')
    });


    //sc7.2
    this.Given(/I click on the button Change account name$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
        //Change to css
        tdWithlance = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[1]/th/a'));
        let balance = await tdWithlance.getText();
        ChangeName = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[3]/td[4]/button'))
        assert(ChangeName, 'whats wrong?')
        ChangeName.click()
        await sleep(2000);

    }

    );

    this.Then(/^I should be able to change the name of the account to mynewaccount2$/, async function () {
        let newName = await driver.findElement(by.css('#changeName'))
        newname = 'mynewaccount2'
        newName.sendKeys(newname)
        let button = await driver.findElement(by.css('#changeNameModal > div > div > div.modal-footer > button.change-account-btn.btn.btn-primary'))
        button.click()
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
        //let tav = await driver.findElements(By.css('.section.accounts.row.px-6 table tr'));
        //Change to css
        tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[1]/th/a'));
        let balance1 = await tdWithBalance.getText();
        console.log(balance1)
        assert(balance != balance1, 'Are you sure that your changes are made?')


    });

    //sc7.3
    this.When(/I click on the button Delete the account$/, async function () {
        await helpers.loadPage('http://localhost:3000/#my-accounts');
        await sleep(1000);
        deleteAccount = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[3]/td[3]/button'))
        assert(deleteAccount, 'whats wrong?')
        deleteAccount.click()
        await sleep(2000);
    }

    );

    this.Then(/^I should be able to Delete the account$/, async function () {



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
        console.log(balance, ab,balance1);

        assert(balance - ab == balance1, 'no can do')
        let sentB= await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[1]/td[1]'))
        let sentBT= await sentB.getText();
        sentBT=sentBT.replace(/\D/g, '')
        assert(sentBT==200,'the amount you sent has not been withdrawn')

    });
        //sc14
        this.Given(/^I choose payment over thirty thousends SEK with pg number:''$/, async function () 
    {   
        await helpers.loadPage('http://localhost:3000/#transfer');
        await sleep(2000);
        let accountTypes= await driver.findElement(by.xpath('//*[@id="accountTypes"]/label[2]/input'))
        await sleep(1000);
        accountTypes.click()
        ToAccount=await $('toAccountNumber')
        ac='123456-7'
        await sleep(1000);
        ToAccount.sendKeys(ac)
        sum=await driver.findElement(by.xpath('//*[@id="sum"]'))
        ab='30001'
        await sleep(1000);
        sum.sendKeys(ab)
        ToAccount.submit();
        await sleep(1000);
        
        
    });

    this.Then(/^transaction should not go through and i should get a warning$/, async function () {
       
        let errorMessage = await driver.findElement(by.xpath('/html/body/main/div/article/form/div[4]/small'))
        
        assert(errorMessage, 'You can send more than 30000 SEK')
        });



}