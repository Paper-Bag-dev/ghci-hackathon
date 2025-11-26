import User from "./models/User.js";

const sample = {
  clerk: {
    id: "user_3610Ev5ykiDJspYkhkp4rDPmNiC",
    email: "vikalpsh.10k.123@gmail.com",
    firstName: "Vikalp",
    lastName: "Sharma",
    image:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zNW41TVYxS09CQTV5bFRzUWM2VFRrajROM2wifQ",
  },
  db: {
    clerkId: "user_3610Ev5ykiDJspYkhkp4rDPmNiC",
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

const sample2 = {
  clerk: {
    id: "user_360yQWw3EG5ijAmtaS8JiNzRGlu",
    email: "vikalpsh1234@gmail.com",
    firstName: "Vikalp",
    lastName: "Sharma",
    image:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zNW41TVYxS09CQTV5bFRzUWM2VFRrajROM2wifQ",
  },
  db: {
    clerkId: "user_360yQWw3EG5ijAmtaS8JiNzRGlu",
    email: "vikalpsh1234@gmail.com",
    firstName: "Vikalp",
    image:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zNW41TVYxS09CQTV5bFRzUWM2VFRrajROM2wifQ",
    lastName: "Sharma",
    role: "local",
    username: "vikalpmain",
    balance: 5000,
  },
};

export const seedInitialUser = async () => {
  try {
    const existing1 = await User.findOne({ email: sample.db.email });
    if (!existing1) {
      await User.create({
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
    }

    const existing2 = await User.findOne({ email: sample2.db.email });
    if (!existing2) {
      await User.create({
        clerk: sample2.clerk,
        clerkId: sample2.db.clerkId,
        email: sample2.db.email,
        firstName: sample2.db.firstName,
        lastName: sample2.db.lastName,
        image: sample2.db.image,
        role: sample2.db.role,
        username: sample2.db.username,
        balance: sample2.db.balance,
      });
    }

    return true;
  } catch (error) {
    console.error("Seed error", error);
  }
};

export default seedInitialUser;
