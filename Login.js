const jsdom = require("jsdom");
const FormData = require('form-data');
const { JSDOM } = jsdom;
const axios = require('axios');
const { users } = require("./users");
const { workerData } = require("worker_threads");

axios.defaults.withCredentials = true

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const validUser = ["mstu2375"]
// const validUser = ["mstu2375", "mstu2724", "mstu3811", "mstu4359", "mstu4360", "mstu4727","mstu3506","ifnu6109","mstu2852","mstu9254",
//                   "mstu9602","mstu9604","mstu9596","mstu9254","mstu10826","mstu10827","mstu10830","mstu10834","msou7644","mstu7782"];

// Main
// const validUser = ["mstu5086","mstu5088","mstu8874","mstu8877","mstu3376",
// "lxtu14214","lxtu14215","lxtu14216","lxtu14217","","lxtu14220","lxtu14221","lxtu14222","lxtu14223","lxtu14224"];

// const validUser=["atsu3849","atsu4190","atsu3472","atsu3895","atsu4638","atsu4639","mstu4839","mstu4829","mstu3436","atsu5169","atsu5171"];

// const validUser=["krsu2331","krsu2332","krsu3925","krsu3926","rku781","rku1127","krsu6502",
// "sucu6434","sucu6461","atsu6623","atsu6625","atsu6627","atsu6628","atsu6624","atsu6626","atsu6630","atsu6631","atsu6633","atsu6629",
// "lxtu6689","mstu4380","mstu5933","mstu4205","mstu4757","mstu4759","mstu4760","mstu4763","mstu4764","sucu6859","sucu6858","sucu6857"];

// const validUser=["lxtu6690","lxtu6691","mstu13962","mstu13955","mstu13974","mstu13967","mstu13976","mstu13979","mstu4074","mstu4077","mstu4105","mstu4107"];

// const validUser=["atsu10725","usu7799",
// "usu716","usu3137","atsu4458","atsu6380","atsu6384","krsu6983","sucu8762","sucu8766","sucu8257","sucu5272","sucu5273","sucu6347","sucu13514",
// "sucu13515","sucu13518","mstu9628","mstu9626"];

// const validUser=["lxtu13097","mstu6221","mstu6224","mstu8783","usu7794","usu12772","usu13180",
// "atsu7979","atsu8968",
// "lxtu10170","lxtu10473","lxtu10479","lxtu10482","lxtu10475","lxtu10485","lxtu10484","lxtu10671","lxtu11318","atsu11068","mrnu11256"];

// const validUser=["atsu18189","atsu18190","atsu18191","atsu18192"];

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

    for(const user of users.filter(u=>validUser.includes(u.userName))){
        const userName=user.userName;
        const pass=user.pass;
        const numberWrongData=user.wrong;
        let remainData=0;
        let totalData=0;
        let wrongData=0;
        let wrongIdList=[];
        let captchaLength= 0;
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
    }   
})
.catch(error => {
    console.log(error);
});