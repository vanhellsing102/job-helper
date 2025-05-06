import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAi = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_API_KEY);

export const POST = async(request) =>{
    try {
        const {question} = await request.json();
        const model = genAi.getGenerativeModel({model: "gemini-1.0-pro"});
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{text: question}]
                }
            ]
        });
        const response = result.response;
        const text = response.text();
        return NextResponse.json({answer: text}, {status: 200});
        // console.log(question);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "The answer to your question cannot be found"}, {status: 404});
    }
}