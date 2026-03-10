import { z } from "zod";
import type { Request, Response } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import prismaPkg, { HomeworkStatus, Prisma } from "../generated/prisma/client.js";

const { PrismaClient } = prismaPkg;
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const homeworkIdSchema = z.string().uuid();
const homeworkSchema = z.object({
    title : z.string(),
    description : z.string(),
    dueDate : z.coerce.date(),
    status : z.nativeEnum(HomeworkStatus),
    classId : z.string().uuid(),
    teacherId : z.string().uuid(),
    subjectId : z.string().uuid(),
    termId : z.string().uuid(),
    schoolId : z.string().uuid(),
})
const parentHomeworkSchema = z.object({
    status : z.literal(HomeworkStatus.complete)
})

export const getHomework = async(req : Request, res : Response) => {
    try {
        const homework = await prisma.homework.findMany({
            where : {
                isDeleted : false
            }
        });
        res.status(200).json(homework);   
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching homework', message);
        res.status(500).json({ message });        
    }
} 
export const createHomework =async (req : Request <{}, {}, unknown>, res : Response) => {
    try {
        const parsed = homeworkSchema.safeParse(req.body);

        if(!parsed.success){
           return res.status(400).json({
                message : 'Validation failed',
                errors : parsed.error.flatten().fieldErrors
            })
        }

       const { title, description, dueDate, status, classId, teacherId, subjectId, termId, schoolId } = parsed.data; 

       const newHomework = await prisma.homework.create({
        data : {
            title,
            description,
            dueDate,
            status,
            classId,
            teacherId,
            subjectId,
            termId,
            schoolId
        }
       })
       res.status(201).json({ message : 'Homework created successfully', newHomework });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Uknown error';
        console.log('Error creating homework',message)
        res.status(500).json({ message });
        
    }
}
export const editHomework = async(req : Request<{id : string}, {}, unknown>, res : Response) => {
    try {
        const homeworkIdParsed = homeworkIdSchema.safeParse(req.params.id);
        const parsed = homeworkSchema.safeParse(req.body);

        if(!homeworkIdParsed.success){
            return res.status(400).json({ message : 'Invalid homework ID' });
        }
        if(!parsed.success){
            return res.status(400).json({
                message : 'Validation failed',
                errors : parsed.error.flatten().fieldErrors
            })
        }

        const homeworkId = homeworkIdParsed.data;
        const { title, description, dueDate, status, classId, teacherId, subjectId, termId, schoolId } = parsed.data;

        const existingHomework = await prisma.homework.findFirst({
            where : {
                id : homeworkId,
                isDeleted : false
            }
        })

        if(!existingHomework){
            return res.status(404).json({ message : 'Homework does not exist' });
        }

        const updatedHomework = await prisma.homework.update({
            where : {
                id : homeworkId
            },
            data : {
                title,
                description,
                dueDate,
                status,
                classId,
                teacherId,
                subjectId,
                termId,
                schoolId
            }
        })

        res.status(200).json({ message : 'Homework updated successfully', updatedHomework });
        
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Uknown error'
        console.log('Error editing homework', message)
        res.status(500).json({ message })
    }
}

export const ParentEditHomework = async(req : Request<{id : string}, {}, unknown>, res : Response) => {
    try {

        const parsed = parentHomeworkSchema.safeParse(req.body)
        const homeworkIdParsed = homeworkIdSchema.safeParse(req.params.id)

        if(!homeworkIdParsed.success){
            return res.status(400).json({ message : 'Invalid homework ID' });
        }
        if(!parsed.success){
            return res.status(400).json({
                message : 'Validation failed',
                errors : parsed.error.flatten().fieldErrors
            })
        }

        const homeworkId = homeworkIdParsed.data

        const {status} = parsed.data;

        const existingHomework = await prisma.homework.findFirst({
            where : {
                id : homeworkId,
                isDeleted : false
            }
        })

        if(!existingHomework){
            return res.status(404).json({ message : 'Homework does not exist' });
        }
        
        const updatedHomework = await prisma.homework.update({
            where : {
                id : homeworkId
            },
            data : {
                status
            }
        })
        res.status(200).json({ message : 'Homework status updated successfully', updatedHomework });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Uknown error'
        console.log('Error editing homework', message)
        res.status(500).json({ message })
    }
}
export const deleteHomework = async(req : Request<{id : string}, {}, unknown>, res : Response) => {
    try {
        const homeworkIdParsed = homeworkIdSchema.safeParse(req.params.id)

        if(!homeworkIdParsed.success){
            return res.status(400).json({ message : 'Invalid homework ID' });
        }

        const homeworkId = homeworkIdParsed.data;

        const existingHomework = await prisma.homework.findFirst({
            where : {
                id : homeworkId,
                isDeleted : false
            }
        })

        if(!existingHomework){
            return res.status(404).json({ message : 'Homework does not exist' });
        }

        await prisma.homework.update({
            where : {
                id : homeworkId
            },
            data : {
                isDeleted : true,
                deletedAt : new Date()
            }
        })

        res.status(200).json({ message : 'Homework deleted successfully' });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Uknown error';
        console.log('Error deleting homework', message);
        res.status(500).json({ message });
    }
}