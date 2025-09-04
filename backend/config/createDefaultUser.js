const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function createDefaultUser() {
  try {
    // Παίρνουμε στοιχεία από .env ή βάζουμε default τιμές
    const email = process.env.DEFAULT_USER_EMAIL || "admin@example.com";
    const name = process.env.DEFAULT_USER_NAME || "Admin";
    const password = process.env.DEFAULT_USER_PASSWORD || "admin123";

    // Έλεγξε αν υπάρχει ήδη
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log(`ℹ️ Ο χρήστης "${email}" υπάρχει ήδη.`);
      return;
    }

    // Hash του password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Δημιουργία χρήστη
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(`✅ Δημιουργήθηκε ο default χρήστης: ${email}`);
  } catch (err) {
    console.error("❌ Σφάλμα δημιουργίας default χρήστη:", err.message);
  }
}

module.exports = createDefaultUser;
