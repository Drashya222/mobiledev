const contentful = require('contentful-management');
const fs = require('fs');
require('dotenv').config();


// Load your JSON data file
const data = JSON.parse(fs.readFileSync('./src/_data/car.json', 'utf8'));

// Contentful configuration
 const ENVIRONMENT_ID = 'master';
const CONTENT_TYPE_ID = 'cars'; 

// Create a Contentful client
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

// Function to create an entry
async function createAndPublishEntry(environment, entryData) {
  try {
    const entry = await environment.createEntry(CONTENT_TYPE_ID, {
      fields: {
        name: { 'en-US': entryData.name }, 
        model: { 'en-US': entryData.model },         
        year: { 'en-US': entryData.year },     
        vinno: { 'en-US': entryData.vinno },    
      },
    });
    console.log(`Entry created: ${entry.sys.id}`);

    const publishedEntry = await entry.publish();
    console.log(`Entry published: ${publishedEntry.sys.id}`);

  } catch (error) {
    console.error('Error creating or publishing entry:', error.message || error);
  }
}

// Main function to upload and publish data
async function uploadAndPublishData() {
  try {
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    for (const item of data) {
      await createAndPublishEntry(environment, item);
    }

    console.log('All entries created and published successfully.');
  } catch (error) {
    console.error('Error uploading and publishing data:', error.message || error);
  }
}

uploadAndPublishData();
