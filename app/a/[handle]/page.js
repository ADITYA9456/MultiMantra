import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import ClientEnhancedProfile from './ClientEnhancedProfile';


export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("MultiMantra");
    const collection = db.collection("link collector");

    // If the handle is already claimed, you cannot create the bittree
    const item = await collection.findOne({handle: handle})
    if(!item){
        return notFound()
    }

    console.log(item)

    // Alternative: Use JSON.parse(JSON.stringify()) to serialize
    const serializedItem = JSON.parse(JSON.stringify(item));

    return <ClientEnhancedProfile item={serializedItem} />
}