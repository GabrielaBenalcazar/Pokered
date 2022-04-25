const{Schema,model
}=require("mongoose");
 
Const
eventSchema = newSchema(
  {
    eventname: {
      type: String,
      trim: true,
      required: true,
 
          },
    details: {
      type: String,
      required: true,
      
    },
    Location: {
      type: String
    },
 
    participant: [{
      type: Schema.Types.ObjectId,
          }],
 
    img: {
      type: string,     
      default: 'URL'//----- some URL------//
    },
 
    pokemons:[{
      type: Schema.Types.ObjectId,
      ref:  'poke API'//no sabemos meter los datos de la api aqui//)
    }],
  },
 
  {
    timestamps: true,
  }
);
 
const Event =model("Event",eventSchema);
 
module.exports= Event