import prisma  from "../dbConfig"

export async function OauthCreateUser({email,name,image}){
      try {
            const user = await prisma.user.findFirst({
                  where:{
                        email
                  }
            })
            if(!user){
                  console.log("user does not exists")
                  const newUser = await prisma.user.create({
                        data:{
                              username:name,
                              email ,
                              isVerified:true,
                              image:image
                        },
                        select:{
                              id:true,
                              username:true,
                              email:true,
                              image:true
                        }
                  })
                  console.log("user created",newUser)
                  return newUser
            }
            console.log("user exists")
            return user
      } catch (error) {
            throw new Error(error.message) 
      }
      
          
}