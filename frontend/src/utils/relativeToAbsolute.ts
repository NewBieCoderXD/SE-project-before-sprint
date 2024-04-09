export default function(relativeUrl:string){
    return process.env.NEXT_PUBLIC_BACKEND_URL+relativeUrl;
}