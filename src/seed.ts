import mongoose from "mongoose";
import Business from "./models/Business";
import Review from "./models/Review";
import Like from "./models/Like";
import User from "./models/User";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const seedDatabase = async () => {
  await connectDB();

  try {
    await User.deleteMany({});
    await Business.deleteMany({});
    await Review.deleteMany({});
    await Like.deleteMany({});

    console.log("Previous data cleared");
    // Creating Users
    const users = [
      { username: "alice", email: "alice@example.com", password: "password1" },
      { username: "bob", email: "bob@example.com", password: "password2" },
      {
        username: "charlie",
        email: "charlie@example.com",
        password: "password3",
      },
      { username: "david", email: "david@example.com", password: "password4" },
      { username: "eva", email: "eva@example.com", password: "password5" },
    ];

    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    const createdUsers = await User.insertMany(users);

    // Creating Businesses
    const businesses = [
      {
        name: "Tech Solutions",
        description: "Innovative tech solutions for modern problems.",
        imageUrl: "techSolutions.webp",
      },
      {
        name: "Healthy Eats",
        description: "Nutritious and delicious meals delivered to your door.",
      },
      {
        name: "Fitness World",
        description: "Your one-stop shop for all fitness needs.",
      },
      {
        name: "Book Haven",
        description: "A paradise for book lovers of all ages.",
      },
      {
        name: "Auto Experts",
        description: "Top-notch car repair and maintenance services.",
      },
    ];

    const createdBusinesses = await Business.insertMany(businesses);

    // Creating Reviews
    const reviews = [
      {
        content: "Amazing service and very helpful staff!",
        business: createdBusinesses[0]._id,
        user: createdUsers[0]._id,
      },
      {
        content: "The food was fresh and arrived on time. Highly recommend!",
        business: createdBusinesses[1]._id,
        user: createdUsers[1]._id,
      },
      {
        content: "Great place to work out with a wide variety of equipment.",
        business: createdBusinesses[2]._id,
        user: createdUsers[2]._id,
      },
      {
        content:
          "I found all the books I was looking for. Wonderful experience!",
        business: createdBusinesses[3]._id,
        user: createdUsers[3]._id,
      },
      {
        content: "They fixed my car quickly and at a reasonable price.",
        business: createdBusinesses[4]._id,
        user: createdUsers[4]._id,
      },
      {
        content:
          "The tech support was very knowledgeable and solved my problem fast.",
        business: createdBusinesses[0]._id,
        user: createdUsers[1]._id,
      },
      {
        content: "Healthy Eats has the best meal plans for my diet. Love it!",
        business: createdBusinesses[1]._id,
        user: createdUsers[2]._id,
      },
      {
        content:
          "Fitness World helped me achieve my fitness goals. Highly recommend!",
        business: createdBusinesses[2]._id,
        user: createdUsers[3]._id,
      },
      {
        content:
          "Book Haven has a great selection of books and friendly staff.",
        business: createdBusinesses[3]._id,
        user: createdUsers[4]._id,
      },
      {
        content: "Auto Experts provide excellent service every time.",
        business: createdBusinesses[4]._id,
        user: createdUsers[0]._id,
      },
    ];

    const createdReviews = await Review.insertMany(reviews);

    // Creating Likes and updating Review likes count
    const likes = [
      { review: createdReviews[0]._id, user: createdUsers[1]._id },
      { review: createdReviews[1]._id, user: createdUsers[0]._id },
      { review: createdReviews[2]._id, user: createdUsers[3]._id },
      { review: createdReviews[3]._id, user: createdUsers[2]._id },
      { review: createdReviews[4]._id, user: createdUsers[1]._id },
      { review: createdReviews[5]._id, user: createdUsers[3]._id },
      { review: createdReviews[6]._id, user: createdUsers[4]._id },
      { review: createdReviews[7]._id, user: createdUsers[0]._id },
      { review: createdReviews[8]._id, user: createdUsers[2]._id },
      { review: createdReviews[9]._id, user: createdUsers[4]._id },
    ];

    await Like.insertMany(likes);

    // Updating Review likes count
    for (const review of createdReviews) {
      const likesCount = await Like.countDocuments({ review: review._id });
      await Review.findByIdAndUpdate(review._id, { likes: likesCount });
    }

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
