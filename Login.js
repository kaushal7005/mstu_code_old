const jsdom = require("jsdom");
const FormData = require('form-data');
const { JSDOM } = jsdom;
const axios = require('axios');

axios.get('https://mdtpl.masterdigitaltechnology.com/Users/Login', {withCredentials:true})
.then(async response => {
    console.log("call login page");
    let tokenKey = "__RequestVerificationToken";
    const loginDom = new JSDOM(response.data);
    let tokenValue = loginDom.window.document.getElementsByName(tokenKey)[0].value;
    let cook1 = response.headers['set-cookie'][0].replace(" path=/; samesite=strict; httponly", "");
    let cook2 = response.headers['set-cookie'][1].replace("; path=/; samesite=lax; httponly", "");
    let mainCookie=cook1 + " " + cook2
    console.log("cookie",mainCookie)
    console.log("cookie 1",cook1)
    console.log("cookie 2",cook2)
        const userName="mstu2375";
        const pass="Log.in@#123";
        // let remainData=0;
        // let totalData=0;
        // let wrongData=0;
        // let wrongIdList=[];
        // let captchaLength= 0;
        let form=new FormData();
        form.append('UserName', userName);
        form.append('Password', pass);
        form.append([tokenKey], tokenValue);
        headers={
            'Cookie':JSON.parse(JSON.stringify(response.headers['set-cookie'])).join("; ")
        }
        const axiosInstance = axios.create({
            withCredentials: true
        })
        axiosInstance.post('https://mdtpl.masterdigitaltechnology.com/Users/Login', form)
        .then(async response => {
            console.log(`Login success in ${userName}`);
            console.log("response",response.data);
        })
        .catch(error => {
            console.log(error);
        }); 
        // await axios.post('https://mdtpl.masterdigitaltechnology.com/Users/Login', form, 
        // { headers: {...form.getHeaders(),...headers}})
        // .then(async response => {
        //     console.log(`Login success in ${userName}`);
        //     console.log("response",response.data);
        // })
        // .catch(error => {
        //     console.log(error);
        // });    
})
.catch(error => {
    console.log(error);
});