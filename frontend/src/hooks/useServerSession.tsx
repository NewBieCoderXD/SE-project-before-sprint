"use server"
import { cookies } from "next/headers";
import { Session, User } from "../../interface";

export default async function(): Promise<Session|undefined>{
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    let user: User|undefined = undefined;

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/api/v1/auth/me',{
        method:"GET",
        headers: new Headers({
            'Authorization': 'Bearer '+token
        }), 
    })
    if(response.ok){
        user = await response.json()
    }

    let session: Session|undefined=undefined;
    if(user&&token){
        session={
            user,
            token
        }
    }
    return session
}