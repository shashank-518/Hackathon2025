import express from "express";
import multer from "multer";
import cors from "cors";
import { config } from "dotenv";
import twilio from "twilio";


const app = express()
config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(cors());
app.use(express.json());


const upload = multer({ storage: multer.memoryStorage() });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
  });


app.get("/", (req,res) => {
    res.json({ message: 'Hello from server!' });
})

app.post("/Alertmessage" , async(req,res)=>{
  const {currentLocation, destination, estimatedTime, vehiclePlate } = req.body;

  

  const messageBody = `ALERT!! Missing.
  Current Location: ${currentLocation}
  Destination: ${destination}
  Vehicle Plate: ${vehiclePlate}`;

try {
  await twilioClient.messages.create({
    body: messageBody,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.RECEIVER_PHONE_NUMBER,
  });

  res.status(200).send('Alert SMS sent successfully!');
} catch (error) {
  console.error('Twilio Error:', error);
  res.status(500).send('Failed to send SMS.');
}




})


app.post("/submit", upload.fields([
    { name: "communicationScreenshot", maxCount: 1 },
    { name: "paymentScreenshot", maxCount: 1 }
  ]), async (req, res) => {
    try {
      const { bankName, ifscCode, branch, address, firCheckbox, bankCheckbox } = req.body;
  
      
      const messageBody = `
  Bank Name: ${bankName}
  IFSC Code: ${ifscCode}
  Branch: ${branch}
  Address: ${address}
  FIR Filed: ${firCheckbox === "true" ? "Yes" : "No"}
  Bank Informed: ${bankCheckbox === "true" ? "Yes" : "No"}
  Thanks For Contacting
      `;
  
  
      const message = await twilioClient.messages.create({
        body: messageBody,
        from: process.env.TWILIO_PHONE_NUMBER, 
        to: process.env.RECEIVER_PHONE_NUMBER, 
      });
  
    
  
      res.status(200).json({ success: true, message: "Form submitted and SMS sent!" });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: "Something went wrong." });
    }
  });



const port = process.env.PORT

app.listen(port , () => {
    console.log(`Server is running at port ${port}`);
    
})