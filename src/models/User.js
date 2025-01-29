import mongoose from "mongoose";

const SiblingsSchema = new mongoose.Schema({
  brothers: {
    older: {
      married: { type: Number, default: 0 },
      unmarried: { type: Number, default: 0 },
    },
    younger: {
      married: { type: Number, default: 0 },
      unmarried: { type: Number, default: 0 },
    },
  },
  sisters: {
    older: {
      married: { type: Number, default: 0 },
      unmarried: { type: Number, default: 0 },
    },
    younger: {
      married: { type: Number, default: 0 },
      unmarried: { type: Number, default: 0 },
    },
  },
  paternals: [{
    uncle: [
      {
        name: { type: String,  } ,

        spouseName: { type: String,  } 
      }
    ],
    aunt: [
      {
        name: { type: String,  } ,

        spouseName: { type: String,  } 
      }
    ]  
  }],
  maternals: [{
    uncle: [
      {
        name: { type: String,  } ,

        spouseName: { type: String,  } 
      }
    ],
    aunt: [
      {
        name: { type: String,  } ,

        spouseName: { type: String,  } 
      }
    ]  
  }]
});

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    mobile: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 18 },
    dob: { type: Date, required: true },
    caste: { type: String, required: true },
    subCaste: { type: String, required: true },
    motherSubCaste: { type: String, required: true },
    qualification: { type: String, required: true },
    occupation: { type: String, required: true },
    manglik: { type: String, enum: ["Yes", "No"], default: "No" },
    divyang: { type: String, enum: ["Yes", "No"], default: "No" },
    siblings: { type: SiblingsSchema },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    agree: { type: Boolean, required: true, default: false },
    profilePic: { type: String, required: true },
    wishlist: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isMutual: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
