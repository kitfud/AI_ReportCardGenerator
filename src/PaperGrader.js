import React, { useState, useEffect, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import particleOptions from "./particleOptions.js";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro-vision-latest";
const API_KEY = process.env.REACT_APP_GOOGLE_API;

const PaperGrader = () => {
  const [init, setInit] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [homeworkImage, setHomeworkImage] = useState(null);

  useEffect(() => {
    initParticlesEngine();
  }, []);

  const initParticlesEngine = async () => {
    try {
      await loadSlim();
      setInit(true);
    } catch (error) {
      console.error("Error initializing particles engine:", error);
    }
  };

  const particlesLoaded = (container) => {
    console.log("Particles container:", container);
  };

  const options = useMemo(() => particleOptions, []);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      setHomeworkImage(base64String);
    };

    reader.readAsDataURL(file);
  };

  const generateMessage = async () => {
    if (!homeworkImage) {
      console.error("No image uploaded");
      return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 4096,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const imageParts = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: homeworkImage,
        },
      },
    ];

    const parts = [
      {
        text: "\n\n\"Analyze the submitted homework assignment by identifying the assignment's topic, the student's response, and the accuracy of the answers provided. Begin with a brief description of the homework assignment, including its subject (e.g., mathematics, science), the specific questions or tasks given, and the completion date provided by the student. Next, grade the assignment based on the correctness of the answers. For each question or task, indicate whether the student's response is 'correct' or 'incorrect', and provide a concise explanation for the grading, especially for incorrect answers. Finally, compose a personalized feedback message to the student. This message should start with a greeting, followed by a summary of the student's performance, highlighting strengths and areas for improvement. If the student performed well, include praise for their accurate understanding and effort. If there are areas where the student needs improvement, offer constructive criticism and specific advice on how to address these issues. Close the feedback with encouragement and motivation for future assignments. Ensure that your analysis and feedback are clear, objective, and supportive, aimed at fostering the student's learning and growth.\"\n\n\n\n\n",
      },
      ...imageParts,
      { text: "\n" },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });

      const response = result.response;
      setResponseText(response.text());
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  const discardMessage = () => {
    setResponseText("");
    setHomeworkImage(null);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {init ? (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      ) : (
        <div>Loading particles...</div>
      )}
      {homeworkImage && (
        <img
          src={`data:image/jpeg;base64,${homeworkImage}`}
          alt="Homework"
          style={{ width: "100px", height: "auto", margin: "10px" }}
        />
      )}
      <input type="file" onChange={handleFileInputChange} accept="image/jpeg" />
      <button onClick={generateMessage} style={{ margin: "10px" }}>
        Generate Message
      </button>
      {responseText && (
        <div style={{ margin: "10px", textAlign: "center" }}>
          <textarea
            value={responseText}
            readOnly
            style={{ width: "300px", height: "200px" }}
          />
          <button onClick={discardMessage}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default PaperGrader;
