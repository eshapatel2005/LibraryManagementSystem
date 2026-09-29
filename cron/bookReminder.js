const cron = require("node-cron");
const Book = require("../models/book.model");
const { sendEmail } = require("../utils/mail.helper");

// Book Reminder Cron
cron.schedule("0 * * * *", async () => {
  try {
    // Find all issued books
    const books = await Book.find({
      isIssued: true,
      expiryDate: { $ne: null },
    }).populate("issuedTo", "name email");

    // Check each book
    for (const book of books) {
      const today = new Date();
      const expiryDate = new Date(book.expiryDate);

      // Remove time from dates
      today.setHours(0, 0, 0, 0);
      expiryDate.setHours(0, 0, 0, 0);

      // Calculate remaining days
      const difference = expiryDate.getTime() - today.getTime();

      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

      // Send email if book is not expired
      if (daysLeft >= 0) {
        const message = `
                    <h2>Book Return Reminder</h2>
                    <p>Hello ${book.issuedTo.name},</p>
                    <p>Your book<b>${book.title}</b>is due in<b>${daysLeft} day(s)</b>.</p>
                    <p>Please return the book before the expiry date.</p>
                `;

        const mailObj = {
          from: process.env.FROM_MAIL,
          to: book.issuedTo.email,
          subject: "Book Return Reminder",
          html: message,
        };

        await sendEmail(mailObj);
      }
    }
  } catch (error) {
    console.log("Book Reminder Failed");
    console.log(error.message);
  }
});
