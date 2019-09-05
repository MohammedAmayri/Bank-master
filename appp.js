const ares = require('ares-helper'); // laddar in ares helper

ares.debug = true; // vi får debug info

ares.setProjectInfo({ // hjälpfunktion för att kunna "logga in" på ares

    "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Njc0OTAxMzgsImVtYWlsIjoiYW1hLmF5aXRlMTI1NUBnbWFpbC5jb20iLCJpYXQiOjE1Njc0MDM3Mzh9.oSZIak3v91Aev0FUCbC5andcyflscaKKc3Zseh1Ov_w",
    "workspaceName": "opticon_default",
    "projectKey": "5d6e13b73e47305847483dd1",
    "projectName": "Bank1"

});

let { $, sleep } = require('./funcs');
module.exports = function () {
    this.Given(/^That there is a bank application browser$/, async function () {
        await ares.startTests(); // kopplar upp till Ares med våra login-uppgifter
        await ares.startModule({ // definiera en testrapport (i e testmodul i en testrapport)

            moduleName: 'bankapplication1',

            totalTests: 2

        });
        await helpers.loadPage('http://localhost:3000')
        await sleep(1000)
    });

    this.When(/^I log in with my informations$/, async function () {
        await helpers.loadPage('http://localhost:3000/#login')
        let userName = await $('//*[@id="username"]')
        assert(userName, 'I could not find the userName')
        user = 'pupa'
        await userName.sendKeys(user)
        await sleep(1000)

        await ares.testResult({ // skicka resultatet till testrapporten

            moduleName: 'bankapplication1',
            title: 'Did you find the username?',
            passed: !!userName, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'You should put the right username!!'
        });

        let password = await $('//*[@id="password"]')
        assert(password, 'I could not find the password')
        pass = '123456'
        await password.sendKeys(pass)
        await sleep(1000)

        userName.submit()
        await sleep(1000)

        await ares.testResult({ // skicka resultatet till testrapporten
            moduleName: 'bankapplication1',
            title: 'Did you find the password?',
            passed: !!password, // HÄR skickar jag in mitt resultat ifrån t ex Selenium
            errorMessage: 'You should put the right password!!'
        });

        await ares.endModule({ // avslutar vi denna testrapport
            moduleName: 'bankapplication1',
        });
        await ares.endTests(); // avslutar hela ares
    });
}