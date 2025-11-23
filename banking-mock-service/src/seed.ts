import User from "./models/User.js";

const sample = {
  clerk: {
    id: "user_35n5MPjm6HTLT3zsAB2drmbwmMi",
    email: "vikalpsh.10k.123@gmail.com",
    firstName: "Vikalp",
    lastName: "Sharma",
    image:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zNW41TVYxS09CQTV5bFRzUWM2VFRrajROM2wifQ",
  },
  db: {
    clerkId: "user_35n5MPjm6HTLT3zsAB2drmbwmMi",
    email: "vikalpsh.10k.123@gmail.com",
    firstName: "Vikalp",
    image:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zNW41TVYxS09CQTV5bFRzUWM2VFRrajROM2wifQ",
    lastName: "Sharma",
    role: "local",
    username: "vikalpother",
    balance: 5000,
  },
};

export const seedInitialUser = async () => {
  try {
    const existing = await User.findOne({ email: sample.db.email });
    if (existing) return existing;
    const user = await User.create({
      clerk: sample.clerk,
      clerkId: sample.db.clerkId,
      email: sample.db.email,
      firstName: sample.db.firstName,
      lastName: sample.db.lastName,
      image: sample.db.image,
      role: sample.db.role,
      username: sample.db.username,
      balance: sample.db.balance,
    });
    return user;
  } catch (error) {
    console.error("Seed error", error);
    throw error;
  }
};

export default seedInitialUser;
