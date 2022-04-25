const{Schema,model}=require("mongoose");
 
constuserSchema=newSchema(
  { 
    userName: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String
    },
    role: {
      type: String,
      enum: ['ADMIN','TRAINER','LEADER'],
      default: 'TRAINER'
    },
    img: {
      type: string,     
      default: 'URL'  //----- some URL------//
    },
    pokemons:[{
      type: Schema.Types.ObjectId,
      ref: 'pokeapi'   //no sabemos meter los datos de la api aqui//
    }],  
    events:[{
      type: Schema.Types.ObjectId,
      ref:"events"
    }],
   amigos:[{
      type: Schema.Types.ObjectId,
      ref:"usuario"
    }],
  },
  {
    timestamps: true,
  }
);
constUser=model("User",userSchema);
 
module.exports=User