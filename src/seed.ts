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
      {
        username: "Daniel",
        email: "daniel@example.com",
        password: "123",
        imgUrl: "Daniel.jpeg",
      },
      {
        username: "Omer",
        email: "omer@example.com",
        password: "123",
        imgUrl: "Omer.jpeg",
      },
      {
        username: "Dima",
        email: "dima@example.com",
        password: "123",
        imgUrl: "Dima.jpeg",
      },
      { username: "david", email: "david@example.com", password: "password4" },
      { username: "eva", email: "eva@example.com", password: "password5" },
      { username: "frank", email: "frank@example.com", password: "password6" },
      { username: "grace", email: "grace@example.com", password: "password7" },
      { username: "henry", email: "henry@example.com", password: "password8" },
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
        address: "123 Rothschild Blvd",
        city: "Tel Aviv",
        district: "Center District",
      },
      {
        name: "Healthy Eats",
        description: "Nutritious and delicious meals delivered to your door.",
        imageUrl: "Business1.jpg",
        address: "456 Dizengoff St",
        city: "Tel Aviv",
        district: "Center District",
      },
      {
        name: "Digital Innovations",
        description: "Cutting-edge digital products and services.",
        imageUrl: "Business2.jpg",
        address: "789 Jaffa Rd",
        city: "Jerusalem",
        district: "Jerusalem District",
      },
      {
        name: "Speedy Phone Repair",
        description: "Quick and reliable smartphone repair service.",
        imageUrl: "Business3.jpg",
        address: "101 Herzl St",
        city: "Haifa",
        district: "Haifa District",
      },
      {
        name: "Green Thumb Gardening",
        description: "Expert gardening services and plant care.",
        imageUrl: "Business4.jpg",
        address: "202 Weizmann St",
        city: "Rehovot",
        district: "Center District",
      },
      {
        name: "Fitness First",
        description: "State-of-the-art gym and personal training.",
        imageUrl: "Business5.webp",
        address: "303 Begin Blvd",
        city: "Be'er Sheva",
        district: "Southern District",
      },
      {
        name: "Cozy Cafe",
        description: "Artisanal coffee and homemade pastries.",
        imageUrl: "Business6.jpg",
        address: "404 Ben Yehuda St",
        city: "Tel Aviv",
        district: "Center District",
      },
      {
        name: "Pet Paradise",
        description: "Premium pet supplies and grooming services.",
        imageUrl: "Business7.jpg",
        address: "505 Arlozorov St",
        city: "Ramat Gan",
        district: "Tel Aviv District",
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
        content: "Cutting-edge products that really improved our workflow.",
        business: createdBusinesses[2]._id,
        user: createdUsers[2]._id,
      },
      {
        content: "Fixed my phone in no time. Great service!",
        business: createdBusinesses[3]._id,
        user: createdUsers[3]._id,
      },
      {
        content: "They transformed my garden into a beautiful oasis.",
        business: createdBusinesses[4]._id,
        user: createdUsers[4]._id,
      },
      {
        content: "Best gym in town with top-notch equipment.",
        business: createdBusinesses[5]._id,
        user: createdUsers[5]._id,
      },
      {
        content: "The coffee here is to die for! Lovely atmosphere too.",
        business: createdBusinesses[6]._id,
        user: createdUsers[6]._id,
      },
      {
        content: "Great selection of pet supplies and friendly staff.",
        business: createdBusinesses[7]._id,
        user: createdUsers[7]._id,
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
        content: "Their latest software update is a game-changer.",
        business: createdBusinesses[2]._id,
        user: createdUsers[3]._id,
      },
      {
        content: "Quick, affordable, and high-quality phone repairs.",
        business: createdBusinesses[3]._id,
        user: createdUsers[4]._id,
      },
      {
        content: "The team at Green Thumb really knows their plants!",
        business: createdBusinesses[4]._id,
        user: createdUsers[5]._id,
      },
      {
        content: "Great variety of classes and motivating trainers.",
        business: createdBusinesses[5]._id,
        user: createdUsers[6]._id,
      },
      {
        content: "The pastries are always fresh and delicious.",
        business: createdBusinesses[6]._id,
        user: createdUsers[7]._id,
      },
      {
        content: "My pets love the toys from Pet Paradise!",
        business: createdBusinesses[7]._id,
        user: createdUsers[0]._id,
      },
    ];

    const createdReviews = await Review.insertMany(reviews);

    // Creating Likes and updating Review likes count
    const likes = [
      { review: createdReviews[0]._id, user: createdUsers[1]._id },
      { review: createdReviews[1]._id, user: createdUsers[2]._id },
      { review: createdReviews[2]._id, user: createdUsers[3]._id },
      { review: createdReviews[3]._id, user: createdUsers[4]._id },
      { review: createdReviews[4]._id, user: createdUsers[5]._id },
      { review: createdReviews[5]._id, user: createdUsers[6]._id },
      { review: createdReviews[6]._id, user: createdUsers[7]._id },
      { review: createdReviews[7]._id, user: createdUsers[0]._id },
      { review: createdReviews[8]._id, user: createdUsers[1]._id },
      { review: createdReviews[9]._id, user: createdUsers[2]._id },
      { review: createdReviews[10]._id, user: createdUsers[3]._id },
      { review: createdReviews[11]._id, user: createdUsers[4]._id },
      { review: createdReviews[12]._id, user: createdUsers[5]._id },
      { review: createdReviews[13]._id, user: createdUsers[6]._id },
      { review: createdReviews[14]._id, user: createdUsers[7]._id },
      { review: createdReviews[15]._id, user: createdUsers[0]._id },
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
