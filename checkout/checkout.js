import Express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = Express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}));
app.use(Express.json());


app.post('/', async (req, res)=>{
    const{amount} = req.body;
    try {
        const instance = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_SECRET
        });

        const options = {
            amount: amount*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
})


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));