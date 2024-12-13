
const contentful = require("contentful");
const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");
require('dotenv').config();

// fetch all entries, handling pagination
async function fetchAllEntries(client, contentType) {
    const limit = 100; // max allowed
    let skip = 0; 
    let totalEntries = []; // store it
    let moreEntries = true; //to check if more entries need to be fetched

    while (moreEntries) {
        const response = await client.getEntries({
            content_type: contentType,
            limit: limit,
            skip: skip
        });

        totalEntries = [...totalEntries, ...response.items]; 
        skip += limit;
        moreEntries = skip < response.total;
    }

    return totalEntries;
}

module.exports = function(eleventyConfig) {
    const client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE_ID, //Contentful space id
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,  //Contentful access token
    });

    const md = new markdownIt();
    eleventyConfig.addGlobalData("markdownIt", md);
    
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addWatchTarget("./src/css/");

    // Delete the output directory before each build
    eleventyConfig.on("eleventy.before", async ({ dir }) => {
        const outputDir = path.resolve(__dirname, dir.output);
        if (fs.existsSync(outputDir)) {
            console.log(`Deleting folder: ${outputDir}`);
            fs.rmSync(outputDir, { recursive: true, force: true });
        } else {
            console.log(`Folder not found: ${outputDir}`);
        }
    });

    // Handle 404 errors
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, browserSync) {
                const content404 = fs.readFileSync("404.html");
                browserSync.addMiddleware("*", (req, res) => {
                    res.write(content404);
                    res.end();
                });
            }
        }
    });

    // Fetch Blog data from Contentful
    eleventyConfig.addGlobalData("blogData", async () => {
        try {
            const entries = await client.getEntries({
                content_type: "writeupBlog",
            });

            return entries.items.map((entry) => ({
                title: entry.fields.title,
                slug: entry.fields.slug,
                layout: entry.fields.layout,
                body: entry.fields.body,
                publishDate: entry.fields.publishDate,
                tags: entry.fields.tags || [],
                author: entry.fields.author,
                images: entry.fields.images?.map((img) => img.fields.file.url) || [],
                backgroundImage: entry.fields.backgroundImage?.fields.file.url || null,
            }));
        } catch (error) {   
            console.error("Error fetching data from Contentful:", error);
            return [];
        }
    });

    eleventyConfig.addGlobalData("projectData", async () => {
        try {
            const entries = await client.getEntries({
                content_type: "projects",
            });

            return entries.items.map((entry) => ({
                title: entry.fields.title,
                slug: entry.fields.slug,
                layout: entry.fields.layout,
                body: entry.fields.body,
                publishDate: entry.fields.publishDate,
                tags: entry.fields.tags || [],
                author: entry.fields.author,
                images: entry.fields.images?.map((img) => img.fields.file.url) || [],
                backgroundImage: entry.fields.backgroundImage?.fields.file.url || null,
            }));
        } catch (error) {   
            console.error("Error fetching data from Contentful:", error);
            return [];
        }
    });

    // Fetch Car data from Contentful
    eleventyConfig.addGlobalData("carsData", async () => {
        try {
            const allCars = await fetchAllEntries(client, "cars"); 
            return allCars.map((entry) => ({
                name: entry.fields.name,
                model: entry.fields.model,
                year: entry.fields.year,
                vinno: entry.fields.vinno,
            }));
        } catch (error) {
            console.error("Error fetching car data from Contentful:", error);
            return [];
        }
    });

    return {
        
        dir: {
            output: "dist",
            input: "src"
        },
        templateFormats: ["md", "ejs"],
        htmlTemplateEngine: "ejs",
        dataTemplateEngine: "ejs"
    };
};

    


































































































































































































































































































    // eleventyConfig.addCollection("carYears", async () => {
    //     const cars = await eleventyConfig.globalData.carsData();
    //     const years = [...new Set(cars.map(car => car.year))].sort((a, b) => a - b);
    //     return years;
    // });

    // eleventyConfig.addCollection("carsByYear", async () => {
    //     const cars = await eleventyConfig.globalData.carsData();
    //     if (!cars) return {};
    
    //     return cars.reduce((acc, car) => {
    //         if (!acc[car.year]) {
    //             acc[car.year] = [];
    //         }
    //         acc[car.year].push(car);
    //         return acc;
    //     }, {});
    // });






// 
// const contentful = require("contentful");
// const fs = require("fs");
// const path = require("path");
// const markdownIt = require("markdown-it");



// module.exports = function (eleventyConfig) {
//     const client = contentful.createClient({
//         space: "79zsydyqh9gk", 
//         accessToken: "95T_9zM2VfEGeFlLmhIYT74g4JkL0nAriS7mOx7PIQY", 
//     });

//     const md = new markdownIt();
//     eleventyConfig.addGlobalData("markdownIt", md);

//     eleventyConfig.addPassthroughCopy("src/css");
//     eleventyConfig.addPassthroughCopy("src/img");
//     eleventyConfig.addWatchTarget("./src/css/");

//     // Delete the output directory before each build
//     eleventyConfig.on("eleventy.before", async ({ dir }) => {
//         const outputDir = path.resolve(__dirname, dir.output);
//         if (fs.existsSync(outputDir)) {
//             console.log(`Deleting folder: ${outputDir}`);
//             fs.rmSync(outputDir, { recursive: true, force: true });
//         } else {
//             console.log(`Folder not found: ${outputDir}`);
//         }
//     });

//     // Handle 404 errors
//     eleventyConfig.setBrowserSyncConfig({
//         callbacks: {
//             ready: function (err, browserSync) {
//                 const content404 = fs.readFileSync("404.html");
//                 browserSync.addMiddleware("*", (req, res) => {
//                     res.write(content404);
//                     res.end();
//                 });
//             },
//         },
//     });

//     // Fetch Blog data from Contentful
//     eleventyConfig.addGlobalData("blogData", async () => {
//         try {
//             const entries = await client.getEntries({
//                 content_type: "writeupBlog",
//             });

//             return entries.items.map((entry) => ({
//                 title: entry.fields.title,
//                 slug: entry.fields.slug,
//                 layout: entry.fields.layout,
//                 body: entry.fields.body,
//                 publishDate: entry.fields.publishDate,
//                 tags: entry.fields.tags || [],
//                 author: entry.fields.author,
//                 images: entry.fields.images?.map((img) => img.fields.file.url) || [],
//                 backgroundImage: entry.fields.backgroundImage?.fields.file.url || null,
//             }));
//         } catch (error) {
//             console.error("Error fetching blog data from Contentful:", error);
//             return [];
//         }
//     });

//     // Fetch Car data from Contentful
    // eleventyConfig.addGlobalData("carsData", async () => {
    //     try {
    //         const allCars = await fetchAllEntries(client, "cars"); 
    //         return allCars.map((entry) => ({
    //             name: entry.fields.name,
    //             model: entry.fields.model,
    //             year: entry.fields.year,
    //             vinno: entry.fields.vinno,
    //         }));
    //     } catch (error) {
    //         console.error("Error fetching car data from Contentful:", error);
    //         return [];
    //     }
    // });

//     return {
//         dir: {
//             output: "dist",
//             input: "src",
//         },
//         templateFormats: ["md", "ejs"],
//         htmlTemplateEngine: "ejs",
//         dataTemplateEngine: "ejs",
//     };
// };

    