import axios from "axios";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export async function displayRazorpay(props) {
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            // alert("Razorpay SDK failed to load. Are you online?");
            console.log('something wrong');
            return;
        }
        else{
            console.log(res);
        }
        // creating a new order
        const result = await axios.post("http://localhost:5000", {widthCredentials:true, amount:props});
    
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;
        const options = {
            key: "rzp_test_DmXWkrflbePgKp", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: currency,
            name: "Ecommerce Corp", //your business name
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
            prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                name: "Gaurav Kumar", //your customer's name
                email: "gaurav.kumar@example.com",
                contact: "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();        
    } catch (error) {
        console.log(error);
    }
}


