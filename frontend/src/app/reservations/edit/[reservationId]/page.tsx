import EditReservationForm from "@/components/EditReservationForm";
import useServerSession from "@/hooks/useServerSession";
import { redirect } from "next/navigation";

export default async function({
    params
}:{
    params:{
        reservationId:string
    }
}){
    const session = await useServerSession();
    if(session==undefined){
        redirect("/login")
    }
    return (
        <main>
            <EditReservationForm token={session.token} reservationId={params.reservationId}></EditReservationForm>
        </main>
    )
}