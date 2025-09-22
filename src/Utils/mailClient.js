import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: "kamadibhavani16@gmail.com",
    pass: "lxvzhtbeksewajth",
  },
});

export const sendEmail = async ({ to, cc, subject, text, html, from }) => {
  const mailOptions = {
    from: from || "kamadibahavani16@gmail.com",
    cc,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
