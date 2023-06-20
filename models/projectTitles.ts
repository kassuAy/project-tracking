import {
    Schema,
    models,
    model,
    Document,
    Model,
  } from 'mongoose';
  import { ITitle } from '../types';
  
  const TitleSchema = new Schema(
    {
      projectTitle: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        unique: true,
        required: true,
      },
    },
    { _id: false }
  );
  
  export interface TitleDocument extends Document {
    groupName: string;
    projects: any;
  }
  
  interface TitleDoc extends Document, ITitle {}
  interface TitleModel extends Model<TitleDoc> {}
  
  const projectTitleSchema = new Schema<TitleDocument>({
    groupName: {
      type: String,
      required: true,
      unique: true,
    },
    projects: {
      type: [TitleSchema],
      required: true,
      default: [],
    },
  });
  
  const ProjectList: TitleModel =
    models.ProjectList ||
    model<TitleDoc, TitleModel>('ProjectList', projectTitleSchema);
  export default ProjectList;