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
      {
        username: "david",
        email: "david@example.com",
        password: "password4",
        imgUrl: "userPlaceHolder.avif",
      },
      {
        username: "eva",
        email: "eva@example.com",
        password: "password5",
        imgUrl: "userPlaceHolder.avif",
      },
      {
        username: "frank",
        email: "frank@example.com",
        password: "password6",
        imgUrl: "userPlaceHolder.avif",
      },
      {
        username: "grace",
        email: "grace@example.com",
        password: "password7",
        imgUrl: "userPlaceHolder.avif",
      },
      {
        username: "henry",
        email: "henry@example.com",
        password: "password8",
        imgUrl: "userPlaceHolder.avif",
      },
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
        category: "Technology",
      },
      {
        name: "Healthy Eats",
        description: "Nutritious and delicious meals delivered to your door.",
        imageUrl: "Business1.jpg",
        address: "456 Dizengoff St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Food",
      },
      {
        name: "Digital Innovations",
        description: "Cutting-edge digital products and services.",
        imageUrl: "Business2.jpg",
        address: "789 Jaffa Rd",
        city: "Jerusalem",
        district: "Jerusalem District",
        category: "Technology",
      },
      {
        name: "Speedy Phone Repair",
        description: "Quick and reliable smartphone repair service.",
        imageUrl: "Business3.jpg",
        address: "101 Herzl St",
        city: "Haifa",
        district: "Haifa District",
        category: "Repair",
      },
      {
        name: "Green Thumb Gardening",
        description: "Expert gardening services and plant care.",
        imageUrl: "Business4.jpg",
        address: "202 Weizmann St",
        city: "Rehovot",
        district: "Center District",
        category: "Gardening",
      },
      {
        name: "Fitness First",
        description: "State-of-the-art gym and personal training.",
        imageUrl: "Business5.webp",
        address: "303 Begin Blvd",
        city: "Be'er Sheva",
        district: "Southern District",
        category: "Fitness",
      },
      {
        name: "Cozy Cafe",
        description: "Artisanal coffee and homemade pastries.",
        imageUrl: "Business6.jpg",
        address: "404 Ben Yehuda St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Cafe",
      },
      {
        name: "Pet Paradise",
        description: "Premium pet supplies and grooming services.",
        imageUrl: "Business7.jpg",
        address: "505 Arlozorov St",
        city: "Ramat Gan",
        district: "Tel Aviv District",
        category: "Pet Supplies",
      },
      {
        name: "The Book Nook",
        description: "A cozy spot for book lovers.",
        address: "606 Allenby St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Bookstore",
      },
      {
        name: "Modern Art Gallery",
        description: "Showcasing contemporary art.",
        address: "707 Dizengoff St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Art Gallery",
      },
      {
        name: "Gadget World",
        description: "Latest tech gadgets and accessories.",
        address: "808 Rothschild Blvd",
        city: "Tel Aviv",
        district: "Center District",
        category: "Technology",
      },
      {
        name: "Fashion Forward",
        description: "Trendy clothing and accessories.",
        address: "909 Ben Yehuda St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Fashion",
      },
      {
        name: "Baking Bliss",
        description: "Delicious cakes and baked goods.",
        address: "1010 Bialik St",
        city: "Ramat Gan",
        district: "Tel Aviv District",
        category: "Bakery",
      },
      {
        name: "Tech Haven",
        description: "Your one-stop tech shop.",
        address: "1111 Weizmann St",
        city: "Rehovot",
        district: "Center District",
        category: "Technology",
      },
      {
        name: "Artisan Jewelry",
        description: "Handcrafted jewelry for every occasion.",
        address: "1212 King George St",
        city: "Jerusalem",
        district: "Jerusalem District",
        category: "Jewelry",
      },
      {
        name: "Quick Fix Repairs",
        description: "Reliable repair services for all your needs.",
        address: "1313 Herzl St",
        city: "Haifa",
        district: "Haifa District",
        category: "Repair",
      },
      {
        name: "Garden Delights",
        description: "Everything you need for a beautiful garden.",
        address: "1414 Jaffa Rd",
        city: "Jerusalem",
        district: "Jerusalem District",
        category: "Gardening",
      },
      {
        name: "Fit and Fab",
        description: "Fitness equipment and supplements.",
        address: "1515 Dizengoff St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Fitness",
      },
      {
        name: "Caffeine Dreams",
        description: "Your daily dose of caffeine.",
        address: "1616 Allenby St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Cafe",
      },
      {
        name: "Pet Pals",
        description: "Everything your pet needs.",
        address: "1717 Arlozorov St",
        city: "Ramat Gan",
        district: "Tel Aviv District",
        category: "Pet Supplies",
      },
      {
        name: "Smart Home Solutions",
        description: "Smart devices for a smarter home.",
        address: "1818 Begin Blvd",
        city: "Be'er Sheva",
        district: "Southern District",
        category: "Technology",
      },
      {
        name: "Organic Eats",
        description: "Organic and healthy food options.",
        address: "1919 Rothschild Blvd",
        city: "Tel Aviv",
        district: "Center District",
        category: "Food",
      },
      {
        name: "Urban Outfitters",
        description: "Trendy fashion for the urban lifestyle.",
        address: "2020 Dizengoff St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Fashion",
      },
      {
        name: "Elegant Interiors",
        description: "Stylish furniture and home decor.",
        address: "2121 Weizmann St",
        city: "Rehovot",
        district: "Center District",
        category: "Home Decor",
      },
      {
        name: "Healthy Life",
        description: "Supplements and health products.",
        address: "2222 Bialik St",
        city: "Ramat Gan",
        district: "Tel Aviv District",
        category: "Health",
      },
      {
        name: "Tech Emporium",
        description: "A wide range of tech products.",
        address: "2323 Ben Yehuda St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Technology",
      },
      {
        name: "Fresh Flowers",
        description: "Beautiful bouquets and floral arrangements.",
        address: "2424 King George St",
        city: "Jerusalem",
        district: "Jerusalem District",
        category: "Florist",
      },
      {
        name: "Crafty Creations",
        description: "Handmade crafts and gifts.",
        address: "2525 Herzl St",
        city: "Haifa",
        district: "Haifa District",
        category: "Crafts",
      },
      {
        name: "Gourmet Grocer",
        description: "Fine foods and gourmet groceries.",
        address: "2626 Jaffa Rd",
        city: "Jerusalem",
        district: "Jerusalem District",
        category: "Grocery",
      },
      {
        name: "Active Sports",
        description: "Sporting goods and equipment.",
        address: "2727 Dizengoff St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Sports",
      },
      {
        name: "Beauty Bliss",
        description: "Skincare and beauty products.",

        address: "2828 Allenby St",
        city: "Tel Aviv",
        district: "Center District",
        category: "Beauty",
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
