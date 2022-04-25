const{Schema,model}=require("mongoose");
 
Const
gymSchema = newSchema(
  {
    gymName: {
      type: String,
      trim: true,
      required: true,
 
          },
    details: {
      type: String,
      required: true,
      
    },
 
    location: {
      type: String
    },
 
    leader: {
      type: Schema.Types.ObjectId,
      ref: User
          },
 
    img: {
      type: string,     
      default: 'URL'//----- some URL------//
    },
  },
 
  {
    timestamps: true,
  }
);
 
const Gym = model("Gym",eventSchema);
 
module.exports= Gym