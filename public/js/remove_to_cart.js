let resp;
async function remove_to_cart(i) {
    let req = {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            index: i
        }),
    }

    resp = await fetch('http://localhost:5000/remove', req);
    statuscode = resp.status;
    if (statuscode == 200) {
        location.reload();
    }
    else {
        myalert("Wrong Username");
    }

}


function save_for_later(i){
    remove_to_cart(i);
}