import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  project_title: String,
  description: String,
  academic_year: String,
  demo_image: String,
  file: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

// import { Schema, models, model, Model, Document} from "mongoose";

// export interface ProjectDocument extends Document {
//   projectTitle: string;
//   description: string;
//   academicYear: number;
//   image: string;
//   pdf: string;
// }

// const projectSchema = new Schema<ProjectDocument>(
//   {
//     projectTitle: {
//       type: String,
//       required: true
//     },
//     description: {
//       type: String,
//       required: true
//     },
//     academicYear: {
//       type: Number,
//       required: true
//     },
//     image: {
//       type: String,
//       required: true
//     },
//     pdf: {
//       type: String,
//       required: true
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// const Project: Model<ProjectDocument> = models.Project || model<ProjectDocument>('Project', projectSchema);
// export default Project