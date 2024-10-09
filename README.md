# LinkedIn URL Scraper in n8n

## Overview
This project is designed to create an AI-powered agent that scrapes LinkedIn profiles based on specified parameters (job title, company industry, and location). By leveraging OpenAI's API and HTTP requests, this workflow retrieves LinkedIn profile URLs and stores them in a Google Sheet.

## Prerequisites
- An **n8n** instance set up and running.
- An **OpenAI** account with an API key.
- A **Google Sheets** account for storing scraped data.

## Workflow Setup

### 1. Create the Scraper Workflow

#### 1.1 Set Up Trigger
- Add a **Trigger Node** that is called by another workflow.

#### 1.2 Define Input Parameters
- Create an input structure (JSON) for the workflow:
  ```json
  {
    "jobTitle": "",
    "companyIndustry": "",
    "location": ""
  }
  ```

#### 1.3 Configure OpenAI Node
- Add an **OpenAI Node**:
  - Select **GPT-4** as the model.
  - Set the type to **System Prompt**.
  - In the message field, enter:
    ```
    Parse the JSON 'query' and output the following parameters separately:
    jobTitle
    companyIndustry
    location
    ```

#### 1.4 Set Up HTTP Request Node
- Add an **HTTP Request Node**:
  - Set the **Method** to **GET**.
  - In the **URL** field, enter the Google search URL pattern:
    ```
    https://www.google.com/search?q=site:linkedin.com/in/{{ $json.message.content.jobTitle }} {{ $json.message.content.companyIndustry }} {{ $json.message.content.location }}
    ```
  - Under the **Header** section, add:
    - **Name**: `User-Agent`
    - **Value**: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36`

#### 1.5 Configure Google Sheets Node
- Add a **Google Sheets Node** to store the scraped URLs.
- Configure OAuth credentials and select the target sheet.
- Edit the node to set the response field with the value as `done`.

### 2. Create the AI Agent

#### 2.1 Set Up Chat Message Node
- Select the **Chat Message Received Node**.

#### 2.2 Configure OpenAI Agent Node
- Choose the **OpenAI Agent**.
- In the chat model, select **GPT-4**.
- Keep the buffer memory set to default.

#### 2.3 Link the Scraper Tool
- Grab the **URL Scraper Node** created previously.

#### 2.4 Finalize the Setup
- Click on **Save**.
- Click on **Chat** and write the query.

## Usage
You can now trigger the AI agent with a query that includes the job title, company industry, and location. The agent will scrape LinkedIn for matching profiles and store the results in your Google Sheet.
