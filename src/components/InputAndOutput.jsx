"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";

const InputAndOutput = () => {

    const [ans, setAns] = useState("");
    const [pdfText, setPdfText] = useState("");

    useEffect( () =>{
        axios.get('/api/pdf')
        .then(res =>{
            console.log(res.data.text)
        })
    }, [])

    const handleSendMessage = (e) =>{
        e.preventDefault();
        const search = e.target.search.value;
        console.log(search);
        e.target.reset();
    }
    return (
        <div className="">
            <h2 className='text-3xl font-bold text-slate-800 mt-5'>Job <span className='text-cyan-400'>Helper</span></h2>
            <div className='flex items-center justify-center flex-col gap-3 md:mt-20 mt-2'>
                <form onSubmit={handleSendMessage} className='md:w-[50%]'>
                    <div className="relative">
                        <input type="text" name='search' className='w-full py-2 px-5 outline-none appearance-none border border-slate-600 rounded-lg bg-slate-300 text-cyan-600'/>
                        <button className="absolute inset-y-0 right-3 cursor-pointer">
                            <LuSendHorizontal className="text-cyan-500 text-xl"></LuSendHorizontal>
                        </button>
                    </div>
                </form>
                <p className="min-h-[200px] md:w-[50%] border border-slate-600 rounded-xl text-cyan-600">{ans}</p>
            </div>
        </div>
    );
};

export default InputAndOutput;