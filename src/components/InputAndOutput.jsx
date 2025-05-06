"use client"
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LuSendHorizontal } from "react-icons/lu";

const ai = new GoogleGenAI({apiKey: "AIzaSyAZL96CxSBUJaHjm-OufgMEL1KZHmd7Mxw"});

const InputAndOutput = () => {

    const [loading, setLoading] = useState(false);
    const [ans, setAns] = useState("");

    const handleSendMessage = async(e) =>{
        setLoading(true);
        e.preventDefault();
        const question = e.target.search.value;
        if(!question){
            setLoading(false);
            setAns("");
           return toast.error("Please ask me your question");
        }
        const response = ai.models.generateContent({
            model: 'gemini-2.0-flash',
            // contents: `give solution according to my concern, make your response sort , my concern is :${question}`,
            contents: `I want answers to any questions regarding employment.let me sorten tha answer the question Your question is: ${question}`,
        })
        const data = await response;
        setAns(data.text);
        e.target.reset();
        setLoading(false);
    }
    return (
        <div className="">
            <h2 className='text-3xl font-bold text-slate-800 pt-5'>Job <span className='text-cyan-400'>Helper</span></h2>
            <div className='flex items-center justify-center flex-col gap-3 md:mt-20 mt-2'>
                <p className="text-[17px] font-medium text-slate-700 capitalize">you can ask me any question about your job preparation!!!</p>
                <form onSubmit={handleSendMessage} className='md:w-[50%]'>
                    <div className="relative">
                        <input type="text" placeholder="Find the answer to you question" name='search' className='w-full py-2 px-5 outline-none appearance-none border border-slate-600 rounded-lg bg-slate-300 text-cyan-600'/>
                        <button className="absolute inset-y-0 right-3 cursor-pointer">
                            {
                                loading 
                                ? 
                                <span className="loading loading-spinner text-cyan-500"></span>
                                :
                                <LuSendHorizontal className="text-cyan-500 text-xl"></LuSendHorizontal>
                            }
                        </button>
                    </div>
                </form>
                <p className="min-h-[200px] md:w-[50%] border border-slate-600 rounded-xl text-cyan-600 p-5">{ans}</p>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default InputAndOutput;