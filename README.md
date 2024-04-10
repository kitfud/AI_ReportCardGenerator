# <b>EduCare:</b> For All Your Teaching Needs 

## Summary
EduCare seeks to address some of the time crunches which happen thoughout the school year by the use of AI Enhanced productivity. Specifically, with tools that streamline report writing, lesson planning and the maitinence of individual wellbeing. 

## App Problem Statement
Throughout the school year there are many tasks which take up a great deal of time aside from classroom teaching. AI based, large language models (LLMs) provide a means of simplifying, improving and standardazing a great deal of this non-teaching realted workflow. In some cases, AI also provides a means of brainstorming and maintaining wellbeing through dialogue.

## EduCare? 
When the year begins and your teaching in the trenches it's on you to plan and be prepared. EduCare is an app which cares about the quality of your work (and teaching) by lessoning the burden of educational related tasks which are consistent across environments. 

Furthermore, EduCare also provides a means of conversating with an AI chatbot to unpack some of the daily stress and also brainstorm ideas for the classroom- as any good colleague would. 

<p align="center">
<img  width="50%" src="src/images/ReportGenerator.jpeg">
</p>


## EduCare App UX Features
- <ins>Report Generator:</ins> 
Generate reports/assesments for stuents based on an overall score. Log assignments optionally to provide more context for the AI model and use the slider to control the length of the comment. Enable the audio feature to have the comment read aloud, for proofreading purposes.
<br></br>
- <ins>Lesson Planner:</ins> 
Provide input data and get a lesson plan complete with learning goals, big ideas, material list and pacing guidelines. Optionally provide details about student's prior knowledge/learning on a topic to provide context for the AI model to build the lesson plan off of. When the lesson plan is created you can download an image of the file. 
<br></br>
- <ins>Constant Companion:</ins> 
Engage in a conversation with an AI chat bot primed to be a supportive school collegue. Ask for advice on lesson planning or unpack some of the behavioral management challenges with students. The chat bot will be empathetic and will ultimately provide some guidance. Change the background behind the 'face' so you can feel even more comfortable with your constant companion. 

## Running the App locally
To run the dApp locally, an Google AI Studio API key is needed. Follow [these instructions](https://aistudio.google.com/app/apikey) to create your own API key with Google. 

After cloning [this repository](https://github.com/kitfud/AI_ReportCardGenerator), create a `.env` file in the root folder. 

Copy and paste your created API token in the .env file with the variable names as follows; replace `<API_KEY>` with your own details:

REACT_APP_GOOGLE_API=`<API_KEY>`

### Once the `.env` file is created:

CD into the folder, and run:
```
npm install
npm start
```

## Live Deployment
[coming soon]:

## Developer
- [@kitfud](https://github.com/kitfud)

# Music:
Music by: https://www.bensound.com
<br></br>
License code: VN01KA8MDLM1EZRQ