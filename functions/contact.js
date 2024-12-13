const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  try {
    const { name, phone, email, subject, message } = JSON.parse(event.body);

    const msg = {
        to: ["drashya.2224@gmail.com", "adam.kunz@durhamcollege.ca"],
        from: "drashya.patel1@dcmail.ca",
        subject: `[Contact Form] ${subject}`,
        text: `
      Hello Drashya,
      
      You've just received a new message via your website's contact form! Here's what they have to say:
      
      👤 **Name:** ${name}  
      📞 **Phone:** ${phone}  
      📧 **Email:** ${email}  
      
      💬 **Message:**  
      "${message}"
      
      ---
      
      Take your time to review and respond. Remember, every message is a chance to connect and make an impact!
      
      Best regards,  
      Your Trusty Contact Form Bot from Technopixel. 🤖
      `,
      };

    await sgMail.sendMultiple(msg);

    return {
      statusCode: 200,
      // body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email." }),
    };
  }
};