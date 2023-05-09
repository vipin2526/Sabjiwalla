// const loginpage = document.querySelector('.login');
const name = document.querySelector('#name')
const pass = document.querySelector('#password')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone_no')

async function signup() {
    if (name.value == '' || pass.value == '' || email.value == '' || phone.value == '') {
        myalert("Please Provide Correct Information");
    }
    else {
        let req = {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: name.value,
                password: pass.value,
                email: email.value,
                phone: phone.value
            }),
        }


        resp = await fetch('http://localhost:5000/signup', req);
        statuscode = resp.status;
        if (statuscode == 200) {
            message = await resp.json();
            console.log(message.result);
            myalert("Signup Successfully!")
            // loginpage.remove();
        }
    }
}
