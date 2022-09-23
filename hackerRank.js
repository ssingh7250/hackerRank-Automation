const { formPushButton } = require("pdfkit");
const puppeteer=require("puppeteer");

const hakerlink='https://www.hackerrank.com/auth/login';
const codeObj=require('./codes');

const email='xamot46817@stvbz.com';
const pass='222525';


let page;

let browserOpen=puppeteer.launch(
    {headless:false,
    args:['--start-maximized'],
    defaultViewport:null
    
    });

browserOpen.then(function(  browserObj){

    let browserOpenPromise=browserObj.newPage();    
    return browserOpenPromise; 
}).then(function(newTab){
    page=newTab;
    let hackerRankOpen=newTab.goto(hakerlink);
    return hackerRankOpen;
}).then(function(){
    let emailIsEnter=page.type("input[id='input-1']",email,{delay:50});
    return emailIsEnter;
}).then(function(){

    let passwordEnter=page.type("input[id='input-2",pass,{delay:50});
    return passwordEnter;

}).then(function(){

    let clickonLogin=page.click("button[class='ui-btn ui-btn-large ui-btn-primary auth-button ui-btn-styled']",{delay:50});
    return clickonLogin;
}).then(function(){
        let clickOnAlgo=waitAndClick('.topic-card a[data-attr1="algorithms"]',page);
        return clickOnAlgo;

}).then(function(){

    let clickOnWarnUp=waitAndClick('.checkbox-wrap input[value="warmup"]',page);
    return clickOnWarnUp;
// }).then(function(){

//     let waitfor3sec=page.waitFor(10000);
//     return waitfor3sec;

}).then(function(){
    // $$ -> document.queryselectall
    let solveallchangle=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50});
    return solveallchangle;
}).then(function(questionarr){
    console.log("no of question",questionarr.length);

    let questinsolver=questionsolverdef(page,questionarr[0],codeObj.answer[0]);
    return questinsolver;

})




function waitAndClick(selector,cpage)
{
    return new Promise (function(resolve,reject){
            let waitformodepromise=cpage.waitForSelector(selector);

            waitformodepromise.then(function()
            {
                let clickmodel=cpage.click(selector);
                return clickmodel;
            }).then(function(){
                resolve();
            }).catch(function(){
                reject();
            })

    })
}

function questionsolverdef(page,question,answer)
{
    return new Promise(function(resolve,reject){

         let clickonquestion=question.click();
         clickonquestion.then(function(){
            let editorinfocus=waitAndClick('.monaco-editor.no-user-select.vs',page);
            return editorinfocus;
        }).then(function(){

            return waitAndClick('.checkbox-input',page);
        }).then(function(){

            return waitAndClick('textarea.custominput',page);
        }).then(function(){

            return page.type('textarea.custominput',answer,{delay:10});

        }).then(function(){
            let crtlpressed=page.keyboard.down('Control');
            return crtlpressed;
        }).then(function(){
            let selectall=page.keyboard.press('A',{delay:10});
            return selectall;
        }).then(function(){

            let cut=page.keyboard.press('X',{delay:10});
            return cut;
        }).then(function(){
            let crtlunpressed=page.keyboard.up('Control');
            return crtlunpressed;
        }).then(function(){

            let mainfocus=waitAndClick('.monaco-editor.no-user-select.vs',page);
            return mainfocus;
        }).then(function(){
            let crtlpressed=page.keyboard.down('Control');
            return crtlpressed;
        }).then(function(){
            let selectall=page.keyboard.press('A',{delay:10});
            return selectall;
        }).then(function(){

            let paste=page.keyboard.press('V',{delay:10});
            return paste;
        }).then(function(){
            let crtlunpressed=page.keyboard.up('Control');
            return crtlunpressed;
        }).then(function(){

            return page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled');

        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}