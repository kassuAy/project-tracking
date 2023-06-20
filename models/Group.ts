import { Schema,models,model, Document,Model} from 'mongoose'

import { IGroup } from '../types';

const G_memberSchema = new Schema({
    name: {
      type: String,
      required: true,
      valueOfminLength:[6," full name should be atleast 6 character long"],
      maxLength:[50, "fullname should be lessthan 50 characters "]

    },
    student_id: {
      type: String,
      unique:true,
      required: [true, "Id can't be empty"]
    }
  }, { _id: false });
  interface GroupDoc extends Document, IGroup {}

interface GroupModel extends Model<GroupDoc> {}
const groupSchema = new Schema({
    group_name:{
      type: String,
      required: true
    },
    students: {
      type: [G_memberSchema],
      required: true,
      default: []
    },
    batch:{
        type:String,
        required:true
    }
});
  
  
  const Group:GroupModel= models.Group || model<GroupDoc, GroupModel>('Group',groupSchema)
  
  export default Group;