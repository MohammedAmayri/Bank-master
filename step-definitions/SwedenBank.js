let balance;
let money;
let salaryAccount
let { $, sleep,S} = require('./funcs');

const ares = require('ares-helper'); // laddar in ares helper
ares.debug = true; // vi får debug info
ares.setProjectInfo({ // hjälpfunktion för att kunna "logga in" på ares
  "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjcyNDMzOTcsImVtYWlsIjoiamF2YWRkdXJyYW5pQGdtYWlsLmNvbSIsImlhdCI6MTU2NzE1Njk5N30.Ys3JDTJTqtqFyYzyDqW-5U7i-kwVW0JRo3YmJ1Vn7PY",
  "workspaceName": "outlook_default",
  "projectKey": "5d6e13283e47305847483dcf",
  "projectName": "BankApp"
});

module.exports = function () {


    this.Given(/^I navigate to Sweden Bank website$/, async function () {
        
        await ares.startTests()
        await ares.startModule
        ({ 
          moduleName: 'skaffa ett nytt konto',
          totalTests: 1
        });

        await helpers.loadPage('http://localhost:3000/#login');
        await sleep(1000);
       
    });
    

     this.When(/^I log in with my information$/, async function () {
       
        let username = await S("username");
        myuser = 'javad'
        //console.log(myuser)
        await username.sendKeys(myuser)
        await sleep(1000);
        let password = await S("password");
        mypass = 'Davaj1'
        await password.sendKeys(mypass)
        await sleep(1000);

        let submitb = await $("submitb")
        username.submit();
        await sleep(1000);

        
    });

    //sc1
    this.When(/^am logged in as a customer$/, async function () {
        
        assert(driver.findElements(by.css('Inloggad som')), 'Something went wrong with your log-in')
        
        /*await ares.testResult({
            moduleName: 'Logging in',
            title: 'Is the login succesful?',
            passed: textOnPage,
            errorMessage: 'Your username or password is not correct'
        })*/
      
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
             if(text.includes('Lönekonto')||text.includes('sparingkonto'))
             {
                counto++
             }
         }
         
        assert(counto == 2, 'we can not find your new account')
    
        //console.log(counto)
    
        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'skaffa ett nytt konto',
            title: 'Kan jag skaffa ett nytt konto?',
            passed: true, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'jag kan ej skaffa nytt konto'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: 'skaffa ett nytt konto',
          });
           
    
    });
    
    this.Given(/^I navigate to Sweden Bank website1$/, async function () {
        // Nothing to test
        await ares.startModule
        ({ 
          moduleName: 'sätta in pengar',
          totalTests: 1
        });

        await helpers.loadPage('http://localhost:3000/#login');
        await sleep(1000);
       
    });
    
    this.Given(/^I log in with my information1$/, async function () {

        /*await ares.startModule
        ({ 
          moduleName: 'sätta in pengar',
          totalTests: 1
        });*/
        let username = await S("username");
        myuser = 'javad'
        //console.log(myuser)
        await username.sendKeys(myuser)
        await sleep(1000);
        let password = await S("password");
        mypass = 'Davaj1'
        await password.sendKeys(mypass)
        await sleep(1000);

        let submitb = await $("submitb")
        username.submit();
        await sleep(1000);
     
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

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'sätta in pengar',
            title: 'Kan jag sätta in pengar?',
            passed: true,// HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'Pengarna går ej sättas in'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: 'sätta in pengar',
          });
           
      


    });

    //sc2
    
    this.Given(/^I log into my account$/, async function () {
        //already tested
        /*await ares.startModule
        ({ 
          moduleName: 'sätta in pengar',
          totalTests: 1
        });*/

        await helpers.loadPage('http://localhost:3000/#login');
        await sleep(1000);

        let username = await S("username");
        myuser = 'javad'
        //console.log(myuser)
        await username.sendKeys(myuser)
        await sleep(1000);
        let password = await S("password");
        mypass = 'Davaj1'
        await password.sendKeys(mypass)
        await sleep(1000);

        let submitb = await $("submitb")
        username.submit();
        await sleep(1000);

        
    });

 
    this.When(/^i click on Överföringar mina konton$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        let tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/table/tbody/tr[1]/td[2]'));
        balance= await tdWithBalance.getText()
        balance = balance.replace(/\D/g, '') / 100; // remove all charactars that are not numbers and convert to number dividing by 1
        console.log(balance)
            await helpers.loadPage('http://localhost:3000/#transfermyaccount');
        await sleep(1000)

        
        await ares.startModule
        ({ 
          moduleName: 'överforing',
          totalTests: 1
        });
    });
    this.When(/^i transfer 100 kr to my other account Sparingkonto$/, async function () {
        amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
        assert(amount, 'whats wrong?')
        money = 100
        await amount.sendKeys(money)
     
        accountChoice = await driver.findElement(by.xpath('//*[@id="toAccountNumber"]'))
        assert(accountChoice, 'whats wrong?')
        let myAccount = 'sparingkonto'
        await accountChoice.sendKeys(myAccount)
        await accountChoice.submit()
        await sleep(1000)
    });

    this.Then(/^i should be able to see a correct new balance for both accounts$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[2]/table/tbody/tr[1]/td[2]'));
        
        let balance2 = await tdWithBalance.getText();
        balance2 = balance2.replace(/\D/g, '') / 100; // remove all charactars that are not numbers and convert to number dividing by 1
        console.log(balance, money, balance2)
        console.warn("BALANCE", balance2);
        assert(balance - money == balance2, 'no can do')
        await sleep(2000)

               

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'överforing',
            title: 'Kan jag överfora pengar till en annan konto?',
            passed: true, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'det går ej att överfora pengar'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: 'överforing',
          });

          let logOut = await $('body > main > div > aside > nav > ul > li:nth-child(7) > button > a');
          logOut.click();
          await sleep(1000); 
           
    });

    this.Given(/^I am logged in as a bank customer$/, async function () {
        // Nothing to test
       
        await helpers.loadPage('http://localhost:3000/#login');
        await sleep(1000);

        let username = await S("username");
        myuser = 'amayri'
        //console.log(myuser)
        await username.sendKeys(myuser)
        await sleep(1000);
        let password = await S("password");
        mypass = 'Iryama1'
        await password.sendKeys(mypass)
        await sleep(1000);

        let submitb = await $("submitb")
        username.submit();
        await sleep(1000);
    });
  
    //sc3
    this.When(/^I visit the simulation page$/, async function () {
        await helpers.loadPage('http://localhost:3000/#simulate');
        await sleep(1000);

    });
    this.When(/^i make a 200 kr cash withdrawal$/, async function () {
        amount = await driver.findElement(by.xpath('//*[@id="sum"]'))
        assert(amount, 'whats wrong?')
        money = 10
        amount.sendKeys(money)
        await sleep(2000);
        transChoice = await driver.findElement(by.xpath('//*[@id="depositOrWithdraw"]'))
        assert(transChoice, 'whats wrong?')
        myCChoice = 'Uttag'
        transChoice.sendKeys(myCChoice)
        transChoice.submit()
    
    });
    
    this.Then(/^I navigate to my online account and here I can see the new balance$/, async function () {
        await helpers.loadPage('http://localhost:3000/#start');
        await sleep(1000);
        
        tdWithBalance = await driver.findElement(by.xpath('/html/body/main/div/article/section[1]/table/tbody/tr[1]/td[1]'));

        balance = await tdWithBalance.getText();
        balance = balance.replace(/\D/g, '') / 1;
        console.log(balance,money)
        assert(balance==money,'your transaction did not go through')

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'uttag',
            title: 'kan jag ta ut pengar?',
            passed: true , // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'det får ej att dra pengar från kontot'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: 'uttag',
          });
           
    });

    //sc5

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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
        

        
        await ares.startModule
        ({ 
          moduleName: '5transactions',
          totalTests: 1
        });
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

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: '5transactions',
            title: 'kan jag göra 5 överforningar',
            passed: true, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'det går ej att göra 5 eller fler transaktioner'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: '5transactions',
          });
           

    });
    //sc6

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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
        
        
        await ares.startModule
        ({ 
          moduleName: '10transactions',
          totalTests: 1
        });

    });

    this.Then(/^I should see my last 10 transactions for my accounts$/, async function () {
       
        let trs = await driver.findElements(By.css('section.history table tr'));
        assert(trs.length > 10, 'cant see all the rows');

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: '10transactions',
            title: 'kan jag göra 10 transkationer',
            passed: true, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'det är ej möjligt att göra 10 transktioner'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: '10transactions',
          });


           
    });

    //sc7,1

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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
        await sleep(1000)
        nameAccount=await S('newAccountName')
        await sleep(1000)
        await nameAccount.sendKeys('mynewaccount');
        add=await driver.findElement(by.xpath('//*[@id="addAccountModal"]/div/div/div[3]/button[2]'))
        add.click()

        
        await ares.startModule
        ({ 
          moduleName: 'changeName',
          totalTests: 1
        });
    });
    this.Then(/^I should be able to see the new account on the same page$/, async function () {
        await sleep(500)
        let ance = await driver.findElement(by.css('body > main > div > article > section.accounts.row.px-6 > table > tbody > tr:last-child > th > a'));
        await sleep(500)
        let balance1 = await ance.getText();
        console.log(balance1)
        assert(balance1 == 'mynewaccount', 'Are you sure that your changes are made?')

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'changeName',
            title: 'Kan jag byta namn på mitt konto?',
            passed:true , // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'jag kan ej byta namn på mitt konto'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: 'changeName',
          });
           
    });
    


    //sc7.2

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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

    
        await ares.startModule
        ({ 
          moduleName: 'ta bort konto',
          totalTests: 1
        });
    });


    this.Then(/^I should be able to see that the account has been deleted$/, async function () {
        let body = await driver.findElement(by.css('body'))
        await sleep(2000)
        assert(body, 'no can do')
        bodyt = await body.getText()
        await sleep(2000)
        count = bodyt.match((/haloo/g));

        assert(count == null, 'we can not find your new account')

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'ta bort konto',
            title: 'kan jag ta bort konto',
            passed: true, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'jag kan ej ta bort kontot!'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: 'ta bort konto',
          });
           
    });


    //sc9

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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

        
        await ares.startModule
        ({ 
          moduleName: 'överfora till andra',
          totalTests: 1
        });


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
       

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'överfora till andra',
            title: 'kan jag överfora till andra?',
            passed: true, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'jag kan inte skicka pengar till de andra'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: ' överfora till andra',
          });
           
    });

    //sc11.1
    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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

        
        await ares.startModule
        ({ 
          moduleName: 'PG betalning',
          totalTests: 1
        });
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


        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'PG betalning',
            title: 'kan jag betala med PG',
            passed: true , // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'jag kan inte betala med PG'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: 'PG betalning',
          });
           
    });
    //sc14

    this.Given(/^I have a account as a client$/, async function () {
        // Nothing to test
    });

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

        
        await ares.startModule
        ({ 
          moduleName: 'över gränsen',
          totalTests: 1
        });

    });
    this.Then(/^transaction should not go through and i should get a warning$/, async function () {
        let errorMessage = await driver.findElement(by.xpath('/html/body/main/div/article/form/div[4]/small'))

        assert(errorMessage, 'You can send more than 30000 SEK')

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'över gränsen',
            title: 'kan överfora mer än 30k?',
            passed: true, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'det här summan är över gränsen'
          });
          await ares.endModule({ // avslutar vi denna testrapport
            moduleName: 'över gränsen',
          });
          await ares.endTests()
           
    });

  


}