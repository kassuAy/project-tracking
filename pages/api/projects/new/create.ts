import { NextApiRequest, NextApiResponse } from 'next';
import connectToMongoDB from '../../../../lib/mongodb';
import Project from '../../../../models/projects';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { project_title, description, academic_year, demo_image, file } =
    req.body;

  await connectToMongoDB();

  const newProject = new Project({
    project_title,
    description,
    academic_year,
    demo_image,
    file: {
      data: Buffer.from(file.buffer),
      contentType: file.type,
    },
  });

  try {
    await newProject.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to save project' });
  }
}

// import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import Project, { ProjectDocument} from "../../../../models/projects";
// import connectToMongoDB from "../../../../lib/mongoconnect";
// import formidable from "formidable";
// import fs from 'fs'
// // import path from "path";

// const config = {
//   api: {
//     bodyParser: false
//   }
// }

// export default async function uploadHandler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     res.status(405).end(); // Method Not Allowed
//     return;
//   }

//   const form = new formidable.IncomingForm();

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       res.status(400).json({ error: 'Failed to parse form data' });
//       return;
//     }

//     const projectData: Partial<ProjectDocument> = {
//       projectTitle: fields.projectTitle as string,
//       description: fields.description as string,
//       academicYear: parseInt(fields.academicYear as string, 10),
//     };

//     // Move the uploaded files to a desired location (e.g., /public/uploads)
//     const imageFile = files.image as formidable.File;
//     const pdfFile = files.pdf as formidable.File;

//     const imageFilename = imageFile.name;
//     const pdfFilename = pdfFile.name;

//     const imageFilePath = `/public/uploads/${imageFilename}`;
//     const pdfFilePath = `/public/uploads/${pdfFilename}`;

//     // Save the project data to MongoDB
//     try {
//       await connectToMongoDB();
//       const project = await Project.create({
//         ...projectData,
//         image: imageFilePath,
//         pdf: pdfFilePath,
//       });

//       // Move the files to the desired location
//       fs.renameSync(imageFile.path, `.${imageFilePath}`);
//       fs.renameSync(pdfFile.path, `.${pdfFilePath}`);

//       res.status(200).json({ message: 'Project uploaded successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to upload project' });
//     }
//   });
// }











// const mongoDB_URI = process.env.MONGODB_URI
// const conn = mongoose.createConnection(mongoDB_URI, { serverSelectionTimeoutMS: 30000, });

// let gfs
// conn.once('open', () => {
//   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: 'uploads' // Name of the bucket where the files will be stored
//   });
// });

// const storage = new GridFsStorage({
//   url: mongoDB_URI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       const extension = path.extname(file.originalname);
//       const filename = `${uniqueSuffix}${extension}`;

//       const fileInfo = {
//         filename: filename,
//         bucketName: 'uploads' // Same as the bucketName above
//       };

//       resolve(fileInfo);
//     });
//   }
// });

// const upload = multer({ storage })

// const  handler: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) =>{

//     try {
//       upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }])(req, res, (err: any) => {
//         if (err) {
//           return res.status(400).json({ error: err.message });
//         }

//         const { projectTitle, description, academicYear } = req.body;

//         const imageFileName = req.files['image'][0].filename;
//         const pdfFileName = req.files['pdf'][0].filename;

//         const project: ProjectDocument = Project.create(
//           {
//           projectTitle,
//           description,
//           academicYear,
//           image: imageFileName,
//           pdf: pdfFileName
//           },
//           {
//             maxTimeMs: 30000
//           }
//         );

//         return res.status(200).json({ message: 'Project uploaded successfully', project });
//       });

//     }catch(error){
//       return res.status(500).json({ error: error.message });
//     }

// }

// // const uploadMiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }])
// export default handler;

// export { config }