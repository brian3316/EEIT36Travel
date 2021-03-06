// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function main(
    bucketName = 'eeit36travel',
    filePath = '/Users/bofu/Desktop/1.png',
    destFileName = 'file.png'
  ) {
    // [START storage_upload_file]
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // The ID of your GCS bucket
    // const bucketName = 'your-unique-bucket-name';
  
    // The path to your file to upload
    // const filePath = 'path/to/your/file';
  
    // The new ID for your GCS file
    // const destFileName = 'your-new-file-name';
  
    // Imports the Google Cloud client library
    /* const {Storage} = require('@google-cloud/storage'); */
  import Storage from '@google-cloud/storage'
    // Creates a client
    const storage = new Storage();
  
    async function uploadFile() {
      await storage.bucket(bucketName).upload(filePath, {
        destination: destFileName,
      });
  
      console.log(`${filePath} uploaded to ${bucketName}`);
    }
  
    uploadFile().catch(console.error);
    // [END storage_upload_file]
  }
  
  main(...process.argv.slice(2));