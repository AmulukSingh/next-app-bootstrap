export interface AmazonFile {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  uploadDate: string;
  projectId: string;
  category: string;
  description?: string;
}

// Mock data - In production, replace with actual AWS S3 API calls
const mockFiles: AmazonFile[] = [
  {
    id: '1',
    filename: 'project-wireframes.pdf',
    url: 'https://placehold.co/400x300?text=Project+Wireframes+PDF+Document',
    size: 2048576, // 2MB
    type: 'application/pdf',
    uploadDate: '2024-12-15',
    projectId: '1',
    category: 'Design',
    description: 'Initial wireframes for website redesign'
  },
  {
    id: '2',
    filename: 'final-mockups.zip',
    url: 'https://placehold.co/400x300?text=Final+Mockups+ZIP+Archive',
    size: 15728640, // 15MB
    type: 'application/zip',
    uploadDate: '2024-12-18',
    projectId: '1',
    category: 'Design',
    description: 'Final UI mockups and assets'
  },
  {
    id: '3',
    filename: 'app-prototype.mp4',
    url: 'https://placehold.co/400x300?text=App+Prototype+Video+Demo',
    size: 52428800, // 50MB
    type: 'video/mp4',
    uploadDate: '2024-12-20',
    projectId: '2',
    category: 'Prototype',
    description: 'Interactive app prototype demonstration'
  }
];

export async function fetchProjectFiles(projectId: string): Promise<AmazonFile[]> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In production, make actual API call to AWS S3
    // const AWS = require('aws-sdk');
    // const s3 = new AWS.S3({
    //   accessKeyId: process.env.AMAZON_ACCESS_KEY,
    //   secretAccessKey: process.env.AMAZON_SECRET_KEY,
    //   region: process.env.AMAZON_REGION
    // });
    // 
    // const params = {
    //   Bucket: process.env.AMAZON_BUCKET,
    //   Prefix: `projects/${projectId}/`
    // };
    // 
    // const data = await s3.listObjectsV2(params).promise();
    // return data.Contents.map(file => ({...}));
    
    const projectFiles = mockFiles.filter(file => file.projectId === projectId);
    return projectFiles;
  } catch (error) {
    console.error('Error fetching files from Amazon S3:', error);
    throw new Error('Failed to fetch project files');
  }
}

export async function generateFileDownloadUrl(fileId: string): Promise<string> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const file = mockFiles.find(f => f.id === fileId);
    if (!file) {
      throw new Error('File not found');
    }
    
    // In production, generate signed URL for secure download
    // const params = {
    //   Bucket: process.env.AMAZON_BUCKET,
    //   Key: file.filename,
    //   Expires: 3600 // URL expires in 1 hour
    // };
    // 
    // const signedUrl = s3.getSignedUrl('getObject', params);
    // return signedUrl;
    
    return file.url;
  } catch (error) {
    console.error('Error generating download URL:', error);
    throw new Error('Failed to generate download URL');
  }
}

export async function uploadFile(
  file: File, 
  projectId: string, 
  category: string,
  description?: string
): Promise<AmazonFile> {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In production, upload file to AWS S3
    // const params = {
    //   Bucket: process.env.AMAZON_BUCKET,
    //   Key: `projects/${projectId}/${file.name}`,
    //   Body: file,
    //   ContentType: file.type
    // };
    // 
    // const result = await s3.upload(params).promise();
    
    const newFile: AmazonFile = {
      id: Date.now().toString(),
      filename: file.name,
      url: `https://placehold.co/400x300?text=${encodeURIComponent(file.name)}`,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString().split('T')[0],
      projectId,
      category,
      description
    };
    
    mockFiles.push(newFile);
    return newFile;
  } catch (error) {
    console.error('Error uploading file to Amazon S3:', error);
    throw new Error('Failed to upload file');
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileIcon(type: string): string {
  if (type.includes('pdf')) return '📄';
  if (type.includes('image')) return '🖼️';
  if (type.includes('video')) return '🎥';
  if (type.includes('audio')) return '🎵';
  if (type.includes('zip') || type.includes('rar')) return '📦';
  if (type.includes('text') || type.includes('document')) return '📝';
  return '📁';
}
