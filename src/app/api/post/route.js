import { NextResponse } from "next/server";
import prisma from "@/db/dbConfig"
export async function GET(req) {
      try {
            const url = new URL(req.url)
            const id = url.searchParams.get("id") || ""
            const sort = url.searchParams.get("sort") || ""
            const startWith = url.searchParams.get("startWith") || ""

            const searchWords= startWith.split(" ")
            // search for individual words
            let Db_ORQuery=[]
            if(sort === "title"){
                  Db_ORQuery=searchWords.map((word)=>{
                        return {
                              title: {
                                    contains: word,
                              }
                        }
                        
                  })
            }else if(sort === "type"){
                  Db_ORQuery=searchWords.map((word)=>{
                        return {
                              type: {
                                    contains: word,
                              }
                        }
                        
                  })
            }else if(sort === "description"){
                  Db_ORQuery=searchWords.map((word)=>{
                        return {
                              description: {
                                    contains: word,
                              }
                        }
                        
                  })
            }
            
            console.log("Db_ORQuery:",Db_ORQuery)
            if(id){
                  const posts = await prisma.post.findMany({where:{id}})
                  return NextResponse.json({posts})
            }
            if(sort){
                  if(sort === "title"){
                        if(startWith){
                              // finding the most related with And condition
                              const and_Post = await prisma.post.findMany({
                                    where:{
                                          AND:Db_ORQuery
                                    },
                                    // orderBy:{title:"asc"}
                              })
                              const idsArrAndQuery = and_Post.map((post)=>{
                                    return post.id
                              })
                              // finding the remain related with Or condition
                              const or_Posts = await prisma.post.findMany({
                                    where:{
                                          OR:Db_ORQuery
                                          ,
                                          AND: {
                                                id:{notIn:idsArrAndQuery},
                                          }
                                    },
                              })
                              const posts= [...and_Post,...or_Posts]
                              console.log("sorted by title and startswith ")
                              return NextResponse.json({posts})
                        }
                        const posts = await prisma.post.findMany({orderBy:{title:"asc"}})
                        console.log("sorted by title")
                        return NextResponse.json({posts})
                  }
                  if(sort === "type"){
                        if(startWith){
                              // finding the most related with And condition
                              const and_Post = await prisma.post.findMany({
                                    where:{
                                          AND:Db_ORQuery
                                    },
                              })
                              const idsArrAndQuery = and_Post.map((post)=>{
                                    return post.id
                              })
                              console.log(idsArrAndQuery)
                              // finding the remain related with Or condition
                              const or_Posts = await prisma.post.findMany({
                                    where:{
                                          OR:Db_ORQuery
                                          ,
                                          AND: {
                                                id:{notIn:idsArrAndQuery},
                                          }
                                    },
                              })
                              const posts= [...and_Post,...or_Posts]
                              console.log("sorted by type and startswith ")
                              return NextResponse.json({posts})
                        }
                        const posts = await prisma.post.findMany({orderBy:{type:"asc"}})
                        console.log("sorted by type")
                        return NextResponse.json({posts})
                  }
                  if(sort === "description"){
                        if(startWith){
                              const posts = await prisma.post.findMany({
                                    where:{
                                          OR:Db_ORQuery
                                    },
                              })
                              
                              console.log("sorted by description and startswith ")
                              return NextResponse.json({posts})
                        }
                        const posts = await prisma.post.findMany({orderBy:{description:"asc"}})
                        console.log("sorted by description")
                        return NextResponse.json({posts})
                  }
            }
            
            const posts = await prisma.post.findMany()
            return NextResponse.json({posts})
      } catch (error) {
            return NextResponse.json({error:error.message},{status:500})
      }  
}
export async function POST(req) {
      try {
            const reqBody = await req.json()
            const {title,description,type}  = reqBody
            const post = await prisma.post.create({
                  data:{
                        title,description,type
                  }
            })
            return NextResponse.json({post})
      } catch (error) {
            return NextResponse.json({error:error.message},{status:500})
      }  
}