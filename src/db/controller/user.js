import prisma  from "../dbConfig"

export async function OauthCreateUser({email,name,image}){
      try {
            const user = await prisma.user.findFirst({
                  where:{
                        email
                  },
                  select:{
                        email:true,
                        username:true,
                        isVerified:true,
                        isAdmin:true,
                        image:true,
                        id:true,
                        password:true
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
                              email:true,
                              username:true,
                              isVerified:true,
                              isAdmin:true,
                              image:true,
                              id:true,
                              password:true
                        }
                  })
                  console.log("user created",newUser)
                  return newUser
            }
            console.log("user exists")
            return user
      } catch (error) {
            console.log("error in next-auth " ) 
            throw new Error(error.message) 
      }
      
          
}

export async function getUserInJWT(email) {
      try {
            const user = await prisma.user.findFirst({
                  where:{
                        email
                  },
                  select:{
                        email:true,
                        username:true,
                        isVerified:true,
                        isAdmin:true,
                        image:true,
                        id:true,
                        password:true
                  }
            })
            return user
      }catch(error){
            console.log(error.message)
            throw new Error("User not found") 

      }
}
