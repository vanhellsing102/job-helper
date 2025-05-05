import { NextResponse } from "next/server"
import path from 'path';
import fs from 'fs/promises';
import pdf from 'pdf-parse';
export const GET = async() =>{
    try {
        const filePath = path.join(process.cwd(), "public", "bcs.pdf");
        const fileBuffer = await fs.readFile(filePath);
        const data = await pdf(fileBuffer);
        return NextResponse.json({text: data.text}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "pdf text not found"}, {status: 404})
    }
}