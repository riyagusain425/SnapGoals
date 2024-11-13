const cron = require('node-cron');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

cron.schedule('* * * * *', async () => {  // This runs every minute; adjust as needed
    const now = new Date();
    const tasks = await Task.find({ reminderDate: { $lte: now } });

    tasks.forEach(async (task) => {
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'user-email@example.com',  // Replace with the user's email
            subject: `Reminder for task: ${task.title}`,
            text: task.description
        };
        transporter.sendMail(mailOptions);
    });
});
