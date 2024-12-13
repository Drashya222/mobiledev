---
title: ReadMe :)
layout: layouts/default.ejs
---

### **_ReadMe before instructions to proceed on my blog_**

---

### **Lab-1: Blog using SSG | Assignment-1: Static Site Project | Lab-2: Exploring and Researching the technologies of CMS | Assignment-2: Implementation Contentful CMS in Website | Lab-3: Contrast between different serveless functions as well as different mailing services. | Assignment-3: Using Netlify and SendGrid, creating a dynamic Contact Form by implementing severless function.**

---

## **_Project Overview_**

This project is built using **Eleventy (11ty)**, a flexible static site generator. The purpose of the assignment is to demonstrate an understanding of modern web development practices by building a fully functional static website that leverages templates, front matter, pagination, and dynamic content generation from **Contentful CMS**.

The theme chosen for this project is a **Car Information Site**, showcasing various car models, their unique attributes, and relevant details. Additionally, the project includes **blog functionality**, exploring CMS technologies, and other content pages like **About Me** and **Terms and Conditions**.

---

## **_Key Features of the Project_**

1. **Template Engine**: 
   - Used **EJS** (Embedded JavaScript templates) to create layouts, partials, and templates.
   
2. **Pagination**: 
   - Implemented pagination for the **Car List page** using data fetched from **Contentful CMS**. Each page displays a limited number of car entries with Bootstrap-based navigation.

3. **Dynamic Car Cards**: 
   - Car data is dynamically generated from **Contentful CMS** and displayed as visually appealing cards. Each card contains:
     - Car Name
     - Model
     - Year
     - VIN Number

4. **Blog Functionality**:
   - Created a blog section to showcase research and thoughts on **static site generators (SSG)** and **content management systems (CMS)**.
   - Individual blog pages include metadata, such as the title, date, and author name.

5. **CMS Integration**:
   - Integrated **Contentful** to fetch and display both car and blog data dynamically.
   - Used **API calls** to retrieve content stored in Contentful and display it seamlessly on the website.

6. **Bootstrap Integration**: 
   - Used **Bootstrap** for styling and layout, ensuring a responsive and mobile-friendly design.

7. **Netlify Integration**: 
   - The website is deployed on **Netlify**, enabling continuous deployment with **GitHub** integration. Any updates to the GitHub repository automatically trigger a new build and deployment on Netlify.

8. **SendGrid Integration**: 
   - A **Contact Me** page was implemented, featuring a dynamic form that:
     - Submits data using JavaScript's `fetch` API to a **Netlify serverless function**.
     - The serverless function uses **SendGrid** to send an email with the form submission details to the creator and another recipient.
     - Displays dynamic success/error messages to users after submission.

9. **Content Pages**: 
   - The project features several content pages, including:
     - **About Me**: A page with personal details and a contact form.
     - **Terms and Conditions**: A page outlining the website's terms of use.
     - **404 Error Page**: Custom page for handling invalid routes.

10. **Additional Features**:
   - **Custom Tagging System**: Tags allow users to filter cars based on their attributes or categories.
   - **Search Functionality**: A simple search for finding cars by their name or attributes.

---

## **_Installation and Setup Instructions_**

Follow these steps to run the project locally:

### **Prerequisites**:
1. **Node.js**: Download and install from [Node.js](https://nodejs.org).
2. **Netlify CLI (Optional)**: Install the Netlify CLI for testing serverless functions locally:
   ```bash
   npm install -g netlify-cli
   ```

---

### **Steps**:

1. **Clone the Repository**:
   - Clone the project repository from GitHub:
     ```bash
     git clone https://github.com/Drashya222/Portfoliowithframeworks.git
     cd Portfoliowithframeworks
     ```

2. **Install Dependencies**:
   - Install the required dependencies for the project:
     ```bash
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory and add the following:
     ```env
     CONTENTFUL_SPACE_ID=your_contentful_space_id
     CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
     SENDGRID_API_KEY=your_sendgrid_api_key
     ```

4. **Run Eleventy Locally**:
   - Build and serve the site using:
     ```bash
     npx @11ty/eleventy --serve
     ```
   - The site will be accessible at `http://localhost:8080`.

5. **Test Netlify Serverless Functions (Optional)**:
   - If you want to test serverless functions locally, use the Netlify CLI:
     ```bash
     netlify dev
     ```
   - This command serves the site and runs serverless functions locally.

6. **Access the Project**:
   - Open your browser and navigate to `http://localhost:8080` to view the project.

---

## **_Navigating the Website_**

- **Home Page**: 
  - The homepage provides an overview of the labs, assignments, and project features.
  
- **Car List**: 
  - Displays car cards dynamically generated from **Contentful CMS** data, with paginated navigation.
  - Each car card contains the car's name, model, year, and VIN number.

- **Blog Section**: 
  - Features blog posts discussing static site generation, CMS technologies, and their implementation in this project.

- **Lab Pages**: 
  - Detailed writeups for:
    - **Lab-1**: Blog using SSG.
    - **Assignment-1**: Creating a static Car information site.
    - **Lab-2**: Researching and comparing CMS technologies (Ghost CMS and Contentful).
    - **Assignment-2**: Implementing Contentful CMS.

- **Contact Me**:
  - A dynamic contact form where users can submit their details. This triggers an email sent via **SendGrid**.

- **Terms and Conditions**: 
  - Outlines the website's terms of use.

---

## **_Contact Information_**

- **[LinkedIn](https://www.linkedin.com/in/drashyapatel)**
- **Email**: drashya.patel1@dcmail.ca
- **Microsoft Teams**: drashya.patel1@dcmail.ca
- **Discord Username**: heyitz_dp
- **[Instagram](https://www.instagram.com/callmedrashya/)**
