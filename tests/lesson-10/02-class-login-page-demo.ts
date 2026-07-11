class LoginPage {
    userNameLoc: string;
    passwordLoc: string;
    rememberMeLoc: string;
    btnLoginLoc: string

    constructor(userName: string, password: string, rememberMe: string, btnLogin: string){
        this.userNameLoc=userName;
        this.passwordLoc=password;
        this.rememberMeLoc=rememberMe;
        this.btnLoginLoc=btnLogin
    }

    fillUserName(userName1: string){
        console.log('Filling username', userName1);
    }

    fillPassWord(password1: string){
        console.log('Filling password', password1);
    }

    clickRememberMe(){
        console.log('Clicking Remember Me');
    }

    clickBtnLogin(){
        console.log('Clicking btn Login');
    }

};

class DashboardPage extends LoginPage{
    headingLoc: string;

    constructor(heading: string, userName1: string, password: string, rememberMe: string, btnLogin: string){
        super(userName1, password, rememberMe, btnLogin );
        this.headingLoc=heading;
    }

    clickMenu(menuName: string){
        console.log('Clicking Menu Name')
    }
};

const loginPage1 = new LoginPage ("//input[@id='user name']","//input[@id='password']","","");
loginPage1.fillUserName('lucy');

const DashboardPageObj = new DashboardPage("1","2","3","4","5");
DashboardPageObj.fillUserName("Tuyen");