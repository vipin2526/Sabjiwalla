let resp;
async function add_to_cart(product_id, quantity = 1) {

    if (!(await islogin())) {
        return;
    }

    
    let req = {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            product_id: product_id,
            quantity: quantity
        }),
    }

    resp = await fetch("/cart", req);
    statuscode = resp.status;
    if (statuscode == 200) {
        myalert("Added in Your Cart!")
    }
    else {
        myalert("Wrong Username");
    }

}


const islogin = async () => {
    let value = await cookieStore.get('_id');
    if (value) {
        return true;
    }
    else
        window.location.replace('/login');
}


// async function iscookie(key) {
//     // let cookies = document.cookie.split(';');
//     // cookies.forEach(e => {

//     //     pair = e.split('=');
//     //     if (pair[0] == key) { return pair[1]; }

//     // });
//     let value = await cookieStore.get(key);
//     return value.value;
// }