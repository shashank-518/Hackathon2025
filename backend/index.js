import express from "express";
import multer from "multer";
import cors from "cors";
import { config } from "dotenv";
import twilio from "twilio";
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import bodyParser from 'body-parser';



const app = express()
config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  
});






const upload = multer({ storage: multer.memoryStorage() });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
  });


  
  app.post('/triage', (req, res) => {
    const { symptoms, age } = req.body;
    const input = symptoms.toLowerCase();
  
    const triageRules = [
      {
        keywords: ['chest pain', 'shortness of breath', 'tightness'],
        urgency: 'HIGH',
        advice: 'Possible heart attack. Administer aspirin if available. Keep patient calm and upright. Call emergency services immediately.',
      },
      {
        keywords: ['unconscious', 'no response', 'fainting'],
        urgency: 'HIGH',
        advice: 'Check for breathing and pulse. Begin CPR if necessary. Call emergency services immediately.',
      },
      {
        keywords: ['bleeding', 'open wound', 'blood loss'],
        urgency: 'HIGH',
        advice: 'Apply pressure to stop bleeding. Use a clean cloth or bandage. Elevate the wound if possible.',
      },
      {
        keywords: ['seizure', 'convulsions'],
        urgency: 'HIGH',
        advice: 'Do not restrain the person. Move objects away. Turn them on their side. Call emergency services.',
      },
      {
        keywords: ['fever', 'chills', 'cough'],
        urgency: 'MODERATE',
        advice: 'Monitor temperature. Provide fluids and rest. Seek medical attention if symptoms persist beyond 2 days.',
      },
      {
        keywords: ['headache', 'blurred vision', 'nausea'],
        urgency: 'MODERATE',
        advice: 'May indicate migraine or concussion. Keep patient in a quiet, dark room. Monitor for worsening symptoms.',
      },
      {
        keywords: ['minor cut', 'scrape', 'bruise'],
        urgency: 'LOW',
        advice: 'Clean with antiseptic. Apply a bandage. Monitor for signs of infection.',
      },
      {
        keywords: ['vomiting', 'diarrhea', 'stomach ache'],
        urgency: 'MODERATE',
        advice: 'Keep patient hydrated. Avoid solid foods initially. Seek help if symptoms last more than 24 hours.',
      },
      {
        keywords: ['difficulty breathing', 'asthma'],
        urgency: 'HIGH',
        advice: 'Use inhaler if available. Keep patient upright. Seek emergency care immediately.',
      },
      {
        keywords: ['burn', 'scald', 'blister'],
        urgency: 'MODERATE',
        advice: 'Cool with running water for 20 minutes. Do not apply ice. Cover with a sterile dressing.',
      },
    ];
  
    let matched = null;
  
    for (let rule of triageRules) {
      if (rule.keywords.some(keyword => input.includes(keyword))) {
        matched = rule;
        break;
      }
    }
  
    const response = matched
      ? {
          urgency: matched.urgency,
          advice: matched.advice,
        }
      : {
          urgency: 'LOW',
          advice: 'No critical symptoms detected. Monitor the patient and follow up with a doctor if symptoms persist.',
        };
  
    res.json(response);
  });

  app.post('/sendlocation', async (req, res) => {
    const { location, hospitals } = req.body;

    console.log(location);
    console.log(hospitals);
    
  
    if (!location || !hospitals || hospitals.length === 0) {
      return res.status(400).json({ error: 'Missing location or hospitals' });
    }
  
    const text = `🚑 Alert: Patient wants to book an ambulance of:\n\n${hospitals.join(', ')}\n\nLocation: https://maps.google.com/?q=${location.lat},${location.lon}`;
  
    try {
      await twilioClient.messages.create({
        body: text,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.RECEIVER_PHONE_NUMBER,
      });
  
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  });
  
  

app.get("/", (req,res) => {
    res.json({ message: 'Hello from server!' });
})


app.post('/bookfirebrigade', async (req, res) => {
  const { location, fireCause, phone, userName } = req.body;

  const message = `
🚨 Fire Brigade Request 🚒

Name: ${userName}
Location: ${location}
Cause: ${fireCause}
Contact: ${phone}
`;

  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.RECEIVER_PHONE_NUMBER
    });

    res.json({ success: true, message: 'Fire brigade alert sent successfully!' });
  } catch (error) {
    console.error('Twilio Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send SMS alert.' });
  }
});



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


app.post('/report', async (req, res) => {
  const { caseId, location, date, phone, explanation } = req.body;

  if (!phone || !location || !explanation) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const uniqueCode = uuidv4().split('-')[0].toUpperCase(); 


  console.log(phone)

  // const userMessage = `Crime report received. Your case code is: ${uniqueCode}`;
  const adminMessage = `New Crime Report\nCase ID: ${caseId || uniqueCode}\nDate: ${date}\nLocation: ${location}\nPhone: ${phone}\nDetails: ${explanation} \nCode:`;

  try {
    
    await twilioClient.messages.create({
      body: adminMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.RECEIVER_PHONE_NUMBER,
    });

    
    // await twilioClient.messages.create({
    //   body: adminMessage,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phone,
    // });

    res.status(200).json({ success: true, message: 'Report submitted and SMS sent' });
  } catch (err) {
    console.error('Twilio Error:', err);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});


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