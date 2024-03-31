import express from 'express';
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://yugal_123:80eTz1FK3fyA40PC@Cluster0.qwcwqpu.mongodb.net/twitter?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("mongodb atlas connected");
})
.catch((err)=>{
    console.log("problem with",err);
})

app.get('/', (req, res) => {
    res.send('Hello World');
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
