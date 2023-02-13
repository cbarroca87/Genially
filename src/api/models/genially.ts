import { Schema, model} from 'mongoose';

export interface IUser {  
  name: string;
  description: string,
  createdAt: Date,
  modifiedAt: Date,
  deletedAt: Date,
};

export const GeniallySchema = new Schema<IUser>({  
  name: { type: String, required: [true, 'Name is mandatory'], },
  description: { type: String },
  createdAt: { type: Date },
  modifiedAt: { type: Date },
  deletedAt: { type: Date },
});

GeniallySchema.methods.toJSON = function(){
  const { __v, ...data } = this.toObject();    
  return data;
}

const Genially = model<IUser>('Genially', GeniallySchema);
export default Genially;
