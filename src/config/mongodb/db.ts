import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    // const URI = "mongodb+srv://Mararika:mararika13524@football-project.dbop8.mongodb.net/";
    const connOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions;
    const conn = await mongoose.connect(process.env.URI as string ?? "", connOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Unknown Error: ${error}`);
    }
    process.exit(1);
  }
};
