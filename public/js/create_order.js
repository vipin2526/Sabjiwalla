const order_page_elements = document.querySelectorAll('.inner')
const explored_elements = document.querySelectorAll('.explore')

order_page_elements.forEach(e => {
    e.addEventListener('click', () => {
        remove_class(explored_elements, 'active');
        let a = e.querySelector('.explore')
        a.classList.add('active')

    })
})

function remove_class(elements, classname) {
    elements.forEach(e => {
        e.classList.remove(classname);
    })
}


// for selection of data


const selected_address = document.querySelector('#selected_address');
const selected_summery = document.querySelector('#selected_summery')
const selected_pay_method = document.querySelector('#selected_pay_method')

function update() {
    console.log("updating data");
    selected_address.innerHTML = create_order.address();
    selected_summery.innerHTML = create_order.items_name;
    selected_pay_method.innerHTML = create_order.paymentmethod;
}

let create_order =
{
    user_id: "<%= user.id %>",
    order_id: null,
    username: '<%= user.name %>',
    phone_no: '<%= user.phone_no %>',
    items_name: null,
    items: null,
    address_obj: null,
    paymentmethod: null,
    address() { return (this.address_obj.name + ' ' + this.address_obj.phone_no + ' ' + this.address_obj.landmark + ' ' + this.address_obj.city + ' ' + this.address_obj.pincode + ' ' + this.address_obj.state) },
}


// for API Call of submitting order

function submit_order() {
    axios.post('/create_order', create_order).then((res) => {
        myalert(res.data, 4000)
        setTimeout(() => {
            window.location.replace('/orders');
        }, 4000)
    })
}



