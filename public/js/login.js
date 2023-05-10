// const loginpage = document.querySelector('.login');
const username = document.querySelector('#username')
const password = document.querySelector('#password')

let resp;

async function login() {
  if (username.value == '' || password.value == '') {
    myalert("Please Provide Correct Information");
  }
  else {
    let req = {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      }),
    }


    resp = await fetch('/login', req);
    statuscode = resp.status;
    if (statuscode == 401) {
      message = await resp.json();
      console.log(message.result)
      myalert("Wrong Username");
    }
    else if (statuscode == 200) {
      message = await resp.json();
      console.log(message.result);
      myalert("Login Successfully!")
      // loginpage.remove();
      setTimeout(() => {
        document.write("YOU ARE NOW LOGGED IN........")
      }, 3000);
    }
  }
}
